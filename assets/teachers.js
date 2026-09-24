/* ============================================================
   assets/teachers.js
   Requires: data/teachers-data.js (window.TEACHERS)
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('teacherGrid');
  if (!grid || !window.TEACHERS) return;

  var emptyState    = document.getElementById('emptyState');
  var searchInput   = document.getElementById('searchInput');
  var desigSelect   = document.getElementById('desigSelect');
  var subjectSelect = document.getElementById('subjectSelect');
  var countEl       = document.getElementById('resultCount');

  /* ---------- Build filter dropdowns ---------- */
  function buildFilters() {
    var desigs = [], subs = [];
    TEACHERS.forEach(function (t) {
      if (desigs.indexOf(t.desig.en) === -1) desigs.push(t.desig.en);
      if (t.subject.en && subs.indexOf(t.subject.en) === -1) subs.push(t.subject.en);
    });

    if (desigSelect) {
      desigSelect.innerHTML = '';
      var allD = document.createElement('option');
      allD.value = "";
      allD.setAttribute('data-bn','সকল পদবি');
      allD.setAttribute('data-en','All Designations');
      allD.textContent = 'সকল পদবি';
      desigSelect.appendChild(allD);

      desigs.forEach(function (d) {
        var opt = document.createElement('option');
        opt.value = d;
        var src = TEACHERS.find(function (x) { return x.desig.en === d; });
        opt.setAttribute('data-bn', (src && src.desig.bn) || d);
        opt.setAttribute('data-en', d);
        opt.textContent = (src && src.desig.bn) || d;
        desigSelect.appendChild(opt);
      });
    }

    if (subjectSelect) {
      subjectSelect.innerHTML = '';
      var allS = document.createElement('option');
      allS.value = "";
      allS.setAttribute('data-bn','সকল বিষয়');
      allS.setAttribute('data-en','All Subjects');
      allS.textContent = 'সকল বিষয়';
      subjectSelect.appendChild(allS);

      subs.forEach(function (s) {
        var opt = document.createElement('option');
        opt.value = s;
        var src = TEACHERS.find(function (x) { return x.subject.en === s; });
        opt.setAttribute('data-bn', (src && src.subject.bn) || s);
        opt.setAttribute('data-en', s);
        opt.textContent = (src && src.subject.bn) || s;
        subjectSelect.appendChild(opt);
      });
    }

    /* Hero stats */
    var statTotal = document.getElementById('statTotal');
    var statDesig = document.getElementById('statDesig');
    var statSubj  = document.getElementById('statSubj');
    if (statTotal) statTotal.textContent = window.KBUHS.num(TEACHERS.length);
    if (statDesig) statDesig.textContent = window.KBUHS.num(desigs.length);
    if (statSubj)  statSubj.textContent  = window.KBUHS.num(subs.length);
  }

  /* ---------- Render ---------- */
  function render() {
    var lang = window.KBUHS.getLang();
    var q  = (searchInput && searchInput.value || '').trim().toLowerCase();
    var df = desigSelect && desigSelect.value;
    var sf = subjectSelect && subjectSelect.value;

    var list = TEACHERS.filter(function (t) {
      if (df && t.desig.en !== df) return false;
      if (sf && t.subject.en !== sf) return false;
      if (q) {
        var hay = [t.name, t.id, t.desig.bn, t.desig.en, t.subject.bn, t.subject.en]
          .join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    grid.innerHTML = list.map(function (t) {
      var desig = lang === 'bn' ? t.desig.bn : t.desig.en;
      var subj  = lang === 'bn' ? t.subject.bn : t.subject.en;
      var ini   = window.KBUHS.initials(t.name);
      var photo = 'images/teachers/' + t.id + '.jpg';

      var contact = '';
      if (t.mobile) {
        contact += '<a href="tel:' + window.KBUHS.esc(t.mobile) + '">'
          + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>'
          + '<span>' + window.KBUHS.esc(t.mobile) + '</span></a>';
      }
      if (t.email) {
        contact += '<a href="mailto:' + window.KBUHS.esc(t.email) + '">'
          + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>'
          + '<span>' + window.KBUHS.esc(t.email) + '</span></a>';
      }
      if (!contact) {
        contact = '<span class="t-none">'
          + (lang === 'bn' ? 'যোগাযোগের তথ্য নেই' : 'No contact info')
          + '</span>';
      }

      return '<article class="t-card">'
        + '<div class="t-photo">'
        +   '<img src="' + photo + '" alt="' + window.KBUHS.esc(t.name) + '" loading="lazy" onerror="this.remove()">'
        +   '<span class="t-initials">' + ini + '</span>'
        + '</div>'
        + '<div class="t-info">'
        +   '<h3 class="t-name">' + window.KBUHS.esc(t.name) + '</h3>'
        +   '<div class="t-badges">'
        +     '<span class="t-desig' + (t.head ? ' head' : '') + '">' + window.KBUHS.esc(desig) + '</span>'
        +     (subj ? '<span class="t-subject">' + window.KBUHS.esc(subj) + '</span>' : '')
        +   '</div>'
        +   '<p class="t-id">' + (lang === 'bn' ? 'আইডি' : 'ID')
        +     ': <strong>' + window.KBUHS.esc(t.id) + '</strong></p>'
        +   '<div class="t-contact">' + contact + '</div>'
        + '</div>'
        + '</article>';
    }).join('');

    grid.style.display = list.length === 0 ? 'none' : '';
    if (emptyState) emptyState.classList.toggle('show', list.length === 0);

    if (countEl) {
      countEl.textContent = lang === 'bn'
        ? window.KBUHS.bnNum(list.length) + ' জন শিক্ষক পাওয়া গেছে'
        : list.length + (list.length === 1 ? ' teacher found' : ' teachers found');
    }
  }

  buildFilters();
  render();

  if (searchInput)   searchInput.addEventListener('input', render);
  if (desigSelect)   desigSelect.addEventListener('change', render);
  if (subjectSelect) subjectSelect.addEventListener('change', render);

  window.addEventListener('kbuhs:lang', render);
})();