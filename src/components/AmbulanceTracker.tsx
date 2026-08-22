import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Radio, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  ShieldCheck, 
  Activity, 
  Compass, 
  Wifi, 
  AlertCircle,
  Volume2,
  Share2
} from 'lucide-react';

interface AmbulanceTrackerProps {
  destinationName?: string;
  initialEtaMinutes?: number;
  onArrived?: () => void;
  onCallDriver?: () => void;
}

export const AmbulanceTracker: React.FC<AmbulanceTrackerProps> = ({
  destinationName = 'Westfield Junction, Serrekunda',
  initialEtaMinutes = 6,
  onArrived,
  onCallDriver
}) => {
  // Progress along route: 0 to 100%
  const [progress, setProgress] = useState(15);
  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState<1 | 2 | 4>(1);
  const [speedKmh, setSpeedKmh] = useState(54);
  const [hasNotifiedArrival, setHasNotifiedArrival] = useState(false);

  // Route Waypoints across Greater Banjul (SVG coordinate space 0-600 width, 0-320 height)
  // Route from EFSTH/Banjul Highway depot -> Kairaba Ave -> Westfield Junction
  const routePoints = [
    { x: 80, y: 70, name: 'Sector 4 Dispatch Depot (Banjul Highway)' },
    { x: 170, y: 110, name: 'Old Jeshwang Junction' },
    { x: 280, y: 140, name: 'Kairaba Avenue Traffic Light' },
    { x: 390, y: 190, name: 'Serekunda Market Bypass' },
    { x: 500, y: 250, name: destinationName }
  ];

  // Calculate current interpolated position
  const getInterpolatedPosition = (pct: number) => {
    const t = Math.max(0, Math.min(100, pct)) / 100;
    const totalSegments = routePoints.length - 1;
    const segmentIndex = Math.min(Math.floor(t * totalSegments), totalSegments - 1);
    const segmentProgress = (t * totalSegments) - segmentIndex;

    const p1 = routePoints[segmentIndex];
    const p2 = routePoints[segmentIndex + 1];

    const currentX = p1.x + (p2.x - p1.x) * segmentProgress;
    const currentY = p1.y + (p2.y - p1.y) * segmentProgress;

    // Angle of motion
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

    return { x: currentX, y: currentY, angle };
  };

  const currentPos = getInterpolatedPosition(progress);

  // Calculate dynamic remaining metrics
  const totalDistanceKm = 4.8;
  const remainingDistKm = Math.max(0, totalDistanceKm * (1 - progress / 100));
  const remainingSecs = Math.max(0, Math.round(initialEtaMinutes * 60 * (1 - progress / 100)));
  const etaMinsDisplay = Math.floor(remainingSecs / 60);
  const etaSecsDisplay = remainingSecs % 60;

  // Status text based on progress
  const getStatusText = () => {
    if (progress >= 100) return 'Ambulance Has Arrived On Scene';
    if (progress > 75) return 'Approaching Destination (Serekunda Sector)';
    if (progress > 45) return 'Navigating Kairaba Avenue Corridor';
    if (progress > 15) return 'En Route via Banjul Highway';
    return 'Unit Dispatched from Sector 4 Depot';
  };

  // Live simulation tick
  useEffect(() => {
    if (!isPlaying || progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.8 * simSpeed;
        if (next >= 100) {
          if (!hasNotifiedArrival) {
            setHasNotifiedArrival(true);
            if (onArrived) onArrived();
          }
          return 100;
        }
        return next;
      });

      // Realistic minor speed fluctuation
      setSpeedKmh(Math.floor(48 + Math.random() * 16));
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, simSpeed, progress, hasNotifiedArrival, onArrived]);

  const handleReset = () => {
    setProgress(5);
    setHasNotifiedArrival(false);
    setIsPlaying(true);
  };

  const toggleSpeed = () => {
    if (simSpeed === 1) setSimSpeed(2);
    else if (simSpeed === 2) setSimSpeed(4);
    else setSimSpeed(1);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl overflow-hidden space-y-0">
      {/* Top Telemetry Header */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
              <Truck className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-rose-400">
                UNIT GM-MED-04
              </span>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800/60">
                Critical Care ICU
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              MOH National Emergency Fleet · Sector 4
            </p>
          </div>
        </div>

        {/* Dynamic ETA Big Display */}
        <div className="text-right">
          {progress >= 100 ? (
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold font-mono inline-block">
              ● ON SCENE
            </span>
          ) : (
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight leading-none">
                {etaMinsDisplay}:{etaSecsDisplay < 10 ? `0${etaSecsDisplay}` : etaSecsDisplay}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                ETA Countdown · {remainingDistKm.toFixed(1)} km
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Map Visual Area (SVG Canvas) */}
      <div className="relative w-full h-64 sm:h-72 bg-[#0B1522] overflow-hidden select-none">
        {/* Subtle Grid Map Texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#087F8C_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Ambient Radar Ring from Destination */}
        <div className="absolute top-[250px] left-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-32 h-32 rounded-full border border-rose-500/20 animate-ping" />
        </div>

        {/* SVG Route and Landmarks */}
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full object-contain"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient for Route Line */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#087F8C" />
              <stop offset="50%" stopColor="#E9A23B" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Road Network Lines (Background roads) */}
          <path
            d="M 20 80 Q 200 40 580 120"
            fill="none"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 120 20 Q 300 180 480 300"
            fill="none"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 50 250 C 220 240 380 160 560 220"
            fill="none"
            stroke="#1E293B"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Planned Emergency Route Glow Line */}
          <path
            d="M 80 70 L 170 110 L 280 140 L 390 190 L 500 250"
            fill="none"
            stroke="#E11D48"
            strokeWidth="6"
            strokeOpacity="0.3"
            filter="url(#glow)"
          />

          {/* Main Active Route Line */}
          <path
            d="M 80 70 L 170 110 L 280 140 L 390 190 L 500 250"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* Waypoint Nodes */}
          {routePoints.map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={i === routePoints.length - 1 ? 7 : 4}
                fill={i === routePoints.length - 1 ? '#E11D48' : '#38BDF8'}
                stroke="#0F172A"
                strokeWidth="2"
              />
              <text
                x={pt.x}
                y={pt.y - 12}
                fill="#94A3B8"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
                textAnchor="middle"
              >
                {i === 0 ? 'Depot' : i === routePoints.length - 1 ? 'Destination' : `Waypt ${i}`}
              </text>
            </g>
          ))}

          {/* Destination Landmark Pin */}
          <g transform="translate(500, 250)">
            <circle r="14" fill="#E11D48" fillOpacity="0.2" className="animate-ping" />
            <circle r="6" fill="#E11D48" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Moving Ambulance Vehicle Icon */}
          <g
            transform={`translate(${currentPos.x}, ${currentPos.y}) rotate(${currentPos.angle})`}
            className="transition-all duration-300"
          >
            {/* Pulsing Signal Beacon */}
            <circle r="18" fill="#E11D48" fillOpacity="0.25" className="animate-pulse" />
            
            {/* Vehicle Base Body */}
            <rect
              x="-14"
              y="-9"
              width="28"
              height="18"
              rx="4"
              fill="#E11D48"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Cabin window */}
            <rect x="3" y="-6" width="7" height="12" rx="1.5" fill="#0F172A" />
            {/* Red Cross Symbol on roof */}
            <path
              d="M -7 -3 H -3 V -7 H 1 V -3 H 5 V 1 H 1 V 5 H -3 V 1 H -7 Z"
              fill="#FFFFFF"
            />
            {/* Front Headlights Beam */}
            <polygon
              points="14,-5 36,-12 36,12 14,5"
              fill="#FEF08A"
              fillOpacity="0.35"
            />
          </g>
        </svg>

        {/* Live Status Overlay Pill on top of map */}
        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">{getStatusText()}</span>
        </div>

        {/* Speed / Telemetry Overlay */}
        <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-2">
          <span>Speed: <strong className="text-teal-300">{speedKmh} km/h</strong></span>
          <span>•</span>
          <span>GNSS: <strong className="text-emerald-400">±2.4m</strong></span>
        </div>
      </div>

      {/* Progress Bar & Simulator Controls */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
        {/* Animated Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Route Progress</span>
            <span className="font-mono text-teal-300 font-bold">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#087F8C] via-amber-500 to-rose-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Crew & Dispatch Information */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">DRIVER</span>
            <strong className="text-slate-200 block truncate">Lamin Sanneh</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">LEAD PARAMEDIC</span>
            <strong className="text-slate-200 block truncate">Isatou Jallow</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 block font-mono">DESTINATION</span>
            <strong className="text-rose-400 block truncate">{destinationName}</strong>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Simulator Play/Pause/FastForward */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={toggleSpeed}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
              title="Simulation speed multiplier"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>{simSpeed}x</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer border border-slate-700"
              title="Reset route"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Call Paramedic Button */}
          <a
            href="tel:1166"
            onClick={onCallDriver}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md shadow-rose-600/30 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Paramedic</span>
          </a>
        </div>

        {/* Hackathon Disclaimer notice */}
        <div className="text-[10px] text-slate-400 text-center pt-1 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3 h-3 text-teal-400 shrink-0" />
          <span>NexaCare Telemetry Engine · Live Differential GPS Emulation</span>
        </div>
      </div>
    </div>
  );
};
