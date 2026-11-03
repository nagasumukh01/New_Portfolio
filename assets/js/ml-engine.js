/**
 * Machine Learning & Deep Learning Visual Engine
 * Integrates real ML mechanisms directly into the portfolio design & visual layout:
 * 1. Live Feedforward Neural Synapse Architecture (Hero visual)
 * 2. High-Dimensional Latent Embedding Space (PCA/t-SNE Skill Vector Projector)
 * 3. AI Persona Adaptive Content Filter
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSynapse();
  initLatentSpaceExplorer();
  initAdaptiveRecommender();
});

/* ==========================================================================
   1. LIVE FEEDFORWARD NEURAL SYNAPSE ARCHITECTURE (HERO ENGINE)
   Simulates multi-layer forward propagation with synaptic signal pulses
   ========================================================================== */
function initHeroSynapse() {
  const canvas = document.getElementById('hero-synapse-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  const width = canvas.width = (rect.width || 360) * dpr;
  const height = canvas.height = (rect.height || 220) * dpr;
  ctx.scale(dpr, dpr);

  const displayW = width / dpr;
  const displayH = height / dpr;

  // Layer architecture: 4 inputs -> 6 dense -> 5 dense -> 3 outputs
  const layerSizes = [4, 6, 5, 3];
  const layerLabels = ['Inputs [X]', 'Dense L1', 'Dense L2', 'Predictions [Y]'];
  const outputLabels = ['ML / AI', 'Full Stack', 'App Dev'];

  const layers = [];
  const layerSpacing = displayW / (layerSizes.length + 1);

  // Initialize neurons
  layerSizes.forEach((size, lIdx) => {
    const x = layerSpacing * (lIdx + 1);
    const nodeSpacing = displayH / (size + 1);
    const nodes = [];

    for (let nIdx = 0; nIdx < size; nIdx++) {
      const y = nodeSpacing * (nIdx + 1);
      nodes.push({
        x,
        y,
        activation: 0.5,
        targetActivation: 0.5,
        bias: (Math.random() - 0.5) * 0.4
      });
    }
    layers.push(nodes);
  });

  // Synaptic signal pulses traversing between layers
  let pulses = [];
  let pulseTimer = 0;

  // Track cursor telemetry to feed as input vectors
  let mouseTelemetry = { x: 0.5, y: 0.5 };
  window.addEventListener('mousemove', (e) => {
    mouseTelemetry.x = e.clientX / window.innerWidth;
    mouseTelemetry.y = e.clientY / window.innerHeight;
  });

  // Output prediction percentage elements
  const outML = document.getElementById('synapse-out-ml');
  const outFS = document.getElementById('synapse-out-fs');
  const outApp = document.getElementById('synapse-out-app');

  function forwardPass() {
    // 1. Input layer activations from real telemetry
    layers[0][0].activation = Math.sin(Date.now() * 0.002) * 0.3 + 0.5;
    layers[0][1].activation = mouseTelemetry.x;
    layers[0][2].activation = mouseTelemetry.y;
    layers[0][3].activation = Math.cos(Date.now() * 0.003) * 0.4 + 0.5;

    // 2. Propagate through hidden layers using ReLU / Sigmoid
    for (let l = 1; l < layers.length; l++) {
      const prevLayer = layers[l - 1];
      const currLayer = layers[l];

      currLayer.forEach((node, j) => {
        let sum = node.bias;
        prevLayer.forEach((prevNode, i) => {
          // Weight pseudo-function
          const weight = Math.sin(l * 3.7 + i * 1.9 + j * 2.3);
          sum += prevNode.activation * weight;
        });
        // Sigmoid activation
        const act = 1 / (1 + Math.exp(-sum));
        node.targetActivation = act;
        node.activation += (node.targetActivation - node.activation) * 0.15;
      });
    }

    // Update live output badge text
    if (outML && layers[3][0]) outML.textContent = `${Math.round(layers[3][0].activation * 100)}%`;
    if (outFS && layers[3][1]) outFS.textContent = `${Math.round(layers[3][1].activation * 100)}%`;
    if (outApp && layers[3][2]) outApp.textContent = `${Math.round(layers[3][2].activation * 100)}%`;
  }

  function spawnPulses() {
    pulseTimer++;
    if (pulseTimer % 18 === 0) {
      // Spawn pulse from random node in random layer (0, 1, or 2)
      const l = Math.floor(Math.random() * (layers.length - 1));
      const srcIdx = Math.floor(Math.random() * layers[l].length);
      const dstIdx = Math.floor(Math.random() * layers[l + 1].length);

      pulses.push({
        src: layers[l][srcIdx],
        dst: layers[l + 1][dstIdx],
        progress: 0,
        speed: 0.045 + Math.random() * 0.02,
        color: l === 0 ? '#38bdf8' : l === 1 ? '#a855f7' : '#10b981'
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, displayW, displayH);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    forwardPass();
    spawnPulses();

    // 1. Draw Synaptic Connections (Weights)
    for (let l = 0; l < layers.length - 1; l++) {
      const currLayer = layers[l];
      const nextLayer = layers[l + 1];

      currLayer.forEach((src, i) => {
        nextLayer.forEach((dst, j) => {
          const weight = Math.sin(l * 3.7 + i * 1.9 + j * 2.3);
          const isPositive = weight > 0;
          const alpha = (Math.abs(weight) * 0.18).toFixed(2);

          ctx.beginPath();
          ctx.moveTo(src.x, src.y);
          ctx.lineTo(dst.x, dst.y);
          if (isPositive) {
            ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
          } else {
            ctx.strokeStyle = isLight ? `rgba(124, 58, 237, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
          }
          ctx.lineWidth = 0.9;
          ctx.stroke();
        });
      });
    }

    // 2. Draw Synaptic Pulses
    for (let p = pulses.length - 1; p >= 0; p--) {
      const pulse = pulses[p];
      pulse.progress += pulse.speed;

      if (pulse.progress >= 1) {
        pulses.splice(p, 1);
        continue;
      }

      const px = pulse.src.x + (pulse.dst.x - pulse.src.x) * pulse.progress;
      const py = pulse.src.y + (pulse.dst.y - pulse.src.y) * pulse.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = pulse.color;
      ctx.shadowColor = pulse.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Draw Neurons
    layers.forEach((nodes, lIdx) => {
      nodes.forEach((node, nIdx) => {
        const glowRadius = Math.max(node.activation * 6.5 + 4, 3);

        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius + 2, 0, Math.PI * 2);
        ctx.fillStyle = lIdx === 3 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(56, 189, 248, 0.2)';
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        if (lIdx === 3) {
          ctx.fillStyle = '#10b981';
        } else if (lIdx === 0) {
          ctx.fillStyle = '#06b6d4';
        } else {
          ctx.fillStyle = '#a855f7';
        }
        ctx.fill();
        ctx.strokeStyle = isLight ? '#ffffff' : '#090e18';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. LATENT SPACE EMBEDDING EXPLORER (PCA / t-SNE 2D SKILLS PROJECTION)
   Visualizes skills as vector embeddings in semantic space with Cosine Similarity
   ========================================================================== */
function initLatentSpaceExplorer() {
  const canvas = document.getElementById('latent-space-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width = 460 * dpr;
  const height = canvas.height = 340 * dpr;
  ctx.scale(dpr, dpr);

  const displayW = 460;
  const displayH = 340;

  // High-dimensional skill vector definitions (3 core dimensions: [AI/ML, FullStack, Systems])
  // Projected onto 2D coordinate space via simulated PCA/t-SNE
  const skillsData = [
    // Cluster 1: Machine Learning & XAI (Cyan)
    { name: 'Python', x: 130, y: 95, cluster: 'ml', vector: [0.95, 0.65, 0.50] },
    { name: 'Scikit-Learn', x: 100, y: 140, cluster: 'ml', vector: [0.92, 0.40, 0.35] },
    { name: 'Explainable AI', x: 155, y: 155, cluster: 'ml', vector: [0.98, 0.45, 0.30] },
    { name: 'Gen AI (AWS)', x: 175, y: 105, cluster: 'ml', vector: [0.94, 0.55, 0.40] },
    { name: 'Data Science', x: 90, y: 80, cluster: 'ml', vector: [0.88, 0.42, 0.48] },

    // Cluster 2: Full Stack & Web (Violet)
    { name: 'React', x: 330, y: 100, cluster: 'web', vector: [0.45, 0.96, 0.38] },
    { name: 'Node.js', x: 360, y: 150, cluster: 'web', vector: [0.50, 0.94, 0.60] },
    { name: 'Express.js', x: 310, y: 170, cluster: 'web', vector: [0.42, 0.92, 0.55] },
    { name: 'Streamlit', x: 235, y: 125, cluster: 'web', vector: [0.82, 0.88, 0.32] },
    { name: 'HTML5/CSS3', x: 380, y: 85, cluster: 'web', vector: [0.25, 0.90, 0.20] },

    // Cluster 3: Mobile, Databases & Systems (Emerald)
    { name: 'Flutter', x: 260, y: 220, cluster: 'sys', vector: [0.40, 0.85, 0.75] },
    { name: 'C Programming', x: 180, y: 275, cluster: 'sys', vector: [0.35, 0.40, 0.98] },
    { name: 'Java / OOP', x: 220, y: 250, cluster: 'sys', vector: [0.45, 0.60, 0.92] },
    { name: 'DSA', x: 140, y: 230, cluster: 'sys', vector: [0.55, 0.45, 0.95] },
    { name: 'SQL / Postgres', x: 310, y: 245, cluster: 'sys', vector: [0.60, 0.75, 0.88] }
  ];

  let selectedNode = null;
  let hoveredNode = null;

  // Cosine Similarity calculation between vectors A and B
  function cosineSimilarity(vecA, vecB) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  const similarityBanner = document.getElementById('embedding-similarity-banner');

  function draw() {
    ctx.clearRect(0, 0, displayW, displayH);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // 1. Draw Latent Space Coordinate Grid
    ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 30; x < displayW; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, displayH);
      ctx.stroke();
    }
    for (let y = 30; y < displayH; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(displayW, y);
      ctx.stroke();
    }

    // 2. Draw Cluster Hull Regions (Subtle background halos)
    drawClusterHalo(130, 115, 75, 'rgba(6, 182, 212, 0.08)');
    drawClusterHalo(335, 130, 75, 'rgba(168, 85, 247, 0.08)');
    drawClusterHalo(220, 245, 80, 'rgba(16, 185, 129, 0.08)');

    // 3. Draw Connecting Vector Lines if Node is Selected or Hovered
    const active = selectedNode || hoveredNode || skillsData[0];
    if (active) {
      skillsData.forEach(other => {
        if (other === active) return;
        const sim = cosineSimilarity(active.vector, other.vector);
        if (sim > 0.85) {
          ctx.beginPath();
          ctx.moveTo(active.x, active.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${sim * 0.4})` : `rgba(56, 189, 248, ${sim * 0.45})`;
          ctx.lineWidth = sim * 2;
          ctx.stroke();
        }
      });
    }

    // 4. Draw Embedding Skill Points
    skillsData.forEach(skill => {
      const isCurrent = skill === active;
      const isSelected = skill === selectedNode;

      ctx.beginPath();
      ctx.arc(skill.x, skill.y, isCurrent ? 8 : 5.5, 0, Math.PI * 2);

      if (skill.cluster === 'ml') {
        ctx.fillStyle = '#06b6d4';
      } else if (skill.cluster === 'web') {
        ctx.fillStyle = '#a855f7';
      } else {
        ctx.fillStyle = '#10b981';
      }

      ctx.fill();
      ctx.strokeStyle = isSelected ? '#ffffff' : (isLight ? '#ffffff' : '#090e18');
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();

      // Label
      ctx.font = isCurrent ? 'bold 11px JetBrains Mono, monospace' : '10px JetBrains Mono, monospace';
      ctx.fillStyle = isLight ? '#0f172a' : '#f1f5f9';
      ctx.textAlign = 'center';
      ctx.fillText(skill.name, skill.x, skill.y - 10);
    });
  }

  function drawClusterHalo(cx, cy, r, fillStyle) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  // Handle Mouse Interactions
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = displayW / rect.width;
    const scaleY = displayH / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    hoveredNode = null;
    for (let skill of skillsData) {
      const dist = Math.sqrt((mouseX - skill.x) ** 2 + (mouseY - skill.y) ** 2);
      if (dist < 14) {
        hoveredNode = skill;
        canvas.style.cursor = 'pointer';
        break;
      }
    }
    if (!hoveredNode) canvas.style.cursor = 'crosshair';

    updateSimilarityUI();
    draw();
  });

  canvas.addEventListener('click', () => {
    if (hoveredNode) {
      selectedNode = (selectedNode === hoveredNode) ? null : hoveredNode;
      updateSimilarityUI();
      draw();
    }
  });

  function updateSimilarityUI() {
    if (!similarityBanner) return;
    const active = selectedNode || hoveredNode || skillsData[0];
    
    // Find closest semantic neighbor
    let closest = null;
    let maxSim = -1;
    skillsData.forEach(other => {
      if (other === active) return;
      const sim = cosineSimilarity(active.vector, other.vector);
      if (sim > maxSim) {
        maxSim = sim;
        closest = other;
      }
    });

    similarityBanner.innerHTML = `
      <span style="color:var(--neon-cyan); font-weight:700;">Vector Embedding: [${active.name}]</span> &bull; 
      Closest Neighbor: <strong style="color:var(--text-main);">${closest.name}</strong> 
      (Cosine Similarity $S_c$ = <span style="color:var(--neon-emerald); font-weight:700;">${maxSim.toFixed(3)}</span>)
    `;
  }

  updateSimilarityUI();
  draw();
}

/* ==========================================================================
   3. AI PERSONA ADAPTIVE CONTENT FILTER
   Simulates ML Recommender Systems re-ranking portfolio elements
   ========================================================================== */
function initAdaptiveRecommender() {
  const personaBtns = document.querySelectorAll('[data-persona]');
  const projectCards = document.querySelectorAll('.project-card');

  if (personaBtns.length === 0) return;

  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const persona = btn.getAttribute('data-persona');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        
        if (persona === 'all') {
          card.style.display = 'flex';
          card.style.order = '0';
          card.style.borderColor = '';
        } else if (persona === 'ml') {
          if (cat.includes('ml')) {
            card.style.display = 'flex';
            card.style.order = '-1';
            card.style.borderColor = 'var(--neon-cyan)';
          } else {
            card.style.display = 'flex';
            card.style.order = '1';
            card.style.borderColor = '';
          }
        } else if (persona === 'web') {
          if (cat.includes('web') || cat.includes('github')) {
            card.style.display = 'flex';
            card.style.order = '-1';
            card.style.borderColor = 'var(--neon-purple)';
          } else {
            card.style.display = 'flex';
            card.style.order = '1';
            card.style.borderColor = '';
          }
        }
      });
    });
  });
}
