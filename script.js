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
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  /* ---------- Live local time (Ithaca, NY) ---------- */
  const clockEl = document.querySelector('[data-clock]');
  if (clockEl) {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: 'America/New_York'
    });
    const tick = () => { clockEl.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

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

  /* ---------- Research entry accordion ---------- */
  document.querySelectorAll('.lab-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const lab = btn.closest('.lab');
      lab.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', lab.classList.contains('is-open') ? 'true' : 'false');
    });
  });

});
