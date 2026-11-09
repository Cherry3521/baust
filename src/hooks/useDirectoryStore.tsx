import React, { createContext, useContext, useState, useEffect } from 'react';
import { AlumniProfile, SkillItem, WorkExperience, EducationItem, ConnectRequest } from '../types/directory';
import { initialAlumniProfiles } from '../data/alumniProfiles';
import { useNotificationStore } from './useNotificationStore';

interface DirectoryContextType {
  profiles: AlumniProfile[];
  savedAlumniIds: string[];
  comparedAlumniIds: string[];
  connectRequests: ConnectRequest[];
  toggleSaveAlumni: (id: string) => void;
  toggleCompareAlumni: (id: string) => void;
  clearComparedAlumni: () => void;
  endorseSkill: (alumniId: string, skillName: string, studentId: string) => boolean;
  sendConnectRequest: (alumniId: string, message: string, student: { id: string; name: string; dept: string; batch: string; avatar: string }) => void;
  respondToConnectRequest: (requestId: string, status: 'accepted' | 'declined') => void;
  updateAlumniProfile: (id: string, updates: Partial<AlumniProfile>, isSensitiveChange?: boolean) => void;
  getProfileById: (id: string) => AlumniProfile | undefined;
  reportProfile: (alumniId: string, reason: string) => void;
}

const initialConnectRequests: ConnectRequest[] = [
  {
    id: 'conn-1',
    alumniId: 'alm-1',
    studentId: 'std-102',
    studentName: 'Sadia Sultana',
    studentDept: 'EEE',
    studentBatch: '7th Batch',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    message: 'Salam bhaiya! Would love to connect and follow your updates in cloud telecom architecture.',
    date: 'Nov 04, 2026',
    status: 'pending'
  },
  {
    id: 'conn-2',
    alumniId: 'alm-1',
    studentId: 'std-107',
    studentName: 'Zubair Hossain',
    studentDept: 'CSE',
    studentBatch: '8th Batch',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    message: 'Salam! Keen to keep in touch regarding backend microservice design.',
    date: 'Nov 02, 2026',
    status: 'accepted'
  }
];

const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

export const DirectoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addNotification } = useNotificationStore();

  const [profiles, setProfiles] = useState<AlumniProfile[]>(() => {
    const saved = localStorage.getItem('bcb_alumni_profiles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialAlumniProfiles;
  });

  const [savedAlumniIds, setSavedAlumniIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('bcb_saved_alumni');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['alm-1', 'alm-2', 'alm-4'];
  });

  const [comparedAlumniIds, setComparedAlumniIds] = useState<string[]>([]);

  const [connectRequests, setConnectRequests] = useState<ConnectRequest[]>(() => {
    const saved = localStorage.getItem('bcb_connect_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialConnectRequests;
  });

  useEffect(() => {
    localStorage.setItem('bcb_alumni_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('bcb_saved_alumni', JSON.stringify(savedAlumniIds));
  }, [savedAlumniIds]);

  useEffect(() => {
    localStorage.setItem('bcb_connect_requests', JSON.stringify(connectRequests));
  }, [connectRequests]);

  const toggleSaveAlumni = (id: string) => {
    setSavedAlumniIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      if (!exists) {
        addNotification({
          userId: 'std-101',
          title: 'Alumni Bookmarked',
          message: 'Saved to your bookmarked alumni list.',
          category: 'directory',
          link: '/student/directory/saved'
        });
      }
      return updated;
    });
  };

  const toggleCompareAlumni = (id: string) => {
    setComparedAlumniIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id];
      }
      return [...prev, id];
    });
  };

  const clearComparedAlumni = () => {
    setComparedAlumniIds([]);
  };

  const endorseSkill = (alumniId: string, skillName: string, studentId: string): boolean => {
    let success = false;
    setProfiles(prev => prev.map(alumni => {
      if (alumni.id !== alumniId) return alumni;
      const updatedSkills = alumni.skills.map(s => {
        if (s.name === skillName) {
          const endorsedBy = s.endorsedBy || [];
          if (endorsedBy.includes(studentId)) {
            return s; // already endorsed
          }
          success = true;
          return {
            ...s,
            endorsements: s.endorsements + 1,
            endorsedBy: [...endorsedBy, studentId]
          };
        }
        return s;
      });
      return { ...alumni, skills: updatedSkills };
    }));

    if (success) {
      addNotification({
        userId: alumniId,
        title: 'New Skill Endorsement',
        message: `A student endorsed your skill: "${skillName}"!`,
        category: 'directory',
        link: '/alumni/my-profile'
      });
    }
    return success;
  };

  const sendConnectRequest = (
    alumniId: string,
    message: string,
    student: { id: string; name: string; dept: string; batch: string; avatar: string }
  ) => {
    const newReq: ConnectRequest = {
      id: `conn-${Date.now()}`,
      alumniId,
      studentId: student.id,
      studentName: student.name,
      studentDept: student.dept,
      studentBatch: student.batch,
      studentAvatar: student.avatar,
      message,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'pending'
    };
    setConnectRequests(prev => [newReq, ...prev]);

    addNotification({
      userId: alumniId,
      title: 'New Connection Request',
      message: `${student.name} (${student.dept}) sent you a connection request.`,
      category: 'directory',
      link: '/alumni/my-profile'
    });
  };

  const respondToConnectRequest = (requestId: string, status: 'accepted' | 'declined') => {
    setConnectRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status };
      }
      return req;
    }));
  };

  const updateAlumniProfile = (id: string, updates: Partial<AlumniProfile>, isSensitiveChange = false) => {
    // TODO: replace with API call: PUT /api/alumni/profile
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          reVerificationPending: isSensitiveChange ? true : p.reVerificationPending,
          lastUpdated: 'Just now'
        };
      }
      return p;
    }));

    if (isSensitiveChange) {
      addNotification({
        userId: id,
        title: 'Profile Re-verification Pending',
        message: 'Your academic changes are undergoing administrative verification review.',
        category: 'system',
        link: '/alumni/my-profile'
      });
    }
  };

  const getProfileById = (id: string) => {
    return profiles.find(p => p.id === id);
  };

  const reportProfile = (alumniId: string, reason: string) => {
    // TODO: replace with API call: POST /api/reports/profile
    addNotification({
      userId: 'adm-001',
      title: 'Profile Reported by User',
      message: `Profile ${alumniId} flagged: "${reason}"`,
      category: 'system',
      link: '/admin/users'
    });
  };

  return (
    <DirectoryContext.Provider
      value={{
        profiles,
        savedAlumniIds,
        comparedAlumniIds,
        connectRequests,
        toggleSaveAlumni,
        toggleCompareAlumni,
        clearComparedAlumni,
        endorseSkill,
        sendConnectRequest,
        respondToConnectRequest,
        updateAlumniProfile,
        getProfileById,
        reportProfile
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectoryStore = () => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error('useDirectoryStore must be used within a DirectoryProvider');
  }
  return context;
};
