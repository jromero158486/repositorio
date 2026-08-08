// ============================================================
// Joselyn Romero — Portfolio interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
    }));
  }

  /* ---------- Mark active nav link ---------- */
  const here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .waveform');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Waveform pulse dot follows the path ---------- */
  document.querySelectorAll('.waveform').forEach(wf => {
    const path = wf.querySelector('path');
    const pulse = wf.querySelector('.pulse');
    if (path && pulse && pulse.style) {
      pulse.style.setProperty('--offset-path', `path('${path.getAttribute('d')}')`);
    }
  });

  /* ---------- Research entry / Year accordion ---------- */
  document.querySelectorAll('.lab-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const lab = btn.closest('.lab');
      lab.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', lab.classList.contains('is-open') ? 'true' : 'false');
    });
  });
  document.querySelectorAll('.year-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.year-block');
      block.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', block.classList.contains('is-open') ? 'true' : 'false');
    });
  });

  /* ---------- Card media: fall back gracefully if image is missing ---------- */
  document.querySelectorAll('.card-media img').forEach(img => {
    const mark = () => img.closest('.card-media').classList.add('is-empty');
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });

  /* ---------- Reduced motion / touch checks up front ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* v2: removed card tilt, magnetic hover, and custom cursor ring —
     going for a plainer editorial feel with fewer "look at me" effects. */

});
