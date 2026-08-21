import React, { useState } from 'react';
import { StaffAppointmentItem } from '../../types';
import { INITIAL_STAFF_APPOINTMENTS } from '../../store';
import { 
  Calendar, 
  Search, 
  Clock, 
  CheckCircle2, 
  Video, 
  User, 
  Filter, 
  Plus,
  AlertCircle,
  RotateCcw,
  X
} from 'lucide-react';

interface StaffAppointmentsProps {
  onStartEVisit: (appointment: StaffAppointmentItem) => void;
}

export const StaffAppointments: React.FC<StaffAppointmentsProps> = ({ onStartEVisit }) => {
  const [appointments, setAppointments] = useState<StaffAppointmentItem[]>(INITIAL_STAFF_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const depts = ['All', 'General OPD', 'Maternity Wing', 'Surgical OPD', 'Cardiology Clinic'];

  const handleCheckIn = (id: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Checked In' } : a))
    );
  };

  const handleComplete = (id: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Completed' } : a))
    );
  };

  const filtered = appointments.filter(a => {
    const matchesSearch = a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'All' || a.dept === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            CLINICAL SCHEDULE
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Hospital Appointments Roster
          </h2>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#E4F3F4] text-[#087F8C] text-xs font-bold">
          Today: {appointments.length} Consultations
        </div>
      </div>

      {/* Search & Dept Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient name, ID, doctor, or symptom..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] shadow-2xs"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-2.5 rounded-2xl bg-white border border-[#E3EBEE] text-xs font-bold text-[#172B3A] focus:outline-hidden"
        >
          {depts.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.map((apt) => (
          <div
            key={apt.id}
            className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#172B3A] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {apt.patientName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-[#172B3A]">
                      {apt.patientName}
                    </h3>
                    <span className="font-mono text-[10px] text-[#6C8290] bg-[#F5F9FA] px-1.5 py-0.2 rounded-md border border-[#E3EBEE]">
                      {apt.patientId}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      apt.type === 'E-Visit' ? 'bg-[#E8F6EF] text-[#2E9B68]' : 'bg-[#EAF2F9] text-[#4F8FC0]'
                    }`}>
                      {apt.type}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6C8290] mt-0.5">
                    {apt.age} yrs · {apt.gender} · Attending: <strong className="text-[#172B3A]">{apt.doctor}</strong>
                  </p>

                  <p className="text-[11px] text-[#172B3A] bg-[#F5F9FA] p-2 rounded-xl border border-[#E3EBEE] mt-2">
                    Chief Complaint: <span className="font-medium text-[#6C8290]">{apt.reason}</span>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-[#172B3A]">
                  <Clock className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>{apt.time}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold inline-block mt-1 ${
                  apt.status === 'Checked In' ? 'bg-[#E8F6EF] text-[#2E9B68]' :
                  apt.status === 'Completed' ? 'bg-gray-100 text-gray-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {apt.status}
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#6C8290] font-medium">
                Clinic: {apt.dept}
              </span>

              <div className="flex items-center gap-2">
                {apt.status === 'Scheduled' && (
                  <button
                    onClick={() => handleCheckIn(apt.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Check In</span>
                  </button>
                )}

                {apt.type === 'E-Visit' && (
                  <button
                    onClick={() => onStartEVisit(apt)}
                    className="px-3 py-1.5 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Start E-Visit</span>
                  </button>
                )}

                {apt.status === 'Checked In' && (
                  <button
                    onClick={() => handleComplete(apt.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                  >
                    Complete Consultation
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
