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
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Tilt on Award / Leadership cards ---------- */
  if (!prefersReduced && hasFinePointer) {
    document.querySelectorAll('.award, .lead-card').forEach(card => {
      const strength = 7; // max degrees
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;  // 0..1
        const py = (e.clientY - r.top) / r.height;  // 0..1
        const rx = (0.5 - py) * strength * 2;
        const ry = (px - 0.5) * strength * 2;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
        const media = card.querySelector('.card-media img');
        if (media) media.style.transform = `scale(1.06) translate(${(px - 0.5) * -8}px, ${(py - 0.5) * -8}px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const media = card.querySelector('.card-media img');
        if (media) media.style.transform = '';
      });
    });
  }

  /* ---------- Magnetic hover on nav links / buttons ---------- */
  if (!prefersReduced && hasFinePointer) {
    document.querySelectorAll('.magnetic').forEach(el => {
      const pull = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * pull;
        const dy = (e.clientY - r.top - r.height / 2) * pull;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Custom cursor ring ---------- */
  if (!prefersReduced && hasFinePointer) {
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    let x = 0, y = 0, tx = 0, ty = 0;
    const lerp = (a, b, n) => a + (b - a) * n;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      ring.classList.add('is-active');
    });
    document.addEventListener('mouseleave', () => ring.classList.remove('is-active'));

    const raf = () => {
      x = lerp(x, tx, 0.2);
      y = lerp(y, ty, 0.2);
      ring.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const hoverables = 'a, button, .lab-row, .year-row, .award, .lead-card, .pill, .collage-item';
    document.querySelectorAll(hoverables).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
    });
  }

});
