/**
 * https://documenter.getpostman.com/view/8139575/TVYJ6HHZ
 */

import { POST } from '../helpers/functions/http';

const BASE_URL = 'https://posapi.usebillbox.com';
const APP_ID = ''; // TODO: Get it from billbox

const URL = (endpoint: string) => {
    return `${BASE_URL}${endpoint}`;
};
const listPaymentOptions = (
    requestId: string,
    appReference: string,
    secret: string
) => {
    const url = URL('/webpos/listPayOptions');
    const data = { requestId, appReference, secret };
    return POST(url, data, { appId: APP_ID });
};

const createInvoice = () => {
    const url = URL('/webpos/createInvoice');
    const data = {};
    return POST(url, data, { appId: APP_ID });
};

const getInvoiceSummary = () => {};

const getInvoice = () => {};

const cancelInvoice = () => {
    const url = URL('/webpos/cancelInvoice');
    const data = {  };
    return POST(url, data, { appId: APP_ID });
};

const processPayment = () => {};

const payNow = () => {};
export {
    listPaymentOptions,
    createInvoice,
    getInvoiceSummary,
    getInvoice,
    cancelInvoice,
    processPayment,
    payNow,
};
