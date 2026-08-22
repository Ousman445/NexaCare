import React, { useState } from 'react';
import { NexaLogo } from './components/NexaLogo';
import { SOSButton } from './components/SOSButton';
import { Roadmap } from './screens/Roadmap';

// Patient Screens
import { Welcome } from './screens/patient/Welcome';
import { Signup } from './screens/patient/Signup';
import { Login } from './screens/patient/Login';
import { Home } from './screens/patient/Home';
import { FindCare } from './screens/patient/FindCare';
import { HospitalDetail } from './screens/patient/HospitalDetail';
import { DoctorDetail } from './screens/patient/DoctorDetail';
import { GetTicket } from './screens/patient/GetTicket';
import { DigitalTicket } from './screens/patient/DigitalTicket';
import { MyQueue } from './screens/patient/MyQueue';
import { Appointments } from './screens/patient/Appointments';
import { EVisit } from './screens/patient/EVisit';
import { Records } from './screens/patient/Records';
import { Profile } from './screens/patient/Profile';
import { BloodDonor } from './screens/patient/BloodDonor';
import { Prescriptions } from './screens/patient/Prescriptions';
import { Vitals } from './screens/patient/Vitals';
import { Notifications } from './screens/patient/Notifications';
import { Messages } from './screens/patient/Messages';
import { PharmacyFinder } from './screens/patient/PharmacyFinder';
import { LabReports } from './screens/patient/LabReports';
import { AmbulanceDispatch } from './screens/patient/AmbulanceDispatch';
import { FindDoctor } from './screens/patient/FindDoctor';
import { FamilyProfiles } from './screens/patient/FamilyProfiles';
import { NexaChat } from './screens/patient/NexaChat';
import { NexaHotline } from './screens/patient/NexaHotline';
import { NexaVoice } from './screens/patient/NexaVoice';

// Hospital Staff Screens
import { StaffDashboard } from './screens/hospital/StaffDashboard';
import { DeskQueue } from './screens/hospital/DeskQueue';
import { StaffAppointments } from './screens/hospital/StaffAppointments';
import { StaffPatients } from './screens/hospital/StaffPatients';
import { StaffEVisits } from './screens/hospital/StaffEVisits';
import { DoctorConsults } from './screens/hospital/DoctorConsults';
import { StaffBedAvailability } from './screens/hospital/StaffBedAvailability';
import { StaffAnalytics } from './screens/hospital/StaffAnalytics';
import { StaffSettings } from './screens/hospital/StaffSettings';
import { TriageEntry } from './screens/hospital/TriageEntry';

// Data & Types
import { 
  Hospital, 
  Doctor, 
  QueueTicket, 
  Appointment, 
  DeskQueueItem,
  ChatConversation,
  ChatMessage,
  RefillOrder,
  DoctorInternalMessage,
  StaffAppointmentItem,
  PatientProfile,
  FamilyMember,
  PaymentMethod
} from './types';
import { 
  HOSPITALS, 
  INITIAL_TICKET, 
  INITIAL_APPOINTMENTS, 
  INITIAL_RECORDS, 
  INITIAL_DESK_QUEUE,
  INITIAL_CONVERSATIONS,
  GAMBIA_PHARMACIES,
  INITIAL_REFILL_ORDERS,
  INITIAL_LAB_REPORTS,
  DOCTOR_INTERNAL_MESSAGES,
  INITIAL_STAFF_APPOINTMENTS,
  INITIAL_EVISIT_REQUESTS
} from './store';

// Icons
import { 
  Home as HomeIcon, 
  Search, 
  Ticket, 
  FileText, 
  User, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Rocket, 
  LayoutDashboard, 
  MessageSquare,
  Pill,
  Stethoscope,
  Calendar,
  Video,
  BedDouble,
  Settings,
  Activity,
  UserPlus,
  Bell,
  Droplet,
  ArrowRightLeft,
  ChevronRight,
  ShieldAlert,
  Menu,
  X,
  PlusCircle,
  Building2,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
  LogOut,
  Sparkles,
  Phone,
  Mic,
  Navigation,
  RefreshCw,
  RotateCcw
} from 'lucide-react';

