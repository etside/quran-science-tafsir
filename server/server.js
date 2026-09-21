import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import surahRoutes from './routes/surah.js';
import progressRoutes from './routes/progress.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));

// Health
app.get('/health', (req,res)=>res.json({status:'ok', uptime:process.uptime()}));

// API routes - Node.js backend patterns: thin controllers, services do logic
app.use('/api/surah', surahRoutes);
app.use('/api/progress', progressRoutes);

// Static frontend (for production, serve the built site)
app.use(express.static('../', { maxAge: '1d', etag: true }));

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Tafsir API listening on :${PORT} — ${new Date().toISOString()}`));
