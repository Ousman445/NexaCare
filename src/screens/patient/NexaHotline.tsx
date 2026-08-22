import React from 'react';
import { 
  Phone, 
  HelpCircle, 
  ArrowLeft, 
  Building2, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Languages, 
  Users, 
  Clock, 
  Radio,
  MapPin,
  ChevronRight,
  Info,
  HeartHandshake
} from 'lucide-react';

interface NexaHotlineProps {
  onBackToHome: () => void;
  onGoToNexaChat: () => void;
  onGoToEmergency: () => void;
}

export const NexaHotline: React.FC<NexaHotlineProps> = ({
  onBackToHome,
  onGoToNexaChat,
  onGoToEmergency
}) => {
  const helplineNumber = "+220 800 0000";
  const shortCode = "1122";

  const languages = [
    { name: 'Wolof', sub: 'Waxtaan ak opereteer bu xam Wolof bu baax' },
    { name: 'Mandinka', sub: 'Kumaa opereteeroo feŋ meŋ be Mandinka kaŋo la' },
    { name: 'Fula (Pulaar)', sub: 'Haaldu e gollotooɗo baawɗo Pulaar no moƴƴi' },
    { name: 'Jola', sub: 'Kajoolay kani erokaay' },
    { name: 'English', sub: 'Speak with an English-speaking patient support agent' }
  ];

  const assistedSteps = [
    {
      step: '1',
      title: 'Call the Hotline or Visit Reception Desk',
      desc: 'Dial 1122 or +220 800 0000 from any Africell, QCell, or Gamcel line, or walk directly up to any participating hospital triage desk.'
    },
    {
      step: '2',
      title: 'Speak in Your Preferred Local Language',
      desc: 'Our trained healthcare navigators will speak with you in Wolof, Mandinka, Fula, Jola, or English to understand your clinic needs.'
    },
    {
      step: '3',
      title: 'Operator Registers Your Digital Queue Ticket',
      desc: 'The operator logs your patient details into the national NexaCare system and reserves your exact position in the doctor’s queue.'
    },
    {
      step: '4',
      title: 'Receive SMS Updates & Wait Stress-Free',
      desc: 'You receive instant SMS queue updates on your phone so you can relax at home or in shade without waiting in crowded indoor corridors.'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            aria-label="Back to home"
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] hover:bg-[#F5F9FA] transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
              PATIENT ACCESSIBILITY NETWORK
            </span>
            <h1 className="text-lg font-bold font-heading text-[#172B3A]">
              NexaHotline Human Assistance
            </h1>
          </div>
        </div>

        <span className="px-3 py-1 bg-teal-50 border border-teal-200 text-[#087F8C] rounded-full text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Non-Emergency</span>
        </span>
      </div>

      {/* Hero Callout Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#087F8C] via-[#0A6C77] to-[#172B3A] text-white p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-white/10 backdrop-blur-xs text-teal-200">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-100 font-bold">
              Inclusive Healthcare For All Gambians
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Can't comfortably read English or use a smartphone?
            </h2>
            <p className="text-xs sm:text-sm text-teal-50/90 mt-2 max-w-xl leading-relaxed">
              You don’t need a smartphone or internet data to skip hospital lines. Call <strong>NexaHotline</strong> or walk up to any hospital reception desk to get a digital ticket booked on your behalf by a human agent.
            </p>
          </div>

          {/* Hotline Action Box */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={`tel:${helplineNumber.replace(/\s+/g, '')}`}
              className="py-3 px-5 rounded-2xl bg-white text-[#087F8C] hover:bg-teal-50 active:scale-[0.98] font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-black/10 transition-all"
            >
              <Phone className="w-4 h-4 text-[#087F8C]" />
              <span>Call Hotline ({helplineNumber})</span>
            </a>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-teal-100">
              <Clock className="w-4 h-4 shrink-0 text-teal-300" />
              <span>Toll-Free · Available 24/7 across all GSM carriers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Distinction Alert: General Assistance vs Emergency */}
      <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 flex items-start gap-3.5 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-rose-900">
            Need Immediate Medical Life Support or Ambulance?
          </h3>
          <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">
            NexaHotline is for general appointment and queue assistance. If you or someone nearby is suffering from trauma, severe bleeding, breathing distress, or acute labor, switch immediately to our emergency services.
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={onGoToEmergency}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Go to Emergency Hub (Call 1166)</span>
            </button>
          </div>
        </div>
      </div>

      {/* How Human-Assisted Ticketing Works */}
      <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-heading text-[#172B3A]">
              How Assisted Ticketing Works
            </h3>
            <p className="text-xs text-[#6C8290]">
              Empowering elders, illiterate citizens, and non-smartphone users
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#E4F3F4] text-[#087F8C] text-xs font-bold">
            4 Simple Steps
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {assistedSteps.map((s) => (
            <div
              key={s.step}
              className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E3EBEE] space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#087F8C] text-white text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <strong className="text-xs font-bold text-[#172B3A]">{s.title}</strong>
              </div>
              <p className="text-xs text-[#6C8290] pl-8 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Multilingual Support Grid */}
      <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#087F8C]" />
          <h3 className="text-sm font-bold font-heading text-[#172B3A]">
            Supported Gambian Local Languages
          </h3>
        </div>
        <p className="text-xs text-[#6C8290]">
          Hotline agents are trained in local mother tongues so patients can communicate their symptoms freely:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {languages.map((l) => (
            <div
              key={l.name}
              className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E3EBEE] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-[#172B3A] block">{l.name}</strong>
                <p className="text-[11px] text-[#6C8290] leading-snug">{l.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative: Try NexaChat AI Assistant */}
      <div className="p-4 rounded-3xl bg-teal-50 border border-teal-200 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">
              Prefer Guided Digital Assistance?
            </strong>
            <p className="text-xs text-[#6C8290]">
              Try NexaChat conversational guide on this device right now.
            </p>
          </div>
        </div>

        <button
          onClick={onGoToNexaChat}
          className="px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <span>Open NexaChat</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
