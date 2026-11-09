import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useDirectoryStore } from '../../hooks/useDirectoryStore';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  Users, UserCheck, FileText, CheckCircle2, Clock, AlertTriangle, 
  TrendingUp, BarChart3, PieChart as PieChartIcon, ShieldCheck, ArrowRight, 
  Building2, Briefcase, Bell 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { language } = useLanguage();
  const { serviceRequests } = useAdminDeskStore();
  const { profiles } = useDirectoryStore();
  const { requests: mentorshipRequests } = useMentorshipStore();

  const pendingVerificationsCount = 5; // Mock pending user registrations

  // Chart Data: Registrations over months
  const monthlyData = [
    { month: 'Jan', students: 120, alumni: 45 },
    { month: 'Feb', students: 160, alumni: 58 },
    { month: 'Mar', students: 210, alumni: 72 },
    { month: 'Apr', students: 280, alumni: 90 },
    { month: 'May', students: 340, alumni: 110 },
    { month: 'Jun', students: 410, alumni: 145 },
    { month: 'Jul', students: 490, alumni: 170 },
    { month: 'Aug', students: 560, alumni: 195 },
    { month: 'Sep', students: 680, alumni: 230 },
    { month: 'Oct', students: 780, alumni: 275 },
    { month: 'Nov', students: 920, alumni: 310 }
  ];

  // Sector breakdown
  const sectorData = [
    { name: 'IT & Software', value: 42, color: '#0F2A4A' },
    { name: 'Fintech & Banks', value: 18, color: '#C9A227' },
    { name: 'Govt. / BCS Cadre', value: 14, color: '#2E5E3E' },
    { name: 'Abroad & Research', value: 12, color: '#7C3AED' },
    { name: 'Telecom & Core Engg', value: 9, color: '#EC4899' },
    { name: 'Others', value: 5, color: '#64748B' }
  ];

  // Batch Distribution
  const batchData = [
    { batch: 'Batch 1', count: 68 },
    { batch: 'Batch 2', count: 85 },
    { batch: 'Batch 3', count: 94 },
    { batch: 'Batch 4', count: 115 },
    { batch: 'Batch 5', count: 130 },
    { batch: 'Batch 6', count: 155 },
    { batch: 'Batch 7', count: 172 },
    { batch: 'Batch 8', count: 198 },
    { batch: 'Batch 9', count: 210 }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-[#0F2A4A] via-[#1E3A8A] to-[#2E5E3E] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning" className="bg-[#C9A227] text-slate-900 font-bold border-none">
                UNIVERSITY SUPER-ADMIN CONSOLE
              </Badge>
              <span className="text-xs text-blue-200">Saidpur Cantonment, Nilphamari</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{user?.name}</h1>
            <p className="text-blue-100 text-sm mt-1">
              Controller & Institutional Oversight • BAUST Career Bridge Digital Platform
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/admin/verifications">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur text-xs"
              >
                <UserCheck className="w-4 h-4 mr-1.5 text-[#C9A227]" />
                Verification Queue ({pendingVerificationsCount})
              </Button>
            </Link>
            <Link to="/admin/admin-desk">
              <Button
                variant="primary"
                className="bg-[#C9A227] hover:bg-[#B89220] text-slate-900 font-bold border-none text-xs"
              >
                Manage Service Requests
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="p-5 border-l-4 border-l-[#0F2A4A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Registered Alumni</span>
            <div className="p-2 bg-blue-50 text-[#0F2A4A] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">1,248</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18% this semester
          </span>
        </Card>

        <Card className="p-5 border-l-4 border-l-[#2E5E3E]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Active Students</span>
            <div className="p-2 bg-emerald-50 text-[#2E5E3E] rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">2,410</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> 100% verified IDs
          </span>
        </Card>

        <Card className="p-5 border-l-4 border-l-[#C9A227]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Desk Applications</span>
            <div className="p-2 bg-amber-50 text-[#C9A227] rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{serviceRequests.length + 340}</p>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
            96% SLA clearance rate
          </span>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Consultations Held</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">482</p>
          <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
            4.9 / 5.0 satisfaction
          </span>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart: User Registrations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0F2A4A] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2E5E3E]" />
                Platform Growth & User Onboarding
              </h3>
              <p className="text-xs text-slate-400">Cumulative verified students vs alumni</p>
            </div>
            <Badge variant="primary" size="sm">2026 Live</Badge>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="students" stroke="#0F2A4A" strokeWidth={2.5} name="Students" />
                <Line type="monotone" dataKey="alumni" stroke="#C9A227" strokeWidth={2.5} name="Alumni" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart: Alumni Sectors */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0F2A4A] flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-[#C9A227]" />
                Alumni Employment by Sector
              </h3>
              <p className="text-xs text-slate-400">Global & domestic career destinations</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart: Alumni by Batch */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0F2A4A]">Alumni Representation by Graduation Batch</h3>
              <p className="text-xs text-slate-400">Verified graduates in BAUST digital registry</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="batch" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="count" fill="#2E5E3E" radius={[6, 6, 0, 0]} name="Graduates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/verifications" className="block">
          <Card className="p-6 hover:shadow-md transition border-l-4 border-l-[#C9A227]">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-6 h-6 text-[#C9A227]" />
              <Badge variant="warning">{pendingVerificationsCount} Pending</Badge>
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Alumni Verification Queue</h4>
            <p className="text-xs text-slate-500 mt-1">
              Verify degree certificates, student registration numbers, and identity cards.
            </p>
          </Card>
        </Link>

        <Link to="/admin/users" className="block">
          <Card className="p-6 hover:shadow-md transition border-l-4 border-l-[#0F2A4A]">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-[#0F2A4A]" />
              <span className="text-xs text-slate-400">3,658 Accounts</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm">User & Role Management</h4>
            <p className="text-xs text-slate-500 mt-1">
              Search all students and alumni, filter by status, and manage platform permissions.
            </p>
          </Card>
        </Link>

        <Link to="/admin/announcements" className="block">
          <Card className="p-6 hover:shadow-md transition border-l-4 border-l-[#2E5E3E]">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-6 h-6 text-[#2E5E3E]" />
              <span className="text-xs text-slate-400">Notices & Events</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm">University Announcements</h4>
            <p className="text-xs text-slate-500 mt-1">
              Publish official notices, campus recruitments, convocation circulars, and reunions.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
};
