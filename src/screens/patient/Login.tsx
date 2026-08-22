import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  User, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Info,
  HeartHandshake,
  AlertTriangle,
  Building2,
  HelpCircle
} from 'lucide-react';
import { NexaLogo } from '../../components/NexaLogo';

interface LoginProps {
  onBack: () => void;
  onSubmit: (name: string, phone: string, isDemo?: boolean) => void;
  onSwitchToSignup: () => void;
  onGuest: () => void;
  onGuestDemo?: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onBack,
  onSubmit,
  onSwitchToSignup,
  onGuest,
  onGuestDemo
}) => {
  // Login method: 'password' or 'otp'
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  
  // Credentials state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(45);

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Quick Demo Accounts for testing
  const demoAccounts = [
    {
      name: 'Ousman Bah',
      phone: '+220 701 4455',
      id: 'NC-GM-08841',
      role: 'Patient (General Care)',
      loc: 'Banjul / KMC',
      icon: User,
      color: 'bg-[#087F8C] text-white',
      badge: 'Patient'
    },
    {
      name: 'Binta Sanyang',
      phone: '+220 345 6789',
      id: 'NC-GM-06210',
      role: 'Maternity & Child Health',
      loc: 'Sukuta Health Centre',
      icon: HeartHandshake,
      color: 'bg-emerald-600 text-white',
      badge: 'Maternity'
    },
    {
      name: 'Dr. Fatou Ceesay',
      phone: '+220 439 5678',
      id: 'DOC-GM-011',
      role: 'Senior Medical Officer',
      loc: 'Serekunda General Hospital',
      icon: Stethoscope,
      color: 'bg-indigo-600 text-white',
      badge: 'Physician'
    },
    {
      name: 'Modou Gaye',
      phone: '+220 988 1234',
      id: 'STAFF-GM-04',
      role: 'Triage Desk Attendant',
      loc: 'EFSTH Banjul',
      icon: Building2,
      color: 'bg-amber-600 text-white',
      badge: 'Staff'
    }
  ];

  // Gambian network detection helper
  const detectCarrier = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.includes('2207') || clean.startsWith('7')) return { name: 'Africell', color: 'bg-purple-100 text-purple-700 border-purple-200' };
    if (clean.includes('2203') || clean.startsWith('3')) return { name: 'QCell', color: 'bg-orange-100 text-orange-700 border-orange-200' };
    if (clean.includes('2209') || clean.startsWith('9')) return { name: 'Gamcel', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (clean.includes('2206') || clean.startsWith('6')) return { name: 'Comium', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    return null;
  };

  const carrier = detectCarrier(identifier);

  const handleSelectDemo = (account: typeof demoAccounts[0]) => {
    setIdentifier(account.phone);
    setPassword('demoPass2026');
    onSubmit(account.name, account.phone, true);
  };

  const handleSubmitPasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedDemo = demoAccounts.find(a => a.phone === identifier.trim() || a.id.toLowerCase() === identifier.trim().toLowerCase());
    if (matchedDemo) {
      onSubmit(matchedDemo.name, matchedDemo.phone, true);
    } else {
      const enteredName = identifier.trim() || 'New Patient';
      onSubmit(enteredName, identifier.trim() || '+220 700 0000', false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setOtpTimer(45);
  };

  const handleVerifyOtp = () => {
    const matchedDemo = demoAccounts.find(a => a.phone === identifier.trim());
    if (matchedDemo) {
      onSubmit(matchedDemo.name, matchedDemo.phone, true);
    } else {
      onSubmit(identifier.trim() || 'Verified User', identifier.trim() || '+220 700 0000', false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setForgotModalOpen(false);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 min-h-[640px] flex flex-col justify-between max-w-md mx-auto">
      
      {/* Top Header & Friendly Greeting */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] shadow-2xs hover:bg-[#F5F9FA] active:scale-95 transition-all cursor-pointer"
            title="Go back"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <NexaLogo size="sm" showSubtitle={false} />

          <button
            onClick={onGuest}
            className="px-2.5 py-1 rounded-full bg-[#E4F3F4] text-xs font-bold text-[#087F8C] hover:bg-teal-100 transition-colors cursor-pointer"
          >
            Guest Pass
          </button>
        </div>

        {/* Welcome Text with Friendly Gambian Motif */}
        <div className="mb-4 text-center sm:text-left bg-gradient-to-r from-[#F5F9FA] to-white p-3.5 rounded-2xl border border-[#E3EBEE]">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start mb-0.5">
            <span className="text-sm">🇬🇲</span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#087F8C]">NexaCare Gambia</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-[#172B3A]">
            Welcome Back!
          </h2>
          <p className="text-xs text-[#6C8290] mt-0.5 leading-relaxed">
            Sign in to check live queue numbers, digital prescriptions, or book hospital visits.
          </p>
        </div>

        {/* Auth Method Toggle (Password vs SMS OTP) */}
        <div className="grid grid-cols-2 p-1 bg-[#F5F9FA] rounded-2xl border border-[#E3EBEE] mb-4">
          <button
            type="button"
            onClick={() => {
              setLoginMethod('password');
              setOtpSent(false);
            }}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMethod === 'password'
                ? 'bg-white text-[#172B3A] shadow-xs'
                : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>Password / ID</span>
          </button>
          
          <button
            type="button"
            onClick={() => setLoginMethod('otp')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMethod === 'otp'
                ? 'bg-white text-[#172B3A] shadow-xs'
                : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>SMS Passcode</span>
          </button>
        </div>

        {/* Standard Phone & Password Form */}
        {loginMethod === 'password' && (
          <form onSubmit={handleSubmitPasswordLogin} className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#6C8290]">
                  Gambia Phone or Health ID
                </label>
                {carrier && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${carrier.color}`}>
                    {carrier.name} Detected
                  </span>
                )}
              </div>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="+220 7XX XXXX or NC-GM-08841"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-semibold text-[#172B3A] placeholder-[#6C8290]/50 focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/15 focus:outline-hidden transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#6C8290]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-bold text-[#087F8C] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-semibold text-[#172B3A] placeholder-[#6C8290]/50 focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/15 focus:outline-hidden transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C8290] hover:text-[#172B3A] cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-xs text-[#6C8290] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087F8C] focus:ring-[#087F8C] border-gray-300 accent-[#087F8C]"
                />
                <span>Keep me logged in</span>
              </label>
              <span className="text-[11px] text-[#2E9B68] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit Encrypted</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 rounded-2xl bg-[#087F8C] hover:bg-[#066670] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#087F8C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Log in to NexaCare</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* SMS OTP Verification Form */}
        {loginMethod === 'otp' && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#6C8290]">
                      Gambia Mobile Number
                    </label>
                    {carrier && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${carrier.color}`}>
                        {carrier.name}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+220 701 4455"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-[#E3EBEE] bg-white text-xs font-semibold text-[#172B3A] placeholder-[#6C8290]/50 focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/15 focus:outline-hidden transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#E4F3F4] text-[#066670] text-xs flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
                  <span>Instant SMS login code will be sent to your phone. Works across Africell, QCell, Gamcel, and Comium.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 rounded-2xl bg-[#087F8C] hover:bg-[#066670] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#087F8C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send 4-Digit SMS Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Code sent to <strong>{identifier}</strong></span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setOtpCode(['2', '2', '0', '4'])}
                    className="font-mono text-[11px] font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title="Click to fill demo code"
                  >
                    Auto-Fill: 2204
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6C8290] mb-2 text-center">
                    Enter 4-Digit SMS Code
                  </label>
                  <div className="flex justify-center gap-2.5 sm:gap-3">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-12 h-12 text-center text-xl font-black font-heading rounded-2xl border border-[#E3EBEE] bg-white text-[#172B3A] focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/20 focus:outline-hidden shadow-xs"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6C8290]">
                  <span>Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(true);
                      setOtpCode(['2', '2', '0', '4']);
                    }}
                    className="font-bold text-[#087F8C] hover:underline cursor-pointer"
                  >
                    Resend Code ({otpTimer}s)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-3 sm:py-3.5 rounded-2xl bg-[#2E9B68] hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Access Account</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 1-Click Demo Profiles (Clean & Friendly) */}
        <div className="mt-4 pt-3.5 border-t border-[#E3EBEE]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6C8290] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Fast 1-Click Demo Accounts</span>
            </span>
            <span className="text-[10px] text-[#087F8C] font-semibold">Instant Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.name}
                  type="button"
                  onClick={() => handleSelectDemo(account)}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#F5F9FA] hover:bg-[#E4F3F4] active:scale-[0.98] border border-[#E3EBEE] hover:border-[#087F8C] transition-all flex items-center justify-between text-left cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-7 h-7 rounded-lg ${account.color} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#172B3A] group-hover:text-[#087F8C] truncate">
                        {account.name}
                      </div>
                      <div className="text-[10px] text-[#6C8290] truncate">
                        {account.badge} · {account.loc.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#087F8C] shrink-0 bg-white px-1.5 py-0.5 rounded border border-[#E3EBEE]">
                    Login
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Switcher & Emergency Shortcut */}
      <div className="pt-3 border-t border-[#E3EBEE] mt-3 space-y-2 text-center">
        <p className="text-xs text-[#6C8290]">
          New to NexaCare Gambia?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-[#087F8C] font-bold hover:underline cursor-pointer ml-1"
          >
            Create an Account
          </button>
        </p>

        {/* Emergency Bypass Notice */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#D9534F] font-semibold bg-rose-50/80 py-1.5 px-3 rounded-xl border border-rose-100">
          <AlertTriangle className="w-3.5 h-3.5 text-[#D9534F] shrink-0" />
          <span>Medical emergency? Call <strong>1166</strong> or <strong>118</strong> immediately.</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95 space-y-4">
            <h3 className="text-base font-bold font-heading text-[#172B3A]">
              Reset Account Password
            </h3>
            <p className="text-xs text-[#6C8290] leading-relaxed">
              Enter your registered Gambian mobile number. We will send a secure password reset link and temporary PIN via SMS gateway.
            </p>

            {resetSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Reset SMS PIN sent successfully! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    placeholder="+220 701 4455"
                    className="w-full p-2.5 rounded-xl border border-[#E3EBEE] text-xs font-semibold text-[#172B3A] focus:border-[#087F8C] focus:outline-hidden"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C8290] hover:bg-[#F5F9FA] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Send Reset SMS
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
