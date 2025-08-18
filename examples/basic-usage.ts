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
}
