import { Request, Response } from 'express';
import { createPurchase } from '../validators/event.validations';
import Pricings from '../models/pricings.model';
import Purchase from '../models/purchase.model';
import qr from 'qrcode';
import { sendTicketEmail } from '../helpers/functions/email.helper';
import Users from '../models/user.model';
import { ITicket } from '../interfaces/event.interface';

const create = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const validation = await createPurchase.validateAsync(data);
    let { user, items } = data;
    const newItems = <any[]>items;

    // console.log('data', data);

    let tickets: ITicket[] = [];
    // newItems.map(async (item: any) => {
    //   const price = await Pricings.findById(item.id).populate('event');
    //   // console.log ('price', price)
    //   if (price) {
    //     const ticket: ITicket = {
    //       eventName: price.event.title,
    //       ticketType: price.pricing.name,
    //       unitPrice: price.pricing.amount,
    //       quantity: item.quantity,
    //       subTotal: price.pricing.amount * item.quantity,
    //     };
    //     console.log('ticket', ticket);
    //     tickets.push(ticket);
    //   }
    // });

    const ids: any[] = [];
    newItems.map((item) => {
      ids.push(item.id);
    });
    console.log('ids', ids);
    const prs = await Pricings.find({ _id: { $in: [...ids] } }).populate(
      'event'
    );
    console.log('prs', prs);
    // return res.status(200).json({ data: { prs, ids } });

    prs.map((pr) => {
        let foundItem = newItems.find((item) => item.id == pr._id);
        if (foundItem) {
            console.log('found', foundItem);
            const ticket: ITicket = {
                eventId: foundItem.eventId,
                eventName: pr.event.title,
                ticketType: pr.pricing.name,
                unitPrice: pr.pricing.amount,
                quantity: foundItem.quantity,
                subTotal: pr.pricing.amount * foundItem.quantity,
            };
            console.log('ticket', ticket);
            tickets.push(ticket);      
        }
    })

    let total = 0;
    tickets.map((ticket) => {
      total += ticket.subTotal;
    });

    console.log('tickets', tickets);

    /**
     * TODO: Trigger payment and confirm before adding to
     * purchase document. Verify payment first.
     */
    let purch = { user: user.id, tickets: tickets, total: total };
    let purchase = await new Purchase(purch).save();
    console.log('purchase', purchase);

    try {
      qr.toDataURL(JSON.stringify(tickets), async (err, qrcode) => {
        if (err) {
          return res.status(404).json({
            message: 'Could not generate qr code',
            code: 404,
            status: 'ok',
          });
        }

        await purchase.updateOne({ qrcode }, { new: true });
        console.log('updated', purchase);

        const us = await Users.findById(user.id).populate('accountOwner');

        // now send the email
        let response = await sendTicketEmail(
          user.email,
          us?.accountOwner?.firstName,
          tickets,
          qrcode
        );

        if (response.code == 200) {
          return res.status(200).json({
            message:
              'Purchase completed successfully. Check your email to get full details',
            status: 'ok',
            code: 200,
            data: purchase,
          });
        } else {
          return res.status(response.code).json({
            message: response.message,
            status: 'error',
            code: response.code,
            data: purchase,
          });
        }
      });
    } catch (error: any) {
      return res
        .status(404)
        .json({ message: error.message, code: 404, status: 'error' });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

export { create };
