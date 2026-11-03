/**
 * Interactive Machine Learning & XAI Laboratory for D Nagasumukh's Portfolio
 * Features:
 * 1. Live XAI Fraud Inference Simulator with real-time SHAP/LIME feature attribution
 * 2. 2D Neural Network Decision Boundary Simulator with interactive test sampling
 */

document.addEventListener('DOMContentLoaded', () => {
  initAILabTabs();
  initXAISimulator();
  initNeuralBoundary();
});

/* ==========================================================================
   1. AI LAB TAB CONTROLLER
   ========================================================================== */
function initAILabTabs() {
  const tabs = document.querySelectorAll('.ai-tab-btn');
  const panels = document.querySelectorAll('.ai-lab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. LIVE XAI FRAUD INFERENCE & FEATURE IMPORTANCE SIMULATOR
   ========================================================================== */
function initXAISimulator() {
  const amountInput = document.getElementById('slider-amount');
  const distanceInput = document.getElementById('slider-distance');
  const trustInput = document.getElementById('slider-trust');
  const velocityInput = document.getElementById('slider-velocity');

  const amountVal = document.getElementById('val-amount');
  const distanceVal = document.getElementById('val-distance');
  const trustVal = document.getElementById('val-trust');
  const velocityVal = document.getElementById('val-velocity');

  const statusBadge = document.getElementById('xai-status-badge');
  const riskScoreText = document.getElementById('xai-risk-score');
  const riskBar = document.getElementById('xai-risk-bar');
  const explanationBox = document.getElementById('xai-explanation');

  // Attribution Bars
  const attrAmount = document.getElementById('attr-amount-bar');
  const attrDistance = document.getElementById('attr-distance-bar');
  const attrTrust = document.getElementById('attr-trust-bar');
  const attrVelocity = document.getElementById('attr-velocity-bar');

  const attrAmountVal = document.getElementById('attr-amount-val');
  const attrDistanceVal = document.getElementById('attr-distance-val');
  const attrTrustVal = document.getElementById('attr-trust-val');
  const attrVelocityVal = document.getElementById('attr-velocity-val');

  if (!amountInput) return;

  function calculateRisk() {
    const amount = parseFloat(amountInput.value);
    const distance = parseFloat(distanceInput.value);
    const trust = parseFloat(trustInput.value);
    const velocity = parseFloat(velocityInput.value);

    // Update value displays
    if (amountVal) amountVal.textContent = `$${amount.toLocaleString()}`;
    if (distanceVal) distanceVal.textContent = `${distance.toLocaleString()} km`;
    if (trustVal) trustVal.textContent = `${trust}%`;
    if (velocityVal) velocityVal.textContent = `${velocity} tx/hr`;

    // Mathematical logistic regression heuristic simulation
    // Standardized weights:
    // Amount: higher -> increases risk
    // Distance: higher -> increases risk
    // Trust: higher -> reduces risk significantly
    // Velocity: higher -> increases risk
    const wAmount = (amount / 10000) * 0.35;
    const wDistance = (distance / 5000) * 0.30;
    const wTrust = ((100 - trust) / 100) * 0.45;
    const wVelocity = (velocity / 50) * 0.30;

    // Linear logit
    const logit = -1.5 + (wAmount * 2.8) + (wDistance * 2.5) + (wTrust * 3.0) + (wVelocity * 2.6);
    // Sigmoid probability
    const probability = 1 / (1 + Math.exp(-logit));
    const riskPercent = Math.min(Math.max(Math.round(probability * 100), 2), 99);

    // Update Main Gauge
    if (riskScoreText) riskScoreText.textContent = `${riskPercent}%`;
    if (riskBar) {
      riskBar.style.width = `${riskPercent}%`;
      if (riskPercent < 35) {
        riskBar.style.background = 'linear-gradient(90deg, #10b981 0%, #059669 100%)';
      } else if (riskPercent < 70) {
        riskBar.style.background = 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)';
      } else {
        riskBar.style.background = 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)';
      }
    }

    if (statusBadge) {
      if (riskPercent < 35) {
        statusBadge.className = 'xai-badge badge-safe';
        statusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>LEGITIMATE TRANSACTION</span>`;
      } else if (riskPercent < 70) {
        statusBadge.className = 'xai-badge badge-warning';
        statusBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>SUSPICIOUS &bull; MANUAL REVIEW</span>`;
      } else {
        statusBadge.className = 'xai-badge badge-danger';
        statusBadge.innerHTML = `<i class="fa-solid fa-shield-virus"></i> <span>HIGH FRAUD PROBABILITY</span>`;
      }
    }

    // Compute SHAP-style attribution shifts
    // Positive pushes towards fraud (+), negative pushes towards safe (-)
    const shapAmount = +( (amount / 10000) * 0.42 - 0.12 ).toFixed(2);
    const shapDistance = +( (distance / 5000) * 0.36 - 0.08 ).toFixed(2);
    const shapTrust = +( ((100 - trust) / 100) * 0.55 - 0.25 ).toFixed(2);
    const shapVelocity = +( (velocity / 50) * 0.40 - 0.10 ).toFixed(2);

    updateShapBar(attrAmount, attrAmountVal, shapAmount);
    updateShapBar(attrDistance, attrDistanceVal, shapDistance);
    updateShapBar(attrTrust, attrTrustVal, shapTrust);
    updateShapBar(attrVelocity, attrVelocityVal, shapVelocity);

    // Generate explainability rationale
    if (explanationBox) {
      const drivers = [];
      if (shapTrust > 0.15) drivers.push(`unrecognized device security profile (${trust}%)`);
      if (shapAmount > 0.15) drivers.push(`elevated transaction volume ($${amount})`);
      if (shapDistance > 0.12) drivers.push(`anomalous location deviation (${distance} km)`);
      if (shapVelocity > 0.12) drivers.push(`high frequency velocity (${velocity} tx/hr)`);

      if (drivers.length > 0) {
        explanationBox.innerHTML = `
          <strong style="color:var(--neon-cyan);">XAI Synthesis:</strong> Risk probability elevated to <strong>${riskPercent}%</strong> primarily due to ${drivers.join(', ')}. 
          ${trust > 70 ? 'High device security score acts as the strongest mitigative factor.' : 'Unverified device fingerprint triggers secondary authentication.'}
        `;
      } else {
        explanationBox.innerHTML = `
          <strong style="color:var(--neon-emerald);">XAI Synthesis:</strong> Nominal transaction behavior. All behavioral metrics lie well within expected confidence thresholds (${riskPercent}% risk score). Zero anomaly flags raised.
        `;
      }
    }
  }

  function updateShapBar(barEl, valEl, shapVal) {
    if (!barEl || !valEl) return;
    const isPushingFraud = shapVal >= 0;
    const width = Math.min(Math.abs(shapVal) * 160, 100);

    barEl.style.width = `${Math.max(width, 6)}%`;
    if (isPushingFraud) {
      barEl.style.background = '#ef4444';
      valEl.style.color = '#ef4444';
      valEl.textContent = `+${shapVal} (Fraud)`;
    } else {
      barEl.style.background = '#10b981';
      valEl.style.color = '#10b981';
      valEl.textContent = `${shapVal} (Safe)`;
    }
  }

  // Attach input listeners
  [amountInput, distanceInput, trustInput, velocityInput].forEach(slider => {
    slider.addEventListener('input', calculateRisk);
  });

  // Preset Scenario Buttons
  const presetBtns = document.querySelectorAll('[data-preset]');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.getAttribute('data-preset');
      if (preset === 'normal') {
        amountInput.value = 45;
        distanceInput.value = 5;
        trustInput.value = 95;
        velocityInput.value = 2;
      } else if (preset === 'overseas') {
        amountInput.value = 4800;
        distanceInput.value = 3200;
        trustInput.value = 30;
        velocityInput.value = 8;
      } else if (preset === 'burst') {
        amountInput.value = 7500;
        distanceInput.value = 4500;
        trustInput.value = 12;
        velocityInput.value = 42;
      }
      calculateRisk();
    });
  });

  calculateRisk();
}

