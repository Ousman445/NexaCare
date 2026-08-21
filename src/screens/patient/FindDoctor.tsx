import React, { useState } from 'react';
import { Doctor, Hospital } from '../../types';
import { HOSPITALS } from '../../store';
import { 
  Stethoscope, 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  Video, 
  MessageSquare, 
  Clock, 
  Globe, 
  GraduationCap, 
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';

interface FindDoctorProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
  onStartEVisit: (doctor: Doctor) => void;
  onMessageDoctor: (doctor: Doctor) => void;
}

export const FindDoctor: React.FC<FindDoctorProps> = ({
  onSelectDoctor,
  onBookDoctor,
  onStartEVisit,
  onMessageDoctor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState<string>('All');
  const [selectedHospital, setSelectedHospital] = useState<string>('All');

  // Collect all doctors across all 10 hospitals
  const allDoctors: (Doctor & { hospitalObj: Hospital })[] = [];
  HOSPITALS.forEach(h => {
    h.doctors.forEach(d => {
      allDoctors.push({ ...d, hospitalObj: h });
    });
  });

  const specialties = [
    'All',
    'General Practitioner',
    'Obstetrics & Gynaecology',
    'Cardiology Specialist',
    'Trauma & Critical Care',
    'Pediatrics & Neonatology',
    'Ophthalmology Surgeon',
    'Emergency & General Surgery',
    'Infectious Diseases',
    'Family & Travel Medicine'
  ];

  const filteredDoctors = allDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.languages && doc.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesSpec = selectedSpec === 'All' || doc.spec.toLowerCase().includes(selectedSpec.toLowerCase().slice(0, 8));
    const matchesHospital = selectedHospital === 'All' || doc.hospitalName === selectedHospital;

    return matchesSearch && matchesSpec && matchesHospital;
  });

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            MEDICAL SPECIALIST ROSTER
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Find & Consult Doctors
          </h2>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-[#E4F3F4] text-[#087F8C] text-xs font-bold">
          {allDoctors.length} Registered Doctors
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor name, specialty, language, or hospital..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] shadow-2xs placeholder-[#6C8290]"
        />
      </div>

      {/* Specialty Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
        {specialties.map((sp) => (
          <button
            key={sp}
            onClick={() => setSelectedSpec(sp)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSpec === sp
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'bg-white text-[#6C8290] hover:text-[#172B3A] border border-[#E3EBEE]'
            }`}
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="space-y-3">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] transition-all shadow-2xs hover:shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#087F8C] to-[#244158] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 relative">
                  {doc.name.split(' ').map(n => n[0]).filter((_, i) => i < 2).join('')}
                  {doc.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#2E9B68] ring-2 ring-white" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      onClick={() => onSelectDoctor(doc)}
                      className="text-sm font-bold text-[#172B3A] hover:text-[#087F8C] cursor-pointer"
                    >
                      {doc.name}
                    </h3>
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#E4F3F4] text-[#087F8C]">
                      {doc.spec}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6C8290] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#6C8290]" />
                    {doc.hospitalName}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-[#6C8290] mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-[#087F8C]" />
                      {doc.experience || '8+ years'} exp
                    </span>
                    {doc.languages && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-[#2E9B68]" />
                        {doc.languages.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-xl shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{doc.rating}</span>
              </div>
            </div>

            {/* Availability Indicator */}
            <div className="p-2 rounded-xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-[11px] text-[#172B3A] font-medium">
                <Clock className="w-3.5 h-3.5 text-[#087F8C]" />
                {doc.avail}
              </span>
              {doc.online && (
                <span className="text-[10px] font-bold text-[#2E9B68] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B68] animate-pulse" />
                  Available for Instant E-Visit
                </span>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-1 flex items-center justify-end gap-2 flex-wrap text-xs">
              <button
                onClick={() => onMessageDoctor(doc)}
                className="px-3 py-1.5 rounded-xl border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#172B3A] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Send Message"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Message</span>
              </button>

              <button
                onClick={() => onStartEVisit(doc)}
                className="px-3 py-1.5 rounded-xl bg-[#E8F6EF] hover:bg-emerald-100 text-[#2E9B68] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>E-Visit</span>
              </button>

              <button
                onClick={() => onBookDoctor(doc)}
                className="px-3.5 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
