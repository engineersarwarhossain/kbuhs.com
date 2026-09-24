/* ============================================================
   assets/students.js
   Class hub — 5 class cards on students.html
   Requires: data/students-data.js
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('classGrid');
  if (!grid) return;

  var CLASSES = ['6','7','8','9','10'];

  function render() {
    var lang = window.KBUHS.getLang();

    grid.innerHTML = CLASSES.map(function (cls) {
      var count = window.countClass(cls);
      var hasData = count > 0;
      var numLabel = lang === 'bn' ? window.KBUHS.bnNum(cls) : cls;
	var countText = window.KBUHS.num(count)
 	 + (lang === 'bn' ? ' জন' : (count === 1 ? ' student' : ' students'));

      return '<a class="class-card reveal" href="students-' + cls + '.html">'
        +   '<div class="badge">' + numLabel + '</div>'
        +   '<h3>' + window.KBUHS.esc(window.KBUHS.classLabel(cls, lang)) + '</h3>'
        +   '<div class="count' + (hasData ? '' : ' empty') + '">' + countText + '</div>'
        +   '<span class="arrow">'
        +     (lang === 'bn' ? 'দেখুন' : 'View')
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
        +   '</span>'
        + '</a>';
    }).join('');

    grid.querySelectorAll('.reveal').forEach(function (el, i) {
      el.style.transitionDelay = (i * 60) + 'ms';
      setTimeout(function () { el.classList.add('in'); }, 50 + i * 60);
    });
  }

  /* ---------- Hero stats ---------- */
  function updateStats() {
    var total = 0;
    var classesWithData = 0;
    var sections = [];
    var classes = ['6', '7', '8', '9', '10'];
    classes.forEach(function (c) {
      var n = window.countClass(c);
      total += n;
      if (n > 0) classesWithData++;
      Object.keys(window.STUDENTS_DATA[c] || {}).forEach(function (s) {
        var key = c + '-' + s;
        if (sections.indexOf(key) === -1) sections.push(key);
      });
    });
    var lang = window.KBUHS.getLang();
    function fmt(v) { return lang === 'bn' ? window.KBUHS.bnNum(v) : String(v); }
    var t = document.getElementById('statTotal');
    var c = document.getElementById('statClasses');
    var s = document.getElementById('statSections');
    if (t) t.textContent = fmt(total);
    if (c) c.textContent = fmt(classesWithData);
    if (s) s.textContent = fmt(sections.length);
  }

  function boot() {
    render();
    updateStats();
  }

  boot();
  window.addEventListener('kbuhs:lang', boot);
})();