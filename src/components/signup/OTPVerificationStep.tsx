
import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface OTPVerificationStepProps {
  onOTPChange: (value: string) => void;
}

const OTPVerificationStep: React.FC<OTPVerificationStepProps> = ({ onOTPChange }) => {
  const [otp, setOTP] = useState('');
  
  const handleOTPChange = (value: string) => {
    setOTP(value);
    onOTPChange(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Verification</h3>
        <p className="text-gray-500 text-sm">
          Please enter the code we just sent you.
        </p>
      </div>
      
      <div className="flex justify-center">
        <InputOTP 
          maxLength={6} 
          value={otp} 
          onChange={handleOTPChange}
          className="gap-2"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
            <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
            <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
            <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
            <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
            <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center">
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Resend code ⏱ 0:58
        </button>
      </div>
    </div>
  );
};

export default OTPVerificationStep;
