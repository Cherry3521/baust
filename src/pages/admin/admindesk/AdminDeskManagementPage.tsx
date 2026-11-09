import React, { useState } from 'react';
import { useAdminDeskStore } from '../../../hooks/useAdminDeskStore';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  Building2, FileText, CheckCircle2, Clock, Search, Plus, 
  Settings, Bell, Briefcase, Filter, Edit, Trash2, UserCheck, 
  ArrowRight, ShieldAlert, Sparkles 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { AdminActionDrawer } from '../../../components/admindesk/AdminActionDrawer';
import { Modal } from '../../../components/ui/Modal';
import { ServiceRequest, ServiceItem, Notice, ServiceCategory, NoticeCategory } from '../../../types/admindesk';
import { useToast } from '../../../components/ui/Toast';

export const AdminDeskManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { 
    serviceCatalog, serviceRequests, notices, vacancies, 
    addServiceItem, addNotice 
  } = useAdminDeskStore();

  const [activeTab, setActiveTab] = useState<'requests' | 'catalog' | 'notices' | 'vacancies'>('requests');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Add Service Modal
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<ServiceCategory>('Academic Documents');
  const [newServiceFee, setNewServiceFee] = useState('500');
  const [newServiceDays, setNewServiceDays] = useState('7');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // Add Notice Modal
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeBody, setNewNoticeBody] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<NoticeCategory>('Alumni Event');
  const [isNoticePinned, setIsNoticePinned] = useState(false);

  const handleCreateService = () => {
    if (!newServiceName.trim()) return;
    addServiceItem({
      name: newServiceName.trim(),
      code: `SVC-${Date.now().toString().slice(-4)}`,
      category: newServiceCategory,
      description: newServiceDesc || 'Official document processing issued under authority of BAUST Registrar.',
      fee: Number(newServiceFee) || 500,
      expressFee: (Number(newServiceFee) || 500) * 1.5,
      urgentFee: (Number(newServiceFee) || 500) * 1.25,
      processingDays: Number(newServiceDays) || 7,
      urgentDays: 4,
      expressDays: 2,
      requiredDocuments: ['Scan of Student ID Card', 'Passport / NID Scan'],
      allowedDeliveryMethods: ['Campus Pickup', 'Courier Delivery', 'Email PDF'],
      perCopyPricing: 100,
      iconName: 'FileText',
      isActive: true
    });
    setShowAddServiceModal(false);
    setNewServiceName('');
    setNewServiceDesc('');
    showToast({
      title: 'Service Added',
      message: `${newServiceName} has been published to the student & alumni service catalog.`,
      type: 'success'
    });
  };

  const handleCreateNotice = () => {
    if (!newNoticeTitle.trim()) return;
    addNotice({
      title: newNoticeTitle.trim(),
      body: newNoticeBody.trim(),
      category: newNoticeCategory,
      isPinned: isNoticePinned,
      isUrgent: false,
      audience: 'All',
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'Published'
    });
    setShowAddNoticeModal(false);
    setNewNoticeTitle('');
    setNewNoticeBody('');
    showToast({
      title: 'Notice Published',
      message: 'New official announcement has been broadcast to all portals.',
      type: 'success'
    });
  };

  const filteredRequests = serviceRequests.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.serviceNames.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.alumniName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A4A] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#0F2A4A]" />
            University Admin Desk Operations Console
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Supervise document requests, dispatch tracking timelines, update catalog fees, and publish circulars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'catalog' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddServiceModal(true)}
              className="bg-[#0F2A4A] text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Service
            </Button>
          )}

          {activeTab === 'notices' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddNoticeModal(true)}
              className="bg-[#2E5E3E] hover:bg-[#254d33] text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Publish Circular
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'bg-[#0F2A4A] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          Service Requests ({serviceRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'bg-[#0F2A4A] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          Service Catalog ({serviceCatalog.length})
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'bg-[#0F2A4A] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Bell className="w-4 h-4" />
          Notices Board ({notices.length})
        </button>

        <button
          onClick={() => setActiveTab('vacancies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'vacancies'
              ? 'bg-[#0F2A4A] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Career Vacancies ({vacancies.length})
        </button>
      </div>

      {/* Tab 1: Service Requests Management */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Tracking ID (BCB-2026-XXXXXX), applicant name, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                />
              </div>

              <div className="w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="ALL">All Statuses (10 Stages)</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Payment Verified">Payment Verified</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Action Required">Action Required</option>
                  <option value="Approved">Approved</option>
                  <option value="Processing">Processing</option>
                  <option value="Ready">Ready</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4">Fee</th>
                    <th className="py-3 px-4">Assigned Staff</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0F2A4A]">
                        {req.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {req.alumniName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {req.serviceNames[0] || 'Official Document'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {req.deliveryMethod}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        ৳{req.totalFee}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {req.assignedStaff || 'Unassigned'}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            req.status === 'Delivered' || req.status === 'Ready' || req.status === 'Approved'
                              ? 'success'
                              : req.status === 'Rejected'
                              ? 'danger'
                              : 'primary'
                          }
                          size="sm"
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedRequest(req)}
                          className="bg-[#0F2A4A] text-white text-xs px-3"
                        >
                          Manage / Action
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Catalog Management */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCatalog.map((item: ServiceItem) => (
            <Card key={item.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary" size="sm">{item.category}</Badge>
                  <span className="text-xs text-slate-400 font-medium">SLA: {item.processingDays} Days</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{item.description}</p>
                <div className="text-xs font-semibold text-[#0F2A4A] mb-2">
                  Official Fee: ৳{item.fee} BDT
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold">Active in Catalog</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Edit Service: ${item.name}`)}
                  className="text-xs"
                >
                  <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Notices Manager */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map(notice => (
            <Card key={notice.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={notice.isPinned ? 'warning' : 'primary'} size="sm">
                    {notice.isPinned ? 'PINNED' : notice.category}
                  </Badge>
                  <span className="text-xs text-slate-400">{notice.publishedAt}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{notice.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-3">{notice.body}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{notice.rsvpCount || 0} Attending (RSVP)</span>
                <span className="text-emerald-600 font-semibold">Live Broadcast</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 4: Career Vacancies */}
      {activeTab === 'vacancies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vacancies.map(vac => (
            <Card key={vac.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary" size="sm">{vac.type}</Badge>
                  <span className="text-xs text-rose-600 font-semibold">Deadline: {vac.deadline}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{vac.title}</h3>
                <p className="text-xs font-semibold text-[#0F2A4A] mb-2">{vac.department} • BAUST Campus</p>
                <p className="text-xs text-slate-500 mb-3">{vac.description}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F2A4A]">{vac.applicantsCount} Student & Alumni Applicants</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Reviewing candidate list for: ${vac.title}`)}
                  className="text-xs"
                >
                  Review Candidates
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Admin Action Drawer for Selected Request */}
      {selectedRequest && (
        <AdminActionDrawer
          isOpen={true}
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {/* Add Service Modal */}
      <Modal
        isOpen={showAddServiceModal}
        onClose={() => setShowAddServiceModal(false)}
        title="Add New Document Service to Catalog"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Service Title</label>
            <input
              type="text"
              placeholder="e.g. Migration Certificate, English Proficiency Attestation..."
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={newServiceCategory}
                onChange={(e) => setNewServiceCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Academic Documents">Academic Documents</option>
                <option value="Verification">Verification</option>
                <option value="Letters">Letters</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Fee (BDT)</label>
              <input
                type="number"
                value={newServiceFee}
                onChange={(e) => setNewServiceFee(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Standard Processing SLA (Days)</label>
            <input
              type="number"
              value={newServiceDays}
              onChange={(e) => setNewServiceDays(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Service Description</label>
            <textarea
              rows={3}
              placeholder="Detailed instructions for alumni applicants..."
              value={newServiceDesc}
              onChange={(e) => setNewServiceDesc(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowAddServiceModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateService} className="bg-[#0F2A4A] text-white">
              Save & Publish Service
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Notice Modal */}
      <Modal
        isOpen={showAddNoticeModal}
        onClose={() => setShowAddNoticeModal(false)}
        title="Publish Official University Circular"
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Circular Title</label>
            <input
              type="text"
              placeholder="e.g. 5th Convocation Registration Notice..."
              value={newNoticeTitle}
              onChange={(e) => setNewNoticeTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={newNoticeCategory}
                onChange={(e) => setNewNoticeCategory(e.target.value as NoticeCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Academic">Academic</option>
                <option value="Alumni Event">Alumni Event</option>
                <option value="Convocation">Convocation</option>
                <option value="Job/Recruitment">Job/Recruitment</option>
                <option value="Policy">Policy</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNoticePinned}
                  onChange={(e) => setIsNoticePinned(e.target.checked)}
                  className="w-4 h-4 accent-[#0F2A4A]"
                />
                <span className="font-semibold text-slate-700">Pin to Top of Board</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Body / Directives</label>
            <textarea
              rows={4}
              placeholder="Official instructions issued by the Registrar or Vice Chancellor Office..."
              value={newNoticeBody}
              onChange={(e) => setNewNoticeBody(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowAddNoticeModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateNotice} className="bg-[#2E5E3E] hover:bg-[#254d33] text-white">
              Publish Notice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
