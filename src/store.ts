import { 
  Hospital, 
  Appointment, 
  PatientRecordData, 
  DeskQueueItem, 
  PatientProfile, 
  BloodDonorRequest,
  Prescription,
  VitalLog,
  QueueTicket,
  ChatConversation,
  Pharmacy,
  LabReportDetail,
  DoctorInternalMessage,
  RefillOrder,
  FamilyMember,
  WardBedInfo,
  StaffAppointmentItem,
  EVisitRequest,
  PaymentMethod,
  PaymentMethodOption,
  AppNotification
} from './types';

export const HOSPITALS: Hospital[] = [
  {
    id: 'h_africmed',
    name: 'Africmed Clinic & Hospital',
    type: 'Private Hospital',
    status: 'Open',
    wait: 'Low',
    queueCount: 12,
    departmentQueues: [
      { name: 'General OPD', count: 4, avgWaitMins: 12 },
      { name: 'Pediatrics', count: 3, avgWaitMins: 10 },
      { name: 'Cardiology', count: 2, avgWaitMins: 15 },
      { name: 'Emergency', count: 1, avgWaitMins: 5 },
      { name: 'Executive Health', count: 1, avgWaitMins: 10 },
      { name: 'Dental', count: 1, avgWaitMins: 15 }
    ],
    hours: '24 hours',
    location: 'Brusubi Roundabout, Coastal Road',
    region: 'West Coast Region (WCR)',
    phone: '+220 446 0888',
    email: 'care@africmed.gm',
    depts: ['Emergency', 'General OPD', 'Pediatrics', 'Cardiology', 'Surgical Theatre', 'Executive Health', 'Dental'],
    services: ['Executive Health Checkups', 'Digital Ultrasound', 'Pediatric ICU', 'Minimally Invasive Surgery', '24/7 Ambulance Dispatch'],
    color: '#2E9B68',
    rating: '4.9',
    bedOccupancy: 64,
    coordinates: { x: 18, y: 52 },
    doctors: [
      {
        id: 'd_omar',
        name: 'Dr. Omar Touray',
        spec: 'Internal Medicine & Executive Care',
        avail: 'Available today · 1:15pm',
        rating: '4.9',
        experience: '13 years',
        languages: ['English', 'Wolof', 'French'],
        education: 'King’s College London / UTG',
        hospitalName: 'Africmed Clinic & Hospital',
        online: true
      },
      {
        id: 'd_kumba',
        name: 'Dr. Kumba Njie',
        spec: 'Pediatrics & Neonatology',
        avail: 'Available today · 4:00pm',
        rating: '4.8',
        experience: '9 years',
        languages: ['English', 'Wolof', 'Mandinka'],
        education: 'UTG Medical Faculty',
        hospitalName: 'Africmed Clinic & Hospital',
        online: true
      }
    ]
  },
  {
    id: 'h_ahmadiyya',
    name: 'Ahmadiyya Muslim Hospital',
    type: 'Mission Hospital',
    status: 'Open',
    wait: 'Moderate',
    queueCount: 28,
    departmentQueues: [
      { name: 'General OPD', count: 12, avgWaitMins: 25 },
      { name: 'Ophthalmology', count: 6, avgWaitMins: 20 },
      { name: 'Maternity', count: 4, avgWaitMins: 15 },
      { name: 'Dental', count: 3, avgWaitMins: 15 },
      { name: 'Pharmacy', count: 3, avgWaitMins: 8 }
    ],
    hours: '24 hours',
    location: 'Tallinding Kunjang, KMC',
    region: 'Kanifing Municipality (KMC)',
    phone: '+220 437 2022',
    email: 'info@ahmadiyyahospital.gm',
    depts: ['Emergency', 'General OPD', 'Maternity', 'Ophthalmology', 'Dental', 'Pharmacy', 'Physiotherapy'],
    services: ['Cataract Surgery', 'Affordable Maternity Care', 'Dental Extraction & Filling', 'Community Health'],
    color: '#087F8C',
    rating: '4.6',
    bedOccupancy: 78,
    coordinates: { x: 26, y: 44 },
    doctors: [
      {
        id: 'd_tariq',
        name: 'Dr. Tariq Mahmood',
        spec: 'Ophthalmology Surgeon',
        avail: 'Available today · 2:45pm',
        rating: '4.8',
        experience: '17 years',
        languages: ['English', 'Urdu', 'Wolof'],
        education: 'Nishtar Medical University',
        hospitalName: 'Ahmadiyya Muslim Hospital',
        online: true
      }
    ]
  },
  {
    id: 'h_bansang',
    name: 'Bansang General Hospital',
    type: 'General Hospital',
    status: 'Open',
    wait: 'Moderate',
    queueCount: 34,
    departmentQueues: [
      { name: 'General OPD', count: 14, avgWaitMins: 30 },
      { name: 'Maternity', count: 8, avgWaitMins: 20 },
      { name: 'Pediatrics', count: 6, avgWaitMins: 15 },
      { name: 'Eye Clinic', count: 4, avgWaitMins: 20 },
      { name: 'Emergency', count: 2, avgWaitMins: 5 }
    ],
    hours: '24 hours',
    location: 'Bansang Town, Central River Region',
    region: 'Central River Region (CRR)',
    phone: '+220 567 1100',
    email: 'bansang.hosp@moh.gov.gm',
    depts: ['Emergency', 'General OPD', 'Maternity', 'Pediatrics', 'Surgical Unit', 'Eye Clinic', 'Pharmacy'],
    services: ['CRR Regional Referral', 'Obstetric Emergencies', 'Ophthalmic Outreach', 'Inpatient Care'],
    color: '#E9A23B',
    rating: '4.6',
    bedOccupancy: 76,
    coordinates: { x: 80, y: 55 },
    doctors: [
      {
        id: 'd_amadou',
        name: 'Dr. Amadou Jallow',
        spec: 'General Practice & Obstetrics',
        avail: 'Available today · 1:00pm',
        rating: '4.8',
        experience: '10 years',
        languages: ['English', 'Fula', 'Mandinka'],
        education: 'UTG / Cuban Medical Brigade',
        hospitalName: 'Bansang General Hospital',
        online: true
      }
    ]
  },
  {
    id: 'h_efsth',
    name: 'Edward Francis Small Teaching Hospital (EFSTH)',
    type: 'National Referral Hospital',
    status: 'Busy',
    wait: 'High',
    queueCount: 68,
    departmentQueues: [
      { name: 'General OPD', count: 22, avgWaitMins: 45 },
      { name: 'Trauma & Emergency', count: 12, avgWaitMins: 10 },
      { name: 'Internal Medicine', count: 10, avgWaitMins: 35 },
      { name: 'Cardiology', count: 8, avgWaitMins: 30 },
      { name: 'Renal Unit', count: 6, avgWaitMins: 25 },
      { name: 'Radiology', count: 5, avgWaitMins: 20 },
      { name: 'ICU', count: 5, avgWaitMins: 15 }
    ],
    hours: '24 hours',
    location: 'Independence Drive, Marina Parade, Banjul',
    region: 'Banjul City',
    phone: '+220 422 7700',
    email: 'efsth.info@moh.gov.gm',
    depts: ['Emergency', 'Trauma & Emergency', 'Cardiology', 'Neurology', 'Internal Medicine', 'ICU', 'Renal Unit', 'Radiology', 'Laboratory', 'Pharmacy'],
    services: ['Tertiary Specialist Care', 'Dialysis Services', 'Emergency Surgery', 'Intensive Care Units', 'Advanced Pathology', 'CT / MRI Diagnostics'],
    color: '#D9534F',
    rating: '4.7',
    bedOccupancy: 91,
    coordinates: { x: 23, y: 22 },
    doctors: [
      {
        id: 'd_alieu',
        name: 'Prof. Alieu Badara Gaye',
        spec: 'Trauma & Critical Care',
        avail: 'Emergency On-call',
        rating: '5.0',
        experience: '22 years',
        languages: ['English', 'Wolof', 'French'],
        education: 'Fellow of Royal College of Surgeons',
        hospitalName: 'Edward Francis Small Teaching Hospital (EFSTH)',
        online: true
      },
      {
        id: 'd_abdoulie',
        name: 'Dr. Abdoulie Cham',
        spec: 'Nephrology & Renal Medicine',
        avail: 'Available today · 3:30pm',
        rating: '4.9',
        experience: '16 years',
        languages: ['English', 'Wolof', 'Mandinka'],
        education: 'University of Ghana Medical School',
        hospitalName: 'Edward Francis Small Teaching Hospital (EFSTH)',
        online: false
      }
    ]
  },
  {
    id: 'h_farafenni',
    name: 'Farafenni Regional Hospital',
    type: 'Regional Referral Hospital',
    status: 'Open',
    wait: 'Moderate',
    queueCount: 31,
    departmentQueues: [
      { name: 'General OPD', count: 13, avgWaitMins: 25 },
      { name: 'Maternity', count: 7, avgWaitMins: 20 },
      { name: 'Paediatric Ward', count: 5, avgWaitMins: 15 },
      { name: 'Surgery', count: 3, avgWaitMins: 30 },
      { name: 'TB Clinic', count: 3, avgWaitMins: 15 }
    ],
    hours: '24 hours',
    location: 'Trans-Gambia Highway, Farafenni',
    region: 'North Bank Region (NBR)',
    phone: '+220 571 0123',
    email: 'farafenni.hosp@moh.gov.gm',
    depts: ['Emergency', 'Maternity', 'Surgery', 'Paediatric Ward', 'Malaria Lab', 'TB Clinic', 'Pharmacy'],
    services: ['North Bank Regional Triage', 'Emergency Caesarean', 'Blood Transfusion', 'TB DOTS Management'],
    color: '#4F8FC0',
    rating: '4.6',
    bedOccupancy: 85,
    coordinates: { x: 58, y: 38 },
    doctors: [
      {
        id: 'd_musa_f',
        name: 'Dr. Musa Dibba',
        spec: 'Emergency & General Surgery',
        avail: 'Available today · 11:00am',
        rating: '4.7',
        experience: '11 years',
        languages: ['English', 'Mandinka', 'Wolof', 'Fula'],
        education: 'UTG Medical Faculty',
        hospitalName: 'Farafenni Regional Hospital',
        online: true
      }
    ]
  },
  {
    id: 'h_kololi',
    name: 'Kololi Medical Centre',
    type: 'Private Clinic',
    status: 'Open',
    wait: 'Low',
    queueCount: 8,
    departmentQueues: [
      { name: 'General OPD', count: 4, avgWaitMins: 10 },
      { name: 'Travel Medicine', count: 2, avgWaitMins: 8 },
      { name: 'Dermatology', count: 1, avgWaitMins: 12 },
      { name: 'Diagnostics', count: 1, avgWaitMins: 10 }
    ],
    hours: '8:00am – 9:00pm',
    location: 'Senegambia Strip, Kololi',
    region: 'Kanifing Municipality (KMC)',
    phone: '+220 446 3030',
    email: 'info@kololimedical.gm',
    depts: ['General OPD', 'Travel Medicine', 'Diagnostics', 'Dermatology', 'Pharmacy'],
    services: ['Travel Vaccinations', 'Rapid Tropical Screening', 'Skin Consultations', 'ECG & Diagnostics'],
    color: '#2E9B68',
    rating: '4.9',
    bedOccupancy: 50,
    coordinates: { x: 16, y: 42 },
    doctors: [
      {
        id: 'd_sarah',
        name: 'Dr. Sarah Badjie',
        spec: 'Family & Travel Medicine',
        avail: 'Available today · 10:30am',
        rating: '4.9',
        experience: '10 years',
        languages: ['English', 'German', 'Wolof'],
        education: 'Charité Berlin / UTG',
        hospitalName: 'Kololi Medical Centre',
        online: true
      }
    ]
  },
  {
    id: 'h_mrc',
    name: 'MRC Unit The Gambia at LSHTM',
    type: 'Specialist Research Hospital',
    status: 'Open',
    wait: 'Low',
    queueCount: 14,
    departmentQueues: [
      { name: 'Clinical Research', count: 5, avgWaitMins: 15 },
      { name: 'Pediatric Clinical Trials', count: 4, avgWaitMins: 12 },
      { name: 'Infectious Disease', count: 3, avgWaitMins: 15 },
      { name: 'Laboratory', count: 2, avgWaitMins: 10 }
    ],
    hours: '8:00am – 6:00pm',
    location: 'Atlantic Road, Fajara',
    region: 'Kanifing Municipality (KMC)',
    phone: '+220 449 5442',
    email: 'clinical.services@mrc.gm',
    depts: ['Clinical Research', 'Infectious Disease', 'Pediatric Clinical Trials', 'Advanced Genomics', 'Laboratory'],
    services: ['Specialist Clinical Trials', 'Pneumococcal & Malaria Studies', 'Advanced Molecular Diagnostics'],
    color: '#087F8C',
    rating: '5.0',
    bedOccupancy: 70,
    coordinates: { x: 17, y: 28 },
    doctors: [
      {
        id: 'd_ebrahim',
        name: 'Dr. Ebrahim Kanteh',
        spec: 'Infectious Diseases & Clinical Trials',
        avail: 'Available Fri · 10:00am',
        rating: '5.0',
        experience: '18 years',
        languages: ['English', 'Mandinka', 'French'],
        education: 'London School of Hygiene & Tropical Medicine',
        hospitalName: 'MRC Unit The Gambia at LSHTM',
        online: false
      }
    ]
  },
  {
    id: 'h_ndungu',
    name: 'Ndungu Kebbeh Health Centre',
    type: 'Health Centre',
    status: 'Open',
    wait: 'Low',
    queueCount: 9,
    departmentQueues: [
      { name: 'Primary OPD', count: 4, avgWaitMins: 10 },
      { name: 'Maternal Child Health (MCH)', count: 3, avgWaitMins: 12 },
      { name: 'Immunization', count: 2, avgWaitMins: 8 }
    ],
    hours: '8:00am – 5:00pm',
    location: 'Lower Niumi District, NBR',
    region: 'North Bank Region (NBR)',
    phone: '+220 744 5500',
    email: 'ndungu.hc@moh.gov.gm',
    depts: ['Emergency', 'Primary OPD', 'Maternal Child Health (MCH)', 'Immunization', 'Nutrition', 'Pharmacy'],
    services: ['Primary Healthcare', 'Childhood Vaccines', 'Antenatal Screenings', 'Malaria Rapid Testing'],
    color: '#4F8FC0',
    rating: '4.5',
    bedOccupancy: 45,
    coordinates: { x: 24, y: 16 },
    doctors: [
      {
        id: 'd_binta_c',
        name: 'Dr. Binta Camara',
        spec: 'Primary & Rural Health Care',
        avail: 'Available today · 11:30am',
        rating: '4.7',
        experience: '6 years',
        languages: ['English', 'Wolof', 'Mandinka'],
        education: 'UTG School of Medicine',
        hospitalName: 'Ndungu Kebbeh Health Centre',
        online: true
      }
    ]
  },
  {
    id: 'h_rvth',
    name: 'RVTH (Royal Victoria Teaching Hospital Wing)',
    type: 'National Referral Hospital',
    status: 'Busy',
    wait: 'High',
    queueCount: 42,
    departmentQueues: [
      { name: 'Cardiovascular OPD', count: 14, avgWaitMins: 35 },
      { name: 'Surgical Wing', count: 11, avgWaitMins: 30 },
      { name: 'Orthopedic Clinic', count: 10, avgWaitMins: 25 },
      { name: 'Pathology', count: 7, avgWaitMins: 20 }
    ],
    hours: '24 hours',
    location: 'Independence Drive Historic Wing, Banjul',
    region: 'Banjul City',
    phone: '+220 422 8222',
    email: 'rvth.wing@moh.gov.gm',
    depts: ['Emergency', 'Surgical Wing', 'Cardiovascular OPD', 'Orthopedic Clinic', 'Pathology', 'Pharmacy'],
    services: ['Orthopedic Reconstructions', 'Cardiology Consultations', 'Major General Surgeries'],
    color: '#D9534F',
    rating: '4.7',
    bedOccupancy: 88,
    coordinates: { x: 22, y: 20 },
    doctors: [
      {
        id: 'd_momodou',
        name: 'Dr. Momodou Bah',
        spec: 'General Surgeon & Orthopedics',
        avail: 'Next slot Fri · 10:00am',
        rating: '4.8',
        experience: '14 years',
        languages: ['English', 'Fula', 'Wolof'],
        education: 'West African College of Surgeons',
        hospitalName: 'RVTH (Royal Victoria Teaching Hospital Wing)',
        online: true
      }
    ]
  },
  {
    id: 'h_serekunda',
    name: 'Serekunda General Hospital',
    type: 'Government Hospital',
    status: 'Open',
    wait: 'Moderate',
    queueCount: 53,
    departmentQueues: [
      { name: 'General OPD', count: 18, avgWaitMins: 35 },
      { name: 'Maternity', count: 11, avgWaitMins: 25 },
      { name: 'Pediatrics', count: 9, avgWaitMins: 20 },
      { name: 'Emergency', count: 6, avgWaitMins: 10 },
      { name: 'Cardiology', count: 5, avgWaitMins: 25 },
      { name: 'Pharmacy', count: 4, avgWaitMins: 10 }
    ],
    hours: '24 hours',
    location: 'Mosque Road, Serekunda',
    region: 'Kanifing Municipality (KMC)',
    phone: '+220 439 5678',
    email: 'info@serekunda-gh.gm',
    depts: ['Emergency', 'General OPD', 'Maternity', 'Pediatrics', 'Laboratory', 'Pharmacy', 'Cardiology'],
    services: ['Emergency Care', 'Maternity & Antenatal', 'General Consultation', 'Laboratory Testing', 'Pharmacy', 'X-Ray Diagnostics'],
    color: '#087F8C',
    rating: '4.8',
    bedOccupancy: 82,
    coordinates: { x: 20, y: 36 },
    doctors: [
      {
        id: 'd_fatou',
        name: 'Dr. Fatou Ceesay',
        spec: 'General Practitioner',
        avail: 'Available today · 2:00pm',
        rating: '4.8',
        experience: '8 years',
        languages: ['English', 'Wolof', 'Mandinka'],
        education: 'University of The Gambia, School of Medicine',
        hospitalName: 'Serekunda General Hospital',
        online: true
      },
      {
        id: 'd_lamin',
        name: 'Dr. Lamin Jarju',
        spec: 'Obstetrics & Gynaecology',
        avail: 'Next slot tomorrow · 9:00am',
        rating: '4.9',
        experience: '12 years',
        languages: ['English', 'Jola', 'Mandinka'],
        education: 'Dakar University / UTG',
        hospitalName: 'Serekunda General Hospital',
        online: false
      },
      {
        id: 'd_mariama',
        name: 'Dr. Mariama Jatta',
        spec: 'Cardiology Specialist',
        avail: 'Next slot Thu · 11:30am',
        rating: '4.9',
        experience: '15 years',
        languages: ['English', 'Wolof'],
        education: 'Royal College of Physicians / UTG',
        hospitalName: 'Serekunda General Hospital',
        online: true
      }
    ]
  }
];

