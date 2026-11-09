import React, { useState } from 'react';
import { useMentorshipStore } from '../../../hooks/useMentorshipStore';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  Users, Calendar, Clock, Star, FileText, CheckCircle2, XCircle, 
  Video, Award, MessageSquare, ChevronRight, Filter, AlertCircle 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { MockCallModal } from '../../../components/mentorship/MockCallModal';
import { CVReviewFeedbackModal } from '../../../components/mentorship/CVReviewFeedbackModal';
import { useToast } from '../../../components/ui/Toast';
import { MentorshipRequest, CVReviewItem } from '../../../types/mentorship';

export const AlumniMentorshipPage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { requests, cvReviews, acceptRequest, declineRequest } = useMentorshipStore();

  const [activeTab, setActiveTab] = useState<'requests' | 'scheduled' | 'cv-reviews' | 'completed' | 'stats'>('requests');
  const [activeCallSession, setActiveCallSession] = useState<MentorshipRequest | null>(null);
  const [activeReviewToGrade, setActiveReviewToGrade] = useState<CVReviewItem | null>(null);

  // Filter requests relevant to this mentor
  const mentorId = 'alm-1';
  const pendingRequests = requests.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && r.status === 'PENDING');
  const scheduledSessions = requests.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && (r.status === 'ACCEPTED' || r.status === 'IN_PROGRESS'));
  const completedSessions = requests.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && r.status === 'COMPLETED');
  const pendingReviews = cvReviews.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && r.status === 'In Review');
  const reviewedCVs = cvReviews.filter(r => (r.mentorId === mentorId || r.mentorId === 'alumni-1') && r.status === 'Reviewed');

  const handleAccept = (id: string, name: string) => {
    acceptRequest(id);
    showToast({
      title: 'Request Accepted',
      message: `You accepted ${name}'s mentorship consultation request.`,
      type: 'success'
    });
  };

  const handleDecline = (id: string, name: string) => {
    declineRequest(id, 'Time conflict with office schedule');
    showToast({
      title: 'Request Declined',
      message: `You declined ${name}'s mentorship request.`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2A4A] via-[#1E3A8A] to-[#2E5E3E] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">
                MENTOR CONSOLE
              </Badge>
              <span className="text-xs text-blue-200">BAUST Career Bridge Direct Advisory</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              {language === 'bn' ? 'অ্যালামনাই মেন্টর হাব' : 'Alumni Mentorship Console'}
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-2xl">
              Review incoming student booking requests, launch live video mock interview rooms with collaborative notes, and evaluate CVs using the 100-point ATS rubric.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="/alumni/mentorship/settings">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur"
              >
                Slot & Availability Settings
              </Button>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            Pending Requests ({pendingRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'scheduled'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Scheduled Calls ({scheduledSessions.length})
          </button>

          <button
            onClick={() => setActiveTab('cv-reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'cv-reviews'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            CV Reviews Queue ({pendingReviews.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Completed & Reviews ({completedSessions.length})
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            Mentor Impact Badges
          </button>
        </div>
      </div>

      {/* Tab 1: Incoming Booking Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F2A4A]">Awaiting Confirmation</h2>
            <span className="text-xs text-slate-500">Students expect confirmation within 48 hours</span>
          </div>

          {pendingRequests.length === 0 ? (
            <Card className="p-12 text-center text-slate-400">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-2 opacity-80" />
              <p className="text-base font-semibold text-slate-700">No Pending Requests</p>
              <p className="text-xs text-slate-400 mt-1">All incoming session booking requests have been answered.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map(req => (
                <Card key={req.id} className="p-5 flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.studentAvatar}
                          alt={req.studentName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{req.studentName}</h4>
                          <p className="text-xs text-slate-500">Department: <span className="font-medium text-slate-700">{req.studentDept}</span></p>
                        </div>
                      </div>
                      <Badge variant="warning" size="sm">PENDING</Badge>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 mb-4 border border-slate-100">
                      <div><strong className="text-slate-900">Requested Time:</strong> {req.scheduledTime || 'Next open slot'}</div>
                      <div><strong className="text-slate-900">Focus Topic:</strong> {req.topic}</div>
                      <div><strong className="text-slate-900">Student Goal:</strong> {req.goalOneLine}</div>
                      {req.message && (
                        <div className="pt-1.5 border-t border-slate-200/60 text-slate-600 italic">
                          "{req.message}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(req.id, req.studentName)}
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAccept(req.id, req.studentName)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Accept Consultation
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Scheduled Calls & Active Rooms */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F2A4A]">Confirmed Consultation Sessions</h2>
            <span className="text-xs text-slate-500">Video rooms activate 10 minutes prior to session time</span>
          </div>

          {scheduledSessions.length === 0 ? (
            <Card className="p-12 text-center text-slate-400">
              <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-base font-semibold text-slate-700">No Sessions Scheduled</p>
              <p className="text-xs text-slate-400 mt-1">Accept incoming student requests to schedule video consultations.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {scheduledSessions.map(session => (
                <Card key={session.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={session.studentAvatar}
                      alt={session.studentName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{session.studentName}</h4>
                        <Badge variant="primary" size="sm">{session.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        Focus: <span className="text-slate-800">{session.topic}</span>
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1 font-mono text-[#0F2A4A] font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          {session.scheduledTime || 'Upcoming Today'}
                        </span>
                        <span>•</span>
                        <span>BAUST WebRTC Video</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <Button
                      variant="primary"
                      onClick={() => setActiveCallSession(session)}
                      className="bg-[#2E5E3E] hover:bg-[#254d33] text-white"
                    >
                      <Video className="w-4 h-4 mr-1.5" />
                      Enter Mock Call Room
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: CV Review Queue */}
      {activeTab === 'cv-reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0F2A4A]">Student CV Evaluation Queue</h2>
              <p className="text-xs text-slate-500">Provide structured ATS scoring and section-by-section recommendations</p>
            </div>
            <Badge variant="warning">{pendingReviews.length} In Review</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingReviews.map(rev => (
              <Card key={rev.id} className="p-5 border-amber-200/70 bg-gradient-to-b from-amber-50/20 to-transparent">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{rev.studentName}</h4>
                    <p className="text-xs text-slate-500">Target Role: <strong className="text-slate-700">{rev.targetRole}</strong></p>
                    <span className="text-[11px] font-mono text-slate-400">File: {rev.fileName} ({rev.version})</span>
                  </div>
                  <Badge variant="neutral" size="sm">Awaiting Review</Badge>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 mb-4 border border-slate-100">
                  <div className="text-slate-500">Current Rubric Checklist:</div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-white px-2 py-0.5 rounded border text-[11px]">Format / ATS (20)</span>
                    <span className="bg-white px-2 py-0.5 rounded border text-[11px]">Projects (20)</span>
                    <span className="bg-white px-2 py-0.5 rounded border text-[11px]">Experience (20)</span>
                    <span className="bg-white px-2 py-0.5 rounded border text-[11px]">Skills (15)</span>
                    <span className="bg-white px-2 py-0.5 rounded border text-[11px]">Education (15)</span>
                    <span className="bg-white px-2 py-0.5 rounded border text-[11px]">Action Verbs (10)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Submitted: {rev.submittedAt}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveReviewToGrade(rev)}
                    className="bg-[#C9A227] hover:bg-[#B89220] text-slate-900 font-bold"
                  >
                    Grade & Score CV
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Past Reviewed CVs */}
          <div className="pt-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-3">Recently Evaluated CVs ({reviewedCVs.length})</h3>
            <div className="space-y-3">
              {reviewedCVs.map(rev => (
                <div key={rev.id} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{rev.studentName}</h5>
                    <p className="text-xs text-slate-500">{rev.targetRole} • Reviewed on {rev.reviewedAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Score</span>
                      <span className="font-bold text-emerald-600 text-sm">{rev.totalScore || 85} / 100</span>
                    </div>
                    <Badge variant="success" size="sm">Completed</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Completed Consultations & Mentee Reviews */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0F2A4A]">Completed Mentorship Sessions</h2>
          <div className="space-y-3">
            {completedSessions.map(session => (
              <Card key={session.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={session.studentAvatar}
                    alt={session.studentName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm">{session.studentName}</h4>
                      <Badge variant="success" size="sm">Completed</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{session.topic} • {session.scheduledTime || 'Concluded'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>5.0 Mentee Rating</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Mentor Badges & Impact */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border-t-4 border-t-[#C9A227]">
            <Award className="w-12 h-12 text-[#C9A227] mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg">Top Rated Mentor</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Maintained 4.9+ student satisfaction rating across 20+ live mock interviews.
            </p>
            <Badge variant="warning">Gold Tier Status</Badge>
          </Card>

          <Card className="p-6 text-center border-t-4 border-t-[#2E5E3E]">
            <Clock className="w-12 h-12 text-[#2E5E3E] mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg">Fast Responder</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Average response time under 12 hours for incoming student requests.
            </p>
            <Badge variant="success">98% Response Rate</Badge>
          </Card>

          <Card className="p-6 text-center border-t-4 border-t-[#0F2A4A]">
            <Users className="w-12 h-12 text-[#0F2A4A] mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg">Placement Champion</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              8 mentees successfully referred & placed into top software engineering roles.
            </p>
            <Badge variant="primary">Campus Hero</Badge>
          </Card>
        </div>
      )}

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
