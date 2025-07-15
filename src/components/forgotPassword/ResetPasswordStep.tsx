import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { ForgotPasswordData } from '@/pages/ForgotPassword';

interface ResetPasswordStepProps {
  data: ForgotPasswordData;
  onNext: () => void;
  onBackToSignIn: () => void;
  onFormChange: (data: Partial<ForgotPasswordData>) => void;
}

const ResetPasswordStep = ({ data, onNext, onBackToSignIn, onFormChange }: ResetPasswordStepProps) => {
  const [newPassword, setNewPassword] = useState(data.newPassword);
  const [repeatPassword, setRepeatPassword] = useState(data.repeatPassword);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    onFormChange({ newPassword: value });
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeatPassword(value);
    onFormChange({ repeatPassword: value });
  };

  const handleResetPassword = () => {
    if (newPassword && repeatPassword && newPassword === repeatPassword) {
      onNext();
    }
  };

  const isFormValid = newPassword && repeatPassword && newPassword === repeatPassword;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-6">
        <h2 className="text-2xl font-semibold text-center">Reset your password</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Create new password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repeatPassword">Repeat password</Label>
            <div className="relative">
              <Input
                id="repeatPassword"
                type={showRepeatPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                placeholder="Repeat password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showRepeatPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
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
            onClick={handleResetPassword}
            disabled={!isFormValid}
            className="flex-1 h-12 bg-black hover:bg-gray-800 text-white"
          >
            Reset password
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

export default ResetPasswordStep;