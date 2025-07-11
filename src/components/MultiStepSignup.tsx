
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

const steps = [
  { id: 1, title: 'Contact details', description: 'Enter your personal information' },
  { id: 2, title: 'Network details', description: 'Set up your network preferences' },
  { id: 3, title: 'Company details', description: 'Add your company information' },
  { id: 4, title: 'Create password', description: 'Secure your account' },
];

const MultiStepSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = formData.fullName && formData.email && formData.phoneNumber;

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
          <h1 className="text-sm text-gray-600 mb-6">Sign up 1</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep === step.id 
                    ? 'bg-black text-white' 
                    : currentStep > step.id
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <span className={`text-xs mt-1 text-center max-w-20 ${
                  currentStep === step.id ? 'text-black font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${
                  currentStep > step.id ? 'bg-black' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-6">
            <h2 className="text-2xl font-semibold text-center">Sign up</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
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
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium mb-2">Network Details</h3>
                <p className="text-gray-500">This step will be implemented next.</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium mb-2">Company Details</h3>
                <p className="text-gray-500">This step will be implemented next.</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium mb-2">Create Password</h3>
                <p className="text-gray-500">This step will be implemented next.</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
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
                  className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
                >
                  Sign in
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && !isStep1Valid}
                className={`h-12 ${currentStep === 1 ? 'flex-1' : 'flex-1'} bg-black hover:bg-gray-800 text-white`}
              >
                {currentStep === 4 ? 'Complete' : 'Continue'}
              </Button>
            </div>

            {/* Terms and Privacy */}
            {currentStep === 1 && (
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
