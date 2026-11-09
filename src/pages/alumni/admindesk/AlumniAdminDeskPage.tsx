import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminDeskStore } from '../../../hooks/useAdminDeskStore';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  Building2, FileText, CheckCircle2, Clock, Search, Plus, 
  Briefcase, Bell, HelpCircle, ExternalLink, Download, ArrowRight, 
  MapPin, DollarSign, ShieldAlert, Award, Calendar, Users 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ServiceRequestStepper } from '../../../components/admindesk/ServiceRequestStepper';
import { NoticeDetailDrawer } from '../../../components/admindesk/NoticeDetailDrawer';
import { VacancyApplyModal } from '../../../components/admindesk/VacancyApplyModal';
import { ServiceRequest, RequestStatus, ServiceItem, Notice, Vacancy } from '../../../types/admindesk';

export const AlumniAdminDeskPage: React.FC = () => {
  const { user } = useAuthStore();
  const { language } = useLanguage();
  const { 
    serviceCatalog, serviceRequests, notices, vacancies, 
    rsvpNoticeEvent 
  } = useAdminDeskStore();

  const [activeTab, setActiveTab] = useState<'catalog' | 'my-requests' | 'notices' | 'vacancies' | 'faq'>('my-requests');
  const [showStepperModal, setShowStepperModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('ALL');

  // Requests submitted by current alumni
  const myRequests = serviceRequests.filter(r => r.alumniId === 'alm-1' || r.alumniId === 'alumni-1');

  const filteredCatalog = serviceCatalog.filter(item => {
    const matchesCategory = catalogCategory === 'ALL' || item.category === catalogCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Delivered':
      case 'Ready':
      case 'Approved':
        return <Badge variant="success">{status}</Badge>;
      case 'Rejected':
      case 'Cancelled':
        return <Badge variant="danger">{status}</Badge>;
      case 'Action Required':
      case 'Payment Verified':
        return <Badge variant="warning">{status}</Badge>;
      default:
        return <Badge variant="primary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2A4A] via-[#1E3A8A] to-[#2E5E3E] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">
                OFFICIAL SERVICES
              </Badge>
              <span className="text-xs text-blue-200">BAUST Registrar & Exam Controller Hub</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              {language === 'bn' ? 'অ্যালামনাই প্রশাসনিক সেবা ডেস্ক' : 'Alumni University Admin Desk'}
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-2xl">
              Order official transcripts, certificates, medium-of-instruction letters, track processing with live timelines (BCB-2026-XXXXXX), and view career vacancies.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setShowStepperModal(true)}
            className="bg-[#C9A227] hover:bg-[#B89220] text-slate-900 font-bold border-none shadow-lg text-sm shrink-0"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Service Request
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab('my-requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'my-requests'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            My Requests ({myRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Service Catalog ({serviceCatalog.length})
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'notices'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            Notices & Events ({notices.length})
          </button>

          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'vacancies'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Job Vacancies ({vacancies.length})
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'bg-[#C9A227] text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            FAQs & Processing Time
          </button>
        </div>
      </div>

      {/* Tab 1: My Requests Table & Tracking */}
      {activeTab === 'my-requests' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#0F2A4A]">My Submitted Service Requests</h2>
              <p className="text-xs text-slate-500">Track status from Submission to Verification, Dispatch, or Collection</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowStepperModal(true)}
              className="bg-[#0F2A4A] text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Apply for Document
            </Button>
          </div>

          {myRequests.length === 0 ? (
            <Card className="p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-base font-semibold text-slate-700">No Service Requests</p>
              <p className="text-xs text-slate-400 mt-1">You haven't requested any official documents yet.</p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={() => setShowStepperModal(true)}
              >
                Start New Request
              </Button>
            </Card>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Tracking ID</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date Submitted</th>
                      <th className="py-3 px-4">Delivery Mode</th>
                      <th className="py-3 px-4">Fee (BDT)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {myRequests.map((req: ServiceRequest) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0F2A4A]">
                          {req.id}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {req.serviceNames[0] || 'Official Document'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {req.createdAt}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {req.deliveryMethod}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          ৳{req.totalFee}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(req.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link to={`/alumni/admin-desk/${req.id}`}>
                            <Button variant="outline" size="sm" className="text-xs">
                              View Timeline
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Service Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. transcript, MOI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {['ALL', 'Academic Documents', 'Verification', 'Letters', 'Others'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCatalogCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    catalogCategory === cat
                      ? 'bg-[#0F2A4A] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map((item: ServiceItem) => (
              <Card key={item.id} className="p-5 flex flex-col justify-between hover:shadow-md transition border-t-4 border-t-[#0F2A4A]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary" size="sm">{item.category}</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.processingDays} Days
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{item.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 bg-slate-50 rounded-xl mb-4 text-xs space-y-1 border border-slate-100">
                    <div className="text-slate-400 font-medium">Required Scans:</div>
                    <ul className="list-disc list-inside text-slate-700">
                      {item.requiredDocuments.slice(0, 2).map((doc: string, i: number) => (
                        <li key={i} className="truncate">{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Standard Fee</span>
                    <span className="font-black text-slate-900 text-base">৳{item.fee}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowStepperModal(true)}
                    className="bg-[#2E5E3E] hover:bg-[#254d33] text-white"
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Official Notices & Events */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F2A4A]">University Notices & Events</h2>
            <span className="text-xs text-slate-500">Official circulars from BAUST Administration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map(notice => (
              <Card key={notice.id} className="p-5 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={notice.isPinned ? 'warning' : 'primary'} size="sm">
                      {notice.isPinned ? 'PINNED' : notice.category}
                    </Badge>
                    <span className="text-xs text-slate-400">{notice.publishedAt}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2">{notice.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {notice.body}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={() => rsvpNoticeEvent(notice.id, user?.id || 'std-101')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                      notice.hasRsvp
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    {notice.hasRsvp ? 'Attending (RSVP Confirmed)' : `RSVP (${notice.rsvpCount || 0})`}
                  </button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedNotice(notice)}
                    className="text-xs"
                  >
                    Read Circular
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Job Vacancies Board */}
      {activeTab === 'vacancies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F2A4A]">Campus & Alumni Career Vacancies</h2>
            <span className="text-xs text-slate-500">Exclusive opportunities posted by partner enterprises</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vacancies.map(vac => (
              <Card key={vac.id} className="p-5 flex flex-col justify-between hover:shadow-md transition border-l-4 border-l-[#2E5E3E]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary" size="sm">{vac.type}</Badge>
                    <span className="text-xs text-rose-600 font-semibold">Deadline: {vac.deadline}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1">{vac.title}</h3>
                  <p className="text-xs font-semibold text-[#0F2A4A] mb-3">{vac.department} • BAUST Campus</p>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 mb-4 border border-slate-100">
                    <div><strong className="text-slate-800">Minimum CGPA:</strong> {vac.cgpaRequirement}</div>
                    {vac.salaryRange && <div><strong className="text-slate-800">Salary:</strong> {vac.salaryRange}</div>}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    {vac.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">{vac.applicantsCount} applicants</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedVacancy(vac)}
                    className="bg-[#2E5E3E] hover:bg-[#254d33] text-white"
                  >
                    1-Click Apply
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: FAQs & Policy */}
      {activeTab === 'faq' && (
        <Card className="p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-[#0F2A4A] mb-4">Official Document Issuance & Verification FAQs</h2>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                How do I verify the authenticity of an issued document?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every verified document carries a unique QR code and cryptographic Verification Hash. Foreign universities, embassies, or employers can verify documents online at <span className="font-mono text-[#0F2A4A] font-bold">/verify-document</span>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                Can hard copies be couriered overseas?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes. Select "Courier Delivery" under delivery method. Standard courier dispatch takes 5-7 working days following Registrar clearance.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                What payment methods are supported?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We accept bKash, Nagad merchant payments, or direct bank deposit challans to Trust Bank Ltd, Saidpur Cantonment Branch.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* 6-Step Service Request Modal */}
      {showStepperModal && (
        <ServiceRequestStepper
          isOpen={showStepperModal}
          onClose={() => setShowStepperModal(false)}
        />
      )}

      {/* Notice Detail Drawer */}
      {selectedNotice && (
        <NoticeDetailDrawer
          isOpen={true}
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}

      {/* Vacancy Apply Modal */}
      {selectedVacancy && (
        <VacancyApplyModal
          isOpen={true}
          vacancy={selectedVacancy}
          onClose={() => setSelectedVacancy(null)}
        />
      )}
    </div>
  );
};
