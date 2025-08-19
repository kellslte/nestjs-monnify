# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [1.0.2] - 2025-08-19

### Added
- Version bump to 1.0.2


## [1.0.1] - 2025-08-18

### Added
- Version bump to 1.0.1



### Added
- Initial release of @scwar/nestjs-monnify package
- Full Monnify API integration with NestJS
- Collections service for payment operations
- Disbursements service for transfer operations
- Wallets service for wallet management
- Verification service for customer verification
- Comprehensive TypeScript interfaces
- Automatic retry logic with exponential backoff
- Environment support (sandbox/production)
- Global module configuration
- Async configuration support
- Extensive error handling
- Full test coverage

### Features
- **Collections Service**
  - Initialize transactions
  - Get transaction status
  - List all transactions
  - Get transaction logs
  - Create reserved accounts
  - Manage customer accounts

- **Disbursements Service**
  - Single transfers
  - Bulk transfers
  - Transfer status tracking
  - Transfer logs

- **Wallets Service**
  - Create wallets
  - Get wallet balance
  - Wallet statements
  - Wallet management

- **Verification Service**
  - BVN verification
  - Bank account verification
  - Phone number verification

### Technical
- Built with TypeScript and NestJS
- HTTP client with retry mechanism
- Base service architecture
- Comprehensive error handling
- ESLint and Prettier configuration
- Jest testing framework
- Conventional changelog support

## [1.0.0] - 2024-12-19

### Added
- Initial release
- Core Monnify API integration
- All major services implemented
- TypeScript support
- NestJS module integration
- Comprehensive documentation
- Example usage and testing