export const GAMBIA_PHARMACIES: Pharmacy[] = [
  {
    id: 'ph_stop_shop',
    name: 'Stop & Shop Pharmacy',
    location: 'Kairaba Avenue, Fajara',
    area: 'Fajara / KMC',
    phone: '+220 449 6700',
    hours: '24 Hours (Day & Night)',
    isOpen24h: true,
    rating: '4.9',
    deliveryAvailable: true,
    distance: '1.2 km away',
    coordinates: { x: 19, y: 32 },
    inventory: [
      {
        id: 'med1',
        name: 'Amoxicillin 500mg (20 Caps)',
        category: 'Antibiotics',
        dosage: '500mg',
        priceGMD: 185,
        inStock: true,
        stockCount: 45,
        requiresPrescription: true,
        description: 'Broad-spectrum penicillin antibiotic for bacterial infections.'
      },
      {
        id: 'med2',
        name: 'Paracetamol 500mg (Pack of 24)',
        category: 'Pain & Fever Relief',
        dosage: '500mg',
        priceGMD: 65,
        inStock: true,
        stockCount: 120,
        requiresPrescription: false,
        description: 'Fast analgesic and antipyretic for aches, pain and fever reduction.'
      },
      {
        id: 'med3',
        name: 'Coartem (Artemether / Lumefantrine)',
        category: 'Anti-Malarial',
        dosage: '20/120mg (6-dose pack)',
        priceGMD: 240,
        inStock: true,
        stockCount: 38,
        requiresPrescription: true,
        description: 'First-line ACT treatment for uncomplicated malaria.'
      },
      {
        id: 'med5',
        name: 'Metformin HCl 500mg (100 Tabs)',
        category: 'Diabetes Care',
        dosage: '500mg',
        priceGMD: 310,
        inStock: true,
        stockCount: 22,
        requiresPrescription: true,
        description: 'First-line medication for type 2 diabetes blood glucose regulation.'
      },
      {
        id: 'med6',
        name: 'Salbutamol Inhaler (Ventolin 100mcg)',
        category: 'Respiratory Care',
        dosage: '100mcg (200 doses)',
        priceGMD: 350,
        inStock: true,
        stockCount: 15,
        requiresPrescription: true,
        description: 'Fast-acting bronchodilator for asthma relief.'
      }
    ]
  },
  {
    id: 'ph_innovarx',
    name: 'Innovarx Global Health',
    location: 'Bertil Harding Highway, Senegambia',
    area: 'Senegambia / Kololi',
    phone: '+220 330 0888',
    hours: '8:00 AM – 10:00 PM',
    isOpen24h: false,
    rating: '5.0',
    deliveryAvailable: true,
    distance: '2.0 km away',
    coordinates: { x: 16, y: 40 },
    inventory: [
      {
        id: 'med_inn_1',
        name: 'Atorvastatin 20mg (30 Tabs)',
        category: 'Cardiovascular',
        dosage: '20mg',
        priceGMD: 280,
        inStock: true,
        stockCount: 50,
        requiresPrescription: true,
        description: 'Statin lipid-lowering medication for cholesterol management.'
      },
      {
        id: 'med_inn_2',
        name: 'Amlodipine 5mg (30 Tabs)',
        category: 'Cardiovascular',
        dosage: '5mg',
        priceGMD: 190,
        inStock: true,
        stockCount: 65,
        requiresPrescription: true,
        description: 'Calcium channel blocker for hypertension.'
      },
      {
        id: 'med_inn_3',
        name: 'Accu-Chek Blood Glucose Test Strips (50s)',
        category: 'Diagnostics',
        dosage: '50 strips',
        priceGMD: 450,
        inStock: true,
        stockCount: 30,
        requiresPrescription: false,
        description: 'High accuracy self-monitoring diabetic test strips.'
      }
    ]
  },
  {
    id: 'ph_kairaba',
    name: 'Kairaba Pharmacy',
    location: 'Kairaba Avenue (Near Traffic Lights)',
    area: 'KMC / Fajara',
    phone: '+220 439 2200',
    hours: '8:00 AM – 11:30 PM',
    isOpen24h: false,
    rating: '4.8',
    deliveryAvailable: true,
    distance: '2.4 km away',
    coordinates: { x: 21, y: 34 },
    inventory: [
      {
        id: 'med2',
        name: 'Paracetamol 500mg (Pack of 24)',
        category: 'Pain & Fever Relief',
        dosage: '500mg',
        priceGMD: 60,
        inStock: true,
        stockCount: 140,
        requiresPrescription: false,
        description: 'Fast analgesic for aches and fever.'
      },
      {
        id: 'med7',
        name: 'Ibuprofen 400mg (30 Tablets)',
        category: 'Anti-Inflammatory',
        dosage: '400mg',
        priceGMD: 120,
        inStock: true,
        stockCount: 50,
        requiresPrescription: false,
        description: 'NSAID for pain, inflammation and joint relief.'
      },
      {
        id: 'med8',
        name: 'Omeprazole 20mg (Capsules)',
        category: 'Digestive Health',
        dosage: '20mg',
        priceGMD: 160,
        inStock: true,
        stockCount: 30,
        requiresPrescription: false,
        description: 'Proton pump inhibitor for acid reflux and gastritis.'
      }
    ]
  },
  {
    id: 'ph_banjul',
    name: 'Banjul Pharmacy',
    location: 'Independence Drive / Russell St, Banjul',
    area: 'Banjul City',
    phone: '+220 422 8410',
    hours: '8:00 AM – 8:00 PM',
    isOpen24h: false,
    rating: '4.7',
    deliveryAvailable: false,
    distance: '10.5 km away',
    coordinates: { x: 23, y: 20 },
    inventory: [
      {
        id: 'med1',
        name: 'Amoxicillin 500mg (20 Caps)',
        category: 'Antibiotics',
        dosage: '500mg',
        priceGMD: 175,
        inStock: true,
        stockCount: 35,
        requiresPrescription: true,
        description: 'Penicillin antibiotic.'
      },
      {
        id: 'med3',
        name: 'Coartem (Artemether / Lumefantrine)',
        category: 'Anti-Malarial',
        dosage: '20/120mg (6-dose pack)',
        priceGMD: 235,
        inStock: true,
        stockCount: 40,
        requiresPrescription: true,
        description: 'First-line ACT antimalarial.'
      },
      {
        id: 'med4',
        name: 'Oral Rehydration Salts (ORS 5 Sachets)',
        category: 'Gastrointestinal & Electrolytes',
        dosage: '1L sachet',
        priceGMD: 45,
        inStock: true,
        stockCount: 90,
        requiresPrescription: false,
        description: 'Electrolyte rehydration.'
      }
    ]
  },
  {
    id: 'ph_malak',
    name: 'Malak Chemist',
    location: 'Sayerr Jobe Avenue, Serekunda',
    area: 'Serekunda Central',
    phone: '+220 439 0044',
    hours: '24 Hours (Day & Night)',
    isOpen24h: true,
    rating: '4.7',
    deliveryAvailable: true,
    distance: '1.8 km away',
    coordinates: { x: 20, y: 38 },
    inventory: [
      {
        id: 'med1',
        name: 'Amoxicillin 500mg (20 Caps)',
        category: 'Antibiotics',
        dosage: '500mg',
        priceGMD: 180,
        inStock: true,
        stockCount: 60,
        requiresPrescription: true,
        description: 'Antibiotic for bacterial infections.'
      },
      {
        id: 'med10',
        name: 'Multivitamin & Iron Complex (60 Tabs)',
        category: 'Vitamins & Supplements',
        dosage: '1 Daily',
        priceGMD: 220,
        inStock: true,
        stockCount: 75,
        requiresPrescription: false,
        description: 'Essential iron, folic acid, vitamin C and B-complex.'
      }
    ]
  },
  {
    id: 'ph_stop_step',
    name: 'Stop Step Pharmacy',
    location: 'Cape Point Junction, Bakau',
    area: 'Bakau Cape Point',
    phone: '+220 449 5511',
    hours: '8:30 AM – 10:00 PM',
    isOpen24h: false,
    rating: '4.8',
    deliveryAvailable: true,
    distance: '3.5 km away',
    coordinates: { x: 18, y: 24 },
    inventory: [
      {
        id: 'med2',
        name: 'Paracetamol 500mg (Pack of 24)',
        category: 'Pain & Fever Relief',
        dosage: '500mg',
        priceGMD: 65,
        inStock: true,
        stockCount: 80,
        requiresPrescription: false,
        description: 'Pain relief and fever control.'
      },
      {
        id: 'med11',
        name: 'Cetirizine 10mg (Allergy Relief)',
        category: 'Allergy & Antihistamine',
        dosage: '10mg',
        priceGMD: 95,
        inStock: true,
        stockCount: 42,
        requiresPrescription: false,
        description: '24-hour relief from allergies and rhinitis.'
      }
    ]
  },
  {
    id: 'ph_westfield',
    name: 'Westfield Care Pharmacy',
    location: 'Westfield Junction (Brikama Highway)',
    area: 'Westfield / Serrekunda',
    phone: '+220 439 8899',
    hours: '24 Hours (Day & Night)',
    isOpen24h: true,
    rating: '4.8',
    deliveryAvailable: true,
    distance: '2.2 km away',
    coordinates: { x: 22, y: 40 },
    inventory: [
      {
        id: 'med3',
        name: 'Coartem (Artemether / Lumefantrine)',
        category: 'Anti-Malarial',
        dosage: '20/120mg (6-dose pack)',
        priceGMD: 235,
        inStock: true,
        stockCount: 45,
        requiresPrescription: true,
        description: 'First-line ACT antimalarial.'
      },
      {
        id: 'med6',
        name: 'Salbutamol Inhaler (Ventolin 100mcg)',
        category: 'Respiratory Care',
        dosage: '100mcg',
        priceGMD: 340,
        inStock: true,
        stockCount: 20,
        requiresPrescription: true,
        description: 'Inhaled bronchodilator for wheezing.'
      }
    ]
  },
  {
    id: 'ph_senegambia',
    name: 'Senegambia Medical Pharmacy',
    location: 'Senegambia Strip, Kololi',
    area: 'Kololi / Tourist Strip',
    phone: '+220 446 1122',
    hours: '8:00 AM – Midnight',
    isOpen24h: false,
    rating: '4.9',
    deliveryAvailable: true,
    distance: '1.5 km away',
    coordinates: { x: 15, y: 44 },
    inventory: [
      {
        id: 'med7',
        name: 'Ibuprofen 400mg (30 Tablets)',
        category: 'Anti-Inflammatory',
        dosage: '400mg',
        priceGMD: 130,
        inStock: true,
        stockCount: 40,
        requiresPrescription: false,
        description: 'Relief for pain and inflammation.'
      },
      {
        id: 'med4',
        name: 'Oral Rehydration Salts (ORS 5 Sachets)',
        category: 'Gastrointestinal & Electrolytes',
        dosage: '1L sachet',
        priceGMD: 55,
        inStock: true,
        stockCount: 60,
        requiresPrescription: false,
        description: 'Essential rehydration salts.'
      }
    ]
  },
  {
    id: 'ph_gampharma',
    name: 'GamPharma Care',
    location: 'Brusubi Phase 1 Roundabout',
    area: 'Brusubi / WCR',
    phone: '+220 788 9090',
    hours: '8:00 AM – 10:00 PM',
    isOpen24h: false,
    rating: '4.7',
    deliveryAvailable: true,
    distance: '4.0 km away',
    coordinates: { x: 17, y: 56 },
    inventory: [
      {
        id: 'med5',
        name: 'Metformin HCl 500mg (100 Tabs)',
        category: 'Diabetes Care',
        dosage: '500mg',
        priceGMD: 300,
        inStock: true,
        stockCount: 25,
        requiresPrescription: true,
        description: 'Diabetes glycemic control.'
      },
      {
        id: 'med1',
        name: 'Amoxicillin 500mg (20 Caps)',
        category: 'Antibiotics',
        dosage: '500mg',
        priceGMD: 185,
        inStock: true,
        stockCount: 30,
        requiresPrescription: true,
        description: 'Antibiotic.'
      }
    ]
  },
  {
    id: 'ph_citycare',
    name: 'City Care Pharmacy',
    location: 'Garba Jahumpa Road, Bakau',
    area: 'Bakau Newtown',
    phone: '+220 449 7788',
    hours: '8:30 AM – 9:30 PM',
    isOpen24h: false,
    rating: '4.6',
    deliveryAvailable: true,
    distance: '3.0 km away',
    coordinates: { x: 19, y: 26 },
    inventory: [
      {
        id: 'med2',
        name: 'Paracetamol 500mg (Pack of 24)',
        category: 'Pain & Fever Relief',
        dosage: '500mg',
        priceGMD: 60,
        inStock: true,
        stockCount: 110,
        requiresPrescription: false,
        description: 'Fast analgesic.'
      },
      {
        id: 'med10',
        name: 'Multivitamin & Iron Complex (60 Tabs)',
        category: 'Vitamins & Supplements',
        dosage: '1 Daily',
        priceGMD: 210,
        inStock: true,
        stockCount: 40,
        requiresPrescription: false,
        description: 'Nutritional wellness.'
      }
    ]
  }
];

