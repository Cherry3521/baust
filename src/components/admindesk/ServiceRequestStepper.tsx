import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useToast } from '../ui/Toast';
import { DeliveryMethod, UrgencyLevel, ServiceItem } from '../../types/admindesk';
import { 
  FileText, 
  Upload, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  MapPin, 
  Calendar,
  Building,
  ArrowRight,
  ShieldCheck,
  QrCode
} from 'lucide-react';

interface ServiceRequestStepperProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceId?: string;
}

export const ServiceRequestStepper: React.FC<ServiceRequestStepperProps> = ({
  isOpen,
  onClose,
  defaultServiceId
}) => {
  const { serviceCatalog, submitServiceRequest } = useAdminDeskStore();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    defaultServiceId ? [defaultServiceId] : [serviceCatalog[0]?.id || 'srv-001']
  );
  const [copies, setCopies] = useState<number>(1);
  const [purpose, setPurpose] = useState<'Higher Study' | 'Job' | 'Visa' | 'Personal' | 'Other'>('Higher Study');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Normal');
  const [semesterInfo, setSemesterInfo] = useState('All 8 Completed Semesters');

  // Verification type recipient info
  const [recipientName, setRecipientName] = useState('Admissions Office');
  const [recipientOrg, setRecipientOrg] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  // Uploaded documents
  const [uploadedDocs, setUploadedDocs] = useState<{ name: string; size: string; type: string; url: string }[]>([
    { name: 'BAUST_Student_ID_Scan.pdf', size: '1.1 MB', type: 'application/pdf', url: '#' },
    { name: 'Clearance_Confirmation.pdf', size: '640 KB', type: 'application/pdf', url: '#' }
  ]);

  // Delivery
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Courier Delivery');
  const [pickupDate, setPickupDate] = useState('2026-11-20');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('House 42, Road 11, Banani, Dhaka-1213');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Bank Deposit' | 'Card'>('bKash');
  const [transactionId, setTransactionId] = useState('BK99228811');

  // Success state
  const [createdTrackingId, setCreatedTrackingId] = useState<string>('');

  const toggleSelectService = (id: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) 
        : [...prev, id]
    );
  };

  // Calculate dynamic fees
  const calculateTotal = () => {
    let base = 0;
    selectedServiceIds.forEach(id => {
      const s = serviceCatalog.find(cat => cat.id === id);
      if (s) {
        base += s.fee + (copies - 1) * s.perCopyPricing;
        if (urgency === 'Urgent') base += s.urgentFee;
        if (urgency === 'Express') base += s.expressFee;
      }
    });
    if (deliveryMethod === 'Courier Delivery') {
      base += division === 'Dhaka' ? 100 : 150;
    }
    return base;
  };

  const totalFee = calculateTotal();

  const handleFinalSubmit = () => {
    const trackingId = submitServiceRequest({
      alumniId: user.id,
      alumniName: user.name,
      alumniEmail: user.email,
      alumniPhone: user.phone || '+8801711223344',
      alumniBaustId: user.studentId || '15CSE042',
      alumniDept: user.department,
      alumniBatch: user.batch || '1st Batch (2015)',
      alumniPassingYear: user.passingYear || '2019',
      alumniCgpa: 3.88,
      serviceIds: selectedServiceIds,
      copies,
      purpose,
      urgency,
      deliveryMethod,
      pickupDate: deliveryMethod === 'Campus Pickup' ? pickupDate : undefined,
      courierAddress: deliveryMethod === 'Courier Delivery' ? {
        recipientName: user.name,
        phone: user.phone || '+8801711223344',
        division,
        district,
        address
      } : undefined,
      paymentMethod,
      transactionId,
      totalFee,
      uploadedDocuments: uploadedDocs,
      recipientName: recipientName || undefined,
      recipientOrg: recipientOrg || undefined,
      recipientEmail: recipientEmail || undefined
    });

    setCreatedTrackingId(trackingId);
    setStep(7);
    showToast(`Request submitted successfully! Tracking ID: ${trackingId}`, 'success');
  };

  const selectedServices = serviceCatalog.filter(s => selectedServiceIds.includes(s.id));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Official University Documents & Services" maxWidth="3xl">
      
      {/* Step Tracker */}
      {step <= 6 && (
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100 text-[11px] font-bold text-slate-500 overflow-x-auto gap-2">
          <span className={step === 1 ? 'text-[#0F2A4A] underline' : step > 1 ? 'text-emerald-700' : ''}>1. Service</span>
          <span>→</span>
          <span className={step === 2 ? 'text-[#0F2A4A] underline' : step > 2 ? 'text-emerald-700' : ''}>2. Details</span>
          <span>→</span>
          <span className={step === 3 ? 'text-[#0F2A4A] underline' : step > 3 ? 'text-emerald-700' : ''}>3. Documents</span>
          <span>→</span>
          <span className={step === 4 ? 'text-[#0F2A4A] underline' : step > 4 ? 'text-emerald-700' : ''}>4. Delivery</span>
          <span>→</span>
          <span className={step === 5 ? 'text-[#0F2A4A] underline' : step > 5 ? 'text-emerald-700' : ''}>5. Payment</span>
          <span>→</span>
          <span className={step === 6 ? 'text-[#0F2A4A] underline' : ''}>6. Review</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Select Official Service(s) (Multi-select allowed)
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              You can bundle multiple certificates and transcripts into a single combined order.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
            {serviceCatalog.map((s) => {
              const isSelected = selectedServiceIds.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSelectService(s.id)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#0F2A4A] bg-[#0F2A4A]/5 ring-1 ring-[#0F2A4A]'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-slate-900">{s.name}</span>
                    <span className="font-extrabold text-xs text-[#0F2A4A]">BDT {s.fee}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-semibold">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{s.category}</span>
                    <span>• {s.processingDays} days regular</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-600">
              Selected: <strong>{selectedServiceIds.length}</strong> service(s)
            </span>
            <Button variant="primary" onClick={() => setStep(2)}>
              Next: Document Details →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Details */}
      {step === 2 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Number of Copies
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="w-8 h-8 rounded-lg border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  -
                </button>
                <span className="font-bold text-sm px-2">{copies}</span>
                <button
                  type="button"
                  onClick={() => setCopies(copies + 1)}
                  className="w-8 h-8 rounded-lg border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Purpose of Request *
              </label>
              <select
                value={purpose}
                onChange={(e: any) => setPurpose(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900"
              >
                <option value="Higher Study">Higher Study Abroad</option>
                <option value="Job">Employment / Job Application</option>
                <option value="Visa">Immigration / Visa Processing</option>
                <option value="Personal">Personal Records</option>
                <option value="Other">Other Institutional Requirement</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e: any) => setUrgency(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900"
              >
                <option value="Normal">Normal (Standard SLA)</option>
                <option value="Urgent">Urgent (Express 3-4 days, +Fee)</option>
                <option value="Express">Express (24-48 hours, +Double Fee)</option>
              </select>
            </div>
          </div>

          {/* Verification specific recipient */}
          {selectedServiceIds.some(id => id === 'srv-006' || id === 'srv-005') && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <Building className="w-4 h-4" /> Recipient Institution (For Direct Dispatch)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  label="Contact Person"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Dean of Admissions"
                />
                <Input
                  label="University / Employer"
                  value={recipientOrg}
                  onChange={(e) => setRecipientOrg(e.target.value)}
                  placeholder="e.g. TU Berlin or WES"
                />
                <Input
                  label="Official Verification Email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="verification@tu-berlin.de"
                />
              </div>
            </div>
          )}

          {/* Auto-filled BAUST Academic Snapshot */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-600">
            <div>
              <span className="font-bold text-slate-900">Auto-filled Student ID:</span> {user.studentId || '15CSE042'} • {user.department} ({user.batch || '1st Batch'})
            </div>
            <Badge variant="approved" size="sm">Verified Alum</Badge>
          </div>

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep(3)}>
              Next: Upload Documents →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Supporting Documents */}
      {step === 3 && (
        <div className="space-y-4 text-xs">
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Upload Required Supporting Files
          </label>
          <p className="text-slate-500">
            Please attach your Student ID Card scan, Clearance slip, or previous document copy.
          </p>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
            <Upload className="w-8 h-8 text-[#0F2A4A] mx-auto mb-2" />
            <div className="font-semibold text-slate-800">Drag & Drop or Click to Upload</div>
            <p className="text-[11px] text-slate-400 mt-1">PDF, JPG, PNG up to 10MB each</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => showToast('Mock document uploaded.', 'info')}
            >
              Browse Files
            </Button>
          </div>

          {/* Uploaded List */}
          <div className="space-y-2">
            {uploadedDocs.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{doc.name}</span>
                  <span className="text-slate-400">({doc.size})</span>
                </div>
                <span className="text-emerald-700 font-bold">Uploaded</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep(4)}>
              Next: Delivery Method →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Delivery */}
      {step === 4 && (
        <div className="space-y-4 text-xs">
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
            Choose Delivery Option
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'Courier Delivery' as DeliveryMethod, title: 'Courier Delivery', desc: 'Delivered to your home/office address via SA Paribahan or Sundarban (+BDT 100-150)' },
              { id: 'Campus Pickup' as DeliveryMethod, title: 'Campus Pickup', desc: 'Collect directly from Registrar / Exam Controller office at Saidpur Cantonment' },
              { id: 'Email PDF' as DeliveryMethod, title: 'Email Soft Copy (PDF)', desc: 'Official digitally signed PDF with QR verification code' },
              { id: 'Send Directly to Institution' as DeliveryMethod, title: 'Direct to Institution', desc: 'Registrar dispatches official package to foreign university or employer' }
            ].map(m => (
              <div
                key={m.id}
                onClick={() => setDeliveryMethod(m.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === m.id
                    ? 'border-[#0F2A4A] bg-[#0F2A4A]/5 ring-1 ring-[#0F2A4A]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">{m.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Conditional details */}
          {deliveryMethod === 'Courier Delivery' && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2E5E3E]" /> Delivery Address in Bangladesh
              </span>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Division" value={division} onChange={(e) => setDivision(e.target.value)} />
                <Input label="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
              </div>
              <Input label="Full Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          )}

          {deliveryMethod === 'Campus Pickup' && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2E5E3E]" /> Preferred Pickup Date
              </span>
              <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
              <p className="text-[11px] text-slate-500">
                Pickups available Sunday through Thursday, 9:00 AM - 3:00 PM at Exam Controller Wing.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(3)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep(5)}>
              Next: Payment →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5: Payment (Mock) */}
      {step === 5 && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Calculated Fee</div>
              <div className="text-3xl font-extrabold text-[#C9A227]">BDT {totalFee}</div>
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <div>{copies} Copy(ies) • {urgency} Processing</div>
              <div>{deliveryMethod}</div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Mock Payment Method
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['bKash', 'Nagad', 'Bank Deposit', 'Card'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPaymentMethod(p)}
                  className={`p-3 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                    paymentMethod === p
                      ? 'border-[#0F2A4A] bg-[#0F2A4A] text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900">Payment Verification Details</span>
            <p className="text-[11px] text-slate-500">
              For demo demonstration, enter any transaction reference ID. The accounts desk will record it as verified.
            </p>
            <Input
              label="Transaction ID (TrxID)"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. BK9A87X41Q"
            />
          </div>

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(4)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={() => setStep(6)}>
              Next: Review & Submit →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 6: Review & Final Submit */}
      {step === 6 && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Requested Services:</span>
              <span className="text-slate-900 font-bold">{selectedServices.map(s => s.name).join(' + ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Copies:</span>
              <span className="font-bold text-slate-900">{copies}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Urgency:</span>
              <span className="font-bold text-navy">{urgency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery:</span>
              <span className="font-bold text-slate-900">{deliveryMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Payable:</span>
              <span className="font-extrabold text-sm text-[#0F2A4A]">BDT {totalFee} ({paymentMethod})</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              By submitting, you authorize the Office of the Registrar to verify your records in the BAUST graduation archives.
            </span>
          </div>

          <div className="flex justify-between pt-3">
            <Button variant="outline" onClick={() => setStep(5)}>
              ← Back
            </Button>
            <Button variant="primary" onClick={handleFinalSubmit}>
              Submit Request Order
            </Button>
          </div>
        </div>
      )}

      {/* STEP 7: Success Screen with Receipt & Tracking ID */}
      {step === 7 && (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-navy">Service Request Registered!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your official request has been queued in the University Admin Desk.
            </p>
          </div>

          {/* Tracking ID Badge */}
          <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 max-w-sm mx-auto">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Unique Tracking ID</div>
            <div className="text-2xl font-extrabold text-[#0F2A4A] tracking-wider my-1">
              {createdTrackingId}
            </div>
            <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1 mt-1">
              <QrCode className="w-3.5 h-3.5 text-navy" /> QR Code Authenticated
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => showToast('Receipt PDF downloaded.', 'info')}
            >
              Download Receipt
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              View in My Requests
            </Button>
          </div>
        </div>
      )}

    </Modal>
  );
};
