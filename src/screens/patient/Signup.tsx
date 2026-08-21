import React, { useState } from 'react';
import { ChevronLeft, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';

interface SignupProps {
  mode: 'signup' | 'login';
  onBack: () => void;
  onSubmit: (name: string, phone: string) => void;
  onSwitchMode: (newMode: 'signup' | 'login') => void;
}

export const Signup: React.FC<SignupProps> = ({
  mode,
  onBack,
  onSubmit,
  onSwitchMode
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name.trim() || 'Patient', phone.trim() || '+220 700 0000');
  };

  return (
    <div className="p-4 sm:p-6 min-h-[600px] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-xs hover:bg-[#F5F9FA] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold font-heading text-[#172B3A]">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-xs text-[#6C8290]">
              {mode === 'signup' ? 'Join NexaCare in seconds' : 'Log in to continue'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#6C8290] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Awa Jallow or Ousman Bah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-semibold text-[#172B3A] placeholder-[#6C8290]/50 focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#6C8290] mb-1.5">
              Phone Number (Gambia)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="+220 7XX XXXX or 9XX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-semibold text-[#172B3A] placeholder-[#6C8290]/50 focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6C8290] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-semibold text-[#172B3A] placeholder-[#6C8290]/50 focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C8290] hover:text-[#172B3A]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                className="text-xs font-semibold text-[#087F8C] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs shadow-md shadow-[#087F8C]/20 transition-all cursor-pointer"
            >
              {mode === 'signup' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </form>
      </div>

      <div className="text-center pt-6 pb-2">
        {mode === 'signup' ? (
          <p className="text-xs text-[#6C8290]">
            Already have an account?{' '}
            <button
              onClick={() => onSwitchMode('login')}
              className="text-[#087F8C] font-bold hover:underline"
            >
              Log in
            </button>
          </p>
        ) : (
          <p className="text-xs text-[#6C8290]">
            New to NEXACARE?{' '}
            <button
              onClick={() => onSwitchMode('signup')}
              className="text-[#087F8C] font-bold hover:underline"
            >
              Create an account
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