export const INITIAL_TICKET: QueueTicket = {
  id: 'tk1',
  number: 'A-042',
  hospitalId: 'h_serekunda',
  hospitalName: 'Serekunda General Hospital',
  dept: 'General OPD',
  position: 4,
  eta: 18,
  status: 'In Queue',
  createdAt: '2026-08-20T10:00:00Z',
  reason: 'Seasonal flu symptoms & fever review'
};

export const INITIAL_APPOINTMENTS: { upcoming: Appointment[]; past: Appointment[] } = {
  upcoming: [
    {
      id: 'a1',
      doctor: 'Dr. Fatou Ceesay',
      hospital: 'Serekunda General Hospital',
      date: 'Fri, 21 Aug',
      time: '2:00 PM',
      type: 'In-person',
      status: 'Confirmed',
      specialty: 'General Practitioner'
    },
    {
      id: 'a2',
      doctor: 'Dr. Omar Touray',
      hospital: 'Africmed Clinic & Hospital',
      date: 'Mon, 24 Aug',
      time: '1:15 PM',
      type: 'E-Visit',
      status: 'Confirmed',
      specialty: 'Internal Medicine & Executive Care'
    }
  ],
  past: [
    {
      id: 'a3',
      doctor: 'Dr. Sarah Badjie',
      hospital: 'Kololi Medical Centre',
      date: '2 Aug 2026',
      time: '10:30 AM',
      type: 'In-person',
      status: 'Completed',
      specialty: 'Family & Travel Medicine',
      rating: 5,
      reviewComment: 'Very thorough checkup and pleasant consultation.'
    },
    {
      id: 'a4',
      doctor: 'Dr. Lamin Jarju',
      hospital: 'Serekunda General Hospital',
      date: '19 Jul 2026',
      time: '9:30 AM',
      type: 'In-person',
      status: 'Completed',
      specialty: 'Obstetrics & Gynaecology',
      rating: 5,
      reviewComment: 'Clear explanations and punctual.'
    }
  ]
};

export const INITIAL_RECORDS: PatientRecordData = {
  patientId: 'NC-GM-08841',
  visits: [
    {
      id: 'v1',
      label: 'General Consultation',
      hospital: 'Serekunda General Hospital',
      doctor: 'Dr. Fatou Ceesay',
      date: '2 Aug 2026',
      note: 'Reviewed for seasonal flu symptoms and mild fever. Prescribed Paracetamol and hydration.',
      type: 'visit'
    },
    {
      id: 'v2',
      label: 'Antenatal Checkup',
      hospital: 'Serekunda General Hospital',
      doctor: 'Dr. Lamin Jarju',
      date: '19 Jul 2026',
      note: 'Routine 24-week follow-up. Fetal heartbeat steady, maternal BP 118/76.',
      type: 'visit'
    },
    {
      id: 'v3',
      label: 'Annual Preventative Health Screening',
      hospital: 'Edward Francis Small Teaching Hospital',
      doctor: 'Prof. Alieu Badara Gaye',
      date: '10 Jan 2026',
      note: 'Full cardiovascular vitals and baseline liver function normal.',
      type: 'visit'
    }
  ],
  tests: [
    {
      id: 't1',
      label: 'Malaria Rapid Diagnostic Test (RDT)',
      hospital: 'Serekunda General Hospital',
      doctor: 'Dr. Fatou Ceesay',
      date: '2 Aug 2026',
      result: 'Negative',
      type: 'test'
    },
    {
      id: 't2',
      label: 'Full Blood Count (FBC)',
      hospital: 'MRC Unit The Gambia',
      doctor: 'Dr. Ebrahim Kanteh',
      date: '12 Jun 2026',
      result: 'Normal (Hb: 14.2 g/dL)',
      type: 'test'
    },
    {
      id: 't3',
      label: 'Fasting Blood Glucose',
      hospital: 'Kololi Medical Centre',
      doctor: 'Dr. Sarah Badjie',
      date: '15 Mar 2026',
      result: '4.8 mmol/L (Normal)',
      type: 'test'
    }
  ],
  procedures: [
    {
      id: 'p1',
      label: 'Wound Dressing & Tetanus Booster',
      hospital: 'Africmed Clinic & Hospital',
      doctor: 'Dr. Omar Touray',
      date: '28 May 2026',
      note: 'Minor laceration on left forearm cleanly sutured and dressed. Fully healed.',
      type: 'procedure'
    }
  ]
};

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx1',
    medication: 'Amoxicillin-Clavulanate 625mg',
    dosage: '1 tablet (625mg)',
    frequency: 'Twice daily after meals',
    duration: '7 days',
    prescribedBy: 'Dr. Fatou Ceesay',
    status: 'Active',
    startDate: '18 Aug 2026',
    refillsRemaining: 1,
    instructions: 'Take with full glass of water. Complete full course to prevent bacterial resistance.'
  },
  {
    id: 'rx2',
    medication: 'Paracetamol 500mg',
    dosage: '2 tablets (1000mg)',
    frequency: 'Every 6-8 hours as needed for fever or pain',
    duration: '5 days',
    prescribedBy: 'Dr. Fatou Ceesay',
    status: 'Active',
    startDate: '18 Aug 2026',
    refillsRemaining: 2,
    instructions: 'Do not exceed 8 tablets (4000mg) in 24 hours.'
  },
  {
    id: 'rx3',
    medication: 'Amlodipine 5mg',
    dosage: '1 tablet daily',
    frequency: 'Once daily in the morning',
    duration: '30 days',
    prescribedBy: 'Dr. Mariama Jatta',
    status: 'Active',
    startDate: '1 Aug 2026',
    refillsRemaining: 3,
    instructions: 'Daily blood pressure maintenance therapy. Monitor BP regularly.'
  },
  {
    id: 'rx4',
    medication: 'Multivitamin & Iron Folic Acid',
    dosage: '1 tablet daily',
    frequency: 'Once daily with breakfast',
    duration: '30 days',
    prescribedBy: 'Dr. Sarah Badjie',
    status: 'Refill Needed',
    startDate: '15 Jul 2026',
    refillsRemaining: 0,
    instructions: 'Nutritional supplement support for vitality and red blood cell production.'
  },
  {
    id: 'rx5',
    medication: 'Coartem 20/120mg (Artemether/Lumefantrine)',
    dosage: '4 tablets per dose',
    frequency: 'Twice daily for 3 days with milk or food',
    duration: '3 days',
    prescribedBy: 'Dr. Musa Dibba',
    status: 'Completed',
    startDate: '10 May 2026',
    refillsRemaining: 0,
    instructions: 'First-line malaria therapy. Course successfully completed.'
  }
];

