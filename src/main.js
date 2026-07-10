import gsap from 'gsap';
import { createIcons, X, Microscope } from 'lucide';

// Initialize tree-shaken Lucide icons
createIcons({ icons: { X, Microscope } });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallViewport = window.matchMedia('(max-width: 768px)').matches;

// ==========================================
// 1. DOM REFERENCES
// ==========================================
const hero = document.getElementById('hero');
const heroCopy = document.getElementById('hero-copy');
const heroCircle = document.getElementById('hero-circle');

const prodJar = document.getElementById('prod-jar');
const prodAmber = document.getElementById('prod-amber');
const prodMain = document.getElementById('prod-main');
const prodWhite = document.getElementById('prod-white');
const prodSmall = document.getElementById('prod-small');

const sphere1 = document.getElementById('sphere-1');
const sphere2 = document.getElementById('sphere-2');

const detailLeft = document.getElementById('detail-left');
const detailRight = document.getElementById('detail-right');

// Drawer references
const btnOpenDrawer = document.getElementById('btn-open-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const specsDrawer = document.getElementById('specs-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const btnRitual = document.getElementById('btn-add-ritual');

// ==========================================
// 2. ENTRANCE TIMELINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  if (prefersReducedMotion) {
    gsap.set('#navbar, #hero-brand, #hero-copy, .hero-product, .hero-sphere, .footer-track', { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('#navbar', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 });
  tl.fromTo('#hero-brand', { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3');
  tl.fromTo('#hero-copy > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.35');

  // Products enter smoothly into their compact right-side positions
  const products = [prodJar, prodAmber, prodMain, prodWhite, prodSmall].filter(Boolean);
  tl.fromTo(products,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
    '-=0.5'
  );

  tl.fromTo(['#sphere-1', '#sphere-2'],
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
    '-=0.5'
  );

  tl.fromTo('.footer-track', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.4');
});

// ==========================================
// 3. HOVER EXPAND CHOREOGRAPHY (AESOP REFERENCE)
// Interruption-safe timeline driven by pointer enter/leave
// ==========================================
if (hero && !prefersReducedMotion && !isSmallViewport) {
  const hoverTl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' }
  });

  // Phase 1: Fade out initial left copy as product movement begins
  hoverTl.to(heroCopy, {
    y: -18,
    opacity: 0,
    duration: 0.38,
    ease: 'power2.inOut'
  }, 0);

  // Reveal circular backdrop behind central lineup
  if (heroCircle) {
    hoverTl.fromTo(heroCircle,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
      0.08
    );
  }

  // Phase 2: Asymmetrical product dispersion across lower-middle width
  // Product stagger 40-80ms (using exact timings)
  // Total duration: ~1.3s
  if (prodJar) {
    hoverTl.to(prodJar, { x: -580, y: 0, duration: 1.25 }, 0.04);
  }
  if (prodAmber) {
    hoverTl.to(prodAmber, { x: -420, y: 0, duration: 1.28 }, 0.08);
  }
  if (prodMain) {
    // Large cream shampoo (540px tall) shifts left to anchor the exact screen center
    hoverTl.to(prodMain, { x: -250, y: 0, duration: 1.3 }, 0.12);
  }
  if (prodWhite) {
    // White conditioner shifts slightly right/center-right
    hoverTl.to(prodWhite, { x: -80, y: 0, duration: 1.28 }, 0.16);
  }
  if (prodSmall) {
    // Smaller amber bottle moves to far right of lineup
    hoverTl.to(prodSmall, { x: 45, y: 0, duration: 1.25 }, 0.20);
  }

  // Decorative spheres move outward toward cluster edges along floor line
  if (sphere1) {
    hoverTl.to(sphere1, { x: -160, duration: 1.2 }, 0.1);
  }
  if (sphere2) {
    hoverTl.to(sphere2, { x: 80, duration: 1.2 }, 0.14);
  }

  // Phase 3: Reveal bottom-left and bottom-right corner details smoothly
  if (detailLeft) {
    hoverTl.fromTo(detailLeft,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      0.65
    );
  }
  if (detailRight) {
    hoverTl.fromTo(detailRight,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      0.70
    );
  }

  // Pointer event listeners
  hero.addEventListener('mouseenter', () => {
    if (detailLeft) detailLeft.style.pointerEvents = 'auto';
    if (detailRight) detailRight.style.pointerEvents = 'auto';
    hoverTl.play();
  });

  hero.addEventListener('mouseleave', () => {
    if (detailLeft) detailLeft.style.pointerEvents = 'none';
    if (detailRight) detailRight.style.pointerEvents = 'none';
    hoverTl.reverse();
  });
}

// ==========================================
// 4. CLINICAL SPECS DRAWER CONTROLS
// ==========================================
function openDrawer() {
  specsDrawer?.classList.add('active');
  drawerOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  specsDrawer?.classList.remove('active');
  drawerOverlay?.classList.remove('active');
  document.body.style.overflow = 'auto';
}

btnOpenDrawer?.addEventListener('click', openDrawer);
btnCloseDrawer?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && specsDrawer?.classList.contains('active')) {
    closeDrawer();
  }
});

// CTA Micro-interaction
if (btnRitual) {
  btnRitual.addEventListener('click', () => {
    const orig = btnRitual.textContent;
    btnRitual.textContent = 'Selected ✓ Added to Ritual Bag';
    gsap.fromTo(btnRitual, { scale: 0.98 }, { scale: 1.01, duration: 0.2, yoyo: true, repeat: 1 });
    setTimeout(() => {
      btnRitual.textContent = orig;
    }, 2400);
  });
}
