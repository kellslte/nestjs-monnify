import { Metadata, Customer } from './common.interface';

// Invoice Creation
export interface CreateInvoiceRequest {
  invoiceReference: string;
  description: string;
  amount: number;
  currencyCode: string;
  contractCode: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber?: string;
  expiryDate?: string;
  redirectUrl?: string;
  paymentMethods?: string[];
  metadata?: Metadata;
  invoiceLogo?: string;
  invoiceDescription?: string;
  invoiceTitle?: string;
  invoiceFooter?: string;
  invoiceDate?: string;
  dueDate?: string;
  invoiceItems?: InvoiceItem[];
}

export interface InvoiceItem {
  itemName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  vatRate?: number;
  vatAmount?: number;
  totalAmount: number;
}

export interface CreateInvoiceResponse {
  invoiceReference: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  currencyCode: string;
  contractCode: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber: string;
  expiryDate: string;
  redirectUrl: string;
  paymentMethods: string[];
  metadata: Metadata;
  invoiceLogo: string;
  invoiceDescription: string;
  invoiceTitle: string;
  invoiceFooter: string;
  invoiceDate: string;
  dueDate: string;
  invoiceItems: InvoiceItem[];
  checkoutUrl: string;
  status: string;
  createdOn: string;
  updatedOn: string;
}

// Invoice Details
export interface InvoiceDetails {
  invoiceReference: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  currencyCode: string;
  contractCode: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber: string;
  expiryDate: string;
  redirectUrl: string;
  paymentMethods: string[];
  metadata: Metadata;
  invoiceLogo: string;
  invoiceDescription: string;
  invoiceTitle: string;
  invoiceFooter: string;
  invoiceDate: string;
  dueDate: string;
  invoiceItems: InvoiceItem[];
  checkoutUrl: string;
  status: string;
  createdOn: string;
  updatedOn: string;
  paidOn?: string;
  paymentReference?: string;
  transactionReference?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}

// Invoice List
export interface InvoiceListRequest {
  pageSize?: number;
  pageNumber?: number;
  invoiceReference?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export interface InvoiceListResponse {
  content: InvoiceDetails[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Invoice Update
export interface UpdateInvoiceRequest {
  invoiceReference: string;
  description?: string;
  amount?: number;
  expiryDate?: string;
  redirectUrl?: string;
  paymentMethods?: string[];
  metadata?: Metadata;
  invoiceLogo?: string;
  invoiceDescription?: string;
  invoiceTitle?: string;
  invoiceFooter?: string;
  dueDate?: string;
  invoiceItems?: InvoiceItem[];
}

export interface UpdateInvoiceResponse {
  invoiceReference: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  currencyCode: string;
  contractCode: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber: string;
  expiryDate: string;
  redirectUrl: string;
  paymentMethods: string[];
  metadata: Metadata;
  invoiceLogo: string;
  invoiceDescription: string;
  invoiceTitle: string;
  invoiceFooter: string;
  invoiceDate: string;
  dueDate: string;
  invoiceItems: InvoiceItem[];
  checkoutUrl: string;
  status: string;
  createdOn: string;
  updatedOn: string;
}

// Invoice Cancellation
export interface CancelInvoiceRequest {
  invoiceReference: string;
  reason?: string;
}

export interface CancelInvoiceResponse {
  invoiceReference: string;
  status: string;
  cancelledOn: string;
  reason?: string;
}

// Invoice Payment Status
export interface InvoicePaymentStatusResponse {
  invoiceReference: string;
  invoiceNumber: string;
  amount: number;
  currencyCode: string;
  status: string;
  paymentStatus: string;
  paidOn?: string;
  paymentReference?: string;
  transactionReference?: string;
  paymentMethod?: string;
  customer: Customer;
  metadata: Metadata;
}

// Invoice Transactions
export interface InvoiceTransactionRequest {
  invoiceReference: string;
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
}

export interface InvoiceTransaction {
  transactionReference: string;
  paymentReference: string;
  amountPaid: number;
  totalPayable: number;
  paidOn: string;
  paymentStatus: string;
  paymentDescription: string;
  currency: string;
  paymentMethod: string;
  customer: Customer;
  metaData: Metadata;
}

export interface InvoiceTransactionResponse {
  content: InvoiceTransaction[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Invoice Summary
export interface InvoiceSummaryResponse {
  totalInvoices: number;
  totalAmount: number;
  paidInvoices: number;
  paidAmount: number;
  pendingInvoices: number;
  pendingAmount: number;
  cancelledInvoices: number;
  cancelledAmount: number;
  currency: string;
  period: {
    fromDate: string;
    toDate: string;
  };
}

// Invoice Reminder
export interface SendInvoiceReminderRequest {
  invoiceReference: string;
  message?: string;
}

export interface SendInvoiceReminderResponse {
  invoiceReference: string;
  reminderSent: boolean;
  sentOn: string;
  message?: string;
}
