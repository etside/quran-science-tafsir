/* Universe Animations — lightweight inline visuals for scientific tafsir, Hyperframes-inspired but no render needed */
(function(){
  function createSevenHeavens(container){
    if(!container || container.dataset.animated) return;
    container.dataset.animated="1";
    const wrap=document.createElement('div');
    wrap.style.cssText="height:160px;position:relative;overflow:hidden;background:radial-gradient(ellipse at center, #1a324d 0%, #0d1b2a 70%);border-radius:10px;margin:10px 0;display:flex;align-items:center;justify-content:center";
    wrap.innerHTML=`
      <div style="position:relative;width:160px;height:160px">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="width:14px;height:14px;background:radial-gradient(circle,#d4af37,#8a6d1b);border-radius:50%;box-shadow:0 0 10px #d4af37"></div><div style="position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);font-size:7px;color:#9fb3c8;white-space:nowrap">Earth</div></div>
        ${[60,90,120,150].map((s,i)=>`<div style="position:absolute;left:50%;top:50%;width:${s}px;height:${s}px;border:1px solid rgba(212,175,55,${0.35-i*0.06});border-radius:50%;transform:translate(-50%,-50%) scale(0);animation:pop 0.6s ${0.3+i*0.15}s forwards"></div>`).join('')}
      </div>
      <div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);background:rgba(22,40,59,0.92);border:1px solid #24405c;border-radius:6px;padding:4px 8px;font-size:9px;color:#9fb3c8;white-space:nowrap">7 Samawat — layered cosmos</div>
    `;
    const style=document.createElement('style');
    style.textContent='@keyframes pop{to{transform:translate(-50%,-50%) scale(1)}}';
    wrap.appendChild(style);
    container.appendChild(wrap);
  }
  function createBigBang(container){
    if(!container || container.dataset.animated) return;
    container.dataset.animated="1";
    const wrap=document.createElement('div');
    wrap.style.cssText="height:140px;position:relative;overflow:hidden;background:#0d1b2a;border-radius:10px;margin:10px 0;display:flex;align-items:center;justify-content:center";
    wrap.innerHTML=`
      <div style="width:10px;height:10px;background:#fff;border-radius:50%;box-shadow:0 0 12px #d4af37;animation:pulse 1.2s infinite"></div>
      ${[40,80,120].map((s,i)=>`<div style="position:absolute;width:${s}px;height:${s}px;border:1px solid rgba(212,175,55,${0.5-i*0.12});border-radius:50%;transform:scale(0);animation:expand 1.4s ${0.8+i*0.4}s forwards"></div>`).join('')}
      <div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);background:rgba(22,40,59,0.92);border:1px solid #24405c;border-radius:6px;padding:4px 8px;font-size:9px;color:#e8eef5;text-align:center">21:30 — One mass, then split<br><span style="color:#9fb3c8">Big Bang singularity</span></div>
    `;
    const style=document.createElement('style');
    style.textContent='@keyframes expand{to{transform:scale(1);opacity:0}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}';
    wrap.appendChild(style);
    container.appendChild(wrap);
  }
  function createExpanding(container){
    if(!container || container.dataset.animated) return;
    container.dataset.animated="1";
    const wrap=document.createElement('div');
    wrap.style.cssText="height:140px;position:relative;overflow:hidden;background:radial-gradient(ellipse at center, #132a3e 0%, #0d1b2a 80%);border-radius:10px;margin:10px 0";
    wrap.innerHTML=`
      <svg viewBox="0 0 300 140" style="width:100%;height:100%">
        <defs><radialGradient id="g2" cx="50%" cy="50%"><stop offset="0%" stop-color="#d4af37" stop-opacity="0.9"/><stop offset="100%" stop-color="#d4af37" stop-opacity="0"/></radialGradient></defs>
        <g id="dots"></g>
        <text x="150" y="18" text-anchor="middle" fill="#d4af37" font-size="7" letter-spacing="1">51:47 — We are expanding it</text>
      </svg>
      <div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);background:rgba(22,40,59,0.92);border:1px solid #24405c;border-radius:6px;padding:4px 8px;font-size:9px;color:#9fb3c8">Hubble expansion</div>
    `;
    container.appendChild(wrap);
    const g=wrap.querySelector('#dots');
    for(let i=0;i<12;i++){
      const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
      const a=Math.random()*Math.PI*2, r=20+Math.random()*30;
      c.setAttribute('cx',150+Math.cos(a)*r); c.setAttribute('cy',70+Math.sin(a)*r);
      c.setAttribute('r',2+Math.random()*2); c.setAttribute('fill','url(#g2)');
      g.appendChild(c);
      // animate outward
      setTimeout(()=>{
        c.style.transition='all 2s ease-out';
        c.setAttribute('cx',150+Math.cos(a)*(r*1.8));
        c.setAttribute('cy',70+Math.sin(a)*(r*1.8));
      }, 300+i*80);
    }
  }

  // Auto-inject into science cards based on keywords
  function enhanceScienceCards(){
    document.querySelectorAll('.sci-card').forEach(card=>{
      const text=card.textContent.toLowerCase();
      if(text.includes('seven') || text.includes('samawat') || text.includes('2:29') || text.includes('67:3')){
        if(!card.querySelector('[data-anim="seven"]')){
          const holder=document.createElement('div'); holder.setAttribute('data-anim','seven');
          card.appendChild(holder); createSevenHeavens(holder);
        }
      } else if(text.includes('21:30') || text.includes('big bang') || text.includes('one mass')){
        if(!card.querySelector('[data-anim="bigbang"]')){
          const holder=document.createElement('div'); holder.setAttribute('data-anim','bigbang');
          card.appendChild(holder); createBigBang(holder);
        }
      } else if(text.includes('51:47') || text.includes('expanding') || text.includes('expanding it')){
        if(!card.querySelector('[data-anim="expanding"]')){
          const holder=document.createElement('div'); holder.setAttribute('data-anim','expanding');
          card.appendChild(holder); createExpanding(holder);
        }
      }
    });
  }

  // Also enhance deep research science tabs
  function enhanceDeepScience(){
    document.querySelectorAll('[data-kb="science"], [data-kb="deep-science"]').forEach(el=>{
      // Will be populated by DEEP_RESEARCH, wait a bit then enhance
      setTimeout(enhanceScienceCards, 800);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(()=>{ enhanceScienceCards(); enhanceDeepScience(); }, 800); });
  else setTimeout(()=>{ enhanceScienceCards(); enhanceDeepScience(); }, 800);

  // Re-run when details opened (for lazy-loaded tabs)
  document.addEventListener('click', e=>{
    if(e.target.closest('summary')) setTimeout(enhanceScienceCards, 300);
  });

  window.UniverseAnimations={createSevenHeavens, createBigBang, createExpanding};
})();
