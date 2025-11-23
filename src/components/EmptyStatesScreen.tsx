import { useState } from 'react';
import { ArrowLeft, MapPin, WifiOff, RefreshCcw, Plus, Frown, Search } from 'lucide-react';

interface EmptyStatesScreenProps {
  onBack: () => void;
  onNavigateToHome?: () => void;
}

type StateType = 'no-plots' | 'no-internet' | 'no-results' | 'error';

export default function EmptyStatesScreen({ onBack, onNavigateToHome }: EmptyStatesScreenProps) {
  const [selectedState, setSelectedState] = useState<StateType>('no-plots');

  const renderEmptyState = () => {
    switch (selectedState) {
      case 'no-plots':
        return (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
              {/* Illustration */}
              <div className="mb-6 relative">
                <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                  {/* Empty land illustration */}
                  <rect x="20" y="80" width="160" height="80" rx="8" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="2" strokeDasharray="8,4" />
                  
                  {/* Dotted boundary */}
                  <circle cx="30" cy="90" r="6" fill="#BDBDBD" />
                  <circle cx="170" cy="90" r="6" fill="#BDBDBD" />
                  <circle cx="170" cy="150" r="6" fill="#BDBDBD" />
                  <circle cx="30" cy="150" r="6" fill="#BDBDBD" />
                  
                  {/* Empty sign */}
                  <text x="100" y="125" textAnchor="middle" fill="#9E9E9E" fontSize="16">📭</text>
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl text-gray-900 mb-2">No Saved Plots Yet</h3>
              <p className="text-gray-500 mb-8">
                Start measuring your land to save plots and access them anytime
              </p>

              {/* Action Button */}
              <button
                onClick={onNavigateToHome}
                className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg"
              >
                <Plus size={20} />
                <span>Measure New Land</span>
              </button>
            </div>
          </div>
        );

      case 'no-internet':
        return (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
              {/* Illustration */}
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center relative">
                  <WifiOff size={64} className="text-gray-400" />
                  <div className="absolute inset-0 border-4 border-gray-300 rounded-full" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl text-gray-900 mb-2">No Internet Connection</h3>
              <p className="text-gray-500 mb-8">
                Please check your internet connection and try again. Maps require internet to load.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg">
                  <RefreshCcw size={20} />
                  <span>Retry</span>
                </button>
                
                <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl hover:bg-gray-200 transition-colors">
                  Use Offline Mode
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-800">
                  💡 Enable offline mode in settings to download maps for offline use
                </p>
              </div>
            </div>
          </div>
        );

      case 'no-results':
        return (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
              {/* Illustration */}
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={64} className="text-gray-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-500 mb-8">
                We couldn't find any plots matching your search. Try different keywords.
              </p>

              {/* Action Button */}
              <button className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl hover:bg-[#1B5E20] transition-colors shadow-lg">
                Clear Search
              </button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
              {/* Illustration */}
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                  <Frown size={64} className="text-red-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl text-gray-900 mb-2">Oops! Something Went Wrong</h3>
              <p className="text-gray-500 mb-2">
                We encountered an error while processing your request.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Error Code: 500 - Internal Server Error
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg">
                  <RefreshCcw size={20} />
                  <span>Try Again</span>
                </button>
                
                <button
                  onClick={onBack}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  Go Back Home
                </button>
              </div>

              {/* Support Link */}
              <div className="mt-6">
                <button className="text-sm text-[#2E7D32] hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>Empty & Error States</span>
        </div>

        {/* State Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { value: 'no-plots' as StateType, label: 'No Plots' },
            { value: 'no-internet' as StateType, label: 'No Internet' },
            { value: 'no-results' as StateType, label: 'No Results' },
            { value: 'error' as StateType, label: 'Error' },
          ].map((state) => (
            <button
              key={state.value}
              onClick={() => setSelectedState(state.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedState === state.value
                  ? 'bg-white text-[#2E7D32]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State Content */}
      {renderEmptyState()}

      {/* Info Panel */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <strong>Design Note:</strong> These empty states provide clear guidance to users when content is unavailable
        </div>
      </div>
    </div>
  );
}
