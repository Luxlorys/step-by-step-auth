
import React from 'react';
import { Step } from '@/types/signup';

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep === step.id 
                ? 'bg-black text-white' 
                : currentStep > step.id
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.id}
            </div>
            <span className={`text-xs mt-1 text-center max-w-20 ${
              currentStep === step.id ? 'text-black font-medium' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px w-10 ${
              currentStep > step.id ? 'bg-black' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgress;
