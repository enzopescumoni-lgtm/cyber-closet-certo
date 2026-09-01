/* ==========================================================================
   CYBER CLOSET - PRODUTOS & ANIMAÇÕES DA INTERFACE CYBERPUNK
   ========================================================================== */

// Base de Dados Oficial de Vestuário do Catálogo Cyber Closet
const PRODUCTS = [
  // --- 2. CAMISETAS (VERÃO) ---
  {
    id: "C001",
    marca: "Nike",
    nome: "Sportswear Club T-Shirt",
    categoria: "Camisetas",
    subcategoria: "Basic",
    estacao: "verao",
    preco_demo: 199.99,
    cor: "Preto",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Camiseta de algodão macio de corte clássico com o tradicional logo Futura bordado no peito.",
    tags: ["casual", "streetwear", "básico", "verao"],
    avaliacao: 4.7,
    avaliacoes_count: 140,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/nike_club_tshirt.svg",
    equippedType: "jacket"
  },
  {
    id: "C002",
    marca: "Nike",
    nome: "Sportswear Premium Essentials T-Shirt",
    categoria: "Camisetas",
    subcategoria: "Oversized",
    estacao: "verao",
    preco_demo: 249.99,
    cor: "Branco Off-White",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Confeccionada em algodão pesado com caimento oversized descontraído e ombros caídos.",
    tags: ["streetwear", "oversized", "premium", "verao"],
    avaliacao: 4.8,
    avaliacoes_count: 110,
    status: "Em estoque",
    destaque: true,
    mais_vendido: false,
    novo: false,
    image: "assets/nike_essentials_tshirt.svg",
    equippedType: "jacket"
  },
  {
    id: "C004",
    marca: "Nike",
    nome: "ACG T-Shirt",
    categoria: "Camisetas",
    subcategoria: "Outdoor Tech",
    estacao: "verao",
    preco_demo: 299.99,
    cor: "Verde Musgo",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Linha All Conditions Gear. Algodão pesado com estampa gráfica técnica e secagem rápida para exploração urbana.",
    tags: ["techwear", "outdoor", "streetwear", "verao"],
    avaliacao: 4.9,
    avaliacoes_count: 70,
    status: "Em estoque",
    destaque: false,
    mais_vendido: false,
    novo: true,
    image: "assets/nike_acg_tshirt.svg",
    equippedType: "jacket"
  },
  {
    id: "C005",
    marca: "adidas",
    nome: "Premium Essentials T-Shirt",
    categoria: "Camisetas",
    subcategoria: "Minimalist",
    estacao: "verao",
    preco_demo: 249.99,
    cor: "Preto Minimal",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Algodão de malha simples pesada. Trefoil sutil bordado no peito em estética limpa e moderna.",
    tags: ["streetwear", "minimalista", "verao"],
    avaliacao: 4.8,
    avaliacoes_count: 95,
    status: "Em estoque",
    destaque: true,
    mais_vendido: false,
    novo: false,
    image: "assets/tshirt_nike.svg",
    equippedType: "jacket"
  },
  {
    id: "C006",
    marca: "adidas",
    nome: "Trefoil T-Shirt",
    categoria: "Camisetas",
    subcategoria: "Classic Heritage",
    estacao: "verao",
    preco_demo: 199.99,
    cor: "Branco/Preto",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Estampa frontal grande do ícone Trefoil. Celebrando a herança clássica dos arquivos adidas Originals.",
    tags: ["clássico", "streetwear", "verao"],
    avaliacao: 4.7,
    avaliacoes_count: 130,
    status: "Em estoque",
    destaque: false,
    mais_vendido: true,
    novo: false,
    image: "assets/adidas_trefoil_tshirt.svg",
    equippedType: "jacket"
  },

  // --- 3. MOLETONS (INVERNO) ---
  {
    id: "M001",
    marca: "Nike",
    nome: "Sportswear Tech Fleece Full-Zip Hoodie",
    categoria: "Moletons",
    subcategoria: "Tech Fleece",
    estacao: "inverno",
    preco_demo: 899.99,
    cor: "Cinza Mescla/Preto",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "O Moletom de alta tecnologia definitivo. Tecido isolante leve dos dois lados que mantém o aquecimento sem volume extra.",
    tags: ["techwear", "streetwear", "premium", "inverno"],
    avaliacao: 4.9,
    avaliacoes_count: 320,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/hoodie_techfleece.svg",
    equippedType: "jacket"
  },
  {
    id: "M002",
    marca: "Nike",
    nome: "Sportswear Club Fleece Hoodie",
    categoria: "Moletons",
    subcategoria: "Casual Fleece",
    estacao: "inverno",
    preco_demo: 399.99,
    cor: "Preto",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Lã cardada macia no interior e capuz ajustável com cordão. O moletom básico mais aconchegante para o dia a dia.",
    tags: ["básico", "conforto", "inverno"],
    avaliacao: 4.7,
    avaliacoes_count: 210,
    status: "Em estoque",
    destaque: true,
    mais_vendido: false,
    novo: false,
    image: "assets/hoodie_techfleece.svg",
    equippedType: "jacket"
  },
  {
    id: "M005",
    marca: "adidas",
    nome: "Adicolor Classics Trefoil Hoodie",
    categoria: "Moletons",
    subcategoria: "Heritage",
    estacao: "inverno",
    preco_demo: 399.99,
    cor: "Verde Floresta",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Moletom com capuz e bolso canguru em tecido fleece de algodão ultra denso com o grande logo Trefoil bordado no peito.",
    tags: ["heritage", "clássico", "inverno"],
    avaliacao: 4.8,
    avaliacoes_count: 185,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/hoodie_techfleece.svg",
    equippedType: "jacket"
  },
  {
    id: "M009",
    marca: "New Balance",
    nome: "Essentials Stacked Logo Hoodie",
    categoria: "Moletons",
    subcategoria: "Essentials",
    estacao: "inverno",
    preco_demo: 399.99,
    cor: "Bege Oatmeal",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Design francês de moletom felpudo com cós canelado flexível e capuz forrado.",
    tags: ["casual", "essentials", "inverno"],
    avaliacao: 4.8,
    avaliacoes_count: 140,
    status: "Em estoque",
    destaque: false,
    mais_vendido: false,
    novo: false,
    image: "assets/hoodie_techfleece.svg",
    equippedType: "jacket"
  },

  // --- 4. JAQUETAS (INVERNO) ---
  {
    id: "J001",
    marca: "Nike",
    nome: "Sportswear Windrunner Jacket",
    categoria: "Jaquetas",
    subcategoria: "Corta-Vento",
    estacao: "inverno",
    preco_demo: 499.99,
    cor: "Preto/Branco Chevron",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "A clássica jaqueta corta-vento com o lendário painel em V no peito (26 graus). Tecido leve e resistente ao vento.",
    tags: ["corta-vento", "heritage", "streetwear", "inverno"],
    avaliacao: 4.8,
    avaliacoes_count: 270,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/jacket_firebird.svg",
    equippedType: "jacket"
  },
  {
    id: "J004",
    marca: "adidas",
    nome: "Firebird Track Jacket",
    categoria: "Jaquetas",
    subcategoria: "Track Jacket",
    estacao: "inverno",
    preco_demo: 499.99,
    cor: "Preto/Branco",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Feita em malha de poliéster brilhante com gola alta retrô, 3 listras nas mangas e o bordado Trefoil clássico.",
    tags: ["retrô", "terracewear", "streetwear", "inverno"],
    avaliacao: 4.9,
    avaliacoes_count: 310,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/jacket_firebird.svg",
    equippedType: "jacket"
  },
  {
    id: "J008",
    marca: "New Balance",
    nome: "Athletics Varsity Jacket",
    categoria: "Jaquetas",
    subcategoria: "Varsity Jacket",
    estacao: "inverno",
    preco_demo: 699.99,
    cor: "Verde/Creme",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Jaqueta estilo colegial varsity com corpo de feltro de lã sintética e mangas acopladas de couro ecológico.",
    tags: ["varsity", "vintage", "streetwear", "inverno"],
    avaliacao: 4.9,
    avaliacoes_count: 140,
    status: "Em estoque",
    destaque: true,
    mais_vendido: false,
    novo: false,
    image: "assets/nb_varsity_jacket.svg",
    equippedType: "jacket"
  },

  // --- 5. CALÇAS (INVERNO) ---
  {
    id: "P001",
    marca: "Nike",
    nome: "Sportswear Tech Fleece Joggers",
    categoria: "Calças",
    subcategoria: "Jogger Tech",
    estacao: "inverno",
    preco_demo: 699.99,
    cor: "Cinza Mescla",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Modelagem afunilada com punhos canelados altos e o famoso bolso lateral com zíper colado de perfil futurista.",
    tags: ["techwear", "jogger", "streetwear", "inverno"],
    avaliacao: 4.9,
    avaliacoes_count: 290,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/pants_jogger.svg",
    equippedType: "pants"
  },
  {
    id: "P004",
    marca: "adidas",
    nome: "Firebird Track Pants",
    categoria: "Calças",
    subcategoria: "Track Pants",
    estacao: "inverno",
    preco_demo: 399.99,
    cor: "Preto/3-Stripes",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Calça esportiva clássica de caimento reto com zíper nas barras e tecido tricot reluzente de alto padrão.",
    tags: ["retrô", "streetwear", "inverno"],
    avaliacao: 4.8,
    avaliacoes_count: 230,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/pants_jogger.svg",
    equippedType: "pants"
  },

  // --- 6. SHORTS (VERÃO) ---
  {
    id: "H001",
    marca: "Nike",
    nome: "Sportswear Club Shorts",
    categoria: "Shorts",
    subcategoria: "Fleece Shorts",
    estacao: "verao",
    preco_demo: 249.99,
    cor: "Preto",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Confeccionados em tecido fleece macio com cós elástico ajustável. Conforto casual e estiloso.",
    tags: ["casual", "básico", "verao"],
    avaliacao: 4.7,
    avaliacoes_count: 120,
    status: "Em estoque",
    destaque: false,
    mais_vendido: true,
    novo: false,
    image: "assets/pants_jogger.svg",
    equippedType: "pants"
  },
  {
    id: "H003",
    marca: "adidas",
    nome: "Adicolor 3-Stripes Shorts",
    categoria: "Shorts",
    subcategoria: "Classics",
    estacao: "verao",
    preco_demo: 249.99,
    cor: "Preto/3-Stripes",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    descricao: "Shorts esportivo em malha tricot brilhante com as icônicas 3 listras nas laterais.",
    tags: ["adicolor", "retrô", "verao"],
    avaliacao: 4.8,
    avaliacoes_count: 130,
    status: "Em estoque",
    destaque: true,
    mais_vendido: false,
    novo: false,
    image: "assets/pants_jogger.svg",
    equippedType: "pants"
  },

  // --- 7. CONJUNTOS ---
  {
    id: "L001",
    marca: "Nike",
    nome: "Look 01 — Tech Street (Inverno)",
    categoria: "Conjuntos",
    subcategoria: "Agasalho de Inverno",
    estacao: "inverno",
    preco_demo: 1599.98,
    cor: "Cinza/Preto",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Conjunto completo de inverno composto por: Nike Tech Fleece Full-Zip Hoodie + Nike Tech Fleece Joggers.",
    tags: ["look completo", "techwear", "inverno"],
    avaliacao: 5.0,
    avaliacoes_count: 180,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: true,
    image: "assets/look_set.svg",
    equippedType: "jacket"
  },
  {
    id: "L002",
    marca: "adidas",
    nome: "Look 02 — Firebird Track Suit (Inverno)",
    categoria: "Conjuntos",
    subcategoria: "Agasalho de Inverno",
    estacao: "inverno",
    preco_demo: 899.98,
    cor: "Preto/Branco",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Agasalho completo retrô de inverno composto por: adidas Firebird Track Jacket + adidas Firebird Track Pants.",
    tags: ["look completo", "retrô", "inverno"],
    avaliacao: 4.9,
    avaliacoes_count: 155,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/look_set.svg",
    equippedType: "jacket"
  },
  {
    id: "L003",
    marca: "Nike",
    nome: "Look 03 — Summer Breeze (Verão)",
    categoria: "Conjuntos",
    subcategoria: "Kit de Verão",
    estacao: "verao",
    preco_demo: 449.98,
    cor: "Preto/Branco",
    tamanhos: ["P", "M", "G", "GG"],
    descricao: "Kit leve de verão composto por: Nike Sportswear Club T-Shirt + Nike Club Shorts + Boné Heritage86.",
    tags: ["look completo", "verao", "casual"],
    avaliacao: 4.9,
    avaliacoes_count: 120,
    status: "Em estoque",
    destaque: true,
    mais_vendido: false,
    novo: true,
    image: "assets/look_set.svg",
    equippedType: "jacket"
  },

  // --- 8. ACESSÓRIOS (VERÃO) ---
  {
    id: "A001",
    marca: "Nike",
    nome: "Heritage86 Cap",
    categoria: "Acessórios",
    subcategoria: "Bonés",
    estacao: "verao",
    preco_demo: 149.99,
    cor: "Preto",
    tamanhos: ["Único"],
    descricao: "Boné strapback ajustável em sarrulha de algodão macio com fechamento por fivela metálica de encaixe.",
    tags: ["acessórios", "boné", "verao"],
    avaliacao: 4.8,
    avaliacoes_count: 190,
    status: "Em estoque",
    destaque: false,
    mais_vendido: true,
    novo: false,
    image: "assets/cap_heritage.svg",
    equippedType: "visor"
  },
  {
    id: "A004",
    marca: "adidas",
    nome: "Adilette Slides",
    categoria: "Acessórios",
    subcategoria: "Chinelos",
    estacao: "verao",
    preco_demo: 249.99,
    cor: "Preto/3-Stripes",
    tamanhos: ["37", "38", "39", "40", "41", "42", "43"],
    descricao: "O chinelo slide lendário desde 1972 com tira de bandage sintética leve e base moldada anatomicamente.",
    tags: ["acessórios", "slides", "verao"],
    avaliacao: 4.9,
    avaliacoes_count: 280,
    status: "Em estoque",
    destaque: true,
    mais_vendido: true,
    novo: false,
    image: "assets/cap_heritage.svg",
    equippedType: "accessory"
  }
];

