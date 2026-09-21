/* Wikipedia integration — fetches summaries via REST API for whole project */
(function(){
  const CACHE_TTL = 24*60*60*1000; // 24h
  const API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  async function fetchWiki(title, lang='en'){
    const key = `wiki:${lang}:${title}`;
    try{
      const cached = JSON.parse(localStorage.getItem(key)||'null');
      if(cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
    }catch{}
    try{
      const r = await fetch(API + encodeURIComponent(title), {
        headers: {'Api-User-Agent': 'ScientificTafsir/1.0 (https://etside.github.io/quran-science-tafsir/)'}
      });
      if(!r.ok) throw new Error(r.status);
      const data = await r.json();
      const payload = {
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail?.source || null,
        url: data.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${title}`
      };
      localStorage.setItem(key, JSON.stringify({ts: Date.now(), data: payload}));
      return payload;
    }catch(e){
      console.warn('Wiki fetch failed', title, e);
      return null;
    }
  }

  async function renderWikiSurah(n, containerId){
    const title = (window.WIKI_MAP?.surah||{})[n];
    if(!title) return;
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = '<div class="skeleton skeleton-text" style="width:90%"></div><div class="skeleton skeleton-text" style="width:75%"></div>';
    const data = await fetchWiki(title);
    if(!data){ el.innerHTML = `<p class="small">Wikipedia: <a href="https://en.wikipedia.org/wiki/${title}" target="_blank" rel="noopener">View ${title} on Wikipedia →</a></p>`; return; }
    el.innerHTML = `
      <div style="display:flex; gap:12px; align-items:start">
        ${data.thumbnail ? `<img src="${data.thumbnail}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:8px;flex-shrink:0">` : ''}
        <div>
          <b>${data.title}</b>
          <p style="margin:6px 0; color:var(--muted); font-size:0.92rem; line-height:1.6">${data.extract}</p>
          <a href="${data.url}" target="_blank" rel="noopener" style="color:var(--accent2); font-size:0.85rem">Read more on Wikipedia →</a>
        </div>
      </div>
    `;
  }

  async function enhanceScienceCards(){
    document.querySelectorAll('.sci-card').forEach(async card=>{
      const topic = card.querySelector('b')?.textContent?.trim();
      if(!topic) return;
      // Find wiki title for topic
      let wikiTitle = null;
      const sciMap = window.WIKI_MAP?.science || {};
      for(const [k,v] of Object.entries(sciMap)){
        if(topic.toLowerCase().includes(k.toLowerCase())){ wikiTitle=v; break; }
      }
      if(!wikiTitle){
        // Try direct: use topic as title
        wikiTitle = topic.replace(/\s+/g,'_');
      }
      // Avoid duplicate
      if(card.dataset.wikiDone) return;
      card.dataset.wikiDone="1";
      const link = document.createElement('a');
      link.href=`https://en.wikipedia.org/wiki/${wikiTitle}`;
      link.target="_blank"; link.rel="noopener";
      link.style.cssText="display:inline-block; margin-top:6px; font-size:0.78rem; color:var(--accent2);";
      link.textContent="Wikipedia →";
      // Try to fetch summary and show inline on click
      link.addEventListener('click', async (e)=>{
        if(link.dataset.loaded) return;
        e.preventDefault();
        link.textContent="Loading…";
        const data = await fetchWiki(decodeURIComponent(wikiTitle));
        if(data){
          const box=document.createElement('div');
          box.style.cssText="margin-top:8px; padding:8px; background:var(--bg2); border-radius:8px; font-size:0.85rem; line-height:1.6; color:var(--muted);";
          box.innerHTML=`<b>${data.title}</b>: ${data.extract} <a href="${data.url}" target="_blank" rel="noopener" style="color:var(--accent2)">More →</a>`;
          card.appendChild(box);
          link.dataset.loaded="1";
          link.textContent="Wikipedia ✓";
        } else {
          window.open(link.href, '_blank');
        }
      });
      card.appendChild(link);
    });
  }

  // Auto-enhance on load
  function initWiki(){
    // Render surah wiki tab for current chapter
    const m = location.pathname.match(/chapters\/(\d+)\.html/);
    if(m){
      const n=parseInt(m[1]);
      // Find wiki tab container — we will add it via gen_site, but also handle if exists
      const wikiContainer = document.querySelector('[data-kb="wiki-surah"]');
      if(wikiContainer) renderWikiSurah(n, wikiContainer.id || (wikiContainer.id=`wiki-surah-${n}`));
    }
    // Enhance science cards
    setTimeout(enhanceScienceCards, 800);
    document.addEventListener('click', e=>{
      if(e.target.closest('summary')) setTimeout(enhanceScienceCards, 300);
    });
    // Global Wikipedia search in header (if exists)
    const search = document.getElementById('wikiSearch');
    if(search){
      search.addEventListener('keydown', async e=>{
        if(e.key==='Enter'){
          const q=e.target.value.trim();
          if(!q) return;
          const data=await fetchWiki(q);
          const out=document.getElementById('wikiSearchOut');
          if(out && data){
            out.innerHTML=`<b>${data.title}</b>: ${data.extract} <a href="${data.url}" target="_blank">More →</a>`;
            out.style.display='block';
          }
        }
      });
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initWiki);
  else initWiki();

  window.Wiki = {fetchWiki, renderWikiSurah, enhanceScienceCards};
})();
async function wikiSearchSurah(n){
  const q=document.getElementById(`wikiSearch-${n}`)?.value.trim();
  if(!q) return;
  const d=await Wiki.fetchWiki(q);
  const o=document.getElementById(`wikiSearchOut-${n}`);
  if(o&&d){ o.innerHTML=`<b>${d.title}</b>: ${d.extract} <a href='${d.url}' target='_blank'>More →</a>`; o.style.display='block'; }
}
async function wikiSearchGlobal(){
  const q=document.getElementById('wikiSearch')?.value.trim();
  if(!q) return;
  const d=await Wiki.fetchWiki(q);
  const o=document.getElementById('wikiSearchOut');
  if(o&&d){ o.innerHTML=`<b>${d.title}</b>: ${d.extract} <a href='${d.url}' target='_blank'>More →</a>`; o.style.display='block'; }
}
