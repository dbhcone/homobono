import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { CreateEvent, FetchAllEvents } from '../controllers/event.controller';
import { photograph } from '../validators/shared.validations';
const router = express.Router();

router.post('/create-event', photograph.single('flyer'), CreateEvent);

router.get('/', FetchAllEvents)

export { router as eventRouter };
