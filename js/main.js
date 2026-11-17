/* Serwis Samochodowy Martex — main.js */
(() => {
  // ---------- Godziny otwarcia (0 = niedziela) ----------
  const HOURS = {
    1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 17],
    6: [8, 14], 0: null
  };
  const WHEN = ['w niedzielę','w poniedziałek','we wtorek','w środę','w czwartek','w piątek','w sobotę'];

  // czas w Polsce, niezależnie od strefy odwiedzającego
  const nowPL = () => {
    const p = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Warsaw', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const wd = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 }[p.find(x => x.type === 'weekday').value];
    const h = +p.find(x => x.type === 'hour').value % 24;
    const m = +p.find(x => x.type === 'minute').value;
    return { wd, t: h + m / 60 };
  };

  const statusText = () => {
    const { wd, t } = nowPL();
    const today = HOURS[wd];
    if (today && t >= today[0] && t < today[1]) {
      return { open: true, txt: `Otwarte teraz · do ${today[1]}:00` };
    }
    // znajdź najbliższe otwarcie
    for (let i = 0; i < 8; i++) {
      const d = (wd + i) % 7, h = HOURS[d];
      if (!h) continue;
      if (i === 0 && t < h[0]) return { open: false, txt: `Zamknięte · otwieramy dziś o ${h[0]}:00` };
      if (i === 1) return { open: false, txt: `Zamknięte · otwieramy jutro o ${h[0]}:00` };
      if (i > 1) return { open: false, txt: `Zamknięte · otwieramy ${WHEN[d]} o ${h[0]}:00` };
    }
    return { open: false, txt: 'Zamknięte' };
  };

  const setStatus = () => {
    const s = statusText();
    document.querySelectorAll('[data-status]').forEach(el => {
      el.classList.toggle('is-open', s.open);
      el.classList.toggle('is-closed', !s.open);
      const t = el.querySelector('[data-status-text]');
      if (t) t.textContent = s.txt;
    });
    const { wd } = nowPL();
    document.querySelectorAll('.hours tr[data-d]').forEach(tr => tr.classList.toggle('today', +tr.dataset.d === wd));
  };
  setStatus();
  setInterval(setStatus, 60000);

  // ---------- Nav ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  document.querySelector('.burger').addEventListener('click', () => nav.classList.toggle('is-open'));
  document.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

  // ---------- Reveal ----------
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv, .stat, .step').forEach(el => io.observe(el));

  // ---------- Liczniki ----------
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), v = end * (1 - Math.pow(1 - k, 3));
      el.textContent = v.toFixed(dec).replace('.', ',');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    cio.unobserve(el);
  }), { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // ---------- Ticker: zdubluj treść dla płynnej pętli ----------
  document.querySelectorAll('[data-loop]').forEach(t => { t.innerHTML += t.innerHTML; });

  // ---------- Galeria / lightbox ----------
  const links = [...new Set([...document.querySelectorAll('.gal a, a.gal-item')])];
  const lb = document.querySelector('.lb');
  if (lb && links.length) {
    const lbImg = lb.querySelector('img');
    let idx = 0;
    const show = i => {
      idx = (i + links.length) % links.length;
      const img = links[idx].querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
    };
    links.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); show(i); lb.classList.add('open'); }));
    lb.querySelector('.lb__x').onclick = () => lb.classList.remove('open');
    lb.querySelector('.lb__p').onclick = () => show(idx - 1);
    lb.querySelector('.lb__n').onclick = () => show(idx + 1);
    lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  // ---------- Opinie: strzałki ----------
  const track = document.querySelector('.rev__track');
  if (track) document.querySelectorAll('[data-rev]').forEach(b => b.addEventListener('click', () => {
    const card = track.querySelector('.rcard');
    track.scrollBy({ left: (card.offsetWidth + 16) * +b.dataset.rev, behavior: 'smooth' });
  }));

  // ---------- Kopiuj adres / GPS ----------
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const label = b.textContent;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Skopiowano ✓'; }
    catch { b.textContent = b.dataset.copy; }
    b.classList.add('done');
    setTimeout(() => { b.textContent = label; b.classList.remove('done'); }, 2000);
  }));

  // ---------- Sub-nav usług: podświetl aktywną sekcję ----------
  const sub = [...document.querySelectorAll('.subnav a')];
  if (sub.length) {
    const sio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      sub.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
      const on = sub.find(a => a.classList.contains('on'));
      if (on) on.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }), { rootMargin: '-45% 0px -50% 0px' });
    sub.forEach(a => { const t = document.querySelector(a.getAttribute('href')); if (t) sio.observe(t); });
  }


  // ---------- Pamięć przeglądarki (bezpiecznie) ----------
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };

  // ---------- Motyw jasny / ciemny ----------
  const root = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const applyTheme = t => {
    if (t === 'light') root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    if (metaTheme) metaTheme.content = t === 'light' ? '#f3f1ec' : '#0a0a0b';
  };
  applyTheme(store.get('martex-theme'));
  document.querySelectorAll('.theme').forEach(b => b.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next); store.set('martex-theme', next);
  }));

  // ---------- Przycisk do góry ----------
  const totop = document.querySelector('.totop');
  if (totop) {
    const t = () => totop.classList.toggle('show', scrollY > 700);
    addEventListener('scroll', t, { passive: true }); t();
    totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Cookies + mapa Google ----------
  const loadMaps = () => document.querySelectorAll('[data-map]').forEach(m => {
    if (m.classList.contains('loaded')) return;
    const f = document.createElement('iframe');
    f.src = m.dataset.map; f.loading = 'lazy'; f.title = 'Mapa dojazdu — Serwis Martex';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    m.prepend(f); m.classList.add('loaded');
  });
  const banner = document.querySelector('.cookies');
  const consent = store.get('martex-consent');
  if (consent === 'all') loadMaps();
  if (banner && !consent) setTimeout(() => banner.classList.add('show'), 900);
  document.querySelectorAll('[data-consent]').forEach(b => b.addEventListener('click', () => {
    store.set('martex-consent', b.dataset.consent);
    banner.classList.remove('show');
    if (b.dataset.consent === 'all') loadMaps();
    else document.querySelectorAll('[data-map].loaded').forEach(m => { m.querySelector('iframe')?.remove(); m.classList.remove('loaded'); });
  }));
  document.querySelectorAll('[data-cookie-settings]').forEach(b => b.addEventListener('click', () => banner && banner.classList.add('show')));
  document.querySelectorAll('[data-map-load]').forEach(b => b.addEventListener('click', loadMaps));

  // ---------- Rok w stopce ----------
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
