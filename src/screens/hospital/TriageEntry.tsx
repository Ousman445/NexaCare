import React, { useState } from 'react';
import { ChevronLeft, UserPlus, CheckCircle2, Ticket, Printer } from 'lucide-react';

interface TriageEntryProps {
  onBack: () => void;
  onIssued: (ticketNumber: string, patientName: string) => void;
}

export const TriageEntry: React.FC<TriageEntryProps> = ({ onBack, onIssued }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+220 ');
  const [dept, setDept] = useState('General OPD');
  const [priority, setPriority] = useState<'Standard' | 'Priority' | 'Emergency'>('Standard');
  const [issuedTicket, setIssuedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = priority === 'Emergency' ? 'E' : priority === 'Priority' ? 'P' : 'A';
    const num = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;
    setIssuedTicket(num);
    onIssued(num, name.trim() || 'Walk-in Patient');
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold font-heading text-[#172B3A]">
            Walk-in Patient Triage & Ticket Entry
          </h2>
          <p className="text-xs text-[#6C8290]">Issue paper/SMS pass for patients without smartphones</p>
        </div>
      </div>

      {issuedTicket ? (
        <div className="p-6 rounded-3xl bg-white border border-[#2E9B68] text-center shadow-md space-y-4 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-[#E8F6EF] text-[#2E9B68] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6C8290]">
              PRINTED QUEUE PASS
            </span>
            <div className="font-heading font-black text-4xl text-[#172B3A] my-1">
              {issuedTicket}
            </div>
            <p className="text-xs text-[#6C8290]">
              Patient: <strong className="text-[#172B3A]">{name || 'Walk-in'}</strong> ({dept})
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setIssuedTicket(null);
                setName('');
              }}
              className="flex-1 py-3 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold transition-colors"
            >
              Issue Next Patient
            </button>
            <button
              onClick={onBack}
              className="px-4 py-3 rounded-xl bg-[#F5F9FA] text-[#172B3A] text-xs font-bold border border-[#E3EBEE] hover:bg-[#E3EBEE] transition-colors"
            >
              Back to Desk
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-white border border-[#E3EBEE] space-y-4 shadow-xs">
          
          <div>
            <label className="block text-xs font-bold text-[#6C8290] mb-1">
              Patient Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lamin Touray"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#E3EBEE] text-xs font-semibold text-[#172B3A] focus:border-[#087F8C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6C8290] mb-1">
              Mobile Phone (for SMS Turn Alert)
            </label>
            <input
              type="tel"
              placeholder="+220 7XX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#E3EBEE] text-xs font-semibold text-[#172B3A] focus:border-[#087F8C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6C8290] mb-1">
              Department *
            </label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#E3EBEE] text-xs font-semibold text-[#172B3A] focus:border-[#087F8C] focus:outline-none"
            >
              <option value="General OPD">General OPD</option>
              <option value="Maternity">Maternity</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6C8290] mb-1">
              Triage Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Standard', 'Priority', 'Emergency'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setPriority(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    priority === lvl
                      ? lvl === 'Emergency'
                        ? 'bg-[#D9534F] text-white'
                        : lvl === 'Priority'
                        ? 'bg-[#E9A23B] text-white'
                        : 'bg-[#087F8C] text-white'
                      : 'bg-[#F5F9FA] text-[#6C8290] border border-[#E3EBEE]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-md shadow-[#087F8C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Generate Ticket & Print Slip</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
