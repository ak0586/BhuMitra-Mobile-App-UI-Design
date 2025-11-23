import { ArrowLeft, Eye, Trash2, MapPin, Plus } from 'lucide-react';

interface SavedPlotsScreenProps {
  onBack: () => void;
}

const savedPlots = [
  {
    id: 1,
    name: 'Farm Plot - East Wing',
    area: '1250 sq ft',
    date: 'Nov 20, 2025',
    location: 'Kanpur, UP',
  },
  {
    id: 2,
    name: 'Residential Land',
    area: '3400 sq ft',
    date: 'Nov 18, 2025',
    location: 'Lucknow, UP',
  },
  {
    id: 3,
    name: 'Agricultural Plot A',
    area: '5600 sq ft',
    date: 'Nov 15, 2025',
    location: 'Varanasi, UP',
  },
  {
    id: 4,
    name: 'Commercial Site',
    area: '890 sq ft',
    date: 'Nov 12, 2025',
    location: 'Prayagraj, UP',
  },
];

export default function SavedPlotsScreen({ onBack }: SavedPlotsScreenProps) {
  // Change to empty array to show empty state: const plotsToShow = [];
  const plotsToShow = savedPlots;

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>Saved Plots</span>
        </div>
      </div>

      {/* Plots List or Empty State */}
      {plotsToShow.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="text-center max-w-sm">
            {/* Empty State Illustration */}
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
              onClick={onBack}
              className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg"
            >
              <Plus size={20} />
              <span>Measure New Land</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 space-y-4">
            {plotsToShow.map((plot) => (
              <div
                key={plot.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4 p-4">
                  {/* Map Thumbnail */}
                  <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex-shrink-0 relative overflow-hidden">
                    {/* Polygon representation */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <polygon
                        points="30,25 70,30 65,70 30,75 20,50"
                        fill="rgba(46, 125, 50, 0.3)"
                        stroke="#2E7D32"
                        strokeWidth="2"
                      />
                      {/* Pins */}
                      {[
                        { x: 30, y: 25 },
                        { x: 70, y: 30 },
                        { x: 65, y: 70 },
                        { x: 30, y: 75 },
                        { x: 20, y: 50 },
                      ].map((point, i) => (
                        <circle
                          key={i}
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#FF3B30"
                          stroke="white"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Plot Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1 truncate">{plot.name}</h3>
                    <div className="text-[#2E7D32] mb-1">{plot.area}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{plot.location}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{plot.date}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex border-t border-gray-100">
                  <button className="flex-1 py-3 flex items-center justify-center gap-2 text-[#2E7D32] hover:bg-gray-50 transition-colors">
                    <Eye size={18} />
                    <span className="text-sm">View</span>
                  </button>
                  <div className="w-px bg-gray-100" />
                  <button className="flex-1 py-3 flex items-center justify-center gap-2 text-[#FF3B30] hover:bg-gray-50 transition-colors">
                    <Trash2 size={18} />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Count footer */}
          <div className="px-6 pb-6 text-center text-sm text-gray-500">
            {plotsToShow.length} plot{plotsToShow.length !== 1 ? 's' : ''} saved
          </div>
        </>
      )}
    </div>
  );
}