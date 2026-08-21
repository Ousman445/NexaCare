import React from 'react';
import { QueueTicket } from '../../types';
import { ChevronLeft, ArrowRight, Share2, Printer, CheckCircle2 } from 'lucide-react';

interface DigitalTicketProps {
  ticket: QueueTicket;
  onBack: () => void;
  onTrackQueue: () => void;
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({
  ticket,
  onBack,
  onTrackQueue
}) => {
  // Deterministic QR pattern generator
  const generateQrCells = (seed: string) => {
    const cells: boolean[] = [];
    let h = 0;
    for (let i = 0; i < 81; i++) {
      h = (h * 31 + seed.charCodeAt(i % seed.length) + i * 7) % 100;
      cells.push(h < 46);
    }
    return cells;
  };

  const qrCells = generateQrCells(ticket.number + ticket.dept);

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold font-heading text-[#172B3A]">
              Your Digital Pass
            </h2>
            <p className="text-xs text-[#6C8290]">Official NEXACARE Health Pass</p>
          </div>
        </div>
      </div>

      {/* Dark Boarding Pass Ticket Card matching Figma ticket-hero */}
      <div
        className="p-6 rounded-3xl text-white shadow-xl relative overflow-hidden text-center"
        style={{ background: 'linear-gradient(135deg, #172B3A, #223e52)' }}
      >
        {/* Glow ambient background circle */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-40 blur-2xl"
          style={{ background: 'radial-gradient(circle, #4F8FC0, transparent 70%)' }}
        />

        <div className="relative z-10">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/75 block">
            TICKET NUMBER
          </span>
          <div className="font-heading font-black text-5xl text-white tracking-widest my-1">
            {ticket.number}
          </div>
          <p className="text-xs text-white/90 font-medium">
            {ticket.dept} · {ticket.hospitalName}
          </p>

          {/* QR Code Matrix */}
          <div className="flex justify-center my-5">
            <div className="p-3 bg-white rounded-2xl shadow-lg inline-block">
              <div className="grid grid-cols-9 gap-0.5 w-28 h-28">
                {qrCells.map((isOn, idx) => (
                  <div
                    key={idx}
                    className={`rounded-[1px] ${isOn ? 'bg-[#172B3A]' : 'bg-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <span className="text-[10px] font-mono tracking-wider text-white/60 uppercase">
            Pass ID: {ticket.number}-GM-2026
          </span>
        </div>
      </div>

      {/* Queue Details List */}
      <div className="p-4 rounded-2xl bg-white border border-[#E3EBEE] space-y-2.5 shadow-xs text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#6C8290]">Position in queue:</span>
          <strong className="text-[#172B3A] font-bold">{ticket.position} ahead</strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#6C8290]">Estimated wait:</span>
          <strong className="text-[#087F8C] font-bold">~{ticket.eta} min</strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#6C8290]">Status:</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
            ● Active in Queue
          </span>
        </div>
      </div>

      {/* Primary Track Button */}
      <div className="pt-2">
        <button
          onClick={onTrackQueue}
          className="w-full py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-md shadow-[#087F8C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Track Live Line Progress</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
