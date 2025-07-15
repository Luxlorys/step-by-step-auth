import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface SuccessStepProps {
  onSignIn: () => void;
}

const SuccessStep = ({ onSignIn }: SuccessStepProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center">Password changed</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Please Sign in with a new password
        </p>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onSignIn}
          className="w-full h-12 bg-black hover:bg-gray-800 text-white"
        >
          Sign in
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessStep;