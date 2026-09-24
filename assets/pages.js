/* ============================================================
   assets/pages.js
   Small reusable behaviors for content pages
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Gallery lightbox ---------- */
  (function lightbox() {
    var links = document.querySelectorAll('[data-lightbox]');
    if (!links.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lightbox-close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<img alt="">';
    document.body.appendChild(box);

    var img = box.querySelector('img');
    var closeBtn = box.querySelector('.lightbox-close');

    function open(src, alt) {
      img.src = src; img.alt = alt || '';
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('open');
      document.body.style.overflow = '';
    }

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href') || a.getAttribute('data-src');
        if (!href) return;
        e.preventDefault();
        open(href, a.getAttribute('data-alt') || '');
      });
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  })();

  /* ---------- Table sort ---------- */
  (function tableSort() {
    document.querySelectorAll('.data-table').forEach(function (table) {
      var heads = table.querySelectorAll('thead th');
      if (!heads.length) return;
      var tbody = table.querySelector('tbody');
      if (!tbody) return;

      heads.forEach(function (th, colIdx) {
        if (th.hasAttribute('data-nosort')) return;
        th.style.cursor = 'pointer';
        th.addEventListener('click', function () {
          var asc = th.getAttribute('data-sort') !== 'asc';
          heads.forEach(function (h) { h.removeAttribute('data-sort'); });
          th.setAttribute('data-sort', asc ? 'asc' : 'desc');

          var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
          rows.sort(function (a, b) {
            var av = (a.children[colIdx] || {}).textContent || '';
            var bv = (b.children[colIdx] || {}).textContent || '';
            var an = parseFloat(av), bn = parseFloat(bv);
            if (!isNaN(an) && !isNaN(bn)) return asc ? an - bn : bn - an;
            return asc ? av.localeCompare(bv) : bv.localeCompare(av);
          });
          rows.forEach(function (r) { tbody.appendChild(r); });
        });
      });
    });
  })();

  /* ---------- Auto-close download menus on outside click ---------- */
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.download-menu:not([hidden])').forEach(function (m) {
      if (!m.parentElement.contains(e.target)) m.hidden = true;
    });
  });
})();