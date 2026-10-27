import os

# Subdirectories
dirs = [
    'assets/produtos/camisetas',
    'assets/produtos/camisas',
    'assets/produtos/moletons',
    'assets/produtos/jaquetas',
    'assets/produtos/conjuntos',
    'assets/produtos/shorts',
    'assets/produtos/calcas',
    'assets/produtos/jeans',
    'assets/produtos/tenis',
    'assets/produtos/chinelos',
    'assets/produtos/acessorios'
]

for d in dirs:
    os.makedirs(d, exist_ok=True)

# Helper function to generate clean studio-style SVGs
def create_studio_svg(filename, bg_color="#0d1124", stroke_color="#00f3ff", fill_color="#182038", shape_type="top", accent_color="#9d4edd"):
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="{bg_color}" rx="20"/>
  <circle cx="200" cy="200" r="140" fill="rgba(255,255,255,0.02)" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.5))"/>
'''
    if shape_type == "top":
        svg_content += f'''
  <path d="M120 100 L160 80 L240 80 L280 100 L330 140 L290 190 L260 170 L260 320 L140 320 L140 170 L110 190 L70 140 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <path d="M160 80 C180 110, 220 110, 240 80" fill="none" stroke="{accent_color}" stroke-width="5"/>
  <rect x="175" y="165" width="50" height="22" fill="{accent_color}" rx="4" opacity="0.85"/>
'''
    elif shape_type == "jacket":
        svg_content += f'''
  <path d="M110 90 L160 60 L240 60 L290 90 L340 140 L290 200 L260 180 L260 330 L140 330 L140 180 L110 200 L60 140 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <line x1="200" y1="60" x2="200" y2="330" stroke="{accent_color}" stroke-width="5"/>
  <rect x="150" y="240" width="100" height="60" fill="rgba(255,255,255,0.05)" stroke="{stroke_color}" stroke-width="2" rx="6"/>
'''
    elif shape_type == "pants":
        svg_content += f'''
  <path d="M130 90 L270 90 L260 330 L205 330 L200 170 L195 330 L140 330 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <rect x="145" y="105" width="35" height="18" fill="{accent_color}" rx="3"/>
  <rect x="220" y="105" width="35" height="18" fill="{accent_color}" rx="3"/>
'''
    elif shape_type == "shorts":
        svg_content += f'''
  <path d="M130 110 L270 110 L265 260 L205 260 L200 170 L195 260 L135 260 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <rect x="120" y="170" width="30" height="50" fill="{accent_color}" rx="4" opacity="0.8"/>
  <rect x="250" y="170" width="30" height="50" fill="{accent_color}" rx="4" opacity="0.8"/>
'''
    elif shape_type == "shoes":
        svg_content += f'''
  <path d="M80 230 C90 160, 160 160, 200 180 L280 190 C330 200, 340 250, 340 260 L70 260 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <rect x="70" y="260" width="270" height="25" fill="#f8fafc" rx="5"/>
  <path d="M170 185 L230 205" stroke="{accent_color}" stroke-width="5" stroke-linecap="round"/>
'''
    elif shape_type == "slides":
        svg_content += f'''
  <ellipse cx="200" cy="220" rx="65" ry="115" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <path d="M135 200 C165 165, 235 165, 265 200" fill="none" stroke="{accent_color}" stroke-width="14" stroke-linecap="round"/>
'''
    elif shape_type == "accessory":
        svg_content += f'''
  <path d="M120 220 C120 140, 280 140, 280 220" fill="none" stroke="{stroke_color}" stroke-width="16" stroke-linecap="round"/>
  <rect x="140" y="220" width="120" height="25" fill="{accent_color}" rx="5"/>
'''
    elif shape_type == "outfit":
        svg_content += f'''
  <path d="M130 65 L160 45 L240 45 L270 65 L310 105 L280 145 L250 130 L250 195 L150 195 L150 130 L120 145 L90 105 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/>
  <path d="M155 205 L245 205 L240 335 L203 335 L200 245 L197 335 L160 335 Z" fill="{fill_color}" stroke="{accent_color}" stroke-width="4"/>
