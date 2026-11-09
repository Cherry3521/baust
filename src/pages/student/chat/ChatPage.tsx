import React, { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { initialConversations, ChatConversation, ChatMessage } from '../../../data/chatData';
import { useLanguage } from '../../../hooks/useLanguage';
import { 
  Send, Search, Paperclip, CheckCheck, FileText, Download, UserCheck, 
  Phone, Video, Info, ArrowLeft 
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const { language } = useLanguage();
  const [conversations, setConversations] = useState<ChatConversation[]>(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string>(initialConversations[0]?.id || 'conv-1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileList, setShowMobileList] = useState(false);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConvId);

  const handleSendMessage = () => {
    if (!inputText.trim() || !activeConv) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'std-101',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          lastMessage: inputText.trim(),
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
    setInputText('');

    // Mock automatic reply from alumni mentor after 2 seconds
    if (activeConv?.participantRole === 'alumni') {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          senderId: activeConv.participantId,
          text: `Thanks for following up! Let's continue working on this during our scheduled mentoring session. Keep refining your project work in the meantime.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setConversations(prev => prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        }));
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] min-h-[600px] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex h-full">
        {/* Left Conversations Sidebar */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50 ${
          showMobileList ? 'block' : 'hidden md:flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <h1 className="text-xl font-bold text-[#0F2A4A] mb-3">
              {language === 'bn' ? 'বার্তা ও সংযোগ' : 'Messages & Chats'}
            </h1>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'নাম বা চ্যাট খুঁজুন...' : 'Search conversations...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No active conversations found
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = conv.id === activeConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setActiveConvId(conv.id);
                      setShowMobileList(false);
                    }}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-white shadow-sm border-l-4 border-l-[#0F2A4A]' : 'hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={conv.participantAvatar}
                        alt={conv.participantName}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">
                          {conv.participantName}
                        </h4>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mb-1">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Badge variant={conv.participantRole === 'alumni' ? 'primary' : 'neutral'} size="sm">
                          {conv.participantRole.toUpperCase()}
                        </Badge>
                        {conv.unreadCount > 0 && (
                          <span className="ml-auto bg-[#0F2A4A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Thread Area */}
        {activeConv ? (
          <div className={`flex-1 flex flex-col bg-slate-50/30 ${
            showMobileList ? 'hidden md:flex' : 'flex'
          }`}>
            {/* Thread Header */}
            <div className="h-16 px-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-1.5 text-slate-500 hover:text-slate-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={activeConv.participantAvatar}
                    alt={activeConv.participantName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  {activeConv.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    {activeConv.participantName}
                    <Badge variant={activeConv.participantRole === 'alumni' ? 'primary' : 'neutral'} size="sm">
                      {activeConv.participantRole}
                    </Badge>
                  </h3>
                  <p className="text-xs text-slate-500 truncate max-w-xs">
                    {activeConv.participantDesignation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-500">
                <button 
                  onClick={() => alert('Starting voice call via BAUST Bridge...')}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition" 
                  title="Voice Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert('Starting secure video room via BAUST Bridge...')}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition" 
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowInfoSidebar(!showInfoSidebar)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition" 
                  title="Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
              <div className="text-center my-2">
                <span className="text-[11px] font-medium bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
                  BAUST Career Bridge Verified Encryption • Direct Academic Channel
                </span>
              </div>

              {activeConv.messages.map(msg => {
                const isMe = msg.senderId === user?.id || msg.senderId === 'std-101';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        isMe
                          ? 'bg-[#0F2A4A] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Attachment preview if any */}
                      {msg.attachment && (
                        <div className={`mt-2.5 p-2.5 rounded-xl border flex items-center justify-between gap-3 ${
                          isMe ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-6 h-6 shrink-0 text-[#C9A227]" />
                            <div className="truncate">
                              <p className="text-xs font-semibold truncate">{msg.attachment.name}</p>
                              <p className="text-[10px] opacity-75">{msg.attachment.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => alert(`Downloading attachment: ${msg.attachment?.name}`)}
                            className="p-1.5 hover:bg-black/10 rounded-lg transition"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400 px-1">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <button 
                onClick={() => alert('Attachment selector: You can attach your PDF resume, code sample, or cover letter.')}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
                title="Attach Document"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder={language === 'bn' ? 'বার্তা লিখুন...' : 'Type your message or question...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="!px-4 shrink-0"
              >
                <Send className="w-4 h-4 mr-1.5" />
                {language === 'bn' ? 'পাঠান' : 'Send'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <p>Select a conversation to start chatting</p>
          </div>
        )}

        {/* Optional Right Participant Info Drawer */}
        {showInfoSidebar && activeConv && (
          <div className="w-72 border-l border-slate-200 p-5 bg-white flex flex-col gap-4">
            <div className="text-center">
              <img
                src={activeConv.participantAvatar}
                alt={activeConv.participantName}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-slate-200 mb-3"
              />
              <h3 className="font-bold text-slate-800">{activeConv.participantName}</h3>
              <p className="text-xs text-slate-500 capitalize">{activeConv.participantRole} Mentor</p>
              <p className="text-xs text-slate-400 mt-1">{activeConv.participantDesignation}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-600 font-semibold">Verified Member</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Platform ID</span>
                <span className="font-mono text-[11px]">{activeConv.participantId}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfoSidebar(false)}
              className="mt-auto"
            >
              Close Info
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