export const INITIAL_VITALS: VitalLog[] = [
  {
    id: 'vit1',
    date: 'Today · 8:30 AM',
    bloodPressure: '120/78 mmHg',
    heartRate: 72,
    temperature: '36.8 °C',
    bloodSugar: '5.1 mmol/L',
    weight: '71.5 kg'
  },
  {
    id: 'vit2',
    date: '17 Aug 2026',
    bloodPressure: '122/80 mmHg',
    heartRate: 75,
    temperature: '37.1 °C',
    bloodSugar: '5.4 mmol/L',
    weight: '71.8 kg'
  },
  {
    id: 'vit3',
    date: '14 Aug 2026',
    bloodPressure: '118/76 mmHg',
    heartRate: 70,
    temperature: '36.7 °C',
    bloodSugar: '4.9 mmol/L',
    weight: '71.2 kg'
  },
  {
    id: 'vit4',
    date: '10 Aug 2026',
    bloodPressure: '124/82 mmHg',
    heartRate: 74,
    temperature: '36.9 °C',
    bloodSugar: '5.2 mmol/L',
    weight: '71.6 kg'
  },
  {
    id: 'vit5',
    date: '5 Aug 2026',
    bloodPressure: '121/79 mmHg',
    heartRate: 71,
    temperature: '36.6 °C',
    bloodSugar: '5.0 mmol/L',
    weight: '71.4 kg'
  }
];

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam_1',
    name: 'Ousman Jobe',
    relationship: 'Self',
    age: 28,
    gender: 'Male',
    bloodGroup: 'O-',
    allergies: ['None'],
    nationalId: 'GM-2024-88410',
    emergencyContact: '+220 701 4455',
    isPrimary: true
  },
  {
    id: 'fam_2',
    name: 'Fatou Jobe',
    relationship: 'Spouse',
    age: 26,
    gender: 'Female',
    bloodGroup: 'A+',
    allergies: ['Penicillin'],
    nationalId: 'GM-2024-91230',
    emergencyContact: '+220 701 4455'
  },
  {
    id: 'fam_3',
    name: 'Ibrahim Bah',
    relationship: 'Child',
    age: 4,
    gender: 'Male',
    bloodGroup: 'O+',
    allergies: ['Peanuts'],
    nationalId: 'GM-2025-10293',
    emergencyContact: '+220 701 4455'
  },
  {
    id: 'fam_4',
    name: 'Awa Bah',
    relationship: 'Parent',
    age: 62,
    gender: 'Female',
    bloodGroup: 'B+',
    allergies: ['Sulfa drugs'],
    nationalId: 'GM-1964-00129',
    emergencyContact: '+220 701 4455'
  }
];

export const BLOOD_DONOR_REQUESTS: BloodDonorRequest[] = [
  {
    id: 'br1',
    hospital: 'Serekunda General Hospital',
    bloodType: 'O-',
    unitsNeeded: 3,
    urgency: 'Immediate',
    contactPhone: '+220 439 5678',
    contactPerson: 'Blood Bank Unit Officer',
    postedDate: 'Today · 10:30 AM'
  },
  {
    id: 'br2',
    hospital: 'Edward Francis Small Teaching Hospital (EFSTH)',
    bloodType: 'B+',
    unitsNeeded: 5,
    urgency: 'Within 24h',
    contactPhone: '+220 422 7700',
    contactPerson: 'Emergency Transfusion Desk',
    postedDate: 'Today · 8:15 AM'
  },
  {
    id: 'br3',
    hospital: 'Africmed Clinic & Hospital',
    bloodType: 'A-',
    unitsNeeded: 2,
    urgency: 'Within 24h',
    contactPhone: '+220 446 0888',
    contactPerson: 'Lab Coordinator',
    postedDate: 'Yesterday'
  },
  {
    id: 'br4',
    hospital: 'Farafenni Regional Hospital',
    bloodType: 'AB+',
    unitsNeeded: 2,
    urgency: 'Routine',
    contactPhone: '+220 571 0123',
    contactPerson: 'Regional Blood Store',
    postedDate: '2 days ago'
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv_1',
    participantId: 'd_fatou',
    participantName: 'Dr. Fatou Ceesay',
    participantRole: 'Doctor',
    participantSpec: 'General Practitioner',
    participantHospital: 'Serekunda General Hospital',
    online: true,
    lastSeen: 'Active now',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'd_fatou',
        senderName: 'Dr. Fatou Ceesay',
        senderRole: 'doctor',
        text: 'Hello Ousman, how are you feeling after taking the prescribed Amoxicillin dosage?',
        timestamp: '10:15 AM',
        isRead: true
      },
      {
        id: 'm2',
        senderId: 'patient',
        senderName: 'Ousman Jobe',
        senderRole: 'patient',
        text: 'Good morning Doctor. The fever has subsided significantly. Should I finish the entire 7-day course even if I feel better?',
        timestamp: '10:22 AM',
        isRead: true
      },
      {
        id: 'm3',
        senderId: 'd_fatou',
        senderName: 'Dr. Fatou Ceesay',
        senderRole: 'doctor',
        text: 'Yes, please complete the full 7-day course to prevent antibiotic resistance. Stay well hydrated with clean water and fresh juice.',
        timestamp: '10:28 AM',
        isRead: false
      }
    ]
  },
  {
    id: 'conv_2',
    participantId: 'd_lamin',
    participantName: 'Dr. Lamin Jarju',
    participantRole: 'Doctor',
    participantSpec: 'Obstetrics & Gynaecology',
    participantHospital: 'Serekunda General Hospital',
    online: false,
    lastSeen: '25m ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'patient',
        senderName: 'Ousman Jobe',
        senderRole: 'patient',
        text: 'Good day Doctor, requesting confirmation for maternal ultrasound scan schedule next Tuesday.',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm5',
        senderId: 'd_lamin',
        senderName: 'Dr. Lamin Jarju',
        senderRole: 'doctor',
        text: 'Confirmed for 10:00 AM at the Maternity Wing. Please bring previous antenatal records.',
        timestamp: 'Yesterday',
        isRead: true
      }
    ]
  },
  {
    id: 'conv_3',
    participantId: 'ph_stop_shop',
    participantName: 'Pharm. Isatou Bojang',
    participantRole: 'Pharmacist',
    participantSpec: 'Chief Clinical Pharmacist',
    participantHospital: 'Stop & Shop Pharmacy, Kairaba Ave',
    online: true,
    lastSeen: 'Active now',
    unreadCount: 0,
    messages: [
      {
        id: 'm6',
        senderId: 'patient',
        senderName: 'Ousman Jobe',
        senderRole: 'patient',
        text: 'Hello Pharmacist, is the Coartem and Paracetamol suspension currently in stock for pickup?',
        timestamp: '9:00 AM',
        isRead: true
      },
      {
        id: 'm7',
        senderId: 'ph_stop_shop',
        senderName: 'Pharm. Isatou Bojang',
        senderRole: 'pharmacist',
        text: 'Yes, both are in stock at our Kairaba branch. We also support delivery via Wave payment if needed.',
        timestamp: '9:05 AM',
        isRead: true
      }
    ]
  }
];

