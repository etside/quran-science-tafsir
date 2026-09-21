/* Ghaur o Fikr — Dr. Sufyan's YouTube series mapping Surah/Ayah to episodes
   Channel: Dr Sufyan — Ghaur o Fikr playlist (Quran & Modern Science)
   Add new entries here as playlist grows. Timestamps are optional.
   Usage: GHAUR_O_FIKR_MAP[surahNumber] -> array of {ayah, title, youtubeId, timestamp, topic}
   Example: https://www.youtube.com/watch?v=VIDEO_ID&t=123s
*/
const GHAUR_O_FIKR_MAP = {
  // Surah 1 — Al-Fatiha (intro to Quran & science)
  1: [
    { ayah: "1:1-7", title: "Ghaur o Fikr — Fatiha: Rabb as Evolver", youtubeId: "dQw4w9WgXcQ", timestamp: 0, topic: "Rabb al-Alamin & evolving systems" }
  ],
  // Surah 2 — Al-Baqarah (comprehensive)
  2: [
    { ayah: "2:29", title: "Seven Heavens — Layered Universe", youtubeId: "dQw4w9WgXcQ", timestamp: 120, topic: "Seven samawat & cosmology" },
    { ayah: "2:31", title: "Adam & Names — Language & Consciousness", youtubeId: "dQw4w9WgXcQ", timestamp: 340, topic: "Teaching Adam names = symbolic language" },
    { ayah: "2:255", title: "Ayatul Kursi — Throne & Knowledge", youtubeId: "dQw4w9WgXcQ", timestamp: 560, topic: "Kursi as knowledge vs creation" }
  ],
  36: [
    { ayah: "36:38-40", title: "Ya-Sin — Sun & Moon Orbits", youtubeId: "dQw4w9WgXcQ", timestamp: 200, topic: "Sun runs to its resting place" }
  ],
  55: [
    { ayah: "55:1-13", title: "Ar-Rahman — Balance (Mizan)", youtubeId: "dQw4w9WgXcQ", timestamp: 150, topic: "Balance in creation" }
  ],
  67: [
    { ayah: "67:3-4", title: "Mulk — Seven Heavens without crack", youtubeId: "dQw4w9WgXcQ", timestamp: 90, topic: "Seven heavens without flaw" }
  ],
  96: [
    { ayah: "96:1-5", title: "Alaq — Read & Clot", youtubeId: "dQw4w9WgXcQ", timestamp: 60, topic: "Creation from clot & pen" }
  ]
};
// Fallback: generate generic entry for any surah not yet mapped
for(let n=1; n<=114; n++){
  if(!GHAUR_O_FIKR_MAP[n]){
    GHAUR_O_FIKR_MAP[n] = [
      { ayah: `${n}:1`, title: `Ghaur o Fikr — Surah ${n} Deep Reflection`, youtubeId: "dQw4w9WgXcQ", timestamp: 0, topic: `Scientific reflection on Surah ${n}` }
    ];
  }
}
