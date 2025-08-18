import {
  // Core interfaces
  MonnifyModuleOptions,
  RetryOptions,
  MonnifyResponse,
  MonnifyError,

  // Collections interfaces
  InitializeTransactionRequest,
  InitializeTransactionResponse,
  ReservedAccountRequest,

  // Disbursements interfaces
  SingleTransferRequest,
  BulkTransferRequest,

  // Wallets interfaces
  CreateWalletRequest,
  WalletStatementRequest,

  // Verification interfaces
  BvnVerificationRequest,
  BankAccountVerificationRequest,
  PhoneNumberVerificationRequest,

  // Common interfaces
  PaginationRequest,
  PaginationResponse,
  Metadata,
  Customer,
  Bank,
  Currency,
  PaymentMethod,
} from '../src/interfaces';

describe('Monnify Interfaces', () => {
  describe('Core Interfaces', () => {
    describe('MonnifyModuleOptions', () => {
      it('should have required properties', () => {
        const options: MonnifyModuleOptions = {
          secretKey: 'test-secret',
          publicKey: 'test-public',
          contractCode: 'test-contract',
        };

        expect(options.secretKey).toBe('test-secret');
        expect(options.publicKey).toBe('test-public');
        expect(options.contractCode).toBe('test-contract');
      });

      it('should have optional properties', () => {
        const options: MonnifyModuleOptions = {
          secretKey: 'test-secret',
          publicKey: 'test-public',
          contractCode: 'test-contract',
          environment: 'production',
          baseUrl: 'https://custom-api.com',
          timeout: 60000,
          retries: 5,
          retryDelay: 2000,
          maxRetryDelay: 20000,
        };

        expect(options.environment).toBe('production');
        expect(options.baseUrl).toBe('https://custom-api.com');
        expect(options.timeout).toBe(60000);
        expect(options.retries).toBe(5);
        expect(options.retryDelay).toBe(2000);
        expect(options.maxRetryDelay).toBe(20000);
      });
    });

    describe('RetryOptions', () => {
      it('should have correct structure', () => {
        const retryOptions: RetryOptions = {
          retries: 3,
          retryDelay: 1000,
          maxRetryDelay: 10000,
        };

        expect(retryOptions.retries).toBe(3);
        expect(retryOptions.retryDelay).toBe(1000);
        expect(retryOptions.maxRetryDelay).toBe(10000);
      });
    });

    describe('MonnifyResponse', () => {
      it('should have correct structure', () => {
        const response: MonnifyResponse<string> = {
          requestSuccessful: true,
          responseMessage: 'Success',
          responseCode: '200',
          responseBody: 'test-data',
        };

        expect(response.requestSuccessful).toBe(true);
        expect(response.responseMessage).toBe('Success');
        expect(response.responseCode).toBe('200');
        expect(response.responseBody).toBe('test-data');
      });
    });

    describe('MonnifyError', () => {
      it('should have correct structure', () => {
        const error: MonnifyError = {
          requestSuccessful: false,
          responseMessage: 'Error occurred',
          responseCode: '400',
          responseBody: null,
        };

        expect(error.requestSuccessful).toBe(false);
        expect(error.responseMessage).toBe('Error occurred');
        expect(error.responseCode).toBe('400');
        expect(error.responseBody).toBeNull();
      });
    });
  });

  describe('Collections Interfaces', () => {
    describe('InitializeTransactionRequest', () => {
      it('should have required properties', () => {
        const request: InitializeTransactionRequest = {
          amount: 1000,
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          paymentReference: 'REF-123',
          paymentDescription: 'Test payment',
          contractCode: 'test-contract',
        };

        expect(request.amount).toBe(1000);
        expect(request.customerName).toBe('John Doe');
        expect(request.customerEmail).toBe('john@example.com');
        expect(request.paymentReference).toBe('REF-123');
        expect(request.paymentDescription).toBe('Test payment');
        expect(request.contractCode).toBe('test-contract');
      });

      it('should have optional properties', () => {
        const request: InitializeTransactionRequest = {
          amount: 1000,
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          paymentReference: 'REF-123',
          paymentDescription: 'Test payment',
          contractCode: 'test-contract',
          currencyCode: 'NGN',
          redirectUrl: 'https://example.com/callback',
          paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
          metadata: { orderId: 'ORDER-123' },
        };

        expect(request.currencyCode).toBe('NGN');
        expect(request.redirectUrl).toBe('https://example.com/callback');
        expect(request.paymentMethods).toEqual(['CARD', 'ACCOUNT_TRANSFER']);
        expect(request.metadata).toEqual({ orderId: 'ORDER-123' });
      });
    });

    describe('InitializeTransactionResponse', () => {
      it('should have correct structure', () => {
        const response: InitializeTransactionResponse = {
          transactionReference: 'TXN-123',
          paymentReference: 'REF-123',
          merchantName: 'Test Merchant',
          apiKey: 'test-api-key',
          enabledPaymentMethod: ['CARD'],
          checkoutUrl: 'https://checkout.monnify.com/pay',
          amount: 1000,
          currencyCode: 'NGN',
          contractCode: 'test-contract',
          customerEmail: 'john@example.com',
          customerName: 'John Doe',
          paymentDescription: 'Test payment',
          redirectUrl: 'https://example.com/callback',
          paymentMethods: ['CARD'],
          metadata: { orderId: 'ORDER-123' },
        };

        expect(response.transactionReference).toBe('TXN-123');
        expect(response.checkoutUrl).toBe('https://checkout.monnify.com/pay');
        expect(response.amount).toBe(1000);
      });
    });

    describe('ReservedAccountRequest', () => {
      it('should have correct structure', () => {
        const request: ReservedAccountRequest = {
          accountReference: 'ACC-123',
          accountName: 'John Doe Account',
          customerEmail: 'john@example.com',
          customerName: 'John Doe',
          contractCode: 'test-contract',
          customerBvn: '12345678901',
          currencyCode: 'NGN',
          getAllAvailableBanks: true,
          preferredBanks: ['044', '058'],
          metadata: { customerId: 'CUST-123' },
        };

        expect(request.accountReference).toBe('ACC-123');
        expect(request.customerBvn).toBe('12345678901');
        expect(request.preferredBanks).toEqual(['044', '058']);
      });
    });
  });

  describe('Disbursements Interfaces', () => {
    describe('SingleTransferRequest', () => {
      it('should have correct structure', () => {
        const request: SingleTransferRequest = {
          amount: 5000,
          reference: 'TRF-123',
          narration: 'Transfer to John',
          destinationBankCode: '044',
          destinationAccountNumber: '1234567890',
          destinationAccountName: 'John Doe',
          currency: 'NGN',
          sourceAccountNumber: '0987654321',
          metadata: { transferType: 'SALARY' },
        };

        expect(request.amount).toBe(5000);
        expect(request.destinationBankCode).toBe('044');
        expect(request.metadata).toEqual({ transferType: 'SALARY' });
      });
    });

    describe('BulkTransferRequest', () => {
      it('should have correct structure', () => {
        const request: BulkTransferRequest = {
          title: 'Bulk Transfer',
          batchReference: 'BATCH-123',
          narration: 'Monthly salary',
          sourceAccountNumber: '0987654321',
          currency: 'NGN',
          onValidationFailure: 'CONTINUE',
          notificationInterval: 30,
          transactions: [
            {
              amount: 50000,
              reference: 'TRF-001',
              narration: 'Salary for John',
              destinationBankCode: '044',
              destinationAccountNumber: '1234567890',
              destinationAccountName: 'John Doe',
              metadata: { employeeId: 'EMP-001' },
            },
          ],
        };

        expect(request.title).toBe('Bulk Transfer');
        expect(request.onValidationFailure).toBe('CONTINUE');
        expect(request.transactions).toHaveLength(1);
      });
    });
  });

  describe('Wallets Interfaces', () => {
    describe('CreateWalletRequest', () => {
      it('should have correct structure', () => {
        const request: CreateWalletRequest = {
          walletReference: 'WALLET-123',
          walletName: 'John Doe Wallet',
          customerEmail: 'john@example.com',
          customerName: 'John Doe',
          currencyCode: 'NGN',
          contractCode: 'test-contract',
          metadata: { customerId: 'CUST-123' },
        };

        expect(request.walletReference).toBe('WALLET-123');
        expect(request.walletName).toBe('John Doe Wallet');
        expect(request.metadata).toEqual({ customerId: 'CUST-123' });
      });
    });

    describe('WalletStatementRequest', () => {
      it('should have correct structure', () => {
        const request: WalletStatementRequest = {
          walletReference: 'WALLET-123',
          fromDate: '2024-01-01',
          toDate: '2024-12-31',
          pageSize: 50,
          pageNumber: 1,
        };

        expect(request.walletReference).toBe('WALLET-123');
        expect(request.fromDate).toBe('2024-01-01');
        expect(request.pageSize).toBe(50);
      });
    });
  });

  describe('Verification Interfaces', () => {
    describe('BvnVerificationRequest', () => {
      it('should have correct structure', () => {
        const request: BvnVerificationRequest = {
          bvn: '12345678901',
          dateOfBirth: '1990-01-01',
        };

        expect(request.bvn).toBe('12345678901');
        expect(request.dateOfBirth).toBe('1990-01-01');
      });

      it('should handle optional dateOfBirth', () => {
        const request: BvnVerificationRequest = {
          bvn: '12345678901',
        };

        expect(request.bvn).toBe('12345678901');
        expect(request.dateOfBirth).toBeUndefined();
      });
    });

    describe('BankAccountVerificationRequest', () => {
      it('should have correct structure', () => {
        const request: BankAccountVerificationRequest = {
          accountNumber: '1234567890',
          bankCode: '044',
        };

        expect(request.accountNumber).toBe('1234567890');
        expect(request.bankCode).toBe('044');
      });
    });

    describe('PhoneNumberVerificationRequest', () => {
      it('should have correct structure', () => {
        const request: PhoneNumberVerificationRequest = {
          phoneNumber: '+2348012345678',
        };

        expect(request.phoneNumber).toBe('+2348012345678');
      });
    });
  });

  describe('Common Interfaces', () => {
    describe('PaginationRequest', () => {
      it('should have correct structure', () => {
        const request: PaginationRequest = {
          pageSize: 25,
          pageNumber: 2,
        };

        expect(request.pageSize).toBe(25);
        expect(request.pageNumber).toBe(2);
      });
    });

    describe('PaginationResponse', () => {
      it('should have correct structure', () => {
        const response: PaginationResponse = {
          pageSize: 25,
          pageNumber: 2,
          totalCount: 100,
          totalPages: 4,
        };

        expect(response.pageSize).toBe(25);
        expect(response.totalCount).toBe(100);
        expect(response.totalPages).toBe(4);
      });
    });

    describe('Customer', () => {
      it('should have correct structure', () => {
        const customer: Customer = {
          email: 'john@example.com',
          name: 'John Doe',
          phoneNumber: '+2348012345678',
          bvn: '12345678901',
        };

        expect(customer.email).toBe('john@example.com');
        expect(customer.name).toBe('John Doe');
        expect(customer.phoneNumber).toBe('+2348012345678');
        expect(customer.bvn).toBe('12345678901');
      });
    });

    describe('Bank', () => {
      it('should have correct structure', () => {
        const bank: Bank = {
          code: '044',
          name: 'GTBank',
          longCode: '058152083',
          active: true,
          country: 'Nigeria',
          currency: 'NGN',
          type: 'Commercial',
        };

        expect(bank.code).toBe('044');
        expect(bank.name).toBe('GTBank');
        expect(bank.active).toBe(true);
      });
    });

    describe('Currency', () => {
      it('should have correct structure', () => {
        const currency: Currency = {
          code: 'NGN',
          name: 'Nigerian Naira',
          symbol: '₦',
        };

        expect(currency.code).toBe('NGN');
        expect(currency.name).toBe('Nigerian Naira');
        expect(currency.symbol).toBe('₦');
      });
    });

    describe('PaymentMethod', () => {
      it('should have correct structure', () => {
        const paymentMethod: PaymentMethod = {
          code: 'CARD',
          name: 'Credit/Debit Card',
          description: 'Pay with credit or debit card',
          active: true,
        };

        expect(paymentMethod.code).toBe('CARD');
        expect(paymentMethod.name).toBe('Credit/Debit Card');
        expect(paymentMethod.active).toBe(true);
      });
    });
  });

  describe('Interface Compatibility', () => {
    it('should allow MonnifyResponse with different types', () => {
      const stringResponse: MonnifyResponse<string> = {
        requestSuccessful: true,
        responseMessage: 'Success',
        responseCode: '200',
        responseBody: 'test-string',
      };

      const objectResponse: MonnifyResponse<{ id: string }> = {
        requestSuccessful: true,
        responseMessage: 'Success',
        responseCode: '200',
        responseBody: { id: '123' },
      };

      expect(stringResponse.responseBody).toBe('test-string');
      expect(objectResponse.responseBody.id).toBe('123');
    });

    it('should allow Metadata with any values', () => {
      const metadata: Metadata = {
        stringValue: 'test',
        numberValue: 123,
        booleanValue: true,
        objectValue: { key: 'value' },
        arrayValue: [1, 2, 3],
      };

      expect(metadata.stringValue).toBe('test');
      expect(metadata.numberValue).toBe(123);
      expect(metadata.booleanValue).toBe(true);
      expect(metadata.objectValue).toEqual({ key: 'value' });
      expect(metadata.arrayValue).toEqual([1, 2, 3]);
    });
  });
});
