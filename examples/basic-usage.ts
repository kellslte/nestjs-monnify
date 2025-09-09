import { Module } from '@nestjs/common';
import { MonnifyModule, MonnifyService } from '../src';

@Module({
    imports: [
        MonnifyModule.forRoot({
            secretKey: process.env.MONNIFY_SECRET_KEY || 'your-secret-key',
            publicKey: process.env.MONNIFY_PUBLIC_KEY || 'your-public-key',
            contractCode: process.env.MONNIFY_CONTRACT_CODE || 'your-contract-code',
            environment: (process.env.MONNIFY_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
        }),
    ],
})
export class AppModule { }

// Example service using Monnify
export class PaymentService {
    constructor(private readonly monnifyService: MonnifyService) { }

    async processPayment() {
        try {
            // Initialize a payment transaction
            const transaction = await this.monnifyService.collections.initializeTransaction({
                amount: 1000, // Amount in kobo (1000 = ₦10.00)
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                paymentReference: `PAY-${Date.now()}`, // Unique reference
                paymentDescription: 'Payment for services',
                currencyCode: 'NGN',
                contractCode: process.env.MONNIFY_CONTRACT_CODE || 'your-contract-code',
                redirectUrl: 'https://yourapp.com/payment/callback',
                paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
                metadata: {
                    orderId: 'ORDER-123',
                    customerId: 'CUST-456',
                },
            });

            console.log('Payment initialized:', transaction.responseBody);
            return transaction.responseBody.checkoutUrl;
        } catch (error) {
            console.error('Payment initialization failed:', error);
            throw error;
        }
    }

    async checkPaymentStatus(transactionReference: string) {
        try {
            const status = await this.monnifyService.collections.getTransactionStatus(
                transactionReference,
            );

            console.log('Payment status:', status.responseBody);
            return status.responseBody;
        } catch (error) {
            console.error('Status check failed:', error);
            throw error;
        }
    }

    async createCustomerAccount() {
        try {
            const account = await this.monnifyService.collections.createReservedAccount({
                accountReference: `ACC-${Date.now()}`,
                accountName: 'John Doe Account',
                customerEmail: 'john@example.com',
                customerName: 'John Doe',
                customerBvn: '12345678901', // Optional
                currencyCode: 'NGN',
                contractCode: process.env.MONNIFY_CONTRACT_CODE || 'your-contract-code',
                getAllAvailableBanks: true,
                preferredBanks: ['044', '058'], // GTBank, Wema Bank
                metadata: {
                    customerId: 'CUST-456',
                    accountType: 'SAVINGS',
                },
            });

            console.log('Account created:', account.responseBody);
            return account.responseBody;
        } catch (error) {
            console.error('Account creation failed:', error);
            throw error;
        }
    }
}

// Example of using disbursements
export class TransferService {
    constructor(private readonly monnifyService: MonnifyService) { }

    async transferMoney() {
        try {
            const transfer = await this.monnifyService.disbursements.initiateSingleTransfer({
                amount: 5000, // Amount in kobo (5000 = ₦50.00)
                reference: `TRF-${Date.now()}`,
                narration: 'Transfer to John Doe',
                destinationBankCode: '044', // GTBank
                destinationAccountNumber: '1234567890',
                destinationAccountName: 'John Doe',
                currency: 'NGN',
                sourceAccountNumber: '0987654321', // Your Monnify account
                metadata: {
                    transferType: 'SALARY',
                    employeeId: 'EMP-123',
                },
            });

            console.log('Transfer initiated:', transfer.responseBody);
            return transfer.responseBody;
        } catch (error) {
            console.error('Transfer failed:', error);
            throw error;
        }
    }

    async bulkTransfer() {
        try {
            const bulkTransfer = await this.monnifyService.disbursements.initiateBulkTransfer({
                title: 'Salary Payment - December 2024',
                batchReference: `BATCH-${Date.now()}`,
                narration: 'Monthly salary payment to employees',
                sourceAccountNumber: '0987654321',
                currency: 'NGN',
                onValidationFailure: 'CONTINUE', // Continue with valid transfers
                notificationInterval: 30, // Notify every 30 minutes
                transactions: [
                    {
                        amount: 50000, // ₦500.00
                        reference: 'SALARY-001',
                        narration: 'Salary for John Doe',
                        destinationBankCode: '044',
                        destinationAccountNumber: '1234567890',
                        destinationAccountName: 'John Doe',
                        metadata: { employeeId: 'EMP-001' },
                    },
                    {
                        amount: 75000, // ₦750.00
                        reference: 'SALARY-002',
                        narration: 'Salary for Jane Smith',
                        destinationBankCode: '058',
                        destinationAccountNumber: '0987654321',
                        destinationAccountName: 'Jane Smith',
                        metadata: { employeeId: 'EMP-002' },
                    },
                ],
            });

            console.log('Bulk transfer initiated:', bulkTransfer.responseBody);
            return bulkTransfer.responseBody;
        } catch (error) {
            console.error('Bulk transfer failed:', error);
            throw error;
        }
    }
}

// Example of using wallets
export class WalletService {
    constructor(private readonly monnifyService: MonnifyService) { }

    async createWallet() {
        try {
            const wallet = await this.monnifyService.wallets.createWallet({
                walletReference: `WALLET-${Date.now()}`,
                walletName: 'John Doe Wallet',
                customerEmail: 'john@example.com',
                customerName: 'John Doe',
                currencyCode: 'NGN',
                contractCode: process.env.MONNIFY_CONTRACT_CODE || 'your-contract-code',
                metadata: {
                    customerId: 'CUST-456',
                    walletType: 'PERSONAL',
                },
            });

            console.log('Wallet created:', wallet.responseBody);
            return wallet.responseBody;
        } catch (error) {
            console.error('Wallet creation failed:', error);
            throw error;
        }
    }

    async getWalletBalance(walletReference: string) {
        try {
            const balance = await this.monnifyService.wallets.getWalletBalance(walletReference);
            console.log('Wallet balance:', balance.responseBody);
            return balance.responseBody;
        } catch (error) {
            console.error('Balance check failed:', error);
            throw error;
        }
    }
}

// Example of using verification
export class VerificationService {
    constructor(private readonly monnifyService: MonnifyService) { }

    async verifyCustomer() {
        try {
            // Verify BVN
            const bvn = await this.monnifyService.verification.verifyBvn({
                bvn: '12345678901',
                dateOfBirth: '1990-01-01',
            });

            console.log('BVN verification:', bvn.responseBody);

            // Verify bank account
            const account = await this.monnifyService.verification.verifyBankAccount({
                accountNumber: '1234567890',
                bankCode: '044',
            });

            console.log('Bank account verification:', account.responseBody);

            // Verify phone number
            const phone = await this.monnifyService.verification.verifyPhoneNumber({
                phoneNumber: '+2348012345678',
            });

            console.log('Phone verification:', phone.responseBody);

            return {
                bvn: bvn.responseBody,
                bankAccount: account.responseBody,
                phone: phone.responseBody,
            };
        } catch (error) {
            console.error('Verification failed:', error);
            throw error;
        }
    }

    // Sub Accounts Examples
    async manageSubAccounts() {
        try {
            // Create a sub-account
            const subAccount = await this.monnifyService.subAccounts.createSubAccount({
                subAccountCode: 'SUB_001',
                subAccountName: 'Test Sub Account',
                email: 'subaccount@example.com',
                mobileNumber: '+2348012345678',
                splitPercentage: 10,
                feePercentage: 2,
                feeBearer: true,
                splitType: 'PERCENTAGE',
                currencyCode: 'NGN',
                contractCode: 'your-contract-code',
            });

            console.log('Sub-account created:', subAccount.responseBody);

            // Get sub-account details
            const details = await this.monnifyService.subAccounts.getSubAccountDetails('SUB_001');
            console.log('Sub-account details:', details.responseBody);

            // Get sub-account balance
            const balance = await this.monnifyService.subAccounts.getSubAccountBalance('SUB_001');
            console.log('Sub-account balance:', balance.responseBody);

            // Get sub-account transactions
            const transactions = await this.monnifyService.subAccounts.getSubAccountTransactions({
                subAccountCode: 'SUB_001',
                pageSize: 10,
                pageNumber: 1,
            });
            console.log('Sub-account transactions:', transactions.responseBody);

            return {
                subAccount: subAccount.responseBody,
                details: details.responseBody,
                balance: balance.responseBody,
                transactions: transactions.responseBody,
            };
        } catch (error) {
            console.error('Sub-account management failed:', error);
            throw error;
        }
    }

    // Invoices Examples
    async manageInvoices() {
        try {
            // Create an invoice
            const invoice = await this.monnifyService.invoices.createInvoice({
                invoiceReference: 'INV_001',
                description: 'Test Invoice',
                amount: 10000,
                currencyCode: 'NGN',
                contractCode: 'your-contract-code',
                customerEmail: 'customer@example.com',
                customerName: 'John Doe',
                customerPhoneNumber: '+2348012345678',
                expiryDate: '2024-12-31',
                redirectUrl: 'https://example.com/redirect',
                paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
                invoiceItems: [
                    {
                        itemName: 'Test Item',
                        description: 'Test item description',
                        quantity: 1,
                        unitPrice: 10000,
                        subTotal: 10000,
                        vatRate: 7.5,
                        vatAmount: 750,
                        totalAmount: 10750,
                    },
                ],
            });

            console.log('Invoice created:', invoice.responseBody);

            // Get invoice details
            const details = await this.monnifyService.invoices.getInvoiceDetails('INV_001');
            console.log('Invoice details:', details.responseBody);

            // Get invoice payment status
            const status = await this.monnifyService.invoices.getInvoicePaymentStatus('INV_001');
            console.log('Invoice payment status:', status.responseBody);

            // Send invoice reminder
            const reminder = await this.monnifyService.invoices.sendInvoiceReminder({
                invoiceReference: 'INV_001',
                message: 'Please complete your payment',
            });
            console.log('Invoice reminder sent:', reminder.responseBody);

            return {
                invoice: invoice.responseBody,
                details: details.responseBody,
                status: status.responseBody,
                reminder: reminder.responseBody,
            };
        } catch (error) {
            console.error('Invoice management failed:', error);
            throw error;
        }
    }

    // Settlements Examples
    async manageSettlements() {
        try {
            // Get settlements list
            const settlements = await this.monnifyService.settlements.getSettlements({
                pageSize: 10,
                pageNumber: 1,
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
            });
            console.log('Settlements:', settlements.responseBody);

            // Get settlement summary
            const summary = await this.monnifyService.settlements.getSettlementSummary({
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
            });
            console.log('Settlement summary:', summary.responseBody);

            // Create settlement configuration
            const config = await this.monnifyService.settlements.createSettlementConfiguration({
                bankCode: '044',
                accountNumber: '1234567890',
                accountName: 'Test Account',
                isDefault: true,
            });
            console.log('Settlement configuration created:', config.responseBody);

            // Get settlement configurations
            const configurations = await this.monnifyService.settlements.getSettlementConfigurations();
            console.log('Settlement configurations:', configurations.responseBody);

            return {
                settlements: settlements.responseBody,
                summary: summary.responseBody,
                config: config.responseBody,
                configurations: configurations.responseBody,
            };
        } catch (error) {
            console.error('Settlement management failed:', error);
            throw error;
        }
    }

    // Transactions Examples
    async manageTransactions() {
        try {
            // Get transaction status
            const status = await this.monnifyService.transactions.getTransactionStatus('TXN_REF_123');
            console.log('Transaction status:', status.responseBody);

            // Get all transactions with filters
            const allTransactions = await this.monnifyService.transactions.getAllTransactions({
                pageSize: 10,
                pageNumber: 1,
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
                status: 'PAID',
                paymentMethod: 'CARD',
            });
            console.log('All transactions:', allTransactions.responseBody);

            // Get transaction logs
            const logs = await this.monnifyService.transactions.getTransactionLogs({
                pageSize: 10,
                pageNumber: 1,
                fromDate: '2024-01-01',
                toDate: '2024-12-31',
            });
            console.log('Transaction logs:', logs.responseBody);

            // Get transactions by status
            const successfulTransactions = await this.monnifyService.transactions.getSuccessfulTransactions(10, 1);
            console.log('Successful transactions:', successfulTransactions.responseBody);

            const failedTransactions = await this.monnifyService.transactions.getFailedTransactions(10, 1);
            console.log('Failed transactions:', failedTransactions.responseBody);

            const pendingTransactions = await this.monnifyService.transactions.getPendingTransactions(10, 1);
            console.log('Pending transactions:', pendingTransactions.responseBody);

            // Get transactions by payment method
            const cardTransactions = await this.monnifyService.transactions.getTransactionsByPaymentMethod('CARD', 10, 1);
            console.log('Card transactions:', cardTransactions.responseBody);

            // Get transactions by date range
            const dateRangeTransactions = await this.monnifyService.transactions.getTransactionsByDateRange(
                '2024-01-01',
                '2024-12-31',
                10,
                1
            );
            console.log('Date range transactions:', dateRangeTransactions.responseBody);

            // Get transactions by customer email
            const customerTransactions = await this.monnifyService.transactions.getTransactionsByCustomerEmail(
                'customer@example.com',
                10,
                1
            );
            console.log('Customer transactions:', customerTransactions.responseBody);

            // Verify transaction
            const verification = await this.monnifyService.transactions.verifyTransaction({
                transactionReference: 'TXN_REF_123',
                amount: 10000, // Optional: verify specific amount
            });
            console.log('Transaction verification:', verification.responseBody);

            // Get transaction summary
            const summary = await this.monnifyService.transactions.getTransactionSummary(
                '2024-01-01',
                '2024-12-31'
            );
            console.log('Transaction summary:', summary.responseBody);

            // Get transaction analytics
            const analytics = await this.monnifyService.transactions.getTransactionAnalytics(
                '2024-01-01',
                '2024-12-31'
            );
            console.log('Transaction analytics:', analytics.responseBody);

            return {
                status: status.responseBody,
                allTransactions: allTransactions.responseBody,
                logs: logs.responseBody,
                successfulTransactions: successfulTransactions.responseBody,
                failedTransactions: failedTransactions.responseBody,
                pendingTransactions: pendingTransactions.responseBody,
                cardTransactions: cardTransactions.responseBody,
                dateRangeTransactions: dateRangeTransactions.responseBody,
                customerTransactions: customerTransactions.responseBody,
                verification: verification.responseBody,
                summary: summary.responseBody,
                analytics: analytics.responseBody,
            };
        } catch (error) {
            console.error('Transaction management failed:', error);
            throw error;
        }
    }

    // Transaction Refund Examples
    async manageTransactionRefunds() {
        try {
            // Full refund
            const fullRefund = await this.monnifyService.transactions.refundTransaction({
                transactionReference: 'TXN_REF_123',
                refundAmount: 10000, // Full amount in kobo
                refundReason: 'Customer requested refund',
                customerNote: 'Refund processed as requested',
            });
            console.log('Full refund:', fullRefund.responseBody);

            // Partial refund
            const partialRefund = await this.monnifyService.transactions.partialRefundTransaction({
                transactionReference: 'TXN_REF_456',
                refundAmount: 5000, // Partial amount in kobo
                refundReason: 'Partial refund for damaged item',
                customerNote: 'Partial refund for damaged item',
            });
            console.log('Partial refund:', partialRefund.responseBody);

            return {
                fullRefund: fullRefund.responseBody,
                partialRefund: partialRefund.responseBody,
            };
        } catch (error) {
            console.error('Transaction refund management failed:', error);
            throw error;
        }
    }
}
