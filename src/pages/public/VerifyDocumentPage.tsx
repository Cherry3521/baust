import React, { useState } from 'react';
import { useAdminDeskStore } from '../../hooks/useAdminDeskStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  GraduationCap, 
  Building,
  Calendar,
  FileCheck2,
  Printer
} from 'lucide-react';

export const VerifyDocumentPage: React.FC = () => {
  const { serviceRequests } = useAdminDeskStore();
  const [query, setQuery] = useState('BCB-2026-000101');
  const [searched, setSearched] = useState(true);

  // Search by tracking ID or digital document code
  const result = serviceRequests.find(
    r => r.id.toLowerCase() === query.trim().toLowerCase() ||
         (r.digitalDocumentCode && r.digitalDocumentCode.toLowerCase() === query.trim().toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F2A4A] to-[#2E5E3E] text-[#C9A227] flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Official BAUST Document Verification Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Public verification portal for foreign universities, embassies, and employers to validate genuine academic certificates & transcripts issued by BAUST.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="flex-1">
            <Input
              placeholder="Enter Tracking ID (e.g. BCB-2026-000101) or Verification Code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 shadow-none focus:ring-0 text-xs sm:text-sm"
            />
          </div>
          <Button type="submit" variant="primary" size="md" leftIcon={<Search className="w-4 h-4" />}>
            Verify Now
          </Button>
        </div>
        <div className="text-[11px] text-slate-400 mt-2 text-center">
          Try sample codes: <strong className="text-navy cursor-pointer" onClick={() => setQuery('BCB-2026-000101')}>BCB-2026-000101</strong>, <strong className="text-navy cursor-pointer" onClick={() => setQuery('BCB-2026-000102')}>BCB-2026-000102</strong>, or <strong className="text-navy cursor-pointer" onClick={() => setQuery('BCB-2026-000119')}>BCB-2026-000119</strong>
        </div>
      </form>

      {/* Verification Result Card */}
      {searched && (
        <div className="max-w-2xl mx-auto">
          {result ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/80 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header verification banner */}
              <div className="p-6 bg-gradient-to-r from-emerald-800 to-[#2E5E3E] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-200 block">
                      Authenticity Confirmed
                    </span>
                    <h3 className="text-lg font-extrabold text-white">
                      Valid Official BAUST Document
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant="gold" size="sm">SEALED & AUTHENTICATED</Badge>
                </div>
              </div>

              {/* Document Certificate Body */}
              <div className="p-6 space-y-6 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Tracking Number:</span>
                    <span className="font-mono font-bold text-sm text-navy">{result.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Digital Document Code:</span>
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {result.digitalDocumentCode || 'BAUST-AUTH-9912-VERIFIED'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="font-bold text-slate-900 text-sm">{result.alumniName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">BAUST Student ID:</span>
                    <span className="font-mono font-bold text-slate-900">{result.alumniBaustId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Degree & Department:</span>
                    <span className="font-semibold text-slate-900">
                      B.Sc. in {result.alumniDept} ({result.alumniBatch})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passing Year:</span>
                    <span className="font-semibold text-slate-900">{result.alumniPassingYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">CGPA:</span>
                    <span className="font-bold text-navy">{result.alumniCgpa.toFixed(2)} on a 4.00 Scale</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Document Issued:</span>
                    <span className="font-bold text-slate-900">{result.serviceNames.join(' + ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issue Date:</span>
                    <span className="font-semibold text-slate-900">
                      {new Date(result.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* QR Code & Institutional Stamp */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
                      <QrCode className="w-12 h-12 text-[#0F2A4A]" />
                    </div>
                    <div>
                      <div className="font-bold text-navy text-xs">Registrar Authentication Registry</div>
                      <div className="text-[10px] text-slate-400">
                        Bangladesh Army University of Science & Technology
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        ✓ Digital Signature Stamped
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-navy hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer font-semibold text-xs"
                  >
                    <Printer className="w-4 h-4" /> Print Verification
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rose-200 p-8 text-center space-y-3 shadow-md animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Document Record Not Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No official record matching code "<strong>{query}</strong>" was found in the BAUST Academic Records archive. Please verify the code or contact the Registrar Office directly.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
