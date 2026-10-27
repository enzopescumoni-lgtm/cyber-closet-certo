import os

# Ensure directories exist in both assets and public
dirs = [
    'camisetas', 'camisas', 'moletons', 'jaquetas', 'conjuntos',
    'shorts', 'calcas', 'jeans', 'tenis', 'chinelos', 'acessorios'
]

for base in ['assets/produtos', 'public/produtos']:
    for d in dirs:
        os.makedirs(os.path.join(base, d), exist_ok=True)

def generate_custom_svg(filename, category, name, brand, primary_color, accent_color, bg_gradient):
    # Studio lighting & card background
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="studioGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="{bg_gradient[0]}" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="{bg_gradient[1]}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#050711"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="15" flood-color="#000000" flood-opacity="0.6"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="{accent_color}" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="neonGloss" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{accent_color}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#00f3ff" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Background Studio Box -->
  <rect width="500" height="500" rx="24" fill="url(#studioGlow)"/>
  
  <!-- Studio Circular Podium Light -->
  <ellipse cx="250" cy="410" rx="160" ry="40" fill="rgba(0,243,255,0.03)" filter="drop-shadow(0 0 20px {accent_color})"/>
  <ellipse cx="250" cy="410" rx="120" ry="25" fill="none" stroke="{accent_color}" stroke-width="1.5" opacity="0.4"/>
'''

    # Shape Rendering based on category
    if category == "camisetas":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- T-Shirt Body -->
    <path d="M150 120 L200 90 L300 90 L350 120 L410 170 L360 230 L320 200 L320 400 L180 400 L180 200 L140 230 L90 170 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Collar -->
    <path d="M200 90 C225 125, 275 125, 300 90" fill="none" stroke="{accent_color}" stroke-width="4.5"/>
    <!-- Sleeve Seams -->
    <line x1="150" y1="120" x2="180" y2="200" stroke="rgba(255,255,255,0.15)" stroke-width="2.5"/>
    <line x1="350" y1="120" x2="320" y2="200" stroke="rgba(255,255,255,0.15)" stroke-width="2.5"/>
    <!-- Brand Graphic Logo -->
    <rect x="215" y="210" width="70" height="28" rx="6" fill="url(#neonGloss)"/>
    <text x="250" y="229" font-family="sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">{brand[:6].upper()}</text>
  </g>
'''

    elif category == "camisas":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Button Shirt Body -->
    <path d="M140 120 L190 85 L310 85 L360 120 L420 170 L370 230 L330 200 L330 400 L170 400 L170 200 L130 230 L80 170 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Collar Collar Flaps -->
    <polygon points="190,85 230,140 250,95 270,140 310,85 250,115" fill="{primary_color}" stroke="{accent_color}" stroke-width="3"/>
    <!-- Button Placket line -->
    <line x1="250" y1="115" x2="250" y2="400" stroke="{accent_color}" stroke-width="3"/>
    <!-- Buttons -->
    <circle cx="250" cy="160" r="4" fill="{accent_color}"/>
    <circle cx="250" cy="220" r="4" fill="{accent_color}"/>
    <circle cx="250" cy="280" r="4" fill="{accent_color}"/>
    <circle cx="250" cy="340" r="4" fill="{accent_color}"/>
    <!-- Pocket -->
    <rect x="190" y="180" width="45" height="50" rx="4" fill="rgba(255,255,255,0.05)" stroke="{accent_color}" stroke-width="2"/>
  </g>
