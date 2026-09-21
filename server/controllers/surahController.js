import * as service from '../services/surahService.js';
export async function list(req,res,next){
  try{
    const data = await service.listSurahs();
    res.json({count: data.length, data});
  }catch(e){ next(e); }
}
export async function getOne(req,res,next){
  try{
    const id = parseInt(req.params.id);
    if(isNaN(id)||id<1||id>114) return res.status(400).json({error:'Invalid surah id'});
    const data = await service.getSurah(id);
    if(!data) return res.status(404).json({error:'Surah not found'});
    res.json(data);
  }catch(e){ next(e); }
}
export async function getAyah(req,res,next){
  try{
    const id=parseInt(req.params.id), ayah=parseInt(req.params.ayahId);
    const data=await service.getAyah(id, ayah);
    if(!data) return res.status(404).json({error:'Ayah not found'});
    res.json(data);
  }catch(e){ next(e); }
}
