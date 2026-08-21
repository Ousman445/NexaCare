import React from 'react';
import { Doctor, Hospital } from '../../types';
import { 
  ChevronLeft, 
  Star, 
  Clock, 
  GraduationCap, 
  Languages, 
  Video, 
  Calendar, 
  Phone, 
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

interface DoctorDetailProps {
  doctor: Doctor;
  hospital: Hospital;
  onBack: () => void;
  onBookAppointment: (doctorId: string) => void;
  onStartEvisit: () => void;
  onMessageDoctor?: (doctorId: string) => void;
}

export const DoctorDetail: React.FC<DoctorDetailProps> = ({
  doctor,
  hospital,
  onBack,
  onBookAppointment,
  onStartEvisit,
  onMessageDoctor
}) => {
  const getInitials = (name: string) =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('');

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
            Doctor Profile
          </h2>
          <p className="text-xs text-[#6C8290]">{hospital.name}</p>
        </div>
      </div>

      {/* Doctor Card Hero */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3EBEE] text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#087F8C] text-white font-bold text-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#087F8C]/20">
          {getInitials(doctor.name)}
        </div>
        <h3 className="text-base font-bold font-heading text-[#172B3A]">
          {doctor.name}
        </h3>
        <p className="text-xs text-[#087F8C] font-semibold mt-0.5">
          {doctor.spec}
        </p>

        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF3E4] text-[#E9A23B] flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            {doctor.rating} Rating
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E4F3F4] text-[#066670]">
            {hospital.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Availability Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] text-[#2E9B68] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-xs font-bold text-[#172B3A] block">
              {doctor.avail}
            </strong>
            <span className="text-[11px] text-[#6C8290]">Next confirmed slot at clinic</span>
          </div>
        </div>
      </div>

      {/* Qualifications & Languages */}
      <div className="p-4 rounded-2xl bg-white border border-[#E3EBEE] space-y-3 shadow-xs">
        {doctor.education && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EAF2F9] text-[#4F8FC0] flex items-center justify-center shrink-0 mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs font-bold text-[#172B3A] block">Education</strong>
              <span className="text-[11px] text-[#6C8290]">{doctor.education}</span>
            </div>
          </div>
        )}

        {doctor.languages && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F5F9FA] text-[#172B3A] flex items-center justify-center shrink-0 mt-0.5">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs font-bold text-[#172B3A] block">Languages Spoken</strong>
              <span className="text-[11px] text-[#6C8290]">{doctor.languages.join(', ')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Specialty Focus Chips */}
      <div>
        <span className="text-xs font-bold font-heading text-[#172B3A] block mb-2">
          Clinical Focus
        </span>
        <div className="flex flex-wrap gap-1.5">
          {hospital.depts.slice(0, 3).map((d) => (
            <span
              key={d}
              className="px-3 py-1 rounded-xl bg-[#F5F9FA] text-xs font-semibold text-[#172B3A]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onMessageDoctor && onMessageDoctor(doctor.id)}
            className="py-3 rounded-xl bg-[#087F8C] text-white hover:bg-[#066670] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={onStartEvisit}
            className="py-3 rounded-xl bg-[#E4F3F4] hover:bg-teal-100 text-[#066670] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>E-Visit</span>
          </button>

          <a
            href={`tel:${hospital.phone}`}
            className="py-3 rounded-xl bg-white border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#172B3A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>

        <button
          onClick={() => onBookAppointment(doctor.id)}
          className="w-full py-3.5 rounded-xl bg-[#172B3A] hover:bg-[#243f52] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book In-Person Consultation</span>
        </button>
      </div>

    </div>
  );
};
