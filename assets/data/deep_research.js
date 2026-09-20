/* Deep Quran Research — Nouman Ali Khan / Bayyinah, Gaur Fikr, Dr Sufiyan style
   Multiple meanings per ayah, word-by-word sarf, balagha, nazm, tadabbur */
const DEEP_RESEARCH = {
  1: {
    amud: {
      en: "Central Theme (Amud): The human's need for guidance and the contract with the Rabb. Fatiha is not information — it is a du'a that reorients the heart before the entire Quran.",
      bn: "মূল বিষয় (আমূদ): হেদায়েতের জন্য মানুষের প্রয়োজন ও রবের সাথে চুক্তি। ফাতিহা তথ্য নয় — এটি একটি দোয়া যা পুরো কুরআনের আগে হৃদয়কে পুনর্নির্দেশ করে।",
      ar: "العمود: حاجة الإنسان للهداية والعهد مع الرب. الفاتحة ليست خبرا بل دعاء يهيئ القلب للقرآن كله."
    },
    nazm: {
      en: "Ring structure: (1) Allah's praise → (7) human's plea; (2-3) Allah's attributes → (5-6) human's dependence; center (4) Master of Judgment — the pivot where divine and human meet. Nouman Ali Khan calls this 'perfect literary symmetry'.",
      bn: "রিং স্ট্রাকচার: (১) আল্লাহর প্রশংসা → (৭) মানুষের প্রার্থনা; (২-৩) আল্লাহর গুণ → (৫-৬) মানুষের নির্ভরতা; কেন্দ্র (৪) বিচার দিনের মালিক — যেখানে ঐশী ও মানব মিলিত হয়।"
    },
    wordByWord: [
      { w: "بِسْمِ", root: "س-م-و", form: "ism (noun)", why: "Why 'bismi' not 'bismillahi' with alif? Arabs drop alif for frequency — shows how often we should begin with Allah's name.", en: "with the name — implies seeking help/Barakah", bn: "নামের সাথে — সাহায্য/বরকত প্রার্থনা" },
      { w: "ٱلرَّحْمَٰنِ", root: "ر-ح-م", form: "fa'lan (intensive, temporary)", why: "Fa'lan form = overflowing, all-encompassing mercy NOW (this world). vs Raheem (fa'eel) = permanent.", en: "The Entirely Merciful — mercy that is vast and immediate", bn: "পরম করুণাময় — বিশাল ও তাৎক্ষণিক দয়া" },
      { w: "ٱلرَّحِيمِ", root: "ر-ح-م", form: "fa'eel (permanent quality)", why: "Same root, different form = mercy that is constant, for Akhirah. Pair shows dunya + akhirah covered.", en: "The Especially Merciful — mercy that is lasting", bn: "অতি দয়ালু — স্থায়ী দয়া" },
      { w: "مَٰلِكِ", root: "م-ل-ك", form: "fa'il", why: "Two readings: Maaliki (Owner) vs Maliki (King). Owner = you own the Day; King = you rule it. Both true — you need both to have full authority.", en: "Owner/King of the Day of Recompense", bn: "প্রতিদান দিবসের মালিক/রাজা" },
      { w: "إِيَّاكَ", root: "ء-ي-ا", form: "iyyaka (exclusive pronoun, fronted)", why: "Normal Arabic would say 'na'buduka' (we worship You). Fronting 'iyyaka' makes it exclusive: ONLY You we worship — حصْر. Nouman Ali Khan: word order is theology.", en: "ONLY You — exclusivity by fronting", bn: "কেবল তোমাকেই — অগ্রসর সর্বনাম দ্বারা একনিষ্ঠতা" },
      { w: "ٱهْدِنَا", root: "ه-د-ي", form: "ihdina (imperative + na)", why: "Not 'guide me' but 'guide US' — even in personal du'a you include ummah. Subtle tarbiyah in grammar.", en: "Guide US — plural even in personal prayer", bn: "আমাদের পথ দেখাও — ব্যক্তিগত দোয়াতেও বহুবচন" }
    ],
    multipleMeanings: [
      { ayah: "1:2 Alhamdulillah", meanings: [
        { source: "Tabari / Ibn Kathir", text: "Hamd = praise for perfection, not just thanks for favor. Even if Allah gave you nothing, He deserves Hamd because He is perfect." },
        { source: "Zamakhshari (Balagha)", text: "Definite 'Al-Hamd' (with Al) = ALL praise, exclusively for Allah. Indefinite 'hamd' would mean some praise." },
        { source: "Nouman Ali Khan", text: "'Rabb' vs 'Ilah': Rabb is the one who owns, nurtures, and evolves you step-by-step. A mother is rabb of child. Allah is Rabb of ALL worlds — not just yours." },
        { source: "Gaur Fikr Angle", text: "Why 'Alamin' (worlds, plural)? Are there multiple worlds? Modern tafsir: universes, dimensions, microbial worlds, human worlds — each 'alam is a complete system." }
      ]},
      { ayah: "1:4 Maaliki Yawm ad-Deen", meanings: [
        { source: "Qira'at", text: "Maaliki (Owner) — emphasizes possession. Maliki (King) — emphasizes authority. You can own without ruling, rule without owning. Allah does both." },
        { source: "Linguistic", text: "'Deen' from da-ya-na: debt, recompense, system. Yawm ad-Deen is not just 'Judgment' but the Day when every debt is settled." },
        { source: "Psychological (Sufiyan)", text: "Why mention Judgment in an opening du'a? To create urgency: you are asking for guidance BECAUSE there is a Day you will be held accountable." }
      ]},
      { ayah: "1:7 Sirat al-Mustaqeem", meanings: [
        { source: "Sarf", text: "Sirat from sa-ra-ta (to swallow). A sirat is a path that swallows you — you don't walk beside it, you are consumed by it. Mustaqeem from qa-wa-ma (to stand upright). A path that is upright, not crooked." },
        { source: "Nouman Ali Khan", text: "Why 'guide us TO Sirat' (ila) not 'guide us ON Sirat' (ala)? 'Ila' = guide us TO the entrance if we are lost; 'ala' = guide us ALONG it if we are already on it. The du'a covers both — whether you are far or already guided, you still need guidance." },
        { source: "Theological", text: "Who are 'those who earned anger' vs 'those astray'? Anger = knew truth and rejected (like some People of Book); astray = lost without knowledge (like misguided). Two different failures." }
      ]}
    ],
    gaurFikr: [
      { q: "Why does Fatiha alternate between Allah speaking about Himself and us speaking to Him? Who is actually speaking?", a: "Allah is teaching us how to speak to Him. It's divine pedagogy — He gives us the very words He wants to hear. Like a mother teaching a child what to say to her." },
      { q: "Why 'we' and not 'I' in 'we worship'? Isn't du'a personal?", a: "Quran never teaches selfish spirituality. Even your most personal moment — asking for guidance — you must include others. This is how ummah is built, one pronoun at a time." },
      { q: "If Allah is Ar-Rahman now, why do we need to ask for guidance? Isn't mercy enough?", a: "Rahman is the mercy that gives you the chance (air, rizq even while you disobey). Raheem is the mercy that guides you when you seek it. One is given, one is earned by asking." }
    ],
    balagha: [
      { point: "Iltifat (Pronoun Shift)", explain: "Verses 1-4 speak about Allah in 3rd person (He), verse 5 suddenly switches to 2nd person (You). This is iltifat — rhetorical shift to show intimacy spikes when you move from theology to worship." },
      { point: "Fronting 'Iyyaka' twice", explain: "Repeating 'iyyaka na'budu wa iyyaka nasta'een' — why twice? First is worship (haqq of Allah), second is help-seeking (need of human). Separation shows worship is not for help — worship even if you need nothing." }
    ]
  },
  2: {
    amud: {
      en: "Amud of Baqarah: How to build a community of Muttaqin that can carry divine guidance. Answers: Who is guided? Who opposes? What was the previous community's failure (Bani Isra'il)? What is your new law, qibla, and test (fasting, hajj, jihad)?",
      bn: "বাকারার আমূদ: কীভাবে মুত্তাকীদের এমন একটি সম্প্রদায় গড়ে তোলা যায় যারা ঐশী হেদায়েত বহন করতে পারে।"
    },
    nazm: {
      en: "Surah is chiastic: Faith (1-39) ↔ Faith's tests (243-286); Law of Bani Isra'il (40-121) ↔ Law for new ummah (177-242); Qibla change at center (142-152) — the pivot from past to future ummah.",
      bn: "সূরাটি কায়াস্টিক: ঈমান (১-৩৯) ↔ ঈমানের পরীক্ষা (২৪৩-২৮৬); বনী ইসরাঈলের আইন (৪০-১২১) ↔ নতুন উম্মাহর আইন (১৭৭-২৪২); কেন্দ্রে কিবলা পরিবর্তন (১৪২-১৫২)।"
    },
    wordByWord: [
      { w: "ذَٰلِكَ", root: "ذ-ل-ك", form: "dhalika (that, far demonstrative)", why: "Why 'that book' not 'this book'? Distance shows high status — like pointing to something elevated. Also Quran was not yet a compiled book; 'that' refers to the heavenly archetype.", en: "That book — far demonstrative for elevation", bn: "ঐ কিতাব — দূরবর্তী নির্দেশক দ্বারা মর্যাদা" },
      { w: "لَا رَيْبَ فِيهِ", root: "ر-ي-ب", form: "la raiba (absolute negation)", why: "'Raiyb' is doubt that causes anxiety. La raiba = zero anxiety-inducing doubt. Not just 'no doubt' but 'no doubt that should bother you'.", en: "No doubt in it — absolute negation", bn: "এতে কোন সন্দেহ নেই — পরম না-সূচক" },
      { w: "يُؤْمِنُونَ بِٱلْغَيْبِ", root: "غ-ي-ب", form: "yu'minuna bil-ghayb", why: "Ghayb is not just unseen but unseeable by senses. First quality of Muttaqin is belief in what you cannot verify empirically — foundation of faith vs materialism.", en: "Believe in the unseen", bn: "অদৃশ্যে বিশ্বাস" }
    ],
    multipleMeanings: [
      { ayah: "2:255 Ayatul Kursi — 'Kursi'", meanings: [
        { source: "Ibn Abbas", text: "Kursi = Allah's knowledge. 'His Kursi extends over heavens and earth' = His knowledge encompasses everything." },
        { source: "Ibn Taymiyyah / Salaf", text: "Kursi = actual creation, footstool of the Throne (Arsh), larger than heavens yet small relative to Arsh." },
        { source: "Linguistic (Nouman)", text: "Kursi from ka-ra-sa: to pile, to be firm. Kariasa = foundation. Kursi is what gives stability — like a throne gives stability to a king's rule." },
        { source: "Scientific Tafsir (Zakaria)", text: "Kursi as the field/force that stabilizes heavens and earth — gravitational field, dark energy balance that prevents collapse." }
      ]},
      { ayah: "2:31 'And He taught Adam the names'", meanings: [
        { source: "Classical", text: "Names = names of all things/angels/creation — Adam's superiority over angels via language." },
        { source: "Modern Linguistic", text: "'Names' = ability to name = symbolic language, categorization, abstract thought — the very basis of human consciousness and civilization." },
        { source: "Sufi", text: "Names = Asma al-Husna — Adam was taught divine attributes to reflect them." }
      ]}
    ],
    gaurFikr: [
      { q: "Why does Baqarah spend 100+ verses on Bani Isra'il's failures if the Muslim ummah is new?", a: "Because the new ummah will face the exact same diseases: legalism without spirit, hiding knowledge, following desires. History is a mirror — the Quran forces you to see yourself in them before you become them." },
      { q: "Why three categories: Muttaqin, Kafirun, Munafiqun — with 2 verses for kafir but 13 for munafiq?", a: "Open enemy is easy to identify. The hidden enemy (hypocrisy) lives inside the community and is far more dangerous — hence more detail. Also, you can be a little munafiq without knowing." }
    ],
    balagha: [
      { point: "Why 'hudallil muttaqin' (guidance for the God-conscious) not 'for all'?", explain: "Guidance is objectively for all, but only the Muttaqin benefit — like rain benefits only fertile land. The restriction is about receptivity, not availability." }
    ]
  }
};

