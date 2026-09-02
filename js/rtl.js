/* ============================================================
   ASTRONOVA — RTL / LTR direction toggle
   ============================================================ */

var DIR_KEY = 'astronova-dir';

function getSavedDir() {
  try { return localStorage.getItem(DIR_KEY) || 'ltr'; } catch (e) { return 'ltr'; }
}

function applyDir(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  var buttons = document.querySelectorAll('[data-rtl-toggle]');
  buttons.forEach(function (btn) {
    var isRtl = dir === 'rtl';
    btn.innerHTML = isRtl
      ? '<span style="font-size:0.75rem;font-weight:700">LTR</span>'
      : '<span style="font-size:0.75rem;font-weight:700">RTL</span>';
    btn.setAttribute('aria-label', isRtl ? 'Switch to left-to-right' : 'Switch to right-to-left');
    btn.classList.toggle('active', isRtl);
  });
}

function setDir(dir) {
  applyDir(dir);
  try { localStorage.setItem(DIR_KEY, dir); } catch (e) {}
}

function toggleDir() {
  var current = document.documentElement.getAttribute('dir') || 'ltr';
  setDir(current === 'rtl' ? 'ltr' : 'rtl');
}

document.addEventListener('DOMContentLoaded', function () {
  setDir(getSavedDir());
  document.querySelectorAll('[data-rtl-toggle]').forEach(function (btn) {
    btn.addEventListener('click', toggleDir);
  });
});
