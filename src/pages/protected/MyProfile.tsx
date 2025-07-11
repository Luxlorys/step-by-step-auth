import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff, ImageIcon, User } from 'lucide-react';

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [formData, setFormData] = useState({
    fullName: 'John Snow',
    email: 'john.snow@gmail.com',
    phoneNumber: '+1 (555) 123-456',
    password: '',
    confirmPassword: '',
    networkName: 'KPMG Alumni',
    networkDescription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Row 1: Profile Information + Change Password */}
      <div className="grid grid-cols-3 gap-2">
        {/* Block 1: Profile Information (takes 2/3 width) */}
        <div className="col-span-2 bg-[#FAFAFA] rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
          {/* Profile Photo */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-2xl text-gray-950">Profile photo</p>
              <p className="text-lg text-gray-500">Upload photo</p>
              <p className="text-xs text-gray-400">Size mandatory - JPEG (JPG), PNG, SVG up to 10MB</p>
            </div>
          </div>

          {/* Profile Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-1 h-10 border-gray-300"
                />
              </div>

              {/* Email and Phone in one row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 h-10 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                    Phone number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="mt-1 h-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Edit Info Button */}
              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white h-10">
                Edit info
              </Button>
            </div>
          </div>
        </div>

        {/* Block 2: Change Password (takes 1/3 width) */}
        <div className="bg-[#FAFAFA] rounded-xl p-6 shadow-sm border border-[#E2E8F0] flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Change password</h3>
          <div className="space-y-4 flex-1">
            {/* Create Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Create password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-10 border-gray-300 pr-10"
                  placeholder="•••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="h-10 border-gray-300 pr-10"
                  placeholder="•••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="pt-3">
              <h4 className="text-base font-semibold text-gray-800 mb-3">Security settings</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </div>
          </div>

          {/* Update Button at bottom */}
          <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white h-10 mt-6">
            Update
          </Button>
        </div>
      </div>

      {/* Row 2: Network Details + Delete Account */}
      <div className="flex justify-between items-end">
        {/* Network Details Block (half width) */}
        <div className="w-1/2 bg-[#FAFAFA] rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
          {/* Network Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <div>
               <p className="text-2xl text-gray-950">Network logo</p>
              <p className="text-lg text-gray-500">Upload photo</p>
              <p className="text-xs text-gray-400">Size mandatory - JPEG (JPG), PNG, SVG up to 10MB</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Network Details</h3>
          
          {/* Network Name */}
          <div className="mb-4">
            <Label htmlFor="networkName" className="text-sm font-medium text-gray-700">
              Network name*
            </Label>
            <Input
              id="networkName"
              type="text"
              value={formData.networkName}
              onChange={(e) => handleInputChange('networkName', e.target.value)}
              className="mt-1 h-10 border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <Label htmlFor="networkDescription" className="text-sm font-medium text-gray-700">
              Description (10 - 250 characters)
            </Label>
            <Textarea
              id="networkDescription"
              value={formData.networkDescription}
              onChange={(e) => handleInputChange('networkDescription', e.target.value)}
              className="mt-1 border-gray-300 min-h-[100px] resize-none"
              maxLength={250}
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.networkDescription.length}/250 characters
            </p>
          </div>

          {/* Cancel and Save Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-10 border-gray-300">
              Cancel
            </Button>
            <Button className="flex-1 h-10 bg-gray-800 hover:bg-gray-700 text-white">
              Save
            </Button>
          </div>
        </div>
        
        {/* Delete Account Button */}
        <Button variant="destructive" className="px-6 h-10">
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default MyProfile;