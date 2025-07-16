
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, X, Info } from 'lucide-react';
import { FormData } from '@/types/signup';

interface NetworkDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean | File[]) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const NetworkDetailsStep: React.FC<NetworkDetailsStepProps> = ({ 
  formData, 
  onInputChange, 
  onFileUpload, 
  onRemoveFile 
}) => {
  return (
    <TooltipProvider>
    <div className="space-y-6">
      {/* Network Name Input */}
      <div>
        <Label htmlFor="networkName" className="text-sm font-medium text-gray-700">
          Network name
        </Label>
        <Input
          id="networkName"
          type="text"
          placeholder="Enter network name"
          value={formData.networkName}
          onChange={(e) => onInputChange('networkName', e.target.value)}
          className="mt-1 h-12 border-gray-200 focus:border-black focus:ring-black"
        />
      </div>

      {/* Network Description Input */}
      <div>
        <Label htmlFor="networkDescription" className="text-sm font-medium text-gray-700">
          Network description
        </Label>
        <Textarea
          id="networkDescription"
          placeholder="Write network description"
          value={formData.networkDescription}
          onChange={(e) => onInputChange('networkDescription', e.target.value)}
          className="mt-1 min-h-[100px] border-gray-200 focus:border-black focus:ring-black resize-none"
        />
      </div>

      {/* Network Type Select */}
      <div>
        <Label htmlFor="networkType" className="text-sm font-medium text-gray-700">
          Network type
        </Label>
        <div className="relative mt-1">
          <Select 
            value={formData.networkType} 
            onValueChange={(value) => onInputChange('networkType', value)}
          >
            <SelectTrigger className="h-12 border-gray-200 focus:border-black focus:ring-black">
              <SelectValue placeholder="Choose network type">
                {formData.networkType && (
                  formData.networkType === 'business' ? 'Business Network' :
                  formData.networkType === 'community' ? 'Community Network' :
                  formData.networkType === 'professional' ? 'Professional Network' :
                  formData.networkType === 'social' ? 'Social Network' :
                  formData.networkType === 'educational' ? 'Educational Network' :
                  formData.networkType
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Business Network</SelectItem>
              <SelectItem value="community">Community Network</SelectItem>
              <SelectItem value="professional">Professional Network</SelectItem>
              <SelectItem value="social">Social Network</SelectItem>
              <SelectItem value="educational">Educational Network</SelectItem>
            </SelectContent>
          </Select>
          {formData.networkType && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
              This is an official or affiliated network. To verify your organization, please provide more data.
            </div>
          )}
        </div>
      </div>

      {/* Official Network Checkbox */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="officialNetwork"
          checked={formData.isOfficialNetwork}
          onCheckedChange={(checked) => onInputChange('isOfficialNetwork', checked as boolean)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="officialNetwork" className="text-sm font-medium text-gray-900">
              This is an official or affiliated Network
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>You agree that you are officially representing the company/organisation you are setting up the network for.</p>
              </TooltipContent>
            </Tooltip>
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
          onChange={(e) => onInputChange('websiteUrl', e.target.value)}
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
            onChange={onFileUpload}
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
                  onClick={() => onRemoveFile(index)}
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
    </TooltipProvider>
  );
};

export default NetworkDetailsStep;