export function App() {
  // App mode: 'patient' or 'hospital'
  const [appMode, setAppMode] = useState<'patient' | 'hospital'>('patient');

  // Demo mode flag - defaults to false for pristine clean user experience
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Patient State - Starts completely clean by default!
  const [isAuth, setIsAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'welcome' | 'signup' | 'login'>('welcome');
  const [patientScreen, setPatientScreen] = useState<string>('home');
  const [userName, setUserName] = useState<string>('Guest User');
  const [userPhone, setUserPhone] = useState<string>('');
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  const [smsAlerts, setSmsAlerts] = useState<boolean>(true);

  // Active family member
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<string>('fm_1');

  // Messaging & Pharmacy State - clean by default
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('c1');
  const [refillOrders, setRefillOrders] = useState<RefillOrder[]>([]);
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState<PaymentMethod>('Wave');
  const [internalMessages, setInternalMessages] = useState<DoctorInternalMessage[]>(DOCTOR_INTERNAL_MESSAGES);

  // Selected Detail States
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(HOSPITALS[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(HOSPITALS[0].doctors[0]);

  // Appointments & Records State - clean by default
  const [appointments, setAppointments] = useState<{ upcoming: Appointment[]; past: Appointment[] }>({ upcoming: [], past: [] });
  const [records, setRecords] = useState<any[]>([]);

  // Hospital Desk State
  const [hospitalScreen, setHospitalScreen] = useState<string>('dashboard');
  const [deskQueue, setDeskQueue] = useState<DeskQueueItem[]>(INITIAL_DESK_QUEUE);
  const [staffAppointments, setStaffAppointments] = useState<StaffAppointmentItem[]>(INITIAL_STAFF_APPOINTMENTS);

  // Roadmap Modal
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  // Mobile menu drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop sidebar collapsed / hide state (persisted or toggleable)
  const [desktopSidebarHidden, setDesktopSidebarHidden] = useState(false);

  // Helper getters
  const currentHospital = HOSPITALS.find(h => h.id === selectedHospitalId) || HOSPITALS[0];
  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Demo activation and clean reset handlers
  const handleActivateDemoMode = () => {
    setIsDemoMode(true);
    setUserName('Ousman Jobe');
    setUserPhone('+220 701 4455');
    setTicket(INITIAL_TICKET);
    setAppointments(INITIAL_APPOINTMENTS);
    setRecords(INITIAL_RECORDS);
    setConversations(INITIAL_CONVERSATIONS);
    setRefillOrders(INITIAL_REFILL_ORDERS);
    setIsAuth(true);
    setPatientScreen('home');
  };

  const handleResetToCleanState = () => {
    setIsDemoMode(false);
    setTicket(null);
    setAppointments({ upcoming: [], past: [] });
    setRecords([]);
    setConversations([]);
    setRefillOrders([]);
    if (userName === 'Ousman Jobe' || userName === 'Ousman Bah') {
      setUserName('Guest User');
      setUserPhone('');
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setAuthMode('welcome');
    setPatientScreen('home');
    setIsDemoMode(false);
    setTicket(null);
    setAppointments({ upcoming: [], past: [] });
    setRecords([]);
    setConversations([]);
    setRefillOrders([]);
    setUserName('Guest User');
    setUserPhone('');
    setMobileMenuOpen(false);
  };

  // Patient side standard navigation items
  const patientNavItems: {
    id: string;
    label: string;
    icon: any;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon, badge: undefined },
    { id: 'nexachat', label: 'NexaChat Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'findcare', label: 'Find Care', icon: Search, badge: undefined },
    { id: 'finddoctor', label: 'Find a Doctor', icon: Stethoscope, badge: undefined },
    { id: 'myqueue', label: 'My Queue', icon: Ticket, badge: ticket ? `#${ticket.number}` : undefined },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: appointments.upcoming.length ? `${appointments.upcoming.length}` : undefined },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill, badge: undefined },
    { id: 'vitals', label: 'Vitals', icon: Activity, badge: undefined },
    { id: 'records', label: 'Records', icon: FileText, badge: undefined },
    { id: 'family', label: 'Family', icon: Users, badge: undefined },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '2' },
    { id: 'profile', label: 'Profile', icon: User, badge: undefined },
  ];

  // Emergency & Blood Network items placed in red box right above the line over Switch to Staff Portal
  const patientEmergencyItems = [
    { id: 'blooddonor', label: 'Blood Donor Network', icon: Droplet, badge: 'Urgent' },
    { id: 'hotline', label: 'NexaHotline (1122)', icon: Phone, badge: '1122' },
    { id: 'ambulance', label: 'Emergency GPS Tracker', icon: Navigation, badge: 'Live GPS' },
  ];

  // Staff portal sidebar navigation items (9 tabs)
  const staffNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'queue', label: 'Live Queue', icon: Users, badge: `${deskQueue.filter(q => q.status === 'Waiting' || q.status === 'waiting').length}` },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: `${staffAppointments.length}` },
    { id: 'patients', label: 'EHR Patients', icon: User },
    { id: 'evisits', label: 'E-Visits', icon: Video, badge: `${INITIAL_EVISIT_REQUESTS.filter(e => e.status === 'Waiting').length}` },
    { id: 'doctor_consults', label: 'Messages', icon: Stethoscope, badge: `${internalMessages.filter(m => m.priority === 'Urgent').length}` },
    { id: 'beds', label: 'Bed Census', icon: BedDouble },
    { id: 'staff_analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Navigation handlers
  const handleSelectHospital = (hospId: string) => {
    setSelectedHospitalId(hospId);
    setPatientScreen('hospital_detail');
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setPatientScreen('doctor_detail');
  };

  const handleBookTicketFlow = (hospId?: string) => {
    if (hospId) setSelectedHospitalId(hospId);
    setPatientScreen('get_ticket');
  };

  const handleConfirmTicket = (hosp: Hospital, dept: string, ahead: number, eta: number) => {
    const prefix = dept.charAt(0).toUpperCase();
    const num = `${prefix}-${Math.floor(10 + Math.random() * 89)}`;
    const newTicket: QueueTicket = {
      id: `tk_${Date.now()}`,
      number: num,
      hospitalId: hosp.id,
      hospitalName: hosp.name,
      dept,
      position: ahead,
      eta,
      status: 'In Queue',
      createdAt: new Date().toISOString()
    };
    setTicket(newTicket);
    setPatientScreen('digital_ticket');
  };

  const handleSimulateQueueProgress = () => {
    if (!ticket) return;
    const nextPos = Math.max(1, ticket.position - 1);
    const nextEta = Math.max(2, nextPos * 4);
    setTicket({
      ...ticket,
      position: nextPos,
      eta: nextEta,
      status: nextPos <= 2 ? 'Almost Up' : 'In Queue'
    });
  };

  const handleCancelTicket = () => {
    setTicket(null);
    setPatientScreen('home');
  };

  const handleBookAppointment = (doctorId: string) => {
    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.spec,
      hospital: currentHospital.name,
      date: 'Tomorrow',
      time: '11:00 AM',
      type: 'In-person',
      status: 'Confirmed'
    };
    setAppointments(prev => ({
      ...prev,
      upcoming: [newApt, ...prev.upcoming]
    }));
    setPatientScreen('appointments');
  };

  const handleTriageIssued = (ticketNumber: string, patientName: string) => {
    const newItem: DeskQueueItem = {
      id: `dq_${Date.now()}`,
      ticketNumber,
      patientName,
      dept: 'General OPD',
      waitTime: 0,
      status: 'Waiting',
      triage: 'Standard'
    };
    setDeskQueue(prev => [newItem, ...prev]);
    setHospitalScreen('queue');
  };

  // Messaging Handlers
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'patient_1',
      senderName: userName,
      senderRole: 'patient',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Simulate response after 1.2s
    setTimeout(() => {
      const activeConv = conversations.find(c => c.id === conversationId);
      const isDoctor = activeConv?.participantRole === 'Doctor';
      const autoReplyText = isDoctor
        ? `Hello ${userName.split(' ')[0]}, I have received your message. Please proceed according to prescribed instructions.`
        : `Greetings from the pharmacy team. We have confirmed the prescription order is in stock and ready.`;

      const replyMsg: ChatMessage = {
        id: `m_rep_${Date.now()}`,
        senderId: activeConv?.participantId || 'p1',
        senderName: activeConv?.participantName || 'Healthcare Provider',
        senderRole: activeConv?.participantRole === 'Doctor' ? 'doctor' : 'pharmacist',
        text: autoReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };

      setConversations(current =>
        current.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 1200);
  };

  const handleMessageDoctorDirect = (doctorId: string) => {
    const existing = conversations.find(c => c.participantId === doctorId || c.participantName.includes(selectedDoctor.name));
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConv: ChatConversation = {
        id: `c_${Date.now()}`,
        participantId: doctorId,
        participantName: selectedDoctor.name,
        participantRole: 'Doctor',
        participantSpec: selectedDoctor.spec,
        participantHospital: currentHospital.name,
        online: true,
        unreadCount: 0,
        messages: [
          {
            id: `m_init_${Date.now()}`,
            senderId: doctorId,
            senderName: selectedDoctor.name,
            senderRole: 'doctor',
            text: `Hello, this is ${selectedDoctor.name}. How can I assist you today?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: true
          }
        ]
      };
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    }
    setPatientScreen('messages');
  };

  const handleOpenPharmacistChat = (pharmacyName: string) => {
    const existing = conversations.find(c => c.participantHospital?.includes(pharmacyName) || c.participantRole === 'Pharmacist');
    if (existing) {
      setActiveConversationId(existing.id);
    }
    setPatientScreen('messages');
  };

  const handleConsultDoctorFromLab = (doctorName: string) => {
    const docConv = conversations.find(c => c.participantName.includes(doctorName) || c.participantRole === 'Doctor');
    if (docConv) {
      setActiveConversationId(docConv.id);
    }
    setPatientScreen('messages');
  };

  const handlePlaceRefillOrder = (order: Omit<RefillOrder, 'id' | 'orderDate'>) => {
    const newOrd: RefillOrder = {
      ...order,
      id: `ord_${Date.now()}`,
      orderDate: 'Today'
    };
    setRefillOrders(prev => [newOrd, ...prev]);
  };

  const handleSendDoctorConsult = (msg: Omit<DoctorInternalMessage, 'id' | 'timestamp'>) => {
    const newMsg: DoctorInternalMessage = {
      ...msg,
      id: `dm_${Date.now()}`,
      timestamp: 'Just now'
    };
    setInternalMessages(prev => [newMsg, ...prev]);
  };

  const handleRateAppointment = (id: string, rating: number, comment: string) => {
    setAppointments(prev => ({
      ...prev,
      past: prev.past.map(a => a.id === id ? { ...a, rating, reviewComment: comment } : a)
    }));
  };

  const handleReschedule = (id: string, newDate: string, newTime: string) => {
    setAppointments(prev => ({
      ...prev,
      upcoming: prev.upcoming.map(a => a.id === id ? { ...a, date: newDate, time: newTime } : a)
    }));
  };

  const handleCancelAppt = (id: string) => {
    setAppointments(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(a => a.id !== id)
    }));
  };

  // Keyboard shortcut (Ctrl/Cmd + B) to toggle sidebar menu on desktop
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        setDesktopSidebarHidden(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#EEF4F6] text-[#172B3A] flex flex-col font-sans selection:bg-[#087F8C] selection:text-white">
      
      {/* Top Universal Navbar (Sticky Header) */}
      <header className="bg-white border-b border-[#E3EBEE] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button for Tablet/Mobile quick drawer */}
            {isAuth && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-xl border border-[#E3EBEE] text-[#172B3A] md:hidden hover:bg-[#F5F9FA] cursor-pointer"
                title="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <div
              onClick={() => {
                if (appMode === 'patient') setPatientScreen('home');
                else setHospitalScreen('dashboard');
              }}
              className="cursor-pointer"
            >
              <NexaLogo size="sm" showSubtitle={true} />
            </div>
          </div>

          {/* Mode Switcher Pill, Demo State Switcher, & Roadmap Button */}
          <div className="flex items-center gap-2">
            
            {/* Demo / Clean state switcher in Patient Mode */}
            {appMode === 'patient' && isAuth && (
              <div className="hidden sm:flex items-center">
                {isDemoMode ? (
                  <button
                    onClick={handleResetToCleanState}
                    className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Click to reset to a completely clean state"
                  >
                    <RotateCcw className="w-3 h-3 text-amber-600" />
                    <span>Demo Mode (Reset to Clean)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleActivateDemoMode}
                    className="px-2.5 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#087F8C] border border-teal-200 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Click to load sample test data"
                  >
                    <Sparkles className="w-3 h-3 text-[#087F8C]" />
                    <span>Clean State (Load Demo Data)</span>
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => setRoadmapOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-[#E4F3F4] text-[#087F8C] hover:bg-teal-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Platform Roadmap"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Roadmap</span>
            </button>

            {/* Portal Switcher */}
            <div className="flex p-0.5 bg-[#F5F9FA] rounded-xl border border-[#E3EBEE]">
              <button
                onClick={() => {
                  setAppMode('patient');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  appMode === 'patient'
                    ? 'bg-[#087F8C] text-white shadow-xs'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                Patient App
              </button>
              <button
                onClick={() => {
                  setAppMode('hospital');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  appMode === 'hospital'
                    ? 'bg-[#172B3A] text-white shadow-xs'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                Staff Portal
              </button>
            </div>
          </div>

        </div>

        {/* Hospital Mode Sub-Navigation Bar (Mobile/Tablet quick scrollbar) */}
        {appMode === 'hospital' && (
          <div className="bg-[#F5F9FA] border-t border-[#E3EBEE] px-3 sm:px-6 py-1.5 overflow-x-auto">
            <div className="max-w-7xl mx-auto flex items-center gap-1 min-w-max text-xs font-bold">
              {staffNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = hospitalScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setHospitalScreen(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#087F8C] text-white shadow-xs'
                        : 'text-[#6C8290] hover:text-[#172B3A] hover:bg-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#E4F3F4] text-[#087F8C]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Responsive Body Layout (Sidebar on Desktop/Tablet + Responsive Content) */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex">
        
        {/* ================= DESKTOP/TABLET SIDE NAVIGATION ================= */}
        {isAuth && !desktopSidebarHidden && (
          <aside className="hidden md:flex flex-col w-60 lg:w-64 border-r border-[#E3EBEE] bg-white p-4 shrink-0 min-h-[calc(100vh-60px)] sticky top-[57px] self-start justify-between animate-in fade-in slide-in-from-left-2 duration-150">
            <div className="space-y-4">
              
              {/* Header inside Sidebar with quick Collapse icon */}
              <div className="flex items-center justify-between pb-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#6C8290]">
                  {appMode === 'hospital' ? 'Staff Console' : 'Patient Navigation'}
                </span>
                <button
                  onClick={() => setDesktopSidebarHidden(true)}
                  className="p-1 rounded-lg hover:bg-[#F5F9FA] text-[#6C8290] hover:text-[#172B3A] transition-colors cursor-pointer"
                  title="Hide Menu (Sidebar)"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              {/* Active Profile / Facility Card */}
              {appMode === 'patient' ? (
                <div 
                  onClick={() => setPatientScreen('profile')}
                  className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center gap-3 cursor-pointer hover:bg-[#EEF4F6] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#087F8C] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {userName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#172B3A] truncate">{userName}</div>
                    <div className="text-[11px] text-[#6C8290] flex items-center gap-1 font-mono">
                      <span>GM-748921</span>
                      <span className="text-[9px] px-1 py-0.2 bg-teal-100 text-[#087F8C] font-bold rounded">O+</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#087F8C] text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">Dr. Fatou Ceesay</div>
                      <div className="text-[10px] text-teal-300 truncate">Staff / Triage Attendant</div>
                    </div>
                  </div>

                  {/* Active Facility Selector */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
                      Current Facility
                    </label>
                    <select
                      value={selectedHospitalId}
                      onChange={(e) => setSelectedHospitalId(e.target.value)}
                      className="w-full bg-slate-800 text-white text-[11px] font-semibold rounded-lg px-2 py-1.5 border border-slate-700 focus:outline-hidden cursor-pointer"
                    >
                      {HOSPITALS.map(h => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Navigation Items (Patient vs Staff) */}
              <nav className="space-y-1">
                {(appMode === 'patient' ? patientNavItems : staffNavItems).map((item: any) => {
                  const Icon = item.icon;
                  const isActive = appMode === 'patient' ? patientScreen === item.id : hospitalScreen === item.id;
                  const hasRedCircle = !!item.hasRedCircle;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (appMode === 'patient') setPatientScreen(item.id);
                        else setHospitalScreen(item.id);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? (appMode === 'patient' ? 'bg-[#087F8C] text-white shadow-xs' : 'bg-[#172B3A] text-white shadow-xs')
                          : 'text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>

                      {item.badge ? (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#E4F3F4] text-[#087F8C]'
                        }`}>
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>

              {/* Staff Quick Action for Hospital Mode */}
              {appMode === 'hospital' && (
                <div className="pt-2 border-t border-[#E3EBEE]">
                  <button
                    onClick={() => setHospitalScreen('triage_entry')}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      hospitalScreen === 'triage_entry'
                        ? 'bg-[#2E9B68] text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Issue Triage Ticket</span>
                  </button>
                </div>
              )}

              {/* Patient Emergency & Blood Network Red Box right above the divider over switch portal */}
              {appMode === 'patient' && (
                <div className="pt-2">
                  <div className="p-1.5 bg-[#FBEAE9] border border-rose-200/80 rounded-2xl space-y-1 shadow-2xs">
                    {patientEmergencyItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = patientScreen === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setPatientScreen(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-[#D9534F] hover:bg-rose-100 hover:text-rose-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="relative flex items-center justify-center">
                              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rose-600'}`} />
                              <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                              </span>
                            </div>
                            <span className="truncate">{item.label}</span>
                          </div>

                          <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold shrink-0 ${
                            isActive 
                              ? 'bg-white/25 text-white' 
                              : 'bg-rose-200/80 text-rose-800'
                          }`}>
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions: Portal Switch & Log Out */}
            <div className="space-y-2 pt-4 border-t border-[#E3EBEE]">
              <button
                onClick={() => setAppMode(appMode === 'patient' ? 'hospital' : 'patient')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#172B3A] hover:bg-[#203a4e] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{appMode === 'patient' ? 'Switch to Staff Portal' : 'Switch to Patient App'}</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FBEAE9] hover:bg-rose-100 text-[#D9534F] hover:text-rose-700 text-xs font-bold transition-colors cursor-pointer border border-rose-200/60 shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

          </aside>
        )}

        {/* Floating Quick Reopen Tab when Desktop Menu is Hidden */}
        {isAuth && desktopSidebarHidden && (
          <aside className="hidden md:flex flex-col items-center py-4 px-2 border-r border-[#E3EBEE] bg-white shrink-0 sticky top-[57px] self-start min-h-[calc(100vh-60px)] gap-4 animate-in fade-in duration-150 shadow-2xs">
            <button
              onClick={() => setDesktopSidebarHidden(false)}
              className="p-2 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-white shadow-xs transition-all cursor-pointer group"
              title="Show Menu (Expand Sidebar)"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>

            {/* Compact Quick Icons for active mode when hidden */}
            <div className="flex flex-col items-center gap-2 pt-2 border-t border-[#E3EBEE]">
              {(appMode === 'patient' ? patientNavItems : staffNavItems).map((item: any) => {
                const Icon = item.icon;
                const isActive = appMode === 'patient' ? patientScreen === item.id : hospitalScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (appMode === 'patient') setPatientScreen(item.id);
                      else setHospitalScreen(item.id);
                    }}
                    title={item.label}
                    className={`p-2 rounded-xl transition-all cursor-pointer relative ${
                      isActive
                        ? (appMode === 'patient' ? 'bg-[#087F8C] text-white shadow-xs' : 'bg-[#172B3A] text-white shadow-xs')
                        : 'text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.badge ? (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#087F8C] ring-2 ring-white" />
                    ) : null}
                  </button>
                );
              })}

              {/* Red emergency cluster in collapsed mode */}
              {appMode === 'patient' && (
                <div className="flex flex-col items-center gap-1.5 p-1 bg-[#FBEAE9] border border-rose-200/80 rounded-xl mt-1">
                  {patientEmergencyItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = patientScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setPatientScreen(item.id)}
                        title={item.label}
                        className={`p-2 rounded-lg transition-all cursor-pointer relative ${
                          isActive
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-[#D9534F] hover:bg-rose-200/60'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 ring-1 ring-white"></span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ================= MOBILE SLIDEOUT DRAWER (PATIENT & STAFF COMPATIBLE) ================= */}
        {mobileMenuOpen && isAuth && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-50 bg-[#172B3A]/60 backdrop-blur-xs md:hidden flex animate-in fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-72 sm:w-80 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200 overflow-y-auto"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E3EBEE]">
                  <div className="flex items-center gap-2">
                    <NexaLogo size="sm" showSubtitle={false} />
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      appMode === 'hospital' ? 'bg-slate-900 text-white' : 'bg-[#E4F3F4] text-[#087F8C]'
                    }`}>
                      {appMode === 'hospital' ? 'Staff Portal' : 'Patient App'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl hover:bg-gray-100 text-[#6C8290] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Card (Patient vs Staff) */}
                {appMode === 'patient' ? (
                  <div 
                    onClick={() => {
                      setPatientScreen('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 rounded-2xl bg-[#F5F9FA] border border-[#E3EBEE] flex items-center gap-3 cursor-pointer hover:bg-[#EEF4F6] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#087F8C] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                      {userName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#172B3A] truncate">{userName}</div>
                      <div className="text-[11px] text-[#6C8290] font-mono">GM-748921 · O+</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#087F8C] text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate">Dr. Fatou Ceesay</div>
                        <div className="text-[10px] text-teal-300 truncate">Senior Medical Officer</div>
                      </div>
                    </div>

                    {/* Facility Switcher */}
                    <div className="pt-2 border-t border-slate-800">
                      <label className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
                        Assigned Hospital
                      </label>
                      <select
                        value={selectedHospitalId}
                        onChange={(e) => setSelectedHospitalId(e.target.value)}
                        className="w-full bg-slate-800 text-white text-[11px] font-semibold rounded-lg px-2 py-1.5 border border-slate-700 focus:outline-hidden"
                      >
                        {HOSPITALS.map(h => (
                          <option key={h.id} value={h.id}>{h.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Nav items list */}
                <nav className="space-y-1 max-h-[48vh] overflow-y-auto pr-1">
                  {(appMode === 'patient' ? patientNavItems : staffNavItems).map((item: any) => {
                    const Icon = item.icon;
                    const isActive = appMode === 'patient' ? patientScreen === item.id : hospitalScreen === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (appMode === 'patient') {
                            setPatientScreen(item.id);
                          } else {
                            setHospitalScreen(item.id);
                          }
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? (appMode === 'patient' ? 'bg-[#087F8C] text-white shadow-xs' : 'bg-[#172B3A] text-white shadow-xs')
                            : 'text-[#6C8290] hover:text-[#172B3A] hover:bg-[#F5F9FA]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>

                        {item.badge ? (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-[#E4F3F4] text-[#087F8C]'
                          }`}>
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </nav>

                {/* Extra Quick Action for Hospital Mode */}
                {appMode === 'hospital' && (
                  <button
                    onClick={() => {
                      setHospitalScreen('triage_entry');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer mt-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Issue Triage Ticket</span>
                  </button>
                )}

                {/* Patient Emergency Red Box in Mobile Drawer */}
                {appMode === 'patient' && (
                  <div className="pt-2">
                    <div className="p-1.5 bg-[#FBEAE9] border border-rose-200/80 rounded-2xl space-y-1 shadow-2xs">
                      {patientEmergencyItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = patientScreen === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setPatientScreen(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-[#D9534F] hover:bg-rose-100 hover:text-rose-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative flex items-center justify-center">
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-600'}`} />
                                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                                </span>
                              </div>
                              <span className="truncate">{item.label}</span>
                            </div>

                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold shrink-0 ${
                              isActive 
                                ? 'bg-white/25 text-white' 
                                : 'bg-rose-200/80 text-rose-800'
                            }`}>
                              {item.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Switcher & Log Out inside Drawer */}
              <div className="space-y-2 pt-4 border-t border-[#E3EBEE] mt-2">
                <button
                  onClick={() => {
                    setAppMode(appMode === 'patient' ? 'hospital' : 'patient');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#172B3A] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{appMode === 'patient' ? 'Switch to Staff Portal' : 'Switch to Patient App'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FBEAE9] hover:bg-rose-100 text-[#D9534F] hover:text-rose-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-rose-200/60 shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className={`flex-1 w-full px-3 sm:px-6 py-4 sm:py-6 pb-24 sm:pb-28 transition-all`}>
          
          {/* ================= PATIENT APP MODE SCREENS ================= */}
          {appMode === 'patient' && (
            <div className="w-full max-w-4xl mx-auto">
              {!isAuth ? (
                <div className="bg-white rounded-3xl border border-[#E3EBEE] shadow-sm overflow-hidden min-h-[640px] max-w-md mx-auto">
                  {authMode === 'welcome' && (
                    <Welcome
                      onSignup={() => setAuthMode('signup')}
                      onLogin={() => setAuthMode('login')}
                      onGuest={() => {
                        setUserName('Guest User');
                        setUserPhone('');
                        handleResetToCleanState();
                        setIsAuth(true);
                        setPatientScreen('home');
                      }}
                      onGuestDemo={handleActivateDemoMode}
                    />
                  )}
                  {authMode === 'signup' && (
                    <Signup
                      mode="signup"
                      onBack={() => setAuthMode('welcome')}
                      onSubmit={(n, p) => {
                        setUserName(n || 'New Patient');
                        setUserPhone(p || '');
                        handleResetToCleanState();
                        setIsAuth(true);
                        setPatientScreen('home');
                      }}
                      onSwitchMode={(newMode) => setAuthMode(newMode)}
                    />
                  )}
                  {authMode === 'login' && (
                    <Login
                      onBack={() => setAuthMode('welcome')}
                      onSubmit={(n, p, isDemo) => {
                        if (isDemo) {
                          handleActivateDemoMode();
                        } else {
                          setUserName(n || 'Registered Patient');
                          setUserPhone(p || '');
                          handleResetToCleanState();
                          setIsAuth(true);
                          setPatientScreen('home');
                        }
                      }}
                      onSwitchToSignup={() => setAuthMode('signup')}
                      onGuest={() => {
                        setUserName('Guest User');
                        setUserPhone('');
                        handleResetToCleanState();
                        setIsAuth(true);
                        setPatientScreen('home');
                      }}
                      onGuestDemo={handleActivateDemoMode}
                    />
                  )}
                </div>
              ) : (
                <div className="animate-in fade-in duration-200">
                  {patientScreen === 'home' && (
                    <Home
                      userName={userName}
                      ticket={ticket}
                      nextAppointment={appointments.upcoming[0]}
                      unreadMessageCount={unreadCount}
                      onNavigate={(screen) => setPatientScreen(screen)}
                      onSelectHospital={handleSelectHospital}
                    />
                  )}

                  {patientScreen === 'nexachat' && (
                    <NexaChat
                      onBackToHome={() => setPatientScreen('home')}
                      onTicketGenerated={(newTicket) => {
                        setTicket(newTicket);
                        setPatientScreen('digital_ticket');
                      }}
                      onEmergencyRedirect={() => setPatientScreen('ambulance')}
                      onHotlineRedirect={() => setPatientScreen('hotline')}
                    />
                  )}

                  {patientScreen === 'hotline' && (
                    <NexaHotline
                      onBackToHome={() => setPatientScreen('home')}
                      onGoToNexaChat={() => setPatientScreen('nexachat')}
                      onGoToEmergency={() => setPatientScreen('ambulance')}
                    />
                  )}

                  {patientScreen === 'voice' && (
                    <NexaVoice
                      onBackToHome={() => setPatientScreen('home')}
                      onGoToNexaChat={() => setPatientScreen('nexachat')}
                      onGoToHotline={() => setPatientScreen('hotline')}
                    />
                  )}

                  {patientScreen === 'sos' && (
                    <AmbulanceDispatch
                      onBackToHome={() => setPatientScreen('home')}
                    />
                  )}

                  {patientScreen === 'findcare' && (
                    <FindCare
                      onSelectHospital={handleSelectHospital}
                      onGetTicket={handleBookTicketFlow}
                      onSelectPharmacy={(pharm) => {
                        setPatientScreen('pharmacy');
                      }}
                    />
                  )}

                  {patientScreen === 'finddoctor' && (
                    <FindDoctor
                      onSelectDoctor={handleSelectDoctor}
                      onBookDoctor={(doc) => {
                        setSelectedDoctor(doc);
                        handleBookAppointment(doc.id);
                      }}
                      onStartEVisit={(doc) => {
                        setSelectedDoctor(doc);
                        setPatientScreen('evisit');
                      }}
                      onMessageDoctor={(doc) => {
                        setSelectedDoctor(doc);
                        handleMessageDoctorDirect(doc.id);
                      }}
                    />
                  )}

                  {patientScreen === 'family' && (
                    <FamilyProfiles
                      activeMemberId={activeFamilyMemberId}
                      onSwitchProfile={(member) => {
                        setActiveFamilyMemberId(member.id);
                        setUserName(member.name);
                        setPatientScreen('home');
                      }}
                    />
                  )}

                  {patientScreen === 'hospital_detail' && (
                    <HospitalDetail
                      hospital={currentHospital}
                      onBack={() => setPatientScreen('findcare')}
                      onSelectDoctor={handleSelectDoctor}
                      onGetTicket={handleBookTicketFlow}
                      onStartEvisit={() => setPatientScreen('evisit')}
                    />
                  )}

                  {patientScreen === 'doctor_detail' && (
                    <DoctorDetail
                      doctor={selectedDoctor}
                      hospital={currentHospital}
                      onBack={() => setPatientScreen('hospital_detail')}
                      onBookAppointment={handleBookAppointment}
                      onStartEvisit={() => setPatientScreen('evisit')}
                      onMessageDoctor={handleMessageDoctorDirect}
                    />
                  )}

                  {patientScreen === 'get_ticket' && (
                    <GetTicket
                      initialHospitalId={selectedHospitalId}
                      onBack={() => setPatientScreen('home')}
                      onConfirmTicket={handleConfirmTicket}
                    />
                  )}

                  {patientScreen === 'digital_ticket' && ticket && (
                    <DigitalTicket
                      ticket={ticket}
                      onBack={() => setPatientScreen('home')}
                      onTrackQueue={() => setPatientScreen('myqueue')}
                    />
                  )}

                  {patientScreen === 'myqueue' && (
                    <MyQueue
                      ticket={ticket}
                      smsEnabled={smsAlerts}
                      onToggleSms={() => setSmsAlerts(!smsAlerts)}
                      onSimulateQueue={handleSimulateQueueProgress}
                      onCancelTicket={handleCancelTicket}
                      onFindCare={() => setPatientScreen('findcare')}
                    />
                  )}

                  {patientScreen === 'messages' && (
                    <Messages
                      conversations={conversations}
                      activeConversationId={activeConversationId}
                      onSendMessage={handleSendMessage}
                      onStartEVisit={() => setPatientScreen('evisit')}
                      onBackToHome={() => setPatientScreen('home')}
                    />
                  )}

                  {patientScreen === 'pharmacy' && (
                    <PharmacyFinder
                      pharmacies={GAMBIA_PHARMACIES}
                      refillOrders={refillOrders}
                      preferredPaymentMethod={preferredPaymentMethod}
                      onUpdatePreferredPaymentMethod={setPreferredPaymentMethod}
                      onPlaceOrder={handlePlaceRefillOrder}
                      onOpenPharmacistChat={handleOpenPharmacistChat}
                      onBackToHome={() => setPatientScreen('home')}
                    />
                  )}

                  {patientScreen === 'lab_reports' && (
                    <LabReports
                      labReports={INITIAL_LAB_REPORTS}
                      onConsultDoctor={handleConsultDoctorFromLab}
                      onBackToHome={() => setPatientScreen('home')}
                    />
                  )}

                  {patientScreen === 'ambulance' && (
                    <AmbulanceDispatch
                      onBackToHome={() => setPatientScreen('home')}
                    />
                  )}

                  {patientScreen === 'appointments' && (
                    <Appointments
                      appointments={appointments}
                      onJoinEvisit={(apt) => setPatientScreen('evisit')}
                      onBookNew={() => setPatientScreen('findcare')}
                      onRateAppointment={handleRateAppointment}
                      onReschedule={handleReschedule}
                      onCancel={handleCancelAppt}
                    />
                  )}

                  {patientScreen === 'evisit' && (
                    <EVisit
                      doctorName={selectedDoctor.name}
                      doctorSpec={`${selectedDoctor.spec} · ${currentHospital.name.split(' ')[0]}`}
                      onEndCall={() => setPatientScreen('home')}
                      onNavigateToPharmacy={() => setPatientScreen('pharmacy')}
                    />
                  )}

                  {patientScreen === 'records' && (
                    <Records records={records} />
                  )}

                  {patientScreen === 'profile' && (
                    <Profile
                      userName={userName}
                      userPhone={userPhone}
                      preferredPaymentMethod={preferredPaymentMethod}
                      onUpdatePreferredPaymentMethod={setPreferredPaymentMethod}
                      onOpenRoadmap={() => setRoadmapOpen(true)}
                      onLogout={() => {
                        setIsAuth(false);
                        setAuthMode('login');
                      }}
                      onNavigate={(screen) => setPatientScreen(screen)}
                    />
                  )}

                  {patientScreen === 'blooddonor' && (
                    <BloodDonor onBack={() => setPatientScreen('home')} />
                  )}

                  {patientScreen === 'prescriptions' && (
                    <Prescriptions 
                      preferredPaymentMethod={preferredPaymentMethod}
                      onBack={() => setPatientScreen('home')} 
                      onGoToPharmacy={() => setPatientScreen('pharmacy')}
                    />
                  )}

                  {patientScreen === 'vitals' && (
                    <Vitals onBack={() => setPatientScreen('home')} />
                  )}

                  {patientScreen === 'notifications' && (
                    <Notifications onBack={() => setPatientScreen('home')} />
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= HOSPITAL STAFF PORTAL MODE SCREENS ================= */}
          {appMode === 'hospital' && (
            <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-200">
              {hospitalScreen === 'dashboard' && (
                <StaffDashboard
                  queueItems={deskQueue}
                  appointments={staffAppointments}
                  evisitRequests={INITIAL_EVISIT_REQUESTS}
                  onNavigate={(screen) => setHospitalScreen(screen)}
                  onOpenTriage={() => setHospitalScreen('triage_entry')}
                  onCallPatient={(id) => {
                    setDeskQueue(prev =>
                      prev.map(item => {
                        if (item.id === id) {
                          return { ...item, status: 'Calling' as const };
                        }
                        if (item.status === 'Calling') {
                          return { ...item, status: 'Completed' as const };
                        }
                        return item;
                      })
                    );
                  }}
                  onCompletePatient={(id) => {
                    setDeskQueue(prev =>
                      prev.map(item => item.id === id ? { ...item, status: 'Completed' as const } : item)
                    );
                  }}
                />
              )}

              {(hospitalScreen === 'queue' || hospitalScreen === 'desk_queue') && (
                <DeskQueue
                  queue={deskQueue}
                  onUpdateQueue={setDeskQueue}
                  onOpenTriage={() => setHospitalScreen('triage_entry')}
                />
              )}

              {hospitalScreen === 'appointments' && (
                <StaffAppointments
                  onStartEVisit={(apt) => setHospitalScreen('evisits')}
                />
              )}

              {hospitalScreen === 'patients' && (
                <StaffPatients
                  onStartEVisitWithPatient={(p) => setHospitalScreen('evisits')}
                  onBookAppointmentForPatient={(p) => setHospitalScreen('appointments')}
                />
              )}

              {hospitalScreen === 'evisits' && (
                <StaffEVisits />
              )}

              {hospitalScreen === 'doctor_consults' && (
                <DoctorConsults
                  messages={internalMessages}
                  onSendConsult={handleSendDoctorConsult}
                />
              )}

              {hospitalScreen === 'beds' && (
                <StaffBedAvailability />
              )}

              {hospitalScreen === 'staff_analytics' && (
                <StaffAnalytics />
              )}

              {hospitalScreen === 'settings' && (
                <StaffSettings />
              )}

              {hospitalScreen === 'triage_entry' && (
                <TriageEntry
                  onBack={() => setHospitalScreen('queue')}
                  onIssued={handleTriageIssued}
                />
              )}
            </div>
          )}

        </main>
      </div>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      {isAuth && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E3EBEE] py-1.5 px-2 pb-safe shadow-lg">
          {appMode === 'patient' ? (
            /* Patient Mobile Navigation (5 Items: Home · Find Care · My Queue · Meds · Profile) */
            <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
              <button
                onClick={() => setPatientScreen('home')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  patientScreen === 'home'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <HomeIcon className="w-5 h-5" />
                <span className="text-[10px] leading-none">Home</span>
              </button>

              <button
                onClick={() => setPatientScreen('findcare')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  patientScreen === 'findcare' || patientScreen === 'hospital_detail' || patientScreen === 'doctor_detail' || patientScreen === 'finddoctor'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="text-[10px] leading-none">Find Care</span>
              </button>

              <button
                onClick={() => setPatientScreen('myqueue')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer relative min-h-[48px] ${
                  patientScreen === 'myqueue' || patientScreen === 'get_ticket' || patientScreen === 'digital_ticket'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Ticket className="w-5 h-5" />
                <span className="text-[10px] leading-none">My Queue</span>
                {ticket && (
                  <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
                )}
              </button>

              <button
                onClick={() => setPatientScreen('prescriptions')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  patientScreen === 'prescriptions' || patientScreen === 'pharmacy'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Pill className="w-5 h-5" />
                <span className="text-[10px] leading-none">Meds</span>
              </button>

              <button
                onClick={() => setPatientScreen('profile')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  patientScreen === 'profile' || patientScreen === 'records' || patientScreen === 'family' || patientScreen === 'vitals'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px] leading-none">Profile</span>
              </button>
            </div>
          ) : (
            /* Staff Mobile Navigation (5 Items: Dashboard · Queue · + Intake · Consults · Menu) */
            <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
              <button
                onClick={() => setHospitalScreen('dashboard')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  hospitalScreen === 'dashboard'
                    ? 'text-[#172B3A] font-bold bg-slate-100'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[10px] leading-none">Desk</span>
              </button>

              <button
                onClick={() => setHospitalScreen('queue')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer relative min-h-[48px] ${
                  hospitalScreen === 'queue' || hospitalScreen === 'desk_queue'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-[10px] leading-none">Queue</span>
                <span className="absolute top-1 right-2.5 px-1 py-0.2 bg-teal-600 text-white text-[9px] font-extrabold rounded-full">
                  {deskQueue.filter(q => q.status === 'waiting').length}
                </span>
              </button>

              {/* Center Highlighted Action: New Triage Ticket */}
              <button
                onClick={() => setHospitalScreen('triage_entry')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  hospitalScreen === 'triage_entry'
                    ? 'text-white font-bold bg-emerald-700 shadow-sm'
                    : 'text-white font-bold bg-emerald-600 hover:bg-emerald-700 shadow-xs'
                }`}
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-[9px] leading-none uppercase tracking-tight">Triage</span>
              </button>

              <button
                onClick={() => setHospitalScreen('evisits')}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer relative min-h-[48px] ${
                  hospitalScreen === 'evisits' || hospitalScreen === 'doctor_consults'
                    ? 'text-[#087F8C] font-bold bg-[#E4F3F4]/50'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="text-[10px] leading-none">E-Visits</span>
                <span className="absolute top-1 right-2.5 px-1 py-0.2 bg-amber-500 text-white text-[9px] font-extrabold rounded-full">
                  2
                </span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                  mobileMenuOpen
                    ? 'text-[#172B3A] font-bold bg-slate-200'
                    : 'text-[#6C8290] hover:text-[#172B3A]'
                }`}
              >
                <Menu className="w-5 h-5" />
                <span className="text-[10px] leading-none">Menu</span>
              </button>
            </div>
          )}
        </nav>
      )}

      {/* Floating SOS Emergency Action (Patient Mode on Mobile) */}
      {isAuth && appMode === 'patient' && (
        <div className="md:hidden">
          <SOSButton variant="floating" />
        </div>
      )}

      {/* Roadmap Modal */}
      <Roadmap
        isOpen={roadmapOpen}
        onClose={() => setRoadmapOpen(false)}
        onOpenVoiceConcept={() => {
          setRoadmapOpen(false);
          setPatientScreen('voice');
        }}
      />

    </div>
  );
}

export default App;
