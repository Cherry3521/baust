import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useDirectoryStore } from '../../hooks/useDirectoryStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { 
  Users, 
  Calendar, 
  FileCheck2, 
  Target, 
  ArrowRight, 
  Video, 
  MessageSquare, 
  Sparkles,
  BookOpen,
  Award,
  Clock,
  Briefcase
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { requests, cvReviews, goals, mentors } = useMentorshipStore();
  const { profiles } = useDirectoryStore();

  const activeSessions = requests.filter(r => r.status === 'ACCEPTED' || r.status === 'IN_PROGRESS');
  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const completedSessions = requests.filter(r => r.status === 'COMPLETED');
  const reviewedCVs = cvReviews.filter(c => c.status === 'Reviewed');

  // Top recommended mentors in same department or fields
  const recommendedMentors = profiles
    .filter(p => p.openToMentoring && p.department === user.department)
    .slice(0, 3);

  const activeGoal = goals[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0F2A4A] via-[#163B66] to-[#2E5E3E] text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              {user.department} Department
            </span>
            <span className="text-xs text-slate-300">• {user.batch}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Connect with 30+ verified BAUST alumni in Google, Grameenphone, BCS Cadre, and overseas universities to plan your career pathway.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to="/student/mentorship">
            <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Find a Mentor
            </Button>
          </Link>
          <Link to="/student/directory">
            <Button variant="outline" size="md" className="text-white border-white/40 hover:bg-white/10">
              Browse Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-navy">
            <Users className="w-6 h-6 text-[#0F2A4A]" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-navy">{profiles.length}</div>
            <div className="text-xs text-slate-500 font-medium">Verified Mentors</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800">
            <Calendar className="w-6 h-6 text-[#2E5E3E]" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#2E5E3E]">{activeSessions.length}</div>
            <div className="text-xs text-slate-500 font-medium">Active Sessions</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-900">
            <FileCheck2 className="w-6 h-6 text-[#C9A227]" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#C9A227]">{reviewedCVs.length}</div>
            <div className="text-xs text-slate-500 font-medium">CV Reviews Received</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-900">
            <Target className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-purple-900">{activeGoal ? `${activeGoal.progressPercent}%` : '0%'}</div>
            <div className="text-xs text-slate-500 font-medium">Goal Progress</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Upcoming Sessions & Recommended Mentors */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Mentorship Sessions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-lg text-navy">Upcoming Mentorship Sessions</h2>
                <p className="text-xs text-slate-500">Your scheduled 1-on-1 sessions with alumni</p>
              </div>
              <Link to="/student/mentorship" className="text-xs font-bold text-navy hover:underline">
                View All ({requests.length})
              </Link>
            </div>

            {activeSessions.length === 0 ? (
              <Card className="p-8 text-center text-slate-500 space-y-3">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs">No active sessions scheduled right now.</p>
                <Link to="/student/mentorship">
                  <Button variant="primary" size="sm">
                    Book a Mentorship Slot
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <Card key={session.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <Avatar name={session.mentorName} src={session.mentorAvatar} size="md" verified />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-slate-900">{session.mentorName}</h4>
                          <Badge variant="navy" size="sm">{session.topic}</Badge>
                          <Badge variant="inProgress" size="sm" dot>Starts in 2h 15m</Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {session.mentorDesignation} • {session.mentorCompany}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                          <span className="flex items-center gap-1 font-semibold text-emerald-800">
                            <Clock className="w-3.5 h-3.5" /> {session.scheduledTime}
                          </span>
                          <span>•</span>
                          <span className="font-medium">{session.mode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link to="/student/mentorship">
                        <Button variant="primary" size="sm" leftIcon={<Video className="w-3.5 h-3.5" />}>
                          Join Call
                        </Button>
                      </Link>
                      <Link to="/student/chat">
                        <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                          Chat
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Alumni For Your Major */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-lg text-navy">Recommended for Your Department ({user.department})</h2>
                <p className="text-xs text-slate-500">Based on your major, skills, and career interests</p>
              </div>
              <Link to="/student/directory" className="text-xs font-bold text-navy hover:underline">
                Explore All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedMentors.map((alum) => (
                <Card key={alum.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <Avatar name={alum.name} src={alum.avatar} size="md" verified={alum.verified} />
                      <Badge variant="navy" size="sm">{alum.sector}</Badge>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{alum.name}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">{alum.currentPosition}</p>
                    <p className="text-[11px] font-semibold text-navy line-clamp-1">{alum.currentCompany}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {alum.studentsConsulted}+ mentored
                    </span>
                    <Link to={`/student/directory/${alum.id}`}>
                      <Button variant="outline" size="sm" className="text-xs py-0.5 px-2">
                        View
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Mentorship Goal Tracker & Career Resources */}
        <div className="space-y-8">
          
          {/* Active Career Goal Tracker */}
          {activeGoal && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-[#C9A227] flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> Career Goal Tracker
                </span>
                <span className="font-bold text-sm text-navy">{activeGoal.progressPercent}%</span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{activeGoal.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Target: {activeGoal.targetDate} • {activeGoal.targetRole}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#2E5E3E] to-[#C9A227] h-full rounded-full transition-all duration-300"
                  style={{ width: `${activeGoal.progressPercent}%` }}
                />
              </div>

              {/* Milestones list */}
              <div className="space-y-2 pt-2">
                {activeGoal.milestones.map((m) => (
                  <div key={m.id} className="flex items-center gap-2 text-xs">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      m.completed ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {m.completed ? '✓' : '○'}
                    </span>
                    <span className={m.completed ? 'text-slate-500 line-through' : 'text-slate-800 font-medium'}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/student/mentorship" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Update Goal & Milestones
                </Button>
              </Link>
            </Card>
          )}

          {/* Quick Actions & Administrative Links */}
          <Card className="p-6 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Quick University Services
            </h4>
            <div className="space-y-2">
              <Link 
                to="/student/mentorship" 
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>Request 100-Point CV Review</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link 
                to="/student/directory" 
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>Search Alumni in Europe / USA</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link 
                to="/verify-document" 
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>Verify Official Transcript Code</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};
