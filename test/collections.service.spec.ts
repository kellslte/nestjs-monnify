import { CollectionsService } from '../src/services/collections.service';
import { MonnifyModuleOptions } from '../src/interfaces';

describe('CollectionsService', () => {
  let service: CollectionsService;
  let mockOptions: MonnifyModuleOptions;

  beforeEach(() => {
    mockOptions = {
      secretKey: 'test-secret-key',
      publicKey: 'test-public-key',
      contractCode: 'test-contract-code',
      environment: 'sandbox',
    };
    service = new CollectionsService(mockOptions);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have correct options', () => {
    expect(service['options']).toEqual(mockOptions);
  });

  it('should have http client', () => {
    expect(service['httpClient']).toBeDefined();
  });

  describe('initializeTransaction', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
        amount: 1000,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        paymentReference: 'REF-123',
        paymentDescription: 'Test payment',
        currencyCode: 'NGN',
        contractCode: 'test-contract-code',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.initializeTransaction(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/merchant/transactions/init-transaction',
        {
          ...mockRequest,
          contractCode: 'test-contract-code',
        },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransactionStatus', () => {
    it('should call get with correct endpoint and params', async () => {
      const transactionReference = 'TRX-123';
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.getTransactionStatus(transactionReference);

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/merchant/transactions/query',
        { transactionReference },
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
