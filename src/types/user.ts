export type UserRole = 'student' | 'alumni' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  batch?: string;
  studentId?: string;
  passingYear?: string;
  isVerified: boolean;
  phone?: string;
  bio?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'mentorship' | 'admin_desk' | 'chat' | 'directory' | 'system';
  timestamp: string;
  read: boolean;
  link?: string;
}
