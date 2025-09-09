import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  InvoiceDetails,
  InvoiceListRequest,
  InvoiceListResponse,
  UpdateInvoiceRequest,
  UpdateInvoiceResponse,
  CancelInvoiceRequest,
  CancelInvoiceResponse,
  InvoicePaymentStatusResponse,
  InvoiceTransactionRequest,
  InvoiceTransactionResponse,
  InvoiceSummaryResponse,
  SendInvoiceReminderRequest,
  SendInvoiceReminderResponse,
  MonnifyResponse,
} from '../interfaces';

export class InvoicesService extends BaseService {
  /**
   * Create a new invoice
   */
  async createInvoice(
    request: CreateInvoiceRequest,
  ): Promise<MonnifyResponse<CreateInvoiceResponse>> {
    return this.post<MonnifyResponse<CreateInvoiceResponse>>(
      MONNIFY_ENDPOINTS.CREATE_INVOICE,
      {
        ...request,
        contractCode: this.options.contractCode,
      },
    );
  }

  /**
   * Get invoice details by reference
   */
  async getInvoiceDetails(
    invoiceReference: string,
  ): Promise<MonnifyResponse<InvoiceDetails>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_INVOICE.replace(
      '{invoiceReference}',
      invoiceReference,
    );
    return this.get<MonnifyResponse<InvoiceDetails>>(endpoint);
  }

  /**
   * Get list of invoices
   */
  async getInvoices(
    request: InvoiceListRequest = {},
  ): Promise<MonnifyResponse<InvoiceListResponse>> {
    const {
      pageSize = 10,
      pageNumber = 1,
      invoiceReference,
      status,
      fromDate,
      toDate,
    } = request;

    return this.get<MonnifyResponse<InvoiceListResponse>>(
      MONNIFY_ENDPOINTS.GET_INVOICES,
      {
        pageSize,
        pageNumber,
        invoiceReference,
        status,
        fromDate,
        toDate,
      },
    );
  }

  /**
   * Update an existing invoice
   */
  async updateInvoice(
    request: UpdateInvoiceRequest,
  ): Promise<MonnifyResponse<UpdateInvoiceResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.UPDATE_INVOICE.replace(
      '{invoiceReference}',
      request.invoiceReference,
    );
    return this.put<MonnifyResponse<UpdateInvoiceResponse>>(endpoint, request);
  }

  /**
   * Cancel an invoice
   */
  async cancelInvoice(
    request: CancelInvoiceRequest,
  ): Promise<MonnifyResponse<CancelInvoiceResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.CANCEL_INVOICE.replace(
      '{invoiceReference}',
      request.invoiceReference,
    );
    return this.put<MonnifyResponse<CancelInvoiceResponse>>(endpoint, request);
  }

  /**
   * Get invoice payment status
   */
  async getInvoicePaymentStatus(
    invoiceReference: string,
  ): Promise<MonnifyResponse<InvoicePaymentStatusResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_INVOICE_PAYMENT_STATUS.replace(
      '{invoiceReference}',
      invoiceReference,
    );
    return this.get<MonnifyResponse<InvoicePaymentStatusResponse>>(endpoint);
  }

  /**
   * Get invoice transactions
   */
  async getInvoiceTransactions(
    request: InvoiceTransactionRequest,
  ): Promise<MonnifyResponse<InvoiceTransactionResponse>> {
    const {
      invoiceReference,
      pageSize = 10,
      pageNumber = 1,
      fromDate,
      toDate,
    } = request;

    const endpoint = MONNIFY_ENDPOINTS.GET_INVOICE_TRANSACTIONS.replace(
      '{invoiceReference}',
      invoiceReference,
    );

    return this.get<MonnifyResponse<InvoiceTransactionResponse>>(endpoint, {
      pageSize,
      pageNumber,
      fromDate,
      toDate,
    });
  }

  /**
   * Get invoice summary
   */
  async getInvoiceSummary(
    fromDate?: string,
    toDate?: string,
  ): Promise<MonnifyResponse<InvoiceSummaryResponse>> {
    return this.get<MonnifyResponse<InvoiceSummaryResponse>>(
      MONNIFY_ENDPOINTS.GET_INVOICE_SUMMARY,
      {
        fromDate,
        toDate,
      },
    );
  }

  /**
   * Send invoice reminder
   */
  async sendInvoiceReminder(
    request: SendInvoiceReminderRequest,
  ): Promise<MonnifyResponse<SendInvoiceReminderResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.SEND_INVOICE_REMINDER.replace(
      '{invoiceReference}',
      request.invoiceReference,
    );
    return this.post<MonnifyResponse<SendInvoiceReminderResponse>>(
      endpoint,
      request,
    );
  }

  /**
   * Resend invoice notification
   */
  async resendInvoiceNotification(
    invoiceReference: string,
  ): Promise<MonnifyResponse<{ success: boolean; message: string }>> {
    const endpoint = MONNIFY_ENDPOINTS.RESEND_INVOICE_NOTIFICATION.replace(
      '{invoiceReference}',
      invoiceReference,
    );
    return this.post<MonnifyResponse<{ success: boolean; message: string }>>(
      endpoint,
      {},
    );
  }

  /**
   * Get invoice by invoice number
   */
  async getInvoiceByNumber(
    invoiceNumber: string,
  ): Promise<MonnifyResponse<InvoiceDetails>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_INVOICE_BY_NUMBER.replace(
      '{invoiceNumber}',
      invoiceNumber,
    );
    return this.get<MonnifyResponse<InvoiceDetails>>(endpoint);
  }
}
