import React, { useState } from 'react';
import { ChatConversation, ChatMessage } from '../../types';
import { 
  Search, 
  Send, 
  Paperclip, 
  Mic, 
  Phone, 
  Video, 
  CheckCheck, 
  ArrowLeft, 
  Stethoscope, 
  Pill, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

interface MessagesProps {
  conversations: ChatConversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onStartEVisit: () => void;
  onBackToHome: () => void;
  activeConversationId?: string;
}

export const Messages: React.FC<MessagesProps> = ({
  conversations,
  onSendMessage,
  onStartEVisit,
  onBackToHome,
  activeConversationId
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    activeConversationId || (conversations.length > 0 ? conversations[0].id : null)
  );
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'doctor' | 'pharmacist'>('all');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.participantSpec.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.participantHospital.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterRole === 'doctor') return matchesSearch && conv.participantRole === 'Doctor';
    if (filterRole === 'pharmacist') return matchesSearch && conv.participantRole === 'Pharmacist';
    return matchesSearch;
  });

  const handleSend = () => {
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    if (!activeConv) return;
    onSendMessage(activeConv.id, question);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] hover:bg-[#F5F9FA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold font-heading text-[#172B3A]">
              Care Consultations
            </h1>
            <p className="text-xs text-[#6C8290]">
              Direct messaging with Gambian doctors & certified pharmacists
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#087F8C] text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            MOH Encrypted
          </span>
        </div>
      </div>

      {/* Main Two-Panel or Responsive Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left List of Conversations */}
        <div className={`lg:col-span-5 space-y-3 ${selectedConvId && 'hidden lg:block'}`}>
          {/* Search bar & filter pills */}
          <div className="bg-white p-3 rounded-2xl border border-[#E3EBEE] shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6C8290]" />
              <input
                type="text"
                placeholder="Search doctors, pharmacists, clinic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-transparent focus:border-[#087F8C] focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setFilterRole('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filterRole === 'all'
                    ? 'bg-[#087F8C] text-white'
                    : 'bg-[#F5F9FA] text-[#6C8290] hover:bg-[#E3EBEE]'
                }`}
              >
                All Chats ({conversations.length})
              </button>
              <button
                onClick={() => setFilterRole('doctor')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                  filterRole === 'doctor'
                    ? 'bg-[#087F8C] text-white'
                    : 'bg-[#F5F9FA] text-[#6C8290] hover:bg-[#E3EBEE]'
                }`}
              >
                <Stethoscope className="w-3 h-3" />
                Doctors
              </button>
              <button
                onClick={() => setFilterRole('pharmacist')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                  filterRole === 'pharmacist'
                    ? 'bg-[#087F8C] text-white'
                    : 'bg-[#F5F9FA] text-[#6C8290] hover:bg-[#E3EBEE]'
                }`}
              >
                <Pill className="w-3 h-3" />
                Pharmacies
              </button>
            </div>
          </div>

          {/* Conversation List */}
          <div className="space-y-2">
            {filteredConversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isSelected = activeConv?.id === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/70 border-[#087F8C] shadow-xs'
                      : 'bg-white border-[#E3EBEE] hover:border-teal-200 hover:bg-[#F9FCFD]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-teal-100/80 text-[#087F8C] flex items-center justify-center font-bold text-sm">
                        {conv.participantRole === 'Doctor' ? (
                          <Stethoscope className="w-5 h-5" />
                        ) : (
                          <Pill className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                      {conv.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#2E9B68] ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#172B3A] truncate">
                          {conv.participantName}
                        </h4>
                        <span className="text-[10px] text-[#6C8290] whitespace-nowrap ml-1">
                          {lastMsg ? lastMsg.timestamp : ''}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#087F8C] font-semibold truncate">
                        {conv.participantSpec} · <span className="text-[#6C8290] font-normal">{conv.participantHospital}</span>
                      </div>

                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-xs text-[#6C8290] truncate max-w-[200px]">
                          {lastMsg ? (
                            <span>
                              {lastMsg.senderRole === 'patient' && <span className="font-semibold text-[#172B3A]">You: </span>}
                              {lastMsg.text}
                            </span>
                          ) : (
                            'No messages yet'
                          )}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="w-5 h-5 rounded-full bg-[#087F8C] text-white text-[10px] font-extrabold flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#E3EBEE] text-[#6C8290]">
                <p className="text-xs">No conversations matching your filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Active Chat Panel */}
        {activeConv ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3EBEE] shadow-sm flex flex-col h-[600px] overflow-hidden">
            
            {/* Active Header */}
            <div className="p-3.5 border-b border-[#E3EBEE] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="lg:hidden w-8 h-8 rounded-lg bg-[#F5F9FA] flex items-center justify-center text-[#172B3A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#087F8C] flex items-center justify-center font-bold text-sm">
                    {activeConv.participantRole === 'Doctor' ? (
                      <Stethoscope className="w-5 h-5" />
                    ) : (
                      <Pill className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  {activeConv.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#2E9B68] ring-2 ring-white" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#172B3A]">
                      {activeConv.participantName}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F5F9FA] text-[#087F8C]">
                      {activeConv.participantRole}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C8290]">
                    {activeConv.participantSpec} · <span className="text-[#2E9B68] font-medium">{activeConv.online ? 'Online' : activeConv.lastSeen}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={onStartEVisit}
                  className="px-2.5 py-1.5 rounded-xl bg-teal-50 text-[#087F8C] hover:bg-teal-100 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Start Video Consultation"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">E-Visit</span>
                </button>
              </div>
            </div>

            {/* Quick Consultation Suggestions */}
            <div className="px-3 py-2 bg-[#F9FCFD] border-b border-[#E3EBEE] flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-[#6C8290] font-semibold flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-[#087F8C]" />
                Ask:
              </span>
              <button
                onClick={() => handleQuickQuestion('Can I take this prescription before or after meals?')}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E3EBEE] text-[#172B3A] hover:border-[#087F8C] hover:text-[#087F8C] whitespace-nowrap transition-colors"
              >
                Food instructions?
              </button>
              <button
                onClick={() => handleQuickQuestion('I feel better today, should I complete the remaining dosage?')}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E3EBEE] text-[#172B3A] hover:border-[#087F8C] hover:text-[#087F8C] whitespace-nowrap transition-colors"
              >
                Course completion?
              </button>
              <button
                onClick={() => handleQuickQuestion('Requesting digital prescription refill approval.')}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E3EBEE] text-[#172B3A] hover:border-[#087F8C] hover:text-[#087F8C] whitespace-nowrap transition-colors"
              >
                Request Refill
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FCFDFD]">
              <div className="text-center my-2">
                <span className="px-3 py-1 rounded-full bg-[#F0F4F6] text-[#6C8290] text-[10px] font-medium inline-flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#087F8C]" />
                  Consultation session linked to Patient ID NC-GM-08841
                </span>
              </div>

              {activeConv.messages.map((msg) => {
                const isMe = msg.senderRole === 'patient';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#087F8C] text-white rounded-br-xs shadow-xs'
                          : 'bg-white border border-[#E3EBEE] text-[#172B3A] rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {!isMe && (
                        <div className="text-[10px] font-bold text-[#087F8C] mb-1">
                          {msg.senderName}
                        </div>
                      )}
                      <p>{msg.text}</p>

                      {msg.attachment && (
                        <div className={`mt-2 p-2 rounded-xl flex items-center gap-2 ${isMe ? 'bg-white/15' : 'bg-[#F5F9FA]'}`}>
                          <FileText className="w-4 h-4 text-[#087F8C]" />
                          <div className="text-[11px] font-semibold truncate">
                            {msg.attachment.title}
                          </div>
                        </div>
                      )}

                      <div
                        className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 ${
                          isMe ? 'text-teal-100' : 'text-[#6C8290]'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#E3EBEE]">
              {showAttachmentMenu && (
                <div className="mb-2 p-2 bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] flex items-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      handleQuickQuestion('Attaching photo of my current prescription slip for review.');
                      setShowAttachmentMenu(false);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#E3EBEE] text-[#172B3A] hover:bg-teal-50 hover:text-[#087F8C]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#087F8C]" />
                    Prescription Slip
                  </button>
                  <button
                    onClick={() => {
                      handleQuickQuestion('Attaching recent Malaria RDT & FBC lab report.');
                      setShowAttachmentMenu(false);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#E3EBEE] text-[#172B3A] hover:bg-teal-50 hover:text-[#087F8C]"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    Lab Report
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className="w-9 h-9 rounded-xl bg-[#F5F9FA] text-[#6C8290] hover:text-[#087F8C] hover:bg-teal-50 flex items-center justify-center transition-colors"
                  title="Attach file or report"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder="Type a message or ask a clinical question..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-[#F5F9FA] rounded-xl border border-transparent focus:border-[#087F8C] focus:bg-white transition-all outline-none"
                />

                <button
                  onClick={() => {
                    setIsRecordingVoice(!isRecordingVoice);
                    if (!isRecordingVoice) {
                      setTimeout(() => {
                        setIsRecordingVoice(false);
                        handleQuickQuestion('🎤 [Voice Message 0:14s] Explaining symptom duration and relief.');
                      }, 2000);
                    }
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isRecordingVoice 
                      ? 'bg-rose-500 text-white animate-pulse' 
                      : 'bg-[#F5F9FA] text-[#6C8290] hover:text-[#087F8C]'
                  }`}
                  title="Voice Message"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    inputText.trim()
                      ? 'bg-[#087F8C] text-white hover:bg-[#066670] shadow-xs'
                      : 'bg-[#E3EBEE] text-[#6C8290] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3EBEE] flex items-center justify-center p-12 text-center text-[#6C8290]">
            <div>
              <Stethoscope className="w-10 h-10 mx-auto text-[#087F8C] mb-2 opacity-50" />
              <p className="text-sm font-semibold text-[#172B3A]">Select a consultation thread</p>
              <p className="text-xs text-[#6C8290] mt-1">Chat directly with doctors and pharmacists</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
