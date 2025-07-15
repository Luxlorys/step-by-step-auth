import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ForgotPasswordData } from '@/pages/ForgotPassword';

interface OTPStepProps {
  data: ForgotPasswordData;
  onNext: () => void;
  onBack: () => void;
  onFormChange: (data: Partial<ForgotPasswordData>) => void;
}

const OTPStep = ({ data, onNext, onBack, onFormChange }: OTPStepProps) => {
  const [otp, setOtp] = useState(data.otp);
  const [timeLeft, setTimeLeft] = useState(58); // Start with 0:58

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOTPChange = (value: string) => {
    setOtp(value);
    onFormChange({ otp: value });
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      onNext();
    }
  };

  const handleResendCode = () => {
    setTimeLeft(58);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-6">
        <h2 className="text-2xl font-semibold text-center">Verification</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Please enter the code we just sent you.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOTPChange}
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={otp.length !== 6}
          className="w-full h-12 bg-black hover:bg-gray-800 text-white"
        >
          Submit
        </Button>

        <div className="text-center space-y-2">
          <button
            onClick={handleResendCode}
            disabled={timeLeft > 0}
            className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Resend code
          </button>
          {timeLeft > 0 && (
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
              <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs">
                ⏱
              </span>
              {formatTime(timeLeft)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPStep;