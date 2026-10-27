const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;

// ===============================
// CARREGAR VARIÁVEIS DO .env.local
// ===============================

function carregarEnvLocal() {
  const envPath = path.join(__dirname, ".env.local");

  if (!fs.existsSync(envPath)) return;

  try {
    const conteudo = fs.readFileSync(envPath, "utf8");
    const linhas = conteudo.split(/\r?\n/);

    for (const linha of linhas) {
      const texto = linha.trim();

      if (!texto || texto.startsWith("#")) continue;

      const indice = texto.indexOf("=");

      if (indice === -1) continue;

      const chave = texto.slice(0, indice).trim();
      let valor = texto.slice(indice + 1).trim();

      // Remove aspas simples ou duplas ao redor do valor
      valor = valor.replace(/^["']|["']$/g, "");

      if (!process.env[chave]) {
        process.env[chave] = valor;
      }
    }
  } catch (err) {
    console.error("Erro ao ler .env.local:", err.message);
  }
}

carregarEnvLocal();

// ===============================
// TABELA DE TIPOS MIME (ESTÁTICO)
// ===============================

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".glb": "model/gltf-binary",
};

// ===============================
// BACKEND DO ASSISTENTE METRIK
// ===============================

async function responderMetrik(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk;

    // Limite de segurança para requisição (100KB)
    if (body.length > 100000) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      let dados = {};

      try {
        dados = JSON.parse(body || "{}");
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({ error: "JSON inválido enviado no corpo da requisição." }));
      }

      const mensagem = typeof dados.message === "string" ? dados.message.trim() : "";

      if (!mensagem) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({ error: "Digite uma mensagem para o Metrik." }));
      }

      const apiKey = process.env.OPENAI_API_KEY;

      if (!apiKey) {
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({ error: "OPENAI_API_KEY não configurada no servidor." }));
      }

      const promptMetrik = `
Você é Metrik, assistente virtual oficial do Cyber Closet.

O Cyber Closet é uma plataforma de moda digital que possui catálogo de roupas e um avatar 3D para experimentar peças.

Você pode ajudar com:
- catálogo;
- roupas;
- tênis;
- camisetas;
- shorts;
- jeans;
- conjuntos;
- moletons;
- acessórios;
- escolha de tamanho;
- combinação de looks;
- funcionamento do avatar 3D;
- favoritos;
- navegação no Cyber Closet;
- suporte básico.

REGRAS E PERSONALIDADE:
1. Responda normalmente em português brasileiro.
2. Seja simpático, moderno, objetivo e profissional.
3. Não finja ser humano.
4. NUNCA peça senha, cartão de crédito completo, CPF ou dados bancários.
5. Não invente informações sobre pedidos, pagamentos, entregas, estoque ou contas de usuários.
6. Se não souber determinada informação, informe claramente.
7. Quando alguém pedir recomendações de moda, atue também como personal stylist do Cyber Closet.
`;

      const modelo = process.env.OPENAI_MODEL || "gpt-5.6-luna";

      const respostaOpenAI = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelo,
          instructions: promptMetrik,
          input: mensagem,
          max_output_tokens: 500
        })
      });

      const resultado = await respostaOpenAI.json();

      if (!respostaOpenAI.ok) {
        console.error("Erro OpenAI API:", resultado);
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({ error: "O Metrik não conseguiu responder agora." }));
      }

      // Procura o texto retornado pela Responses API da OpenAI
      let textoRetornado = "";

      if (Array.isArray(resultado.output)) {
        for (const item of resultado.output) {
          if (!Array.isArray(item.content)) continue;

          for (const content of item.content) {
            if (content.type === "output_text" && typeof content.text === "string") {
              textoRetornado += content.text;
            }
          }
        }
      }

      if (!textoRetornado && typeof resultado.output_text === "string") {
        textoRetornado = resultado.output_text;
      }

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({
        answer: textoRetornado || "Desculpe, não consegui gerar uma resposta momento."
      }));

    } catch (erro) {
      console.error("Erro no processamento da rota Metrik:", erro);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Ocorreu um erro ao conversar com o Metrik." }));
    }
  });
}

// ===============================
// SERVIDOR HTTP
// ===============================

const server = http.createServer((req, res) => {
  // ROTA DA API DO METRIK (POST /api/metrik)
  if (req.method === "POST" && req.url === "/api/metrik") {
    return responderMetrik(req, res);
  }

  // SERVIR ARQUIVOS ESTÁTICOS DO SITE
  let urlPath = req.url.split("?")[0];

  if (urlPath === "/") {
    urlPath = "/index.html";
  }

  const filePath = path.join(__dirname, decodeURIComponent(urlPath));
  const relative = path.relative(__dirname, filePath);

  // Prevenção de Path Traversal
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("403 Forbidden");
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("404 Not Found");
      }

      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Server Error: ${err.code}`);
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

// ===============================
// INICIALIZAÇÃO
// ===============================

server.listen(PORT, "0.0.0.0", () => {
  const temKey = Boolean(process.env.OPENAI_API_KEY);
  console.log("");
  console.log("================================");
  console.log(" CYBER CLOSET");
  console.log("================================");
  console.log(`Site: http://localhost:${PORT}`);
  console.log(`Metrik: ${temKey ? "IA configurada ✓" : "SEM API KEY ✗"}`);
  console.log("================================");
  console.log("");
});
