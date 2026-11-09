import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { UserRole } from '../../types/user';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GraduationCap, ShieldCheck, Briefcase, Sparkles, Check } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setRole } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ahsan.habib@baust.edu.bd');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    if (selectedRole === 'student') navigate('/student/dashboard');
    else if (selectedRole === 'alumni') navigate('/alumni/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setRole(role);
    if (role === 'student') navigate('/student/dashboard');
    else if (role === 'alumni') navigate('/alumni/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F2A4A] to-[#2E5E3E] text-[#C9A227] flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy">Sign In to BAUST Career Bridge</h2>
          <p className="text-xs text-slate-500">
            Access your verified mentorship, alumni directory, and admin services.
          </p>
        </div>

        {/* 1-Click Quick Demo Switcher Buttons */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            Faculty Review: 1-Click Instant Login
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="px-2 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('alumni')}
              className="px-2 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Alumni
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'alumni', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r);
                    if (r === 'student') setEmail('ahsan.habib@baust.edu.bd');
                    else if (r === 'alumni') setEmail('tanzil.ahmed@grameenphone.com');
                    else setEmail('registrar@baust.edu.bd');
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedRole === r
                      ? 'border-[#0F2A4A] bg-[#0F2A4A] text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Email or BAUST Student ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. 15CSE042 or email@baust.edu.bd"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-navy" />
              <span>Remember me</span>
            </label>
            <span className="text-navy font-semibold hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full">
            Sign In to Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-navy hover:underline">
            Register for verification
          </Link>
        </div>

      </div>
    </div>
  );
};
