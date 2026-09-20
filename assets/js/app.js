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

document.addEventListener("DOMContentLoaded", initLang);