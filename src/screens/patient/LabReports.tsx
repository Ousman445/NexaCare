import React, { useState } from 'react';
import { LabReportDetail } from '../../types';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Printer, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  Building2,
  Stethoscope,
  Sparkles
} from 'lucide-react';

interface LabReportsProps {
  labReports: LabReportDetail[];
  onConsultDoctor: (doctorName: string) => void;
  onBackToHome: () => void;
}

export const LabReports: React.FC<LabReportsProps> = ({
  labReports,
  onConsultDoctor,
  onBackToHome
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(labReports[0]?.id || '');
  const [isPrinting, setIsPrinting] = useState(false);

  const activeReport = labReports.find(r => r.id === selectedReportId) || labReports[0];

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] hover:bg-[#F5F9FA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold font-heading text-[#172B3A]">
              Diagnostic Lab Reports
            </h1>
            <p className="text-xs text-[#6C8290]">
              Official laboratory investigations, blood counts & pathology results
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EBEE] text-[#172B3A] hover:bg-[#F5F9FA] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Select Report Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {labReports.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedReportId(rep.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap flex items-center gap-2 ${
              activeReport?.id === rep.id
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'bg-white border border-[#E3EBEE] text-[#172B3A] hover:border-teal-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>{rep.testName.split(' ')[0]} ({rep.date})</span>
          </button>
        ))}
      </div>

      {/* Main Report Document Sheet */}
      {activeReport && (
        <div className="bg-white rounded-3xl border border-[#E3EBEE] p-6 shadow-sm space-y-6">
          {/* Official Letterhead Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E3EBEE]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700">
                  {activeReport.status}
                </span>
                <span className="text-xs text-[#6C8290]">Lab Ref: #{activeReport.id.toUpperCase()}</span>
              </div>
              <h2 className="text-lg font-bold font-heading text-[#172B3A] mt-1">
                {activeReport.testName}
              </h2>
              <p className="text-xs text-[#6C8290] flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#087F8C]" />
                {activeReport.facility}
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-[#E3EBEE] sm:pl-5 space-y-0.5 text-xs text-[#6C8290]">
              <div>Patient: <span className="font-bold text-[#172B3A]">Ousman Jobe</span></div>
              <div>ID: <span className="font-mono text-[#172B3A]">NC-GM-08841</span></div>
              <div>Date: <span className="font-semibold text-[#172B3A]">{activeReport.date}</span></div>
            </div>
          </div>

          {/* Clinical Summary Highlight Box */}
          <div className="p-4 bg-[#F0F7F9] rounded-2xl border border-teal-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">
                Clinical Pathology Summary
              </h4>
              <p className="text-xs text-[#172B3A] font-medium mt-0.5 leading-relaxed">
                {activeReport.summary}
              </p>
            </div>
          </div>

          {/* Test Parameters & Biological Ranges Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C8290]">
              Biological Biomarkers & Reference Ranges
            </h3>
            
            <div className="overflow-x-auto rounded-2xl border border-[#E3EBEE]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F9FA] text-[#6C8290] font-semibold border-b border-[#E3EBEE]">
                  <tr>
                    <th className="py-2.5 px-3">Investigation Parameter</th>
                    <th className="py-2.5 px-3">Observed Value</th>
                    <th className="py-2.5 px-3">Reference Interval</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F4F6]">
                  {activeReport.results.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFDFD]">
                      <td className="py-3 px-3 font-semibold text-[#172B3A]">
                        {row.parameter}
                      </td>
                      <td className="py-3 px-3 font-extrabold text-[#087F8C]">
                        {row.value} {row.unit}
                      </td>
                      <td className="py-3 px-3 text-[#6C8290]">
                        {row.referenceRange ? `${row.referenceRange} ${row.unit}` : 'Standard'}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Normal'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor Impression & Consultation Trigger */}
          <div className="p-4 bg-[#F9FCFD] rounded-2xl border border-[#E3EBEE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#6C8290]">
                <Stethoscope className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Reviewed & Verified by:</span>
                <span className="font-bold text-[#172B3A]">{activeReport.doctor}</span>
              </div>
              <p className="text-xs text-[#172B3A] mt-1 italic">
                "{activeReport.doctorNotes}"
              </p>
            </div>

            <button
              onClick={() => onConsultDoctor(activeReport.doctor)}
              className="px-4 py-2 rounded-xl bg-[#087F8C] text-white hover:bg-[#066670] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Ask Doctor About This
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
