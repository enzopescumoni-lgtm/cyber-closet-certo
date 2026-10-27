import os

dirs = [
    'assets/produtos/camisetas',
    'assets/produtos/jeans',
    'assets/produtos/shorts',
    'assets/produtos/conjuntos',
    'assets/produtos/tenis',
    'assets/produtos/chinelos',
    'assets/produtos/moletons'
]

for d in dirs:
    os.makedirs(d, exist_ok=True)

# Generate SVG files for each category
svg_templates = {
    'assets/produtos/camisetas/camiseta-branca.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M120 100 L160 80 L240 80 L280 100 L330 140 L290 190 L260 170 L260 320 L140 320 L140 170 L110 190 L70 140 Z" fill="#f8fafc" stroke="#00f3ff" stroke-width="3"/>
  <path d="M160 80 C180 110, 220 110, 240 80" fill="none" stroke="#0b0e1b" stroke-width="4"/>
  <rect x="180" y="160" width="40" height="20" fill="#00f3ff" rx="4" opacity="0.8"/>
</svg>''',

    'assets/produtos/camisetas/camiseta-preta.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M120 100 L160 80 L240 80 L280 100 L330 140 L290 190 L260 170 L260 320 L140 320 L140 170 L110 190 L70 140 Z" fill="#151828" stroke="#ff007f" stroke-width="3"/>
  <path d="M160 80 C180 110, 220 110, 240 80" fill="none" stroke="#0b0e1b" stroke-width="4"/>
  <circle cx="200" cy="180" r="16" fill="none" stroke="#ff007f" stroke-width="4"/>
</svg>''',

    'assets/produtos/jeans/jeans-azul.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M130 90 L270 90 L260 330 L205 330 L200 170 L195 330 L140 330 Z" fill="#2563eb" stroke="#00f3ff" stroke-width="3"/>
  <rect x="150" y="105" width="30" height="15" fill="#1d4ed8" rx="2"/>
  <rect x="220" y="105" width="30" height="15" fill="#1d4ed8" rx="2"/>
</svg>''',

    'assets/produtos/jeans/jeans-preto.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M130 90 L270 90 L260 330 L205 330 L200 170 L195 330 L140 330 Z" fill="#1e293b" stroke="#ff007f" stroke-width="3"/>
  <rect x="150" y="105" width="30" height="15" fill="#0f172a" rx="2"/>
  <rect x="220" y="105" width="30" height="15" fill="#0f172a" rx="2"/>
</svg>''',

    'assets/produtos/shorts/shorts-cargo.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M130 110 L270 110 L265 260 L205 260 L200 170 L195 260 L135 260 Z" fill="#1e293b" stroke="#00f3ff" stroke-width="3"/>
  <rect x="120" y="170" width="25" height="45" fill="#334155" rx="4"/>
  <rect x="255" y="170" width="25" height="45" fill="#334155" rx="4"/>
</svg>''',

    'assets/produtos/shorts/shorts-jeans.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M130 110 L270 110 L265 250 L205 250 L200 170 L195 250 L135 250 Z" fill="#3b82f6" stroke="#00f3ff" stroke-width="3"/>
</svg>''',

    'assets/produtos/conjuntos/conjunto-cinza.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <!-- Hoodie Top -->
  <path d="M130 70 L160 50 L240 50 L270 70 L310 110 L280 150 L250 135 L250 200 L150 200 L150 135 L120 150 L90 110 Z" fill="#475569" stroke="#00f3ff" stroke-width="3"/>
  <!-- Pants -->
  <path d="M155 210 L245 210 L240 340 L203 340 L200 250 L197 340 L160 340 Z" fill="#334155" stroke="#00f3ff" stroke-width="3"/>
</svg>''',

    'assets/produtos/conjuntos/conjunto-preto.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M130 70 L160 50 L240 50 L270 70 L310 110 L280 150 L250 135 L250 200 L150 200 L150 135 L120 150 L90 110 Z" fill="#0f172a" stroke="#ff007f" stroke-width="3"/>
  <path d="M155 210 L245 210 L240 340 L203 340 L200 250 L197 340 L160 340 Z" fill="#1e293b" stroke="#ff007f" stroke-width="3"/>
</svg>''',

    'assets/produtos/tenis/tenis-branco.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M80 230 C90 160, 160 160, 200 180 L280 190 C330 200, 340 250, 340 260 L70 260 Z" fill="#f8fafc" stroke="#00f3ff" stroke-width="3"/>
  <rect x="70" y="260" width="270" height="25" fill="#e2e8f0" rx="5"/>
  <path d="M180 190 L240 210" stroke="#00f3ff" stroke-width="4"/>
</svg>''',

    'assets/produtos/tenis/tenis-preto.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M80 230 C90 160, 160 160, 200 180 L280 190 C330 200, 340 250, 340 260 L70 260 Z" fill="#0f172a" stroke="#ff007f" stroke-width="3"/>
  <rect x="70" y="260" width="270" height="25" fill="#334155" rx="5"/>
  <path d="M180 190 L240 210" stroke="#ff007f" stroke-width="4"/>
</svg>''',

    'assets/produtos/chinelos/chinelo-preto.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <ellipse cx="200" cy="220" rx="60" ry="110" fill="#1e293b" stroke="#00f3ff" stroke-width="3"/>
  <path d="M140 200 C170 170, 230 170, 260 200" fill="none" stroke="#00f3ff" stroke-width="12" stroke-linecap="round"/>
</svg>''',

    'assets/produtos/moletons/moletom-oversized.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#0b0e1b" rx="20"/>
  <path d="M110 90 L160 60 L240 60 L290 90 L340 140 L290 200 L260 180 L260 330 L140 330 L140 180 L110 200 L60 140 Z" fill="#334155" stroke="#9d4edd" stroke-width="3"/>
  <!-- Hoodie Pocket -->
  <path d="M160 240 L240 240 L250 290 L150 290 Z" fill="#1e293b" stroke="#9d4edd" stroke-width="2"/>
</svg>'''
}

for path, content in svg_templates.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Created product SVG images successfully!")
