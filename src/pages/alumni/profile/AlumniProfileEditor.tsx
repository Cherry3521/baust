import React, { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useDirectoryStore } from '../../../hooks/useDirectoryStore';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  User, Briefcase, GraduationCap, Award, ShieldCheck, AlertTriangle, 
  Save, Plus, Trash2, Eye, Upload 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../components/ui/Toast';
import { JobSector, SkillLevel, WorkExperience, SkillItem, PrivacySettings } from '../../../types/directory';

export const AlumniProfileEditor: React.FC = () => {
  const { user } = useAuthStore();
  const { profiles, updateAlumniProfile } = useDirectoryStore();
  const { language } = useLanguage();
  const { showToast } = useToast();

  // Find logged in alumni's profile or default to 'alm-1'
  const currentProfile = profiles.find(p => p.id === 'alm-1' || p.id === 'alumni-1') || profiles[0];

  const [formData, setFormData] = useState({
    name: currentProfile?.name || 'Tanzil Ahmed Chowdhury',
    currentPosition: currentProfile?.currentPosition || 'Principal Software Engineer',
    currentCompany: currentProfile?.currentCompany || 'Brain Station 23',
    department: currentProfile?.department || 'CSE',
    batch: currentProfile?.batch || '2nd Batch',
    passingYear: currentProfile?.passingYear || '2019',
    studentId: currentProfile?.studentId || '0802420105101029',
    cgpa: currentProfile?.cgpa || 3.88,
    bio: currentProfile?.bio || 'Passionate software architect with 6+ years in distributed systems, fintech backend engines, and cloud reliability.',
    roleDescription: currentProfile?.roleDescription || 'Leading backend architecture for digital banking platforms.',
    avatar: currentProfile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    sector: (currentProfile?.sector || 'Private') as JobSector,
    location: currentProfile?.location || 'Dhaka, Bangladesh',
    privacy: {
      cgpaVisibility: 'Public' as const,
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    workExperience: currentProfile?.workExperience || [],
    education: currentProfile?.education || [],
    skills: currentProfile?.skills || []
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Advanced');
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Experience form helpers
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      title: 'Senior Software Engineer',
      organization: 'Tech Firm Ltd.',
      type: 'Full-time',
      period: '2024 - Present',
      location: 'Dhaka, Bangladesh',
      responsibilities: 'Lead architecture of cloud APIs and real-time payment microservices.'
    };
    setFormData(prev => ({
      ...prev,
      workExperience: [newExp, ...prev.workExperience]
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(e => e.id !== id)
    }));
  };

  const handleAddSkill = () => {
    if (newSkillName.trim() && !formData.skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      const item: SkillItem = {
        name: newSkillName.trim(),
        category: 'Technical',
        level: newSkillLevel,
        endorsements: 0
      };
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, item]
      }));
      setNewSkillName('');
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // TODO: replace with API call
    setTimeout(() => {
      if (currentProfile) {
        updateAlumniProfile(currentProfile.id, {
          name: formData.name,
          currentPosition: formData.currentPosition,
          currentCompany: formData.currentCompany,
          sector: formData.sector,
          location: formData.location,
          bio: formData.bio,
          roleDescription: formData.roleDescription,
          workExperience: formData.workExperience,
          skills: formData.skills
        });
      }
      setIsSaving(false);
      showToast({
        title: language === 'bn' ? 'প্রোফাইল সংরক্ষিত' : 'Profile Saved',
        message: language === 'bn' ? 'অ্যালামনাই প্রোফাইল আপডেট সফল হয়েছে।' : 'Your alumni profile has been updated in the directory.',
        type: 'success'
      });
    }, 500);
  };

  const triggerSensitiveNotice = () => {
    setShowSensitiveWarning(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2A4A] via-[#1E3A8A] to-[#2E5E3E] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <div className="relative">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              <button
                onClick={() => alert('Change profile photo: Upload high-resolution PNG or JPG.')}
                className="absolute -bottom-2 -right-2 p-2 bg-[#C9A227] hover:bg-[#B89220] text-slate-900 rounded-xl shadow transition"
                title="Upload Photo"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                <h1 className="text-2xl md:text-3xl font-extrabold">{formData.name}</h1>
                <Badge variant="gold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" /> VERIFIED ALUMNUS
                </Badge>
              </div>
              <p className="text-blue-100 text-sm">
                {formData.currentPosition} at <span className="font-semibold">{formData.currentCompany}</span> • {formData.location}
              </p>
              <p className="text-xs text-blue-200 mt-1">
                BAUST {formData.department} ({formData.batch}) • Class of {formData.passingYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#C9A227] hover:bg-[#B89220] text-slate-900 font-bold border-none shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Academic Credentials & Verification Lock */}
        <div className="space-y-6">
          <Card className="p-6 border-amber-200/80 bg-gradient-to-b from-amber-50/40 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#0F2A4A] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Verified Academic Credentials
              </h3>
              <Badge variant="green" size="sm">Locked</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              These credentials are authenticated against the BAUST Registrar graduation register.
            </p>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 block">Student Registration ID</span>
                <span className="font-mono font-bold text-slate-800">{formData.studentId}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 block">Department</span>
                <span className="font-semibold text-slate-800">{formData.department}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-400 block">Graduation Batch</span>
                  <span className="font-semibold text-slate-800">{formData.batch}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-400 block">Passing Year</span>
                  <span className="font-semibold text-slate-800">{formData.passingYear}</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 block">Graduation CGPA</span>
                <span className="font-bold text-emerald-600">{formData.cgpa} / 4.00</span>
              </div>
            </div>

            <button
              onClick={triggerSensitiveNotice}
              className="mt-4 text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Need to correct your official academic record?
            </button>
          </Card>

          {/* Privacy & Visibility Settings */}
          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#2E5E3E]" />
              Directory Privacy Settings
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Control what current students and public visitors can view on your directory profile.
            </p>

            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/70">
                <span className="text-xs font-medium text-slate-700">Display Email to Verified Students</span>
                <input
                  type="checkbox"
                  checked={formData.privacy.showEmail}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showEmail: e.target.checked }
                  })}
                  className="w-4 h-4 text-[#0F2A4A] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/70">
                <span className="text-xs font-medium text-slate-700">Display Phone Number</span>
                <input
                  type="checkbox"
                  checked={formData.privacy.showPhone}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showPhone: e.target.checked }
                  })}
                  className="w-4 h-4 text-[#0F2A4A] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/70">
                <span className="text-xs font-medium text-slate-700">Display Employer & Organization</span>
                <input
                  type="checkbox"
                  checked={formData.privacy.showEmployer}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showEmployer: e.target.checked }
                  })}
                  className="w-4 h-4 text-[#0F2A4A] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/70">
                <span className="text-xs font-medium text-slate-700">Display Location City</span>
                <input
                  type="checkbox"
                  checked={formData.privacy.showLocation}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, showLocation: e.target.checked }
                  })}
                  className="w-4 h-4 text-[#0F2A4A] rounded"
                />
              </label>
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Editable Career Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#0F2A4A] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#0F2A4A]" />
              Professional Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Current Job Title</label>
                <input
                  type="text"
                  value={formData.currentPosition}
                  onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Current Employer / Organization</label>
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Industry Sector</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value as JobSector })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                >
                  <option value="Private">Private / Corporate</option>
                  <option value="Government">Government / Public Sector</option>
                  <option value="Multinational">Multinational Corporation</option>
                  <option value="Abroad">Abroad / Overseas</option>
                  <option value="Higher Study">Higher Study</option>
                  <option value="Research">Research & Academia</option>
                  <option value="Business">Business / Entrepreneurship</option>
                  <option value="Freelancing">Freelancing / Consulting</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Current Location (City, Country)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Role Description / Scope</label>
              <input
                type="text"
                value={formData.roleDescription}
                onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Career Bio & Advice for Students</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
            </div>
          </Card>

          {/* Work Experience Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Experience History</h3>
                <p className="text-xs text-slate-500">Your career trajectory since graduating from BAUST</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleAddExperience}>
                <Plus className="w-4 h-4 mr-1" /> Add Role
              </Button>
            </div>

            <div className="space-y-4">
              {formData.workExperience.map((exp, idx) => (
                <div key={exp.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition"
                    title="Delete Experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, workExperience: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.organization}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[idx] = { ...updated[idx], organization: e.target.value };
                          setFormData({ ...formData, workExperience: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[idx] = { ...updated[idx], period: e.target.value };
                          setFormData({ ...formData, workExperience: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[idx] = { ...updated[idx], location: e.target.value };
                          setFormData({ ...formData, workExperience: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills Management */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#0F2A4A] mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2E5E3E]" />
              Expertise & Skills
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add specific competencies that students can filter by in the Alumni Directory.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map(s => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200"
                >
                  <span>{s.name}</span>
                  <span className="text-[10px] text-[#2E5E3E] bg-[#2E5E3E]/10 px-1.5 py-0.5 rounded font-bold">
                    {s.level}
                  </span>
                  <button
                    onClick={() => handleRemoveSkill(s.name)}
                    className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Skill name (e.g. Microservices, GCP, Golang)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <Button variant="secondary" onClick={handleAddSkill} className="text-xs">
                Add Skill
              </Button>
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
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

      {/* Sensitive Edit Notice Modal */}
      <Modal
        isOpen={showSensitiveWarning}
        onClose={() => setShowSensitiveWarning(false)}
        title="Official Academic Record Correction Policy"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1.5 leading-relaxed">
              <p className="font-bold text-sm">Registrar Re-Verification Required</p>
              <p>
                To maintain the integrity of the BAUST Career Bridge directory, changes to your Student ID, Department, Batch, or CGPA cannot be edited directly from this form.
              </p>
              <p>
                Any changes require submission of an official Certificate or Transcript correction request to the BAUST Registrar Office.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-2">
            <p>Steps to request an academic update:</p>
            <ol className="list-decimal list-inside space-y-1 font-medium text-slate-700">
              <li>Open the University Admin Desk from your portal menu.</li>
              <li>Select service: "Official Record Correction / Re-Verification".</li>
              <li>Attach a scan of your original BAUST provisional/final certificate.</li>
            </ol>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowSensitiveWarning(false)}>
              Understood
            </Button>
            <a href="/alumni/admin-desk">
              <Button variant="primary">Go to Admin Desk</Button>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};
