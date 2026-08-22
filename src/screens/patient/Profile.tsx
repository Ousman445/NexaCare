import React, { useState } from 'react';
import { PaymentMethod } from '../../types';
import { PAYMENT_METHOD_OPTIONS } from '../../store';
import { 
  User, 
  Phone, 
  Mail,
  MapPin, 
  ShieldCheck, 
  Heart, 
  AlertTriangle, 
  Activity, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  QrCode, 
  Download, 
  CheckCircle2, 
  Building2, 
  Stethoscope, 
  Globe, 
  Lock, 
  Smartphone, 
  Rocket, 
  LogOut, 
  Copy, 
  Check,
  CreditCard,
  Shield,
  ChevronDown,
  Wallet,
  Landmark,
  Banknote,
  Coins,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary?: boolean;
}

interface ProfileProps {
  userName: string;
  userPhone: string;
  preferredPaymentMethod?: PaymentMethod;
  onUpdatePreferredPaymentMethod?: (method: PaymentMethod) => void;
  onOpenRoadmap: () => void;
  onLogout: () => void;
  onNavigate?: (screen: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  userName: initialUserName,
  userPhone: initialUserPhone,
  preferredPaymentMethod = 'Wave',
  onUpdatePreferredPaymentMethod,
  onOpenRoadmap,
  onLogout
}) => {
  // Personal Details state (editable)
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [name, setName] = useState(initialUserName && initialUserName !== 'Guest User' ? initialUserName : 'Ousman Jobe');
  const [phone, setPhone] = useState(initialUserPhone || '+220 701 4455');
  const [email, setEmail] = useState('jobeousman445@gmail.com');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('Kairaba Avenue, Kanifing Municipality, The Gambia');
  const [nin, setNin] = useState('GM-NIN-9824-0012');

  // Medical ID & Clinical Snapshot
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [bloodType, setBloodType] = useState('O- (Rh Negative)');
  const [allergies, setAllergies] = useState<string[]>(['Penicillin', 'Sulfa Antibiotics', 'NSAIDs (Mild)']);
  const [newAllergy, setNewAllergy] = useState('');
  const [conditions, setConditions] = useState<string[]>(['Mild Hypertension', 'Seasonal Asthma']);
  const [newCondition, setNewCondition] = useState('');
  const [isBloodDonor, setIsBloodDonor] = useState(true);

  // Preferred Payment Method for Pharmacy & Refills
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethod>(preferredPaymentMethod);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [paymentAccountRef, setPaymentAccountRef] = useState(initialUserPhone || '+220 701 4455');
  const [isEditingPaymentRef, setIsEditingPaymentRef] = useState(false);

  // Emergency Contacts state
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: 'ec_1',
      name: 'Fatou Jobe',
      relationship: 'Spouse / Next of Kin',
      phone: '+220 701 4456',
      isPrimary: true
    },
    {
      id: 'ec_2',
      name: 'Lamin Jobe',
      relationship: 'Brother',
      phone: '+220 312 4499',
      isPrimary: false
    }
  ]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactRelation, setContactRelation] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Primary Care Provider Details
  const [primaryHospital] = useState('Kanifing General Hospital');
  const [primaryDoctor] = useState('Dr. Lamin Touray (Family Medicine)');

  // Insurance & Payment Details
  const [nhisNumber] = useState('GM-NHIS-2026-4402');
  const [insuranceStatus] = useState('Active · Valid until Dec 2026');
  const [mobileMoneyProvider] = useState('Africell Money (Afrimoney)');

  // Preferences & Security
  const [language, setLanguage] = useState('English');
  const [ussdSyncEnabled, setUssdSyncEnabled] = useState(true);
  const [emergencyDataAccess, setEmergencyDataAccess] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Digital Health Pass QR Modal
  const [showQrPass, setShowQrPass] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const showToast = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergy.trim()) return;
    setAllergies([...allergies, newAllergy.trim()]);
    setNewAllergy('');
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCondition.trim()) return;
    setConditions([...conditions, newCondition.trim()]);
    setNewCondition('');
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleAddEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;
    const newContact: EmergencyContact = {
      id: `ec_${Date.now()}`,
      name: contactName.trim(),
      relationship: contactRelation.trim() || 'Family',
      phone: contactPhone.trim(),
      isPrimary: emergencyContacts.length === 0
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
    setContactName('');
    setContactRelation('');
    setContactPhone('');
    setIsAddingContact(false);
    showToast('Emergency contact added successfully');
  };

  const handleRemoveContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
    showToast('Emergency contact removed');
  };

  const handleCopyNIN = () => {
    navigator.clipboard.writeText(nin);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getInitials = (n: string) =>
    n.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Toast Notification */}
      {saveSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#172B3A] text-white text-xs font-bold shadow-xl border border-teal-500/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Header with Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3EBEE] pb-4">
        <div>
          <h1 className="text-xl font-bold font-heading text-[#172B3A]">
            Patient Medical Profile & Health ID
          </h1>
          <p className="text-xs text-[#6C8290] mt-0.5">
            Manage your personal Gambian health identity, emergency alert data, allergies, and clinical contacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrPass(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Health Pass</span>
          </button>
        </div>
      </div>

      {/* ================= 1. GAMBIA NATIONAL HEALTH IDENTITY CARD ================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#172B3A] via-[#1F3A4E] to-[#087F8C] text-white shadow-lg relative overflow-hidden">
        {/* Subtle Watermark Texture */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-xl" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-teal-400/10 pointer-events-none blur-lg" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-2xl flex items-center justify-center shadow-inner shrink-0">
              {getInitials(name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading tracking-wide">
                  {name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Citizen
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span>{address}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-mono font-bold text-teal-200 border border-white/10">
                  NIN: {nin}
                </span>
                <button
                  onClick={handleCopyNIN}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy National Identification Number"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Health Stats Banner - with min-w, flex-shrink-0 and wrap safety */}
          <div className="grid grid-cols-3 gap-2 w-full md:w-auto bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 py-1 min-w-[76px]">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Blood</span>
              <span className="text-xs sm:text-sm font-extrabold text-teal-300 whitespace-nowrap">{bloodType.split(' ')[0]}</span>
            </div>
            <div className="text-center px-3 py-1 border-x border-white/10 min-w-[84px]">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Allergies</span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-300 whitespace-nowrap">{allergies.length} Flagged</span>
            </div>
            <div className="text-center px-3 py-1 min-w-[68px]">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Donor</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-300 whitespace-nowrap">{isBloodDonor ? 'Active' : 'No'}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ================= 2. PERSONAL & DEMOGRAPHIC DETAILS (EDITABLE) ================= */}
        <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold font-heading text-[#172B3A]">
                  Personal & Contact Information
                </h3>
              </div>
              <button
                onClick={() => {
                  if (isEditingPersonal) {
                    setIsEditingPersonal(false);
                    showToast('Personal info saved');
                  } else {
                    setIsEditingPersonal(true);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isEditingPersonal 
                    ? 'bg-[#087F8C] text-white hover:bg-[#066670]' 
                    : 'bg-[#F5F9FA] text-[#172B3A] hover:bg-[#E3EBEE]'
                }`}
              >
                {isEditingPersonal ? (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5 text-[#6C8290]" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>

            {isEditingPersonal ? (
              <div className="space-y-3 pt-4 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#6C8290] block mb-1">Phone (Gambia)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#6C8290] block mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6C8290] block mb-1">National ID / NIN</label>
                  <input
                    type="text"
                    value={nin}
                    onChange={(e) => setNin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-mono font-medium"
                  />
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[#E3EBEE] text-xs pt-2">
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                    <User className="w-3.5 h-3.5 text-[#087F8C]" />
                    <span>Full Name</span>
                  </span>
                  <span className="font-bold text-[#172B3A] text-right truncate">{name}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#087F8C]" />
                    <span>Phone</span>
                  </span>
                  <span className="font-bold text-[#172B3A] text-right truncate">{phone}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#087F8C]" />
                    <span>Email</span>
                  </span>
                  <span className="font-bold text-[#172B3A] text-right truncate break-all min-w-0 max-w-[200px] sm:max-w-[240px]">{email}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
                    <span>Address</span>
                  </span>
                  <span className="font-bold text-[#172B3A] text-right min-w-0 max-w-[200px] sm:max-w-[240px] truncate">{address}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#087F8C]" />
                    <span>Gambian NIN</span>
                  </span>
                  <span className="font-mono font-bold text-[#172B3A] text-right truncate">{nin}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= 3. CRITICAL MEDICAL SNAPSHOT & ALLERGY ALERTS ================= */}
        <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold font-heading text-[#172B3A]">
                  Critical Medical ID & Alerts
                </h3>
              </div>
              <button
                onClick={() => {
                  if (isEditingMedical) {
                    setIsEditingMedical(false);
                    showToast('Medical alert profile updated');
                  } else {
                    setIsEditingMedical(true);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isEditingMedical 
                    ? 'bg-[#087F8C] text-white hover:bg-[#066670]' 
                    : 'bg-[#F5F9FA] text-[#172B3A] hover:bg-[#E3EBEE]'
                }`}
              >
                {isEditingMedical ? (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5 text-[#6C8290]" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              
              {/* Blood Type Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#6C8290]">Blood Group (ABO/Rh)</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-extrabold text-[10px]">
                    Emergency Critical
                  </span>
                </div>
                {isEditingMedical ? (
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EBEE] bg-[#F5F9FA] focus:bg-white focus:border-[#087F8C] outline-hidden text-xs font-bold"
                  >
                    <option value="O- (Rh Negative)">O- (Universal Donor)</option>
                    <option value="O+ (Rh Positive)">O+ (Rh Positive)</option>
                    <option value="A- (Rh Negative)">A- (Rh Negative)</option>
                    <option value="A+ (Rh Positive)">A+ (Rh Positive)</option>
                    <option value="B- (Rh Negative)">B- (Rh Negative)</option>
                    <option value="B+ (Rh Positive)">B+ (Rh Positive)</option>
                    <option value="AB- (Rh Negative)">AB- (Rh Negative)</option>
                    <option value="AB+ (Rh Positive)">AB+ (Universal Recipient)</option>
                  </select>
                ) : (
                  <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200/60 flex items-center justify-between">
                    <span className="font-extrabold text-rose-900 text-sm">{bloodType}</span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>
                )}
              </div>

              {/* Known Allergies */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#6C8290]">Known Drug & Food Allergies</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allergies.map((allergy, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold"
                    >
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{allergy}</span>
                      {isEditingMedical && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(idx)}
                          className="hover:text-rose-600 cursor-pointer ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {allergies.length === 0 && (
                    <span className="text-slate-400 text-xs italic">No known allergies recorded</span>
                  )}
                </div>

                {isEditingMedical && (
                  <form onSubmit={handleAddAllergy} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Add allergy (e.g. Aspirin)..."
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] bg-[#F5F9FA] text-xs"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 rounded-lg bg-[#087F8C] text-white text-xs font-bold cursor-pointer hover:bg-[#066670]"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>

              {/* Chronic Conditions */}
              <div>
                <span className="text-[11px] font-bold text-[#6C8290] block mb-1.5">Chronic Conditions</span>
                <div className="flex flex-wrap gap-1.5">
                  {conditions.map((cond, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EAF2F9] text-[#1F3A4E] border border-[#CADAE8] text-[11px] font-bold"
                    >
                      <Activity className="w-3 h-3 text-[#087F8C] shrink-0" />
                      <span>{cond}</span>
                      {isEditingMedical && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCondition(idx)}
                          className="hover:text-rose-600 cursor-pointer ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {isEditingMedical && (
                  <form onSubmit={handleAddCondition} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Add condition..."
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] bg-[#F5F9FA] text-xs"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 rounded-lg bg-[#087F8C] text-white text-xs font-bold cursor-pointer hover:bg-[#066670]"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>

              {/* Donor Consents */}
              <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-[#172B3A]">Voluntary Blood Donor</span>
                </div>
                <input
                  type="checkbox"
                  checked={isBloodDonor}
                  onChange={(e) => setIsBloodDonor(e.target.checked)}
                  className="w-4 h-4 accent-[#087F8C] rounded cursor-pointer"
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 4. EMERGENCY CONTACTS & NEXT OF KIN ================= */}
        <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-heading text-[#172B3A]">
                  Next of Kin & Emergency Contacts
                </h3>
                <span className="text-[10px] text-[#6C8290]">Notified automatically during ambulance dispatch</span>
              </div>
            </div>
            <button
              onClick={() => setIsAddingContact(!isAddingContact)}
              className="px-2.5 py-1 rounded-xl bg-[#F5F9FA] hover:bg-[#E4F3F4] text-[#087F8C] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border border-[#E3EBEE]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Add Contact Inline Form */}
          {isAddingContact && (
            <form onSubmit={handleAddEmergencyContact} className="p-3 my-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] space-y-2 text-xs">
              <div className="font-bold text-[#172B3A]">Add Emergency Contact</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] bg-white text-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="Relationship (e.g. Sister)"
                  value={contactRelation}
                  onChange={(e) => setContactRelation(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Phone (+220...)"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] bg-white text-xs"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingContact(false)}
                  className="px-3 py-1 rounded-lg text-xs text-[#6C8290] hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold cursor-pointer"
                >
                  Save Contact
                </button>
              </div>
            </form>
          )}

          {/* Contact List */}
          <div className="divide-y divide-[#E3EBEE] pt-1">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#E4F3F4] text-[#087F8C] font-bold text-xs flex items-center justify-center shrink-0">
                    {getInitials(contact.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#172B3A] truncate">{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#E8F6EF] text-[#2E9B68] shrink-0">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6C8290] truncate">
                      {contact.relationship} · <span className="font-mono text-[#172B3A] font-semibold">{contact.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="p-1.5 rounded-lg bg-[#E8F6EF] hover:bg-[#d5eedf] text-[#2E9B68] transition-colors cursor-pointer"
                    title="Call Contact"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-1.5 rounded-lg text-[#6C8290] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove Contact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 5. HEALTH INSURANCE & PRIMARY HEALTHCARE POST ================= */}
        <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F6EF] text-[#2E9B68] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-heading text-[#172B3A]">
                Healthcare Coverage & Primary Facility
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68] shrink-0">
              Active Cover
            </span>
          </div>

          <div className="space-y-3 pt-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE]">
              <span className="text-[10px] uppercase font-bold text-[#6C8290] block">Gambian Health Scheme (NHIS)</span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="font-bold text-[#172B3A] text-xs truncate">National Health Insurance Scheme</span>
                <span className="font-mono font-bold text-[#087F8C] shrink-0">{nhisNumber}</span>
              </div>
              <p className="text-[11px] text-[#2E9B68] font-semibold mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>{insuranceStatus}</span>
              </p>
            </div>

            <div className="divide-y divide-[#E3EBEE]">
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Primary Referral Centre</span>
                </span>
                <span className="font-bold text-[#172B3A] text-right truncate min-w-0 max-w-[200px]">{primaryHospital}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                  <Stethoscope className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Designated Physician</span>
                </span>
                <span className="font-bold text-[#172B3A] text-right truncate min-w-0 max-w-[200px]">{primaryDoctor}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-[#6C8290] flex items-center gap-1.5 shrink-0">
                  <CreditCard className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Co-Pay Mobile Gateway</span>
                </span>
                <span className="font-bold text-[#172B3A] text-right truncate min-w-0 max-w-[200px]">{mobileMoneyProvider}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= 6. PHARMACY ORDERS & REFILL PAYMENT PREFERENCES ================= */}
      <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#087F8C] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-heading text-[#172B3A]">
                Pharmacy & Refill Payment Preferences
              </h3>
              <span className="text-[10px] text-[#6C8290]">
                Choose your default payment method for fast prescription refills and medicine delivery
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68] shrink-0 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Default Active</span>
          </span>
        </div>

        <div className="pt-4 space-y-4 text-xs">
          
          {/* Dropdown Tap Selector */}
          <div>
            <label className="text-xs font-bold text-[#172B3A] block mb-1.5 flex items-center justify-between">
              <span>Preferred Payment Method (Dropdown)</span>
              <span className="text-[10px] text-[#087F8C] font-semibold">Tap to change option</span>
            </label>

            {/* Custom Interactive Dropdown Tap Trigger */}
            <div className="relative">
              {(() => {
                const activeOpt = PAYMENT_METHOD_OPTIONS.find(o => o.id === currentPaymentMethod) || PAYMENT_METHOD_OPTIONS[0];
                return (
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer ${
                        isPaymentDropdownOpen 
                          ? 'border-[#087F8C] bg-[#F4FBFC] ring-2 ring-[#087F8C]/15 shadow-xs' 
                          : 'border-[#E3EBEE] bg-[#F5F9FA] hover:bg-[#EBF5F6] hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center shadow-2xs shrink-0">
                          {activeOpt.id === 'Wave' && <Wallet className="w-5 h-5 text-blue-600" />}
                          {activeOpt.id === 'QMoney' && <Smartphone className="w-5 h-5 text-orange-600" />}
                          {activeOpt.id === 'AfriMoney' && <Smartphone className="w-5 h-5 text-purple-600" />}
                          {activeOpt.id === 'APS Wallet' && <Landmark className="w-5 h-5 text-emerald-600" />}
                          {activeOpt.id === 'Bank Transfer' && <Building2 className="w-5 h-5 text-slate-700" />}
                          {activeOpt.id === 'Cash on Delivery' && <Banknote className="w-5 h-5 text-amber-600" />}
                          {activeOpt.id === 'NHIS Card' && <ShieldCheck className="w-5 h-5 text-teal-600" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <strong className="text-xs font-bold text-[#172B3A] truncate">{activeOpt.name}</strong>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border shrink-0 ${activeOpt.badgeBg}`}>
                              {activeOpt.badgeText}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6C8290] truncate mt-0.5">{activeOpt.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono font-bold text-[#087F8C] hidden sm:inline-block">
                          {activeOpt.ussdOrCode}
                        </span>
                        <div className={`w-7 h-7 rounded-lg bg-white border border-[#E3EBEE] flex items-center justify-center transition-transform ${isPaymentDropdownOpen ? 'rotate-180 text-[#087F8C]' : 'text-[#6C8290]'}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Menu Options */}
                    {isPaymentDropdownOpen && (
                      <div className="mt-2 p-2 bg-white rounded-2xl border border-[#E3EBEE] shadow-xl space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-20">
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6C8290]">
                          Select Gambian Payment Gateway
                        </div>
                        {PAYMENT_METHOD_OPTIONS.map((option) => {
                          const isSelected = currentPaymentMethod === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                setCurrentPaymentMethod(option.id);
                                if (onUpdatePreferredPaymentMethod) {
                                  onUpdatePreferredPaymentMethod(option.id);
                                }
                                setIsPaymentDropdownOpen(false);
                                showToast(`Preferred payment method set to ${option.name}`);
                              }}
                              className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#E4F3F4] text-[#066670] border border-teal-200 font-bold'
                                  : 'hover:bg-[#F5F9FA] text-[#172B3A] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBEE] flex items-center justify-center shrink-0">
                                  {option.id === 'Wave' && <Wallet className="w-4 h-4 text-blue-600" />}
                                  {option.id === 'QMoney' && <Smartphone className="w-4 h-4 text-orange-600" />}
                                  {option.id === 'AfriMoney' && <Smartphone className="w-4 h-4 text-purple-600" />}
                                  {option.id === 'APS Wallet' && <Landmark className="w-4 h-4 text-emerald-600" />}
                                  {option.id === 'Bank Transfer' && <Building2 className="w-4 h-4 text-slate-700" />}
                                  {option.id === 'Cash on Delivery' && <Banknote className="w-4 h-4 text-amber-600" />}
                                  {option.id === 'NHIS Card' && <ShieldCheck className="w-4 h-4 text-teal-600" />}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold truncate">{option.name}</span>
                                    <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${option.badgeBg}`}>
                                      {option.badgeText}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-[#6C8290] truncate">{option.provider}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-mono text-[#6C8290]">{option.ussdOrCode}</span>
                                {isSelected ? (
                                  <div className="w-5 h-5 rounded-full bg-[#087F8C] text-white flex items-center justify-center">
                                    <Check className="w-3 h-3" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full border border-slate-300" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Account Number / Phone Reference linked to default method */}
          <div className="p-3.5 rounded-2xl bg-[#F9FCFD] border border-[#E3EBEE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-[#172B3A] block">
                Registered Mobile Wallet / Account Reference
              </span>
              <span className="text-[10px] text-[#6C8290]">
                Pre-filled when paying for dispensary orders & refill deliveries
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isEditingPaymentRef ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={paymentAccountRef}
                    onChange={(e) => setPaymentAccountRef(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#087F8C] bg-white text-xs font-mono font-bold outline-hidden text-[#172B3A] w-36"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingPaymentRef(false);
                      showToast('Payment account reference saved');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#087F8C] text-white text-xs font-bold hover:bg-[#066670] cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E3EBEE] font-mono text-xs font-bold text-[#172B3A]">
                    {paymentAccountRef}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingPaymentRef(true)}
                    className="p-1.5 rounded-lg text-[#087F8C] hover:bg-[#E4F3F4] transition-colors cursor-pointer"
                    title="Edit account reference"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Automatic sync note */}
          <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 flex items-start gap-2 text-[11px] text-[#066670]">
            <Sparkles className="w-3.5 h-3.5 text-[#087F8C] shrink-0 mt-0.5" />
            <p>
              Your preferred payment method (<strong className="text-[#172B3A]">{currentPaymentMethod}</strong>) is automatically applied as the default choice during checkout on the <strong>Pharmacy</strong> and <strong>Prescriptions</strong> pages.
            </p>
          </div>

        </div>
      </div>

      {/* ================= 7. APP LOCALIZATION, SMS & SECURITY PREFERENCES ================= */}
      <div className="bg-white rounded-3xl border border-[#E3EBEE] p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E3EBEE]">
          <div className="w-8 h-8 rounded-xl bg-[#F5F9FA] text-[#172B3A] flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#087F8C]" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-heading text-[#172B3A]">
              Language, Security & Telehealth Sync
            </h3>
            <span className="text-[10px] text-[#6C8290]">Configure offline USSD accessibility and data privacy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
          
          {/* Language Selection */}
          <div className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="font-bold text-[#172B3A] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                <span className="truncate">Preferred Language</span>
              </span>
              <p className="text-[10px] text-[#6C8290] mt-0.5 truncate">Voice triage and portal interface</p>
            </div>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                showToast(`Language set to ${e.target.value}`);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-[#E3EBEE] bg-white text-xs font-bold outline-hidden cursor-pointer shrink-0"
            >
              <option value="English">English</option>
              <option value="Wolof">Wolof</option>
              <option value="Mandinka">Mandinka</option>
              <option value="Fula">Fula (Pulaar)</option>
              <option value="Jola">Jola</option>
            </select>
          </div>

          {/* SMS & USSD Sync */}
          <div className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="font-bold text-[#172B3A] flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                <span className="truncate">USSD (*220#) Sync</span>
              </span>
              <p className="text-[10px] text-[#6C8290] mt-0.5 truncate">Access queue tickets via 2G phone</p>
            </div>
            <input
              type="checkbox"
              checked={ussdSyncEnabled}
              onChange={(e) => {
                setUssdSyncEnabled(e.target.checked);
                showToast(e.target.checked ? 'USSD sync enabled' : 'USSD sync paused');
              }}
              className="w-4 h-4 accent-[#087F8C] rounded cursor-pointer shrink-0"
            />
          </div>

          {/* Emergency Triage Access */}
          <div className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="font-bold text-[#172B3A] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                <span className="truncate">Hospital Triage Access</span>
              </span>
              <p className="text-[10px] text-[#6C8290] mt-0.5 truncate">Allow authorized doctors to view allergies</p>
            </div>
            <input
              type="checkbox"
              checked={emergencyDataAccess}
              onChange={(e) => {
                setEmergencyDataAccess(e.target.checked);
                showToast('Privacy preferences updated');
              }}
              className="w-4 h-4 accent-[#087F8C] rounded cursor-pointer shrink-0"
            />
          </div>

          {/* 2FA Verification */}
          <div className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="font-bold text-[#172B3A] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                <span className="truncate">SMS 2-Factor for Records</span>
              </span>
              <p className="text-[10px] text-[#6C8290] mt-0.5 truncate">Requires OTP when viewing lab results</p>
            </div>
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={(e) => {
                setTwoFactorAuth(e.target.checked);
                showToast('Two-factor authentication updated');
              }}
              className="w-4 h-4 accent-[#087F8C] rounded cursor-pointer shrink-0"
            />
          </div>

        </div>
      </div>

      {/* ================= 7. GAMBIA HEALTH VISION / ROADMAP ================= */}
      <div
        onClick={onOpenRoadmap}
        className="p-4 rounded-3xl bg-gradient-to-r from-[#E4F3F4] to-[#EAF2F9] border border-[#087F8C]/20 shadow-xs cursor-pointer hover:border-[#087F8C] transition-all flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <strong className="text-xs font-bold text-[#172B3A] block truncate">
              The Gambia Digital Health Vision & Roadmap
            </strong>
            <span className="text-[11px] text-[#066670] line-clamp-1">
              Learn how USSD (*220#), automated SMS dispatch, and national blood network integration work.
            </span>
          </div>
        </div>

        <span className="text-xs font-bold text-[#087F8C] group-hover:translate-x-0.5 transition-transform shrink-0 whitespace-nowrap">
          View Details →
        </span>
      </div>

      {/* ================= 8. LOGOUT ACTION ================= */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl bg-[#FBEAE9] hover:bg-rose-100 text-[#D9534F] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Patient Account</span>
        </button>
      </div>

      {/* ================= DIGITAL HEALTH PASS MODAL ================= */}
      {showQrPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3EBEE]">
              <span className="text-xs font-mono font-bold text-[#087F8C] uppercase">Gambia National Health Pass</span>
              <button
                onClick={() => setShowQrPass(false)}
                className="p-1 rounded-lg text-[#6C8290] hover:text-[#172B3A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F5F9FA] rounded-2xl border border-[#E3EBEE] inline-block mx-auto shadow-inner">
              <div className="w-44 h-44 bg-white p-3 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center">
                <QrCode className="w-36 h-36 text-[#172B3A]" />
              </div>
            </div>

            <div>
              <h3 className="font-bold font-heading text-[#172B3A] text-base truncate">{name}</h3>
              <p className="text-xs text-[#6C8290] font-mono mt-0.5">NIN: {nin}</p>
              <div className="flex justify-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
                  Blood: {bloodType.split(' ')[0]}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  NHIS Active
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#6C8290]">
              Hospital receptionists and triage triage nurses scan this QR code to quickly pull your allergy alerts and emergency contacts.
            </p>

            <button
              onClick={() => {
                showToast('Health pass downloaded to device');
                setShowQrPass(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Health Card Summary</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
