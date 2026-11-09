import { CVReviewItem } from '../types/mentorship';

export const initialCVReviews: CVReviewItem[] = [
  {
    id: 'cvr-001',
    studentId: 'std-101',
    studentName: 'Ahsan Habib',
    studentDept: 'CSE',
    studentBatch: '8th Batch (2022)',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-1',
    mentorName: 'Tanzil Ahmed Chowdhury',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Grameenphone Ltd.',
    targetRole: 'Junior Backend Software Engineer (Go / Node.js)',
    version: 'v2',
    fileName: 'Ahsan_Habib_CSE_Backend_Resume_v2.pdf',
    fileSize: '320 KB',
    submittedAt: '2026-11-04T10:00:00Z',
    deadlinePreference: 'Within 3 days',
    studentNotes: 'Updated the project bullet points with metrics (throughput, latency) based on your v1 feedback!',
    status: 'Reviewed',
    reviewedAt: '2026-11-06T15:30:00Z',
    overallRating: 5,
    totalScore: 92,
    categoryScores: {
      formatting: 94,
      contentQuality: 92,
      skillsPresentation: 90,
      projectsExperience: 95,
      grammarLanguage: 90,
      atsFriendliness: 91
    },
    strengths: [
      'Crisp single-page clean modern typography with zero clutter.',
      'Strong quantifiable metrics: "Reduced Redis memory footprint by 28%".',
      'Clear tech stack badges for each project (Go, Docker, PostgreSQL).'
    ],
    areasToImprove: [
      'Add live deployment URL and GitHub repository link for the capstone distributed KV store.',
      'Group programming languages strictly by proficiency.'
    ],
    sectionComments: {
      summary: 'Concise 2-sentence summary targeting high-throughput backend systems. Excellent.',
      education: 'BAUST degree, CGPA, and coursework clearly placed.',
      skills: 'Well separated into Languages, Frameworks, and Cloud Infrastructure.',
      projects: 'Major improvement over v1! Impact statements stand out.',
      experience: 'Internship responsibilities reflect real ownership.'
    },
    overallMessage: 'Tremendous progress from v1! This resume is now ready for top tech screening at Grameenphone, Brain Station 23, and BJIT.',
    thankYouSent: true
  },
  {
    id: 'cvr-002',
    studentId: 'std-101',
    studentName: 'Ahsan Habib',
    studentDept: 'CSE',
    studentBatch: '8th Batch (2022)',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-1',
    mentorName: 'Tanzil Ahmed Chowdhury',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Grameenphone Ltd.',
    targetRole: 'Junior Backend Software Engineer',
    version: 'v1',
    fileName: 'Ahsan_Habib_CSE_Backend_Resume_v1.pdf',
    fileSize: '410 KB',
    submittedAt: '2026-10-22T08:00:00Z',
    deadlinePreference: 'Standard (5-7 days)',
    studentNotes: 'First draft targeting software firms in Dhaka.',
    status: 'Reviewed',
    reviewedAt: '2026-10-25T11:00:00Z',
    overallRating: 4,
    totalScore: 74,
    categoryScores: {
      formatting: 78,
      contentQuality: 70,
      skillsPresentation: 75,
      projectsExperience: 72,
      grammarLanguage: 82,
      atsFriendliness: 67
    },
    strengths: [
      'Solid academic background and high relevant course marks.',
      'Active GitHub contributions shown.'
    ],
    areasToImprove: [
      'Two pages is too long for a fresh graduate with 1 internship; condense to exactly 1 page.',
      'Bullet points describe what the project was, not what YOU built or achieved.',
      'Tables and multi-column tables cause ATS parser failures.'
    ],
    sectionComments: {
      summary: 'A bit generic. Tailor it to backend distributed systems.',
      projects: 'Missing metrics like request rate or database schema size.',
      skills: 'Do not put Microsoft Office or Windows in a CS engineering resume.'
    },
    overallMessage: 'Good foundation. Please simplify layout to 1 column, remove rating stars on skills, and resubmit as v2.',
    thankYouSent: true
  },
  {
    id: 'cvr-003',
    studentId: 'std-102',
    studentName: 'Sadia Sultana',
    studentDept: 'EEE',
    studentBatch: '7th Batch (2021)',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-2',
    mentorName: 'Dr. Nusrat Jahan',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Technical University of Berlin (TU Berlin)',
    targetRole: 'Academic CV for German MSc & DAAD Scholarship',
    version: 'v1',
    fileName: 'Sadia_Sultana_Academic_CV_Europass.pdf',
    fileSize: '290 KB',
    submittedAt: '2026-10-18T14:00:00Z',
    deadlinePreference: 'Urgent (1-2 days)',
    studentNotes: 'Applying for TU Munich and TU Berlin Renewable Energy MSc.',
    status: 'Reviewed',
    reviewedAt: '2026-10-20T18:00:00Z',
    overallRating: 5,
    totalScore: 95,
    categoryScores: {
      formatting: 96,
      contentQuality: 95,
      skillsPresentation: 94,
      projectsExperience: 96,
      grammarLanguage: 95,
      atsFriendliness: 94
    },
    strengths: [
      'Follows European academic standard format perfectly.',
      'Undergraduate thesis details and lab experimental methods clearly highlighted.',
      'Detailed list of IEEE student branch leadership activities.'
    ],
    areasToImprove: [
      'Add the exact German equivalent grade calculated by Bavarian formula alongside Bangladeshi CGPA.'
    ],
    sectionComments: {
      education: 'Excellent. Add credit breakdown in Renewable Energy.',
      projects: 'Superb explanation of solar cell degradation test bench.',
      skills: 'MATLAB/Simulink and PVsyst proficiencies clearly noted.'
    },
    overallMessage: 'Outstanding academic CV! This will be highly competitive for German universities and DAAD committee reviewers.',
    thankYouSent: true
  },
  {
    id: 'cvr-004',
    studentId: 'std-104',
    studentName: 'Naimur Rahman',
    studentDept: 'CSE',
    studentBatch: '8th Batch (2022)',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-5',
    mentorName: 'Mahmuda Akter Rimi',
    mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Samsung R&D Institute Bangladesh (SRBD)',
    targetRole: 'Junior Android / Mobile Software Engineer',
    version: 'v1',
    fileName: 'Naimur_Rahman_Android_Engineer_CV.pdf',
    fileSize: '350 KB',
    submittedAt: '2026-11-01T12:00:00Z',
    deadlinePreference: 'Within 3 days',
    studentNotes: 'Targeting Samsung R&D and local tech companies.',
    status: 'Reviewed',
    reviewedAt: '2026-11-03T17:00:00Z',
    overallRating: 4,
    totalScore: 86,
    categoryScores: {
      formatting: 88,
      contentQuality: 85,
      skillsPresentation: 88,
      projectsExperience: 84,
      grammarLanguage: 89,
      atsFriendliness: 82
    },
    strengths: [
      'Clean modern layout.',
      'Clear mention of Kotlin, Coroutines, Flow, and Jetpack Compose.',
      'Play Store links for 2 published mobile applications.'
    ],
    areasToImprove: [
      'Mention architecture patterns used (MVVM / Clean Architecture / MVI).',
      'Add unit test coverage details with Mockk/JUnit.'
    ],
    sectionComments: {
      projects: 'Specify whether state management was handled via StateFlow or LiveData.',
      experience: 'Good internship summary.'
    },
    overallMessage: 'Very strong mobile engineering CV. Fix the architecture bullet points and you will easily pass technical resume screening.',
    thankYouSent: true
  },
  {
    id: 'cvr-005',
    studentId: 'std-107',
    studentName: 'Zubair Hossain',
    studentDept: 'CSE',
    studentBatch: '8th Batch (2022)',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-8',
    mentorName: 'Farzana Karim Chowdhury',
    mentorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Brain Station 23',
    targetRole: 'Associate Pentester & Security Analyst',
    version: 'v1',
    fileName: 'Zubair_Hossain_Cybersecurity_Resume.pdf',
    fileSize: '280 KB',
    submittedAt: '2026-11-06T15:00:00Z',
    deadlinePreference: 'Within 3 days',
    studentNotes: 'Included HackTheBox profile link, writeups, and TryHackMe top 5% badge.',
    status: 'In Review',
    overallMessage: 'Currently analyzing your vulnerability disclosure and CTF section.'
  },
  {
    id: 'cvr-006',
    studentId: 'std-103',
    studentName: 'Mehedi Hasan',
    studentDept: 'Civil',
    studentBatch: '7th Batch (2021)',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-15',
    mentorName: 'Engr. Mehedi Hasan Bappy',
    mentorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'MAX Group',
    targetRole: 'Site & Structural Civil Engineer',
    version: 'v1',
    fileName: 'Mehedi_Hasan_Civil_Engineering_CV.pdf',
    fileSize: '390 KB',
    submittedAt: '2026-11-07T09:00:00Z',
    deadlinePreference: 'Standard (5-7 days)',
    studentNotes: 'Highlighting AutoCAD, ETABS, and site surveying practical experience.',
    status: 'Submitted'
  },
  {
    id: 'cvr-007',
    studentId: 'std-109',
    studentName: 'Tasnim Jahan',
    studentDept: 'BBA',
    studentBatch: '8th Batch (2022)',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-17',
    mentorName: 'Sabrina Mostafa',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Unilever Bangladesh Ltd.',
    targetRole: 'Management Trainee / FMCG Brand Marketing',
    version: 'v2',
    fileName: 'Tasnim_Jahan_FMCG_Brand_CV_v2.pdf',
    fileSize: '295 KB',
    submittedAt: '2026-10-24T11:00:00Z',
    deadlinePreference: 'Within 3 days',
    studentNotes: 'Re-written club achievements with ROI numbers as suggested in v1.',
    status: 'Reviewed',
    reviewedAt: '2026-10-26T16:00:00Z',
    overallRating: 5,
    totalScore: 91,
    categoryScores: {
      formatting: 92,
      contentQuality: 90,
      skillsPresentation: 91,
      projectsExperience: 92,
      grammarLanguage: 94,
      atsFriendliness: 88
    },
    strengths: [
      'Bold headline highlighting marketing case competition honors.',
      'Action-verb driven achievements: "Boosted event attendance by 140% via targeted social ads".',
      'Professional single-page layout perfectly fitted for FMCG assessment centers.'
    ],
    areasToImprove: [
      'Clarify analytical tools like Google Analytics 4 or PowerBI in the skills table.'
    ],
    sectionComments: {
      summary: 'Engaging, creative, and professional.',
      experience: 'Well presented internship at local advertising agency.'
    },
    overallMessage: 'Superb revision! Ready to submit to Unilever BizMaestros and BAT Battle of Minds.',
    thankYouSent: true
  },
  {
    id: 'cvr-008',
    studentId: 'std-105',
    studentName: 'Shanto Islam',
    studentDept: 'Textile',
    studentBatch: '7th Batch (2021)',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    mentorId: 'men-alm-9',
    mentorName: 'Engr. Nazmul Huda',
    mentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    mentorCompany: 'Square Textiles Ltd.',
    targetRole: 'Trainee Officer (Dyeing & Wet Processing)',
    version: 'v1',
    fileName: 'Shanto_Islam_Textile_Engineer_Resume.pdf',
    fileSize: '310 KB',
    submittedAt: '2026-10-11T13:00:00Z',
    deadlinePreference: 'Standard (5-7 days)',
    studentNotes: 'Looking to apply for Square, Beximco, and DBL Group textile mills.',
    status: 'Reviewed',
    reviewedAt: '2026-10-14T19:00:00Z',
    overallRating: 5,
    totalScore: 89,
    categoryScores: {
      formatting: 90,
      contentQuality: 88,
      skillsPresentation: 89,
      projectsExperience: 87,
      grammarLanguage: 92,
      atsFriendliness: 88
    },
    strengths: [
      'Highlights laboratory equipment skills (Spectrophotometer, Datacolor, Padding Mangle).',
      'Industrial training at Beximco Industrial Park clearly documented.'
    ],
    areasToImprove: [
      'Include safety and compliance certifications (OEKO-TEX, ISO 9001).'
    ],
    sectionComments: {
      education: 'Good emphasis on wet processing majors.',
      projects: 'Denim enzyme wash experiment described with precision.'
    },
    overallMessage: 'Very solid textile resume. The plant managers will appreciate your specific dye chemical familiarity.',
    thankYouSent: true
  }
];
