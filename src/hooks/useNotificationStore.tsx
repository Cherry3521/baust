import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppNotification } from '../types/user';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'std-101',
    title: 'Mentorship Request Accepted',
    message: 'Tanzil Ahmed Chowdhury accepted your session for Nov 14 at 08:00 PM.',
    category: 'mentorship',
    timestamp: '2 hours ago',
    read: false,
    link: '/student/mentorship'
  },
  {
    id: 'notif-2',
    userId: 'std-101',
    title: 'CV Review Completed (Score: 92/100)',
    message: 'Tanzil Ahmed Chowdhury published detailed category ratings and comments on your v2 resume.',
    category: 'mentorship',
    timestamp: '1 day ago',
    read: false,
    link: '/student/mentorship'
  },
  {
    id: 'notif-3',
    userId: 'alm-1',
    title: 'Admin Desk Request: Ready for Pickup',
    message: 'Your Academic Transcript & MOI Certificate (BCB-2026-000101) are ready for courier handover.',
    category: 'admin_desk',
    timestamp: 'Yesterday',
    read: false,
    link: '/alumni/admin-desk'
  },
  {
    id: 'notif-4',
    userId: 'std-101',
    title: 'New Message from Tanzil Ahmed Chowdhury',
    message: '"I reviewed your backend project. The caching logic in Redis looks solid!"',
    category: 'chat',
    timestamp: 'Today, 10:45 AM',
    read: false,
    link: '/student/chat'
  },
  {
    id: 'notif-5',
    userId: 'alm-1',
    title: 'New Mentorship Request Received',
    message: 'Ahsan Habib (8th Batch CSE) sent a request for Interview Prep.',
    category: 'mentorship',
    timestamp: '2 days ago',
    read: true,
    link: '/alumni/mentorship'
  },
  {
    id: 'notif-6',
    userId: 'alm-1',
    title: 'Skill Endorsement Received',
    message: 'Sadia Sultana endorsed your skill "Web Development".',
    category: 'directory',
    timestamp: '3 days ago',
    read: true,
    link: '/alumni/my-profile'
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('bcb_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialNotifications;
  });

  useEffect(() => {
    localStorage.setItem('bcb_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationStore = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationStore must be used within a NotificationProvider');
  }
  return context;
};
