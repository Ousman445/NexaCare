import React, { useState, useEffect } from 'react';
import { Doctor } from '../../types';
import { 
  ChevronLeft, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MessageSquare, 
  PhoneOff, 
  Send, 
  User, 
  ShieldCheck,
  CheckCircle2,
  FileText,
  Pill,
  Activity,
  Share2,
  Sparkles
} from 'lucide-react';

interface EVisitProps {
  doctorName?: string;
  doctorSpec?: string;
  onEndCall: () => void;
  onNavigateToPharmacy?: () => void;
}

export const EVisit: React.FC<EVisitProps> = ({
  doctorName = 'Dr. Fatou Ceesay',
  doctorSpec = 'General Practitioner · Serrekunda GH',
  onEndCall,
  onNavigateToPharmacy
}) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showVitalsHUD, setShowVitalsHUD] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [callDuration, setCallDuration] = useState(145); // seconds
  const [issuedPrescription, setIssuedPrescription] = useState<string | null>(null);

  const [messages, setMessages] = useState([
    { sender: 'doctor', text: 'Hello! I am Dr. Fatou Ceesay. How are you feeling today?' },
    { sender: 'patient', text: 'Good day doctor. I have had mild fever and persistent cough for 2 days.' },
    { sender: 'doctor', text: 'Understood. I see your latest BP is 120/80 mmHg and temperature is 36.8°C. Let us review your symptoms.' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate doctor issuing a digital prescription after 10 seconds if not yet issued
  useEffect(() => {
    const rxTimer = setTimeout(() => {
      setIssuedPrescription('Amoxicillin 500mg (1 cap 3x daily) + Paracetamol 500mg');
    }, 8000);
    return () => clearTimeout(rxTimer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages(prev => [...prev, { sender: 'patient', text: chatInput.trim() }]);
    setChatInput('');

    // Doctor auto response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'doctor', text: 'Got it. I have noted this in your consultation chart and generated your digital prescription.' }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onEndCall}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-2xs hover:bg-[#F5F9FA] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-heading text-[#172B3A]">
                Live Telehealth Consultation
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-xs text-[#6C8290]">{doctorName} · {doctorSpec}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#087F8C] bg-[#E4F3F4] px-2.5 py-1 rounded-full">
            {formatDuration(callDuration)}
          </span>
          <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-[#2E9B68] bg-[#E8F6EF] px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            256-Bit Encrypted
          </span>
        </div>
      </div>

      {/* Video Call Stage */}
      <div
        className="rounded-3xl h-72 sm:h-80 relative overflow-hidden flex items-center justify-center text-white shadow-md border border-[#1c3345]"
        style={{ background: 'radial-gradient(circle at center, #1b3547 0%, #0d1a24 100%)' }}
      >
        {/* Doctor Video Avatar & Equalizer */}
        <div className="text-center p-4 z-10 space-y-2">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-2xl bg-[#087F8C] text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-md border-2 border-white/20">
              FC
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0d1a24] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold tracking-wide">{doctorName}</h4>
            <p className="text-xs text-white/70">
              Audio connected · High Definition (720p)
            </p>
          </div>

          {/* Active Audio Waveform bars */}
          <div className="flex items-center justify-center gap-1 pt-1 h-5">
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-5" style={{ animationDelay: '0.15s' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-4" style={{ animationDelay: '0.3s' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0.1s' }} />
          </div>
        </div>

        {/* Live Vitals Telemetry HUD Overlay */}
        {showVitalsHUD && (
          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md rounded-xl p-2.5 text-[10px] text-white border border-white/10 space-y-1 z-10 hidden sm:block">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE BIOMETRICS HUD</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-white/80">
              <span>BP: <strong className="text-white">120/80</strong></span>
              <span>HR: <strong className="text-white">72 BPM</strong></span>
              <span>SpO2: <strong className="text-white">99%</strong></span>
              <span>Temp: <strong className="text-white">36.8°C</strong></span>
            </div>
          </div>
        )}

        {/* Self-View Picture-in-Picture Box */}
        <div className="absolute bottom-3 right-3 w-22 h-30 bg-[#162734] rounded-2xl border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-lg z-10">
          {camOn ? (
            <div className="text-center p-2">
              <User className="w-7 h-7 text-white/70 mx-auto" />
              <span className="text-[10px] text-white/80 font-semibold block mt-1">You</span>
            </div>
          ) : (
            <div className="text-center">
              <VideoOff className="w-6 h-6 text-white/40 mx-auto" />
              <span className="text-[9px] text-white/40 block mt-1">Cam Off</span>
            </div>
          )}
        </div>
      </div>

      {/* Real-Time Doctor Prescription E-Slip Banner */}
      {issuedPrescription && (
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Pill className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                DIGITAL PRESCRIPTION ISSUED BY DOCTOR
              </span>
              <p className="text-xs font-bold text-[#172B3A] truncate">{issuedPrescription}</p>
            </div>
          </div>

          {onNavigateToPharmacy && (
            <button
              onClick={onNavigateToPharmacy}
              className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              Order from Pharmacy
            </button>
          )}
        </div>
      )}

      {/* Call Controls Bar */}
      <div className="flex items-center justify-center gap-3 py-1">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer ${
            micOn ? 'bg-white border border-[#E3EBEE] text-[#172B3A]' : 'bg-rose-50 border border-rose-200 text-rose-600'
          }`}
          title={micOn ? 'Mute Mic' : 'Unmute Mic'}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setCamOn(!camOn)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer ${
            camOn ? 'bg-white border border-[#E3EBEE] text-[#172B3A]' : 'bg-rose-50 border border-rose-200 text-rose-600'
          }`}
          title={camOn ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setShowVitalsHUD(!showVitalsHUD)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer ${
            showVitalsHUD ? 'bg-[#E4F3F4] text-[#087F8C] border border-teal-200' : 'bg-white border border-[#E3EBEE] text-[#172B3A]'
          }`}
          title="Toggle Vitals HUD"
        >
          <Activity className="w-5 h-5" />
        </button>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer ${
            chatOpen ? 'bg-[#087F8C] text-white' : 'bg-white border border-[#E3EBEE] text-[#172B3A]'
          }`}
          title="Open In-Call Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <button
          onClick={onEndCall}
          className="w-12 h-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-rose-600/20 cursor-pointer"
          title="End Consultation"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      {/* In-Call Live Chat Box */}
      {chatOpen && (
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3EBEE]">
            <strong className="text-xs font-bold text-[#172B3A]">
              Live Consultation Chat with {doctorName}
            </strong>
            <span className="text-[10px] text-[#6C8290]">End-to-End Encrypted</span>
          </div>

          {/* Messages */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl text-xs max-w-[82%] ${
                  m.sender === 'patient'
                    ? 'ml-auto bg-[#087F8C] text-white rounded-br-none'
                    : 'bg-[#F5F9FA] text-[#172B3A] border border-[#E3EBEE] rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Type message to doctor..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] text-xs text-[#172B3A] focus:bg-white focus:border-[#087F8C] focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center justify-center shadow-2xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
