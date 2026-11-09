export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: 'alumni' | 'student';
  participantDesignation: string;
  online: boolean;
  lastActive?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export const initialConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    participantId: 'alm-1',
    participantName: 'Tanzil Ahmed Chowdhury',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    participantRole: 'alumni',
    participantDesignation: 'Principal Software Engineer at Grameenphone',
    online: true,
    lastMessage: 'I reviewed your backend project. The caching logic in Redis looks solid!',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'std-101',
        text: 'Salam Tanzil bhaiya! Thank you for accepting my mentorship request for interview prep.',
        timestamp: 'Yesterday, 04:30 PM'
      },
      {
        id: 'm2',
        senderId: 'alm-1',
        text: 'Walaykumsalam Ahsan! Always happy to support fellow BAUST CSEians. Please share your latest resume and GitHub link.',
        timestamp: 'Yesterday, 05:15 PM'
      },
      {
        id: 'm3',
        senderId: 'std-101',
        text: 'Here is my updated resume with the distributed KV store capstone project attached.',
        timestamp: 'Yesterday, 05:20 PM',
        attachment: {
          name: 'Ahsan_Habib_CSE_Backend_Resume_v2.pdf',
          size: '320 KB',
          type: 'pdf'
        }
      },
      {
        id: 'm4',
        senderId: 'alm-1',
        text: 'I reviewed your backend project. The caching logic in Redis looks solid! We will do a mock system design interview during our Friday session.',
        timestamp: '10:45 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    participantId: 'alm-4',
    participantName: 'Sabbir Hossain Suman',
    participantAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    participantRole: 'alumni',
    participantDesignation: 'Senior ML Engineer at bKash',
    online: false,
    lastActive: '5 hours ago',
    lastMessage: 'Check out the fast.ai Practical Deep Learning course lessons 1-4.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm2-1',
        senderId: 'std-101',
        text: 'Bhaiya, between PyTorch and TensorFlow, what does bKash data intelligence team prefer?',
        timestamp: 'Yesterday, 02:10 PM'
      },
      {
        id: 'm2-2',
        senderId: 'alm-4',
        text: 'We are completely on PyTorch and Triton Inference Server for new fraud detection models. Check out the fast.ai Practical Deep Learning course lessons 1-4.',
        timestamp: 'Yesterday, 03:00 PM'
      }
    ]
  },
  {
    id: 'conv-3',
    participantId: 'alm-8',
    participantName: 'Farzana Karim Chowdhury',
    participantAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    participantRole: 'alumni',
    participantDesignation: 'Lead Pentester at Brain Station 23',
    online: true,
    lastMessage: 'Start with the OSCP preparatory labs on TryHackMe, then move to HTB TJNull list.',
    lastMessageTime: 'Nov 06',
    unreadCount: 0,
    messages: [
      {
        id: 'm3-1',
        senderId: 'std-101',
        text: 'Apu, I sent a roadmap request for OSCP. Excited to learn from you!',
        timestamp: 'Nov 06, 03:00 PM'
      },
      {
        id: 'm3-2',
        senderId: 'alm-8',
        text: 'Start with the OSCP preparatory labs on TryHackMe, then move to HTB TJNull list.',
        timestamp: 'Nov 06, 05:40 PM'
      }
    ]
  }
];
