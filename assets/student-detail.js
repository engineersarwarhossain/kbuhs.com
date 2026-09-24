/* ============================================================
   assets/student-detail.js
   Renders student.html?id=XXXX
   Requires: data/students-data.js
   ============================================================ */
(function () {
  'use strict';

  var root = document.getElementById('detailContainer');
  if (!root) return;

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function subjectChips(codesCsv, lang) {
    if (!codesCsv) return '<p class="empty">—</p>';
    var codes = String(codesCsv).split(',').map(function (c) { return c.trim(); });
    return '<div class="subject-list">' + codes.map(function (c) {
      var m = (window.SUBJECT_MAP || {})[c];
      if (m) {
        return '<span>' + window.KBUHS.esc(lang === 'bn' ? m.bn : m.en) + '</span>';
      }
      return '<span class="code-only">Code (' + window.KBUHS.esc(c) + ')</span>';
    }).join('') + '</div>';
  }

  function render() {
    var id = param('id');
    var lang = window.KBUHS.getLang();

    if (!id) {
      root.innerHTML = '<div class="empty-state show"><h3>'
        + (lang === 'bn' ? 'শিক্ষার্থী পাওয়া যায়নি' : 'Student not found')
        + '</h3></div>';
      return;
    }

    var found = window.findStudentById(id);
    if (!found) {
      root.innerHTML = '<div class="empty-state show"><h3>'
        + (lang === 'bn' ? 'শিক্ষার্থী পাওয়া যায়নি' : 'Student not found')
        + '</h3></div>';
      return;
    }

    var s = found.student;
    var cls = found.cls;
    var sec = found.section;
    var n = window.normalizeStudent(s, cls, sec);
    var ini = window.KBUHS.initials(n.name);
    var photo = 'images/students/' + n.id + '.jpg';

    var crumb = document.getElementById('crumbCurrent');
    if (crumb) crumb.textContent = n.name;

    function row(labelBn, labelEn, val) {
      var v = (val == null || val === '') ? '' : val;
      return '<div class="item">'
        + '<label data-bn="' + labelBn + '" data-en="' + labelEn + '">' + labelBn + '</label>'
        + '<p class="' + (v ? '' : 'empty') + '">' + (v ? window.KBUHS.esc(v) : '—') + '</p>'
        + '</div>';
    }

    root.innerHTML = ''
      + '<div class="detail-wrap">'
      +   '<div class="detail-head">'
      +     '<div class="detail-photo">'
      +       '<img src="' + photo + '" alt="" onerror="this.remove()">'
      +       '<span class="s-initials">' + ini + '</span>'
      +     '</div>'
      +     '<h1>' + window.KBUHS.esc(n.name) + '</h1>'
      +     '<p class="id-line">' + (lang === 'bn' ? 'আইডি' : 'ID')
      +       ': <strong>' + window.KBUHS.esc(n.id) + '</strong></p>'
      +     '<div class="detail-badges">'
      +       '<span class="gold">' + window.KBUHS.esc(window.KBUHS.classLabel(n.cls, lang)) + '</span>'
      +       '<span>' + window.KBUHS.esc(window.KBUHS.sectionLabel(n.section, lang)) + '</span>'
      +       '<span>' + (lang === 'bn' ? 'রোল ' : 'Roll ') + window.KBUHS.esc(window.KBUHS.num(n.roll)) + '</span>'
      +     '</div>'
      +   '</div>'
      +   '<div class="detail-body">'
      +     '<h3>' + (lang === 'bn' ? 'পরিচয়' : 'Identity') + '</h3>'
      +     '<div class="info-grid">'
      +       row('জন্ম তারিখ', 'Date of Birth', n.dob)
      +       row('ধর্ম', 'Religion', n.religion)
      +       row('লিঙ্গ', 'Gender', n.gender)
      +       row('শ্রেণি', 'Class', window.KBUHS.classLabel(n.cls, lang))
      +       row('শাখা', 'Section', n.section)
      +       row('রোল', 'Roll', n.roll)
      +     '</div>'
      +     '<h3>' + (lang === 'bn' ? 'অভিভাবক' : 'Guardians') + '</h3>'
      +     '<div class="info-grid">'
      +       row('পিতার নাম', 'Father', n.father)
      +       row('মাতার নাম', 'Mother', n.mother)
      +     '</div>'
      +     '<h3>' + (lang === 'bn' ? 'বিষয়' : 'Subjects') + '</h3>'
      +     subjectChips(n.subjects, lang)
      +     '<div class="detail-actions">'
      +       '<a href="students-' + n.cls + '.html" class="btn btn-primary btn-sm">'
      +         (lang === 'bn' ? 'শ্রেণির তালিকায় ফিরুন' : 'Back to class list')
      +       '</a>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  render();
  window.addEventListener('kbuhs:lang', function () {
    /* re-render labels after language switch */
    render();
  });
})();