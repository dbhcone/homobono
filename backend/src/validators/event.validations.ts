import Joi, { ObjectSchema } from 'joi';

const createEventValidation: ObjectSchema<{
  title: string;
  date: Date;
  time: string;
  venue: string;
  flyer: string;
  capacity: string;
  description: string;
  extraDetails?: Array<{}>;
  // photos?: string[];
}> = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  venue: Joi.string().required(),
  description: Joi.string().required(),
  capacity: Joi.string(),
  extraDetails: Joi.array().allow(null),
  // photos: Joi.array().allow(null),
});

export { createEventValidation };
