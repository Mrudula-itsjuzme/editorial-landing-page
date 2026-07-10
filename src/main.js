import gsap from 'gsap';
import { createIcons, X, Microscope } from 'lucide';

// Initialize tree-shaken Lucide icons
createIcons({ icons: { X, Microscope } });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ==========================================
// 1. AESOP REGIMEN DATA STORE
// ==========================================
const AESOP_REGIMENS = {
  violet: {
    id: 'violet',
    eyebrow: 'A daily regimen • 01 / Violet Leaf',
    title: 'Your personal selection',
    prose: 'We propose a daily regimen comprising our 99.5% natural origin index gentle daily shampoo, enriched with amino acids and live prebiotic ferments suited to canine and feline delicate dermal mantles.',
    topNotes: 'Crisp Violet Leaf, Dewy Morning Bergamot, Botanical Lavender',
    heartNotes: 'Orris Root, White Muslin Accord, Soothing Chamomile Flower',
    baseNotes: 'Clean Cedarwood, Soft Cashmere, Gentle Amber',
    price: '$38',
    theme: 'aesop-theme-violet'
  },
  santal: {
    id: 'santal',
    eyebrow: 'A daily regimen • 02 / Santal & White Tea',
    title: 'Warm santal infusion',
    prose: 'Formulated for deep calming restoration and antioxidant dermal defense. Featuring Australian sandalwood, green fig leaf, and white tea antioxidants to nourish sensitive companion coats.',
    topNotes: 'Antioxidant White Tea Leaves, Italian Mandarin, Green Fig Leaf',
    heartNotes: 'Australian Sandalwood, Cardamom Pods, Iris Flower',
    baseNotes: 'Warm Amber crystals, Vetiver Root, Muted Tonka Bean',
    price: '$38',
    theme: 'aesop-theme-santal'
  },
  fig: {
    id: 'fig',
    eyebrow: 'A daily regimen • 03 / Fig & Neroli',
    title: 'Mediterranean vitality',
    prose: 'An uplifting Mediterranean botanical blend engineered to purify environmental impurities. Sun-ripened fig extract and Tunisian neroli restore natural coat luster and sebum balance.',
    topNotes: 'Sun-ripened Mediterranean Fig, Tunisian Neroli, Lemon Zest',
    heartNotes: 'Green Cypress Wood, Petitgrain, Fresh Jasmine Petals',
    baseNotes: 'Earthy Cedarwood, Sun-warmed Bark, Clean Musk',
    price: '$38',
    theme: 'aesop-theme-fig'
  }
};

let currentRegimen = 'violet';

// ==========================================
// 2. SIGNATURE AESOP CINEMATIC LOAD TIMELINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  if (prefersReducedMotion) {
    gsap.set('.gs-mask-item, .table-vessel, .footer-track', { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Top nav reveals softly
  tl.fromTo('#navbar', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.45 });

  // 2. Left editorial prose emerges via cinematic vertical mask slides
  tl.fromTo('.gs-mask-item', 
    { opacity: 0, y: 18 }, 
    { opacity: 1, y: 0, duration: 0.65, stagger: 0.07 }, 
    '-=0.25'
  );

  // 3. Right ensemble table vessels emerge from the table with left-to-right cinematic stagger
  tl.fromTo('.gs-vessel',
    { opacity: 0, y: 38, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.78, stagger: 0.12, ease: 'power3.out' },
    '-=0.55'
  );

  // 4. Swiss clinical footer bar settles
  tl.fromTo('.footer-track', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.35');

  // Set initial focus optical state
  applyOpticalRackFocus('violet', true);
});

// ==========================================
// 3. OPTICAL DEPTH-OF-FIELD (DoF) RACK-FOCUS ENGINE
// ==========================================
const eyebrowEl = document.getElementById('regimen-eyebrow');
const titleEl = document.getElementById('regimen-title');
const proseEl = document.getElementById('regimen-prose');
const btnRitual = document.getElementById('btn-add-ritual');
const tabs = document.querySelectorAll('.aesop-tab');
const vessels = document.querySelectorAll('.gs-vessel');

// Drawer elements
const drawerScentName = document.getElementById('drawer-scent-name');
const noteTop = document.getElementById('note-top');
const noteHeart = document.getElementById('note-heart');
const noteBase = document.getElementById('note-base');

