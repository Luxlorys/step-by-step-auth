import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">YT</span>
          </div>
          <span className="font-semibold text-2xl">YouInTown</span>
        </div>
        
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to YouInTown
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Connect with your local community and discover opportunities in your town.
        </p>
        
        {/* Get Started Button */}
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg"
        >
          Get Started
        </Button>
        
        {/* Footer */}
        <div className="mt-16">
          <p className="text-xs text-gray-400">© copyright 2025 YouInTown</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;