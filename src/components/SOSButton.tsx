import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  Flame, 
  Truck,
  Shield,
  Radio,
  MapPin,
  Navigation,
  Copy,
  Check,
  Share2,
  AlertTriangle,
  Activity,
  UserCheck,
  Compass,
  Wifi,
  Phone
} from 'lucide-react';

interface SOSButtonProps {
  variant?: 'floating' | 'inline';
}

export const SOSButton: React.FC<SOSButtonProps> = ({ variant = 'inline' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [broadcastState, setBroadcastState] = useState<'idle' | 'transmitting' | 'active'>('idle');
  const [transmissionStep, setTransmissionStep] = useState(0);
  const [pingCount, setPingCount] = useState(1);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [activeTab, setActiveTab] = useState<'broadcast' | 'contacts'>('broadcast');

  const gpsCoords = "13.4432° N, 16.6781° W";
  const landmark = "Westfield Junction, Serekunda (KMC Sector 4)";

  const emergencyContacts = [
    { 
      label: 'National MOH Emergency Hotline', 
      number: '1166', 
      color: 'bg-rose-600', 
      sub: 'Toll-Free 24/7 Rapid Ambulance Dispatch (All Carriers)',
      icon: Truck,
      badge: 'Toll-Free'
    },
    { 
      label: 'Gambia National Fire & Rescue', 
      number: '118', 
      color: 'bg-amber-600', 
      sub: 'Trauma Extrication, Road Traffic Rescues & Fires',
      icon: Flame,
      badge: 'Toll-Free'
    },
    { 
      label: 'EFSTH Referral Trauma Unit', 
      number: '+220 422 7700', 
      color: 'bg-[#087F8C]', 
      sub: 'Banjul National Referral Hospital Emergency Room',
      icon: Building2,
      badge: '24/7 ER'
    },
    { 
      label: 'Africmed 24/7 Emergency Fleet', 
      number: '+220 446 0888', 
      color: 'bg-emerald-600', 
      sub: 'Kololi / Brusubi Critical Care & ICU Transport',
      icon: Building2,
      badge: 'Private Fleet'
    },
    { 
      label: 'Serekunda Hospital Triage Desk', 
      number: '+220 439 5678', 
      color: 'bg-indigo-600', 
      sub: 'Kanifing Municipality 24/7 Trauma Reception',
      icon: Building2,
      badge: 'Regional'
    }
  ];

  const packetSteps = [
    'Locking Differential GNSS (Accuracy ±3.2m)',
    'Packaging Patient Telemetry (Blood: O+ · ID: GM-748921)',
    'Handshaking with MOH 1166 Emergency Switchboard',
    'Broadcasting to Nearest EFSTH & Red Cross Triage Units'
  ];

  const handleStartBroadcast = () => {
    setBroadcastState('transmitting');
    setTransmissionStep(0);

    const stepInterval = setInterval(() => {
      setTransmissionStep((prev) => {
        if (prev >= packetSteps.length - 1) {
          clearInterval(stepInterval);
          setBroadcastState('active');
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleCancelBroadcast = () => {
    setBroadcastState('idle');
    setTransmissionStep(0);
    setPingCount(1);
  };

  const handleCopyGPS = () => {
    const textToCopy = `EMERGENCY SOS: NexaCare Gambia GPS Broadcast\nCoordinates: ${gpsCoords}\nLandmark: ${landmark}\nPatient: Ousman Bah (Blood O+, GM-748921)\nMap: https://maps.google.com/?q=13.4432,-16.6781`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2200);
  };

  // Ping interval during active broadcast
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (broadcastState === 'active') {
      interval = setInterval(() => {
        setPingCount((prev) => prev + 1);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [broadcastState]);

  return (
    <>
      {variant === 'inline' ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100 text-[#D9534F] border border-rose-200 text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>
            <span className="font-extrabold tracking-tight">SOS Rapid GPS & 1166 Hotlines</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-rose-200/80 text-rose-900 rounded-md font-bold group-hover:bg-rose-300 transition-colors">
            Emergency
          </span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white shadow-xl shadow-rose-600/30 flex items-center justify-center cursor-pointer transition-all border-2 border-white"
          title="Emergency SOS & GPS Broadcast"
        >
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Emergency SOS & GPS Broadcast Modal */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-[#172B3A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-[#E3EBEE] animate-in zoom-in-95 max-h-[90vh] overflow-y-auto space-y-4"
          >
            
            {/* Header with Status Indicator */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E3EBEE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold font-heading text-[#172B3A]">
                      Rapid GPS Emergency Hub
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                      LIVE TELEMETRY
                    </span>
                  </div>
                  <p className="text-xs text-[#6C8290]">
                    Direct satellite coordinates & instant 1166 / 118 dispatch
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs (Broadcast vs Direct Call) */}
            <div className="grid grid-cols-2 p-1 bg-[#F5F9FA] rounded-2xl border border-[#E3EBEE]">
              <button
                onClick={() => setActiveTab('broadcast')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'broadcast'
                    ? 'bg-white text-[#172B3A] shadow-xs'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Radio className="w-4 h-4 text-rose-600" />
                <span>GPS Location Broadcast</span>
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'bg-white text-[#172B3A] shadow-xs'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Phone className="w-4 h-4 text-[#087F8C]" />
                <span>Hotline Directory (5)</span>
              </button>
            </div>

            {/* TAB 1: RAPID GPS LOCATION BROADCAST */}
            {activeTab === 'broadcast' && (
              <div className="space-y-3">
                
                {/* Tactical Radar Telemetry Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0A1926] text-white p-4 border border-slate-800 shadow-lg">
                  
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
                        GNSS 3D Fix · 11 Satellites Lock
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                      <Wifi className="w-3 h-3 text-teal-400" />
                      <span>Africell 4G+ Tower KM-02</span>
                    </div>
                  </div>

                  {/* Coordinates & Landmark */}
                  <div className="space-y-1 relative z-10">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-lg sm:text-xl font-black text-rose-400 tracking-tight">
                        {gpsCoords}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-rose-950/60 text-rose-300 border border-rose-800/60 px-1.5 py-0.5 rounded">
                        Acc: ±3.2m
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{landmark}</span>
                    </p>
                  </div>

                  {/* Patient Telemetry Payload Preview */}
                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-[11px] relative z-10">
                    <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/60">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Patient</span>
                      <span className="font-bold text-white truncate block">Ousman Bah</span>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/60">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Blood Group</span>
                      <span className="font-bold text-rose-400">O+ (Rh Pos)</span>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/60">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Health ID</span>
                      <span className="font-mono font-bold text-teal-300">GM-748921</span>
                    </div>
                  </div>
                </div>

                {/* BROADCAST STATE CONTROLLER */}
                {broadcastState === 'idle' && (
                  <div className="space-y-2.5 pt-1">
                    <button
                      onClick={handleStartBroadcast}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-700 hover:to-red-800 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-rose-600/30 transition-all transform active:scale-[0.98] cursor-pointer"
                    >
                      <Radio className="w-5 h-5 animate-pulse" />
                      <span>Transmit Rapid Emergency Beacon Now</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyGPS}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#F5F9FA] hover:bg-[#EEF4F6] text-[#172B3A] text-xs font-bold border border-[#E3EBEE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedCoords ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied Emergency Data</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[#6C8290]" />
                            <span>Copy GPS Coordinates</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`EMERGENCY: I need medical assistance at ${landmark} (GPS: ${gpsCoords}). Patient: Ousman Bah (O+ Blood). Maps: https://maps.google.com/?q=13.4432,-16.6781`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Share via WhatsApp"
                      >
                        <Share2 className="w-4 h-4 text-emerald-600" />
                        <span>Share SMS</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* TRANSMITTING PACKET HANDSHAKE SIMULATOR */}
                {broadcastState === 'transmitting' && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-rose-800">
                      <Radio className="w-4 h-4 text-rose-600 animate-spin" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">
                        Establishing Emergency Uplink...
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {packetSteps.map((step, idx) => (
                        <div 
                          key={step}
                          className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${
                            idx <= transmissionStep ? 'opacity-100 font-semibold text-[#172B3A]' : 'opacity-30 text-[#6C8290]'
                          }`}
                        >
                          {idx <= transmissionStep ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />
                          )}
                          <span className="font-mono text-[11px]">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACTIVE LIVE BROADCAST STATE */}
                {broadcastState === 'active' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 animate-in zoom-in-95">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                        </span>
                        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 font-mono">
                          LIVE BEACON BROADCAST ACTIVE
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                        Ping #{pingCount} Transmitted
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5 text-xs text-[#172B3A]">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-emerald-600" />
                          <span>MOH Emergency 1166 Dispatcher</span>
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Connected
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6C8290]">
                        Assigned: <strong>Ambulance Unit MED-04 (Serekunda Hub)</strong> · Estimated response time: <strong>~6 mins</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href="tel:1166"
                        className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Speak with 1166</span>
                      </a>
                      <button
                        onClick={handleCancelBroadcast}
                        className="py-2.5 px-3 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
                      >
                        Stop Beacon
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: DIRECT DIAL EMERGENCY HOTLINES */}
            {activeTab === 'contacts' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C8290] block">
                  Tap to Dial Immediately (24/7 Hotlines)
                </span>

                {emergencyContacts.map((c) => {
                  const IconComp = c.icon;
                  return (
                    <a
                      key={c.number}
                      href={`tel:${c.number.replace(/\s+/g, '')}`}
                      className="p-3 rounded-2xl border border-[#E3EBEE] hover:border-[#087F8C] hover:bg-[#E4F3F4]/40 flex items-center justify-between text-xs transition-all group cursor-pointer shadow-2xs gap-2.5 overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className={`w-9 h-9 rounded-xl ${c.color} text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <strong className="text-[#172B3A] text-xs font-bold block group-hover:text-[#087F8C] truncate max-w-full">
                              {c.label}
                            </strong>
                            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                              {c.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#6C8290] block truncate">{c.sub}</span>
                        </div>
                      </div>

                      <span className="font-mono font-black text-xs text-[#087F8C] bg-[#F5F9FA] group-hover:bg-[#087F8C] group-hover:text-white px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] shrink-0 whitespace-nowrap transition-colors">
                        {c.number}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Bottom Hospital Emergency Notice */}
            <div className="pt-2 border-t border-[#E3EBEE] text-center">
              <p className="text-[10px] text-[#6C8290] leading-relaxed">
                For major trauma, obstetric distress, or cardiac events in The Gambia, visit <strong>EFSTH Banjul</strong> or <strong>Serekunda General Hospital Emergency Ward</strong> directly.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

