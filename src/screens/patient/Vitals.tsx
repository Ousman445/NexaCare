import React, { useState } from 'react';
import { VitalLog } from '../../types';
import { INITIAL_VITALS } from '../../store';
import { 
  ChevronLeft, 
  Activity, 
  Heart, 
  Thermometer, 
  Droplet, 
  Plus,
  TrendingUp,
  Scale,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

interface VitalsProps {
  onBack: () => void;
}

export const Vitals: React.FC<VitalsProps> = ({ onBack }) => {
  const [vitals, setVitals] = useState<VitalLog[]>(INITIAL_VITALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState<'bp' | 'hr' | 'sugar' | 'temp' | 'weight'>('bp');
  
  const [bp, setBp] = useState('120/80');
  const [hr, setHr] = useState(72);
  const [temp, setTemp] = useState('36.8');
  const [sugar, setSugar] = useState('5.2');
  const [weight, setWeight] = useState('71.5');

  const handleAddVital = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: VitalLog = {
      id: `vit_${Date.now()}`,
      date: 'Today · Just now',
      bloodPressure: `${bp} mmHg`,
      heartRate: Number(hr) || 72,
      temperature: `${temp} °C`,
      bloodSugar: `${sugar} mmol/L`,
      weight: `${weight} kg`
    };
    setVitals([newLog, ...vitals]);
    setShowAddModal(false);
  };

  const latest = vitals[0];

  // 7-day trend mock data for charts
  const weeklyTrends = [
    { day: 'Mon', bpSystolic: 121, bpDiastolic: 79, hr: 71, sugar: 5.0, temp: 36.6, weight: 71.4 },
    { day: 'Tue', bpSystolic: 124, bpDiastolic: 82, hr: 74, sugar: 5.2, temp: 36.9, weight: 71.6 },
    { day: 'Wed', bpSystolic: 119, bpDiastolic: 78, hr: 69, sugar: 4.8, temp: 36.7, weight: 71.3 },
    { day: 'Thu', bpSystolic: 118, bpDiastolic: 76, hr: 70, sugar: 4.9, temp: 36.7, weight: 71.2 },
    { day: 'Fri', bpSystolic: 122, bpDiastolic: 80, hr: 75, sugar: 5.4, temp: 37.1, weight: 71.8 },
    { day: 'Sat', bpSystolic: 120, bpDiastolic: 79, hr: 73, sugar: 5.1, temp: 36.8, weight: 71.5 },
    { day: 'Sun', bpSystolic: 120, bpDiastolic: 78, hr: 72, sugar: 5.1, temp: 36.8, weight: 71.5 }
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-2xs hover:bg-[#F5F9FA] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
              BIOMETRIC TELEMETRY
            </span>
            <h2 className="text-base font-bold font-heading text-[#172B3A]">
              My Health Vitals
            </h2>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Reading</span>
        </button>
      </div>

      {/* 5 Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div 
          onClick={() => setActiveMetricTab('bp')}
          className={`p-3.5 rounded-3xl bg-white border cursor-pointer transition-all shadow-2xs ${
            activeMetricTab === 'bp' ? 'border-[#D9534F] ring-2 ring-rose-100' : 'border-[#E3EBEE]'
          }`}
        >
          <div className="flex items-center justify-between text-[#D9534F] mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-[9px] font-bold bg-[#FBEAE9] text-[#D9534F] px-1.5 py-0.2 rounded-full">Normal</span>
          </div>
          <span className="text-[10px] text-[#6C8290] font-medium block">Blood Pressure</span>
          <div className="font-heading font-black text-base text-[#172B3A] mt-0.5">
            {latest?.bloodPressure.split(' ')[0] || '120/78'}
          </div>
          <span className="text-[9px] text-[#6C8290]">mmHg</span>
        </div>

        <div 
          onClick={() => setActiveMetricTab('hr')}
          className={`p-3.5 rounded-3xl bg-white border cursor-pointer transition-all shadow-2xs ${
            activeMetricTab === 'hr' ? 'border-[#087F8C] ring-2 ring-teal-100' : 'border-[#E3EBEE]'
          }`}
        >
          <div className="flex items-center justify-between text-[#087F8C] mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-[9px] font-bold bg-[#E4F3F4] text-[#087F8C] px-1.5 py-0.2 rounded-full">Steady</span>
          </div>
          <span className="text-[10px] text-[#6C8290] font-medium block">Heart Rate</span>
          <div className="font-heading font-black text-base text-[#172B3A] mt-0.5">
            {latest?.heartRate || 72}
          </div>
          <span className="text-[9px] text-[#6C8290]">BPM (Pulse)</span>
        </div>

        <div 
          onClick={() => setActiveMetricTab('sugar')}
          className={`p-3.5 rounded-3xl bg-white border cursor-pointer transition-all shadow-2xs ${
            activeMetricTab === 'sugar' ? 'border-[#4F8FC0] ring-2 ring-blue-100' : 'border-[#E3EBEE]'
          }`}
        >
          <div className="flex items-center justify-between text-[#4F8FC0] mb-1">
            <Droplet className="w-4 h-4" />
            <span className="text-[9px] font-bold bg-[#EAF2F9] text-[#4F8FC0] px-1.5 py-0.2 rounded-full">Fasting</span>
          </div>
          <span className="text-[10px] text-[#6C8290] font-medium block">Blood Sugar</span>
          <div className="font-heading font-black text-base text-[#172B3A] mt-0.5">
            {latest?.bloodSugar.split(' ')[0] || '5.1'}
          </div>
          <span className="text-[9px] text-[#6C8290]">mmol/L</span>
        </div>

        <div 
          onClick={() => setActiveMetricTab('temp')}
          className={`p-3.5 rounded-3xl bg-white border cursor-pointer transition-all shadow-2xs ${
            activeMetricTab === 'temp' ? 'border-[#E9A23B] ring-2 ring-amber-100' : 'border-[#E3EBEE]'
          }`}
        >
          <div className="flex items-center justify-between text-[#E9A23B] mb-1">
            <Thermometer className="w-4 h-4" />
            <span className="text-[9px] font-bold bg-[#FDF3E4] text-[#E9A23B] px-1.5 py-0.2 rounded-full">Normal</span>
          </div>
          <span className="text-[10px] text-[#6C8290] font-medium block">Body Temp</span>
          <div className="font-heading font-black text-base text-[#172B3A] mt-0.5">
            {latest?.temperature.split(' ')[0] || '36.8'}
          </div>
          <span className="text-[9px] text-[#6C8290]">°C</span>
        </div>

        <div 
          onClick={() => setActiveMetricTab('weight')}
          className={`p-3.5 rounded-3xl bg-white border cursor-pointer transition-all shadow-2xs ${
            activeMetricTab === 'weight' ? 'border-purple-500 ring-2 ring-purple-100' : 'border-[#E3EBEE]'
          }`}
        >
          <div className="flex items-center justify-between text-purple-600 mb-1">
            <Scale className="w-4 h-4" />
            <span className="text-[9px] font-bold bg-purple-50 text-purple-600 px-1.5 py-0.2 rounded-full">Target</span>
          </div>
          <span className="text-[10px] text-[#6C8290] font-medium block">Body Weight</span>
          <div className="font-heading font-black text-base text-[#172B3A] mt-0.5">
            {latest?.weight || '71.5 kg'}
          </div>
          <span className="text-[9px] text-[#6C8290]">kg</span>
        </div>
      </div>

      {/* Weekly Trend Chart Section */}
      <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#172B3A]">
                7-Day Health Trend Analysis
              </h4>
              <span className="text-[10px] text-[#6C8290]">
                {activeMetricTab === 'bp' && 'Systolic & Diastolic Blood Pressure (mmHg)'}
                {activeMetricTab === 'hr' && 'Resting Heart Rate (BPM)'}
                {activeMetricTab === 'sugar' && 'Fasting Blood Sugar Levels (mmol/L)'}
                {activeMetricTab === 'temp' && 'Core Body Temperature (°C)'}
                {activeMetricTab === 'weight' && 'Body Weight Variations (kg)'}
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
            Optimal Band
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-36 pt-4 pb-2 flex items-end justify-between gap-2 border-b border-[#E3EBEE]">
          {weeklyTrends.map((t, idx) => {
            let heightPercent = 50;
            let valLabel = '';

            if (activeMetricTab === 'bp') {
              heightPercent = ((t.bpSystolic - 100) / 40) * 100;
              valLabel = `${t.bpSystolic}/${t.bpDiastolic}`;
            } else if (activeMetricTab === 'hr') {
              heightPercent = ((t.hr - 55) / 40) * 100;
              valLabel = `${t.hr}`;
            } else if (activeMetricTab === 'sugar') {
              heightPercent = ((t.sugar - 3.5) / 3.5) * 100;
              valLabel = `${t.sugar}`;
            } else if (activeMetricTab === 'temp') {
              heightPercent = ((t.temp - 35.5) / 3) * 100;
              valLabel = `${t.temp}`;
            } else {
              heightPercent = ((t.weight - 68) / 6) * 100;
              valLabel = `${t.weight}`;
            }

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[9px] font-bold text-[#172B3A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {valLabel}
                </span>
                <div
                  style={{ height: `${Math.max(Math.min(heightPercent, 95), 20)}%` }}
                  className={`w-full max-w-[28px] rounded-t-xl transition-all duration-300 ${
                    activeMetricTab === 'bp' ? 'bg-[#D9534F]' :
                    activeMetricTab === 'hr' ? 'bg-[#087F8C]' :
                    activeMetricTab === 'sugar' ? 'bg-[#4F8FC0]' :
                    activeMetricTab === 'temp' ? 'bg-[#E9A23B]' : 'bg-purple-600'
                  }`}
                />
                <span className="text-[10px] font-bold text-[#6C8290]">
                  {t.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#6C8290]">
          <span>Target Range: 110-125/70-80 mmHg</span>
          <span className="text-[#087F8C] font-semibold">Weekly Variance: ±1.8%</span>
        </div>
      </div>

      {/* History Log */}
      <div>
        <span className="text-xs font-bold font-heading text-[#172B3A] block mb-2 uppercase tracking-wider">
          Recent Measurements History
        </span>
        <div className="space-y-2">
          {vitals.map((v) => (
            <div
              key={v.id}
              className="p-3.5 rounded-2xl bg-white border border-[#E3EBEE] shadow-2xs flex items-center justify-between text-xs"
            >
              <div>
                <strong className="text-xs font-bold text-[#172B3A] block">
                  BP {v.bloodPressure} · {v.heartRate} BPM
                </strong>
                <span className="text-[11px] text-[#6C8290]">
                  Temp {v.temperature} · Sugar {v.bloodSugar} {v.weight ? `· ${v.weight}` : ''}
                </span>
              </div>
              <span className="text-[10px] text-[#6C8290] font-medium">{v.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <h3 className="text-base font-bold font-heading text-[#172B3A]">
                Log Health Vitals
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVital} className="space-y-3 mt-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6C8290] mb-1">
                  Blood Pressure (e.g. 120/80)
                </label>
                <input
                  type="text"
                  required
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6C8290] mb-1">
                    Heart Rate (BPM)
                  </label>
                  <input
                    type="number"
                    value={hr}
                    onChange={(e) => setHr(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6C8290] mb-1">
                    Temp (°C)
                  </label>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6C8290] mb-1">
                    Blood Sugar (mmol/L)
                  </label>
                  <input
                    type="text"
                    value={sugar}
                    onChange={(e) => setSugar(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6C8290] mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-[#E3EBEE]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C8290] hover:bg-[#F5F9FA] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
