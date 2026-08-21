import React, { useState } from 'react';
import { WardBedInfo } from '../../types';
import { INITIAL_WARD_BEDS } from '../../store';
import { 
  BedDouble, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Building2, 
  Clock, 
  Activity,
  ShieldAlert
} from 'lucide-react';

export const StaffBedAvailability: React.FC = () => {
  const [beds, setBeds] = useState<WardBedInfo[]>(INITIAL_WARD_BEDS);
  const [selectedHospital, setSelectedHospital] = useState('h_serekunda');

  const filtered = beds.filter(b => b.hospitalId === selectedHospital);

  const totalCapacity = filtered.reduce((acc, curr) => acc + curr.totalBeds, 0);
  const totalOccupied = filtered.reduce((acc, curr) => acc + curr.occupiedBeds, 0);
  const overallPercentage = Math.round((totalOccupied / totalCapacity) * 100);

  const handleAdjustBed = (id: string, delta: number) => {
    setBeds(prev =>
      prev.map(b => {
        if (b.id === id) {
          const newOccupied = Math.max(0, Math.min(b.totalBeds, b.occupiedBeds + delta));
          const newAvailable = b.totalBeds - newOccupied;
          const status = newAvailable <= 2 ? 'Near Capacity' : newAvailable === 0 ? 'Full' : 'Available';
          return {
            ...b,
            occupiedBeds: newOccupied,
            availableBeds: newAvailable,
            status,
            lastUpdated: 'Just now'
          };
        }
        return b;
      })
    );
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            INPATIENT ADMISSIONS & CENSUS
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Ward Bed Availability Tracker
          </h2>
        </div>

        {/* Hospital Facility Selector */}
        <select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          className="px-3 py-2 rounded-2xl bg-white border border-[#E3EBEE] text-xs font-bold text-[#172B3A] focus:outline-hidden"
        >
          <option value="h_serekunda">Serekunda General Hospital</option>
          <option value="h_efsth">Edward Francis Small Teaching (EFSTH)</option>
          <option value="h_africmed">Africmed Clinic & Hospital</option>
        </select>
      </div>

      {/* Hospital Overall Census Card */}
      <div className="p-5 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center font-bold">
              <BedDouble className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172B3A]">
                Total Facility Occupancy
              </h3>
              <p className="text-xs text-[#6C8290]">
                {totalOccupied} of {totalCapacity} Beds Occupied ({totalCapacity - totalOccupied} Available)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className={`text-xl font-black font-heading ${
              overallPercentage > 85 ? 'text-[#D9534F]' : overallPercentage > 70 ? 'text-[#E9A23B]' : 'text-[#2E9B68]'
            }`}>
              {overallPercentage}%
            </span>
            <span className="text-[10px] text-[#6C8290] block">Capacity Ratio</span>
          </div>
        </div>

        {/* Overall Progress Meter */}
        <div className="w-full h-3 bg-[#F5F9FA] rounded-full overflow-hidden border border-[#E3EBEE]">
          <div
            style={{ width: `${overallPercentage}%` }}
            className={`h-full rounded-full transition-all duration-500 ${
              overallPercentage > 85 ? 'bg-[#D9534F]' : overallPercentage > 70 ? 'bg-[#E9A23B]' : 'bg-[#087F8C]'
            }`}
          />
        </div>
      </div>

      {/* Ward Cards */}
      <div className="space-y-3">
        {filtered.map((ward) => {
          const wardPercentage = Math.round((ward.occupiedBeds / ward.totalBeds) * 100);

          return (
            <div
              key={ward.id}
              className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#172B3A]">
                      {ward.ward} Ward
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      ward.status === 'Near Capacity' ? 'bg-amber-100 text-amber-800' :
                      ward.status === 'Full' ? 'bg-rose-100 text-[#D9534F]' : 'bg-[#E8F6EF] text-[#2E9B68]'
                    }`}>
                      {ward.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#6C8290] mt-0.5">
                    {ward.occupiedBeds} occupied / {ward.totalBeds} total · <strong className="text-[#087F8C]">{ward.availableBeds} beds open</strong>
                  </p>
                </div>

                {/* Live Adjust Stepper */}
                <div className="flex items-center gap-1.5 bg-[#F5F9FA] p-1 rounded-xl border border-[#E3EBEE]">
                  <button
                    onClick={() => handleAdjustBed(ward.id, -1)}
                    disabled={ward.occupiedBeds === 0}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-[#E3EBEE] text-[#172B3A] flex items-center justify-center font-bold text-xs disabled:opacity-30 cursor-pointer"
                    title="Discharge / Free Bed"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-black font-mono">
                    {ward.availableBeds}
                  </span>
                  <button
                    onClick={() => handleAdjustBed(ward.id, 1)}
                    disabled={ward.availableBeds === 0}
                    className="w-7 h-7 rounded-lg bg-[#087F8C] hover:bg-[#066670] text-white flex items-center justify-center font-bold text-xs disabled:opacity-30 cursor-pointer"
                    title="Admit Patient"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress bar per ward */}
              <div className="w-full h-2 bg-[#F5F9FA] rounded-full overflow-hidden border border-[#E3EBEE]">
                <div
                  style={{ width: `${wardPercentage}%` }}
                  className={`h-full rounded-full transition-all duration-300 ${
                    wardPercentage >= 90 ? 'bg-[#D9534F]' : wardPercentage >= 75 ? 'bg-[#E9A23B]' : 'bg-[#2E9B68]'
                  }`}
                />
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#6C8290]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#087F8C]" />
                  Updated {ward.lastUpdated}
                </span>
                <span>{wardPercentage}% Occupancy</span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
