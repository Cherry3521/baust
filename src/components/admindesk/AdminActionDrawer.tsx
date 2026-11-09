import React, { useState } from 'react';
import { ServiceRequest, RequestStatus } from '../../types/admindesk';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../ui/Toast';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Send, 
  Download,
  ShieldCheck,
  Truck,
  CreditCard,
  UserCheck
} from 'lucide-react';

interface AdminActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest;
}

export const AdminActionDrawer: React.FC<AdminActionDrawerProps> = ({
  isOpen,
  onClose,
  request
}) => {
  const { 
    verifyPayment, 
    approveRequest, 
    rejectRequest, 
    requestActionRequired, 
    startProcessingRequest, 
    markReadyForDelivery, 
    markDelivered,
    sendMessageOnRequest
  } = useAdminDeskStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'workflow' | 'timeline' | 'messages'>('workflow');
  
  // Rejection modal state
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Invalid documents / Incomplete clearance');
  const [rejectionNote, setRejectionNote] = useState('');

  // Action required state
  const [showActionForm, setShowActionForm] = useState(false);
  const [actionMessage, setActionMessage] = useState('Please upload missing Departmental Clearance form or Police GD scan.');

  // Courier state
  const [courierName, setCourierName] = useState('SA Paribahan');
  const [trackingNumber, setTrackingNumber] = useState(`SA-${Date.now().toString().slice(-7)}`);

  // Message input
  const [chatInput, setChatInput] = useState('');

  // Auto-verification checklist state
  const [chkIdMatched, setChkIdMatched] = useState(true);
  const [chkGraduationVerified, setChkGraduationVerified] = useState(true);
  const [chkPaymentVerified, setChkPaymentVerified] = useState(request.paymentStatus === 'Verified');
  const [chkDocsValid, setChkDocsValid] = useState(true);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessageOnRequest(request.id, chatInput.trim(), 'admin', user.name);
    setChatInput('');
    showToast('Message sent to applicant.', 'info');
  };

  const handleConfirmReject = () => {
    if (!rejectionNote.trim()) {
      showToast('Please provide an explanatory remark for rejection.', 'error');
      return;
    }
    rejectRequest(request.id, rejectionReason, rejectionNote.trim(), user.name);
    showToast(`Request ${request.id} rejected. Applicant notified.`, 'error');
    setShowRejectForm(false);
    onClose();
  };

  const handleConfirmActionRequired = () => {
    if (!actionMessage.trim()) {
      showToast('Please specify what action is required from the applicant.', 'error');
      return;
    }
    requestActionRequired(request.id, actionMessage.trim(), user.name);
    showToast(`Action Required notice sent to applicant.`, 'info');
    setShowActionForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-navy">{request.id}</span>
              <Badge variant={request.status.toLowerCase() as any} size="sm">
                {request.status}
              </Badge>
              {request.urgency === 'Express' && (
                <Badge variant="actionRequired" size="sm">EXPRESS 24H</Badge>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Applicant: <strong className="text-slate-800">{request.alumniName}</strong> ({request.alumniBaustId} • {request.alumniDept})
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-white text-xs font-bold">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'workflow' ? 'border-[#0F2A4A] text-navy' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Review & Actions
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'timeline' ? 'border-[#0F2A4A] text-navy' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Tracking Timeline ({request.timeline.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'messages' ? 'border-[#0F2A4A] text-navy' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Remarks Thread ({request.messages.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: WORKFLOW & ACTIONS */}
          {activeTab === 'workflow' && (
            <div className="space-y-6 text-xs">
              
              {/* Order summary box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Order Specifications
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Services:</strong> {request.serviceNames.join(', ')}</div>
                  <div><strong>Copies:</strong> {request.copies}</div>
                  <div><strong>Delivery Method:</strong> {request.deliveryMethod}</div>
                  <div><strong>Total Fee:</strong> BDT {request.totalFee} ({request.paymentStatus})</div>
                  <div><strong>Payment Trx:</strong> {request.paymentMethod} - {request.transactionId}</div>
                  <div><strong>Submitted At:</strong> {new Date(request.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Auto-verification checklist */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>Administrative Verification Checklist</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkIdMatched} 
                      onChange={() => setChkIdMatched(!chkIdMatched)} 
                      className="rounded text-navy"
                    />
                    <span>BAUST Student ID {request.alumniBaustId} matches graduation ledger</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkGraduationVerified} 
                      onChange={() => setChkGraduationVerified(!chkGraduationVerified)} 
                      className="rounded text-navy"
                    />
                    <span>Degree awarded: {request.alumniDept} ({request.alumniBatch}), CGPA: {request.alumniCgpa}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkPaymentVerified} 
                      onChange={() => {
                        setChkPaymentVerified(!chkPaymentVerified);
                        verifyPayment(request.id);
                      }} 
                      className="rounded text-navy"
                    />
                    <span>Payment verified by Accounts clearance desk (BDT {request.totalFee})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkDocsValid} 
                      onChange={() => setChkDocsValid(!chkDocsValid)} 
                      className="rounded text-navy"
                    />
                    <span>Uploaded supporting documents (NID/Clearance) inspected and valid</span>
                  </label>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Uploaded Supporting Documents ({request.uploadedDocuments.length})
                </div>
                <div className="space-y-2">
                  {request.uploadedDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-800">{doc.name}</span>
                        <span className="text-slate-400">({doc.size})</span>
                      </div>
                      <button
                        onClick={() => showToast(`Previewing ${doc.name}`, 'info')}
                        className="text-navy font-bold hover:underline cursor-pointer"
                      >
                        Preview File
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Actions Section */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="font-bold uppercase tracking-wider text-[11px] text-[#C9A227]">
                  Administrative Status Workflow Actions
                </div>

                {request.status === 'Submitted' && (
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => approveRequest(request.id, user.name)}
                    >
                      ✓ Verify & Approve Request
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-white border-slate-600 hover:bg-slate-800"
                      onClick={() => setShowActionForm(true)}
                    >
                      Request Missing Document
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => setShowRejectForm(true)}
                    >
                      ✕ Reject Request
                    </Button>
                  </div>
                )}

                {request.status === 'Approved' && (
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      Request has been cleared. Start physical printing, embossing seal, and registrar signing.
                    </p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => startProcessingRequest(request.id, user.name)}
                    >
                      Start Processing / Printing
                    </Button>
                  </div>
                )}

                {request.status === 'Processing' && (
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      Official document is embossed and ready. Seal package and mark ready for collection/courier.
                    </p>
                    <Button 
                      variant="accent" 
                      size="sm" 
                      onClick={() => markReadyForDelivery(request.id, user.name)}
                    >
                      Mark Ready for Delivery / Collection
                    </Button>
                  </div>
                )}

                {request.status === 'Ready' && (
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      Ready package waiting for delivery handover or campus collection.
                    </p>
                    {request.deliveryMethod === 'Courier Delivery' ? (
                      <div className="space-y-2 bg-slate-800 p-3 rounded-xl">
                        <label className="text-[11px] text-slate-300 block">Courier Tracking Info:</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={courierName}
                            onChange={(e) => setCourierName(e.target.value)}
                            className="bg-slate-700 rounded p-1.5 text-xs text-white"
                            placeholder="Courier Company"
                          />
                          <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="bg-slate-700 rounded p-1.5 text-xs text-white"
                            placeholder="Tracking #"
                          />
                        </div>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="bg-emerald-600 hover:bg-emerald-700 w-full mt-2"
                          onClick={() => markDelivered(request.id, courierName, trackingNumber, user.name)}
                        >
                          Dispatched via Courier (Mark Delivered)
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => markDelivered(request.id, undefined, undefined, user.name)}
                      >
                        Mark Collected / Handed Over
                      </Button>
                    )}
                  </div>
                )}

                {request.status === 'Delivered' && (
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Order successfully delivered and closed.</span>
                  </div>
                )}

                {request.status === 'Rejected' && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl space-y-1 text-rose-200">
                    <strong>Rejection Reason:</strong> {request.rejectionReason}
                    <p className="text-[11px]">{request.rejectionMessage}</p>
                  </div>
                )}
              </div>

              {/* REJECT FORM MODAL */}
              {showRejectForm && (
                <div className="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50/50 space-y-3">
                  <span className="font-bold text-rose-900 block uppercase tracking-wider text-[11px]">
                    Reject Request Order
                  </span>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Reason Category *</label>
                    <select
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full rounded-xl border border-rose-300 p-2 text-xs bg-white"
                    >
                      <option>Invalid documents / Incomplete clearance</option>
                      <option>Payment not verified / Mismatch</option>
                      <option>Record mismatch in Academic Ledger</option>
                      <option>Duplicate request</option>
                      <option>Outstanding Library or Hall Fine</option>
                      <option>Other Institutional Reason</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Custom Explanation for Alumni *</label>
                    <textarea
                      rows={2}
                      value={rejectionNote}
                      onChange={(e) => setRejectionNote(e.target.value)}
                      placeholder="Explain what was missing and how the alumni can clear the dues to re-apply..."
                      className="w-full rounded-xl border border-rose-300 p-2 text-xs bg-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowRejectForm(false)}>
                      Cancel
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleConfirmReject}>
                      Confirm Rejection
                    </Button>
                  </div>
                </div>
              )}

              {/* ACTION REQUIRED FORM */}
              {showActionForm && (
                <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/50 space-y-3">
                  <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px]">
                    Request Additional Information / File
                  </span>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Message to Applicant *</label>
                    <textarea
                      rows={2}
                      value={actionMessage}
                      onChange={(e) => setActionMessage(e.target.value)}
                      className="w-full rounded-xl border border-amber-300 p-2 text-xs bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowActionForm(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleConfirmActionRequired}>
                      Send Action Prompt
                    </Button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: TRACKING TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Full Audit Trail & SLA Timestamp Log
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {request.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#0F2A4A] ring-4 ring-white"></span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{step.status}</span>
                      <span className="text-[10px] text-slate-400">{step.timestamp}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 font-medium">Actor: {step.actor}</div>
                    {step.note && (
                      <p className="text-xs text-slate-500 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {step.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REMARKS & MESSAGES THREAD */}
          {activeTab === 'messages' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex-1 space-y-3">
                {request.messages.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400">
                    No remarks sent yet. Use the prompt below to message the applicant directly.
                  </div>
                ) : (
                  request.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl text-xs max-w-[85%] ${
                        m.senderRole === 'admin'
                          ? 'ml-auto bg-[#0F2A4A] text-white'
                          : 'mr-auto bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] opacity-75 mb-1 gap-2">
                        <span>{m.senderName} ({m.senderRole})</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a remark or instruction to the applicant..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-navy"
                />
                <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Send
                </Button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
