/* ============================================================
   assets/student-list.js
   Reusable: filter form (Year / Class / Shift / Section)
             + CSV / Excel / PDF / Print download
   Usage:
     StudentList.mount('#studentListRoot', { defaultClass: '6' });
   Requires: data/students-data.js
   ============================================================ */
(function () {
  'use strict';

  var HEADERS = ["Roll","ID","Name","Father","Mother","DOB","Religion","Gender","Class","Section"];

  function rowFor(s) {
    return [ s.roll, s.id, s.name, s.father, s.mother, s.dob,
             s.religion, s.gender, s.cls, s.section ];
  }

  function escCSV(v) {
    return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  }
  function toCSV(rows) {
    var lines = [HEADERS.map(escCSV).join(',')];
    rows.forEach(function (r) { lines.push(r.map(escCSV).join(',')); });
    return lines.join('\r\n');
  }
  function downloadBlob(content, filename, mime) {
    var blob = new Blob(['\ufeff' + content], { type: mime + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function loadSheetJS(cb) {
    if (window.XLSX) return cb();
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }
  function loadJsPDF(cb) {
    if (window.jspdf) return cb();
    var a = document.createElement('script');
    a.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
    a.onload = function () {
      var b = document.createElement('script');
      b.src = 'https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js';
      b.onload = cb;
      document.head.appendChild(b);
    };
    document.head.appendChild(a);
  }

  var Export = {
    csv: function (rows, name) {
      downloadBlob(toCSV(rows), name + '.csv', 'text/csv');
    },
    excel: function (rows, name) {
      loadSheetJS(function () {
        var aoa = [HEADERS].concat(rows);
        var ws = XLSX.utils.aoa_to_sheet(aoa);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, name + '.xlsx');
      });
    },
    pdf: function (rows, name) {
      loadJsPDF(function () {
        var doc = new jspdf.jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
        doc.setFontSize(14);
        doc.text('Student List — ' + name, 40, 40);
        doc.autoTable({
          startY: 60,
          head: [HEADERS],
          body: rows,
          styles: { fontSize: 9 },
          headStyles: { fillColor: [11, 93, 59] }
        });
        doc.save(name + '.pdf');
      });
    },
    print: function (rows, name) {
      var win = window.open('', '_blank');
      var html =
        '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' +
        '<style>body{font-family:sans-serif;padding:20px}' +
        'h1{font-size:18px;margin-bottom:12px}' +
        'table{width:100%;border-collapse:collapse;font-size:12px}' +
        'th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}' +
        'th{background:#0B5D3B;color:#fff}' +
        '@media print{@page{size:landscape}}</style></head><body>' +
        '<h1>Student List — ' + name + '</h1><table><thead><tr>' +
        HEADERS.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('') +
        '</tbody></table></body></html>';
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(function () { win.print(); }, 250);
    }
  };

  function formHTML(defaultClass) {
    var years = window.STUDENT_OPTIONS.years.map(function (y) {
      return '<option value="' + y + '">' + y + '</option>';
    }).join('');

    var shifts = '<option value="">—</option>' + window.STUDENT_OPTIONS.shifts.map(function (s) {
      return '<option value="' + s.value + '" data-bn="' + s.bn + '" data-en="' + s.en + '">' + s.bn + '</option>';
    }).join('');

    var classes = ['6','7','8','9','10'].map(function (c) {
      var sel = (c === defaultClass) ? ' selected' : '';
      return '<option value="' + c + '"' + sel + '>' + window.KBUHS.classLabel(c) + '</option>';
    }).join('');

    return '' +
      '<form class="filter-panel" id="slFilter">' +
        '<div class="filter-head">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
          '<span data-bn="অনুসন্ধান" data-en="Search">অনুসন্ধান</span>' +
        '</div>' +
        '<div class="filter-row">' +
          '<label data-bn="শিক্ষাবর্ষ" data-en="Year of Student">শিক্ষাবর্ষ</label>' +
          '<select name="year">' + years + '</select>' +
        '</div>' +
        '<div class="filter-row">' +
          '<label data-bn="শ্রেণি" data-en="Class">শ্রেণি</label>' +
          '<select name="cls">' + classes + '</select>' +
        '</div>' +
        '<div class="filter-row">' +
          '<label data-bn="শিফট" data-en="Shift">শিফট</label>' +
          '<select name="shift">' + shifts + '</select>' +
        '</div>' +
        '<div class="filter-row">' +
          '<label data-bn="শাখা" data-en="Section">শাখা</label>' +
          '<select name="section" id="slSection"><option value="">—</option></select>' +
        '</div>' +
        '<div class="filter-actions">' +
          '<button type="submit" class="btn btn-primary btn-sm" data-bn="অনুসন্ধান" data-en="Search">অনুসন্ধান</button>' +
          '<button type="reset" class="btn btn-ghost btn-sm" data-bn="রিসেট" data-en="Reset">রিসেট</button>' +
          '<div class="download-wrap">' +
            '<button type="button" class="btn btn-gold btn-sm" id="slDownload">' +
              '<span data-bn="ডাউনলোড" data-en="Download">ডাউনলোড</span>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>' +
            '</button>' +
            '<div class="download-menu" id="slDownloadMenu" hidden>' +
              '<button data-fmt="csv">CSV <small>.csv</small></button>' +
              '<button data-fmt="excel">Excel <small>.xlsx</small></button>' +
              '<button data-fmt="pdf">PDF <small>.pdf</small></button>' +
              '<button data-fmt="print">Print <small>dialog</small></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</form>';
  }

  window.StudentList = {
    mount: function (rootSel, opts) {
      var root = document.querySelector(rootSel);
      if (!root) return;
      var defaultClass = (opts && opts.defaultClass) || '6';

      root.innerHTML =
        formHTML(defaultClass) +
        '<div class="sl-count" id="slCount"></div>' +
        '<div class="s-grid" id="slGrid"></div>' +
        '<div class="empty-state" id="slEmpty">' +
          '<h3 data-bn="কোনো শিক্ষার্থী পাওয়া যায়নি" data-en="No students found">কোনো শিক্ষার্থী পাওয়া যায়নি</h3>' +
          '<p data-bn="অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন।" data-en="Try changing your filters.">অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন।</p>' +
        '</div>';

      var form     = root.querySelector('#slFilter');
      var yearSel  = form.year;
      var clsSel   = form.cls;
      var shiftSel = form.shift;
      var secSel   = form.section;
      var grid     = root.querySelector('#slGrid');
      var empty    = root.querySelector('#slEmpty');
      var count    = root.querySelector('#slCount');

      function refreshSections() {
        var cls = clsSel.value;
        var sections = Object.keys((window.STUDENTS_DATA[cls] || {}));
        secSel.innerHTML = '<option value="">—</option>' +
          sections.map(function (s) {
            return '<option value="' + s + '">' + window.KBUHS.sectionLabel(s) + '</option>';
          }).join('');
      }

      function getResults() {
        var y  = yearSel.value;
        var c  = clsSel.value;
        var sh = shiftSel.value;
        var se = secSel.value;
        var out = [];

        var secs = se ? [se] : Object.keys(window.STUDENTS_DATA[c] || {});
        secs.forEach(function (sec) {
          ((window.STUDENTS_DATA[c] || {})[sec] || []).forEach(function (s) {
            var n = window.normalizeStudent(s, c, sec);
            if (y  && n.year  !== y)  return;
            if (sh && n.shift !== sh) return;
            out.push(n);
          });
        });
        out.sort(function (a, b) {
          if (a.section !== b.section) return a.section.localeCompare(b.section);
          return (parseInt(a.roll, 10) || 0) - (parseInt(b.roll, 10) || 0);
        });
        return out;
      }

      function render() {
        var rows = getResults();
        var lang = window.KBUHS.getLang();

        grid.innerHTML = rows.map(function (s) {
          var ini = window.KBUHS.initials(s.name);
          var photo = 'images/students/' + s.id + '.jpg';
          return '<a class="s-card" href="student.html?id=' + encodeURIComponent(s.id) + '">' +
            '<div class="s-photo">' +
              '<img src="' + photo + '" alt="" loading="lazy" onerror="this.remove()">' +
              '<span class="s-initials">' + ini + '</span>' +
            '</div>' +
            '<h3 class="s-name">' + window.KBUHS.esc(s.name) + '</h3>' +
            '<div class="s-meta">' +
              '<span>' + window.KBUHS.esc(window.KBUHS.classLabel(s.cls, lang)) + '</span>' +
              '<span class="sec">' + window.KBUHS.esc(window.KBUHS.sectionLabel(s.section, lang)) + '</span>' +
            '</div>' +
            '<p class="s-roll">' + (lang === 'bn' ? 'রোল' : 'Roll') +
              ': <strong>' + window.KBUHS.esc(window.KBUHS.num(s.roll)) + '</strong></p>' +
          '</a>';
        }).join('');

        empty.classList.toggle('show', rows.length === 0);
        count.textContent = lang === 'bn'
          ? window.KBUHS.bnNum(rows.length) + ' জন শিক্ষার্থী'
          : rows.length + (rows.length === 1 ? ' student' : ' students');
      }

      clsSel.addEventListener('change', function () { refreshSections(); render(); });
      yearSel.addEventListener('change', render);
      shiftSel.addEventListener('change', render);
      secSel.addEventListener('change', render);

      form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
      form.addEventListener('reset', function () {
        setTimeout(function () { refreshSections(); render(); }, 0);
      });

      /* Download menu */
      var dlBtn  = root.querySelector('#slDownload');
      var dlMenu = root.querySelector('#slDownloadMenu');
      dlBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dlMenu.hidden = !dlMenu.hidden;
      });
      document.addEventListener('click', function () { dlMenu.hidden = true; });

      dlMenu.addEventListener('click', function (e) {
        var b = e.target.closest('[data-fmt]');
        if (!b) return;
        dlMenu.hidden = true;
        var fmt = b.getAttribute('data-fmt');
        var rows = getResults().map(rowFor);
        var name = 'students-class-' + clsSel.value +
                   (secSel.value ? '-' + secSel.value : '') +
                   '-' + yearSel.value;
        if (Export[fmt]) Export[fmt](rows, name);
      });

      window.addEventListener('kbuhs:lang', render);

      refreshSections();
      render();
    }
  };
})();