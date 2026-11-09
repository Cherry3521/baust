import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../types/user';

interface AuthContextType {
  role: UserRole;
  user: UserProfile;
  setRole: (role: UserRole) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
}

const mockUsers: Record<UserRole, UserProfile> = {
  student: {
    id: 'std-101',
    name: 'Ahsan Habib',
    email: 'ahsan.habib@baust.edu.bd',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    department: 'CSE',
    batch: '8th Batch (2022)',
    studentId: '0802420105101028',
    passingYear: '2026',
    isVerified: true,
    phone: '+8801712998877',
    bio: '4th year CSE undergraduate passionate about backend systems, Go, and cloud computing. Preparing for software engineering campus recruitment.'
  },
  alumni: {
    id: 'alm-1',
    name: 'Tanzil Ahmed Chowdhury',
    email: 'tanzil.ahmed@grameenphone.com',
    role: 'alumni',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    department: 'CSE',
    batch: '1st Batch (2015)',
    studentId: '15CSE042',
    passingYear: '2019',
    isVerified: true,
    phone: '+8801711223344',
    bio: 'Principal Software Engineer at Grameenphone Ltd. Mentoring BAUSTians in microservices, Go, and system design.'
  },
  admin: {
    id: 'adm-001',
    name: 'Lt. Col. (Retd.) M. A. Hye',
    email: 'registrar@baust.edu.bd',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    department: 'University Administration',
    isVerified: true,
    phone: '+880551-63445',
    bio: 'Registrar, Bangladesh Army University of Science and Technology (BAUST).'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('bcb_role') as UserRole) || 'student';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem(`bcb_user_${role}`);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error(e);
      }
    }
    return mockUsers[role];
  });

  useEffect(() => {
    localStorage.setItem('bcb_role', role);
    const savedUser = localStorage.getItem(`bcb_user_${role}`);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setUser(mockUsers[role]);
  }, [role]);

  const setRole = (newRole: UserRole) => {
    // TODO: replace with API call for session role elevation
    setRoleState(newRole);
  };

  const login = (email: string, targetRole: UserRole) => {
    // TODO: replace with API authentication call
    setRoleState(targetRole);
    const u = { ...mockUsers[targetRole], email };
    setUser(u);
    localStorage.setItem(`bcb_user_${targetRole}`, JSON.stringify(u));
  };

  const logout = () => {
    // TODO: replace with API logout call
    setRoleState('student');
    setUser(mockUsers.student);
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(`bcb_user_${role}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        setRole,
        login,
        logout,
        updateCurrentUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthStore must be used within an AuthProvider');
  }
  return context;
};
