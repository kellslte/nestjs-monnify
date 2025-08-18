import { Test, TestingModule } from '@nestjs/testing';
import { MonnifyService } from '../src/monnify.service';
import { MonnifyModule } from '../src/monnify.module';

describe('MonnifyService', () => {
  let service: MonnifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MonnifyModule.forRoot({
          secretKey: 'test-secret-key',
          publicKey: 'test-public-key',
          contractCode: 'test-contract-code',
          environment: 'sandbox',
        }),
      ],
    }).compile();

    service = module.get<MonnifyService>(MonnifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have collections service', () => {
    expect(service.collections).toBeDefined();
  });

  it('should have disbursements service', () => {
    expect(service.disbursements).toBeDefined();
  });

  it('should have wallets service', () => {
    expect(service.wallets).toBeDefined();
  });

  it('should have verification service', () => {
    expect(service.verification).toBeDefined();
  });

  it('should return correct options', () => {
    const options = service.getOptions();
    expect(options.secretKey).toBe('test-secret-key');
    expect(options.publicKey).toBe('test-public-key');
    expect(options.contractCode).toBe('test-contract-code');
    expect(options.environment).toBe('sandbox');
  });

  it('should detect sandbox environment', () => {
    expect(service.isProduction()).toBe(false);
  });

  it('should return correct base URL for sandbox', () => {
    const baseUrl = service.getBaseUrl();
    expect(baseUrl).toContain('sandbox-api.monnify.com');
  });
});
