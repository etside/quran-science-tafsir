import { Router } from 'express';
const r = Router();
const store = new Map(); // In production, use Redis/DB
r.get('/:userId', (req,res)=>{
  const data = store.get(req.params.userId) || {visited:[], streak:0};
  res.json(data);
});
r.post('/:userId', (req,res)=>{
  const {visited, streak} = req.body;
  if(!Array.isArray(visited)) return res.status(400).json({error:'visited must be array'});
  store.set(req.params.userId, {visited, streak: streak||0, updatedAt: new Date().toISOString()});
  res.json({ok:true});
});
export default r;