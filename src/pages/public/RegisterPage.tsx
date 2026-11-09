import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../../components/ui/Toast';
import { 
  GraduationCap, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building 
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { setRole } = useAuthStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setRegRole] = useState<'student' | 'alumni'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState<'CSE' | 'EEE' | 'Civil' | 'Textile' | 'BBA' | 'ME'>('CSE');
  const [batch, setBatch] = useState('8th Batch (2022)');
  const [passingYear, setPassingYear] = useState('2026');
  const [docUploaded, setDocUploaded] = useState(true);
  const [docName, setDocName] = useState('BAUST_Student_ID_Proof.pdf');

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !studentId) {
      showToast('Please fill all mandatory fields.', 'error');
      return;
    }
    setStep(3);
  };

  const handleCompleteRegistration = () => {
    setStep(4);
    showToast('Registration submitted for admin review.', 'success');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F2A4A] to-[#2E5E3E] text-[#C9A227] flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy">Join BAUST Career Bridge</h2>
          <p className="text-xs text-slate-500">
            Official identity-verified portal for BAUST students & alumni.
          </p>
        </div>

        {/* Stepper tracker */}
        {step <= 3 && (
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-500">
            <span className={step === 1 ? 'text-[#0F2A4A] underline' : step > 1 ? 'text-emerald-700' : ''}>
              1. Choose Role
            </span>
            <span>→</span>
            <span className={step === 2 ? 'text-[#0F2A4A] underline' : step > 2 ? 'text-emerald-700' : ''}>
              2. Academic Records
            </span>
            <span>→</span>
            <span className={step === 3 ? 'text-[#0F2A4A] underline' : ''}>
              3. Verification Proof
            </span>
          </div>
        )}

        {/* STEP 1: Choose Role */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Affiliation
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setRegRole('student')}
                className={`p-5 rounded-2xl border text-center cursor-pointer transition-all ${
                  role === 'student'
                    ? 'border-[#0F2A4A] bg-[#0F2A4A]/5 ring-2 ring-[#0F2A4A]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-navy flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-slate-900">Current Student</div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Enrolled undergraduate seeking mentorship, CV reviews & network.
                </p>
              </div>

              <div
                onClick={() => setRegRole('alumni')}
                className={`p-5 rounded-2xl border text-center cursor-pointer transition-all ${
                  role === 'alumni'
                    ? 'border-[#2E5E3E] bg-[#2E5E3E]/5 ring-2 ring-[#2E5E3E]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-slate-900">BAUST Alum</div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Graduated alumni offering mentorship or requesting transcripts.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={() => setStep(2)}>
                Next: Academic Details →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Info */}
        {step === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-4 text-xs">
            <Input
              label="Full Name (As in BAUST Records) *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanzil Ahmed Chowdhury"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Official Email *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@baust.edu.bd"
                required
              />
              <Input
                label="BAUST Student ID *"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. 15CSE042 or 0802420105101028"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Department *
                </label>
                <select
                  value={department}
                  onChange={(e: any) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900"
                >
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="Civil">Civil</option>
                  <option value="Textile">Textile</option>
                  <option value="BBA">BBA</option>
                  <option value="ME">ME</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Batch *
                </label>
                <input
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="e.g. 1st Batch or 8th Batch"
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Passing / Graduation Year
                </label>
                <input
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  placeholder="e.g. 2019 or 2026"
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button type="submit" variant="primary">
                Next: Upload Proof →
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: Verification Proof Upload */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Upload Verification Document (ID Card / Transcript) *
              </label>
              <p className="text-slate-500">
                To eliminate fake profiles, BAUST administrators manually inspect your student ID card or grade sheet before activating full directory permissions.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
              <Upload className="w-8 h-8 text-[#0F2A4A] mx-auto mb-2" />
              <div className="font-semibold text-slate-800">Upload Front & Back of BAUST ID Card</div>
              <p className="text-[11px] text-slate-400 mt-1">PDF, PNG, JPG under 8MB</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => {
                  setDocUploaded(true);
                  showToast('Verification document uploaded.', 'info');
                }}
              >
                Browse Document
              </Button>
            </div>

            {docUploaded && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-950">{docName} (1.2 MB)</span>
                </div>
                <span className="text-emerald-700 font-bold">Attached</span>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button variant="primary" onClick={handleCompleteRegistration}>
                Submit for Verification
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Screen */}
        {step === 4 && (
          <div className="py-6 text-center space-y-4 text-xs">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
              <Clock className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy">Your Profile is Pending Admin Verification</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you for registering! Your account credentials and uploaded document have been dispatched to the University Administration queue. Typical turnaround is within 24 to 48 hours.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-1.5">
              <div className="font-bold text-slate-800">Verification Ticket #VER-2026-9041</div>
              <div className="text-slate-600">Registered Role: <strong className="capitalize">{role}</strong></div>
              <div className="text-slate-600">Department: {department} ({batch})</div>
              <div className="text-slate-600">Status: <Badge variant="pending" size="sm">Under Review</Badge></div>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <Button
                variant="primary"
                onClick={() => {
                  setRole(role);
                  navigate(role === 'student' ? '/student/dashboard' : '/alumni/dashboard');
                }}
              >
                Enter Demo Platform Now →
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
