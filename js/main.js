/* ============================================================
   ASTRONOVA — Core interactions + shared layout injection
   Navbar (Home dropdown), mobile menu, footer, modals, toast,
   testimonial carousel, generic filters
   ============================================================ */

var NAV_ITEMS = [
  { label: 'Home', href: '#', dropdown: true, children: [
      { label: 'Home 1', href: 'index.html', icon: 'fa-house' },
      { label: 'Home 2', href: 'home2.html', icon: 'fa-star' }
    ]},
  { label: 'Programs', href: 'programs.html' },
  { label: 'Shows', href: 'shows.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Resources', href: 'blog.html' },
  { label: 'Contact', href: 'contact.html' }
];

var FOOTER_LINKS = [
  { label: 'Home', href: 'index.html' },
  { label: 'Programs', href: 'programs.html' },
  { label: 'Shows', href: 'shows.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Resources', href: 'blog.html' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'Contact', href: 'contact.html' }
];

/* ---------- Build navbar ---------- */
function buildNavbar(active) {
  var nav = document.getElementById('siteNav');
  if (!nav) return;

  var menuLinks = NAV_ITEMS.map(function (item) {
    var cls = (active === item.label) ? 'active' : '';
    if (item.dropdown) {
      var children = item.children.map(function (c) {
        return '<a href="' + c.href + '"><i class="fas ' + c.icon + '"></i> ' + c.label + '</a>';
      }).join('');
      return '' +
        '<div class="has-dropdown">' +
          '<button class="nav-link dropdown-btn" aria-haspopup="true" aria-expanded="false">' +
            item.label + ' <i class="fas fa-chevron-down chev"></i>' +
          '</button>' +
          '<div class="dropdown">' + children + '</div>' +
        '</div>';
    }
    return '<a href="' + item.href + '" class="nav-link ' + cls + '">' + item.label + '</a>';
  }).join('');

  var mobileMenu = NAV_ITEMS.map(function (item, idx) {
    if (item.dropdown) {
      return '' +
        '<button class="nav-link mobile-toggle" data-sub="sub-' + idx + '">' +
          item.label + ' <i class="fas fa-chevron-down" style="font-size:0.7rem;margin:0 0.2rem"></i>' +
        '</button>' +
        '<div class="mobile-sub hidden" id="sub-' + idx + '">' +
          item.children.map(function (c) {
            return '<a href="' + c.href + '"><i class="fas ' + c.icon + '"></i> ' + c.label + '</a>';
          }).join('') +
        '</div>';
    }
    var cls = (active === item.label) ? 'active' : '';
    return '<a href="' + item.href + '" class="nav-link ' + cls + '">' + item.label + '</a>';
  }).join('');

  nav.innerHTML = '' +
    '<div class="nav"><div class="container nav-inner">' +
      '<a href="index.html" class="nav-logo">' +
        '<span class="logo-icon"><i class="fas fa-rocket"></i></span>ASTRON<span>OVA</span>' +
      '</a>' +
      '<nav class="nav-menu" aria-label="Primary">' + menuLinks + '</nav>' +
      '<div class="nav-actions">' +
        '<button class="icon-btn" data-theme-toggle aria-label="Toggle theme"></button>' +
        '<button class="icon-btn" data-rtl-toggle aria-label="Toggle direction"></button>' +
        '<a href="login.html" class="btn btn-ghost btn-login-desktop"><i class="fas fa-user-astronaut"></i> Login</a>' +
        '<button class="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</div></div>' +

    '<div class="mobile-overlay" id="mobileOverlay"></div>' +
    '<div class="mobile-panel" id="mobilePanel">' +
      '<nav>' + mobileMenu + '</nav>' +
      '<div class="mobile-actions">' +
        '<a href="login.html" class="btn btn-primary"><i class="fas fa-user-astronaut"></i> Login</a>' +
        '<div class="icon-row">' +
          '<button class="icon-btn" data-theme-toggle aria-label="Toggle theme"></button>' +
          '<button class="icon-btn" data-rtl-toggle aria-label="Toggle direction"></button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- Build footer ---------- */
function buildFooter() {
  var footer = document.getElementById('siteFooter');
  if (!footer) return;
  footer.classList.add('footer');
  footer.innerHTML = '' +
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div>' +
          '<a href="index.html" class="nav-logo">' +
            '<span class="logo-icon"><i class="fas fa-rocket"></i></span>ASTRON<span>OVA</span>' +
          '</a>' +
          '<p>Bringing the universe closer to everyone. Immersive mobile planetarium and astronomy outreach for schools, communities and private events.</p>' +
          '<div class="socials">' +
            '<a href="#" aria-label="Instagram" class="social-icon"><i class="fab fa-instagram"></i></a>' +
            '<a href="#" aria-label="Facebook" class="social-icon"><i class="fab fa-facebook-f"></i></a>' +
            '<a href="#" aria-label="YouTube" class="social-icon"><i class="fab fa-youtube"></i></a>' +
            '<a href="#" aria-label="LinkedIn" class="social-icon"><i class="fab fa-linkedin-in"></i></a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4>Quick Links</h4>' +
          '<div class="footer-links">' +
            FOOTER_LINKS.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('') +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4>Programs</h4>' +
          '<div class="footer-links">' +
            '<a href="programs.html">Planetarium</a>' +
            '<a href="programs.html">STEM Workshops</a>' +
            '<a href="programs.html">Telescope Nights</a>' +
            '<a href="programs.html">Community Events</a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4>Newsletter</h4>' +
          '<p>Stay updated with celestial events, new shows and teaching resources.</p>' +
          '<form class="newsletter-form">' +
            '<input type="email" placeholder="Your email" aria-label="Email" required>' +
            '<button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i></button>' +
          '</form>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<p>© 2026 Astronova Astronomy Outreach. All rights reserved.</p>' +
        '<div style="display:flex;gap:1.5rem"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>' +
      '</div>' +
    '</div>';
}

/* ---------- Booking modal (shared) ---------- */
var BOOKING_MODAL_HTML = '' +
  '<div class="modal-overlay" id="modalOverlay" aria-hidden="true">' +
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="bmTitle">' +
      '<button class="modal-close" aria-label="Close"><i class="fas fa-times"></i></button>' +
      '<h2 id="bmTitle">Book a Cosmic Experience</h2>' +
      '<p class="modal-desc">Tell us about your event and our team will prepare a stellar proposal.</p>' +
      '<form id="bookingForm" class="form-grid">' +
        '<div class="form-group"><label for="b-name">Name</label><input id="b-name" type="text" data-validate="required" placeholder="Your name"><span class="error-msg"></span></div>' +
        '<div class="form-group"><label for="b-email">Email</label><input id="b-email" type="email" data-validate="email" placeholder="you@email.com"><span class="error-msg"></span></div>' +
        '<div class="form-group full"><label for="b-org">Organization</label><input id="b-org" type="text" data-validate="required" placeholder="School / company"><span class="error-msg"></span></div>' +
        '<div class="form-group"><label for="b-type">Event Type</label>' +
          '<select id="b-type" data-validate="required"><option value="">Select type</option><option>School Assembly</option><option>STEM Workshop</option><option>Telescope Night</option><option>Community Event</option><option>Private Experience</option></select>' +
          '<span class="error-msg"></span></div>' +
        '<div class="form-group"><label for="b-date">Preferred Date</label><input id="b-date" type="date" data-validate="required"><span class="error-msg"></span></div>' +
        '<div class="form-group"><label for="b-time">Preferred Time</label>' +
          '<select id="b-time" data-validate="required"><option value="">Select time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select>' +
          '<span class="error-msg"></span></div>' +
        '<div class="form-group"><label for="b-size">Audience Size</label><input id="b-size" type="number" data-validate="required" placeholder="e.g. 35"><span class="error-msg"></span></div>' +
        '<div class="form-group full"><label for="b-msg">Message</label><textarea id="b-msg" data-validate="required" placeholder="Tell us about your event..."></textarea><span class="error-msg"></span></div>' +
        '<div class="form-group full" style="display:flex;gap:1rem;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-secondary modal-close">Cancel</button>' +
          '<button type="submit" class="btn btn-primary">Submit Request <i class="fas fa-paper-plane"></i></button>' +
        '</div>' +
      '</form>' +
    '</div>' +
  '</div>';

function injectBookingModal() {
  if (document.getElementById('modalOverlay')) return;
  var div = document.createElement('div');
  div.innerHTML = BOOKING_MODAL_HTML;
  while (div.firstChild) document.body.appendChild(div.firstChild);
}

/* ---------- Helper: open/close modal ---------- */
function openModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModalOverlay(overlay) {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}
window.openModal = openModal;

/* ---------- DOMContentLoaded ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // build layout (unless body says standalone)
  if (!document.body.hasAttribute('data-standalone')) {
    var active = document.body.getAttribute('data-page');
    buildNavbar(active);
    buildFooter();
    injectBookingModal();
    // after injecting theme/rtl buttons, re-init them
    if (typeof applyTheme === 'function') applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    if (typeof applyDir === 'function') applyDir(document.documentElement.getAttribute('dir') || 'ltr');
    initLayoutBehaviors();
  }

  /* ---------- Home dropdown (with dropdown-btn injected) ---------- */
  var dropBtn = document.querySelector('.dropdown-btn');
  var homeDrop = document.querySelector('.has-dropdown');
  if (dropBtn && homeDrop) {
    dropBtn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      homeDrop.classList.toggle('open');
      dropBtn.setAttribute('aria-expanded', homeDrop.classList.contains('open'));
    });
    dropBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); homeDrop.classList.toggle('open'); }
      if (e.key === 'Escape') homeDrop.classList.remove('open');
    });
    document.addEventListener('click', function (e) {
      if (!homeDrop.contains(e.target)) homeDrop.classList.remove('open');
    });
  }

  /* ---------- Sticky nav scroll state ---------- */
  var navEl = document.querySelector('.nav');
  function onScrollNav() {
    if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 10);
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Mobile menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var mobilePanel = document.getElementById('mobilePanel');
  var mobileOverlay = document.getElementById('mobileOverlay');
  function closeMobileMenu() {
    if (mobilePanel) mobilePanel.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMobileMenu() {
    if (mobilePanel) mobilePanel.classList.add('open');
    if (hamburger) hamburger.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (hamburger && mobilePanel) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobilePanel.classList.contains('open');
      if (isOpen) closeMobileMenu(); else openMobileMenu();
      hamburger.setAttribute('aria-expanded', !isOpen);
    });
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    mobilePanel.querySelectorAll('.mobile-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = document.getElementById(btn.getAttribute('data-sub'));
        if (sub) sub.classList.toggle('hidden');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobilePanel.classList.contains('open')) {
        closeMobileMenu();
      }
    });
    // Close mobile menu on link click
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- Newsletter ---------- */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (input && input.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        form.innerHTML = '<p style="color:var(--cyan-glow)">Thanks! You\'re subscribed to the cosmic newsletter.</p>';
      }
    });
  });

  /* ---------- Toast ---------- */
  window.showToast = function (message, icon) {
    var toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast'; toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="fas ' + (icon || 'fa-check-circle') + '"></i><span>' + message + '</span>';
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3500);
  };

  /* ---------- Testimonial carousel ---------- */
  var slider = document.querySelector('.testimonial-slider');
  if (slider) initCarousel(slider);

  /* ---------- Generic modal close buttons ---------- */
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModalOverlay(overlay); });
    overlay.querySelectorAll('.modal-close').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModalOverlay(overlay); });
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(closeModalOverlay);
    }
  });
});

