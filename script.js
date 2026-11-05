/* ═══════════════════════════════════════════════════════════════
   SOVIET ARCHITECTURAL PORTFOLIO — script.js
   Saim Shakeel | Python Backend & Android Architect

   Architecture:
   ┌─ Architectural Canvas  (Axonometric drafting grid, wireframe monoliths, concrete dust)
   ├─ Drafting Reticle      (Architectural crosshair cursor with precision lag)
   ├─ Nav & Progress        (Scroll-aware architectural index)
   ├─ Reveal System         (IntersectionObserver for precast panels)
   ├─ Hero                  (Typewriter, monumental perspective tilt, parallax)
   ├─ Card Canvases         (Constructivist Tower / Modular Facade / Modernist Rotunda)
   ├─ Structural Gauges     (Skill load bars animated on reveal)
   ├─ Dossier Cards         (Mouse-follow radial concrete light)
   └─ Contact Dispatch      (Telegraphic form validation & feedback)
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── Global State ────────────────────────────────────────────────────────────
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2 };
let scrollY = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Palette Constants
const PALETTE = {
  slateGrey:       '#7A828A',
  cloudyGrey:      '#A3AAAE',
  dustyConcrete:   '#C2C7C5',
  mutedKhaki:      '#9C8E85',
  fadedTerracotta: '#8A6552',
  bgVoid:          '#131518',
  bgMonolith:      '#1a1d21',
  bgPanel:         '#21252b'
};

// ─── Boot Sequence ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  trackMouse();
  initCursor();
  initNav();
  initProgress();
  initReveal();
  initHero();
  initCardCanvases();
  initSkillBars();
  initLinkCards();
  initContactForm();
  if (!reducedMotion) initArchitecturalCanvas();
});

// ═══════════════════════════════════════════════════════════════════════════════
//  MOUSE TRACKING WITH INTERPOLATION
// ═══════════════════════════════════════════════════════════════════════════════
function trackMouse() {
  document.addEventListener('mousemove', e => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
  }, { passive: true });

  (function loop() {
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;
    requestAnimationFrame(loop);
  })();
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ARCHITECTURAL DRAFTING RETICLE CURSOR
// ═══════════════════════════════════════════════════════════════════════════════
function initCursor() {
  const outer = document.getElementById('cursor-outer');
  const inner = document.getElementById('cursor-inner');
  if (!outer || !inner) return;

  outer.style.opacity = '0';
  inner.style.opacity = '0';
  let shown = false;

  document.addEventListener('mousemove', () => {
    if (!shown) {
      outer.style.opacity = '1';
      inner.style.opacity = '1';
      shown = true;
    }
  }, { once: false, passive: true });

  let ox = mouse.tx, oy = mouse.ty;

  (function loop() {
    ox += (mouse.tx - ox) * 0.14;
    oy += (mouse.ty - oy) * 0.14;

    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';
    inner.style.left = mouse.tx + 'px';
    inner.style.top  = mouse.ty + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .project-card, .link-card, input, textarea, .stat-plinth').forEach(el => {
    el.addEventListener('mouseenter', () => outer.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outer.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => { outer.style.opacity = '0'; inner.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { outer.style.opacity = '1'; inner.style.opacity = '1'; });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  NAVIGATION & SCROLL MONOLITH
// ═══════════════════════════════════════════════════════════════════════════════
function initNav() {
  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('hamburger');
  const links    = document.getElementById('navLinks');
  const allLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    scrollY = window.scrollY;
    if (scrollY > 35) nav.classList.add('scrolled');
    else              nav.classList.remove('scrolled');
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('no-scroll', open);
  });

  allLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        smoothScrollTo(target);
        burger.classList.remove('open');
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  document.querySelectorAll('a.nav-logo').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.footer-nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) smoothScrollTo(target);
    });
  });

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
    });
    allLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
}

function smoothScrollTo(el) {
  const offset = 74;
  const top    = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DRAFTING SCALE PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════════════════
function initProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PRECAST PANEL REVEAL ON SCROLL
// ═══════════════════════════════════════════════════════════════════════════════
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach(el => io.observe(el));
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HERO: TYPEWRITER & CONSTRUCTIVIST MONUMENT TILT
// ═══════════════════════════════════════════════════════════════════════════════
function initHero() {
  const el = document.getElementById('heroSub');
  if (el) {
    const full = el.textContent.trim();
    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '■';
    cursor.style.cssText = `color:${PALETTE.fadedTerracotta};font-size:0.85em;margin-left:4px;animation:cursor-blink 0.75s step-end infinite;`;
    el.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = '@keyframes cursor-blink{0%,100%{opacity:1}50%{opacity:0}}';
    document.head.appendChild(style);

    setTimeout(() => {
      const iv = setInterval(() => {
        el.insertBefore(document.createTextNode(full[i++]), cursor);
        if (i >= full.length) { clearInterval(iv); cursor.remove(); }
      }, 20);
    }, 800);
  }

  // Hero Monument tilt on mouse move
  const right = document.getElementById('heroRight');
  const plinth = document.getElementById('orbSystem');
  if (right && plinth && !reducedMotion) {
    document.addEventListener('mousemove', () => {
      const rect = right.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (mouse.x - cx) / (rect.width  / 2 || 1);
      const dy   = (mouse.y - cy) / (rect.height / 2 || 1);
      const tiltX = dy * -7;
      const tiltY = dx *  7;
      right.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }, { passive: true });

    right.addEventListener('mouseleave', () => {
      right.style.transition = 'transform 0.5s cubic-bezier(0.2, 0, 0, 1)';
      right.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
    right.addEventListener('mouseenter', () => {
      right.style.transition = 'transform 0.1s ease';
    });
  }

  // Parallax on monument photo
  const photo = document.getElementById('heroPhoto');
  if (photo && !reducedMotion) {
    window.addEventListener('scroll', () => {
      const p = window.scrollY * 0.12;
      photo.style.transform = `translateY(${p}px)`;
    }, { passive: true });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PER-CARD ARCHITECTURAL CANVASES
//  1. Constructivist Tower (Tatlin Monument / Kinetic Lattice)
//  2. Modular Brutalist Facade (Precast Panel Matrix)
//  3. Modernist Observatory Rotunda (Geodesic Dome / Parabolic Radar)
// ═══════════════════════════════════════════════════════════════════════════════
function initCardCanvases() {
  document.querySelectorAll('.body-canvas').forEach(canvas => {
    const type = canvas.dataset.type;
    const wrap = canvas.closest('.card-visual');
    if (!wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width  = wrap.offsetWidth  * dpr;
      canvas.height = wrap.offsetHeight * dpr;
      canvas.style.width  = wrap.offsetWidth  + 'px';
      canvas.style.height = wrap.offsetHeight + 'px';
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const W = () => wrap.offsetWidth;
    const H = () => wrap.offsetHeight;

    if (type === 'supernova') drawConstructivistTower(ctx, W, H);
    else if (type === 'pulsar') drawModularBrutalistGrid(ctx, W, H);
    else if (type === 'blackhole') drawModernistRotunda(ctx, W, H);
  });
}

/* ── 1. Constructivist Kinetic Tower ── */
function drawConstructivistTower(ctx, W, H) {
  let t = 0;
  function frame() {
    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h * 0.52;
    t += 0.018;

    // Background architectural elevation grid
    ctx.strokeStyle = 'rgba(122, 130, 138, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Monumental inclined spine axis (400m tower angle)
    const lean = Math.PI * 0.18;
    const topX = cx + Math.sin(lean) * 110;
    const topY = cy - Math.cos(lean) * 110;
    const botX = cx - Math.sin(lean) * 80;
    const botY = cy + Math.cos(lean) * 80;

    // Main structural spine
    ctx.beginPath();
    ctx.moveTo(botX, botY);
    ctx.lineTo(topX, topY);
    ctx.strokeStyle = PALETTE.fadedTerracotta;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Secondary parallel girder
    const offX = 14 * Math.cos(lean);
    const offY = -14 * Math.sin(lean);
    ctx.beginPath();
    ctx.moveTo(botX + offX, botY + offY);
    ctx.lineTo(topX + offX, topY + offY);
    ctx.strokeStyle = PALETTE.slateGrey;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cross-truss bracing
    const segments = 12;
    for (let i = 0; i <= segments; i++) {
      const frac = i / segments;
      const x1 = botX + (topX - botX) * frac;
      const y1 = botY + (topY - botY) * frac;
      const x2 = botX + offX + (topX - botX) * frac;
      const y2 = botY + offY + (topY - botY) * frac;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = i % 2 === 0 ? PALETTE.dustyConcrete : PALETTE.mutedKhaki;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Load-bearing stress node
      if (i % 3 === 0) {
        ctx.beginPath();
        ctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = PALETTE.fadedTerracotta;
        ctx.fill();
      }
    }

    // Rotating kinetic spiral helix (Tatlin Monument spirals)
    const coils = 3;
    const spiralPts = 90;
    ctx.beginPath();
    for (let p = 0; p <= spiralPts; p++) {
      const frac = p / spiralPts;
      const angle = frac * Math.PI * 2 * coils + t * 0.8;
      const radius = 28 + (1 - frac) * 55;
      const centerDist = frac * 170 - 75;
      const px = cx + Math.sin(lean) * centerDist + Math.cos(angle) * radius;
      const py = cy - Math.cos(lean) * centerDist + Math.sin(angle) * (radius * 0.35);

      if (p === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'rgba(194, 199, 197, 0.75)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Second counter-rotating outer ring
    ctx.beginPath();
    for (let p = 0; p <= spiralPts; p++) {
      const frac = p / spiralPts;
      const angle = -frac * Math.PI * 2 * (coils * 0.8) - t * 0.5;
      const radius = 18 + (1 - frac) * 38;
      const centerDist = frac * 170 - 75;
      const px = cx + Math.sin(lean) * centerDist + Math.cos(angle) * radius;
      const py = cy - Math.cos(lean) * centerDist + Math.sin(angle) * (radius * 0.35);

      if (p === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'rgba(122, 130, 138, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Revolving geometric internal cylinder (The Assembly Chamber)
    const chamberY = cy - 10;
    const cw = 44, ch = 30;
    ctx.save();
    ctx.translate(cx, chamberY);
    ctx.rotate(Math.sin(t * 0.5) * 0.15);
    ctx.strokeStyle = PALETTE.fadedTerracotta;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-cw / 2, -ch / 2, cw, ch);
    ctx.fillStyle = 'rgba(138, 101, 82, 0.12)';
    ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
    ctx.beginPath();
    ctx.moveTo(-cw / 2, 0); ctx.lineTo(cw / 2, 0);
    ctx.moveTo(0, -ch / 2); ctx.lineTo(0, ch / 2);
    ctx.strokeStyle = PALETTE.cloudyGrey;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // Datum elevation marks
    ctx.font = '9px "Space Mono", monospace';
    ctx.fillStyle = PALETTE.slateGrey;
    ctx.fillText('▲ +380.0m // TOP TRUSS', cx + 45, cy - 90);
    ctx.fillText('■ +120.0m // CORE ROTOR', cx + 45, cy - 5);
    ctx.fillText('▼ 0.00m // FOUNDATION', cx - 110, cy + 85);

    requestAnimationFrame(frame);
  }
  frame();
}

/* ── 2. Modular Brutalist Panel Facade ── */
function drawModularBrutalistGrid(ctx, W, H) {
  let t = 0;
  function frame() {
    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    t += 0.02;

    const cols = 7;
    const rows = 4;
    const cellW = w / (cols + 1.2);
    const cellH = h / (rows + 1.2);
    const startX = (w - cols * cellW) / 2;
    const startY = (h - rows * cellH) / 2;

    // Background structural plane
    ctx.fillStyle = 'rgba(26, 29, 33, 0.6)';
    ctx.fillRect(startX - 10, startY - 10, cols * cellW + 20, rows * cellH + 20);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * cellW;
        const y = startY + r * cellH;
        const pad = 4;

        // Concrete panel slab frame
        ctx.strokeStyle = 'rgba(122, 130, 138, 0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellW, cellH);

        // Deep recessed window module
        const winX = x + pad;
        const winY = y + pad;
        const winW = cellW - pad * 2;
        const winH = cellH - pad * 2;

        // Shadow bevel for brutalist window reveal
        ctx.fillStyle = '#111316';
        ctx.fillRect(winX, winY, winW, winH);

        // Cycling light pulses simulating inhabited modules
        const seed = (r * 7 + c * 13) % 17;
        const lit = Math.sin(t * 1.5 + seed) > 0.45;
        const activeTerracotta = (r + c + Math.floor(t * 0.4)) % 9 === 0;

        if (activeTerracotta) {
          ctx.fillStyle = 'rgba(138, 101, 82, 0.85)';
          ctx.fillRect(winX + 2, winY + 2, winW - 4, winH - 4);
        } else if (lit) {
          ctx.fillStyle = 'rgba(194, 199, 197, 0.45)';
          ctx.fillRect(winX + 2, winY + 2, winW - 4, winH - 4);
        }

        // Window mullions (vertical and horizontal concrete fins)
        ctx.strokeStyle = 'rgba(122, 130, 138, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.stroke();
      }
    }

    // Horizontal expansion joint line
    ctx.strokeStyle = PALETTE.fadedTerracotta;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX - 15, startY + cellH * 2);
    ctx.lineTo(startX + cols * cellW + 15, startY + cellH * 2);
    ctx.stroke();

    // Architectural dimension string
    ctx.font = '8px "Space Mono", monospace';
    ctx.fillStyle = PALETTE.cloudyGrey;
    ctx.fillText('|── 3600mm ──|', startX + cellW * 0.3, startY - 14);
    ctx.fillText('МОДУЛЬ Б-04 // ELEVATION 24.0m', startX, startY + rows * cellH + 18);

    requestAnimationFrame(frame);
  }
  frame();
}

