export interface Patient {
  id: string; // e.g. GM-748921
  name: string;
  nationalId?: string;
  bloodType: string;
  allergies: string[];
  insurance?: {
    provider: string; // e.g. NHIS / SSHFC / Private
    policyNumber: string;
    validUntil: string;
  };
  phone: string;
  email?: string;
  age: number;
  gender: string;
  address?: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration?: string;
  reminderTimes?: string[]; // e.g. ["08:00 AM", "08:00 PM"]
  instructions?: string;
  category?: string;
  remainingPills?: number;
}

export interface VitalEntry {
  id: string;
  date: string;
  time?: string;
  bloodPressure: string; // e.g. 120/80
  bloodSugar: string; // e.g. 98 mg/dL
  weight: string; // e.g. 74 kg
  heartRate: number; // e.g. 72 bpm
  temperature: string; // e.g. 36.8 °C
  notes?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'queue' | 'appointment' | 'result' | 'prescription' | 'system';
  read: boolean;
  link?: string;
  badge?: string;
}

export interface DoctorRating {
  id?: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface StaffMessage {
  id: string;
  fromStaff: string;
  fromRole?: string;
  toStaff: string;
  patientRef?: string; // GM-XXXXXX or patient name
  patientId?: string;
  subject: string;
  content: string;
  isUrgent: boolean;
  priority: 'Routine' | 'Urgent' | 'Emergency Referral';
  timestamp: string;
}

export interface Ward {
  id: string;
  hospitalId: string;
  hospitalName: string;
  name: string;
  type: 'ICU' | 'Maternity' | 'Surgical' | 'Paediatric' | 'General';
  bedCount: number;
  occupiedCount: number;
  availableBeds: number;
  status: 'Available' | 'Near Capacity' | 'Full';
  lastUpdated?: string;
}

export interface DepartmentQueue {
  name: string;
  count: number;
  avgWaitMins: number;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  status: 'Open' | 'Busy' | 'Closed';
  wait: string;
  queueCount?: number;
  departmentQueues?: DepartmentQueue[];
  hours: string;
  location: string;
  region: string;
  phone: string;
  email: string;
  depts: string[];
  services: string[];
  color: string;
  doctors: Doctor[];
  coordinates?: { x: number; y: number };
  rating?: string;
  bedOccupancy?: number;
}

export interface Doctor {
  id: string;
  name: string;
  spec: string;
  avail: string;
  rating: string;
  experience?: string;
  languages?: string[];
  education?: string;
  hospitalName?: string;
  avatarUrl?: string;
  online?: boolean;
}

export interface Appointment {
  id: string;
  doctor: string;
  hospital: string;
  date: string;
  time: string;
  type: 'In-person' | 'E-Visit';
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
  specialty?: string;
  rating?: number;
  reviewComment?: string;
}

export interface MedicalRecord {
  id: string;
  label: string;
  hospital: string;
  date: string;
  note?: string;
  result?: string;
  type?: 'visit' | 'test' | 'procedure';
  doctor?: string;
}

export interface PatientRecordData {
  patientId: string;
  visits: MedicalRecord[];
  tests: MedicalRecord[];
  procedures: MedicalRecord[];
}

export interface QueueTicket {
  id?: string;
  number: string;
  dept: string;
  hospitalName: string;
  hospitalId: string;
  position: number;
  eta: number;
  status?: string;
  createdAt?: string;
  reason?: string;
}

export interface DeskQueueItem {
  id: string;
  patient?: string;
  patientName?: string;
  ticketNumber?: string;
  dept: string;
  status: 'waiting' | 'serving' | 'completed' | 'skipped' | 'Waiting' | 'Calling' | 'Completed';
  wait?: string;
  waitTime?: number;
  triage?: 'normal' | 'priority' | 'emergency' | 'Standard' | 'Priority' | 'Emergency';
  priority?: string;
  time?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  visits: number;
  lastVisit: string;
  phone?: string;
  email?: string;
  address?: string;
  bloodGroup?: string;
  allergies?: string[];
  diagnosis?: string;
  attendingDoctor?: string;
  nextOfKin?: {
    name: string;
    relation: string;
    phone: string;
  };
  visitHistory: string[];
  procedures: string[];
  prescriptions?: string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Self' | 'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Other';
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  nationalId?: string;
  emergencyContact?: string;
  isPrimary?: boolean;
}

export interface BloodDonorRequest {
  id: string;
  hospital: string;
  bloodType: string;
  unitsNeeded: number;
  urgency: 'Immediate' | 'Within 24h' | 'Routine';
  contactPhone: string;
  postedDate: string;
  contactPerson?: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  status: 'Active' | 'Refill Needed' | 'Completed' | 'Expired';
  startDate: string;
  endDate?: string;
  refillsRemaining: number;
  instructions?: string;
}

export interface VitalLog {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: number;
  temperature: string;
  bloodSugar: string;
  weight?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'doctor' | 'pharmacist' | 'system';
  text: string;
  timestamp: string;
  attachment?: {
    type: 'prescription' | 'image' | 'lab_report' | 'voice_note';
    title: string;
    url?: string;
    duration?: string;
  };
  isRead?: boolean;
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'Doctor' | 'Pharmacist' | 'Specialist';
  participantSpec: string;
  participantHospital: string;
  online: boolean;
  lastSeen?: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface PharmacyMedication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  priceGMD: number;
  inStock: boolean;
  stockCount: number;
  requiresPrescription: boolean;
  description: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  area: string;
  phone: string;
  hours: string;
  isOpen24h: boolean;
  rating: string;
  deliveryAvailable: boolean;
  distance: string;
  coordinates?: { x: number; y: number };
  inventory: PharmacyMedication[];
}

export type PaymentMethod = 
  | 'Wave' 
  | 'QMoney' 
  | 'AfriMoney' 
  | 'APS Wallet' 
  | 'Bank Transfer' 
  | 'Cash on Delivery' 
  | 'NHIS Card';

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  provider: string;
  category: 'Mobile Money' | 'Digital Wallet' | 'Banking' | 'Cash / Insurance';
  accountPlaceholder: string;
  ussdOrCode?: string;
  badge: string;
  iconName: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  instructions: string;
}

