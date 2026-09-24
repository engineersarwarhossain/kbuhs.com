/* ============================================================
   assets/admit-card.js
   Renders an admit card for a student found in students-data.js
   Requires: site-config.js, students-data.js, site.js
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Exam types ---------- */
  var EXAMS = [
    { key:'half',    bn:'অর্ধ-বার্ষিক',        en:'Half-Yearly',   year:2026 },
    { key:'annual',  bn:'বার্ষিক',              en:'Annual',        year:2026 },
    { key:'test',    bn:'টেস্ট পরীক্ষা',        en:'Test Exam',     year:2026 },
    { key:'pretest', bn:'এসএসসি প্রি-টেস্ট', en:'SSC Pre Test',   year:2026 }
  ];

  var CLASSES = ['6','7','8','9','10'];

  /* ---------- Subjects per class (generic fallback) ---------- */
  var SUBJECTS_BY_CLASS = {
    '6': [
      { code:'101', bn:'বাংলা',                 en:'Bangla' },
      { code:'102', bn:'ইংরেজি',                en:'English' },
      { code:'107', bn:'গণিত',                  en:'Mathematics' },
      { code:'108', bn:'বিজ্ঞান',                en:'Science' },
      { code:'109', bn:'সমাজবিজ্ঞান',            en:'Social Science' },
      { code:'111', bn:'ইসলাম শিক্ষা',           en:'Islamic Studies' },
      { code:'134', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT' }
    ],
    '7': [
      { code:'101', bn:'বাংলা',                 en:'Bangla' },
      { code:'102', bn:'ইংরেজি',                en:'English' },
      { code:'107', bn:'গণিত',                  en:'Mathematics' },
      { code:'108', bn:'বিজ্ঞান',                en:'Science' },
      { code:'109', bn:'সমাজবিজ্ঞান',            en:'Social Science' },
      { code:'111', bn:'ইসলাম শিক্ষা',           en:'Islamic Studies' },
      { code:'134', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT' }
    ],
    '8': [
      { code:'101', bn:'বাংলা',                 en:'Bangla' },
      { code:'102', bn:'ইংরেজি',                en:'English' },
      { code:'107', bn:'গণিত',                  en:'Mathematics' },
      { code:'108', bn:'বিজ্ঞান',                en:'Science' },
      { code:'109', bn:'সমাজবিজ্ঞান',            en:'Social Science' },
      { code:'111', bn:'ইসলাম শিক্ষা',           en:'Islamic Studies' },
      { code:'134', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT' }
    ],
    '9': [
      { code:'101', bn:'বাংলা',                 en:'Bangla' },
      { code:'102', bn:'ইংরেজি',                en:'English' },
      { code:'107', bn:'গণিত',                  en:'Mathematics' },
      { code:'136', bn:'পদার্থবিজ্ঞান',           en:'Physics' },
      { code:'137', bn:'রসায়ন',                  en:'Chemistry' },
      { code:'138', bn:'জীববিজ্ঞান',              en:'Biology' },
      { code:'134', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT' },
      { code:'109', bn:'সমাজবিজ্ঞান',            en:'Social Science' },

    ],
    '10': [
      { code:'107', bn:'ইংরেজি প্রথম পত্র',       en:'English 1st Paper' },
      { code:'108', bn:'ইংরেজি দ্বিতীয় পত্র',      en:'English 2nd Paper' },
      { code:'101', bn:'বাংলা প্রথম পত্র',         en:'Bangla 1st Paper' },
      { code:'102', bn:'বাংলা দ্বিতীয় পত্র',       en:'Bangla 2nd Paper' },
      { code:'111', bn:'ইসলাম শিক্ষা',           en:'Islamic Studies' },
      { code:'112', bn:'হিন্দুধর্ম ও নৈতিক শিক্ষা', en:'Hindu Religion & Moral' },
      { code:'150', bn:'বাংলাদেশ ও বিশ্বপরিচয়',   en:'Bangladesh & Global' },
      { code:'109', bn:'গণিত',                  en:'Mathematics' },
      { code:'138', bn:'জীববিজ্ঞান',              en:'Biology' },
      { code:'134', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT' },
      { code:'136', bn:'পদার্থবিজ্ঞান',           en:'Physics' },
      { code:'137', bn:'রসায়ন',                  en:'Chemistry' },
      { code:'126', bn:'উচ্চতর গণিত',             en:'Higher Mathematics' }
    ]
  };

  /* ---------- Generic start dates per exam ---------- */
  var EXAM_START = {
    half:    { day:20, month:1,  year:2026 },
    annual:  { day:10, month:12, year:2026 },
    test:    { day:15, month:11, year:2026 },
    pretest: { day:1,  month:7,  year:2026 }
  };

  /* ============================================================
     FULL OVERRIDES — exact routines for specific exam+class
     Key format: "<examKey>:<classKey>"
     ============================================================ */
  var EXAM_OVERRIDE = {

    /* -------- SSC Pre-Test — Class 10 only -------- */
    'pretest:10': {
      startDate: { day:1,  month:7, year:2026 },
      issueDate: { day:19, month:6, year:2026 },
      rows: [
        { day:1,  month:7, year:2026, code:'107', bn:'ইংরেজি প্রথম পত্র',       en:'English 1st Paper',        startTime:'10:00', endTime:'01:00' },
        { day:2,  month:7, year:2026, code:'108', bn:'ইংরেজি দ্বিতীয় পত্র',      en:'English 2nd Paper',        startTime:'10:00', endTime:'01:00' },
        { day:3,  month:7, year:2026, code:'101', bn:'বাংলা প্রথম পত্র',         en:'Bangla 1st Paper',         startTime:'10:00', endTime:'01:00' },
        { day:4,  month:7, year:2026, code:'102', bn:'বাংলা দ্বিতীয় পত্র',       en:'Bangla 2nd Paper',         startTime:'10:00', endTime:'01:00' },
        { day:5,  month:7, year:2026, code:'112', bn:'হিন্দুধর্ম ও নৈতিক শিক্ষা', en:'Hindu Religion & Moral',   startTime:'10:00', endTime:'01:00' },
        { day:6,  month:7, year:2026, code:'150', bn:'বাংলাদেশ ও বিশ্বপরিচয়',   en:'Bangladesh & Global',      startTime:'10:00', endTime:'01:00' },
        { day:7,  month:7, year:2026, code:'109', bn:'গণিত',                  en:'Mathematics',              startTime:'10:00', endTime:'01:00' },
        { day:8,  month:7, year:2026, code:'138', bn:'জীববিজ্ঞান',              en:'Biology',                  startTime:'10:00', endTime:'01:00' },
        { day:9,  month:7, year:2026, code:'134', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT',                      startTime:'10:00', endTime:'01:00' },
        { day:10, month:7, year:2026, code:'136', bn:'পদার্থবিজ্ঞান',           en:'Physics',                  startTime:'10:00', endTime:'01:00' },
        { day:11, month:7, year:2026, code:'137', bn:'রসায়ন',                  en:'Chemistry',                startTime:'10:00', endTime:'01:00' },
        { day:12, month:7, year:2026, code:'126', bn:'উচ্চতর গণিত',             en:'Higher Mathematics',       startTime:'10:00', endTime:'01:00' }
      ]
    }
  };

  /* ---------- Bengali month abbreviations ---------- */
  var MONTH_BN = ['জানু','ফেব','মার্চ','এপ্রি','মে','জুন','জুলা','আগ','সেপ','অক্টো','নভে','ডিসে'];

  /* ---------- DOM refs ---------- */
  var searchClass = document.getElementById('searchClass');
  var searchExam  = document.getElementById('searchExam');
  var searchRoll  = document.getElementById('searchRoll');
  var searchBtn   = document.getElementById('searchBtn');
  var area        = document.getElementById('admitCardArea');
  if (!searchClass || !searchExam || !searchBtn || !area) return;

  /* ---------- Helpers ---------- */
  function esc(s) { return window.KBUHS.esc(s); }
  function L()    { return window.KBUHS.getLang(); }
  function bnNum(n){ return window.KBUHS.bnNum(n); }
  function classLabel(c, l) { return window.KBUHS.classLabel(c, l || L()); }

  function examLabel(key, l) {
    var i;
    for (i = 0; i < EXAMS.length; i++) {
      if (EXAMS[i].key === key) return (l || L()) === 'bn' ? EXAMS[i].bn : EXAMS[i].en;
    }
    return key;
  }

  function pad2(n) { return (n < 10 ? '0' + n : '' + n); }

  function formatDateEn(d) { return pad2(d.day) + '/' + pad2(d.month) + '/' + d.year; }
  function formatDateBn(d) { return bnNum(d.day) + '/' + bnNum(d.month) + '/' + bnNum(d.year); }

  function monthNameBn(m) { return MONTH_BN[m - 1] || ''; }

  /* Add N days to a {day, month, year} and return a new object */
  function addDays(d, n) {
    var dt = new Date(d.year, d.month - 1, d.day + n);
    return { day: dt.getDate(), month: dt.getMonth() + 1, year: dt.getFullYear() };
  }

  /* Is SSC Pre-Test available only for Class 10? */
  function examAvailable(examKey, cls) {
    if (examKey === 'pretest') return cls === '10';
    return true;
  }

  /* ---------- Populate search dropdowns ---------- */
  function renderSearchSelects() {
    var lang = L();
    var i;

    var clsHtml = [];
    for (i = 0; i < CLASSES.length; i++) {
      var c = CLASSES[i];
      var sel = (c === '6') ? ' selected' : '';
      clsHtml.push('<option value="' + c + '"' + sel + '>' + esc(classLabel(c, lang)) + '</option>');
    }
    searchClass.innerHTML = clsHtml.join('');
    refreshExamOptions();
  }

  function refreshExamOptions() {
    var lang = L();
    var cls = searchClass.value;
    var prev = searchExam.value || 'pretest';
    var html = [];
    var i;

    for (i = 0; i < EXAMS.length; i++) {
      var e = EXAMS[i];
      if (!examAvailable(e.key, cls)) continue;
      var sel = (e.key === prev) ? ' selected' : '';
      html.push('<option value="' + e.key + '"' + sel + '>' + esc(lang === 'bn' ? e.bn : e.en) + '</option>');
    }

    /* If previous selection no longer available, default to first */
    if (html.length === 0) {
      html.push('<option value="half">' + esc(lang === 'bn' ? 'অর্ধ-বার্ষিক' : 'Half-Yearly') + '</option>');
    } else if (prev === 'pretest' && cls !== '10') {
      /* Auto-switch away from pretest when leaving Class 10 */
      html = [];
      for (i = 0; i < EXAMS.length; i++) {
        var e2 = EXAMS[i];
        if (e2.key === 'pretest') continue;
        var sel2 = (e2.key === 'half') ? ' selected' : '';
        html.push('<option value="' + e2.key + '"' + sel2 + '>' + esc(lang === 'bn' ? e2.bn : e2.en) + '</option>');
      }
    }

    searchExam.innerHTML = html.join('');
  }

  /* ---------- Deterministic hash ---------- */
  function hash(str) {
    var h = 0, i;
    for (i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  /* ---------- Build the routine rows for a given exam + class ---------- */
  function buildRoutineRows(examKey, cls, lang) {
    var overrideKey = examKey + ':' + cls;
    var override = EXAM_OVERRIDE[overrideKey];
    var rows = [];
    var i;

    if (override && override.rows) {
      /* Exact override */
      for (i = 0; i < override.rows.length; i++) {
        var o = override.rows[i];
        rows.push({
          day: o.day,
          month: o.month,
          year: o.year,
          code: o.code,
          nameBn: o.bn,
          nameEn: o.en,
          startTime: o.startTime,
          endTime: o.endTime
        });
      }
      return rows;
    }

    /* Fallback: generic sequential dates */
    var subjects = SUBJECTS_BY_CLASS[cls] || SUBJECTS_BY_CLASS['6'];
    var start = EXAM_START[examKey] || EXAM_START.half;
    for (i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      var d = addDays(start, i);
      rows.push({
        day: d.day,
        month: d.month,
        year: d.year,
        code: s.code,
        nameBn: s.bn,
        nameEn: s.en,
        startTime: '10:00',
        endTime: '01:00'
      });
    }
    return rows;
  }

  /* ---------- Resolve start/issue date for a given exam+class ---------- */
  function resolveDates(examKey, cls) {
    var overrideKey = examKey + ':' + cls;
    var override = EXAM_OVERRIDE[overrideKey];
    var start, issue;

    if (override && override.startDate) {
      start = override.startDate;
    } else {
      start = EXAM_START[examKey] || EXAM_START.half;
    }

    if (override && override.issueDate) {
      issue = override.issueDate;
    } else {
      issue = addDays(start, -12);
    }

    return { start: start, issue: issue };
  }

  /* ---------- Headline ---------- */
  function examHeadline(examKey, exam, lang) {
    if (examKey === 'pretest') {
      return 'SSC PRE TEST Examination ' + exam.year;
    }
    return exam.en + ' Examination ' + exam.year;
  }

  /* ============================================================
     BUILD THE ADMIT CARD
     ============================================================ */
  function buildCard(student, cls, section, examKey) {
    var lang = L();
    var S = window.SITE || {};
    var exam = null, i;
    for (i = 0; i < EXAMS.length; i++) if (EXAMS[i].key === examKey) exam = EXAMS[i];
    if (!exam) exam = EXAMS[0];

    var name    = student.name   || '—';
    var father  = student.father || '—';
    var mother  = student.mother || '—';
    var dob     = student.dob    || '—';
    var gender  = student.gender || '—';
    var religion= student.religion || '—';

    var genderBn   = gender === 'Male'   ? 'ছেলে' : (gender === 'Female' ? 'মেয়ে' : gender);
    var religionBn = religion === 'Islam' ? 'ইসলাম' : (religion === 'Hindu' ? 'হিন্দু' : religion);

    var group = (cls === '9' || cls === '10') ? 'Science' : 'General';

    var dates = resolveDates(examKey, cls);
    var startDisp = (lang === 'bn') ? formatDateBn(dates.start) : formatDateEn(dates.start);
    var issueDisp = (lang === 'bn') ? formatDateBn(dates.issue) : formatDateEn(dates.issue);

    var rows = buildRoutineRows(examKey, cls, lang);
    var photo = 'images/students/' + student.id + '.jpg';

    /* ---------- Routine table rows ---------- */
    var routineHtml = [];
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      var dateDisp = (lang === 'bn')
        ? formatDateBn({ day: r.day, month: r.month, year: r.year })
        : formatDateEn({ day: r.day, month: r.month, year: r.year });
      var subjName = (lang === 'bn') ? r.nameBn : r.nameEn;
      var sl = (lang === 'bn') ? bnNum(i + 1) : String(i + 1);

      var tr = [];
      tr.push('<tr>');
      tr.push('  <td class="sl">' + sl + '</td>');
      tr.push('  <td class="date">' + esc(dateDisp) + '</td>');
      tr.push('  <td class="time">' + esc(r.startTime) + '</td>');
      tr.push('  <td class="time">' + esc(r.endTime) + '</td>');
      tr.push('  <td class="code">' + esc(r.code) + '</td>');
      tr.push('  <td class="subj-name">' + esc(subjName) + '</td>');
      tr.push('</tr>');
      routineHtml.push(tr.join('\n'));
    }

    var headline = examHeadline(examKey, exam, lang);

    /* ---------- Card HTML ---------- */
    var h = [];
    h.push('<div class="ac-wrap show" id="admitCardWrap">');

    h.push('  <div class="ac-actions">');
    h.push('    <button type="button" class="btn btn-primary" id="printAdmit">');
    h.push('      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">');
    h.push('        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>');
    h.push('        <rect x="6" y="14" width="12" height="8"/>');
    h.push('      </svg>');
    h.push('      <span>' + (lang === 'bn' ? 'প্রিন্ট / PDF' : 'Print / PDF') + '</span>');
    h.push('    </button>');
    h.push('    <button type="button" class="btn btn-ghost" id="resetAdmit">');
    h.push('      <span>' + (lang === 'bn' ? 'নতুন অনুসন্ধান' : 'New Search') + '</span>');
    h.push('    </button>');
    h.push('  </div>');

    h.push('  <div class="ac-card" id="admitCard">');

    /* Header */
    h.push('    <div class="ac-head">');
    h.push('      <div class="ac-logo"><img src="images/logo.png" alt=""></div>');
    h.push('      <div class="ac-head-text">');
    h.push('        <h1>' + esc(S.nameEn || 'Kola Bazar United High School') + '</h1>');
    h.push('        <p>' + esc((S.addrEn || '').toUpperCase()) + '</p>');
    h.push('        <p class="eiin">EIIN : ' + esc(S.eiinEn || '') + '</p>');
    h.push('        <p class="web">Web : www.kbuhs61.edu.bd</p>');
    h.push('      </div>');
    h.push('    </div>');

    /* Title */
    h.push('    <div class="ac-title">');
    h.push('      <h2>Admit Card</h2>');
    h.push('      <span class="exam-name">' + esc(headline) + '</span>');
    h.push('    </div>');

    /* Body */
    h.push('    <div class="ac-body">');
    h.push('      <div class="ac-info">');
    h.push('        <div class="row"><span class="lbl">Name</span><span class="colon">:</span><span class="val">' + esc(name) + '</span></div>');
    h.push('        <div class="row"><span class="lbl">Father</span><span class="colon">:</span><span class="val">' + esc(father) + '</span></div>');
    h.push('        <div class="row"><span class="lbl">Mother</span><span class="colon">:</span><span class="val">' + esc(mother) + '</span></div>');
    h.push('        <div class="row"><span class="lbl">Birth Date</span><span class="colon">:</span><span class="val">' + esc(dob) + '</span></div>');
    h.push('        <div class="row"><span class="lbl">Gender</span><span class="colon">:</span><span class="val">' + esc(lang === 'bn' ? genderBn : gender) + '</span></div>');
    h.push('        <div class="row"><span class="lbl">Religion</span><span class="colon">:</span><span class="val">' + esc(lang === 'bn' ? religionBn : religion) + '</span></div>');
    h.push('      </div>');
    h.push('      <div class="ac-photo">');
    h.push('        <img src="' + esc(photo) + '" alt="" onerror="this.remove()">');
    h.push('        <span>Photo</span>');
    h.push('      </div>');
    h.push('    </div>');

    /* IDs strip */
    h.push('    <div class="ac-ids">');
    h.push('      <div class="row"><span class="lbl">Student ID</span><span class="colon">:</span><span class="val">' + esc(student.id) + '</span></div>');
    h.push('      <div class="row"><span class="lbl">Roll No</span><span class="colon">:</span><span class="val">' + esc(lang === 'bn' ? bnNum(student.roll) : student.roll) + '</span></div>');
    h.push('      <div class="row"><span class="lbl">Class</span><span class="colon">:</span><span class="val">' + esc(classLabel(cls, 'en')) + '</span></div>');
    h.push('      <div class="row"><span class="lbl">Section</span><span class="colon">:</span><span class="val">' + esc(section) + '</span></div>');
    h.push('      <div class="row"><span class="lbl">Group</span><span class="colon">:</span><span class="val">' + esc(group) + '</span></div>');
    h.push('      <div class="row"><span class="lbl">Exam Start Date</span><span class="colon">:</span><span class="val">' + esc(startDisp) + '</span></div>');
    h.push('    </div>');

    /* Routine table */
    h.push('    <div class="ac-routine-title">Examination Routine</div>');
    h.push('    <table class="ac-table">');
    h.push('      <thead>');
    h.push('        <tr>');
    h.push('          <th class="c">SL.</th>');
    h.push('          <th>Date</th>');
    h.push('          <th class="c">Start Time</th>');
    h.push('          <th class="c">End Time</th>');
    h.push('          <th class="c">Subject Code</th>');
    h.push('          <th>Subject Name</th>');
    h.push('        </tr>');
    h.push('      </thead>');
    h.push('      <tbody>');
    h.push(routineHtml.join(''));
    h.push('      </tbody>');
    h.push('    </table>');

    /* Issue date */
    h.push('    <div class="ac-issue"><strong>Issue Date :</strong> ' + esc(issueDisp) + '</div>');

    /* Instructions */
    h.push('    <div class="ac-inst">');
    h.push('      <strong>নির্দেশনাবলী:</strong>');
    h.push('      <ol>');
    h.push('        <li>পরীক্ষা শুরুর ৩০ মিনিট পূর্বে পরীক্ষা কেন্দ্রে উপস্থিত থাকতে হবে। পরীক্ষা আরম্ভ হওয়ার ১৫ মিনিট পরে কেন্দ্রে প্রবেশ করা যাবে না।</li>');
    h.push('        <li>প্রবেশপত্র ছাড়া পরীক্ষায় অংশগ্রহণ করা যাবে না।</li>');
    h.push('        <li>পরীক্ষার্থীকে পরীক্ষার কক্ষে যেকোনো ধরনের বই, নোট, পেনড্রাইভ, মোবাইল ফোন, স্মার্ট ওয়াচ, ইলেকট্রনিক ডিভাইস বা যোগাযোগ যন্ত্র সাথে আনা সম্পূর্ণ নিষিদ্ধ।</li>');
    h.push('        <li>সকল প্রশ্নের উত্তর অবশ্যই পরীক্ষার্থীর নিজ হাতে লিখতে হবে। অন্যথায় পরীক্ষা বাতিল করা হবে।</li>');
    h.push('        <li>প্রবেশপত্রে উল্লেখিত বিষয় ছাড়া অন্য কোনো বিষয়ে পরীক্ষা দেওয়া যাবে না।</li>');
    h.push('        <li>পরীক্ষা চলাকালীন জরুরি প্রয়োজনে পরীক্ষা কেন্দ্রে যোগাযোগ করতে হবে।</li>');
    h.push('      </ol>');
    h.push('    </div>');

    /* Signature */
    h.push('    <div class="ac-sign">');
    h.push('      <div class="block">Headmaster Signature</div>');
    h.push('    </div>');

    h.push('  </div>');

    /* Tip */
    h.push('  <p class="ac-notice">');
    h.push('    <strong>' + (lang === 'bn' ? 'টিপস: ' : 'Tip: ') + '</strong>');
    h.push('    ' + (lang === 'bn'
      ? 'প্রিন্ট / PDF বাটনে ক্লিক করে প্রিন্ট উইন্ডো থেকে "Save as PDF" বেছে নিলে প্রবেশপত্রটি PDF হিসেবে সংরক্ষিত হবে।'
      : 'Click Print / PDF and choose "Save as PDF" in the print dialog to save it as a PDF file.'));
    h.push('  </p>');

    h.push('</div>');

    return h.join('\n');
  }

  /* ============================================================
     SEARCH
     ============================================================ */
  function clearResult() { area.innerHTML = ''; }

  function search() {
    var cls = searchClass.value;
    var examKey = searchExam.value;
    var roll = (searchRoll.value || '').trim();

    if (!roll) {
      showError('রোল নম্বর লিখুন', 'Please enter a roll number',
                'শিক্ষার্থীর রোল নম্বর ইনপুট করুন।', "Enter the student's roll number.");
      return;
    }

    var found = null;
    var sections = Object.keys(window.STUDENTS_DATA[cls] || {});
    sections.forEach(function (sec) {
      var list = (window.STUDENTS_DATA[cls] || {})[sec] || [];
      list.forEach(function (s) {
        if (!found && String(s.roll) === String(roll)) {
          found = { student: s, section: sec };
        }
      });
    });

    if (!found) {
      var msgBn, msgEn;
      if (cls === '6') {
        msgBn = '৬ষ্ঠ শ্রেণিতে এই রোল নম্বরে কোনো শিক্ষার্থী নেই। (ডেমো ডেটা: রোল 1–55)';
        msgEn = 'No student with this roll number in Class VI. (Demo data: roll 1–55)';
      } else if (cls === '10') {
        msgBn = '১০ম শ্রেণির ডেটা এখনো যুক্ত হয়নি।';
        msgEn = 'Class X data has not been added yet.';
      } else {
        msgBn = 'এই শ্রেণির ডেটা এখনো যুক্ত হয়নি।';
        msgEn = 'Data for this class has not been added yet.';
      }
      showError('শিক্ষার্থী পাওয়া যায়নি', 'Student not found', msgBn, msgEn);
      return;
    }

    area.innerHTML = buildCard(found.student, cls, found.section, examKey);

    var printBtn = document.getElementById('printAdmit');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    var resetBtn = document.getElementById('resetAdmit');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      clearResult();
      searchRoll.value = '';
      searchRoll.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    setTimeout(function () {
      var y = area.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 60);
  }

  function showError(titleBn, titleEn, msgBn, msgEn) {
    var lang = L();
    var h = [];
    h.push('<div class="rl-error">');
    h.push('  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">');
    h.push('    <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>');
    h.push('  </svg>');
    h.push('  <h3>' + esc(lang === 'bn' ? titleBn : titleEn) + '</h3>');
    h.push('  <p>' + esc(lang === 'bn' ? msgBn : msgEn) + '</p>');
    h.push('</div>');
    area.innerHTML = h.join('\n');
  }

  /* ============================================================
     EVENTS
     ============================================================ */
  searchBtn.addEventListener('click', search);
  searchRoll.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') search();
  });
  searchClass.addEventListener('change', function () {
    refreshExamOptions();
    clearResult();
  });
  searchExam.addEventListener('change', clearResult);

  window.addEventListener('kbuhs:lang', function () {
    var prevClass = searchClass.value;
    var prevExam = searchExam.value;
    renderSearchSelects();
    if (prevClass) searchClass.value = prevClass;
    if (prevExam) {
      searchExam.value = prevExam;
      if (!searchExam.value) searchExam.value = 'half';
    }
    if (area.innerHTML.trim() && searchRoll.value.trim()) search();
  });

  /* ============================================================
     GO
     ============================================================ */
  renderSearchSelects();
})();