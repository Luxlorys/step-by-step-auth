
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/signup';

interface ContactDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean | File[]) => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full name
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
          Phone number
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={(e) => onInputChange('phoneNumber', e.target.value)}
          className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
        />
      </div>
    </div>
  );
};

export default ContactDetailsStep;
