export interface IPaymentOptions {
    requestId: string;
    appReference: string;
    secret: string;
}

export interface IInvoiceWithItems {
    requestId: string;
    appReference: string;
    secret: string;
    merchantOrderId: string;
    reference: string;
    currency: 'GHS' | 'USD';
    invoiceItems: [
        {
            code: string;
            name: string;
            description: string;
            imgUrl: string;
            unitPrice: number;
            quantity: number;
            subTotal: number;
        }
    ];
}

export interface IInvoiceWithoutItems {
    appReference: string;
    secret: string;
    merchantOrderId: string;
    currency: 'GHS' | 'USD';
    reference: string;
    amount: number;
}

export interface IIvoiceSummaryWInvNum {
    requestId: string;
    appReference: string;
    secret: string;
    invoiceNum: string;
}

export interface IInvoiceSummaryWMerchOId {
    requestId: string;
    appReference: string;
    secret: string;
    merchantOrderId: string;
}

export interface IInvoiceFullWInvNum {
    requestId: string;
    appReference: string;
    secret: string;
    invoiceNum: string;
}

export interface IInvoiceFullWMerchOId {
    requestId: string;
    appReference: string;
    secret: string;
    merchantOrderId: string;
}

export interface ICancelInvoice {
    requestId: string;
    appReference: string;
    secret: string;
    merchantOrderId: string;
}

export interface IProcessPayment {
    appReference: string;
    secret: string;
    requestId: string;
    invoiceNum: string;
    transactionId: string;
    provider:
        | 'MTN_MONEY'
        | 'CARD'
        | 'VODAFONE_CASH'
        | 'AIRTELTIGO_MONEY'
        | 'SLYDEPAY'
        | 'STANBIC_BANK';
    walletRef: string;
    customerName: string;
    customerMobile: string;
}

export interface IPayNow {
    requestId: string;
    appReference: string;
    secret: string;
    amount: number;
    currency: "GHS"| "USD";
    transactionId: string;
    reference: string;
    provider:
        | 'MTN_MONEY'
        | 'CARD'
        | 'VODAFONE_CASH'
        | 'AIRTELTIGO_MONEY'
        | 'SLYDEPAY'
        | 'STANBIC_BANK';
    walletRef: string;
    customerName: string;
    customerMobile: string;
}
