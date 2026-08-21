import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Volume2, 
  Bell, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  User, 
  Lock,
  Globe,
  Radio
} from 'lucide-react';

export const StaffSettings: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('h_serekunda');
  const [deskChime, setDeskChime] = useState(true);
  const [smsGateway, setSmsGateway] = useState(true);
  const [autoTriageAlert, setAutoTriageAlert] = useState(true);
  const [deskStation, setDeskStation] = useState('Room 2 (General OPD)');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            ADMINISTRATION & WORKSTATION
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Staff Portal Settings
          </h2>
        </div>

        {savedMessage && (
          <span className="px-3 py-1 rounded-full bg-[#E8F6EF] text-[#2E9B68] text-xs font-bold flex items-center gap-1 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" /> Preferences Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        
        {/* Staff Profile Card */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#087F8C] text-white font-bold flex items-center justify-center text-sm">
              FC
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172B3A]">
                Dr. Fatou Ceesay, MD
              </h3>
              <p className="text-xs text-[#6C8290]">
                Role: Senior Medical Officer / Triage Dispatcher
              </p>
              <span className="text-[10px] font-mono text-[#087F8C]">
                Staff ID: GM-DOC-2024-0012
              </span>
            </div>
          </div>
        </div>

        {/* Facility & Workstation Config */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#087F8C]" />
            <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
              Assigned Facility & Station
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                Active Hospital Facility
              </label>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold text-[#172B3A] bg-white focus:outline-hidden focus:border-[#087F8C]"
              >
                <option value="h_serekunda">Serekunda General Hospital (KMC)</option>
                <option value="h_efsth">Edward Francis Small Teaching Hospital (Banjul)</option>
                <option value="h_africmed">Africmed Clinic & Hospital (Brusubi)</option>
                <option value="h_ahmadiyya">Ahmadiyya Muslim Hospital (Tallinding)</option>
                <option value="h_farafenni">Farafenni Regional Hospital (NBR)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                Desk / Examination Room
              </label>
              <input
                type="text"
                value={deskStation}
                onChange={(e) => setDeskStation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold text-[#172B3A] focus:outline-hidden focus:border-[#087F8C]"
              />
            </div>
          </div>
        </div>

        {/* Audio & Public Address System */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#087F8C]" />
            <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
              Audio Chimes & PA Dispatch
            </h3>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE]">
              <div>
                <strong className="text-xs font-bold text-[#172B3A] block">
                  Desk Chime Audio Alert
                </strong>
                <span className="text-[11px] text-[#6C8290]">
                  Play sound tone through computer speakers when calling next ticket
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDeskChime(!deskChime)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  deskChime ? 'bg-[#087F8C]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    deskChime ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE]">
              <div>
                <strong className="text-xs font-bold text-[#172B3A] block">
                  SMS Gateway Ticket Dispatch
                </strong>
                <span className="text-[11px] text-[#6C8290]">
                  Auto-send SMS broadcast to patient mobile via Africell/QCell gateway
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSmsGateway(!smsGateway)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  smsGateway ? 'bg-[#2E9B68]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    smsGateway ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Save Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
        </div>

      </form>

    </div>
  );
};