// Estado Global da Aplicação
const state = {
  cart: [],
  favorites: new Set(),
  equipped: {
    jacket: PRODUCTS.find(p => p.id === "M001"),
    visor: PRODUCTS.find(p => p.id === "A001"),
    pants: PRODUCTS.find(p => p.id === "P001")
  },
  activeColor: '#00f3ff',
  audioEnabled: true,
  looksSeason: 'all',
  filters: {
    brand: 'all',
    category: 'all',
    priceMax: 3000,
    search: ''
  },
  aiGenerator: {
    mood: 'neon',
    weather: 'all',
    boldness: 75,
    maxBudget: 2500,
    currentOutfit: null
  },
  chatMessages: [
    { sender: 'bot', text: '⚡ Salve! Eu sou o **Metrik**, o Mascote e Guardião do Cyber Closet! Como posso te ajudar hoje?' }
  ]
};

/* ==========================================================================
   SISTEMA DE EFEITOS SONOROS WEB AUDIO API
   ========================================================================== */
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.lastHoverTime = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playHoverTick() {
    if (!state.audioEnabled) return;
    const now = Date.now();
    if (now - this.lastHoverTime < 50) return;
    this.lastHoverTime = now;

    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playMinimalPop() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  playCartChime() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const t = this.ctx.currentTime;
      
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, t);
      gain1.gain.setValueAtTime(0.18, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.15);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, t + 0.08);
      gain2.gain.setValueAtTime(0.18, t + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t + 0.08);
      osc2.stop(t + 0.28);
    } catch (e) {}
  }

  playDescendingClick() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  playTinySparkle() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const notes = [1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.04);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.10, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
      });
    } catch (e) {}
  }

  playMechanicalClick() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playShortWhoosh() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playGlassChime() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.07);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.20, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch (e) {}
  }

  playDigitalConfirmation() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.setValueAtTime(1174, t + 0.05);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.10);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.10);
    } catch (e) {}
  }

  playSoftBuzz() {
    if (!state.audioEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.10, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }
}

