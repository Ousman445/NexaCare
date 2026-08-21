import React, { useState } from 'react';
import { PatientRecordData } from '../../types';
import { 
  FileText, 
  FlaskConical, 
  Scissors, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

interface RecordsProps {
  records: PatientRecordData;
}

export const Records: React.FC<RecordsProps> = ({ records }) => {
  const [activeTab, setActiveTab] = useState<'visits' | 'tests' | 'procedures'>('visits');

  const getResultChip = (result?: string) => {
    if (!result) return null;
    if (result.toLowerCase().includes('negative') || result.toLowerCase().includes('normal')) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
          ● {result}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF3E4] text-[#E9A23B]">
        ● {result}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            My Electronic Records
          </h2>
          <p className="text-xs text-[#6C8290]">Centralized Gambia national health records</p>
        </div>
      </div>

      {/* Patient ID Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#6C8290] uppercase tracking-wider">
              NATIONAL PATIENT ID
            </span>
            <strong className="text-sm font-mono font-bold text-[#172B3A] block">
              {records.patientId}
            </strong>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
          Verified
        </span>
      </div>

      {/* Segmented Tab Bar */}
      <div className="flex p-1 bg-white rounded-2xl border border-[#E3EBEE] shadow-xs">
        <button
          onClick={() => setActiveTab('visits')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'visits'
              ? 'bg-[#087F8C] text-white shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          Visits ({records.visits.length})
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tests'
              ? 'bg-[#087F8C] text-white shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          Lab Tests ({records.tests.length})
        </button>
        <button
          onClick={() => setActiveTab('procedures')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'procedures'
              ? 'bg-[#087F8C] text-white shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          Procedures ({records.procedures.length})
        </button>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {records[activeTab].map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-2xl bg-white border border-[#E3EBEE] shadow-xs space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <strong className="text-xs font-bold text-[#172B3A] block">
                {r.label}
              </strong>
              <span className="text-[11px] text-[#6C8290] whitespace-nowrap">{r.date}</span>
            </div>

            <p className="text-[11px] text-[#087F8C] font-semibold">
              {r.hospital}
            </p>

            {r.note && (
              <p className="text-xs text-[#172B3A] bg-[#F5F9FA] p-2.5 rounded-xl border border-[#E3EBEE]/60 leading-relaxed">
                {r.note}
              </p>
            )}

            {r.result && (
              <div className="pt-1">
                {getResultChip(r.result)}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
