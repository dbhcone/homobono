import { Document } from "mongoose";

export interface IEvent extends Document {
    title: string;
    date: Date;
    time: string;
    speaker: string;
    venue: string;
    flyer?: {};
    extraDetails?: {};
    description: string;
    photos?: string[];
  }
  