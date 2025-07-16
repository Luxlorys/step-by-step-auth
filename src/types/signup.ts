
export interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  networkName: string;
  networkDescription: string;
  networkType: string;
  websiteUrl: string;
  isOfficialNetwork: boolean;
  uploadedFiles: File[];
  organizationName: string;
  country: string;
  city: string;
  street: string;
  postCode: string;
  vatNumber: string;
  companyNumber: string;
  password: string;
  confirmPassword: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  { id: 1, title: 'Contact details', description: 'Enter your personal information' },
  { id: 2, title: 'Network details', description: 'Set up your network preferences' },
  { id: 3, title: 'Company details', description: 'Add your company information' },
  { id: 4, title: 'Create password', description: 'Secure your account' },
];
