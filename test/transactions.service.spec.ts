import { TransactionsService } from '../src/services/transactions.service';
import { MonnifyModuleOptions } from '../src/interfaces';

describe('TransactionsService', () => {
    let service: TransactionsService;
    let mockOptions: MonnifyModuleOptions;

    beforeEach(() => {
        mockOptions = {
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
            environment: 'sandbox',
        };

        service = new TransactionsService(mockOptions);
    });

    describe('getTransactionStatus', () => {
        it('should get transaction status', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    transactionReference: 'TXN_REF_123',
                    paymentReference: 'PAY_REF_123',
                    amountPaid: '10000',
                    totalPayable: '10000',
                    settlementAmount: '9750',
                    paidOn: '2024-01-01T10:00:00Z',
                    paymentStatus: 'PAID',
                    paymentDescription: 'Test payment',
                    currency: 'NGN',
                    paymentMethod: 'CARD',
                    customer: {
                        email: 'test@example.com',
                        name: 'Test User',
                        phoneNumber: '+2341234567890',
                    },
                    metaData: {},
                    paymentProvider: 'MONNIFY',
                    product: {
                        type: 'PAYMENT',
                        reference: 'PROD_123',
                    },
                    amount: 10000,
                    fee: 250,
                    feeBearer: true,
                    completed: true,
                    completedOn: '2024-01-01T10:00:00Z',
                    createdOn: '2024-01-01T09:00:00Z',
                    updatedOn: '2024-01-01T10:00:00Z',
                },
            };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.getTransactionStatus('TXN_REF_123');

            expect(service['post']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/query',
                { transactionReference: 'TXN_REF_123' },
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getAllTransactions', () => {
        it('should get all transactions with default parameters', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    content: [],
                    pageable: {
                        sort: { sorted: false, unsorted: true, empty: true },
                        pageNumber: 0,
                        pageSize: 10,
                        offset: 0,
                        paged: true,
                        unpaged: false,
                    },
                    totalElements: 0,
                    totalPages: 0,
                    last: true,
                    first: true,
                    numberOfElements: 0,
                    size: 10,
                    number: 0,
                    empty: true,
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.getAllTransactions();

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/list',
                {},
            );
            expect(result).toEqual(mockResponse);
        });

        it('should get all transactions with filters', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    content: [],
                    pageable: {
                        sort: { sorted: false, unsorted: true, empty: true },
                        pageNumber: 0,
                        pageSize: 10,
                        offset: 0,
                        paged: true,
                        unpaged: false,
                    },
                    totalElements: 0,
                    totalPages: 0,
                    last: true,
                    first: true,
                    numberOfElements: 0,
                    size: 10,
                    number: 0,
                    empty: true,
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const filters = {
                pageSize: 20,
                pageNumber: 1,
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
                status: 'PAID' as any,
                paymentMethod: 'CARD' as any,
            };

            const result = await service.getAllTransactions(filters);

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/list',
                filters,
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getTransactionLogs', () => {
        it('should get transaction logs with default parameters', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    content: [],
                    pageable: {
                        sort: { sorted: false, unsorted: true, empty: true },
                        pageNumber: 0,
                        pageSize: 10,
                        offset: 0,
                        paged: true,
                        unpaged: false,
                    },
                    totalElements: 0,
                    totalPages: 0,
                    last: true,
                    first: true,
                    numberOfElements: 0,
                    size: 10,
                    number: 0,
                    empty: true,
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.getTransactionLogs();

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/transaction-log',
                {},
            );
            expect(result).toEqual(mockResponse);
        });

        it('should get transaction logs with filters', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    content: [],
                    pageable: {
                        sort: { sorted: false, unsorted: true, empty: true },
                        pageNumber: 0,
                        pageSize: 10,
                        offset: 0,
                        paged: true,
                        unpaged: false,
                    },
                    totalElements: 0,
                    totalPages: 0,
                    last: true,
                    first: true,
                    numberOfElements: 0,
                    size: 10,
                    number: 0,
                    empty: true,
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const filters = {
                pageSize: 20,
                pageNumber: 1,
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
                transactionReference: 'TXN_REF_123',
                status: 'PAID' as any,
            };

            const result = await service.getTransactionLogs(filters);

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/transaction-log',
                filters,
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('refundTransaction', () => {
        it('should refund a transaction', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    transactionReference: 'TXN_REF_123',
                    paymentReference: 'PAY_REF_123',
                    amount: 10000,
                    refundAmount: 10000,
                    totalRefunded: 10000,
                    refundReference: 'REF_REF_123',
                    refundStatus: 'PENDING',
                    refundReason: 'Customer requested refund',
                    customerNote: 'Refund processed as requested',
                    createdOn: '2024-01-01T10:00:00Z',
                    updatedOn: '2024-01-01T10:00:00Z',
                },
            };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const refundRequest = {
                transactionReference: 'TXN_REF_123',
                refundAmount: 10000,
                refundReason: 'Customer requested refund',
                customerNote: 'Refund processed as requested',
            };

            const result = await service.refundTransaction(refundRequest);

            expect(service['post']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/refund',
                refundRequest,
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('partialRefundTransaction', () => {
        it('should process partial refund', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    transactionReference: 'TXN_REF_123',
                    paymentReference: 'PAY_REF_123',
                    amount: 10000,
                    refundAmount: 5000,
                    totalRefunded: 5000,
                    refundReference: 'REF_REF_123',
                    refundStatus: 'PENDING',
                    refundReason: 'Partial refund for damaged item',
                    customerNote: 'Partial refund for damaged item',
                    createdOn: '2024-01-01T10:00:00Z',
                    updatedOn: '2024-01-01T10:00:00Z',
                },
            };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const partialRefundRequest = {
                transactionReference: 'TXN_REF_123',
                refundAmount: 5000,
                refundReason: 'Partial refund for damaged item',
                customerNote: 'Partial refund for damaged item',
            };

            const result =
                await service.partialRefundTransaction(partialRefundRequest);

            expect(service['post']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/partial-refund',
                partialRefundRequest,
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('verifyTransaction', () => {
        it('should verify transaction', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    transactionReference: 'TXN_REF_123',
                    paymentReference: 'PAY_REF_123',
                    amountPaid: '10000',
                    totalPayable: '10000',
                    settlementAmount: '9750',
                    paidOn: '2024-01-01T10:00:00Z',
                    paymentStatus: 'PAID',
                    paymentDescription: 'Test payment',
                    currency: 'NGN',
                    paymentMethod: 'CARD',
                    customer: {
                        email: 'test@example.com',
                        name: 'Test User',
                        phoneNumber: '+2341234567890',
                    },
                    metaData: {},
                    paymentProvider: 'MONNIFY',
                    product: {
                        type: 'PAYMENT',
                        reference: 'PROD_123',
                    },
                    amount: 10000,
                    fee: 250,
                    feeBearer: true,
                    completed: true,
                    completedOn: '2024-01-01T10:00:00Z',
                    createdOn: '2024-01-01T09:00:00Z',
                    updatedOn: '2024-01-01T10:00:00Z',
                },
            };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const verificationRequest = {
                transactionReference: 'TXN_REF_123',
                amount: 10000,
            };

            const result = await service.verifyTransaction(verificationRequest);

            expect(service['post']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/verify',
                verificationRequest,
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getTransactionSummary', () => {
        it('should get transaction summary without date range', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    totalTransactions: 100,
                    totalAmount: 1000000,
                    totalFees: 25000,
                    totalRefunds: 50000,
                    successfulTransactions: 95,
                    failedTransactions: 3,
                    pendingTransactions: 2,
                    cancelledTransactions: 0,
                    currency: 'NGN',
                    period: {
                        fromDate: '2024-01-01',
                        toDate: '2024-12-31',
                    },
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.getTransactionSummary();

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/summary',
                {},
            );
            expect(result).toEqual(mockResponse);
        });

        it('should get transaction summary with date range', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    totalTransactions: 50,
                    totalAmount: 500000,
                    totalFees: 12500,
                    totalRefunds: 25000,
                    successfulTransactions: 48,
                    failedTransactions: 1,
                    pendingTransactions: 1,
                    cancelledTransactions: 0,
                    currency: 'NGN',
                    period: {
                        fromDate: '2024-01-01',
                        toDate: '2024-06-30',
                    },
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.getTransactionSummary(
                '2024-01-01',
                '2024-06-30',
            );

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/summary',
                { fromDate: '2024-01-01', toDate: '2024-06-30' },
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getTransactionAnalytics', () => {
        it('should get transaction analytics without date range', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    totalVolume: 1000000,
                    totalCount: 100,
                    averageTransactionValue: 10000,
                    successRate: 95.0,
                    failureRate: 3.0,
                    refundRate: 5.0,
                    topPaymentMethods: [
                        { method: 'CARD', count: 60, percentage: 60.0 },
                        { method: 'ACCOUNT_TRANSFER', count: 40, percentage: 40.0 },
                    ],
                    topPaymentProviders: [
                        { provider: 'MONNIFY', count: 80, percentage: 80.0 },
                        { provider: 'FLUTTERWAVE', count: 20, percentage: 20.0 },
                    ],
                    dailyBreakdown: [
                        { date: '2024-01-01', count: 10, volume: 100000 },
                        { date: '2024-01-02', count: 15, volume: 150000 },
                    ],
                    currency: 'NGN',
                    period: {
                        fromDate: '2024-01-01',
                        toDate: '2024-12-31',
                    },
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.getTransactionAnalytics();

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/analytics',
                {},
            );
            expect(result).toEqual(mockResponse);
        });

        it('should get transaction analytics with date range', async () => {
            const mockResponse = {
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    totalVolume: 500000,
                    totalCount: 50,
                    averageTransactionValue: 10000,
                    successRate: 96.0,
                    failureRate: 2.0,
                    refundRate: 2.0,
                    topPaymentMethods: [
                        { method: 'CARD', count: 30, percentage: 60.0 },
                        { method: 'ACCOUNT_TRANSFER', count: 20, percentage: 40.0 },
                    ],
                    topPaymentProviders: [
                        { provider: 'MONNIFY', count: 40, percentage: 80.0 },
                        { provider: 'FLUTTERWAVE', count: 10, percentage: 20.0 },
                    ],
                    dailyBreakdown: [
                        { date: '2024-01-01', count: 5, volume: 50000 },
                        { date: '2024-01-02', count: 8, volume: 80000 },
                    ],
                    currency: 'NGN',
                    period: {
                        fromDate: '2024-01-01',
                        toDate: '2024-06-30',
                    },
                },
            };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.getTransactionAnalytics(
                '2024-01-01',
                '2024-06-30',
            );

            expect(service['get']).toHaveBeenCalledWith(
                '/api/v1/merchant/transactions/analytics',
                { fromDate: '2024-01-01', toDate: '2024-06-30' },
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('convenience methods', () => {
        beforeEach(() => {
            jest.spyOn(service, 'getAllTransactions').mockResolvedValue({
                requestSuccessful: true,
                responseMessage: 'Success',
                responseCode: '0',
                responseBody: {
                    content: [],
                    pageable: {
                        sort: { sorted: false, unsorted: true, empty: true },
                        pageNumber: 0,
                        pageSize: 10,
                        offset: 0,
                        paged: true,
                        unpaged: false,
                    },
                    totalElements: 0,
                    totalPages: 0,
                    last: true,
                    first: true,
                    numberOfElements: 0,
                    size: 10,
                    number: 0,
                    empty: true,
                },
            });
        });

        it('should get transactions by status', async () => {
            await service.getTransactionsByStatus('PAID', 10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'PAID',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get transactions by payment method', async () => {
            await service.getTransactionsByPaymentMethod('CARD', 10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                paymentMethod: 'CARD',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get transactions by date range', async () => {
            await service.getTransactionsByDateRange(
                '2024-01-01',
                '2024-12-31',
                10,
                1,
            );

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get transactions by customer email', async () => {
            await service.getTransactionsByCustomerEmail('test@example.com', 10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                customerEmail: 'test@example.com',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get transactions by amount', async () => {
            await service.getTransactionsByAmount(10000, 10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                amount: 10000,
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get successful transactions', async () => {
            await service.getSuccessfulTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'PAID',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get failed transactions', async () => {
            await service.getFailedTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'FAILED',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get pending transactions', async () => {
            await service.getPendingTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'PENDING',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get cancelled transactions', async () => {
            await service.getCancelledTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'CANCELLED',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get overpaid transactions', async () => {
            await service.getOverpaidTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'OVERPAID',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get partially paid transactions', async () => {
            await service.getPartiallyPaidTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'PARTIALLY_PAID',
                pageSize: 10,
                pageNumber: 1,
            });
        });

        it('should get reversed transactions', async () => {
            await service.getReversedTransactions(10, 1);

            expect(service.getAllTransactions).toHaveBeenCalledWith({
                status: 'REVERSED',
                pageSize: 10,
                pageNumber: 1,
            });
        });
    });
});