export const INITIAL_LAB_REPORTS: LabReportDetail[] = [
  {
    id: 'lab_1',
    testName: 'Full Blood Count (FBC) Comprehensive',
    facility: 'Serekunda General Hospital Central Lab',
    doctor: 'Dr. Fatou Ceesay',
    date: '12 Jun 2026',
    status: 'Final',
    summary: 'Normal cellular counts across all lineages. No active infection or anemia detected.',
    results: [
      { parameter: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.5', status: 'Normal' },
      { parameter: 'White Blood Cell (WBC)', value: '6.8', unit: 'x10^9/L', referenceRange: '4.0 - 11.0', status: 'Normal' },
      { parameter: 'Platelets', value: '265', unit: 'x10^9/L', referenceRange: '150 - 450', status: 'Normal' },
      { parameter: 'Hematocrit (PCV)', value: '42.5', unit: '%', referenceRange: '40.0 - 52.0', status: 'Normal' },
      { parameter: 'Neutrophils', value: '58', unit: '%', referenceRange: '40 - 75', status: 'Normal' },
      { parameter: 'Lymphocytes', value: '32', unit: '%', referenceRange: '20 - 45', status: 'Normal' }
    ],
    doctorNotes: 'Hematology panel shows healthy baseline. Recommended routine checkup in 12 months.'
  },
  {
    id: 'lab_2',
    testName: 'Malaria Rapid Diagnostic Test (Pf RDT) & Microscopy',
    facility: 'Serekunda General Hospital Emergency Lab',
    doctor: 'Dr. Fatou Ceesay',
    date: '2 Aug 2026',
    status: 'Final',
    summary: 'Negative for Plasmodium falciparum and vivax antigen. No parasites seen on thick/thin blood smear.',
    results: [
      { parameter: 'P. falciparum HRP2 Antigen', value: 'Negative', unit: '', referenceRange: 'Negative', status: 'Normal' },
      { parameter: 'Pan-Malaria LDH Antigen', value: 'Negative', unit: '', referenceRange: 'Negative', status: 'Normal' },
      { parameter: 'Parasite Density', value: '0', unit: 'parasites/µL', referenceRange: '0', status: 'Normal' }
    ],
    doctorNotes: 'Acute febrile presentation attributed to viral upper respiratory tract infection. Antibiotic/antimalarial not indicated.'
  },
  {
    id: 'lab_3',
    testName: 'Fasting Blood Glucose & Lipid Profile',
    facility: 'Kololi Medical Centre Clinical Laboratory',
    doctor: 'Dr. Sarah Badjie',
    date: '15 Mar 2026',
    status: 'Final',
    summary: 'Glycemic control optimal. Lipid levels within cardio-protective range.',
    results: [
      { parameter: 'Fasting Plasma Glucose', value: '4.8', unit: 'mmol/L', referenceRange: '3.9 - 5.6', status: 'Normal' },
      { parameter: 'Total Cholesterol', value: '4.2', unit: 'mmol/L', referenceRange: '< 5.2', status: 'Normal' },
      { parameter: 'Triglycerides', value: '1.1', unit: 'mmol/L', referenceRange: '< 1.7', status: 'Normal' },
      { parameter: 'HDL Cholesterol', value: '1.5', unit: 'mmol/L', referenceRange: '> 1.0', status: 'Normal' },
      { parameter: 'LDL Cholesterol', value: '2.4', unit: 'mmol/L', referenceRange: '< 3.0', status: 'Normal' }
    ],
    doctorNotes: 'Excellent metabolic biomarkers. Maintain balanced diet and active walking routine.'
  }
];

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
  {
    id: 'Wave',
    name: 'Wave Mobile Money',
    provider: 'Wave Gambia (Free & Instant)',
    category: 'Mobile Money',
    accountPlaceholder: 'e.g. +220 701 4455',
    ussdOrCode: 'Wave App / QR',
    badge: 'Wave',
    iconName: 'Wave',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: '0% Fees · Instant',
    description: 'Zero-fee mobile transfers via Wave App or QR code merchant scan across Banjul & Kombo.',
    instructions: 'Open your Wave app or approve the instant push notification sent to your registered Gambian number.'
  },
  {
    id: 'QMoney',
    name: 'QMoney (QCell)',
    provider: 'QCell The Gambia',
    category: 'Mobile Money',
    accountPlaceholder: 'e.g. +220 312 4499',
    ussdOrCode: '*323#',
    badge: 'QMoney',
    iconName: 'QMoney',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'QCell Network',
    description: 'Direct wallet settlement from your QMoney balance with instant USSD or App authorization.',
    instructions: 'Dial *323# on your QCell SIM or authorize the merchant payment request in the QMoney app.'
  },
  {
    id: 'AfriMoney',
    name: 'AfriMoney (Africell)',
    provider: 'Africell The Gambia',
    category: 'Mobile Money',
    accountPlaceholder: 'e.g. +220 701 4455',
    ussdOrCode: '*777#',
    badge: 'AfriMoney',
    iconName: 'AfriMoney',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'Africell Network',
    description: 'Fast mobile payment directly from your Africell AfriMoney wallet balance.',
    instructions: 'Dial *777# on your Africell SIM or enter your 4-digit PIN to confirm the pharmacy merchant transfer.'
  },
  {
    id: 'APS Wallet',
    name: 'APS Wallet (APS International)',
    provider: 'APS Islamic Microfinance & Remittance',
    category: 'Digital Wallet',
    accountPlaceholder: 'e.g. APS-98442 or +220 701 4455',
    ussdOrCode: 'APS Online',
    badge: 'APS Wallet',
    iconName: 'APS',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'Diaspora & Local',
    description: 'Seamless payment using your APS Gambia digital wallet or Islamic microfinance account.',
    instructions: 'Enter your APS Wallet ID or registered phone number. Funds are debited instantaneously with zero delays.'
  },
  {
    id: 'Bank Transfer',
    name: 'Direct Bank Transfer (Wire / NAPS)',
    provider: 'Trust Bank / GTBank / Ecobank Gambia',
    category: 'Banking',
    accountPlaceholder: 'Account No. or Ref ID',
    ussdOrCode: 'NAPS / Wire',
    badge: 'Bank Wire',
    iconName: 'Bank',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
    badgeText: 'Certified IBAN',
    description: 'Instant electronic transfer via NAPS or Mobile Banking directly to the dispensary bank account.',
    instructions: 'Transfer to designated dispensary account (Trust Bank #0112489201 or GTBank #204198210) with order reference.'
  },
  {
    id: 'Cash on Delivery',
    name: 'Cash on Delivery / Pickup',
    provider: 'Gambian Dalasi (GMD)',
    category: 'Cash / Insurance',
    accountPlaceholder: 'Physical Dalasi Cash',
    ussdOrCode: 'Cash',
    badge: 'Cash',
    iconName: 'Cash',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    badgeText: 'Pay on Arrival',
    description: 'Pay in cash (GMD) upon receiving your medication at your door or dispensary counter.',
    instructions: 'Please keep exact change ready in Gambian Dalasi (GMD) for the delivery courier or pickup pharmacist.'
  },
  {
    id: 'NHIS Card',
    name: 'NHIS Prescription Co-Pay',
    provider: 'Gambia National Health Insurance Scheme',
    category: 'Cash / Insurance',
    accountPlaceholder: 'e.g. GM-NHIS-2026-4402',
    ussdOrCode: 'Gov Health',
    badge: 'NHIS Co-Pay',
    iconName: 'NHIS',
    badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
    badgeText: 'Gov Subsidized',
    description: 'Subsidized health insurance coverage with electronic co-pay claim validation.',
    instructions: 'Co-pay authorization verified using your registered National Health Insurance Number (NHIS).'
  }
];

export const INITIAL_REFILL_ORDERS: RefillOrder[] = [
  {
    id: 'ord_991',
    pharmacyName: 'Stop & Shop Pharmacy',
    pharmacyPhone: '+220 449 6700',
    medications: [
      { name: 'Amoxicillin 500mg (20 Caps)', quantity: 1, priceGMD: 185 },
      { name: 'Paracetamol 500mg (Pack of 24)', quantity: 2, priceGMD: 130 }
    ],
    totalGMD: 315,
    deliveryType: 'Home Delivery',
    deliveryAddress: 'House 14, Bertil Harding Highway, Senegambia',
    status: 'Out for Delivery',
    orderDate: 'Today · 11:15 AM',
    paymentMethod: 'Wave',
    accountReference: '+220 701 4455'
  },
  {
    id: 'ord_984',
    pharmacyName: 'Malak Chemist',
    pharmacyPhone: '+220 439 0044',
    medications: [
      { name: 'Multivitamin & Iron Complex (60 Tabs)', quantity: 1, priceGMD: 220 }
    ],
    totalGMD: 220,
    deliveryType: 'Pick-up',
    status: 'Completed',
    orderDate: '15 Aug 2026',
    paymentMethod: 'QMoney',
    accountReference: '+220 312 4499'
  },
  {
    id: 'ord_976',
    pharmacyName: 'Banjul Pharmacy & Dispensary',
    pharmacyPhone: '+220 422 7100',
    medications: [
      { name: 'Amlodipine 5mg (30 Tablets)', quantity: 1, priceGMD: 240 }
    ],
    totalGMD: 240,
    deliveryType: 'Home Delivery',
    deliveryAddress: 'Kairaba Avenue, Kanifing Municipality',
    status: 'Ready for Pickup',
    orderDate: '10 Aug 2026',
    paymentMethod: 'AfriMoney',
    accountReference: '+220 701 4455'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Queue Alert: Only 2 Patients Ahead',
    message: 'Your ticket A-042 at Serrekunda General OPD is nearing its turn. Please report to Room 4.',
    time: '12 mins ago',
    read: false,
    type: 'queue'
  },
  {
    id: 'notif_2',
    title: 'Appointment Reminder Tomorrow',
    message: 'Upcoming consultation with Dr. Fatou Ceesay at 10:30 AM.',
    time: '2 hours ago',
    read: false,
    type: 'appointment'
  },
  {
    id: 'notif_3',
    title: 'Lab Result Ready: Full Blood Count',
    message: 'EFSTH Central Laboratory has uploaded your latest verified lab panel.',
    time: 'Yesterday',
    read: true,
    type: 'result'
  },
  {
    id: 'notif_4',
    title: 'Blood Bank Emergency Request',
    message: 'Urgent need for O- blood at Brikama District Hospital for maternal surgery.',
    time: '2 days ago',
    read: true,
    type: 'system'
  }
];

export interface PatientProfileState {
  nin: string;
  email: string;
  gender: string;
  address: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  isBloodDonor: boolean;
  nhisNumber: string;
  primaryHospital: string;
  primaryDoctor: string;
  emergencyContacts: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
    isPrimary?: boolean;
  }>;
}

export const DEMO_PROFILE_DATA: PatientProfileState = {
  nin: 'GM-NIN-9824-0012',
  email: 'jobeousman445@gmail.com',
  gender: 'Male',
  address: 'Kairaba Avenue, Kanifing Municipality, The Gambia',
  bloodType: 'O- (Rh Negative)',
  allergies: ['Penicillin', 'Sulfa Antibiotics', 'NSAIDs (Mild)'],
  conditions: ['Mild Hypertension', 'Seasonal Asthma'],
  isBloodDonor: true,
  nhisNumber: 'GM-NHIS-2026-4402',
  primaryHospital: 'Kanifing General Hospital',
  primaryDoctor: 'Dr. Lamin Touray (Family Medicine)',
  emergencyContacts: [
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
  ]
};

export const CLEAN_PROFILE_DATA: PatientProfileState = {
  nin: '',
  email: '',
  gender: '',
  address: '',
  bloodType: '',
  allergies: [],
  conditions: [],
  isBloodDonor: false,
  nhisNumber: '',
  primaryHospital: '',
  primaryDoctor: '',
  emergencyContacts: []
};

// ==================== HOSPITAL STAFF STATE ====================

export const INITIAL_DESK_QUEUE: DeskQueueItem[] = [
  { id: 'dq1', ticketNumber: 'A-101', patient: 'Modou Njie', patientName: 'Modou Njie', dept: 'General OPD', status: 'Calling', waitTime: 4, wait: '4 min', triage: 'Priority', time: '11:10 AM' },
  { id: 'dq2', ticketNumber: 'M-102', patient: 'Binta Sanyang', patientName: 'Binta Sanyang', dept: 'Maternity', status: 'Waiting', waitTime: 12, wait: '12 min', triage: 'Standard', time: '11:18 AM' },
  { id: 'dq3', ticketNumber: 'A-103', patient: 'Yankuba Drammeh', patientName: 'Yankuba Drammeh', dept: 'General OPD', status: 'Waiting', waitTime: 18, wait: '18 min', triage: 'Standard', time: '11:24 AM' },
  { id: 'dq4', ticketNumber: 'L-104', patient: 'Sarjo Camara', patientName: 'Sarjo Camara', dept: 'Laboratory', status: 'Waiting', waitTime: 24, wait: '24 min', triage: 'Standard', time: '11:30 AM' },
  { id: 'dq5', ticketNumber: 'P-105', patient: 'Fatoumatta Bojang', patientName: 'Fatoumatta Bojang', dept: 'Pharmacy', status: 'Waiting', waitTime: 30, wait: '30 min', triage: 'Standard', time: '11:35 AM' },
  { id: 'dq6', ticketNumber: 'E-107', patient: 'Alagie Kebbeh', patientName: 'Alagie Kebbeh', dept: 'Emergency', status: 'Waiting', waitTime: 2, wait: '2 min', triage: 'Emergency', time: '11:42 AM' },
  { id: 'dq7', ticketNumber: 'A-106', patient: 'Ousman Jobe', patientName: 'Ousman Jobe', dept: 'General OPD', status: 'Completed', waitTime: 0, wait: '0 min', triage: 'Standard', time: '10:45 AM' }
];

export const INITIAL_STAFF_PATIENTS: PatientProfile[] = [
  {
    id: 'NC-GM-08842',
    name: 'Awa Bah',
    age: 62,
    gender: 'Female',
    visits: 6,
    lastVisit: '5 Aug 2026',
    phone: '+220 701 4458',
    email: 'awa.bah@gmail.com',
    address: 'Brikama Nyambai, WCR',
    bloodGroup: 'B+',
    allergies: ['Sulfa drugs'],
    diagnosis: 'Essential Hypertension & Osteoarthritis Management',
    attendingDoctor: 'Dr. Mariama Jatta',
    nextOfKin: {
      name: 'Ousman Jobe',
      relation: 'Son',
      phone: '+220 701 4455'
    },
    visitHistory: [
      'Cardiology Clinic — 5 Aug 2026 (Dr. Mariama Jatta)',
      'Joint Mobility Assessment — 14 May 2026',
      'Hypertension Checkup — 10 Jan 2026'
    ],
    procedures: ['Knee Joint Ultrasound — 14 May 2026'],
    prescriptions: ['Amlodipine 5mg', 'Paracetamol 500mg', 'Glucosamine']
  },
  {
    id: 'NC-GM-07735',
    name: 'Bakary Sowe',
    age: 48,
    gender: 'Male',
    visits: 7,
    lastVisit: 'Yesterday',
    phone: '+220 981 2233',
    email: 'bakary.sowe@gamtel.gm',
    address: 'Lamin Village, WCR',
    bloodGroup: 'O+',
    allergies: ['None'],
    diagnosis: 'Type 2 Diabetes Mellitus & Peripheral Neuropathy',
    attendingDoctor: 'Dr. Omar Touray',
    nextOfKin: {
      name: 'Mariama Sowe',
      relation: 'Wife',
      phone: '+220 981 2234'
    },
    visitHistory: [
      'Diabetic Foot Exam — Yesterday (Dr. Omar Touray)',
      'HbA1c Glycemic Panel — 15 Jul 2026',
      'Ophthalmic Fundus Examination — 20 Feb 2026'
    ],
    procedures: ['Diabetic Foot Debridement & Dressing — Yesterday'],
    prescriptions: ['Metformin HCl 500mg', 'Atorvastatin 20mg']
  },
  {
    id: 'NC-GM-06210',
    name: 'Binta Sanyang',
    age: 34,
    gender: 'Female',
    visits: 8,
    lastVisit: 'Today · Maternity',
    phone: '+220 345 6789',
    email: 'binta.sanyang@gmail.com',
    address: 'Sukuta Nema, WCR',
    bloodGroup: 'B+',
    allergies: ['Sulfa drugs'],
    diagnosis: '28-Week Antenatal Care & Gestational Anemia Screen',
    attendingDoctor: 'Dr. Lamin Jarju',
    nextOfKin: {
      name: 'Ebrima Sanyang',
      relation: 'Husband',
      phone: '+220 333 4455'
    },
    visitHistory: [
      'Maternity Checkup — Today',
      'Antenatal Follow-up — 5 Aug 2026',
      'Ultrasound Scan — 12 Jul 2026'
    ],
    procedures: ['Routine Fetal Doppler Scan — 12 Jul 2026'],
    prescriptions: ['Folic Acid & Iron', 'Calcium Carbonate']
  },
  {
    id: 'NC-GM-05521',
    name: 'Ebrima Jallow',
    age: 52,
    gender: 'Male',
    visits: 4,
    lastVisit: 'Today · Emergency',
    phone: '+220 911 0022',
    email: 'e.jallow@mof.gov.gm',
    address: 'Marina Parade, Banjul City',
    bloodGroup: 'A+',
    allergies: ['Aspirin'],
    diagnosis: 'Acute Hypertensive Urgency & Mild Chest Tightness',
    attendingDoctor: 'Prof. Alieu Badara Gaye',
    nextOfKin: {
      name: 'Fatou Jallow',
      relation: 'Daughter',
      phone: '+220 911 0023'
    },
    visitHistory: [
      'Emergency Resuscitation & ECG — Today (EFSTH)',
      'Cardiology Evaluation — 3 Jun 2026',
      'General OPD Follow-up — 12 Jan 2026'
    ],
    procedures: ['12-Lead ECG & Cardiac Enzyme Panel — Today'],
    prescriptions: ['Labetalol 100mg', 'Atorvastatin 20mg']
  },
  {
    id: 'NC-GM-09112',
    name: 'Fatoumatta Bojang',
    age: 22,
    gender: 'Female',
    visits: 3,
    lastVisit: 'Today · Pharmacy',
    phone: '+220 388 9911',
    email: 'fatoumatta.b@utg.edu.gm',
    address: 'Kanifing South, KMC',
    bloodGroup: 'O+',
    allergies: ['Penicillin'],
    diagnosis: 'Acute Uncomplicated Plasmodium Falciparum Malaria',
    attendingDoctor: 'Dr. Musa Dibba',
    nextOfKin: {
      name: 'Alieu Bojang',
      relation: 'Father',
      phone: '+220 388 9910'
    },
    visitHistory: [
      'Emergency Triage & Malaria Rapid Test — Today',
      'Blood Count Test — 18 Apr 2026',
      'Primary Consultation — 2 Jan 2026'
    ],
    procedures: ['Malaria Rapid Diagnostic Test (RDT) — Today'],
    prescriptions: ['Coartem 20/120mg (Artemether/Lumefantrine)', 'Paracetamol 500mg']
  },
  {
    id: 'NC-GM-08843',
    name: 'Ibrahim Bah',
    age: 4,
    gender: 'Male',
    visits: 5,
    lastVisit: '10 Aug 2026',
    phone: '+220 701 4455',
    email: 'ousman.bah@gmail.com',
    address: 'Kairaba Avenue, Serekunda, KMC',
    bloodGroup: 'O+',
    allergies: ['Peanuts'],
    diagnosis: 'Pediatric Wheezing & Viral Bronchitis',
    attendingDoctor: 'Dr. Kumba Njie',
    nextOfKin: {
      name: 'Ousman Jobe',
      relation: 'Father',
      phone: '+220 701 4455'
    },
    visitHistory: [
      'Pediatric OPD Consultation — 10 Aug 2026 (Dr. Kumba Njie)',
      'Expanded Immunization Schedule (EPI) — 4 Mar 2026',
      'Childhood Wellness Check — 15 Nov 2025'
    ],
    procedures: ['Nebulization Therapy — 10 Aug 2026'],
    prescriptions: ['Salbutamol Inhaler 100mcg', 'Paracetamol Syrup']
  },
  {
    id: 'NC-GM-07732',
    name: 'Modou Njie',
    age: 41,
    gender: 'Male',
    visits: 5,
    lastVisit: 'Today · In Queue',
    phone: '+220 912 3456',
    email: 'modou.njie@qcell.gm',
    address: 'Tallinding Kunjang, KMC',
    bloodGroup: 'A+',
    allergies: ['None'],
    diagnosis: 'Mild Recurrent Hypertension & Sebaceous Tenderness',
    attendingDoctor: 'Dr. Momodou Bah',
    nextOfKin: {
      name: 'Kaddy Njie',
      relation: 'Sister',
      phone: '+220 998 1234'
    },
    visitHistory: [
      'General Consultation — Today (Serekunda GH)',
      'X-Ray Chest Posteroanterior — 3 Mar 2026',
      'Routine Health Checkup — 15 Jan 2026'
    ],
    procedures: ['Minor Sebaceous Cyst Excision — 14 Feb 2026'],
    prescriptions: ['Amlodipine 5mg']
  },
  {
    id: 'NC-GM-08841',
    name: 'Ousman Jobe',
    age: 28,
    gender: 'Male',
    visits: 4,
    lastVisit: 'Today',
    phone: '+220 701 4455',
    email: 'jobeousman445@gmail.com',
    address: 'Kairaba Avenue, Serekunda, KMC',
    bloodGroup: 'O-',
    allergies: ['None'],
    diagnosis: 'Acute Upper Respiratory Tract Infection',
    attendingDoctor: 'Dr. Fatou Ceesay',
    nextOfKin: {
      name: 'Fatou Jobe',
      relation: 'Spouse',
      phone: '+220 701 4456'
    },
    visitHistory: [
      'General OPD Consultation — Today (Dr. Fatou Ceesay)',
      'Dental Checkup — 4 Apr 2026',
      'Eye Vision Test — 12 Jan 2026'
    ],
    procedures: ['Dental Scaling & Polishing — 4 Apr 2026'],
    prescriptions: ['Amoxicillin-Clavulanate 625mg', 'Paracetamol 500mg']
  },
  {
    id: 'NC-GM-09914',
    name: 'Sarjo Camara',
    age: 29,
    gender: 'Female',
    visits: 3,
    lastVisit: '2 Aug 2026',
    phone: '+220 788 1234',
    email: 'sarjo.camara@yahoo.com',
    address: 'Bakau Newtown, KMC',
    bloodGroup: 'O+',
    allergies: ['Penicillin'],
    diagnosis: 'Routine Health Check & Anemia Investigation',
    attendingDoctor: 'Dr. Sarah Badjie',
    nextOfKin: {
      name: 'Lamin Camara',
      relation: 'Brother',
      phone: '+220 777 8899'
    },
    visitHistory: [
      'General Consultation — 2 Aug 2026 (Dr. Fatou Ceesay)',
      'Laboratory Test (Full Blood Count) — 12 Jun 2026',
      'Antenatal Checkup — 19 Jul 2026'
    ],
    procedures: ['Wound Dressing — 28 May 2026'],
    prescriptions: ['Multivitamin & Iron Complex']
  },
  {
    id: 'NC-GM-08104',
    name: 'Yankuba Drammeh',
    age: 38,
    gender: 'Male',
    visits: 6,
    lastVisit: 'Today · Waiting',
    phone: '+220 733 4455',
    email: 'y.drammeh@africell.gm',
    address: 'Churchill’s Town, Serekunda, KMC',
    bloodGroup: 'AB+',
    allergies: ['None'],
    diagnosis: 'Chronic Acid Peptic Disease & H. Pylori Gastritis',
    attendingDoctor: 'Dr. Fatou Ceesay',
    nextOfKin: {
      name: 'Isatou Drammeh',
      relation: 'Wife',
      phone: '+220 733 4456'
    },
    visitHistory: [
      'General OPD Follow-up — Today',
      'Upper GI Endoscopy — 22 Apr 2026',
      'Stool Antigen Test — 18 Apr 2026'
    ],
    procedures: ['Upper Gastrointestinal Endoscopy — 22 Apr 2026'],
    prescriptions: ['Omeprazole 20mg', 'Amoxicillin 500mg', 'Clarithromycin 500mg']
  }
];

