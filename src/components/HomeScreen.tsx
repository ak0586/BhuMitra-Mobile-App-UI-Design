import { useState } from 'react';
import { Menu, User, Plus, Undo, X, Ruler, MapPin, Pencil, Navigation, Play, StopCircle, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
  onStartMarking: () => void;
}

type MarkingMode = 'pin' | 'draw' | 'walk';

export default function HomeScreen({ onMenuClick, onProfileClick, onStartMarking }: HomeScreenProps) {
  const [activeMode, setActiveMode] = useState<MarkingMode>('pin');
  const [isWalking, setIsWalking] = useState(false);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [drawPath, setDrawPath] = useState<string>('');

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMode !== 'pin') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPoints([...points, { x, y }]);
  };

  const handleUndoPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    }
  };

  const handleClearAll = () => {
    setPoints([]);
    setDrawPath('');
  };

  const handleStartWalk = () => {
    setIsWalking(true);
    setPoints([]);
    // Simulate GPS tracking by adding points periodically
    const interval = setInterval(() => {
      setPoints(prev => {
        if (prev.length >= 8) {
          clearInterval(interval);
          return prev;
        }
        // Simulate walking path
        const angle = (prev.length / 8) * Math.PI * 2;
        const centerX = 50;
        const centerY = 50;
        const radius = 20;
        return [...prev, {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius
        }];
      });
    }, 1000);
  };

  const handleEndWalk = () => {
    setIsWalking(false);
  };

  // Create SVG path for polygon
  const pathData = points.length > 0
    ? points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + (points.length > 2 ? ' Z' : '')
    : '';

  return (
    <div className="h-full relative">
      {/* Map Background */}
      <div 
        className="absolute inset-0"
        onClick={handleMapClick}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1517917635448-93c0dc320860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjB0ZXJyYWlufGVufDF8fHx8MTc2MzkyMzg5MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Satellite Map"
          className="w-full h-full object-cover"
        />

        {/* SVG Overlay for shapes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Filled Polygon */}
          {points.length > 2 && (
            <path
              d={pathData}
              fill="rgba(102, 187, 106, 0.3)"
              stroke={activeMode === 'walk' ? '#66BB6A' : '#66BB6A'}
              strokeWidth="2"
              strokeDasharray={activeMode === 'walk' ? '5,5' : '0'}
              filter="url(#glow)"
            />
          )}

          {/* Connecting Lines for Pin Mode */}
          {activeMode === 'pin' && points.map((point, i) => {
            if (i === points.length - 1) return null;
            const nextPoint = points[i + 1];
            return (
              <line
                key={`line-${i}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${nextPoint.x}%`}
                y2={`${nextPoint.y}%`}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}

          {/* Closing line */}
          {activeMode === 'pin' && points.length > 2 && (
            <line
              x1={`${points[points.length - 1].x}%`}
              y1={`${points[points.length - 1].y}%`}
              x2={`${points[0].x}%`}
              y2={`${points[0].y}%`}
              stroke="white"
              strokeWidth="2"
            />
          )}

          {/* Walking path with dotted line */}
          {activeMode === 'walk' && points.length > 1 && (
            <polyline
              points={points.map(p => `${p.x}%,${p.y}%`).join(' ')}
              fill="none"
              stroke="#66BB6A"
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          )}
        </svg>

        {/* Red Pins for Pin Mode and Walk Mode endpoints */}
        {(activeMode === 'pin' || activeMode === 'walk') && points.map((point, index) => (
          <div
            key={index}
            className="absolute w-5 h-5 bg-[#FF3B30] rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <div className="absolute inset-0 bg-[#FF3B30] rounded-full blur-md opacity-50 -z-10" />
          </div>
        ))}

        {/* Current GPS position indicator for Walk Mode */}
        {activeMode === 'walk' && isWalking && points.length > 0 && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ 
              left: `${points[points.length - 1].x}%`, 
              top: `${points[points.length - 1].y}%` 
            }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-xl animate-pulse" />
            <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full animate-ping" />
          </div>
        )}
      </div>

      {/* Top Bar - Transparent */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 to-transparent z-10">
        <div className="flex items-center justify-between p-4">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
          >
            <Menu size={24} className="text-[#2E7D32]" />
          </button>

          {/* App Name */}
          <h1 className="text-white text-xl">BhuMitra</h1>

          {/* Profile Button */}
          <button
            onClick={onProfileClick}
            className="w-12 h-12 bg-[#66BB6A] rounded-full flex items-center justify-center shadow-lg"
          >
            <User size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mode Selection Bar - Top */}
      <div className="absolute top-20 left-4 right-4 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-2 flex gap-2">
          {/* Pin Marker Mode */}
          <button
            onClick={() => {
              setActiveMode('pin');
              setIsWalking(false);
              handleClearAll();
            }}
            className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMode === 'pin'
                ? 'bg-[#2E7D32] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MapPin size={20} />
            <span className="text-xs">Pin Marking</span>
          </button>

          {/* Draw Marker Mode */}
          <button
            onClick={() => {
              setActiveMode('draw');
              setIsWalking(false);
              handleClearAll();
            }}
            className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMode === 'draw'
                ? 'bg-[#2E7D32] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Pencil size={20} />
            <span className="text-xs">Draw Boundary</span>
          </button>

          {/* Walking Marker Mode */}
          <button
            onClick={() => {
              setActiveMode('walk');
              handleClearAll();
            }}
            className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMode === 'walk'
                ? 'bg-[#2E7D32] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Navigation size={20} />
            <span className="text-xs">Walk Boundary</span>
          </button>
        </div>
      </div>

      {/* Mode-specific Controls */}
      
      {/* PIN MODE - Floating Action Buttons - Bottom Right */}
      {activeMode === 'pin' && (
        <div className="absolute bottom-8 right-6 z-20 flex flex-col gap-3">
          {/* Add Point Indicator */}
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-gray-700 mb-2">
            {points.length} point{points.length !== 1 ? 's' : ''}
          </div>

          {/* Undo Button */}
          <button 
            onClick={handleUndoPoint}
            disabled={points.length === 0}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo size={20} className="text-[#2E7D32]" />
          </button>

          {/* Clear Button */}
          <button 
            onClick={handleClearAll}
            disabled={points.length === 0}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-transform hover:scale-110 border-2 border-[#FF3B30] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} className="text-[#FF3B30]" />
          </button>

          {/* Calculate Area Button - Extended */}
          <button
            onClick={onStartMarking}
            disabled={points.length < 3}
            className="bg-[#2E7D32] text-white px-6 py-4 rounded-full flex items-center gap-3 shadow-xl hover:bg-[#1B5E20] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Ruler size={20} />
            <span>Calculate</span>
          </button>
        </div>
      )}

      {/* DRAW MODE - Bottom Toolbar */}
      {activeMode === 'draw' && (
        <div className="absolute bottom-8 left-4 right-4 z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 flex items-center gap-2 text-gray-700">
                <Pencil size={20} className="text-[#2E7D32]" />
                <span className="text-sm">Draw mode active - Drag to draw</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {/* Undo Stroke */}
              <button className="flex-1 py-3 px-4 bg-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <Undo size={18} className="text-gray-700" />
                <span className="text-sm text-gray-700">Undo</span>
              </button>

              {/* Reset Drawing */}
              <button 
                onClick={handleClearAll}
                className="flex-1 py-3 px-4 bg-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Trash2 size={18} className="text-gray-700" />
                <span className="text-sm text-gray-700">Reset</span>
              </button>

              {/* Calculate Area */}
              <button
                onClick={onStartMarking}
                className="flex-1 py-3 px-4 bg-[#2E7D32] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors shadow-lg"
              >
                <Ruler size={18} />
                <span className="text-sm">Calculate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WALK MODE - Bottom Controls */}
      {activeMode === 'walk' && (
        <div className="absolute bottom-8 left-4 right-4 z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4">
            {!isWalking ? (
              <>
                <div className="text-center mb-4">
                  <p className="text-gray-700 mb-1">GPS Walking Mode</p>
                  <p className="text-sm text-gray-500">Walk around your land boundary</p>
                </div>
                <button
                  onClick={handleStartWalk}
                  className="w-full bg-[#2E7D32] text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg"
                >
                  <Play size={20} />
                  <span>Start Walk</span>
                </button>
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-gray-700">Recording GPS Path...</p>
                  </div>
                  <p className="text-sm text-gray-500">{points.length} points tracked</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEndWalk}
                    className="flex-1 bg-gray-600 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors shadow-lg"
                  >
                    <StopCircle size={20} />
                    <span>End Walk</span>
                  </button>
                </div>
              </>
            )}

            {/* Calculate Area - Shows after walk is ended */}
            {!isWalking && points.length > 2 && (
              <button
                onClick={onStartMarking}
                className="w-full mt-3 bg-[#2E7D32] text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg"
              >
                <Ruler size={20} />
                <span>Calculate Area</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Helper Text - Only show when no points */}
      {points.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="bg-white/95 px-6 py-4 rounded-2xl shadow-xl text-center backdrop-blur-sm">
            {activeMode === 'pin' && (
              <>
                <p className="text-gray-700 mb-2">Tap on the map to mark boundaries</p>
                <p className="text-gray-500 text-sm">Create at least 3 points</p>
              </>
            )}
            {activeMode === 'draw' && (
              <>
                <p className="text-gray-700 mb-2">Drag your finger to draw</p>
                <p className="text-gray-500 text-sm">Draw the land boundary freehand</p>
              </>
            )}
            {activeMode === 'walk' && !isWalking && (
              <>
                <p className="text-gray-700 mb-2">Start walking around your land</p>
                <p className="text-gray-500 text-sm">GPS will track your path</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
