# @scwar/nestjs-monnify

A comprehensive NestJS module for integrating with the [Monnify API](https://developers.monnify.com/). This package provides a clean, type-safe interface for all Monnify services including collections, disbursements, wallets, and customer verification.

## Features

- 🚀 **Full Monnify API Coverage** - Collections, Disbursements, Wallets, Verification
- 🔒 **Type Safety** - Full TypeScript support with comprehensive interfaces
- 🏗️ **NestJS Native** - Built specifically for NestJS applications
- 🔄 **Automatic Retries** - Configurable retry logic with exponential backoff
- 🌍 **Environment Support** - Sandbox and production environments
- 📚 **Comprehensive Documentation** - Well-documented methods and interfaces
- 🧪 **Test Coverage** - Extensive test suite for reliability

## Installation

```bash
npm install @scwar/nestjs-monnify
```

## Quick Start

### 1. Import the Module

```typescript
import { Module } from '@nestjs/common';
import { MonnifyModule } from '@scwar/nestjs-monnify';

@Module({
  imports: [
    MonnifyModule.forRoot({
      secretKey: 'your-secret-key',
      publicKey: 'your-public-key',
      contractCode: 'your-contract-code',
      environment: 'sandbox', // or 'production'
    }),
  ],
})
export class AppModule {}
```

### 2. Use the Service

```typescript
import { Injectable } from '@nestjs/common';
import { MonnifyService } from '@scwar/nestjs-monnify';

@Injectable()
export class PaymentService {
  constructor(private readonly monnifyService: MonnifyService) {}

  async initializePayment() {
    const payment = await this.monnifyService.collections.initializeTransaction({
      amount: 1000,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      paymentReference: 'REF-123',
      paymentDescription: 'Payment for services',
      currencyCode: 'NGN',
      contractCode: 'your-contract-code',
      redirectUrl: 'https://yourapp.com/callback',
    });

    return payment;
  }
}
```

## Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `secretKey` | string | ✅ | - | Your Monnify secret key |
| `publicKey` | string | ✅ | - | Your Monnify public key |
| `contractCode` | string | ✅ | - | Your Monnify contract code |
| `environment` | 'sandbox' \| 'production' | ❌ | 'sandbox' | API environment |
| `baseUrl` | string | ❌ | Auto-detected | Custom API base URL |
| `timeout` | number | ❌ | 30000 | Request timeout in ms |
| `retries` | number | ❌ | 3 | Number of retry attempts |
| `retryDelay` | number | ❌ | 1000 | Initial retry delay in ms |
| `maxRetryDelay` | number | ❌ | 10000 | Maximum retry delay in ms |

## Services

### Collections Service

Handle payment collections and customer reserved accounts.

```typescript
// Initialize a transaction
const transaction = await monnifyService.collections.initializeTransaction({
  amount: 1000,
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  paymentReference: 'REF-123',
  paymentDescription: 'Payment for services',
  currencyCode: 'NGN',
  contractCode: 'your-contract-code',
});

// Get transaction status
const status = await monnifyService.collections.getTransactionStatus('transaction-ref');

// Create reserved account
const account = await monnifyService.collections.createReservedAccount({
  accountReference: 'ACC-123',
  accountName: 'John Doe Account',
  customerEmail: 'john@example.com',
  customerName: 'John Doe',
  contractCode: 'your-contract-code',
});
```

### Disbursements Service

Handle money transfers and disbursements.

```typescript
// Single transfer
const transfer = await monnifyService.disbursements.initiateSingleTransfer({
  amount: 1000,
  reference: 'TRF-123',
  narration: 'Transfer to John',
  destinationBankCode: '044',
  destinationAccountNumber: '1234567890',
  destinationAccountName: 'John Doe',
  currency: 'NGN',
  sourceAccountNumber: '0987654321',
});

// Bulk transfer
const bulkTransfer = await monnifyService.disbursements.initiateBulkTransfer({
  title: 'Bulk Transfer',
  batchReference: 'BATCH-123',
  narration: 'Bulk transfer to employees',
  sourceAccountNumber: '0987654321',
  currency: 'NGN',
  onValidationFailure: 'CONTINUE',
  notificationInterval: 30,
  transactions: [
    {
      amount: 1000,
      reference: 'TRF-001',
      narration: 'Transfer to John',
      destinationBankCode: '044',
      destinationAccountNumber: '1234567890',
      destinationAccountName: 'John Doe',
    },
  ],
});
```

### Wallets Service

Manage digital wallets and balance operations.

```typescript
// Create wallet
const wallet = await monnifyService.wallets.createWallet({
  walletReference: 'WALLET-123',
  walletName: 'John Doe Wallet',
  customerEmail: 'john@example.com',
  customerName: 'John Doe',
  currencyCode: 'NGN',
  contractCode: 'your-contract-code',
});

// Get wallet balance
const balance = await monnifyService.wallets.getWalletBalance('WALLET-123');

// Get wallet statement
const statement = await monnifyService.wallets.getWalletStatement({
  walletReference: 'WALLET-123',
  fromDate: '2024-01-01',
  toDate: '2024-12-31',
  pageSize: 10,
  pageNumber: 1,
});
```

### Verification Service

Verify customer information including BVN, bank accounts, and phone numbers.

```typescript
// Verify BVN
const bvn = await monnifyService.verification.verifyBvn({
  bvn: '12345678901',
  dateOfBirth: '1990-01-01',
});

// Verify bank account
const account = await monnifyService.verification.verifyBankAccount({
  accountNumber: '1234567890',
  bankCode: '044',
});

// Verify phone number
const phone = await monnifyService.verification.verifyPhoneNumber({
  phoneNumber: '+2348012345678',
});
```

## Async Configuration

For dynamic configuration (e.g., from environment variables):

```typescript
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MonnifyModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secretKey: configService.get('MONNIFY_SECRET_KEY'),
        publicKey: configService.get('MONNIFY_PUBLIC_KEY'),
        contractCode: configService.get('MONNIFY_CONTRACT_CODE'),
        environment: configService.get('MONNIFY_ENVIRONMENT'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Error Handling

The package provides comprehensive error handling:

```typescript
try {
  const result = await monnifyService.collections.initializeTransaction(request);
  // Handle success
} catch (error) {
  if (error.response?.data) {
    // Monnify API error
    console.error('Monnify Error:', error.response.data.responseMessage);
  } else {
    // Network or other error
    console.error('Error:', error.message);
  }
}
```

## Testing

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MonnifyModule } from '@scwar/nestjs-monnify';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MonnifyModule.forRoot({
          secretKey: 'test-secret',
          publicKey: 'test-public',
          contractCode: 'test-contract',
          environment: 'sandbox',
        }),
      ],
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Monnify API Documentation](https://developers.monnify.com/)
- 🐛 [Report Issues](https://github.com/kellslte/nestjs-monnify/issues)
- 💬 [Discussions](https://github.com/kellslte/nestjs-monnify/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
