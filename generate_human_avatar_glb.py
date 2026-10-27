import json
import struct
import math
import os

def create_human_avatar_glb(output_path):
    print("Gerando modelo 3D estendido do Avatar Humano (Com Cabelo, Olhos e Visor Cyber)...")

    # Estruturas para guardar malhas separadas (Pele, Cabelo Buzz, Cabelo Cyber, Olhos, Visor)
    meshes_data = []

    def build_mesh(name, material_idx):
        return {
            "name": name,
            "material_idx": material_idx,
            "positions": [],
            "normals": [],
            "uvs": [],
            "indices": [],
            "vertex_count": 0
        }

    mesh_body = build_mesh("Body_Mesh", 0)       # Material 0: Pele
    mesh_hair1 = build_mesh("Hair_Buzzcut", 1)    # Material 1: Cabelo 1 (Estilo Spiky/Buzz)
    mesh_hair2 = build_mesh("Hair_CyberLocks", 2) # Material 2: Cabelo 2 (Cyber Dreads / Locks)
    mesh_eyes = build_mesh("Eyes_Mesh", 3)       # Material 3: Olhos / Íris
    mesh_visor = build_mesh("Visor_Cyber", 4)     # Material 4: Viseira Cyber Neon

    def add_section(target_mesh, verts_grid):
        num_rings = len(verts_grid)
        num_seg = len(verts_grid[0])
        base_idx = target_mesh["vertex_count"]

        for r in range(num_rings):
            v_coord = r / max(1, num_rings - 1)
            for s in range(num_seg):
                u_coord = s / num_seg
                x, y, z, nx, ny, nz = verts_grid[r][s]
                
                length = math.sqrt(nx*nx + ny*ny + nz*nz)
                if length > 0.00001:
                    nx /= length; ny /= length; nz /= length
                else:
                    nx, ny, nz = 0.0, 1.0, 0.0

                target_mesh["positions"].extend([x, y, z])
                target_mesh["normals"].extend([nx, ny, nz])
                target_mesh["uvs"].extend([u_coord, v_coord])
                target_mesh["vertex_count"] += 1

        for r in range(num_rings - 1):
            for s in range(num_seg):
                s_next = (s + 1) % num_seg
                idx00 = base_idx + r * num_seg + s
                idx01 = base_idx + r * num_seg + s_next
                idx10 = base_idx + (r + 1) * num_seg + s
                idx11 = base_idx + (r + 1) * num_seg + s_next

                target_mesh["indices"].extend([idx00, idx10, idx01])
                target_mesh["indices"].extend([idx01, idx10, idx11])

    # 1. CABEÇA E PESCOÇO (CORPO)
    grid_head = []
    rings, segs = 24, 24
    for r in range(rings + 1):
        t = r / rings
        if t < 0.2:
            f = t / 0.2
            y = 1.44 + f * 0.11
            rx, rz = 0.055 + f * 0.005, 0.058 + f * 0.005
            cx, cz = 0.0, 0.0
        else:
            f = (t - 0.2) / 0.8
            phi = f * math.pi
            y = 1.55 + (1.0 - math.cos(phi)) * 0.135
            sin_phi = math.sin(phi)
            rx, rz = 0.095 * sin_phi, 0.11 * sin_phi
            cz = 0.015 * math.sin(phi)
            cx = 0.0

        ring = []
        for s in range(segs):
            theta = s * 2 * math.pi / segs
            cos_t, sin_t = math.cos(theta), math.sin(theta)
            x = cx + rx * cos_t
            z = cz + rz * sin_t
            nx, ny, nz = cos_t, (0.2 * math.cos(f * math.pi) if t >= 0.2 else 0.0), sin_t
            ring.append((x, y, z, nx, ny, nz))
        grid_head.append(ring)
    add_section(mesh_body, grid_head)

    # 2. TORSO & QUADRIL (CORPO)
    grid_torso = []
    rings, segs = 28, 24
    for r in range(rings + 1):
        t = r / rings
        y = 0.85 + t * 0.59
        if t > 0.8:
            f = (t - 0.8) / 0.2
            rx = 0.16 + (1.0 - f) * 0.03 - (f * f) * 0.02
            rz = 0.10 + math.sin(f * math.pi) * 0.02
            cz = 0.01
        elif t > 0.4:
            f = (t - 0.4) / 0.4
            rx = 0.125 + f * 0.065
            rz = 0.09 + f * 0.025
            cz = 0.015 * f
        else:
            f = t / 0.4
            rx = 0.145 - (1.0 - math.cos(f * math.pi)) * 0.01
            rz = 0.105 - f * 0.015
            cz = 0.0

        ring = []
        for s in range(segs):
            theta = s * 2 * math.pi / segs
            cos_t, sin_t = math.cos(theta), math.sin(theta)
            x, z = rx * cos_t, cz + rz * sin_t
            nx, nz = cos_t * (rz / rx), sin_t * (rx / rz)
            ring.append((x, y, z, nx, 0.0, nz))
        grid_torso.append(ring)
    add_section(mesh_body, grid_torso)

    # 3. BRAÇOS E MÃOS (CORPO)
    for side in [1.0, -1.0]:
        grid_arm = []
        rings, segs = 22, 16
        for r in range(rings + 1):
            t = r / rings
            if t < 0.5:
                f = t / 0.5
                cx, cy, cz = side * (0.18 + f * 0.16), 1.38 - f * 0.25, f * 0.02
                radius = 0.052 - f * 0.012
            else:
                f = (t - 0.5) / 0.5
                cx, cy, cz = side * (0.34 + f * 0.14), 1.13 - f * 0.30, 0.02 + f * 0.03
                radius = 0.040 - f * 0.014

            rx, rz = radius, radius * 0.9
            ring = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                cos_t, sin_t = math.cos(theta), math.sin(theta)
                x, y, z = cx + rx * cos_t, cy, cz + rz * sin_t
                ring.append((x, y, z, cos_t * side, -0.3, sin_t))
            grid_arm.append(ring)
        add_section(mesh_body, grid_arm)

    # 4. PERNAS E PÉS (CORPO)
    for side in [1.0, -1.0]:
        grid_leg = []
        rings, segs = 26, 16
        for r in range(rings + 1):
            t = r / rings
            if t < 0.9:
                f = t / 0.9
                cy = 0.85 - f * 0.76
                cx = side * (0.10 + math.sin(f * math.pi) * 0.015)
                cz = -0.01 * f
                if f < 0.45:
                    rf = f / 0.45; rx, rz = 0.082 - rf * 0.022, 0.085 - rf * 0.022
                elif f < 0.55:
                    rx, rz = 0.060, 0.063
                else:
                    rf = (f - 0.55) / 0.35; rx, rz = 0.060 - rf * 0.025, 0.065 - rf * 0.028
            else:
                f = (t - 0.9) / 0.1
                cy = 0.09 - f * 0.09
                cx = side * 0.12
                cz = -0.02 + f * 0.15
                rx, rz = 0.038 - f * 0.008, 0.035 + f * 0.05

            ring = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                cos_t, sin_t = math.cos(theta), math.sin(theta)
                x, y, z = cx + rx * cos_t, cy, cz + rz * sin_t
                ring.append((x, y, z, cos_t * side, (-0.1 if t < 0.9 else 0.5), sin_t))
            grid_leg.append(ring)
        add_section(mesh_body, grid_leg)

    # 5. OLHOS / ÍRIS (EYES MESH)
    for side in [1.0, -1.0]:
        grid_eye = []
        rings, segs = 10, 12
        cx, cy, cz = side * 0.038, 1.68, 0.095
        for r in range(rings + 1):
            t = r / rings
            phi = t * math.pi * 0.5
            y = cy + 0.012 * math.sin(phi)
            rad = 0.012 * math.cos(phi)
            ring = []
            for s in range(segs):
                theta = s * 2 * math.pi / segs
                x = cx + rad * math.cos(theta)
                z = cz + rad * math.sin(theta)
                ring.append((x, y, z, math.cos(theta), 0.2, math.sin(theta)))
            grid_eye.append(ring)
        add_section(mesh_eyes, grid_eye)

    # 6. CABELO 1: SPIKY / BUZZCUT (HAIR1 MESH)
    grid_hair1 = []
    rings, segs = 12, 20
    for r in range(rings + 1):
        t = r / rings
        phi = t * math.pi * 0.55
        y = 1.66 + math.cos(phi) * 0.155
        rad = math.sin(phi) * 0.102
        ring = []
        for s in range(segs):
            theta = s * 2 * math.pi / segs
            # Adiciona picos/spikes sutis no cabelo
            spike = 0.006 * math.sin(s * 4) if t < 0.8 else 0.0
            x = (rad + spike) * math.cos(theta)
            z = (rad + spike) * math.sin(theta) + 0.01
            ring.append((x, y, z, math.cos(theta), 0.8, math.sin(theta)))
        grid_hair1.append(ring)
    add_section(mesh_hair1, grid_hair1)

    # 7. CABELO 2: CYBER DREADS / LOCKS (HAIR2 MESH)
    grid_hair2 = []
    rings, segs = 16, 24
    for r in range(rings + 1):
        t = r / rings
        y = 1.78 - t * 0.24
        rad = 0.108 + math.sin(t * math.pi) * 0.015
        ring = []
        for s in range(segs):
            theta = s * 2 * math.pi / segs
            lock_wobble = 0.012 * math.sin(theta * 6 + t * 4)
            x = (rad + lock_wobble) * math.cos(theta)
            z = (rad + lock_wobble) * math.sin(theta) + 0.015
            ring.append((x, y, z, math.cos(theta), 0.2, math.sin(theta)))
        grid_hair2.append(ring)
    add_section(mesh_hair2, grid_hair2)

    # 8. VISEIRA CYBER NEON (VISOR MESH)
    grid_visor = []
    rings, segs = 8, 16
    for r in range(rings + 1):
        t = r / rings
        y = 1.65 + (t - 0.5) * 0.045
        rad = 0.102
        ring = []
        for s in range(segs):
            # Viseira envolve a parte frontal (-PI/2.2 a PI/2.2)
            theta = -math.pi/2.2 + (s / (segs - 1)) * (math.pi * 2 / 2.2)
            x = rad * math.sin(theta)
            z = rad * math.cos(theta) + 0.012
            ring.append((x, y, z, math.sin(theta), 0.0, math.cos(theta)))
        grid_visor.append(ring)
    add_section(mesh_visor, grid_visor)

    all_meshes = [mesh_body, mesh_hair1, mesh_hair2, mesh_eyes, mesh_visor]

    # -------------------------------------------------------------------------
    # CONSTRUÇÃO DO BUFFER BINÁRIO E ESTRUTURA GLTF
    # -------------------------------------------------------------------------
    bin_buffer = bytearray()
    buffer_views = []
    accessors = []
    gltf_nodes = []
    gltf_meshes = []

    def pad4(b):
        while len(b) % 4 != 0:
            b.append(0)
        return b

    # Materiais PBR
    materials = [
        { # 0: PELE
            "name": "SkinMaterial",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.85, 0.78, 0.72, 1.0],
                "metallicFactor": 0.10,
                "roughnessFactor": 0.40
            },
            "doubleSided": True
        },
        { # 1: CABELO 1
            "name": "HairMaterial1",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.15, 0.15, 0.20, 1.0],
                "metallicFactor": 0.20,
                "roughnessFactor": 0.50
            },
            "doubleSided": True
        },
        { # 2: CABELO 2
            "name": "HairMaterial2",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.0, 0.95, 1.0, 1.0], # Cyan Cyber Locks
                "metallicFactor": 0.60,
                "roughnessFactor": 0.20
            },
            "doubleSided": True
        },
        { # 3: OLHOS
            "name": "EyesMaterial",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.0, 0.95, 1.0, 1.0],
                "metallicFactor": 0.80,
                "roughnessFactor": 0.10
            },
            "emissiveFactor": [0.0, 0.8, 1.0],
            "doubleSided": True
        },
        { # 4: VISEIRA CYBER
            "name": "VisorMaterial",
            "pbrMetallicRoughness": {
                "baseColorFactor": [1.0, 0.0, 0.5, 0.85], # Magenta Translucido
                "metallicFactor": 0.90,
                "roughnessFactor": 0.10
            },
            "emissiveFactor": [1.0, 0.0, 0.5],
            "doubleSided": True
        }
    ]

    node_indices = []

    for idx, m in enumerate(all_meshes):
        pos_b = pad4(bytearray(struct.pack(f'<{len(m["positions"])}f', *m["positions"])))
        norm_b = pad4(bytearray(struct.pack(f'<{len(m["normals"])}f', *m["normals"])))
        uv_b = pad4(bytearray(struct.pack(f'<{len(m["uvs"])}f', *m["uvs"])))
        idx_b = pad4(bytearray(struct.pack(f'<{len(m["indices"])}I', *m["indices"])))

        pos_offset = len(bin_buffer)
        bin_buffer.extend(pos_b)
        
        norm_offset = len(bin_buffer)
        bin_buffer.extend(norm_b)

        uv_offset = len(bin_buffer)
        bin_buffer.extend(uv_b)

        idx_offset = len(bin_buffer)
        bin_buffer.extend(idx_b)

        bv_pos_idx = len(buffer_views)
        buffer_views.append({"buffer": 0, "byteLength": len(pos_b), "byteOffset": pos_offset, "target": 34962})
        
        bv_norm_idx = len(buffer_views)
        buffer_views.append({"buffer": 0, "byteLength": len(norm_b), "byteOffset": norm_offset, "target": 34962})

        bv_uv_idx = len(buffer_views)
        buffer_views.append({"buffer": 0, "byteLength": len(uv_b), "byteOffset": uv_offset, "target": 34962})

        bv_idx_idx = len(buffer_views)
        buffer_views.append({"buffer": 0, "byteLength": len(idx_b), "byteOffset": idx_offset, "target": 34963})

        min_x, max_x = min(m["positions"][0::3]), max(m["positions"][0::3])
        min_y, max_y = min(m["positions"][1::3]), max(m["positions"][1::3])
        min_z, max_z = min(m["positions"][2::3]), max(m["positions"][2::3])

        acc_pos = len(accessors)
        accessors.append({"bufferView": bv_pos_idx, "byteOffset": 0, "componentType": 5126, "count": m["vertex_count"], "type": "VEC3", "min": [min_x, min_y, min_z], "max": [max_x, max_y, max_z]})

        acc_norm = len(accessors)
        accessors.append({"bufferView": bv_norm_idx, "byteOffset": 0, "componentType": 5126, "count": m["vertex_count"], "type": "VEC3"})

        acc_uv = len(accessors)
        accessors.append({"bufferView": bv_uv_idx, "byteOffset": 0, "componentType": 5126, "count": m["vertex_count"], "type": "VEC2"})

        acc_idx = len(accessors)
        accessors.append({"bufferView": bv_idx_idx, "byteOffset": 0, "componentType": 5125, "count": len(m["indices"]), "type": "SCALAR"})

        mesh_idx = len(gltf_meshes)
        gltf_meshes.append({
            "name": m["name"],
            "primitives": [{
                "attributes": {
                    "POSITION": acc_pos,
                    "NORMAL": acc_norm,
                    "TEXCOORD_0": acc_uv
                },
                "indices": acc_idx,
                "material": m["material_idx"]
            }]
        })

        node_idx = len(gltf_nodes)
        gltf_nodes.append({
            "name": m["name"],
            "mesh": mesh_idx
        })
        node_indices.append(node_idx)

    # Master Root Node
    root_node_idx = len(gltf_nodes)
    gltf_nodes.append({
        "name": "CyberAvatarRoot",
        "children": node_indices
    })

    gltf_json = {
        "asset": {"version": "2.0", "generator": "CyberCloset Multi-Mesh Avatar Generator"},
        "scene": 0,
        "scenes": [{"name": "AvatarScene", "nodes": [root_node_idx]}],
        "nodes": gltf_nodes,
        "materials": materials,
        "meshes": gltf_meshes,
        "accessors": accessors,
        "bufferViews": buffer_views,
        "buffers": [{"byteLength": len(bin_buffer)}]
    }

    json_bytes = json.dumps(gltf_json, separators=(',', ':')).encode('utf-8')
    while len(json_bytes) % 4 != 0:
        json_bytes += b' '

    magic = 0x46546C67
    version = 2
    total_length = 12 + 8 + len(json_bytes) + 8 + len(bin_buffer)

    header = struct.pack('<III', magic, version, total_length)
    chunk0_header = struct.pack('<II', len(json_bytes), 0x4E4F534A)
    chunk1_header = struct.pack('<II', len(bin_buffer), 0x004E4942)

    glb_bytes = header + chunk0_header + json_bytes + chunk1_header + bin_buffer

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'wb') as f:
        f.write(glb_bytes)

    print(f"Sucesso! Modelo GLB estendido exportado em: {output_path} ({len(glb_bytes)} bytes)")

if __name__ == '__main__':
    target1 = os.path.join("assets", "modelos3d", "avatares", "avatar-base.glb")
    target2 = os.path.join("assets", "avatar", "avatar-base.glb")
    create_human_avatar_glb(target1)
    create_human_avatar_glb(target2)
