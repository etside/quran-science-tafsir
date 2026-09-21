# Scientific Tafsir of the Quran — Bilingual (English / বাংলা / العربية) Edition

Live multilingual **English · বাংলা · العربية** website for the three-volume **"Scientific Tafsir of the Quran"** by **Zakaria Kamal**, hosted as a static site on GitHub Pages.

> **Everything is embedded in the site.** All 114 chapters are fully extracted from the three PDFs and machine-translated into Bengali, with English + Bengali shown side by side. No PDF viewer or PDF download is required to read — every page loads instantly.

- The **book text** is presented in **English and Bengali** (Bengali is a machine translation of the English).
- The **website interface and navigation** are fully translated into English, Bengali and Arabic (RTL).
- Surah names are shown in Arabic, English and Bengali throughout.
- The original 3 PDF volumes remain downloadable from each part page.

## Structure

```
index.html                 Home: 3 parts + all 114 chapters (372 paginated read pages)
part1.html · part2.html ·  part3.html      Part overviews (chapter grid + PDF download)
chapters/1.html … 114.html Overviews + chapters/1/read/pageX.html paginated tafsir (25 paras/page)
assets/
  css/style.css            UI + reading styles (427 lines, Swiss)
  js/app.js|tts.js|wiki.js|builder.js  trilingual toggle, TTS (verse-only), deep research, Ghaur o Fikr
  data/chapters.js|surah_knowledge.js|deep_research.js|wiki_map.js|ghaur_ofikr_map.js
  figures/fig_*.jpg        662 figures (pdfimages -png → JPG q78, 109M→22M)
  pdf/part{1..3}.pdf       original volumes (24M)
tafsir.db[.gz]             SQLite (16.9M → 5.3M gz): 7796 paras (EN+BN), 347 words, 114 tafsir, FTS5 search
app/src/main/java/...      Android WebView bridge (Room createFromAsset)
capacitor.config.json      com.etside.quran.tafsir, webDir www
sw.js / manifest.json      PWA offline (CACHE tafsir-v3, stale-while-revalidate)
```

## Contents

| Part | Chapters | PDF volume |
|------|----------|------------|
| Part 1 of 3 | 1 – 9 (Al-Fatihah → At-Tawbah) | `assets/pdf/part1.pdf` (905 pp) |
| Part 2 of 3 | 10 – 30 (Yunus → Ar-Rum) | `assets/pdf/part2.pdf` (825 pp) |
| Part 3 of 3 | 31 – 114 (Luqman → An-Nas) | `assets/pdf/part3.pdf` (848 pp) |

## Features

- **No PDF loading**: paginated reading (`chapters/N/read/pageX.html`, 25 paras/page, 372 pages) — instant, no viewer.
- **Trilingual UI**: one-tap **English · বাংলা · العربية** (full RTL, AR translations via i18n).
- **Side-by-side EN/BN**: all 7796 paras have BN (trans_cache 7796 → tafsir.db FTS5 `রহমত` searchable).
- **Deep research**: `SURAH_KNOWLEDGE` (114) + `DEEP_RESEARCH` (Amud/Nazm, 347 words with Bayyinah roots, Balagha, GaurFikr).
- **Ghaur o Fikr & Wikipedia**: `WIKI_MAP` (138 titles) + `GHAUR_O_FIKR_MAP` (7 curated + generic fallback) via `fetchKnowledgeData()`; `alt_meanings.json` (Pickthall sampler, daily via `update_research.py`).
- **TTS verse-only**: `tts.js` reads only `.verse` (Quranic rule), per-para 🔊, cloud hook `window.TTS_CLOUD_URL`.
- **Kids & Builder**: `Kids` toggle + daily streak, `builder.js` tadabbur picker (localStorage + URL hash).
- **Vocabulary**: 82-word `vocabulary.html` with categories + 5-word quiz (flashcard).
- **Offline PWA + APK**: `sw.js` v3 caches all chapters/read pages/assets (cache-first for jpg/js), `manifest.json`, Capacitor `com.etside.quran.tafsir`, `tafsir.db.gz` embedded via Room, GitHub Release `auto-*` APK (Java 21, 372 pages verified).

## How it was built

1. `pdftotext -layout` → `paras.json` (7796 paras) + `pdfimages -png` → 662 figs (JPG q78).
2. `translate` EN→BN via `clients5.google.com/translate_a/t?client=dict-chrome-ex` (SEP ␟, cached `trans_cache.json` 7796, 3 workers).
3. `gen_site.py` emits 114 overviews + 372 `chapters/N/read/pageX.html` (smart nav) + `vocabulary.html`.
4. `scripts/build_db.py` → `tafsir.db` (VACUUM + gzip, FTS5) → `app/src/main/assets/databases/tafsir.db.gz`.
5. `npx cap add android` (CI generates `android/`, not committed) → `./gradlew assembleDebug` → `auto-*` Release.
6. `scripts/update_research.py --daily` (03:00 UTC, `Daily Research Update` workflow) refreshes `alt_meanings.json` (AlQuran.cloud).

## Development

```bash
python3 -m http.server 8000            # static site
npm run build:db && npm run cap:sync   # rebuild DB + sync to Android
python3 scripts/update_research.py --daily  # refresh alt_meanings.json
```

Notes: `android/` is generated in CI (`npx cap add android`), not committed (see `.gitignore`). Root `package.json` pins `@capacitor/*@6`.

## License

Content: the original book is freely shareable per the author's notice. Bengali translation: machine-generated for convenience. Code: MIT.