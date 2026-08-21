import React, { useState, useRef } from 'react';
import { Hospital, Pharmacy } from '../types';
import { HOSPITALS, GAMBIA_PHARMACIES } from '../store';
import { 
  Navigation, 
  Building2, 
  Pill, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight, 
  Clock, 
  Phone, 
  MapPin, 
  Star,
  CheckCircle2,
  AlertCircle,
  X,
  Users
} from 'lucide-react';

interface GambiaMapProps {
  onSelectHospital?: (hospitalId: string) => void;
  onSelectPharmacy?: (pharmacy: Pharmacy) => void;
  selectedHospitalId?: string | null;
  initialType?: 'all' | 'hospitals' | 'pharmacies';
}

export const GambiaMap: React.FC<GambiaMapProps> = ({
  onSelectHospital,
  onSelectPharmacy,
  selectedHospitalId,
  initialType = 'all'
}) => {
  const [filterType, setFilterType] = useState<'all' | 'hospitals' | 'pharmacies'>(initialType);
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedEntity, setSelectedEntity] = useState<
    { type: 'hospital'; data: Hospital } | { type: 'pharmacy'; data: Pharmacy } | null
  >(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const regions = [
    'All',
    'Kanifing (KMC)',
    'Banjul City',
    'West Coast (WCR)',
    'North Bank (NBR)',
    'Central River (CRR)'
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPanOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.3, 0.8));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const matchesRegion = (regionStr: string) => {
    if (activeRegion === 'All') return true;
    if (activeRegion === 'Kanifing (KMC)') return regionStr.includes('KMC') || regionStr.includes('Kanifing');
    if (activeRegion === 'Banjul City') return regionStr.includes('Banjul');
    if (activeRegion === 'West Coast (WCR)') return regionStr.includes('WCR') || regionStr.includes('West Coast') || regionStr.includes('Brusubi');
    if (activeRegion === 'North Bank (NBR)') return regionStr.includes('NBR') || regionStr.includes('North Bank');
    if (activeRegion === 'Central River (CRR)') return regionStr.includes('CRR') || regionStr.includes('Central River');
    return true;
  };

  const filteredHospitals = (filterType === 'all' || filterType === 'hospitals')
    ? HOSPITALS.filter(h => matchesRegion(h.region))
    : [];

  const filteredPharmacies = (filterType === 'all' || filterType === 'pharmacies')
    ? GAMBIA_PHARMACIES.filter(p => matchesRegion(p.area))
    : [];

  return (
    <div className="bg-white rounded-3xl border border-[#E3EBEE] p-4 shadow-sm space-y-3 overflow-hidden">
      
      {/* Map Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-[#172B3A]">
              The Gambia Health Facility Map
            </h4>
            <p className="text-[11px] text-[#6C8290]">
              Pan & zoom across Greater Banjul, North Bank, & Regional centres
            </p>
          </div>
        </div>

        {/* Toggle: All / Hospitals / Pharmacies */}
        <div className="flex p-0.5 bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] self-start sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            All Facilities
          </button>
          <button
            onClick={() => setFilterType('hospitals')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              filterType === 'hospitals' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Building2 className="w-3 h-3" />
            Hospitals ({HOSPITALS.length})
          </button>
          <button
            onClick={() => setFilterType('pharmacies')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              filterType === 'pharmacies' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Pill className="w-3 h-3" />
            Pharmacies ({GAMBIA_PHARMACIES.length})
          </button>
        </div>
      </div>

      {/* Region Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRegion(r)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              activeRegion === r
                ? 'bg-[#172B3A] text-white shadow-xs'
                : 'bg-[#F5F9FA] text-[#6C8290] hover:text-[#172B3A] border border-[#E3EBEE]'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Interactive Map Canvas Container */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-64 sm:h-72 bg-gradient-to-br from-[#E6EFF7] via-[#EDF5FA] to-[#F2F8FB] rounded-2xl border border-[#D5E3EA] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* Floating Zoom Controls */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-xl border border-[#E3EBEE] shadow-sm">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg hover:bg-[#F5F9FA] flex items-center justify-center text-[#172B3A] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg hover:bg-[#F5F9FA] flex items-center justify-center text-[#172B3A] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="w-7 h-7 rounded-lg hover:bg-[#F5F9FA] flex items-center justify-center text-[#6C8290] hover:text-[#172B3A] transition-colors"
            title="Reset Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legend Badge */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-[#E3EBEE] shadow-xs text-[10px] font-bold text-[#172B3A]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#087F8C]" /> Hospital
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2E9B68]" /> Pharmacy
          </span>
        </div>

        {/* Scalable & Pannable SVG World */}
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '20% 35%',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0
          }}
        >
          {/* Detailed River Gambia Corridor & Gambia Outline */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {/* Atlantic Ocean */}
            <path
              d="M 0,0 L 14,0 Q 11,25 9,50 Q 7,75 0,100 Z"
              fill="#BFDBFE"
              opacity="0.75"
            />
            {/* The River Gambia main arterial waterway */}
            <path
              d="M 12,22 Q 18,20 25,28 T 45,35 T 65,42 T 85,50 T 100,52 L 100,60 Q 85,58 T 65,48 T 45,42 T 25,36 T 12,26 Z"
              fill="#93C5FD"
              opacity="0.85"
            />
            {/* Greater Banjul Peninsula Highlight */}
            <ellipse cx="20" cy="32" rx="10" ry="12" fill="#087F8C" opacity="0.08" stroke="#087F8C" strokeDasharray="1 1" strokeWidth="0.3" />
          </svg>

          {/* Geographical Area Text Indicators */}
          <span className="absolute top-[8%] left-[2%] text-[8px] font-black text-blue-600 uppercase tracking-widest pointer-events-none">
            Atlantic Ocean
          </span>
          <span className="absolute top-[28%] left-[30%] text-[8px] font-bold text-blue-700/60 uppercase tracking-widest pointer-events-none">
            River Gambia
          </span>
          <span className="absolute top-[48%] left-[16%] text-[9px] font-extrabold text-[#172B3A]/70 uppercase tracking-wider pointer-events-none">
            Greater Banjul Area (KMC/Banjul)
          </span>
          <span className="absolute top-[12%] left-[45%] text-[8px] font-bold text-emerald-800/60 uppercase tracking-wider pointer-events-none">
            North Bank (NBR)
          </span>
          <span className="absolute top-[65%] left-[70%] text-[8px] font-bold text-amber-800/60 uppercase tracking-wider pointer-events-none">
            Central River (CRR)
          </span>

          {/* Hospital Markers */}
          {filteredHospitals.map((h) => {
            const coords = h.coordinates || { x: 20, y: 36 };
            const isSelected = selectedHospitalId === h.id || (selectedEntity?.type === 'hospital' && selectedEntity.data.id === h.id);
            const isTopEdge = coords.y < 25;

            return (
              <div
                key={h.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEntity({ type: 'hospital', data: h });
                }}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  isSelected ? 'z-40' : 'z-10 hover:z-50 focus-within:z-50'
                } group`}
              >
                <div className={`relative flex items-center justify-center transition-all duration-150 group-hover:scale-125 ${
                  isSelected ? 'scale-125 ring-4 ring-[#087F8C]/40 rounded-full' : ''
                }`}>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] shadow-md border-2 border-white transition-all ${
                      isSelected ? 'bg-[#087F8C] ring-2 ring-[#087F8C]' : 'bg-[#087F8C] group-hover:bg-[#066670]'
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                  </div>
                  {h.status === 'Busy' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E9A23B] ring-1 ring-white animate-pulse" />
                  )}
                </div>

                {/* Elevated Micro Tooltip - placed above or below depending on coordinate Y */}
                <div 
                  className={`hidden group-hover:flex flex-col absolute ${
                    isTopEdge ? 'top-full mt-2' : 'bottom-full mb-2'
                  } left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-[#172B3A] text-white text-[10px] font-bold whitespace-nowrap shadow-xl border border-white/10 z-50 pointer-events-none gap-0.5 min-w-max`}
                >
                  {/* Pointing Caret Arrow */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#172B3A] rotate-45 border-white/10 ${
                      isTopEdge ? '-top-1 border-t border-l' : '-bottom-1 border-b border-r'
                    }`}
                  />
                  <div className="text-white font-extrabold text-[11px] leading-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{h.name}</span>
                  </div>
                  <div className="text-teal-200/90 flex items-center gap-2 text-[9px] font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-2.5 h-2.5 text-teal-300" />
                      <span>{h.queueCount || 0} in queue</span>
                    </span>
                    <span>·</span>
                    <span>{h.wait} wait ({h.hours})</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pharmacy Markers */}
          {filteredPharmacies.map((p) => {
            const coords = p.coordinates || { x: 18, y: 35 };
            const isSelected = selectedEntity?.type === 'pharmacy' && selectedEntity.data.id === p.id;
            const isTopEdge = coords.y < 25;

            return (
              <div
                key={p.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEntity({ type: 'pharmacy', data: p });
                }}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  isSelected ? 'z-40' : 'z-10 hover:z-50 focus-within:z-50'
                } group`}
              >
                <div className={`relative flex items-center justify-center transition-all duration-150 group-hover:scale-125 ${
                  isSelected ? 'scale-125 ring-4 ring-[#2E9B68]/40 rounded-full' : ''
                }`}>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[9px] shadow-md border-2 border-white transition-all ${
                      isSelected ? 'bg-[#2E9B68] ring-2 ring-[#2E9B68]' : 'bg-[#2E9B68] group-hover:bg-emerald-700'
                    }`}
                  >
                    <Pill className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Elevated Pharmacy Micro Tooltip */}
                <div 
                  className={`hidden group-hover:flex flex-col absolute ${
                    isTopEdge ? 'top-full mt-2' : 'bottom-full mb-2'
                  } left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-xl bg-emerald-950 text-white text-[10px] font-bold whitespace-nowrap shadow-xl border border-emerald-800/40 z-50 pointer-events-none gap-0.5 min-w-max`}
                >
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-950 rotate-45 border-emerald-800/40 ${
                      isTopEdge ? '-top-1 border-t border-l' : '-bottom-1 border-b border-r'
                    }`}
                  />
                  <div className="text-white font-bold text-[10px] leading-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{p.name}</span>
                  </div>
                  <div className="text-emerald-200/90 text-[8px] font-medium">
                    {p.area} · In Stock
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Entity Popup Drawer Inside Map */}
        {selectedEntity && (
          <div className="absolute bottom-2 left-2 right-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-[#E3EBEE] shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 ${
                  selectedEntity.type === 'hospital' ? 'bg-[#087F8C]' : 'bg-[#2E9B68]'
                }`}>
                  {selectedEntity.type === 'hospital' ? (
                    <Building2 className="w-4 h-4" />
                  ) : (
                    <Pill className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-[#172B3A]">
                      {selectedEntity.data.name}
                    </h5>
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
                      {selectedEntity.type === 'hospital' ? selectedEntity.data.status : 'In Stock'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C8290] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#6C8290]" />
                    {selectedEntity.data.location}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEntity(null)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#E3EBEE] flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5 text-[11px] text-[#6C8290]">
                {selectedEntity.type === 'hospital' && (
                  <span className="flex items-center gap-1 font-bold text-[#087F8C] bg-[#E4F3F4] px-2 py-0.5 rounded-lg border border-[#087F8C]/20">
                    <Users className="w-3 h-3 text-[#087F8C]" />
                    {(selectedEntity.data as Hospital).queueCount || 0} queueing
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#087F8C]" />
                  {selectedEntity.data.hours}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {selectedEntity.data.rating}
                </span>
              </div>

              {selectedEntity.type === 'hospital' ? (
                <button
                  onClick={() => {
                    onSelectHospital?.(selectedEntity.data.id);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    onSelectPharmacy?.(selectedEntity.data as Pharmacy);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Refill Meds</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
