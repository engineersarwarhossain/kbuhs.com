/* ============================================================
   assets/results.js
   Exam Results page logic.
   Renders the result as an official document card
   (see assets/print-card.css).
   Requires: site-config.js, students-data.js, site.js
   ============================================================ */
(function () {
  'use strict';

  var EXAMS = [
    { key: 'pretest', bn: 'এসএসসি প্রি-টেস্ট', en: 'SSC Pre Test' },
    { key: 'half',    bn: 'অর্ধ-বার্ষিক',       en: 'Half-Yearly' },
    { key: 'annual',  bn: 'বার্ষিক',             en: 'Annual' },
    { key: 'test',    bn: 'টেস্ট পরীক্ষা',       en: 'Test Exam' }
  ];

  var CLASSES = ['6', '7', '8', '9', '10'];
  var GROUP_CLASSES = ['9', '10'];

  var SUBJECTS_BY_CLASS = {
    '6':  ['bangla', 'english', 'math', 'science', 'social', 'islamic', 'ict'],
    '7':  ['bangla', 'english', 'math', 'science', 'social', 'islamic', 'ict'],
    '8':  ['bangla', 'english', 'math', 'science', 'social', 'islamic', 'ict'],
    '9':  ['bangla', 'english', 'math', 'physics', 'chemistry', 'biology', 'ict', 'social', 'islamic'],
    '10': ['bangla', 'english', 'math', 'physics', 'chemistry', 'biology', 'ict', 'social', 'islamic']
  };

  var SUBJECT_INFO = {
    bangla:    { bn: 'বাংলা',                 en: 'Bangla',          code: '101' },
    english:   { bn: 'ইংরেজি',                en: 'English',         code: '102' },
    math:      { bn: 'গণিত',                  en: 'Mathematics',     code: '109' },
    science:   { bn: 'বিজ্ঞান',                en: 'Science',         code: '127' },
    social:    { bn: 'সমাজবিজ্ঞান',            en: 'Social Science',  code: '110' },
    islamic:   { bn: 'ইসলাম শিক্ষা',           en: 'Islamic Studies', code: '111' },
    ict:       { bn: 'তথ্য ও যোগাযোগ প্রযুক্তি', en: 'ICT',             code: '131' },
    physics:   { bn: 'পদার্থবিজ্ঞান',           en: 'Physics',         code: '136' },
    chemistry: { bn: 'রসায়ন',                 en: 'Chemistry',       code: '137' },
    biology:   { bn: 'জীববিজ্ঞান',              en: 'Biology',         code: '138' }
  };

  var FULL_CREATIVE = 70;
  var FULL_MCQ = 30;
  var FULL_TOTAL = 100;

  var currentExam  = 'half';
  var currentClass = '6';
  var lastResult   = null;

  var examTabsBox   = document.getElementById('examTabs');
  var classTabsBox  = document.getElementById('classTabs');
  var searchIdInput = document.getElementById('searchStudentId');
  var searchClass   = document.getElementById('searchClass');
  var groupField    = document.getElementById('groupField');
  var searchGroup   = document.getElementById('searchGroup');
  var searchRoll    = document.getElementById('searchRoll');
  var searchBtn     = document.getElementById('searchBtn');
  var resultArea    = document.getElementById('resultArea');

  if (!examTabsBox || !classTabsBox || !searchClass || !searchBtn || !resultArea) return;

  /* ---------------- Helpers ---------------- */
  function esc(s) { return window.KBUHS.esc(s); }
  function L()    { return window.KBUHS.getLang(); }
  function bnNum(n){ return window.KBUHS.bnNum(n); }
  function num(n)  { return L() === 'bn' ? bnNum(n) : String(n); }
  function classLabel(c, l) { return window.KBUHS.classLabel(c, l || L()); }

  function examLabel(key, l) {
    var i;
    for (i = 0; i < EXAMS.length; i++) {
      if (EXAMS[i].key === key) return (l || L()) === 'bn' ? EXAMS[i].bn : EXAMS[i].en;
    }
    return key;
  }

  function hash(str) {
    var h = 0, i;
    for (i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function generateMark(studentId, subjectKey, examKey, maxMarks) {
    var seed = hash(studentId + ':' + subjectKey + ':' + examKey);
    var pct = 55 + (seed % 46);
    return Math.round(pct / 100 * maxMarks);
  }

  function gradeFromPct(pct) {
    if (pct >= 80) return { key: 'a-plus',  bn: 'A+', en: 'A+' };
    if (pct >= 70) return { key: 'a',       bn: 'A',  en: 'A' };
    if (pct >= 60) return { key: 'a-minus', bn: 'A-', en: 'A-' };
    if (pct >= 50) return { key: 'b',       bn: 'B',  en: 'B' };
    if (pct >= 40) return { key: 'c',       bn: 'C',  en: 'C' };
    if (pct >= 33) return { key: 'd',       bn: 'D',  en: 'D' };
    return { key: 'f', bn: 'F', en: 'F' };
  }

  function gpaFromPct(pct) {
    if (pct >= 80) return 5.00;
    if (pct >= 70) return 4.00;
    if (pct >= 60) return 3.50;
    if (pct >= 50) return 3.00;
    if (pct >= 40) return 2.00;
    if (pct >= 33) return 1.00;
    return 0.00;
  }

  function groupFromSection(sec) {
    var m = /^[A-Za-z]\s*-\s*(.+)$/.exec(String(sec || ''));
    return m ? m[1].trim() : '';
  }

  function groupsForClass(cls) {
    var data = window.STUDENTS_DATA || {};
    var sections = Object.keys(data[cls] || {});
    var seen = [];
    sections.forEach(function (sec) {
      var g = groupFromSection(sec);
      if (g && seen.indexOf(g) === -1) seen.push(g);
    });
    seen.sort();
    return seen;
  }

  function isGroupClass(cls) {
    return GROUP_CLASSES.indexOf(String(cls)) !== -1;
  }

  /* ---------------- Tabs ---------------- */
  function renderExamTabs() {
    var lang = L();
    var parts = [];
    var i;
    for (i = 0; i < EXAMS.length; i++) {
      var e = EXAMS[i];
      var active = (e.key === currentExam) ? ' active' : '';
      parts.push('<button type="button" data-exam="' + e.key + '" class="' + active.trim() + '"'
        + ' data-bn="' + e.bn + '" data-en="' + e.en + '">'
        + esc(lang === 'bn' ? e.bn : e.en) + '</button>');
    }
    examTabsBox.innerHTML = parts.join('');

    Array.prototype.forEach.call(examTabsBox.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () {
        currentExam = b.getAttribute('data-exam');
        if (currentExam === 'pretest' && currentClass !== '10') {
          currentClass = '10';
          renderClassTabs();
          renderClassOptions();
          updateGroupField();
        }
        clearResult();
        renderExamTabs();
      });
    });
  }

  function renderClassTabs() {
    var lang = L();
    var parts = [];
    var i;
    for (i = 0; i < CLASSES.length; i++) {
      var c = CLASSES[i];
      var active = (c === currentClass) ? ' active' : '';
      parts.push('<button type="button" class="class-tab' + active + '" data-class="' + c + '"'
        + ' data-bn="' + classLabel(c, 'bn') + '" data-en="' + classLabel(c, 'en') + '">'
        + esc(classLabel(c, lang)) + '</button>');
    }
    classTabsBox.innerHTML = parts.join('');

    Array.prototype.forEach.call(classTabsBox.querySelectorAll('.class-tab'), function (b) {
      b.addEventListener('click', function () {
        currentClass = b.getAttribute('data-class');
        if (currentExam === 'pretest' && currentClass !== '10') currentExam = 'half';
        clearResult();
        renderExamTabs();
        renderClassTabs();
        renderClassOptions();
        updateGroupField();
      });
    });
  }

  function renderClassOptions() {
    var lang = L();
    var parts = [];
    var i;
    for (i = 0; i < CLASSES.length; i++) {
      var c = CLASSES[i];
      var sel = (c === currentClass) ? ' selected' : '';
      parts.push('<option value="' + c + '"' + sel + '>' + esc(classLabel(c, lang)) + '</option>');
    }
    searchClass.innerHTML = parts.join('');
  }

  function updateGroupField() {
    var cls = searchClass.value;
    if (!isGroupClass(cls)) {
      groupField.style.display = 'none';
      searchGroup.innerHTML = '';
      return;
    }
    var groups = groupsForClass(cls);
    var lang = L();
    var parts = [];
    parts.push('<option value="">' + esc(lang === 'bn' ? 'সকল বিভাগ' : 'All Groups') + '</option>');

    var groupLabelBn = { 'Science': 'বিজ্ঞান', 'Humanities': 'মানবিক', 'Business': 'ব্যবসায় শিক্ষা' };
    var groupLabelEn = { 'Science': 'Science', 'Humanities': 'Humanities', 'Business': 'Business Studies' };

    groups.forEach(function (g) {
      var label = lang === 'bn' ? (groupLabelBn[g] || g) : (groupLabelEn[g] || g);
      parts.push('<option value="' + esc(g) + '">' + esc(label) + '</option>');
    });

    searchGroup.innerHTML = parts.join('');
    groupField.style.display = '';
  }

  function clearResult() {
    resultArea.innerHTML = '';
    lastResult = null;
  }

  /* ---------------- Lookup ---------------- */
  function findById(id) {
    var wanted = String(id || '').trim().toLowerCase();
    if (!wanted) return null;
    var found = null;
    window.forEachStudent(function (s, cls, sec) {
      if (!found && String(s.id || '').toLowerCase() === wanted) {
        found = { student: s, cls: cls, section: sec };
      }
    });
    return found;
  }

  function findByClassRollGroup(cls, group, roll) {
    var wantedRoll = String(roll || '').trim();
    if (!wantedRoll) return null;
    var data = window.STUDENTS_DATA || {};
    var sections = Object.keys(data[cls] || {});
    var found = null;

    sections.forEach(function (sec) {
      if (found) return;
      if (group) {
        var secGroup = groupFromSection(sec);
        if (secGroup !== group) return;
      }
      (data[cls][sec] || []).forEach(function (s) {
        if (!found && String(s.roll) === wantedRoll) {
          found = { student: s, cls: cls, section: sec };
        }
      });
    });
    return found;
  }

  /* ---------------- Search ---------------- */
  function search() {
    var idVal   = (searchIdInput && searchIdInput.value || '').trim();
    var cls     = searchClass.value;
    var group   = searchGroup.value;
    var roll    = (searchRoll.value || '').trim();

    if (idVal) {
      var byId = findById(idVal);
      if (!byId) {
        showError('শিক্ষার্থী পাওয়া যায়নি', 'Student not found',
          'এই আইডিতে কোনো শিক্ষার্থী নেই। আইডি ঠিক আছে কিনা যাচাই করুন।',
          'No student with this ID. Please check the ID.');
        return;
      }
      var r1 = buildResult(byId.student, byId.cls, byId.section);
      lastResult = r1;
      renderResult(r1);
      return;
    }

    if (!roll) {
      showError('রোল নম্বর লিখুন', 'Please enter a roll number',
        'স্টুডেন্ট আইডি অথবা রোল নম্বর — যেকোনো একটি দিলেই হবে।',
        'Enter either Student ID or a roll number.');
      return;
    }

    var byRoll = findByClassRollGroup(cls, group, roll);
    if (!byRoll) {
      var msgBn = group ? 'এই শ্রেণি ও বিভাগে এই রোল নম্বরে কোনো শিক্ষার্থী নেই।' : 'এই শ্রেণিতে এই রোল নম্বরে কোনো শিক্ষার্থী নেই।';
      var msgEn = group ? 'No student with this roll number in this class and group.' : 'No student with this roll number in this class.';
      showError('শিক্ষার্থী পাওয়া যায়নি', 'Student not found', msgBn, msgEn);
      return;
    }

    var r2 = buildResult(byRoll.student, byRoll.cls, byRoll.section);
    lastResult = r2;
    renderResult(r2);
  }

  /* ---------------- Build result object ---------------- */
  function buildResult(student, cls, section) {
    var subjKeys = SUBJECTS_BY_CLASS[cls] || SUBJECTS_BY_CLASS['6'];
    var rows = subjKeys.map(function (key) {
      var info = SUBJECT_INFO[key] || { bn: key, en: key, code: '—' };
      var creative = generateMark(student.id, key, currentExam + '-c', FULL_CREATIVE);
      var mcq      = generateMark(student.id, key, currentExam + '-m', FULL_MCQ);
      var obtained = creative + mcq;
      var pct      = Math.round(obtained / FULL_TOTAL * 100);
      var grade    = gradeFromPct(pct);
      return {
        key: key, bn: info.bn, en: info.en, code: info.code,
        creative: creative, mcq: mcq, obtained: obtained,
        full: FULL_TOTAL, pct: pct, grade: grade
      };
    });

    var totalObtained = 0, totalFull = 0;
    rows.forEach(function (r) { totalObtained += r.obtained; totalFull += r.full; });

    var overallPct = Math.round(totalObtained / totalFull * 100);
    var overallGrade = gradeFromPct(overallPct);
    var overallGpa = gpaFromPct(overallPct);
    var passed = rows.every(function (r) { return r.grade.key !== 'f'; });

    return {
      student: student, cls: cls, section: section, rows: rows,
      totalObtained: totalObtained, totalFull: totalFull,
      overallPct: overallPct, overallGrade: overallGrade,
      overallGpa: overallGpa, passed: passed, examKey: currentExam
    };
  }

  /* ============================================================
     RENDER RESULT CARD (matches admit-card design)
     ============================================================ */
  function renderResult(r) {
    var lang = L();
    var ini = window.KBUHS.initials(r.student.name);
    var photo = 'images/students/' + r.student.id + '.jpg';
    var S = window.SITE || {};
    var parts = [];

    /* ---------- Wrapper ---------- */
    parts.push('<div class="pc-screen-wrap">');

    /* Action buttons — hidden on print */
    parts.push('<div class="pc-actions">');
    parts.push('<button type="button" class="btn btn-primary" id="printResult">');
    parts.push('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">');
    parts.push('<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>');
    parts.push('<rect x="6" y="14" width="12" height="8"/></svg>');
    parts.push('<span>' + (lang === 'bn' ? 'প্রিন্ট / PDF' : 'Print / PDF') + '</span>');
    parts.push('</button>');
    parts.push('<button type="button" class="btn btn-ghost" id="newSearch">');
    parts.push('<span>' + (lang === 'bn' ? 'নতুন অনুসন্ধান' : 'New Search') + '</span>');
    parts.push('</button>');
    parts.push('</div>');

    /* The card */
    parts.push('<div class="pc-card" id="resultCard">');

    /* ---- Header ---- */
    parts.push('<div class="pc-header">');
    parts.push('<div class="pc-logo"><img src="images/logo.png" alt=""></div>');
    parts.push('<div class="pc-header-text">');
    parts.push('<h1>' + esc(S.nameEn || 'Kola Bazar United High School') + '</h1>');
    parts.push('<p>' + esc((S.addrEn || '').toUpperCase()) + '</p>');
    parts.push('<p class="pc-eiin">EIIN : ' + esc(S.eiinEn || '') + '</p>');
    parts.push('<p class="pc-web">Web : www.kbuhs61.edu.bd</p>');
    parts.push('</div></div>');

    /* Line under header */
    parts.push('<div class="pc-line"></div>');

    /* ---- Bold + underlined title ---- */
    parts.push('<div class="pc-title"><h2>' + (lang === 'bn' ? 'ফলাফল কার্ড' : 'Result Card') + '</h2></div>');

    /* Exam name box */
    var examName = (lang === 'bn')
      ? examLabel(r.examKey, 'bn') + ' পরীক্ষা ২০২৬'
      : examLabel(r.examKey, 'en') + ' Examination 2026';
    parts.push('<div class="pc-exam-box">' + esc(examName) + '</div>');

    /* ---- Body: info + photo ---- */
    parts.push('<div class="pc-body">');
    parts.push('<div class="pc-info">');
    parts.push('<div class="row"><span class="lbl">Name</span><span class="colon">:</span><span class="val">' + esc(r.student.name) + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Father</span><span class="colon">:</span><span class="val">' + esc(r.student.father || '—') + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Mother</span><span class="colon">:</span><span class="val">' + esc(r.student.mother || '—') + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Birth Date</span><span class="colon">:</span><span class="val">' + esc(r.student.dob || '—') + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Gender</span><span class="colon">:</span><span class="val">' + esc(r.student.gender || '—') + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Religion</span><span class="colon">:</span><span class="val">' + esc(r.student.religion || '—') + '</span></div>');
    parts.push('</div>');

    parts.push('<div class="pc-photo">');
    parts.push('<img src="' + esc(photo) + '" alt="" onerror="this.remove()">');
    parts.push('<span>Photo</span>');
    parts.push('</div></div>');

    /* ---- IDs strip ---- */
    var group = groupFromSection(r.section) || 'General';
    parts.push('<div class="pc-ids">');
    parts.push('<div class="row"><span class="lbl">Student ID</span><span class="colon">:</span><span class="val">' + esc(r.student.id) + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Roll No</span><span class="colon">:</span><span class="val">' + esc(r.student.roll) + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Class</span><span class="colon">:</span><span class="val">' + esc(classLabel(r.cls, 'en')) + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Section</span><span class="colon">:</span><span class="val">' + esc(r.section) + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Group</span><span class="colon">:</span><span class="val">' + esc(group) + '</span></div>');
    parts.push('<div class="row"><span class="lbl">Exam</span><span class="colon">:</span><span class="val">' + esc(examLabel(r.examKey, 'en')) + '</span></div>');
    parts.push('</div>');

    /* ---- Marks table ---- */
    parts.push('<div class="pc-section-title">' + (lang === 'bn' ? 'বিষয়ভিত্তিক নম্বর' : 'Subject-wise Marks') + '</div>');
    parts.push('<table class="pc-table"><thead><tr>');
    parts.push('<th style="width:34px" class="c">SL</th>');
    parts.push('<th>' + (lang === 'bn' ? 'বিষয়' : 'Subject') + '</th>');
    parts.push('<th class="c" style="width:70px">' + (lang === 'bn' ? 'পূর্ণ' : 'Full') + '</th>');
    parts.push('<th class="c" style="width:70px">' + (lang === 'bn' ? 'প্রাপ্ত' : 'Obtained') + '</th>');
    parts.push('<th class="c" style="width:70px">' + (lang === 'bn' ? 'গ্রেড' : 'Grade') + '</th>');
    parts.push('</tr></thead><tbody>');

    r.rows.forEach(function (row, i) {
      var subjName = (lang === 'bn') ? row.bn : row.en;
      var sl = (lang === 'bn') ? bnNum(i + 1) : String(i + 1);
      parts.push('<tr>');
      parts.push('<td class="c">' + sl + '</td>');
      parts.push('<td>' + esc(subjName) + '</td>');
      parts.push('<td class="c">' + esc(String(row.full)) + '</td>');
      parts.push('<td class="c">' + esc(String(row.obtained)) + '</td>');
      parts.push('<td class="c"><b>' + esc(lang === 'bn' ? row.grade.bn : row.grade.en) + '</b></td>');
      parts.push('</tr>');
    });

    /* Total row — bold top line via CSS, total printed below */
    parts.push('<tr class="total-row">');
    parts.push('<td colspan="2" class="total-label">TOTAL</td>');
    parts.push('<td class="total-value">' + esc(num(r.totalFull)) + '</td>');
    parts.push('<td class="total-value">' + esc(num(r.totalObtained)) + '</td>');
    parts.push('<td class="total-value"><small>' + esc(lang === 'bn' ? r.overallGrade.bn : r.overallGrade.en) + '</small></td>');
    parts.push('</tr>');

    parts.push('</tbody></table>');

    /* ---- Summary strip ---- */
    parts.push('<div class="pc-summary">');
    parts.push('<div class="item"><label>GPA</label><p>' + esc(r.overallGpa.toFixed(2)) + '</p></div>');
    parts.push('<div class="item"><label>' + (lang === 'bn' ? 'শতকরা' : 'Percentage') + '</label><p>' + esc(num(r.overallPct)) + '<small>%</small></p></div>');
    parts.push('<div class="item ' + (r.passed ? 'pass' : 'fail') + '"><label>' + (lang === 'bn' ? 'ফলাফল' : 'Result') + '</label><p>' + (r.passed ? (lang === 'bn' ? 'উত্তীর্ণ' : 'Passed') : (lang === 'bn' ? 'অকৃতকার্য' : 'Failed')) + '</p></div>');
    parts.push('<div class="item"><label>' + (lang === 'bn' ? 'মোট নম্বর' : 'Total Marks') + '</label><p>' + esc(num(r.totalObtained)) + '<small>/' + esc(num(r.totalFull)) + '</small></p></div>');
    parts.push('</div>');

    /* ---- Best wishes ---- */
    var wish = (lang === 'bn')
      ? '<strong>শুভেচ্ছা ও ভালোবাসা!</strong> তোমার পরিশ্রম সফল হোক। ভবিষ্যতে আরও ভালো ফল করে দেশ ও সমাজের জন্য গর্বের হয়ে ওঠো। এই অগ্রযাত্রা অব্যাহত থাকুক।'
      : '<strong>Best wishes and warm regards!</strong> May your hard work continue to bring success. We hope you achieve even greater results in the future and make your family, school and country proud.';
    parts.push('<div class="pc-wishes">' + wish + '</div>');

    /* ---- Signature ---- */
    var headmasterName = 'Tarun Kanti Biswas';
    if (window.TEACHERS) {
      var hi;
      for (hi = 0; hi < window.TEACHERS.length; hi++) {
        if (window.TEACHERS[hi].desig && window.TEACHERS[hi].desig.en === 'Headmaster') {
          headmasterName = window.TEACHERS[hi].name;
          break;
        }
      }
    }
    parts.push('<div class="pc-sign">');
    parts.push('<div class="block">' + (lang === 'bn' ? 'প্রধান শিক্ষকের স্বাক্ষর' : 'Headmaster Signature') + '</div>');
    parts.push('</div>');

    parts.push('</div>'); /* end .pc-card */

    /* Tip */
    parts.push('<p class="pc-tip">');
    parts.push('<strong>' + (lang === 'bn' ? 'টিপস: ' : 'Tip: ') + '</strong>');
    parts.push(lang === 'bn'
      ? 'প্রিন্ট / PDF বাটনে ক্লিক করে প্রিন্ট উইন্ডো থেকে "Save as PDF" বেছে নিলে ফলাফলটি PDF হিসেবে সংরক্ষিত হবে।'
      : 'Click Print / PDF and choose "Save as PDF" in the print dialog to save the result as a PDF.');
    parts.push('</p>');

    parts.push('</div>'); /* end .pc-screen-wrap */

    resultArea.innerHTML = parts.join('');

    var pBtn = document.getElementById('printResult');
    if (pBtn) pBtn.addEventListener('click', function () { window.print(); });

    var nBtn = document.getElementById('newSearch');
    if (nBtn) nBtn.addEventListener('click', function () {
      clearResult();
      if (searchIdInput) searchIdInput.value = '';
      searchRoll.value = '';
      if (searchIdInput) searchIdInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    setTimeout(function () {
      var y = resultArea.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 60);
  }

  /* ---------------- Error state ---------------- */
  function showError(titleBn, titleEn, msgBn, msgEn) {
    var lang = L();
    var parts = [];
    parts.push('<div class="rl-error">');
    parts.push('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">');
    parts.push('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>');
    parts.push('<h3>' + esc(lang === 'bn' ? titleBn : titleEn) + '</h3>');
    parts.push('<p>' + esc(lang === 'bn' ? msgBn : msgEn) + '</p>');
    parts.push('</div>');
    resultArea.innerHTML = parts.join('');
  }

  /* ---------------- Events ---------------- */
  searchBtn.addEventListener('click', search);

  if (searchIdInput) {
    searchIdInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') search();
    });
  }
  searchRoll.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') search();
  });

  searchClass.addEventListener('change', function () {
    currentClass = searchClass.value;
    if (currentExam === 'pretest' && currentClass !== '10') currentExam = 'half';
    clearResult();
    renderExamTabs();
    renderClassTabs();
    updateGroupField();
  });

  searchGroup.addEventListener('change', clearResult);

  window.addEventListener('kbuhs:lang', function () {
    var prevClass = searchClass.value;
    var prevGroup = searchGroup.value;

    renderExamTabs();
    renderClassTabs();
    renderClassOptions();
    updateGroupField();

    if (prevClass) searchClass.value = prevClass;
    updateGroupField();
    if (prevGroup) searchGroup.value = prevGroup;

    if (lastResult) {
      lastResult.examKey = currentExam;
      renderResult(lastResult);
    }
  });

  /* ---------------- Boot ---------------- */
  renderExamTabs();
  renderClassTabs();
  renderClassOptions();
  updateGroupField();
})();