import React, { useState } from 'react';
import { PatientProfile } from '../../types';
import { INITIAL_STAFF_PATIENTS } from '../../store';
import { 
  Users, 
  Search, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  FileText, 
  Pill, 
  Calendar, 
  Video, 
  Plus, 
  ChevronRight, 
  X, 
  CheckCircle2,
  Stethoscope,
  Heart,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

interface StaffPatientsProps {
  onStartEVisitWithPatient?: (patient: PatientProfile) => void;
  onBookAppointmentForPatient?: (patient: PatientProfile) => void;
}

export const StaffPatients: React.FC<StaffPatientsProps> = ({
  onStartEVisitWithPatient,
  onBookAppointmentForPatient
}) => {
  const [patients, setPatients] = useState<PatientProfile[]>(INITIAL_STAFF_PATIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [sortBy, setSortBy] = useState<'alphabetical-asc' | 'alphabetical-desc' | 'id' | 'age' | 'visits' | 'diagnosis'>('alphabetical-asc');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [newMedication, setNewMedication] = useState('');
  const [newDosage, setNewDosage] = useState('');

  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [newRecordNote, setNewRecordNote] = useState('');

  const filtered = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.diagnosis && p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.phone && p.phone.includes(searchQuery)) ||
      (p.attendingDoctor && p.attendingDoctor.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = departmentFilter === 'All' || 
      (p.diagnosis && p.diagnosis.toLowerCase().includes(departmentFilter.toLowerCase())) ||
      (p.lastVisit && p.lastVisit.toLowerCase().includes(departmentFilter.toLowerCase()));

    return matchesSearch && matchesDept;
  }).sort((a, b) => {
    if (sortBy === 'alphabetical-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'alphabetical-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === 'id') {
      return a.id.localeCompare(b.id);
    }
    if (sortBy === 'age') {
      return a.age - b.age;
    }
    if (sortBy === 'visits') {
      return b.visits - a.visits;
    }
    if (sortBy === 'diagnosis') {
      return (a.diagnosis || '').localeCompare(b.diagnosis || '');
    }
    return 0;
  });

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newMedication) return;

    const updated = {
      ...selectedPatient,
      prescriptions: [...(selectedPatient.prescriptions || []), `${newMedication} ${newDosage}`]
    };

    setPatients(prev => prev.map(p => p.id === updated.id ? updated : p));
    setSelectedPatient(updated);
    setPrescriptionModalOpen(false);
    setNewMedication('');
    setNewDosage('');
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newRecordNote) return;

    const updated = {
      ...selectedPatient,
      visitHistory: [`Clinical Entry — Today: ${newRecordNote}`, ...selectedPatient.visitHistory]
    };

    setPatients(prev => prev.map(p => p.id === updated.id ? updated : p));
    setSelectedPatient(updated);
    setRecordModalOpen(false);
    setNewRecordNote('');
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            ELECTRONIC HEALTH RECORDS (EHR)
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Patient Health Registry
          </h2>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#E4F3F4] text-[#087F8C] text-xs font-bold">
          {patients.length} Registered Patients
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by patient name, National Health ID (e.g. NC-GM-08841), or diagnosis..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] shadow-2xs placeholder-[#6C8290]"
        />
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Department / Category quick filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {['All', 'General OPD', 'Emergency', 'Maternity', 'Pediatrics', 'Cardiology'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                departmentFilter === dept
                  ? 'bg-[#087F8C] text-white shadow-xs'
                  : 'bg-white text-[#6C8290] hover:text-[#172B3A] border border-[#E3EBEE]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#6C8290]" />
          <span className="text-[11px] text-[#6C8290] font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 rounded-xl bg-white border border-[#E3EBEE] text-[11px] font-bold text-[#172B3A] focus:outline-hidden focus:border-[#087F8C] cursor-pointer shadow-2xs"
          >
            <option value="alphabetical-asc">Patient Name (A → Z)</option>
            <option value="alphabetical-desc">Patient Name (Z → A)</option>
            <option value="id">Health ID (NC-GM-...)</option>
            <option value="visits">Most Clinic Visits</option>
            <option value="age">Age (Youngest First)</option>
            <option value="diagnosis">Diagnosis / Condition</option>
          </select>
        </div>
      </div>

      {/* Summary Info */}
      <div className="flex items-center justify-between text-xs text-[#6C8290]">
        <span>Showing <strong>{filtered.length}</strong> of {patients.length} patients</span>
        <span className="text-[11px] text-[#087F8C] font-semibold">Alphabetical (A-Z) Default Active</span>
      </div>

      {/* Patients List */}
      <div className="space-y-3">
        {filtered.map((patient) => (
          <div
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] transition-all shadow-2xs hover:shadow-xs cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#172B3A] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {patient.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-[#172B3A]">
                      {patient.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[#087F8C] bg-[#E4F3F4] px-2 py-0.5 rounded-md font-bold">
                      {patient.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
                      Blood: {patient.bloodGroup || 'O-'}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6C8290] mt-0.5">
                    {patient.age} yrs · {patient.gender} · {patient.phone} · {patient.address}
                  </p>

                  {patient.diagnosis && (
                    <p className="text-[11px] text-[#172B3A] font-medium mt-1">
                      Active Diagnosis: <span className="text-[#087F8C] font-bold">{patient.diagnosis}</span>
                    </p>
                  )}
                </div>
              </div>

              <button className="px-3 py-1.5 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#172B3A] text-xs font-bold transition-colors">
                View File
              </button>
            </div>

            {/* Quick Badges Footer */}
            <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between text-xs text-[#6C8290]">
              <span>Attending: <strong className="text-[#172B3A]">{patient.attendingDoctor || 'Dr. Fatou Ceesay'}</strong></span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#087F8C]">
                  {patient.visits} recorded encounters
                </span>
                <ChevronRight className="w-4 h-4 text-[#6C8290]" />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E3EBEE]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#087F8C] text-white font-bold flex items-center justify-center text-sm">
                  {selectedPatient.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold font-heading text-[#172B3A]">
                      {selectedPatient.name}
                    </h3>
                    <span className="font-mono text-xs text-[#087F8C] bg-[#E4F3F4] px-2 py-0.5 rounded-md font-bold">
                      {selectedPatient.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#6C8290]">
                    {selectedPatient.age} yrs · {selectedPatient.gender} · Blood: <strong className="text-rose-600 font-bold">{selectedPatient.bloodGroup}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => onBookAppointmentForPatient?.(selectedPatient)}
                className="p-2.5 rounded-xl bg-[#EAF2F9] text-[#4F8FC0] hover:bg-blue-100 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appt</span>
              </button>
              <button
                onClick={() => setPrescriptionModalOpen(true)}
                className="p-2.5 rounded-xl bg-[#E8F6EF] text-[#2E9B68] hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Pill className="w-3.5 h-3.5" />
                <span>Prescribe</span>
              </button>
              <button
                onClick={() => setRecordModalOpen(true)}
                className="p-2.5 rounded-xl bg-[#FDF3E4] text-[#E9A23B] hover:bg-amber-100 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
              <button
                onClick={() => onStartEVisitWithPatient?.(selectedPatient)}
                className="p-2.5 rounded-xl bg-[#E4F3F4] text-[#087F8C] hover:bg-teal-100 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Start E-Visit</span>
              </button>
            </div>

            {/* Patient Demographics & Next of Kin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C8290] block">
                  Contact & Residence
                </span>
                <p className="flex items-center gap-1.5 text-[#172B3A]">
                  <Phone className="w-3.5 h-3.5 text-[#087F8C]" />
                  {selectedPatient.phone}
                </p>
                <p className="flex items-center gap-1.5 text-[#172B3A]">
                  <Mail className="w-3.5 h-3.5 text-[#087F8C]" />
                  {selectedPatient.email}
                </p>
                <p className="flex items-center gap-1.5 text-[#172B3A]">
                  <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
                  {selectedPatient.address}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C8290] block">
                  Next of Kin & Emergency
                </span>
                {selectedPatient.nextOfKin ? (
                  <>
                    <p className="font-bold text-[#172B3A]">
                      {selectedPatient.nextOfKin.name} ({selectedPatient.nextOfKin.relation})
                    </p>
                    <p className="flex items-center gap-1.5 text-[#172B3A]">
                      <Phone className="w-3.5 h-3.5 text-[#2E9B68]" />
                      {selectedPatient.nextOfKin.phone}
                    </p>
                  </>
                ) : (
                  <p className="text-[#6C8290]">No next of kin specified</p>
                )}
                <div className="pt-1 flex items-center gap-1 text-amber-700 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Allergies: {selectedPatient.allergies?.join(', ') || 'None'}</span>
                </div>
              </div>
            </div>

            {/* Prescriptions Active */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#172B3A] block">
                Active Prescriptions
              </span>
              <div className="flex gap-2 flex-wrap">
                {selectedPatient.prescriptions?.map((rx, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Pill className="w-3 h-3" />
                    {rx}
                  </span>
                ))}
              </div>
            </div>

            {/* Encounter History */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#172B3A] block">
                Clinical Encounters & Notes
              </span>
              <div className="space-y-1.5">
                {selectedPatient.visitHistory.map((vh, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white border border-[#E3EBEE] text-xs text-[#172B3A] flex items-center justify-between"
                  >
                    <span className="font-medium">{vh}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9B68] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Prescription Issue Modal */}
      {prescriptionModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold font-heading text-[#172B3A] mb-3">
              Issue Electronic Prescription
            </h3>
            <form onSubmit={handleAddPrescription} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  placeholder="e.g. Coartem, Amoxicillin, Ventolin"
                  className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                  Dosage & Regimen
                </label>
                <input
                  type="text"
                  required
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  placeholder="e.g. 500mg 3x daily for 7 days"
                  className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPrescriptionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C8290] hover:bg-[#F5F9FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                >
                  Dispatch to Pharmacy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      {recordModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold font-heading text-[#172B3A] mb-3">
              Add Clinical Encounter Note
            </h3>
            <form onSubmit={handleAddRecord} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                  Doctor's Clinical Notes
                </label>
                <textarea
                  rows={4}
                  required
                  value={newRecordNote}
                  onChange={(e) => setNewRecordNote(e.target.value)}
                  placeholder="Enter diagnosis, clinical findings, treatment plan, or follow-up schedule..."
                  className="w-full p-3 rounded-2xl border border-[#E3EBEE] text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C8290] hover:bg-[#F5F9FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs"
                >
                  Save to EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
