import { WalletsService } from '../src/services/wallets.service';
import { MonnifyModuleOptions } from '../src/interfaces';

describe('WalletsService', () => {
  let service: WalletsService;
  let mockOptions: MonnifyModuleOptions;

  beforeEach(() => {
    mockOptions = {
      secretKey: 'test-secret-key',
      publicKey: 'test-public-key',
      contractCode: 'test-contract-code',
      environment: 'sandbox',
    };
    service = new WalletsService(mockOptions);
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

  describe('createWallet', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
        walletReference: 'WALLET-123',
        walletName: 'John Doe Wallet',
        customerEmail: 'john@example.com',
        customerName: 'John Doe',
        currencyCode: 'NGN',
        contractCode: 'test-contract-code',
        metadata: { customerId: 'CUST-456' },
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.createWallet(mockRequest);

      expect(service['post']).toHaveBeenCalledWith('/api/v1/wallets/create', {
        ...mockRequest,
        contractCode: 'test-contract-code',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWallets', () => {
    it('should call get with correct endpoint and params', async () => {
      const pageSize = 25;
      const pageNumber = 3;
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.getWallets(pageSize, pageNumber);

      expect(service['get']).toHaveBeenCalledWith('/api/v1/wallets', {
        pageSize,
        pageNumber,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should use default pagination values', async () => {
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      await service.getWallets();

      expect(service['get']).toHaveBeenCalledWith('/api/v1/wallets', {
        pageSize: 10,
        pageNumber: 1,
      });
    });
  });

  describe('getWalletBalance', () => {
    it('should call get with correct endpoint', async () => {
      const walletReference = 'WALLET-123';
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.getWalletBalance(walletReference);

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/wallets/WALLET-123/balance',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWalletStatement', () => {
    it('should call get with correct endpoint and params', async () => {
      const mockRequest = {
        walletReference: 'WALLET-123',
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
        pageSize: 50,
        pageNumber: 1,
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.getWalletStatement(mockRequest);

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/wallets/WALLET-123/statement',
        {
          fromDate: '2024-01-01',
          toDate: '2024-12-31',
          pageSize: 50,
          pageNumber: 1,
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle optional parameters', async () => {
      const mockRequest = {
        walletReference: 'WALLET-123',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      await service.getWalletStatement(mockRequest);

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/wallets/WALLET-123/statement',
        {},
      );
    });
  });
});
