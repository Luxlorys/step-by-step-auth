import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PremiumPlan = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock slides data - you can replace with actual content later
  const slides = [
    {
      id: 1,
      content: "Network Analytics Dashboard"
    },
    {
      id: 2, 
      content: "Member Management Tools"
    },
    {
      id: 3,
      content: "Advanced Reporting Features"
    },
    {
      id: 4,
      content: "Premium Community Tools"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Last slide, navigate to signin
      navigate('/signin');
    }
  };

  const handleSkip = () => {
    navigate('/signin');
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-normal text-gray-950 mb-3">
            Access to dashboard requires a premium plan
          </h1>
          <p className="text-sm text-gray-600">
            This feature is part of our premium offering.<br />
            Upgrade your plan to unlock full access to:
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative mb-6">
          <div 
            className="w-full rounded-lg overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className="w-full flex-shrink-0 flex items-center justify-center text-gray-700 text-xl font-medium"
                >
                  <img src="/slide1.png" alt="UK flag" className="w-300 h-[300px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => currentSlide > 0 && setCurrentSlide(currentSlide - 1)}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md ${
              currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1)}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md ${
              currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full border border-black transition-colors duration-200 ${
                index === currentSlide ? 'bg-gray-800' : 'bg-white'
              }`}
            />
          ))}
        </div>

        {/* Description Text */}
        <p className="text-center text-gray-600 text-sm mb-8">
          It is a very useful tool to control your community<br />
          and see what interests are in them
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="flex-1 bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            Skip
          </Button>
          
          <Button
            onClick={handleNext}
            className="flex-1 bg-black text-white hover:bg-gray-800"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;