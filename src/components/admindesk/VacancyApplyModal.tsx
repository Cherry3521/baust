import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Vacancy } from '../../types/admindesk';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../ui/Toast';
import { FileText, CheckCircle2, Upload } from 'lucide-react';

interface VacancyApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: Vacancy;
}

export const VacancyApplyModal: React.FC<VacancyApplyModalProps> = ({
  isOpen,
  onClose,
  vacancy
}) => {
  const { submitJobApplication } = useAdminDeskStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [coverNote, setCoverNote] = useState('');
  const [cvFileName] = useState('Tanzil_Ahmed_Academic_CV.pdf');
  const [experienceYears, setExperienceYears] = useState(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverNote.trim()) {
      showToast('Please provide a cover note explaining your motivation and qualifications.', 'error');
      return;
    }

    submitJobApplication({
      vacancyId: vacancy.id,
      alumniId: user.id,
      alumniName: user.name,
      alumniDept: user.department,
      alumniBatch: user.batch || '1st Batch (2015)',
      alumniCgpa: 3.88,
      alumniExperienceYears: experienceYears,
      coverNote,
      cvFileName
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply: ${vacancy.title}`} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Vacancy summary banner */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <div className="font-bold text-slate-900">{vacancy.title} ({vacancy.department})</div>
          <div className="text-slate-500">
            Minimum CGPA Required: <strong>{vacancy.cgpaRequirement}</strong> • Deadline: <strong>{vacancy.deadline}</strong>
          </div>
        </div>

        {/* Auto-filled Academic Info */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Auto-filled from your BAUST Verified Profile:
          </div>
          <div>Name: <strong>{user.name}</strong> • Dept: {user.department} ({user.batch || '1st Batch'})</div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Years of Relevant Industry / Teaching Experience
          </label>
          <input
            type="number"
            min="0"
            max="30"
            value={experienceYears}
            onChange={(e) => setExperienceYears(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Curriculum Vitae / Resume *
          </label>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0F2A4A]" />
              <span className="font-semibold text-slate-800">{cvFileName}</span>
            </div>
            <span className="text-emerald-700 font-bold">Attached</span>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Statement of Purpose & Cover Note *
          </label>
          <textarea
            rows={4}
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="Describe your research interests, teaching philosophy, and how your industry experience will benefit BAUST students..."
            className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
};
