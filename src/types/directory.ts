export type JobSector = 
  | 'Government'
  | 'Private'
  | 'Multinational'
  | 'Abroad'
  | 'Higher Study'
  | 'Research'
  | 'Business'
  | 'Freelancing';

export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate';

export interface SkillItem {
  name: string;
  category: string;
  level: SkillLevel;
  isExpertise?: boolean;
  endorsements: number;
  endorsedBy?: string[]; // student IDs
}

export interface WorkExperience {
  id: string;
  title: string;
  organization: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Contract';
  period: string; // e.g. "2021 - Present"
  location: string;
  responsibilities: string;
  achievements?: string;
  isCurrent?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  field: string;
  country: string;
  year: string;
  thesisTitle?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface ProjectPublication {
  id: string;
  title: string;
  type: 'Project' | 'Publication' | 'Patent';
  description: string;
  year: string;
  link?: string;
}

export interface StudentTestimonial {
  id: string;
  studentName: string;
  studentDept: string;
  studentBatch: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface PrivacySettings {
  cgpaVisibility: 'Public' | 'Students only' | 'Hidden';
  showEmail: boolean;
  showPhone: boolean;
  showLinkedIn: boolean;
  showEmployer: boolean;
  showLocation: boolean;
}

export interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  coverImage?: string;
  verified: boolean;
  verifiedDate?: string;
  reVerificationPending?: boolean;
  
  // BAUST Info
  studentId: string;
  department: 'CSE' | 'EEE' | 'Civil' | 'Textile' | 'BBA' | 'ME';
  batch: string;
  admissionYear: string;
  passingYear: string;
  cgpa: number;
  degree: string;
  thesisTitle?: string;
  thesisSupervisor?: string;
  honors?: string;
  clubs?: string[];
  scholarships?: string;

  // Career Info
  currentPosition: string;
  currentCompany: string;
  sector: JobSector;
  joiningDate: string;
  location: string;
  country: string;
  roleDescription: string;
  careerStory?: string;
  bio: string;
  yearsOfExperience: number;

  // Abroad / Higher Study details if applicable
  abroadInstitution?: string;
  abroadCountry?: string;
  abroadProgram?: string;

  // Details
  workExperience: WorkExperience[];
  education: EducationItem[];
  skills: SkillItem[];
  interestedFields: string[];
  certifications: CertificationItem[];
  publications: ProjectPublication[];
  achievements: string[];

  // Mentoring & Consultation Stats
  studentsConsulted: number;
  sessionsCompleted: number;
  averageRating: number;
  totalReviews: number;
  responseTime: string; // e.g. "< 2 hours"
  topTopicsHelped: { topic: string; count: number }[];
  testimonials: StudentTestimonial[];

  // Toggles
  openToMentoring: boolean;
  openToReferrals: boolean;
  hasHiringAuthority: boolean;
  showInDirectory: boolean;

  // Privacy & Links
  privacy: PrivacySettings;
  linkedIn?: string;
  github?: string;
  portfolio?: string;

  // Metadata
  lastActive: string;
  lastUpdated: string;
}

export interface ConnectRequest {
  id: string;
  alumniId: string;
  studentId: string;
  studentName: string;
  studentDept: string;
  studentBatch: string;
  studentAvatar: string;
  message: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined';
}
