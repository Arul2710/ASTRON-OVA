/* ============================================================
   ASTRONOVA — Form validation + booking modal + auth
   Client-side only; structured so a backend can be connected later.
   ============================================================ */

function validateField(input) {
  var group = input.closest('.form-group');
  var val = input.value.trim();
  var type = input.getAttribute('data-validate');
  var valid = true;
  if (type === 'email') valid = val.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  else if (type === 'required') valid = val.length > 0;
  else if (type === 'match') {
    var target = document.getElementById(input.getAttribute('data-match'));
    valid = val.length > 0 && target && val === target.value;
  }
  if (group) {
    group.classList.toggle('invalid', !valid);
    var err = group.querySelector('.error-msg');
    if (err) err.textContent = type === 'email' ? 'Please enter a valid email address.' : 'This field is required.';
  }
  return valid;
}

function validateForm(form) {
  var allValid = true;
  form.querySelectorAll('[data-validate]').forEach(function (input) {
    var ok = validateField(input);
    if (!ok) allValid = false;
    input.addEventListener('input', function () { validateField(input); });
    input.addEventListener('blur', function () { validateField(input); });
  });
  return allValid;
}

function submitDemoForm(form) {
  // Demo only — replace with real API here:
  // await fetch('/api/...', { method:'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))) })
  if (typeof window.showToast === 'function') {
    window.showToast('Your request was submitted successfully!', 'fa-check-circle');
  }
  form.reset();
  form.querySelectorAll('.form-group.invalid').forEach(function (g) { g.classList.remove('invalid'); });
  return true;
}

function initBookingButton() {
  // bind any generic booking CTA using data-book
  document.querySelectorAll('[data-book]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (typeof openModal === 'function') openModal('modalOverlay');
    });
  });
}

function initForms() {
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(bookingForm)) {
        submitDemoForm(bookingForm);
        var ov = document.querySelector('.modal-overlay.active');
        if (ov) ov.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(contactForm)) submitDemoForm(contactForm);
    });
  }

  initBookingButton();
}

/* ---------- Auth (login/signup) ---------- */
function initAuth() {
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(loginForm)) {
        if (typeof window.showToast === 'function') window.showToast('Signed in successfully!', 'fa-rocket');
        loginForm.reset();
      }
    });
  }

  var registerForm = document.getElementById('registerForm');
  var showRegister = document.getElementById('showRegister');
  var showLogin = document.getElementById('showLogin');
  var forms = document.querySelectorAll('[data-auth-form]');

  if (showRegister) {
    showRegister.addEventListener('click', function (e) {
      e.preventDefault();
      forms.forEach(function (f) { f.classList.toggle('hidden', f.getAttribute('data-auth-form') !== 'register'); });
    });
  }
  if (showLogin) {
    showLogin.addEventListener('click', function (e) {
      e.preventDefault();
      forms.forEach(function (f) { f.classList.toggle('hidden', f.getAttribute('data-auth-form') !== 'login'); });
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(registerForm)) {
        if (typeof window.showToast === 'function') window.showToast('Account created! Welcome aboard. 🚀', 'fa-user-plus');
        registerForm.reset();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initForms();
  initAuth();
});
