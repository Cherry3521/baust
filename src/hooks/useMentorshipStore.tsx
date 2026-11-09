import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Mentor, 
  MentorshipRequest, 
  MentorshipStatus, 
  MentorshipTopic, 
  SessionMode, 
  CVReviewItem, 
  MentorshipGoal, 
  AchievementBadge 
} from '../types/mentorship';
import { initialMentors } from '../data/mentors';
import { initialMentorshipRequests } from '../data/mentorshipRequests';
import { initialCVReviews } from '../data/cvReviews';
import { useNotificationStore } from './useNotificationStore';

interface MentorshipContextType {
  mentors: Mentor[];
  requests: MentorshipRequest[];
  cvReviews: CVReviewItem[];
  goals: MentorshipGoal[];
  badges: AchievementBadge[];
  savedMentorIds: string[];
  comparedMentorIds: string[];
  
  // Mentor Actions
  toggleSaveMentor: (mentorId: string) => void;
  toggleCompareMentor: (mentorId: string) => void;
  clearComparedMentors: () => void;
  getMentorById: (id: string) => Mentor | undefined;
  
  // Request Lifecycle Actions
  createMentorshipRequest: (data: {
    studentId: string;
    studentName: string;
    studentEmail: string;
    studentAvatar: string;
    studentDept: string;
    studentBatch: string;
    mentorId: string;
    topic: MentorshipTopic;
    goalOneLine: string;
    message: string;
    mode: SessionMode;
    slotId: string;
    cvUrl?: string;
  }) => { success: boolean; message: string };
  
  cancelRequest: (requestId: string) => void;
  editPendingMessage: (requestId: string, newMessage: string) => void;
  rescheduleRequest: (requestId: string, newSlotId: string, newScheduledTime: string) => void;
  
  // Alumni actions
  acceptRequest: (requestId: string, meetingLink?: string, adjustedTime?: string) => void;
  declineRequest: (requestId: string, reason: string, note?: string) => void;
  startSession: (requestId: string) => void;
  
  // Notes & Action items
  updateStudentNotes: (requestId: string, notes: string) => void;
  toggleMentorActionItem: (requestId: string, actionItemId: string) => void;
  addMentorActionItem: (requestId: string, text: string) => void;
  updateMentorPrivateNotes: (requestId: string, notes: string) => void;
  
  // Complete & Rate
  completeSession: (
    requestId: string, 
    review: {
      rating: number;
      ratingTags: string[];
      reviewText: string;
      wouldRecommend: boolean;
    }
  ) => void;
  
  // CV Reviews
  createCVReviewRequest: (data: {
    studentId: string;
    studentName: string;
    studentDept: string;
    studentBatch: string;
    studentAvatar: string;
    mentorId: string;
    targetRole: string;
    fileName: string;
    fileSize: string;
    deadlinePreference: string;
    studentNotes?: string;
    version?: string;
  }) => void;
  
  submitCVReviewByMentor: (
    reviewId: string,
    data: {
      overallRating: number;
      totalScore: number;
      categoryScores: {
        formatting: number;
        contentQuality: number;
        skillsPresentation: number;
        projectsExperience: number;
        grammarLanguage: number;
        atsFriendliness: number;
      };
      strengths: string[];
      areasToImprove: string[];
      sectionComments: {
        summary?: string;
        education?: string;
        skills?: string;
        projects?: string;
        experience?: string;
      };
      overallMessage: string;
    }
  ) => void;
  
  sendCVReviewThanks: (reviewId: string) => void;
  
  // Goals
  addGoal: (goal: Omit<MentorshipGoal, 'id'>) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  
  // Settings
  toggleMentorActive: (mentorId: string, active: boolean) => void;
}

