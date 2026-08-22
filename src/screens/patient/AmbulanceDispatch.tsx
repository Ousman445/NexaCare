import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  ShieldAlert, 
  Truck, 
  Radio, 
  CheckCircle2,
  HeartPulse,
  Flame,
  Building2,
  Copy,
  Check,
  Activity,
  Compass,
  LocateFixed,
  RefreshCw
} from 'lucide-react';
import { AmbulanceTracker } from '../../components/AmbulanceTracker';

interface AmbulanceDispatchProps {
  onBackToHome: () => void;
}

export const AmbulanceDispatch: React.FC<AmbulanceDispatchProps> = ({ onBackToHome }) => {
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'locating' | 'dispatched' | 'arrived'>('idle');
  const [selectedEmergency, setSelectedEmergency] = useState('Severe Trauma & Bleeding');
  const [gpsCoordinates, setGpsCoordinates] = useState('13.4432° N, 16.6781° W');
  const [pickupLandmark, setPickupLandmark] = useState('Westfield Junction, Serrekunda');
  const [landmarkDetails, setLandmarkDetails] = useState('Near Africell Head Office, opposite Police Station');
  const [isEditingGps, setIsEditingGps] = useState(false);
  const [customLat, setCustomLat] = useState('13.4432');
  const [customLng, setCustomLng] = useState('-16.6781');
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(7);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [activeFirstAidTab, setActiveFirstAidTab] = useState<'cpr' | 'bleeding' | 'choking' | 'burns'>('cpr');

  const emergencyTypes = [
    { title: 'Severe Trauma & Bleeding', priority: 'Critical', desc: 'Active hemorrhaging or deep lacerations' },
    { title: 'Maternal Labor / Delivery Distress', priority: 'Urgent', desc: 'Active labor or obstetric complications' },
    { title: 'Acute Chest Pain / Cardiac', priority: 'Critical', desc: 'Suspected myocardial infarction' },
    { title: 'Severe Difficulty Breathing', priority: 'Critical', desc: 'Acute respiratory distress or asthma crisis' },
    { title: 'Pediatric High Fever / Seizure', priority: 'Urgent', desc: 'Febrile convulsions or unresponsive child' }
  ];

  const landmarkPresets = [
    { name: 'Westfield Junction, Serrekunda', note: 'Near Africell Head Office, opposite Police Station' },
    { name: 'Senegambia Strip, Kololi', note: 'Outside Djembe Hotel / Craft Market Junction' },
    { name: 'Brusubi Turntable, WCR', note: 'Near Brusubi Police Station / Standard Chartered ATM' },
    { name: 'Bakau Cape Point', note: 'Opposite Ocean Bay Hotel entrance' },
    { name: 'Banjul Independence Drive', note: 'Near National Assembly / July 22 Arch' },
    { name: 'Brikama Main Garage', note: 'Central Taxi Park, Brikama Market side' },
    { name: 'Kanifing Hospital Junction', note: 'Opposite Red Cross HQ, Jimpex Road' },
    { name: 'Farafenni Ferry Terminal', note: 'North Bank main crossing entry' }
  ];

  const emergencyHotlines = [
    { name: 'National MOH Emergency Hotline', number: '1166', sub: 'Toll-Free 24/7 Rapid Ambulance Dispatch', icon: Truck, color: 'bg-rose-600' },
    { name: 'Gambia Fire & Rescue Trauma Unit', number: '118', sub: 'Extrication & Accident Rescue Service', icon: Flame, color: 'bg-amber-600' },
    { name: 'EFSTH Referral Trauma Unit (Banjul)', number: '+220 422 7700', sub: 'National Referral Hospital Triage', icon: Building2, color: 'bg-[#087F8C]' },
    { name: 'Africmed 24/7 Emergency Fleet', number: '+220 446 0888', sub: 'Private Critical Care Transport', icon: Building2, color: 'bg-emerald-600' }
  ];

  const handleRefreshGps = () => {
    setIsLocatingGps(true);
    setTimeout(() => {
      setGpsCoordinates('13.4438° N, 16.6792° W');
      setCustomLat('13.4438');
      setCustomLng('-16.6792');
      setIsLocatingGps(false);
    }, 900);
  };

  const handleApplyCustomGps = () => {
    if (customLat && customLng) {
      const latNum = parseFloat(customLat) || 13.4432;
      const lngNum = parseFloat(customLng) || -16.6781;
      const latStr = `${Math.abs(latNum).toFixed(4)}° ${latNum >= 0 ? 'N' : 'S'}`;
      const lngStr = `${Math.abs(lngNum).toFixed(4)}° ${lngNum >= 0 ? 'E' : 'W'}`;
      setGpsCoordinates(`${latStr}, ${lngStr}`);
      setIsEditingGps(false);
    }
  };

  const handleSelectPresetLandmark = (preset: { name: string; note: string }) => {
    setPickupLandmark(preset.name);
    setLandmarkDetails(preset.note);
  };

  const handleRequestDispatch = () => {
    setDispatchStatus('locating');
    setTimeout(() => {
      setDispatchStatus('dispatched');
      setEtaMinutes(7);
    }, 1800);
  };

  const handleCopyGPS = () => {
    const fullTelemetry = `EMERGENCY SOS: NexaCare Ambulance Dispatch\nGPS Coordinates: ${gpsCoordinates}\nPickup Landmark: ${pickupLandmark}\nLandmark Notes: ${landmarkDetails || 'None'}\nPatient: Ousman Jobe (Blood O+, GM-748921)`;
    navigator.clipboard.writeText(fullTelemetry);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  useEffect(() => {
    if (dispatchStatus === 'dispatched' && etaMinutes > 1) {
      const timer = setInterval(() => {
        setEtaMinutes(prev => {
          if (prev <= 2) {
            setDispatchStatus('arrived');
            return 0;
          }
          return prev - 1;
        });
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [dispatchStatus, etaMinutes]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] hover:bg-[#F5F9FA] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
              NATIONAL EMERGENCY RESPONSE
            </span>
            <h1 className="text-lg font-bold font-heading text-[#172B3A]">
              Emergency Ambulance Hub
            </h1>
          </div>
        </div>

        <a
          href="tel:1166"
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 1166</span>
        </a>
      </div>

      {/* Tactical GPS Location & Pickup Landmark Telemetry Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0A1926] text-white p-4 sm:p-5 border border-slate-800 shadow-xl">
        {/* Subtle Radar Ring Graphic in Corner */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-rose-500/20 pointer-events-none flex items-center justify-center">
          <div className="w-28 h-28 rounded-full border border-rose-500/30 flex items-center justify-center animate-ping duration-1000">
            <div className="w-16 h-16 rounded-full border border-rose-500/40" />
          </div>
        </div>

        {/* Telemetry Header */}
        <div className="flex items-center justify-between relative z-10 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
              GNSS 3D Differential Fix · 11 Satellites Lock
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRefreshGps}
              disabled={isLocatingGps}
              className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[10px] flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
              title="Refresh GPS GNSS lock"
            >
              <RefreshCw className={`w-3 h-3 ${isLocatingGps ? 'animate-spin text-teal-400' : ''}`} />
              <span>{isLocatingGps ? 'Fixing...' : 'Live GPS'}</span>
            </button>
            <button
              onClick={handleCopyGPS}
              className="px-2.5 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedCoords ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copiedCoords ? 'Copied' : 'Copy GPS'}</span>
            </button>
          </div>
        </div>

        {/* Coordinates & Landmark Info */}
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-base sm:text-2xl font-black text-rose-400 tracking-tight">
              {gpsCoordinates}
            </span>
            <span className="text-[10px] font-mono font-bold bg-rose-950/70 text-rose-300 border border-rose-800/60 px-2 py-0.5 rounded-full shrink-0">
              HDOP: 0.8 · Acc: ±3.2m
            </span>
          </div>

          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
            <p className="text-xs text-slate-200 font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Pickup Landmark: <strong className="text-white font-bold">{pickupLandmark || 'Not specified'}</strong></span>
            </p>
            {landmarkDetails && (
              <p className="text-[11px] text-slate-400 pl-5.5 italic">
                "{landmarkDetails}"
              </p>
            )}
          </div>
        </div>

        {/* Patient Telemetry Metadata Strip */}
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-[11px] relative z-10">
          <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/60">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Patient</span>
            <span className="font-bold text-white truncate block">Ousman Jobe</span>
          </div>
          <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/60">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Blood Group</span>
            <span className="font-bold text-rose-400">O+ (Rh Positive)</span>
          </div>
          <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/60">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Health ID</span>
            <span className="font-mono font-bold text-teal-300">GM-748921</span>
          </div>
        </div>
      </div>

      {/* Dispatch Flow View */}
      {dispatchStatus === 'idle' && (
        <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs space-y-4">
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-800">
                Direct Priority Life Support Broadcast
              </h4>
              <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                Triggering dispatch notifies the nearest Gambian Red Cross / Ministry of Health triage team instantly with your medical profile (O+ Blood, GM-748921) and precise pickup landmark.
              </p>
            </div>
          </div>

          {/* Emergency Category Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#172B3A]">
              1. Nature of Medical Emergency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {emergencyTypes.map((em) => (
                <div
                  key={em.title}
                  onClick={() => setSelectedEmergency(em.title)}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    selectedEmergency === em.title
                      ? 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-300'
                      : 'border-[#E3EBEE] bg-[#F8FAFC] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#172B3A]">{em.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      em.priority === 'Critical' ? 'bg-rose-200 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {em.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C8290] leading-snug">{em.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Landmark Section (User Feature: Add GPS Location with Pickup Landmark) */}
          <div className="space-y-3 pt-1 border-t border-[#E3EBEE]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#172B3A] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>2. GPS Location & Pickup Landmark</span>
              </label>
              <button
                type="button"
                onClick={() => setIsEditingGps(!isEditingGps)}
                className="text-[11px] font-bold text-[#087F8C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{isEditingGps ? 'Close Custom GPS' : 'Set Custom Coordinates'}</span>
              </button>
            </div>

            {/* Custom GPS Coordinates Input Area */}
            {isEditingGps && (
              <div className="p-3 bg-[#F5F9FA] rounded-2xl border border-teal-200 space-y-2 animate-in fade-in">
                <span className="text-[11px] font-bold text-[#172B3A] block">
                  Fine-tune Exact GPS Coordinates
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#6C8290] block mb-0.5">Latitude (°N)</label>
                    <input
                      type="text"
                      value={customLat}
                      onChange={(e) => setCustomLat(e.target.value)}
                      placeholder="13.4432"
                      className="w-full p-2 rounded-xl bg-white border border-[#E3EBEE] text-xs font-mono text-[#172B3A]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#6C8290] block mb-0.5">Longitude (°W)</label>
                    <input
                      type="text"
                      value={customLng}
                      onChange={(e) => setCustomLng(e.target.value)}
                      placeholder="-16.6781"
                      className="w-full p-2 rounded-xl bg-white border border-[#E3EBEE] text-xs font-mono text-[#172B3A]"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleApplyCustomGps}
                    className="px-3 py-1.5 rounded-lg bg-[#087F8C] text-white text-xs font-bold hover:bg-[#066670] transition-colors cursor-pointer"
                  >
                    Apply Coordinates
                  </button>
                  <button
                    type="button"
                    onClick={handleRefreshGps}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#E3EBEE] text-[#172B3A] text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <LocateFixed className="w-3.5 h-3.5 text-rose-600" />
                    <span>Auto-Detect Current GPS</span>
                  </button>
                </div>
              </div>
            )}

            {/* Pickup Landmark Name Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#172B3A] block">
                Pickup Landmark / Compound / Street
              </label>
              <input
                type="text"
                value={pickupLandmark}
                onChange={(e) => setPickupLandmark(e.target.value)}
                placeholder="e.g. Behind Serrekunda Market near Central Mosque"
                className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E3EBEE] text-xs font-medium text-[#172B3A] focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Specific Landmark Details / Gate Description */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#172B3A] block">
                Pickup Visual Notes & Access Details (for ambulance driver)
              </label>
              <input
                type="text"
                value={landmarkDetails}
                onChange={(e) => setLandmarkDetails(e.target.value)}
                placeholder="e.g. Blue compound gate, opposite small shop, paved alleyway"
                className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E3EBEE] text-xs font-medium text-[#172B3A] focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Quick-Pick Landmark Chips */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C8290] block">
                Popular Regional Landmarks (Tap to set):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {landmarkPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPresetLandmark(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                      pickupLandmark === preset.name
                        ? 'bg-rose-50 border-rose-300 text-rose-800'
                        : 'bg-[#F8FAFC] border-[#E3EBEE] text-[#6C8290] hover:text-[#172B3A] hover:bg-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Dispatch Button */}
          <div className="pt-2">
            <button
              onClick={handleRequestDispatch}
              className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>Broadcast Emergency Dispatch Now</span>
            </button>
          </div>
        </div>
      )}

      {/* Locating Simulation State */}
      {dispatchStatus === 'locating' && (
        <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-md text-center space-y-4 animate-in fade-in">
          <div className="relative w-16 h-16 mx-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <div className="relative w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
              <Radio className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-900 border border-rose-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              BROADCASTING EMERGENCY TELEMETRY...
            </div>
            <h3 className="text-lg font-bold font-heading text-[#172B3A]">Locating Nearest Response Vehicle</h3>
            <p className="text-xs text-[#6C8290] mt-1 max-w-sm mx-auto">
              Handshaking with EFSTH Banjul Trauma Desk, Africmed Critical Fleet & Kanifing Red Cross units with landmark: <strong>{pickupLandmark}</strong>...
            </p>
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E3EBEE] max-w-sm mx-auto text-left space-y-1.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>GNSS Fix: {gpsCoordinates}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Landmark: {pickupLandmark}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Patient Profile: O+ (GM-748921)</span>
            </div>
            <div className="flex items-center gap-2 text-rose-600 animate-pulse">
              <Radio className="w-3.5 h-3.5 shrink-0" />
              <span>Pinging Unit MED-04 (Sector 4)...</span>
            </div>
          </div>
        </div>
      )}

      {/* Active En-Route Telemetry with Live GPS Route Tracker */}
      {(dispatchStatus === 'dispatched' || dispatchStatus === 'arrived') && (
        <div className="space-y-4">
          {/* Interactive GPS Ambulance Map Tracker */}
          <AmbulanceTracker
            destinationName={pickupLandmark}
            initialEtaMinutes={etaMinutes}
            onArrived={() => setDispatchStatus('arrived')}
          />

          <div className="bg-white rounded-3xl border border-rose-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                    {dispatchStatus === 'arrived' ? 'AMBULANCE ON SCENE' : 'PARAMEDIC UNIT DISPATCHED'}
                  </span>
                  <h3 className="text-base font-bold text-[#172B3A]">
                    {dispatchStatus === 'arrived' ? 'Paramedics Have Arrived' : 'Unit GM-MED-04 En Route'}
                  </h3>
                  <p className="text-xs text-[#6C8290]">Destination Landmark: {pickupLandmark}</p>
                </div>
              </div>

              {dispatchStatus === 'dispatched' ? (
                <div className="text-right">
                  <span className="text-2xl font-black text-rose-600 font-mono">~{etaMinutes} min</span>
                  <span className="text-[10px] text-[#6C8290] block">Estimated Arrival</span>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Arrived
                </span>
              )}
            </div>

            {/* Progress Timeline */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E3EBEE] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-[#172B3A]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Dispatch Confirmed ({gpsCoordinates})
                </span>
                <span className="text-[11px] text-[#6C8290]">Just now</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-[#172B3A]">
                  <Activity className="w-4 h-4 text-[#087F8C]" />
                  Driver: Lamin Sanneh · Paramedic: Isatou Jallow
                </span>
                <span className="text-[11px] text-[#087F8C] font-semibold">Triage Level 1</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:1166"
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Paramedic</span>
              </a>
              <button
                onClick={() => setDispatchStatus('idle')}
                className="py-2.5 px-3 rounded-xl bg-[#F5F9FA] hover:bg-[#EEF4F6] text-[#172B3A] text-xs font-bold border border-[#E3EBEE] transition-colors cursor-pointer"
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Hotlines Directory */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C8290]">
          Direct Gambia Emergency Hotlines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {emergencyHotlines.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.name}
                className="p-3 rounded-2xl bg-white border border-[#E3EBEE] flex items-center justify-between gap-2.5 shadow-2xs overflow-hidden"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-xl ${h.color} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#172B3A] truncate">{h.name}</h4>
                    <p className="text-[10px] text-[#6C8290] truncate">{h.sub}</p>
                  </div>
                </div>
                <a
                  href={`tel:${h.number.replace(/\s+/g, '')}`}
                  className="px-2.5 py-1.5 rounded-lg bg-[#E4F3F4] text-[#087F8C] hover:bg-[#087F8C] hover:text-white text-xs font-bold transition-colors shrink-0 whitespace-nowrap"
                >
                  {h.number}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* First-Aid Emergency Guides */}
      <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-[#087F8C]" />
            <h3 className="text-xs font-bold text-[#172B3A]">Instant First-Aid Protocols</h3>
          </div>
          <span className="text-[10px] text-[#6C8290]">While waiting for dispatch</span>
        </div>

        {/* First Aid Tabs */}
        <div className="flex p-1 bg-[#F8FAFC] rounded-xl border border-[#E3EBEE] gap-1">
          <button
            onClick={() => setActiveFirstAidTab('cpr')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFirstAidTab === 'cpr' ? 'bg-[#087F8C] text-white shadow-2xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            Adult CPR
          </button>
          <button
            onClick={() => setActiveFirstAidTab('bleeding')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFirstAidTab === 'bleeding' ? 'bg-[#087F8C] text-white shadow-2xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            Severe Bleeding
          </button>
          <button
            onClick={() => setActiveFirstAidTab('choking')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFirstAidTab === 'choking' ? 'bg-[#087F8C] text-white shadow-2xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            Choking
          </button>
          <button
            onClick={() => setActiveFirstAidTab('burns')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFirstAidTab === 'burns' ? 'bg-[#087F8C] text-white shadow-2xs' : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            Burns
          </button>
        </div>

        {/* Step Guide Content */}
        <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E3EBEE] text-xs space-y-1.5">
          {activeFirstAidTab === 'cpr' && (
            <ol className="list-decimal list-inside space-y-1 text-[#172B3A] text-[11px] leading-relaxed">
              <li>Place hands in center of chest between nipples.</li>
              <li>Push hard and fast (100–120 compressions per minute, 2 inches deep).</li>
              <li>Allow chest to completely recoil between compressions.</li>
            </ol>
          )}
          {activeFirstAidTab === 'bleeding' && (
            <ol className="list-decimal list-inside space-y-1 text-[#172B3A] text-[11px] leading-relaxed">
              <li>Apply firm, continuous direct pressure with a clean cloth or gauze.</li>
              <li>Do not remove cloth if soaked; layer another cloth on top.</li>
              <li>Elevate the injured limb above heart level if no fracture is suspected.</li>
            </ol>
          )}
          {activeFirstAidTab === 'choking' && (
            <ol className="list-decimal list-inside space-y-1 text-[#172B3A] text-[11px] leading-relaxed">
              <li>Stand behind person and place arms around waist.</li>
              <li>Make a fist above the navel; grasp with other hand.</li>
              <li>Deliver quick, upward abdominal thrusts until airway is clear.</li>
            </ol>
          )}
          {activeFirstAidTab === 'burns' && (
            <ol className="list-decimal list-inside space-y-1 text-[#172B3A] text-[11px] leading-relaxed">
              <li>Cool burn immediately with cool running water for 10–15 minutes.</li>
              <li>Do not apply ice, butter, or paste to the wound.</li>
              <li>Cover loosely with sterile, non-adhesive dressing.</li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};
