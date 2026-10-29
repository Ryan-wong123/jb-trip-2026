(function () {
  var fl = document.getElementById('floaters');
  if (!fl || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  for (var i = 0; i < 12; i++) {
    var s = document.createElement('span');
    s.className = 'fl'; s.textContent = '\u2665';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = (14 + Math.random() * 26) + 'px';
    s.style.animationDuration = (12 + Math.random() * 12) + 's';
    s.style.animationDelay = (-Math.random() * 18) + 's';
    s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    fl.appendChild(s);
  }
})();