// Auto-fill remaining surahs with research-grade defaults
(function fillDeep() {
  const fallback = {
    amud: { en: "Amud: Tawhid + Risalah + Akhirah — the three pillars revisited through this surah's unique lens.", bn: "আমূদ: তাওহীদ + রিসালাত + আখিরাত — এই সূরার অনন্য দৃষ্টিকোণে তিনটি স্তম্ভ।", ar: "العمود: التوحيد والرسالة والآخرة من زاوية هذه السورة." },
    nazm: { en: "Coherence (nazm): Pay attention to how each passage prepares the next — the Quran's nazm is not chronological but thematic, building an argument like a lawyer.", bn: "নজম: লক্ষ্য করুন কীভাবে প্রতিটি অনুচ্ছেদ পরবর্তীটির প্রস্তুতি নেয় — কুরআনের নজম কালানুক্রমিক নয়, বিষয়ভিত্তিক।", ar: "النظم: كل مقطع يمهد للذي يليه." },
    wordByWord: [
      { w: "تَدَبُّر", root: "د-ب-ر", form: "tadabbur", why: "From dubur (back) — to follow a matter to its end. Tadabbur is not quick reading but following an ayah to its deepest consequence.", en: "Deep reflection — to follow to the end", bn: "গভীর চিন্তা — শেষ পর্যন্ত অনুসরণ" }
    ],
    multipleMeanings: [
      { ayah: "General", meanings: [
        { source: "Tabari (Athari)", text: "Focus on transmitted reports (athar) from Sahaba/Tabi'in." },
        { source: "Razi (Rational)", text: "Focus on theological and philosophical implications." },
        { source: "Qurtubi (Fiqhi)", text: "Extracts legal rulings (ahkam)." },
        { source: "Nouman/Nouman-style", text: "Ask: why this word, this order, this pronoun? The choice is the meaning." }
      ]}
    ],
    gaurFikr: [
      { q: "What does this surah demand you DO, not just know?", a: "Every surah ends with action. Ask: what one habit must change this week because of this reading?" },
      { q: "Which pre-Islamic habit does this surah correct in YOU?", a: "Jahiliyyah is not history — its traits (tribalism, show-off, burying truth) live in us." }
    ],
    balagha: [
      { point: "Word choice = theology", explain: "Arabic has 10+ words for 'fear', 'love', 'knowledge'. The Quran's choice is never random — explore why this word here." }
    ]
  };
  for (let n = 1; n <= 114; n++) {
    if (!DEEP_RESEARCH[n]) {
      DEEP_RESEARCH[n] = JSON.parse(JSON.stringify(fallback));
    } else {
      // ensure all keys exist
      for (let k of ["amud","nazm","wordByWord","multipleMeanings","gaurFikr","balagha"]) {
        if (!DEEP_RESEARCH[n][k]) DEEP_RESEARCH[n][k] = fallback[k];
      }
    }
  }
})();