/* ── 3. Modernist Observatory Rotunda & Parabolic Radar ── */
function drawModernistRotunda(ctx, W, H) {
  let t = 0;
  function frame() {
    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h * 0.52;
    t += 0.016;

    // Concentric azimuth coordinate arcs
    const rings = [35, 65, 95, 120];
    rings.forEach((r, idx) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.45, 0, 0, Math.PI * 2);
      ctx.strokeStyle = idx === 1 ? PALETTE.fadedTerracotta : 'rgba(122, 130, 138, 0.35)';
      ctx.lineWidth = idx === 1 ? 1.5 : 1;
      ctx.stroke();
    });

    // Degree calibration ticks
    const tickCount = 24;
    for (let i = 0; i < tickCount; i++) {
      const a = (i / tickCount) * Math.PI * 2;
      const rInner = 115;
      const rOuter = 122;
      const x1 = cx + Math.cos(a) * rInner;
      const y1 = cy + Math.sin(a) * (rInner * 0.45);
      const x2 = cx + Math.cos(a) * rOuter;
      const y2 = cy + Math.sin(a) * (rOuter * 0.45);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = i % 6 === 0 ? PALETTE.dustyConcrete : PALETTE.slateGrey;
      ctx.lineWidth = i % 6 === 0 ? 1.5 : 1;
      ctx.stroke();
    }

    // Geodesic structural dome ribs
    const ribs = 8;
    for (let i = 0; i < ribs; i++) {
      const a = (i / ribs) * Math.PI;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 95, 95 * 0.45, a, 0, Math.PI);
      ctx.strokeStyle = 'rgba(163, 170, 174, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Rotating Radar Azimuth Scanner Beam
    const scanAngle = t * 1.8;
    const beamLen = 120;
    const bx = cx + Math.cos(scanAngle) * beamLen;
    const by = cy + Math.sin(scanAngle) * (beamLen * 0.45);

    const grad = ctx.createLinearGradient(cx, cy, bx, by);
    grad.addColorStop(0,   PALETTE.fadedTerracotta);
    grad.addColorStop(0.7, 'rgba(138, 101, 82, 0.4)');
    grad.addColorStop(1,   'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(bx, by);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Radar sweep fan wedge
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const wedgeAngle = 0.35;
    for (let step = 0; step <= 15; step++) {
      const curA = scanAngle - (step / 15) * wedgeAngle;
      const px = cx + Math.cos(curA) * beamLen;
      const py = cy + Math.sin(curA) * (beamLen * 0.45);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(138, 101, 82, 0.12)';
    ctx.fill();
    ctx.restore();

    // Central Parabolic Antenna Feed Horn (Focal Point)
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = PALETTE.dustyConcrete;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.strokeStyle = PALETTE.fadedTerracotta;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Azimuth Angle readout
    const deg = Math.round(((scanAngle % (Math.PI * 2)) / (Math.PI * 2)) * 360);
    ctx.font = '9px "Space Mono", monospace';
    ctx.fillStyle = PALETTE.dustyConcrete;
    ctx.fillText(`AZ: ${deg}° // FREQ: 4.7GHz`, cx - 55, cy + 70);

    requestAnimationFrame(frame);
  }
  frame();
}

