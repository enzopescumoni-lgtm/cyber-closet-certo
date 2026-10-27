module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });
  let bodyData = req.body;
  if (typeof bodyData === 'string') {
    try { bodyData = JSON.parse(bodyData); } catch(e) { return res.status(400).json({ error: 'JSON inválido' }); }
  }
  bodyData = bodyData || {};
  const mensagem = typeof bodyData.message === 'string' ? bodyData.message.trim() : '';
  if (!mensagem) return res.status(400).json({ error: 'Digite uma mensagem para o Metrik.' });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY não configurada no servidor.' });
  const promptMetrik = 'Você é Metrik, assistente virtual oficial do Cyber Closet.\nO Cyber Closet é uma plataforma de moda digital com catálogo de roupas e avatar 3D.\nREGRAS:\n1. Responda em português.\n2. Seja simpático e objetivo.\n3. NUNCA peça dados sensíveis.';
  const modelo = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
  try {
    const respostaOpenAI = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({ model: modelo, instructions: promptMetrik, input: mensagem, max_output_tokens: 500 })
    });
    const resultado = await respostaOpenAI.json();
    if (!respostaOpenAI.ok) return res.status(500).json({ error: 'O Metrik não conseguiu responder agora.' });
    let textoRetornado = '';
    if (Array.isArray(resultado.output)) {
      for (const item of resultado.output) {
        if (!Array.isArray(item.content)) continue;
        for (const content of item.content) {
          if (content.type === 'output_text' && typeof content.text === 'string') textoRetornado += content.text;
        }
      }
    }
    if (!textoRetornado && typeof resultado.output_text === 'string') textoRetornado = resultado.output_text;
    return res.status(200).json({ answer: textoRetornado || 'Desculpe, não consegui gerar uma resposta no momento.' });
  } catch (err) {
    return res.status(500).json({ error: 'Ocorreu um erro ao conversar com o Metrik.' });
  }
};
