# Adding Knowledge — Ghaur o Fikr & Bayyinah Guide

This project consolidates local JSON, WIKI_MAP, Ghaur o Fikr, and Bayyinah via `fetchKnowledgeData(surahNumber)` in `assets/js/wiki.js`.

## 1. Ghaur o Fikr (Dr. Sufyan — YouTube)

**File:** `assets/data/ghaur_ofikr_map.js` — `const GHAUR_O_FIKR_MAP = { 2: [...] }`

**Schema:**
```js
GHAUR_O_FIKR_MAP[surahNumber] = [
  {
    ayah: "2:29", // or "2:29-31"
    title: "Seven Heavens — Layered Universe", // display title
    youtubeId: "dQw4w9WgXcQ", // YouTube video ID (from URL ?v=ID)
    timestamp: 120, // seconds, optional
    topic: "Seven samawat & cosmology" // for Science tab matching
  }
]
```

**To add:**
1. Find the YouTube video in [Dr. Sufyan's Ghaur o Fikr playlist](https://www.youtube.com/playlist?list=PL) — copy URL `https://www.youtube.com/watch?v=VIDEO_ID&t=123s`
2. Extract `VIDEO_ID` and `t` (timestamp)
3. Add entry to `GHAUR_O_FIKR_MAP[surahNumber]` array
4. Commit and push — no rebuild needed (JS loads at runtime). If you add a new surah key, it will auto-appear in `Science References → Ghaur o Fikr` and the standalone `Ghaur o Fikr — Deep Contemplation` accordion.

**Example for Surah 2, Ayah 255:**
```js
{ ayah: "2:255", title: "Ayatul Kursi — Throne & Knowledge", youtubeId: "abc123", timestamp: 560, topic: "Kursi as knowledge" }
```

## 2. Bayyinah (Nouman Ali Khan — Root Analysis)

**File:** `assets/data/deep_research.js` — `DEEP_RESEARCH[surah].wordByWord[]`

**Schema (per word):**
```js
{
  w: "ٱلرَّحْمَٰنِ", // Arabic
  tr: "Ar-Rahman", // transliteration
  root: "ر-ح-م",
  form: "fa'lan (intensive)",
  why: "Fa'lan = overflowing, immediate (dunya) vs fa'eel = permanent (akhirah)",
  en: "The Entirely Merciful — mercy that is vast and immediate",
  bn: "পরম করুণাময় — বিশাল ও তাৎক্ষণিক দয়া",
  // NEW Bayyinah fields:
  root_analysis: {
    root: "ر-ح-م",
    pattern: "fa'lan",
    corpus_ref: "https://corpus.quran.com/wordbyword.jsp?chapter=1&verse=1#1:1",
    bayyinah_note: "Bayyinah: Ar-Rahman vs Ar-Rahim — fa'lan (temporary, vast) vs fa'eel (permanent). See Divine Speech."
  },
  alternative_meanings: [
    {source: "Bayyinah / Nouman Ali Khan", meaning: "Linguistic: ...", evidence: "Divine Speech"},
    {source: "Corpus Quran", meaning: "Morphology: ...", evidence: "corpus.quran.com"},
    {source: "Scientific Tafsir", meaning: "...", evidence: "Zakaria Kamal"}
  ]
}
```

**To add:**
1. Use [Bayyinah App](https://bayyinah.com) or `Divine Speech` book, or [Quranic Arabic Corpus](https://corpus.quran.com) for `root`, `pattern`, `corpus_ref`
2. Add `root_analysis` and `alternative_meanings` to the word's entry in `deep_research.js`
3. The `Word-by-Word` accordion will automatically render them as `Bayyinah Root Analysis` + `Alternative Meanings` list (with fallback `No additional linguistic analysis available` if missing, via `deep.wordByWord` length check)

## 3. Data Pipeline (fetchKnowledgeData)

**Location:** `assets/js/wiki.js` — `async function fetchKnowledgeData(surahNumber)`

```js
async function fetchKnowledgeData(n){
  return {
    wiki: await fetchWiki(WIKI_MAP.surah[n]),
    deep: DEEP_RESEARCH[n],
    know: SURAH_KNOWLEDGE[n],
    ghaur: GHAUR_O_FIKR_MAP[n] || [],
    bayyinah: DEEP_RESEARCH[n].wordByWord.filter(w=>w.root_analysis).map(...)
  };
}
```

- Consolidates `local JSON` + `WIKI_MAP` + `GHAUR_O_FIKR_MAP` + `Bayyinah` fields + `corpus.quran.com` refs
- Handles missing gracefully: `if(!deep || !deep.wordByWord) show "No additional linguistic analysis available"`
- Called on `DOMContentLoaded` for current `chapters/N.html` and on `builder` interaction

## 4. UI

- **Science References:** Now has sub-section `Ghaur o Fikr — Deep Contemplation` with YouTube cards (thumbnail, title, ayah, timestamp link)
- **Word-by-Word:** Each `wbw-card` now shows `Bayyinah Root Analysis` (with Corpus link) + `Alternative Meanings` list
- All accordions use premium SVG (no emoji), skeletons while loading, and `Reload` → `fetchKnowledgeData(n)` (not just `location.reload()`)

**To test:** Open `chapters/2.html`, expand `Word-by-Word`, check for Bayyinah notes; expand `Science References` → `Ghaur o Fikr` → should show 3 YouTube cards for 2:29, 2:31, 2:255.
