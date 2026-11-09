import React, { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  User, GraduationCap, Award, Briefcase, Mail, Phone, Globe, Github, 
  Linkedin, FileText, CheckCircle2, Save, Upload, ShieldCheck, Sparkles 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useToast } from '../../../components/ui/Toast';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { language } = useLanguage();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || 'Ahsan Habib',
    email: user?.email || 'ahsan.habib@baust.edu.bd',
    phone: '+880 1712-345678',
    studentId: '0802420105101028',
    department: 'Computer Science & Engineering',
    batch: 'Batch 10 (2021-2025)',
    currentSemester: '8th Semester (Final Year)',
    cgpa: '3.82',
    bio: 'Aspiring Full-Stack Software Engineer with passionate interest in distributed microservices, scalable cloud architectures, and open-source tooling. Eager to connect with BAUST alumni at top tech firms.',
    targetRoles: 'Software Engineer, Cloud Solutions Associate, Backend Developer',
    targetIndustry: 'Information Technology / Fintech / Multi-National Corporations',
    github: 'https://github.com/ahsan-habib-baust',
    linkedin: 'https://linkedin.com/in/ahsan-habib-baust',
    portfolio: 'https://ahsan-dev.vercel.app',
    skills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Python', 'Tailwind CSS', 'Git & GitHub', 'REST APIs'],
    interests: ['System Architecture', 'Fintech', 'Open Source', 'Competitive Programming', 'Higher Studies in Germany']
  });

  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // TODO: replace with API call
    setTimeout(() => {
      setIsSaving(false);
      showToast({
        title: language === 'bn' ? 'প্রোফাইল আপডেট সফল' : 'Profile Updated',
        message: language === 'bn' ? 'আপনার তথ্য সফলভাবে সংরক্ষিত হয়েছে।' : 'Your student profile has been saved successfully.',
        type: 'success'
      });
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-[#0F2A4A] via-[#1E3A8A] to-[#2E5E3E] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
              alt={formData.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
            />
            <button 
              onClick={() => alert('Photo change dialog: Upload new official passport or professional headshot.')}
              className="absolute -bottom-2 -right-2 bg-[#C9A227] hover:bg-[#B89220] text-slate-900 p-2 rounded-xl shadow transition"
              title="Change Photo"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold">{formData.name}</h1>
              <Badge variant="warning" size="sm" className="bg-[#C9A227] text-slate-950 font-bold border-none">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" />
                VERIFIED BAUST STUDENT
              </Badge>
            </div>
            <p className="text-blue-100 text-sm md:text-base">
              ID: <span className="font-mono font-bold text-[#C9A227]">{formData.studentId}</span> • {formData.department}
            </p>
            <p className="text-xs text-blue-200 mt-1">
              {formData.batch} • {formData.currentSemester} • Cumulative CGPA: <span className="font-bold text-white">{formData.cgpa}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Academic & Verification Info */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#2E5E3E]" />
              Academic Credentials
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Institution</span>
                <span className="font-semibold text-slate-800">Bangladesh Army University of Science & Technology</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Department</span>
                <span className="font-semibold text-slate-800">{formData.department}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Student ID</span>
                  <span className="font-mono font-bold text-slate-800">{formData.studentId}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">CGPA</span>
                  <span className="font-bold text-emerald-600">{formData.cgpa} / 4.00</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Registration Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled & University Cleared
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C9A227]" />
              Resume & ATS Score
            </h3>
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900">Current Resume Version</span>
                <span className="text-xs font-mono font-bold bg-[#C9A227] text-slate-900 px-2 py-0.5 rounded">v2.1</span>
              </div>
              <p className="text-xs text-amber-800 mb-3">Ahsan_Habib_CSE_CV_2026.pdf (Uploaded 3 days ago)</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-amber-200/60">
                <span className="text-slate-600">Alumni ATS Grade:</span>
                <span className="font-bold text-emerald-700 text-sm">82 / 100 (Strong)</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={() => alert('Opening CV file upload dialog...')}
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Upload New CV Draft
            </Button>
          </Card>
        </div>

        {/* Right Column: Editable Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#0F2A4A] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#0F2A4A]" />
              Personal & Career Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Official University Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Target Job Roles</label>
                <input
                  type="text"
                  value={formData.targetRoles}
                  onChange={(e) => setFormData({ ...formData, targetRoles: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">About Me / Professional Summary</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> GitHub Profile
                </label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn URL
                </label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> Portfolio
                </label>
                <input
                  type="text"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
            </div>
          </Card>

          {/* Technical Skills & Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#0F2A4A] mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2E5E3E]" />
              Technical & Interpersonal Skills
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add skills relevant to your target industries so BAUST alumni mentors can evaluate your readiness for job referrals.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Next.js, Kubernetes, Machine Learning..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
              <Button variant="secondary" onClick={handleAddSkill}>
                Add Skill
              </Button>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 shadow-md"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving Changes...' : 'Save All Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