const audio = new CyberAudioEngine();

// 10. PARTÍCULAS EXTREMAMENTE DISCRETAS & MOVIENDO LENTAMENTE
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 25 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    color: Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.25)' : 'rgba(255, 0, 127, 0.25)'
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX; p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function formatBRL(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

// 5. ANIMAÇÃO DO PRODUTO VOANDO PARA O CARRINHO
function animateFlyToCart(btnElement, imgSrc) {
  const cartBtn = document.getElementById('cart-btn');
  if (!cartBtn || !btnElement) return;

  const btnRect = btnElement.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  const flyer = document.createElement('img');
  flyer.src = imgSrc || 'assets/jacket.png';
  flyer.className = 'flying-product-img';
  flyer.style.left = `${btnRect.left + btnRect.width / 2 - 30}px`;
  flyer.style.top = `${btnRect.top + btnRect.height / 2 - 30}px`;

  document.body.appendChild(flyer);

  requestAnimationFrame(() => {
    flyer.style.left = `${cartRect.left + cartRect.width / 2 - 15}px`;
    flyer.style.top = `${cartRect.top + cartRect.height / 2 - 15}px`;
    flyer.style.transform = 'scale(0.2) rotate(360deg)';
    flyer.style.opacity = '0.3';
  });

  setTimeout(() => {
    flyer.remove();
    // 6. NÚMERO DO CARRINHO PULSANDO
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.classList.remove('pulse');
      void badge.offsetWidth; // Trigger reflow
      badge.classList.add('pulse');
    }
  }, 750);
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  renderFeaturedGrid();
  renderNewGrid();
  renderLooksGrid(state.looksSeason);
  renderFullCatalog();

  // 15. PARALLAX NO MOUSE MOVE
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    const heroShowcase = document.querySelector('.fitting-showcase');
    if (heroShowcase) {
      heroShowcase.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    }
  });

  // Hover Sound Delegate (Volume 8% - Soft Digital Tick)
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.closest('.cyber-btn, .product-card, .tab-btn, .season-tab-btn, .icon-btn, .fav-btn, .quick-chat-btn')) {
      audio.playHoverTick();
    }
  });

  // Audio Toggle Switch
  document.getElementById('audio-toggle')?.addEventListener('click', () => {
    state.audioEnabled = !state.audioEnabled;
    const btn = document.getElementById('audio-toggle');
    if (btn) btn.innerHTML = state.audioEnabled ? '🔊' : '🔇';
    if (state.audioEnabled) audio.playDigitalConfirmation();
    showToast(state.audioEnabled ? '🔊 Efeitos Sonoros Ativados' : '🔇 Efeitos Sonoros Desativados');
  });

  // Color Selector for Fitting Room
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      e.target.classList.add('active');
      state.activeColor = e.target.dataset.color;
      updateFittingRoom();
      audio.playMinimalPop();
    });
  });

  // Season Sub-Catalog Tab Listeners (Inverno vs Verão)
  document.querySelectorAll('.season-tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.season-tab-btn').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      state.looksSeason = e.target.dataset.season;
      renderLooksGrid(state.looksSeason);
      audio.playMechanicalClick();
    });
  });

  // Brand Filter
  document.getElementById('filter-brand')?.addEventListener('change', (e) => {
    state.filters.brand = e.target.value;
    renderFullCatalog();
    audio.playMechanicalClick();
  });

  // Category Tabs
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      state.filters.category = e.target.dataset.category;
      renderFullCatalog();
      audio.playMechanicalClick();
    });
  });

  // Price Slider Filter
  document.getElementById('filter-price')?.addEventListener('input', (e) => {
    state.filters.priceMax = parseFloat(e.target.value);
    document.getElementById('price-val').textContent = formatBRL(state.filters.priceMax);
    renderFullCatalog();
  });

  // Search Input with Digital Confirmation sound
  document.getElementById('product-search')?.addEventListener('input', (e) => {
    state.filters.search = e.target.value.toLowerCase().trim();
    renderFullCatalog();
    if (state.filters.search.length > 2) audio.playDigitalConfirmation();
  });

  // Modals & Drawers
  document.getElementById('cart-btn')?.addEventListener('click', () => {
    openDrawer('cart-drawer');
    renderCartDrawer();
    audio.playShortWhoosh();
  });

  // Support Floating Button Toggle
  document.getElementById('mascot-support-trigger')?.addEventListener('click', () => {
    openDrawer('support-drawer');
    renderChatMessages();
    audio.playShortWhoosh();
  });

  document.querySelectorAll('.modal-close, .drawer-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
      audio.playShortWhoosh();
    });
  });

  // Chat Form Listener
  document.getElementById('chat-form')?.addEventListener('submit', handleUserChatMessage);

  // AI Outfit Generator Mood Listeners
  document.querySelectorAll('.ai-mood-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.ai-mood-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.aiGenerator.mood = e.target.dataset.mood;
      audio.playMechanicalClick();
    });
  });

  document.getElementById('ai-boldness')?.addEventListener('input', (e) => {
    state.aiGenerator.boldness = parseInt(e.target.value);
    document.getElementById('boldness-val').textContent = `${state.aiGenerator.boldness}%`;
  });

  document.getElementById('ai-budget')?.addEventListener('input', (e) => {
    state.aiGenerator.maxBudget = parseFloat(e.target.value);
    document.getElementById('budget-val').textContent = formatBRL(state.aiGenerator.maxBudget);
  });

  document.getElementById('generate-ai-btn')?.addEventListener('click', generateInteractiveAIOutfit);
  
  // Initial AI Outfit Load
  generateInteractiveAIOutfit();
});

