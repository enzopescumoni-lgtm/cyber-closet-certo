import struct
import json
import os

os.makedirs('assets/models', exist_ok=True)

# Define vertices & indices for a 3D avatar figure box/mesh
vertices = [
    # Head & Torso Box
    -0.2, 0.0, 0.2,  0.2, 0.0, 0.2,  0.2, 1.8, 0.2, -0.2, 1.8, 0.2,
    -0.2, 0.0, -0.2, 0.2, 0.0, -0.2, 0.2, 1.8, -0.2, -0.2, 1.8, -0.2,
]
indices = [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    4, 0, 3, 4, 3, 7,
    1, 5, 6, 1, 6, 2,
    3, 2, 6, 3, 6, 7,
    4, 5, 1, 4, 1, 0
]

v_bytes = b''.join(struct.pack('<fff', *vertices[i:i+3]) for i in range(0, len(vertices), 3))
i_bytes = b''.join(struct.pack('<H', idx) for idx in indices)

while len(v_bytes) % 4 != 0: v_bytes += b'\x00'
while len(i_bytes) % 4 != 0: i_bytes += b'\x00'

bin_buffer = v_bytes + i_bytes

gltf_json = {
    "asset": {"version": "2.0", "generator": "CyberClosetGLBGen"},
    "scene": 0,
    "scenes": [{"nodes": [0]}],
    "nodes": [{"mesh": 0, "name": "CyberAvatarMesh"}],
    "meshes": [{
        "name": "AvatarMesh",
        "primitives": [{
            "attributes": {"POSITION": 0},
            "indices": 1,
            "mode": 4
        }]
    }],
    "buffers": [{"byteLength": len(bin_buffer)}],
    "bufferViews": [
        {"buffer": 0, "byteOffset": 0, "byteLength": len(v_bytes), "target": 34962},
        {"buffer": 0, "byteOffset": len(v_bytes), "byteLength": len(i_bytes), "target": 34963}
    ],
    "accessors": [
        {"bufferView": 0, "byteOffset": 0, "componentType": 5126, "count": len(vertices)//3, "type": "VEC3", "max": [0.2, 1.8, 0.2], "min": [-0.2, 0.0, -0.2]},
        {"bufferView": 1, "byteOffset": 0, "componentType": 5123, "count": len(indices), "type": "SCALAR", "max": [7], "min": [0]}
    ]
}

json_str = json.dumps(gltf_json).encode('utf-8')
while len(json_str) % 4 != 0: json_str += b' '

header = struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(json_str) + 8 + len(bin_buffer))
json_chunk = struct.pack('<I4s', len(json_str), b'JSON') + json_str
bin_chunk = struct.pack('<I4s', len(bin_buffer), b'BIN\x00') + bin_buffer

glb_file_path = os.path.join('assets', 'models', 'avatar.glb')
with open(glb_file_path, 'wb') as f:
    f.write(header + json_chunk + bin_chunk)

print("Created avatar.glb successfully!")
