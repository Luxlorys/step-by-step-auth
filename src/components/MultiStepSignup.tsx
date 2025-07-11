import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Upload, X, Info, Eye, EyeOff } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
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

const steps = [
  { id: 1, title: 'Contact details', description: 'Enter your personal information' },
  { id: 2, title: 'Network details', description: 'Set up your network preferences' },
  { id: 3, title: 'Company details', description: 'Add your company information' },
  { id: 4, title: 'Create password', description: 'Secure your account' },
];

const MultiStepSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          <h1 className="text-sm text-gray-600 mb-6">Sign up {currentStep}</h1>
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
              <div className="space-y-6">
                {/* Official Network Checkbox */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="officialNetwork"
                    checked={formData.isOfficialNetwork}
                    onCheckedChange={(checked) => handleInputChange('isOfficialNetwork', checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="officialNetwork" className="text-sm font-medium text-gray-900">
                        This is an official or affiliated Network
                      </Label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      You agree that you are officially representing the company/organisation you are setting up the network for.
                    </p>
                  </div>
                </div>

                {/* Website URL Input */}
                <div>
                  <Label htmlFor="websiteUrl" className="text-sm font-medium text-gray-700">
                    Website URL (optional)
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="Enter link"
                    value={formData.websiteUrl}
                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                    className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Upload a file to import tender mandate template
                  </Label>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        Drop your file here or{' '}
                        <label htmlFor="fileUpload" className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                          Browse
                        </label>
                      </div>
                      <p className="text-xs text-gray-400">
                        Pdf, JPG, JPEG, Png (max. 100 MB)
                      </p>
                    </div>
                    <input
                      id="fileUpload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Uploaded Files List */}
                  {formData.uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                {/* Organization Name */}
                <div>
                  <Label htmlFor="organizationName" className="text-sm font-medium text-gray-700">
                    Organization name
                  </Label>
                  <Input
                    id="organizationName"
                    type="text"
                    placeholder="Enter organization name"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>

                {/* Country and City in one row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Enter country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                    />
                  </div>
                </div>

                {/* Street */}
                <div>
                  <Label htmlFor="street" className="text-sm font-medium text-gray-700">
                    Street
                  </Label>
                  <Input
                    id="street"
                    type="text"
                    placeholder="Enter address"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>

                {/* Post Code */}
                <div>
                  <Label htmlFor="postCode" className="text-sm font-medium text-gray-700">
                    Post code
                  </Label>
                  <Input
                    id="postCode"
                    type="text"
                    placeholder="Post code"
                    value={formData.postCode}
                    onChange={(e) => handleInputChange('postCode', e.target.value)}
                    className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>

                {/* VAT Number and Company Number in one row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vatNumber" className="text-sm font-medium text-gray-700">
                      VAT number
                    </Label>
                    <Input
                      id="vatNumber"
                      type="text"
                      placeholder="Enter number"
                      value={formData.vatNumber}
                      onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                      className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyNumber" className="text-sm font-medium text-gray-700">
                      Company number
                    </Label>
                    <Input
                      id="companyNumber"
                      type="text"
                      placeholder="Enter number"
                      value={formData.companyNumber}
                      onChange={(e) => handleInputChange('companyNumber', e.target.value)}
                      className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password (>8 characters)"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-12 border-gray-200 focus:border-black focus:ring-black pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password (>8 characters)"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="h-12 border-gray-200 focus:border-black focus:ring-black pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
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