// Render Featured
function renderFeaturedGrid() {
  const container = document.getElementById('featured-grid');
  if (!container) return;
  const featured = PRODUCTS.filter(p => p.destaque);
  container.innerHTML = featured.map(item => createProductCardHTML(item)).join('');
}

// Render New
function renderNewGrid() {
  const container = document.getElementById('new-grid');
  if (!container) return;
  const newItems = PRODUCTS.filter(p => p.novo || p.destaque).slice(0, 6);
  container.innerHTML = newItems.map(item => createProductCardHTML(item)).join('');
}

// Render Looks Grid
function renderLooksGrid(season = 'all') {
  const container = document.getElementById('looks-grid');
  if (!container) return;

  const filtered = PRODUCTS.filter(p => {
    if (season === 'all') return p.categoria === 'Conjuntos' || p.destaque;
    return p.estacao === season;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
        <h4 style="font-size: 1.3rem; color: var(--neon-cyan);">NENHUM LOOK NESTA ESTAÇÃO</h4>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const seasonBadge = item.estacao === 'inverno' ? 
      `<span class="season-badge inverno">❄️ INVERNO</span>` : 
      `<span class="season-badge verao">☀️ VERÃO</span>`;

    return `
      <div class="product-card" style="border-color: ${item.estacao === 'inverno' ? 'var(--neon-cyan)' : 'var(--neon-yellow)'};">
        ${seasonBadge}
        <div class="card-img-wrapper" onclick="openProductDetail('${item.id}')">
          <img src="${item.image}" alt="${item.nome}" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-category">${item.marca} • ${item.subcategoria}</span>
          <h3 class="card-title">${item.nome}</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">${item.descricao}</p>
          <div class="card-footer">
            <span class="card-price">${formatBRL(item.preco_demo)}</span>
            <div class="card-actions">
              <button class="cyber-btn cyber-btn-secondary" style="padding: 0.4rem 0.6rem; font-size: 0.75rem;" onclick="equipItem('${item.id}')">
                Provador
              </button>
              <button class="cyber-btn" style="padding: 0.4rem 0.6rem; font-size: 0.75rem;" onclick="addToCart('${item.id}', this)">
                + Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Full Catalog
function renderFullCatalog() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => {
    const matchBrand = state.filters.brand === 'all' || p.marca === state.filters.brand;
    const matchCat = state.filters.category === 'all' || p.categoria === state.filters.category;
    const matchPrice = p.preco_demo <= state.filters.priceMax;
    const matchSearch = p.nome.toLowerCase().includes(state.filters.search) || 
                        p.marca.toLowerCase().includes(state.filters.search) ||
                        p.tags.some(t => t.toLowerCase().includes(state.filters.search));
    return matchBrand && matchCat && matchPrice && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 1rem;">
        <h3 style="font-size: 1.5rem; color: var(--neon-magenta);">NENHUM ITEM ENCONTRADO NA MATRIX</h3>
        <p>Tente ajustar os filtros por marca, preço ou categoria.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => createProductCardHTML(item)).join('');
}

// Card HTML Creator
function createProductCardHTML(item) {
  const isFav = state.favorites.has(item.id);
  const seasonTag = item.estacao === 'inverno' ? `<span class="card-badge" style="border-color: var(--neon-cyan); color: var(--neon-cyan);">❄️ INVERNO</span>` :
                    `<span class="card-badge" style="border-color: var(--neon-yellow); color: var(--neon-yellow);">☀️ VERÃO</span>`;

  return `
    <div class="product-card">
      ${seasonTag}
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${item.id}', this)" title="Favoritar">
        <span>${isFav ? '❤️' : '🤍'}</span>
      </button>
      
      <div class="card-img-wrapper" onclick="openProductDetail('${item.id}')">
        <img src="${item.image}" alt="${item.nome}" loading="lazy">
      </div>
      
      <div class="card-body">
        <span class="card-category">${item.marca} • ${item.categoria}</span>
        <h3 class="card-title" onclick="openProductDetail('${item.id}')">${item.nome}</h3>
        
        <div class="card-stats">
          <span>⭐ ${item.avaliacao} (${item.avaliacoes_count})</span>
          <span style="color: ${item.status === 'Em estoque' ? 'var(--neon-green)' : 'var(--neon-yellow)'};">${item.status}</span>
        </div>

        <div class="card-footer">
          <div>
            <div class="card-price">${formatBRL(item.preco_demo)}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Preço demonstrativo</div>
          </div>
          
          <div class="card-actions">
            <button class="cyber-btn cyber-btn-secondary" style="padding: 0.45rem 0.75rem; font-size: 0.75rem;" onclick="equipItem('${item.id}')" title="Testar no Provador">
              Provador
            </button>
            <button class="cyber-btn" style="padding: 0.45rem 0.75rem; font-size: 0.75rem;" onclick="addToCart('${item.id}', this)">
              + Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Favorite Toggle com som Tiny Sparkle (Volume 10%) e microanimação (7.)
window.toggleFavorite = function(id, btnElement) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    showToast('Item removido dos favoritos.');
    audio.playDescendingClick();
  } else {
    state.favorites.add(id);
    showToast('❤️ Item adicionado aos seus favoritos!');
    audio.playTinySparkle();
  }

  if (btnElement) {
    btnElement.classList.toggle('active');
    const span = btnElement.querySelector('span');
    if (span) {
      span.textContent = state.favorites.has(id) ? '❤️' : '🤍';
      span.style.animation = 'none';
      void span.offsetWidth; // Trigger reflow
      span.style.animation = 'heartPulse 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }
  } else {
    renderFullCatalog();
    renderFeaturedGrid();
  }
};

// Detail Modal com Minimal Pop
window.openProductDetail = function(id) {
  const item = PRODUCTS.find(p => p.id === id);
  if (!item) return;

  const content = document.getElementById('product-detail-content');
  if (!content) return;

  const sizeOptions = item.tamanhos.map(s => `<button class="size-chip" onclick="selectSize(this)">${s}</button>`).join('');

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
      <div style="background: radial-gradient(circle at center, rgba(0, 243, 255, 0.1) 0%, rgba(7, 9, 19, 0.9) 100%); border-radius: 12px; padding: 2rem; text-align: center; border: 1px solid rgba(255, 255, 255, 0.1);">
        <img src="${item.image}" alt="${item.nome}" style="max-height: 260px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 20px rgba(0, 243, 255, 0.4));">
      </div>

      <div>
        <div style="font-family: var(--font-subheading); color: var(--neon-cyan); text-transform: uppercase;">${item.marca} • ${item.categoria} (${item.estacao === 'inverno' ? '❄️ Inverno' : '☀️ Verão'})</div>
        <h2 style="font-size: 1.8rem; margin: 0.4rem 0;">${item.nome}</h2>
        <div style="font-size: 1.6rem; font-family: var(--font-heading); color: #fff; margin-bottom: 0.5rem;">${formatBRL(item.preco_demo)}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1.2rem;">* Valor demonstrativo do catálogo Cyber Closet</div>

        <p style="color: var(--text-muted); line-height: 1.5; font-size: 0.95rem; margin-bottom: 1.5rem;">${item.descricao}</p>

        <div style="margin-bottom: 1.2rem;">
          <label style="display: block; font-family: var(--font-subheading); color: var(--text-muted); margin-bottom: 0.5rem;">SELECIONAR TAMANHO:</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${sizeOptions}
          </div>
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button class="cyber-btn" style="flex: 1; justify-content: center;" onclick="addToCart('${item.id}', this)">
            🛒 ADICIONAR AO CARRINHO
          </button>
          <button class="cyber-btn cyber-btn-secondary" onclick="equipItem('${item.id}')">
            ⚡ PROVADOR AR
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('detail-modal');
  audio.playMinimalPop();
};

window.selectSize = function(btn) {
  document.querySelectorAll('.size-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  audio.playMechanicalClick();
};

// Equip Item no Provador Holográfico
window.equipItem = function(id) {
  const item = PRODUCTS.find(p => p.id === id);
  if (!item) return;

  if (item.categoria === 'Calças' || item.categoria === 'Shorts') state.equipped.pants = item;
  else if (item.categoria === 'Acessórios') state.equipped.visor = item;
  else state.equipped.jacket = item;

  updateFittingRoom();
  audio.playShortWhoosh();
  showToast(`⚡ "${item.nome}" foi equipado no Provador Holográfico!`);
};

function updateFittingRoom() {
  const avatarImg = document.getElementById('fitting-avatar-img');
  const jacketName = document.getElementById('equipped-jacket-name');
  const visorName = document.getElementById('equipped-visor-name');
  const pantsName = document.getElementById('equipped-pants-name');

  if (jacketName) jacketName.textContent = state.equipped.jacket?.nome || 'Jaqueta Padrão';
  if (visorName) visorName.textContent = state.equipped.visor?.nome || 'Acessório Padrão';
  if (pantsName) pantsName.textContent = state.equipped.pants?.nome || 'Calça Padrão';

  if (avatarImg) {
    avatarImg.style.filter = `drop-shadow(0 0 25px ${state.activeColor})`;
  }
}

// Carrinho de Compras com 2-Note Soft Chime, produto voando (5.) e contador pulsando (6.)
window.addToCart = function(id, btnElement) {
  const item = PRODUCTS.find(p => p.id === id);
  if (!item) return;

  const existing = state.cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1, selectedSize: item.tamanhos[0] });
  }

  updateCartBadge();
  audio.playCartChime();
  if (btnElement) animateFlyToCart(btnElement, item.image);
  showToast(`🛒 ${item.nome} adicionado ao seu carrinho!`);
};

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.textContent = totalCount;
}

