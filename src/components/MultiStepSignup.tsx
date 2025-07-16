
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FormData, steps } from '@/types/signup';
import StepProgress from './signup/StepProgress';
import ContactDetailsStep from './signup/ContactDetailsStep';
import EmailConfirmationStep from './signup/EmailConfirmationStep';
import OTPVerificationStep from './signup/OTPVerificationStep';
import NetworkDetailsStep from './signup/NetworkDetailsStep';
import CompanyDetailsStep from './signup/CompanyDetailsStep';
import EstimatedCost from './signup/EstimatedCost';
import PasswordStep from './signup/PasswordStep';
import RegistrationSuccess from './signup/RegistrationSuccess';

const MultiStepSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    websiteUrl: '',
    isOfficialNetwork: false,
    uploadedFiles: [],
    organizationName: '',
    country: '',
    city: '',
    street: '',
    postCode: '',
    vatNumber: '',
    companyNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ 
      ...prev, 
      uploadedFiles: [...prev.uploadedFiles, ...files] 
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOTPChange = (value: string) => {
    setOtpValue(value);
  };

  const isStep1Valid = formData.fullName && formData.email && formData.phoneNumber;
  const isStep3Valid = otpValue.length === 6;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactDetailsStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 2:
        return (
          <NetworkDetailsStep 
            formData={formData} 
            onInputChange={handleInputChange}
            onFileUpload={handleFileUpload}
            onRemoveFile={removeFile}
          />
        );
      case 3:
        return (
          <CompanyDetailsStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 5:
        return (
          <PasswordStep 
            formData={formData} 
            onInputChange={handleInputChange}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        );
      case 6:
        return (
          <EmailConfirmationStep 
            email={formData.email} 
          />
        );
      case 7:
        return (
          <OTPVerificationStep 
            onOTPChange={handleOTPChange} 
          />
        );
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 5) return 'Register';
    if (currentStep === 6) return 'Continue';
    if (currentStep === 7) return 'Complete';
    return 'Continue';
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !isStep1Valid;
    if (currentStep === 7) return !isStep3Valid;
    return false;
  };

  const getProgressStep = () => {
    if (currentStep <= 3) return currentStep;
    if (currentStep === 4) return 3; // EstimatedCost shows as step 3
    if (currentStep >= 5) return 4; // Password and beyond show as step 4
    return 4;
  };

  // Special rendering for EstimatedCost step
  if (currentStep === 4) {
    return <EstimatedCost onContinue={handleNext} />;
  }

  // Special rendering for RegistrationSuccess step
  if (currentStep === 8) {
    return <RegistrationSuccess onSignIn={handleSignIn} />;
  }

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
        {/* Progress Steps - Only show for steps 1-5 (but not EstimatedCost step 4) */}
        {currentStep <= 5 && currentStep !== 4 && (
          <StepProgress 
            steps={steps} 
            currentStep={getProgressStep()} 
          />
        )}

        {/* Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-6">
            <h2 className="text-2xl font-semibold text-center">
              {currentStep === 6 || currentStep === 7 ? '' : 'Sign up'}
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && currentStep !== 6 && currentStep !== 7 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              
              {currentStep === 1 && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/signin')}
                  className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
                >
                  Sign in
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`h-12 ${currentStep === 1 ? 'flex-1' : 'flex-1'} bg-black hover:bg-gray-800 text-white`}
              >
                {getButtonText()}
              </Button>
            </div>

            {/* Terms and Privacy */}
            {(currentStep === 2 || currentStep === 3 || currentStep === 5) && (
              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you indicate that you've read and agree to our{' '}
                <span className="underline cursor-pointer">Term of Service</span> and{' '}
                <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            )}
          </CardContent>
        </Card>

        </div>
      </div>

      {/* Footer at bottom center */}
      <div className="text-center p-4">
        <p className="text-xs text-gray-400">© copyright 2025 YouInTown</p>
      </div>
    </div>
  );
};

export default MultiStepSignup;
