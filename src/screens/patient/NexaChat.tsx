import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  Ticket, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  User, 
  Calendar, 
  Stethoscope, 
  Heart, 
  Baby, 
  Eye, 
  HelpCircle, 
  ChevronRight, 
  Info,
  Phone,
  ShieldCheck,
  Check
} from 'lucide-react';
import { QueueTicket, Hospital } from '../../types';
import { HOSPITALS } from '../../store';

interface NexaChatProps {
  userName?: string;
  onTicketGenerated: (ticket: QueueTicket) => void;
  onBackToHome: () => void;
  onGoToQueue: () => void;
  onGoToHotline: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: Array<{ label: string; value: string; icon?: any; sub?: string }>;
  isTicketCard?: boolean;
  ticketData?: QueueTicket;
}

export const NexaChat: React.FC<NexaChatProps> = ({
  userName = '',
  onTicketGenerated,
  onBackToHome,
  onGoToQueue,
  onGoToHotline
}) => {
  const [step, setStep] = useState<number>(0);
  const [patientName, setPatientName] = useState<string>(userName);
  const [patientAgeGroup, setPatientAgeGroup] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [generatedTicket, setGeneratedTicket] = useState<QueueTicket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial Bot Welcome Message
  useEffect(() => {
    startConversation();
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startConversation = () => {
    setStep(1);
    setPatientName(userName);
    setPatientAgeGroup('');
    setSelectedHospital(null);
    setSelectedReason('');
    setGeneratedTicket(null);

    const initialGreeting = userName
      ? `Hello ${userName}! 👋 I am NexaChat, your friendly guided healthcare assistant for The Gambia.`
      : `Hello! 👋 I am NexaChat, your friendly guided healthcare assistant for The Gambia.`;

    setMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text: `${initialGreeting}\n\nI can help you get a hospital queue ticket in a few simple questions without filling out any complicated forms. Let's get started!`,
        timestamp: getCurrentTime()
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: userName 
          ? `Should we issue the hospital ticket for you (${userName}), or for someone else in your family?`
          : `First, what is the full name of the patient who will be visiting the clinic?`,
        timestamp: getCurrentTime(),
        options: userName
          ? [
              { label: `For me (${userName})`, value: userName, icon: User },
              { label: 'For someone else', value: 'someone_else', icon: User }
            ]
          : undefined
      }
    ]);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text.replace(/[^\w\s.,?!]/gi, ''));
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendCustomText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    // Append User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: getCurrentTime()
    };
    setMessages(prev => [...prev, userMsg]);

    processUserResponse(userText);
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    // Append User message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: option.label,
      timestamp: getCurrentTime()
    };
    setMessages(prev => [...prev, userMsg]);

    processUserResponse(option.value, option.label);
  };

  const processUserResponse = (value: string, displayLabel?: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (step === 1) {
        // Step 1: Patient Name received
        let chosenName = value;
        if (value === 'someone_else') {
          // Ask for name
          setMessages(prev => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: 'Please type the full name of the family member or person visiting the hospital below:',
              timestamp: getCurrentTime()
            }
          ]);
          setStep(1.5);
          return;
        }

        setPatientName(chosenName);
        setStep(2);

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Thank you, ${chosenName}. What age group is the patient in?`,
            timestamp: getCurrentTime(),
            options: [
              { label: 'Child (0 - 12 yrs)', value: 'Child (0-12 yrs)', icon: Baby, sub: 'Pediatrics / Child Wellness' },
              { label: 'Youth & Adult (13 - 49 yrs)', value: 'Adult (13-49 yrs)', icon: User, sub: 'General Outpatient & Triage' },
              { label: 'Senior / Elder (50+ yrs)', value: 'Senior (50+ yrs)', icon: Heart, sub: 'Priority Senior Care' },
              { label: 'Maternity / Expectant Mother', value: 'Maternity', icon: Heart, sub: 'Antenatal & Mother Care' }
            ]
          }
        ]);
      } else if (step === 1.5) {
        // Person's custom name entered
        setPatientName(value);
        setStep(2);

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Great. What age group is ${value} in?`,
            timestamp: getCurrentTime(),
            options: [
              { label: 'Child (0 - 12 yrs)', value: 'Child (0-12 yrs)', icon: Baby, sub: 'Pediatrics / Child Wellness' },
              { label: 'Youth & Adult (13 - 49 yrs)', value: 'Adult (13-49 yrs)', icon: User, sub: 'General Outpatient & Triage' },
              { label: 'Senior / Elder (50+ yrs)', value: 'Senior (50+ yrs)', icon: Heart, sub: 'Priority Senior Care' },
              { label: 'Maternity / Expectant Mother', value: 'Maternity', icon: Heart, sub: 'Antenatal & Mother Care' }
            ]
          }
        ]);
      } else if (step === 2) {
        // Step 2: Age group received -> Ask for Hospital
        setPatientAgeGroup(displayLabel || value);
        setStep(3);

        const hospitalOptions = HOSPITALS.slice(0, 5).map(h => ({
          label: `${h.name}`,
          value: h.id,
          icon: Building2,
          sub: `${h.location} · ~${h.wait} wait`
        }));

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Got it. Which hospital or health centre would you like to visit today?`,
            timestamp: getCurrentTime(),
            options: hospitalOptions
          }
        ]);
      } else if (step === 3) {
        // Step 3: Hospital selected -> Ask for reason / service
        const hospital = HOSPITALS.find(h => h.id === value) || HOSPITALS[0];
        setSelectedHospital(hospital);
        setStep(4);

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Selected: ${hospital.name}. What is the main reason for your visit?`,
            timestamp: getCurrentTime(),
            options: [
              { label: 'General Illness / Fever & Malaria', value: 'General OPD / Fever', icon: Stethoscope, sub: 'General medical examination' },
              { label: 'Maternity & Mother Care', value: 'Maternity Clinic', icon: Heart, sub: 'Antenatal, delivery & post-natal' },
              { label: 'Child Immunization & Health', value: 'Child Health / Pediatrics', icon: Baby, sub: 'Vaccines, fever & nutrition' },
              { label: 'Eye & Optical Clinic', value: 'Eye Clinic', icon: Eye, sub: 'Vision checks & treatment' },
              { label: 'Chronic Care (BP / Diabetes)', value: 'NCD / Hypertension Clinic', icon: Heart, sub: 'Vitals, blood sugar & refills' },
              { label: 'General Doctor Consultation', value: 'General Consultation', icon: Stethoscope, sub: 'Specialist or routine check' }
            ]
          }
        ]);
      } else if (step === 4) {
        // Step 4: Reason selected -> Review and Confirm
        const reason = displayLabel || value;
        setSelectedReason(reason);
        setStep(5);

        const currentHosp = selectedHospital || HOSPITALS[0];
        const currentPatient = patientName || 'Patient';
        const currentAge = patientAgeGroup || 'Adult';

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Here is a summary of your ticket request:\n\n👤 **Patient:** ${currentPatient}\n🏷️ **Category:** ${currentAge}\n🏥 **Hospital:** ${currentHosp.name}\n📍 **Location:** ${currentHosp.location}\n🩺 **Service:** ${reason}\n\nShall I confirm this and generate your live digital queue ticket?`,
            timestamp: getCurrentTime(),
            options: [
              { label: '✅ Confirm & Get My Ticket', value: 'confirm_ticket', icon: CheckCircle2, sub: 'Skip waiting in crowded lines' },
              { label: '🔄 Start Over', value: 'restart', icon: RotateCcw, sub: 'Change my details' }
            ]
          }
        ]);
      } else if (step === 5) {
        // Step 5: Confirm or Restart
        if (value === 'restart') {
          startConversation();
          return;
        }

        // Generate Ticket!
        const hosp = selectedHospital || HOSPITALS[0];
        const ticketNum = `A-${Math.floor(100 + Math.random() * 900)}`;
        const pos = Math.floor(2 + Math.random() * 4);
        const eta = pos * 4;

        const newTicket: QueueTicket = {
          id: `tk_${Date.now()}`,
          number: ticketNum,
          hospitalId: hosp.id,
          hospitalName: hosp.name,
          dept: selectedReason || 'General Outpatient',
          position: pos,
          eta: eta,
          status: 'In Queue',
          createdAt: new Date().toISOString(),
          reason: selectedReason || 'General Consultation'
        };

        setGeneratedTicket(newTicket);
        onTicketGenerated(newTicket);
        setStep(6);

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🎉 **Success! Your queue ticket has been issued.**\n\nYour ticket number is **${ticketNum}** at **${hosp.name}**.\nThere are **${pos} patients ahead of you** with an estimated wait time of **~${eta} minutes**.\n\nYou do not need to wait in the crowded room now. We will keep your place saved!`,
            timestamp: getCurrentTime(),
            isTicketCard: true,
            ticketData: newTicket
          }
        ]);
      }
    }, 650);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[780px] bg-[#F8FAFC] rounded-3xl border border-[#E3EBEE] overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="bg-white border-b border-[#E3EBEE] p-3.5 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            aria-label="Back to home screen"
            className="w-9 h-9 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] flex items-center justify-center text-[#172B3A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#087F8C] to-[#0A6C77] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold font-heading text-[#172B3A]">
                  NexaChat Guided Assistant
                </h2>
                <span className="px-2 py-0.5 bg-[#E4F3F4] text-[#087F8C] rounded-full text-[10px] font-extrabold uppercase">
                  Accessible
                </span>
              </div>
              <p className="text-[11px] text-[#6C8290]">
                Simple conversational queue ticketing for The Gambia
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => speakText(messages.map(m => m.text).join('. '))}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
              isSpeaking 
                ? 'bg-rose-50 text-rose-700 border-rose-200' 
                : 'bg-[#F5F9FA] text-[#087F8C] border-[#E3EBEE] hover:bg-[#E4F3F4]'
            }`}
            title="Read conversation aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">
              {isSpeaking ? 'Stop Voice' : 'Read Aloud'}
            </span>
          </button>

          <button
            onClick={startConversation}
            className="p-2 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#6C8290] hover:text-[#172B3A] border border-[#E3EBEE] transition-colors cursor-pointer"
            title="Restart conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accessibility Helper Notice */}
      <div className="bg-[#E4F3F4]/60 px-4 py-2 border-b border-[#087F8C]/15 flex items-center justify-between text-[11px] text-[#087F8C]">
        <span className="flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Need help over the phone or can't read? Call our assistance hotline.</span>
        </span>
        <button
          onClick={onGoToHotline}
          className="font-bold underline hover:text-[#066670] ml-2 shrink-0 cursor-pointer"
        >
          NexaHotline Help
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
          >
            {/* Sender identity pill */}
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[10px] font-bold text-[#6C8290]">
                {msg.sender === 'bot' ? 'NexaChat' : 'You'}
              </span>
              <span className="text-[9px] text-[#A0B0BC]">{msg.timestamp}</span>
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-3xl max-w-[90%] sm:max-w-[80%] text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-[#087F8C] text-white rounded-tr-xs'
                  : 'bg-white text-[#172B3A] border border-[#E3EBEE] rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-line font-normal">{msg.text}</div>

              {/* Digital Ticket Card Render inside chat */}
              {msg.isTicketCard && msg.ticketData && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-teal-700 to-[#087F8C] text-white shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b border-teal-500/40 pb-2.5">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-teal-200 block font-mono">
                        OFFICIAL DIGITAL HEALTH PASS
                      </span>
                      <div className="text-2xl font-heading font-black tracking-wide text-white">
                        {msg.ticketData.number}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-teal-200 block">Queue Position</span>
                      <div className="text-xl font-black text-white">
                        #{msg.ticketData.position}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-teal-200 block">Hospital</span>
                      <strong className="text-white block truncate">{msg.ticketData.hospitalName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-200 block">Service</span>
                      <strong className="text-white block truncate">{msg.ticketData.dept}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-200 block">Est. Wait</span>
                      <strong className="text-white block">~{msg.ticketData.eta} mins</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-200 block">Assigned Room</span>
                      <strong className="text-white block">{msg.ticketData.room}</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={onGoToQueue}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white text-[#087F8C] hover:bg-teal-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>View in My Queue</span>
                    </button>
                    <button
                      onClick={onBackToHome}
                      className="py-2.5 px-3 rounded-xl bg-teal-800/80 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Return Home</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Clickable Quick Options (if any) */}
            {msg.options && msg.options.length > 0 && (
              <div className="w-full max-w-[90%] sm:max-w-[85%] grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {msg.options.map((opt) => {
                  const IconComp = opt.icon || ChevronRight;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleOptionClick(opt)}
                      className="p-3 rounded-2xl bg-white hover:bg-[#E4F3F4] border border-[#E3EBEE] hover:border-[#087F8C] active:scale-[0.98] text-left transition-all shadow-xs group flex items-start gap-3 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] group-hover:bg-[#087F8C] text-[#087F8C] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <strong className="text-xs font-bold text-[#172B3A] group-hover:text-[#087F8C] block truncate">
                          {opt.label}
                        </strong>
                        {opt.sub && (
                          <span className="text-[11px] text-[#6C8290] block truncate">
                            {opt.sub}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-[#E3EBEE] max-w-[120px] text-[#087F8C]">
            <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-[#E3EBEE]">
        <form onSubmit={handleSendCustomText} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              step >= 6
                ? 'Ticket created! Click buttons above or restart to book again.'
                : 'Type your answer or select from the options above...'
            }
            disabled={step >= 6}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] text-xs sm:text-sm text-[#172B3A] placeholder-[#6C8290] focus:outline-none focus:border-[#087F8C] focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || step >= 6}
            aria-label="Send message to NexaChat"
            className="w-11 h-11 rounded-2xl bg-[#087F8C] hover:bg-[#066670] disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
