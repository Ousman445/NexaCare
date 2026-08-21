import React, { useState } from 'react';
import { DeskQueueItem } from '../../types';
import { INITIAL_DESK_QUEUE } from '../../store';
import { 
  Users, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Search, 
  UserPlus, 
  Volume2, 
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  X,
  Radio,
  SlidersHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface DeskQueueProps {
  onOpenTriage: () => void;
  queue?: DeskQueueItem[];
  onUpdateQueue?: (newQueue: DeskQueueItem[]) => void;
}

export const DeskQueue: React.FC<DeskQueueProps> = ({ 
  onOpenTriage,
  queue: externalQueue,
  onUpdateQueue
}) => {
  const [internalQueue, setInternalQueue] = useState<DeskQueueItem[]>(INITIAL_DESK_QUEUE);
  const queue = externalQueue || internalQueue;

  const setQueue = (updater: DeskQueueItem[] | ((prev: DeskQueueItem[]) => DeskQueueItem[])) => {
    if (onUpdateQueue) {
      if (typeof updater === 'function') {
        const next = updater(queue);
        onUpdateQueue(next);
      } else {
        onUpdateQueue(updater);
      }
    } else {
      setInternalQueue(updater);
    }
  };

  const [activeDept, setActiveDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'ticket' | 'alphabetical-asc' | 'alphabetical-desc' | 'dept' | 'waitTime' | 'triage'>('ticket');
  const [calledMessage, setCalledMessage] = useState<string | null>(null);
  const [transferItem, setTransferItem] = useState<DeskQueueItem | null>(null);
  const [targetDept, setTargetDept] = useState<string>('Pharmacy');
  const [selectedRoom, setSelectedRoom] = useState<string>('Room 2 (General OPD)');
  const [showRoomSelector, setShowRoomSelector] = useState<boolean>(false);

  const availableRooms = [
    'Room 1 (Triage & Vitals)',
    'Room 2 (General OPD)',
    'Room 3 (Pediatrics)',
    'Room 4 (Specialist Consult)',
    'Room 5 (Emergency Resuscitation)',
    'Room 6 (Maternity & Antenatal)'
  ];

  const depts = [
    'All',
    'General OPD',
    'Maternity',
    'Emergency',
    'Pediatrics',
    'Laboratory',
    'Pharmacy'
  ];

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // Audio context might be restricted before user interaction
    }
  };

  const filteredQueue = queue.filter(q => {
    const matchesDept = activeDept === 'All' || q.dept.toLowerCase().includes(activeDept.toLowerCase());
    const matchesSearch = (q.patientName || q.patient || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.dept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'ticket') {
      return a.ticketNumber.localeCompare(b.ticketNumber);
    }
    if (sortBy === 'alphabetical-asc') {
      return (a.patientName || a.patient || '').localeCompare(b.patientName || b.patient || '');
    }
    if (sortBy === 'alphabetical-desc') {
      return (b.patientName || b.patient || '').localeCompare(a.patientName || a.patient || '');
    }
    if (sortBy === 'dept') {
      return a.dept.localeCompare(b.dept);
    }
    if (sortBy === 'waitTime') {
      return (b.waitTime || 0) - (a.waitTime || 0);
    }
    if (sortBy === 'triage') {
      const triageScore: Record<string, number> = { 'Emergency': 3, 'emergency': 3, 'Priority': 2, 'priority': 2, 'Standard': 1, 'standard': 1 };
      return (triageScore[b.triage || 'Standard'] || 1) - (triageScore[a.triage || 'Standard'] || 1);
    }
    return 0;
  });

  const currentCalling = queue.find(q => q.status === 'Calling' || q.status === 'calling');
  const nextWaiting = queue.find(q => q.status === 'Waiting' || q.status === 'waiting');

  const handleCallNext = (id: string) => {
    playChime();
    setQueue(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, status: 'Calling' as const };
        }
        if (item.status === 'Calling') {
          return { ...item, status: 'Completed' as const };
        }
        return item;
      })
    );

    const target = queue.find(q => q.id === id);
    if (target) {
      setCalledMessage(`Ticket ${target.ticketNumber} (${target.patientName || target.patient}) — Please proceed to ${selectedRoom}`);
      setTimeout(() => setCalledMessage(null), 6000);
    }
  };

  const handleComplete = (id: string) => {
    setQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Completed' } : item))
    );
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferItem) return;

    setQueue(prev =>
      prev.map(item =>
        item.id === transferItem.id
          ? { ...item, dept: targetDept, waitTime: 5, status: 'Waiting' }
          : item
      )
    );
    setTransferItem(null);
  };

  return (
    <div className="space-y-4">
      
      {/* Header with Room Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            SERREKUNDA GENERAL DISPATCH
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Live Queue Management
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Room Station Picker */}
          <div className="relative">
            <button
              onClick={() => setShowRoomSelector(!showRoomSelector)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EBEE] text-xs font-bold text-[#172B3A] flex items-center gap-1.5 shadow-2xs hover:bg-[#F5F9FA] transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#087F8C]" />
              <span className="truncate max-w-[140px] sm:max-w-[180px]">{selectedRoom}</span>
              <ChevronDown className="w-3 h-3 text-[#6C8290]" />
            </button>

            {showRoomSelector && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#E3EBEE] p-1.5 z-30 animate-in fade-in">
                <span className="text-[10px] uppercase font-bold text-[#6C8290] px-2.5 py-1 block">
                  Select Active Station
                </span>
                {availableRooms.map((room) => (
                  <button
                    key={room}
                    onClick={() => {
                      setSelectedRoom(room);
                      setShowRoomSelector(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedRoom === room
                        ? 'bg-[#E4F3F4] text-[#087F8C]'
                        : 'text-[#172B3A] hover:bg-[#F5F9FA]'
                    }`}
                  >
                    <span>{room}</span>
                    {selectedRoom === room && <CheckCircle2 className="w-3.5 h-3.5 text-[#087F8C]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenTriage}
            className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Walk-in Triage</span>
          </button>
        </div>
      </div>

      {/* PA System Announcement Alert */}
      {calledMessage && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#087F8C] to-[#066670] text-white flex items-center justify-between text-xs font-bold animate-in fade-in shadow-md gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <Volume2 className="w-4 h-4 animate-bounce shrink-0" />
            <span className="truncate">PA Announcement: {calledMessage}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] shrink-0 font-mono">
            Broadcasting
          </span>
        </div>
      )}

      {/* Active Calling Hero Box */}
      {currentCalling ? (
        <div
          className="p-4 sm:p-5 rounded-3xl text-white shadow-lg relative overflow-hidden space-y-3 border border-slate-700"
          style={{ background: 'linear-gradient(135deg, #172B3A 0%, #1D3A4E 60%, #087F8C 100%)' }}
        >
          {/* Subtle Background Glow */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-teal-400/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                  CURRENT CALLING IN {selectedRoom.toUpperCase()}
                </span>
                <span className="text-[10px] text-teal-100/80 font-medium">
                  Called just now
                </span>
              </div>

              <div className="flex items-baseline gap-3 my-1">
                <span className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {currentCalling.ticketNumber}
                </span>
                <span className="text-base sm:text-lg font-bold text-white truncate">
                  {currentCalling.patientName || currentCalling.patient}
                </span>
              </div>

              <p className="text-xs text-teal-100 font-medium flex items-center gap-2">
                <span>Dept: <strong className="text-white">{currentCalling.dept}</strong></span>
                <span>·</span>
                <span>Wait was: {currentCalling.wait || `${currentCalling.waitTime}m`}</span>
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                currentCalling.triage === 'emergency' || currentCalling.triage === 'Emergency'
                  ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                  : currentCalling.triage === 'priority' || currentCalling.triage === 'Priority'
                  ? 'bg-amber-400 text-slate-900 font-extrabold'
                  : 'bg-[#2E9B68] text-white'
              }`}>
                {currentCalling.triage || 'Priority Triage'}
              </span>

              <span className="text-[11px] font-mono text-teal-200 bg-white/10 px-2 py-0.5 rounded-md">
                Desk Station #02
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-2 relative z-10">
            <button
              onClick={() => handleCallNext(currentCalling.id)}
              className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-teal-300" />
              <span>Re-Broadcast Audio</span>
            </button>
            
            <button
              onClick={() => setTransferItem(currentCalling)}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-teal-200" />
              <span>Transfer Dept</span>
            </button>

            <button
              onClick={() => handleComplete(currentCalling.id)}
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#2E9B68] to-emerald-600 hover:from-[#258257] hover:to-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-900/30 active:scale-[0.98] cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Finish & Discharge</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-white border border-[#E3EBEE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-3 text-[#6C8290]">
            <div className="w-9 h-9 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs font-bold text-[#172B3A] block">
                {selectedRoom} is Ready
              </strong>
              <span className="text-[11px] text-[#6C8290]">
                No patient currently in examination. Call next waiting ticket below.
              </span>
            </div>
          </div>

          {nextWaiting && (
            <button
              onClick={() => handleCallNext(nextWaiting.id)}
              className="px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Call Next: {nextWaiting.ticketNumber} ({nextWaiting.patientName || nextWaiting.patient})</span>
            </button>
          )}
        </div>
      )}

      {/* Dept Filter Tabs & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDept(d)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeDept === d
                  ? 'bg-[#172B3A] text-white shadow-xs'
                  : 'bg-white text-[#6C8290] border border-[#E3EBEE] hover:text-[#172B3A]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-[#6C8290] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search queue..."
              className="pl-8 pr-3 py-1 rounded-xl bg-white border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] w-full sm:w-40 shadow-2xs placeholder-[#6C8290]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6C8290]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1 rounded-xl bg-white border border-[#E3EBEE] text-[11px] font-bold text-[#172B3A] focus:outline-hidden focus:border-[#087F8C] cursor-pointer shadow-2xs"
            >
              <option value="ticket">Ticket Order</option>
              <option value="alphabetical-asc">Patient (A → Z)</option>
              <option value="alphabetical-desc">Patient (Z → A)</option>
              <option value="dept">Department</option>
              <option value="waitTime">Longest Wait</option>
              <option value="triage">Emergency / Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Live Queue Cards */}
      <div className="space-y-2.5">
        {filteredQueue.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-3xl bg-white border transition-all shadow-2xs flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-3 ${
              item.status === 'Calling' || item.status === 'calling'
                ? 'border-[#087F8C] ring-2 ring-[#087F8C]/20 bg-[#E4F3F4]/20'
                : item.status === 'Completed' || item.status === 'completed'
                ? 'border-[#E3EBEE] opacity-50 bg-[#F5F9FA]'
                : 'border-[#E3EBEE]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-heading font-black text-sm shrink-0 ${
                item.status === 'Calling' || item.status === 'calling'
                  ? 'bg-[#087F8C] text-white border-[#087F8C]'
                  : 'bg-[#F5F9FA] border-[#E3EBEE] text-[#172B3A]'
              }`}>
                {item.ticketNumber}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong className="text-xs font-bold text-[#172B3A] truncate max-w-full">
                    {item.patientName || item.patient}
                  </strong>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                    item.triage === 'Emergency' || item.triage === 'emergency'
                      ? 'bg-rose-100 text-[#D9534F]'
                      : item.triage === 'Priority' || item.triage === 'priority'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-teal-50 text-[#087F8C]'
                  }`}>
                    {item.triage || 'Standard'}
                  </span>
                </div>

                <span className="text-[11px] text-[#6C8290] block mt-0.5 truncate">
                  Dept: {item.dept} · Wait: {item.wait || `${item.waitTime}m`}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 min-[480px]:pt-0 border-t min-[480px]:border-t-0 border-[#E3EBEE] shrink-0">
              <button
                onClick={() => setTransferItem(item)}
                className="p-2 rounded-xl text-[#6C8290] hover:bg-[#F5F9FA] hover:text-[#172B3A] active:scale-95 transition-colors cursor-pointer"
                title="Transfer department"
                aria-label="Transfer department"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              {(item.status === 'Waiting' || item.status === 'waiting') && (
                <button
                  onClick={() => handleCallNext(item.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Call to {selectedRoom.split(' ')[0]}</span>
                </button>
              )}

              {(item.status === 'Calling' || item.status === 'calling') && (
                <button
                  onClick={() => handleComplete(item.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2E9B68] hover:bg-[#258257] active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Finish</span>
                </button>
              )}

              {(item.status === 'Completed' || item.status === 'completed') && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
                  Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Department Modal */}
      {transferItem && (
        <div className="fixed inset-0 z-50 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <h3 className="text-base font-bold font-heading text-[#172B3A]">
                Transfer Patient
              </h3>
              <button
                onClick={() => setTransferItem(null)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-4 mt-4">
              <div className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] text-xs">
                <span className="text-[#6C8290] block">Selected Patient:</span>
                <strong className="text-sm font-bold text-[#172B3A] block truncate">
                  {transferItem.ticketNumber} — {transferItem.patientName || transferItem.patient}
                </strong>
                <span className="text-[#6C8290] block mt-0.5">Current: {transferItem.dept}</span>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                  Destination Department
                </label>
                <select
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-bold text-[#172B3A] bg-white focus:outline-hidden focus:border-[#087F8C]"
                >
                  <option value="Pharmacy">Pharmacy Dispensing</option>
                  <option value="Laboratory">Central Laboratory / Phlebotomy</option>
                  <option value="General OPD">General OPD</option>
                  <option value="Maternity">Maternity & Antenatal</option>
                  <option value="Emergency">Emergency Resuscitation</option>
                  <option value="Pediatrics">Pediatric Ward</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTransferItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C8290] hover:bg-[#F5F9FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

