export interface BvnVerificationRequest {
  bvn: string;
  dateOfBirth?: string;
}

export interface BvnVerificationResponse {
  bvn: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  phoneNumber: string;
  registrationDate: string;
  enrollmentBank: string;
  enrollmentBranch: string;
  imageUrl?: string;
  address: string;
  gender: string;
  email?: string;
  levelOfAccount: string;
  lgaOfOrigin: string;
  lgaOfResidence: string;
  maritalStatus: string;
  nin?: string;
  nameOnCard?: string;
  nationality: string;
  occupation: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  title: string;
  watchListed: string;
}

export interface BankAccountVerificationRequest {
  accountNumber: string;
  bankCode: string;
}

export interface BankAccountVerificationResponse {
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
}

export interface PhoneNumberVerificationRequest {
  phoneNumber: string;
}

export interface PhoneNumberVerificationResponse {
  phoneNumber: string;
  isValid: boolean;
  carrier: string;
  countryCode: string;
  countryName: string;
}
