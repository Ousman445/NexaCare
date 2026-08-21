import React, { useState } from 'react';
import { BloodDonorRequest } from '../../types';
import { BLOOD_DONOR_REQUESTS } from '../../store';
import { 
  ChevronLeft, 
  Heart, 
  PhoneCall, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  UserPlus, 
  Droplet 
} from 'lucide-react';

interface BloodDonorProps {
  onBack: () => void;
}

export const BloodDonor: React.FC<BloodDonorProps> = ({ onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [registered, setRegistered] = useState(false);
  const [requests, setRequests] = useState<BloodDonorRequest[]>(BLOOD_DONOR_REQUESTS);

  const bloodGroups = ['All', 'O-', 'O+', 'A-', 'A+', 'B+', 'AB+'];

  const filtered = selectedGroup === 'All'
    ? requests
    : requests.filter(r => r.bloodType === selectedGroup);

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
            Gambia Blood Donor Network
          </h2>
          <p className="text-xs text-[#6C8290]">Urgent hospital appeals & volunteer matching</p>
        </div>
      </div>

      {/* Volunteer Registration Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FBEAE9] to-[#FDF3E4] border border-rose-200 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9534F] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <div>
              <strong className="text-xs font-bold text-[#172B3A] block">
                Register as an Emergency Donor
              </strong>
              <p className="text-[11px] text-[#D9534F] font-semibold">
                Your blood type O- is currently in critical demand!
              </p>
            </div>
          </div>

          <button
            onClick={() => setRegistered(!registered)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              registered
                ? 'bg-[#2E9B68] text-white shadow-xs'
                : 'bg-[#D9534F] hover:bg-rose-700 text-white shadow-xs'
            }`}
          >
            {registered ? 'Registered ✓' : 'Join Registry'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div>
        <span className="text-xs font-bold text-[#6C8290] block mb-1.5">
          Filter by Blood Type:
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {bloodGroups.map((bg) => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedGroup === bg
                  ? 'bg-[#D9534F] text-white shadow-xs'
                  : 'bg-white text-[#6C8290] border border-[#E3EBEE] hover:text-[#172B3A]'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Urgent Requests List */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FBEAE9] text-[#D9534F] border border-rose-200">
                    Type {r.bloodType}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    r.urgency === 'Immediate'
                      ? 'bg-[#FBEAE9] text-[#D9534F] animate-pulse'
                      : 'bg-[#FDF3E4] text-[#E9A23B]'
                  }`}>
                    {r.urgency}
                  </span>
                </div>

                <strong className="text-xs font-bold text-[#172B3A] block mt-1.5">
                  {r.hospital}
                </strong>
                <span className="text-[10px] text-[#6C8290]">{r.postedDate}</span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black font-heading text-[#D9534F] block">
                  {r.unitsNeeded} Units
                </span>
                <span className="text-[10px] text-[#6C8290]">needed</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between border-t border-[#E3EBEE]">
              <span className="text-[11px] text-[#6C8290]">Hospital Blood Bank</span>
              <a
                href={`tel:${r.contactPhone}`}
                className="py-1.5 px-3 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call & Donate</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
