import { DisbursementsService } from '../src/services/disbursements.service';
import { MonnifyModuleOptions } from '../src/interfaces';

describe('DisbursementsService', () => {
  let service: DisbursementsService;
  let mockOptions: MonnifyModuleOptions;

  beforeEach(() => {
    mockOptions = {
      secretKey: 'test-secret-key',
      publicKey: 'test-public-key',
      contractCode: 'test-contract-code',
      environment: 'sandbox',
    };
    service = new DisbursementsService(mockOptions);
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

  describe('initiateSingleTransfer', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
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

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.initiateSingleTransfer(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/disbursements/single',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('initiateBulkTransfer', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockRequest = {
        title: 'Bulk Transfer',
        batchReference: 'BATCH-123',
        narration: 'Bulk transfer to employees',
        sourceAccountNumber: '0987654321',
        currency: 'NGN',
        onValidationFailure: 'CONTINUE' as const,
        notificationInterval: 30,
        transactions: [
          {
            amount: 50000,
            reference: 'TRF-001',
            narration: 'Transfer to John',
            destinationBankCode: '044',
            destinationAccountNumber: '1234567890',
            destinationAccountName: 'John Doe',
            metadata: { employeeId: 'EMP-001' },
          },
        ],
      };

      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.initiateBulkTransfer(mockRequest);

      expect(service['post']).toHaveBeenCalledWith(
        '/api/v1/disbursements/bulk',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransferStatus', () => {
    it('should call get with correct endpoint', async () => {
      const reference = 'TRF-123';
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.getTransferStatus(reference);

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/disbursements/TRF-123',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransferLogs', () => {
    it('should call get with correct endpoint and params', async () => {
      const pageSize = 20;
      const pageNumber = 2;
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.getTransferLogs(pageSize, pageNumber);

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/disbursements/logs',
        { pageSize, pageNumber },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should use default pagination values', async () => {
      const mockResponse = { data: 'success' };
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      await service.getTransferLogs();

      expect(service['get']).toHaveBeenCalledWith(
        '/api/v1/disbursements/logs',
        { pageSize: 10, pageNumber: 1 },
      );
    });
  });
});
