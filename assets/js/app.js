const I18N = {
  en: {
    tagline: "Bilingual Scientific Tafsir",
    home: "Home",
    read: "Read Online",
    download: "Download PDF",
    parts: "The Three Parts",
    chaptersTitle: "All 114 Chapters (Surahs)",
    footerNote: "Scientific Tafsir of the Quran by Zakaria Kamal. Freely shareable and publishable per the author's notice.",
    note: "The book text is in English; the site interface is available in English, বাংলা and العربية.",
    reader: {
      back: "All Parts",
      chapters: "Chapters in this part",
      page: "Page",
      of: "of",
      prev: "Previous",
      next: "Next",
      first: "First",
      last: "Last",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      search: "Search in PDF…",
      noResults: "No matches found",
      loading: "Loading PDF…"
    }
  },
  bn: {
    tagline: "দ্বিভাষিক বৈজ্ঞানিক তাফসির",
    home: "প্রথম পাতা",
    read: "অনলাইনে পড়ুন",
    download: "PDF ডাউনলোড",
    parts: "তিনটি অংশ",
    chaptersTitle: "সব ১১৪টি সূরা",
    footerNote: "জাকারিয়া কামাল রচিত আল-কুরআনের বৈজ্ঞানিক তাফসির। লেখকের বিজ্ঞপ্তি অনুযায়ী অবাধে শেয়ার ও প্রকাশযোগ্য।",
    note: "বইয়ের মূল লেখা ইংরেজিতে; সাইটের ইন্টারফেস ইংরেজি, বাংলা ও আরবিতে উপলব্ধ।",
    reader: {
      back: "সব অংশ",
      chapters: "এই অংশের সূরাসমূহ",
      page: "পৃষ্ঠা",
      of: "এর মধ্যে",
      prev: "আগের",
      next: "পরের",
      first: "প্রথম",
      last: "শেষ",
      zoomIn: "বড় করুন",
      zoomOut: "ছোট করুন",
      search: "PDF-এ খুঁজুন…",
      noResults: "কোনো ফলাফল পাওয়া যায়নি",
      loading: "PDF লোড হচ্ছে…"
    }
  },
  ar: {
    tagline: "تفسير علمي ثنائي اللغة",
    home: "الرئيسية",
    read: "اقرأ مباشرة",
    download: "تحميل PDF",
    parts: "الأجزاء الثلاثة",
    chaptersTitle: "السور الـ ١١٤",
    footerNote: "التفسير العلمي للقرآن الكريم بقلم زكريا كمال. يُسمح بنشره ومشاركته بحرية وفقًا لتنبيه المؤلف.",
    note: "نص الكتاب بالإنجليزية؛ وواجهة الموقع متاحة بالإنجليزية والبنغالية والعربية.",
    reader: {
      back: "جميع الأجزاء",
      chapters: "سور هذا الجزء",
      page: "الصفحة",
      of: "من",
      prev: "السابق",
      next: "التالي",
      first: "الأولى",
      last: "الأخيرة",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      search: "ابحث في الملف…",
      noResults: "لا توجد نتائج",
      loading: "جارٍ تحميل الملف…"
    }
  }
};

const LANGS = ["en", "bn", "ar"];
const LANG_LABEL = { en: "English", bn: "বাংলা", ar: "العربية" };
let lang = localStorage.getItem("quran-lang") || "en";
if (!LANGS.includes(lang)) lang = "en";

function t(key) {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), I18N[lang]) || key;
}

function setLang(l, init) {
  lang = l;
  localStorage.setItem("quran-lang", l);
  document.documentElement.lang = l;
  document.body.dir = l === "ar" ? "rtl" : "ltr";
  document.body.className = (document.body.className || "").replace(/\slang-[a-z]{2}/g, "") + " lang-" + l;
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === l);
  });
  document.body.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.body.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-ph"));
  });
  if (typeof onLangChange === "function" && !init) onLangChange(l);
}

function initLang() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
  setLang(lang, true);
}

// --- eTarabic-inspired: streak, progress, today, kids, offline ---
function updateStreak(){
  const k='tafsir-streak', d='tafsir-last';
  const today=new Date().toISOString().slice(0,10);
  const last=localStorage.getItem(d);
  let streak=parseInt(localStorage.getItem(k)||'0');
  if(last!==today){
    const y=new Date(Date.now()-86400000).toISOString().slice(0,10);
    streak = (last===y) ? streak+1 : 1;
    localStorage.setItem(k, streak);
    localStorage.setItem(d, today);
  }
  const el=document.getElementById('streakCount');
  if(el) el.textContent=streak;
}
function updateProgress(){
  const visited = JSON.parse(localStorage.getItem('tafsir-visited')||'[]');
  const m=location.pathname.match(/chapters\/(\d+)\.html/);
  if(m){
    const n=parseInt(m[1]);
    if(!visited.includes(n)){ visited.push(n); localStorage.setItem('tafsir-visited', JSON.stringify(visited)); }
  }
  const pct=Math.round(visited.length/114*100);
  const bar=document.getElementById('progressBar');
  const txt=document.getElementById('progressText');
  const pctEl=document.getElementById('progressPct');
  if(bar) bar.style.width=pct+'%';
  if(txt) txt.textContent=visited.length+'/114';
  if(pctEl) pctEl.textContent=pct+'%';
}
function setupKids(){
  const btn=document.getElementById('kidsToggle')||document.getElementById('kidsToggle2');
  const saved=localStorage.getItem('tafsir-kids')==='1';
  if(saved) document.body.classList.add('kids');
  if(btn) btn.addEventListener('click',()=>{
    document.body.classList.toggle('kids');
    const on=document.body.classList.contains('kids');
    localStorage.setItem('tafsir-kids', on?'1':'0');
    btn.textContent = on ? '📖 Normal' : '🧒 Kids';
  });
}
function setupToday(){
  const ayahs=[
    {ar:'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', bn:'“পড়ো তোমার রবের নামে, যিনি সৃষ্টি করেছেন।” — সূরা আল-আলাক ৯৬:১', link:'chapters/96.html'},
    {ar:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', bn:'“পরম করুণাময় দয়ালুর নামে।” — সূরা ফাতিহা ১:১', link:'chapters/1.html'},
    {ar:'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا', bn:'“যে আল্লাহকে ভয় করে, তিনি তার জন্য পথ খুলে দেন।” — তালাক ৬৫:২', link:'chapters/65.html'},
    {ar:'رَبِّ زِدْنِي عِلْمًا', bn:'“হে আমার রব, আমার জ্ঞান বাড়িয়ে দিন।” — ত্বহা ২০:১১৪', link:'chapters/20.html'},
    {ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا', bn:'“নিশ্চয় কষ্টের সাথে স্বস্তি আছে।” — ইনশিরাহ ৯৪:৬', link:'chapters/94.html'}
  ];
  const day=new Date().getDate();
  const a=ayahs[day % ayahs.length];
  const elA=document.getElementById('todayAyah');
  const elT=document.getElementById('todayTrans');
  const elL=document.getElementById('todayLink');
  if(elA) elA.textContent=a.ar;
  if(elT) elT.textContent=a.bn;
  if(elL) elL.href=a.link;
}

document.addEventListener("DOMContentLoaded", ()=>{
  // initLang already handled above, but ensure once
  try{ initLang(); }catch{}
  updateStreak();
  updateProgress();
  setupKids();
  setupToday();
  if('serviceWorker' in navigator && !location.pathname.includes('sw.js')){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
});