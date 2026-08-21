import React, { useState } from 'react';
import { EVisitRequest } from '../../types';
import { INITIAL_EVISIT_REQUESTS } from '../../store';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';

export const StaffEVisits: React.FC = () => {
  const [requests, setRequests] = useState<EVisitRequest[]>(INITIAL_EVISIT_REQUESTS);
  const [activeCall, setActiveCall] = useState<EVisitRequest | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [consultNotes, setConsultNotes] = useState('');
  const [callDuration, setCallDuration] = useState(142); // seconds

  const handleAccept = (req: EVisitRequest) => {
    setActiveCall(req);
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'In Progress' } : r));
  };

  const handleEndCall = () => {
    if (activeCall) {
      setRequests(prev => prev.filter(r => r.id !== activeCall.id));
    }
    setActiveCall(null);
    setConsultNotes('');
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            TELEHEALTH & TELE-TRIAGE
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            E-Visit Virtual Clinic
          </h2>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#E8F6EF] text-[#2E9B68] text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2E9B68] animate-pulse" />
          <span>Doctor Ready Online</span>
        </div>
      </div>

      {activeCall ? (
        /* Active Video Call Interface */
        <div className="bg-[#172B3A] rounded-3xl p-4 text-white shadow-xl space-y-4">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                {activeCall.patientName.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {activeCall.patientName} ({activeCall.age} yrs · {activeCall.gender})
                </h3>
                <span className="text-xs text-teal-200">
                  ID: {activeCall.patientId} · Call Duration: 02:22
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F6EF] text-[#2E9B68] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B68] animate-pulse" />
              Connected (Encrypted)
            </span>
          </div>

          {/* Video Frames Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-64 sm:h-72">
            {/* Patient Remote Video */}
            <div className="bg-slate-800 rounded-2xl relative flex items-center justify-center overflow-hidden border border-white/10">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-teal-600/30 text-teal-300 flex items-center justify-center mx-auto text-xl font-bold">
                  {activeCall.patientName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <span className="text-xs font-bold text-white block">
                  {activeCall.patientName}
                </span>
                <span className="text-[10px] text-teal-200 bg-slate-900/60 px-2 py-0.5 rounded-full">
                  Audio/Video Active (HD)
                </span>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-[10px] font-bold">
                Patient Stream
              </div>
            </div>

            {/* Doctor Self Video Preview */}
            <div className="bg-slate-800 rounded-2xl relative flex items-center justify-center overflow-hidden border border-white/10">
              {isVideoOn ? (
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#087F8C] text-white flex items-center justify-center mx-auto text-xl font-bold">
                    FC
                  </div>
                  <span className="text-xs font-bold text-white block">
                    Dr. Fatou Ceesay (You)
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-slate-900/60 px-2 py-0.5 rounded-full">
                    Desk 2 Camera
                  </span>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs font-bold">
                  Camera Paused
                </div>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-[10px] font-bold">
                Doctor Feed
              </div>
            </div>
          </div>

          {/* Patient Complaint & Telehealth Notes */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-teal-300">
                Patient Chief Complaint:
              </span>
              <span className="text-[11px] text-slate-300">
                {activeCall.complaint}
              </span>
            </div>
            <textarea
              rows={2}
              value={consultNotes}
              onChange={(e) => setConsultNotes(e.target.value)}
              placeholder="Type clinical consultation observations, advice, or prescribed medicines..."
              className="w-full p-2.5 rounded-xl bg-black/30 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-400"
            />
          </div>

          {/* Call Controls Toolbar */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={handleEndCall}
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Consultation</span>
            </button>
          </div>

        </div>
      ) : (
        /* Waiting Requests Queue */
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#172B3A] block">
            Incoming Virtual Queue ({requests.length})
          </span>

          {requests.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#E3EBEE] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#2E9B68] mx-auto" />
              <h4 className="text-sm font-bold text-[#172B3A]">
                Virtual Waiting Room Clear
              </h4>
              <p className="text-xs text-[#6C8290]">
                All pending patient video calls have been attended to.
              </p>
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F6EF] text-[#2E9B68] font-bold flex items-center justify-center text-xs shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[#172B3A]">
                          {req.patientName}
                        </h4>
                        <span className="font-mono text-[10px] text-[#6C8290] bg-[#F5F9FA] px-1.5 py-0.2 rounded-md">
                          {req.patientId}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          req.priority === 'Urgent' ? 'bg-rose-100 text-[#D9534F]' : 'bg-teal-50 text-[#087F8C]'
                        }`}>
                          {req.priority}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#6C8290] mt-0.5">
                        {req.age} yrs · {req.gender} · {req.time}
                      </p>

                      <p className="text-[11px] text-[#172B3A] bg-[#F5F9FA] p-2.5 rounded-xl border border-[#E3EBEE] mt-2">
                        Complaint: <span className="font-semibold text-[#172B3A]">{req.complaint}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAccept(req)}
                    className="px-4 py-2 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    <span>Accept & Join</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