export interface RefillOrder {
  id: string;
  pharmacyName: string;
  pharmacyPhone: string;
  medications: { name: string; quantity: number; priceGMD: number }[];
  totalGMD: number;
  deliveryType: 'Pick-up' | 'Home Delivery';
  deliveryAddress?: string;
  status: 'Pending' | 'Ready for Pickup' | 'Out for Delivery' | 'Completed';
  orderDate: string;
  paymentMethod: PaymentMethod;
  accountReference?: string;
}

export interface LabReportDetail {
  id: string;
  testName: string;
  facility: string;
  doctor: string;
  date: string;
  status: 'Final' | 'Pending Analysis';
  summary: string;
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'Normal' | 'High' | 'Low' | 'Abnormal';
  }[];
  doctorNotes: string;
}

export interface DoctorInternalMessage {
  id: string;
  fromDoctorId: string;
  fromDoctorName: string;
  fromDoctorSpec: string;
  toDoctorId: string;
  toDoctorName: string;
  patientId: string;
  patientName: string;
  subject: string;
  content: string;
  priority: 'Routine' | 'Urgent' | 'Emergency Referral';
  timestamp: string;
}

export interface WardBedInfo {
  id: string;
  hospitalId: string;
  hospitalName: string;
  ward: 'ICU' | 'Maternity' | 'Surgical' | 'Paediatric' | 'General';
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  status: 'Available' | 'Near Capacity' | 'Full';
  lastUpdated: string;
}

export interface StaffAppointmentItem {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  time: string;
  dept: string;
  doctor: string;
  type: 'In-person' | 'E-Visit';
  reason: string;
  status: 'Scheduled' | 'Checked In' | 'Completed' | 'Cancelled';
}

export interface EVisitRequest {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  complaint: string;
  time: string;
  status: 'Waiting' | 'In Progress' | 'Completed';
  priority: 'Routine' | 'Urgent';
}
