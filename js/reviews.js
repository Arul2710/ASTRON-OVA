(function () {
  var carousel = document.getElementById("reviewsCarousel");
  if (!carousel) return;

  var track = document.getElementById("reviewsTrack");
  var dotsWrap = document.getElementById("reviewsDots");
  var prevBtn = document.getElementById("reviewsPrev");
  var nextBtn = document.getElementById("reviewsNext");

  var reviews = [];
  var index = 0;
  var timer = null;
  var slidesPerView = 1;
  var AUTO_INTERVAL = 3500;

  function perRow() {
    var w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  function starString(rating) {
    var out = "";
    for (var i = 0; i < 5; i++) {
      out += i < rating ? "★" : "☆";
    }
    return out;
  }

  function initial(name) {
    return name ? name.trim().charAt(0).toUpperCase() : "?";
  }

  function buildCard(r) {
    var role = (r.profile_data && r.profile_data.role) || "";
    var card = document.createElement("article");
    card.className = "review-card";

    var head = document.createElement("div");
    head.className = "review-head";

    var avatar = document.createElement("div");
    avatar.className = "t-avatar";
    avatar.textContent = initial(r.author_name);

    var meta = document.createElement("div");
    var nameEl = document.createElement("div");
    nameEl.className = "t-name";
    nameEl.textContent = r.author_name;
    var roleEl = document.createElement("div");
    roleEl.className = "t-role";
    roleEl.textContent = role;

    meta.appendChild(nameEl);
    if (role) meta.appendChild(roleEl);

    var stars = document.createElement("span");
    stars.className = "review-stars";
    stars.textContent = starString(r.rating);

    head.appendChild(avatar);
    head.appendChild(meta);
    head.appendChild(stars);

    var body = document.createElement("p");
    body.textContent = "\u201C" + (r.text || "") + "\u201D";

    card.appendChild(head);
    card.appendChild(body);
    return card;
  }

  function render() {
    track.innerHTML = "";
    dotsWrap.innerHTML = "";
    slidesPerView = perRow();
    var pages = Math.max(1, Math.ceil(reviews.length / slidesPerView));
    if (index >= pages) index = 0;

    for (var i = 0; i < pages; i++) {
      var dot = document.createElement("button");
      dot.className = "reviews-dot" + (i === index ? " active" : "");
      dot.setAttribute("aria-label", "Go to review page " + (i + 1));
      dot.addEventListener("click", function (pg) {
        return function () {
          goTo(pg, true);
        };
      }(i));
      dotsWrap.appendChild(dot);
    }

    var pageCards = reviews.slice(index * slidesPerView, index * slidesPerView + slidesPerView);
    for (var j = 0; j < pageCards.length; j++) {
      track.appendChild(buildCard(pageCards[j]));
    }
    track.classList.add("active");
  }

  function goTo(pg, user) {
    var total = Math.max(1, Math.ceil(reviews.length / slidesPerView));
    index = (pg + total) % total;
    render();
    if (user) restart();
  }

  function restart() {
    stop();
    if (document.hidden === undefined || !document.hidden) {
      timer = setInterval(function () {
        goTo(index + 1, false);
      }, AUTO_INTERVAL);
    }
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  prevBtn.addEventListener("click", function () { goTo(index - 1, true); });
  nextBtn.addEventListener("click", function () { goTo(index + 1, true); });

  window.addEventListener("resize", function () {
    var prev = slidesPerView;
    slidesPerView = perRow();
    if (prev !== slidesPerView) {
      index = 0;
      render();
      restart();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stop();
    } else {
      restart();
    }
  });

  fetch("data/reviews.json")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      reviews = (data && data.slice) ? data.slice(0, 6) : [];
      render();
      restart();
    })
    .catch(function () {
      stop();
      carousel.innerHTML = '<p style="text-align:center;color:var(--text-secondary)">Reviews temporarily unavailable.</p>';
    });
})();
