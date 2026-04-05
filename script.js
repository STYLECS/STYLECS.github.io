// ============================================
//   NAJMI.DEV - RETRO PIXEL PORTFOLIO JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──────────────────────────
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  cursorDot.style.cssText = `
    position: fixed;
    width: 12px; height: 12px;
    background: #39ff14;
    border: 2px solid #0a0a0f;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    image-rendering: pixelated;
    box-shadow: 0 0 10px #39ff14, 0 0 20px #39ff1440;
    transition: transform 0.05s;
  `;
  document.body.appendChild(cursorDot);

  const cursorTrail = document.createElement('div');
  cursorTrail.style.cssText = `
    position: fixed;
    width: 6px; height: 6px;
    background: rgba(57,255,20,0.4);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.12s, top 0.12s;
  `;
  document.body.appendChild(cursorTrail);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
    cursorTrail.style.left = mouseX + 'px';
    cursorTrail.style.top  = mouseY + 'px';
  });

  // Cursor hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, .skill-category, .stat-box');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorDot.style.background = '#00f5ff';
      cursorDot.style.boxShadow = '0 0 10px #00f5ff, 0 0 20px #00f5ff40';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDot.style.background = '#39ff14';
      cursorDot.style.boxShadow = '0 0 10px #39ff14, 0 0 20px #39ff1440';
    });
  });


  // ── TYPEWRITER EFFECT ──────────────────────
  const phrases = [
    'Unity Game Developer',
    '2D & 3D Specialist',
    'C# Programmer',
    'Game Designer',
    'Level Architect',
    'Pixel Art Lover',
  ];
  const typeEl = document.getElementById('typewriter');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    if (!typeEl) return;
    const current = phrases[phraseIdx];
    if (deleting) {
      typeEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 50);
    } else {
      typeEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    }
  }
  type();


  // ── NAVBAR ACTIVE LINK ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar   = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(57,255,20,0.2)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(57,255,20,0.15)';
    }

    // Active section detection
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? '#39ff14'
        : '';
      link.style.textShadow = link.getAttribute('href') === '#' + current
        ? '0 0 10px #39ff14, 0 0 20px #39ff1440'
        : '';
    });
  });


  // ── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll(
    '.about-card-left, .about-text, .skill-category, .project-card, .contact-text, .contact-form-box, .achievement'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── SKILL BAR ANIMATION ────────────────────
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const target = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = target + '%';
        }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));


  // ── CONTACT FORM ───────────────────────────
  const sendBtn  = document.getElementById('sendBtn');
  const formMsg  = document.getElementById('formMsg');
  const inputs   = document.querySelectorAll('.form-input, .form-textarea');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name    = document.querySelector('.form-input[placeholder*="name"]')?.value.trim();
      const email   = document.querySelector('.form-input[placeholder*="email"]')?.value.trim();
      const message = document.querySelector('.form-textarea')?.value.trim();

      if (!name || !email || !message) {
        typeFormMsg('> ERROR: ALL FIELDS REQUIRED!', '#ff2a6d');
        shakeBtn(sendBtn);
        return;
      }
      if (!validateEmail(email)) {
        typeFormMsg('> ERROR: INVALID EMAIL FORMAT!', '#ff2a6d');
        shakeBtn(sendBtn);
        return;
      }

      sendBtn.textContent = '▶ SENDING...';
      sendBtn.style.background = '#ffe600';
      sendBtn.style.color = '#0a0a0f';
      sendBtn.disabled = true;

      setTimeout(() => {
        sendBtn.textContent = '✓ MESSAGE SENT!';
        sendBtn.style.background = '#39ff14';
        typeFormMsg('> SUCCESS! MESSAGE DELIVERED. QUEST COMPLETE! +100 XP', '#39ff14');
        inputs.forEach(i => i.value = '');
        setTimeout(() => {
          sendBtn.textContent = '▶ SEND MESSAGE';
          sendBtn.style.background = '#39ff14';
          sendBtn.disabled = false;
          formMsg.textContent = '';
        }, 4000);
      }, 1500);
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function typeFormMsg(text, color) {
    formMsg.style.color = color;
    formMsg.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      formMsg.textContent += text[i++];
      if (i >= text.length) clearInterval(iv);
    }, 30);
  }

  function shakeBtn(btn) {
    btn.style.animation = 'none';
    btn.style.transform = 'translateX(-4px)';
    setTimeout(() => btn.style.transform = 'translateX(4px)', 80);
    setTimeout(() => btn.style.transform = 'translateX(-4px)', 160);
    setTimeout(() => btn.style.transform = 'translateX(0)',    240);
  }


  // ── PIXEL PARTICLE SPAWN ───────────────────
  function spawnPixel(x, y) {
    const p = document.createElement('div');
    const colors = ['#39ff14', '#00f5ff', '#ffe600', '#ff2a6d', '#9b5de5'];
    const size   = Math.random() * 6 + 4;
    const vx     = (Math.random() - 0.5) * 120;
    const vy     = -(Math.random() * 80 + 40);
    p.style.cssText = `
      position:fixed; width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${x}px; top:${y}px;
      pointer-events:none; z-index:9997;
      image-rendering:pixelated;
    `;
    document.body.appendChild(p);
    let posX = x, posY = y, velY = vy, t = 0;
    const grav = 200;
    let last = performance.now();
    function animate(now) {
      const dt = (now - last) / 1000;
      last = now;
      t += dt;
      velY += grav * dt;
      posX += vx * dt;
      posY += velY * dt;
      p.style.left = posX + 'px';
      p.style.top  = posY + 'px';
      p.style.opacity = Math.max(0, 1 - t / 0.8);
      if (t < 0.8) requestAnimationFrame(animate);
      else p.remove();
    }
    requestAnimationFrame(animate);
  }

  document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) spawnPixel(e.clientX, e.clientY);
  });


  // ── RETRO GLITCH ON HOVER (Title) ─────────
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
      heroTitle.style.animation = 'glitch 0.4s steps(2) 3';
    });
    heroTitle.addEventListener('animationend', () => {
      heroTitle.style.animation = '';
    });
  }

  // Inject glitch keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch {
      0%   { transform: translate(0); filter: none; }
      20%  { transform: translate(-3px, 1px); filter: hue-rotate(90deg); }
      40%  { transform: translate(3px, -1px); filter: hue-rotate(-90deg); }
      60%  { transform: translate(-2px, 2px); }
      80%  { transform: translate(2px, -2px); filter: hue-rotate(45deg); }
      100% { transform: translate(0); filter: none; }
    }
    @keyframes coin-pop {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.4) rotate(180deg); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);


  // ── PROJECT CARD PIXEL NOISE ───────────────
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const screen = card.querySelector('.project-screen');
      if (screen) {
        screen.style.filter = 'brightness(1.2) contrast(1.1)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const screen = card.querySelector('.project-screen');
      if (screen) screen.style.filter = '';
    });
  });


  // ── COIN CLICK ANIMATION ───────────────────
  const coins = document.querySelectorAll('.coin');
  coins.forEach(coin => {
    coin.addEventListener('click', (e) => {
      e.stopPropagation();
      coin.style.animation = 'coin-pop 0.4s ease';
      for (let i = 0; i < 8; i++) spawnPixel(e.clientX, e.clientY);
      setTimeout(() => coin.style.animation = '', 400);
    });
  });


  // ── KONAMI CODE EASTER EGG ─────────────────
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        activateKonami();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function activateKonami() {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position:fixed; top:50%; left:50%;
      transform: translate(-50%,-50%);
      background: #0a0a0f;
      border: 4px solid #39ff14;
      box-shadow: 0 0 40px #39ff14;
      padding: 40px 60px;
      text-align: center;
      z-index: 10000;
      font-family: 'Press Start 2P', monospace;
    `;
    banner.innerHTML = `
      <div style="font-size:1.2rem;color:#ffe600;margin-bottom:20px">🎮 CHEAT CODE!</div>
      <div style="font-size:0.7rem;color:#39ff14;line-height:2">KONAMI CODE ACTIVATED<br>+30 LIVES GRANTED<br>ALL SKILLS UNLOCKED!</div>
      <div style="font-size:0.45rem;color:#00f5ff;margin-top:20px">CLICK TO CLOSE</div>
    `;
    document.body.appendChild(banner);
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        spawnPixel(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
      }, i * 50);
    }
    banner.addEventListener('click', () => banner.remove());
  }


  // ── SMOOTH ANCHOR SCROLL ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── HERO STATS COUNTER ─────────────────────
  const statValues = document.querySelectorAll('.stat-value');
  statValues.forEach(sv => {
    const text = sv.textContent;
    if (!isNaN(parseInt(text))) {
      const final = parseInt(text);
      let current = 0;
      const step = Math.ceil(final / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, final);
        sv.textContent = current;
        if (current >= final) clearInterval(timer);
      }, 30);
    }
  });


  // ── INIT LOG ───────────────────────────────
  console.log('%c[NAJMI.DEV]', 'color:#39ff14;font-family:monospace;font-size:16px;font-weight:bold');
  console.log('%c> Portfolio loaded successfully.', 'color:#00f5ff;font-family:monospace');
  console.log('%c> Try the KONAMI CODE: ↑↑↓↓←→←→BA', 'color:#ffe600;font-family:monospace');
  console.log('%c> Unity Game Developer | C# | 2D & 3D', 'color:#9b5de5;font-family:monospace');

});
