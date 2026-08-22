import React, { useState } from 'react';
import { Prescription, PaymentMethod } from '../../types';
import { INITIAL_PRESCRIPTIONS, PAYMENT_METHOD_OPTIONS } from '../../store';
import { 
  ChevronLeft, 
  Pill, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  RotateCw, 
  ShoppingBag, 
  Check, 
  Plus, 
  Search, 
  Trash2, 
  X, 
  Info,
  Calendar,
  UserCheck,
  Wallet,
  BadgeCheck
} from 'lucide-react';

interface PrescriptionsProps {
  preferredPaymentMethod?: PaymentMethod;
  onBack: () => void;
  onGoToPharmacy?: () => void;
}

export const Prescriptions: React.FC<PrescriptionsProps> = ({ 
  preferredPaymentMethod = 'Wave',
  onBack, 
  onGoToPharmacy 
}) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [refillSuccess, setRefillSuccess] = useState<{ med: string; method: PaymentMethod } | null>(null);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Refill Needed' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add new prescription modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('Twice daily after meals');
  const [newDuration, setNewDuration] = useState('7 days');
  const [newDoctor, setNewDoctor] = useState('Dr. Fatou Ceesay (Kanifing GH)');
  const [newInstructions, setNewInstructions] = useState('');
  const [newStatus, setNewStatus] = useState<'Active' | 'Refill Needed' | 'Completed'>('Active');

  const handleRefill = (medication: string) => {
    setRefillSuccess({ med: medication, method: preferredPaymentMethod });
    setTimeout(() => {
      setRefillSuccess(null);
    }, 4000);
  };

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newDosage.trim()) return;

    const newRx: Prescription = {
      id: `rx_${Date.now()}`,
      medication: newMedName.trim(),
      dosage: newDosage.trim(),
      frequency: newFrequency.trim(),
      duration: newDuration.trim(),
      prescribedBy: newDoctor.trim(),
      status: newStatus,
      startDate: 'Today',
      refillsRemaining: 2,
      instructions: newInstructions.trim() || 'Take strictly according to clinical instructions with plenty of water.'
    };

    setPrescriptions([newRx, ...prescriptions]);
    setAddModalOpen(false);
    setNewMedName('');
    setNewDosage('');
    setNewInstructions('');
  };

  const handleDelete = (id: string) => {
    setPrescriptions(prescriptions.filter(rx => rx.id !== id));
  };

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesFilter = filter === 'All' || rx.status === filter;
    const matchesSearch = rx.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rx.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rx.dosage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3EBEE] pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-heading text-[#172B3A]">
              My Medications & Electronic Prescriptions
            </h1>
            <p className="text-xs text-[#6C8290]">Accredited dosage schedules, active courses & refill management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onGoToPharmacy && (
            <button
              onClick={onGoToPharmacy}
              className="px-3 py-2 rounded-xl bg-white border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#172B3A] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Pharmacy Stock</span>
            </button>
          )}

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Refill Success Alert */}
      {refillSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Refill request for <strong>{refillSuccess.med}</strong> queued with preferred payment <strong>({refillSuccess.method})</strong>.
            </span>
          </div>
          {onGoToPharmacy && (
            <button
              onClick={onGoToPharmacy}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold shrink-0 hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              View Order
            </button>
          )}
        </div>
      )}

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E3EBEE] shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6C8290] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medications, dosages, or prescribing doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F5F9FA] border border-transparent focus:border-[#087F8C] focus:bg-white text-xs outline-hidden font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Active', 'Refill Needed', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === tab
                  ? 'bg-[#172B3A] text-white shadow-xs'
                  : 'bg-[#F5F9FA] text-[#6C8290] hover:text-[#172B3A] hover:bg-[#E3EBEE]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-3">
        {filteredPrescriptions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#E3EBEE] space-y-2">
            <Pill className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-[#172B3A]">No medications found</p>
            <p className="text-xs text-[#6C8290]">Try clearing your search or add a new medication entry.</p>
          </div>
        ) : (
          filteredPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs space-y-3 hover:border-teal-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-[#172B3A]">
                        {rx.medication}
                      </strong>
                    </div>
                    <span className="text-xs text-[#087F8C] font-semibold block mt-0.5">
                      {rx.dosage} · {rx.frequency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    rx.status === 'Active'
                      ? 'bg-[#E8F6EF] text-[#2E9B68]'
                      : rx.status === 'Refill Needed'
                        ? 'bg-[#FDF3E4] text-[#E9A23B]'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {rx.status}
                  </span>
                  <button
                    onClick={() => handleDelete(rx.id)}
                    className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                    title="Delete Prescription"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Instructions & Guidelines */}
              {rx.instructions && (
                <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100/80 text-xs text-[#172B3A] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{rx.instructions}</p>
                </div>
              )}

              {/* Detail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-[#F5F9FA] border border-[#E3EBEE]/60 text-xs text-[#172B3A]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6C8290] block">Duration</span>
                  <span className="font-semibold text-[#172B3A]">{rx.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6C8290] block">Prescriber</span>
                  <span className="font-semibold text-[#172B3A] truncate block">{rx.prescribedBy}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-[#6C8290] block">Start Date</span>
                  <span className="font-semibold text-[#172B3A]">{rx.startDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs border-t border-[#E3EBEE]/40">
                <span className="text-[11px] text-[#6C8290]">
                  Refills remaining: <strong className="text-[#172B3A]">{rx.refillsRemaining ?? 1}</strong>
                </span>
                
                <div className="flex items-center gap-2">
                  {onGoToPharmacy && (
                    <button
                      onClick={onGoToPharmacy}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#172B3A] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Check Stock
                    </button>
                  )}
                  <button
                    className="px-3.5 py-1.5 rounded-xl bg-[#E4F3F4] hover:bg-teal-100 text-[#066670] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    onClick={() => handleRefill(rx.medication)}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Request Refill</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Prescription Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E3EBEE] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-heading text-[#172B3A]">
                  Add Medication / Prescription
                </h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPrescription} className="space-y-3.5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                  Medication Name & Strength *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coartem 20/120mg or Paracetamol 500mg"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                    Dosage Unit *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 tablet (500mg)"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7 days or 30 days"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                  Frequency & Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. Twice daily after meals (morning & evening)"
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                    Prescribing Doctor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Fatou Ceesay"
                    value={newDoctor}
                    onChange={(e) => setNewDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Refill Needed">Refill Needed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6C8290] block mb-1">
                  Special Instructions or Dietary Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Take with plenty of water. Avoid taking on an empty stomach."
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E3EBEE]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F5F9FA] text-[#6C8290] hover:bg-[#E3EBEE] font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
