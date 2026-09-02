/* ============================================================
   ASTRONOVA — Interactive Cosmic Observatory
   ============================================================ */

var OBSERVATORY_OBJECTS = {
  moon: {
    title: 'The Moon',
    image: 'https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&w=900&q=70',
    desc: "Earth's only natural satellite. Its cratered face tells the story of four billion years of cosmic impacts and shapes our tides and calendars.",
    coordinates: 'RA 18h 31m / Dec -23° 23′',
    distance: '384,400 km',
    type: 'Natural Satellite',
    fact: 'The Moon is slowly drifting away from Earth by about 3.8 cm every year.',
    reading: 'Lunar Cycles'
  },
  mars: {
    title: 'Mars — The Red Planet',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=900&q=70',
    desc: 'A cold desert world holding the largest volcano and deepest canyon in the solar system. Humanity is preparing to land there.',
    coordinates: 'RA 04h 08m / Dec +20° 47′',
    distance: '225 million km',
    type: 'Terrestrial Planet',
    fact: 'A day on Mars is only 39 minutes longer than a day on Earth.',
    reading: 'Planetary Geology'
  },
  saturn: {
    title: 'Saturn — Lord of the Rings',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=900&q=70',
    desc: 'The jewel of the solar system, wrapped in dazzling rings of ice and rock. Its moon Titan holds lakes of liquid methane.',
    coordinates: 'RA 23h 57m / Dec -08° 34′',
    distance: '1.4 billion km',
    type: 'Gas Giant',
    fact: 'Saturn is so light it would float in a giant bathtub of water.',
    reading: 'Ring Dynamics'
  },
  jupiter: {
    title: 'Jupiter — The Giant',
    image: 'https://images.unsplash.com/photo-1614732489403-a863c10d7384?auto=format&fit=crop&w=900&q=70',
    desc: 'The largest planet, a swirling storm world. Its Great Red Spot is a storm larger than Earth that has raged for centuries.',
    coordinates: 'RA 01h 04m / Dec +06° 12′',
    distance: '778 million km',
    type: 'Gas Giant',
    fact: 'Jupiter has at least 95 known moons, including Ganymede, the largest moon in the solar system.',
    reading: 'The Great Red Spot'
  },
  nebula: {
    title: 'Orion Nebula',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=70',
    desc: 'A massive stellar nursery 1,344 light-years away where new stars are being born from collapsing clouds of gas and dust.',
    coordinates: 'RA 05h 35m / Dec -05° 23′',
    distance: '1,344 light-years',
    type: 'Emission Nebula',
    fact: 'The Orion Nebula is so bright it can be seen with the naked eye and spans 24 light-years.',
    reading: 'Stellar Formation'
  }
};

function initObservatory() {
  var buttons = document.querySelectorAll('[data-obs]');
  if (!buttons.length) return;
  var img = document.getElementById('obsImage');
  if (!img) return;

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function render(key) {
    var obj = OBSERVATORY_OBJECTS[key];
    if (!obj) return;
    buttons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-obs') === key); });
    img.style.opacity = 0;
    setTimeout(function () {
      img.src = obj.image;
      setText('obsTitle', obj.title);
      setText('obsDesc', obj.desc);
      setText('obsCoords', obj.coordinates);
      setText('obsDistance', obj.distance);
      setText('obsType', obj.type);
      setText('obsFact', obj.fact);
      setText('obsReading', obj.reading);
      img.style.opacity = 1;
    }, 250);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { render(btn.getAttribute('data-obs')); });
  });

  var first = buttons[0] && buttons[0].getAttribute('data-obs');
  if (first) render(first);
}

document.addEventListener('DOMContentLoaded', initObservatory);
