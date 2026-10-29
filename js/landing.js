(function () {
  var stage = document.getElementById('stage');
  var cv = document.getElementById('fx'), ctx = cv.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W, H, parts = [], running = false, going = false;
  function size() { var r = window.devicePixelRatio || 1; W = innerWidth; H = innerHeight; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
  size(); addEventListener('resize', size);

  // Gentle floating hearts in the background
  var fl = document.getElementById('floaters');
  if (!reduce) for (var i = 0; i < 16; i++) {
    var s = document.createElement('span');
    s.className = 'fl'; s.textContent = '♥';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = (14 + Math.random() * 30) + 'px';
    s.style.animationDuration = (9 + Math.random() * 10) + 's';
    s.style.animationDelay = (-Math.random() * 14) + 's';
    s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    fl.appendChild(s);
  }

  var colors = ['#FF6B94', '#FF8FAE', '#B8264F', '#F0C070', '#FFD6E0', '#C9A0E0', '#FFFFFF'];
  function burst(x, y, n) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 9;
      parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3, g: .16 + Math.random() * .1,
        r: 8 + Math.random() * 18, rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
        c: colors[(Math.random() * colors.length) | 0], life: 1, dec: .008 + Math.random() * .008, heart: Math.random() < .7 });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function heartPath(r) {
    ctx.beginPath(); ctx.moveTo(0, r * .35);
    ctx.bezierCurveTo(-r, -r * .3, -r * .6, -r, 0, -r * .45);
    ctx.bezierCurveTo(r * .6, -r, r, -r * .3, 0, r * .35); ctx.closePath();
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(function (p) { return p.life > 0 && p.y < H + 40; });
    parts.forEach(function (p) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr; p.life -= p.dec;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.c;
      if (p.heart) { heartPath(p.r); ctx.fill(); } else { ctx.fillRect(-p.r / 4, -p.r / 2, p.r / 2, p.r); }
      ctx.restore();
    });
    if (parts.length) requestAnimationFrame(tick); else running = false;
  }

  function enter(x, y) {
    if (going) return; going = true;
    stage.classList.add('go');
    var veil = document.createElement('div'); veil.className = 'veil'; document.body.appendChild(veil);
    if (!reduce) {
      burst(x, y, 90);
      setTimeout(function () { burst(W * .25, H * .4, 45); burst(W * .75, H * .4, 45); }, 250);
      setTimeout(function () { burst(W / 2, H * .55, 60); }, 550);
    }
    setTimeout(function () { veil.style.opacity = '1'; }, reduce ? 0 : 1000);
    setTimeout(function () { location.href = 'trip.html'; }, reduce ? 300 : 1700);
  }

  // Any click or tap opens the surprise
  stage.addEventListener('click', function (e) { enter(e.clientX, e.clientY); });
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); var r = document.getElementById('heart').getBoundingClientRect(); enter(r.left + r.width / 2, r.top + r.height / 2); }
  });
})();
