import React, { useState } from 'react';
import { QueueTicket } from '../../types';
import { 
  Ticket, 
  Clock, 
  Activity, 
  MessageSquare, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface MyQueueProps {
  ticket: QueueTicket | null;
  smsEnabled: boolean;
  onToggleSms: () => void;
  onSimulateQueue: () => void;
  onCancelTicket: () => void;
  onFindCare: () => void;
}

export const MyQueue: React.FC<MyQueueProps> = ({
  ticket,
  smsEnabled,
  onToggleSms,
  onSimulateQueue,
  onCancelTicket,
  onFindCare
}) => {
  const [isSimulating, setIsSimulating] = useState(false);

  if (!ticket) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-heading text-[#172B3A]">
          My Queue
        </h2>

        <div className="text-center py-16 bg-white rounded-3xl border border-[#E3EBEE] p-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center mx-auto mb-3">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#172B3A]">
            No active hospital pass
          </h3>
          <p className="text-xs text-[#6C8290] max-w-xs mx-auto mt-1 mb-6">
            You don't have a ticket in the waiting queue. Select a facility to get your digital pass.
          </p>

          <button
            onClick={onFindCare}
            className="px-6 py-3 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-md shadow-[#087F8C]/20 transition-all"
          >
            Find Care & Get Ticket
          </button>
        </div>
      </div>
    );
  }

  const isAlmostUp = ticket.position <= 2;
  const progressPct = Math.max(12, Math.min(100, Math.round(100 - (ticket.position / 8) * 100)));

  const handleSimulate = () => {
    setIsSimulating(true);
    onSimulateQueue();
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-heading text-[#172B3A]">
          Live Queue Tracker
        </h2>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#2E9B68] bg-[#E8F6EF] px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#2E9B68] animate-ping" />
          Live Synced
        </span>
      </div>

      {/* Main Tracker Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E3EBEE] text-center shadow-xs space-y-4">
        
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6C8290] block">
            PASS CODE
          </span>
          <div className="font-heading font-black text-4xl text-[#172B3A] my-0.5">
            {ticket.number}
          </div>
          <p className="text-xs text-[#6C8290]">
            {ticket.dept} · <span className="font-bold text-[#172B3A]">{ticket.hospitalName}</span>
          </p>
        </div>

        {/* Dynamic Queue Progress Bar */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-[#6C8290] mb-1.5 font-semibold">
            <span>Queue Progress</span>
            <span className="text-[#087F8C] font-bold">{ticket.position} ahead</span>
          </div>
          <div className="w-full h-2.5 bg-[#EDF2F4] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #087F8C, #4F8FC0)'
              }}
            />
          </div>
        </div>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-[#E3EBEE]">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#F5F9FA] text-center border border-[#E3EBEE]/60">
            <div className={`font-heading font-extrabold text-2xl sm:text-3xl ${
              isAlmostUp ? 'text-[#2E9B68]' : 'text-[#087F8C]'
            }`}>
              {ticket.position}
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#6C8290] block font-semibold mt-0.5">people ahead</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#F5F9FA] text-center border border-[#E3EBEE]/60">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172B3A]">
              ~{ticket.eta}m
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#6C8290] block font-semibold mt-0.5">est. wait</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#F5F9FA] text-center border border-[#E3EBEE]/60 flex flex-col items-center justify-center">
            {isAlmostUp ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68] animate-pulse">
                Almost Up!
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF3E4] text-[#E9A23B]">
                In Queue
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] text-[#6C8290] block font-semibold mt-1">status</span>
          </div>
        </div>

      </div>

      {/* Almost Up Urgent Alert Box */}
      {isAlmostUp && (
        <div className="p-4 rounded-2xl bg-[#E8F6EF] border border-[#2E9B68]/30 flex items-start gap-3 animate-in fade-in">
          <div className="w-8 h-8 rounded-xl bg-[#2E9B68] text-white flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">
              Please proceed toward the consultation room!
            </strong>
            <p className="text-[11px] text-[#2E9B68] font-semibold mt-0.5">
              Only {ticket.position} patient(s) remaining before your turn. Have your ID and vitals ready.
            </p>
          </div>
        </div>
      )}

      {/* Demo Simulation Action Button */}
      <button
        onClick={handleSimulate}
        disabled={isSimulating}
        className="w-full py-3 rounded-2xl bg-[#E4F3F4] hover:bg-teal-100 text-[#066670] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
      >
        <Activity className="w-4 h-4 text-[#087F8C]" />
        <span>{isSimulating ? 'Simulating patient calls...' : 'Simulate Live Queue Advancement'}</span>
      </button>

      {/* SMS Alert Switch Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAF2F9] text-[#4F8FC0] flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">
              SMS Live Turn Alerts
            </strong>
            <span className="text-[11px] text-[#6C8290]">
              Receive text when 2 patients remain
            </span>
          </div>
        </div>

        <button
          onClick={onToggleSms}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
            smsEnabled ? 'bg-[#087F8C]' : 'bg-[#E3EBEE]'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${
              smsEnabled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>

      {/* Cancel Ticket Option */}
      <div className="pt-2">
        <button
          onClick={onCancelTicket}
          className="w-full py-2.5 rounded-xl bg-[#FBEAE9] hover:bg-rose-100 text-[#D9534F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel Ticket & Release Slot</span>
        </button>
      </div>

    </div>
  );
};
