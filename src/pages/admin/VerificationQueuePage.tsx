import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  UserCheck, ShieldCheck, CheckCircle2, XCircle, Eye, Search, 
  FileText, ExternalLink, AlertTriangle, Filter, Clock 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

interface PendingVerification {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni';
  studentId: string;
  department: string;
  batch: string;
  passingYear?: number;
  submittedAt: string;
  documentType: string;
  documentUrl: string;
}

const initialQueue: PendingVerification[] = [
  {
    id: 'ver-1',
    name: 'Md. Tariqul Islam',
    email: 'tariqul.islam@alumni.baust.edu.bd',
    role: 'alumni',
    studentId: '160101034',
    department: 'Computer Science & Engineering',
    batch: 'Batch 2',
    passingYear: 2019,
    submittedAt: 'Today, 09:30 AM',
    documentType: 'BAUST Provisional Certificate (Scan)',
    documentUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ver-2',
    name: 'Nusrat Jahan Mim',
    email: 'nusrat.mim@student.baust.edu.bd',
    role: 'student',
    studentId: '0802420105101035',
    department: 'Electrical & Electronic Engineering',
    batch: 'Batch 11',
    submittedAt: 'Yesterday, 04:15 PM',
    documentType: 'BAUST Student ID Card',
    documentUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ver-3',
    name: 'Sazzad Hossain Khan',
    email: 'sazzad.khan@alumni.baust.edu.bd',
    role: 'alumni',
    studentId: '170201048',
    department: 'Civil Engineering',
    batch: 'Batch 3',
    passingYear: 2020,
    submittedAt: '2 days ago',
    documentType: 'Official Academic Transcript (Scan)',
    documentUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ver-4',
    name: 'Farhana Akter Rima',
    email: 'farhana.rima@student.baust.edu.bd',
    role: 'student',
    studentId: '0802420105101042',
    department: 'Mechanical Engineering',
    batch: 'Batch 10',
    submittedAt: '3 days ago',
    documentType: 'Semester Grade Sheet Scan',
    documentUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&w=600&q=80'
  }
];

export const VerificationQueuePage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const [queue, setQueue] = useState<PendingVerification[]>(initialQueue);
  const [selectedItem, setSelectedItem] = useState<PendingVerification | null>(null);
  const [rejectionModalItem, setRejectionModalItem] = useState<PendingVerification | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (id: string, name: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);

    showToast({
      title: 'User Verified Successfully',
      message: `${name} has been verified and granted full portal credentials.`,
      type: 'success'
    });
  };

  const handleRejectConfirm = () => {
    if (!rejectionModalItem) return;
    setQueue(prev => prev.filter(q => q.id !== rejectionModalItem.id));
    const name = rejectionModalItem.name;
    setRejectionModalItem(null);
    setRejectionReason('');

    showToast({
      title: 'Verification Rejected',
      message: `Rejection notice sent to ${name}.`,
      type: 'info'
    });
  };

  const filtered = queue.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.studentId.includes(searchQuery) ||
    item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A4A] flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#C9A227]" />
            Identity Verification & Registrar Clearance Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Authenticate student ID numbers and graduation certificates against the central BAUST database.
          </p>
        </div>
        <Badge variant="warning">{queue.length} Awaiting Verification</Badge>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, ID number, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
          />
        </div>
      </Card>

      {/* Queue Table */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center text-slate-400">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
          <p className="text-base font-semibold text-slate-700">Verification Queue is Empty</p>
          <p className="text-xs text-slate-400 mt-1">All submitted student and alumni identity claims have been processed.</p>
        </Card>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department & Batch</th>
                  <th className="py-3 px-4">Document Proof</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{item.name}</div>
                      <div className="text-[11px] text-slate-400">{item.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0F2A4A]">
                      {item.studentId}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={item.role === 'alumni' ? 'primary' : 'neutral'} size="sm">
                        {item.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{item.department}</div>
                      <div className="text-[11px] text-slate-400">{item.batch} {item.passingYear ? `(Class of ${item.passingYear})` : ''}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {item.documentType}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {item.submittedAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRejectionModalItem(item)}
                          className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs px-2.5"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(item.id, item.name)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5"
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Document Verification: ${selectedItem.name}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Claimed ID & Department</span>
                <span className="font-bold text-slate-800">{selectedItem.studentId} • {selectedItem.department}</span>
              </div>
              <Badge variant="primary">{selectedItem.documentType}</Badge>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center p-2 min-h-[300px]">
              <img
                src={selectedItem.documentUrl}
                alt={selectedItem.documentType}
                className="max-h-[400px] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Cross-verified against BAUST Registrar 2015-2026 Student Database
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setRejectionModalItem(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="text-rose-600 border-rose-200"
                >
                  Reject Proof
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleApprove(selectedItem.id, selectedItem.name)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Verify & Approve Account
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Rejection Modal with Reason */}
      {rejectionModalItem && (
        <Modal
          isOpen={!!rejectionModalItem}
          onClose={() => setRejectionModalItem(null)}
          title={`Reject Verification: ${rejectionModalItem.name}`}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Please specify the rejection reason. The user will be notified to re-upload clear proof.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Rejection Reason</label>
              <textarea
                rows={3}
                placeholder="e.g. Blurry photo of certificate, Student ID mismatch with Registrar roll sheet..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setRejectionModalItem(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRejectConfirm}
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
