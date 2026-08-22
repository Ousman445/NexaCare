import React, { useState, useEffect } from 'react';
import { Pharmacy, PharmacyMedication, RefillOrder, PaymentMethod } from '../../types';
import { PAYMENT_METHOD_OPTIONS } from '../../store';
import { 
  Search, 
  Pill, 
  MapPin, 
  Phone, 
  Clock, 
  Truck, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  ShoppingBag, 
  MessageSquare, 
  Plus, 
  Filter,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building2,
  Sparkles,
  ChevronDown,
  Wallet,
  Smartphone,
  Landmark,
  Banknote,
  Info,
  BadgeCheck
} from 'lucide-react';

interface PharmacyFinderProps {
  pharmacies: Pharmacy[];
  refillOrders: RefillOrder[];
  preferredPaymentMethod?: PaymentMethod;
  onUpdatePreferredPaymentMethod?: (method: PaymentMethod) => void;
  onPlaceOrder: (order: Omit<RefillOrder, 'id' | 'orderDate' | 'status'>) => void;
  onOpenPharmacistChat: (pharmacistName?: string) => void;
  onBackToHome: () => void;
}

export const PharmacyFinder: React.FC<PharmacyFinderProps> = ({
  pharmacies,
  refillOrders,
  preferredPaymentMethod = 'Wave',
  onUpdatePreferredPaymentMethod,
  onPlaceOrder,
  onOpenPharmacistChat,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<'find_meds' | 'directory' | 'my_orders'>('find_meds');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filter24h, setFilter24h] = useState(false);
  const [filterDelivery, setFilterDelivery] = useState(false);

  // Cart / Order modal state
  const [cart, setCart] = useState<{ med: PharmacyMedication; pharmacy: Pharmacy; quantity: number }[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'Pick-up' | 'Home Delivery'>('Home Delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('House 14, Bertil Harding Highway, Senegambia');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(preferredPaymentMethod);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [accountRefNumber, setAccountRefNumber] = useState('+220 701 4455');
  const [saveAsPreferredInSettings, setSaveAsPreferredInSettings] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Synchronize paymentMethod when preferredPaymentMethod prop changes
  useEffect(() => {
    if (preferredPaymentMethod) {
      setPaymentMethod(preferredPaymentMethod);
    }
  }, [preferredPaymentMethod]);

  // Flatten all medications with pharmacy info
  const allMedications = pharmacies.flatMap(pharm => 
    pharm.inventory.map(med => ({
      ...med,
      pharmacyName: pharm.name,
      pharmacyLocation: pharm.location,
      pharmacyPhone: pharm.phone,
      pharmacyDistance: pharm.distance,
      pharmacyIsOpen24h: pharm.isOpen24h,
      pharmacyDeliveryAvailable: pharm.deliveryAvailable,
      pharmacyObj: pharm
    }))
  );

  const categories = ['All', 'Antibiotics', 'Pain & Fever Relief', 'Anti-Malarial', 'Diabetes Care', 'Respiratory Care', 'Vitamins & Supplements'];

  const filteredMeds = allMedications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || med.category === selectedCategory;
    const matches24h = !filter24h || med.pharmacyIsOpen24h;
    const matchesDel = !filterDelivery || med.pharmacyDeliveryAvailable;
    return matchesSearch && matchesCat && matches24h && matchesDel;
  });

  const filteredPharmacies = pharmacies.filter(pharm => {
    const matchesSearch = pharm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pharm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pharm.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matches24h = !filter24h || pharm.isOpen24h;
    const matchesDel = !filterDelivery || pharm.deliveryAvailable;
    return matchesSearch && matches24h && matchesDel;
  });

  const addToCart = (med: PharmacyMedication, pharmacy: Pharmacy) => {
    setCart(prev => {
      const existing = prev.find(item => item.med.id === med.id && item.pharmacy.id === pharmacy.id);
      if (existing) {
        return prev.map(item => item.med.id === med.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { med, pharmacy, quantity: 1 }];
    });
  };

  const removeFromCart = (medId: string) => {
    setCart(prev => prev.filter(item => item.med.id !== medId));
  };

  const cartTotalGMD = cart.reduce((sum, item) => sum + (item.med.priceGMD * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const mainPharm = cart[0].pharmacy;
    
    if (saveAsPreferredInSettings && onUpdatePreferredPaymentMethod) {
      onUpdatePreferredPaymentMethod(paymentMethod);
    }

    onPlaceOrder({
      pharmacyName: mainPharm.name,
      pharmacyPhone: mainPharm.phone,
      medications: cart.map(c => ({ name: c.med.name, quantity: c.quantity, priceGMD: c.med.priceGMD })),
      totalGMD: cartTotalGMD,
      deliveryType,
      deliveryAddress: deliveryType === 'Home Delivery' ? deliveryAddress : undefined,
      paymentMethod,
      accountReference: accountRefNumber.trim() || undefined
    });
    setOrderSuccess(true);
    setCart([]);
    setTimeout(() => {
      setOrderSuccess(false);
      setShowOrderModal(false);
      setActiveTab('my_orders');
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-xl bg-white border border-[#E3EBEE] flex items-center justify-center text-[#172B3A] hover:bg-[#F5F9FA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold font-heading text-[#172B3A]">
              Pharmacy & Medicine Finder
            </h1>
            <p className="text-xs text-[#6C8290]">
              Real-time stock checks, licensed dispensaries & prescription refills
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenPharmacistChat('Pharm. Isatou Bojang')}
            className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-[#087F8C] hover:bg-teal-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Pharmacist</span>
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => setShowOrderModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#087F8C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#066670] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart ({cart.length}) · {cartTotalGMD} GMD</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 p-1 bg-[#EEF4F6] rounded-xl">
        <button
          onClick={() => setActiveTab('find_meds')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'find_meds'
              ? 'bg-white text-[#087F8C] shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          Medicine Stock Search
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'directory'
              ? 'bg-white text-[#087F8C] shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Accredited Pharmacies ({pharmacies.length})
        </button>
        <button
          onClick={() => setActiveTab('my_orders')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 relative ${
            activeTab === 'my_orders'
              ? 'bg-white text-[#087F8C] shadow-xs'
              : 'text-[#6C8290] hover:text-[#172B3A]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          My Orders ({refillOrders.length})
        </button>
      </div>

      {/* Search & Quick Filter Controls */}
      {activeTab !== 'my_orders' && (
        <div className="bg-white p-4 rounded-2xl border border-[#E3EBEE] shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C8290]" />
            <input
              type="text"
              placeholder={
                activeTab === 'find_meds'
                  ? "Search by drug name (e.g. Paracetamol, Coartem, Amoxicillin, Metformin)..."
                  : "Search pharmacy name or neighborhood (e.g. Kairaba, Banjul, Bakau, Westfield)..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F5F9FA] rounded-xl border border-transparent focus:border-[#087F8C] focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {activeTab === 'find_meds' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-[#087F8C] text-white'
                        : 'bg-[#F5F9FA] text-[#6C8290] hover:bg-[#E3EBEE]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#172B3A] font-medium bg-[#F5F9FA] px-2.5 py-1 rounded-lg hover:bg-[#E3EBEE]">
                <input
                  type="checkbox"
                  checked={filter24h}
                  onChange={(e) => setFilter24h(e.target.checked)}
                  className="rounded text-[#087F8C] focus:ring-0"
                />
                <span>Open 24/7</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#172B3A] font-medium bg-[#F5F9FA] px-2.5 py-1 rounded-lg hover:bg-[#E3EBEE]">
                <input
                  type="checkbox"
                  checked={filterDelivery}
                  onChange={(e) => setFilterDelivery(e.target.checked)}
                  className="rounded text-[#087F8C] focus:ring-0"
                />
                <span>Home Delivery</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: MEDICINE SEARCH & LIVE STOCK */}
      {activeTab === 'find_meds' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6C8290] px-1">
            <span>Showing {filteredMeds.length} medicines in stock</span>
            <span className="flex items-center gap-1 text-[#087F8C] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Gambian Medicines Control Agency (MCA) Approved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredMeds.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="p-4 bg-white rounded-2xl border border-[#E3EBEE] hover:border-teal-200 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0F7F9] text-[#087F8C]">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#172B3A] mt-1.5">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#6C8290] mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-[#087F8C]">
                        {item.priceGMD} GMD
                      </div>
                      {item.requiresPrescription ? (
                        <span className="text-[10px] font-semibold text-amber-600 block">
                          Rx Required
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-600 block">
                          Over The Counter
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F0F4F6] flex items-center justify-between text-xs text-[#6C8290]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                      <span className="font-semibold text-[#172B3A] truncate">{item.pharmacyName}</span>
                      <span>· {item.pharmacyDistance}</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {item.inStock ? `${item.stockCount} in stock` : 'Out of stock'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => addToCart(item, item.pharmacyObj)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#087F8C] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#066670] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Order / Refill ({item.priceGMD} GMD)
                  </button>

                  <button
                    onClick={() => onOpenPharmacistChat(item.pharmacyName)}
                    className="p-2 rounded-xl bg-[#F5F9FA] text-[#172B3A] hover:bg-teal-50 hover:text-[#087F8C] transition-colors border border-[#E3EBEE]"
                    title="Consult Pharmacist about this drug"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMeds.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E3EBEE] text-[#6C8290]">
              <AlertCircle className="w-8 h-8 mx-auto text-[#087F8C] mb-2 opacity-60" />
              <p className="text-sm font-bold text-[#172B3A]">No medications found</p>
              <p className="text-xs mt-1">Try clearing your filters or search for another drug name.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACCREDITED PHARMACY DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPharmacies.map((pharm) => (
            <div
              key={pharm.id}
              className="p-4 bg-white rounded-2xl border border-[#E3EBEE] hover:border-teal-200 transition-all shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#172B3A]">
                      {pharm.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">
                      ★ {pharm.rating}
                    </span>
                  </div>
                  <p className="text-xs text-[#6C8290] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
                    {pharm.location} · <span className="font-semibold">{pharm.distance}</span>
                  </p>
                </div>

                {pharm.isOpen24h ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    Open 24/7
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-[#F5F9FA] text-[#6C8290] text-[11px] font-medium">
                    {pharm.hours}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-[#F9FCFD] rounded-xl p-2.5 border border-[#E3EBEE]">
                <div className="flex items-center gap-1.5 text-[#172B3A]">
                  <Phone className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>{pharm.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#172B3A]">
                  <Truck className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>{pharm.deliveryAvailable ? 'Wave Home Delivery' : 'Pick-up only'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSearchQuery(pharm.name);
                    setActiveTab('find_meds');
                  }}
                  className="flex-1 py-2 rounded-xl bg-teal-50 text-[#087F8C] hover:bg-teal-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Pill className="w-3.5 h-3.5" />
                  View Inventory ({pharm.inventory.length} meds)
                </button>

                <button
                  onClick={() => onOpenPharmacistChat(pharm.name)}
                  className="px-3 py-2 rounded-xl bg-[#087F8C] text-white hover:bg-[#066670] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MY REFILL & DISPENSING ORDERS */}
      {activeTab === 'my_orders' && (
        <div className="space-y-3">
          {refillOrders.map((ord) => {
            const methodMeta = PAYMENT_METHOD_OPTIONS.find(o => o.id === ord.paymentMethod) || PAYMENT_METHOD_OPTIONS[0];
            return (
              <div
                key={ord.id}
                className="p-4 bg-white rounded-2xl border border-[#E3EBEE] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#6C8290]">
                      ORDER #{ord.id} · {ord.orderDate}
                    </span>
                    <h3 className="text-sm font-bold text-[#172B3A] mt-0.5">
                      {ord.pharmacyName}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      ord.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : ord.status === 'Out for Delivery'
                        ? 'bg-sky-50 text-sky-700 animate-pulse'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="bg-[#F9FCFD] p-3 rounded-xl border border-[#E3EBEE] space-y-1.5 text-xs">
                  {ord.medications.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[#172B3A]">
                      <span>{m.quantity}x {m.name}</span>
                      <span className="font-semibold">{m.priceGMD * m.quantity} GMD</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#E3EBEE] flex items-center justify-between font-bold text-[#087F8C]">
                    <div className="flex items-center gap-1.5">
                      <span>Payment Method:</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${methodMeta.badgeBg}`}>
                        {ord.paymentMethod}
                      </span>
                    </div>
                    <span>{ord.totalGMD} GMD</span>
                  </div>
                  {ord.accountReference && (
                    <div className="text-[11px] text-[#6C8290] flex items-center justify-between pt-0.5">
                      <span>Account Ref:</span>
                      <span className="font-mono font-medium text-[#172B3A]">{ord.accountReference}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#6C8290]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#087F8C]" />
                    {ord.deliveryType}: {ord.deliveryAddress || 'Branch Desk Collection'}
                  </span>

                  <button
                    onClick={() => onOpenPharmacistChat(ord.pharmacyName)}
                    className="text-xs font-bold text-[#087F8C] hover:underline cursor-pointer"
                  >
                    Contact Pharmacist →
                  </button>
                </div>
              </div>
            );
          })}

          {refillOrders.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E3EBEE] text-[#6C8290]">
              <ShoppingBag className="w-8 h-8 mx-auto text-[#087F8C] mb-2 opacity-60" />
              <p className="text-sm font-bold text-[#172B3A]">No orders placed yet</p>
              <p className="text-xs mt-1">Search for medications and place your first prescription refill.</p>
            </div>
          )}
        </div>
      )}

      {/* CHECKOUT / DISPENSE MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-[#E3EBEE] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E3EBEE] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#087F8C] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#172B3A]">
                  Confirm Prescription Refill
                </h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F9FA] hover:bg-[#E3EBEE] flex items-center justify-center text-[#6C8290] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#172B3A]">Refill Order Authorized!</h4>
                <p className="text-xs text-[#6C8290]">
                  Your request has been routed to the dispensing pharmacist via <strong className="text-[#172B3A]">{paymentMethod}</strong>. You will receive an SMS prompt and delivery dispatch notification shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* Cart Items */}
                <div>
                  <label className="text-xs font-bold text-[#172B3A] block mb-1.5">
                    Prescription Items ({cart.length})
                  </label>
                  <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                    {cart.map((item) => (
                      <div key={item.med.id} className="flex items-center justify-between p-2.5 bg-[#F9FCFD] rounded-xl border border-[#E3EBEE] text-xs">
                        <div>
                          <div className="font-bold text-[#172B3A]">{item.med.name}</div>
                          <div className="text-[#6C8290] text-[11px]">{item.pharmacy.name}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-[#087F8C]">
                            {item.med.priceGMD * item.quantity} GMD
                          </span>
                          <button
                            onClick={() => removeFromCart(item.med.id)}
                            className="text-rose-500 font-bold hover:underline cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Option */}
                <div>
                  <label className="text-xs font-bold text-[#172B3A] block mb-1">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('Home Delivery')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        deliveryType === 'Home Delivery'
                          ? 'border-[#087F8C] bg-teal-50/50 text-[#087F8C] ring-1 ring-[#087F8C]'
                          : 'border-[#E3EBEE] text-[#6C8290] hover:bg-[#F5F9FA]'
                      }`}
                    >
                      <Truck className="w-4 h-4 mb-1" />
                      Home Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('Pick-up')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        deliveryType === 'Pick-up'
                          ? 'border-[#087F8C] bg-teal-50/50 text-[#087F8C] ring-1 ring-[#087F8C]'
                          : 'border-[#E3EBEE] text-[#6C8290] hover:bg-[#F5F9FA]'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mb-1" />
                      Branch Pick-up
                    </button>
                  </div>
                </div>

                {deliveryType === 'Home Delivery' && (
                  <div>
                    <label className="text-xs font-bold text-[#172B3A] block mb-1">
                      Delivery Address in The Gambia
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F5F9FA] rounded-xl border border-[#E3EBEE] outline-hidden focus:bg-white focus:border-[#087F8C]"
                    />
                  </div>
                )}

                {/* Payment Method Selector with Dropdown Tap */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#172B3A]">
                      Payment Method
                    </label>
                    {paymentMethod === preferredPaymentMethod && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F6EF] text-[#2E9B68] flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        Default Preferred
                      </span>
                    )}
                  </div>

                  {/* Dropdown Tap Trigger */}
                  <div className="relative">
                    {(() => {
                      const activeOpt = PAYMENT_METHOD_OPTIONS.find(o => o.id === paymentMethod) || PAYMENT_METHOD_OPTIONS[0];
                      return (
                        <div>
                          <button
                            type="button"
                            onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
                            className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                              paymentDropdownOpen
                                ? 'border-[#087F8C] bg-[#F4FBFC] ring-2 ring-[#087F8C]/15'
                                : 'border-[#E3EBEE] bg-[#F9FCFD] hover:bg-[#F0F8F9] hover:border-teal-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBEE] flex items-center justify-center shrink-0">
                                {activeOpt.id === 'Wave' && <Wallet className="w-4 h-4 text-blue-600" />}
                                {activeOpt.id === 'QMoney' && <Smartphone className="w-4 h-4 text-orange-600" />}
                                {activeOpt.id === 'AfriMoney' && <Smartphone className="w-4 h-4 text-purple-600" />}
                                {activeOpt.id === 'APS Wallet' && <Landmark className="w-4 h-4 text-emerald-600" />}
                                {activeOpt.id === 'Bank Transfer' && <Building2 className="w-4 h-4 text-slate-700" />}
                                {activeOpt.id === 'Cash on Delivery' && <Banknote className="w-4 h-4 text-amber-600" />}
                                {activeOpt.id === 'NHIS Card' && <ShieldCheck className="w-4 h-4 text-teal-600" />}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-[#172B3A] truncate">{activeOpt.name}</span>
                                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${activeOpt.badgeBg}`}>
                                    {activeOpt.badgeText}
                                  </span>
                                </div>
                                <p className="text-[10px] text-[#6C8290] truncate">{activeOpt.provider}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-mono text-[#087F8C] hidden sm:inline-block font-semibold">
                                {activeOpt.ussdOrCode}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-[#6C8290] transition-transform ${paymentDropdownOpen ? 'rotate-180 text-[#087F8C]' : ''}`} />
                            </div>
                          </button>

                          {/* Dropdown Tap Menu */}
                          {paymentDropdownOpen && (
                            <div className="mt-1.5 p-1.5 bg-white rounded-2xl border border-[#E3EBEE] shadow-xl space-y-1 z-30 max-h-56 overflow-y-auto">
                              {PAYMENT_METHOD_OPTIONS.map((opt) => {
                                const isSelected = paymentMethod === opt.id;
                                const isDefault = opt.id === preferredPaymentMethod;
                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => {
                                      setPaymentMethod(opt.id);
                                      setPaymentDropdownOpen(false);
                                    }}
                                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#E4F3F4] text-[#066670] font-bold border border-teal-200'
                                        : 'hover:bg-[#F5F9FA] text-[#172B3A]'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <div className="w-7 h-7 rounded-lg bg-white border border-[#E3EBEE] flex items-center justify-center shrink-0">
                                        {opt.id === 'Wave' && <Wallet className="w-3.5 h-3.5 text-blue-600" />}
                                        {opt.id === 'QMoney' && <Smartphone className="w-3.5 h-3.5 text-orange-600" />}
                                        {opt.id === 'AfriMoney' && <Smartphone className="w-3.5 h-3.5 text-purple-600" />}
                                        {opt.id === 'APS Wallet' && <Landmark className="w-3.5 h-3.5 text-emerald-600" />}
                                        {opt.id === 'Bank Transfer' && <Building2 className="w-3.5 h-3.5 text-slate-700" />}
                                        {opt.id === 'Cash on Delivery' && <Banknote className="w-3.5 h-3.5 text-amber-600" />}
                                        {opt.id === 'NHIS Card' && <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />}
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs truncate">{opt.name}</span>
                                          {isDefault && (
                                            <span className="text-[8px] px-1 py-0.2 bg-teal-100 text-teal-800 rounded font-bold">
                                              Default
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[10px] text-[#6C8290] block truncate">{opt.provider}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-[9px] font-mono text-[#6C8290]">{opt.ussdOrCode}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[#087F8C]" />}
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

                  {/* Payment Instructions Details Box */}
                  {(() => {
                    const selectedOpt = PAYMENT_METHOD_OPTIONS.find(o => o.id === paymentMethod) || PAYMENT_METHOD_OPTIONS[0];
                    return (
                      <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs space-y-2">
                        <div className="flex items-start gap-2 text-[#066670]">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#087F8C]" />
                          <p className="text-[11px] leading-relaxed">
                            {selectedOpt.instructions}
                          </p>
                        </div>

                        {/* Account or Phone Ref Input */}
                        {paymentMethod !== 'Cash on Delivery' && (
                          <div className="pt-1.5 border-t border-teal-100/60">
                            <label className="text-[10px] font-bold uppercase text-[#6C8290] block mb-1">
                              {paymentMethod === 'NHIS Card' ? 'National Health Insurance Card Number' : 
                               paymentMethod === 'Bank Transfer' ? 'Depositor Account / Reference ID' :
                               paymentMethod === 'APS Wallet' ? 'APS Wallet ID / Phone Number' :
                               `${paymentMethod} Registered Mobile Number`}
                            </label>
                            <input
                              type="text"
                              value={accountRefNumber}
                              onChange={(e) => setAccountRefNumber(e.target.value)}
                              placeholder={selectedOpt.accountPlaceholder}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#E3EBEE] bg-white font-mono text-xs text-[#172B3A] outline-hidden focus:border-[#087F8C]"
                            />
                          </div>
                        )}

                        {/* Checkbox to save as default */}
                        {paymentMethod !== preferredPaymentMethod && (
                          <label className="flex items-center gap-2 pt-1 text-[11px] text-[#172B3A] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={saveAsPreferredInSettings}
                              onChange={(e) => setSaveAsPreferredInSettings(e.target.checked)}
                              className="w-3.5 h-3.5 accent-[#087F8C] rounded cursor-pointer"
                            />
                            <span>Set <strong>{paymentMethod}</strong> as my preferred payment method in Settings</span>
                          </label>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="pt-3 border-t border-[#E3EBEE] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#6C8290]">Total Refill Amount:</span>
                    <div className="text-lg font-black text-[#087F8C]">
                      {cartTotalGMD} GMD
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="py-2.5 px-6 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Authorize & Pay Refill
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
