// Base de Dados Oficial de Produtos da Marca Cyber Closet & Marcas Parceiras
export const PRODUTOS = [
  // --- CAMISETAS ---
  {
    id: 1,
    nome: "Camiseta Essential Branca",
    marca: "Cyber Closet",
    categoria: "Camisetas",
    preco: 79.90,
    descricao: "Camiseta essencial de algodão pesado com caimento reto de estúdio e gola canelada.",
    imagem: "/produtos/camisetas/camiseta-essential-branca.svg",
    cores: ["Branco", "Preto"],
    tamanhos: ["PP", "P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/camisetas/camiseta-essential-branca.glb" }
  },
  {
    id: 2,
    nome: "Camiseta Oversized Preta",
    marca: "CYBR",
    categoria: "Camisetas",
    preco: 99.90,
    descricao: "Confeccionada em malha pesada com caimento oversized descontraído e ombros caídos.",
    imagem: "/produtos/camisetas/camiseta-oversized-preta.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/camisetas/camiseta-oversized-preta.glb" }
  },
  {
    id: 3,
    nome: "Camiseta Neon Street Cinza",
    marca: "Neon Street",
    categoria: "Camisetas",
    preco: 89.90,
    descricao: "Estampa minimalista refletiva neon sobre algodão penteado cinza mescla.",
    imagem: "/produtos/camisetas/camiseta-neon-street-cinza.svg",
    cores: ["Cinza", "Preto"],
    tamanhos: ["P", "M", "G"],
    destaque: false,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/camisetas/camiseta-neon-street-cinza.glb" }
  },
  {
    id: 4,
    nome: "Camiseta Urban Core Bege",
    marca: "Urban Core",
    categoria: "Camisetas",
    preco: 94.90,
    descricao: "Modelagem street boxy em tom bege terroso de alta densidade.",
    imagem: "/produtos/camisetas/camiseta-urban-core-bege.svg",
    cores: ["Bege", "Branco"],
    tamanhos: ["M", "G", "GG"],
    destaque: false,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/camisetas/camiseta-urban-core-bege.glb" }
  },

  // --- CAMISAS ---
  {
    id: 7,
    nome: "Camisa Street Manga Curta Preta",
    marca: "CYBR",
    categoria: "Camisas",
    preco: 129.90,
    descricao: "Camisa casual de botões em sarja leve com gola camp e bolso frontal.",
    imagem: "/produtos/camisas/camisa-street-manga-curta-preta.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/camisas/camisa-street-manga-curta-preta.glb" }
  },

  // --- MOLETONS ---
  {
    id: 11,
    nome: "Moletom Oversized Preto",
    marca: "Cyber Closet",
    categoria: "Moletons",
    preco: 179.90,
    descricao: "Blusão de moletom felpudo pesado com capuz amplo e bolso canguru duplo.",
    imagem: "/produtos/moletons/moletom-oversized-preto.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/moletons/moletom-oversized-preto.glb" }
  },

  // --- JAQUETAS ---
  {
    id: 16,
    nome: "Jaqueta Puffer Preta",
    marca: "Cyber Closet",
    categoria: "Jaquetas",
    preco: 299.90,
    descricao: "Jaqueta acolchoada de inverno isolante com repelência a água e gola alta.",
    imagem: "/produtos/jaquetas/jaqueta-puffer-preta.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "top", modelo3d: "/modelos3d/jaquetas/jaqueta-puffer-preta.glb" }
  },

  // --- CONJUNTOS ---
  {
    id: 20,
    nome: "Conjunto Street Preto",
    marca: "Cyber Closet",
    categoria: "Conjuntos",
    preco: 279.90,
    descricao: "Conjunto streetwear completo total-black com jaqueta tática e calça jogger.",
    imagem: "/produtos/conjuntos/conjunto-street-preto.svg",
    cores: ["Preto"],
    tamanhos: ["P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "outfit", modelo3d: "/modelos3d/conjuntos/conjunto-street-preto.glb" }
  },

  // --- SHORTS ---
  {
    id: 24,
    nome: "Shorts Cargo Preto",
    marca: "CYBR",
    categoria: "Shorts",
    preco: 129.90,
    descricao: "Shorts utilitário com bolsos laterais tridimensionais em tecido ripstop.",
    imagem: "/produtos/shorts/shorts-cargo-preto.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["P", "M", "G", "GG"],
    destaque: true,
    avatar: { compativel: true, tipo: "bottom", modelo3d: "/modelos3d/shorts/shorts-cargo-preto.glb" }
  },

  // --- CALÇAS ---
  {
    id: 28,
    nome: "Calça Cargo Preta",
    marca: "CYBR",
    categoria: "Calças",
    preco: 189.90,
    descricao: "Modelagem afunilada jogger com punhos altos e bolsos cargo modulares.",
    imagem: "/produtos/calcas/calca-cargo-preta.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["38", "40", "42", "44", "46"],
    destaque: true,
    avatar: { compativel: true, tipo: "bottom", modelo3d: "/modelos3d/calcas/calca-cargo-preta.glb" }
  },

  // --- JEANS ---
  {
    id: 31,
    nome: "Jeans Baggy Azul",
    marca: "Urban Core",
    categoria: "Jeans",
    preco: 179.90,
    descricao: "Jeans de cintura média e pernas largas baggy com caimento de skate vintage.",
    imagem: "/produtos/jeans/jeans-baggy-azul.svg",
    cores: ["Azul"],
    tamanhos: ["38", "40", "42", "44"],
    destaque: true,
    avatar: { compativel: true, tipo: "bottom", modelo3d: "/modelos3d/jeans/jeans-baggy-azul.glb" }
  },

  // --- TÊNIS ---
  {
    id: 34,
    nome: "Tênis Street Branco",
    marca: "CYBR",
    categoria: "Tênis",
    preco: 299.90,
    descricao: "Sneaker de perfil baixo em couro sintetizado branco com detalhes ciano.",
    imagem: "/produtos/tenis/tenis-street-branco.svg",
    cores: ["Branco", "Preto"],
    tamanhos: ["38", "39", "40", "41", "42", "43"],
    destaque: true,
    avatar: { compativel: true, tipo: "shoes", modelo3d: "/modelos3d/tenis/tenis-street-branco.glb" }
  },
  {
    id: 35,
    nome: "Tênis Running Preto",
    marca: "Cyber Closet",
    categoria: "Tênis",
    preco: 349.90,
    descricao: "Tênis de amortecimento responsivo com cabedal respirável em mesh preto.",
    imagem: "/produtos/tenis/tenis-running-preto.svg",
    cores: ["Preto", "Cinza"],
    tamanhos: ["38", "39", "40", "41", "42", "43"],
    destaque: true,
    avatar: { compativel: true, tipo: "shoes", modelo3d: "/modelos3d/tenis/tenis-running-preto.glb" }
  },

  // --- CHINELOS ---
  {
    id: 39,
    nome: "Chinelo Slide Preto",
    marca: "CYBR",
    categoria: "Chinelos",
    preco: 79.90,
    descricao: "Chinelo slide com tira larga acolchoada em EVA injetado e base ergonômica.",
    imagem: "/produtos/chinelos/chinelo-slide-preto.svg",
    cores: ["Preto", "Branco"],
    tamanhos: ["38", "39", "40", "41", "42", "43"],
    destaque: true,
    avatar: { compativel: true, tipo: "shoes", modelo3d: "/modelos3d/chinelos/chinelo-slide-preto.glb" }
  },

  // --- ACESSÓRIOS ---
  {
    id: 42,
    nome: "Óculos Visor Neon AR",
    marca: "Neon Street",
    categoria: "Acessórios",
    preco: 149.90,
    descricao: "Visor futurista em acrílico ciano holográfico com proteção UV400.",
    imagem: "/produtos/acessorios/oculos-visor-neon-ar.svg",
    cores: ["Preto", "Azul"],
    tamanhos: ["M"],
    destaque: true,
    avatar: { compativel: true, tipo: "accessory", modelo3d: "/modelos3d/acessorios/oculos-visor-neon-ar.glb" }
  }
];
