import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.brand': 'BAUST Career Bridge',
    'nav.tagline': 'Empowering BAUSTians Across Generations',
    'nav.home': 'Home',
    'nav.directory': 'Alumni Directory',
    'nav.mentorship': 'Mentorship',
    'nav.adminDesk': 'Admin Desk',
    'nav.chat': 'Messages',
    'nav.dashboard': 'Dashboard',
    'nav.myProfile': 'My Profile',
    'nav.mentorSettings': 'Mentor Settings',
    'nav.verificationQueue': 'Verification Queue',
    'nav.userManagement': 'User Management',
    'nav.announcements': 'Announcements',
    'nav.login': 'Log In',
    'nav.register': 'Register',
    'nav.logout': 'Sign Out',
    
    // Roles
    'role.student': 'Current Student',
    'role.alumni': 'BAUST Alumni',
    'role.admin': 'University Admin',
    
    // Statuses
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.inProgress': 'In Progress',
    'status.completed': 'Completed',
    'status.ready': 'Ready for Delivery',
    'status.delivered': 'Delivered',
    'status.cancelled': 'Cancelled',
    'status.actionRequired': 'Action Required',
    
    // Actions
    'action.viewProfile': 'View Profile',
    'action.requestMentorship': 'Request Mentorship',
    'action.message': 'Message',
    'action.save': 'Save',
    'action.applyNow': 'Apply Now',
    'action.track': 'Track Request',
    'action.submit': 'Submit',
    'action.cancel': 'Cancel',
    'action.search': 'Search...'
  },
  bn: {
    // Nav
    'nav.brand': 'বাউস্ট ক্যারিয়ার ব্রিজ',
    'nav.tagline': 'বাউস্ট শিক্ষার্থী ও অ্যালামনাই নেটওয়ার্ক',
    'nav.home': 'মূলপাতা',
    'nav.directory': 'অ্যালামনাই ডিরেক্টরি',
    'nav.mentorship': 'মেন্টরশিপ',
    'nav.adminDesk': 'অ্যাডমিন ডেস্ক',
    'nav.chat': 'মেসেজ',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.myProfile': 'আমার প্রোফাইল',
    'nav.mentorSettings': 'মেন্টর সেটিংস',
    'nav.verificationQueue': 'ভেরিফিকেশন কিউ',
    'nav.userManagement': 'ব্যবহারকারী ব্যবস্থাপনা',
    'nav.announcements': 'ঘোষণা ও নোটিশ',
    'nav.login': 'লগইন',
    'nav.register': 'রেজিস্ট্রেশন',
    'nav.logout': 'লগআউট',
    
    // Roles
    'role.student': 'বর্তমান শিক্ষার্থী',
    'role.alumni': 'বাউস্ট অ্যালামনাই',
    'role.admin': 'বিশ্ববিদ্যালয় প্রশাসন',
    
    // Statuses
    'status.pending': 'অপেক্ষমান',
    'status.approved': 'অনুমোদিত',
    'status.rejected': 'প্রত্যাখ্যাত',
    'status.inProgress': 'চলমান',
    'status.completed': 'সম্পন্ন',
    'status.ready': 'বিতরণের জন্য প্রস্তুত',
    'status.delivered': 'বিতরণকৃত',
    'status.cancelled': 'বাতিল',
    'status.actionRequired': 'পদক্ষেপ প্রয়োজন',
    
    // Actions
    'action.viewProfile': 'প্রোফাইল দেখুন',
    'action.requestMentorship': 'মেন্টরশিপ অনুরোধ',
    'action.message': 'মেসেজ দিন',
    'action.save': 'সংরক্ষণ',
    'action.applyNow': 'আবেদন করুন',
    'action.track': 'ট্র্যাক করুন',
    'action.submit': 'জমা দিন',
    'action.cancel': 'বাতিল',
    'action.search': 'অনুসন্ধান করুন...'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('bcb_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bcb_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