export const INITIAL_STAFF_APPOINTMENTS: StaffAppointmentItem[] = [
  {
    id: 's_apt_1',
    patientId: 'NC-GM-08841',
    patientName: 'Ousman Jobe',
    age: 28,
    gender: 'Male',
    time: '2:00 PM',
    dept: 'General OPD',
    doctor: 'Dr. Fatou Ceesay',
    type: 'In-person',
    reason: 'Follow-up on antibiotic therapy',
    status: 'Scheduled'
  },
  {
    id: 's_apt_2',
    patientId: 'NC-GM-06210',
    patientName: 'Binta Sanyang',
    age: 34,
    gender: 'Female',
    time: '2:45 PM',
    dept: 'Maternity Wing',
    doctor: 'Dr. Lamin Jarju',
    type: 'In-person',
    reason: '28-week antenatal ultrasound & palpation',
    status: 'Checked In'
  },
  {
    id: 's_apt_3',
    patientId: 'NC-GM-07732',
    patientName: 'Modou Njie',
    age: 41,
    gender: 'Male',
    time: '3:30 PM',
    dept: 'Surgical OPD',
    doctor: 'Dr. Momodou Bah',
    type: 'In-person',
    reason: 'Post-op scar tissue review',
    status: 'Scheduled'
  },
  {
    id: 's_apt_4',
    patientId: 'NC-GM-09914',
    patientName: 'Sarjo Camara',
    age: 29,
    gender: 'Female',
    time: '4:15 PM',
    dept: 'Cardiology Clinic',
    doctor: 'Dr. Mariama Jatta',
    type: 'E-Visit',
    reason: 'E-Consultation: ECG trace review',
    status: 'Scheduled'
  }
];

export const INITIAL_EVISIT_REQUESTS: EVisitRequest[] = [
  {
    id: 'ev_req_1',
    patientId: 'NC-GM-09914',
    patientName: 'Sarjo Camara',
    age: 29,
    gender: 'Female',
    complaint: 'Mild headache & review of latest full blood count report',
    time: 'Ready now (waiting 5m)',
    status: 'Waiting',
    priority: 'Routine'
  },
  {
    id: 'ev_req_2',
    patientId: 'NC-GM-05521',
    patientName: 'Pa Alieu Touray',
    age: 52,
    gender: 'Male',
    complaint: 'Blood pressure spike reading (145/95 mmHg) and mild dizziness',
    time: 'Ready now (waiting 2m)',
    status: 'Waiting',
    priority: 'Urgent'
  }
];

export const DOCTOR_INTERNAL_MESSAGES: DoctorInternalMessage[] = [
  {
    id: 'im_1',
    fromDoctorId: 'd_fatou',
    fromDoctorName: 'Dr. Fatou Ceesay',
    fromDoctorSpec: 'General OPD',
    toDoctorId: 'd_momodou',
    toDoctorName: 'Dr. Momodou Bah',
    patientId: 'NC-GM-07732',
    patientName: 'Modou Njie',
    subject: 'Surgical Referral: Sebaceous Cyst Follow-up',
    content: 'Modou presented with mild tenderness over the previous excision site. No signs of deep infection. Please evaluate for revision if drainage recurs.',
    priority: 'Routine',
    timestamp: 'Today · 11:20 AM'
  },
  {
    id: 'im_2',
    fromDoctorId: 'd_kumba',
    fromDoctorName: 'Dr. Kumba Njie',
    fromDoctorSpec: 'Pediatrics',
    toDoctorId: 'd_fatou',
    toDoctorName: 'Dr. Fatou Ceesay',
    patientId: 'NC-GM-08841',
    patientName: 'Ibrahim Bah (Child)',
    subject: 'Pediatric Allergy Follow-up',
    content: 'Allergy panel confirms mild peanut sensitivity. Emergency epinephrine auto-injector guidelines provided to parents.',
    priority: 'Routine',
    timestamp: 'Yesterday · 4:15 PM'
  },
  {
    id: 'im_3',
    fromDoctorId: 'd_alieu',
    fromDoctorName: 'Prof. Alieu Badara Gaye',
    fromDoctorSpec: 'Trauma & Critical Care (EFSTH)',
    toDoctorId: 'd_fatou',
    toDoctorName: 'Dr. Fatou Ceesay',
    patientId: 'NC-GM-09112',
    patientName: 'Emergency Triage',
    subject: 'Trauma Bed Availability Update',
    content: 'EFSTH ICU unit has 2 beds available for acute trauma stabilization transfers from KMC hospitals today.',
    priority: 'Urgent',
    timestamp: 'Yesterday · 2:00 PM'
  }
];

export const INITIAL_WARD_BEDS: WardBedInfo[] = [
  {
    id: 'ward_1',
    hospitalId: 'h_serekunda',
    hospitalName: 'Serekunda General Hospital',
    ward: 'ICU',
    totalBeds: 12,
    occupiedBeds: 10,
    availableBeds: 2,
    status: 'Near Capacity',
    lastUpdated: '15m ago'
  },
  {
    id: 'ward_2',
    hospitalId: 'h_serekunda',
    hospitalName: 'Serekunda General Hospital',
    ward: 'Maternity',
    totalBeds: 28,
    occupiedBeds: 24,
    availableBeds: 4,
    status: 'Near Capacity',
    lastUpdated: '10m ago'
  },
  {
    id: 'ward_3',
    hospitalId: 'h_serekunda',
    hospitalName: 'Serekunda General Hospital',
    ward: 'Surgical',
    totalBeds: 35,
    occupiedBeds: 26,
    availableBeds: 9,
    status: 'Available',
    lastUpdated: '25m ago'
  },
  {
    id: 'ward_4',
    hospitalId: 'h_serekunda',
    hospitalName: 'Serekunda General Hospital',
    ward: 'Paediatric',
    totalBeds: 24,
    occupiedBeds: 18,
    availableBeds: 6,
    status: 'Available',
    lastUpdated: '30m ago'
  },
  {
    id: 'ward_5',
    hospitalId: 'h_serekunda',
    hospitalName: 'Serekunda General Hospital',
    ward: 'General',
    totalBeds: 60,
    occupiedBeds: 48,
    availableBeds: 12,
    status: 'Available',
    lastUpdated: '5m ago'
  },
  {
    id: 'ward_6',
    hospitalId: 'h_efsth',
    hospitalName: 'Edward Francis Small Teaching Hospital',
    ward: 'ICU',
    totalBeds: 16,
    occupiedBeds: 15,
    availableBeds: 1,
    status: 'Near Capacity',
    lastUpdated: '8m ago'
  },
  {
    id: 'ward_7',
    hospitalId: 'h_africmed',
    hospitalName: 'Africmed Clinic & Hospital',
    ward: 'General',
    totalBeds: 20,
    occupiedBeds: 12,
    availableBeds: 8,
    status: 'Available',
    lastUpdated: '12m ago'
  }
];
