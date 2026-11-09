import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminDeskStore } from '../../../hooks/useAdminDeskStore';
import { 
  Building2, ArrowLeft, Clock, CheckCircle2, AlertCircle, FileText, 
  Download, QrCode, MapPin, CreditCard, ShieldCheck 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ServiceRequest, RequestTimelineStep } from '../../../types/admindesk';

export const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { serviceRequests } = useAdminDeskStore();

  const request = serviceRequests.find(r => r.id === id) || serviceRequests[0];

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800">Request Not Found</h2>
        <Link to="/alumni/admin-desk" className="text-blue-600 hover:underline mt-2 inline-block">
          Return to Admin Desk
        </Link>
      </div>
    );
  }

  const steps = [
    { key: 'Submitted', label: 'Application Submitted' },
    { key: 'Payment Verified', label: 'Payment Cleared' },
    { key: 'Under Review', label: 'Registrar Review' },
    { key: 'Processing', label: 'Official Processing' },
    { key: 'Ready', label: 'Ready for Collection' },
    { key: 'Delivered', label: 'Delivered / Completed' }
  ];

  const getStepStatus = (stepKey: string) => {
    const statusOrder = [
      'Submitted', 'Payment Verified', 'Under Review', 'Processing', 'Ready', 'Delivered'
    ];
    const currentIndex = statusOrder.indexOf(request.status);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (request.status === 'Rejected') return 'rejected';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const handleDownloadDeliverable = () => {
    alert(`Downloading official document deliverable for ${request.id}...\nDocument: ${request.serviceNames.join(', ')}\nIssued by: BAUST Controller of Examinations`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <div>
        <Link
          to="/alumni/admin-desk"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-[#0F2A4A] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Admin Desk
        </Link>
      </div>

      {/* Main Header Card */}
      <Card className="p-6 md:p-8 border-t-4 border-t-[#0F2A4A]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-sm font-black text-[#0F2A4A] bg-slate-100 px-2.5 py-1 rounded-lg">
                {request.id}
              </span>
              <Badge variant="primary">{request.status}</Badge>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">{request.serviceNames.join(' & ')}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Applicant: <span className="font-semibold text-slate-700">{request.alumniName}</span> • Submitted on {request.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {request.status === 'Delivered' || request.status === 'Ready' ? (
              <Button
                variant="primary"
                onClick={handleDownloadDeliverable}
                className="bg-[#2E5E3E] hover:bg-[#254d33] text-white text-xs"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Download Verified PDF
              </Button>
            ) : null}

            <Link to={`/verify-document?hash=${request.id}`}>
              <Button variant="outline" size="sm" className="text-xs">
                <QrCode className="w-4 h-4 mr-1.5" />
                Verify QR
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Stepper Timeline */}
        <div className="py-8">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C9A227]" />
            Official Processing Lifecycle
          </h3>

          <div className="relative">
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
              {steps.map(step => {
                const status = getStepStatus(step.key);
                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition mb-2 shadow-xs ${
                        status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : status === 'current'
                          ? 'bg-[#0F2A4A] text-white ring-4 ring-blue-100 animate-pulse'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span>•</span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-xs">
          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 font-medium block flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Delivery Method & Address
            </span>
            <p className="font-semibold text-slate-800">{request.deliveryMethod}</p>
            <p className="text-slate-600">{request.courierAddress?.address || 'Collected at Registrar Counter'}</p>
          </div>

          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 font-medium block flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> Payment & Transaction
            </span>
            <p className="font-semibold text-slate-800">৳{request.totalFee} BDT ({request.paymentStatus})</p>
            <p className="text-slate-600 font-mono">Method: {request.paymentMethod} • Tx: {request.transactionId}</p>
          </div>

          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 font-medium block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Digital Authenticity
            </span>
            <p className="font-semibold text-emerald-700">Digital Seal & Verification Hash</p>
            <p className="font-mono text-[10px] text-slate-500 truncate">
              HASH: e4d909c290d0fb1ca068ffaddf22cbd0
            </p>
          </div>
        </div>
      </Card>

      {/* Remarks Thread & Administrative Timeline History */}
      <Card className="p-6 md:p-8">
        <h3 className="text-base font-bold text-[#0F2A4A] mb-4">Official Remarks & Milestone Log</h3>

        <div className="space-y-4">
          {request.timeline && request.timeline.length > 0 ? (
            request.timeline.map((event: RequestTimelineStep, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0F2A4A] mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800">{event.status}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{event.timestamp}</span>
                  </div>
                  {event.note && <p className="text-xs text-slate-600">{event.note}</p>}
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                    By: {event.actor}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
