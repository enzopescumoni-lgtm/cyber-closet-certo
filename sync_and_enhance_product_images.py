import os
import re

# Read app.js and find all image paths in PRODUCTS array
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all "imagem": "assets/produtos/..."
matches = re.findall(r'imagem:\s*["\']([^"\']+)["\']', content)
print(f"Found {len(matches)} image references in app.js:")

missing = 0
for path in matches:
    full_path = os.path.normpath(path)
    if not os.path.exists(full_path):
        print(f"MISSING: {full_path}")
        missing += 1
    else:
        # Also copy to public/ directory for Next.js compatibility
        pub_path = os.path.normpath(path.replace('assets/', 'public/'))
        os.makedirs(os.path.dirname(pub_path), exist_ok=True)
        with open(full_path, 'r', encoding='utf-8') as src, open(pub_path, 'w', encoding='utf-8') as dst:
            dst.write(src.read())

if missing == 0:
    print("All product images exist and are synced to public/produtos/ successfully!")
else:
    print(f"Found {missing} missing image paths!")
