const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;

// ===============================
// CARREGAR .env.local
// ===============================

function carregarEnv() {
  const envPath = path.join(__dirname, ".env.local");

  if (!fs.existsSync(envPath)) return;

  const linhas = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const linha of linhas) {
    const texto = linha.trim();

    if (!texto || texto.startsWith("#")) continue;

    const indice = texto.indexOf("=");

    if (indice === -1) continue;

    const chave = texto.slice(0, indice).trim();
    let valor = texto.slice(indice + 1).trim();

    valor = valor.replace(/^["']|["']$/g, "");

    if (!process.env[chave]) {
      process.env[chave] = valor;
    }
  }
}

carregarEnv();

// ===============================
// TIPOS DE ARQUIVO
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
// METRIK
// ===============================

async function responderMetrik(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk;

    // Evita requisições gigantes
    if (body.length > 100000) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      const dados = JSON.parse(body || "{}");

      const mensagem =
        typeof dados.message === "string"
          ? dados.message.trim()
          : "";

      if (!mensagem) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8"
        });

        return res.end(JSON.stringify({
          error: "Digite uma mensagem para o Metrik."
        }));
      }

      if (!process.env.OPENAI_API_KEY) {
        res.writeHead(500, {
          "Content-Type": "application/json; charset=utf-8"
        });

        return res.end(JSON.stringify({
          error: "OPENAI_API_KEY não configurada."
        }));
      }

      const promptMetrik = `
Você é Metrik, o assistente virtual oficial do Cyber Closet.

O Cyber Closet é uma plataforma de moda digital que possui
catálogo de roupas e um avatar 3D para experimentar peças.

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
- funcionamento do avatar;
- favoritos;
- navegação no Cyber Closet;
- suporte básico.

REGRAS:

Responda normalmente em português brasileiro.

Seja simpático, moderno e objetivo.

Não diga que é humano.

Nunca peça:
- senha;
- cartão completo;
- CPF;
- dados bancários.

Não invente informações sobre:
- pedidos;
- pagamentos;
- entregas;
- estoque;
- contas de usuários.

Se não tiver determinada informação, diga claramente.

Quando alguém pedir recomendações de moda,
aja também como um personal stylist do Cyber Closet.
`;

      const resposta = await fetch(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization":
              `Bearer ${process.env.OPENAI_API_KEY}`
          },

          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-5-mini",

            instructions: promptMetrik,

            input: mensagem,

            max_output_tokens: 500
          })
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        console.error("Erro OpenAI:", resultado);

        res.writeHead(500, {
          "Content-Type": "application/json; charset=utf-8"
        });

        return res.end(JSON.stringify({
          error: "O Metrik não conseguiu responder agora."
        }));
      }

      // Procura texto retornado pela Responses API
      let texto = "";

      if (Array.isArray(resultado.output)) {
        for (const item of resultado.output) {
          if (!Array.isArray(item.content)) continue;

          for (const content of item.content) {
            if (
              content.type === "output_text" &&
              typeof content.text === "string"
            ) {
              texto += content.text;
            }
          }
        }
      }

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
      });

      res.end(JSON.stringify({
        answer:
          texto ||
          "Desculpe, não consegui gerar uma resposta."
      }));

    } catch (erro) {

      console.error("Erro Metrik:", erro);

      res.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8"
      });

      res.end(JSON.stringify({
        error:
          "Ocorreu um erro ao conversar com o Metrik."
      }));
    }
  });
}

// ===============================
// SERVIDOR
// ===============================

const server = http.createServer((req, res) => {

  // API DO METRIK
  if (req.method === "POST" && req.url === "/api/metrik") {
    return responderMetrik(req, res);
  }

  // ARQUIVOS DO SITE
  let urlPath = req.url.split("?")[0];

  if (urlPath === "/") {
    urlPath = "/index.html";
  }

  let filePath = path.join(
    __dirname,
    decodeURIComponent(urlPath)
  );

  const relative = path.relative(__dirname, filePath);

  if (
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  const ext =
    path.extname(filePath).toLowerCase();

  const contentType =
    MIME_TYPES[ext] ||
    "application/octet-stream";

  fs.readFile(filePath, (err, content) => {

    if (err) {

      if (err.code === "ENOENT") {
        res.writeHead(404, {
          "Content-Type": "text/plain; charset=utf-8"
        });

        return res.end("404 Not Found");
      }

      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8"
      });

      return res.end(
        `Server Error: ${err.code}`
      );
    }

    res.writeHead(200, {
      "Content-Type": contentType
    });

    res.end(content);
  });
});

// ===============================
// INICIAR
// ===============================

server.listen(PORT, "0.0.0.0", () => {

  console.log("");
  console.log("================================");
  console.log(" CYBER CLOSET");
  console.log("================================");
  console.log(`Site: http://localhost:${PORT}`);
  console.log(
    `Metrik: ${
      process.env.OPENAI_API_KEY
        ? "IA configurada ✓"
        : "SEM API KEY ✗"
    }`
  );
  console.log("================================");
  console.log("");
});
