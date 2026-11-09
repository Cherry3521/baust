import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Star, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { MentorshipRequest } from '../../types/mentorship';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useToast } from '../ui/Toast';

interface RatingFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: MentorshipRequest;
}

export const RatingFeedbackModal: React.FC<RatingFeedbackModalProps> = ({
  isOpen,
  onClose,
  request
}) => {
  const { completeSession } = useMentorshipStore();
  const { showToast } = useToast();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Helpful', 'Practical advice']);
  const [reviewText, setReviewText] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);

  const availableTags = [
    'Helpful',
    'Knowledgeable',
    'Patient',
    'Practical advice',
    'Inspiring',
    'Clear Roadmap',
    'Great Mock Interview'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      showToast('Please write a brief sentence sharing your experience.', 'error');
      return;
    }

    completeSession(request.id, {
      rating,
      ratingTags: selectedTags,
      reviewText,
      wouldRecommend
    });

    showToast(`Session completed and ${rating}-star review published!`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate & Review Mentorship Session" maxWidth="md">
      <div className="space-y-4">
        <div className="text-center pb-2">
          <p className="text-xs text-slate-500">
            How was your session on <strong>{request.topic}</strong> with <strong>{request.mentorName}</strong>?
          </p>

          {/* Star Rating */}
          <div className="flex justify-center items-center gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-110 cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 ${
                    (hoverRating !== null ? star <= hoverRating : star <= rating)
                      ? 'fill-[#C9A227] text-[#C9A227]'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="text-xs font-bold text-navy mt-1">
            {rating === 5 ? 'Excellent (5 Stars)' : rating === 4 ? 'Very Good (4 Stars)' : `${rating} Stars`}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            What was most valuable?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#2E5E3E] text-white border-[#2E5E3E]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Review text */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Written Feedback / Testimonial *
          </label>
          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share specific takeaways that helped you most. This testimonial will appear on the alumni's verified BAUST profile..."
            className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]/20 focus:border-[#0F2A4A]"
          />
        </div>

        {/* Would you recommend */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span>Would you recommend this mentor to peers?</span>
          </div>
          <button
            type="button"
            onClick={() => setWouldRecommend(!wouldRecommend)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              wouldRecommend ? 'bg-[#2E5E3E]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                wouldRecommend ? 'translate-x-6' : 'translate-x-1'
              } top-0.5 absolute`}
            />
          </button>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Skip for Now
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Submit Feedback & Complete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
