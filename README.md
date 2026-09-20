# Scientific Tafsir of the Quran — Bilingual (English / বাংলা / العربية) Edition

Live multilingual **English · বাংলা · العربية** website for the three-volume **"Scientific Tafsir of the Quran"** by **Zakaria Kamal**, hosted as a static site on GitHub Pages.

- The **book text** is in English (with Arabic Quranic terms).
- The **website interface and navigation** are fully translated into English, Bengali and Arabic (RTL).
- Surah names are shown in Arabic, English and Bengali throughout.

## Contents

| Part | Chapters | PDF pages | File |
|------|----------|-----------|------|
| Part 1 of 3 | 1 – 9 (Al-Fatihah → At-Tawbah) | 905 | `assets/pdf/part1.pdf` |
| Part 2 of 3 | 10 – 30 (Yunus → Ar-Rum) | 825 | `assets/pdf/part2.pdf` |
| Part 3 of 3 | 31 – 114 (Luqman → An-Nas) | 848 | `assets/pdf/part3.pdf` |

## Features

- **Trilingual UI**: one-tap switch between **English, বাংলা, العربية** (full RTL support for Arabic) on every page.
- **Bilingual everywhere**: hero, card titles, chapter lists and surah names are shown in English + Bengali side by side.
- **Fast online reader**: PDF.js streams pages over HTTP range requests (GitHub Pages returns `206`), renders at capped device-pixel ratio for speed on phones, shows a live download-progress bar.
- **Structured navigation**: sidebar with all 114 surahs (Arabic + English + Bengali names), pre-mapped to their start pages in each volume.
- **Search**: full-text search inside any PDF volume.
- **Jump to page / zoom / keyboard navigation** (← → arrows, +/- zoom).
- **Download**: each volume downloadable directly from the reader toolbar.

## URLs

- Root: `https://etside.github.io/<repo>/`
- Part 1: `/part1.html`, Part 2: `/part2.html`, Part 3: `/part3.html`

## Source PDFs

The three PDFs were authored as Microsoft Word documents by Zakaria Kamal. Per the author's notice inside each book, anyone may print, publish, distribute, translate, and reuse the material without permission.

## Development

Static site only — no build step.

```
assets/
  css/style.css        UI styles
  js/app.js            language toggle (en/bn/ar) + i18n
  js/reader.js         PDF.js viewer, search & chapter jumps
  js/pdf.min.js        PDF.js library (self-hosted)
  js/pdf.worker.min.js PDF.js worker (self-hosted)
  pdf/part{1..3}.pdf   original volumes
  data/chapters.js     trilingual chapter data (114 surahs)
```

Serve locally:

```bash
python3 -m http.server 8000
```

## License

Content: freely shareable per the author's notice. Code: MIT.