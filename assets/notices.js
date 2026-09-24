/* ============================================================
   assets/notices.js — Notices page logic
   Requires: site-config.js, site.js
   ============================================================ */
(function () {
  'use strict';

  var PER_PAGE = 5;

  var CATEGORIES = [
    { key: 'all',       bn: 'সকল',    en: 'All' },
    { key: 'admission', bn: 'ভর্তি',    en: 'Admission' },
    { key: 'exam',      bn: 'পরীক্ষা',  en: 'Exam' },
    { key: 'result',    bn: 'ফলাফল',   en: 'Result' },
    { key: 'sports',    bn: 'ক্রীড়া',   en: 'Sports' },
    { key: 'event',     bn: 'ইভেন্ট',   en: 'Event' },
    { key: 'meeting',   bn: 'সভা',     en: 'Meeting' }
  ];

  var NOTICES = [
    { day:12, monthBn:'জানু', monthEn:'Jan', year:2027, cat:'admission',
      title:{ bn:'২০২৭ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি প্রকাশিত হয়েছে', en:'Admission notice for the 2027 academic session published' },
      excerpt:{ bn:'৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির জন্য অনলাইন আবেদন শুরু হয়েছে। আবেদনের শেষ তারিখ ২৮ ফেব্রুয়ারি, ২০২৭।', en:'Online applications are open for admission to Class VI – IX. Last date is 28 February, 2027.' } },
    { day:10, monthBn:'জানু', monthEn:'Jan', year:2027, cat:'exam',
      title:{ bn:'অর্ধ-বার্ষিক পরীক্ষার সময়সূচি প্রকাশ', en:'Half-yearly examination schedule published' },
      excerpt:{ bn:'সকল শ্রেণির জন্য অর্ধ-বার্ষিক পরীক্ষার পূর্ণাঙ্গ রুটিন প্রকাশিত হয়েছে। পরীক্ষা শুরু ২০ জানুয়ারি।', en:'The complete half-yearly exam routine has been published for all classes. Exams begin on 20 January.' } },
    { day:8, monthBn:'জানু', monthEn:'Jan', year:2027, cat:'result',
      title:{ bn:'বার্ষিক পরীক্ষার ফলাফল অনলাইনে প্রকাশিত', en:'Annual examination results published online' },
      excerpt:{ bn:'শিক্ষার্থীরা রোল নম্বর দিয়ে অনলাইনে নিজের ফলাফল দেখতে পারবে।', en:'Students can view their results online by entering their roll number.' } },
    { day:5, monthBn:'জানু', monthEn:'Jan', year:2027, cat:'sports',
      title:{ bn:'বার্ষিক ক্রীড়া প্রতিযোগিতা ১৫ ফেব্রুয়ারি অনুষ্ঠিত হবে', en:'Annual sports competition to be held on 15 February' },
      excerpt:{ bn:'সকল শ্রেণির শিক্ষার্থীদের অংশগ্রহণের জন্য আহ্বান জানানো হচ্ছে। রেজিস্ট্রেশন চলছে।', en:'All students are invited to participate. Registration is now open.' } },
    { day:2, monthBn:'জানু', monthEn:'Jan', year:2027, cat:'meeting',
      title:{ bn:'অভিভাবক সমাবেশ — ২০ জানুয়ারি, সকাল ১০টা', en:'Guardian meeting — 20 January, 10:00 AM' },
      excerpt:{ bn:'শিক্ষার্থীদের একাডেমিক অগ্রগতি আলোচনার জন্য সব অভিভাবককে আমন্ত্রণ জানানো হচ্ছে।', en:'All guardians are invited to discuss their child\u2019s academic progress.' } },
    { day:28, monthBn:'ডিসে', monthEn:'Dec', year:2026, cat:'event',
      title:{ bn:'আন্তঃস্কুল বিজ্ঞান মেলায় আমাদের দল চ্যাম্পিয়ন', en:'Our team won the inter-school science fair' },
      excerpt:{ bn:'জেলা পর্যায়ে আয়োজিত বিজ্ঞান মেলায় আমাদের শিক্ষার্থীরা প্রথম স্থান অর্জন করেছে।', en:'Our students won first place at the district-level science fair.' } },
    { day:22, monthBn:'ডিসে', monthEn:'Dec', year:2026, cat:'result',
      title:{ bn:'শ্রেণি উত্তীর্ণের ফলাফল প্রকাশ', en:'Class promotion results published' },
      excerpt:{ bn:'সকল শ্রেণির বার্ষিক পরীক্ষার ফলাফল প্রকাশিত হয়েছে। নোটিশ বোর্ডে তালিকা টানানো হয়েছে।', en:'Annual exam results for all classes have been published. Lists are posted on the notice board.' } },
    { day:18, monthBn:'ডিসে', monthEn:'Dec', year:2026, cat:'event',
      title:{ bn:'পুরস্কার বিতরণী অনুষ্ঠান ২৫ ডিসেম্বর', en:'Prize-giving ceremony on 25 December' },
      excerpt:{ bn:'বার্ষিক পুরস্কার বিতরণী অনুষ্ঠান স্কুল মিলনায়তনে অনুষ্ঠিত হবে।', en:'The annual prize-giving ceremony will be held at the school auditorium.' } },
    { day:15, monthBn:'ডিসে', monthEn:'Dec', year:2026, cat:'meeting',
      title:{ bn:'পরিচালনা পর্ষদের মাসিক সভা', en:'Monthly Managing Committee meeting' },
      excerpt:{ bn:'বিদ্যালয়ের পরিচালনা পর্ষদের মাসিক সভা প্রধান শিক্ষকের অফিসে অনুষ্ঠিত হবে।', en:'The monthly meeting of the school\u2019s Managing Committee will be held at the Headmaster\u2019s office.' } },
    { day:8, monthBn:'ডিসে', monthEn:'Dec', year:2026, cat:'exam',
      title:{ bn:'টেস্ট পরীক্ষার রুটিন প্রকাশ', en:'Test exam routine published' },
      excerpt:{ bn:'১০ম শ্রেণির টেস্ট পরীক্ষার রুটিন প্রকাশিত হয়েছে। পরীক্ষা শুরু ১৫ ডিসেম্বর।', en:'The Class X test exam routine has been published. Exams start on 15 December.' } },
    { day:1, monthBn:'ডিসে', monthEn:'Dec', year:2026, cat:'admission',
      title:{ bn:'২০২৬ শিক্ষাবর্ষের চূড়ান্ত ভর্তি সম্পন্ন', en:'2026 session final enrollment completed' },
      excerpt:{ bn:'নির্বাচিত শিক্ষার্থীদের সবাই ভর্তি প্রক্রিয়া সম্পন্ন করেছে। নতুন শিক্ষাবর্ষ শুরু ১ জানুয়ারি।', en:'All selected students completed their enrollment. The new session begins on 1 January.' } },
    { day:20, monthBn:'নভে', monthEn:'Nov', year:2026, cat:'sports',
      title:{ bn:'আন্তঃশ্রেণি ফুটবল প্রতিযোগিতা', en:'Inter-class football tournament' },
      excerpt:{ bn:'৬ষ্ঠ থেকে ১০ম শ্রেণির মধ্যে ফুটবল প্রতিযোগিতা অনুষ্ঠিত হবে। দল গঠন শুরু হয়েছে।', en:'A football tournament will be held among Classes VI – X. Team formation has started.' } },
    { day:12, monthBn:'নভে', monthEn:'Nov', year:2026, cat:'event',
      title:{ bn:'শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস উদযাপন প্রস্তুতি', en:'Preparation for Language Martyrs\u2019 Day' },
      excerpt:{ bn:'ফেব্রুয়ারি মাসে শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস উদযাপনের প্রস্তুতি শুরু হয়েছে।', en:'Preparation has begun for observing Language Martyrs\u2019 Day in February.' } },
    { day:5, monthBn:'নভে', monthEn:'Nov', year:2026, cat:'exam',
      title:{ bn:'নির্বাচনী পরীক্ষার সময়সূচি', en:'Selection exam schedule' },
      excerpt:{ bn:'৯ম শ্রেণির নির্বাচনী পরীক্ষার রুটিন প্রকাশিত হয়েছে।', en:'The Class IX selection exam routine has been published.' } },
    { day:28, monthBn:'অক্টো', monthEn:'Oct', year:2026, cat:'event',
      title:{ bn:'বিজ্ঞান মেলা অনুষ্ঠিত', en:'Science fair held at school' },
      excerpt:{ bn:'বিদ্যালয়ে আয়োজিত বিজ্ঞান মেলায় শিক্ষার্থীরা বিভিন্ন প্রকল্প প্রদর্শন করেছে।', en:'Students displayed a variety of projects at the school science fair.' } }
  ];

  var currentCat = 'all';
  var currentPage = 1;
  var query = '';

  var catTabs = document.getElementById('catTabs');
  var searchInput = document.getElementById('searchInput');
  var list = document.getElementById('noticeList');
  var emptyState = document.getElementById('emptyState');
  var pagination = document.getElementById('pagination');
  var countEl = document.getElementById('resultCount');

  if (!catTabs || !list) return;

  function esc(s) { return window.KBUHS.esc(s); }
  function bnNum(n) { return window.KBUHS.bnNum(n); }
  function L() { return window.KBUHS.getLang(); }
  function num(n) { return L() === 'bn' ? bnNum(n) : String(n); }

  function catLabel(key, l) {
    var i;
    for (i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].key === key) return (l || L()) === 'bn' ? CATEGORIES[i].bn : CATEGORIES[i].en;
    }
    return key;
  }

  function monthIndex(n) {
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var i = m.indexOf(n.monthEn);
    return i === -1 ? 0 : i + 1;
  }

  function filtered() {
    var q = query.toLowerCase();
    return NOTICES.filter(function (n) {
      if (currentCat !== 'all' && n.cat !== currentCat) return false;
      if (q) {
        var hay = [n.title.bn, n.title.en, n.excerpt.bn, n.excerpt.en].join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function renderTabs() {
    var lang = L();
    var parts = [];
    CATEGORIES.forEach(function (c) {
      var active = c.key === currentCat ? ' active' : '';
      parts.push('<button type="button" class="class-tab' + active + '" data-cat="' + c.key + '" data-bn="' + c.bn + '" data-en="' + c.en + '">' + esc(lang === 'bn' ? c.bn : c.en) + '</button>');
    });
    catTabs.innerHTML = parts.join('');

    Array.prototype.forEach.call(catTabs.querySelectorAll('.class-tab'), function (b) {
      b.addEventListener('click', function () {
        currentCat = b.getAttribute('data-cat');
        currentPage = 1;
        render();
      });
    });
  }

  function renderList() {
    var lang = L();
    var rows = filtered();
    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * PER_PAGE;
    var slice = rows.slice(start, start + PER_PAGE);

    if (rows.length === 0) {
      list.innerHTML = '';
      list.style.display = 'none';
      emptyState.classList.add('show');
    } else {
      list.style.display = '';
      emptyState.classList.remove('show');
      var parts = [];
      slice.forEach(function (n) {
        var day = lang === 'bn' ? bnNum(n.day) : String(n.day);
        var monthYear = lang === 'bn' ? (n.monthBn + ' ' + bnNum(n.year)) : (n.monthEn + ' ' + n.year);
        var title = lang === 'bn' ? n.title.bn : n.title.en;
        var excerpt = lang === 'bn' ? n.excerpt.bn : n.excerpt.en;
        var badge = catLabel(n.cat, lang);
        var badgeGold = (n.cat === 'admission' || n.cat === 'sports') ? ' gold' : '';

        var html = '';
        html += '<article class="notice-page-item">';
        html +=   '<div class="date">';
        html +=     '<strong>' + esc(day) + '</strong>';
        html +=     '<span>' + esc(monthYear) + '</span>';
        html +=   '</div>';
        html +=   '<div>';
        html +=     '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:6px">';
        html +=       '<span class="notice-badge' + badgeGold + '">' + esc(badge) + '</span>';
        html +=     '</div>';
        html +=     '<h3>' + esc(title) + '</h3>';
        html +=     '<p>' + esc(excerpt) + '</p>';
        html +=   '</div>';
        html +=   '<a href="#" class="btn btn-ghost btn-sm">';
        html +=     (lang === 'bn' ? 'বিস্তারিত' : 'Read More');
        html +=   '</a>';
        html += '</article>';
        parts.push(html);
      });
      list.innerHTML = parts.join('');
    }

    if (countEl) {
      countEl.textContent = lang === 'bn'
        ? bnNum(rows.length) + ' টি নোটিশ'
        : rows.length + (rows.length === 1 ? ' notice' : ' notices');
    }

    var statTotal = document.getElementById('statTotal');
    var statLatest = document.getElementById('statLatest');
    var statCategories = document.getElementById('statCategories');

    if (statTotal) statTotal.textContent = num(NOTICES.length);

    if (statLatest) {
      var latest = NOTICES.reduce(function (a, b) {
        var ad = a.year * 10000 + monthIndex(a) * 100 + a.day;
        var bd = b.year * 10000 + monthIndex(b) * 100 + b.day;
        return bd > ad ? b : a;
      });
      statLatest.textContent = lang === 'bn'
        ? (bnNum(latest.day) + ' ' + latest.monthBn)
        : (latest.day + ' ' + latest.monthEn);
    }

    if (statCategories) statCategories.textContent = num(CATEGORIES.length - 1);

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!pagination) return;
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }
    var lang = L();
    var parts = [];

    parts.push('<button type="button" data-page="prev"' + (currentPage === 1 ? ' disabled' : '') + '>' + (lang === 'bn' ? 'আগের' : 'Prev') + '</button>');

    for (var i = 1; i <= totalPages; i++) {
      parts.push('<button type="button" data-page="' + i + '"' + (i === currentPage ? ' class="active"' : '') + '>' + num(i) + '</button>');
    }

    parts.push('<button type="button" data-page="next"' + (currentPage === totalPages ? ' disabled' : '') + '>' + (lang === 'bn' ? 'পরের' : 'Next') + '</button>');

    pagination.innerHTML = parts.join('');

    Array.prototype.forEach.call(pagination.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () {
        var p = b.getAttribute('data-page');
        if (p === 'prev') currentPage = Math.max(1, currentPage - 1);
        else if (p === 'next') currentPage = Math.min(totalPages, currentPage + 1);
        else currentPage = parseInt(p, 10) || 1;
        render();
        var top = list.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function render() {
    renderTabs();
    renderList();
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      query = searchInput.value || '';
      currentPage = 1;
      render();
    });
  }

  window.addEventListener('kbuhs:lang', render);

  render();
})();