function renderCartDrawer() {
  const list = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total-price');

  if (!list) return;

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
        <h4 style="font-size: 1.2rem; color: var(--neon-cyan);">SEU CARRINHO ESTÁ VAZIO</h4>
        <p>Explore nosso catálogo e adicione suas peças de vestuário favoritas.</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = formatBRL(0);
    return;
  }

  let total = 0;
  list.innerHTML = state.cart.map((item, index) => {
    const subtotal = item.preco_demo * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.nome}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.nome}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Tam: ${item.selectedSize}</div>
          <div class="cart-item-price">${formatBRL(item.preco_demo)}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="cyber-btn cyber-btn-secondary" style="padding: 0.2rem 0.5rem;" onclick="changeQty(${index}, -1)">-</button>
          <span style="font-weight: bold;">${item.qty}</span>
          <button class="cyber-btn cyber-btn-secondary" style="padding: 0.2rem 0.5rem;" onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = formatBRL(total);
}

window.changeQty = function(index, delta) {
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
    audio.playDescendingClick();
  } else {
    audio.playMinimalPop();
  }
  updateCartBadge();
  renderCartDrawer();
};

// Finalizar Compra com Premium Glass Chime de 3 Notas (Volume 20%)
window.checkoutCart = function() {
  if (state.cart.length === 0) {
    audio.playSoftBuzz();
    showToast('Adicione produtos antes de finalizar o pedido!');
    return;
  }

  const total = state.cart.reduce((sum, item) => sum + (item.preco_demo * item.qty), 0);
  state.cart = [];
  updateCartBadge();
  closeAllModals();
  audio.playGlassChime();

  showToast(`🎉 Pedido Finalizado com Sucesso pelo Metrik! Total: ${formatBRL(total)}`);
};

