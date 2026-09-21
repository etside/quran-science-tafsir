import { Router } from 'express';
import * as ctrl from '../controllers/surahController.js';
const r = Router();
r.get('/', ctrl.list);
r.get('/:id', ctrl.getOne);
r.get('/:id/ayah/:ayahId', ctrl.getAyah);
export default r;