import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
        
        {/* Feature Carousel */}
        <div className="w-[730px] mx-auto mb-12">
          <div className="flex items-center justify-center gap-8">
            <button className="w-10 h-10 bg-white border border-black rounded-full flex items-center justify-center hover:bg-gray-50">
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="w-[350px] border border-black rounded-2xl p-4 relative bg-white">
              <div className="absolute top-4 right-4 z-10">
                <span className="text-black text-base font-medium">Network analytics</span>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/d2a5a9a4-4bee-4791-b9ca-92ceec6e849e.png" 
                  alt="Network Analytics Dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <button className="w-10 h-10 bg-white border border-black rounded-full flex items-center justify-center hover:bg-gray-50">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            It is a very useful tool to control your community and see what interests are in them
          </p>
        </div>

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