// Gerador de Look IA
function generateInteractiveAIOutfit() {
  audio.playShortWhoosh();
  
  const card = document.getElementById('ai-outfit-display');
  if (card) {
    card.style.opacity = '0.4';
    card.style.filter = 'blur(4px)';
  }

  setTimeout(() => {
    const budget = state.aiGenerator.maxBudget;
    const candidatesTops = PRODUCTS.filter(p => (p.categoria === 'Moletons' || p.categoria === 'Jaquetas' || p.categoria === 'Camisetas') && p.preco_demo <= budget);
    const candidatesBottoms = PRODUCTS.filter(p => (p.categoria === 'Calças' || p.categoria === 'Shorts') && p.preco_demo <= budget);
    const candidatesAcc = PRODUCTS.filter(p => p.categoria === 'Acessórios') || [PRODUCTS[0]];

    const top = candidatesTops[Math.floor(Math.random() * candidatesTops.length)] || PRODUCTS[0];
    const bottom = candidatesBottoms[Math.floor(Math.random() * candidatesBottoms.length)] || PRODUCTS[1];
    const acc = candidatesAcc[Math.floor(Math.random() * candidatesAcc.length)] || PRODUCTS[2];

    const comboTotal = top.preco_demo + bottom.preco_demo + acc.preco_demo;
    const comboDiscountPrice = comboTotal * 0.85;

    state.aiGenerator.currentOutfit = { top, bottom, acc, comboTotal, comboDiscountPrice };

    const syncStat = Math.min(99, Math.floor(Math.random() * 12 + 88));
    const boldnessStat = state.aiGenerator.boldness;

    const syncBar = document.getElementById('ai-sync-bar');
    const syncLabel = document.getElementById('ai-sync-label');
    const boldnessBar = document.getElementById('ai-boldness-bar');
    const boldnessLabel = document.getElementById('ai-boldness-label');

    if (syncBar) syncBar.style.width = `${syncStat}%`;
    if (syncLabel) syncLabel.textContent = `${syncStat}%`;
    if (boldnessBar) boldnessBar.style.width = `${boldnessStat}%`;
    if (boldnessLabel) boldnessLabel.textContent = `${boldnessStat}%`;

    if (card) {
      card.style.opacity = '1';
      card.style.filter = 'none';
      card.innerHTML = `
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
          <img src="assets/mascot.jpg" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--neon-cyan);" alt="Metrik">
          <div>
            <div style="font-family: var(--font-heading); font-size: 0.85rem; color: var(--neon-cyan);">METRIK STYLIST RECOMENDA:</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Look #${Math.floor(Math.random() * 8999 + 1000)} • Mood: ${state.aiGenerator.mood.toUpperCase()}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: rgba(7,9,19,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 0.8rem; margin-bottom: 1rem;">
          <div style="text-align: center;">
            <img src="${top.image}" style="height: 60px; object-fit: contain;">
            <div style="font-size: 0.72rem; font-weight: bold; margin-top: 4px;">${top.nome}</div>
            <div style="font-size: 0.7rem; color: var(--neon-cyan);">${formatBRL(top.preco_demo)}</div>
          </div>

          <div style="text-align: center;">
            <img src="${bottom.image}" style="height: 60px; object-fit: contain;">
            <div style="font-size: 0.72rem; font-weight: bold; margin-top: 4px;">${bottom.nome}</div>
            <div style="font-size: 0.7rem; color: var(--neon-cyan);">${formatBRL(bottom.preco_demo)}</div>
          </div>

          <div style="text-align: center;">
            <img src="${acc.image}" style="height: 60px; object-fit: contain;">
            <div style="font-size: 0.72rem; font-weight: bold; margin-top: 4px;">${acc.nome}</div>
            <div style="font-size: 0.7rem; color: var(--neon-cyan);">${formatBRL(acc.preco_demo)}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">COMBO (15% OFF): </span>
            <strong style="font-family: var(--font-heading); color: var(--neon-green); font-size: 1.1rem;">${formatBRL(comboDiscountPrice)}</strong>
            <span style="font-size: 0.75rem; text-decoration: line-through; color: var(--text-muted); margin-left: 6px;">${formatBRL(comboTotal)}</span>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="cyber-btn" style="flex: 1; justify-content: center; font-size: 0.75rem; padding: 0.5rem;" onclick="equipComboOutfit()">
            ⚡ EQUIPAR NO PROVADOR
          </button>
          <button class="cyber-btn cyber-btn-secondary" style="flex: 1; justify-content: center; font-size: 0.75rem; padding: 0.5rem;" onclick="addComboToCart(this)">
            🛒 ADD COMBO AO CARRINHO
          </button>
        </div>
      `;
    }

    audio.playDigitalConfirmation();
    showToast('⚡ Novo Outfit IA gerado com sucesso pelo Metrik!');
  }, 400);
}

