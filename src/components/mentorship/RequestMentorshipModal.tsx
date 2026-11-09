import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Mentor, MentorshipTopic, SessionMode } from '../../types/mentorship';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../ui/Toast';
import { 
  FileText, 
  Video, 
  Phone, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface RequestMentorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
}

export const RequestMentorshipModal: React.FC<RequestMentorshipModalProps> = ({
  isOpen,
  onClose,
  mentor
}) => {
  const { user } = useAuthStore();
  const { createMentorshipRequest } = useMentorshipStore();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [topic, setTopic] = useState<MentorshipTopic>(mentor.topicsOffered[0] || 'Career Guidance');
  const [goalOneLine, setGoalOneLine] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<SessionMode>('Video Call');
  const [slotId, setSlotId] = useState(mentor.slots[0]?.id || '');
  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvFileName, setCvFileName] = useState('Ahsan_Habib_Resume.pdf');

  const topicsList: { topic: MentorshipTopic; desc: string }[] = [
    { topic: 'CV Review', desc: 'Line-by-line critique, formatting, and ATS score optimization.' },
    { topic: 'Interview Prep', desc: 'Mock technical coding, system design, or HR behavioral interview.' },
    { topic: 'Higher Studies', desc: 'University selection, professor cold emailing, DAAD/RTP/SI scholarships.' },
    { topic: 'Career Guidance', desc: 'Industry pathways in telecom, banking, tech startups, or govt cadre.' },
    { topic: 'Project/Thesis Help', desc: 'Guidance on capstone architecture, datasets, or paper writing.' },
    { topic: 'Skill Roadmap', desc: 'Structured learning milestones for cloud, ML, DevOps, or firmware.' }
  ];

  const templateSuggestions: Record<MentorshipTopic, string> = {
    'CV Review': 'Salam! I am seeking your feedback on my single-page resume before applying for junior developer roles.',
    'Interview Prep': 'Salam! I have an upcoming technical screening and would love to practice mock behavioral & technical questions.',
    'Higher Studies': 'Salam! I am targeting European/North American graduate programs and would value your feedback on supervisor outreach.',
    'Career Guidance': 'Salam! Seeking your guidance on how to navigate the transition from campus into top Bangladeshi companies.',
    'Project/Thesis Help': 'Salam! We are working on our 4th year capstone project and would value your advice on architecture and experiments.',
    'Skill Roadmap': 'Salam! Looking for a realistic 6-month roadmap to build production-grade proficiency in your domain.'
  };

  const handleApplyTemplate = () => {
    setMessage(templateSuggestions[topic]);
    setGoalOneLine(`Targeting guidance in ${topic} for career advancement.`);
  };

  const handleSubmit = () => {
    if (!goalOneLine.trim()) {
      showToast('Please state your 1-line mentorship goal.', 'error');
      return;
    }
    if (!message.trim()) {
      showToast('Please include a short message for the mentor.', 'error');
      return;
    }

    const result = createMentorshipRequest({
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      studentAvatar: user.avatar,
      studentDept: user.department,
      studentBatch: user.batch || '8th Batch',
      mentorId: mentor.id,
      topic,
      goalOneLine,
      message,
      mode,
      slotId,
      cvUrl: cvUploaded ? '#' : undefined
    });

    if (result.success) {
      showToast(result.message, 'success');
      onClose();
      setStep(1);
    } else {
      showToast(result.message, 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Request Mentorship with ${mentor.name}`} maxWidth="2xl">
      {/* Stepper Progress */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs font-semibold">
        <span className={step >= 1 ? 'text-[#0F2A4A]' : 'text-slate-400'}>1. Topic & Goal</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 2 ? 'text-[#0F2A4A]' : 'text-slate-400'}>2. Mode & Slot</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 3 ? 'text-[#0F2A4A]' : 'text-slate-400'}>3. Attachment</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 4 ? 'text-[#0F2A4A]' : 'text-slate-400'}>4. Confirm</span>
      </div>

      {/* STEP 1: Topic & Goal */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Mentorship Topic
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {topicsList.map(t => (
                <div
                  key={t.topic}
                  onClick={() => setTopic(t.topic)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    topic === t.topic 
                      ? 'border-[#0F2A4A] bg-[#0F2A4A]/5 ring-1 ring-[#0F2A4A]' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-900">{t.topic}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Your Primary Goal (One Line) *
              </label>
              <button
                type="button"
                onClick={handleApplyTemplate}
                className="text-xs text-[#2E5E3E] hover:underline font-semibold cursor-pointer"
              >
                Use template text
              </button>
            </div>
            <Input
              placeholder="e.g. Master system design and crack junior backend interview at Grameenphone."
              value={goalOneLine}
              onChange={(e) => setGoalOneLine(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Message to Mentor *
              </label>
              <span className="text-[11px] text-slate-400">{message.length}/500 chars</span>
            </div>
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Introduce your background and specify 2-3 concrete questions or areas you would like to cover..."
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]/20 focus:border-[#0F2A4A]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-3">
            <Button variant="primary" onClick={() => setStep(2)}>
              Next: Mode & Slots →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Mode & Available Slot */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Preferred Session Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { mode: 'Video Call' as SessionMode, icon: <Video className="w-5 h-5 text-blue-600" />, desc: 'Google Meet / Zoom' },
                { mode: 'Voice Call' as SessionMode, icon: <Phone className="w-5 h-5 text-emerald-600" />, desc: 'Audio Call' },
                { mode: 'Chat' as SessionMode, icon: <MessageSquare className="w-5 h-5 text-purple-600" />, desc: 'Asynchronous Q&A' }
              ].map(m => (
                <div
                  key={m.mode}
                  onClick={() => setMode(m.mode)}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                    mode === m.mode 
                      ? 'border-[#0F2A4A] bg-[#0F2A4A]/5 ring-1 ring-[#0F2A4A]' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-center mb-1.5">{m.icon}</div>
                  <div className="font-semibold text-xs text-slate-900">{m.mode}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Choose from Mentor's Available Weekly Slots
            </label>
            <div className="space-y-2">
              {mentor.slots.map(s => (
                <div
                  key={s.id}
                  onClick={() => setSlotId(s.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    slotId === s.id
                      ? 'border-[#0F2A4A] bg-[#0F2A4A]/5 ring-1 ring-[#0F2A4A]'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#2E5E3E]" />
                    <span className="font-semibold text-xs text-slate-900">{s.day}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep(3)}>
              Next: Attachment →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Optional Attachment (CV) */}
      {step === 3 && (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Optional Supporting Document (CV / Project Brief)
          </label>
          <p className="text-xs text-slate-500">
            Attaching your current CV helps the mentor review your background before the scheduled session.
          </p>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
            <Upload className="w-8 h-8 text-[#0F2A4A] mx-auto mb-2" />
            <div className="text-xs font-semibold text-slate-800">
              Upload PDF Document (Max 5MB)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports .pdf, .docx format
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                setCvUploaded(true);
                showToast('Mock CV attached successfully.', 'info');
              }}
            >
              {cvUploaded ? 'Replace Document' : 'Browse Files'}
            </Button>
          </div>

          {cvUploaded && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>{cvFileName} (320 KB)</span>
              </div>
              <button
                type="button"
                onClick={() => setCvUploaded(false)}
                className="text-xs text-rose-600 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep(4)}>
              Review & Submit →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Summary & Submit */}
      {step === 4 && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Mentor:</span>
              <span className="font-bold text-slate-900">{mentor.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Topic:</span>
              <Badge variant="navy" size="sm">{topic}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mode:</span>
              <span className="font-semibold text-slate-800">{mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Slot:</span>
              <span className="font-semibold text-slate-800">
                {mentor.slots.find(s => s.id === slotId)?.day} at {mentor.slots.find(s => s.id === slotId)?.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CV Attached:</span>
              <span className="font-semibold text-slate-800">{cvUploaded ? 'Yes (PDF)' : 'No'}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-500 block mb-1">Your Goal:</span>
              <p className="font-medium text-slate-800 italic">"{goalOneLine}"</p>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Message:</span>
              <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                {message}
              </p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-[11px] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Once submitted, your request will appear in your <strong>"My Requests"</strong> tab as <strong>PENDING</strong>. You will receive an instant notification when {mentor.name} confirms or suggests a time.
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setStep(3)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Confirm & Submit Request
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
