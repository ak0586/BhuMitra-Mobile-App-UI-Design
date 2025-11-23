import { useState } from 'react';
import { ArrowLeft, Undo, Trash2, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BoundaryMarkingScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Point {
  x: number;
  y: number;
  id: number;
}

export default function BoundaryMarkingScreen({ onBack, onComplete }: BoundaryMarkingScreenProps) {
  const [points, setPoints] = useState<Point[]>([
    { x: 30, y: 35, id: 1 },
    { x: 70, y: 30, id: 2 },
    { x: 75, y: 60, id: 3 },
    { x: 68, y: 75, id: 4 },
    { x: 25, y: 70, id: 5 },
    { x: 22, y: 45, id: 6 },
  ]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPoints([...points, { x, y, id: Date.now() }]);
  };

  const handleUndo = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    }
  };

  const handleClear = () => {
    setPoints([]);
  };

  // Create SVG path for polygon
  const pathData = points.length > 0
    ? points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + ' Z'
    : '';

  return (
    <div className="h-full relative bg-gray-100">
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-[#2E7D32] text-white py-3 px-4 flex items-center gap-3 shadow-lg">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
          <ArrowLeft size={20} />
        </button>
        <span>Mark the Land Boundary</span>
      </div>

      {/* Map Container */}
      <div 
        className="absolute inset-0 top-16 cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Background Map */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1643365227235-1e29f7fcf0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwbGFuZCUyMGZpZWxkfGVufDF8fHx8MTc2MzkyMzg5MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Aerial Map"
          className="w-full h-full object-cover"
        />

        {/* SVG Overlay for polygon and lines */}
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
              stroke="#66BB6A"
              strokeWidth="2"
              filter="url(#glow)"
            />
          )}

          {/* Connecting Lines */}
          {points.map((point, i) => {
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
                strokeDasharray="5,5"
              />
            );
          })}

          {/* Closing line */}
          {points.length > 2 && (
            <line
              x1={`${points[points.length - 1].x}%`}
              y1={`${points[points.length - 1].y}%`}
              x2={`${points[0].x}%`}
              y2={`${points[0].y}%`}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>

        {/* Red Pins */}
        {points.map((point) => (
          <div
            key={point.id}
            className="absolute w-5 h-5 bg-[#FF3B30] rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {/* Pin drop shadow */}
            <div className="absolute inset-0 bg-[#FF3B30] rounded-full blur-md opacity-50 -z-10" />
          </div>
        ))}

        {/* Point count indicator */}
        {points.length > 0 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm">{points.length} point{points.length !== 1 ? 's' : ''} marked</span>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white shadow-2xl rounded-t-3xl p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={points.length === 0}
            className="flex-1 py-3 px-4 bg-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Undo size={18} />
            <span className="text-sm">Undo</span>
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            disabled={points.length === 0}
            className="flex-1 py-3 px-4 bg-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={18} />
            <span className="text-sm">Clear</span>
          </button>

          {/* Complete Button */}
          <button
            onClick={onComplete}
            disabled={points.length < 3}
            className="flex-1 py-3 px-4 bg-[#2E7D32] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1B5E20] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            <Check size={18} />
            <span className="text-sm">Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
