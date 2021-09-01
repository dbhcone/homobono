import { Request, Response } from 'express';
import { createEventValidation } from '../validators/event.validations';
import Events from '../models/event.model';

const CreateEvent = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const validation = await createEventValidation.validateAsync(data);

    const event = await new Events(data).save();

    if (event) {
      return res
        .status(201)
        .json({
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
  } catch (error) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

const UpdateEvent = async () => {};

export { CreateEvent, UpdateEvent };
