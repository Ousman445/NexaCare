import React, { useState } from 'react';
import { DoctorInternalMessage } from '../../types';
import { 
  MessageSquare, 
  Send, 
  UserCheck, 
  Building2, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Search,
  Plus,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface DoctorConsultsProps {
  messages: DoctorInternalMessage[];
  onSendConsult: (msg: Omit<DoctorInternalMessage, 'id' | 'timestamp'>) => void;
}

export const DoctorConsults: React.FC<DoctorConsultsProps> = ({ messages, onSendConsult }) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [toDoctor, setToDoctor] = useState('Dr. Momodou Bah (General Surgeon)');
  const [patientId, setPatientId] = useState('NC-GM-08841');
  const [patientName, setPatientName] = useState('Sarjo Camara');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'Routine' | 'Urgent' | 'Emergency Referral'>('Routine');
  const [search, setSearch] = useState('');

  const filtered = messages.filter(m => 
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.patientName.toLowerCase().includes(search.toLowerCase()) ||
    m.fromDoctorName.toLowerCase().includes(search.toLowerCase()) ||
    m.toDoctorName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return;

    onSendConsult({
      fromDoctorId: 'd1',
      fromDoctorName: 'Dr. Fatou Ceesay',
      fromDoctorSpec: 'General OPD',
      toDoctorId: 'd4',
      toDoctorName: toDoctor.split(' (')[0],
      patientId,
      patientName,
      subject,
      content,
      priority
    });

    setSubject('');
    setContent('');
    setShowNewModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E3EBEE] shadow-xs">
        <div>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Doctor-to-Doctor Clinical Consults & Referrals
          </h2>
          <p className="text-xs text-[#6C8290]">
            Secure intra-hospital case handovers, second opinions & specialist transfers
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 rounded-xl bg-[#087F8C] text-white hover:bg-[#066670] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          New Referral Consult
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C8290]" />
        <input
          type="text"
          placeholder="Filter by patient name, referring specialist, or clinical subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-[#E3EBEE] outline-none focus:border-[#087F8C]"
        />
      </div>

      {/* Consultations Feed */}
      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="p-4 bg-white rounded-2xl border border-[#E3EBEE] hover:border-teal-200 transition-all shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    msg.priority === 'Emergency Referral'
                      ? 'bg-rose-50 text-rose-700'
                      : msg.priority === 'Urgent'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-teal-50 text-[#087F8C]'
                  }`}
                >
                  {msg.priority}
                </span>
                <span className="text-xs text-[#6C8290]">{msg.timestamp}</span>
              </div>

              <div className="text-xs font-bold text-[#172B3A] bg-[#F5F9FA] px-2.5 py-1 rounded-lg">
                Patient: <span className="text-[#087F8C]">{msg.patientName}</span> ({msg.patientId})
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#172B3A]">
              {msg.subject}
            </h3>

            <p className="text-xs text-[#172B3A] bg-[#F9FCFD] p-3 rounded-xl border border-[#E3EBEE] leading-relaxed">
              {msg.content}
            </p>

            <div className="flex items-center justify-between text-xs text-[#6C8290] pt-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#172B3A]">{msg.fromDoctorName}</span>
                <span>({msg.fromDoctorSpec})</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#087F8C]" />
                <span className="font-semibold text-[#172B3A]">{msg.toDoctorName}</span>
              </div>

              <button className="text-xs font-bold text-[#087F8C] hover:underline flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                Reply Case Note
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Consult Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#E3EBEE] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-[#172B3A]">
                Initiate Specialist Consultation
              </h3>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F9FA] flex items-center justify-center text-[#6C8290]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#172B3A] block mb-1">
                  Recipient Specialist
                </label>
                <select
                  value={toDoctor}
                  onChange={(e) => setToDoctor(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-none"
                >
                  <option value="Dr. Momodou Bah (General Surgeon)">Dr. Momodou Bah (General Surgeon)</option>
                  <option value="Dr. Lamin Jarju (Obstetrics & Gynae)">Dr. Lamin Jarju (Obstetrics & Gynae)</option>
                  <option value="Dr. Awa Sanneh (Pediatrics)">Dr. Awa Sanneh (Pediatrics)</option>
                  <option value="Prof. Alieu Badara Gaye (Trauma & Critical Care)">Prof. Alieu Badara Gaye (EFSTH Trauma)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B3A] block mb-1">
                  Case Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-none"
                >
                  <option value="Routine">Routine Consult</option>
                  <option value="Urgent">Urgent Review</option>
                  <option value="Emergency Referral">Emergency Referral</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#172B3A] block mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B3A] block mb-1">
                  Patient ID / NHIS
                </label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B3A] block mb-1">
                Clinical Referral Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Surgical opinion for acute abdominal tenderness..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B3A] block mb-1">
                Clinical Notes / Diagnostic Impression
              </label>
              <textarea
                rows={4}
                placeholder="Describe current vitals, laboratory findings, current medication, and reason for consultation..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-none resize-none"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded-xl bg-[#F5F9FA] text-[#6C8290] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#087F8C] text-white text-xs font-bold shadow-xs hover:bg-[#066670]"
              >
                Send Referral Note
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
