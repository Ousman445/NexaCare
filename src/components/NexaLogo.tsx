import React from 'react';
import { Activity } from 'lucide-react';

interface NexaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  theme?: 'dark' | 'light';
}

export const NexaLogo: React.FC<NexaLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  theme = 'light'
}) => {
  const iconSizes = {
    sm: 'w-6 h-6 rounded-lg',
    md: 'w-8 h-8 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  const svgSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base font-extrabold',
    lg: 'text-2xl font-black'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2.5">
        <div
          className={`${iconSizes[size]} flex items-center justify-center shadow-md shadow-teal-700/20 text-white`}
          style={{ background: 'linear-gradient(135deg, #087F8C, #4F8FC0)' }}
        >
          <Activity className={`${svgSizes[size]} stroke-[2.2]`} />
        </div>
        <div className="leading-tight">
          <span
            className={`${textSizes[size]} tracking-tight font-heading font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-[#172B3A]'
            }`}
          >
            NexaCare
          </span>
        </div>
      </div>
      {showSubtitle && (
        <small
          className={`text-[11px] font-medium tracking-wide mt-0.5 ${
            theme === 'dark' ? 'text-slate-400' : 'text-[#6C8290]'
          }`}
        >
          Less waiting. Better care.
        </small>
      )}
    </div>
  );
};
