import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  Calendar,
  Video,
  XCircle,
  Activity,
  ChevronDown
} from 'lucide-react';

export const StaffAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  const weeklyData = [
    { day: 'Mon', patients: 142, waitTime: 18, evisits: 14 },
    { day: 'Tue', patients: 168, waitTime: 22, evisits: 19 },
    { day: 'Wed', patients: 155, waitTime: 16, evisits: 16 },
    { day: 'Thu', patients: 180, waitTime: 25, evisits: 22 },
    { day: 'Fri', patients: 195, waitTime: 28, evisits: 25 },
    { day: 'Sat', patients: 120, waitTime: 14, evisits: 12 },
    { day: 'Sun', patients: 95, waitTime: 11, evisits: 8 }
  ];

  const maxPatients = Math.max(...weeklyData.map(w => w.patients));

  const deptBreakdown = [
    { dept: 'General OPD', count: 480, percentage: 46, wait: '18 min', color: 'bg-[#087F8C]' },
    { dept: 'Maternity & Antenatal', count: 220, percentage: 21, wait: '14 min', color: 'bg-[#E9A23B]' },
    { dept: 'Emergency / Triage', count: 145, percentage: 14, wait: '4 min', color: 'bg-[#D9534F]' },
    { dept: 'Pharmacy Dispensing', count: 110, percentage: 11, wait: '8 min', color: 'bg-[#2E9B68]' },
    { dept: 'Central Laboratory', count: 85, percentage: 8, wait: '12 min', color: 'bg-[#4F8FC0]' }
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            CLINICAL INTELLIGENCE & SLAS
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Hospital Operational Analytics
          </h2>
          <p className="text-xs text-[#6C8290]">Daily patient throughput and wait time trends across Serekunda General</p>
        </div>

        <div className="flex p-0.5 bg-white rounded-xl border border-[#E3EBEE] self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'week' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-[#6C8290]'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'month' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-[#6C8290]'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* 4 Requested KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs">
          <div className="flex items-center justify-between text-[#087F8C] mb-1">
            <Users className="w-4 h-4" />
            <span className="text-[9px] font-bold text-[#2E9B68] bg-[#E8F6EF] px-1.5 py-0.2 rounded-full">
              +12.4%
            </span>
          </div>
          <span className="text-[11px] text-[#6C8290] font-medium block">Patients This Week</span>
          <div className="font-heading font-black text-2xl text-[#172B3A] mt-0.5">
            1,055
          </div>
          <span className="text-[10px] text-[#6C8290]">Target: 1,000</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs">
          <div className="flex items-center justify-between text-[#4F8FC0] mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[9px] font-bold text-[#2E9B68] bg-[#E8F6EF] px-1.5 py-0.2 rounded-full">
              -6.2 min
            </span>
          </div>
          <span className="text-[11px] text-[#6C8290] font-medium block">Avg Wait Time</span>
          <div className="font-heading font-black text-2xl text-[#172B3A] mt-0.5">
            18.2m
          </div>
          <span className="text-[10px] text-[#6C8290]">Under 25m SLA</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs">
          <div className="flex items-center justify-between text-[#2E9B68] mb-1">
            <Video className="w-4 h-4" />
            <span className="text-[9px] font-bold text-[#2E9B68] bg-[#E8F6EF] px-1.5 py-0.2 rounded-full">
              98% satisfied
            </span>
          </div>
          <span className="text-[11px] text-[#6C8290] font-medium block">E-Visits Completed</span>
          <div className="font-heading font-black text-2xl text-[#172B3A] mt-0.5">
            116
          </div>
          <span className="text-[10px] text-[#6C8290]">Virtual triage</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs">
          <div className="flex items-center justify-between text-rose-500 mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-[9px] font-bold text-[#2E9B68] bg-[#E8F6EF] px-1.5 py-0.2 rounded-full">
              Low
            </span>
          </div>
          <span className="text-[11px] text-[#6C8290] font-medium block">Cancellations / No-Shows</span>
          <div className="font-heading font-black text-2xl text-[#172B3A] mt-0.5">
            2.4%
          </div>
          <span className="text-[10px] text-[#6C8290]">25 patients total</span>
        </div>
      </div>

      {/* 7-Day Patient Throughput Bar Chart */}
      <div className="p-5 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
              7-Day Daily Patients Served
            </h3>
            <p className="text-[11px] text-[#6C8290]">Physical OPD & Telehealth volume</p>
          </div>
          <span className="text-xs font-black text-[#087F8C]">
            Peak: Friday (195 patients)
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 h-40 pt-4 border-b border-[#E3EBEE]">
          {weeklyData.map((d, i) => {
            const heightPercent = (d.patients / maxPatients) * 100;

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-bold text-[#172B3A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.patients}
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[32px] rounded-t-xl bg-[#087F8C] group-hover:bg-[#066670] transition-all"
                />
                <span className="text-[10px] font-bold text-[#6C8290]">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Breakdown & Wait Time Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        
        {/* Department Volume Share */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
            Department Volume Breakdown
          </h3>

          <div className="space-y-3">
            {deptBreakdown.map((dept, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-xs font-bold text-[#172B3A]">
                    {dept.dept}
                  </strong>
                  <span className="text-[#6C8290] font-semibold">
                    {dept.count} patients ({dept.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F5F9FA] overflow-hidden border border-[#E3EBEE]">
                  <div
                    style={{ width: `${dept.percentage}%` }}
                    className={`h-full rounded-full ${dept.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wait Time SLA Trends */}
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
          <h3 className="text-xs font-bold font-heading text-[#172B3A] uppercase tracking-wider">
            Department Wait Time Averages
          </h3>

          <div className="space-y-2">
            {deptBreakdown.map((dept, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dept.color}`} />
                  <span className="font-bold text-[#172B3A]">{dept.dept}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#087F8C]">
                    {dept.wait}
                  </span>
                  <span className="text-[10px] text-[#2E9B68] font-bold bg-[#E8F6EF] px-1.5 py-0.2 rounded-md">
                    In SLA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