'''

    elif category == "moletons":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Hoodie Base -->
    <path d="M140 130 L180 80 L320 80 L360 130 L430 185 L380 245 L330 215 L330 380 L170 380 L170 215 L120 245 L70 185 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Hood shape -->
    <path d="M180 80 C200 45, 300 45, 320 80 C290 120, 210 120, 180 80 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3"/>
    <!-- Drawstrings -->
    <path d="M220 110 L215 170" fill="none" stroke="{accent_color}" stroke-width="4" stroke-linecap="round"/>
    <path d="M280 110 L285 170" fill="none" stroke="{accent_color}" stroke-width="4" stroke-linecap="round"/>
    <!-- Kangaroo Pocket -->
    <path d="M200 290 L300 290 L320 370 L180 370 Z" fill="rgba(255,255,255,0.06)" stroke="{accent_color}" stroke-width="2.5"/>
    <!-- Ribbed Cuffs -->
    <rect x="170" y="380" width="160" height="25" rx="3" fill="{primary_color}" stroke="{accent_color}" stroke-width="2"/>
  </g>
'''

    elif category == "jaquetas":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Jacket Body -->
    <path d="M130 120 L180 75 L320 75 L370 120 L440 175 L390 240 L340 210 L340 400 L160 400 L160 210 L110 240 L60 175 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Center Zip -->
    <line x1="250" y1="75" x2="250" y2="400" stroke="{accent_color}" stroke-width="5"/>
    <!-- Zipper Pull -->
    <rect x="244" y="160" width="12" height="20" rx="3" fill="#ffffff"/>
    <!-- Puffer Quilting Lines -->
    <line x1="160" y1="160" x2="340" y2="160" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
    <line x1="160" y1="240" x2="340" y2="240" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
    <line x1="160" y1="320" x2="340" y2="320" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
    <!-- High Collar -->
    <rect x="200" y="55" width="100" height="25" rx="4" fill="{primary_color}" stroke="{accent_color}" stroke-width="2.5"/>
  </g>
'''

    elif category == "conjuntos":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Top Hoodie Outfit -->
    <path d="M150 70 L190 50 L310 50 L350 70 L400 110 L360 160 L320 140 L320 220 L180 220 L180 140 L140 160 L100 110 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3"/>
    <!-- Pants Outfit -->
    <path d="M190 230 L310 230 L300 410 L255 410 L250 300 L245 410 L200 410 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="3"/>
    <!-- Accent Line -->
    <line x1="250" y1="50" x2="250" y2="220" stroke="{accent_color}" stroke-width="3"/>
    <line x1="200" y1="230" x2="200" y2="410" stroke="{accent_color}" stroke-width="2"/>
    <line x1="300" y1="230" x2="300" y2="410" stroke="{accent_color}" stroke-width="2"/>
  </g>
'''

    elif category == "shorts":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Shorts Body -->
    <path d="M150 120 L350 120 L340 330 L260 330 L250 210 L240 330 L160 330 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="4" stroke-linejoin="round"/>
    <!-- Elastic Waistband -->
    <rect x="150" y="120" width="200" height="30" fill="rgba(255,255,255,0.08)" stroke="{accent_color}" stroke-width="2.5"/>
    <!-- Drawstring -->
    <path d="M235 150 L230 190" stroke="{accent_color}" stroke-width="4" stroke-linecap="round"/>
    <path d="M265 150 L270 190" stroke="{accent_color}" stroke-width="4" stroke-linecap="round"/>
    <!-- Cargo Side Pockets -->
    <rect x="145" y="200" width="40" height="60" rx="6" fill="rgba(255,255,255,0.08)" stroke="{accent_color}" stroke-width="2.5"/>
    <rect x="315" y="200" width="40" height="60" rx="6" fill="rgba(255,255,255,0.08)" stroke="{accent_color}" stroke-width="2.5"/>
  </g>