const initialGoals: MentorshipGoal[] = [
  {
    id: 'goal-1',
    studentId: 'std-101',
    title: 'Land Junior Backend Engineer Role in Dhaka',
    targetDate: 'May 2027',
    targetRole: 'Junior Backend Software Engineer (Go/Node.js)',
    progressPercent: 65,
    milestones: [
      { id: 'm1', title: 'Complete distributed KV store capstone', completed: true },
      { id: 'm2', title: 'Get CV reviewed and optimized for ATS', completed: true },
      { id: 'm3', title: 'Conduct system design mock interview with Tanzil bhaiya', completed: false },
      { id: 'm4', title: 'Solve 100 LeetCode Medium algorithms', completed: false }
    ]
  }
];

const initialBadges: AchievementBadge[] = [
  {
    id: 'bdg-1',
    title: 'First Session Completed',
    description: 'Successfully attended your first 1-on-1 alumni mentorship session.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedAt: 'Oct 28, 2026'
  },
  {
    id: 'bdg-2',
    title: 'CV Perfected (Score > 90)',
    description: 'Achieved an ATS score above 90 from a certified alumni reviewer.',
    icon: 'FileCheck',
    unlocked: true,
    unlockedAt: 'Nov 06, 2026'
  },
  {
    id: 'bdg-3',
    title: '5 Sessions Milestone',
    description: 'Completed 5 dedicated sessions with industry alumni.',
    icon: 'Trophy',
    unlocked: false
  },
  {
    id: 'bdg-4',
    title: 'Top Mentee',
    description: 'Completed 100% of action items assigned by your mentors.',
    icon: 'Award',
    unlocked: false
  }
];

const MentorshipContext = createContext<MentorshipContextType | undefined>(undefined);

