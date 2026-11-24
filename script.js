/* =========================================================
   Randi – portfolio
   ========================================================= */

// ---------- Jaartal in footer ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobiel menu ----------
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
    document.body.style.overflow = '';
  })
);

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  // kleine vertraging voor elementen in dezelfde groep
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

// ---------- Projecten carousel ----------
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsWrap = document.getElementById('dots');

function cardStep() {
  const card = carousel.querySelector('.project-card');
  const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
  return card.getBoundingClientRect().width + gap;
}

function pageCount() {
  const visible = Math.max(1, Math.round(carousel.clientWidth / cardStep()));
  const total = carousel.children.length;
  return Math.max(1, Math.ceil(total / visible));
}

function buildDots() {
  dotsWrap.innerHTML = '';
  const pages = pageCount();
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Pagina ${i + 1}`);
    dot.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(dot);
  }
  updateState();
}

function goToPage(i) {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const pages = pageCount();
  const target = pages === 1 ? 0 : (maxScroll / (pages - 1)) * i;
  carousel.scrollTo({ left: target, behavior: 'smooth' });
}

function updateState() {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const pages = pageCount();
  const progress = maxScroll <= 0 ? 0 : carousel.scrollLeft / maxScroll;
  const active = Math.round(progress * (pages - 1));

  dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === active)
  );
  const atStart = carousel.scrollLeft <= 2;
  const atEnd = carousel.scrollLeft >= maxScroll - 2;
  prevBtn.disabled = atStart;
  nextBtn.disabled = atEnd;
  carousel.classList.toggle('fade-left', !atStart);
  carousel.classList.toggle('fade-right', !atEnd);
}

prevBtn.addEventListener('click', () =>
  carousel.scrollBy({ left: -cardStep(), behavior: 'smooth' })
);
nextBtn.addEventListener('click', () =>
  carousel.scrollBy({ left: cardStep(), behavior: 'smooth' })
);
carousel.addEventListener('scroll', () => requestAnimationFrame(updateState), { passive: true });
window.addEventListener('resize', buildDots);
buildDots();

// ---------- Contactformulier (Formspree) ----------
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  // Zolang het formulier nog niet gekoppeld is: open mailprogramma als fallback
  if (form.action.includes('JOUW_ID')) {
    e.preventDefault();
    status.textContent = 'Formulier is nog niet gekoppeld aan Formspree (zie index.html).';
    return;
  }

  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  status.textContent = 'Versturen...';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      status.textContent = 'Bedankt! Je bericht is verzonden.';
      form.reset();
    } else {
      status.textContent = 'Er ging iets mis. Probeer het later opnieuw.';
    }
  } catch {
    status.textContent = 'Geen verbinding. Probeer het later opnieuw.';
  }
  btn.disabled = false;
});
