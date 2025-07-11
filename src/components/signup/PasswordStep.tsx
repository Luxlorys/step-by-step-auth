
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { FormData } from '@/types/signup';

interface PasswordStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean | File[]) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ 
  formData, 
  onInputChange, 
  showPassword, 
  showConfirmPassword, 
  onTogglePassword, 
  onToggleConfirmPassword 
}) => {
  return (
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
            onChange={(e) => onInputChange('password', e.target.value)}
            className="h-12 border-gray-200 focus:border-black focus:ring-black pr-12"
          />
          <button
            type="button"
            onClick={onTogglePassword}
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
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            className="h-12 border-gray-200 focus:border-black focus:ring-black pr-12"
          />
          <button
            type="button"
            onClick={onToggleConfirmPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordStep;
