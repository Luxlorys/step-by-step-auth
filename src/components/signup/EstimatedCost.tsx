import React from 'react';
import { Button } from '@/components/ui/button';

interface EstimatedCostProps {
  onContinue: () => void;
}

const EstimatedCost: React.FC<EstimatedCostProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg border-0 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Estimated cost
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          £8.000 - £18.000 / per year
        </p>
        <Button
          onClick={onContinue}
          className="w-full h-12 bg-black hover:bg-gray-800 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EstimatedCost;