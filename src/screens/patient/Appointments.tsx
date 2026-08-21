import React, { useState } from 'react';
import { Appointment } from '../../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  CheckCircle2, 
  Plus, 
  ChevronRight,
  Star,
  X,
  AlertCircle,
  CalendarCheck,
  RotateCcw
} from 'lucide-react';

interface AppointmentsProps {
  appointments: { upcoming: Appointment[]; past: Appointment[] };
  onJoinEvisit: (appointment: Appointment) => void;
  onBookNew: () => void;
  onReschedule?: (id: string, newDate: string, newTime: string) => void;
  onCancel?: (id: string) => void;
  onRateAppointment?: (id: string, rating: number, comment: string) => void;
}

export const Appointments: React.FC<AppointmentsProps> = ({
  appointments,
  onJoinEvisit,
  onBookNew,
  onReschedule,
  onCancel,
  onRateAppointment
}) => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [ratingModalAppt, setRatingModalAppt] = useState<Appointment | null>(null);
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  
  const [rescheduleModalAppt, setRescheduleModalAppt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState<string>('Tomorrow, 2:30 PM');

  const list = appointments[tab];

  const getInitials = (name: string) =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('');

  const submitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingModalAppt && onRateAppointment) {
      onRateAppointment(ratingModalAppt.id, selectedStars, reviewComment);
    }
    setRatingModalAppt(null);
    setReviewComment('');
  };

  const submitReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleModalAppt && onReschedule) {
      const parts = newDate.split(',');
      onReschedule(rescheduleModalAppt.id, parts[0] || newDate, parts[1] || '11:00 AM');
    }
    setRescheduleModalAppt(null);
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            CLINICAL SCHEDULE
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Consultations & Visits
          </h2>
        </div>

        <button
          onClick={onBookNew}
          className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Book Slot</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-white rounded-2xl border border-[#E3EBEE] shadow-2xs">
        <button
          onClick={() => setTab('upcoming')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            tab === 'upcoming'
              ? 'bg-[#087F8C] text-white shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          Upcoming ({appointments.upcoming.length})
        </button>
        <button
          onClick={() => setTab('past')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            tab === 'past'
              ? 'bg-[#087F8C] text-white shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          Past Visits ({appointments.past.length})
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="space-y-3">
        {list.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E3EBEE] p-6 shadow-2xs">
            <Calendar className="w-8 h-8 text-[#6C8290] mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold text-[#172B3A]">No {tab} appointments</p>
            <p className="text-[11px] text-[#6C8290] mt-0.5">Book a consultation with a doctor anytime</p>
          </div>
        ) : (
          list.map((a) => (
            <div
              key={a.id}
              className="p-4 rounded-3xl bg-white border border-[#E3EBEE] shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#087F8C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {getInitials(a.doctor)}
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#172B3A] block">
                      {a.doctor}
                    </strong>
                    <span className="text-[11px] text-[#6C8290] block">{a.hospital}</span>
                    {a.specialty && (
                      <span className="text-[10px] text-[#087F8C] font-semibold block mt-0.5">
                        {a.specialty}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-col items-end">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      a.type === 'E-Visit'
                        ? 'bg-[#E8F6EF] text-[#2E9B68]'
                        : 'bg-[#EAF2F9] text-[#4F8FC0]'
                    }`}
                  >
                    {a.type}
                  </span>
                  <span className="text-[10px] text-[#6C8290] font-medium">{a.status}</span>
                </div>
              </div>

              {/* Date & Time info pill */}
              <div className="p-2.5 rounded-xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-[#172B3A]">
                  <Calendar className="w-3.5 h-3.5 text-[#087F8C]" />
                  {a.date}
                </span>
                <span className="flex items-center gap-1.5 text-[#6C8290] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {a.time}
                </span>
              </div>

              {/* Past Review Status */}
              {tab === 'past' && a.rating && (
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs space-y-1">
                  <div className="flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= a.rating! ? 'fill-amber-500 text-amber-500' : 'text-amber-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{a.rating} / 5 Rating</span>
                  </div>
                  {a.reviewComment && (
                    <p className="text-[11px] text-[#172B3A] italic">
                      "{a.reviewComment}"
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between text-xs">
                {tab === 'upcoming' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setRescheduleModalAppt(a);
                          setNewDate('Tomorrow, 10:30 AM');
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-[#E3EBEE] hover:bg-[#F5F9FA] text-[#6C8290] hover:text-[#172B3A] font-bold text-xs transition-colors cursor-pointer"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => onCancel?.(a.id)}
                        className="px-2.5 py-1.5 rounded-xl border border-rose-100 hover:bg-rose-50 text-[#D9534F] font-bold text-xs transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    {a.type === 'E-Visit' ? (
                      <button
                        onClick={() => onJoinEvisit(a)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Video Room</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#6C8290] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9B68]" />
                        Reception Check-in Ready
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-[11px] text-[#6C8290]">
                      Completed Consultation
                    </span>
                    <button
                      onClick={() => {
                        setRatingModalAppt(a);
                        setSelectedStars(a.rating || 5);
                        setReviewComment(a.reviewComment || '');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>{a.rating ? 'Edit Review' : 'Rate Visit'}</span>
                    </button>
                  </>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Rating & Review Modal */}
      {ratingModalAppt && (
        <div className="fixed inset-0 z-50 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <div>
                <h3 className="text-base font-bold font-heading text-[#172B3A]">
                  Rate Your Consultation
                </h3>
                <p className="text-xs text-[#6C8290]">{ratingModalAppt.doctor}</p>
              </div>
              <button
                onClick={() => setRatingModalAppt(null)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitRating} className="space-y-4 mt-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#172B3A] block">
                  How was your experience?
                </span>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedStars(star)}
                      className="p-1.5 rounded-xl hover:bg-[#F5F9FA] transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= selectedStars
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6C8290] uppercase tracking-wider block mb-1">
                  Comments or Feedback (Optional)
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share feedback on punctuality, clarity of advice, or care quality..."
                  className="w-full p-3 rounded-2xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRatingModalAppt(null)}
                  className="px-4 py-2 rounded-xl bg-[#F5F9FA] text-[#172B3A] text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalAppt && (
        <div className="fixed inset-0 z-50 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <div>
                <h3 className="text-base font-bold font-heading text-[#172B3A]">
                  Reschedule Appointment
                </h3>
                <p className="text-xs text-[#6C8290]">{rescheduleModalAppt.doctor}</p>
              </div>
              <button
                onClick={() => setRescheduleModalAppt(null)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitReschedule} className="space-y-4 mt-4">
              <div>
                <label className="text-[11px] font-bold text-[#6C8290] uppercase tracking-wider block mb-1">
                  Select New Date & Time
                </label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] bg-white"
                >
                  <option value="Tomorrow, 10:00 AM">Tomorrow · 10:00 AM</option>
                  <option value="Tomorrow, 2:30 PM">Tomorrow · 2:30 PM</option>
                  <option value="Fri 21 Aug, 11:15 AM">Fri, 21 Aug · 11:15 AM</option>
                  <option value="Mon 24 Aug, 9:00 AM">Mon, 24 Aug · 9:00 AM</option>
                  <option value="Tue 25 Aug, 3:00 PM">Tue, 25 Aug · 3:00 PM</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalAppt(null)}
                  className="px-4 py-2 rounded-xl bg-[#F5F9FA] text-[#172B3A] text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
