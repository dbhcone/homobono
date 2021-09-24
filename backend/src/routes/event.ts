import express from 'express';
import {
  create, read, update, _delete, readOne, readPricings, createPricing, updatePricing, readPricingDetails
} from '../controllers/event.controller';
import { photograph } from '../validators/shared.validations';
const router = express.Router();

router.post('/', photograph.single('flyer'), create);
router.get('/', read);
router.get('/:eventId', readOne);
router.patch('/:eventId', update);
router.delete('/:eventId', _delete);

// pricings
router.get('/pricelist/:eventId', readPricings);
router.post('/pricelist/:eventId', createPricing);
router.patch('/pricelist/:id', updatePricing);

// pricing details
router.get('/pricings/:pricingId', readPricingDetails)
export { router as eventsRouter };
