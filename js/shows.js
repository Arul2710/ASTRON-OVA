/* ============================================================
   ASTRONOVA — Show catalog data + filtering + search + modal
   ============================================================ */

var SHOWS = [
  { id:'galaxy', title:'Galaxy Explorer', category:'Astronomy', difficulty:'Beginner', age:'All Ages', duration:'45 min',
    image:'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=70',
    desc:'A cinematic journey to the edge of the known universe, from our solar neighborhood to distant galactic clusters.',
    objectives:['Understand the scale of the universe','Identify different types of galaxies','Appreciate our place in the cosmos'],
    topics:['Milky Way','Spiral Galaxies','Dark Matter','Galactic Evolution'] },
  { id:'mars', title:'Mission to Mars', category:'STEM', difficulty:'Advanced', age:'Grade 5+', duration:'55 min',
    image:'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=900&q=70',
    desc:'The physics, engineering, and challenges of establishing human life on the Red Planet.',
    objectives:['Explore Mars mission engineering','Design a habitat concept','Analyze survival constraints'],
    topics:['Rocket Science','Life Support','Mars Geology','Robotics'] },
  { id:'solar', title:'Solar System Journey', category:'Astronomy', difficulty:'Beginner', age:'All Ages', duration:'40 min',
    image:'https://img.freepik.com/premium-photo/realistic-solar-system-8k-detailed_932514-1301.jpg',
    desc:'Visit every planet and moon in our cosmic backyard, from scorching Mercury to distant ice giants.',
    objectives:['Tour all eight planets','Compare planetary features','Understand orbital mechanics'],
    topics:['Planets','Moons','Orbits','Asteroids'] },
  { id:'blackhole', title:'Black Hole Expedition', category:'STEM', difficulty:'Advanced', age:'Grade 7+', duration:'60 min',
    image:'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=900&q=70',
    desc:'Understanding the gravitational power of collapsed stellar cores and the physics of event horizons.',
    objectives:['Explain gravity and spacetime','Describe event horizons','Explore space-time curvature'],
    topics:['General Relativity','Event Horizon','Spacetime','Singularity'] },
  { id:'time', title:'Journey Through Time', category:'Astronomy', difficulty:'Beginner', age:'All Ages', duration:'45 min',
    image:'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=900&q=70',
    desc:'From the Big Bang to the present day — a sweeping tour through 13.8 billion years of cosmic history.',
    objectives:['Timeline of the universe','Understand the Big Bang','Explore cosmic evolution'],
    topics:['Big Bang','Stellar Lifecycle','Cosmic Timeline','Future of Cosmos'] },
  { id:'life', title:'Life Beyond Earth', category:'STEM', difficulty:'Advanced', age:'Grade 6+', duration:'50 min',
    image:'https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=900&q=70',
    desc:'The search for habitable worlds and the scientific hunt for extraterrestrial life across the galaxy.',
    objectives:['Define habitable zones','Explore exoplanets','Assess the search for life'],
    topics:['Exoplanets','Astrobiology','Habitable Zones','SETI'] }
];

var currentSearch = '';
var currentFilters = { category:'all', difficulty:'all', age:'all' };
var currentShowIndex = 0;

function initShows() {
  var grid = document.getElementById('showsGrid');
  if (!grid) return;
  renderShows(grid);

  document.querySelectorAll('[data-show-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.getAttribute('data-show-type');
      var val = btn.getAttribute('data-show-filter');
      var group = btn.parentElement;
      group.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilters[type] = val;
      renderShows(grid);
    });
  });

  var search = document.getElementById('showSearch');
  if (search) search.addEventListener('input', function () {
    currentSearch = search.value.toLowerCase();
    renderShows(grid);
  });
}

function renderShows(grid) {
  var filtered = SHOWS.filter(function (s) {
    var cat = currentFilters.category, diff = currentFilters.difficulty, age = currentFilters.age;
    var mCat = cat === 'all' || s.category.toLowerCase() === cat;
    var mDiff = diff === 'all' || s.difficulty.toLowerCase() === diff;
    var mAge = age === 'all' || s.age.toLowerCase().includes(age);
    var mSearch = !currentSearch || s.title.toLowerCase().includes(currentSearch) || s.desc.toLowerCase().includes(currentSearch);
    return mCat && mDiff && mAge && mSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="text-center mt-3" style="grid-column:1/-1"><p>No shows match your criteria.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(function (s) {
    var index = SHOWS.indexOf(s);
    return '<article class="card reveal visible" style="opacity:1;transform:none" data-idx="' + index + '">' +
      '<div class="card-img">' +
        '<img src="' + s.image + '" alt="' + s.title + '" loading="lazy">' +
        '<div class="overlay"></div>' +
        '<span class="badge" style="position:absolute;top:12px;inset-inline-start:12px;backdrop-filter:blur(6px)">' + s.category + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;flex-wrap:wrap">' +
          '<span class="badge">' + s.difficulty + '</span>' +
          '<span class="badge">' + s.age + '</span>' +
          '<span class="badge">' + s.duration + '</span>' +
        '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.desc + '</p>' +
        '<button class="btn btn-secondary view-show" data-idx="' + index + '">View Details <i class="fas fa-arrow-right"></i></button>' +
      '</div>' +
    '</article>';
  }).join('');

  grid.querySelectorAll('.view-show').forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentShowIndex = parseInt(btn.getAttribute('data-idx'));
      openShowModal();
    });
  });
}

function openShowModal() {
  var s = SHOWS[currentShowIndex];
  var overlay = document.getElementById('showModal');
  if (!overlay) return;
  document.getElementById('smImage').src = s.image;
  document.getElementById('smImage').alt = s.title;
  document.getElementById('smTitle').textContent = s.title;
  document.getElementById('smDesc').textContent = s.desc;
  document.getElementById('smDuration').textContent = s.duration;
  document.getElementById('smAge').textContent = s.age;
  document.getElementById('smCat').textContent = s.category;
  document.getElementById('smObj').innerHTML = s.objectives.map(function (o) {
    return '<li><i class="fas fa-check"></i> ' + o + '</li>';
  }).join('');
  document.getElementById('smTopics').innerHTML = s.topics.map(function (t) {
    return '<span class="badge" style="margin:0.2rem">' + t + '</span>';
  }).join('');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeShowModal() {
  var overlay = document.getElementById('showModal');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
  initShows();
  var bookBtn = document.getElementById('bookThisShow');
  if (bookBtn) bookBtn.addEventListener('click', function () {
    closeShowModal();
    if (typeof openModal === 'function') openModal('modalOverlay');
  });
  window.closeShowModal = closeShowModal;
  var overlay = document.getElementById('showModal');
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeShowModal(); });
    overlay.querySelectorAll('.modal-close').forEach(function (b) {
      b.addEventListener('click', closeShowModal);
    });
  }
});
