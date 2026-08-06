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

  /* ---------- Publication "read more" ---------- */
  document.querySelectorAll('.pub-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const pub = btn.closest('.pub');
      const open = pub.classList.toggle('is-open');
      btn.textContent = open ? 'Show less −' : 'Read more +';
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Page fade transition ---------- */
  requestAnimationFrame(() => document.body.classList.add('is-ready'));

  if (!reduceMotion) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      const isInternalPage = href && /\.html($|#)/.test(href) && !a.target && a.origin === location.origin;
      if (!isInternalPage) return;
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        document.body.classList.remove('is-ready');
        setTimeout(() => { location.href = href; }, 380);
      });
    });
  }

  /* ---------- Decode / scramble text reveal ---------- */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  function decodeText(el, delay = 0){
    const final = el.textContent;
    if (reduceMotion || !final.trim()) return;
    const len = final.length;
    let frame = 0;
    const totalFrames = 18;
    setTimeout(() => {
      const tick = () => {
        let out = '';
        for (let i = 0; i < len; i++){
          const ch = final[i];
          if (ch === ' '){ out += ' '; continue; }
          const revealAt = (i / len) * totalFrames;
          out += frame >= revealAt ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        el.textContent = out;
        frame++;
        if (frame <= totalFrames) requestAnimationFrame(tick);
        else el.textContent = final;
      };
      tick();
    }, delay);
  }
  document.querySelectorAll('[data-decode]').forEach((el, i) => decodeText(el, 200 + i * 140));

  /* ---------- Animated stat counters ---------- */
  const statEls = document.querySelectorAll('.stat-num[data-count]');
  if (statEls.length){
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (reduceMotion){ el.textContent = target; return; }
      const dur = 1100;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){ countUp(entry.target); statIo.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => statIo.observe(el));
  }

  /* ---------- Research page: ECG-style scroll rail ---------- */
  const rail = document.querySelector('.rail');
  const labList = document.querySelector('.lab-list');
  if (rail && labList){
    const fill = rail.querySelector('.rail-fill');
    const pulse = rail.querySelector('.rail-pulse');
    const updateRail = () => {
      const rect = labList.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      fill.style.height = pct + '%';
      pulse.style.top = pct + '%';
    };
    updateRail();
    window.addEventListener('scroll', updateRail, { passive: true });
    window.addEventListener('resize', updateRail);
  }

  /* ---------- 3D tilt on cards ---------- */
  if (!reduceMotion && !coarsePointer){
    document.querySelectorAll('.tilt').forEach(card => {
      const maxTilt = 6;
      card.style.transition = 'transform .5s cubic-bezier(.16,.8,.24,1)';
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'transform .08s linear';
        card.style.transform = `perspective(900px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .5s cubic-bezier(.16,.8,.24,1)';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  /* ---------- Magnetic links ---------- */
  if (!reduceMotion && !coarsePointer){
    document.querySelectorAll('.magnetic').forEach(el => {
      const strength = 0.35;
      el.style.transition = 'transform .35s cubic-bezier(.16,.8,.24,1)';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transition = 'transform .1s linear';
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .35s cubic-bezier(.16,.8,.24,1)';
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------- Waveform cursor spotlight ---------- */
  if (!reduceMotion && !coarsePointer){
    document.querySelectorAll('.waveform').forEach(wf => {
      let glow = wf.querySelector('.wave-glow');
      if (!glow){
        glow = document.createElement('div');
        glow.className = 'wave-glow';
        wf.appendChild(glow);
      }
      wf.addEventListener('mousemove', (e) => {
        const r = wf.getBoundingClientRect();
        glow.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
      });
    });
  }

  /* ---------- Custom signal cursor + trail ---------- */
  if (!reduceMotion && !coarsePointer && window.matchMedia('(hover: hover)').matches){
    document.documentElement.classList.add('has-cursor');

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const canvas = document.createElement('canvas');
    canvas.id = 'cursorTrail';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const points = [];
    const MAX_POINTS = 14;
    let mouseX = -100, mouseY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      points.push({ x: mouseX, y: mouseY });
      if (points.length > MAX_POINTS) points.shift();

      const target = e.target.closest('a, button, .tilt, [role="button"]');
      dot.classList.toggle('is-active', !!target);
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (points.length > 1){
        for (let i = 1; i < points.length; i++){
          const p0 = points[i - 1];
          const p1 = points[i];
          const alpha = (i / points.length) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(244,243,238,${alpha.toFixed(2)})`;
          ctx.lineWidth = 1.4;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

});
