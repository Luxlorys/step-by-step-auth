
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailConfirmationStepProps {
  email: string;
}

const EmailConfirmationStep: React.FC<EmailConfirmationStepProps> = ({ email }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Verification</h3>
        <p className="text-gray-500 text-sm">
          Type in your email and we'll send you a link to verify your account
        </p>
      </div>
      
      <div>
        <Label htmlFor="emailConfirm" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="emailConfirm"
          type="email"
          value={email}
          disabled
          className="mt-1 h-12 border-gray-200 bg-gray-50 text-gray-600"
        />
      </div>
    </div>
  );
};

export default EmailConfirmationStep;
