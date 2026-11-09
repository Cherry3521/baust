import React from 'react';
import { Modal } from '../ui/Modal';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useDirectoryStore } from '../../hooks/useDirectoryStore';
import { Link } from 'react-router-dom';
import { Check, X, Users, Star, Award, Briefcase } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  const { profiles, comparedAlumniIds, toggleCompareAlumni, clearComparedAlumni } = useDirectoryStore();

  const comparedAlumni = profiles.filter(p => comparedAlumniIds.includes(p.id));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compare BAUST Alumni & Mentors" maxWidth="4xl">
      {comparedAlumni.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <p className="text-sm">No alumni selected for comparison yet.</p>
          <p className="text-xs text-slate-400 mt-1">
            Click the "+" icon on up to 3 alumni cards in the directory to compare them side-by-side.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-500">
              Comparing {comparedAlumni.length} of max 3 profiles
            </span>
            <button
              onClick={clearComparedAlumni}
              className="text-xs text-rose-600 hover:underline cursor-pointer"
            >
              Clear Comparison
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-4 gap-4 min-w-[650px] divide-x divide-slate-100">
              
              {/* Feature column */}
              <div className="space-y-6 pt-16 text-xs font-semibold text-slate-500">
                <div className="h-10 flex items-center">Sector & Role</div>
                <div className="h-10 flex items-center">Department & Batch</div>
                <div className="h-10 flex items-center">Experience</div>
                <div className="h-10 flex items-center">CGPA</div>
                <div className="h-10 flex items-center">Students Consulted</div>
                <div className="h-10 flex items-center">Mentoring & Rating</div>
                <div className="h-16 flex items-center">Top Skills</div>
                <div className="h-10 flex items-center">Action</div>
              </div>

              {/* Alumni Columns */}
              {comparedAlumni.map(alumni => (
                <div key={alumni.id} className="px-3 text-center space-y-6">
                  {/* Header info */}
                  <div className="flex flex-col items-center">
                    <Avatar 
                      name={alumni.name} 
                      src={alumni.avatar} 
                      size="lg" 
                      verified={alumni.verified} 
                    />
                    <div className="font-bold text-sm text-slate-900 mt-2 line-clamp-1">
                      {alumni.name}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      {alumni.currentCompany}
                    </div>
                  </div>

                  {/* Sector & Role */}
                  <div className="h-10 flex flex-col justify-center items-center">
                    <Badge variant="navy" size="sm">{alumni.sector}</Badge>
                    <span className="text-[11px] text-slate-600 truncate max-w-[130px]">
                      {alumni.currentPosition}
                    </span>
                  </div>

                  {/* Dept & Batch */}
                  <div className="h-10 flex items-center justify-center text-xs text-slate-700 font-medium">
                    {alumni.department} ({alumni.batch.split(' ')[0]})
                  </div>

                  {/* Experience */}
                  <div className="h-10 flex items-center justify-center text-xs text-slate-700 font-medium">
                    {alumni.yearsOfExperience} Years
                  </div>

                  {/* CGPA */}
                  <div className="h-10 flex items-center justify-center text-xs font-bold text-navy">
                    {alumni.privacy.cgpaVisibility !== 'Hidden' ? alumni.cgpa.toFixed(2) : 'Hidden'}
                  </div>

                  {/* Students Consulted */}
                  <div className="h-10 flex items-center justify-center text-xs font-semibold text-emerald-700">
                    {alumni.studentsConsulted}+ students
                  </div>

                  {/* Rating */}
                  <div className="h-10 flex items-center justify-center gap-1 text-xs font-bold text-amber-900">
                    <Star className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                    {alumni.averageRating.toFixed(1)} ({alumni.totalReviews})
                  </div>

                  {/* Top Skills */}
                  <div className="h-16 flex flex-wrap gap-1 items-center justify-center">
                    {alumni.skills.slice(0, 3).map(s => (
                      <span key={s.name} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 font-medium">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="h-10 flex items-center justify-center">
                    <Link to={`/student/directory/${alumni.id}`} onClick={onClose}>
                      <Button variant="primary" size="sm" className="text-xs">
                        View Profile
                      </Button>
                    </Link>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
