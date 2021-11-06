import { Request, Response } from 'express';
import { CResponse } from '../helpers/classes/response.class';
import { mongooseId } from '../helpers/functions/shared.helpers';
import {
    cancelInvoice,
    createInvoice,
    getInvoice,
    getInvoiceSummary,
    listPaymentOptions,
} from '../libs/billbox';

const paymentOptions = async (req: Request, res: Response) => {
    try {
        const requestId = mongooseId();

        let response = await listPaymentOptions(requestId);
        const {status: code, statusText: message, data } = response;
        return CResponse.success(res, {code, message, data})
    } catch (error: any) {
        return CResponse.error(res, { message: error.message });
    }
};

export { paymentOptions };
