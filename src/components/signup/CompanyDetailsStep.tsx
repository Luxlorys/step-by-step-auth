
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/signup';

interface CompanyDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean | File[]) => void;
}

const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ formData, onInputChange }) => {
  return (
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
          onChange={(e) => onInputChange('organizationName', e.target.value)}
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
            onChange={(e) => onInputChange('country', e.target.value)}
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
            onChange={(e) => onInputChange('city', e.target.value)}
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
          onChange={(e) => onInputChange('street', e.target.value)}
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
          onChange={(e) => onInputChange('postCode', e.target.value)}
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
            onChange={(e) => onInputChange('vatNumber', e.target.value)}
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
            onChange={(e) => onInputChange('companyNumber', e.target.value)}
            className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsStep;
