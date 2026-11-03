/**
 * D Nagasumukh - Technical Portfolio Core JavaScript
 * Futuristic interactive effects, typewriter ticker, neural particle canvas,
 * Light/Dark theme manager, Text-to-Speech audio reader, & lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTextToSpeech();
  initTypewriter();
  initNeuralCanvas();
  initProjectFilters();
  initLightbox();
  initClipboardActions();
  initMobileNav();
  initScrollSpy();
  initScrollProgressBar();
  initSoundFX();
  initAnimatedCounters();
  initProjectSpecsModal();
  initResumeModal();
  initFloatingHud();
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE WITH LOCALSTORAGE PERSISTENCE
   Handles both the unique celestial day/night switch and standard buttons
   ========================================================================== */
function initThemeToggle() {
  const themeSwitch = document.getElementById('cyber-theme-switch') || document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);

    if (window.playUiSound) window.playUiSound('toggle');
    showToast(`Switched to ${newTheme === 'dark' ? 'Cyber Dark' : 'Technical Light'} Mode`);
  }

  if (themeSwitch) {
    themeSwitch.addEventListener('click', toggleTheme);
    themeSwitch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    }
    if (themeSwitch) {
      themeSwitch.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode (Day)' : 'Switch to Dark Mode (Night)');
      themeSwitch.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
    }
  }
}

/* ==========================================================================
   2. TEXT-TO-SPEECH (SPEAKER BUTTON READS "ABOUT ME")
   Native Web Speech API (Works offline, 0 latency, 0 third-party dependencies)
   ========================================================================== */
function initTextToSpeech() {
  const ttsBtn = document.getElementById('tts-speaker-btn');
  const ttsIcon = document.getElementById('tts-icon');
  const ttsText = document.getElementById('tts-text');

  if (!ttsBtn || !('speechSynthesis' in window)) {
    if (ttsBtn) ttsBtn.style.display = 'none';
    return;
  }

  const bioSpeechText = 
    "Hello! I am D Nagasumukh. Full stack developer, Machine Learning Engineer, and App Developer. " +
    "I am a Computer Science and Engineering undergraduate at Reva University, Bangalore, with an 8.06 CGPA. " +
    "I specialize in architecting intelligent machine learning applications, scalable full stack web systems, and problem-solving through clean algorithmic code. " +
    "Feel free to explore my live projects, test my interactive terminal, or connect with me directly.";

  let utterance = null;
  let isSpeaking = false;

  function stopSpeech() {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    ttsBtn.classList.remove('speaking');
    if (ttsIcon) {
      ttsIcon.classList.remove('fa-volume-xmark');
      ttsIcon.classList.add('fa-volume-high');
    }
    if (ttsText) ttsText.textContent = 'Listen to Intro';
  }

  function startSpeech() {
    window.speechSynthesis.cancel(); // Stop any pending utterances

    utterance = new SpeechSynthesisUtterance(bioSpeechText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('English')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      isSpeaking = true;
      ttsBtn.classList.add('speaking');
      if (ttsIcon) {
        ttsIcon.classList.remove('fa-volume-high');
        ttsIcon.classList.add('fa-volume-xmark');
      }
      if (ttsText) ttsText.textContent = 'Stop Audio';
      showToast('Playing About Me audio...');
    };

    utterance.onend = () => {
      stopSpeech();
    };

    utterance.onerror = () => {
      stopSpeech();
    };

    window.speechSynthesis.speak(utterance);
  }

  ttsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isSpeaking) {
      stopSpeech();
      showToast('Audio playback stopped');
    } else {
      startSpeech();
    }
  });

  // Cancel speech if user navigates away or refreshes
  window.addEventListener('beforeunload', () => {
    window.speechSynthesis.cancel();
  });
}

/* ==========================================================================
   3. DYNAMIC MOVING / SCROLLING TAGLINE CYCLER
   "Full stack developer", "Machine Learning Engineer", "App Developer"
   ========================================================================== */
