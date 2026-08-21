import React, { useState } from 'react';
import { Prescription } from '../../types';
import { INITIAL_PRESCRIPTIONS } from '../../store';
import { ChevronLeft, Pill, Clock, AlertCircle, CheckCircle2, RotateCw, ShoppingBag, Check } from 'lucide-react';

interface PrescriptionsProps {
  onBack: () => void;
  onGoToPharmacy?: () => void;
}

export const Prescriptions: React.FC<PrescriptionsProps> = ({ onBack, onGoToPharmacy }) => {
  const [prescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [refillSuccess, setRefillSuccess] = useState<string | null>(null);

  const handleRefill = (medication: string) => {
    setRefillSuccess(medication);
    setTimeout(() => {
      setRefillSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      
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
              Active Prescriptions
            </h2>
            <p className="text-xs text-[#6C8290]">Electronic medication dosage & refill schedule</p>
          </div>
        </div>

        {onGoToPharmacy && (
          <button
            onClick={onGoToPharmacy}
            className="px-3 py-1.5 rounded-xl bg-[#087F8C] text-white hover:bg-[#066670] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pharmacy Stock</span>
          </button>
        )}
      </div>

      {refillSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Refill request for <strong>{refillSuccess}</strong> sent to accredited dispensing pharmacy.</span>
        </div>
      )}

      <div className="space-y-3">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="p-4 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#172B3A] block">
                    {rx.medication}
                  </strong>
                  <span className="text-[11px] text-[#087F8C] font-semibold">
                    {rx.dosage} · {rx.frequency}
                  </span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                rx.status === 'Active'
                  ? 'bg-[#E8F6EF] text-[#2E9B68]'
                  : 'bg-[#FDF3E4] text-[#E9A23B]'
              }`}>
                {rx.status}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F5F9FA] border border-[#E3EBEE]/60 text-xs text-[#172B3A] space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6C8290]">Duration:</span>
                <span className="font-semibold">{rx.duration}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6C8290]">Prescribing Doctor:</span>
                <span className="font-semibold">{rx.prescribedBy}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[11px] text-[#6C8290]">Started: {rx.startDate}</span>
              <div className="flex items-center gap-2">
                {onGoToPharmacy && (
                  <button
                    onClick={onGoToPharmacy}
                    className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#172B3A] text-xs font-bold transition-colors"
                  >
                    Check Stock
                  </button>
                )}
                <button
                  className="px-3 py-1.5 rounded-xl bg-[#E4F3F4] hover:bg-teal-100 text-[#066670] font-bold text-xs flex items-center gap-1 transition-colors"
                  onClick={() => handleRefill(rx.medication)}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Request Refill</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
