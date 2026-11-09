import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useAuthStore } from '../hooks/useAuthStore';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { VerifyDocumentPage } from '../pages/public/VerifyDocumentPage';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { DirectoryPage } from '../pages/student/directory/DirectoryPage';
import { AlumniProfilePage } from '../pages/student/directory/AlumniProfilePage';
import { SavedAlumniPage } from '../pages/student/directory/SavedAlumniPage';
import { MentorshipPage } from '../pages/student/mentorship/MentorshipPage';
import { ChatPage } from '../pages/student/chat/ChatPage';
import { StudentProfilePage } from '../pages/student/profile/StudentProfilePage';

// Alumni Pages
import { AlumniDashboard } from '../pages/alumni/AlumniDashboard';
import { AlumniProfileEditor } from '../pages/alumni/profile/AlumniProfileEditor';
import { AlumniMentorshipPage } from '../pages/alumni/mentorship/AlumniMentorshipPage';
import { MentorSettingsPage } from '../pages/alumni/mentorship/MentorSettingsPage';
import { AlumniAdminDeskPage } from '../pages/alumni/admindesk/AlumniAdminDeskPage';
import { RequestDetailPage } from '../pages/alumni/admindesk/RequestDetailPage';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { VerificationQueuePage } from '../pages/admin/VerificationQueuePage';
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { AdminDeskManagementPage } from '../pages/admin/admindesk/AdminDeskManagementPage';
import { AnnouncementsPage } from '../pages/admin/AnnouncementsPage';

export const AppRoutes: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Root Landing Page without standard inner layout */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-document" element={<VerifyDocumentPage />} />

      {/* Authenticated Pages wrapped in Layout */}
      <Route element={<Layout />}>
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/directory" element={<DirectoryPage />} />
        <Route path="/student/directory/saved" element={<SavedAlumniPage />} />
        <Route path="/student/directory/:id" element={<AlumniProfilePage />} />
        <Route path="/student/mentorship" element={<MentorshipPage />} />
        <Route path="/student/chat" element={<ChatPage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />

        {/* Alumni Routes */}
        <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
        <Route path="/alumni/my-profile" element={<AlumniProfileEditor />} />
        <Route path="/alumni/mentorship" element={<AlumniMentorshipPage />} />
        <Route path="/alumni/mentorship/settings" element={<MentorSettingsPage />} />
        <Route path="/alumni/admin-desk" element={<AlumniAdminDeskPage />} />
        <Route path="/alumni/admin-desk/:id" element={<RequestDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/verifications" element={<VerificationQueuePage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/admin-desk" element={<AdminDeskManagementPage />} />
        <Route path="/admin/announcements" element={<AnnouncementsPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
