import React from 'react';
import { Hospital, Doctor } from '../../types';
import { 
  ChevronLeft, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Video, 
  Ticket, 
  Star, 
  ChevronRight, 
  Calendar,
  Users
} from 'lucide-react';

interface HospitalDetailProps {
  hospital: Hospital;
  onBack: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onGetTicket: (hospitalId: string) => void;
  onStartEvisit: () => void;
}

export const HospitalDetail: React.FC<HospitalDetailProps> = ({
  hospital,
  onBack,
  onSelectDoctor,
  onGetTicket,
  onStartEvisit
}) => {
  const getInitials = (name: string) =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('');

  const totalWaiting = hospital.queueCount || 15;

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold font-heading text-[#172B3A] leading-tight">
            {hospital.name}
          </h2>
          <p className="text-xs text-[#6C8290]">{hospital.type} · {hospital.region}</p>
        </div>
      </div>

      {/* Hospital Status & Queue Info Row */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E3EBEE] flex items-center justify-between flex-wrap gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            hospital.status === 'Open'
              ? 'bg-[#E8F6EF] text-[#2E9B68]'
              : hospital.status === 'Busy'
              ? 'bg-[#FDF3E4] text-[#E9A23B]'
              : 'bg-[#FBEAE9] text-[#D9534F]'
          }`}>
            ● {hospital.status}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF2F9] text-[#4F8FC0] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {hospital.wait} wait
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E4F3F4] text-[#066670] border border-[#087F8C]/20">
            <Users className="w-3.5 h-3.5 text-[#087F8C]" />
            {totalWaiting} in queue
          </span>
          <button
            onClick={() => onGetTicket(hospital.id)}
            className="px-3 py-1 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
          >
            <Ticket className="w-3 h-3" />
            <span>Get Pass</span>
          </button>
        </div>
      </div>

      {/* Info Card: Hours, Location, Phone, Email */}
      <div className="p-4 rounded-2xl bg-white border border-[#E3EBEE] space-y-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">Hours</strong>
            <span className="text-[11px] text-[#6C8290]">{hospital.hours}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">Location</strong>
            <span className="text-[11px] text-[#6C8290]">{hospital.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">Phone</strong>
            <a href={`tel:${hospital.phone}`} className="text-[11px] text-[#087F8C] hover:underline">
              {hospital.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">Email</strong>
            <span className="text-[11px] text-[#6C8290]">{hospital.email}</span>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div>
        <span className="text-xs font-bold font-heading text-[#172B3A] block mb-2">
          Departments
        </span>
        <div className="flex flex-wrap gap-1.5">
          {hospital.depts.map((d) => (
            <span
              key={d}
              className="px-3 py-1 rounded-xl bg-white border border-[#E3EBEE] text-xs font-semibold text-[#172B3A]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <span className="text-xs font-bold font-heading text-[#172B3A] block mb-2">
          Services
        </span>
        <div className="p-3 rounded-2xl bg-white border border-[#E3EBEE] space-y-2">
          {hospital.services.map((s) => (
            <div key={s} className="flex items-center gap-2.5 text-xs text-[#172B3A]">
              <div className="w-5 h-5 rounded-full bg-[#EAF2F9] text-[#4F8FC0] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors on Duty */}
      <div>
        <span className="text-xs font-bold font-heading text-[#172B3A] block mb-2">
          Doctors on Duty
        </span>
        <div className="space-y-2">
          {hospital.doctors.map((d) => (
            <div
              key={d.id}
              onClick={() => onSelectDoctor(d)}
              className="p-3.5 rounded-2xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#087F8C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {getInitials(d.name)}
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#172B3A] block">{d.name}</strong>
                  <span className="text-[11px] text-[#6C8290]">{d.spec}</span>
                  <div className="flex items-center gap-1 text-[10px] text-[#E9A23B] font-bold mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{d.rating}</span>
                    <span className="text-[#6C8290] font-normal">· {d.avail}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#6C8290]" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${hospital.phone}`}
            className="py-3 rounded-xl bg-white border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#172B3A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Facility</span>
          </a>

          <button
            onClick={onStartEvisit}
            className="py-3 rounded-xl bg-[#E4F3F4] hover:bg-teal-100 text-[#066670] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>E-Visit</span>
          </button>
        </div>

        <button
          onClick={() => onGetTicket(hospital.id)}
          className="w-full py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-md shadow-[#087F8C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Ticket className="w-4 h-4" />
          <span>Book / Get Hospital Ticket</span>
        </button>
      </div>

    </div>
  );
};