window.equipComboOutfit = function() {
  if (!state.aiGenerator.currentOutfit) return;
  const { top, bottom, acc } = state.aiGenerator.currentOutfit;
  state.equipped.jacket = top;
  state.equipped.pants = bottom;
  state.equipped.visor = acc;
  updateFittingRoom();
  audio.playShortWhoosh();
  showToast('⚡ Todo o look foi equipado no Provador Holográfico!');
};

window.addComboToCart = function(btnElement) {
  if (!state.aiGenerator.currentOutfit) return;
  const { top, bottom, acc } = state.aiGenerator.currentOutfit;
  addToCart(top.id, btnElement);
  addToCart(bottom.id);
  addToCart(acc.id);
  audio.playCartChime();
  showToast('🎉 Combo de Vestuário com 15% OFF adicionado ao seu carrinho!');
};

// METRIK CHATBOT
function renderChatMessages() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  container.innerHTML = state.chatMessages.map(msg => `
    <div class="chat-msg ${msg.sender}">
      ${msg.sender === 'bot' ? '<img src="assets/mascot.jpg" class="chat-avatar" alt="Metrik">' : ''}
      <div class="chat-bubble">${msg.text}</div>
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

window.sendQuickQuery = function(type) {
  let userText = '';
  let botReply = '';

  if (type === 'tamanho') {
    userText = 'Qual o meu tamanho ideal de roupa com o Metrik?';
    botReply = '📏 **Guia de Tamanhos do Metrik**:\n• **Moletons & Jaquetas Tech Fleece**: Possuem caimento justo. Se gosta de um estilo oversized mais solto, peça 1 tamanho maior (ex: G se usar M).\n• **Camisetas & Oversized**: Caimento descontraído com ombros caídos. Peça seu tamanho padrão (PP, P, M, G, GG).';
  } else if (type === 'rastreio') {
    userText = 'Onde está o meu pedido de vestuário?';
    const code = 'METRIK-' + Math.floor(Math.random() * 89999 + 10000) + '-BR';
    botReply = `🚚 **Rastreamento com o Metrik**:\nCódigo na Matrix: **${code}**\nStatus: *Suas roupas foram seladas na cápsula e estão a caminho pela frota Cyber Express*. Previsão: 24h a 48h!`;
  } else if (type === 'empresa') {
    userText = 'Quem é a empresa Cyber Closet e o Metrik?';
    botReply = '🏢 **Sobre a Cyber Closet & Metrik Labs**:\nFundada em 2099 na Matrix em Neo-Tokyo pelo ciborgue estilista Metrik. Somos pioneiros na integração de moda física de alta costura com tecidos inteligentes e iluminação néon por fibra ótica!';
  } else if (type === 'humano') {
    userText = 'Quero falar com um atendente humano';
    botReply = '⚡ O Metrik está conectando você à nossa Central de Atendimento Humano... Um especialista responderá em instantes!';
  }

  state.chatMessages.push({ sender: 'user', text: userText });
  renderChatMessages();
  audio.playMinimalPop();

  setTimeout(() => {
    state.chatMessages.push({ sender: 'bot', text: botReply });
    renderChatMessages();
    audio.playDigitalConfirmation();
  }, 600);
};

function handleUserChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-user-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  state.chatMessages.push({ sender: 'user', text: text });
  input.value = '';
  renderChatMessages();
  audio.playMinimalPop();

  setTimeout(() => {
    let reply = '⚡ Entendi sua dúvida! O **Metrik** está verificando as diretrizes da Cyber Closet na Matrix. Você também pode escolher os atalhos rápidos acima!';
    
    if (text.toLowerCase().includes('frete') || text.toLowerCase().includes('entrega')) {
      reply = '🚚 O **Metrik** garante **Frete Grátis** para todo o Brasil em compras a partir de R$ 299,00 via Cyber Express!';
    } else if (text.toLowerCase().includes('troca') || text.toLowerCase().includes('devolucao')) {
      reply = '🔄 Na Cyber Closet você tem **30 dias de garantia total** para trocas e devoluções sem custo!';
    } else if (text.toLowerCase().includes('metrik') || text.toLowerCase().includes('empresa') || text.toLowerCase().includes('cnpj')) {
      reply = '🏢 **Cyber Closet Inc. & Metrik Labs**\nCNPJ Fictício: 99.842.099/0001-77\nSede: Neo-Tokyo Sector 7, Cybernetics Hub - Bloco 2099.\nE-mail: contato@cybercloset2099.com';
    }

    state.chatMessages.push({ sender: 'bot', text: reply });
    renderChatMessages();
    audio.playDigitalConfirmation();
  }, 700);
}

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function openDrawer(id) {
  const drawer = document.getElementById(id);
  if (drawer) drawer.classList.add('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay, .drawer-overlay').forEach(m => m.classList.remove('active'));
}

// Toast Notifications
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'cyber-toast';
  toast.innerHTML = `<span>⚡</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
