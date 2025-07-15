import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ForgotPasswordData } from '@/pages/ForgotPassword';

interface EmailStepProps {
  data: ForgotPasswordData;
  onNext: () => void;
  onBackToSignIn: () => void;
  onFormChange: (data: Partial<ForgotPasswordData>) => void;
}

const EmailStep = ({ data, onNext, onBackToSignIn, onFormChange }: EmailStepProps) => {
  const [email, setEmail] = useState(data.email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    onFormChange({ email: value });
  };

  const handleSendCode = () => {
    if (email) {
      onNext();
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-6">
        <h2 className="text-2xl font-semibold text-center">Reset your password</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Type in your email and we'll send you a link to reset<br />
          your password
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="pietro.schirano@gmail.com"
            className="h-12"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBackToSignIn}
            className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
          >
            Back to Sign in
          </Button>

          <Button
            onClick={handleSendCode}
            disabled={!email}
            className="flex-1 h-12 bg-black hover:bg-gray-800 text-white"
          >
            Send reset email
          </Button>
        </div>

        {/* Terms and Privacy */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you indicate that you've read and agree to our{' '}
          <span className="underline cursor-pointer">Term of Service</span> and{' '}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmailStep;