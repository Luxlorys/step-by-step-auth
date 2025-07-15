import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailStep from '@/components/forgotPassword/EmailStep';
import OTPStep from '@/components/forgotPassword/OTPStep';
import ResetPasswordStep from '@/components/forgotPassword/ResetPasswordStep';
import SuccessStep from '@/components/forgotPassword/SuccessStep';

export interface ForgotPasswordData {
  email: string;
  otp: string;
  newPassword: string;
  repeatPassword: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
    otp: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBackToSignIn = () => {
    navigate('/signin');
  };

  const handleFormChange = (data: Partial<ForgotPasswordData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmailStep
            data={formData}
            onNext={handleNext}
            onBackToSignIn={handleBackToSignIn}
            onFormChange={handleFormChange}
          />
        );
      case 2:
        return (
          <OTPStep
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            onFormChange={handleFormChange}
          />
        );
      case 3:
        return (
          <ResetPasswordStep
            data={formData}
            onNext={handleNext}
            onBackToSignIn={handleBackToSignIn}
            onFormChange={handleFormChange}
          />
        );
      case 4:
        return (
          <SuccessStep
            onSignIn={handleBackToSignIn}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Logo at top left */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">YT</span>
          </div>
          <span className="font-semibold text-lg">YouInTown</span>
        </div>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>

      {/* Footer at bottom center */}
      <div className="text-center p-4">
        <p className="text-xs text-gray-400">© copyright 2025 YouInTown</p>
      </div>
    </div>
  );
};

export default ForgotPassword;