'''

    elif category in ["calcas", "jeans"]:
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Pants / Jeans Body -->
    <path d="M160 100 L340 100 L330 420 L260 420 L250 220 L240 420 L170 420 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="4" stroke-linejoin="round"/>
    <!-- Waistband -->
    <rect x="160" y="100" width="180" height="28" fill="rgba(255,255,255,0.08)" stroke="{accent_color}" stroke-width="2.5"/>
    <!-- Belt Loops -->
    <rect x="180" y="96" width="12" height="36" rx="2" fill="{accent_color}"/>
    <rect x="244" y="96" width="12" height="36" rx="2" fill="{accent_color}"/>
    <rect x="308" y="96" width="12" height="36" rx="2" fill="{accent_color}"/>
    <!-- Front Pockets -->
    <path d="M160 128 C190 128, 200 160, 200 180" fill="none" stroke="{accent_color}" stroke-width="3"/>
    <path d="M340 128 C310 128, 300 160, 300 180" fill="none" stroke="{accent_color}" stroke-width="3"/>
  </g>
'''

    elif category == "tenis":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Sneaker Silhouette -->
    <path d="M90 280 C100 180, 190 180, 240 210 L350 220 C420 230, 440 290, 440 330 L80 330 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="4" stroke-linejoin="round"/>
    <!-- Thick Rubber Outsole -->
    <rect x="80" y="330" width="360" height="35" rx="8" fill="#f8fafc" stroke="{accent_color}" stroke-width="2.5"/>
    <!-- Sole Tread Detail -->
    <line x1="80" y1="348" x2="440" y2="348" stroke="{accent_color}" stroke-width="2" stroke-dasharray="8 6"/>
    <!-- Heel Counter Overlay -->
    <path d="M90 280 C100 240, 140 240, 150 330 Z" fill="rgba(255,255,255,0.12)" stroke="{accent_color}" stroke-width="2"/>
    <!-- Laces Eyestay -->
    <path d="M210 210 L300 235" stroke="{accent_color}" stroke-width="6" stroke-linecap="round"/>
    <path d="M220 235 L310 260" stroke="{accent_color}" stroke-width="6" stroke-linecap="round"/>
    <path d="M230 260 L320 285" stroke="{accent_color}" stroke-width="6" stroke-linecap="round"/>
    <!-- Side Stripe Accent -->
    <path d="M160 300 Q260 240 380 295" fill="none" stroke="{accent_color}" stroke-width="7" stroke-linecap="round"/>
  </g>
'''

    elif category == "chinelos":
        svg += f'''
  <g filter="url(#softShadow)">
    <!-- Footbed Sole -->
    <ellipse cx="250" cy="270" rx="90" ry="150" fill="{primary_color}" stroke="{accent_color}" stroke-width="4.5"/>
    <!-- Slide Upper Strap -->
    <path d="M165 240 C200 185, 300 185, 335 240 L345 285 C295 240, 205 240, 155 285 Z" fill="{accent_color}" stroke="#ffffff" stroke-width="2.5"/>
    <!-- Brand Emboss on Strap -->
    <text x="250" y="250" font-family="sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="3">{brand.upper()}</text>
  </g>
'''

    elif category == "acessorios":
        if "bone" in filename or "cap" in name.lower():
            svg += f'''
  <g filter="url(#softShadow)">
    <!-- Cap Crown -->
    <path d="M140 280 C140 160, 360 160, 360 280 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="4"/>
    <!-- Visor / Bill -->
    <path d="M120 280 Q250 320 420 270 Q250 340 120 280 Z" fill="{accent_color}" stroke="#ffffff" stroke-width="2.5"/>
    <!-- Button Top -->
    <circle cx="250" cy="165" r="10" fill="{accent_color}"/>
    <!-- Front Patch Logo -->
    <rect x="210" y="205" width="80" height="40" rx="8" fill="rgba(255,255,255,0.1)" stroke="{accent_color}" stroke-width="2"/>
    <text x="250" y="230" font-family="sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">{brand.upper()}</text>
  </g>
'''
        else: # Visor / Glasses
            svg += f'''
  <g filter="url(#softShadow)">
    <!-- Cyber Visor Frame -->
    <path d="M100 220 L400 220 L370 290 L130 290 Z" fill="{primary_color}" stroke="{accent_color}" stroke-width="4.5" opacity="0.9"/>
    <!-- Lens Glow -->
    <polygon points="110,225 390,225 365,285 135,285" fill="url(#neonGloss)"/>
    <!-- Nose Bridge -->
    <rect x="235" y="280" width="30" height="20" rx="4" fill="{accent_color}"/>
    <!-- Temples Arms -->
    <line x1="100" y1="225" x2="60" y2="245" stroke="{accent_color}" stroke-width="6" stroke-linecap="round"/>
    <line x1="400" y1="225" x2="440" y2="245" stroke="{accent_color}" stroke-width="6" stroke-linecap="round"/>
  </g>
