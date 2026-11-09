export type ServiceCategory = 
  | 'Academic Documents'
  | 'Verification'
  | 'Letters'
  | 'Others';

export type DeliveryMethod = 
  | 'Campus Pickup'
  | 'Courier Delivery'
  | 'Email PDF'
  | 'Send Directly to Institution';

export type RequestStatus = 
  | 'Submitted'
  | 'Payment Verified'
  | 'Under Review'
  | 'Action Required'
  | 'Approved'
  | 'Processing'
  | 'Ready'
  | 'Delivered'
  | 'Rejected'
  | 'Cancelled';

export type UrgencyLevel = 'Normal' | 'Urgent' | 'Express';

export interface ServiceItem {
  id: string;
  name: string;
  code: string;
  category: ServiceCategory;
  description: string;
  fee: number; // in BDT
  expressFee: number;
  urgentFee: number;
  processingDays: number;
  urgentDays: number;
  expressDays: number;
  requiredDocuments: string[];
  allowedDeliveryMethods: DeliveryMethod[];
  perCopyPricing: number;
  iconName: string;
  isActive: boolean;
}

export interface RequestTimelineStep {
  status: RequestStatus;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface RequestMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'alumni' | 'admin';
  text: string;
  timestamp: string;
  attachmentName?: string;
  isActionRequiredPrompt?: boolean;
}

export interface ServiceRequest {
  id: string; // e.g. "BCB-2026-000123"
  alumniId: string;
  alumniName: string;
  alumniEmail: string;
  alumniPhone: string;
  alumniBaustId: string;
  alumniDept: string;
  alumniBatch: string;
  alumniPassingYear: string;
  alumniCgpa: number;

  serviceIds: string[];
  serviceNames: string[];
  copies: number;
  purpose: 'Higher Study' | 'Job' | 'Visa' | 'Personal' | 'Other';
  urgency: UrgencyLevel;
  semesterProgramInfo?: string;

  // Verification type recipient info
  recipientName?: string;
  recipientOrg?: string;
  recipientEmail?: string;
  recipientAddress?: string;

  // Documents
  uploadedDocuments: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];

  // Delivery details
  deliveryMethod: DeliveryMethod;
  pickupDate?: string;
  courierAddress?: {
    recipientName: string;
    phone: string;
    division: string;
    district: string;
    address: string;
  };
  courierTrackingNo?: string;
  courierName?: string;
  expectedDeliveryDate?: string;

  // Payment info
  totalFee: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank Deposit' | 'Card';
  transactionId: string;
  paymentSlipUrl?: string;
  paymentStatus: 'Unpaid' | 'Verified' | 'Refunded';

  // Workflow & Status
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  assignedStaff?: string;
  assignedStaffRole?: string;
  internalNotes?: string;
  rejectionReason?: string;
  rejectionMessage?: string;
  actionRequiredMessage?: string;

  // Digital deliverable
  digitalDeliverableUrl?: string;
  digitalDocumentCode?: string;

  timeline: RequestTimelineStep[];
  messages: RequestMessage[];

  // Rating given after delivery
  rating?: number;
  reviewComment?: string;
  complaintRaised?: string;
}

export type NoticeCategory = 
  | 'Academic'
  | 'Alumni Event'
  | 'Convocation'
  | 'Job/Recruitment'
  | 'Policy'
  | 'Urgent';

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  body: string;
  publishedAt: string;
  isPinned: boolean;
  isUrgent: boolean;
  audience: 'All' | 'Alumni' | 'Students' | 'Specific';
  attachmentName?: string;
  readCount: number;
  hasRsvp?: boolean;
  rsvpCount?: number;
  rsvpUsers?: string[];
  eventDate?: string;
  status: 'Published' | 'Draft' | 'Archived';
}

export type VacancyType = 
  | 'Lecturer'
  | 'Assistant Professor'
  | 'Lab Assistant'
  | 'Officer'
  | 'Part-time/Guest Faculty';

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  type: VacancyType;
  qualifications: string[];
  cgpaRequirement: number;
  numberOfPosts: number;
  deadline: string;
  salaryRange?: string;
  howToApply: string;
  description: string;
  status: 'Open' | 'Closed';
  applicantsCount: number;
}

export interface JobApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  alumniId: string;
  alumniName: string;
  alumniDept: string;
  alumniBatch: string;
  alumniCgpa: number;
  alumniExperienceYears: number;
  coverNote: string;
  cvFileName: string;
  submittedAt: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Not Selected';
  interviewDate?: string;
  interviewTime?: string;
  interviewVenue?: string; // or online link
  adminNotes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Registrar' | 'Controller' | 'Officer' | 'Clerk';
  department: string;
  email: string;
  phone: string;
  avatar: string;
  activeRequestsCount: number;
  canApprove: boolean;
  canDeliver: boolean;
}
