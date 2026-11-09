export type MentorshipTopic = 
  | 'CV Review'
  | 'Interview Prep'
  | 'Higher Studies'
  | 'Career Guidance'
  | 'Project/Thesis Help'
  | 'Skill Roadmap';

export type SessionMode = 'Chat' | 'Voice Call' | 'Video Call';

export type MentorshipStatus = 
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export interface AvailableTimeSlot {
  id: string;
  day: string; // e.g. "Friday"
  date?: string; // e.g. "2026-11-14"
  time: string; // e.g. "08:00 PM - 09:00 PM"
  isBooked?: boolean;
}

export interface Mentor {
  id: string;
  alumniId: string;
  name: string;
  avatar: string;
  verified: boolean;
  designation: string;
  company: string;
  sector: string;
  batch: string;
  department: string;
  skills: string[];
  topicsOffered: MentorshipTopic[];
  rating: number;
  ratingCount: number;
  sessionsCompleted: number;
  responseTime: string;
  isAvailableNow: boolean;
  isAvailableThisWeek: boolean;
  mentoringActive: boolean;
  slots: AvailableTimeSlot[];
  bio: string;
  abroadInfo?: string;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  studentDept: string;
  studentBatch: string;
  studentSkills?: string[];
  cvUrl?: string;

  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorDesignation: string;
  mentorCompany: string;
  mentorDept: string;

  topic: MentorshipTopic;
  goalOneLine: string;
  message: string;
  mode: SessionMode;
  slotId: string;
  scheduledTime: string; // e.g. "Nov 14, 2026 at 08:00 PM"
  status: MentorshipStatus;
  
  // Lifecycle & Tracking
  submittedAt: string;
  updatedAt: string;
  rejectionReason?: string;
  rejectionNote?: string;
  cancelledAt?: string;

  // Session details
  meetingLink?: string;
  sessionNotesStudent?: string;
  mentorActionItems?: { id: string; text: string; completed: boolean }[];
  mentorPrivateNotes?: string;
  durationMinutes?: number;

  // Review & Rating given after completion
  rating?: number;
  ratingTags?: string[];
  reviewText?: string;
  wouldRecommend?: boolean;
  ratedAt?: string;

  // Timeline audit log
  history: {
    step: string;
    timestamp: string;
    actor: string;
    detail?: string;
  }[];
}

export interface CVReviewScoreBreakdown {
  formatting: number; // 0-100
  contentQuality: number; // 0-100
  skillsPresentation: number; // 0-100
  projectsExperience: number; // 0-100
  grammarLanguage: number; // 0-100
  atsFriendliness: number; // 0-100
}

export interface CVReviewItem {
  id: string;
  studentId: string;
  studentName: string;
  studentDept: string;
  studentBatch: string;
  studentAvatar: string;
  
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorCompany: string;

  targetRole: string;
  version: string; // e.g. "v1", "v2"
  fileName: string;
  fileSize: string;
  submittedAt: string;
  deadlinePreference: string;
  studentNotes?: string;

  status: 'Submitted' | 'In Review' | 'Reviewed';
  reviewedAt?: string;

  overallRating?: number; // 1-5
  totalScore?: number; // 0-100
  categoryScores?: CVReviewScoreBreakdown;
  strengths?: string[];
  areasToImprove?: string[];
  sectionComments?: {
    summary?: string;
    education?: string;
    skills?: string;
    projects?: string;
    experience?: string;
  };
  overallMessage?: string;
  thankYouSent?: boolean;
}

export interface MentorshipGoal {
  id: string;
  studentId: string;
  title: string;
  targetDate: string;
  targetRole: string;
  progressPercent: number;
  milestones: { id: string; title: string; completed: boolean }[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
