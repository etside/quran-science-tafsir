const I18N = {
  en: {
    tagline: "Bilingual Scientific Tafsir | PDF Edition",
    home: "Home",
    read: "Read Online",
    download: "Download PDF",
    parts: "The Three Parts",
    chaptersTitle: "All 114 Chapters (Surahs)",
    chaptersTitleAr: "",
    footerNote: "Scientific Tafsir of the Quran by Zakaria Kamal. Freely shareable and publishable per the author's notice.",
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
  ar: {
    tagline: "تفسير علمي ثنائي اللغة | النسخة الإلكترونية",
    home: "الرئيسية",
    read: "اقرأ مباشرة",
    download: "تحميل PDF",
    parts: "الأجزاء الثلاثة",
    chaptersTitle: "السور الـ ١١٤",
    chaptersTitleAr: "",
    footerNote: "التفسير العلمي للقرآن الكريم بقلم زكريا كمال. يُسمح بنشره ومشاركته بحرية وفقًا لتنبيه المؤلف.",
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

let lang = localStorage.getItem("quran-lang") || "en";

function t(key) {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), I18N[lang]) || key;
}

function setLang(l, init) {
  lang = l;
  localStorage.setItem("quran-lang", l);
  document.documentElement.lang = l;
  document.body.dir = l === "ar" ? "rtl" : "ltr";
  const sw = document.getElementById("langSwitch");
  if (sw) sw.checked = l === "ar";
  document.body.classList.toggle("ar-mode", l === "ar");
  document.body.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  if (typeof onLangChange === "function" && !init) onLangChange(l);
}

function initLang() {
  const sw = document.getElementById("langSwitch");
  if (sw) {
    sw.addEventListener("change", (e) => setLang(e.target.checked ? "ar" : "en"));
  }
  setLang(lang, true);
  const toggles = document.querySelectorAll("[data-lang-toggle]");
  toggles.forEach((el) => el.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    setLang(btn.getAttribute("data-lang-toggle"));
  }));
}

document.addEventListener("DOMContentLoaded", initLang);