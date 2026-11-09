import React, { useState, useMemo } from 'react';
import { useDirectoryStore } from '../../../hooks/useDirectoryStore';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { JobSector, AlumniProfile } from '../../../types/directory';
import { AlumniCard } from '../../../components/directory/AlumniCard';
import { CompareModal } from '../../../components/directory/CompareModal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  LayoutGrid, 
  List, 
  Table as TableIcon, 
  Heart, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  MapPin, 
  Award,
  Users
} from 'lucide-react';

export const DirectoryPage: React.FC = () => {
  const { profiles, savedAlumniIds, comparedAlumniIds } = useDirectoryStore();
  const { user } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<JobSector[]>([]);
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minCgpa, setMinCgpa] = useState<number>(2.5);
  const [minConsulted, setMinConsulted] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [openMentoringOnly, setOpenMentoringOnly] = useState(false);
  const [hiringOnly, setHiringOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'consulted' | 'cgpa' | 'newest' | 'name'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Sector list
  const allSectors: JobSector[] = [
    'Government',
    'Private',
    'Multinational',
    'Abroad',
    'Higher Study',
    'Research',
    'Business',
    'Freelancing'
  ];

  // Grouped skills
  const skillCategories = [
    'AI & Machine Learning',
    'Data Science',
    'Web Development',
    'Mobile App Development',
    'Cybersecurity',
    'Networking & Cloud',
    'Embedded Systems/IoT',
    'Power & Energy',
    'Civil/Structural',
    'Textile Engineering',
    'Business & Marketing',
    'Research & Academic Writing',
    'Competitive Exams (BCS, Bank)',
    'IELTS/GRE/Scholarship Prep'
  ];

  const popularSearches = ['Data Scientist', 'BCS Cadre', 'Machine Learning', 'TU Berlin', 'Samsung R&D', 'Grameenphone'];

  // Toggle helpers
  const toggleSector = (sec: JobSector) => {
    setSelectedSectors(prev => prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]);
  };
  const toggleDept = (dept: string) => {
    setSelectedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]);
  };
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSectors([]);
    setSelectedDepts([]);
    setSelectedSkills([]);
    setMinCgpa(2.5);
    setMinConsulted(0);
    setVerifiedOnly(false);
    setOpenMentoringOnly(false);
    setHiringOnly(false);
  };

  // Filter & Sort Logic
  const filteredAlumni = useMemo(() => {
    return profiles.filter((alumni) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = alumni.name.toLowerCase().includes(q);
        const matchesPos = alumni.currentPosition.toLowerCase().includes(q);
        const matchesComp = alumni.currentCompany.toLowerCase().includes(q);
        const matchesSector = alumni.sector.toLowerCase().includes(q);
        const matchesDept = alumni.department.toLowerCase().includes(q);
        const matchesSkill = alumni.skills.some(s => s.name.toLowerCase().includes(q));
        const matchesField = alumni.interestedFields.some(f => f.toLowerCase().includes(q));
        if (!matchesName && !matchesPos && !matchesComp && !matchesSector && !matchesDept && !matchesSkill && !matchesField) {
          return false;
        }
      }

      // Sector filter
      if (selectedSectors.length > 0 && !selectedSectors.includes(alumni.sector)) {
        return false;
      }

      // Dept filter
      if (selectedDepts.length > 0 && !selectedDepts.includes(alumni.department)) {
        return false;
      }

      // Skill filter
      if (selectedSkills.length > 0 && !selectedSkills.some(reqSkill => alumni.skills.some(s => s.name === reqSkill))) {
        return false;
      }

      // CGPA
      if (minCgpa > 2.5 && alumni.cgpa < minCgpa) {
        return false;
      }

      // Consulted
      if (minConsulted > 0 && alumni.studentsConsulted < minConsulted) {
        return false;
      }

      // Toggles
      if (verifiedOnly && !alumni.verified) return false;
      if (openMentoringOnly && !alumni.openToMentoring) return false;
      if (hiringOnly && !alumni.hasHiringAuthority) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'consulted') return b.studentsConsulted - a.studentsConsulted;
      if (sortBy === 'cgpa') return b.cgpa - a.cgpa;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return parseInt(b.passingYear) - parseInt(a.passingYear);
      // Best match (department matches student + openToMentoring)
      const scoreA = (a.department === user.department ? 20 : 0) + (a.openToMentoring ? 10 : 0) + a.averageRating * 5;
      const scoreB = (b.department === user.department ? 20 : 0) + (b.openToMentoring ? 10 : 0) + b.averageRating * 5;
      return scoreB - scoreA;
    });
  }, [
    profiles, 
    searchQuery, 
    selectedSectors, 
    selectedDepts, 
    selectedSkills, 
    minCgpa, 
    minConsulted, 
    verifiedOnly, 
    openMentoringOnly, 
    hiringOnly, 
    sortBy, 
    user.department
  ]);

  // Mini Chart data: Sector counts
  const sectorChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    profiles.forEach(p => {
      counts[p.sector] = (counts[p.sector] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [profiles]);

  // Mini Chart data: Batch counts
  const batchChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    profiles.forEach(p => {
      const b = p.batch.split(' ')[0];
      counts[b] = (counts[b] || 0) + 1;
    });
    return Object.entries(counts).map(([batch, count]) => ({ batch, count }));
  }, [profiles]);

  const COLORS = ['#0F2A4A', '#2E5E3E', '#C9A227', '#1E3A5F', '#3D7A52', '#8B5CF6', '#EC4899', '#64748B'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TOP INSIGHTS STRIP */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
              BAUST Alumni Network Analytics
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy">
              Official Alumni Directory
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/student/directory/saved">
              <Button variant="outline" size="sm" leftIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}>
                Saved ({savedAlumniIds.length})
              </Button>
            </Link>
            {comparedAlumniIds.length > 0 && (
              <Button 
                variant="accent" 
                size="sm" 
                onClick={() => setShowCompareModal(true)}
              >
                Compare ({comparedAlumniIds.length}/3)
              </Button>
            )}
          </div>
        </div>

        {/* 4 Stat Cards + 2 Mini Recharts */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center">
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-navy">{profiles.length}</div>
            <div className="text-[11px] text-slate-500">Total Alumni</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-emerald-700">
              {profiles.filter(p => p.verified).length}
            </div>
            <div className="text-[11px] text-slate-500">Admin Verified</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-[#C9A227]">
              {profiles.filter(p => p.openToMentoring).length}
            </div>
            <div className="text-[11px] text-slate-500">Open to Mentoring</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-blue-900">
              {new Set(profiles.map(p => p.currentCompany)).size}
            </div>
            <div className="text-[11px] text-slate-500">Companies Represented</div>
          </div>

          {/* Mini Donut Chart: Alumni by Sector */}
          <div className="col-span-2 sm:col-span-1 h-20 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={80}>
              <PieChart>
                <Pie
                  data={sectorChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={22}
                  outerRadius={36}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-[10px] text-slate-400 absolute bottom-0 font-medium">By Sector</div>
          </div>

          {/* Mini Bar Chart: Alumni by Batch */}
          <div className="col-span-2 sm:col-span-1 h-20 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={batchChartData}>
                <Bar dataKey="count" fill="#2E5E3E" radius={[4, 4, 0, 0]} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-[10px] text-slate-400 absolute bottom-0 font-medium">By Batch</div>
          </div>
        </div>
      </div>

      {/* SMART SEARCH BAR & POPULAR SHORTCUTS */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, designation, company (e.g. Grameenphone, bKash), sector, skill, or department..."
            className="w-full bg-white rounded-2xl border border-slate-300 pl-12 pr-10 py-3.5 text-sm text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]/20 focus:border-[#0F2A4A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-400 font-semibold shrink-0">Popular:</span>
          {popularSearches.map(term => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* BROWSE BY SECTOR SHORTCUT TILES */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Browse by Sector
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {allSectors.map((sector) => {
            const isSelected = selectedSectors.includes(sector);
            const count = profiles.filter(p => p.sector === sector).length;
            return (
              <button
                key={sector}
                onClick={() => toggleSector(sector)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0F2A4A] bg-[#0F2A4A] text-white shadow-xs font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs truncate">{sector}</div>
                <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {count} alumni
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN LAYOUT: FILTERS SIDEBAR + RESULTS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* DESKTOP FILTERS SIDEBAR */}
        <div className="hidden lg:block lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-xs uppercase tracking-wider text-navy flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-600 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Department
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['CSE', 'EEE', 'Civil', 'Textile', 'BBA', 'ME'] as const).map(d => {
                const active = selectedDepts.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDept(d)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                      active ? 'bg-[#0F2A4A] text-white border-[#0F2A4A]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grouped Skills Multi-Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Expertise & Skills
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {skillCategories.map(skill => {
                const checked = selectedSkills.includes(skill);
                return (
                  <label key={skill} className="flex items-center gap-2 cursor-pointer hover:text-navy">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSkill(skill)}
                      className="rounded text-navy"
                    />
                    <span className="truncate">{skill}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sliders: CGPA */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <span>Min. CGPA</span>
              <span className="text-navy">{minCgpa.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="3.9"
              step="0.1"
              value={minCgpa}
              onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Minimum Consulted Students */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <span>Min. Students Consulted</span>
              <span className="text-emerald-700">{minConsulted}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="10"
              value={minConsulted}
              onChange={(e) => setMinConsulted(parseInt(e.target.value))}
              className="w-full accent-[#2E5E3E] cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs font-medium text-slate-700">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Verified Only</span>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={() => setVerifiedOnly(!verifiedOnly)}
                className="rounded text-navy"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Open to Mentoring</span>
              <input
                type="checkbox"
                checked={openMentoringOnly}
                onChange={() => setOpenMentoringOnly(!openMentoringOnly)}
                className="rounded text-emerald-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Has Hiring Authority</span>
              <input
                type="checkbox"
                checked={hiringOnly}
                onChange={() => setHiringOnly(!hiringOnly)}
                className="rounded text-[#C9A227]"
              />
            </label>
          </div>
        </div>

        {/* RESULTS AREA */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Controls Bar: Count, Sort, Grid/List */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-600 font-medium">
              Showing <strong className="text-navy">{filteredAlumni.length}</strong> alumni
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-200 p-1.5 bg-white text-xs font-semibold text-slate-800"
                >
                  <option value="match">Best Match</option>
                  <option value="consulted">Most Students Consulted</option>
                  <option value="cgpa">Highest CGPA</option>
                  <option value="newest">Newest Batch</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-xs text-navy' : 'text-slate-400'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-xs text-navy' : 'text-slate-400'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {(selectedSectors.length > 0 || selectedDepts.length > 0 || selectedSkills.length > 0) && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400">Active filters:</span>
              {selectedSectors.map(sec => (
                <span key={sec} className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 flex items-center gap-1">
                  {sec} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSector(sec)} />
                </span>
              ))}
              {selectedDepts.map(d => (
                <span key={d} className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 flex items-center gap-1">
                  {d} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleDept(d)} />
                </span>
              ))}
              {selectedSkills.map(sk => (
                <span key={sk} className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                  {sk} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSkill(sk)} />
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Cards Display */}
          {filteredAlumni.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-slate-800">No Alumni Match Your Criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your filters or clearing sector search tags.
              </p>
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-3'}>
              {filteredAlumni.map((alumni) => (
                <AlumniCard key={alumni.id} alumni={alumni} viewMode={viewMode} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Compare Modal */}
      <CompareModal isOpen={showCompareModal} onClose={() => setShowCompareModal(false)} />

    </div>
  );
};
