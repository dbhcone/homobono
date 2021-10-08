import express from 'express';
import { generalOverview } from '../controllers/statistics.controller';
const router = express.Router();

router.get('/generaloverview', generalOverview);

export { router as statsRouter };
