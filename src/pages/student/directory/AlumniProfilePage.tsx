import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDirectoryStore } from '../../../hooks/useDirectoryStore';
import { useMentorshipStore } from '../../../hooks/useMentorshipStore';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useToast } from '../../../components/ui/Toast';
import { RequestMentorshipModal } from '../../../components/mentorship/RequestMentorshipModal';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Modal } from '../../../components/ui/Modal';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Star, 
  Heart, 
  MessageSquare, 
  Share2, 
  Flag, 
  CheckCircle2, 
  ExternalLink,
  Linkedin,
  Github,
  Globe,
  Printer,
  Sparkles,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const AlumniProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profiles, savedAlumniIds, toggleSaveAlumni, endorseSkill, reportProfile } = useDirectoryStore();
  const { mentors } = useMentorshipStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Suspicious information or claim');

  const alumni = profiles.find(p => p.id === id) || profiles[0];
  const mentor = mentors.find(m => m.alumniId === alumni.id || m.id === `men-${alumni.id}`) || mentors[0];
  const isSaved = savedAlumniIds.includes(alumni.id);

  // Privacy rule for CGPA
  const showCgpa = alumni.privacy.cgpaVisibility === 'Public' ||
    (alumni.privacy.cgpaVisibility === 'Students only' && user.role === 'student');

  // Similar alumni
  const similarAlumni = profiles
    .filter(p => p.id !== alumni.id && (p.sector === alumni.sector || p.department === alumni.department))
    .slice(0, 3);

  const handleEndorse = (skillName: string) => {
    const success = endorseSkill(alumni.id, skillName, user.id);
    if (success) {
      showToast(`Endorsed ${alumni.name} for "${skillName}"!`, 'success');
    } else {
      showToast('You have already endorsed this skill.', 'info');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Profile link copied to clipboard!', 'success');
  };

  const handleReport = () => {
    reportProfile(alumni.id, reportReason);
    showToast('Report submitted for administrative review.', 'info');
    setShowReportModal(false);
  };

  const TOPIC_COLORS = ['#0F2A4A', '#2E5E3E', '#C9A227', '#6366F1'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* HEADER HERO & BANNER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover image */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-[#0F2A4A] via-[#1E3A5F] to-[#2E5E3E]">
          {alumni.coverImage && (
            <img 
              src={alumni.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          )}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Profile
            </button>
            <button
              onClick={() => toggleSaveAlumni(alumni.id)}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors cursor-pointer"
              title="Bookmark Profile"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Profile Info Row overlapping banner */}
        <div className="px-6 sm:px-8 pb-6 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <Avatar
                name={alumni.name}
                src={alumni.avatar}
                size="2xl"
                verified={alumni.verified}
                className="ring-4 ring-white shadow-xl"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-navy">{alumni.name}</h1>
                  <Badge variant="navy" size="sm">{alumni.sector}</Badge>
                  {alumni.openToMentoring && (
                    <Badge variant="approved" size="sm" dot>Open to Mentoring</Badge>
                  )}
                  {alumni.hasHiringAuthority && (
                    <Badge variant="gold" size="sm">Hiring</Badge>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  {alumni.currentPosition} at <span className="text-navy font-bold">{alumni.currentCompany}</span>
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {alumni.location}
                  </span>
                  <span>•</span>
                  <span>{alumni.yearsOfExperience} Years Experience</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {alumni.studentsConsulted}+ Consultations
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link to={`/student/chat?alumniId=${alumni.id}`}>
                <Button variant="outline" size="md" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Message
                </Button>
              </Link>
              {alumni.openToMentoring && (
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={() => setShowRequestModal(true)}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#C9A227]" />}
                >
                  Request Mentorship
                </Button>
              )}
            </div>
          </div>

          {/* Social Links & Sub-meta */}
          <div className="pt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-4">
              {alumni.linkedIn && (
                <a href={alumni.linkedIn} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-navy font-medium">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
                </a>
              )}
              {alumni.github && (
                <a href={alumni.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-navy font-medium">
                  <Github className="w-3.5 h-3.5 text-slate-800" /> GitHub
                </a>
              )}
              <span className="text-slate-400">Profile Verified on {alumni.verifiedDate}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 hover:text-navy cursor-pointer font-medium"
              >
                <Printer className="w-3.5 h-3.5" /> Print Profile (PDF)
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center gap-1 hover:text-rose-600 cursor-pointer text-slate-400 font-medium"
              >
                <Flag className="w-3.5 h-3.5" /> Report Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLS: Academic Info, Bio, Experience, Education, Skills */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* BAUST Academic Credentials Card */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-xs uppercase tracking-wider text-navy flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#2E5E3E]" /> BAUST Academic Credentials
              </span>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                ID: {alumni.studentId ? alumni.studentId.slice(0, 5) + '***' : '15CSE***'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Department:</span>
                <span className="font-bold text-slate-900">{alumni.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Batch:</span>
                <span className="font-bold text-slate-900">{alumni.batch}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Passing Year:</span>
                <span className="font-bold text-slate-900">{alumni.passingYear}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Graduation CGPA:</span>
                <span className="font-extrabold text-navy">
                  {showCgpa ? `${alumni.cgpa.toFixed(2)} / 4.00` : 'Hidden by Alum'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block mb-0.5">Degree:</span>
                <span className="font-semibold text-slate-900">{alumni.degree}</span>
              </div>
            </div>

            {alumni.thesisTitle && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-800">Undergraduate Thesis / Capstone:</span>
                <p className="text-slate-600 italic font-serif">"{alumni.thesisTitle}"</p>
                {alumni.thesisSupervisor && (
                  <div className="text-[11px] text-slate-400">Supervisor: {alumni.thesisSupervisor}</div>
                )}
              </div>
            )}
          </Card>

          {/* About / Bio & Career Journey */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-navy">
              About & Career Journey
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {alumni.bio}
            </p>
            {alumni.careerStory && (
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs text-slate-700 space-y-1.5">
                <span className="font-bold text-[#2E5E3E] uppercase tracking-wider text-[11px] block">
                  Career Transition Story
                </span>
                <p className="leading-relaxed">{alumni.careerStory}</p>
              </div>
            )}
          </Card>

          {/* Full Work Experience Timeline */}
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-xs uppercase tracking-wider text-navy flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#0F2A4A]" /> Work Experience Timeline
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Total: {alumni.yearsOfExperience} Years
              </span>
            </div>

            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {alumni.workExperience.map((work) => (
                <div key={work.id} className="relative text-xs space-y-1">
                  <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#0F2A4A] ring-4 ring-white"></span>
                  <div className="flex items-center justify-between flex-wrap">
                    <h4 className="font-bold text-sm text-slate-900">{work.title}</h4>
                    <span className="text-slate-400 font-medium">{work.period}</span>
                  </div>
                  <div className="font-semibold text-navy">{work.organization} • {work.location} ({work.type})</div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{work.responsibilities}</p>
                  {work.achievements && (
                    <div className="text-emerald-700 font-medium mt-1">
                      ★ {work.achievements}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Education Timeline */}
          <Card className="p-6 space-y-5">
            <span className="font-bold text-xs uppercase tracking-wider text-navy flex items-center gap-1.5 pb-3 border-b border-slate-100">
              <GraduationCap className="w-4 h-4 text-[#2E5E3E]" /> Education
            </span>

            <div className="space-y-4 text-xs">
              {alumni.education.map((edu) => (
                <div key={edu.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                    <span className="text-slate-400">{edu.year}</span>
                  </div>
                  <div className="font-semibold text-navy">{edu.institution}, {edu.country}</div>
                  <div className="text-slate-500">Field: {edu.field}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills with Endorsements */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-bold text-xs uppercase tracking-wider text-navy">
                  Verified Skills & Peer Endorsements
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Students can endorse skills they have consulted on</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {alumni.skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    skill.isExpertise ? 'bg-amber-50/50 border-[#C9A227]/40 shadow-xs' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                      {skill.isExpertise && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#C9A227] text-white">
                          Expertise
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Level: <strong className="text-slate-700">{skill.level}</strong> • {skill.endorsements} endorsements
                    </div>
                  </div>

                  <button
                    onClick={() => handleEndorse(skill.name)}
                    className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-navy hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    + Endorse
                  </button>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* RIGHT COL: Sticky Mentoring Card, Impact Donut, Testimonials */}
        <div className="space-y-8">
          
          {/* Mentoring Impact Card */}
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-xs uppercase tracking-wider text-navy flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C9A227]" /> Mentoring Impact
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-900">
                <Star className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
                {alumni.averageRating.toFixed(1)} ({alumni.totalReviews} reviews)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <div className="text-xl font-extrabold text-[#2E5E3E]">{alumni.studentsConsulted}+</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Students Mentored</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <div className="text-xl font-extrabold text-navy">{alumni.sessionsCompleted}</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Sessions Held</div>
              </div>
            </div>

            {/* Top Topics Donut Chart */}
            {alumni.topTopicsHelped.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-600 block mb-2">
                  Top Topics Consulted
                </span>
                <div className="h-40 w-full relative">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={alumni.topTopicsHelped}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="topic"
                      >
                        {alumni.topTopicsHelped.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-[10px] text-slate-500">
                  {alumni.topTopicsHelped.map((t, idx) => (
                    <span key={t.topic} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TOPIC_COLORS[idx % TOPIC_COLORS.length] }}></span>
                      {t.topic} ({t.count})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Book CTA button */}
            {alumni.openToMentoring && (
              <Button
                variant="primary"
                size="md"
                className="w-full mt-4"
                onClick={() => setShowRequestModal(true)}
              >
                Book 1-on-1 Mentorship Slot
              </Button>
            )}
          </Card>

          {/* Student Testimonials */}
          {alumni.testimonials.length > 0 && (
            <Card className="p-6 space-y-4">
              <span className="font-bold text-xs uppercase tracking-wider text-navy block">
                Mentee Testimonials ({alumni.testimonials.length})
              </span>

              <div className="space-y-3">
                {alumni.testimonials.map((t) => (
                  <div key={t.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar name={t.studentName} src={t.avatar} size="sm" />
                        <div>
                          <div className="font-bold text-slate-900">{t.studentName}</div>
                          <div className="text-[10px] text-slate-400">{t.studentDept} • {t.studentBatch}</div>
                        </div>
                      </div>
                      <div className="flex text-[#C9A227]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">
                      "{t.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Similar Alumni */}
          {similarAlumni.length > 0 && (
            <Card className="p-6 space-y-4">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500 block">
                Similar Alumni You May Know
              </span>

              <div className="space-y-3">
                {similarAlumni.map((sim) => (
                  <Link 
                    key={sim.id} 
                    to={`/student/directory/${sim.id}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar name={sim.name} src={sim.avatar} size="sm" verified={sim.verified} />
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-navy line-clamp-1">{sim.name}</div>
                        <div className="text-[10px] text-slate-400">{sim.currentCompany}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-navy" />
                  </Link>
                ))}
              </div>
            </Card>
          )}

        </div>

      </div>

      {/* Request Mentorship Modal */}
      <RequestMentorshipModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        mentor={mentor}
      />

      {/* Fake Profile Report Modal */}
      <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)} title="Report Fake or Inappropriate Profile" maxWidth="md">
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            BAUST administration takes profile integrity seriously. If you suspect misleading credentials or imposter identity, please submit details for administrative inspection.
          </p>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reason for Report *
            </label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900"
            >
              <option>Suspicious information or claim</option>
              <option>Impersonation of another BAUSTian</option>
              <option>Inappropriate or commercial spam behavior</option>
              <option>Fake employment or education credentials</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowReportModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleReport}>
              Submit Report
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
