/* ============================================================
   assets/home.js
   Home-only behaviors:
     1. Teacher slider
     2. Contact form
   Requires (loaded before this file):
     data/site-config.js
     data/teachers-data.js
     assets/site.js            (defines window.KBUHS + dispatches kbuhs:lang)
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     1. TEACHER SLIDER
     ============================================================ */
  (function slider() {
    var track    = document.getElementById('tsTrack');
    var viewport = document.getElementById('tsViewport');
    var dotsBox  = document.getElementById('tsDots');
    var prevBtn  = document.getElementById('tsPrev');
    var nextBtn  = document.getElementById('tsNext');
    var wrap     = document.getElementById('teacherSlider');

    if (!track || !wrap || !window.TEACHERS) return;

    var INTERVAL   = 2000;   // autoplay speed (ms)
    var DOT_WINDOW = 5;      // how many dots shown at once

    var currentIndex = 0;
    var timer = null;
    var reduceMotion = false;

    try {
      reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    /* ---------- Helpers ---------- */
    function esc(s)      { return window.KBUHS.esc(s); }
    function initials(n) { return window.KBUHS.initials(n); }

    function getVisible() {
      var v = getComputedStyle(wrap).getPropertyValue('--visible').trim();
      return Math.max(1, parseInt(v, 10) || 4);
    }
    function maxIndex() {
      return Math.max(0, window.TEACHERS.length - getVisible());
    }
    function totalPositions() {
      return maxIndex() + 1;
    }

    /* ---------- Render cards ---------- */
    function renderCards() {
      var lang = window.KBUHS.getLang();

      track.innerHTML = window.TEACHERS.map(function (t) {
        var desig = lang === 'bn' ? t.desig.bn : t.desig.en;
        var subj  = lang === 'bn' ? t.subject.bn : t.subject.en;
        var ini   = initials(t.name);
        var photo = 'images/teachers/' + t.id + '.jpg';

        return '<div class="ts-slide">'
          +   '<article class="teacher-card">'
          +     '<div class="avatar">'
          +       '<img src="' + photo + '" alt="' + esc(t.name) + '" loading="lazy" onerror="this.remove()">'
          +       '<span class="avatar-initials">' + ini + '</span>'
          +     '</div>'
          +     '<h4>' + esc(t.name) + '</h4>'
          +     '<p class="role">' + esc(desig) + '</p>'
          +     (subj ? '<p class="subject">' + esc(subj) + '</p>' : '')
          +   '</article>'
          + '</div>';
      }).join('');
    }

    /* ---------- Dots (sliding window) ---------- */
    function buildDots() {
      var positions = totalPositions();
      var size      = Math.min(DOT_WINDOW, positions);
      var start = Math.max(0, Math.min(
        currentIndex - Math.floor(size / 2),
        positions - size
      ));

      dotsBox.innerHTML = '';

      for (var i = start; i < start + size; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'ts-dot' + (i === currentIndex ? ' active' : '');
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Position ' + (i + 1));
        b.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');

        (function (idx) {
          b.addEventListener('click', function () {
            goTo(idx);
            restart();
          });
        })(i);

        dotsBox.appendChild(b);
      }
    }

    /* ---------- Go to slide ---------- */
    function goTo(index, instant) {
      var max = maxIndex();
      if (index < 0)   index = max;
      if (index > max) index = 0;
      currentIndex = index;

      var slides = track.children;
      if (!slides.length) return;

      var r0 = slides[0].getBoundingClientRect();
      var rN = slides[currentIndex].getBoundingClientRect();
      var offset = rN.left - r0.left;

      var maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
      offset = Math.min(offset, maxOffset);

      if (instant || reduceMotion) {
        track.style.transition = 'none';
        track.style.transform  = 'translateX(-' + offset + 'px)';
        void track.offsetWidth;
        track.style.transition = '';
      } else {
        track.style.transform = 'translateX(-' + offset + 'px)';
      }

      buildDots();
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    /* ---------- Autoplay ---------- */
    function start() {
      stop();
      if (reduceMotion) return;
      timer = setInterval(next, INTERVAL);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function restart() { start(); }

    /* ---------- Events ---------- */
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });

    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    wrap.addEventListener('focusin',  stop);
    wrap.addEventListener('focusout', start);

    /* Touch / swipe */
    var sx = 0, sy = 0, touching = false;
    viewport.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      sx = t.clientX;
      sy = t.clientY;
      touching = true;
      stop();
    }, { passive: true });

    viewport.addEventListener('touchend', function (e) {
      if (!touching) return;
      touching = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - sx;
      var dy = t.clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next(); else prev();
      }
      start();
    }, { passive: true });

    /* Pause when tab is hidden */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    /* Recalculate on resize */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        goTo(currentIndex, true);
      }, 120);
    });

    /* Re-render when language changes (event comes from site.js) */
    window.addEventListener('kbuhs:lang', function () {
      renderCards();
      goTo(currentIndex, true);
      restart();
    });

    /* ---------- Go ---------- */
    renderCards();
    goTo(0, true);
    start();
  })();

  /* ============================================================
     2. CONTACT FORM
     ============================================================ */
  (function contactForm() {
    var form    = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = form.querySelector('#name');
      var phone   = form.querySelector('#phone');
      var message = form.querySelector('#message');
      var valid   = true;

      [name, phone, message].forEach(function (f) {
        if (!f) return;
        if (!f.value.trim()) {
          f.style.borderColor = '#D9534F';
          valid = false;
        } else {
          f.style.borderColor = '';
        }
      });
      if (!valid) return;

      success.classList.add('show');
      form.reset();
      setTimeout(function () { success.classList.remove('show'); }, 6000);
    });
  })();
})();