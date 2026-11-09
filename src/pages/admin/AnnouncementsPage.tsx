import React, { useState } from 'react';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  Bell, Plus, Calendar, Users, Megaphone, Send 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Notice, NoticeCategory } from '../../types/admindesk';
import { useToast } from '../../components/ui/Toast';

export const AnnouncementsPage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { notices, addNotice } = useAdminDeskStore();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Alumni Event');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Students' | 'Alumni'>('All');
  const [pinned, setPinned] = useState(false);

  const handlePublish = () => {
    if (!title.trim() || !body.trim()) return;
    addNotice({
      title: title.trim(),
      body: body.trim(),
      category,
      isPinned: pinned,
      isUrgent: false,
      audience: targetAudience,
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'Published'
    });
    setShowModal(false);
    setTitle('');
    setBody('');
    showToast({
      title: 'Announcement Published',
      message: `"${title}" has been broadcast to all verified BAUST community members.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A4A] flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#2E5E3E]" />
            Official Campus Circulars & Announcements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Broadcast official notices, career events, convocation dates, and alumni reunions.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="bg-[#2E5E3E] hover:bg-[#254d33] text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Create New Circular
        </Button>
      </div>

      {/* Broadcast Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-[#0F2A4A]">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Total Published</span>
          <p className="text-2xl font-black text-slate-800">{notices.length}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-[#C9A227]">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Active Event RSVPs</span>
          <p className="text-2xl font-black text-slate-800">
            {notices.reduce((acc, n) => acc + (n.rsvpCount || 0), 0)}
          </p>
        </Card>
        <Card className="p-4 border-l-4 border-l-[#2E5E3E]">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Verified Audience Reach</span>
          <p className="text-2xl font-black text-slate-800">3,658 Members</p>
        </Card>
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map(notice => (
          <Card key={notice.id} className="p-6 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant={notice.isPinned ? 'warning' : 'primary'} size="sm">
                  {notice.isPinned ? 'PINNED CIRCULAR' : notice.category}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" /> {notice.publishedAt}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-2">{notice.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed mb-4">
                {notice.body}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                {notice.rsvpCount || 0} Attending Community Members
              </span>

              <Badge variant="success" size="sm">Active Broadcast</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Circular Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Compose & Broadcast University Announcement"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Circular Headline</label>
            <input
              type="text"
              placeholder="e.g. Annual Grand Alumni Reunion 2026 Registration Open..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Alumni Event">CAMPUS EVENT</option>
                <option value="Job/Recruitment">CAREER & JOBS</option>
                <option value="Academic">ACADEMIC / EXAM</option>
                <option value="Convocation">CONVOCATION</option>
                <option value="Policy">POLICY DIRECTIVE</option>
                <option value="Urgent">URGENT</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="All">All (Students & Alumni)</option>
                <option value="Students">Current Students Only</option>
                <option value="Alumni">Graduated Alumni Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="w-4 h-4 accent-[#2E5E3E]"
              />
              <span className="font-semibold text-slate-700">Pin Notice to Top of University Feed</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Announcement Body</label>
            <textarea
              rows={5}
              placeholder="Full text of the university notice, RSVP guidelines, and contact point..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePublish}
              className="bg-[#2E5E3E] hover:bg-[#254d33] text-white"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Publish Announcement
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
