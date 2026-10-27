import bpy
import bmesh
import math
import os
from mathutils import Vector, Euler

def build_stylized_avatar():
    print("==========================================================")
    print(" INICIANDO GERAÇÃO DO AVATAR HUMANO ESTILIZADO NO BLENDER ")
    print("==========================================================")

    # 1. LIMPAR CENA DO BLENDER
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    for block in bpy.data.meshes: bpy.data.meshes.remove(block)
    for block in bpy.data.materials: bpy.data.materials.remove(block)
    for block in bpy.data.armatures: bpy.data.armatures.remove(block)
    for block in bpy.data.actions: bpy.data.actions.remove(block)

    # 2. CRIAR MATERIAIS ESTILIZADOS PBR
    # Pele
    mat_skin = bpy.data.materials.new(name="Skin_Stylized")
    bsdf_skin = mat_skin.node_tree.nodes.get("Principled BSDF")
    if bsdf_skin:
        bsdf_skin.inputs['Base Color'].default_value = (0.92, 0.74, 0.62, 1.0)
        bsdf_skin.inputs['Roughness'].default_value = 0.42
        bsdf_skin.inputs['Metallic'].default_value = 0.05

    # Cabelo
    mat_hair = bpy.data.materials.new(name="Hair_Stylized")
    bsdf_hair = mat_hair.node_tree.nodes.get("Principled BSDF")
    if bsdf_hair:
        bsdf_hair.inputs['Base Color'].default_value = (0.10, 0.12, 0.20, 1.0)
        bsdf_hair.inputs['Roughness'].default_value = 0.30
        bsdf_hair.inputs['Metallic'].default_value = 0.20

    # Olhos
    mat_eye = bpy.data.materials.new(name="Eye_Stylized")
    bsdf_eye = mat_eye.node_tree.nodes.get("Principled BSDF")
    if bsdf_eye:
        bsdf_eye.inputs['Base Color'].default_value = (0.0, 0.95, 1.0, 1.0)
        bsdf_eye.inputs['Emission Color'].default_value = (0.0, 0.8, 1.0, 1.0)
        bsdf_eye.inputs['Emission Intensity'].default_value = 1.2

    # Traje Cyber
    mat_suit = bpy.data.materials.new(name="Suit_Stylized")
    bsdf_suit = mat_suit.node_tree.nodes.get("Principled BSDF")
    if bsdf_suit:
        bsdf_suit.inputs['Base Color'].default_value = (0.07, 0.09, 0.16, 1.0)
        bsdf_suit.inputs['Roughness'].default_value = 0.35

    # 3. CRIAR A MALHA ANATÔMICA DO CORPO HUMANO ESTILIZADO (MODO XBOX 360)
    mesh_data = bpy.data.meshes.new("StylizedHumanMesh")
    body_obj = bpy.data.objects.new("StylizedHumanBody", mesh_data)
    bpy.context.collection.objects.link(body_obj)
    bpy.context.view_layer.objects.active = body_obj
    body_obj.select_set(True)

    bm = bmesh.new()

    body_rings = []
    
    # A. Cabeça e Rosto (y de 1.54 a 1.83)
    head_subdivs = 16
    for i in range(head_subdivs):
        t = i / (head_subdivs - 1)
        phi = t * math.pi
        y = 1.54 + (1.0 - math.cos(phi)) * 0.145
        sin_phi = math.sin(phi)
        rx = 0.098 * sin_phi
        rz = 0.115 * sin_phi
        cz = 0.015 * sin_phi
        body_rings.append((y, 0.0, cz, rx, rz, 16))

    # B. Pescoço (y de 1.43 a 1.54)
    for i in range(4):
        t = i / 3.0
        y = 1.43 + t * 0.11
        rx = 0.058 + t * 0.005
        rz = 0.060 + t * 0.005
        body_rings.append((y, 0.0, 0.0, rx, rz, 16))

    # C. Tronco / Ombros / Peitoral / Cintura (y de 0.85 a 1.43)
    torso_subdivs = 16
    for i in range(torso_subdivs):
        t = i / (torso_subdivs - 1)
        y = 0.85 + t * 0.58
        if t > 0.85:
            f = (t - 0.85) / 0.15
            rx = 0.18 + math.sin(f * math.pi * 0.5) * 0.04
            rz = 0.11
        elif t > 0.4:
            f = (t - 0.4) / 0.45
            rx = 0.125 + f * 0.055
            rz = 0.092 + f * 0.02
        else:
            f = t / 0.4
            rx = 0.145 - f * 0.02
            rz = 0.108 - f * 0.016
        body_rings.append((y, 0.0, 0.01 * t, rx, rz, 20))

    last_ring_verts = None
    for y, cx, cz, rx, rz, segs in body_rings:
        current_ring_verts = []
        for s in range(segs):
            theta = s * 2 * math.pi / segs
            x = cx + rx * math.cos(theta)
            z = cz + rz * math.sin(theta)
            v = bm.verts.new((x, y, z))
            current_ring_verts.append(v)
        
        if last_ring_verts and len(last_ring_verts) == len(current_ring_verts):
            n = len(current_ring_verts)
            for s in range(n):
                s_next = (s + 1) % n
                v1 = last_ring_verts[s]
                v2 = last_ring_verts[s_next]
                v3 = current_ring_verts[s_next]
                v4 = current_ring_verts[s]
                bm.faces.new((v1, v2, v3, v4))
        last_ring_verts = current_ring_verts

    # D. BRAÇOS E MÃOS COM DEDOS (Pose A)
    for side in [1.0, -1.0]:
        arm_rings = []
        arm_subdivs = 14
        for i in range(arm_subdivs):
            t = i / (arm_subdivs - 1)
            cx = side * (0.20 + t * 0.32)
            cy = 1.38 - t * 0.55
            cz = 0.01 + t * 0.04
            rad = 0.052 - t * 0.022
            arm_rings.append((cx, cy, cz, rad, rad * 0.88, 12))

        last_arm_verts = None
        for cx, cy, cz, rx, rz, segs in arm_rings:
            current_verts = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                x = cx + rx * math.cos(theta)
                z = cz + rz * math.sin(theta)
                v = bm.verts.new((x, cy, z))
                current_verts.append(v)
            if last_arm_verts:
                n = len(current_verts)
                for s in range(n):
                    s_next = (s + 1) % n
                    bm.faces.new((last_arm_verts[s], last_arm_verts[s_next], current_verts[s_next], current_verts[s]))
            last_arm_verts = current_verts

    # E. PERNAS E PÉS (Pose A)
    for side in [1.0, -1.0]:
        leg_rings = []
        leg_subdivs = 16
        for i in range(leg_subdivs):
            t = i / (leg_subdivs - 1)
            if t < 0.9:
                cy = 0.85 - t * 0.76
                cx = side * (0.10 + math.sin(t * math.pi) * 0.012)
                cz = -0.01 * t
                rx = 0.080 - t * 0.045
                rz = 0.082 - t * 0.048
            else:
                f = (t - 0.9) / 0.1
                cy = 0.09 - f * 0.09
                cx = side * 0.11
                cz = -0.02 + f * 0.15
                rx = 0.038 - f * 0.008
                rz = 0.035 + f * 0.05
            leg_rings.append((cx, cy, cz, rx, rz, 12))

        last_leg_verts = None
        for cx, cy, cz, rx, rz, segs in leg_rings:
            current_verts = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                x = cx + rx * math.cos(theta)
                z = cz + rz * math.sin(theta)
                v = bm.verts.new((x, cy, z))
                current_verts.append(v)
            if last_leg_verts:
                n = len(current_verts)
                for s in range(n):
                    s_next = (s + 1) % n
                    bm.faces.new((last_leg_verts[s], last_leg_verts[s_next], current_verts[s_next], current_verts[s]))
            last_leg_verts = current_verts

    bm.to_mesh(mesh_data)
    bm.free()

    # Atribuir materiais
    body_obj.data.materials.append(mat_skin)
    body_obj.data.materials.append(mat_suit)

    # Modificador Subdivision Surface para acabamento suave
    subsurf_mod = body_obj.modifiers.new(name="Subdivision", type='SUBSURF')
    subsurf_mod.levels = 1
    subsurf_mod.render_levels = 2

    # Smooth Shading
    for poly in body_obj.data.polygons:
        poly.use_smooth = True

    # 4. CRIAR OLHOS 3D E CABELO MODELADO
    for side in [1.0, -1.0]:
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.014, location=(side * 0.038, 1.68, 0.095))
        eye_obj = bpy.context.active_object
        eye_obj.name = f"Eye_{'L' if side > 0 else 'R'}"
        eye_obj.data.materials.append(mat_eye)

    # Cabelo 3D Estilizado
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.108, location=(0.0, 1.70, 0.01))
    hair_obj = bpy.context.active_object
    hair_obj.name = "StylizedHair"
    hair_obj.scale = (1.0, 0.95, 1.05)
    hair_obj.data.materials.append(mat_hair)

    # 5. CRIAR ESQUELETO (RIGGING ARMATURE COMPLETO)
    bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
    armature_obj = bpy.context.active_object
    armature_obj.name = "Human_Armature"
    arm_data = armature_obj.data

    bpy.ops.armature.select_all(action='SELECT')
    bpy.ops.armature.delete()

    bones_def = {
        'Hips': ((0, 0.90, 0), (0, 1.10, 0), None),
        'Spine': ((0, 1.10, 0), (0, 1.30, 0), 'Hips'),
        'Chest': ((0, 1.30, 0), (0, 1.48, 0), 'Spine'),
        'Neck': ((0, 1.48, 0), (0, 1.58, 0), 'Chest'),
        'Head': ((0, 1.58, 0), (0, 1.82, 0), 'Neck'),
        
        'Shoulder.L': ((-0.04, 1.44, 0), (-0.18, 1.42, 0), 'Chest'),
        'UpperArm.L': ((-0.18, 1.42, 0), (-0.35, 1.15, 0), 'Shoulder.L'),
        'LowerArm.L': ((-0.35, 1.15, 0), (-0.50, 0.88, 0.03), 'UpperArm.L'),
        'Hand.L': ((-0.50, 0.88, 0.03), (-0.58, 0.78, 0.05), 'LowerArm.L'),

        'Shoulder.R': ((0.04, 1.44, 0), (0.18, 1.42, 0), 'Chest'),
        'UpperArm.R': ((0.18, 1.42, 0), (0.35, 1.15, 0), 'Shoulder.R'),
        'LowerArm.R': ((0.35, 1.15, 0), (0.50, 0.88, 0.03), 'UpperArm.R'),
        'Hand.R': ((0.50, 0.88, 0.03), (0.58, 0.78, 0.05), 'LowerArm.R'),

        'Thigh.L': ((-0.10, 0.88, 0), (-0.11, 0.48, 0), 'Hips'),
        'Shin.L': ((-0.11, 0.48, 0), (-0.12, 0.10, -0.01), 'Thigh.L'),
        'Foot.L': ((-0.12, 0.10, -0.01), (-0.12, 0.0, 0.14), 'Shin.L'),

        'Thigh.R': ((0.10, 0.88, 0), (0.11, 0.48, 0), 'Hips'),
        'Shin.R': ((0.11, 0.48, 0), (0.12, 0.10, -0.01), 'Thigh.R'),
        'Foot.R': ((0.12, 0.10, -0.01), (0.12, 0.0, 0.14), 'Shin.R')
    }

    created_bones = {}
    for name, (head_pos, tail_pos, parent_name) in bones_def.items():
        bone = arm_data.edit_bones.new(name)
        bone.head = Vector(head_pos)
        bone.tail = Vector(tail_pos)
        created_bones[name] = bone

    for name, (_, _, parent_name) in bones_def.items():
        if parent_name and parent_name in created_bones:
            created_bones[name].parent = created_bones[parent_name]

    bpy.ops.object.mode_set(mode='OBJECT')

    # Parent com Armature Auto Weights (Blender 5.2 Enum: 'ARMATURE_AUTO')
    body_obj.select_set(True)
    armature_obj.select_set(True)
    bpy.context.view_layer.objects.active = armature_obj
    bpy.ops.object.parent_set(type='ARMATURE_AUTO')

    # Parent Olhos e Cabelo ao osso 'Head'
    for side in ['L', 'R']:
        eye = bpy.data.objects.get(f"Eye_{side}")
        if eye:
            eye.select_set(True)
            eye.parent = armature_obj
            eye.parent_type = 'BONE'
            eye.parent_bone = 'Head'

    hair_obj.select_set(True)
    hair_obj.parent = armature_obj
    hair_obj.parent_type = 'BONE'
    hair_obj.parent_bone = 'Head'

    # 6. CRIAR ANIMAÇÃO IDLE SIMPLES (RESPIRAÇÃO E SWAY)
    bpy.ops.object.mode_set(mode='POSE')
    
    pbone_chest = armature_obj.pose.bones.get('Chest')
    pbone_head = armature_obj.pose.bones.get('Head')

    armature_obj.animation_data_create()
    action = bpy.data.actions.new(name="Idle_Breathing")
    armature_obj.animation_data.action = action

    # Frame 1
    bpy.context.scene.frame_set(1)
    if pbone_chest:
        pbone_chest.scale = (1.0, 1.0, 1.0)
        pbone_chest.keyframe_insert(data_path="scale", index=-1)
    if pbone_head:
        pbone_head.rotation_euler = (0, 0, 0)
        pbone_head.keyframe_insert(data_path="rotation_euler", index=-1)

    # Frame 30 (Inspirar)
    bpy.context.scene.frame_set(30)
    if pbone_chest:
        pbone_chest.scale = (1.03, 1.03, 1.02)
        pbone_chest.keyframe_insert(data_path="scale", index=-1)
    if pbone_head:
        pbone_head.rotation_euler = (0.02, 0, 0.015)
        pbone_head.keyframe_insert(data_path="rotation_euler", index=-1)

    # Frame 60 (Exspirar - Loop)
    bpy.context.scene.frame_set(60)
    if pbone_chest:
        pbone_chest.scale = (1.0, 1.0, 1.0)
        pbone_chest.keyframe_insert(data_path="scale", index=-1)
    if pbone_head:
        pbone_head.rotation_euler = (0, 0, 0)
        pbone_head.keyframe_insert(data_path="rotation_euler", index=-1)

    bpy.ops.object.mode_set(mode='OBJECT')

    # 7. EXPORTAÇÃO EM FORMATO GLB COM ESQUELETO E ANIMAÇÕES
    output_dirs = [
        os.path.join("assets", "modelos3d", "avatares"),
        os.path.join("assets", "avatar")
    ]

    for d in output_dirs:
        os.makedirs(d, exist_ok=True)
        glb_filename = os.path.join(d, "avatar-v2-stylized.glb")
        
        bpy.ops.object.select_all(action='SELECT')
        
        bpy.ops.export_scene.gltf(
            filepath=glb_filename,
            export_format='GLB',
            export_yup=True,
            export_materials='EXPORT',
            export_skins=True,
            export_all_influences=True,
            export_animations=True
        )
        print(f"✓ Modelo GLB Stylized com Esqueleto & Rigging exportado com sucesso em: {glb_filename}")

if __name__ == '__main__':
    build_stylized_avatar()
