import React from 'react';
import { DeskQueueItem, StaffAppointmentItem, EVisitRequest } from '../../types';
import { 
  Users, 
  Clock, 
  Video, 
  BedDouble, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  UserPlus, 
  Activity, 
  Stethoscope,
  Volume2,
  FileText,
  MessageSquare
} from 'lucide-react';

interface StaffDashboardProps {
  queueItems: DeskQueueItem[];
  appointments: StaffAppointmentItem[];
  evisitRequests: EVisitRequest[];
  onNavigate: (screen: string) => void;
  onOpenTriage: () => void;
  onCallPatient: (id: string) => void;
  onCompletePatient?: (id: string) => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  queueItems,
  appointments,
  evisitRequests,
  onNavigate,
  onOpenTriage,
  onCallPatient,
  onCompletePatient
}) => {
  const waitingCount = queueItems.filter(q => q.status === 'waiting' || q.status === 'Waiting').length;
  const callingItem = queueItems.find(q => q.status === 'calling' || q.status === 'Calling');
  const nextWaiting = queueItems.find(q => q.status === 'waiting' || q.status === 'Waiting');
  const emergencyCount = queueItems.filter(q => q.triage === 'emergency' || q.triage === 'Emergency').length;
  const completedToday = 68;

  const recentActivity = [
    {
      id: 'act1',
      title: 'Triage Admitted: Alagie Kebbeh',
      time: '2m ago',
      type: 'emergency',
      desc: 'Emergency chest pain admitted to Triage Bay 1'
    },
    {
      id: 'act2',
      title: 'Prescription Issued: Modou Njie',
      time: '12m ago',
      type: 'prescription',
      desc: 'Amlodipine 5mg dispensed at OPD Pharmacy'
    },
    {
      id: 'act3',
      title: 'E-Visit Completed: Sarjo Camara',
      time: '28m ago',
      type: 'evisit',
      desc: 'Teleconsultation with Dr. Fatou Ceesay concluded'
    },
    {
      id: 'act4',
      title: 'Lab Results Uploaded: FBC Panel',
      time: '45m ago',
      type: 'lab',
      desc: 'Hematology report verified by Central Lab'
    }
  ];

  return (
    <div className="space-y-4">
      
      {/* Top Banner / Triage Callout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#E3EBEE] shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E9B68] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
              SERREKUNDA GENERAL CLINICAL PORTAL
            </span>
          </div>
          <h2 className="text-lg font-bold font-heading text-[#172B3A] mt-0.5">
            Operational Overview & Triage
          </h2>
          <p className="text-xs text-[#6C8290]">Duty Officer: Dr. Fatou Ceesay · Station: Desk 2</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTriage}
            className="px-3.5 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Manual Triage Entry</span>
          </button>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div 
          onClick={() => onNavigate('queue')}
          className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#087F8C] mb-2">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-[#E4F3F4] px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="font-heading font-black text-2xl text-[#172B3A]">
            {waitingCount}
          </div>
          <span className="text-xs text-[#6C8290] font-medium block">Patients in Queue</span>
          <span className="text-[10px] text-[#087F8C] font-semibold mt-1 block">
            Avg wait ~14 mins
          </span>
        </div>

        <div 
          onClick={() => onNavigate('appointments')}
          className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#4F8FC0] transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#4F8FC0] mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-[#EAF2F9] text-[#4F8FC0] px-2 py-0.5 rounded-full">
              Today
            </span>
          </div>
          <div className="font-heading font-black text-2xl text-[#172B3A]">
            {appointments.length}
          </div>
          <span className="text-xs text-[#6C8290] font-medium block">Scheduled Bookings</span>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 block">
            1 Checked in
          </span>
        </div>

        <div 
          onClick={() => onNavigate('evisits')}
          className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#2E9B68] transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#2E9B68] mb-2">
            <Video className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68] px-2 py-0.5 rounded-full">
              {evisitRequests.length} Waiting
            </span>
          </div>
          <div className="font-heading font-black text-2xl text-[#172B3A]">
            {evisitRequests.length}
          </div>
          <span className="text-xs text-[#6C8290] font-medium block">Incoming E-Visits</span>
          <span className="text-[10px] text-[#2E9B68] font-semibold mt-1 block">
            Ready for consultation
          </span>
        </div>

        <div 
          onClick={() => onNavigate('beds')}
          className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#E9A23B] transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-[#E9A23B] mb-2">
            <BedDouble className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-[#FDF3E4] text-[#E9A23B] px-2 py-0.5 rounded-full">
              82% Full
            </span>
          </div>
          <div className="font-heading font-black text-2xl text-[#172B3A]">
            33 / 159
          </div>
          <span className="text-xs text-[#6C8290] font-medium block">Beds Available</span>
          <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
            ICU near capacity (2 left)
          </span>
        </div>
      </div>

      {/* Emergency & Calling Patient Bar */}
      {callingItem ? (
        <div
          className="p-4 sm:p-5 rounded-3xl text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-700"
          style={{ background: 'linear-gradient(135deg, #172B3A 0%, #1D3A4E 60%, #087F8C 100%)' }}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-teal-400/20 text-teal-300 border border-teal-400/30 flex items-center justify-center font-bold shrink-0">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-extrabold tracking-widest text-teal-300 uppercase">
                  CURRENT CALLING IN ROOM 2
                </span>
                <span className="text-[10px] bg-teal-400/20 text-teal-200 border border-teal-400/30 px-1.5 py-0.2 rounded font-bold">
                  {callingItem.dept}
                </span>
              </div>
              <div className="font-heading font-black text-base sm:text-lg text-white truncate my-0.5">
                {callingItem.ticketNumber} — {callingItem.patientName || callingItem.patient}
              </div>
              <span className="text-xs text-teal-100/90 block truncate">
                Triage Status: <strong className="text-white">{callingItem.triage || 'Priority'}</strong> · Wait was: {callingItem.wait || `${callingItem.waitTime}m`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/15">
            {onCompletePatient && (
              <button
                onClick={() => onCompletePatient(callingItem.id)}
                className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Finish</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('queue')}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap transition-all"
            >
              <span>Manage Queue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C] block">
                Room 2 (General OPD) · Desk Ready
              </span>
              <span className="text-xs font-semibold text-[#172B3A]">
                {waitingCount} patient{waitingCount === 1 ? '' : 's'} waiting in line
              </span>
            </div>
          </div>
          {nextWaiting && (
            <button
              onClick={() => onCallPatient(nextWaiting.id)}
              className="px-3.5 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Call Next: {nextWaiting.ticketNumber} ({nextWaiting.patientName || nextWaiting.patient})</span>
            </button>
          )}
        </div>
      )}

      {/* Main 2-Column Section: Queue Preview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        
        {/* Next in Line Queue */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
              Immediate Queue Dispatch
            </h3>
            <button
              onClick={() => onNavigate('queue')}
              className="text-[11px] text-[#087F8C] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Manage all ({queueItems.length})</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {queueItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-black text-xs px-2 py-1 rounded-lg bg-white border border-[#E3EBEE] text-[#087F8C]">
                    {item.ticketNumber}
                  </span>
                  <div>
                    <strong className="text-xs font-bold text-[#172B3A] block">
                      {item.patientName || item.patient}
                    </strong>
                    <span className="text-[10px] text-[#6C8290]">
                      {item.dept} · Wait: {item.wait || `${item.waitTime}m`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    item.triage === 'Emergency' || item.triage === 'emergency'
                      ? 'bg-rose-100 text-[#D9534F]'
                      : item.triage === 'Priority' || item.triage === 'priority'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-teal-50 text-[#087F8C]'
                  }`}>
                    {item.triage}
                  </span>

                  {item.status !== 'Calling' && item.status !== 'calling' && (
                    <button
                      onClick={() => onCallPatient(item.id)}
                      className="px-2.5 py-1 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-[11px] cursor-pointer"
                    >
                      Call
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Activity Stream */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
              Real-Time Clinical Feed
            </h3>
            <span className="text-[10px] text-[#2E9B68] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B68] animate-pulse" />
              Live Audit Log
            </span>
          </div>

          <div className="space-y-2.5">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-2xl bg-white border border-[#E3EBEE] flex items-start gap-3 text-xs"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  act.type === 'emergency' ? 'bg-[#D9534F]' :
                  act.type === 'prescription' ? 'bg-[#2E9B68]' :
                  act.type === 'evisit' ? 'bg-[#4F8FC0]' : 'bg-[#087F8C]'
                }`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-bold text-[#172B3A]">
                      {act.title}
                    </strong>
                    <span className="text-[10px] text-[#6C8290]">{act.time}</span>
                  </div>
                  <p className="text-[11px] text-[#6C8290] mt-0.5">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
