import { Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  capacity: string;
  venue: string;
  flyer?: { mimetype: string; filename: string; size: string | number };
  extraDetails?: [];
  description: string;
  // photos?: string[];
}

export interface IPricing extends Document {
  event: IEvent['_id'];
  pricing: IPrice;
}

export interface IPrice {
  name: string;
  allowableNumberOfPersons: number;
  amount: number;
}
