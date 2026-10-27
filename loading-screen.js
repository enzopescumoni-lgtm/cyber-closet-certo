/* ==========================================================================
   CYBER CLOSET - LOADING SCREEN ENGINE (CYBERPUNK NEON)
   Interactive Canvas Particles, Web Audio Tech Chimes, Real Asset Tracking
   ========================================================================== */

(function () {
  'use strict';

  // Evita re-execução se já carregado ou se estiver em iframe
  if (window.__cyberLoadingScreenInit) return;
  window.__cyberLoadingScreenInit = true;

  // Estado da Tela de Carregamento
  const state = {
    progress: 0,
    targetProgress: 5,
    isComplete: false,
    audioEnabled: false,
    hasInteracted: false,
    audioCtx: null,
    particleAnimationId: null,
    messageIndex: 0,
    startTime: performance.now(),
    minDisplayTimeMs: 1600, // Tempo mínimo para exibição estética e suave
    maxTimeoutMs: 7000      // Timeout de segurança absoluto para nunca travar
  };

  const MESSAGES = [
    "Inicializando Cyber Closet...",
    "Preparando seu universo digital...",
    "Carregando experiências holográficas...",
    "Preparando seu avatar 3D...",
    "Organizando seu guarda-roupa virtual...",
    "Bem-vindo ao futuro da moda."
  ];

  // Elementos do DOM
  let overlay, canvas, ctx, fillBar, percentEl, statusTextEl, phaseEl, logoBadge, audioToggleBtn, fallbackBox;

  // ==========================================================================
  // 1. SÍNTESE DE ÁUDIO FUTURISTA (WEB AUDIO API NATIVA)
  // ==========================================================================
  function initAudioContext() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playDigitalStartSweep() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      initAudioContext();
      const t = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + 0.35);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } catch (e) {}
  }

  function playAcessoLiberadoChime() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      initAudioContext();
      const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Acorde futurista cristalino)
      chords.forEach((freq, idx) => {
        const t = state.audioCtx.currentTime + (idx * 0.06);
        const osc = state.audioCtx.createOscillator();
        const gain = state.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.6);
      });
    } catch (e) {}
  }

  // ==========================================================================
  // 2. CANVAS INTERATIVO DE PARTÍCULAS DIGITAIS CYBERPUNK
  // ==========================================================================
  let particles = [];
  let mouse = { x: 0, y: 0, hasMoved: false };

  function initParticles() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.hasMoved = true;
    });

    const count = window.innerWidth < 600 ? 30 : 65;
    particles = Array.from({ length: count }, () => createParticle());
    renderParticles();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    const isCyan = Math.random() > 0.4;
    return {
      x: Math.random() * (canvas ? canvas.width : window.innerWidth),
      y: Math.random() * (canvas ? canvas.height : window.innerHeight),
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      color: isCyan ? 'rgba(0, 245, 255,' : 'rgba(157, 0, 255,',
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01
    };
  }

  function renderParticles() {
    if (state.isComplete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += p.speedX;

      // Parallax sutil com o mouse
      if (mouse.hasMoved) {
        const dx = (mouse.x - canvas.width / 2) * 0.0003;
        p.x -= dx;
      }

      p.alpha += Math.sin(performance.now() * 0.002 + i) * 0.005;
      const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha));

      // Wrap em torno da tela
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${currentAlpha})`;
      ctx.shadowBlur = p.size * 3;
      ctx.shadowColor = p.color + ' 0.8)';
      ctx.fill();
    }

    state.particleAnimationId = requestAnimationFrame(renderParticles);
  }

  // ==========================================================================
  // 3. GERENCIADOR DE MENSAGENS DINÂMICAS & GLITCH
  // ==========================================================================
  let messageInterval = null;

  function startDynamicMessages() {
    messageInterval = setInterval(() => {
      if (state.isComplete) return;
      state.messageIndex = (state.messageIndex + 1) % MESSAGES.length;
      updateStatusMessage(MESSAGES[state.messageIndex]);
      triggerRandomGlitch();
    }, 1800);
  }

  function updateStatusMessage(text, isFinal = false) {
    if (!statusTextEl) return;
    statusTextEl.classList.add('fade');
    setTimeout(() => {
      statusTextEl.textContent = text;
      if (isFinal) {
        statusTextEl.classList.add('complete');
      }
      statusTextEl.classList.remove('fade');
    }, 220);
  }

  function triggerRandomGlitch() {
    if (!logoBadge) return;
    logoBadge.classList.add('cyber-logo-glitch-active');
    setTimeout(() => {
      logoBadge.classList.remove('cyber-logo-glitch-active');
    }, 320);
  }

  // ==========================================================================
  // 4. PROGRESSO REAL E TRANSIÇÃO SUAVE (60 FPS LERP)
  // ==========================================================================
  function updateProgressLoop() {
    if (state.isComplete) return;

    // Interpolação suave em direção ao targetProgress
    const delta = (state.targetProgress - state.progress) * 0.12;
    state.progress += delta;

    // Se estiver muito próximo, fixa
    if (Math.abs(state.targetProgress - state.progress) < 0.2) {
      state.progress = state.targetProgress;
    }

    const currentInt = Math.min(100, Math.round(state.progress));

    if (fillBar) fillBar.style.width = `${currentInt}%`;
    if (percentEl) percentEl.textContent = `${currentInt}%`;

    // Atualiza fases com base no progresso
    if (phaseEl) {
      if (currentInt < 30) phaseEl.textContent = "ESTRUTURA DE DADOS // DOM";
      else if (currentInt < 65) phaseEl.textContent = "TEXTURAS & MODELOS HOLOGRÁFICOS";
      else if (currentInt < 90) phaseEl.textContent = "SINCRONIZAÇÃO 3D & PROVADOR";
      else phaseEl.textContent = "ACESSO FINALIZADO // PRONTO";
    }

    // Se atingiu 100% e tempo mínimo transcorreu, dispara finalização
    const elapsed = performance.now() - state.startTime;
    if (currentInt >= 100 && elapsed >= state.minDisplayTimeMs && !state.isComplete) {
      completeLoadingSequence();
      return;
    }

    requestAnimationFrame(updateProgressLoop);
  }

  function setTargetProgress(val) {
    state.targetProgress = Math.max(state.targetProgress, Math.min(100, val));
  }

  // ==========================================================================
  // 5. RASTREAMENTO REAL DE RECURSOS ESSENCIAIS
  // ==========================================================================
  function trackRealResources() {
    // 1. Início imediato (15%)
    setTargetProgress(18);

    // 2. Carregamento de Fontes
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTargetProgress(38);
      }).catch(() => setTargetProgress(35));
    } else {
      setTimeout(() => setTargetProgress(38), 300);
    }

    // 3. Pré-carregamento de Imagens Essenciais
    const essentialImages = [
      'assets/hanger_logo.jpg',
      'assets/mascot.jpg',
      'assets/produtos/camisetas/camiseta-essential-branca.svg'
    ];

    let imagesLoaded = 0;
    essentialImages.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        imagesLoaded++;
        const ratio = imagesLoaded / essentialImages.length;
        setTargetProgress(38 + Math.round(ratio * 30)); // vai até ~68%
      };
      img.src = src;
    });

    // 4. DOM Content Loaded
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomInteractive();
    } else {
      document.addEventListener('DOMContentLoaded', onDomInteractive);
    }

    // 5. Window Load completo
    if (document.readyState === 'complete') {
      onWindowComplete();
    } else {
      window.addEventListener('load', onWindowComplete);
    }

    // 6. Timeout de Segurança (Garante que nunca fica preso caso rede falhe)
    setTimeout(() => {
      if (!state.isComplete) {
        if (fallbackBox) fallbackBox.style.display = 'block';
        setTargetProgress(100);
      }
    }, state.maxTimeoutMs);
  }

  function onDomInteractive() {
    setTargetProgress(78);
    // Verifica se Three.js / Avatar Canvas existe
    const avatarCanvas = document.getElementById('avatarCanvas');
    if (avatarCanvas) {
      setTargetProgress(88);
    }
  }

  function onWindowComplete() {
    setTargetProgress(95);
    // Aguarda leve intervalo para estabilizar renderização Three.js
    setTimeout(() => {
      setTargetProgress(100);
    }, 400);
  }

  // ==========================================================================
  // 6. SEQUÊNCIA FINAL DE TRANSIÇÃO (ACESSO LIBERADO)
  // ==========================================================================
  function completeLoadingSequence() {
    if (state.isComplete) return;
    state.isComplete = true;

    if (messageInterval) clearInterval(messageInterval);

    // Mensagem final marcante
    updateStatusMessage("⚡ ACESSO LIBERADO • BEM-VINDO ⚡", true);
    triggerRandomGlitch();

    // Toca som de confirmação se ativo
    playAcessoLiberadoChime();

    // Sincroniza áudio do Cyber Closet se o usuário ativou o áudio na tela de loading
    if (state.audioEnabled && typeof window.state !== 'undefined') {
      window.state.audioEnabled = true;
    }

    // Aguarda ~550ms para o usuário ver o "Acesso Liberado" e dispara fade-out
    setTimeout(() => {
      if (overlay) overlay.classList.add('fade-out');
      document.body.classList.remove('cls-loading');
      document.body.classList.add('cls-ready');

      // Interrompe o loop de partículas para poupar CPU/bateria
      setTimeout(() => {
        if (state.particleAnimationId) cancelAnimationFrame(state.particleAnimationId);
        if (overlay) overlay.style.display = 'none';
      }, 800);
    }, 550);
  }

  // ==========================================================================
  // 7. INICIALIZAÇÃO DA INTERFACE DO LOADING SCREEN
  // ==========================================================================
  function initLoadingScreen() {
    overlay = document.getElementById('cyber-loading-screen');
    if (!overlay) return;

    // Marca o body em estado de loading
    document.body.classList.add('cls-loading');

    canvas = document.getElementById('cls-particles-canvas');
    fillBar = document.getElementById('cls-progress-fill');
    percentEl = document.getElementById('cls-progress-percent');
    statusTextEl = document.getElementById('cls-status-text');
    phaseEl = document.getElementById('cls-progress-phase');
    logoBadge = document.getElementById('cls-logo-badge');
    audioToggleBtn = document.getElementById('cls-audio-toggle');
    fallbackBox = document.getElementById('cls-fallback-box');

    // Inicializa Som e Botão de Áudio
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.audioEnabled = !state.audioEnabled;
        initAudioContext();
        audioToggleBtn.innerHTML = state.audioEnabled ? "🔊 SOM ATIVADO" : "🔇 SOM DESATIVADO";
        if (state.audioEnabled) {
          playDigitalStartSweep();
        }
      });
    }

    // Botão de Forçar Entrada / Fallback
    const btnEnter = document.getElementById('cls-btn-enter');
    if (btnEnter) {
      btnEnter.addEventListener('click', () => {
        completeLoadingSequence();
      });
    }

    // Inicia Partículas, Mensagens e Rastreamento de Recursos
    initParticles();
    startDynamicMessages();
    trackRealResources();
    requestAnimationFrame(updateProgressLoop);
  }

  // Executa o quanto antes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
  } else {
    initLoadingScreen();
  }

  // Expõe API para controle programático externo se necessário
  window.CyberLoadingScreen = {
    complete: completeLoadingSequence,
    setProgress: setTargetProgress,
    enableAudio: () => { state.audioEnabled = true; }
  };

})();
