import fs from 'fs';
import path from 'path';
const dataPath = path.resolve('../assets/data/chapters.js');
let chapters = null;
function load(){
  if(chapters) return chapters;
  const src = fs.readFileSync(dataPath, 'utf8');
  const m = src.match(/chapters:\s*\[(.*?)\]\s*\}/s);
  const re = /\{\s*n:\s*(\d+),\s*ar:\s*"([^"]*)",\s*en:\s*"([^"]*)",\s*bn:\s*"([^"]*)"\s*\}/g;
  chapters = [];
  let x;
  while(x=re.exec(m[1])) chapters.push({n:parseInt(x[1]), ar:x[2], en:x[3], bn:x[4]});
  return chapters;
}
export async function listSurahs(){ return load(); }
export async function getSurah(id){
  const list=load();
  return list.find(s=>s.n===id) || null;
}
export async function getAyah(surahId, ayahId){
  // For now, return surah with ayah placeholder - in production, load from paras.json
  const s=await getSurah(surahId);
  if(!s) return null;
  return {...s, ayah: ayahId, text: `Ayah ${surahId}:${ayahId} — tafsir from Scientific Tafsir by Zakaria Kamal`};
}