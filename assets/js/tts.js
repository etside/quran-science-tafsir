/* TTS Engine — Web Speech API wrapper with multi-voice, per-paragraph highlight, and cloud-API hook */
(function () {
  const TTS = {
    synth: window.speechSynthesis,
    voice: null,
    voices: [],
    queue: [],
    idx: 0,
    playing: false,
    paused: false,
    rate: 1,
    langPref: null, // 'en' | 'bn' | 'ar'
    onHl: null,
  };

  function refreshVoices() {
    TTS.voices = TTS.synth.getVoices();
    // prefer native voices that match current page lang
    const pref = document.documentElement.lang || TTS.langPref || 'en';
    let pick = TTS.voices.find(v => v.lang.toLowerCase().startsWith(pref.toLowerCase()));
    if (!pick) pick = TTS.voices.find(v => v.default) || TTS.voices[0] || null;
    TTS.voice = pick;
    populateVoiceSelect();
  }
  if (TTS.synth) {
    refreshVoices();
    if (TTS.synth.onvoiceschanged !== undefined) TTS.synth.onvoiceschanged = refreshVoices;
  }

  function populateVoiceSelect() {
    const sel = document.getElementById('ttsVoice');
    if (!sel || !TTS.voices.length) return;
    const cur = sel.value;
    sel.innerHTML = '';
    TTS.voices.forEach((v, i) => {
      const o = document.createElement('option');
      o.value = i;
      o.textContent = `${v.name} (${v.lang})${v.default ? ' — default' : ''}`;
      sel.appendChild(o);
    });
    // restore or auto-select best for current lang
    const prefIdx = TTS.voices.findIndex(v => v === TTS.voice);
    sel.value = cur || (prefIdx >= 0 ? String(prefIdx) : '0');
  }

  function pickLangForText(text) {
    // if page lang is bn, prefer bn voice; else en
    const pageLang = document.documentElement.lang;
    if (pageLang === 'bn') return 'bn-BD';
    if (pageLang === 'ar') return 'ar-SA';
    return 'en-US';
  }

  function buildQueue() {
    // ONLY surah verses + translations — ignore tafsir, headings, quotes, notes, etc.
    // Quranic rules: audio must not read anything except the surah text and its translation
    const isBn = document.body.classList.contains('lang-bn');
    const sel = isBn ? '.ch-body .verse.c-bn' : '.ch-body .verse.c-en';
    let nodes = Array.from(document.querySelectorAll(sel)).filter(n => {
      const t = n.textContent.trim();
      // Must look like a verse: starts with [number] or contains Arabic, and length > 3
      return t.length > 3 && (t.startsWith('[') || /[\u0600-\u06FF]/.test(t) || t.length > 12);
    });
    // Fallback: if no verse-marked nodes (extraction edge case), take only first 3 verse-like blocks
    if (!nodes.length) {
      const all = Array.from(document.querySelectorAll(isBn ? '.ch-body .c-bn' : '.ch-body .c-en'));
      nodes = all.filter(n => n.textContent.trim().startsWith('[')).slice(0, 20);
    }
    TTS.queue = nodes.map(n => {
      // Clean: remove the para-tts button text (🔈) if present
      let text = n.textContent.replace('🔈','').trim().replace(/\s+/g, ' ');
      // Remove leading [n] numbers for smoother speech? Keep them as "Ayah 1:"
      text = text.replace(/^\[(\d+)\]\s*/, 'Ayah $1: ');
      return { el: n, text };
    }).filter(x => x.text.length > 8);
  }

  function speakNext() {
    if (TTS.idx >= TTS.queue.length) { stopHl(); setState('stopped'); return; }
    const item = TTS.queue[TTS.idx];
    hl(item.el);
    const u = new SpeechSynthesisUtterance(item.text);
    const sel = document.getElementById('ttsVoice');
    if (sel && TTS.voices[sel.value]) TTS.voice = TTS.voices[sel.value];
    if (TTS.voice) u.voice = TTS.voice;
    const langSel = document.getElementById('ttsLang');
    const wantLang = langSel ? langSel.value : pickLangForText(item.text);
    u.lang = wantLang;
    const rateSel = document.getElementById('ttsRate');
    u.rate = rateSel ? parseFloat(rateSel.value) : TTS.rate;
    u.onend = () => { TTS.idx++; speakNext(); };
    u.onerror = () => { TTS.idx++; speakNext(); };
    TTS.synth.speak(u);
  }

  function hl(el) {
    document.querySelectorAll('.tts-hl').forEach(x => x.classList.remove('tts-hl'));
    if (el) { el.classList.add('tts-hl'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  }
  function stopHl() { document.querySelectorAll('.tts-hl').forEach(x => x.classList.remove('tts-hl')); }

  function setState(s) {
    const btn = document.getElementById('ttsPlay');
    const st = document.getElementById('ttsState');
    if (s === 'playing') { if (btn) btn.textContent = '⏸ Pause'; if (st) st.textContent = `Playing ${TTS.idx + 1}/${TTS.queue.length}`; }
    else if (s === 'paused') { if (btn) btn.textContent = '▶ Resume'; if (st) st.textContent = 'Paused'; }
    else { if (btn) btn.textContent = '▶ Play Audio'; if (st) st.textContent = 'Ready'; TTS.playing = false; TTS.paused = false; }
  }

  window.TTSPlay = function () {
    if (!TTS.synth) { alert('Text-to-Speech not supported in this browser. Try Chrome/Edge on desktop or Android.'); return; }
    if (TTS.playing && !TTS.paused) { TTS.synth.pause(); TTS.paused = true; setState('paused'); return; }
    if (TTS.paused) { TTS.synth.resume(); TTS.paused = false; setState('playing'); return; }
    buildQueue();
    if (!TTS.queue.length) { alert('No readable text found.'); return; }
    TTS.idx = 0; TTS.playing = true; TTS.paused = false; setState('playing'); speakNext();
  };
  window.TTSStop = function () {
    if (!TTS.synth) return;
    TTS.synth.cancel(); TTS.idx = 0; stopHl(); setState('stopped');
  };
  window.TTSPlayPara = function (el) {
    if (!TTS.synth) return;
    TTS.synth.cancel(); stopHl();
    const isBn = document.body.classList.contains('lang-bn');
    // if el is a c-en/c-bn block, speak just that one
    const text = el.textContent.trim();
    hl(el);
    const u = new SpeechSynthesisUtterance(text);
    const sel = document.getElementById('ttsVoice');
    if (sel && TTS.voices[sel.value]) u.voice = TTS.voices[sel.value];
    else if (TTS.voice) u.voice = TTS.voice;
    const langSel = document.getElementById('ttsLang');
    u.lang = langSel ? langSel.value : pickLangForText(text);
    const rateSel = document.getElementById('ttsRate');
    u.rate = rateSel ? parseFloat(rateSel.value) : TTS.rate;
    u.onend = () => stopHl();
    TTS.synth.speak(u);
  };

  // cloud API hook — override window.TTSCloudSpeak(text, lang) to use your own TTS endpoint
  // Example: set window.TTS_CLOUD_URL = "https://your-tts.example.com/speak"
  window.TTSCloudSpeak = async function (text, lang) {
    const url = window.TTS_CLOUD_URL;
    if (!url) return false; // fall back to Web Speech
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, lang }) });
      if (!r.ok) return false;
      const blob = await r.blob();
      const au = new Audio(URL.createObjectURL(blob));
      au.play();
      return true;
    } catch { return false; }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const rate = document.getElementById('ttsRate');
    if (rate) rate.addEventListener('input', e => { document.getElementById('ttsRateVal').textContent = e.target.value + '×'; });
  });
})();