function initLayoutBehaviors() {
  // re-bind theme + rtl toggles after injection
  if (typeof toggleTheme === 'function') {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.onclick = null;
      btn.addEventListener('click', toggleTheme);
    });
  }
  if (typeof toggleDir === 'function') {
    document.querySelectorAll('[data-rtl-toggle]').forEach(function (btn) {
      btn.onclick = null;
      btn.addEventListener('click', toggleDir);
    });
  }
}

/* ---------- Carousel ---------- */
function initCarousel(slider) {
  var slides = Array.prototype.slice.call(slider.querySelectorAll('.testimonial-slide'));
  var dotsWrap = slider.querySelector('#tDots');
  var index = 0, timer;

  function renderDots() {
    dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<button class="t-dot ' + (i === index ? 'active' : '') + '" data-i="' + i + '" aria-label="Go to testimonial ' + (i + 1) + '"></button>';
    }).join('');
    dotsWrap.querySelectorAll('.t-dot').forEach(function (d) {
      d.addEventListener('click', function () { goTo(parseInt(d.getAttribute('data-i'))); });
    });
  }
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle('active', idx === index); });
    renderDots();
    resetTimer();
  }
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(index + 1); }, 6000);
  }
  var prev = document.getElementById('tPrev');
  var next = document.getElementById('tNext');
  if (prev) prev.addEventListener('click', function () { goTo(index - 1); });
  if (next) next.addEventListener('click', function () { goTo(index + 1); });
  renderDots();
  resetTimer();
}

/* Expose for compatibility */
window.initCarousel = initCarousel;
