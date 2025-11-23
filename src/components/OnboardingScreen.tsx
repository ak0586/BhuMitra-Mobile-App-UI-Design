import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Mark your land easily',
    subtitle: 'Tap on the map to set boundary points',
    illustration: (
      <div className="relative w-64 h-64 mx-auto">
        {/* Map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute top-0 h-full w-px bg-gray-400" style={{ left: `${(i + 1) * 12.5}%` }} />
            ))}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute left-0 w-full h-px bg-gray-400" style={{ top: `${(i + 1) * 12.5}%` }} />
            ))}
          </div>
          
          {/* Hand illustration */}
          <div className="absolute bottom-12 right-12 animate-bounce">
            <div className="w-16 h-20 bg-white rounded-t-full rounded-b-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl">👆</span>
            </div>
          </div>
          
          {/* Red pins */}
          {[
            { x: 30, y: 40 },
            { x: 70, y: 35 },
            { x: 75, y: 70 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-[#FF3B30] rounded-full border-2 border-white shadow-lg"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Get precise area instantly',
    subtitle: 'Calculate area in sq ft, acre, bigha, guntha, and more',
    illustration: (
      <div className="relative w-64 h-64 mx-auto">
        {/* Polygon with measurements */}
        <svg width="256" height="256" viewBox="0 0 256 256" className="drop-shadow-xl">
          {/* Filled polygon */}
          <polygon
            points="128,60 200,100 190,190 66,190 56,100"
            fill="#66BB6A"
            stroke="#2E7D32"
            strokeWidth="3"
            opacity="0.8"
          />
          
          {/* Corner pins */}
          {[
            { x: 128, y: 60 },
            { x: 200, y: 100 },
            { x: 190, y: 190 },
            { x: 66, y: 190 },
            { x: 56, y: 100 },
          ].map((pos, i) => (
            <circle key={i} cx={pos.x} cy={pos.y} r="6" fill="#FF3B30" stroke="white" strokeWidth="2" />
          ))}
        </svg>
        
        {/* Measurement labels */}
        <div className="absolute top-8 right-4 bg-white px-3 py-2 rounded-lg shadow-lg">
          <span className="text-xs">230 sq ft</span>
        </div>
        <div className="absolute bottom-12 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
          <span className="text-xs">0.005 acre</span>
        </div>
      </div>
    ),
  },
  {
    title: 'All regional land units supported',
    subtitle: 'Choose your state for accurate conversions',
    illustration: (
      <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
        {/* Unit cards in grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Acre', icon: '🌾' },
            { name: 'Bigha', icon: '🏞️' },
            { name: 'Katha', icon: '📏' },
            { name: 'Guntha', icon: '📐' },
            { name: 'Cent', icon: '📍' },
            { name: 'Hectare', icon: '🗺️' },
          ].map((unit, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-3xl">{unit.icon}</span>
              <span className="text-xs">{unit.name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-6">
        {slides[currentSlide].illustration}
      </div>

      {/* Content */}
      <div className="px-8 pb-12 text-center">
        <h2 className="text-2xl text-gray-900 mb-3">{slides[currentSlide].title}</h2>
        <p className="text-gray-600 mb-8">{slides[currentSlide].subtitle}</p>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-[#2E7D32]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors shadow-lg"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
