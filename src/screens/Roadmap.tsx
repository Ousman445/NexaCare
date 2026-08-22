import React, { useState } from 'react';
import { 
  Rocket, 
  Phone, 
  MessageSquare, 
  Building2, 
  Stethoscope, 
  FlaskConical, 
  BarChart3, 
  Check, 
  X,
  Mic,
  Sparkles,
  HeartHandshake,
  Languages,
  Radio,
  Cpu,
  Layers,
  HelpCircle,
  Volume2,
  Share2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface RoadmapProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVoiceConcept?: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ isOpen, onClose, onOpenVoiceConcept }) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'all'>('voice');

  if (!isOpen) return null;

  const nexavoicePillars = [
    {
      title: 'Mother-Tongue Speech Recognition (STT)',
      desc: 'Fine-tuned acoustic models natively supporting Wolof, Mandinka, Fula (Pulaar), Jola, and English, understanding local accents and cultural symptom descriptions.',
      icon: Languages,
      tag: '5 Languages'
    },
    {
      title: 'Hands-Free Zero-Touch Queue Ticketing',
      desc: 'Natural language parsing converts speech into registered hospital tickets (e.g., OPD, Maternity, Eye Clinic) with department routing & SMS receipt.',
      icon: Mic,
      tag: 'Voice-to-Ticket'
    },
    {
      title: 'Toll-Free 2G Feature Phone IVR Voice Bridge',
      desc: 'Enables any citizen without a smartphone or internet connection to dial in via standard phone call, speak naturally, and secure a queue spot.',
      icon: Phone,
      tag: 'Universal Access'
    },
    {
      title: 'Speech Synthesized (TTS) Audio Prescriptions',
      desc: 'Audio readouts of dosage instructions, wait-time countdowns, and clinic arrival warnings in the patient’s chosen mother tongue for low-literacy users.',
      icon: Volume2,
      tag: 'Accessible Audio'
    },
    {
      title: 'Offline Edge AI & Low-Bandwidth Quantization',
      desc: 'Compressed local neural weights that run directly at rural clinic kiosks across provincial regions during network outages.',
      icon: Cpu,
      tag: 'Offline Resilience'
    },
    {
      title: 'Doctor Dictation & Clinical Transcription',
      desc: 'Hands-free voice notes for physicians, auto-transcribing examinations into structured English Electronic Health Records in seconds.',
      icon: Stethoscope,
      tag: 'Provider Productivity'
    }
  ];

  const roadmapItems = [
    {
      t: 'NexaVoice (Multilingual Voice AI)',
      d: 'Hands-free voice queue booking and symptom guidance in native Gambian languages (Wolof, Mandinka, Fula, Jola) and English.',
      icon: Mic,
      color: 'bg-purple-50 text-purple-600',
      badge: 'Flagship Concept'
    },
    {
      t: 'USSD Access (*220#)',
      d: 'Dial-in queue ticketing and basic appointment booking for feature phones without internet data.',
      icon: Phone,
      color: 'bg-emerald-50 text-[#2E9B68]',
      badge: 'Planned'
    },
    {
      t: 'SMS Real-Time Notifications',
      d: 'Instant queue alerts and estimated wait countdown via Africell / QCell GSM gateways.',
      icon: MessageSquare,
      color: 'bg-sky-50 text-[#4F8FC0]',
      badge: 'Planned'
    },
    {
      t: 'National Hospital Network Connections',
      d: 'Expanding onboarding to provincial hospitals across Bwiam, Farafenni, Bansang, and Basse.',
      icon: Building2,
      color: 'bg-teal-50 text-[#087F8C]',
      badge: 'Planned'
    },
    {
      t: 'Inter-Facility Referral System',
      d: 'Seamless doctor-to-doctor electronic case transfers between local clinics and EFSTH Tertiary.',
      icon: Stethoscope,
      color: 'bg-indigo-50 text-indigo-600',
      badge: 'Planned'
    },
    {
      t: 'Lab & Pharmacy Full Integration',
      d: 'Direct mobile delivery of lab test results and electronic prescription dispensing tracking.',
      icon: FlaskConical,
      color: 'bg-amber-50 text-[#E9A23B]',
      badge: 'Planned'
    },
    {
      t: 'Predictive Wait-Time AI Analytics',
      d: 'Machine learning forecasting for clinic surge hours and staff capacity balancing.',
      icon: BarChart3,
      color: 'bg-rose-50 text-rose-600',
      badge: 'Planned'
    }
  ];

  const priority = [
    'Standard NexaCare Digital Platform (Live)',
    'NexaChat Accessible Guided Assistant (Live)',
    'NexaHotline 1122 & Reception Desk Assistance (Live)',
    'Emergency & GPS Real-Time Telemetry Tracker (Live)',
    'NexaVoice Mother-Tongue Voice AI (Roadmap Prototype)'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#172B3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shadow-xs">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-[#172B3A]">
                NEXACARE Platform Roadmap
              </h3>
              <p className="text-xs text-[#6C8290]">Future innovations & technology pipeline for The Gambia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: NexaVoice Focus vs Overall Pipeline */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F9FA] rounded-2xl border border-[#E3EBEE] my-4">
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>NexaVoice (Complete Vision)</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Roadmap Initiatives</span>
          </button>
        </div>

        {/* TAB 1: Complete NexaVoice Vision */}
        {activeTab === 'voice' && (
          <div className="space-y-4 animate-in fade-in">
            {/* NexaVoice Feature Card Header */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#087F8C] text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-white/10 backdrop-blur-xs text-purple-200">
                    <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200 font-extrabold">
                    FLAGSHIP INNOVATION
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 border border-purple-300/30 text-purple-100 text-[10px] font-bold">
                  Prototype Active
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold font-heading text-white">
                  NexaVoice: Multilingual Voice-First Healthcare AI
                </h4>
                <p className="text-xs text-purple-100/90 mt-1 leading-relaxed">
                  A groundbreaking initiative to eliminate all literacy, language, and technology barriers in healthcare across The Gambia by enabling full voice-first interaction in native mother tongues.
                </p>
              </div>

              {/* Supported Languages tags */}
              <div className="pt-1 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-lg bg-white/15 text-[11px] font-semibold text-white">
                  🇬🇲 Wolof
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-white/15 text-[11px] font-semibold text-white">
                  🇬🇲 Mandinka
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-white/15 text-[11px] font-semibold text-white">
                  🇬🇲 Fula (Pulaar)
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-white/15 text-[11px] font-semibold text-white">
                  🇬🇲 Jola
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-white/15 text-[11px] font-semibold text-white">
                  🌐 English
                </span>
              </div>

              {onOpenVoiceConcept && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenVoiceConcept();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-950 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mic className="w-4 h-4 text-purple-600" />
                    <span>Launch Interactive NexaVoice Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* 6 Key Architectural Pillars of NexaVoice */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold font-heading uppercase tracking-wider text-[#172B3A] block">
                Everything in the NexaVoice Architecture
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {nexavoicePillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.title}
                      className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-200 transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-bold text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded-md font-mono">
                          {p.tag}
                        </span>
                      </div>
                      <strong className="text-xs font-bold text-purple-950 block pt-0.5">
                        {p.title}
                      </strong>
                      <p className="text-[11px] text-purple-900/80 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Channels */}
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E3EBEE] space-y-2">
              <span className="text-[11px] font-bold text-[#172B3A] block">
                NexaVoice Deployment Channels
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#E3EBEE]">
                  <strong className="text-[11px] text-[#087F8C] block">1. Smartphone App</strong>
                  <p className="text-[10px] text-[#6C8290] mt-0.5">One-tap mother tongue speech booking & audio guidance.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E3EBEE]">
                  <strong className="text-[11px] text-emerald-700 block">2. Toll-Free Dial-in</strong>
                  <p className="text-[10px] text-[#6C8290] mt-0.5">Standard 2G phone call IVR voice assistant for feature phones.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E3EBEE]">
                  <strong className="text-[11px] text-purple-700 block">3. Clinic Kiosk Booths</strong>
                  <p className="text-[10px] text-[#6C8290] mt-0.5">Physical hospital entrance microphones for instant walk-in ticketing.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: All Roadmap Items */}
        {activeTab === 'all' && (
          <div className="space-y-3 animate-in fade-in">
            <p className="text-xs text-[#6C8290] leading-relaxed">
              NEXACARE is rolling out in structured phases across Greater Banjul and nationwide. Here is our technological roadmap and active development pipeline.
            </p>

            {/* Roadmap Items */}
            <div className="space-y-2.5">
              {roadmapItems.map((it) => {
                const Icon = it.icon;
                return (
                  <div
                    key={it.t}
                    className="p-3 rounded-2xl border border-[#E3EBEE] hover:border-[#087F8C]/40 flex items-start gap-3 bg-[#F5F9FA]/40 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-xl ${it.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <strong className="text-xs text-[#172B3A] font-bold">{it.t}</strong>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          it.badge === 'Flagship Concept'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-[#EAF2F9] text-[#4F8FC0]'
                        }`}>
                          {it.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6C8290] mt-0.5 leading-normal">{it.d}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="h-px bg-[#E3EBEE] my-4" />

        {/* Build Priority Timeline */}
        <div>
          <strong className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider block mb-2.5">
            Active Prototype Scope & Build Priority
          </strong>
          <div className="space-y-0">
            {priority.map((p, i) => (
              <div key={p}>
                <div className="flex items-center gap-2.5 py-1">
                  <div className="w-5 h-5 rounded-full bg-[#2E9B68] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-[#172B3A]">{p}</span>
                </div>
                {i < priority.length - 1 && (
                  <div className="w-0.5 h-2.5 bg-[#2E9B68]/30 ml-2.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="mt-5 pt-3 border-t border-[#E3EBEE]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