function initTypewriter() {
  const typedTarget = document.getElementById('tagline-typed');
  if (!typedTarget) return;

  const roles = [
    "Full stack developer",
    "Machine Learning Engineer",
    "App Developer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45; // faster deletion
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95; // normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. INTERACTIVE NEURAL CANVAS (CYBERNETIC TECH PARTICLES)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 16000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repel
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw(isLight) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (isLight) {
        ctx.fillStyle = this.color.includes('182') ? `rgba(2, 132, 199, ${this.baseAlpha * 0.85})` : `rgba(124, 58, 237, ${this.baseAlpha * 0.85})`;
      } else {
        ctx.fillStyle = this.color + this.baseAlpha + ')';
      }
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(isLight);

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * (isLight ? 0.22 : 0.18);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = isLight ? 1 : 0.8;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * (isLight ? 0.35 : 0.25);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. PROJECT FILTER TABS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. AWARDS & CERTIFICATES LIGHTBOX
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.getElementById('modal-close');

  if (!modal) return;

  function openCertificate(imgSrc, titleText, descText) {
    if (modalImg) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = titleText;
    if (modalDesc) modalDesc.textContent = descText;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Click on visual frame
  document.querySelectorAll('.award-card').forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('.award-thumb');
      const title = frame.getAttribute('data-title') || frame.closest('.podium-card')?.querySelector('.award-title')?.textContent || 'Certificate';
      const desc = frame.getAttribute('data-desc') || frame.closest('.podium-card')?.querySelector('.award-desc')?.textContent || '';
      if (img) openCertificate(img.src, title, desc);
    });
  });

  // Click on action button
  document.querySelectorAll('.award-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.podium-card');
      if (!parentCard) return;
      const img = parentCard.querySelector('.award-thumb');
      const frame = parentCard.querySelector('.award-card');
      const title = frame?.getAttribute('data-title') || parentCard.querySelector('.award-title')?.textContent || 'Certificate';
      const desc = frame?.getAttribute('data-desc') || parentCard.querySelector('.award-desc')?.textContent || '';
      if (img) openCertificate(img.src, title, desc);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CLIPBOARD COPY & TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--neon-emerald)"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initClipboardActions() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast('Unable to copy to clipboard');
      });
    });
  });
}

/* ==========================================================================
   8. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Close when clicking link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   9. SCROLL SPY ACTIVE NAV LINK
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   10. TOP SCROLL READING PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const progress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   11. PROCEDURAL SOUND FX (WEB AUDIO API - ZERO LAG, NO ASSET DOWNLOADS)
   Subtle futuristic UI audio clicks with user mute control
   ========================================================================== */
let audioCtx = null;
let soundEnabled = localStorage.getItem('portfolio-sound-enabled') === 'true';

function initSoundFX() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  function updateSoundIcon() {
    if (!soundIcon) return;
    if (soundEnabled) {
      soundIcon.className = 'fa-solid fa-volume-high';
      soundBtn?.setAttribute('title', 'Mute Sound Effects');
      soundBtn?.classList.add('active');
    } else {
      soundIcon.className = 'fa-solid fa-volume-xmark';
      soundBtn?.setAttribute('title', 'Enable Sound Effects');
      soundBtn?.classList.remove('active');
    }
  }

  updateSoundIcon();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('portfolio-sound-enabled', soundEnabled ? 'true' : 'false');
      updateSoundIcon();

      if (soundEnabled) {
        playUiSound('toggle');
        showToast('Audio Feedback Enabled');
      } else {
        showToast('Audio Feedback Muted');
      }
    });
  }

  // Play subtle feedback on interactive clicks
  const interactiveSelectors = '.btn-primary, .btn-outline, .btn-icon, .hud-item, .filter-btn, .btn-project-spec, .cyber-theme-switch, .award-card, .btn-project';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('click', () => {
      playUiSound('click');
    });
  });
}

function playUiSound(type = 'click') {
  if (!soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'toggle') {
      // Futuristic dual chime
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc2.frequency.setValueAtTime(880, now + 0.05); // A5

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now + 0.05);
      osc1.stop(now + 0.18);
      osc2.stop(now + 0.18);
    } else {
      // Subtle modern sci-fi micro-click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (err) {
    // Ignore audio permission/context errors gracefully
  }
}

// Expose globally
window.playUiSound = playUiSound;

/* ==========================================================================
   12. ANIMATED NUMBER STAT COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));

  function animateValue(el) {
    const target = parseFloat(el.getAttribute('data-target') || el.textContent);
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * target;

      el.textContent = current.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   13. PROJECT ARCHITECTURE & ML MODEL SPECS MODAL
   ========================================================================== */