function applyOpticalRackFocus(targetId, isInitial = false) {
  vessels.forEach((vessel) => {
    const vVariant = vessel.dataset.variant;
    if (vVariant === 'amber') return; // background glass remains constant

    if (vVariant === targetId) {
      vessel.classList.add('active');
      vessel.classList.remove('receded');
      if (!isInitial && !prefersReducedMotion) {
        gsap.to(vessel, {
          scale: 1.05,
          y: -6,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    } else {
      vessel.classList.remove('active');
      vessel.classList.add('receded');
      if (!isInitial && !prefersReducedMotion) {
        gsap.to(vessel, {
          scale: 0.94,
          y: 10,
          opacity: 0.55,
          duration: 0.65,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    }
  });
}

function selectRegimen(targetId) {
  if (targetId === currentRegimen || !AESOP_REGIMENS[targetId]) return;

  const data = AESOP_REGIMENS[targetId];
  currentRegimen = targetId;

  // 1. Update Tabs
  tabs.forEach((t) => {
    const isSelected = t.dataset.variant === targetId;
    t.classList.toggle('active', isSelected);
    t.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  // 2. Smooth Theme Studio Tone Shift
  document.body.className = data.theme;

  // 3. Optical Rack-Focus across the Table Ensemble
  applyOpticalRackFocus(targetId);

  // 4. Kinetic Mask Wipe for Left Copy
  if (!prefersReducedMotion) {
    gsap.to([eyebrowEl, titleEl, proseEl, btnRitual], {
      y: 12,
      opacity: 0,
      duration: 0.22,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
        if (titleEl) titleEl.textContent = data.title;
        if (proseEl) proseEl.textContent = data.prose;
        if (btnRitual) btnRitual.textContent = `Select Formulation — ${data.price}`;

        gsap.fromTo([eyebrowEl, titleEl, proseEl, btnRitual],
          { y: -14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.035, ease: 'power3.out' }
        );
      }
    });
  } else {
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (titleEl) titleEl.textContent = data.title;
    if (proseEl) proseEl.textContent = data.prose;
    if (btnRitual) btnRitual.textContent = `Select Formulation — ${data.price}`;
  }

  // 5. Update Clinical Drawer
  if (drawerScentName) drawerScentName.textContent = data.title;
  if (noteTop) noteTop.textContent = data.topNotes;
  if (noteHeart) noteHeart.textContent = data.heartNotes;
  if (noteBase) noteBase.textContent = data.baseNotes;
}

// Attach Tab Switcher Events
tabs.forEach((tab) => {
  tab.addEventListener('click', () => selectRegimen(tab.dataset.variant));
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectRegimen(tab.dataset.variant);
    }
  });
});

// Make Physical Vessels on the Table Interactive!
vessels.forEach((vessel) => {
  if (vessel.dataset.variant === 'amber') return;
  vessel.addEventListener('click', () => selectRegimen(vessel.dataset.variant));
  vessel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectRegimen(vessel.dataset.variant);
    }
  });
});

// ==========================================
// 4. RESTRAINED STUDIO PARALLAX & HOVER PHYSICS
// ==========================================
const tableStage = document.getElementById('table-stage');
if (tableStage && !isTouchDevice && !prefersReducedMotion) {
  tableStage.addEventListener('mousemove', (e) => {
    const rect = tableStage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (-y / rect.height) * 1.2;
    const tiltY = (x / rect.width) * 1.2;

    const activeVessel = tableStage.querySelector('.table-vessel.active .vessel-img');
    if (activeVessel) {
      gsap.to(activeVessel, {
        rotateX: tiltX,
        rotateY: tiltY,
        x: (x / rect.width) * 5,
        duration: 0.55,
        ease: 'power2.out'
      });
    }
  });

  tableStage.addEventListener('mouseleave', () => {
    const activeVessel = tableStage.querySelector('.table-vessel.active .vessel-img');
    if (activeVessel) {
      gsap.to(activeVessel, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        duration: 0.75,
        ease: 'power3.out'
      });
    }
  });
}

// ==========================================
// 5. CLINICAL SPECS DRAWER CONTROLS
// ==========================================
const btnOpenDrawer = document.getElementById('btn-open-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const specsDrawer = document.getElementById('specs-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');

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
