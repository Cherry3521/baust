import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { NotificationProvider } from './hooks/useNotificationStore';
import { AuthProvider } from './hooks/useAuthStore';
import { DirectoryProvider } from './hooks/useDirectoryStore';
import { MentorshipProvider } from './hooks/useMentorshipStore';
import { AdminDeskProvider } from './hooks/useAdminDeskStore';
import { ToastProvider } from './components/ui/Toast';
import { DemoRoleSwitcher } from './components/layout/DemoRoleSwitcher';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <AuthProvider>
          <DirectoryProvider>
            <MentorshipProvider>
              <AdminDeskProvider>
                <ToastProvider>
                  <BrowserRouter>
                    <AppRoutes />
                    <DemoRoleSwitcher />
                  </BrowserRouter>
                </ToastProvider>
              </AdminDeskProvider>
            </MentorshipProvider>
          </DirectoryProvider>
        </AuthProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}
