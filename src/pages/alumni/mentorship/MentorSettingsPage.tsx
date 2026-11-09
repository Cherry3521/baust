import React, { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  Sliders, Clock, Calendar, CheckCircle2, Plus, Trash2, Save, 
  Video, MessageSquare, FileText, ShieldAlert, Sparkles, UserCheck 
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useToast } from '../../../components/ui/Toast';

export const MentorSettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();

  const [isAvailable, setIsAvailable] = useState(true);
  const [maxMentees, setMaxMentees] = useState(5);
  const [preferredChannels, setPreferredChannels] = useState({
    video: true,
    chat: true,
    cvReview: true
  });

  const [weeklySlots, setWeeklySlots] = useState([
    { id: 'slot-1', day: 'Friday', startTime: '08:00 PM', endTime: '09:00 PM', capacity: 2 },
    { id: 'slot-2', day: 'Saturday', startTime: '07:30 PM', endTime: '08:30 PM', capacity: 2 },
    { id: 'slot-3', day: 'Saturday', startTime: '09:00 PM', endTime: '10:00 PM', capacity: 2 }
  ]);

  const [newDay, setNewDay] = useState('Friday');
  const [newStartTime, setNewStartTime] = useState('08:00 PM');
  const [newEndTime, setNewEndTime] = useState('09:00 PM');

  const [topics, setTopics] = useState([
    { id: 'top-1', label: 'Software Architecture & System Design', checked: true },
    { id: 'top-2', label: 'Technical Coding Interview Prep (LeetCode / DSA)', checked: true },
    { id: 'top-3', label: 'Full-Stack Web Development & Cloud (AWS/GCP)', checked: true },
    { id: 'top-4', label: 'Higher Studies in Germany / Europe (DAAD, TU9)', checked: true },
    { id: 'top-5', label: 'Resume & ATS Optimization', checked: true },
    { id: 'top-6', label: 'Civil Service (BCS) & Govt. Engineering Jobs', checked: false },
    { id: 'top-7', label: 'Telecom & Network Engineering', checked: false }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const handleAddSlot = () => {
    const newSlot = {
      id: `slot-${Date.now()}`,
      day: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
      capacity: 2
    };
    setWeeklySlots(prev => [...prev, newSlot]);
  };

  const handleRemoveSlot = (id: string) => {
    setWeeklySlots(prev => prev.filter(s => s.id !== id));
  };

  const handleToggleTopic = (id: string) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const handleSave = () => {
    setIsSaving(true);
    // TODO: replace with API call
    setTimeout(() => {
      setIsSaving(false);
      showToast({
        title: language === 'bn' ? 'সেটিংস সংরক্ষিত' : 'Mentor Settings Saved',
        message: language === 'bn' ? 'আপনার সাপ্তাহিক স্লট ও পরামর্শ পছন্দসমূহ আপডেট করা হয়েছে।' : 'Your consultation slots and availability preferences have been saved.',
        type: 'success'
      });
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A4A] flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#C9A227]" />
            {language === 'bn' ? 'পরামর্শ ও স্লট সেটিংস' : 'Mentorship Slot & Availability Settings'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your free time availability, booking windows, and consultation preferences.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#2E5E3E] hover:bg-[#254d33] text-white shadow"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Availability Status & Capacity */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-4">Availability Switch</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  {isAvailable ? 'Actively Accepting Students' : 'Temporarily Away (Paused)'}
                </span>
                <span className="text-xs text-slate-500">
                  {isAvailable ? 'Your profile appears as "Available" in the student directory.' : 'Students cannot book new consultation slots.'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-6 h-6 accent-[#2E5E3E] cursor-pointer"
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-2">Max Active Mentees</h3>
            <p className="text-xs text-slate-500 mb-4">
              Prevent burnout by capping concurrent ongoing mentorship tracks.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-800">
                <span>Capacity Limit</span>
                <span className="text-[#0F2A4A] font-extrabold text-base">{maxMentees} Students / Month</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={maxMentees}
                onChange={(e) => setMaxMentees(Number(e.target.value))}
                className="w-full accent-[#0F2A4A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>1 (Light)</span>
                <span>8 (Recommended)</span>
                <span>15 (High)</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-[#0F2A4A] mb-3">Service Channels</h3>
            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#2E5E3E]" />
                  <span className="text-xs font-semibold text-slate-700">Live Video Consultation</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferredChannels.video}
                  onChange={(e) => setPreferredChannels({ ...preferredChannels, video: e.target.checked })}
                  className="w-4 h-4 accent-[#2E5E3E]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-xs font-semibold text-slate-700">Async CV Review & Rubric</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferredChannels.cvReview}
                  onChange={(e) => setPreferredChannels({ ...preferredChannels, cvReview: e.target.checked })}
                  className="w-4 h-4 accent-[#2E5E3E]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0F2A4A]" />
                  <span className="text-xs font-semibold text-slate-700">Direct In-App Chat</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferredChannels.chat}
                  onChange={(e) => setPreferredChannels({ ...preferredChannels, chat: e.target.checked })}
                  className="w-4 h-4 accent-[#2E5E3E]"
                />
              </label>
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Weekly Slots & Topics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Recurring Time Slots */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F2A4A] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#2E5E3E]" />
                  Weekly Consultation Slots
                </h3>
                <p className="text-xs text-slate-500">Students pick from these pre-approved slots when booking sessions</p>
              </div>
              <Badge variant="primary">{weeklySlots.length} Slots Active</Badge>
            </div>

            <div className="space-y-3 mb-6">
              {weeklySlots.map(slot => (
                <div
                  key={slot.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-bold text-slate-800 text-sm">{slot.day}</span>
                      <span className="text-xs text-slate-500 ml-2">
                        {slot.startTime} – {slot.endTime} (BDT)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSlot(slot.id)}
                    className="text-slate-400 hover:text-rose-600 transition p-1"
                    title="Remove Slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Slot Control */}
            <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 mb-2 block">Add New Recurring Slot</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Day of Week</label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Friday">Friday (Weekend)</option>
                    <option value="Saturday">Saturday (Weekend)</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Start Time</label>
                  <input
                    type="text"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">End Time</label>
                  <input
                    type="text"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={handleAddSlot}>
                <Plus className="w-4 h-4 mr-1.5" />
                Add Recurring Slot
              </Button>
            </div>
          </Card>

          {/* Mentoring Topics */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#0F2A4A] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C9A227]" />
              Mentoring Focus Areas
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select topics you are comfortable guiding students in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map(topic => (
                <label
                  key={topic.id}
                  className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center gap-3 transition ${
                    topic.checked
                      ? 'bg-blue-50/60 border-blue-200 text-[#0F2A4A] font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={topic.checked}
                    onChange={() => handleToggleTopic(topic.id)}
                    className="w-4 h-4 accent-[#0F2A4A] rounded"
                  />
                  <span>{topic.label}</span>
                </label>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#2E5E3E] hover:bg-[#254d33] text-white px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving Changes...' : 'Save All Settings'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