/* ==========================================================================
   3. 2D NEURAL DECISION BOUNDARY SIMULATOR
   Interactive visual classification boundaries with user testing points
   ========================================================================== */
function initNeuralBoundary() {
  const canvas = document.getElementById('neural-boundary-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const datasetSelect = document.getElementById('neural-dataset-select');
  const metricsInfo = document.getElementById('neural-point-prediction');
  const resetBtn = document.getElementById('neural-reset-btn');

  let width = 360;
  let height = 360;
  canvas.width = width;
  canvas.height = height;

  let currentDataset = 'moons';
  let points = [];
  let userPoints = [];

  function generateDataset(type) {
    points = [];
    userPoints = [];

    if (type === 'moons') {
      // 2 interlocking crescents
      for (let i = 0; i < 45; i++) {
        const theta = (i / 45) * Math.PI;
        // Class 0 (Cyan)
        points.push({
          x: width * 0.35 + Math.cos(theta) * 75 + (Math.random() - 0.5) * 16,
          y: height * 0.45 - Math.sin(theta) * 75 + (Math.random() - 0.5) * 16,
          cls: 0
        });
        // Class 1 (Purple)
        points.push({
          x: width * 0.6 + Math.cos(theta + Math.PI) * 75 + (Math.random() - 0.5) * 16,
          y: height * 0.55 + Math.sin(theta) * 75 + (Math.random() - 0.5) * 16,
          cls: 1
        });
      }
    } else if (type === 'circles') {
      // Concentric circles
      for (let i = 0; i < 40; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rInner = Math.random() * 45 + 5;
        points.push({
          x: width * 0.5 + Math.cos(theta) * rInner,
          y: height * 0.5 + Math.sin(theta) * rInner,
          cls: 0
        });
      }
      for (let i = 0; i < 50; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rOuter = Math.random() * 45 + 85;
        points.push({
          x: width * 0.5 + Math.cos(theta) * rOuter,
          y: height * 0.5 + Math.sin(theta) * rOuter,
          cls: 1
        });
      }
    } else if (type === 'linear') {
      // Linear separable clusters
      for (let i = 0; i < 45; i++) {
        points.push({
          x: width * 0.3 + (Math.random() - 0.5) * 90,
          y: height * 0.35 + (Math.random() - 0.5) * 90,
          cls: 0
        });
        points.push({
          x: width * 0.7 + (Math.random() - 0.5) * 90,
          y: height * 0.65 + (Math.random() - 0.5) * 90,
          cls: 1
        });
      }
    }
  }

  // Neural inference simulation function for any 2D point (x, y)
  function predictProbability(x, y) {
    const nx = (x / width) * 2 - 1;
    const ny = (y / height) * 2 - 1;

    if (currentDataset === 'circles') {
      const dist = Math.sqrt(nx * nx + ny * ny);
      return 1 / (1 + Math.exp(-(dist - 0.45) * 12));
    } else if (currentDataset === 'linear') {
      const line = nx + ny - 0.05;
      return 1 / (1 + Math.exp(-line * 8));
    } else {
      // Moons boundary non-linear equation
      const val = Math.sin(nx * 2.8) * 0.65 - ny;
      return 1 / (1 + Math.exp(-val * 7));
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw 2D Decision Contour Field Heatmap
    const step = 8;
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        const prob = predictProbability(x + step / 2, y + step / 2);
        // Interpolate between Cyan (#06b6d4) and Violet (#a855f7)
        if (prob < 0.5) {
          const intensity = (0.5 - prob) * 0.35;
          ctx.fillStyle = `rgba(6, 182, 212, ${intensity})`;
        } else {
          const intensity = (prob - 0.5) * 0.35;
          ctx.fillStyle = `rgba(168, 85, 247, ${intensity})`;
        }
        ctx.fillRect(x, y, step, step);
      }
    }

    // 2. Draw Decision Boundary Line (prob approx 0.5)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    for (let x = 0; x < width; x += 10) {
      for (let y = 0; y < height; y += 10) {
        const prob = predictProbability(x, y);
        if (Math.abs(prob - 0.5) < 0.035) {
          ctx.strokeRect(x, y, 2, 2);
        }
      }
    }
    ctx.setLineDash([]);

    // 3. Draw Training Points
    points.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = pt.cls === 0 ? '#06b6d4' : '#c084fc';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 4. Draw Custom User Test Points
    userPoints.forEach((upt, idx) => {
      ctx.beginPath();
      ctx.arc(upt.x, upt.y, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = upt.prob > 0.5 ? '#a855f7' : '#0284c7';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Number badge
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(idx + 1, upt.x, upt.y);
    });
  }

  // Handle user clicks to add test points
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const prob = predictProbability(clickX, clickY);
    const predictedClass = prob > 0.5 ? 'Cluster Beta (Violet)' : 'Cluster Alpha (Cyan)';
    const confidence = prob > 0.5 ? Math.round(prob * 100) : Math.round((1 - prob) * 100);

    userPoints.push({ x: clickX, y: clickY, prob });
    draw();

    if (metricsInfo) {
      metricsInfo.innerHTML = `
        <span style="color:var(--neon-emerald); font-weight:700;"><i class="fa-solid fa-crosshairs"></i> Test Sample #${userPoints.length}:</span> 
        Predicted <strong>${predictedClass}</strong> with <strong>${confidence}% Model Confidence</strong>.
      `;
    }
  });

  if (datasetSelect) {
    datasetSelect.addEventListener('change', (e) => {
      currentDataset = e.target.value;
      generateDataset(currentDataset);
      draw();
      if (metricsInfo) metricsInfo.innerHTML = `Dataset switched to <strong>${currentDataset.toUpperCase()}</strong>. Click anywhere on the boundary field to test inference.`;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userPoints = [];
      draw();
      if (metricsInfo) metricsInfo.innerHTML = `Canvas reset. Click anywhere to place a test point.`;
    });
  }

  generateDataset(currentDataset);
  draw();
}

