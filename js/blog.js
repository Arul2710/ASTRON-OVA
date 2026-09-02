/* ============================================================
   ASTRONOVA — Blog / Resources filtering & search
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('blogGrid');
  if (!grid) return;
  var posts = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));
  var search = document.getElementById('blogSearch');
  var filterBar = document.querySelector('[data-blog-filter]');

  function applyFilter() {
    var active = filterBar ? filterBar.querySelector('.filter-btn.active') : null;
    var cat = active ? active.getAttribute('data-filter') : 'all';
    var term = search ? search.value.toLowerCase() : '';
    posts.forEach(function (post) {
      var cats = post.getAttribute('data-category').split(' ');
      var mCat = cat === 'all' || cats.indexOf(cat) !== -1;
      var heading = post.querySelector('h3, h2');
      var text = heading ? heading.textContent.toLowerCase() : '';
      var mTerm = !term || text.indexOf(term) !== -1;
      post.classList.toggle('hidden', !(mCat && mTerm));
    });
  }

  if (filterBar) {
    filterBar.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter();
      });
    });
  }
  if (search) search.addEventListener('input', applyFilter);
});
