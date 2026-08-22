import React, { useState } from 'react';
import { 
  Mic, 
  Sparkles, 
  ArrowLeft, 
  Volume2, 
  Languages, 
  Ticket, 
  Building2, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Layers, 
  HelpCircle, 
  Phone, 
  Clock, 
  Share2, 
  Play, 
  Square,
  ShieldCheck
} from 'lucide-react';
import { QueueTicket } from '../../types';

interface NexaVoiceProps {
  onBackToHome: () => void;
  onGoToNexaChat: () => void;
  onGoToHotline: () => void;
}

export const NexaVoice: React.FC<NexaVoiceProps> = ({
  onBackToHome,
  onGoToNexaChat,
  onGoToHotline
}) => {
  const [selectedLang, setSelectedLang] = useState<'wolof' | 'mandinka' | 'fula' | 'jola' | 'english'>('wolof');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);

  const languagePresets = {
    wolof: {
      name: 'Wolof',
      flag: '🇸🇳 🇬🇲',
      prompt: '“Dama bëgga jël numero tur ngir dem ci Serekunda General Hospital tey ci suba.”',
      translation: '“I want to get a queue ticket to visit Serekunda General Hospital this morning.”',
      parsedIntent: {
        intent: 'QUEUE_TICKET_REQUEST',
        hospital: 'Serekunda General Hospital',
        service: 'General Outpatient (OPD)',
        priority: 'Standard',
        generatedTicket: 'W-019'
      }
    },
    mandinka: {
      name: 'Mandinka',
      flag: '🇬🇲',
      prompt: '“N laafita tiketi le la ka taa EFSTH Banjul dokotooroo yaa kabiri n yaa faati.”',
      translation: '“I want a ticket to go to EFSTH Banjul to see a doctor because of eye pain.”',
      parsedIntent: {
        intent: 'QUEUE_TICKET_REQUEST',
        hospital: 'Edward Francis Small Teaching Hospital',
        service: 'Eye / Ophthalmology Clinic',
        priority: 'Specialist Triage',
        generatedTicket: 'M-034'
      }
    },
    fula: {
      name: 'Fula (Pulaar)',
      flag: '🇬🇲 🇬🇳',
      prompt: '“Mi yidi hebbude tiketi to suudu loktoro Africmed ngam ɓiɗɗo am heɓi jonte.”',
      translation: '“I want a ticket for Africmed Clinic because my child has a high fever.”',
      parsedIntent: {
        intent: 'QUEUE_TICKET_REQUEST',
        hospital: 'Africmed Clinic (Senegambia)',
        service: 'Pediatric Emergency Triage',
        priority: 'Urgent Care',
        generatedTicket: 'F-007'
      }
    },
    jola: {
      name: 'Jola',
      flag: '🇬🇲 🇸🇳',
      prompt: '“Inje n’kassumen e’tiketi ro Bundung Maternal Hospital n’kandil.”',
      translation: '“I need a queue pass for Bundung Maternal & Child Hospital for maternity checkup.”',
      parsedIntent: {
        intent: 'QUEUE_TICKET_REQUEST',
        hospital: 'Bundung Maternal & Child Hospital',
        service: 'Antenatal / Maternity Care',
        priority: 'Maternal Priority',
        generatedTicket: 'J-052'
      }
    },
    english: {
      name: 'English',
      flag: '🇬🇧 🇬🇲',
      prompt: '“Please book a queue ticket for me at Kanifing Hospital for blood pressure check.”',
      translation: '“Please book a queue ticket for me at Kanifing Hospital for blood pressure check.”',
      parsedIntent: {
        intent: 'QUEUE_TICKET_REQUEST',
        hospital: 'Kanifing General Hospital',
        service: 'Hypertension & Chronic Care',
        priority: 'Routine Checkup',
        generatedTicket: 'E-088'
      }
    }
  };

  const handleSimulateVoice = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    // Speak audio prompt simulation if supported
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const current = languagePresets[selectedLang];
      const utterance = new SpeechSynthesisUtterance(current.translation);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult(languagePresets[selectedLang].parsedIntent);
    }, 2000);
  };

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
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                FUTURE ROADMAP INNOVATION
              </span>
              <span className="px-2 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[9px] font-extrabold uppercase">
                Prototype Concept
              </span>
            </div>
            <h1 className="text-lg font-bold font-heading text-[#172B3A]">
              NexaVoice — Multilingual Voice Access
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#087F8C] text-white p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-white/10 backdrop-blur-xs text-purple-200">
              <Mic className="w-5 h-5 animate-pulse" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-200 font-bold">
              Voice-First AI for Local Mother Tongues
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Natural Voice Access in Wolof, Mandinka, Fula, Jola & English
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl leading-relaxed">
            NexaVoice is the planned voice-first evolution of NexaChat. It will enable any citizen, regardless of literacy level or technical familiarity, to speak naturally to book queue tickets, verify pharmacy stocks, and receive medical guidance.
          </p>
        </div>
      </div>

      {/* The 4-Tier Inclusive Architecture */}
      <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-heading text-[#172B3A]">
              NexaCare’s 4-Tier Accessibility Continuum
            </h3>
            <p className="text-xs text-[#6C8290]">
              Every citizen has an accessible pathway designed for their specific comfort level:
            </p>
          </div>
          <span className="text-xs font-bold text-[#087F8C]">Inclusive Design</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {/* Tier 1 */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E3EBEE] space-y-1.5">
            <span className="px-2 py-0.5 rounded-md bg-teal-100 text-[#087F8C] text-[10px] font-bold">
              Tier 1 · Standard
            </span>
            <strong className="text-xs font-bold text-[#172B3A] block">NexaCare App</strong>
            <p className="text-[11px] text-[#6C8290] leading-snug">
              Visual dashboard, maps, live queue cards, electronic records, and telemedicine.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E3EBEE] space-y-1.5">
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Tier 2 · Guided
            </span>
            <strong className="text-xs font-bold text-[#172B3A] block">NexaChat Assistant</strong>
            <p className="text-[11px] text-[#6C8290] leading-snug">
              Conversational step-by-step assistant for getting tickets without forms.
            </p>
            <button
              onClick={onGoToNexaChat}
              className="text-[11px] text-[#087F8C] font-bold hover:underline block pt-0.5"
            >
              Try NexaChat →
            </button>
          </div>

          {/* Tier 3 */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E3EBEE] space-y-1.5">
            <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-bold">
              Tier 3 · Human
            </span>
            <strong className="text-xs font-bold text-[#172B3A] block">NexaHotline</strong>
            <p className="text-[11px] text-[#6C8290] leading-snug">
              Human telephone operators and hospital reception desk assisted ticketing.
            </p>
            <button
              onClick={onGoToHotline}
              className="text-[11px] text-[#087F8C] font-bold hover:underline block pt-0.5"
            >
              View Hotline →
            </button>
          </div>

          {/* Tier 4 */}
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1.5 ring-1 ring-purple-300">
            <span className="px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 text-[10px] font-bold">
              Tier 4 · Voice AI (Roadmap)
            </span>
            <strong className="text-xs font-bold text-purple-950 block">NexaVoice</strong>
            <p className="text-[11px] text-purple-800 leading-snug">
              Hands-free local language speech recognition and voice synthesized replies.
            </p>
            <span className="text-[10px] font-mono text-purple-700 font-bold block pt-0.5">
              Active Concept
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Voice Simulator */}
      <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold font-heading text-[#172B3A]">
              Interactive Voice AI Prototype Simulator
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            Gemini Multilingual Speech Engine
          </span>
        </div>

        {/* Language Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#F8FAFC] rounded-2xl border border-[#E3EBEE]">
          {(['wolof', 'mandinka', 'fula', 'jola', 'english'] as const).map((langKey) => (
            <button
              key={langKey}
              onClick={() => {
                setSelectedLang(langKey);
                setSimulationResult(null);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedLang === langKey
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-[#6C8290] hover:text-[#172B3A] hover:bg-white'
              }`}
            >
              {languagePresets[langKey].name}
            </button>
          ))}
        </div>

        {/* Spoken Query Card */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
          <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block font-mono">
            SAMPLE SPOKEN SPEECH INPUT ({languagePresets[selectedLang].name.toUpperCase()})
          </span>
          <p className="text-sm font-serif italic text-purple-950 font-medium">
            {languagePresets[selectedLang].prompt}
          </p>
          <p className="text-xs text-purple-800 font-sans">
            <strong>English Meaning:</strong> {languagePresets[selectedLang].translation}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-center pt-2">
          <button
            onClick={handleSimulateVoice}
            disabled={isSimulating}
            className="py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-md shadow-purple-600/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Radio className="w-5 h-5 animate-spin" />
                <span>Processing Local Speech Telemetry...</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>Simulate Voice Prompt & Intent Parse</span>
              </>
            )}
          </button>
        </div>

        {/* Result Area */}
        {simulationResult && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 animate-in fade-in space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AI Intent Parsed & Hospital Ticket Issued</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-800">
                Ticket: {simulationResult.generatedTicket}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-white rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">Intent</span>
                <strong className="text-emerald-950 block">{simulationResult.intent}</strong>
              </div>
              <div className="p-2 bg-white rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">Facility</span>
                <strong className="text-emerald-950 block truncate">{simulationResult.hospital}</strong>
              </div>
              <div className="p-2 bg-white rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">Department</span>
                <strong className="text-emerald-950 block truncate">{simulationResult.service}</strong>
              </div>
              <div className="p-2 bg-white rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">Triage Priority</span>
                <strong className="text-emerald-950 block">{simulationResult.priority}</strong>
              </div>
            </div>

            <p className="text-[11px] text-emerald-800">
              ✅ The patient speaks their native dialect, and the system instantly books their spot in the hospital queue with SMS confirmation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
