export default function SplashScreen() {
  return (
    <div className="h-full bg-[#2E7D32] flex flex-col items-center justify-center px-6">
      {/* Logo - Polygon with pins */}
      <div className="relative mb-8">
        {/* Polygon shape */}
        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
          {/* Main polygon */}
          <polygon
            points="100,30 170,80 150,150 50,150 30,80"
            fill="rgba(255, 255, 255, 0.15)"
            stroke="white"
            strokeWidth="2"
          />
          
          {/* Red pins at corners */}
          <g>
            {/* Pin 1 */}
            <circle cx="100" cy="30" r="8" fill="#FF3B30" stroke="white" strokeWidth="2" />
            {/* Pin 2 */}
            <circle cx="170" cy="80" r="8" fill="#FF3B30" stroke="white" strokeWidth="2" />
            {/* Pin 3 */}
            <circle cx="150" cy="150" r="8" fill="#FF3B30" stroke="white" strokeWidth="2" />
            {/* Pin 4 */}
            <circle cx="50" cy="150" r="8" fill="#FF3B30" stroke="white" strokeWidth="2" />
            {/* Pin 5 */}
            <circle cx="30" cy="80" r="8" fill="#FF3B30" stroke="white" strokeWidth="2" />
          </g>
        </svg>
        
        {/* Area text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white">230 sq ft</span>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-white text-4xl mb-3">BhuMitra</h1>
      
      {/* Tagline */}
      <p className="text-white/80 text-lg mb-16">Measure Land Accurately</p>

      {/* Loading bar */}
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-[loading_2s_ease-in-out]" style={{
          animation: 'loading 2s ease-in-out forwards',
        }} />
      </div>

      <style>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
