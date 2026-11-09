import React from 'react';
import { Link } from 'react-router-dom';
import { AlumniProfile } from '../../types/directory';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useDirectoryStore } from '../../hooks/useDirectoryStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { 
  Briefcase, 
  MapPin, 
  Heart, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Users
} from 'lucide-react';

interface AlumniCardProps {
  alumni: AlumniProfile;
  viewMode?: 'grid' | 'list';
}

export const AlumniCard: React.FC<AlumniCardProps> = ({ alumni, viewMode = 'grid' }) => {
  const { savedAlumniIds, toggleSaveAlumni, comparedAlumniIds, toggleCompareAlumni } = useDirectoryStore();
  const { user } = useAuthStore();

  const isSaved = savedAlumniIds.includes(alumni.id);
  const isCompared = comparedAlumniIds.includes(alumni.id);

  // Mock match % calculation based on student department & interests
  const calculateMatchScore = () => {
    let score = 70;
    if (user.department === alumni.department) score += 18;
    if (alumni.openToMentoring) score += 7;
    return Math.min(score, 98);
  };

  const matchScore = calculateMatchScore();
  const topExpertiseSkills = alumni.skills.filter(s => s.isExpertise).slice(0, 3);
  const displaySkills = topExpertiseSkills.length > 0 ? topExpertiseSkills : alumni.skills.slice(0, 3);

  // Privacy for CGPA
  const showCgpa = alumni.privacy.cgpaVisibility === 'Public' || 
    (alumni.privacy.cgpaVisibility === 'Students only' && user.role === 'student');

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar 
            name={alumni.name} 
            src={alumni.avatar} 
            size="lg" 
            verified={alumni.verified} 
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base text-slate-900 hover:text-navy">
                <Link to={`/student/directory/${alumni.id}`}>{alumni.name}</Link>
              </h3>
              <Badge variant="navy" size="sm">{alumni.sector}</Badge>
              {alumni.openToMentoring && (
                <Badge variant="approved" size="sm" dot>Open to Mentoring</Badge>
              )}
              {alumni.hasHiringAuthority && (
                <Badge variant="gold" size="sm">Hiring</Badge>
              )}
            </div>
            
            <p className="text-sm text-slate-600 mt-1 font-medium">
              {alumni.currentPosition} at <span className="text-navy font-semibold">{alumni.currentCompany}</span>
            </p>
            
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 flex-wrap">
              <span>{alumni.department} • {alumni.batch}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {alumni.location}
              </span>
              {showCgpa && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">CGPA: {alumni.cgpa.toFixed(2)}</span>
                </>
              )}
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Consulted {alumni.studentsConsulted}+ students
              </span>
            </div>

            {/* Skills */}
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              {displaySkills.map((s) => (
                <span
                  key={s.name}
                  className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={() => toggleCompareAlumni(alumni.id)}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
              isCompared 
                ? 'bg-blue-50 border-blue-400 text-blue-700' 
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Compare alumni"
          >
            {isCompared ? 'Comparing' : 'Compare'}
          </button>
          
          <button
            onClick={() => toggleSaveAlumni(alumni.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isSaved 
                ? 'bg-rose-50 border-rose-300 text-rose-600' 
                : 'border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Bookmarked' : 'Bookmark'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-500' : ''}`} />
          </button>

          <Link to={`/student/chat?alumniId=${alumni.id}`}>
            <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
              Message
            </Button>
          </Link>

          <Link to={`/student/directory/${alumni.id}`}>
            <Button variant="primary" size="sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Grid Mode Card
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Card Header & Banner */}
      <div>
        <div className="relative h-20 bg-gradient-to-r from-[#0F2A4A] to-[#1E3A5F] p-3 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-white/90 text-navy text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
              {alumni.sector}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#C9A227] text-white text-[10px] font-bold shadow-xs">
              {matchScore}% Match
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleCompareAlumni(alumni.id)}
              className={`p-1.5 rounded-lg text-xs font-semibold backdrop-blur-md cursor-pointer transition-colors ${
                isCompared 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title="Compare up to 3 alumni"
            >
              {isCompared ? '✓' : '+'}
            </button>
            <button
              onClick={() => toggleSaveAlumni(alumni.id)}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors cursor-pointer"
              title="Bookmark"
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Profile Avatar overlapping banner */}
        <div className="px-5 pt-0 pb-3 -mt-8 flex items-end justify-between">
          <Avatar
            name={alumni.name}
            src={alumni.avatar}
            size="lg"
            verified={alumni.verified}
            className="ring-4 ring-white shadow-md"
          />
          {alumni.openToMentoring && (
            <Badge variant="approved" size="sm" dot>
              Open to Mentoring
            </Badge>
          )}
        </div>

        {/* Body Info */}
        <div className="px-5 pt-1 pb-4">
          <h3 className="font-bold text-base text-slate-900 group-hover:text-navy line-clamp-1">
            <Link to={`/student/directory/${alumni.id}`}>{alumni.name}</Link>
          </h3>
          <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">
            {alumni.currentPosition}
          </p>
          <p className="text-xs font-semibold text-navy mt-0.5 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-[#2E5E3E]" />
            <span className="truncate">{alumni.currentCompany}</span>
          </p>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 pt-2.5 border-t border-slate-100">
            <span>{alumni.department} • {alumni.batch}</span>
            {showCgpa && (
              <span className="font-semibold text-slate-700">CGPA: {alumni.cgpa.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1 truncate max-w-[130px]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {alumni.location}
            </span>
            <span className="text-emerald-700 font-semibold">
              {alumni.studentsConsulted}+ consulted
            </span>
          </div>

          {/* Top 3 Expertise Skills */}
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {displaySkills.map((s) => (
              <span
                key={s.name}
                className="px-2 py-0.5 rounded-md bg-amber-50/80 text-amber-900 border border-amber-200/80 text-[11px] font-medium"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <Link to={`/student/directory/${alumni.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full text-xs">
            View Profile
          </Button>
        </Link>
        <Link to={`/student/chat?alumniId=${alumni.id}`}>
          <Button variant="outline" size="sm" className="px-2.5" title="Message on In-App Chat">
            <MessageSquare className="w-4 h-4 text-slate-600" />
          </Button>
        </Link>
      </div>

    </div>
  );
};
