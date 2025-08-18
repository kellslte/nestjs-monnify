import {
  MONNIFY_MODULE_OPTIONS,
  MONNIFY_API_BASE_URL,
  MONNIFY_API_BASE_URL_PRODUCTION,
  MONNIFY_ENDPOINTS,
} from '../src/constants';

describe('Monnify Constants', () => {
  describe('MONNIFY_MODULE_OPTIONS', () => {
    it('should be defined', () => {
      expect(MONNIFY_MODULE_OPTIONS).toBeDefined();
      expect(typeof MONNIFY_MODULE_OPTIONS).toBe('string');
    });

    it('should have correct value', () => {
      expect(MONNIFY_MODULE_OPTIONS).toBe('MONNIFY_MODULE_OPTIONS');
    });
  });

  describe('API Base URLs', () => {
    it('should have sandbox URL', () => {
      expect(MONNIFY_API_BASE_URL).toBeDefined();
      expect(typeof MONNIFY_API_BASE_URL).toBe('string');
      expect(MONNIFY_API_BASE_URL).toContain('sandbox-api.monnify.com');
    });

    it('should have production URL', () => {
      expect(MONNIFY_API_BASE_URL_PRODUCTION).toBeDefined();
      expect(typeof MONNIFY_API_BASE_URL_PRODUCTION).toBe('string');
      expect(MONNIFY_API_BASE_URL_PRODUCTION).toContain('api.monnify.com');
    });

    it('should have different URLs for sandbox and production', () => {
      expect(MONNIFY_API_BASE_URL).not.toBe(MONNIFY_API_BASE_URL_PRODUCTION);
    });
  });

  describe('MONNIFY_ENDPOINTS', () => {
    it('should be defined', () => {
      expect(MONNIFY_ENDPOINTS).toBeDefined();
      expect(typeof MONNIFY_ENDPOINTS).toBe('object');
    });

    describe('Collections Endpoints', () => {
      it('should have transaction endpoints', () => {
        expect(MONNIFY_ENDPOINTS.INITIALIZE_TRANSACTION).toBe(
          '/api/v1/merchant/transactions/init-transaction',
        );
        expect(MONNIFY_ENDPOINTS.GET_TRANSACTION_STATUS).toBe(
          '/api/v1/merchant/transactions/query',
        );
        expect(MONNIFY_ENDPOINTS.GET_ALL_TRANSACTIONS).toBe(
          '/api/v1/merchant/transactions/list',
        );
        expect(MONNIFY_ENDPOINTS.GET_TRANSACTION_LOGS).toBe(
          '/api/v1/merchant/transactions/transaction-log',
        );
      });

      it('should have reserved account endpoints', () => {
        expect(MONNIFY_ENDPOINTS.CREATE_RESERVED_ACCOUNT).toBe(
          '/api/v1/bank-transfer/reserved-accounts/create',
        );
        expect(MONNIFY_ENDPOINTS.GET_RESERVED_ACCOUNTS).toBe(
          '/api/v1/bank-transfer/reserved-accounts',
        );
        expect(MONNIFY_ENDPOINTS.GET_RESERVED_ACCOUNT_TRANSACTIONS).toBe(
          '/api/v1/bank-transfer/reserved-accounts/transactions',
        );
      });

      it('should have invoice endpoints', () => {
        expect(MONNIFY_ENDPOINTS.CREATE_INVOICE).toBe(
          '/api/v1/merchant/invoices/create',
        );
        expect(MONNIFY_ENDPOINTS.GET_INVOICES).toBe(
          '/api/v1/merchant/invoices',
        );
        expect(MONNIFY_ENDPOINTS.GET_INVOICE).toBe(
          '/api/v1/merchant/invoices/{invoiceReference}',
        );
        expect(MONNIFY_ENDPOINTS.CANCEL_INVOICE).toBe(
          '/api/v1/merchant/invoices/{invoiceReference}/cancel',
        );
      });
    });

    describe('Disbursements Endpoints', () => {
      it('should have transfer endpoints', () => {
        expect(MONNIFY_ENDPOINTS.INITIATE_SINGLE_TRANSFER).toBe(
          '/api/v1/disbursements/single',
        );
        expect(MONNIFY_ENDPOINTS.INITIATE_BULK_TRANSFER).toBe(
          '/api/v1/disbursements/bulk',
        );
        expect(MONNIFY_ENDPOINTS.GET_TRANSFER_STATUS).toBe(
          '/api/v1/disbursements/{reference}',
        );
        expect(MONNIFY_ENDPOINTS.GET_TRANSFER_LOGS).toBe(
          '/api/v1/disbursements/logs',
        );
      });
    });

    describe('Wallets Endpoints', () => {
      it('should have wallet endpoints', () => {
        expect(MONNIFY_ENDPOINTS.CREATE_WALLET).toBe('/api/v1/wallets/create');
        expect(MONNIFY_ENDPOINTS.GET_WALLETS).toBe('/api/v1/wallets');
        expect(MONNIFY_ENDPOINTS.GET_WALLET_BALANCE).toBe(
          '/api/v1/wallets/{walletReference}/balance',
        );
        expect(MONNIFY_ENDPOINTS.GET_WALLET_STATEMENT).toBe(
          '/api/v1/wallets/{walletReference}/statement',
        );
      });
    });

    describe('Verification Endpoints', () => {
      it('should have verification endpoints', () => {
        expect(MONNIFY_ENDPOINTS.VERIFY_BVN).toBe(
          '/api/v1/vas/bvn-verification',
        );
        expect(MONNIFY_ENDPOINTS.VERIFY_BANK_ACCOUNT).toBe(
          '/api/v1/vas/bank-account-verification',
        );
        expect(MONNIFY_ENDPOINTS.VERIFY_PHONE_NUMBER).toBe(
          '/api/v1/vas/phone-number-verification',
        );
      });
    });

    describe('Endpoint Structure', () => {
      it('should have all endpoints starting with /api/v1', () => {
        const endpoints = Object.values(MONNIFY_ENDPOINTS);
        endpoints.forEach((endpoint) => {
          expect(endpoint).toMatch(/^\/api\/v1/);
        });
      });

      it('should have consistent endpoint naming', () => {
        // Check that endpoints follow a consistent pattern
        const endpoints = Object.values(MONNIFY_ENDPOINTS);

        // All endpoints should be strings
        endpoints.forEach((endpoint) => {
          expect(typeof endpoint).toBe('string');
        });

        // All endpoints should start with forward slash
        endpoints.forEach((endpoint) => {
          expect(endpoint).toMatch(/^\//);
        });
      });

      it('should have no duplicate endpoints', () => {
        const endpoints = Object.values(MONNIFY_ENDPOINTS);
        const uniqueEndpoints = new Set(endpoints);
        // Log the actual count for debugging
        console.log(
          `Total endpoints: ${endpoints.length}, Unique endpoints: ${uniqueEndpoints.size}`,
        );
        expect(endpoints.length).toBe(uniqueEndpoints.size);
      });
    });

    describe('Endpoint Placeholders', () => {
      it('should have consistent placeholder format', () => {
        const endpointsWithPlaceholders = [
          MONNIFY_ENDPOINTS.GET_INVOICE,
          MONNIFY_ENDPOINTS.CANCEL_INVOICE,
          MONNIFY_ENDPOINTS.GET_TRANSFER_STATUS,
          MONNIFY_ENDPOINTS.GET_WALLET_BALANCE,
          MONNIFY_ENDPOINTS.GET_WALLET_STATEMENT,
        ];

        endpointsWithPlaceholders.forEach((endpoint) => {
          expect(endpoint).toMatch(/\{[^}]+\}/);
        });
      });

      it('should have meaningful placeholder names', () => {
        expect(MONNIFY_ENDPOINTS.GET_INVOICE).toContain('{invoiceReference}');
        expect(MONNIFY_ENDPOINTS.CANCEL_INVOICE).toContain(
          '{invoiceReference}',
        );
        expect(MONNIFY_ENDPOINTS.GET_TRANSFER_STATUS).toContain('{reference}');
        expect(MONNIFY_ENDPOINTS.GET_WALLET_BALANCE).toContain(
          '{walletReference}',
        );
        expect(MONNIFY_ENDPOINTS.GET_WALLET_STATEMENT).toContain(
          '{walletReference}',
        );
      });
    });
  });

  describe('Constants Usage', () => {
    it('should allow constants to be used in string operations', () => {
      const baseUrl = MONNIFY_API_BASE_URL;
      const endpoint = MONNIFY_ENDPOINTS.INITIALIZE_TRANSACTION;
      const fullUrl = baseUrl + endpoint;

      expect(fullUrl).toBe(
        'https://sandbox-api.monnify.com/api/v1/merchant/transactions/init-transaction',
      );
    });

    it('should allow constants to be used in object destructuring', () => {
      const { INITIALIZE_TRANSACTION, GET_TRANSACTION_STATUS } =
        MONNIFY_ENDPOINTS;

      expect(INITIALIZE_TRANSACTION).toBe(
        '/api/v1/merchant/transactions/init-transaction',
      );
      expect(GET_TRANSACTION_STATUS).toBe(
        '/api/v1/merchant/transactions/query',
      );
    });

    it('should allow constants to be used in array operations', () => {
      const endpoints = [
        MONNIFY_ENDPOINTS.INITIALIZE_TRANSACTION,
        MONNIFY_ENDPOINTS.GET_TRANSACTION_STATUS,
        MONNIFY_ENDPOINTS.GET_ALL_TRANSACTIONS,
      ];

      expect(endpoints).toHaveLength(3);
      expect(endpoints[0]).toContain('init-transaction');
      expect(endpoints[1]).toContain('query');
      expect(endpoints[2]).toContain('list');
    });
  });
});
