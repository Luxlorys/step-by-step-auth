
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
import PasswordStep from './signup/PasswordStep';

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
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 6) {
      // Complete registration and redirect to analytics
      login();
      navigate('/analytics');
    }
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
      case 4:
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
      case 5:
        return (
          <EmailConfirmationStep 
            email={formData.email} 
          />
        );
      case 6:
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
    if (currentStep === 4) return 'Register';
    if (currentStep === 5) return 'Continue';
    if (currentStep === 6) return 'Complete';
    return 'Continue';
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !isStep1Valid;
    if (currentStep === 6) return !isStep3Valid;
    return false;
  };

  const getProgressStep = () => {
    if (currentStep <= 4) return currentStep;
    return 4;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">YT</span>
            </div>
            <span className="font-semibold text-lg">YouInTown</span>
          </div>
          <h1 className="text-sm text-gray-600 mb-6">Sign up {currentStep}</h1>
        </div>

        {/* Progress Steps - Only show for steps 1-4 */}
        {currentStep <= 4 && (
          <StepProgress 
            steps={steps} 
            currentStep={getProgressStep()} 
          />
        )}

        {/* Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-6">
            <h2 className="text-2xl font-semibold text-center">
              {currentStep === 5 || currentStep === 6 ? 'Verification' : 'Sign up'}
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && currentStep !== 5 && currentStep !== 6 && (
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
            {(currentStep === 2 || currentStep === 3 || currentStep === 4) && (
              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you indicate that you've read and agree to our{' '}
                <span className="underline cursor-pointer">Term of Service</span> and{' '}
                <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">© copyright 2025 YouInTown</p>
        </div>
      </div>
    </div>
  );
};

export default MultiStepSignup;
