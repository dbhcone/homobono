import { NextFunction, Request, Response } from 'express';
import { createEventValidation } from '../validators/event.validations';
import Events from '../models/event.model';
import Pricings from '../models/pricings.model';
import config from 'config';
import { deletePhoto } from '../helpers/functions/fs.helpers';
import { IPricing } from '../interfaces/event.interface';

const create = async (req: Request, res: Response, next: NextFunction) => {
  let data = req.body;
  console.log('Data received at backend', data);

  try {
    const extraDetails = JSON.parse(data.extraDetails);
    data = {...data, extraDetails}

    if (!req.file) {
      console.log('no file at the moment');
      return res.status(400).json({
        message: 'Select a file to be uploaded as a flyer',
        status: 'error',
        code: 400,
      });
    }

    const { mimetype, filename, size } = req.file;
    console.log('we have a file excl. buffer', mimetype, filename, size);

    const event = await new Events({
      ...data,
      flyer: { mimetype, filename, size },
    }).save();

    if (event) {
      return res.status(201).json({
        message: 'Event created successfully',
        code: 201,
        status: 'ok',
        data: event,
      });
    } else {
      return res
        .status(404)
        .json({ message: 'Event creation failed', code: 404, status: 'error' });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const events = await Events.find().sort({ title: 'asc' });
    const uploadPath = `${config.get('APPROOT')}/public/uploads`;
    return res.status(200).json({message: 'Events fetched successfully', status: 'ok', code: 200, data: {count: events.length, events, uploadPath}})
  } catch (error: any) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

const readOne = async (req: Request, res: Response) => {
  try {
    const id = req.params['eventId'];
    const event = await Events.findById(id);
    const uploadPath = `${config.get('APPROOT')}/public/uploads`;
    return res.status(200).json({message: 'Event fetched successfully', status: 'ok', code: 200, data: { event, uploadPath}})
  } catch (error: any) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

const _delete = async (req: Request, res: Response) => {
  try {
    const id = req.params['eventId'];

    // first delete the document from the collection
    const deleteEvent = await Events.findByIdAndDelete(id);

    // then now unlink the corresponding file
    if (deleteEvent) {
      deletePhoto(deleteEvent.flyer?.filename)
    }

    return res.sendStatus(200);

  } catch (error: any) {
    return res.status(404).json({message: error.message, code: 404, status: 'error'})
  }
}

const update = async (req: Request, res: Response) => {
  const _id = req.params.eventId;
  try {
    
    const data = req.body;

    const event = await Events.findByIdAndUpdate(
      _id,
      { $set: { ...data } },
      { new: true }
    );

    if (event) {
      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Event updated successfully',
          code: 200,
          data: event,
        });
    } else {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find event to be updated',
          code: 404,
        });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};


// Pricings
const readPricings = async (req: Request, res: Response) => {
  const eventId = req.params['eventId'];
  try {
    const pricings = await Pricings.find({event: eventId}).select("pricing").sort({"pricing.amount": "desc"});
    if(pricings.length == 0) {
      return res.status(404).json({message: "Event pricings not found", code: 404, status: 'error'})  
    }
    return res.status(200).json({message: "Pricings fetched successfully", code: 200, status: 'ok', data: pricings})
  } catch (error: any) {
    return res.status(404).json({message: error.message, code: 404, status: 'error'})
  }
}

const createPricing = async (req: Request, res: Response) => {
  const eventId = req.params['eventId'];
  try {
    const pricingdata = req.body;
    const pricing = {event: eventId, pricing: pricingdata} ;

    const data = await new Pricings(pricing).save();
    return res.status(201).json({
      message: 'Pricing added successfully',
      code: 201,
      status: 'ok',
      data,
    });
  } catch (error: any) {
    return res.status(404).json({message: error.message, code: 404, status: 'error'})
  }
}
export { create, read, update, readOne, _delete, readPricings, createPricing };
