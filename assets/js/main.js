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
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE WITH LOCALSTORAGE PERSISTENCE
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);

      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      themeBtn?.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      themeBtn?.setAttribute('title', 'Switch to Light Mode');
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

  const awardCards = document.querySelectorAll('.award-card');

  awardCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.award-thumb');
      const title = card.querySelector('.award-title');
      const desc = card.querySelector('.award-desc');

      if (img && modalImg) modalImg.src = img.src;
      if (title && modalTitle) modalTitle.textContent = title.textContent;
      if (desc && modalDesc) modalDesc.textContent = desc.textContent;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
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
