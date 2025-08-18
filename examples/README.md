# Monnify NestJS Package Examples

This directory contains practical examples of how to use the `@scwar/nestjs-monnify` package.

## Files

- **`basic-usage.ts`** - Comprehensive examples covering all major features:
  - Payment initialization and status checking
  - Customer reserved account creation
  - Money transfers (single and bulk)
  - Wallet management
  - Customer verification (BVN, bank account, phone)

## Quick Start

1. **Install the package:**
   ```bash
   npm install @scwar/nestjs-monnify
   ```

2. **Configure the module:**
   ```typescript
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

3. **Use the service:**
   ```typescript
   import { MonnifyService } from '@scwar/nestjs-monnify';

   @Injectable()
   export class PaymentService {
     constructor(private readonly monnifyService: MonnifyService) {}

     async processPayment() {
       const transaction = await this.monnifyService.collections.initializeTransaction({
         amount: 1000, // Amount in kobo (₦10.00)
         customerName: 'John Doe',
         customerEmail: 'john@example.com',
         paymentReference: 'REF-123',
         paymentDescription: 'Payment for services',
         currencyCode: 'NGN',
         contractCode: 'your-contract-code',
       });

       return transaction.responseBody.checkoutUrl;
     }
   }
   ```

## Environment Variables

Set these environment variables for production use:

```bash
MONNIFY_SECRET_KEY=your-secret-key
MONNIFY_PUBLIC_KEY=your-public-key
MONNIFY_CONTRACT_CODE=your-contract-code
MONNIFY_ENVIRONMENT=production
```

## Features Demonstrated

### Collections Service
- Initialize payment transactions
- Check transaction status
- Create customer reserved accounts
- List transactions and accounts

### Disbursements Service
- Single money transfers
- Bulk transfers for multiple recipients
- Transfer status tracking

### Wallets Service
- Create digital wallets
- Check wallet balances
- Get transaction statements

### Verification Service
- BVN (Bank Verification Number) verification
- Bank account verification
- Phone number verification

## Error Handling

All examples include proper error handling:

```typescript
try {
  const result = await this.monnifyService.collections.initializeTransaction(request);
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

Run the examples with:

```bash
# Build the package
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:cov
```

## Support

For more information, see:
- [Package README](../README.md)
- [Monnify API Documentation](https://developers.monnify.com/)
- [GitHub Repository](https://github.com/kellslte/nestjs-monnify)
