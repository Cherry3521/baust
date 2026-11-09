import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F2A4A] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About BAUST Career Bridge */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C9A227] flex items-center justify-center text-[#0F2A4A]">
                <GraduationCap className="w-5 h-5 font-bold" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                BAUST Career Bridge
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official centralized network system connecting alumni, students, and administration of Bangladesh Army University of Science and Technology.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C9A227] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Approved by BAUST Academic Council</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/student/directory" className="hover:text-white transition-colors">
                  Verified Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/student/mentorship" className="hover:text-white transition-colors">
                  Structured Mentorship
                </Link>
              </li>
              <li>
                <Link to="/alumni/admin-desk" className="hover:text-white transition-colors">
                  Paperless Admin Desk (Transcripts)
                </Link>
              </li>
              <li>
                <Link to="/verify-document" className="hover:text-white transition-colors">
                  Public Document Verification Portal
                </Link>
              </li>
              <li>
                <Link to="/student/chat" className="hover:text-white transition-colors">
                  Direct In-App Messenger
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              BAUST Campus Info
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>Saidpur Cantonment, Saidpur, Nilphamari-5311, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>+880 551-63445 (Registrar Desk)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>careerbridge@baust.edu.bd</span>
              </div>
            </div>
          </div>

          {/* Col 4: Faculty Notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Evaluation & Capstone
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built for faculty demonstration. Includes interactive Demo Role Switcher to inspect Student, Alumni, and Admin workflows in real-time.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-300">
              <span className="text-[#C9A227] font-semibold">Demo Persist:</span> State changes (requests, ratings, document submissions) persist in your browser localStorage.
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            &copy; {new Date().getFullYear()} BAUST. All Rights Reserved. Bangladesh Army University of Science and Technology.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200">Privacy Policy</span>
            <span className="hover:text-slate-200">Terms of Service</span>
            <span className="hover:text-slate-200">Help & FAQs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
