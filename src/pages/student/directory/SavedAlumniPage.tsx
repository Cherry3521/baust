import React from 'react';
import { useDirectoryStore } from '../../../hooks/useDirectoryStore';
import { AlumniCard } from '../../../components/directory/AlumniCard';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Users } from 'lucide-react';

export const SavedAlumniPage: React.FC = () => {
  const { profiles, savedAlumniIds } = useDirectoryStore();

  const savedAlumni = profiles.filter(p => savedAlumniIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Link to="/student/directory" className="text-xs font-semibold text-slate-500 hover:text-navy flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Alumni Directory
          </Link>
          <h1 className="text-2xl font-extrabold text-navy flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Saved Alumni & Mentors ({savedAlumni.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Profiles bookmarked for quick mentorship booking and referral inquiries.
          </p>
        </div>

        <Link to="/student/directory">
          <Button variant="outline" size="sm">
            Discover More Alumni
          </Button>
        </Link>
      </div>

      {savedAlumni.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Heart className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">No Saved Alumni Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any alumni card in the directory to bookmark them for future follow-up.
          </p>
          <Link to="/student/directory">
            <Button variant="primary" size="sm">
              Browse Directory
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedAlumni.map((alum) => (
            <AlumniCard key={alum.id} alumni={alum} viewMode="grid" />
          ))}
        </div>
      )}

    </div>
  );
};
