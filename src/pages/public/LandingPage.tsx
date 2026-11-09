import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { initialAlumniProfiles } from '../../data/alumniProfiles';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Sparkles,
  TrendingUp,
  Globe2,
  Building,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole } = useAuthStore();
  const featuredAlumni = initialAlumniProfiles.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2A4A] via-[#14365D] to-[#0F2A4A] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle patterned grid in background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A227]/40 text-xs font-semibold text-[#C9A227]">
            <Sparkles className="w-3.5 h-3.5" />
            Official Platform of Bangladesh Army University of Science & Technology
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Connecting <span className="text-white">BAUSTians</span> Across <span className="text-[#C9A227]">Generations</span> & <span className="text-emerald-400">Careers</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            The central verified network bridging current students with distinguished alumni worldwide. From structured mentorship and CV reviews to paperless transcript services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/login">
              <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Demo Platform
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Register as Student / Alum
              </Button>
            </Link>
          </div>

          {/* Live Quick Counters */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C9A227]">1,200+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Verified Alumni</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">3,400+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Enrolled Students</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">180+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Global Companies</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C9A227]">850+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Mentorship Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2E5E3E] uppercase tracking-wider">The Digital Transformation</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
            Bridging the Gap for BAUSTians
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Why BAUST needed a dedicated professional network instead of informal social media groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Challenges */}
          <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              The Old Reality (Informal & Disconnected)
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                No central alumni database; students cannot reach alumni in civil cadre, banks, telecom, or foreign labs.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                Unstructured mentorship leading to missed messages, no follow-up action items, and ghosting.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                Prevalence of fake profiles on social platforms with no official BAUST student ID verification.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                Alumni living abroad have to physically visit Saidpur campus to request official transcripts.
              </li>
            </ul>
          </div>

          {/* BAUST Career Bridge Solution */}
          <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              BAUST Career Bridge (Structured & Verified)
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                Official database searchable by Job Sector (Govt, Private, MNC, Abroad, Research) and engineering skills.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                Interactive 1-on-1 mentorship with scheduled slots, mock calls, shared notes, and live 5-star ratings.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                Multi-tier admin verification guaranteeing 100% genuine BAUST alumni and student profiles.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                Paperless Admin Desk: order sealed transcripts, MOI letters, or WES verification with home courier delivery.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4 CORE PLATFORM PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">Comprehensive Features</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
            4 Core Ecosystem Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-navy flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#0F2A4A]" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Verified Directory</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Discover alumni across Grameenphone, Brain Station 23, BCS Cadre, Central Bank, and international universities with verified credentials.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#2E5E3E]" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Mentorship Module</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Book structured sessions for CV Review, Mock Interviews, Higher Study planning, and Capstone research with actionable takeaways.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-[#C9A227]" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Direct In-App Chat</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Seamless messenger with typing indicators, online presence, and direct CV attachment uploads to accelerate professional dialogue.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Paperless Admin Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Request official transcripts, certificates, and recommendation letters online with live status tracking, bKash payments, and courier dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS IN 3 STEPS */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0F2A4A] uppercase tracking-wider">Simple & Intuitive</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
              How BAUST Career Bridge Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#0F2A4A] text-[#C9A227] font-extrabold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900">Verify Your Identity</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Register with your BAUST Student ID. University administrators verify your department, batch, and academic records to grant your badge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2E5E3E] text-white font-extrabold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900">Connect & Request Mentorship</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter alumni by sector (Govt, Abroad, Private), review their rating breakdown, and request a session or submit your CV for 100-point ATS grading.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#0F2A4A] font-extrabold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900">Grow & Access University Services</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete mock interviews, track career milestones, and use the Admin Desk to obtain authenticated transcripts without stepping onto campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ALUMNI CAROUSEL/GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#2E5E3E] uppercase tracking-wider">Distinguished Graduates</span>
            <h2 className="text-2xl font-extrabold text-navy mt-1">
              Featured Alumni Across Sectors
            </h2>
          </div>
          <Link to="/student/directory">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All 30+ Profiles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAlumni.map((alum) => (
            <div key={alum.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <Avatar name={alum.name} src={alum.avatar} size="lg" verified={alum.verified} />
                  <Badge variant="navy" size="sm">{alum.sector}</Badge>
                </div>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{alum.name}</h4>
                <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">{alum.currentPosition}</p>
                <p className="text-xs font-semibold text-navy mt-0.5">{alum.currentCompany}</p>
                <div className="text-[11px] text-slate-400 mt-2">
                  {alum.department} • {alum.batch}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#C9A227] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {alum.averageRating.toFixed(1)}
                </span>
                <Link to={`/student/directory/${alum.id}`}>
                  <Button variant="outline" size="sm" className="text-xs py-1 px-2.5">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F2A4A] via-[#163B66] to-[#2E5E3E] p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Experience BAUST Career Bridge?
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300">
            Use the floating Demo Role Switcher at any time to test the complete platform across Student, Alumni, and Admin roles.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link to="/student/dashboard">
              <Button variant="accent" size="md">
                Launch Student Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
