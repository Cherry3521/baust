import React from 'react';
import { Notice } from '../../types/admindesk';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../ui/Toast';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { X, Calendar, Download, Users, Pin, CheckCircle2 } from 'lucide-react';

interface NoticeDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Notice;
}

export const NoticeDetailDrawer: React.FC<NoticeDetailDrawerProps> = ({
  isOpen,
  onClose,
  notice
}) => {
  const { rsvpNoticeEvent } = useAdminDeskStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const hasRsvped = notice.rsvpUsers?.includes(user.id);

  const handleRsvp = () => {
    rsvpNoticeEvent(notice.id, user.id);
    showToast(hasRsvped ? 'RSVP removed.' : 'RSVP confirmed! Event added to your calendar.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="navy" size="sm">{notice.category}</Badge>
            {notice.isPinned && <Badge variant="gold" size="sm">PINNED</Badge>}
            {notice.isUrgent && <Badge variant="actionRequired" size="sm">URGENT</Badge>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          <div>
            <h2 className="text-base font-extrabold text-navy leading-snug">
              {notice.title}
            </h2>
            <div className="text-slate-400 mt-1 flex items-center gap-3">
              <span>Published on {new Date(notice.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>Audience: {notice.audience}</span>
            </div>
          </div>

          {/* Event Banner if RSVP available */}
          {notice.hasRsvp && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F2A4A] to-[#2E5E3E] text-white flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#C9A227] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Upcoming Event Date
                </div>
                <div className="text-sm font-extrabold mt-0.5">{notice.eventDate}</div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  {notice.rsvpCount || 0} participants RSVP'd
                </div>
              </div>
              <Button
                variant={hasRsvped ? 'accent' : 'outline'}
                size="sm"
                className={hasRsvped ? 'bg-[#C9A227] text-white' : 'text-white border-white/40'}
                onClick={handleRsvp}
              >
                {hasRsvped ? '✓ Attending' : 'RSVP Now'}
              </Button>
            </div>
          )}

          {/* Body Text */}
          <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line p-4 rounded-2xl bg-slate-50 border border-slate-100">
            {notice.body}
          </div>

          {/* Attachment */}
          {notice.attachmentName && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-navy" />
                <span className="font-semibold text-slate-800">{notice.attachmentName}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast(`Downloaded ${notice.attachmentName}`, 'info')}
              >
                Download PDF
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
