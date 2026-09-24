/* ============================================================
   assets/site.js
   Shared runtime for every page.
   Requires: data/site-config.js (window.SITE)
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'kbuhs-lang';
  var lang = 'bn';

  /* ============================================================
     1. HELPERS (window.KBUHS)
     ============================================================ */
  window.KBUHS = {
    getLang: function () { return lang; },

    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
      });
    },

    initials: function (name) {
      var p = String(name || '').replace(/\./g, '').split(/\s+/).filter(Boolean);
      if (!p.length) return '?';
      if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
      return (p[0][0] + p[1][0]).toUpperCase();
    },

    bnNum: function (n) {
      return String(n == null ? '' : n).replace(/[0-9]/g, function (d) {
        return '০১২৩৪৫৬৭৮৯'[d];
      });
    },

    num: function (n) {
      return lang === 'bn' ? window.KBUHS.bnNum(n) : String(n);
    },

    classLabel: function (cls, forcedLang) {
      var L = forcedLang || lang;
      var map = {
        "6":  { bn:"৬ষ্ঠ",  en:"Class VI"   },
        "7":  { bn:"৭ম",    en:"Class VII"  },
        "8":  { bn:"৮ম",    en:"Class VIII" },
        "9":  { bn:"৯ম",    en:"Class IX"   },
        "10": { bn:"১০ম",   en:"Class X"    }
      };
      var m = map[String(cls)];
      return m ? m[L] : ('Class ' + cls);
    },

    sectionLabel: function (sec, forcedLang) {
      var L = forcedLang || lang;
      return (L === 'bn' ? 'শাখা ' : 'Section ') + sec;
    }
  };

  /* ============================================================
     2. NAV CONFIG  (with dropdowns)
     ------------------------------------------------------------
     Each item: { key, href, bn, en, children? }
     `children` is an optional array of the same shape (no nesting).
     ============================================================ */
  var NAV = [
    /*{
      key:'home', href:'index.html',
      bn:'হোম', en:'Home'
    },*/
    {
      key:'about', href:'about.html',
      bn:'আমাদের সম্পর্কে', en:'About',
      children:[
        { href:'about.html',      bn:'আমাদের সম্পর্কে',   en:'About Us' },
        { href:'facilities.html', bn:'সুবিধাসমূহ',      	  en:'Facilities' },
	{ href:'index.html#teachers',	  bn:'শিক্ষকবৃন্দ',      	 en:'Teachers'},
        { href:'gallery.html',    bn:'গ্যালারি',            en:'Gallery' },
        { href:'contact.html',    bn:'যোগাযোগ',      en:'Contact' },
      ]
    },
    {
      key:'academics', href:'academics.html',
      bn:'একাডেমিক', en:'Academics',
      children:[
        { href:'academics.html',    bn:'একাডেমিক',          en:'Academics' },
        { href:'syllabus.html',     bn:'সিলেবাস',            en:'Syllabus' },
        { href:'routine.html',      bn:'শ্রেণি রুটিন',        en:'Class Routine' },
        { href:'exam-routine.html', bn:'পরীক্ষার রুটিন',      en:'Exam Routine' },
        { href:'admit-card.html',   bn:'প্রবেশপত্র',          en:'Admit Card' },
        { href:'results.html',      bn:'পরীক্ষার ফলাফল',     en:'Results' },
        { href:'downloads.html',    bn:'ডাউনলোড',            en:'Downloads' }
      ]
    },
    {
      key:'notices', href:'index.html#notices',
      bn:'নোটিশ', en:'Notices'
    },

    {
      key:'students', href:'students.html',
      bn:'শিক্ষার্থীবৃন্দ', en:'Students',
      children:[
        { href:'students.html',    bn:'সকল শিক্ষার্থী',  en:'All Students' },
        { href:'students-6.html',  bn:'৬ষ্ঠ শ্রেণি',       en:'Class VI' },
        { href:'students-7.html',  bn:'৭ম শ্রেণি',         en:'Class VII' },
        { href:'students-8.html',  bn:'৮ম শ্রেণি',         en:'Class VIII' },
        { href:'students-9.html',  bn:'৯ম শ্রেণি',         en:'Class IX' },
        { href:'students-10.html', bn:'১০ম শ্রেণি',        en:'Class X' }
      ]
    },
    {
      key:'admission', href:'admission.html',
      bn:'ভর্তি', en:'Admission',
      children:[
        { href:'admission.html', bn:'ভর্তি তথ্য',      en:'Admission Info' },
        { href:'apply.html',     bn:'অনলাইন আবেদন',   en:'Apply Online' }
      ]
    },
   /* {
      key:'contact', href:'contact.html',
      bn:'যোগাযোগ', en:'Contact'
    } */
  ];

  /* ============================================================
     3. HEADER + FOOTER TEMPLATES
     ============================================================ */
  function headerHTML() {
    var S = window.SITE || {};
    var currentPage = document.body.getAttribute('data-page') || '';

    var navItems = NAV.map(function (n) {
      var hasKids = n.children && n.children.length;
      var isActive = (n.key === currentPage);
      var cls = 'nav-link' + (hasKids ? ' has-children' : '') + (isActive ? ' active' : '');
      var attrs = ' data-bn="' + n.bn + '" data-en="' + n.en + '">' + n.bn;

      var link = '<a class="' + cls + '" href="' + n.href + '"' + attrs + '</a>';

      if (!hasKids) {
        return '<div class="nav-item">' + link + '</div>';
      }

      var kids = n.children.map(function (k) {
        return '<a href="' + k.href + '" data-bn="' + k.bn + '" data-en="' + k.en + '">'
          + '<span>' + k.bn + '</span>'
          + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>'
          + '</a>';
      }).join('');

      return '<div class="nav-item has-children">'
        + link
        + '<div class="dropdown" role="menu">' + kids + '</div>'
        + '</div>';
    }).join('');

    return '' +
      '<div class="topbar">' +
        '<div class="container topbar-inner">' +
          '<div class="topbar-info">' +
            '<span data-bn="EIIN: ' + (S.eiinBn || '') + '" data-en="EIIN: ' + (S.eiinEn || '') + '">EIIN: ' + (S.eiinBn || '') + '</span>' +
            '<span class="sep"></span>' +
            '<a href="tel:' + (S.phoneRaw || '') + '" data-bn="' + (S.phoneBn || '') + '" data-en="' + (S.phoneEn || '') + '">' + (S.phoneBn || '') + '</a>' +
            '<span class="sep hide-sm"></span>' +
            '<a href="mailto:' + (S.email || '') + '" class="hide-sm">' + (S.email || '') + '</a>' +
          '</div>' +
          '<div class="lang-switch" role="group" aria-label="Language / ভাষা">' +
            '<button type="button" data-lang-btn="bn" class="active">বাংলা</button>' +
            '<button type="button" data-lang-btn="en">English</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<header class="nav-bar" id="navbar">' +
        '<div class="container nav-inner">' +
          '<a class="brand" href="index.html" aria-label="Home">' +
            '<span class="logo-mark" aria-hidden="true"><img src="images/logo.png" alt=""></span>' +
            '<span class="brand-text">' +
              '<strong data-bn="' + (S.nameBn || '') + '" data-en="' + (S.nameEn || '') + '">' + (S.nameBn || '') + '</strong>' +
              '<small data-bn="' + (S.estBn || '') + '" data-en="' + (S.estEn || '') + '">' + (S.estBn || '') + '</small>' +
            '</span>' +
          '</a>' +
          '<nav class="nav-menu" id="navMenu" aria-label="Main navigation">' + navItems + '</nav>' +
          '<div class="nav-actions">' +
            '<a href="apply.html" class="btn btn-gold btn-sm" data-bn="ভর্তি আবেদন" data-en="Apply Now">ভর্তি আবেদন</a>' +
            '<button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false" aria-controls="navMenu">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  function footerHTML() {
    var S = window.SITE || {};
    var year = new Date().getFullYear();
    var yearBn = window.KBUHS.bnNum(year);

    return '' +
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div>' +
              '<div class="footer-brand">' +
                '<span class="logo-mark" aria-hidden="true"><img src="images/logo.png" alt=""></span>' +
                '<span class="brand-text">' +
                  '<strong data-bn="' + (S.nameBn || '') + '" data-en="' + (S.nameEn || '') + '">' + (S.nameBn || '') + '</strong>' +
                  '<small data-bn="EIIN: ' + (S.eiinBn || '') + '" data-en="EIIN: ' + (S.eiinEn || '') + '">EIIN: ' + (S.eiinBn || '') + '</small>' +
                '</span>' +
              '</div>' +
              '<p data-bn="' + (S.taglineBn || '') + '" data-en="' + (S.taglineEn || '') + '">' + (S.taglineBn || '') + '</p>' +
              '<div class="socials">' +
                '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg></a>' +
                '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19.2 4.8 12 4.8 12 4.8s-7.2 0-8.8.4A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4A2.6 2.6 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.3V8.7l5.7 3.3Z"/></svg></a>' +
                '<a href="mailto:' + (S.email || '') + '" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg></a>' +
              '</div>' +
            '</div>' +

            '<div>' +
              '<h4 data-bn="দ্রুত লিংক" data-en="Quick Links">দ্রুত লিংক</h4>' +
              '<nav class="footer-links">' +
                '<a href="about.html" data-bn="আমাদের সম্পর্কে" data-en="About Us">আমাদের সম্পর্কে</a>' +
                '<a href="academics.html" data-bn="একাডেমিক" data-en="Academics">একাডেমিক</a>' +
                '<a href="notices.html" data-bn="নোটিশ বোর্ড" data-en="Notice Board">নোটিশ বোর্ড</a>' +
                '<a href="teachers.html" data-bn="শিক্ষকবৃন্দ" data-en="Teachers">শিক্ষকবৃন্দ</a>' +
                '<a href="students.html" data-bn="শিক্ষার্থীবৃন্দ" data-en="Students">শিক্ষার্থীবৃন্দ</a>' +
              '</nav>' +
            '</div>' +

            '<div>' +
              '<h4 data-bn="শিক্ষার্থীদের জন্য" data-en="For Students">শিক্ষার্থীদের জন্য</h4>' +
              '<nav class="footer-links">' +
                '<a href="admission.html" data-bn="ভর্তি তথ্য" data-en="Admission Info">ভর্তি তথ্য</a>' +
                '<a href="routine.html" data-bn="শ্রেণি রুটিন" data-en="Class Routine">শ্রেণি রুটিন</a>' +
                '<a href="results.html" data-bn="পরীক্ষার ফলাফল" data-en="Exam Results">পরীক্ষার ফলাফল</a>' +
                '<a href="syllabus.html" data-bn="সিলেবাস" data-en="Syllabus">সিলেবাস</a>' +
                '<a href="downloads.html" data-bn="ডাউনলোড" data-en="Downloads">ডাউনলোড</a>' +
              '</nav>' +
            '</div>' +

            '<div>' +
              '<h4 data-bn="যোগাযোগ" data-en="Contact">যোগাযোগ</h4>' +
              '<ul class="footer-contact">' +
                '<li>' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' +
                  '<span data-bn="' + (S.addrBn || '') + '" data-en="' + (S.addrEn || '') + '">' + (S.addrBn || '') + '</span>' +
                '</li>' +
                '<li>' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>' +
                  '<a href="tel:' + (S.phoneRaw || '') + '" data-bn="' + (S.phoneBn || '') + '" data-en="' + (S.phoneEn || '') + '">' + (S.phoneBn || '') + '</a>' +
                '</li>' +
                '<li>' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>' +
                  '<a href="mailto:' + (S.email || '') + '">' + (S.email || '') + '</a>' +
                '</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +

          '<div class="footer-bottom">' +
            '<span data-bn="© ' + yearBn + ' ' + (S.nameBn || '') + '। সর্বস্বত্ব সংরক্ষিত।" ' +
                  'data-en="© ' + year + ' ' + (S.nameEn || '') + '. All rights reserved.">' +
              '© ' + yearBn + ' ' + (S.nameBn || '') + '। সর্বস্বত্ব সংরক্ষিত।' +
            '</span>' +
            '<span>' +
              '<a href="#" data-bn="গোপনীয়তা নীতি" data-en="Privacy Policy">গোপনীয়তা নীতি</a>' +
              ' &nbsp;•&nbsp; ' +
              '<a href="#" data-bn="শর্তাবলী" data-en="Terms of Use">শর্তাবলী</a>' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<button class="to-top" id="toTop" aria-label="Back to top">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>' +
      '</button>';
  }

  function injectShell() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.outerHTML = headerHTML();
    if (f) f.outerHTML = footerHTML();
  }

  /* ============================================================
     4. LANGUAGE
     ============================================================ */
  function applyLang(newLang) {
    lang = newLang;
    document.documentElement.lang = newLang;
    document.body.classList.toggle('lang-en', newLang === 'en');

    document.querySelectorAll('[data-bn]').forEach(function (el) {
      var v = el.getAttribute('data-' + newLang);
      if (v !== null) el.textContent = v;
    });

    document.querySelectorAll('[data-bn-ph]').forEach(function (el) {
      var v = el.getAttribute('data-' + newLang + '-ph');
      if (v !== null) el.setAttribute('placeholder', v);
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === newLang);
    });

    try { localStorage.setItem(STORAGE_KEY, newLang); } catch (e) {}

    window.dispatchEvent(new CustomEvent('kbuhs:lang', { detail: { lang: newLang } }));
  }

  try { lang = localStorage.getItem(STORAGE_KEY) || 'bn'; } catch (e) {}

  /* ============================================================
     5. DROPDOWN BEHAVIOR
     ------------------------------------------------------------
     - Desktop: hover opens (CSS). Click on the parent link still
       navigates to the parent page.
     - Mobile: tap the chevron area (i.e. any click on parent)
       toggles the inline submenu. Click on a child navigates.
     - Outside click closes any open dropdown.
     - Escape closes.
     ============================================================ */
  function bindDropdowns() {
    var navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    function closeAll(except) {
      navMenu.querySelectorAll('.nav-item.open').forEach(function (it) {
        if (it !== except) it.classList.remove('open');
      });
    }

    navMenu.querySelectorAll('.nav-item.has-children').forEach(function (item) {
      var link = item.querySelector('.nav-link');

      /* On mobile (<=900px) intercept clicks on the parent to toggle */
      link.addEventListener('click', function (e) {
        if (window.innerWidth > 900) return; /* desktop: let it navigate */
        e.preventDefault();
        var willOpen = !item.classList.contains('open');
        closeAll(item);
        item.classList.toggle('open', willOpen);
      });
    });

    /* Outside click closes */
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target)) closeAll();
    });

    /* Escape closes */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });

    /* Resize: clear open state when crossing breakpoint */
    window.addEventListener('resize', function () {
      closeAll();
    });
  }

  /* ============================================================
     6. BOOT
     ============================================================ */
  function boot() {
    injectShell();

    /* Language buttons (post-injection) */
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang-btn'));
      });
    });

    applyLang(lang);

    /* Mobile burger */
    var menuToggle = document.getElementById('menuToggle');
    var navMenu    = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function () {
        var open = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      /* Close burger when a leaf link is clicked */
      navMenu.querySelectorAll('a').forEach(function (l) {
        l.addEventListener('click', function () {
          if (l.classList.contains('has-children') && window.innerWidth <= 900) return;
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* Dropdown interactions */
    bindDropdowns();

    /* Sticky nav + back-to-top */
    var navbar = document.getElementById('navbar');
    var toTop  = document.getElementById('toTop');
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (navbar) navbar.classList.toggle('scrolled', y > 8);
      if (toTop)  toTop.classList.toggle('show', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* Reveal on scroll */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            o.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      reveals.forEach(function (el) { obs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();