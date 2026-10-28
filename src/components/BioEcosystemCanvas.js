/**
 * BioEcosystemCanvas — Perspectiva Estrelada & Rede Biológica com Grid Técnico
 * Estética minimalista Apple/Biotech: micro-pontos de luz estelares/bioluminescentes,
 * ramificação hifal orgânica natural (dendrítica) e matriz em grid científico.
 * Cores estritamente cinza e branco, eliminando elementos pesados ou circulares invasivos.
 */

export function initBioEcosystem(canvas) {
  if (!canvas) return { destroy: () => {} };

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isRunning = true;
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Interação suave com o cursor
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 150
  };

  // Estruturas de profundidade para a "perspectiva estrelada"
  const backgroundStars = []; // Estrelas / esporos profundos (pontos minúsculos)
  const networkNodes = [];    // Nós da rede biológica / constelação
  let isInitialized = false;

  function initElements() {
    if (width === 0 || height === 0) return;

    // 1. Camada de Fundo — Perspectiva Estrelada Profunda
    // Micro-pontos de luz em suspensão com cintilação suave e deriva lenta
    backgroundStars.length = 0;
    const bgCount = Math.max(Math.min(Math.floor((width * height) / 9000), 75), 50);

    for (let i = 0; i < bgCount; i++) {
      backgroundStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.22 - 0.05, // deriva lenta ascendente
        radius: Math.random() * 0.6 + 0.6, // 0.6px a 1.2px (microscópico)
        baseAlpha: Math.random() * 0.25 + 0.15,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    // 2. Camada da Rede Biológica / Constelação Dendrítica
    // Pontos refinados que formam ramificações hifais que fazem sentido
    networkNodes.length = 0;
    const nodeCount = Math.max(Math.min(Math.floor((width * height) / 12000), 55), 38);

    for (let i = 0; i < nodeCount; i++) {
      const isBrighter = Math.random() < 0.25; // 25% são micro-estrelas bioluminescentes principais

      networkNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: isBrighter ? (Math.random() * 0.4 + 1.4) : (Math.random() * 0.4 + 1.0), // 1.0px a 1.8px (delicado)
        glowRadius: isBrighter ? (Math.random() * 1.5 + 4.0) : (Math.random() * 1.0 + 2.5),
        isBrighter,
        twinkleSpeed: Math.random() * 0.025 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
        baseAlpha: isBrighter ? 0.85 : 0.55
      });
    }

    isInitialized = true;
  }

  // Ajusta dimensões do canvas com suporte a Retina/High-DPI
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const newWidth = rect.width;
    const newHeight = rect.height;
    if (newWidth === 0 || newHeight === 0) return;

    width = newWidth;
    height = newHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    if (!isInitialized) {
      initElements();
    } else {
      // Reposiciona nós suavemente dentro dos limites
      backgroundStars.forEach(s => {
        if (s.x > width) s.x = Math.random() * width;
        if (s.y > height) s.y = Math.random() * height;
      });
      networkNodes.forEach(n => {
        if (n.x > width) n.x = Math.random() * width;
        if (n.y > height) n.y = Math.random() * height;
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  let resizeObserver = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);
  }

  // Interação sutil com o mouse no container pai
  const parent = canvas.parentElement;
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  }

  if (parent) {
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);
  }

  // Loop de Animação 60FPS
  let time = 0;
  const gridStep = 54;      // Espaçamento do grid técnico
  const maxConnectDist = 135; // Distância máxima para filamento biológico
  const maxNeighbors = 2;    // Máximo de ramificações por nó (cria dendritos naturais, sem teia caótica)

  function render() {
    if (!isRunning) return;

    if (width === 0 || height === 0) {
      resize();
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
    }

    if (!isInitialized) {
      initElements();
    }

    time += 0.014;

    // Suavização do mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // =========================================================================
    // 1. GRID CIENTÍFICO TÉCNICO (Matriz / Petri Grid Minimalista)
    // Mantido exatamente como o usuário elogiou, em cinza e branco com cruzetas
    // =========================================================================
    const startX = (width % gridStep) / 2;
    const startY = (height % gridStep) / 2;

    // Linhas do grid
    ctx.beginPath();
    for (let x = startX; x <= width; x += gridStep) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = startY; y <= height; y += gridStep) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.strokeStyle = 'rgba(185, 185, 190, 0.12)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Cruzetas (+) nos vértices com iluminação reativa em branco
    const crossSize = 2.8;
    for (let x = startX; x <= width; x += gridStep) {
      for (let y = startY; y <= height; y += gridStep) {
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distToMouse < mouse.radius;

        ctx.beginPath();
        ctx.moveTo(x - crossSize, y);
        ctx.lineTo(x + crossSize, y);
        ctx.moveTo(x, y - crossSize);
        ctx.lineTo(x, y + crossSize);

        if (isNearMouse) {
          const intensity = 1 - (distToMouse / mouse.radius);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(0.35 + intensity * 0.55).toFixed(3)})`;
          ctx.lineWidth = 1.0;
        } else {
          ctx.strokeStyle = 'rgba(150, 150, 155, 0.22)';
          ctx.lineWidth = 0.6;
        }
        ctx.stroke();
      }
    }

    // =========================================================================
    // 2. PERSPECTIVA ESTRELADA DE FUNDO (Micro-Pontos e Cintilação)
    // Pequenos pontos cintilantes de luz estelar/bioluminescente, sem chamar atenção excessiva
    // =========================================================================
    for (let i = 0; i < backgroundStars.length; i++) {
      const s = backgroundStars[i];
      s.x += s.vx;
      s.y += s.vy;

      // Wrap de bordas
      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      // Cintilação estelar harmônica
      const twinkle = Math.sin(time * 2.5 + s.twinkleOffset) * 0.12;
      const alpha = Math.max(0.08, s.baseAlpha + twinkle);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      ctx.fill();
    }

    // =========================================================================
    // 3. CONEXÕES BIOLÓGICAS RAMIFICADAS (Hifas & Constelações Naturais)
    // Conecta cada nó apenas aos seus 2 vizinhos mais próximos (estrutura dendrítica)
    // =========================================================================
    const drawnEdges = new Set();

    for (let i = 0; i < networkNodes.length; i++) {
      const a = networkNodes[i];

      // Busca vizinhos válidos dentro do raio biológico
      const candidates = [];
      for (let j = 0; j < networkNodes.length; j++) {
        if (i === j) continue;
        const b = networkNodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectDist) {
          candidates.push({ j, dist, node: b });
        }
      }

      // Ordena por proximidade para selecionar os ramos naturais mais próximos
      candidates.sort((c1, c2) => c1.dist - c2.dist);

      for (let k = 0; k < Math.min(candidates.length, maxNeighbors); k++) {
        const { j, dist, node: b } = candidates[k];
        const edgeKey = i < j ? `${i}_${j}` : `${j}_${i}`;

        if (!drawnEdges.has(edgeKey)) {
          drawnEdges.add(edgeKey);

          const normDist = 1 - (dist / maxConnectDist);
          const alpha = normDist * 0.22;

          // Traço ultrafino e elegante de filamento hifal
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(165, 165, 170, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();

          // Pulso biológico de sinapse / sinal luminoso que viaja pelo filamento
          if ((i + j) % 2 === 0) {
            const progress = (Math.sin(time * 2.0 + i * 0.8 + j * 0.5) + 1) * 0.5;
            const px = a.x + (b.x - a.x) * progress;
            const py = a.y + (b.y - a.y) * progress;

            ctx.beginPath();
            ctx.arc(px, py, 0.9, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha * 2.6, 0.75).toFixed(3)})`;
            ctx.fill();
          }
        }
      }
    }

    // =========================================================================
    // 4. INTERAÇÃO SUTIL DO MOUSE COM OS NÓS PRÓXIMOS
    // =========================================================================
    if (mouse.x > 0 && mouse.y > 0) {
      for (let i = 0; i < networkNodes.length; i++) {
        const a = networkNodes[i];
        const dx = mouse.x - a.x;
        const dy = mouse.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(150, 150, 155, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Deslocamento orgânico muito leve
          const force = (1 - dist / mouse.radius) * 0.3;
          a.vx -= (dx / dist) * force * 0.2;
          a.vy -= (dy / dist) * force * 0.2;
        }
      }
    }

    // =========================================================================
    // 5. NÓS BIOLÓGICOS / MICRO-ESTRELAS DA REDE (Refinados, Sem Bolinhas Pesadas)
    // Pontos delicados de luz estelar/bioluminescente com brilho óptico sutil
    // =========================================================================
    for (let i = 0; i < networkNodes.length; i++) {
      const node = networkNodes[i];

      // Atualiza posição orgânica
      node.x += node.vx;
      node.y += node.vy;

      // Amortecimento
      node.vx *= 0.992;
      node.vy *= 0.992;

      // Movimento contínuo de deriva viva
      if (Math.abs(node.vx) < 0.06) node.vx += (Math.random() - 0.5) * 0.04;
      if (Math.abs(node.vy) < 0.06) node.vy += (Math.random() - 0.5) * 0.04;

      // Rebote suave nas margens
      const margin = 15;
      if (node.x < margin) { node.x = margin; node.vx = Math.abs(node.vx); }
      if (node.x > width - margin) { node.x = width - margin; node.vx = -Math.abs(node.vx); }
      if (node.y < margin) { node.y = margin; node.vy = Math.abs(node.vy); }
      if (node.y > height - margin) { node.y = height - margin; node.vy = -Math.abs(node.vy); }

      // Cintilação suave (respiração da estrela/célula)
      const twinkle = Math.sin(time * 2.8 + node.twinkleOffset) * 0.15;
      const currentAlpha = Math.max(0.2, node.baseAlpha + twinkle);

      // Suave aura óptica translúcida (sem anéis pesados ou bordas pretas)
      if (node.isBrighter) {
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.glowRadius);
        glowGrad.addColorStop(0, `rgba(255, 255, 255, ${(currentAlpha * 0.45).toFixed(3)})`);
        glowGrad.addColorStop(0.5, `rgba(210, 210, 215, ${(currentAlpha * 0.15).toFixed(3)})`);
        glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      // Ponto de luz central: nítido, minúsculo e elegante
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha.toFixed(3)})`;
      ctx.fill();

      // Microring ultrafino apenas nas estrelas maiores, com baixa opacidade
      if (node.isBrighter) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 180, 185, ${(currentAlpha * 0.35).toFixed(3)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Pausa a animação quando a aba não está visível para economia de recursos
  function handleVisibility() {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (isRunning) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  document.addEventListener('visibilitychange', handleVisibility);

  // Inicia renderização
  animationFrameId = requestAnimationFrame(render);

  return {
    destroy: () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
      }
    }
  };
}