'''

    # Close SVG
    svg += '\n</svg>'

    # Save to assets and public
    for b in ['assets/produtos', 'public/produtos']:
        path = os.path.join(b, category, filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(svg)

# All 42 Items Dataset Generator with exact colors
all_items = [
    # Camisetas
    ('camiseta-essential-branca.svg', 'camisetas', 'Camiseta Essential Branca', 'Cyber Closet', '#f8fafc', '#9d4edd', ['#141936', '#090c1e']),
    ('camiseta-oversized-preta.svg', 'camisetas', 'Camiseta Oversized Preta', 'CYBR', '#11162b', '#00f3ff', ['#141936', '#090c1e']),
    ('camiseta-neon-street-cinza.svg', 'camisetas', 'Camiseta Neon Street Cinza', 'Neon Street', '#334155', '#ff007f', ['#141936', '#090c1e']),
    ('camiseta-urban-core-bege.svg', 'camisetas', 'Camiseta Urban Core Bege', 'Urban Core', '#d4a373', '#ffb703', ['#141936', '#090c1e']),
    ('camiseta-cybr-graph-azul.svg', 'camisetas', 'Camiseta CYBR Graph Azul', 'CYBR', '#1e3a8a', '#00f3ff', ['#141936', '#090c1e']),
    ('camiseta-nova-wear-verde.svg', 'camisetas', 'Camiseta Nova Wear Verde', 'Nova Wear', '#064e3b', '#00ff88', ['#141936', '#090c1e']),

    # Camisas
    ('camisa-street-manga-curta-preta.svg', 'camisas', 'Camisa Street Manga Curta Preta', 'CYBR', '#0f172a', '#00f3ff', ['#141936', '#090c1e']),
    ('camisa-over-linho-branca.svg', 'camisas', 'Camisa Over Linho Branca', 'Nova Wear', '#f1f5f9', '#ff007f', ['#141936', '#090c1e']),
    ('camisa-tactical-urban-verde.svg', 'camisas', 'Camisa Tactical Urban Verde', 'Urban Core', '#14532d', '#00ff88', ['#141936', '#090c1e']),
    ('camisa-bowling-neon-roxo.svg', 'camisas', 'Camisa Bowling Neon Roxo', 'Neon Street', '#2e1065', '#9d4edd', ['#141936', '#090c1e']),

    # Moletons
    ('moletom-oversized-preto.svg', 'moletons', 'Moletom Oversized Preto', 'Cyber Closet', '#090d16', '#ff007f', ['#141936', '#090c1e']),
    ('moletom-hoodie-cinza-mescla.svg', 'moletons', 'Moletom Hoodie Cinza Mescla', 'CYBR', '#475569', '#00f3ff', ['#141936', '#090c1e']),
    ('moletom-cybr-matrix-bege.svg', 'moletons', 'Moletom CYBR Matrix Bege', 'CYBR', '#e6ccb2', '#ffb703', ['#141936', '#090c1e']),
    ('moletom-crewneck-urban-azul.svg', 'moletons', 'Moletom Crewneck Urban Azul', 'Urban Core', '#1d4ed8', '#00f3ff', ['#141936', '#090c1e']),
    ('moletom-zip-tech-preto.svg', 'moletons', 'Moletom Zip Tech Preto', 'Neon Street', '#111827', '#00ff88', ['#141936', '#090c1e']),

    # Jaquetas
    ('jaqueta-puffer-preta.svg', 'jaquetas', 'Jaqueta Puffer Preta', 'Cyber Closet', '#0b0f19', '#00f3ff', ['#141936', '#090c1e']),
    ('jaqueta-jeans-azul.svg', 'jaquetas', 'Jaqueta Jeans Azul', 'Urban Core', '#2563eb', '#ffb703', ['#141936', '#090c1e']),
    ('jaqueta-corta-vento-neon.svg', 'jaquetas', 'Jaqueta Corta-Vento Neon', 'Neon Street', '#161b2e', '#ff007f', ['#141936', '#090c1e']),
    ('jaqueta-varsity-urban-verde.svg', 'jaquetas', 'Jaqueta Varsity Urban Verde', 'Nova Wear', '#065f46', '#9d4edd', ['#141936', '#090c1e']),

    # Conjuntos
    ('conjunto-street-preto.svg', 'conjuntos', 'Conjunto Street Preto', 'Cyber Closet', '#0f172a', '#ff007f', ['#141936', '#090c1e']),
    ('conjunto-moletom-bege.svg', 'conjuntos', 'Conjunto Moletom Bege', 'CYBR', '#ddb892', '#ffb703', ['#141936', '#090c1e']),
    ('conjunto-techwear-cinza.svg', 'conjuntos', 'Conjunto Techwear Cinza', 'Neon Street', '#334155', '#00f3ff', ['#141936', '#090c1e']),
    ('conjunto-summer-cyber-azul.svg', 'conjuntos', 'Conjunto Summer Cyber Azul', 'Nova Wear', '#1e40af', '#00ff88', ['#141936', '#090c1e']),

    # Shorts
    ('shorts-cargo-preto.svg', 'shorts', 'Shorts Cargo Preto', 'CYBR', '#111827', '#00f3ff', ['#141936', '#090c1e']),
    ('shorts-jeans-azul.svg', 'shorts', 'Shorts Jeans Azul', 'Urban Core', '#3b82f6', '#ff007f', ['#141936', '#090c1e']),
    ('shorts-fleece-cinza.svg', 'shorts', 'Shorts Fleece Cinza', 'Cyber Closet', '#64748b', '#00f3ff', ['#141936', '#090c1e']),
    ('shorts-nylon-neon-verde.svg', 'shorts', 'Shorts Nylon Neon Verde', 'Neon Street', '#059669', '#00ff88', ['#141936', '#090c1e']),

    # Calças
    ('calca-cargo-preta.svg', 'calcas', 'Calça Cargo Preta', 'CYBR', '#0f172a', '#00f3ff', ['#141936', '#090c1e']),
    ('calca-jogger-cinza.svg', 'calcas', 'Calça Jogger Cinza', 'Cyber Closet', '#475569', '#ff007f', ['#141936', '#090c1e']),
    ('calca-tactical-verde.svg', 'calcas', 'Calça Tactical Verde', 'Urban Core', '#14532d', '#00ff88', ['#141936', '#090c1e']),

    # Jeans
    ('jeans-baggy-azul.svg', 'jeans', 'Jeans Baggy Azul', 'Urban Core', '#2563eb', '#ff007f', ['#141936', '#090c1e']),
    ('jeans-straight-preto.svg', 'jeans', 'Jeans Straight Preto', 'CYBR', '#1e293b', '#00f3ff', ['#141936', '#090c1e']),
    ('jeans-wide-leg-cinza.svg', 'jeans', 'Jeans Wide Leg Cinza', 'Nova Wear', '#334155', '#9d4edd', ['#141936', '#090c1e']),

    # Tênis
    ('tenis-street-branco.svg', 'tenis', 'Tênis Street Branco', 'CYBR', '#f8fafc', '#00f3ff', ['#141936', '#090c1e']),
    ('tenis-running-preto.svg', 'tenis', 'Tênis Running Preto', 'Cyber Closet', '#0f172a', '#ff007f', ['#141936', '#090c1e']),
    ('tenis-casual-bege.svg', 'tenis', 'Tênis Casual Bege', 'Nova Wear', '#e6ccb2', '#ffb703', ['#141936', '#090c1e']),
    ('tenis-cyber-neon-ciano.svg', 'tenis', 'Tênis Cyber Neon Ciano', 'Neon Street', '#161b2e', '#00f3ff', ['#141936', '#090c1e']),
    ('tenis-high-top-preto-rosa.svg', 'tenis', 'Tênis High-Top Preto/Rosa', 'CYBR', '#1e1b2e', '#ff007f', ['#141936', '#090c1e']),

    # Chinelos
    ('chinelo-slide-preto.svg', 'chinelos', 'Chinelo Slide Preto', 'CYBR', '#0f172a', '#00f3ff', ['#141936', '#090c1e']),
    ('chinelo-essential-branco.svg', 'chinelos', 'Chinelo Essential Branco', 'Cyber Closet', '#f8fafc', '#ff007f', ['#141936', '#090c1e']),

    # Acessórios
    ('bone-heritage-preto.svg', 'acessorios', 'Boné Heritage Preto', 'Cyber Closet', '#0f172a', '#00f3ff', ['#141936', '#090c1e']),
    ('oculos-visor-neon-ar.svg', 'acessorios', 'Óculos Visor Neon AR', 'Neon Street', '#181b2e', '#00f3ff', ['#141936', '#090c1e'])
]

for filename, cat, name, brand, pri, acc, bg_grad in all_items:
    generate_custom_svg(filename, cat, name, brand, pri, acc, bg_grad)

print(f"Generated ultra-high quality SVG graphics for {len(all_items)} products in assets/ and public/")
