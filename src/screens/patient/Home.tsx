import React from 'react';
import { QueueTicket, Appointment, Hospital } from '../../types';
import { HOSPITALS } from '../../store';
import { GambiaMap } from '../../components/GambiaMap';
import { SOSButton } from '../../components/SOSButton';
import { 
  Ticket, 
  Calendar, 
  Video, 
  FileText, 
  Pill, 
  Activity, 
  Stethoscope, 
  Users, 
  ChevronRight, 
  Clock, 
  Building2, 
  MapPin,
  Bell,
  MessageSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface HomeProps {
  userName: string;
  ticket: QueueTicket | null;
  nextAppointment: Appointment;
  unreadMessageCount?: number;
  onNavigate: (screen: string) => void;
  onSelectHospital: (hospitalId: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  userName,
  ticket,
  nextAppointment,
  unreadMessageCount = 1,
  onNavigate,
  onSelectHospital
}) => {
  const quickActions = [
    {
      id: 'get_ticket',
      label: 'Get Ticket',
      sub: 'Skip waiting line',
      icon: Ticket,
      color: 'bg-teal-50 text-[#087F8C] border-teal-100',
      action: () => onNavigate('findcare')
    },
    {
      id: 'appointments',
      label: 'Appointments',
      sub: 'Upcoming & past',
      icon: Calendar,
      color: 'bg-blue-50 text-[#4F8FC0] border-blue-100',
      action: () => onNavigate('appointments')
    },
    {
      id: 'evisit',
      label: 'E-Visit',
      sub: 'Doctor video call',
      icon: Video,
      color: 'bg-emerald-50 text-[#2E9B68] border-emerald-100',
      action: () => onNavigate('evisit')
    },
    {
      id: 'records',
      label: 'Records',
      sub: 'History & tests',
      icon: FileText,
      color: 'bg-amber-50 text-[#E9A23B] border-amber-100',
      action: () => onNavigate('records')
    },
    {
      id: 'prescriptions',
      label: 'Prescriptions',
      sub: 'Meds & refills',
      icon: Pill,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      action: () => onNavigate('prescriptions')
    },
    {
      id: 'vitals',
      label: 'Vitals',
      sub: 'BP & blood sugar',
      icon: Activity,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      action: () => onNavigate('vitals')
    },
    {
      id: 'find_doctor',
      label: 'Find Doctor',
      sub: 'Specialists & ratings',
      icon: Stethoscope,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      action: () => onNavigate('finddoctor')
    },
    {
      id: 'family',
      label: 'Family',
      sub: 'Switch profiles',
      icon: Users,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      action: () => onNavigate('family')
    }
  ];

  const nearbyHospitals = HOSPITALS.slice(0, 4);

  return (
    <div className="space-y-4">
      
      {/* Top Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-[#6C8290] font-medium">Welcome back,</span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A] mt-0.5">
            {userName}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('messages')}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-2xs hover:bg-[#F5F9FA] transition-colors relative cursor-pointer"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4 text-[#087F8C]" />
            {unreadMessageCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#087F8C] ring-2 ring-white" />
            )}
          </button>

          <button
            onClick={() => onNavigate('notifications')}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-2xs hover:bg-[#F5F9FA] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[#172B3A]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E9A23B]" />
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="w-9 h-9 rounded-xl bg-[#087F8C] text-white flex items-center justify-center font-bold text-xs shadow-2xs hover:bg-[#066670] transition-colors cursor-pointer"
          >
            {userName.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </button>
        </div>
      </div>

      {/* Global SOS Emergency Banner */}
      <SOSButton variant="inline" />

      {/* Active Queue Ticket Card (Real-Time wait, position, estimated time) */}
      {ticket ? (
        <div
          onClick={() => onNavigate('myqueue')}
          className="p-5 rounded-3xl cursor-pointer text-white shadow-md transition-all hover:shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #087F8C, #0a9cab)' }}
        >
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-teal-100 block">
                ACTIVE QUEUE TICKET
              </span>
              <div className="font-heading font-black text-3xl text-white tracking-wide mt-1">
                {ticket.number}
              </div>
              <div className="text-xs text-teal-50 font-medium mt-0.5">
                {ticket.dept} · {ticket.hospitalName}
              </div>
            </div>

            <div className="text-right">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E9B68] ring-4 ring-white/20 inline-block animate-pulse" />
              <div className="text-2xl font-black font-heading text-white mt-1">
                {ticket.position}
              </div>
              <span className="text-[11px] text-teal-100 block -mt-1 font-semibold">
                ahead of you
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Est. Wait: ~{ticket.eta} mins
            </span>
            <span className="font-bold flex items-center gap-1">
              Live Queue Status <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-[#172B3A] block">
                  No active queue ticket
                </strong>
                <p className="text-[11px] text-[#6C8290]">Book a digital queue pass before arrival</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('findcare')}
              className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Get Ticket
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions Grid (8 requested items) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
            Quick Actions
          </span>
          <span className="text-[10px] text-[#087F8C] font-bold">Comprehensive Care</span>
        </div>

        <div className="grid grid-cols-2 min-[460px]:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {quickActions.map((qa) => {
            const IconComp = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={qa.action}
                className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] active:scale-[0.98] text-center transition-all group shadow-2xs hover:shadow-xs cursor-pointer flex flex-col items-center justify-center min-h-[96px]"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1.5 border transition-transform group-hover:scale-105 ${qa.color}`}>
                  <IconComp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <strong className="text-xs font-bold text-[#172B3A] block leading-tight truncate w-full">
                  {qa.label}
                </strong>
                <span className="text-[10px] text-[#6C8290] block truncate w-full mt-0.5">
                  {qa.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointment Preview */}
      {nextAppointment && (
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2F9] text-[#4F8FC0] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#4F8FC0] uppercase tracking-wider">
                    Upcoming Appointment
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700">
                    {nextAppointment.type}
                  </span>
                </div>
                <strong className="text-xs font-bold text-[#172B3A] block mt-0.5">
                  {nextAppointment.doctor}
                </strong>
                <p className="text-[11px] text-[#6C8290]">
                  {nextAppointment.date} at {nextAppointment.time} · {nextAppointment.hospital}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('appointments')}
              className="p-2 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#172B3A] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Nearby Hospitals List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
            Nearby Hospitals & Clinics
          </span>
          <button
            onClick={() => onNavigate('findcare')}
            className="text-[11px] text-[#087F8C] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View all ({HOSPITALS.length})</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {nearbyHospitals.map((hosp) => (
            <div
              key={hosp.id}
              onClick={() => onSelectHospital(hosp.id)}
              className="p-3.5 rounded-2xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-bold text-[#172B3A] group-hover:text-[#087F8C]">
                      {hosp.name}
                    </strong>
                    <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                      hosp.status === 'Open' ? 'bg-[#E8F6EF] text-[#2E9B68]' : 'bg-[#FDF3E4] text-[#E9A23B]'
                    }`}>
                      {hosp.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C8290] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#6C8290]" />
                    {hosp.location} · {hosp.wait} wait
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#087F8C]">
                <span className="hidden sm:inline text-[11px]">View</span>
                <ChevronRight className="w-4 h-4 text-[#6C8290] group-hover:text-[#087F8C] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map Radar Preview */}
      <div className="pt-1">
        <GambiaMap onSelectHospital={onSelectHospital} />
      </div>

    </div>
  );
};
