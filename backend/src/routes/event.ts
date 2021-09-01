import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { CreateEvent } from '../controllers/event.controller';
const router = express.Router();

router.post('/create-event', CreateEvent);

export { router as eventRouter };
