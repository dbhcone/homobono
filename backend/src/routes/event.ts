import express from 'express';
import {
  create, read, update, _delete, readOne, readPricings, createPricing
} from '../controllers/event.controller';
import { photograph } from '../validators/shared.validations';
const router = express.Router();

router.post('/', photograph.single('flyer'), create);
router.get('/', read);
router.get('/:eventId', readOne);
router.patch('/:eventId', update);
router.delete('/:eventId', _delete);

// pricings
router.get('/pricings/:eventId', readPricings);
router.post('/pricings/:eventId', createPricing);

export { router as eventsRouter };
