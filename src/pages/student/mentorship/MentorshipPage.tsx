import React, { useState, useMemo } from 'react';
import { useMentorshipStore } from '../../../hooks/useMentorshipStore';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useToast } from '../../../components/ui/Toast';
import { Mentor, MentorshipRequest, MentorshipTopic, CVReviewItem } from '../../../types/mentorship';
import { RequestMentorshipModal } from '../../../components/mentorship/RequestMentorshipModal';
import { MockCallModal } from '../../../components/mentorship/MockCallModal';
import { RatingFeedbackModal } from '../../../components/mentorship/RatingFeedbackModal';
import { CVReviewRequestModal } from '../../../components/mentorship/CVReviewRequestModal';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare, 
  Star, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Upload, 
  Download, 
  Heart, 
  RefreshCw,
  Plus,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  List
} from 'lucide-react';

export const MentorshipPage: React.FC = () => {
  const { 
    mentors, 
    requests, 
    cvReviews, 
    cancelRequest, 
    editPendingMessage,
    toggleMentorActionItem,
    sendCVReviewThanks
  } = useMentorshipStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'find' | 'requests' | 'active' | 'completed' | 'rejected' | 'cvReview'>('find');

  // Find Mentor Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [availableNowOnly, setAvailableNowOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'sessions'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<Mentor | null>(null);
  const [activeCallSession, setActiveCallSession] = useState<MentorshipRequest | null>(null);
  const [activeRatingSession, setActiveRatingSession] = useState<MentorshipRequest | null>(null);
  const [showCVModal, setShowCVModal] = useState(false);
  const [selectedCVForDetail, setSelectedCVForDetail] = useState<CVReviewItem | null>(null);

  // Edit message in pending state
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);
  const [editMsgText, setEditMsgText] = useState('');

  // Slices
  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const activeSessions = requests.filter(r => r.status === 'ACCEPTED' || r.status === 'IN_PROGRESS');
  const completedSessions = requests.filter(r => r.status === 'COMPLETED');
  const rejectedRequests = requests.filter(r => r.status === 'REJECTED');

  const sectorChips = ['Government', 'Private', 'Abroad', 'Higher Study', 'Research', 'Business', 'Freelancing'];

  const toggleSector = (sec: string) => {
    setSelectedSectors(prev => prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]);
  };

  // Filtered Mentors
  const filteredMentors = useMemo(() => {
    return mentors.filter(m => {
      if (!m.mentoringActive) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesComp = m.company.toLowerCase().includes(q);
        const matchesDesig = m.designation.toLowerCase().includes(q);
        const matchesSkill = m.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesComp && !matchesDesig && !matchesSkill) return false;
      }
      if (selectedSectors.length > 0 && !selectedSectors.includes(m.sector)) {
        return false;
      }
      if (selectedTopic !== 'all' && !m.topicsOffered.includes(selectedTopic as any)) {
        return false;
      }
      if (availableNowOnly && !m.isAvailableNow) {
        return false;
      }
      if (m.rating < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'sessions') return b.sessionsCompleted - a.sessionsCompleted;
      // Mock match score
      const matchA = (a.department === user.department ? 20 : 0) + a.rating * 5;
      const matchB = (b.department === user.department ? 20 : 0) + b.rating * 5;
      return matchB - matchA;
    });
  }, [mentors, searchQuery, selectedSectors, selectedTopic, availableNowOnly, minRating, sortBy, user.department]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TOP SUMMARY STRIP */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
              Student Career Mentorship Hub
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy">
              Mentorship & CV Review Center
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowCVModal(true)}
            >
              Request CV Review
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-navy">{mentors.length}</div>
            <div className="text-xs text-slate-500 font-medium">Available Mentors</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-emerald-700">{activeSessions.length}</div>
            <div className="text-xs text-slate-500 font-medium">Active / Accepted Sessions</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-[#0F2A4A]">{completedSessions.length}</div>
            <div className="text-xs text-slate-500 font-medium">Completed Sessions</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-[#C9A227]">{cvReviews.length}</div>
            <div className="text-xs text-slate-500 font-medium">CV Reviews Received</div>
          </div>
        </div>
      </div>

      {/* 6 MAIN TABS WITH BADGES */}
      <div className="flex items-center border-b border-slate-200 overflow-x-auto gap-2 text-xs font-bold">
        {[
          { id: 'find', label: 'Find Mentor', count: mentors.length },
          { id: 'requests', label: 'My Requests (Pending)', count: pendingRequests.length },
          { id: 'active', label: 'Active Sessions', count: activeSessions.length },
          { id: 'completed', label: 'Completed', count: completedSessions.length },
          { id: 'rejected', label: 'Rejected', count: rejectedRequests.length },
          { id: 'cvReview', label: 'CV Review Hub', count: cvReviews.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSelectedCVForDetail(null);
            }}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#0F2A4A] text-navy font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.id ? 'bg-[#0F2A4A] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: FIND MENTOR */}
      {activeTab === 'find' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 space-y-4 shadow-xs">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search mentor by name, company, designation, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 rounded-2xl border border-slate-200 pl-12 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]/20"
              />
            </div>

            {/* Sector chips */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
              <span className="text-slate-400 font-semibold shrink-0">Sectors:</span>
              {sectorChips.map(sec => {
                const active = selectedSectors.includes(sec);
                return (
                  <button
                    key={sec}
                    onClick={() => toggleSector(sec)}
                    className={`px-3 py-1.5 rounded-xl border shrink-0 transition-colors cursor-pointer font-medium ${
                      active ? 'bg-[#0F2A4A] text-white border-[#0F2A4A]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {sec}
                  </button>
                );
              })}
              {selectedSectors.length > 0 && (
                <button
                  onClick={() => setSelectedSectors([])}
                  className="text-xs text-rose-600 hover:underline shrink-0 ml-1"
                >
                  Clear sectors
                </button>
              )}
            </div>

            {/* Extra Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Topic:</span>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="rounded-lg border border-slate-200 p-1 bg-white font-medium text-slate-800"
                  >
                    <option value="all">All Topics</option>
                    <option value="CV Review">CV Review</option>
                    <option value="Interview Prep">Interview Prep</option>
                    <option value="Higher Studies">Higher Studies</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Project/Thesis Help">Project/Thesis Help</option>
                  </select>
                </div>

                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={availableNowOnly}
                    onChange={() => setAvailableNowOnly(!availableNowOnly)}
                    className="rounded text-emerald-600"
                  />
                  <span>Available Now</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-200 p-1 bg-white font-semibold text-slate-800"
                  >
                    <option value="match">Best Match</option>
                    <option value="rating">Highest Rated</option>
                    <option value="sessions">Most Sessions</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-xs text-navy' : 'text-slate-400'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-xs text-navy' : 'text-slate-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid / List */}
          <div className="text-xs text-slate-500 font-medium">
            Found <strong className="text-navy">{filteredMentors.length}</strong> mentors ready for booking
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredMentors.map((m) => {
              // Check if pending or active request already exists for this mentor
              const existingRequest = requests.find(r => r.mentorId === m.id && (r.status === 'PENDING' || r.status === 'ACCEPTED'));

              return (
                <Card key={m.id} className="p-5 flex flex-col justify-between hover:shadow-lg transition-all space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <Avatar name={m.name} src={m.avatar} size="lg" verified={m.verified} />
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="navy" size="sm">{m.sector}</Badge>
                        <span className="px-2 py-0.5 rounded-full bg-[#C9A227] text-white text-[10px] font-bold">
                          92% Match
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h3 className="font-bold text-base text-slate-900 line-clamp-1">{m.name}</h3>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{m.designation}</p>
                      <p className="text-xs font-semibold text-navy mt-0.5">{m.company}</p>
                      {m.abroadInfo && (
                        <div className="text-[11px] text-purple-700 font-medium mt-1 line-clamp-1">
                          🎓 {m.abroadInfo}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                      <span>{m.department} • {m.batch}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-900">
                        <Star className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                        {m.rating.toFixed(1)} ({m.ratingCount})
                      </span>
                    </div>

                    {/* Topics Offered */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {m.topicsOffered.slice(0, 3).map(top => (
                        <span key={top} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                          {top}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link to={`/student/directory/${m.alumniId}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Profile
                      </Button>
                    </Link>

                    {existingRequest ? (
                      <Badge variant={existingRequest.status === 'ACCEPTED' ? 'approved' : 'pending'} size="md">
                        {existingRequest.status}
                      </Badge>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => setSelectedMentorForBooking(m)}
                      >
                        Request Mentorship
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MY REQUESTS (PENDING) */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
              Pending Requests ({pendingRequests.length})
            </h3>
            <span className="text-xs text-slate-400">
              Mentors usually accept or suggest alternate slots within 24 hours
            </span>
          </div>

          {pendingRequests.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 space-y-3">
              <Clock className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800">No Pending Mentorship Requests</h4>
              <p className="text-xs text-slate-500">
                You do not have any requests awaiting mentor confirmation.
              </p>
              <Button variant="primary" size="sm" onClick={() => setActiveTab('find')}>
                Find a Mentor Now
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <Card key={req.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <Avatar name={req.mentorName} src={req.mentorAvatar} size="lg" verified />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-base text-slate-900">{req.mentorName}</h4>
                          <Badge variant="navy" size="sm">{req.topic}</Badge>
                          <Badge variant="pending" size="sm" dot>Pending Mentor Action</Badge>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {req.mentorDesignation} • {req.mentorCompany}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                          <span className="font-semibold text-emerald-800 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Slot: {req.scheduledTime}
                          </span>
                          <span>•</span>
                          <span>Mode: {req.mode}</span>
                          <span>•</span>
                          <span>Submitted on: {new Date(req.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingRequestId(req.id);
                          setEditMsgText(req.message);
                        }}
                      >
                        Edit Message
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => cancelRequest(req.id)}
                      >
                        Cancel Request
                      </Button>
                    </div>
                  </div>

                  {/* Goal and Message */}
                  <div className="text-xs space-y-2">
                    <div className="font-semibold text-slate-800">
                      Goal: <span className="italic font-normal text-slate-600">"{req.goalOneLine}"</span>
                    </div>
                    {editingRequestId === req.id ? (
                      <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <textarea
                          rows={3}
                          value={editMsgText}
                          onChange={(e) => setEditMsgText(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingRequestId(null)}>
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              editPendingMessage(req.id, editMsgText);
                              setEditingRequestId(null);
                              showToast('Message updated.', 'success');
                            }}
                          >
                            Save Update
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                        "{req.message}"
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ACTIVE SESSIONS */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
              Active & Accepted Sessions ({activeSessions.length})
            </h3>
            <span className="text-xs text-slate-400">
              Click "Join Call" at your scheduled time or exchange initial questions via Chat
            </span>
          </div>

          {activeSessions.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800">No Active Sessions Right Now</h4>
              <p className="text-xs text-slate-500">
                When a mentor accepts your request, it will appear here with call links and action items.
              </p>
              <Button variant="primary" size="sm" onClick={() => setActiveTab('find')}>
                Find a Mentor
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {activeSessions.map((session) => (
                <Card key={session.id} className="p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <Avatar name={session.mentorName} src={session.mentorAvatar} size="lg" verified />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-base text-slate-900">{session.mentorName}</h4>
                          <Badge variant="navy" size="sm">{session.topic}</Badge>
                          <Badge variant="approved" size="sm" dot>Confirmed by Mentor</Badge>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {session.mentorDesignation} at <strong className="text-navy">{session.mentorCompany}</strong>
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 flex-wrap">
                          <span className="font-bold text-emerald-800 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {session.scheduledTime}
                          </span>
                          <span>•</span>
                          <span>Mode: {session.mode}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-wrap self-end sm:self-start">
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Video className="w-4 h-4 text-emerald-300" />}
                        onClick={() => setActiveCallSession(session)}
                      >
                        Join Call Room
                      </Button>
                      <Link to={`/student/chat?alumniId=${session.mentorId.replace('men-', '')}`}>
                        <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>
                          Open Chat
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setActiveRatingSession(session)}
                      >
                        Mark as Done
                      </Button>
                    </div>
                  </div>

                  {/* Shared Notes & Assigned Tasks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="font-bold text-navy flex items-center justify-between">
                        <span>Shared Student Notes</span>
                        <span className="text-[10px] text-slate-400">Live persistence</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed italic">
                        {session.sessionNotesStudent || 'No notes taken yet. Use the notes panel inside the call to write key takeaways!'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>Mentor Action Items</span>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          {session.mentorActionItems?.filter(a => a.completed).length || 0}/
                          {session.mentorActionItems?.length || 0} Complete
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {session.mentorActionItems?.map(item => (
                          <label key={item.id} className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleMentorActionItem(session.id, item.id)}
                              className="mt-0.5 rounded text-emerald-600"
                            />
                            <span className={item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}>
                              {item.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: COMPLETED SESSIONS */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
              Completed Mentorship Archive ({completedSessions.length})
            </h3>
            <span className="text-xs text-slate-400">
              Access past session notes and ratings
            </span>
          </div>

          {completedSessions.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800">No Completed Sessions Yet</h4>
              <p className="text-xs text-slate-500">
                When you mark an active session as done and submit a rating, it moves into this archive.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <Card key={session.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <Avatar name={session.mentorName} src={session.mentorAvatar} size="lg" verified />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-base text-slate-900">{session.mentorName}</h4>
                          <Badge variant="navy" size="sm">{session.topic}</Badge>
                          <Badge variant="completed" size="sm">COMPLETED</Badge>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {session.mentorDesignation} • {session.mentorCompany}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                          <span>{session.scheduledTime}</span>
                          <span>•</span>
                          <span>Duration: {session.durationMinutes || 45} mins</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-bold text-amber-900">
                            {[...Array(session.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => showToast('Session summary PDF downloaded.', 'info')}
                      >
                        Download Summary (PDF)
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const m = mentors.find(x => x.id === session.mentorId);
                          if (m) setSelectedMentorForBooking(m);
                        }}
                      >
                        Book Follow-up
                      </Button>
                    </div>
                  </div>

                  {/* Review feedback text */}
                  {session.reviewText && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <div className="font-bold text-navy mb-1">Your Feedback & Review:</div>
                      <p className="italic">"{session.reviewText}"</p>
                    </div>
                  )}

                  {/* Action items checkbox list */}
                  {session.mentorActionItems && session.mentorActionItems.length > 0 && (
                    <div className="text-xs space-y-1.5">
                      <span className="font-bold text-slate-800">Assigned Action Items:</span>
                      {session.mentorActionItems.map(item => (
                        <div key={item.id} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 className={`w-4 h-4 ${item.completed ? 'text-emerald-600' : 'text-slate-300'}`} />
                          <span className={item.completed ? 'line-through text-slate-400' : ''}>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: REJECTED REQUESTS */}
      {activeTab === 'rejected' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
              Declined Requests ({rejectedRequests.length})
            </h3>
            <span className="text-xs text-slate-400">
              Mentors occasionally decline due to schedule conflicts or business travel
            </span>
          </div>

          {rejectedRequests.length === 0 ? (
            <Card className="p-12 text-center text-slate-500">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs">No rejected requests. All your requests are in good standing.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {rejectedRequests.map((req) => {
                const similarMentors = mentors
                  .filter(m => m.id !== req.mentorId && (m.sector === req.mentorDept || m.department === req.mentorDept))
                  .slice(0, 3);

                return (
                  <Card key={req.id} className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                      <div className="flex items-start gap-4">
                        <Avatar name={req.mentorName} src={req.mentorAvatar} size="lg" verified />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-base text-slate-900">{req.mentorName}</h4>
                            <Badge variant="navy" size="sm">{req.topic}</Badge>
                            <Badge variant="rejected" size="sm">DECLINED</Badge>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {req.mentorDesignation} • {req.mentorCompany}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const m = mentors.find(x => x.id === req.mentorId);
                          if (m) setSelectedMentorForBooking(m);
                        }}
                      >
                        Request Again Later
                      </Button>
                    </div>

                    {/* Reason */}
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1 text-rose-900">
                      <div className="font-bold">Mentor's Reason: {req.rejectionReason}</div>
                      {req.rejectionNote && <p className="text-[11px] leading-relaxed">"{req.rejectionNote}"</p>}
                    </div>

                    {/* Similar Mentors You May Like */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-700 block mb-2">
                        Suggested Similar Mentors in Same Domain:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {similarMentors.map(sim => (
                          <div key={sim.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar name={sim.name} src={sim.avatar} size="sm" />
                              <div className="text-xs font-bold text-slate-900 line-clamp-1">{sim.name}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[10px] py-0.5 px-2"
                              onClick={() => setSelectedMentorForBooking(sim)}
                            >
                              Request
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: CV REVIEW HUB */}
      {activeTab === 'cvReview' && (
        <div className="space-y-6">
          
          {/* Header Action */}
          <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200">
            <div>
              <h3 className="font-extrabold text-base text-navy">
                100-Point ATS CV Review & Version Tracker
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload multiple resume iterations (v1, v2) and receive 6-category breakdowns with score comparisons.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowCVModal(true)}
            >
              Submit New CV Version
            </Button>
          </div>

          {/* List of CV Reviews or Selected Review Detail */}
          {selectedCVForDetail ? (
            /* REVIEW DETAIL VIEW */
            <div className="space-y-6">
              <button
                onClick={() => setSelectedCVForDetail(null)}
                className="text-xs font-bold text-navy hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to All Reviews
              </button>

              <Card className="p-6 space-y-6">
                
                {/* Header score banner */}
                <div className="p-6 bg-gradient-to-r from-[#0F2A4A] via-[#163B66] to-[#2E5E3E] text-white rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#C9A227] text-white font-bold text-xs uppercase">
                        {selectedCVForDetail.version}
                      </span>
                      <span className="text-xs text-slate-300">• {selectedCVForDetail.targetRole}</span>
                    </div>
                    <h2 className="text-2xl font-extrabold mt-1">Overall ATS Score: {selectedCVForDetail.totalScore || 90}/100</h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Evaluated by <strong>{selectedCVForDetail.mentorName}</strong> ({selectedCVForDetail.mentorCompany})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 text-white border-white/30"
                      onClick={() => sendCVReviewThanks(selectedCVForDetail.id)}
                    >
                      {selectedCVForDetail.thankYouSent ? '✓ Thanks Sent' : 'Say Thanks ❤️'}
                    </Button>
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => setShowCVModal(true)}
                    >
                      Re-submit Improved v3
                    </Button>
                  </div>
                </div>

                {/* 6 Category Progress Bars */}
                {selectedCVForDetail.categoryScores && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      Category Breakdown (ATS Criteria)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(selectedCVForDetail.categoryScores).map(([key, val]) => (
                        <div key={key} className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1.5 capitalize">
                            <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-navy font-bold">{val}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0F2A4A] h-full rounded-full transition-all duration-300"
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths & Areas to Improve */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                    <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] block">
                      ✓ Key Strengths
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {selectedCVForDetail.strengths?.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span> {str}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-xs">
                    <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] block">
                      ▲ Areas to Improve
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {selectedCVForDetail.areasToImprove?.map((area, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span> {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mentor's Overall Message */}
                {selectedCVForDetail.overallMessage && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 space-y-1">
                    <div className="font-bold text-navy">Mentor's Summary Remark:</div>
                    <p className="italic leading-relaxed">"{selectedCVForDetail.overallMessage}"</p>
                  </div>
                )}

              </Card>
            </div>
          ) : (
            /* LIST OF CV REVIEWS */
            <div className="space-y-4">
              {cvReviews.map((item) => (
                <Card key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 font-extrabold flex items-center justify-center shrink-0 border border-red-200">
                      PDF
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-slate-900">{item.fileName}</h4>
                        <Badge variant="navy" size="sm">{item.version}</Badge>
                        <Badge variant={item.status === 'Reviewed' ? 'approved' : 'pending'} size="sm">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Target Role: <strong>{item.targetRole}</strong> • Reviewer: {item.mentorName}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                        <span>Submitted: {new Date(item.submittedAt).toLocaleDateString()}</span>
                        {item.totalScore && (
                          <>
                            <span>•</span>
                            <span className="font-bold text-navy">Score: {item.totalScore}/100</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {item.status === 'Reviewed' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedCVForDetail(item)}
                      >
                        View Full Score Report
                      </Button>
                    ) : (
                      <Badge variant="pending" size="md">
                        {item.status}
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>
      )}

      {/* REQUEST MENTORSHIP MODAL */}
      {selectedMentorForBooking && (
        <RequestMentorshipModal
          isOpen={!!selectedMentorForBooking}
          onClose={() => setSelectedMentorForBooking(null)}
          mentor={selectedMentorForBooking}
        />
      )}

      {/* MOCK CALL MODAL */}
      {activeCallSession && (
        <MockCallModal
          isOpen={!!activeCallSession}
          onClose={() => setActiveCallSession(null)}
          request={activeCallSession}
          onMarkComplete={() => setActiveRatingSession(activeCallSession)}
        />
      )}

      {/* RATING & FEEDBACK MODAL */}
      {activeRatingSession && (
        <RatingFeedbackModal
          isOpen={!!activeRatingSession}
          onClose={() => setActiveRatingSession(null)}
          request={activeRatingSession}
        />
      )}

      {/* CV REVIEW REQUEST MODAL */}
      <CVReviewRequestModal
        isOpen={showCVModal}
        onClose={() => setShowCVModal(false)}
        versionName={`v${cvReviews.length + 1}`}
      />

    </div>
  );
};
