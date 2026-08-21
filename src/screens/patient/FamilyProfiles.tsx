import React, { useState } from 'react';
import { FamilyMember } from '../../types';
import { INITIAL_FAMILY_MEMBERS } from '../../store';
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  AlertCircle, 
  ChevronRight, 
  Phone, 
  Plus, 
  X, 
  Edit3,
  Sparkles
} from 'lucide-react';

interface FamilyProfilesProps {
  activeMemberId: string;
  onSwitchProfile: (member: FamilyMember) => void;
}

export const FamilyProfiles: React.FC<FamilyProfilesProps> = ({
  activeMemberId,
  onSwitchProfile
}) => {
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: 'Child',
    age: 6,
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: []
  });
  const [allergyInput, setAllergyInput] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name) return;

    const created: FamilyMember = {
      id: `fam_${Date.now()}`,
      name: newMember.name,
      relationship: newMember.relationship as any || 'Child',
      age: Number(newMember.age) || 5,
      gender: newMember.gender || 'Female',
      bloodGroup: newMember.bloodGroup || 'O+',
      allergies: newMember.allergies && newMember.allergies.length > 0 ? newMember.allergies : ['None'],
      emergencyContact: '+220 701 4455'
    };

    setMembers(prev => [...prev, created]);
    setIsAddOpen(false);
    setNewMember({
      name: '',
      relationship: 'Child',
      age: 6,
      gender: 'Female',
      bloodGroup: 'O+',
      allergies: []
    });
  };

  const handleAddAllergy = () => {
    if (!allergyInput.trim()) return;
    setNewMember(prev => ({
      ...prev,
      allergies: [...(prev.allergies || []), allergyInput.trim()]
    }));
    setAllergyInput('');
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            HOUSEHOLD HEALTH PASSPORT
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Family Health Profiles
          </h2>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#E4F3F4] text-[#087F8C] flex items-center gap-2.5 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 shrink-0 text-[#087F8C]" />
        <span>
          Switch active family profile to book appointments, manage pediatric vaccinations, and generate queue tickets under their name.
        </span>
      </div>

      {/* Member Cards */}
      <div className="space-y-3">
        {members.map((member) => {
          const isActive = member.id === activeMemberId;

          return (
            <div
              key={member.id}
              onClick={() => onSwitchProfile(member)}
              className={`p-4 rounded-3xl bg-white border transition-all cursor-pointer shadow-2xs hover:shadow-xs space-y-3 ${
                isActive
                  ? 'border-[#087F8C] ring-2 ring-[#087F8C]/20 bg-gradient-to-br from-white to-[#F5FAFA]'
                  : 'border-[#E3EBEE] hover:border-[#087F8C]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-white ${
                    isActive ? 'bg-[#087F8C]' : 'bg-[#172B3A]'
                  }`}>
                    {member.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#172B3A]">
                        {member.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F9FA] text-[#087F8C] border border-[#E3EBEE]">
                        {member.relationship}
                      </span>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E8F6EF] text-[#2E9B68] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active Profile
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-[#6C8290] mt-0.5">
                      {member.age} yrs · {member.gender} · Blood Type: <strong className="text-rose-600 font-bold">{member.bloodGroup}</strong>
                    </p>
                  </div>
                </div>

                <button
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-[#087F8C] text-white shadow-xs'
                      : 'bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#172B3A]'
                  }`}
                >
                  {isActive ? 'Selected' : 'Switch To'}
                </button>
              </div>

              {/* Allergies & Emergency Badges */}
              <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between text-xs text-[#6C8290]">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    Allergies: <strong className="text-[#172B3A]">{member.allergies.join(', ')}</strong>
                  </span>
                </div>

                {member.emergencyContact && (
                  <span className="flex items-center gap-1 text-[11px]">
                    <Phone className="w-3 h-3 text-[#087F8C]" />
                    {member.emergencyContact}
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-[#172B3A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E3EBEE] animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBEE]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-heading text-[#172B3A]">
                  Add Family Member
                </h3>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-full text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3.5 mt-4">
              
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="e.g. Mariama Bah"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                    Relationship
                  </label>
                  <select
                    value={newMember.relationship}
                    onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] bg-white"
                  >
                    <option value="Child">Child</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={newMember.age}
                    onChange={(e) => setNewMember({ ...newMember, age: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                    Gender
                  </label>
                  <select
                    value={newMember.gender}
                    onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                    Blood Group
                  </label>
                  <select
                    value={newMember.bloodGroup}
                    onChange={(e) => setNewMember({ ...newMember, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] bg-white"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C8290] block mb-1">
                  Known Allergies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    placeholder="e.g. Penicillin, Peanuts"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C]"
                  />
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="px-3 py-2 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#172B3A] text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {newMember.allergies && newMember.allergies.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {newMember.allergies.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-bold">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E3EBEE] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#172B3A] text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Profile
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
