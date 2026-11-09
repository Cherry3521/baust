import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CVReviewItem } from '../../types/mentorship';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useToast } from '../ui/Toast';
import { Star, CheckCircle2, Sliders, MessageSquare } from 'lucide-react';

interface CVReviewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewItem: CVReviewItem;
}

export const CVReviewFeedbackModal: React.FC<CVReviewFeedbackModalProps> = ({
  isOpen,
  onClose,
  reviewItem
}) => {
  const { submitCVReviewByMentor } = useMentorshipStore();
  const { showToast } = useToast();

  const [formatting, setFormatting] = useState(90);
  const [contentQuality, setContentQuality] = useState(88);
  const [skillsPresentation, setSkillsPresentation] = useState(85);
  const [projectsExperience, setProjectsExperience] = useState(92);
  const [grammarLanguage, setGrammarLanguage] = useState(90);
  const [atsFriendliness, setAtsFriendliness] = useState(88);

  const [strength1, setStrength1] = useState('Crisp single-page layout with high-impact action verbs.');
  const [strength2, setStrength2] = useState('Quantifiable engineering metrics on system throughput.');
  const [improve1, setImprove1] = useState('Add live deployment URLs to your GitHub repository.');
  const [improve2, setImprove2] = useState('Remove obsolete tool ratings on individual skill items.');

  const [overallMessage, setOverallMessage] = useState('Strong technical resume! Ready for top tier corporate screening.');
  const [summaryComment, setSummaryComment] = useState('Well targeted to software engineering roles.');
  const [projectsComment, setProjectsComment] = useState('Excellent microservices project presentation.');

  // Calculate composite score
  const totalScore = Math.round(
    (formatting + contentQuality + skillsPresentation + projectsExperience + grammarLanguage + atsFriendliness) / 6
  );
  const overallRating = totalScore >= 90 ? 5 : totalScore >= 80 ? 4 : 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitCVReviewByMentor(reviewItem.id, {
      overallRating,
      totalScore,
      categoryScores: {
        formatting,
        contentQuality,
        skillsPresentation,
        projectsExperience,
        grammarLanguage,
        atsFriendliness
      },
      strengths: [strength1, strength2].filter(Boolean),
      areasToImprove: [improve1, improve2].filter(Boolean),
      sectionComments: {
        summary: summaryComment,
        projects: projectsComment
      },
      overallMessage
    });

    showToast(`CV Review published with score ${totalScore}/100!`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Evaluate CV: ${reviewItem.studentName} (${reviewItem.version})`} maxWidth="2xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Composite Score Banner */}
        <div className="p-4 bg-gradient-to-r from-[#0F2A4A] to-[#1E3A5F] rounded-2xl text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-300 uppercase font-semibold">Calculated Score</div>
            <div className="text-3xl font-extrabold text-[#C9A227]">{totalScore} <span className="text-sm font-normal text-white">/ 100</span></div>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-5 h-5 ${s <= overallRating ? 'fill-[#C9A227] text-[#C9A227]' : 'text-slate-600'}`} />
            ))}
          </div>
        </div>

        {/* Category Sliders */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Category Breakdown Scores (0 - 100)
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Formatting & Layout', val: formatting, set: setFormatting },
              { label: 'Content Quality & Impact', val: contentQuality, set: setContentQuality },
              { label: 'Skills Presentation', val: skillsPresentation, set: setSkillsPresentation },
              { label: 'Projects & Work Experience', val: projectsExperience, set: setProjectsExperience },
              { label: 'Grammar & Professional Tone', val: grammarLanguage, set: setGrammarLanguage },
              { label: 'ATS-Friendliness Score', val: atsFriendliness, set: setAtsFriendliness }
            ].map(cat => (
              <div key={cat.label} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex justify-between font-semibold text-slate-800 mb-1">
                  <span>{cat.label}</span>
                  <span className="text-navy">{cat.val}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={cat.val}
                  onChange={(e) => cat.set(Number(e.target.value))}
                  className="w-full accent-[#0F2A4A] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
              Key Strengths (Bullet 1 & 2)
            </label>
            <input
              type="text"
              value={strength1}
              onChange={(e) => setStrength1(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs mb-2"
              placeholder="Strength 1"
            />
            <input
              type="text"
              value={strength2}
              onChange={(e) => setStrength2(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              placeholder="Strength 2"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-1.5">
              Areas to Improve (Bullet 1 & 2)
            </label>
            <input
              type="text"
              value={improve1}
              onChange={(e) => setImprove1(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs mb-2"
              placeholder="Area 1"
            />
            <input
              type="text"
              value={improve2}
              onChange={(e) => setImprove2(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              placeholder="Area 2"
            />
          </div>
        </div>

        {/* Overall Message */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mentor's Overall Feedback Message *
          </label>
          <textarea
            rows={2}
            value={overallMessage}
            onChange={(e) => setOverallMessage(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Publish Review & Notify Student
          </Button>
        </div>
      </form>
    </Modal>
  );
};