// ═══════════════════════════════════════════════════════════════════════════════
//  BACKGROUND DRAFTING CANVAS
//  Axonometric drafting lines, floating monolithic wireframes & concrete dust
// ═══════════════════════════════════════════════════════════════════════════════
function initArchitecturalCanvas() {
  const canvas = document.getElementById('universe');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let W, H, dpr;
  let monoliths = [], dustMotes = [], gridPoints = [];
  let t = 0;
  let lastFrame = 0;
  const FPS = 30, FRAME_MS = 1000 / FPS;

  function resize() {
    dpr    = Math.min(window.devicePixelRatio || 1, 2);
    W      = window.innerWidth;
    H      = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }
  window.addEventListener('resize', debounce(resize, 250), { passive: true });
  resize();

  function build() {
    // 1. Drifting Concrete Dust Motes
    const count = Math.min(120, Math.round((W * H) / 9000));
    dustMotes = Array.from({ length: count }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      size:  0.8 + Math.random() * 2.2,
      base:  0.2 + Math.random() * 0.6,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -0.15 - Math.random() * 0.35, // slowly drifting upward like warm industrial air
      color: Math.random() > 0.4 ? PALETTE.dustyConcrete : PALETTE.mutedKhaki
    }));

    // 2. Monolithic 3D Wireframe Structures
    monoliths = [
      {
        x: W * 0.12, y: H * 0.35,
        w: 90, h: 140, d: 70,
        rotY: 0.4, rotX: 0.25,
        speedY: 0.003, speedX: 0.001
      },
      {
        x: W * 0.88, y: H * 0.65,
        w: 120, h: 80, d: 80,
        rotY: -0.6, rotX: 0.3,
        speedY: -0.002, speedX: 0.0015
      },
      {
        x: W * 0.5, y: H * 0.9,
        w: 160, h: 90, d: 110,
        rotY: 0.2, rotX: 0.2,
        speedY: 0.001, speedX: -0.001
      }
    ];

    // 3. Grid Crosshair Coordinates
    gridPoints = [];
    const stepX = 140, stepY = 140;
    for (let x = stepX / 2; x < W; x += stepX) {
      for (let y = stepY / 2; y < H; y += stepY) {
        gridPoints.push({ x, y });
      }
    }
  }

  // Draw 3D Wireframe Monolith Block
  function drawMonolith(m, time, mouseOffset) {
    ctx.save();
    const cx = m.x + mouseOffset.x * 25;
    const cy = m.y + mouseOffset.y * 25;
    ctx.translate(cx, cy);

    const ry = m.rotY + time * m.speedY;
    const rx = m.rotX + time * m.speedX;

    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const cosX = Math.cos(rx), sinX = Math.sin(rx);

    // 8 vertices of a rectangular cuboid monolith
    const hw = m.w / 2, hh = m.h / 2, hd = m.d / 2;
    const verts = [
      [-hw, -hh, -hd], [ hw, -hh, -hd], [ hw,  hh, -hd], [-hw,  hh, -hd],
      [-hw, -hh,  hd], [ hw, -hh,  hd], [ hw,  hh,  hd], [-hw,  hh,  hd]
    ];

    const proj = verts.map(([x, y, z]) => {
      // Rotate Y
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate X
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      return [x1, y2, z2];
    });

    const edges = [
      [0,1],[1,2],[2,3],[3,0], // back
      [4,5],[5,6],[6,7],[7,4], // front
      [0,4],[1,5],[2,6],[3,7]  // connectors
    ];

    ctx.strokeStyle = 'rgba(122, 130, 138, 0.22)';
    ctx.lineWidth = 1;

    edges.forEach(([i1, i2]) => {
      ctx.beginPath();
      ctx.moveTo(proj[i1][0], proj[i1][1]);
      ctx.lineTo(proj[i2][0], proj[i2][1]);
      ctx.stroke();
    });

    // Accent load nodes on corners in terracotta
    proj.forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = PALETTE.fadedTerracotta;
      ctx.fill();
    });

    ctx.restore();
  }

  function loop(ts) {
    if (ts - lastFrame < FRAME_MS) { requestAnimationFrame(loop); return; }
    lastFrame = ts;
    t += 0.016;

    ctx.clearRect(0, 0, W, H);

    // Mouse offset normalization (-1 to 1)
    const mouseOffset = {
      x: (mouse.x - W / 2) / (W / 2 || 1),
      y: (mouse.y - H / 2) / (H / 2 || 1)
    };

    // 1. Perspective Blueprint Grid lines
    const gridY = H * 0.75 + mouseOffset.y * 30;
    ctx.strokeStyle = 'rgba(122, 130, 138, 0.08)';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 20; i++) {
      const x1 = (i / 10) * W;
      ctx.beginPath();
      ctx.moveTo(x1, gridY);
      ctx.lineTo(W / 2 + (x1 - W / 2) * 2.8, H);
      ctx.stroke();
    }

    // 2. Crosshair coordinate markers
    gridPoints.forEach(pt => {
      const px = pt.x + mouseOffset.x * 8;
      const py = pt.y + mouseOffset.y * 8;
      ctx.strokeStyle = 'rgba(163, 170, 174, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px - 4, py); ctx.lineTo(px + 4, py);
      ctx.moveTo(px, py - 4); ctx.lineTo(px, py + 4);
      ctx.stroke();
    });

    // 3. Floating 3D Wireframe Monoliths
    monoliths.forEach(m => drawMonolith(m, t, mouseOffset));

    // 4. Concrete Dust Particulates
    dustMotes.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.y < -10) { d.y = H + 10; d.x = Math.random() * W; }
      if (d.x < -10) d.x = W + 10;
      if (d.x > W + 10) d.x = -10;

      const alpha = d.base + Math.sin(t * 1.5 + d.x) * 0.15;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fillStyle = d.color === PALETTE.dustyConcrete
        ? `rgba(194, 199, 197, ${alpha})`
        : `rgba(156, 142, 133, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STRUCTURAL LOAD GAUGES (SKILL BARS)
// ═══════════════════════════════════════════════════════════════════════════════
function initSkillBars() {
  const fills = document.querySelectorAll('.sk-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const w  = el.dataset.w;
      el.style.width = w + '%';
      el.classList.add('active');
      io.unobserve(el);
    });
  }, { threshold: 0.25 });

  fills.forEach(f => { f.style.width = '0'; io.observe(f); });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DOSSIER CARDS: MOUSE RADIAL CONCRETE LIGHT
// ═══════════════════════════════════════════════════════════════════════════════
function initLinkCards() {
  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TELEGRAPHIC CONTACT DISPATCH FORM
// ═══════════════════════════════════════════════════════════════════════════════
function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = form.name.value.trim();
    const email = form.email.value.trim();
    const msg   = form.message.value.trim();

    feedback.textContent = '';
    feedback.className   = 'form-feedback mono';

    if (!name || !email || !msg) {
      setFeedback('[ ОШИБКА ] Заполните все поля // Please fill all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback('[ ОШИБКА ] Некорректный адрес связи // Invalid email address.', 'error');
      return;
    }

    const btn = form.querySelector('.btn-send');
    btn.disabled = true;
    const txtSpan = btn.querySelector('.btn-text');
    const origText = txtSpan.textContent;
    txtSpan.textContent = '[ ПЕРЕДАЧА ДЕПЕШИ… // TRANSMITTING… ]';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      txtSpan.textContent = origText;
      setFeedback('[ ДЕПЕША ПРИНЯТА ] Сообщение передано // Transmission received successfully.', 'success');
    }, 1200);
  });

  function setFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className   = 'form-feedback mono ' + type;
    setTimeout(() => {
      feedback.textContent = '';
      feedback.className   = 'form-feedback mono';
    }, 6500);
  }
}

// ── Utility: Debounce ──
function debounce(fn, ms) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
}
