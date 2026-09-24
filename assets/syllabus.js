/* ============================================================
   assets/syllabus.js
   Syllabus page — class tabs, subject accordion, print layout
   ============================================================ */
(function () {
  'use strict';

  var CLASSES = ['6', '7', '8', '9', '10'];

  /* ---------- Syllabus data ---------- */
  var SYLLABUS = {
    '6': [
      { key:'bangla', bn:'বাংলা', en:'Bangla', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. গল্প: বই পড়া', en:'1. Story: Boi Pora',
            topics:[{bn:'লেখক পরিচিতি',en:'Author bio'},{bn:'মূল ভাব',en:'Theme'},{bn:'সৃজনশীল প্রশ্ন',en:'Creative Q&A'}] },
          { bn:'২. কবিতা: প্রার্থনা', en:'2. Poem: Prarthona',
            topics:[{bn:'কবি পরিচিতি',en:'Poet bio'},{bn:'শব্দার্থ',en:'Vocabulary'},{bn:'ভাবার্থ',en:'Meaning'}] },
          { bn:'৩. গল্প: অভাগীর স্বর্গ', en:'3. Story: Obhagir Swargo',
            topics:[{bn:'চরিত্র বিশ্লেষণ',en:'Character analysis'},{bn:'সৃজনশীল প্রশ্ন',en:'Creative Q&A'}] },
          { bn:'৪. ব্যাকরণ: ভাষা ও ব্যাকরণ', en:'4. Grammar: Language & Grammar',
            topics:[{bn:'ভাষার সংজ্ঞা',en:'Definition'},{bn:'বাংলা ভাষার উৎপত্তি',en:'Origin'}] },
          { bn:'৫. নির্মিতি: অনুচ্ছেদ', en:'5. Composition: Paragraph',
            topics:[{bn:'অনুচ্ছেদ লেখার নিয়ম',en:'Rules of paragraph writing'}] }
        ] },
      { key:'english', bn:'ইংরেজি', en:'English', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'1. Reading: Seen Passage', en:'1. Reading: Seen Passage',
            topics:[{bn:'Comprehension questions',en:'Comprehension'},{bn:'Information transfer',en:'Info transfer'}] },
          { bn:'2. Grammar: Tenses', en:'2. Grammar: Tenses',
            topics:[{bn:'Present tense',en:'Present'},{bn:'Past tense',en:'Past'},{bn:'Future tense',en:'Future'}] },
          { bn:'3. Composition: Paragraph', en:'3. Composition: Paragraph',
            topics:[{bn:'Rules & formats',en:'Rules'},{bn:'Sample paragraphs',en:'Samples'}] },
          { bn:'4. Letter Writing', en:'4. Letter Writing',
            topics:[{bn:'Formal letters',en:'Formal'},{bn:'Informal letters',en:'Informal'}] }
        ] },
      { key:'math', bn:'গণিত', en:'Mathematics', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. পাটিগণিত: সংখ্যা', en:'1. Arithmetic: Numbers',
            topics:[{bn:'পূর্ণসংখ্যা',en:'Integers'},{bn:'মৌলিক সংখ্যা',en:'Prime numbers'}] },
          { bn:'২. বীজগণিত: রাশি', en:'2. Algebra: Expressions',
            topics:[{bn:'সূচক ও লগারিদম',en:'Indices & Log'},{bn:'রাশির সরলীকরণ',en:'Simplification'}] },
          { bn:'৩. জ্যামিতি: রেখা ও কোণ', en:'3. Geometry: Lines & Angles',
            topics:[{bn:'কোণের প্রকারভেদ',en:'Types of angles'},{bn:'সমান্তরাল রেখা',en:'Parallel lines'}] },
          { bn:'৪. পরিমাপ', en:'4. Measurement',
            topics:[{bn:'ক্ষেত্রফল',en:'Area'},{bn:'পরিসীমা',en:'Perimeter'}] }
        ] },
      { key:'science', bn:'বিজ্ঞান', en:'Science', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. জীবজগৎ', en:'1. Living World',
            topics:[{bn:'উদ্ভিদ ও প্রাণী',en:'Plants & animals'},{bn:'জীবকোষ',en:'Cells'}] },
          { bn:'২. পদার্থ ও শক্তি', en:'2. Matter & Energy',
            topics:[{bn:'পদার্থের গুণ',en:'Properties'},{bn:'শক্তির রূপ',en:'Forms of energy'}] },
          { bn:'৩. পারিপার্শ্বিক পরিবেশ', en:'3. Environment',
            topics:[{bn:'বায়ু, পানি, মাটি',en:'Air, Water, Soil'}] }
        ] },
      { key:'bgs', bn:'বাংলাদেশ ও বিশ্বপরিচয়', en:'Bangladesh & Global', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. পরিবার ও সমাজ', en:'1. Family & Society',
            topics:[{bn:'পরিবারের প্রকার',en:'Types'},{bn:'সামাজিক মূল্যবোধ',en:'Values'}] },
          { bn:'২. বাংলাদেশের ইতিহাস', en:'2. History of Bangladesh',
            topics:[{bn:'প্রাচীন বাংলা',en:'Ancient Bengal'},{bn:'মুক্তিযুদ্ধ',en:'Liberation War'}] }
        ] },
      { key:'islamic', bn:'ইসলাম শিক্ষা', en:'Islamic Studies', cat:'rel',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. আকাইদ', en:'1. Aqaid',
            topics:[{bn:'তাওহিদ',en:'Tawhid'},{bn:'রিসালাত',en:'Risalat'}] },
          { bn:'২. ইবাদত', en:'2. Ibadat',
            topics:[{bn:'নামাজ',en:'Salat'},{bn:'রোজা',en:'Sawm'}] },
          { bn:'৩. আখলাক', en:'3. Akhlaq',
            topics:[{bn:'সদাচরণ',en:'Good manners'},{bn:'সততা',en:'Honesty'}] }
        ] },
      { key:'ict', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT', cat:'sci',
        marks:{ creative:50, mcq:50, total:100 },
        chapters:[
          { bn:'১. কম্পিউটার পরিচিতি', en:'1. Introduction to Computers',
            topics:[{bn:'হার্ডওয়্যার',en:'Hardware'},{bn:'সফটওয়্যার',en:'Software'}] },
          { bn:'২. ইন্টারনেট', en:'2. Internet',
            topics:[{bn:'ব্রাউজার',en:'Browser'},{bn:'ইমেইল',en:'Email'}] }
        ] }
    ],

    '7': [
      { key:'bangla', bn:'বাংলা', en:'Bangla', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. গল্প: বই পড়া', en:'1. Story: Boi Pora',
            topics:[{bn:'মূল ভাব',en:'Theme'},{bn:'সৃজনশীল প্রশ্ন',en:'Creative Q&A'}] },
          { bn:'২. কবিতা: কপোতাক্ষ নদ', en:'2. Poem: Kapotakkha Nod',
            topics:[{bn:'কবি পরিচিতি',en:'Poet bio'},{bn:'ভাবার্থ',en:'Meaning'}] },
          { bn:'৩. ব্যাকরণ: শব্দ ও পদ', en:'3. Grammar: Words & Parts of Speech',
            topics:[{bn:'শব্দের শ্রেণিবিভাগ',en:'Word classes'},{bn:'বিশেষ্য ও সর্বনাম',en:'Nouns & Pronouns'}] },
          { bn:'৪. নির্মিতি: চিঠি', en:'4. Composition: Letter',
            topics:[{bn:'আবেদন',en:'Application'},{bn:'ব্যক্তিগত পত্র',en:'Personal letter'}] }
        ] },
      { key:'english', bn:'ইংরেজি', en:'English', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'1. Grammar: Parts of Speech', en:'1. Grammar: Parts of Speech',
            topics:[{bn:'Noun',en:'Noun'},{bn:'Verb',en:'Verb'},{bn:'Adjective',en:'Adjective'}] },
          { bn:'2. Composition: Story', en:'2. Composition: Story',
            topics:[{bn:'Story completion',en:'Story completion'}] },
          { bn:'3. Reading Comprehension', en:'3. Reading Comprehension',
            topics:[{bn:'Seen passage',en:'Seen'},{bn:'Unseen passage',en:'Unseen'}] }
        ] },
      { key:'math', bn:'গণিত', en:'Mathematics', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. বীজগণিত: বহুপদী', en:'1. Algebra: Polynomials',
            topics:[{bn:'যোগ-বিয়োগ',en:'Add-Sub'},{bn:'গুণ-ভাগ',en:'Mul-Div'}] },
          { bn:'২. জ্যামিতি: ত্রিভুজ', en:'2. Geometry: Triangles',
            topics:[{bn:'ত্রিভুজের প্রকার',en:'Types'},{bn:'পিথাগোরাস',en:'Pythagoras'}] },
          { bn:'৩. পরিসংখ্যান', en:'3. Statistics',
            topics:[{bn:'গড়',en:'Mean'},{bn:'মধ্যমা',en:'Median'}] }
        ] },
      { key:'science', bn:'বিজ্ঞান', en:'Science', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. কোষ ও টিস্যু', en:'1. Cells & Tissues',
            topics:[{bn:'উদ্ভিদ কোষ',en:'Plant cell'},{bn:'প্রাণী কোষ',en:'Animal cell'}] },
          { bn:'২. বল ও গতি', en:'2. Force & Motion',
            topics:[{bn:'নিউটনের সূত্র',en:"Newton's laws"},{bn:'ঘর্ষণ',en:'Friction'}] },
          { bn:'৩. রাসায়নিক বিক্রিয়া', en:'3. Chemical Reactions',
            topics:[{bn:'মৌল ও যৌগ',en:'Elements & Compounds'}] }
        ] },
      { key:'bgs', bn:'বাংলাদেশ ও বিশ্বপরিচয়', en:'Bangladesh & Global', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. বাংলাদেশের সংবিধান', en:'1. Constitution',
            topics:[{bn:'মূলনীতি',en:'Principles'},{bn:'মৌলিক অধিকার',en:'Rights'}] },
          { bn:'২. সমাজসেবা', en:'2. Social Service',
            topics:[{bn:'সমাজসেবার ধরন',en:'Types'}] }
        ] },
      { key:'islamic', bn:'ইসলাম শিক্ষা', en:'Islamic Studies', cat:'rel',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. কুরআন শিক্ষা', en:'1. Quran Studies',
            topics:[{bn:'তিলাওয়াত',en:'Recitation'},{bn:'অর্থ',en:'Meaning'}] },
          { bn:'২. হাদিস শিক্ষা', en:'2. Hadith Studies',
            topics:[{bn:'মূল হাদিস',en:'Key hadith'}] },
          { bn:'৩. নৈতিক শিক্ষা', en:'3. Moral Education',
            topics:[{bn:'সততা',en:'Honesty'},{bn:'শ্রম',en:'Hard work'}] }
        ] },
      { key:'ict', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT', cat:'sci',
        marks:{ creative:50, mcq:50, total:100 },
        chapters:[
          { bn:'১. ডেটা ও তথ্য', en:'1. Data & Information',
            topics:[{bn:'বাইনারি',en:'Binary'}] },
          { bn:'২. ওয়ার্ড প্রসেসিং', en:'2. Word Processing',
            topics:[{bn:'MS Word',en:'MS Word'}] }
        ] }
    ],

    '8': [
      { key:'bangla', bn:'বাংলা', en:'Bangla', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. গল্প: মমতাদি', en:'1. Story: Momtadi',
            topics:[{bn:'চরিত্র বিশ্লেষণ',en:'Character analysis'},{bn:'মূল ভাব',en:'Theme'}] },
          { bn:'২. কবিতা: নদীর স্বপ্ন', en:'2. Poem: Nodir Shopno',
            topics:[{bn:'ভাবার্থ',en:'Meaning'},{bn:'কবি পরিচিতি',en:'Poet bio'}] },
          { bn:'৩. ব্যাকরণ: বাক্য', en:'3. Grammar: Sentences',
            topics:[{bn:'বাক্যের প্রকার',en:'Types'},{bn:'কারক ও বিভক্তি',en:'Case'}] },
          { bn:'৪. নির্মিতি: প্রতিবেদন', en:'4. Composition: Report',
            topics:[{bn:'সংবাদ প্রতিবেদন',en:'News report'},{bn:'সভার প্রতিবেদন',en:'Meeting report'}] }
        ] },
      { key:'english', bn:'ইংরেজি', en:'English', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'1. Grammar: Voice & Narration', en:'1. Grammar: Voice & Narration',
            topics:[{bn:'Active-Passive',en:'Active-Passive'},{bn:'Direct-Indirect',en:'Direct-Indirect'}] },
          { bn:'2. Composition: Essay', en:'2. Composition: Essay',
            topics:[{bn:'Descriptive essay',en:'Descriptive'},{bn:'Argumentative essay',en:'Argumentative'}] },
          { bn:'3. Reading Comprehension', en:'3. Reading Comprehension',
            topics:[{bn:'Seen & unseen',en:'Seen & unseen'}] }
        ] },
      { key:'math', bn:'গণিত', en:'Mathematics', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. বীজগণিত: সমীকরণ', en:'1. Algebra: Equations',
            topics:[{bn:'এক চলক',en:'One variable'},{bn:'দুই চলক',en:'Two variables'}] },
          { bn:'২. জ্যামিতি: চতুর্ভুজ', en:'2. Geometry: Quadrilaterals',
            topics:[{bn:'চতুর্ভুজের প্রকার',en:'Types'},{bn:'সম্পর্ক',en:'Relations'}] },
          { bn:'৩. বৃত্ত', en:'3. Circle',
            topics:[{bn:'বৃত্তের ধর্ম',en:'Properties'}] },
          { bn:'৪. ত্রিকোণমিতি', en:'4. Trigonometry',
            topics:[{bn:'অনুপাত',en:'Ratios'}] }
        ] },
      { key:'science', bn:'বিজ্ঞান', en:'Science', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. জীবনের ধারা', en:'1. Continuity of Life',
            topics:[{bn:'বংশগতি',en:'Heredity'},{bn:'কোষ বিভাজন',en:'Cell division'}] },
          { bn:'২. রাসায়নিক পরিবর্তন', en:'2. Chemical Change',
            topics:[{bn:'অম্ল-ক্ষারক',en:'Acid-Base'},{bn:'লবণ',en:'Salt'}] },
          { bn:'৩. আলো ও দৃষ্টি', en:'3. Light & Vision',
            topics:[{bn:'প্রতিফলন',en:'Reflection'},{bn:'প্রতিসরণ',en:'Refraction'}] }
        ] },
      { key:'bgs', bn:'বাংলাদেশ ও বিশ্বপরিচয়', en:'Bangladesh & Global', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. বাংলাদেশ ও বিশ্বপরিচয়', en:'1. Bangladesh & Global Studies',
            topics:[{bn:'দক্ষিণ এশিয়া',en:'South Asia'},{bn:'আন্তর্জাতিক সংস্থা',en:'International bodies'}] },
          { bn:'২. অর্থনীতি', en:'2. Economics',
            topics:[{bn:'চাহিদা ও যোগান',en:'Demand & Supply'}] }
        ] },
      { key:'islamic', bn:'ইসলাম শিক্ষা', en:'Islamic Studies', cat:'rel',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. আকাইদ ও ইবাদত', en:'1. Aqaid & Ibadat',
            topics:[{bn:'ঈমান',en:'Iman'},{bn:'হজ',en:'Hajj'}] },
          { bn:'২. আখলাক', en:'2. Akhlaq',
            topics:[{bn:'পরোপকার',en:'Beneficence'}] },
          { bn:'৩. আদর্শ জীবনচরিত', en:'3. Ideal Biographies',
            topics:[{bn:'হযরত মুহাম্মদ (সা.)',en:'Prophet Muhammad (PBUH)'}] }
        ] },
      { key:'ict', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT', cat:'sci',
        marks:{ creative:50, mcq:50, total:100 },
        chapters:[
          { bn:'১. কম্পিউটার নেটওয়ার্ক', en:'1. Computer Networks',
            topics:[{bn:'LAN, WAN',en:'LAN, WAN'}] },
          { bn:'২. স্প্রেডশিট', en:'2. Spreadsheet',
            topics:[{bn:'MS Excel',en:'MS Excel'}] },
          { bn:'৩. মাল্টিমিডিয়া', en:'3. Multimedia',
            topics:[{bn:'ছবি, শব্দ, ভিডিও',en:'Image, Audio, Video'}] }
        ] }
    ],

    '9': [
      { key:'bangla', bn:'বাংলা', en:'Bangla', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. গল্প: মেঘলা দিনের রোদ', en:'1. Story: Meghla Diner Rod',
            topics:[{bn:'মূল ভাব',en:'Theme'},{bn:'চরিত্র',en:'Characters'}] },
          { bn:'২. কবিতা: বঙ্গভূমির প্রতি', en:'2. Poem: Bongobhumir Proti',
            topics:[{bn:'ভাবার্থ',en:'Meaning'}] },
          { bn:'৩. উপন্যাস: লালসালু', en:'3. Novel: Lalsalu',
            topics:[{bn:'চরিত্র বিশ্লেষণ',en:'Character analysis'},{bn:'সামাজিক প্রেক্ষাপট',en:'Social context'}] },
          { bn:'৪. ব্যাকরণ', en:'4. Grammar',
            topics:[{bn:'উপসর্গ',en:'Prefixes'},{bn:'সমাস',en:'Compound words'},{bn:'কারক',en:'Case'}] },
          { bn:'৫. নির্মিতি', en:'5. Composition',
            topics:[{bn:'ভাব-সম্প্রসারণ',en:'Expansion'},{bn:'সারাংশ',en:'Summary'}] }
        ] },
      { key:'english', bn:'ইংরেজি', en:'English', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'1. Reading: Seen & Unseen', en:'1. Reading: Seen & Unseen',
            topics:[{bn:'Comprehension',en:'Comprehension'},{bn:'Summary writing',en:'Summary'}] },
          { bn:'2. Grammar: Tense, Voice', en:'2. Grammar: Tense, Voice',
            topics:[{bn:'Tense',en:'Tense'},{bn:'Voice',en:'Voice'},{bn:'Narration',en:'Narration'}] },
          { bn:'3. Composition: Essay', en:'3. Composition: Essay',
            topics:[{bn:'Descriptive',en:'Descriptive'},{bn:'Argumentative',en:'Argumentative'}] },
          { bn:'4. Application & Letter', en:'4. Application & Letter',
            topics:[{bn:'Formal application',en:'Formal'},{bn:'Personal letter',en:'Personal'}] }
        ] },
      { key:'math', bn:'গণিত', en:'Mathematics', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. বাস্তব সংখ্যা', en:'1. Real Numbers',
            topics:[{bn:'অমূলদ সংখ্যা',en:'Irrational numbers'}] },
          { bn:'২. সেট ও ফাংশন', en:'2. Sets & Functions',
            topics:[{bn:'সেট অপারেশন',en:'Set operations'},{bn:'ফাংশন',en:'Functions'}] },
          { bn:'৩. বীজগাণিতিক রাশি', en:'3. Algebraic Expressions',
            topics:[{bn:'উৎপাদকে বিশ্লেষণ',en:'Factorization'}] },
          { bn:'৪. সূচক ও লগারিদম', en:'4. Indices & Logarithms',
            topics:[{bn:'সূচকের সূত্র',en:'Laws of indices'},{bn:'লগারিদম',en:'Logarithm'}] },
          { bn:'৫. এক চলকবিশিষ্ট সমীকরণ', en:'5. Equations in One Variable',
            topics:[{bn:'দ্বিঘাত সমীকরণ',en:'Quadratic equations'}] },
          { bn:'৬. রেখা, কোণ, ত্রিভুজ', en:'6. Lines, Angles, Triangles',
            topics:[{bn:'উপপাদ্য',en:'Theorems'}] },
          { bn:'৭. ব্যবহারিক জ্যামিতি', en:'7. Practical Geometry',
            topics:[{bn:'অঙ্কন',en:'Constructions'}] },
          { bn:'৮. বৃত্ত', en:'8. Circle',
            topics:[{bn:'বৃত্তের উপপাদ্য',en:'Circle theorems'}] },
          { bn:'৯. ত্রিকোণমিতি', en:'9. Trigonometry',
            topics:[{bn:'অনুপাত ও অভেদ',en:'Ratios & identities'}] },
          { bn:'১০. পরিসংখ্যান', en:'10. Statistics',
            topics:[{bn:'উপাত্ত উপস্থাপন',en:'Data presentation'}] }
        ] },
      { key:'physics', bn:'পদার্থবিজ্ঞান', en:'Physics', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. ভৌত রাশি ও পরিমাপ', en:'1. Physical Quantities',
            topics:[{bn:'একক',en:'Units'},{bn:'পরিমাপক যন্ত্র',en:'Instruments'}] },
          { bn:'২. গতি', en:'2. Motion',
            topics:[{bn:'সরলরেখায় গতি',en:'Linear motion'},{bn:'ত্বরণ',en:'Acceleration'}] },
          { bn:'৩. বল', en:'3. Force',
            topics:[{bn:"নিউটনের সূত্র",en:"Newton's laws"},{bn:'ঘর্ষণ',en:'Friction'}] },
          { bn:'৪. কাজ, ক্ষমতা ও শক্তি', en:'4. Work, Power & Energy',
            topics:[{bn:'কাজ',en:'Work'},{bn:'শক্তি',en:'Energy'}] },
          { bn:'৫. পদার্থের অবস্থা ও চাপ', en:'5. States of Matter & Pressure',
            topics:[{bn:'চাপ',en:'Pressure'},{bn:'প্লবতা',en:'Buoyancy'}] },
          { bn:'৬. তরঙ্গ ও শব্দ', en:'6. Wave & Sound',
            topics:[{bn:'তরঙ্গ',en:'Wave'},{bn:'শব্দের গতি',en:'Speed of sound'}] },
          { bn:'৭. আলো', en:'7. Light',
            topics:[{bn:'প্রতিফলন',en:'Reflection'},{bn:'প্রতিসরণ',en:'Refraction'},{bn:'লেন্স',en:'Lens'}] },
          { bn:'৮. বিদ্যুৎ', en:'8. Electricity',
            topics:[{bn:"ওহমের সূত্র",en:"Ohm's law"},{bn:'বর্তনী',en:'Circuits'}] }
        ] },
      { key:'chemistry', bn:'রসায়ন', en:'Chemistry', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. রসায়নের ধারণা', en:'1. Concept of Chemistry',
            topics:[{bn:'পদার্থ',en:'Matter'},{bn:'মিশ্রণ',en:'Mixtures'}] },
          { bn:'২. পদার্থের অবস্থা', en:'2. States of Matter',
            topics:[{bn:'গ্যাসের সূত্র',en:'Gas laws'}] },
          { bn:'৩. পদার্থের গঠন', en:'3. Structure of Matter',
            topics:[{bn:'পরমাণু',en:'Atom'},{bn:'অণু',en:'Molecule'}] },
          { bn:'৪. পর্যায় সারণি', en:'4. Periodic Table',
            topics:[{bn:'মৌলের শ্রেণিবিভাগ',en:'Classification'}] },
          { bn:'৫. রাসায়নিক বন্ধন', en:'5. Chemical Bonds',
            topics:[{bn:'আয়নিক ও সমযোজী',en:'Ionic & covalent'}] },
          { bn:'৬. মোলের ধারণা', en:'6. Concept of Mole',
            topics:[{bn:'মোল',en:'Mole'},{bn:'স্টয়কিওমিতি',en:'Stoichiometry'}] },
          { bn:'৭. রাসায়নিক বিক্রিয়া', en:'7. Chemical Reactions',
            topics:[{bn:'বিক্রিয়ার প্রকার',en:'Types'}] },
          { bn:'৮. অম্ল, ক্ষারক ও লবণ', en:'8. Acid, Base & Salt',
            topics:[{bn:'pH',en:'pH'},{bn:'প্রশমন',en:'Neutralization'}] }
        ] },
      { key:'biology', bn:'জীববিজ্ঞান', en:'Biology', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. জীবকোষ ও টিস্যু', en:'1. Cell & Tissue',
            topics:[{bn:'কোষ অঙ্গাণু',en:'Organelles'},{bn:'টিস্যু',en:'Tissues'}] },
          { bn:'২. কোষ বিভাজন', en:'2. Cell Division',
            topics:[{bn:'মাইটোসিস',en:'Mitosis'},{bn:'মায়োসিস',en:'Meiosis'}] },
          { bn:'৩. উদ্ভিদ শারীরতত্ত্ব', en:'3. Plant Physiology',
            topics:[{bn:'সালোকসংশ্লেষণ',en:'Photosynthesis'},{bn:'শ্বসন',en:'Respiration'}] },
          { bn:'৪. প্রাণীর শারীরতত্ত্ব', en:'4. Animal Physiology',
            topics:[{bn:'পরিপাক',en:'Digestion'},{bn:'রক্ত সংবহন',en:'Circulation'}] },
          { bn:'৫. বংশগতি', en:'5. Heredity',
            topics:[{bn:"মেন্ডেলের সূত্র",en:"Mendel's laws"}] },
          { bn:'৬. জীবের পরিবেশ', en:'6. Environment',
            topics:[{bn:'বাস্তুতন্ত্র',en:'Ecosystem'}] }
        ] },
      { key:'ict', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT', cat:'sci',
        marks:{ creative:50, mcq:50, total:100 },
        chapters:[
          { bn:'১. তথ্য ও যোগাযোগ প্রযুক্তি', en:'1. ICT Basics',
            topics:[{bn:'ICT-এর সুবিধা',en:'Advantages'}] },
          { bn:'২. কম্পিউটার ও নেটওয়ার্ক', en:'2. Computer & Networks',
            topics:[{bn:'নেটওয়ার্ক',en:'Network'},{bn:'ইন্টারনেট',en:'Internet'}] },
          { bn:'৩. নিরাপত্তা', en:'3. Safety',
            topics:[{bn:'সাইবার নিরাপত্তা',en:'Cyber safety'}] },
          { bn:'৪. HTML', en:'4. HTML',
            topics:[{bn:'ট্যাগ',en:'Tags'},{bn:'লিস্ট, টেবিল',en:'Lists, Tables'}] }
        ] },
      { key:'bgs', bn:'বাংলাদেশ ও বিশ্বপরিচয়', en:'Bangladesh & Global', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. সমাজ ও সংস্কৃতি', en:'1. Society & Culture',
            topics:[{bn:'সংস্কৃতির উপাদান',en:'Elements'}] },
          { bn:'২. বাংলাদেশের সমাজ', en:'2. Bangladesh Society',
            topics:[{bn:'সামাজিক পরিবর্তন',en:'Social change'}] },
          { bn:'৩. রাষ্ট্র ও নাগরিক', en:'3. State & Citizen',
            topics:[{bn:'নাগরিক দায়িত্ব',en:'Civic duty'}] },
          { bn:'৪. অর্থনীতি', en:'4. Economics',
            topics:[{bn:'বাজেট',en:'Budget'}] }
        ] },
      { key:'islamic', bn:'ইসলাম শিক্ষা', en:'Islamic Studies', cat:'rel',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. কুরআন ও হাদিস', en:'1. Quran & Hadith',
            topics:[{bn:'তাফসির',en:'Tafsir'}] },
          { bn:'২. আকাইদ ও ইবাদত', en:'2. Aqaid & Ibadat',
            topics:[{bn:'ইবাদতের প্রকার',en:'Types of worship'}] },
          { bn:'৩. আখলাক', en:'3. Akhlaq',
            topics:[{bn:'সমাজসেবা',en:'Social service'}] },
          { bn:'৪. আদর্শ জীবনচরিত', en:'4. Ideal Biographies',
            topics:[{bn:'খলিফাদের জীবন',en:'Lives of Caliphs'}] }
        ] }
    ],

    '10': [
      { key:'bangla', bn:'বাংলা', en:'Bangla', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. গল্প: মেঘলা দিনের রোদ', en:'1. Story: Meghla Diner Rod',
            topics:[{bn:'মূল ভাব',en:'Theme'}] },
          { bn:'২. কবিতা: বঙ্গভূমির প্রতি', en:'2. Poem: Bongobhumir Proti',
            topics:[{bn:'ভাবার্থ',en:'Meaning'}] },
          { bn:'৩. উপন্যাস: লালসালু', en:'3. Novel: Lalsalu',
            topics:[{bn:'চরিত্র',en:'Characters'},{bn:'প্রেক্ষাপট',en:'Context'}] },
          { bn:'৪. নাটক: বহিপীর', en:'4. Drama: Bohipir',
            topics:[{bn:'চরিত্র ও সংলাপ',en:'Character & dialogue'}] },
          { bn:'৫. ব্যাকরণ', en:'5. Grammar',
            topics:[{bn:'উপসর্গ',en:'Prefixes'},{bn:'সমাস',en:'Compound'},{bn:'কারক',en:'Case'}] },
          { bn:'৬. নির্মিতি', en:'6. Composition',
            topics:[{bn:'ভাব-সম্প্রসারণ',en:'Expansion'},{bn:'প্রতিবেদন',en:'Report'}] }
        ] },
      { key:'english', bn:'ইংরেজি', en:'English', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'1. Reading Comprehension', en:'1. Reading Comprehension',
            topics:[{bn:'Seen passage',en:'Seen'},{bn:'Unseen passage',en:'Unseen'}] },
          { bn:'2. Grammar', en:'2. Grammar',
            topics:[{bn:'Tense',en:'Tense'},{bn:'Voice',en:'Voice'},{bn:'Narration',en:'Narration'},{bn:'Preposition',en:'Preposition'}] },
          { bn:'3. Composition', en:'3. Composition',
            topics:[{bn:'Essay',en:'Essay'},{bn:'Story',en:'Story'},{bn:'Letter',en:'Letter'}] },
          { bn:'4. Application', en:'4. Application',
            topics:[{bn:'Formal application',en:'Formal'}] }
        ] },
      { key:'math', bn:'গণিত', en:'Mathematics', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. বাস্তব সংখ্যা', en:'1. Real Numbers',
            topics:[{bn:'অসমতা',en:'Inequalities'}] },
          { bn:'২. সেট ও ফাংশন', en:'2. Sets & Functions',
            topics:[{bn:'ফাংশন',en:'Functions'}] },
          { bn:'৩. বীজগাণিতিক রাশি', en:'3. Algebraic Expressions',
            topics:[{bn:'উৎপাদক',en:'Factorization'},{bn:'ভগ্নাংশ',en:'Fractions'}] },
          { bn:'৪. সূচক ও লগারিদম', en:'4. Indices & Logarithms',
            topics:[{bn:'লগারিদমিক ফাংশন',en:'Log function'}] },
          { bn:'৫. এক চলকবিশিষ্ট সমীকরণ', en:'5. Equations in One Variable',
            topics:[{bn:'দ্বিঘাত সমীকরণ',en:'Quadratic'}] },
          { bn:'৬. রেখা, কোণ, ত্রিভুজ', en:'6. Lines, Angles, Triangles',
            topics:[{bn:'উপপাদ্য',en:'Theorems'}] },
          { bn:'৭. ব্যবহারিক জ্যামিতি', en:'7. Practical Geometry',
            topics:[{bn:'অঙ্কন',en:'Constructions'}] },
          { bn:'৮. বৃত্ত', en:'8. Circle',
            topics:[{bn:'উপপাদ্য',en:'Theorems'}] },
          { bn:'৯. ত্রিকোণমিতি', en:'9. Trigonometry',
            topics:[{bn:'অভেদ',en:'Identities'},{bn:'উচ্চতা ও দূরত্ব',en:'Height & distance'}] },
          { bn:'১০. পরিসংখ্যান', en:'10. Statistics',
            topics:[{bn:'সম্ভাবনা',en:'Probability'}] },
          { bn:'১১. সসীম ধারা', en:'11. Finite Series',
            topics:[{bn:'সমান্তর ও গুণোত্তর',en:'AP & GP'}] }
        ] },
      { key:'physics', bn:'পদার্থবিজ্ঞান', en:'Physics', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. ভৌত রাশি ও পরিমাপ', en:'1. Physical Quantities',
            topics:[{bn:'একক',en:'Units'}] },
          { bn:'২. গতি', en:'2. Motion',
            topics:[{bn:"নিউটনের সূত্র",en:"Newton's laws"}] },
          { bn:'৩. বল', en:'3. Force',
            topics:[{bn:'ঘর্ষণ',en:'Friction'},{bn:'মহাকর্ষ',en:'Gravity'}] },
          { bn:'৪. কাজ, ক্ষমতা ও শক্তি', en:'4. Work, Power & Energy',
            topics:[{bn:'যান্ত্রিক শক্তি',en:'Mechanical energy'}] },
          { bn:'৫. পদার্থের অবস্থা ও চাপ', en:'5. Matter & Pressure',
            topics:[{bn:'প্লবতা',en:'Buoyancy'}] },
          { bn:'৬. তরঙ্গ ও শব্দ', en:'6. Wave & Sound',
            topics:[{bn:'শব্দ',en:'Sound'}] },
          { bn:'৭. আলো', en:'7. Light',
            topics:[{bn:'লেন্স',en:'Lens'},{bn:'আলোর প্রকৃতি',en:'Nature of light'}] },
          { bn:'৮. বিদ্যুৎ', en:'8. Electricity',
            topics:[{bn:'বর্তনী',en:'Circuits'},{bn:'চুম্বকত্ব',en:'Magnetism'}] },
          { bn:'৯. আধুনিক পদার্থবিজ্ঞান', en:'9. Modern Physics',
            topics:[{bn:'পরমাণু মডেল',en:'Atomic model'},{bn:'তেজস্ক্রিয়তা',en:'Radioactivity'}] }
        ] },
      { key:'chemistry', bn:'রসায়ন', en:'Chemistry', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. রসায়নের ধারণা', en:'1. Concept of Chemistry',
            topics:[{bn:'মিশ্রণ',en:'Mixtures'}] },
          { bn:'২. পদার্থের অবস্থা', en:'2. States of Matter',
            topics:[{bn:'গ্যাসের সূত্র',en:'Gas laws'}] },
          { bn:'৩. পদার্থের গঠন', en:'3. Structure of Matter',
            topics:[{bn:'পরমাণু মডেল',en:'Atomic model'}] },
          { bn:'৪. পর্যায় সারণি', en:'4. Periodic Table',
            topics:[{bn:'মৌলের ধর্ম',en:'Element properties'}] },
          { bn:'৫. রাসায়নিক বন্ধন', en:'5. Chemical Bonds',
            topics:[{bn:'আয়নিক, সমযোজী',en:'Ionic, covalent'}] },
          { bn:'৬. মোলের ধারণা', en:'6. Concept of Mole',
            topics:[{bn:'স্টয়কিওমিতি',en:'Stoichiometry'}] },
          { bn:'৭. রাসায়নিক বিক্রিয়া', en:'7. Chemical Reactions',
            topics:[{bn:'জারণ-বিজারণ',en:'Redox'}] },
          { bn:'৮. অম্ল, ক্ষারক ও লবণ', en:'8. Acid, Base & Salt',
            topics:[{bn:'pH',en:'pH'}] },
          { bn:'৯. ধাতু নিষ্কাশন', en:'9. Metal Extraction',
            topics:[{bn:'ধাতুর ধর্ম',en:'Metal properties'}] },
          { bn:'১০. খনিজ সম্পদ', en:'10. Mineral Resources',
            topics:[{bn:'বাংলাদেশের খনিজ',en:'Bangladesh minerals'}] },
          { bn:'১১. জৈব রসায়ন', en:'11. Organic Chemistry',
            topics:[{bn:'হাইড্রোকার্বন',en:'Hydrocarbons'}] }
        ] },
      { key:'biology', bn:'জীববিজ্ঞান', en:'Biology', cat:'sci',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. জীবকোষ ও টিস্যু', en:'1. Cell & Tissue',
            topics:[{bn:'কোষ অঙ্গাণু',en:'Organelles'}] },
          { bn:'২. কোষ বিভাজন', en:'2. Cell Division',
            topics:[{bn:'মাইটোসিস',en:'Mitosis'},{bn:'মায়োসিস',en:'Meiosis'}] },
          { bn:'৩. উদ্ভিদ শারীরতত্ত্ব', en:'3. Plant Physiology',
            topics:[{bn:'সালোকসংশ্লেষণ',en:'Photosynthesis'}] },
          { bn:'৪. প্রাণীর শারীরতত্ত্ব', en:'4. Animal Physiology',
            topics:[{bn:'রক্ত সংবহন',en:'Circulation'},{bn:'শ্বসন',en:'Respiration'}] },
          { bn:'৫. বংশগতি ও জৈব অভিব্যক্তি', en:'5. Heredity & Evolution',
            topics:[{bn:"মেন্ডেলের সূত্র",en:"Mendel's laws"},{bn:'অভিব্যক্তি',en:'Evolution'}] },
          { bn:'৬. জীবের পরিবেশ', en:'6. Environment',
            topics:[{bn:'বাস্তুতন্ত্র',en:'Ecosystem'},{bn:'প্রদূষণ',en:'Pollution'}] },
          { bn:'৭. জীবপ্রযুক্তি', en:'7. Biotechnology',
            topics:[{bn:'DNA',en:'DNA'},{bn:'জিন প্রকৌশল',en:'Genetic engineering'}] }
        ] },
      { key:'ict', bn:'তথ্য ও যোগাযোগ প্রযুক্তি', en:'ICT', cat:'sci',
        marks:{ creative:50, mcq:50, total:100 },
        chapters:[
          { bn:'১. তথ্য ও যোগাযোগ প্রযুক্তি', en:'1. ICT Basics',
            topics:[{bn:'ICT-এর সুবিধা',en:'Advantages'}] },
          { bn:'২. কম্পিউটার নেটওয়ার্ক', en:'2. Computer Networks',
            topics:[{bn:'নেটওয়ার্ক',en:'Network'}] },
          { bn:'৩. নিরাপত্তা', en:'3. Safety',
            topics:[{bn:'সাইবার নিরাপত্তা',en:'Cyber safety'}] },
          { bn:'৪. HTML', en:'4. HTML',
            topics:[{bn:'ট্যাগ',en:'Tags'}] },
          { bn:'৫. প্রোগ্রামিং ভাষা', en:'5. Programming Language',
            topics:[{bn:'C প্রোগ্রামিং',en:'C programming'}] },
          { bn:'৬. ডেটাবেজ', en:'6. Database',
            topics:[{bn:'MS Access',en:'MS Access'}] }
        ] },
      { key:'bgs', bn:'বাংলাদেশ ও বিশ্বপরিচয়', en:'Bangladesh & Global', cat:'lang',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. সমাজ ও সংস্কৃতি', en:'1. Society & Culture',
            topics:[{bn:'সামাজিক প্রতিষ্ঠান',en:'Social institutions'}] },
          { bn:'২. বাংলাদেশের সমাজ', en:'2. Bangladesh Society',
            topics:[{bn:'সামাজিক সমস্যা',en:'Social problems'}] },
          { bn:'৩. রাষ্ট্র ও নাগরিক', en:'3. State & Citizen',
            topics:[{bn:'নাগরিক অধিকার',en:'Civic rights'}] },
          { bn:'৪. অর্থনীতি', en:'4. Economics',
            topics:[{bn:'অর্থনৈতিক ব্যবস্থা',en:'Economic systems'}] },
          { bn:'৫. আন্তর্জাতিক সম্পর্ক', en:'5. International Relations',
            topics:[{bn:'জাতিসংঘ',en:'United Nations'}] }
        ] },
      { key:'islamic', bn:'ইসলাম শিক্ষা', en:'Islamic Studies', cat:'rel',
        marks:{ creative:70, mcq:30, total:100 },
        chapters:[
          { bn:'১. কুরআন ও হাদিস', en:'1. Quran & Hadith',
            topics:[{bn:'তাফসির',en:'Tafsir'}] },
          { bn:'২. আকাইদ ও ইবাদত', en:'2. Aqaid & Ibadat',
            topics:[{bn:'হজ',en:'Hajj'},{bn:'যাকাত',en:'Zakat'}] },
          { bn:'৩. আখলাক', en:'3. Akhlaq',
            topics:[{bn:'পরিবার ও সমাজ',en:'Family & society'}] },
          { bn:'৪. আদর্শ জীবনচরিত', en:'4. Ideal Biographies',
            topics:[{bn:'মহানবীর জীবন',en:'Life of Prophet'}] },
          { bn:'৫. ইসলামের অবদান', en:'5. Contributions of Islam',
            topics:[{bn:'বিজ্ঞান ও সংস্কৃতি',en:'Science & culture'}] }
        ] }
    ]
  };

  /* ---------------- State ---------------- */
  var currentClass = '6';
  var openSubjects = {};

  /* ---------------- DOM ---------------- */
  var tabsBox    = document.getElementById('classTabs');
  var listBox    = document.getElementById('syllabusList');
  var printBtn   = document.getElementById('printBtn');
  var expandBtn  = document.getElementById('expandAll');
  var collapseBtn= document.getElementById('collapseAll');

  if (!tabsBox || !listBox) return;

  /* ---------------- Helpers ---------------- */
  function esc(s) { return window.KBUHS.esc(s); }
  function L()    { return window.KBUHS.getLang(); }
  function bnNum(n) { return window.KBUHS.bnNum(n); }
  function classLabel(c, l) { return window.KBUHS.classLabel(c, l || L()); }

  function iconFor(cat) {
    if (cat === 'lang')  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-1.5Z"/><path d="M8 7h7M8 11h5"/></svg>';
    if (cat === 'sci')   return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6.5L5.2 17A2.5 2.5 0 0 0 7.4 21h9.2a2.5 2.5 0 0 0 2.2-4L14 9.5V3"/></svg>';
    if (cat === 'rel')   return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 15.1 8.3 22 9.3l-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1Z"/></svg>';
    if (cat === 'hum')   return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>';
  }

  /* ---------------- Tabs ---------------- */
  function renderTabs() {
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
    tabsBox.innerHTML = parts.join('');

    Array.prototype.forEach.call(tabsBox.querySelectorAll('.class-tab'), function (b) {
      b.addEventListener('click', function () {
        currentClass = b.getAttribute('data-class');
        render();
      });
    });
  }

  /* ---------------- Subject list ---------------- */
  function renderList() {
    var lang = L();
    var subjects = SYLLABUS[currentClass] || [];
    var parts = [];
    var i;

    parts.push('<div class="sy-list">');

    for (i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      var key = currentClass + ':' + s.key;
      var isOpen = !!openSubjects[key];
      var openAttr = isOpen ? ' open' : '';

      parts.push('<details class="sy-subject" data-cat="' + s.cat + '" data-key="' + key + '"' + openAttr + '>');
      parts.push('<summary>');
      parts.push('<span class="subj-icon">');
      parts.push(iconFor(s.cat));
      parts.push('<span class="dot"></span></span>');
      parts.push('<span class="subj-meta">');
      parts.push('<h3>' + esc(lang === 'bn' ? s.bn : s.en) + '</h3>');
      parts.push('<p>' + (lang === 'bn' ? bnNum(s.chapters.length) + ' টি অধ্যায়' : s.chapters.length + ' chapters') + '</p>');
      parts.push('</span>');
      parts.push('<span class="subj-badge">' + (lang === 'bn' ? 'মোট ' + bnNum(s.marks.total) : 'Total ' + s.marks.total) + '</span>');
      parts.push('<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>');
      parts.push('</summary>');
      parts.push('<div class="sy-body">');

      /* Marks row */
      parts.push('<div class="sy-meta">');
      parts.push('<div class="item"><label>' + (lang === 'bn' ? 'সৃজনশীল' : 'Creative') + '</label><p>' + (lang === 'bn' ? bnNum(s.marks.creative) : s.marks.creative) + '</p></div>');
      parts.push('<div class="item"><label>' + (lang === 'bn' ? 'MCQ' : 'MCQ') + '</label><p>' + (lang === 'bn' ? bnNum(s.marks.mcq) : s.marks.mcq) + '</p></div>');
      parts.push('<div class="item"><label>' + (lang === 'bn' ? 'মোট' : 'Total') + '</label><p>' + (lang === 'bn' ? bnNum(s.marks.total) : s.marks.total) + '</p></div>');
      parts.push('<div class="item"><label>' + (lang === 'bn' ? 'অধ্যায়' : 'Chapters') + '</label><p>' + (lang === 'bn' ? bnNum(s.chapters.length) : s.chapters.length) + '</p></div>');
      parts.push('</div>');

      /* Chapters */
      parts.push('<div class="sy-chapter-list">');
      for (var j = 0; j < s.chapters.length; j++) {
        var ch = s.chapters[j];
        var numLabel = (lang === 'bn') ? bnNum(j + 1) + '.' : (j + 1) + '.';
        var numClass = (lang === 'bn') ? 'num bn' : 'num';

        parts.push('<div class="sy-chapter">');
        parts.push('<span class="' + numClass + '">' + numLabel + '</span>');
        parts.push('<div class="chapter-body">');
        parts.push('<h4>' + esc(lang === 'bn' ? ch.bn : ch.en) + '</h4>');
        if (ch.topics && ch.topics.length) {
          parts.push('<ul>');
          for (var k = 0; k < ch.topics.length; k++) {
            var t = ch.topics[k];
            parts.push('<li>' + esc(lang === 'bn' ? t.bn : t.en) + '</li>');
          }
          parts.push('</ul>');
        }
        parts.push('</div>');
        parts.push('</div>');
      }
      parts.push('</div>');

      parts.push('</div>');
      parts.push('</details>');
    }

    parts.push('</div>');
    listBox.innerHTML = parts.join('');

    /* Persist open state */
    Array.prototype.forEach.call(listBox.querySelectorAll('.sy-subject'), function (el) {
      el.addEventListener('toggle', function () {
        var key = el.getAttribute('data-key');
        if (el.open) openSubjects[key] = true;
        else delete openSubjects[key];
      });
    });
  }

  function render() {
    renderTabs();
    renderList();
  }

  /* ---------------- Events ---------------- */
  if (printBtn) printBtn.addEventListener('click', function () {
    Array.prototype.forEach.call(listBox.querySelectorAll('.sy-subject'), function (el) { el.open = true; });
    setTimeout(function () { window.print(); }, 60);
  });

  if (expandBtn) expandBtn.addEventListener('click', function () {
    Array.prototype.forEach.call(listBox.querySelectorAll('.sy-subject'), function (el) {
      el.open = true;
      openSubjects[el.getAttribute('data-key')] = true;
    });
  });

  if (collapseBtn) collapseBtn.addEventListener('click', function () {
    Array.prototype.forEach.call(listBox.querySelectorAll('.sy-subject'), function (el) {
      el.open = false;
      delete openSubjects[el.getAttribute('data-key')];
    });
  });

  window.addEventListener('kbuhs:lang', render);

  /* ---------------- GO ---------------- */
  render();
})();