import React from 'react';
import { Button } from '@/components/ui/button';

interface RegistrationSuccessProps {
  onSignIn: () => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ onSignIn }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg border-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Registration application submitted successfully!
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for creating your Network in YouInTown. Your application will be reviewed within 72 hours and once your account is activated, you will receive a confirmation email.
        </p>
        <Button
          onClick={onSignIn}
          className="w-full h-12 bg-black hover:bg-gray-800 text-white"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;