import React, { useState } from 'react';
import { Hospital } from '../../types';
import { HOSPITALS } from '../../store';
import { 
  ChevronLeft, 
  Building2, 
  Ticket, 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface GetTicketProps {
  initialHospitalId?: string;
  onBack: () => void;
  onConfirmTicket: (hospital: Hospital, department: string, ahead: number, eta: number) => void;
}

export const GetTicket: React.FC<GetTicketProps> = ({
  initialHospitalId,
  onBack,
  onConfirmTicket
}) => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(
    initialHospitalId || HOSPITALS[0].id
  );

  const selectedHospital = HOSPITALS.find(h => h.id === selectedHospitalId) || HOSPITALS[0];
  const [selectedDept, setSelectedDept] = useState<string>(selectedHospital.depts[0]);

  // Dynamic wait mapping based on department
  const aheadMap: Record<string, number> = {
    'General OPD': 7,
    'Maternity': 4,
    'Pharmacy': 3,
    'Laboratory': 6,
    'Emergency': 1,
    'Pediatrics': 5,
    'Surgical': 2,
    'X-Ray': 3,
    'Immunization': 2,
    'Antenatal': 4,
    'Dental': 2,
    'Optical': 1,
    'Trauma & Emergency': 1,
    'Cardiology': 3
  };

  const deptQueueInfo = selectedHospital.departmentQueues?.find(dq => dq.name === selectedDept);
  const ahead = deptQueueInfo ? deptQueueInfo.count : (aheadMap[selectedDept] || 5);
  const eta = deptQueueInfo ? deptQueueInfo.avgWaitMins : (ahead * 4);

  const handleHospitalChange = (hospId: string) => {
    setSelectedHospitalId(hospId);
    const newHosp = HOSPITALS.find(h => h.id === hospId) || HOSPITALS[0];
    setSelectedDept(newHosp.depts[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmTicket(selectedHospital, selectedDept, ahead, eta);
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold font-heading text-[#172B3A]">
            Get Hospital Pass
          </h2>
          <p className="text-xs text-[#6C8290]">Skip the long waiting line at the reception</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Hospital Dropdown */}
        <div>
          <label className="block text-xs font-bold text-[#6C8290] mb-1.5">
            Select Healthcare Facility *
          </label>
          <div className="relative">
            <select
              value={selectedHospitalId}
              onChange={(e) => handleHospitalChange(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-bold text-[#172B3A] focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C] focus:outline-none appearance-none cursor-pointer"
            >
              {HOSPITALS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.region.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="block text-xs font-bold text-[#6C8290] mb-1.5">
            Select Clinic / Department *
          </label>
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-bold text-[#172B3A] focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C] focus:outline-none appearance-none cursor-pointer"
            >
              {selectedHospital.depts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estimated Wait Preview Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3EBEE] text-center shadow-xs">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#6C8290] block">
            ESTIMATED WAIT
          </span>
          <div className="font-heading font-extrabold text-4xl text-[#087F8C] my-1">
            ~{eta} min
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FDF3E4] text-[#E9A23B] mt-2">
            <Users className="w-3.5 h-3.5" />
            {ahead} patients ahead in queue
          </span>
        </div>

        {/* Digital Triage Notice */}
        <div className="p-3.5 rounded-xl bg-[#E4F3F4]/60 border border-[#087F8C]/20 flex items-start gap-2.5 text-xs text-[#066670]">
          <ShieldCheck className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
          <span>
            Your digital pass guarantees your place in line. Arrive when your live progress shows 2 people ahead.
          </span>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-md shadow-[#087F8C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm & Issue Digital Pass</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
