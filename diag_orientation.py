import json
import struct

def inspect_glb(path):
    print(f"=== INSPEÇÃO DE ORIENTAÇÃO DO ARQUIVO GLB: {path} ===")
    with open(path, 'rb') as f:
        data = f.read()

    magic, version, length = struct.unpack('<III', data[:12])
    json_len, json_type = struct.unpack('<II', data[12:20])
    json_data = json.loads(data[20:20+json_len].decode('utf-8'))

    print("Nodes na cena glTF:")
    for idx, node in enumerate(json_data.get('nodes', [])):
        name = node.get('name', f'Node_{idx}')
        rot = node.get('rotation', None)
        scale = node.get('scale', None)
        trans = node.get('translation', None)
        print(f"  - Node {idx}: '{name}' | Translation: {trans} | Rotation: {rot} | Scale: {scale}")

    accessors = json_data.get('accessors', [])
    if accessors:
        pos_acc = accessors[0] # Position accessor
        print(f"Position Accessor 0 (BBox): Min={pos_acc.get('min')} | Max={pos_acc.get('max')}")

if __name__ == '__main__':
    inspect_glb('assets/modelos3d/avatares/avatar-v3-stylized.glb')
