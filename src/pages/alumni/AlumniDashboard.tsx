import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  Users, Calendar, Clock, Star, FileText, CheckCircle, XCircle, 
  ArrowRight, Video, Sparkles, Building2, ShieldCheck, Sliders, AlertCircle 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MockCallModal } from '../../components/mentorship/MockCallModal';
import { CVReviewFeedbackModal } from '../../components/mentorship/CVReviewFeedbackModal';
import { useToast } from '../../components/ui/Toast';
import { MentorshipRequest, CVReviewItem } from '../../types/mentorship';

export const AlumniDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { requests, cvReviews, acceptRequest, declineRequest } = useMentorshipStore();
  const { serviceRequests } = useAdminDeskStore();

  const [activeCallSession, setActiveCallSession] = useState<MentorshipRequest | null>(null);
  const [activeReviewToGrade, setActiveReviewToGrade] = useState<CVReviewItem | null>(null);

  // Incoming requests for this mentor
  const mentorId = 'alm-1';
  const pendingRequests = requests.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && r.status === 'PENDING');
  const upcomingSessions = requests.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && (r.status === 'ACCEPTED' || r.status === 'IN_PROGRESS'));
  const pendingReviews = cvReviews.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && r.status === 'In Review');
  const myAdminRequests = serviceRequests.filter(r => r.alumniId === 'alm-1' || r.alumniId === 'alumni-1');

  const handleAcceptRequest = (id: string, menteeName: string) => {
    acceptRequest(id);
    showToast({
      title: 'Session Accepted',
      message: `Mentorship session with ${menteeName} is now confirmed.`,
      type: 'success'
    });
  };

  const handleDeclineRequest = (id: string, menteeName: string) => {
    declineRequest(id, 'Schedule conflict');
    showToast({
      title: 'Session Declined',
      message: `You declined the request from ${menteeName}.`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F2A4A] via-[#1E3A8A] to-[#2E5E3E] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"}
              alt={user?.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-[#C9A227] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-bold text-[#C9A227]">
                  {language === 'bn' ? 'অ্যালামনাই পোর্টাল' : 'BAUST Alumni Portal'}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3" /> Verified Alumnus
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">{user?.name}</h1>
              <p className="text-blue-100 text-sm mt-1">
                Principal Software Engineer @ Brain Station 23 • Class of 2019 (CSE)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/alumni/mentorship/settings">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur text-sm"
              >
                <Sliders className="w-4 h-4 mr-2 text-[#C9A227]" />
                Mentor Settings
              </Button>
            </Link>
            <Link to="/alumni/my-profile">
              <Button
                variant="primary"
                className="bg-[#C9A227] hover:bg-[#B89220] text-slate-900 font-bold border-none text-sm"
              >
                Edit Alumni Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex-1 w-full max-w-md">
            <div className="flex items-center justify-between mb-1.5 font-medium text-blue-200">
              <span>Alumni Profile Completeness</span>
              <span className="font-bold text-white">92%</span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#C9A227] to-emerald-400 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          <span className="text-blue-200">
            Tip: Adding your recent patent or project adds an extra +8% to reach 100%!
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-[#0F2A4A]">
          <div className="p-3 bg-blue-50 text-[#0F2A4A] rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Mentees</p>
            <p className="text-2xl font-black text-slate-800">14</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-[#C9A227]">
          <div className="p-3 bg-amber-50 text-[#C9A227] rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Pending Requests</p>
            <p className="text-2xl font-black text-slate-800">{pendingRequests.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-[#2E5E3E]">
          <div className="p-3 bg-emerald-50 text-[#2E5E3E] rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Sessions Held</p>
            <p className="text-2xl font-black text-slate-800">22</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-purple-600">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Mentor Rating</p>
            <p className="text-2xl font-black text-slate-800 flex items-center gap-1">
              4.9 <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Mentorship Action Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Mentorship Requests */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0F2A4A] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#C9A227]" />
                  Pending Mentorship Requests
                </h2>
                <p className="text-xs text-slate-500">Students awaiting your consultation slot confirmation</p>
              </div>
              <Badge variant="warning">{pendingRequests.length} Pending</Badge>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl text-slate-400 text-sm">
                No pending requests. You are all caught up!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map(req => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-[#0F2A4A]/30 transition"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.studentAvatar}
                          alt={req.studentName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{req.studentName}</h4>
                          <p className="text-xs text-slate-500">{req.topic} • {req.scheduledTime || 'Slot Requested'}</p>
                          <span className="inline-block mt-1 text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                            {req.mode}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeclineRequest(req.id, req.studentName)}
                          className="text-rose-600 border-rose-200 hover:bg-rose-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAcceptRequest(req.id, req.studentName)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept Slot
                        </Button>
                      </div>
                    </div>

                    {req.message && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic">
                        "{req.message}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Upcoming Confirmed Sessions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0F2A4A] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2E5E3E]" />
                Upcoming Consultations & Mock Rooms
              </h2>
              <Link to="/alumni/mentorship" className="text-xs text-[#0F2A4A] font-semibold hover:underline">
                View All
              </Link>
            </div>

            {upcomingSessions.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No upcoming sessions today.</p>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map(session => (
                  <div
                    key={session.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={session.studentAvatar}
                        alt={session.studentName}
                        className="w-11 h-11 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 text-sm">{session.studentName}</h4>
                          <Badge variant="primary" size="sm">{session.status}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {session.topic} • {session.scheduledTime || 'Scheduled for Today'}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveCallSession(session)}
                      className="bg-[#2E5E3E] hover:bg-[#254d33] text-white shrink-0"
                    >
                      <Video className="w-4 h-4 mr-1.5" />
                      Enter Mock Call Room
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* CV Reviews Waiting for Feedback */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0F2A4A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C9A227]" />
                Pending Student CV Reviews
              </h2>
              <Badge variant="warning">{pendingReviews.length} in queue</Badge>
            </div>

            <div className="space-y-3">
              {pendingReviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl border border-amber-200/70 bg-amber-50/30 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{rev.studentName}</h4>
                      <p className="text-xs text-slate-500">Target Role: {rev.targetRole} • {rev.version}</p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveReviewToGrade(rev)}
                    className="bg-[#C9A227] hover:bg-[#B89220] text-slate-900 font-bold"
                  >
                    Grade & Score CV
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Admin Desk & Quick Services */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0F2A4A]" />
              University Admin Desk
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Track your official requests with the BAUST Registrar, Controller of Exams, and Alumni Cell.
            </p>

            <div className="space-y-3 mb-4">
              {myAdminRequests.slice(0, 3).map(req => (
                <div key={req.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                    <span className="truncate">{req.serviceNames[0] || 'Official Document'}</span>
                    <Badge variant="primary" size="sm">{req.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">{req.id}</span>
                    <span>{req.deliveryMethod}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/alumni/admin-desk">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Open Alumni Admin Desk
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </Card>

          {/* Mentoring Guidelines */}
          <Card className="p-6 bg-slate-900 text-white">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-[#C9A227]">
              <Sparkles className="w-4 h-4" />
              BAUST Mentorship Code
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Your guidance empowers fellow BAUSTians entering competitive tech, engineering, and civil sectors. Provide actionable resume feedback and real-world interview prep.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Keep scheduled mock sessions punctually</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Score resumes using the 100-point ATS rubric</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mock Call Modal */}
      {activeCallSession && (
        <MockCallModal
          isOpen={!!activeCallSession}
          onClose={() => setActiveCallSession(null)}
          request={activeCallSession}
        />
      )}

      {/* CV Review Feedback Modal */}
      {activeReviewToGrade && (
        <CVReviewFeedbackModal
          isOpen={!!activeReviewToGrade}
          onClose={() => setActiveReviewToGrade(null)}
          reviewItem={activeReviewToGrade}
        />
      )}
    </div>
  );
};
