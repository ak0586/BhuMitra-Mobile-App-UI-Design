import { ArrowLeft, ZoomIn, MousePointer, Pentagon, Eye, Share2 } from 'lucide-react';

interface HelpScreenProps {
  onBack: () => void;
}

const tutorialSteps = [
  {
    step: 1,
    title: 'Zoom into land',
    description: 'Use pinch gesture or zoom controls to focus on your land area on the satellite map',
    icon: <ZoomIn size={32} className="text-[#2E7D32]" />,
    illustration: (
      <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-gray-400" style={{ left: `${(i + 1) * 16.67}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute left-0 w-full h-px bg-gray-400" style={{ top: `${(i + 1) * 16.67}%` }} />
          ))}
        </div>
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#2E7D32] rounded-full animate-ping" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-[#2E7D32] rounded-full" />
        </div>
      </div>
    ),
  },
  {
    step: 2,
    title: 'Tap boundary points',
    description: 'Tap on the map to mark each corner of your land boundary with red pins',
    icon: <MousePointer size={32} className="text-[#2E7D32]" />,
    illustration: (
      <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-gray-400" style={{ left: `${(i + 1) * 16.67}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute left-0 w-full h-px bg-gray-400" style={{ top: `${(i + 1) * 16.67}%` }} />
          ))}
        </div>
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {[
            { x: 40, y: 30 },
            { x: 80, y: 25 },
            { x: 85, y: 60 },
            { x: 35, y: 65 },
          ].map((point, i) => (
            <g key={i}>
              <circle cx={point.x} cy={point.y} r="4" fill="#FF3B30" stroke="white" strokeWidth="1.5" />
              {i > 0 && (
                <line
                  x1={[40, 80, 85][i - 1]}
                  y1={[30, 25, 60][i - 1]}
                  x2={point.x}
                  y2={point.y}
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
              )}
            </g>
          ))}
        </svg>
      </div>
    ),
  },
  {
    step: 3,
    title: 'Complete polygon',
    description: 'Tap the "Complete" button once all boundary points are marked to close the polygon',
    icon: <Pentagon size={32} className="text-[#2E7D32]" />,
    illustration: (
      <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center relative overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <polygon
            points="40,30 80,25 85,60 35,65"
            fill="rgba(102, 187, 106, 0.4)"
            stroke="#66BB6A"
            strokeWidth="2"
          />
          {[
            { x: 40, y: 30 },
            { x: 80, y: 25 },
            { x: 85, y: 60 },
            { x: 35, y: 65 },
          ].map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="4" fill="#FF3B30" stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
    ),
  },
  {
    step: 4,
    title: 'View area',
    description: 'See calculated area in multiple units including sq ft, acre, bigha, and more',
    icon: <Eye size={32} className="text-[#2E7D32]" />,
    illustration: (
      <div className="w-full h-32 bg-white rounded-xl flex items-center justify-center border-2 border-green-200">
        <div className="text-center">
          <div className="text-3xl text-[#2E7D32] mb-1">230</div>
          <div className="text-sm text-gray-600">Square Feet</div>
          <div className="mt-2 text-xs text-gray-500">0.0053 Acre • 21.37 sq m</div>
        </div>
      </div>
    ),
  },
  {
    step: 5,
    title: 'Save or share',
    description: 'Save your measurement for future reference or share it as a PDF report',
    icon: <Share2 size={32} className="text-[#2E7D32]" />,
    illustration: (
      <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center gap-3">
        <div className="w-16 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-2xl">💾</span>
        </div>
        <div className="w-16 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-2xl">📤</span>
        </div>
      </div>
    ),
  },
];

export default function HelpScreen({ onBack }: HelpScreenProps) {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>How to Use</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-[#66BB6A] to-[#2E7D32] text-white rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-2xl mb-2">Welcome to BhuMitra</h2>
          <p className="text-white/90">
            Follow these simple steps to measure your land area accurately
          </p>
        </div>

        {/* Tutorial Steps */}
        <div className="space-y-4 mb-6">
          {tutorialSteps.map((tutorial) => (
            <div
              key={tutorial.step}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Step Header */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white">{tutorial.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{tutorial.title}</h3>
                </div>
                <div className="flex-shrink-0">{tutorial.icon}</div>
              </div>

              {/* Illustration */}
              <div className="p-4">
                {tutorial.illustration}
              </div>

              {/* Description */}
              <div className="px-4 pb-4">
                <p className="text-gray-600 text-sm">{tutorial.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <h3 className="text-blue-900 mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span>Pro Tips</span>
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] mt-1">•</span>
              <span>Use satellite view for better accuracy when marking boundaries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] mt-1">•</span>
              <span>Zoom in close to your land before marking points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] mt-1">•</span>
              <span>Mark at least 3 points to create a valid polygon</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] mt-1">•</span>
              <span>Use the undo button if you make a mistake</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] mt-1">•</span>
              <span>Select your state for accurate regional unit conversions</span>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-[#2E7D32] mb-1">How accurate is the measurement?</h4>
              <p className="text-sm text-gray-600">
                BhuMitra uses satellite imagery and GPS coordinates to provide highly accurate measurements, 
                typically within 1-2% margin of error.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-[#2E7D32] mb-1">Can I use it offline?</h4>
              <p className="text-sm text-gray-600">
                You can enable offline mode in settings to download maps for offline use.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-[#2E7D32] mb-1">What units are supported?</h4>
              <p className="text-sm text-gray-600">
                We support all major units including Square Feet, Acre, Hectare, and regional units 
                like Bigha, Katha, Guntha, and Cent.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onBack}
          className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl hover:bg-[#1B5E20] transition-colors shadow-lg mb-6"
        >
          Got It, Start Measuring
        </button>
      </div>
    </div>
  );
}
