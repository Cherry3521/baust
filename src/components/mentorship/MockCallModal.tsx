import React, { useState, useEffect } from 'react';
import { MentorshipRequest } from '../../types/mentorship';
import { useMentorshipStore } from '../../hooks/useMentorshipStore';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  Share2, 
  CheckSquare, 
  Clock,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface MockCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: MentorshipRequest;
  onMarkComplete?: () => void;
}

export const MockCallModal: React.FC<MockCallModalProps> = ({
  isOpen,
  onClose,
  request,
  onMarkComplete
}) => {
  const { updateStudentNotes, toggleMentorActionItem, addMentorActionItem } = useMentorshipStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [seconds, setSeconds] = useState(24 * 60 + 15); // e.g. 24m 15s elapsed
  const [notes, setNotes] = useState(request.sessionNotesStudent || '');
  const [newActionItem, setNewActionItem] = useState('');
  const [showNotesPanel, setShowNotesPanel] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveNotes = () => {
    updateStudentNotes(request.id, notes);
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionItem.trim()) return;
    addMentorActionItem(request.id, newActionItem.trim());
    setNewActionItem('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-800">
        
        {/* Top Header Bar */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span>{request.topic} Session</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs font-medium text-slate-300">{request.mentorName}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C9A227]" />
                Session Duration: <strong className="text-emerald-400">{formatTimer(seconds)}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotesPanel(!showNotesPanel)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showNotesPanel ? 'bg-[#0F2A4A] text-[#C9A227] border border-[#C9A227]/40' : 'bg-slate-800 text-slate-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Shared Notes & Tasks
            </button>
            {onMarkComplete && (
              <button
                onClick={() => {
                  onClose();
                  onMarkComplete();
                }}
                className="px-3.5 py-1.5 bg-[#2E5E3E] hover:bg-[#3D7A52] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Mark as Done & Rate
              </button>
            )}
          </div>
        </div>

        {/* Video Canvas & Side Panel */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Video Arena */}
          <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative bg-slate-950/60">
            
            {/* Tile 1: Mentor (Tanzil or Dr. Nusrat) */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg group">
              <img
                src={request.mentorAvatar}
                alt={request.mentorName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {request.mentorName} (Mentor)
              </div>
              <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-black/60 text-[11px] text-slate-300 backdrop-blur-xs">
                {request.mentorCompany}
              </div>
            </div>

            {/* Tile 2: Student (Self) */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
              {isVideoOff ? (
                <div className="flex flex-col items-center text-slate-500">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-300">
                    AH
                  </div>
                  <span className="text-xs mt-3">Camera is off</span>
                </div>
              ) : (
                <img
                  src={request.studentAvatar}
                  alt={request.studentName}
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              )}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
                <span className={`w-2 h-2 rounded-full ${isMuted ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                {request.studentName} (You)
              </div>
            </div>

          </div>

          {/* Right Side: Shared Notes and Action Items */}
          {showNotesPanel && (
            <div className="w-84 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col text-slate-200">
              <div className="p-4 border-b border-slate-800">
                <div className="font-bold text-xs uppercase tracking-wider text-[#C9A227] flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Live Shared Session Notes
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Notes typed here persist for your post-session revision.
                </p>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* Notes Textarea */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Student Notes
                  </label>
                  <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={handleSaveNotes}
                    placeholder="Type key interview points, algorithm tips, suggested books..."
                    className="w-full rounded-xl bg-slate-800/80 border border-slate-700 p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
                  />
                  <div className="text-[10px] text-slate-400 text-right mt-1">Auto-saves on blur</div>
                </div>

                {/* Mentor Action Items */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      Action Items / Next Steps
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {request.mentorActionItems?.filter(a => a.completed).length || 0}/
                      {request.mentorActionItems?.length || 0}
                    </span>
                  </label>

                  <div className="space-y-2 mb-3">
                    {request.mentorActionItems?.map(item => (
                      <div
                        key={item.id}
                        onClick={() => toggleMentorActionItem(request.id, item.id)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border text-xs transition-colors ${
                          item.completed 
                            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300 line-through' 
                            : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-emerald-500"
                        />
                        <span className="flex-1">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add action item form */}
                  <form onSubmit={handleAddAction} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an action item..."
                      value={newActionItem}
                      onChange={(e) => setNewActionItem(e.target.value)}
                      className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#0F2A4A] border border-[#C9A227] text-[#C9A227] font-semibold text-xs hover:bg-[#163B66]"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-2xl transition-all cursor-pointer ${
              isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3.5 rounded-2xl transition-all cursor-pointer ${
              isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title={isVideoOff ? 'Start Video' : 'Stop Video'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </button>
        </div>

      </div>
    </div>
  );
};
