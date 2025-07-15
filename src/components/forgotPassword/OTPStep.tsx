import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OTPVerificationStep from '@/components/signup/OTPVerificationStep';
import { ForgotPasswordData } from '@/pages/ForgotPassword';

interface OTPStepProps {
  data: ForgotPasswordData;
  onNext: () => void;
  onBack: () => void;
  onFormChange: (data: Partial<ForgotPasswordData>) => void;
}

const OTPStep = ({ data, onNext, onBack, onFormChange }: OTPStepProps) => {
  const [otp, setOtp] = useState(data.otp);

  const handleOTPChange = (value: string) => {
    setOtp(value);
    onFormChange({ otp: value });
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      onNext();
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-6">
      </CardHeader>
      <CardContent className="space-y-6">
        <OTPVerificationStep onOTPChange={handleOTPChange} />

        <Button
          onClick={handleSubmit}
          disabled={otp.length !== 6}
          className="w-full h-12 bg-black hover:bg-gray-800 text-white"
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default OTPStep;