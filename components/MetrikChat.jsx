'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './MetrikChat.module.css';

export default function MetrikChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '⚡ Salve! Eu sou o **Metrik**, o Guardião e Estilista Cibernético do Cyber Closet! Como posso te ajudar hoje?'
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(userText) {
    const text = userText || input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!userText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/metrik', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: newMessages })
      });

      const data = await res.json();
      const botReply = data.reply || data.error || '⚡ Erro de conexão com a Matrix.';

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: '⚡ Ocorreu um erro ao comunicar com a API do Metrik.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleQuick(queryType) {
    if (queryType === 'tamanho') sendMessage('Qual é o meu tamanho ideal de roupa?');
    if (queryType === 'rastreio') sendMessage('Como rastreio meu pedido?');
    if (queryType === 'marcas') sendMessage('Quais são as marcas do catálogo?');
    if (queryType === 'avatar') sendMessage('Como vestir as roupas no Avatar 3D?');
  }

  return (
    <>
      {/* Botão Flutuante do Mascote Metrik */}
      <div
        className={styles.floatingBtn}
        onClick={() => setIsOpen(true)}
        title="Chat com o Mascote Metrik"
      >
        <img
          src="/assets/mascot.jpg"
          alt="Metrik"
          className={styles.btnImg}
        />
        <div className={styles.btnText}>
          <span className={styles.btnName}>METRIK AI</span>
          <span className={styles.btnSub}>Suporte Cyber 24/7 💬</span>
        </div>
      </div>

      {/* Drawer de Atendimento / Chat */}
      <div className={`${styles.drawerOverlay} ${isOpen ? styles.active : ''}`}>
        <div className={styles.drawerContent}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <img
              src="/assets/mascot.jpg"
              alt="Metrik"
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f3ff' }}
            />
            <div>
              <h3 style={{ color: '#00f3ff', fontSize: '1.2rem', margin: 0 }}>METRIK</h3>
              <div style={{ fontSize: '0.78rem', color: '#00ff88', fontFamily: 'Rajdhani, sans-serif' }}>
                ● ONLINE NA MATRIX 24/7
              </div>
            </div>
          </div>

          {/* Botões Rápidos */}
          <div className={styles.quickBtns}>
            <button className={styles.quickBtn} onClick={() => handleQuick('tamanho')}>📏 Guia de Tamanhos</button>
            <button className={styles.quickBtn} onClick={() => handleQuick('marcas')}>🏷️ Marcas</button>
            <button className={styles.quickBtn} onClick={() => handleQuick('rastreio')}>🚚 Rastrear Pedido</button>
            <button className={styles.quickBtn} onClick={() => handleQuick('avatar')}>👤 Provador 3D</button>
          </div>

          {/* Mensagens do Chat */}
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === 'bot' ? styles.msgBot : styles.msgUser}
              >
                {msg.sender === 'bot' && (
                  <img
                    src="/assets/mascot.jpg"
                    alt="Metrik"
                    className={styles.msgAvatar}
                  />
                )}
                <div className={msg.sender === 'bot' ? styles.bubbleBot : styles.bubbleUser}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className={styles.msgBot}>
                <img src="/assets/mascot.jpg" alt="Metrik" className={styles.msgAvatar} />
                <div className={styles.bubbleBot}>⚡ Metrik está digitando...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form de Entrada */}
          <form
            className={styles.inputForm}
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          >
            <input
              type="text"
              className={styles.textInput}
              placeholder="Digite sua mensagem para o Metrik..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn}>⚡ ENVIAR</button>
          </form>
        </div>
      </div>
    </>
  );
}