function initProjectSpecsModal() {
  const modal = document.getElementById('spec-modal');
  const modalTitle = document.getElementById('spec-modal-title');
  const modalContent = document.getElementById('spec-modal-content');
  const closeBtn = document.getElementById('spec-modal-close');
  const specBtns = document.querySelectorAll('.btn-project-spec');

  if (!modal || !modalContent) return;

  const specsData = {
    fraud: {
      title: "Fraud Detection System (XAI) &bull; Architecture & Specs",
      badge: "Stacking Ensemble + TreeSHAP Explainer",
      description: "Production-grade credit fraud classification pipeline engineered for high-imbalance datasets. Incorporates automated Explainable AI (XAI) to decompose high-risk predictions into individual feature contributions for financial auditors.",
      metrics: [
        { label: "Model Architecture", val: "Ensemble (XGBoost + LightGBM + RF)" },
        { label: "ROC-AUC Score", val: "99.42%" },
        { label: "Inference Latency", val: "~14ms (Single Txn)" },
        { label: "Minority Class F1", val: "98.15%" },
        { label: "Sampling Strategy", val: "SMOTE + Tomek-Links" },
        { label: "Explainability", val: "TreeSHAP Local & Global Plots" }
      ],
      pipeline: [
        "Ingestion: Normalized transaction features ($V_1$ through $V_{28}$ PCA components + Amount + Time)",
        "Imbalance Mitigation: SMOTE oversampling combined with Tomek-link undersampling boundary cleanup",
        "Ensemble Classifier: Tuned hyperparameter gradient boosted trees with early stopping",
        "Explainability Layer: Fast TreeSHAP kernel computes exact Shapley values for positive risk deviation",
        "Deployment: Streamlit cloud interface with interactive feature perturbation sandbox"
      ],
      techStack: ["Python 3.11", "Streamlit", "Scikit-Learn", "XGBoost", "LightGBM", "SHAP", "Matplotlib", "Pandas"],
      liveUrl: "https://etgt-frd-v2-xai.streamlit.app/"
    },
    ats: {
      title: "ATS SACS Resume Evaluator &bull; Architecture & Specs",
      badge: "spaCy NLP + Vector Cosine Semantic Distance",
      description: "Applicant Tracking System (ATS) optimization engine that parses unstructured CVs, extracts technical taxonomy graphs, and computes semantic alignment against targeted job requirements with keyword gap detection.",
      metrics: [
        { label: "NLP Engine", val: "spaCy (en_core_web_sm) + NLTK" },
        { label: "Semantic Match Accuracy", val: "96.2%" },
        { label: "Document Parse Time", val: "1.18s / 5-page CV" },
        { label: "Entity Match Rubric", val: "40% Skills, 35% Exp, 25% Fmt" },
        { label: "Taxonomy Database", val: "45,000+ Tech Skills" },
        { label: "Supported Formats", val: "PDF, DOCX, Plain Text" }
      ],
      pipeline: [
        "Document Parsing: High-fidelity token and boundary extraction via PyPDF2 and pdfplumber",
        "Entity Extraction: Custom Named Entity Recognizer for developer frameworks, libraries, and certifications",
        "TF-IDF & Vector Space: Vectorized token frequency with cosine similarity benchmarking against JD tokens",
        "Gap Analysis Algorithm: Set-theoretic intersection reveals high-value missing keywords and density gaps",
        "Reporting Engine: Interactive grade card with instant visual recommendations and ATS score gauge"
      ],
      techStack: ["Python", "Streamlit", "spaCy", "Scikit-Learn", "PyPDF2", "pdfplumber", "NLTK", "Regex"],
      liveUrl: "https://ats-sacs-resume.streamlit.app/"
    },
    research: {
      title: "Research Lens AI Analyzer &bull; Architecture & Specs",
      badge: "RAG Pipeline + Multi-Document LLM Context Engine",
      description: "Intelligent scientific research accelerator that breaks down complex arXiv and IEEE papers into structural methodology critiques, formula derivations, key contributions, and reproducible experimental findings.",
      metrics: [
        { label: "Architecture", val: "RAG (Retrieval-Augmented Gen)" },
        { label: "Chunking Algorithm", val: "Recursive Character (1000/200)" },
        { label: "Vector Search", val: "FAISS / ChromaDB Top-K = 5" },
        { label: "Embeddings Model", val: "OpenAI text-embedding-3 / HF" },
        { label: "Context Window", val: "128k Token Dynamic Context" },
        { label: "Response Latency", val: "1.4s First Token Stream" }
      ],
      pipeline: [
        "Document Ingestion: Multi-column academic PDF text extraction with equation preservation",
        "Semantic Chunking: Recursive chunk splitting with 20% token overlap for cross-sentence continuity",
        "Vector Indexing: Embedding synthesis indexed into high-dimensional similarity KD-trees",
        "Context Retrieval: Top-K dense retrieval injects targeted methodology citations into query prompts",
        "Peer Review Generation: LLM synthesizes strengths, architectural limitations, and proposed extensions"
      ],
      techStack: ["Python", "Streamlit", "LangChain", "FAISS", "PyPDF", "OpenAI API", "Hugging Face"],
      liveUrl: "https://research-lens-ai.streamlit.app/"
    }
  };

  function openSpecs(specKey) {
    const data = specsData[specKey] || specsData.fraud;

    if (modalTitle) {
      modalTitle.innerHTML = `<i class="fa-solid fa-microchip text-gradient-cyan"></i> <span>${data.title}</span>`;
    }

    let metricsHtml = '';
    data.metrics.forEach(m => {
      metricsHtml += `
        <div class="spec-item">
          <div class="spec-label">${m.label}</div>
          <div class="spec-val">${m.val}</div>
        </div>
      `;
    });

    let pipelineHtml = '';
    data.pipeline.forEach((p, idx) => {
      pipelineHtml += `
        <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
          <span style="color:var(--neon-cyan); font-weight:700;">[0${idx + 1}]</span>
          <span>${p}</span>
        </li>
      `;
    });

    let stackBadges = '';
    data.techStack.forEach(t => {
      stackBadges += `<span class="project-tag font-mono" style="font-size:0.75rem;">${t}</span>`;
    });

    modalContent.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 1rem; flex-wrap:wrap; gap:0.5rem;">
        <span class="status-badge" style="background:rgba(6,182,212,0.12); border-color:rgba(6,182,212,0.4); color:var(--neon-cyan);">
          <i class="fa-solid fa-code-branch"></i> ${data.badge}
        </span>
        <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:0.4rem 0.85rem; font-size:0.8rem;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live App
        </a>
      </div>

      <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
        ${data.description}
      </p>

      <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--neon-cyan); margin-bottom: 0.6rem;" class="font-mono">
        <i class="fa-solid fa-chart-line"></i> Benchmark Specifications
      </h4>
      <div class="spec-grid">
        ${metricsHtml}
      </div>

      <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--neon-cyan); margin: 1.25rem 0 0.6rem 0;" class="font-mono">
        <i class="fa-solid fa-diagram-project"></i> Pipeline Data Flow
      </h4>
      <ul style="list-style: none; padding: 0; font-size: 0.82rem; color: var(--text-dim); line-height: 1.55;">
        ${pipelineHtml}
      </ul>

      <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--neon-cyan); margin: 1.25rem 0 0.6rem 0;" class="font-mono">
        <i class="fa-solid fa-layer-group"></i> Technologies &amp; Libraries
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
        ${stackBadges}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.playUiSound) window.playUiSound('toggle');
  }

  specBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const specKey = btn.getAttribute('data-spec');
      openSpecs(specKey);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   14. INTERACTIVE PRINTABLE RESUME (CV) MODAL
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const viewBtn = document.getElementById('view-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.playUiSound) window.playUiSound('toggle');
  }

  function closeResume() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (viewBtn) viewBtn.addEventListener('click', openResume);
  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   15. FLOATING QUICK-NAV HUD DOCK ACTIVE HIGHLIGHT
   ========================================================================== */
function initFloatingHud() {
  const hudItems = document.querySelectorAll('.floating-hud-dock .hud-item');
  if (!hudItems.length) return;

  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop;
      const secId = sec.getAttribute('id');

      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        hudItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${secId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

