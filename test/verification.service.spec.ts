import { VerificationService } from '../src/services/verification.service';
import { MonnifyModuleOptions } from '../src/interfaces';

describe('VerificationService', () => {
  let service: VerificationService;
  let mockOptions: MonnifyModuleOptions;

  beforeEach(() => {
    mockOptions = {
      secretKey: 'test-secret-key',
      publicKey: 'test-public-key',
      contractCode: 'test-contract-code',
      environment: 'sandbox',
    };
    service = new VerificationService(mockOptions);
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

  describe('verifyBvn', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
        bvn: '12345678901',
        dateOfBirth: '1990-01-01',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.verifyBvn(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/vas/bvn-verification',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle request without dateOfBirth', async () => {
      const mockRequest = {
        bvn: '12345678901',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.verifyBvn(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/vas/bvn-verification',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyBankAccount', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
        accountNumber: '1234567890',
        bankCode: '044',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.verifyBankAccount(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/vas/bank-account-verification',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyPhoneNumber', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
        phoneNumber: '+2348012345678',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.verifyPhoneNumber(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/vas/phone-number-verification',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle different phone number formats', async () => {
      const mockRequest = {
        phoneNumber: '08012345678',
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.verifyPhoneNumber(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/vas/phone-number-verification',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
