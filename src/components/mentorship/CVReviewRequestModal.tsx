import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../ui/Toast';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

interface CVReviewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMentorId?: string;
  versionName?: string;
}

export const CVReviewRequestModal: React.FC<CVReviewRequestModalProps> = ({
  isOpen,
  onClose,
  defaultMentorId,
  versionName = 'v1'
}) => {
  const { mentors, createCVReviewRequest } = useMentorshipStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [selectedMentorId, setSelectedMentorId] = useState(defaultMentorId || mentors[0]?.id || '');
  const [targetRole, setTargetRole] = useState('Junior Backend Software Engineer (Go/Node.js)');
  const [deadlinePreference, setDeadlinePreference] = useState('Within 3 days');
  const [studentNotes, setStudentNotes] = useState('');
  const [fileName, setFileName] = useState(`Ahsan_Habib_Resume_${versionName}.pdf`);
  const [fileSize, setFileSize] = useState('340 KB');
  const [fileUploaded, setFileUploaded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) {
      showToast('Please specify the target job role or sector.', 'error');
      return;
    }

    createCVReviewRequest({
      studentId: user.id,
      studentName: user.name,
      studentDept: user.department,
      studentBatch: user.batch || '8th Batch',
      studentAvatar: user.avatar,
      mentorId: selectedMentorId,
      targetRole,
      fileName,
      fileSize,
      deadlinePreference,
      studentNotes,
      version: versionName
    });

    showToast(`CV Review (${versionName}) submitted successfully!`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Request CV Review (${versionName})`} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Select Reviewer (Mentor)
          </label>
          <select
            value={selectedMentorId}
            onChange={(e) => setSelectedMentorId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]/20"
          >
            {mentors.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.company} • {m.sector})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Target Job Title / Graduate Program *
          </label>
          <Input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Associate Software Engineer, DAAD Scholar, Trainee Officer"
          />
        </div>

        {/* Upload File Card */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Upload CV / Resume (PDF)
          </label>
          <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                PDF
              </div>
              <div>
                <div className="font-semibold text-xs text-slate-900">{fileName}</div>
                <div className="text-[11px] text-slate-500">{fileSize} • Ready to send</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('File re-selected.', 'info')}
              className="text-xs text-navy font-bold hover:underline cursor-pointer"
            >
              Change File
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Turnaround Preference
            </label>
            <select
              value={deadlinePreference}
              onChange={(e) => setDeadlinePreference(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white"
            >
              <option>Urgent (Within 24-48 hours)</option>
              <option>Within 3 days</option>
              <option>Standard (5-7 days)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              CV Version
            </label>
            <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-navy">
              {versionName} (Iterative Tracking)
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Specific Questions / Notes for Mentor
          </label>
          <textarea
            rows={2}
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            placeholder="e.g. Please check my project bullet metrics and whether my technical skills are ATS-friendly..."
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Submit for Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};
