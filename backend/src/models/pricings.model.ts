import mongoose, { Schema } from 'mongoose';
import { IPricing } from '../interfaces/event.interface';

const PricingSchema: Schema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, required: true },
    pricing: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model<IPricing>('pricing', PricingSchema);
