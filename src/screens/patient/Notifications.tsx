import React, { useState } from 'react';
import { ChevronLeft, Bell, MessageSquare, Check, Trash2 } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Queue Alert: Only 2 Patients Ahead',
      desc: 'Your ticket A-042 at Serrekunda General OPD is nearing its turn. Please report to Room 4.',
      time: '12 mins ago',
      read: false,
      type: 'queue'
    },
    {
      id: '2',
      title: 'Appointment Reminder Tomorrow',
      desc: 'Upcoming consultation with Dr. Fatou Ceesay at 10:30 AM.',
      time: '2 hours ago',
      read: false,
      type: 'appointment'
    },
    {
      id: '3',
      title: 'Lab Result Ready: Full Blood Count',
      desc: 'EFSTH Central Laboratory has uploaded your latest verified lab panel.',
      time: 'Yesterday',
      read: true,
      type: 'lab'
    },
    {
      id: '4',
      title: 'Blood Bank Emergency Request',
      desc: 'Urgent need for O- blood at Brikama District Hospital for maternal surgery.',
      time: '2 days ago',
      read: true,
      type: 'blood'
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold font-heading text-[#172B3A]">
              Notifications & Alerts
            </h2>
            <p className="text-xs text-[#6C8290]">Live queue pings & clinic reminders</p>
          </div>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-[#087F8C] hover:underline"
        >
          Mark all read
        </button>
      </div>

      <div className="space-y-2.5">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all shadow-xs ${
              n.read
                ? 'bg-white border-[#E3EBEE] opacity-80'
                : 'bg-white border-[#087F8C]/40 ring-1 ring-[#087F8C]/10'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  n.read ? 'bg-transparent' : 'bg-[#087F8C]'
                }`} />
                <div>
                  <strong className="text-xs font-bold text-[#172B3A] block">
                    {n.title}
                  </strong>
                  <p className="text-[11px] text-[#6C8290] mt-0.5 leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-[#6C8290] whitespace-nowrap">{n.time}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
