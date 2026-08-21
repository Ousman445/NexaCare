import React, { useState } from 'react';
import { Hospital, Pharmacy } from '../../types';
import { HOSPITALS, GAMBIA_PHARMACIES } from '../../store';
import { GambiaMap } from '../../components/GambiaMap';
import { 
  Building2, 
  Pill, 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  Phone, 
  Filter, 
  Sparkles,
  Ticket,
  SlidersHorizontal,
  Navigation,
  Users
} from 'lucide-react';

interface FindCareProps {
  onSelectHospital: (hospitalId: string) => void;
  onSelectPharmacy?: (pharmacy: Pharmacy) => void;
  onGetTicket: (hospital: Hospital) => void;
}

export const FindCare: React.FC<FindCareProps> = ({
  onSelectHospital,
  onSelectPharmacy,
  onGetTicket
}) => {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'pharmacies'>('hospitals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'queue-asc' | 'queue-desc' | 'alphabetical-asc' | 'alphabetical-desc' | 'rating' | 'wait' | 'depts'>('queue-asc');

  const regions = [
    'All',
    'Kanifing Municipality (KMC)',
    'Banjul City',
    'West Coast Region (WCR)',
    'North Bank Region (NBR)',
    'Central River Region (CRR)'
  ];

  const filteredHospitals = HOSPITALS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.depts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      h.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = selectedRegion === 'All' || h.region === selectedRegion;
    const matchesOpen = !openNowOnly || h.status === 'Open';

    return matchesSearch && matchesRegion && matchesOpen;
  }).sort((a, b) => {
    if (sortBy === 'queue-asc') {
      return (a.queueCount || 0) - (b.queueCount || 0);
    }
    if (sortBy === 'queue-desc') {
      return (b.queueCount || 0) - (a.queueCount || 0);
    }
    if (sortBy === 'alphabetical-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'alphabetical-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === 'rating') {
      return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
    }
    if (sortBy === 'wait') {
      const waitOrder: Record<string, number> = { 'Low': 1, 'Moderate': 2, 'High': 3 };
      return (waitOrder[a.wait] || 2) - (waitOrder[b.wait] || 2);
    }
    if (sortBy === 'depts') {
      return b.depts.length - a.depts.length;
    }
    return 0;
  });

  const filteredPharmacies = GAMBIA_PHARMACIES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.inventory.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = selectedRegion === 'All' || 
      p.location.includes(selectedRegion.split(' ')[0]) || 
      p.area.includes(selectedRegion.split(' ')[0]);

    const matchesOpen = !openNowOnly || p.isOpen24h;

    return matchesSearch && matchesRegion && matchesOpen;
  }).sort((a, b) => {
    if (sortBy === 'alphabetical-desc') {
      return b.name.localeCompare(a.name);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      
      {/* Header & Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
            Healthcare Facility Directory
          </span>
          <h2 className="text-lg font-bold font-heading text-[#172B3A]">
            Find Care & Pharmacies
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-0.5 bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'hospitals'
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Hospitals ({HOSPITALS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('pharmacies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pharmacies'
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'text-[#6C8290] hover:text-[#172B3A]'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Pharmacies ({GAMBIA_PHARMACIES.length})</span>
          </button>
        </div>
      </div>

      {/* Interactive Map of The Gambia */}
      <GambiaMap
        initialType={activeTab}
        onSelectHospital={onSelectHospital}
        onSelectPharmacy={onSelectPharmacy}
      />

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6C8290] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeTab === 'hospitals'
              ? 'Search 10 hospitals (e.g. Serekunda, Africmed, EFSTH, Bansang...)'
              : 'Search 10 pharmacies & medications (e.g. Stop & Shop, Innovarx, Paracetamol...)'
          }
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E3EBEE] text-xs focus:outline-hidden focus:border-[#087F8C] shadow-2xs placeholder-[#6C8290]"
        />
      </div>

      {/* Region & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === r
                  ? 'bg-[#087F8C] text-white shadow-xs'
                  : 'bg-white text-[#6C8290] hover:text-[#172B3A] border border-[#E3EBEE]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#6C8290]" />
          <span className="text-[11px] text-[#6C8290] font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 rounded-xl bg-white border border-[#E3EBEE] text-[11px] font-bold text-[#172B3A] focus:outline-hidden focus:border-[#087F8C] cursor-pointer shadow-2xs"
          >
            <option value="queue-asc">Fewest Queueing (Shortest Line)</option>
            <option value="queue-desc">Most Queueing</option>
            <option value="alphabetical-asc">Alphabetical (A → Z)</option>
            <option value="alphabetical-desc">Alphabetical (Z → A)</option>
            <option value="wait">Shortest Wait Time</option>
            <option value="rating">Highest Rated</option>
            <option value="depts">Most Departments</option>
          </select>
        </div>
      </div>

      {/* Listing Content */}
      {activeTab === 'hospitals' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6C8290]">
            <span>Showing {filteredHospitals.length} of 10 hospitals in The Gambia</span>
            <span className="text-[11px] text-[#087F8C] font-semibold">Live Queue Tracking</span>
          </div>

          <div className="space-y-2.5">
            {filteredHospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="p-3.5 rounded-2xl bg-white border border-[#E3EBEE] hover:border-[#087F8C] transition-all shadow-2xs hover:shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E4F3F4] text-[#087F8C] flex items-center justify-center shrink-0">
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4
                          onClick={() => onSelectHospital(hosp.id)}
                          className="text-sm font-bold text-[#172B3A] hover:text-[#087F8C] cursor-pointer"
                        >
                          {hosp.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          hosp.status === 'Open' ? 'bg-[#E8F6EF] text-[#2E9B68]' : 'bg-[#FDF3E4] text-[#E9A23B]'
                        }`}>
                          {hosp.status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[#F5F9FA] text-[#6C8290] border border-[#E3EBEE]">
                          {hosp.type}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#6C8290] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#6C8290]" />
                        {hosp.location} · <span className="text-[#087F8C] font-semibold">{hosp.region}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#066670] bg-[#E4F3F4] px-2 py-0.5 rounded-lg border border-[#087F8C]/20">
                      <Users className="w-3 h-3 text-[#087F8C]" />
                      {hosp.queueCount || 0} in line
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{hosp.rating || '4.8'}</span>
                    </div>
                  </div>
                </div>

                {/* Departments Tag Strip */}
                <div className="flex gap-1.5 flex-wrap">
                  {hosp.depts.slice(0, 4).map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded-md bg-[#F5F9FA] text-[#172B3A] text-[10px] font-medium border border-[#E3EBEE]"
                    >
                      {d}
                    </span>
                  ))}
                  {hosp.depts.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-[#F5F9FA] text-[#6C8290] text-[10px]">
                      +{hosp.depts.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action Footer */}
                <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-[11px] text-[#6C8290]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#087F8C]" />
                      {hosp.wait} wait (~15-30m)
                    </span>
                    <span className="hidden sm:inline">
                      Beds: {hosp.bedOccupancy || 75}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectHospital(hosp.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#F5F9FA] hover:bg-[#E3EBEE] text-[#172B3A] font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onGetTicket(hosp)}
                      className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Get Ticket</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6C8290]">
            <span>Showing {filteredPharmacies.length} of 10 licensed pharmacies in The Gambia</span>
            <span className="text-[10px] text-[#2E9B68] font-bold">Delivery & Pickup Available</span>
          </div>

          <div className="space-y-2.5">
            {filteredPharmacies.map((pharm) => (
              <div
                key={pharm.id}
                className="p-4 rounded-3xl bg-white border border-[#E3EBEE] hover:border-[#2E9B68] transition-all shadow-2xs hover:shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E8F6EF] text-[#2E9B68] flex items-center justify-center shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[#172B3A]">
                          {pharm.name}
                        </h4>
                        {pharm.isOpen24h ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E8F6EF] text-[#2E9B68]">
                            Open 24 Hours
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#F5F9FA] text-[#6C8290]">
                            {pharm.hours}
                          </span>
                        )}
                        {pharm.deliveryAvailable && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-blue-50 text-blue-700">
                            Delivery
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#6C8290] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#6C8290]" />
                        {pharm.location} · <span className="text-[#2E9B68] font-semibold">{pharm.distance}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-xl">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{pharm.rating}</span>
                  </div>
                </div>

                {/* Popular Inventory Items */}
                <div>
                  <span className="text-[10px] font-bold text-[#6C8290] uppercase tracking-wider block mb-1">
                    Featured Stock & Prices (GMD)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {pharm.inventory.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-[#F5F9FA] border border-[#E3EBEE] text-left"
                      >
                        <strong className="text-[10px] font-bold text-[#172B3A] block truncate">
                          {item.name}
                        </strong>
                        <span className="text-[10px] font-extrabold text-[#2E9B68]">
                          {item.priceGMD} GMD
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-[11px] text-[#6C8290]">
                    <Phone className="w-3 h-3 text-[#2E9B68]" />
                    {pharm.phone}
                  </span>

                  <button
                    onClick={() => onSelectPharmacy?.(pharm)}
                    className="px-3 py-1.5 rounded-xl bg-[#2E9B68] hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Browse & Order Refill</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
