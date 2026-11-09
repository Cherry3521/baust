import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useLanguage } from '../../hooks/useLanguage';
import { NotificationDropdown } from './NotificationDropdown';
import { Avatar } from '../ui/Avatar';
import { 
  Menu, 
  X, 
  GraduationCap, 
  Globe2, 
  LogOut, 
  ShieldCheck, 
  Briefcase, 
  FileCheck2, 
  Users, 
  MessageSquare,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, user, logout } = useAuthStore();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const navLinks = role === 'student' ? [
    { label: t('nav.dashboard'), path: '/student/dashboard' },
    { label: t('nav.directory'), path: '/student/directory' },
    { label: t('nav.mentorship'), path: '/student/mentorship' },
    { label: t('nav.chat'), path: '/student/chat' },
  ] : role === 'alumni' ? [
    { label: t('nav.dashboard'), path: '/alumni/dashboard' },
    { label: t('nav.directory'), path: '/student/directory' },
    { label: t('nav.mentorship'), path: '/alumni/mentorship' },
    { label: t('nav.adminDesk'), path: '/alumni/admin-desk' },
    { label: t('nav.myProfile'), path: '/alumni/my-profile' },
  ] : [
    { label: t('nav.dashboard'), path: '/admin/dashboard' },
    { label: t('nav.verificationQueue'), path: '/admin/verifications' },
    { label: t('nav.userManagement'), path: '/admin/users' },
    { label: t('nav.adminDesk'), path: '/admin/admin-desk' },
    { label: t('nav.announcements'), path: '/admin/announcements' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F2A4A] to-[#2E5E3E] p-0.5 flex items-center justify-center shadow-xs">
                <div className="w-full h-full bg-[#0F2A4A] rounded-[10px] flex items-center justify-center border border-[#C9A227]/40 group-hover:border-[#C9A227] transition-colors">
                  <GraduationCap className="w-5 h-5 text-[#C9A227]" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-base tracking-tight text-navy leading-none">
                  BAUST <span className="text-[#2E5E3E]">Career</span> <span className="text-[#C9A227]">Bridge</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Official Network Platform
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 text-[#0F2A4A] font-semibold'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons & User Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Public Verify Document Link */}
            <Link
              to="/verify-document"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-navy hover:bg-slate-100 border border-slate-200"
              title="Public Document Verification Portal"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#2E5E3E]" />
              Verify Doc
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Toggle English / বাংলা"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#C9A227]" />
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>

            {/* Notification Bell */}
            <NotificationDropdown />

            {/* User Profile Avatar & Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link 
                to={role === 'student' ? '/student/profile' : role === 'alumni' ? '/alumni/my-profile' : '/admin/dashboard'}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <Avatar 
                  name={user.name} 
                  src={user.avatar} 
                  size="sm" 
                  verified={user.isVerified}
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-navy truncate max-w-[120px]">
                    {user.name}
                  </div>
                  <div className="text-[10px] font-semibold text-[#2E5E3E] uppercase tracking-wider">
                    {role}
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-navy hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/verify-document"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-700 hover:underline flex items-center gap-1"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" /> Verify Document
            </Link>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-rose-600 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