'''

    svg_content += '\n</svg>'
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(svg_content)

# Generate 42 Product SVGs
products_to_gen = [
    # Camisetas
    ('assets/produtos/camisetas/camiseta-essential-branca.svg', 'top', '#0d1124', '#00f3ff', '#f8fafc', '#9d4edd'),
    ('assets/produtos/camisetas/camiseta-oversized-preta.svg', 'top', '#0d1124', '#ff007f', '#181b2c', '#00f3ff'),
    ('assets/produtos/camisetas/camiseta-neon-street-cinza.svg', 'top', '#0d1124', '#00ff88', '#334155', '#ff007f'),
    ('assets/produtos/camisetas/camiseta-urban-core-bege.svg', 'top', '#0d1124', '#ffb703', '#d4a373', '#00f3ff'),
    ('assets/produtos/camisetas/camiseta-cybr-graph-azul.svg', 'top', '#0d1124', '#00f3ff', '#1e3a8a', '#ff007f'),
    ('assets/produtos/camisetas/camiseta-nova-wear-verde.svg', 'top', '#0d1124', '#00ff88', '#064e3b', '#ffb703'),

    # Camisas
    ('assets/produtos/camisas/camisa-street-manga-curta-preta.svg', 'top', '#0d1124', '#00f3ff', '#0f172a', '#9d4edd'),
    ('assets/produtos/camisas/camisa-over-linho-branca.svg', 'top', '#0d1124', '#ff007f', '#f1f5f9', '#00f3ff'),
    ('assets/produtos/camisas/camisa-tactical-urban-verde.svg', 'top', '#0d1124', '#00ff88', '#14532d', '#9d4edd'),
    ('assets/produtos/camisas/camisa-bowling-neon-roxo.svg', 'top', '#0d1124', '#9d4edd', '#2e1065', '#00f3ff'),

    # Moletons
    ('assets/produtos/moletons/moletom-oversized-preto.svg', 'top', '#0d1124', '#9d4edd', '#090d16', '#ff007f'),
    ('assets/produtos/moletons/moletom-hoodie-cinza-mescla.svg', 'top', '#0d1124', '#00f3ff', '#475569', '#9d4edd'),
    ('assets/produtos/moletons/moletom-cybr-matrix-bege.svg', 'top', '#0d1124', '#ffb703', '#e6ccb2', '#00f3ff'),
    ('assets/produtos/moletons/moletom-crewneck-urban-azul.svg', 'top', '#0d1124', '#00f3ff', '#1d4ed8', '#ff007f'),
    ('assets/produtos/moletons/moletom-zip-tech-preto.svg', 'top', '#0d1124', '#00ff88', '#111827', '#9d4edd'),

    # Jaquetas
    ('assets/produtos/jaquetas/jaqueta-puffer-preta.svg', 'jacket', '#0d1124', '#00f3ff', '#0b0f19', '#ff007f'),
    ('assets/produtos/jaquetas/jaqueta-jeans-azul.svg', 'jacket', '#0d1124', '#00f3ff', '#2563eb', '#ffb703'),
    ('assets/produtos/jaquetas/jaqueta-corta-vento-neon.svg', 'jacket', '#0d1124', '#ff007f', '#161b2e', '#00ff88'),
    ('assets/produtos/jaquetas/jaqueta-varsity-urban-verde.svg', 'jacket', '#0d1124', '#00ff88', '#065f46', '#9d4edd'),

    # Conjuntos
    ('assets/produtos/conjuntos/conjunto-street-preto.svg', 'outfit', '#0d1124', '#ff007f', '#0f172a', '#00f3ff'),
    ('assets/produtos/conjuntos/conjunto-moletom-bege.svg', 'outfit', '#0d1124', '#ffb703', '#ddb892', '#9d4edd'),
    ('assets/produtos/conjuntos/conjunto-techwear-cinza.svg', 'outfit', '#0d1124', '#00f3ff', '#334155', '#ff007f'),
    ('assets/produtos/conjuntos/conjunto-summer-cyber-azul.svg', 'outfit', '#0d1124', '#00ff88', '#1e40af', '#ffb703'),
    ('assets/produtos/conjuntos/conjunto-tactical-verde.svg', 'outfit', '#0d1124', '#9d4edd', '#166534', '#00f3ff'),

    # Shorts
    ('assets/produtos/shorts/shorts-cargo-preto.svg', 'shorts', '#0d1124', '#00f3ff', '#111827', '#9d4edd'),
    ('assets/produtos/shorts/shorts-jeans-azul.svg', 'shorts', '#0d1124', '#00f3ff', '#3b82f6', '#ff007f'),
    ('assets/produtos/shorts/shorts-fleece-cinza.svg', 'shorts', '#0d1124', '#ff007f', '#64748b', '#00f3ff'),
    ('assets/produtos/shorts/shorts-nylon-neon-verde.svg', 'shorts', '#0d1124', '#00ff88', '#059669', '#ffb703'),
    ('assets/produtos/shorts/shorts-urban-bege.svg', 'shorts', '#0d1124', '#ffb703', '#e6ccb2', '#9d4edd'),

    # Calças
    ('assets/produtos/calcas/calca-cargo-preta.svg', 'pants', '#0d1124', '#00f3ff', '#0f172a', '#9d4edd'),
    ('assets/produtos/calcas/calca-jogger-cinza.svg', 'pants', '#0d1124', '#ff007f', '#475569', '#00f3ff'),
    ('assets/produtos/calcas/calca-tactical-verde.svg', 'pants', '#0d1124', '#00ff88', '#14532d', '#ffb703'),
    ('assets/produtos/calcas/calca-relaxed-bege.svg', 'pants', '#0d1124', '#ffb703', '#b08968', '#9d4edd'),

    # Jeans
    ('assets/produtos/jeans/jeans-baggy-azul.svg', 'pants', '#0d1124', '#00f3ff', '#2563eb', '#ff007f'),
    ('assets/produtos/jeans/jeans-straight-preto.svg', 'pants', '#0d1124', '#ff007f', '#1e293b', '#00f3ff'),
    ('assets/produtos/jeans/jeans-wide-leg-cinza.svg', 'pants', '#0d1124', '#9d4edd', '#334155', '#00ff88'),
    ('assets/produtos/jeans/jeans-cargo-azul-escuro.svg', 'pants', '#0d1124', '#00f3ff', '#1e3a8a', '#ffb703'),

    # Tênis
    ('assets/produtos/tenis/tenis-street-branco.svg', 'shoes', '#0d1124', '#00f3ff', '#f8fafc', '#9d4edd'),
    ('assets/produtos/tenis/tenis-running-preto.svg', 'shoes', '#0d1124', '#ff007f', '#0f172a', '#00f3ff'),
    ('assets/produtos/tenis/tenis-casual-bege.svg', 'shoes', '#0d1124', '#ffb703', '#e6ccb2', '#9d4edd'),
    ('assets/produtos/tenis/tenis-cyber-neon-ciano.svg', 'shoes', '#0d1124', '#00f3ff', '#161b2e', '#00ff88'),
    ('assets/produtos/tenis/tenis-high-top-preto-rosa.svg', 'shoes', '#0d1124', '#ff007f', '#1e1b2e', '#ff007f'),
    ('assets/produtos/tenis/tenis-skate-cinza.svg', 'shoes', '#0d1124', '#00ff88', '#475569', '#00f3ff'),
    ('assets/produtos/tenis/tenis-chunky-branco.svg', 'shoes', '#0d1124', '#00f3ff', '#f1f5f9', '#ffb703'),
    ('assets/produtos/tenis/tenis-runner-matrix-verde.svg', 'shoes', '#0d1124', '#00ff88', '#064e3b', '#00f3ff'),

    # Chinelos
    ('assets/produtos/chinelos/chinelo-slide-preto.svg', 'slides', '#0d1124', '#00f3ff', '#0f172a', '#9d4edd'),
    ('assets/produtos/chinelos/chinelo-essential-branco.svg', 'slides', '#0d1124', '#ff007f', '#f8fafc', '#00f3ff'),
    ('assets/produtos/chinelos/chinelo-cyber-neon-verde.svg', 'slides', '#0d1124', '#00ff88', '#111827', '#00ff88'),

    # Acessórios
    ('assets/produtos/acessorios/bone-heritage-preto.svg', 'accessory', '#0d1124', '#00f3ff', '#0f172a', '#9d4edd'),
    ('assets/produtos/acessorios/oculos-visor-neon-ar.svg', 'accessory', '#0d1124', '#ff007f', '#181b2e', '#00f3ff')
]

for filename, stype, bg, stroke, fill, accent in products_to_gen:
    create_studio_svg(filename, stype, bg, stroke, fill, accent)

print(f"Generated {len(products_to_gen)} studio-quality product SVGs successfully!")
