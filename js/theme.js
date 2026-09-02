/* ============================================================
   ASTRONOVA — Theme (dark/light) + animated starfield
   ============================================================ */

const THEME_KEY = 'astronova-theme';

function getSavedTheme() {
  try { return localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { return 'dark'; }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var buttons = document.querySelectorAll('[data-theme-toggle]');
  buttons.forEach(function (btn) {
    var dark = theme === 'dark';
    btn.innerHTML = dark
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.classList.toggle('active', !dark);
  });
}

function setTheme(theme) {
  applyTheme(theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  if (typeof setupStarfield === 'function') setupStarfield();
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

/* ---------- Starfield ---------- */
var __starRaf = 0;
function setupStarfield() {
  var canvas = document.getElementById('starfield');
  if (!canvas) return;
  var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var width = canvas.width, height = canvas.height;

  var count = isDark ? 160 : 60;
  var stars = [];
  for (var i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.2,
      a: Math.random() * 0.8 + 0.15,
      tw: Math.random() * 0.02 + 0.002,
      phase: Math.random() * Math.PI * 2,
      vx: Math.random() * 0.12 - 0.06,
      vy: Math.random() * 0.12 - 0.06
    });
  }
  var shooting = [];

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(function (s) {
      s.x += s.vx; s.y += s.vy;
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;
      if (s.y < -10) s.y = height + 10;
      if (s.y > height + 10) s.y = -10;
      var alpha = s.a * (0.7 + 0.3 * Math.sin(t * s.tw + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(220,240,255,' + alpha + ')' : 'rgba(37,99,235,' + alpha * 0.5 + ')';
      ctx.fill();
    });
    shooting.forEach(function (sh, idx) {
      sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.012;
      var tail = Math.atan2(sh.vy, sh.vx);
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(sh.x - Math.cos(tail) * sh.len, sh.y - Math.sin(tail) * sh.len);
      ctx.strokeStyle = isDark ? 'rgba(147,220,255,' + sh.life + ')' : 'rgba(37,99,235,0)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      if (sh.life <= 0) shooting.splice(idx, 1);
    });
    __starRaf = requestAnimationFrame(draw);
  }

  if (shooting.length === 0 && document.querySelector('#starfield') && isDark) {
    // occasionally spawn shooting stars
    setInterval(function () {
      if (shooting.length < 2) {
        shooting.push({
          x: Math.random() * width, y: Math.random() * height * 0.4,
          len: 100 + Math.random() * 140,
          vx: 4 + Math.random() * 4, vy: 2 + Math.random() * 2, life: 1
        });
      }
    }, 5500);
  }

  cancelAnimationFrame(__starRaf);
  __starRaf = requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', function () {
  applyTheme(getSavedTheme());
  setupStarfield();
  window.setupStarfield = setupStarfield;
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });
  window.addEventListener('resize', function () {
    var canvas = document.getElementById('starfield');
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  });
});
