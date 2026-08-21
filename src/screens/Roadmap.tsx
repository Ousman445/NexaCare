import React from 'react';
import { 
  Rocket, 
  Phone, 
  MessageSquare, 
  Building2, 
  Stethoscope, 
  FlaskConical, 
  BarChart3, 
  Check, 
  X 
} from 'lucide-react';

interface RoadmapProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    {
      t: 'USSD Access (*220#)',
      d: 'Dial-in queue ticketing and basic appointment booking for feature phones without internet data.',
      icon: Phone,
      color: 'bg-emerald-50 text-[#2E9B68]'
    },
    {
      t: 'SMS Real-Time Notifications',
      d: 'Instant queue alerts and estimated wait countdown via Africell / QCell GSM gateways.',
      icon: MessageSquare,
      color: 'bg-sky-50 text-[#4F8FC0]'
    },
    {
      t: 'National Hospital Network Connections',
      d: 'Expanding onboarding to provincial hospitals across Bwiam, Farafenni, Bansang, and Basse.',
      icon: Building2,
      color: 'bg-teal-50 text-[#087F8C]'
    },
    {
      t: 'Inter-Facility Referral System',
      d: 'Seamless doctor-to-doctor electronic case transfers between local clinics and EFSTH Tertiary.',
      icon: Stethoscope,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      t: 'Lab & Pharmacy Full Integration',
      d: 'Direct mobile delivery of lab test results and electronic prescription dispensing tracking.',
      icon: FlaskConical,
      color: 'bg-amber-50 text-[#E9A23B]'
    },
    {
      t: 'Predictive Wait-Time AI Analytics',
      d: 'Machine learning forecasting for clinic surge hours and staff capacity balancing.',
      icon: BarChart3,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const priority = [
    'Find Care',
    'Get Ticket',
    'Track Queue',
    'Notification',
    'Consultation',
    'Record'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#172B3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 max-h-[88vh] overflow-y-auto shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-[#172B3A]">
                NEXACARE Platform Roadmap
              </h3>
              <p className="text-xs text-[#6C8290]">What's coming next for healthcare in The Gambia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#6C8290] my-4 leading-relaxed">
          NEXACARE is rolling out in structured phases across Greater Banjul and nationwide. Here is our technological roadmap and active development pipeline.
        </p>

        {/* Roadmap Items */}
        <div className="space-y-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.t}
                className="p-3 rounded-2xl border border-[#E3EBEE] hover:border-[#087F8C]/40 flex items-start gap-3 bg-[#F5F9FA]/40 transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl ${it.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <strong className="text-xs text-[#172B3A] font-bold">{it.t}</strong>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EAF2F9] text-[#4F8FC0]">
                      Planned
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C8290] mt-0.5 leading-normal">{it.d}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-px bg-[#E3EBEE] my-5" />

        {/* Build Priority */}
        <div>
          <strong className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider block mb-3">
            Build Priority (Active in this prototype)
          </strong>
          <div className="space-y-0">
            {priority.map((p, i) => (
              <div key={p}>
                <div className="flex items-center gap-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#2E9B68] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-[#172B3A]">{p}</span>
                </div>
                {i < priority.length - 1 && (
                  <div className="w-0.5 h-3 bg-[#2E9B68]/30 ml-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E3EBEE]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold transition-colors"
          >
            Close Roadmap
          </button>
        </div>

      </div>
    </div>
  );
};
