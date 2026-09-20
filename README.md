# Scientific Tafsir of the Quran — Bilingual (English / বাংলা / العربية) Edition

Live multilingual **English · বাংলা · العربية** website for the three-volume **"Scientific Tafsir of the Quran"** by **Zakaria Kamal**, hosted as a static site on GitHub Pages.

> **Everything is embedded in the site.** All 114 chapters are fully extracted from the three PDFs and machine-translated into Bengali, with English + Bengali shown side by side. No PDF viewer or PDF download is required to read — every page loads instantly.

- The **book text** is presented in **English and Bengali** (Bengali is a machine translation of the English).
- The **website interface and navigation** are fully translated into English, Bengali and Arabic (RTL).
- Surah names are shown in Arabic, English and Bengali throughout.
- The original 3 PDF volumes remain downloadable from each part page.

## Structure

```
index.html                 Home: 3 parts + all 114 chapters
part1.html · part2.html ·  part3.html      Part overviews (chapter grid + PDF download)
chapters/1.html … 114.html Complete bilingual text of every surah
assets/
  css/style.css            UI + reading styles
  js/app.js                language toggle (en/bn/ar) + i18n
  data/chapters.js         trilingual chapter data (114 surahs)
  pdf/part{1..3}.pdf       original volumes (downloadable)
```

## Contents

| Part | Chapters | PDF volume |
|------|----------|------------|
| Part 1 of 3 | 1 – 9 (Al-Fatihah → At-Tawbah) | `assets/pdf/part1.pdf` (905 pp) |
| Part 2 of 3 | 10 – 30 (Yunus → Ar-Rum) | `assets/pdf/part2.pdf` (825 pp) |
| Part 3 of 3 | 31 – 114 (Luqman → An-Nas) | `assets/pdf/part3.pdf` (848 pp) |

## Features

- **No PDF loading**: each chapter is a plain HTML page containing its full text — instant.
- **Trilingual UI**: one-tap switch between **English, বাংলা, العربية** (full RTL for Arabic).
- **Side-by-side content**: every paragraph exists in both English and Bengali; the language toggle switches the whole reading view.
- **Typography-aware rendering**: Quranic verses, block quotes, section headings and notes are styled distinctly.
- **Chapter navigation**: next/previous links on every surah page; home grid links to all 114.

## How it was built

1. `pdftotext` extracts each volume into clean, structured paragraphs (footers/pagination stripped).
2. The English text is machine-translated to Bengali paragraph-by-paragraph (Google Translate endpoint, cached & resumable).
3. A generator (`/tmp/opencode/gen_site.py`) emits 114 chapter pages + part pages + index.
4. Pushed to GitHub Pages.

## Development

Serve locally with any static server:

```bash
python3 -m http.server 8000
```

## License

Content: the original book is freely shareable per the author's notice. Bengali translation: machine-generated for convenience. Code: MIT.