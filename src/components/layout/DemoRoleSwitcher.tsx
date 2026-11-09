import React, { useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { UserRole } from '../../types/user';
import { Users, GraduationCap, Briefcase, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, setRole, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const roleConfigs: Record<UserRole, { label: string; sub: string; icon: React.ReactNode; color: string }> = {
    student: {
      label: 'Student View',
      sub: 'Ahsan Habib (8th Batch CSE)',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      color: 'border-blue-500 bg-blue-50/50'
    },
    alumni: {
      label: 'Alumni View',
      sub: 'Tanzil Ahmed (GP Principal SWE)',
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-500 bg-emerald-50/50'
    },
    admin: {
      label: 'University Admin',
      sub: 'Lt. Col. (Retd.) M. A. Hye (Registrar)',
      icon: <ShieldCheck className="w-5 h-5 text-[#C9A227]" />,
      color: 'border-[#C9A227] bg-amber-50/50'
    }
  };

  const current = roleConfigs[role];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Demo Role Switcher
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-2 mb-3">
            Switch between personas instantly to test cross-role sync without logging in:
          </p>

          <div className="space-y-2">
            {(['student', 'alumni', 'admin'] as UserRole[]).map((r) => {
              const cfg = roleConfigs[r];
              const isSelected = role === r;
              return (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? `${cfg.color} border-2 shadow-xs`
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-xs border border-slate-100">
                      {cfg.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{cfg.label}</div>
                      <div className="text-xs text-slate-500">{cfg.sub}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0F2A4A] text-white rounded-full shadow-xl hover:bg-[#163B66] active:scale-95 transition-all cursor-pointer border-2 border-[#C9A227]"
        title="Switch Demo Persona"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#C9A227]" />
          Role: <strong className="capitalize text-white">{role}</strong>
        </span>
      </button>
    </div>
  );
};
