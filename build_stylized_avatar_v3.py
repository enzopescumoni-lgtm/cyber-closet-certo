import bpy
import bmesh
import math
import os
from mathutils import Vector, Euler

def build_avatar_v3():
    print("==========================================================")
    print("  CORRIGINDO ORIENTAÇÃO DO AVATAR HUMANO V3 (Z-UP BLENDER) ")
    print("==========================================================")

    # 1. LIMPAR A CENA DO BLENDER
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    for block in bpy.data.meshes: bpy.data.meshes.remove(block)
    for block in bpy.data.materials: bpy.data.materials.remove(block)
    for block in bpy.data.armatures: bpy.data.armatures.remove(block)
    for block in bpy.data.actions: bpy.data.actions.remove(block)

    # 2. MATERIAIS ESTILIZADOS V3 (PBR)
    mat_skin = bpy.data.materials.new(name="V3_Skin_Stylized")
    bsdf_skin = mat_skin.node_tree.nodes.get("Principled BSDF")
    if bsdf_skin:
        bsdf_skin.inputs['Base Color'].default_value = (0.93, 0.76, 0.65, 1.0)
        bsdf_skin.inputs['Roughness'].default_value = 0.40

    mat_eye = bpy.data.materials.new(name="V3_Eye_Stylized")
    bsdf_eye = mat_eye.node_tree.nodes.get("Principled BSDF")
    if bsdf_eye:
        bsdf_eye.inputs['Base Color'].default_value = (0.0, 0.90, 1.0, 1.0)
        bsdf_eye.inputs['Emission Color'].default_value = (0.0, 0.75, 1.0, 1.0)
        bsdf_eye.inputs['Emission Intensity'].default_value = 0.8

    mat_brow = bpy.data.materials.new(name="V3_Eyebrow_Stylized")
    bsdf_brow = mat_brow.node_tree.nodes.get("Principled BSDF")
    if bsdf_brow:
        bsdf_brow.inputs['Base Color'].default_value = (0.12, 0.10, 0.15, 1.0)

    mat_hair = bpy.data.materials.new(name="V3_Hair_Stylized")
    bsdf_hair = mat_hair.node_tree.nodes.get("Principled BSDF")
    if bsdf_hair:
        bsdf_hair.inputs['Base Color'].default_value = (0.12, 0.14, 0.22, 1.0)
        bsdf_hair.inputs['Roughness'].default_value = 0.35

    mat_suit = bpy.data.materials.new(name="V3_Suit_Stylized")
    bsdf_suit = mat_suit.node_tree.nodes.get("Principled BSDF")
    if bsdf_suit:
        bsdf_suit.inputs['Base Color'].default_value = (0.08, 0.10, 0.18, 1.0)

    # 3. CRIAR MALHA HUMANA V3 ANATOMICAMENTE CONTÍNUA EM COORDENADAS PADRÃO BLENDER (Z = ALTURA)
    mesh_data = bpy.data.meshes.new("V3HumanMesh")
    body_obj = bpy.data.objects.new("V3_StylizedHumanBody", mesh_data)
    bpy.context.collection.objects.link(body_obj)
    bpy.context.view_layer.objects.active = body_obj
    body_obj.select_set(True)

    bm = bmesh.new()

    # Tabela de Anéis Anatômicos (Coordenadas Blender Z-UP):
    # (z_height, cx, cy_depth, rx, ry, segs)
    spine_rings = [
        # Cabeça (z=1.52 a 1.84)
        (1.84, 0.0, 0.02, 0.015, 0.015, 16),
        (1.82, 0.0, 0.02, 0.065, 0.075, 16),
        (1.78, 0.0, 0.02, 0.105, 0.118, 16),
        (1.72, 0.0, 0.025, 0.115, 0.126, 16),
        (1.66, 0.0, 0.025, 0.108, 0.122, 16),
        (1.60, 0.0, 0.020, 0.088, 0.105, 16),
        (1.54, 0.0, 0.010, 0.062, 0.072, 16),
        
        # Pescoço (z=1.42 a 1.54)
        (1.49, 0.0, 0.005, 0.056, 0.062, 16),
        (1.43, 0.0, 0.000, 0.068, 0.072, 16),

        # Peitoral e Ombros (z=1.18 a 1.43)
        (1.39, 0.0, 0.005, 0.175, 0.115, 20),
        (1.32, 0.0, 0.010, 0.155, 0.112, 20),
        (1.24, 0.0, 0.008, 0.138, 0.102, 20),

        # Cintura e Quadril (z=0.85 a 1.24)
        (1.12, 0.0, 0.005, 0.122, 0.092, 20),
        (0.98, 0.0, 0.000, 0.138, 0.102, 20),
        (0.85, 0.0, -0.005, 0.145, 0.108, 20)
    ]

    last_ring_verts = None
    for z, cx, cy, rx, ry, segs in spine_rings:
        current_verts = []
        for s in range(segs):
            theta = s * 2 * math.pi / segs
            x = cx + rx * math.cos(theta)
            y = cy + ry * math.sin(theta)
            v = bm.verts.new((x, y, z)) # Z é a altura na cena Blender
            current_verts.append(v)

        if last_ring_verts and len(last_ring_verts) == len(current_verts):
            n = len(current_verts)
            for s in range(n):
                s_next = (s + 1) % n
                bm.faces.new((last_ring_verts[s], last_ring_verts[s_next], current_verts[s_next], current_verts[s]))
        last_ring_verts = current_verts

    # Braços (Pose A em Coordenadas Blender Z-UP)
    for side in [1.0, -1.0]:
        arm_rings = [
            (side * 0.19, 0.00, 1.38, 0.055, 0.055, 12), # cx, cy, cz
            (side * 0.28, 0.01, 1.24, 0.048, 0.046, 12),
            (side * 0.36, 0.02, 1.10, 0.042, 0.040, 12),
            (side * 0.44, 0.03, 0.96, 0.038, 0.035, 12),
            (side * 0.51, 0.04, 0.85, 0.032, 0.028, 12),
            (side * 0.56, 0.05, 0.77, 0.045, 0.018, 12)
        ]
        last_arm_verts = None
        for cx, cy, cz, rx, ry, segs in arm_rings:
            current_verts = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                x = cx + rx * math.cos(theta)
                y = cy + ry * math.sin(theta)
                v = bm.verts.new((x, y, cz))
                current_verts.append(v)
            if last_arm_verts:
                n = len(current_verts)
                for s in range(n):
                    s_next = (s + 1) % n
                    bm.faces.new((last_arm_verts[s], last_arm_verts[s_next], current_verts[s_next], current_verts[s]))
            last_arm_verts = current_verts

    # Pernas e PÉS (Pose A em Coordenadas Blender Z-UP - Pés em Z=0)
    for side in [1.0, -1.0]:
        leg_rings = [
            (side * 0.10, 0.00, 0.85, 0.082, 0.085, 12),
            (side * 0.105, 0.00, 0.65, 0.068, 0.070, 12),
            (side * 0.11, -0.005, 0.48, 0.058, 0.058, 12),
            (side * 0.115, -0.01, 0.30, 0.055, 0.060, 12),
            (side * 0.12, -0.015, 0.10, 0.036, 0.036, 12),
            (side * 0.12, 0.06, 0.00, 0.042, 0.12, 12) # z = 0.0 no chão
        ]
        last_leg_verts = None
        for cx, cy, cz, rx, ry, segs in leg_rings:
            current_verts = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                x = cx + rx * math.cos(theta)
                y = cy + ry * math.sin(theta)
                v = bm.verts.new((x, y, cz))
                current_verts.append(v)
            if last_leg_verts:
                n = len(current_verts)
                for s in range(n):
                    s_next = (s + 1) % n
                    bm.faces.new((last_leg_verts[s], last_leg_verts[s_next], current_verts[s_next], current_verts[s]))
            last_leg_verts = current_verts

    bm.to_mesh(mesh_data)
    bm.free()

    body_obj.data.materials.append(mat_skin)
    body_obj.data.materials.append(mat_suit)

    subsurf_mod = body_obj.modifiers.new(name="Subdivision", type='SUBSURF')
    subsurf_mod.levels = 1
    subsurf_mod.render_levels = 2

    for poly in body_obj.data.polygons:
        poly.use_smooth = True

    # 4. ROSTO ESTILIZADO E CABELO (EM COORDENADAS Z-UP)
    parts_to_join = [body_obj]

    # Olhos 3D
    for side in [1.0, -1.0]:
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.015, location=(side * 0.040, 0.102, 1.72))
        eye = bpy.context.active_object
        eye.name = f"V3_Eye_{'L' if side > 0 else 'R'}"
        eye.data.materials.append(mat_eye)
        parts_to_join.append(eye)

    # Sobrancelhas 3D
    for side in [1.0, -1.0]:
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(side * 0.042, 0.108, 1.75))
        brow = bpy.context.active_object
        brow.name = f"V3_Eyebrow_{'L' if side > 0 else 'R'}"
        brow.scale = (0.032, 0.008, 0.005)
        brow.data.materials.append(mat_brow)
        parts_to_join.append(brow)

    # Cabelo 3D Estilizado
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.115, location=(0.0, 0.015, 1.75))
    hair = bpy.context.active_object
    hair.name = "V3_StylizedHair"
    hair.scale = (1.0, 1.05, 0.95)
    hair.data.materials.append(mat_hair)
    parts_to_join.append(hair)

    # UNIFICAR TODOS OS OBJETOS EM UMA MALHA ÚNICA
    bpy.ops.object.select_all(action='DESELECT')
    for p in parts_to_join:
        p.select_set(True)
    bpy.context.view_layer.objects.active = body_obj
    bpy.ops.object.join()

    # Aplica todas as transformações (Location, Rotation, Scale)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

    # 5. CRIAR ESQUELETO (RIGGING ARMATURE V3 Z-UP BLENDER)
    bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
    armature_obj = bpy.context.active_object
    armature_obj.name = "Human_Armature_V3"
    arm_data = armature_obj.data

    bpy.ops.armature.select_all(action='SELECT')
    bpy.ops.armature.delete()

    # Definição dos Ossos em Coordenadas Blender Z-UP: (x, y_depth, z_height)
    bones_def = {
        'Hips': ((0, 0, 0.88), (0, 0, 1.08), None),
        'Spine': ((0, 0, 1.08), (0, 0, 1.28), 'Hips'),
        'Chest': ((0, 0, 1.28), (0, 0, 1.45), 'Spine'),
        'Neck': ((0, 0, 1.45), (0, 0, 1.55), 'Chest'),
        'Head': ((0, 0, 1.55), (0, 0, 1.84), 'Neck'),
        
        # Braço Esquerdo
        'Shoulder.L': ((-0.04, 0, 1.42), (-0.19, 0, 1.38), 'Chest'),
        'UpperArm.L': ((-0.19, 0, 1.38), (-0.36, 0.02, 1.10), 'Shoulder.L'),
        'LowerArm.L': ((-0.36, 0.02, 1.10), (-0.51, 0.04, 0.85), 'UpperArm.L'),
        'Hand.L': ((-0.51, 0.04, 0.85), (-0.58, 0.05, 0.77), 'LowerArm.L'),

        # Braço Direito
        'Shoulder.R': ((0.04, 0, 1.42), (0.19, 0, 1.38), 'Chest'),
        'UpperArm.R': ((0.19, 0, 1.38), (0.36, 0.02, 1.10), 'Shoulder.R'),
        'LowerArm.R': ((0.36, 0.02, 1.10), (0.51, 0.04, 0.85), 'UpperArm.R'),
        'Hand.R': ((0.51, 0.04, 0.85), (0.58, 0.05, 0.77), 'LowerArm.R'),

        # Perna Esquerda
        'Thigh.L': ((-0.10, 0, 0.85), (-0.11, -0.005, 0.48), 'Hips'),
        'Shin.L': ((-0.11, -0.005, 0.48), (-0.12, -0.015, 0.10), 'Thigh.L'),
        'Foot.L': ((-0.12, -0.015, 0.10), (-0.12, 0.12, 0.0), 'Shin.L'),

        # Perna Direita
        'Thigh.R': ((0.10, 0, 0.85), (0.11, -0.005, 0.48), 'Hips'),
        'Shin.R': ((0.11, -0.005, 0.48), (0.12, -0.015, 0.10), 'Thigh.R'),
        'Foot.R': ((0.12, -0.015, 0.10), (0.12, 0.12, 0.0), 'Shin.R')
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

    # Parent da malha unificada com Armature Automatic Weights ('ARMATURE_AUTO')
    body_obj.select_set(True)
    armature_obj.select_set(True)
    bpy.context.view_layer.objects.active = armature_obj
    bpy.ops.object.parent_set(type='ARMATURE_AUTO')

    # 6. ANIMAÇÃO IDLE V3 ÚNICA (RESPIRAÇÃO SUAVE Z-UP)
    bpy.ops.object.mode_set(mode='POSE')
    
    pbone_chest = armature_obj.pose.bones.get('Chest')
    pbone_head = armature_obj.pose.bones.get('Head')

    armature_obj.animation_data_create()
    action = bpy.data.actions.new(name="Idle_Breathing_V3")
    armature_obj.animation_data.action = action

    # Frame 1
    bpy.context.scene.frame_set(1)
    if pbone_chest:
        pbone_chest.scale = (1.0, 1.0, 1.0)
        pbone_chest.keyframe_insert(data_path="scale", index=-1)
    if pbone_head:
        pbone_head.rotation_euler = (0, 0, 0)
        pbone_head.keyframe_insert(data_path="rotation_euler", index=-1)

    # Frame 30
    bpy.context.scene.frame_set(30)
    if pbone_chest:
        pbone_chest.scale = (1.025, 1.015, 1.025)
        pbone_chest.keyframe_insert(data_path="scale", index=-1)
    if pbone_head:
        pbone_head.rotation_euler = (0.015, 0.01, 0)
        pbone_head.keyframe_insert(data_path="rotation_euler", index=-1)

    # Frame 60 (Loop)
    bpy.context.scene.frame_set(60)
    if pbone_chest:
        pbone_chest.scale = (1.0, 1.0, 1.0)
        pbone_chest.keyframe_insert(data_path="scale", index=-1)
    if pbone_head:
        pbone_head.rotation_euler = (0, 0, 0)
        pbone_head.keyframe_insert(data_path="rotation_euler", index=-1)

    bpy.ops.object.mode_set(mode='OBJECT')

    # 7. EXPORTAÇÃO GLB DO NOVO AVATAR V3 COM CONVERSÃO CORRETA Y-UP
    output_dirs = [
        os.path.join("assets", "modelos3d", "avatares"),
        os.path.join("assets", "avatar")
    ]

    for d in output_dirs:
        os.makedirs(d, exist_ok=True)
        glb_filename = os.path.join(d, "avatar-v3-stylized.glb")
        
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
        print(f"✓ CORREÇÃO DE ORIENTAÇÃO CONCLUÍDA! GLB exportado em: {glb_filename}")

if __name__ == '__main__':
    build_avatar_v3()