export const MentorshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addNotification } = useNotificationStore();

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('bcb_mentors');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialMentors;
  });

  const [requests, setRequests] = useState<MentorshipRequest[]>(() => {
    const saved = localStorage.getItem('bcb_mentorship_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialMentorshipRequests;
  });

  const [cvReviews, setCvReviews] = useState<CVReviewItem[]>(() => {
    const saved = localStorage.getItem('bcb_cv_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialCVReviews;
  });

  const [goals, setGoals] = useState<MentorshipGoal[]>(() => {
    const saved = localStorage.getItem('bcb_goals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialGoals;
  });

  const [badges, setBadges] = useState<AchievementBadge[]>(initialBadges);

  const [savedMentorIds, setSavedMentorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('bcb_saved_mentors');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['men-alm-1', 'men-alm-2'];
  });

  const [comparedMentorIds, setComparedMentorIds] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('bcb_mentors', JSON.stringify(mentors));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem('bcb_mentorship_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('bcb_cv_reviews', JSON.stringify(cvReviews));
  }, [cvReviews]);

  useEffect(() => {
    localStorage.setItem('bcb_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('bcb_saved_mentors', JSON.stringify(savedMentorIds));
  }, [savedMentorIds]);

  const toggleSaveMentor = (mentorId: string) => {
    setSavedMentorIds(prev => 
      prev.includes(mentorId) ? prev.filter(x => x !== mentorId) : [...prev, mentorId]
    );
  };

  const toggleCompareMentor = (mentorId: string) => {
    setComparedMentorIds(prev => {
      if (prev.includes(mentorId)) return prev.filter(x => x !== mentorId);
      if (prev.length >= 3) return [prev[1], prev[2], mentorId];
      return [...prev, mentorId];
    });
  };

  const clearComparedMentors = () => setComparedMentorIds([]);

  const getMentorById = (id: string) => mentors.find(m => m.id === id || m.alumniId === id);

  const createMentorshipRequest = (data: {
    studentId: string;
    studentName: string;
    studentEmail: string;
    studentAvatar: string;
    studentDept: string;
    studentBatch: string;
    mentorId: string;
    topic: MentorshipTopic;
    goalOneLine: string;
    message: string;
    mode: SessionMode;
    slotId: string;
    cvUrl?: string;
  }) => {
    // Check duplicate pending request
    const existingPending = requests.find(
      r => r.studentId === data.studentId && 
           r.mentorId === data.mentorId && 
           r.topic === data.topic && 
           r.status === 'PENDING'
    );

    if (existingPending) {
      return {
        success: false,
        message: `You already have an active pending request for "${data.topic}" with this mentor.`
      };
    }

    const mentor = mentors.find(m => m.id === data.mentorId || m.alumniId === data.mentorId);
    if (!mentor) {
      return { success: false, message: 'Mentor not found.' };
    }

    const selectedSlot = mentor.slots.find(s => s.id === data.slotId) || mentor.slots[0];
    const scheduledTime = selectedSlot ? `${selectedSlot.day} at ${selectedSlot.time}` : 'Next Available';

    const newReq: MentorshipRequest = {
      id: `req-${Date.now()}`,
      studentId: data.studentId,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      studentAvatar: data.studentAvatar,
      studentDept: data.studentDept,
      studentBatch: data.studentBatch,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      mentorDesignation: mentor.designation,
      mentorCompany: mentor.company,
      mentorDept: mentor.department,
      topic: data.topic,
      goalOneLine: data.goalOneLine,
      message: data.message,
      mode: data.mode,
      slotId: data.slotId,
      scheduledTime,
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cvUrl: data.cvUrl,
      history: [
        {
          step: 'Request Submitted',
          timestamp: new Date().toLocaleString(),
          actor: data.studentName,
          detail: `Selected ${data.mode} session for ${scheduledTime}`
        }
      ]
    };

    setRequests(prev => [newReq, ...prev]);

    // Push notification to alumni
    addNotification({
      userId: mentor.alumniId,
      title: 'New Mentorship Request Received',
      message: `${data.studentName} requested a session on "${data.topic}".`,
      category: 'mentorship',
      link: '/alumni/mentorship'
    });

    return { success: true, message: 'Mentorship request submitted successfully!' };
  };

  const cancelRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'CANCELLED',
          cancelledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          history: [
            ...req.history,
            {
              step: 'Request Cancelled',
              timestamp: new Date().toLocaleString(),
              actor: req.studentName,
              detail: 'Cancelled by student'
            }
          ]
        };
      }
      return req;
    }));
  };

  const editPendingMessage = (requestId: string, newMessage: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId && req.status === 'PENDING') {
        return {
          ...req,
          message: newMessage,
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));
  };

  const rescheduleRequest = (requestId: string, newSlotId: string, newScheduledTime: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          slotId: newSlotId,
          scheduledTime: newScheduledTime,
          updatedAt: new Date().toISOString(),
          history: [
            ...req.history,
            {
              step: 'Rescheduled',
              timestamp: new Date().toLocaleString(),
              actor: 'Student',
              detail: `Rescheduled to ${newScheduledTime}`
            }
          ]
        };
      }
      return req;
    }));
  };

  const acceptRequest = (requestId: string, meetingLink?: string, adjustedTime?: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const finalMeetingLink = meetingLink || `https://meet.google.com/bcb-${req.id.slice(-6)}`;
        const finalTime = adjustedTime || req.scheduledTime;
        
        // Notify student
        addNotification({
          userId: req.studentId,
          title: 'Mentorship Request Accepted',
          message: `${req.mentorName} accepted your session on "${req.topic}" for ${finalTime}!`,
          category: 'mentorship',
          link: '/student/mentorship'
        });

        return {
          ...req,
          status: 'ACCEPTED',
          scheduledTime: finalTime,
          meetingLink: finalMeetingLink,
          updatedAt: new Date().toISOString(),
          history: [
            ...req.history,
            {
              step: 'Request Accepted',
              timestamp: new Date().toLocaleString(),
              actor: req.mentorName,
              detail: `Confirmed session link: ${finalMeetingLink}`
            }
          ]
        };
      }
      return req;
    }));
  };

  const declineRequest = (requestId: string, reason: string, note?: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        // Notify student
        addNotification({
          userId: req.studentId,
          title: 'Mentorship Request Declined',
          message: `${req.mentorName} declined your request: ${reason}`,
          category: 'mentorship',
          link: '/student/mentorship'
        });

        return {
          ...req,
          status: 'REJECTED',
          rejectionReason: reason,
          rejectionNote: note,
          updatedAt: new Date().toISOString(),
          history: [
            ...req.history,
            {
              step: 'Request Declined',
              timestamp: new Date().toLocaleString(),
              actor: req.mentorName,
              detail: `Reason: ${reason}. Note: ${note || 'None'}`
            }
          ]
        };
      }
      return req;
    }));
  };

  const startSession = (requestId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'IN_PROGRESS',
          updatedAt: new Date().toISOString(),
          history: [
            ...req.history,
            {
              step: 'Session Started',
              timestamp: new Date().toLocaleString(),
              actor: 'System',
              detail: 'Call room initialized'
            }
          ]
        };
      }
      return req;
    }));
  };

  const updateStudentNotes = (requestId: string, notes: string) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, sessionNotesStudent: notes } : r));
  };

  const toggleMentorActionItem = (requestId: string, actionItemId: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId && r.mentorActionItems) {
        const updated = r.mentorActionItems.map(item => 
          item.id === actionItemId ? { ...item, completed: !item.completed } : item
        );
        return { ...r, mentorActionItems: updated };
      }
      return r;
    }));
  };

  const addMentorActionItem = (requestId: string, text: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const newItem = { id: `act-${Date.now()}`, text, completed: false };
        return {
          ...r,
          mentorActionItems: [...(r.mentorActionItems || []), newItem]
        };
      }
      return r;
    }));
  };

  const updateMentorPrivateNotes = (requestId: string, notes: string) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, mentorPrivateNotes: notes } : r));
  };

  const completeSession = (
    requestId: string, 
    review: {
      rating: number;
      ratingTags: string[];
      reviewText: string;
      wouldRecommend: boolean;
    }
  ) => {
    let targetedMentorId = '';
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        targetedMentorId = req.mentorId;
        return {
          ...req,
          status: 'COMPLETED',
          rating: review.rating,
          ratingTags: review.ratingTags,
          reviewText: review.reviewText,
          wouldRecommend: review.wouldRecommend,
          ratedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          history: [
            ...req.history,
            {
              step: 'Session Completed & Rated',
              timestamp: new Date().toLocaleString(),
              actor: req.studentName,
              detail: `Rated ${review.rating} Stars with feedback`
            }
          ]
        };
      }
      return req;
    }));

    // Recalculate mentor rating live
    if (targetedMentorId) {
      setMentors(prev => prev.map(m => {
        if (m.id === targetedMentorId) {
          const newCount = m.ratingCount + 1;
          const newRating = Number(((m.rating * m.ratingCount + review.rating) / newCount).toFixed(2));
          return {
            ...m,
            rating: newRating,
            ratingCount: newCount,
            sessionsCompleted: m.sessionsCompleted + 1
          };
        }
        return m;
      }));
    }

    addNotification({
      userId: 'std-101',
      title: 'Session Marked Completed',
      message: 'Thank you for your feedback! Session summary is now saved in your Completed tab.',
      category: 'mentorship',
      link: '/student/mentorship'
    });
  };

  const createCVReviewRequest = (data: {
    studentId: string;
    studentName: string;
    studentDept: string;
    studentBatch: string;
    studentAvatar: string;
    mentorId: string;
    targetRole: string;
    fileName: string;
    fileSize: string;
    deadlinePreference: string;
    studentNotes?: string;
    version?: string;
  }) => {
    const mentor = mentors.find(m => m.id === data.mentorId || m.alumniId === data.mentorId) || mentors[0];
    const newReview: CVReviewItem = {
      id: `cvr-${Date.now()}`,
      studentId: data.studentId,
      studentName: data.studentName,
      studentDept: data.studentDept,
      studentBatch: data.studentBatch,
      studentAvatar: data.studentAvatar,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      mentorCompany: mentor.company,
      targetRole: data.targetRole,
      version: data.version || 'v1',
      fileName: data.fileName,
      fileSize: data.fileSize,
      submittedAt: new Date().toISOString(),
      deadlinePreference: data.deadlinePreference,
      studentNotes: data.studentNotes,
      status: 'Submitted'
    };

    setCvReviews(prev => [newReview, ...prev]);

    addNotification({
      userId: mentor.alumniId,
      title: 'New CV Review Submitted',
      message: `${data.studentName} requested a CV review for target role "${data.targetRole}".`,
      category: 'mentorship',
      link: '/alumni/mentorship'
    });
  };

  const submitCVReviewByMentor = (
    reviewId: string,
    data: {
      overallRating: number;
      totalScore: number;
      categoryScores: {
        formatting: number;
        contentQuality: number;
        skillsPresentation: number;
        projectsExperience: number;
        grammarLanguage: number;
        atsFriendliness: number;
      };
      strengths: string[];
      areasToImprove: string[];
      sectionComments: {
        summary?: string;
        education?: string;
        skills?: string;
        projects?: string;
        experience?: string;
      };
      overallMessage: string;
    }
  ) => {
    setCvReviews(prev => prev.map(item => {
      if (item.id === reviewId) {
        addNotification({
          userId: item.studentId,
          title: `CV Review Published (Score: ${data.totalScore}/100)`,
          message: `${item.mentorName} published your CV evaluation results!`,
          category: 'mentorship',
          link: '/student/mentorship'
        });

        return {
          ...item,
          status: 'Reviewed',
          reviewedAt: new Date().toISOString(),
          overallRating: data.overallRating,
          totalScore: data.totalScore,
          categoryScores: data.categoryScores,
          strengths: data.strengths,
          areasToImprove: data.areasToImprove,
          sectionComments: data.sectionComments,
          overallMessage: data.overallMessage
        };
      }
      return item;
    }));
  };

  const sendCVReviewThanks = (reviewId: string) => {
    setCvReviews(prev => prev.map(item => item.id === reviewId ? { ...item, thankYouSent: true } : item));
    addNotification({
      userId: 'alm-1',
      title: 'Mentee Sent Appreciation',
      message: 'Ahsan Habib sent a thank you note for your constructive CV review!',
      category: 'mentorship',
      link: '/alumni/mentorship'
    });
  };

  const addGoal = (goal: Omit<MentorshipGoal, 'id'>) => {
    const newGoal: MentorshipGoal = { ...goal, id: `goal-${Date.now()}` };
    setGoals(prev => [newGoal, ...prev]);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedMilestones = g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m);
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);
        return { ...g, milestones: updatedMilestones, progressPercent: progress };
      }
      return g;
    }));
  };

  const toggleMentorActive = (mentorId: string, active: boolean) => {
    setMentors(prev => prev.map(m => m.id === mentorId || m.alumniId === mentorId ? { ...m, mentoringActive: active } : m));
  };

  return (
    <MentorshipContext.Provider
      value={{
        mentors,
        requests,
        cvReviews,
        goals,
        badges,
        savedMentorIds,
        comparedMentorIds,
        toggleSaveMentor,
        toggleCompareMentor,
        clearComparedMentors,
        getMentorById,
        createMentorshipRequest,
        cancelRequest,
        editPendingMessage,
        rescheduleRequest,
        acceptRequest,
        declineRequest,
        startSession,
        updateStudentNotes,
        toggleMentorActionItem,
        addMentorActionItem,
        updateMentorPrivateNotes,
        completeSession,
        createCVReviewRequest,
        submitCVReviewByMentor,
        sendCVReviewThanks,
        addGoal,
        toggleMilestone,
        toggleMentorActive
      }}
    >
      {children}
    </MentorshipContext.Provider>
  );
};

export const useMentorshipStore = () => {
  const context = useContext(MentorshipContext);
  if (!context) {
    throw new Error('useMentorshipStore must be used within a MentorshipProvider');
  }
  return context;
};
