import React from 'react';
import { ChevronRight, Sparkles, User, ShieldCheck } from 'lucide-react';
import { NexaLogo } from '../../components/NexaLogo';

interface WelcomeProps {
  onSignup: () => void;
  onLogin: () => void;
  onGuest: () => void;
  onGuestDemo?: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onSignup, onLogin, onGuest, onGuestDemo }) => {
  return (
    <div className="flex flex-col justify-between min-h-[600px] p-6 text-center max-w-sm mx-auto">
      <div className="pt-10 sm:pt-12 flex flex-col items-center">
        
        {/* Flag badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E4F3F4] text-[#087F8C] text-xs font-extrabold tracking-wide">
            <span>🇬🇲</span>
            <span>The Gambia's Health Network</span>
          </span>
        </div>

        {/* Centered NexaCare Logo & Brand */}
        <div className="flex flex-col items-center justify-center">
          <NexaLogo size="lg" showSubtitle={true} />
          <p className="text-xs text-[#6C8290] mt-3 max-w-xs leading-relaxed">
            Smart hospital queues, verified pharmacies & digital care for The Gambia.
          </p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pb-4 w-full pt-6">
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-2xl bg-[#087F8C] hover:bg-[#066670] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-[#087F8C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Log In</span>
        </button>

        <button
          onClick={onSignup}
          className="w-full py-3.5 rounded-2xl bg-white hover:bg-[#F5F9FA] active:scale-[0.98] text-[#172B3A] font-bold text-sm border border-[#E3EBEE] transition-all cursor-pointer shadow-2xs"
        >
          Create an Account
        </button>

        <div className="pt-1 flex flex-col gap-2">
          <button
            onClick={onGuest}
            className="w-full py-2.5 rounded-xl bg-[#F5F9FA] hover:bg-[#EEF4F6] text-xs font-bold text-[#172B3A] border border-[#E3EBEE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-[#6C8290]" />
            <span>Continue as Guest (Clean Slate)</span>
          </button>

          {onGuestDemo && (
            <button
              onClick={onGuestDemo}
              className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-xs font-bold text-[#087F8C] border border-teal-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Explore as Guest Demo (With Sample Data)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

