import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  onFormChange?: (formData: SignInFormData) => void;
}

const SignInForm = ({ onFormChange }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onFormChange?.(updatedFormData);
  };

  return (
    <div className="space-y-4">
      {/* Email */}
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

      {/* Password */}
      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="relative mt-1">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
    </div>
  );
};

export default SignInForm;
export type { SignInFormData };