import { AlumniProfile } from '../types/directory';

export const initialAlumniProfiles: AlumniProfile[] = [
  {
    id: 'alm-1',
    name: 'Tanzil Ahmed Chowdhury',
    email: 'tanzil.ahmed@grameenphone.com',
    phone: '+8801711223344',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '15 Jan 2024',
    studentId: '15CSE042',
    department: 'CSE',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.88,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Distributed Fault-Tolerant Microservices using Go & Raft Consensus',
    thesisSupervisor: 'Prof. Dr. M. A. Karim',
    honors: "Dean's Merit List (4 semesters)",
    clubs: ['BAUST Computer Club (President 2018)', 'BAUST Robotics Club'],
    scholarships: 'University Merit Scholarship 2016-2018',
    currentPosition: 'Principal Software Engineer',
    currentCompany: 'Grameenphone Ltd.',
    sector: 'Private',
    joiningDate: 'Jan 2022',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Leading the Core Telco Billing & API Integration squad handling 80M+ daily events.',
    careerStory: 'Started as a junior backend engineer at Brain Station 23 right after graduating from BAUST. Later transitioned into enterprise telecom microservices architecture at Grameenphone.',
    bio: 'Passionate about distributed backend systems, Go, Kubernetes, and mentoring budding engineers from BAUST.',
    yearsOfExperience: 6,
    workExperience: [
      {
        id: 'w1',
        title: 'Principal Software Engineer',
        organization: 'Grameenphone Ltd.',
        type: 'Full-time',
        period: 'Jan 2022 - Present',
        location: 'Dhaka',
        responsibilities: 'Architecting event-driven microservices on GCP and Apache Kafka.',
        achievements: 'Decreased billing latency by 34% across 80M subscribers.',
        isCurrent: true
      },
      {
        id: 'w2',
        title: 'Senior Software Engineer',
        organization: 'Brain Station 23',
        type: 'Full-time',
        period: 'Feb 2019 - Dec 2021',
        location: 'Dhaka',
        responsibilities: 'Built scalable FinTech banking solutions for Citytouch & Dutch-Bangla Bank.',
        achievements: 'Led a team of 8 engineers delivering the mobile wallet gateway on schedule.'
      }
    ],
    education: [
      {
        id: 'e1',
        degree: 'B.Sc. in Computer Science & Engineering',
        institution: 'Bangladesh Army University of Science and Technology (BAUST)',
        field: 'Computer Science',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Web Development', category: 'Software', level: 'Expert', isExpertise: true, endorsements: 42 },
      { name: 'Networking & Cloud', category: 'Infrastructure', level: 'Expert', isExpertise: true, endorsements: 38 },
      { name: 'Data Science', category: 'Data', level: 'Advanced', isExpertise: false, endorsements: 19 },
      { name: 'Cybersecurity', category: 'Security', level: 'Intermediate', isExpertise: false, endorsements: 12 }
    ],
    interestedFields: ['Distributed Systems', 'Cloud Computing', 'FinTech', 'Telecom Networks'],
    certifications: [
      { id: 'c1', title: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud', year: '2023' },
      { id: 'c2', title: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', year: '2022' }
    ],
    publications: [
      { id: 'p1', title: 'Optimizing Edge Compute Latency in 5G Networks', type: 'Publication', description: 'IEEE Bangladesh Section Conference', year: '2021' }
    ],
    achievements: ['Champion - BAUST National Hackathon 2018', 'Runner Up - Code Samurai 2019'],
    studentsConsulted: 74,
    sessionsCompleted: 58,
    averageRating: 4.9,
    totalReviews: 46,
    responseTime: '< 1 hour',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 24 },
      { topic: 'CV Review', count: 18 },
      { topic: 'Career Guidance', count: 16 }
    ],
    testimonials: [
      {
        id: 't1',
        studentName: 'Ahsan Habib',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '24 Oct 2026',
        comment: 'Tanzil bhaiya gave me pinpoint feedback on my system design interview prep. Cleared my mock with flying colors!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/tanzil-ahmed-demo',
    github: 'https://github.com/tanzil-baust',
    lastActive: 'Today, 10:15 AM',
    lastUpdated: 'Nov 02, 2026'
  },
  {
    id: 'alm-2',
    name: 'Dr. Nusrat Jahan',
    email: 'nusrat.jahan@tu-berlin.de',
    phone: '+491761234567',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '20 Feb 2024',
    studentId: '16EEE015',
    department: 'EEE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.94,
    degree: 'B.Sc. in Electrical & Electronic Engineering',
    thesisTitle: 'Perovskite Photovoltaic Cell Degradation Modelling in Tropical Climates',
    thesisSupervisor: 'Prof. Dr. Golam Mostafa',
    honors: "Vice Chancellor's Gold Medalist",
    clubs: ['IEEE BAUST Student Branch (Chair 2019)'],
    scholarships: 'DAAD Doctoral Research Fellowship',
    currentPosition: 'Postdoctoral Research Associate & DAAD Scholar',
    currentCompany: 'Technical University of Berlin (TU Berlin)',
    sector: 'Abroad',
    joiningDate: 'Oct 2024',
    location: 'Berlin, Germany',
    country: 'Germany',
    roleDescription: 'Researching next-gen silicon-perovskite tandem solar cells and renewable smart grid integration.',
    careerStory: 'Graduated from BAUST EEE top of the batch. Received DAAD Master Fellowship for TU Berlin and subsequently completed Ph.D. in Photovoltaics in 2024.',
    bio: 'Researcher in Berlin focusing on Renewable Energy & CleanTech. Eager to mentor BAUST students applying for German DAAD scholarships, Erasmus, and MSc programs.',
    yearsOfExperience: 5,
    abroadInstitution: 'Technical University of Berlin',
    abroadCountry: 'Germany',
    abroadProgram: 'Postdoc / Ph.D. in Electrical & Energy Engineering',
    workExperience: [
      {
        id: 'w2-1',
        title: 'Postdoctoral Researcher',
        organization: 'TU Berlin Renewable Energy Lab',
        type: 'Full-time',
        period: 'Oct 2024 - Present',
        location: 'Berlin, Germany',
        responsibilities: 'Leading experimental research on tandem solar cells.',
        achievements: 'Published 4 high-impact papers in Nature Energy and Solar RRL.',
        isCurrent: true
      },
      {
        id: 'w2-2',
        title: 'Graduate Research Assistant',
        organization: 'Fraunhofer ISE',
        type: 'Part-time',
        period: 'Oct 2021 - Sep 2024',
        location: 'Freiburg / Berlin',
        responsibilities: 'Semiconductor device characterization.'
      }
    ],
    education: [
      {
        id: 'e2-1',
        degree: 'Ph.D. in Photovoltaic Systems',
        institution: 'Technical University of Berlin',
        field: 'Renewable Energy',
        country: 'Germany',
        year: '2021 - 2024'
      },
      {
        id: 'e2-2',
        degree: 'B.Sc. in Electrical & Electronic Engineering',
        institution: 'BAUST',
        field: 'EEE',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Power & Energy', category: 'Electrical', level: 'Expert', isExpertise: true, endorsements: 51 },
      { name: 'Research & Academic Writing', category: 'Academia', level: 'Expert', isExpertise: true, endorsements: 48 },
      { name: 'IELTS/GRE/Scholarship Prep', category: 'Higher Study', level: 'Expert', isExpertise: true, endorsements: 63 }
    ],
    interestedFields: ['Solar Cells', 'Clean Energy', 'Smart Grids', 'Higher Studies in Europe'],
    certifications: [
      { id: 'c2-1', title: 'German Language C1 Certification (Goethe)', issuer: 'Goethe-Institut', year: '2021' }
    ],
    publications: [
      { id: 'p2-1', title: 'Efficiency limits of Perovskite/Silicon Tandem Photovoltaics', type: 'Publication', description: 'Journal of Applied Physics 2023', year: '2023' }
    ],
    achievements: ['DAAD Full Scholarship Awardee 2020', 'VC Gold Medal BAUST Convocation'],
    studentsConsulted: 95,
    sessionsCompleted: 78,
    averageRating: 5.0,
    totalReviews: 61,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Higher Studies', count: 45 },
      { topic: 'CV Review', count: 20 },
      { topic: 'Career Guidance', count: 13 }
    ],
    testimonials: [
      {
        id: 't2-1',
        studentName: 'Sadia Sultana',
        studentDept: 'EEE',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '02 Nov 2026',
        comment: 'Nusrat Apu reviewed my DAAD Letter of Motivation. I was accepted into FAU Erlangen with a full tuition waiver!'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/dr-nusrat-jahan-daad',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 05, 2026'
  },
  {
    id: 'alm-3',
    name: 'Major Rezwanul Haque (Retd.) / Cadre Officer',
    email: 'rezwan.haque@mopa.gov.bd',
    phone: '+8801819998877',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '10 Mar 2024',
    studentId: '15CE003',
    department: 'Civil',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.65,
    degree: 'B.Sc. in Civil Engineering',
    thesisTitle: 'Seismic Vulnerability Assessment of Multistory RC Buildings in Northern Bangladesh',
    thesisSupervisor: 'Brig. Gen. (Retd.) Engr. M. Rahman',
    honors: 'Best Defense Projects Award',
    clubs: ['BAUST Debating Society', 'Civil Engineering Club'],
    currentPosition: 'Senior Assistant Secretary (38th BCS Admin Cadre)',
    currentCompany: 'Ministry of Public Administration, Govt. of Bangladesh',
    sector: 'Government',
    joiningDate: 'Jan 2021',
    location: 'Dhaka Secretariat, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Policy formulation, civil administration, inter-ministerial infrastructure coordination.',
    careerStory: 'Graduated in Civil Engineering from BAUST, cracked 38th BCS on the first attempt with merit rank in Admin Cadre. Serving in central secretariat.',
    bio: '38th BCS (Admin) Cadre Officer. Glad to guide BAUSTians preparing for BCS Preliminary, Written, and Viva exams.',
    yearsOfExperience: 6,
    workExperience: [
      {
        id: 'w3-1',
        title: 'Senior Assistant Secretary',
        organization: 'Ministry of Public Administration',
        type: 'Full-time',
        period: '2023 - Present',
        location: 'Bangladesh Secretariat, Dhaka',
        responsibilities: 'Administrative policymaking and regional development inspection.',
        isCurrent: true
      },
      {
        id: 'w3-2',
        title: 'Assistant Commissioner & Executive Magistrate',
        organization: 'Divisional Commissioner Office',
        type: 'Full-time',
        period: '2021 - 2023',
        location: 'Rajshahi',
        responsibilities: 'Public order maintenance and mobile court operations.'
      }
    ],
    education: [
      {
        id: 'e3-1',
        degree: 'B.Sc. in Civil Engineering',
        institution: 'BAUST',
        field: 'Structural & Geotechnical',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Competitive Exams (BCS, Bank)', category: 'Public Sector', level: 'Expert', isExpertise: true, endorsements: 76 },
      { name: 'Civil/Structural', category: 'Engineering', level: 'Advanced', isExpertise: true, endorsements: 32 },
      { name: 'Research & Academic Writing', category: 'General', level: 'Intermediate', isExpertise: false, endorsements: 18 }
    ],
    interestedFields: ['Public Administration', 'National Mega Projects', 'Civil Infrastructure'],
    certifications: [
      { id: 'c3-1', title: 'Foundation Training Course (BPATC)', issuer: 'BPATC Savar', year: '2021' }
    ],
    publications: [],
    achievements: ['38th BCS Merit Position in Admin Cadre'],
    studentsConsulted: 112,
    sessionsCompleted: 88,
    averageRating: 4.95,
    totalReviews: 70,
    responseTime: '< 4 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 48 },
      { topic: 'Career Guidance', count: 32 },
      { topic: 'Skill Roadmap', count: 8 }
    ],
    testimonials: [
      {
        id: 't3-1',
        studentName: 'Mehedi Hasan',
        studentDept: 'Civil',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '18 Oct 2026',
        comment: 'Sir gave a very clear strategy for BCS general booklist and time management during written exams.'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Students only',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/rezwanul-haque-bcs',
    lastActive: '3 hours ago',
    lastUpdated: 'Oct 30, 2026'
  },
  {
    id: 'alm-4',
    name: 'Sabbir Hossain Suman',
    email: 'sabbir.suman@bkash.com',
    phone: '+8801755667788',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '12 Apr 2024',
    studentId: '16CSE088',
    department: 'CSE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.79,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Fraud Detection in Mobile Financial Transactions with Graph Neural Networks',
    thesisSupervisor: 'Dr. Md. Tariqul Islam',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST ACM Programming Club (Competitive Programmer)'],
    currentPosition: 'Senior Machine Learning Engineer',
    currentCompany: 'bKash Limited',
    sector: 'Private',
    joiningDate: 'Mar 2022',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Building real-time anomaly detection and anti-money laundering ML pipelines on streaming payment data.',
    careerStory: 'Graduated in 2020. Started at TigerIT as computer vision engineer, then joined bKash Fintech intelligence team.',
    bio: 'ML Engineer specializing in Fraud Detection, LLMs, and Python. Passionate about helping students break into Data Science and AI.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w4-1',
        title: 'Senior Machine Learning Engineer',
        organization: 'bKash Limited',
        type: 'Full-time',
        period: 'Mar 2022 - Present',
        location: 'Dhaka',
        responsibilities: 'Deploying real-time PyTorch/Triton inference engines.',
        achievements: 'Saved $1.2M in fraud risk mitigation over 18 months.',
        isCurrent: true
      },
      {
        id: 'w4-2',
        title: 'Computer Vision Engineer',
        organization: 'TigerIT Bangladesh Ltd.',
        type: 'Full-time',
        period: 'Jan 2020 - Feb 2022',
        location: 'Dhaka',
        responsibilities: 'Biometric face recognition and OCR systems.'
      }
    ],
    education: [
      {
        id: 'e4-1',
        degree: 'B.Sc. in Computer Science & Engineering',
        institution: 'BAUST',
        field: 'Computer Science & AI',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'AI & Machine Learning', category: 'Data & AI', level: 'Expert', isExpertise: true, endorsements: 68 },
      { name: 'Data Science', category: 'Data & AI', level: 'Expert', isExpertise: true, endorsements: 54 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: false, endorsements: 22 },
      { name: 'Cybersecurity', category: 'Security', level: 'Intermediate', isExpertise: false, endorsements: 15 }
    ],
    interestedFields: ['Deep Learning', 'FinTech AI', 'Graph Analytics', 'LLM Agents'],
    certifications: [
      { id: 'c4-1', title: 'DeepLearning.AI TensorFlow Developer Specialization', issuer: 'Coursera', year: '2021' },
      { id: 'c4-2', title: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services', year: '2023' }
    ],
    publications: [
      { id: 'p4-1', title: 'Real-time GNN for Anti-Money Laundering in MFS', type: 'Publication', description: 'IEEE Transactions on Big Data', year: '2022' }
    ],
    achievements: ['ICPC Asia Regional Contestant 2019', 'Best Tech Performer bKash 2023'],
    studentsConsulted: 82,
    sessionsCompleted: 64,
    averageRating: 4.88,
    totalReviews: 53,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'CV Review', count: 28 },
      { topic: 'Interview Prep', count: 24 },
      { topic: 'Project/Thesis Help', count: 12 }
    ],
    testimonials: [
      {
        id: 't4-1',
        studentName: 'Farhana Yeasmin',
        studentDept: 'CSE',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '27 Oct 2026',
        comment: 'Sabbir bhaiya’s line-by-line review of my ML thesis proposal helped get it approved without changes!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/sabbir-suman-ai',
    github: 'https://github.com/sabbir-ml-baust',
    lastActive: '5 hours ago',
    lastUpdated: 'Nov 04, 2026'
  },
  {
    id: 'alm-5',
    name: 'Mahmuda Akter Rimi',
    email: 'm.rimi@samsung.com',
    phone: '+8801912345678',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '05 May 2024',
    studentId: '17CSE012',
    department: 'CSE',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.82,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Cross-platform Mobile Framework Benchmark in Android OS',
    thesisSupervisor: 'Engr. S. M. Faruq',
    honors: "Dean's List",
    clubs: ['Women in Tech BAUST (Founder)', 'Cultural Club'],
    currentPosition: 'Senior Android R&D Engineer',
    currentCompany: 'Samsung R&D Institute Bangladesh (SRBD)',
    sector: 'Multinational',
    joiningDate: 'Oct 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Developing Galaxy flagship Camera OS features and Native Kotlin/C++ graphics engine.',
    careerStory: 'Joined Samsung R&D right after campus recruitment from BAUST in 2021. Promoted to Senior Engineer in 2024.',
    bio: 'Mobile systems engineer at Samsung R&D. Enthusiastic about Android internals, Kotlin Coroutines, and helping female engineers thrive.',
    yearsOfExperience: 4,
    workExperience: [
      {
        id: 'w5-1',
        title: 'Senior Android R&D Engineer',
        organization: 'Samsung R&D Institute Bangladesh',
        type: 'Full-time',
        period: 'Jan 2024 - Present',
        location: 'Dhaka',
        responsibilities: 'Camera framework driver integration on Android 15/OneUI.',
        isCurrent: true
      },
      {
        id: 'w5-2',
        title: 'Software Engineer',
        organization: 'Samsung R&D Institute Bangladesh',
        type: 'Full-time',
        period: 'Oct 2021 - Dec 2023',
        location: 'Dhaka',
        responsibilities: 'Core gallery and camera subsystem development.'
      }
    ],
    education: [
      {
        id: 'e5-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Software Engineering',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Mobile App Development', category: 'Software', level: 'Expert', isExpertise: true, endorsements: 59 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: true, endorsements: 31 },
      { name: 'Embedded Systems/IoT', category: 'Systems', level: 'Advanced', isExpertise: false, endorsements: 20 }
    ],
    interestedFields: ['Android OS', 'Graphics & Shaders', 'Embedded Linux', 'Camera Algorithms'],
    certifications: [
      { id: 'c5-1', title: 'Android Certified Application Developer', issuer: 'Google', year: '2022' }
    ],
    publications: [],
    achievements: ['Samsung Spot Award for Outstanding R&D Contribution 2023'],
    studentsConsulted: 63,
    sessionsCompleted: 49,
    averageRating: 4.92,
    totalReviews: 38,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 22 },
      { topic: 'Skill Roadmap', count: 17 },
      { topic: 'CV Review', count: 10 }
    ],
    testimonials: [
      {
        id: 't5-1',
        studentName: 'Naimur Rahman',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '01 Nov 2026',
        comment: 'Apu conducted a full mock coding interview for Samsung R&D recruitment. It matched the real test format!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/mahmuda-rimi-srbd',
    github: 'https://github.com/rimi-android',
    lastActive: 'Today, 2:30 PM',
    lastUpdated: 'Nov 07, 2026'
  },
  {
    id: 'alm-6',
    name: 'Engr. Shakil Ahmed',
    email: 'shakil.ahmed@ualberta.ca',
    phone: '+17809876543',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '18 Jan 2024',
    studentId: '15ME021',
    department: 'ME',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.86,
    degree: 'B.Sc. in Mechanical Engineering',
    thesisTitle: 'CFD Analysis of Turbulent Aerodynamics in Wind Turbine Blades',
    thesisSupervisor: 'Prof. Dr. M. K. Alam',
    honors: 'Best Engineering Project',
    clubs: ['BAUST Formula Student Team', 'Robotics Club'],
    currentPosition: 'M.Sc. Research Fellow in Fluids & Thermal Energy',
    currentCompany: 'University of Alberta',
    sector: 'Higher Study',
    joiningDate: 'Sep 2023',
    location: 'Edmonton, AB, Canada',
    country: 'Canada',
    roleDescription: 'Investigating multiphase flow simulations and carbon capture transport systems.',
    careerStory: 'Graduated in 2019, worked as Junior Thermal Engineer at Summit Power, then secured full Graduate Research Assistantship at UAlberta.',
    bio: 'Mechanical engineer pursuing graduate research in Canada. Eager to help BAUST engineers target Canadian universities, professors, and funding.',
    yearsOfExperience: 5,
    abroadInstitution: 'University of Alberta',
    abroadCountry: 'Canada',
    abroadProgram: 'M.Sc. in Mechanical Engineering',
    workExperience: [
      {
        id: 'w6-1',
        title: 'Graduate Research Assistant',
        organization: 'University of Alberta',
        type: 'Full-time',
        period: 'Sep 2023 - Present',
        location: 'Edmonton, Canada',
        responsibilities: 'Ansys Fluent simulations and lab aerodynamic validation.',
        isCurrent: true
      },
      {
        id: 'w6-2',
        title: 'Thermal Engineer',
        organization: 'Summit Power International',
        type: 'Full-time',
        period: 'Jan 2020 - Jul 2023',
        location: 'Gazipur, Bangladesh',
        responsibilities: 'Combined cycle power plant efficiency monitoring.'
      }
    ],
    education: [
      {
        id: 'e6-1',
        degree: 'M.Sc. in Mechanical Engineering',
        institution: 'University of Alberta',
        field: 'Fluid Mechanics',
        country: 'Canada',
        year: '2023 - Present'
      },
      {
        id: 'e6-2',
        degree: 'B.Sc. in Mechanical Engineering',
        institution: 'BAUST',
        field: 'Mechanical',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Power & Energy', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 45 },
      { name: 'Research & Academic Writing', category: 'Academia', level: 'Expert', isExpertise: true, endorsements: 39 },
      { name: 'IELTS/GRE/Scholarship Prep', category: 'Higher Study', level: 'Advanced', isExpertise: true, endorsements: 44 }
    ],
    interestedFields: ['CFD Simulation', 'Carbon Capture', 'Aerodynamics', 'Renewable Thermal Systems'],
    certifications: [
      { id: 'c6-1', title: 'Ansys Certified Fluids Professional', issuer: 'Ansys', year: '2022' }
    ],
    publications: [
      { id: 'p6-1', title: 'Computational Study of Supercritical CO2 Turbines', type: 'Publication', description: 'ASME Turbo Expo', year: '2024' }
    ],
    achievements: ['Alberta Graduate Excellence Scholarship 2023'],
    studentsConsulted: 52,
    sessionsCompleted: 40,
    averageRating: 4.95,
    totalReviews: 31,
    responseTime: '< 6 hours',
    topTopicsHelped: [
      { topic: 'Higher Studies', count: 25 },
      { topic: 'CV Review', count: 10 },
      { topic: 'Project/Thesis Help', count: 5 }
    ],
    testimonials: [
      {
        id: 't6-1',
        studentName: 'Tanvir Ahmed',
        studentDept: 'ME',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '20 Oct 2026',
        comment: 'Shakil bhaiya helped me write cold emails to Canadian professors. Received two positive replies!'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/shakil-ahmed-ualberta',
    lastActive: '1 day ago',
    lastUpdated: 'Nov 03, 2026'
  },
  {
    id: 'alm-7',
    name: 'Asif Ur Rahman',
    email: 'asif.rahman@bb.org.bd',
    phone: '+8801700112233',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '14 Feb 2024',
    studentId: '16BBA009',
    department: 'BBA',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.75,
    degree: 'Bachelor of Business Administration (Finance)',
    thesisTitle: 'Fintech Disruption and Non-Performing Loan Mitigation in Commercial Banking',
    thesisSupervisor: 'Assoc. Prof. K. M. Hossain',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST Business Club (Vice President)'],
    currentPosition: 'Assistant Director (General Banking)',
    currentCompany: 'Bangladesh Bank (Central Bank)',
    sector: 'Government',
    joiningDate: 'Aug 2022',
    location: 'Motijheel, Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Foreign exchange reserve inspection and monetary policy reporting at Central Bank headquarters.',
    careerStory: 'Graduated from BAUST BBA in 2020. Cleared the Bangladesh Bank Assistant Director (AD) recruitment exam with distinction.',
    bio: 'Assistant Director at Bangladesh Bank. Mentoring students for Bangladesh Bank AD, Combined 9 Banks Officer exams, and Financial Modeling.',
    yearsOfExperience: 4,
    workExperience: [
      {
        id: 'w7-1',
        title: 'Assistant Director',
        organization: 'Bangladesh Bank',
        type: 'Full-time',
        period: 'Aug 2022 - Present',
        location: 'Motijheel, Dhaka',
        responsibilities: 'Commercial bank compliance audit and foreign reserve management.',
        isCurrent: true
      },
      {
        id: 'w7-2',
        title: 'Management Trainee Officer',
        organization: 'BRAC Bank PLC',
        type: 'Full-time',
        period: 'Jan 2021 - Jul 2022',
        location: 'Dhaka',
        responsibilities: 'Corporate credit analysis.'
      }
    ],
    education: [
      {
        id: 'e7-1',
        degree: 'BBA in Finance & Accounting',
        institution: 'BAUST',
        field: 'Business & Finance',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Competitive Exams (BCS, Bank)', category: 'Public Sector', level: 'Expert', isExpertise: true, endorsements: 62 },
      { name: 'Business & Marketing', category: 'Finance', level: 'Expert', isExpertise: true, endorsements: 41 },
      { name: 'Data Science', category: 'Analytics', level: 'Intermediate', isExpertise: false, endorsements: 18 }
    ],
    interestedFields: ['Central Banking', 'Macroeconomics', 'Financial Regulation', 'Fintech'],
    certifications: [
      { id: 'c7-1', title: 'Banking Diploma (JAIBB & DAIBB)', issuer: 'Institute of Bankers Bangladesh (IBB)', year: '2023' }
    ],
    publications: [],
    achievements: ['Bangladesh Bank AD Rank 14th'],
    studentsConsulted: 71,
    sessionsCompleted: 53,
    averageRating: 4.9,
    totalReviews: 44,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 30 },
      { topic: 'Career Guidance', count: 18 },
      { topic: 'CV Review', count: 5 }
    ],
    testimonials: [
      {
        id: 't7-1',
        studentName: 'Rubel Mia',
        studentDept: 'BBA',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '15 Oct 2026',
        comment: 'Asif sir’s guidance on BB AD written math and English composition is the gold standard.'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/asif-ur-rahman-bb',
    lastActive: '4 hours ago',
    lastUpdated: 'Nov 01, 2026'
  },
  {
    id: 'alm-8',
    name: 'Farzana Karim Chowdhury',
    email: 'farzana.chowdhury@brainstation-23.com',
    phone: '+8801788776655',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '10 Jan 2024',
    studentId: '17CSE044',
    department: 'CSE',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.84,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'End-to-End Automated Penetration Testing using Reinforcement Learning',
    thesisSupervisor: 'Dr. M. A. Karim',
    honors: 'Best Cybersecurity Project BAUST Tech Fest',
    clubs: ['BAUST Cyber Security Club (Lead)', 'Programming Club'],
    currentPosition: 'Senior Cyber Security Specialist & Lead Pentester',
    currentCompany: 'Brain Station 23',
    sector: 'Private',
    joiningDate: 'Nov 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Securing fintech, microfinance, and overseas enterprise banking infrastructures.',
    careerStory: 'Discovered passion for ethical hacking in 2nd year at BAUST. Ranked on HackerOne & Bugcrowd. Joined Brain Station 23 to lead cybersecurity audits.',
    bio: 'OSCP & CEH certified Lead Pentester. Helping students learn ethical hacking, bug bounty hunting, and network security.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w8-1',
        title: 'Lead Cybersecurity Specialist',
        organization: 'Brain Station 23',
        type: 'Full-time',
        period: 'Nov 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Web application vulnerability assessments and red teaming.',
        achievements: 'Reported 12 zero-day vulnerabilities in financial banking protocols.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e8-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Information Security',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Cybersecurity', category: 'Security', level: 'Expert', isExpertise: true, endorsements: 64 },
      { name: 'Networking & Cloud', category: 'Infrastructure', level: 'Advanced', isExpertise: true, endorsements: 36 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: false, endorsements: 28 }
    ],
    interestedFields: ['Red Teaming', 'Threat Intelligence', 'Cloud Security', 'Reverse Engineering'],
    certifications: [
      { id: 'c8-1', title: 'Offensive Security Certified Professional (OSCP)', issuer: 'OffSec', year: '2023' },
      { id: 'c8-2', title: 'Certified Ethical Hacker (CEH v12)', issuer: 'EC-Council', year: '2022' }
    ],
    publications: [],
    achievements: ['HackerOne Top 100 Bangladesh Leaderboard', 'Keynote Speaker at BSides Dhaka 2024'],
    studentsConsulted: 67,
    sessionsCompleted: 50,
    averageRating: 4.96,
    totalReviews: 41,
    responseTime: '< 1 hour',
    topTopicsHelped: [
      { topic: 'Skill Roadmap', count: 26 },
      { topic: 'Interview Prep', count: 14 },
      { topic: 'CV Review', count: 10 }
    ],
    testimonials: [
      {
        id: 't8-1',
        studentName: 'Zubair Hossain',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '29 Oct 2026',
        comment: 'Farzana Apu’s roadmap on OSCP prep and TryHackMe rooms saved me 6 months of wandering!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/farzana-chowdhury-sec',
    github: 'https://github.com/farzana-sec',
    lastActive: '1 hour ago',
    lastUpdated: 'Nov 06, 2026'
  },
  {
    id: 'alm-9',
    name: 'Engr. Nazmul Huda',
    email: 'nazmul.huda@squaregroup.com',
    phone: '+8801733445566',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '25 Jan 2024',
    studentId: '16TE005',
    department: 'Textile',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.68,
    degree: 'B.Sc. in Textile Engineering (Wet Processing)',
    thesisTitle: 'Eco-Friendly Nano-Enzyme Finishing for Sustainable Denim Processing',
    thesisSupervisor: 'Engr. M. B. Rahman',
    honors: 'Best Textile Innovation Award',
    clubs: ['BAUST Textile Society (General Secretary)'],
    currentPosition: 'Assistant Manager (Dyeing & Finishing)',
    currentCompany: 'Square Textiles Ltd. (Square Group)',
    sector: 'Private',
    joiningDate: 'Feb 2021',
    location: 'Gazipur, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Managing high-capacity automated continuous dyeing lines and OEKO-TEX compliance standards.',
    careerStory: 'Graduated in Textile Engineering from BAUST. Joined Square Textiles as Management Trainee. Promoted to Assistant Manager overseeing 40+ technicians.',
    bio: 'Textile engineer with 5 years experience in sustainable wet processing and smart technical textiles. Passionate about guiding BAUST textile students toward corporate manufacturing & export careers.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w9-1',
        title: 'Assistant Manager',
        organization: 'Square Textiles Ltd.',
        type: 'Full-time',
        period: 'Jan 2023 - Present',
        location: 'Gazipur',
        responsibilities: 'Production scheduling, liquor ratio optimization, and client audit approvals.',
        isCurrent: true
      },
      {
        id: 'w9-2',
        title: 'Production Officer',
        organization: 'Square Textiles Ltd.',
        type: 'Full-time',
        period: 'Feb 2021 - Dec 2022',
        location: 'Gazipur',
        responsibilities: 'Shift production quality and shade matching.'
      }
    ],
    education: [
      {
        id: 'e9-1',
        degree: 'B.Sc. in Textile Engineering',
        institution: 'BAUST',
        field: 'Wet Processing Technology',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Textile Engineering', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 58 },
      { name: 'Power & Energy', category: 'Operations', level: 'Advanced', isExpertise: false, endorsements: 24 },
      { name: 'Business & Marketing', category: 'Supply Chain', level: 'Intermediate', isExpertise: false, endorsements: 19 }
    ],
    interestedFields: ['Sustainable Textiles', 'Nano Finishes', 'RMG Supply Chain', 'Export Management'],
    certifications: [
      { id: 'c9-1', title: 'OEKO-TEX & ZDHC Level 3 Certified Auditor', issuer: 'Testex', year: '2023' }
    ],
    publications: [],
    achievements: ['Zero Defect Award - Square Textiles Annual Excellence 2023'],
    studentsConsulted: 48,
    sessionsCompleted: 36,
    averageRating: 4.85,
    totalReviews: 29,
    responseTime: '< 4 hours',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 20 },
      { topic: 'Interview Prep', count: 12 },
      { topic: 'CV Review', count: 4 }
    ],
    testimonials: [
      {
        id: 't9-1',
        studentName: 'Shanto Islam',
        studentDept: 'Textile',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '12 Oct 2026',
        comment: 'Nazmul bhaiya’s interview questions on dyeing lab shade matching came up in my actual Beximco interview!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/nazmul-huda-square',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 02, 2026'
  },
  {
    id: 'alm-10',
    name: 'Sajib Kanti Das',
    email: 'sajib.das@bjitgroup.com',
    phone: '+8801822334455',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '11 Mar 2024',
    studentId: '15CSE090',
    department: 'CSE',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.71,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Low-latency Real-time Video Streaming with WebRTC & QUIC Protocol',
    thesisSupervisor: 'Dr. Md. Tariqul Islam',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST Open Source Club (Founder)'],
    currentPosition: 'Technical Lead & Japanese Enterprise Solutions Architect',
    currentCompany: 'BJIT Limited',
    sector: 'Private',
    joiningDate: 'Jul 2019',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Architecting high-availability cloud platforms for Sony, Rakuten, and Panasonic.',
    careerStory: 'Joined BJIT as Trainee Software Engineer directly from BAUST. Worked on offshore projects in Tokyo and returned as Technical Lead.',
    bio: 'Tech Lead at BJIT. Experienced with Japanese offshore engineering standards, TypeScript, Node.js, AWS, and Microservices.',
    yearsOfExperience: 7,
    workExperience: [
      {
        id: 'w10-1',
        title: 'Technical Lead',
        organization: 'BJIT Limited',
        type: 'Full-time',
        period: 'Jan 2023 - Present',
        location: 'Dhaka / Tokyo',
        responsibilities: 'Heading a 14-member offshore engineering division for Japanese clients.',
        isCurrent: true
      },
      {
        id: 'w10-2',
        title: 'Senior Software Engineer',
        organization: 'BJIT Limited',
        type: 'Full-time',
        period: 'Jul 2019 - Dec 2022',
        location: 'Dhaka',
        responsibilities: 'Fullstack React & Node.js application architecture.'
      }
    ],
    education: [
      {
        id: 'e10-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Software Engineering',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Web Development', category: 'Software', level: 'Expert', isExpertise: true, endorsements: 60 },
      { name: 'Networking & Cloud', category: 'Cloud', level: 'Expert', isExpertise: true, endorsements: 44 },
      { name: 'Mobile App Development', category: 'Software', level: 'Advanced', isExpertise: false, endorsements: 26 }
    ],
    interestedFields: ['Enterprise Architecture', 'WebRTC', 'AWS Serverless', 'Japanese Business Culture'],
    certifications: [
      { id: 'c10-1', title: 'AWS Certified Solutions Architect - Associate', issuer: 'AWS', year: '2021' },
      { id: 'c10-2', title: 'Japanese Language JLPT N3', issuer: 'Japan Foundation', year: '2022' }
    ],
    publications: [],
    achievements: ['BJIT Excellence in Leadership Award 2023'],
    studentsConsulted: 89,
    sessionsCompleted: 70,
    averageRating: 4.93,
    totalReviews: 55,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 32 },
      { topic: 'Career Guidance', count: 24 },
      { topic: 'CV Review', count: 14 }
    ],
    testimonials: [
      {
        id: 't10-1',
        studentName: 'Shovon Roy',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '22 Oct 2026',
        comment: 'Sajib Da explained the exact expectations for Japanese offshore tech interviews. Cleared the BJIT written exam!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/sajib-das-bjit',
    github: 'https://github.com/sajib-bjit',
    lastActive: 'Today, 11:45 AM',
    lastUpdated: 'Nov 05, 2026'
  },
  {
    id: 'alm-11',
    name: 'Sayeda Sharmin Sultana',
    email: 'sharmin.sultana@unsw.edu.au',
    phone: '+61412345678',
    avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '08 Feb 2024',
    studentId: '15CE033',
    department: 'Civil',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.91,
    degree: 'B.Sc. in Civil Engineering',
    thesisTitle: 'Finite Element Modelling of Geotechnical Soil-Structure Interaction under Cyclic Loading',
    thesisSupervisor: 'Prof. Dr. A. K. M. Bashir',
    honors: "Chancellor's Gold Medalist Candidate",
    clubs: ['BAUST Research Forum'],
    scholarships: 'UNSW Sydney International Postgraduate Research Scholarship',
    currentPosition: 'Ph.D. Candidate & Graduate Researcher',
    currentCompany: 'University of New South Wales (UNSW Sydney)',
    sector: 'Abroad',
    joiningDate: 'Mar 2022',
    location: 'Sydney, Australia',
    country: 'Australia',
    roleDescription: 'Computational geomechanics research on offshore foundation stability and sea-level rise resilience.',
    careerStory: 'Graduated in Civil Engineering with highest departmental CGPA. Worked as Junior Structural Engineer at DDC Ltd. before winning full Australian Research Scholarship.',
    bio: 'Ph.D. researcher at UNSW Sydney. Mentoring students targeting Australian higher studies, RTP scholarships, and Civil Engineering research publications.',
    yearsOfExperience: 6,
    abroadInstitution: 'University of New South Wales (UNSW)',
    abroadCountry: 'Australia',
    abroadProgram: 'Ph.D. in Geotechnical Engineering',
    workExperience: [
      {
        id: 'w11-1',
        title: 'Ph.D. Researcher & Teaching Assistant',
        organization: 'UNSW Sydney',
        type: 'Full-time',
        period: 'Mar 2022 - Present',
        location: 'Sydney, Australia',
        responsibilities: 'Advanced numerical geotechnical modeling and undergraduate tutoring.',
        isCurrent: true
      },
      {
        id: 'w11-2',
        title: 'Structural Design Engineer',
        organization: 'Development Design Consultants (DDC)',
        type: 'Full-time',
        period: 'Jan 2020 - Jan 2022',
        location: 'Dhaka',
        responsibilities: 'Bridge foundation and pile load capacity analysis.'
      }
    ],
    education: [
      {
        id: 'e11-1',
        degree: 'Ph.D. in Geotechnical Engineering',
        institution: 'UNSW Sydney',
        field: 'Civil & Geotechnical',
        country: 'Australia',
        year: '2022 - Present'
      },
      {
        id: 'e11-2',
        degree: 'B.Sc. in Civil Engineering',
        institution: 'BAUST',
        field: 'Civil Engineering',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Civil/Structural', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 53 },
      { name: 'Research & Academic Writing', category: 'Academia', level: 'Expert', isExpertise: true, endorsements: 47 },
      { name: 'IELTS/GRE/Scholarship Prep', category: 'Higher Study', level: 'Expert', isExpertise: true, endorsements: 58 }
    ],
    interestedFields: ['Geotechnical Modelling', 'Offshore Structures', 'Australian Scholarships', 'Resilient Infrastructure'],
    certifications: [
      { id: 'c11-1', title: 'Plaxis 3D Geotechnical Master Certificate', issuer: 'Bentley Institute', year: '2022' }
    ],
    publications: [
      { id: 'p11-1', title: 'Monopile Lateral Capacity in Cohesive Seabed Soils', type: 'Publication', description: 'Computers and Geotechnics (Elsevier)', year: '2024' }
    ],
    achievements: ['UNSW University International Postgraduate Award (UIPA) 2022'],
    studentsConsulted: 64,
    sessionsCompleted: 48,
    averageRating: 4.97,
    totalReviews: 39,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Higher Studies', count: 30 },
      { topic: 'Project/Thesis Help', count: 12 },
      { topic: 'CV Review', count: 6 }
    ],
    testimonials: [
      {
        id: 't11-1',
        studentName: 'Muntaha Hossain',
        studentDept: 'Civil',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '19 Oct 2026',
        comment: 'Sharmin Apu’s advice on contacting Australian professors and drafting my research proposal was game-changing!'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/sharmin-sultana-unsw',
    lastActive: '6 hours ago',
    lastUpdated: 'Nov 06, 2026'
  },
  {
    id: 'alm-12',
    name: 'Tariq Bin Ziyad',
    email: 'tariq.ziyad@venturecraft.io',
    phone: '+8801712334455',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '19 Jan 2024',
    studentId: '15CSE051',
    department: 'CSE',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.52,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Decentralized Crowdfunding Platform with Smart Contract Escrow',
    thesisSupervisor: 'Engr. S. M. Faruq',
    honors: 'Best Entrepreneurship Pitch BAUST BizFest',
    clubs: ['BAUST Entrepreneurship Cell (Founder)'],
    currentPosition: 'Co-Founder & Chief Product Officer',
    currentCompany: 'VentureCraft Technologies Ltd.',
    sector: 'Business',
    joiningDate: 'Jan 2021',
    location: 'Banani, Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Leading product development and growth for SaaS solutions serving 400+ SME retailers.',
    careerStory: 'Started freelancing in 3rd year. After graduation, launched a bootstrapped SaaS company that raised pre-seed funding in 2023.',
    bio: 'Tech entrepreneur and startup builder. Mentoring student founders on product market fit, bootstrapping, and early team building.',
    yearsOfExperience: 6,
    workExperience: [
      {
        id: 'w12-1',
        title: 'Co-Founder & CPO',
        organization: 'VentureCraft Technologies',
        type: 'Full-time',
        period: 'Jan 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Product roadmap, investor relations, and hiring.',
        achievements: 'Grew ARR from $10k to $180k with 400+ B2B clients.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e12-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Software & Entrepreneurship',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Business & Marketing', category: 'Entrepreneurship', level: 'Expert', isExpertise: true, endorsements: 65 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: true, endorsements: 38 },
      { name: 'Data Science', category: 'Analytics', level: 'Intermediate', isExpertise: false, endorsements: 20 }
    ],
    interestedFields: ['SaaS', 'Startup Funding', 'Product Strategy', 'Growth Marketing'],
    certifications: [
      { id: 'c12-1', title: 'Y Combinator Startup School Graduate', issuer: 'Y Combinator', year: '2022' }
    ],
    publications: [],
    achievements: ['Top 10 Finalist - Banglalink IT Incubator 2022'],
    studentsConsulted: 58,
    sessionsCompleted: 42,
    averageRating: 4.89,
    totalReviews: 33,
    responseTime: '< 4 hours',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 24 },
      { topic: 'Skill Roadmap', count: 12 },
      { topic: 'Interview Prep', count: 6 }
    ],
    testimonials: [
      {
        id: 't12-1',
        studentName: 'Sohanur Rahman',
        studentDept: 'BBA',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '25 Oct 2026',
        comment: 'Tariq bhaiya gave us realistic feedback on our student startup deck. Crucial advice on pricing!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/tariq-ziyad-startup',
    lastActive: 'Yesterday',
    lastUpdated: 'Oct 28, 2026'
  },
  {
    id: 'alm-13',
    name: 'Mustafizur Rahman',
    email: 'mustafiz.upwork@gmail.com',
    phone: '+8801998877665',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '02 Feb 2024',
    studentId: '17CSE077',
    department: 'CSE',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.48,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Fullstack Next.js and Headless E-commerce Performance Optimization',
    thesisSupervisor: 'Engr. M. A. Jabbar',
    honors: 'Top Freelancer Recognition',
    clubs: ['BAUST Web Developers Hub'],
    currentPosition: 'Top Rated Plus Fullstack Engineer & Independent Consultant',
    currentCompany: 'Upwork Global Inc. / Remote Agency',
    sector: 'Freelancing',
    joiningDate: 'Jan 2021',
    location: 'Saidpur / Remote, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Building high-performance Jamstack, React, Next.js, and Shopify apps for US/EU clients.',
    careerStory: 'Started freelancing while living in Saidpur near BAUST. Achieved Top Rated Plus status with 100% Job Success Score and $120k+ earned.',
    bio: 'Top Rated Plus Upwork freelancer. Eager to guide students on remote work, portfolio building, and winning international contracts.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w13-1',
        title: 'Top Rated Plus Engineer',
        organization: 'Upwork / Global Clients',
        type: 'Full-time',
        period: 'Jan 2021 - Present',
        location: 'Remote',
        responsibilities: 'Fullstack React, Node.js, and TypeScript development.',
        achievements: 'Over 65 completed international contracts with 5-star ratings.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e13-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Computer Science',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Web Development', category: 'Software', level: 'Expert', isExpertise: true, endorsements: 62 },
      { name: 'Business & Marketing', category: 'Client Communication', level: 'Advanced', isExpertise: true, endorsements: 37 },
      { name: 'Mobile App Development', category: 'Software', level: 'Intermediate', isExpertise: false, endorsements: 21 }
    ],
    interestedFields: ['Remote Work', 'Jamstack', 'SaaS Client Consulting', 'Financial Independence'],
    certifications: [
      { id: 'c13-1', title: 'Meta Certified Front-End Developer', issuer: 'Meta', year: '2022' }
    ],
    publications: [],
    achievements: ['Upwork Top Rated Plus Badge Holder'],
    studentsConsulted: 76,
    sessionsCompleted: 58,
    averageRating: 4.87,
    totalReviews: 45,
    responseTime: '< 1 hour',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 32 },
      { topic: 'CV Review', count: 18 },
      { topic: 'Skill Roadmap', count: 8 }
    ],
    testimonials: [
      {
        id: 't13-1',
        studentName: 'Kamrul Hasan',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '28 Oct 2026',
        comment: 'Mustafiz bhaiya reviewed my Upwork profile and proposal structure. Got my first $300 client in 10 days!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Hidden',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/mustafiz-freelance',
    github: 'https://github.com/mustafiz-code',
    lastActive: 'Today, 9:00 AM',
    lastUpdated: 'Nov 07, 2026'
  },
  {
    id: 'alm-14',
    name: 'Shamima Akter Ranu',
    email: 'ranu.akter@banglalink.net',
    phone: '+8801911998877',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '01 Mar 2024',
    studentId: '16EEE042',
    department: 'EEE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.78,
    degree: 'B.Sc. in Electrical & Electronic Engineering',
    thesisTitle: 'LTE-Advanced Carrier Aggregation and 5G Beamforming Performance in Dense Urban Scenarios',
    thesisSupervisor: 'Engr. M. G. Mostafa',
    honors: 'Dean’s Honor List',
    clubs: ['IEEE Women in Engineering BAUST'],
    currentPosition: 'Senior Radio Access Network (RAN) Planning Engineer',
    currentCompany: 'Banglalink Digital Communications Ltd.',
    sector: 'Private',
    joiningDate: 'May 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Cell site RF optimization, 4G/5G spectrum rollout, and microwave transmission link design.',
    careerStory: 'Graduated from BAUST EEE, completed internship at Huawei, joined Banglalink RAN optimization team.',
    bio: 'Telecom engineer at Banglalink. Passionate about 5G propagation, RF optimization, and mentoring aspiring telecom engineers.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w14-1',
        title: 'Senior RAN Planning Engineer',
        organization: 'Banglalink Digital Communications',
        type: 'Full-time',
        period: 'May 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Cell planning and frequency clearance.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e14-1',
        degree: 'B.Sc. in EEE',
        institution: 'BAUST',
        field: 'Telecommunications',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Networking & Cloud', category: 'Telecom', level: 'Expert', isExpertise: true, endorsements: 49 },
      { name: 'Power & Energy', category: 'Electrical', level: 'Advanced', isExpertise: true, endorsements: 33 },
      { name: 'Embedded Systems/IoT', category: 'Hardware', level: 'Intermediate', isExpertise: false, endorsements: 18 }
    ],
    interestedFields: ['5G Rollout', 'RF Optimization', 'Microwave Transmission', 'Telecom Management'],
    certifications: [
      { id: 'c14-1', title: 'Cisco CCNA Routing and Switching', issuer: 'Cisco', year: '2021' }
    ],
    publications: [],
    achievements: ['Banglalink High Achiever Award 2023'],
    studentsConsulted: 41,
    sessionsCompleted: 31,
    averageRating: 4.84,
    totalReviews: 24,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 18 },
      { topic: 'Career Guidance', count: 9 },
      { topic: 'CV Review', count: 4 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/shamima-ranu-telco',
    lastActive: 'Yesterday',
    lastUpdated: 'Oct 31, 2026'
  },
  {
    id: 'alm-15',
    name: 'Engr. Mehedi Hasan Bappy',
    email: 'bappy.ce@maxgroup-bd.com',
    phone: '+8801722889900',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '16 Feb 2024',
    studentId: '15CE019',
    department: 'Civil',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.59,
    degree: 'B.Sc. in Civil Engineering',
    thesisTitle: 'Optimization of Pre-stressed Concrete Box Girders in Elevated Expressways',
    thesisSupervisor: 'Prof. Dr. A. K. M. Bashir',
    honors: 'Best Bridge Design Model',
    clubs: ['BAUST Civil Engineering Club'],
    currentPosition: 'Senior Project Engineer (Bridges & Flyovers)',
    currentCompany: 'MAX Group (Dhaka Elevated Expressway Project)',
    sector: 'Private',
    joiningDate: 'Oct 2019',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Supervising pier cap casting, segment launching, and quality control on mega infrastructure projects.',
    careerStory: 'Started at MAX Group right after graduation from BAUST. Worked on the Bangabandhu Railway Bridge and now Dhaka Elevated Expressway.',
    bio: 'Civil engineer with 7 years hands-on site and structural project management experience in Bangladesh mega infrastructure.',
    yearsOfExperience: 7,
    workExperience: [
      {
        id: 'w15-1',
        title: 'Senior Project Engineer',
        organization: 'MAX Infrastructure Ltd.',
        type: 'Full-time',
        period: 'Oct 2019 - Present',
        location: 'Dhaka',
        responsibilities: 'Mega structure quality compliance and safety auditing.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e15-1',
        degree: 'B.Sc. in Civil Engineering',
        institution: 'BAUST',
        field: 'Structural Engineering',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Civil/Structural', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 62 },
      { name: 'Business & Marketing', category: 'Project Management', level: 'Advanced', isExpertise: false, endorsements: 28 },
      { name: 'Competitive Exams (BCS, Bank)', category: 'Govt & Semi-Govt', level: 'Intermediate', isExpertise: false, endorsements: 19 }
    ],
    interestedFields: ['Bridge Engineering', 'Project Execution', 'Pre-stressed Concrete', 'Safety Standards'],
    certifications: [
      { id: 'c15-1', title: 'AutoCAD & ETABS Advanced Modeling', issuer: 'CADD Center', year: '2020' }
    ],
    publications: [],
    achievements: ['Outstanding Site Execution Award - MAX Group 2022'],
    studentsConsulted: 55,
    sessionsCompleted: 41,
    averageRating: 4.86,
    totalReviews: 32,
    responseTime: '< 4 hours',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 22 },
      { topic: 'Interview Prep', count: 14 },
      { topic: 'CV Review', count: 5 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/mehedi-bappy-civil',
    lastActive: '3 days ago',
    lastUpdated: 'Oct 25, 2026'
  },
  {
    id: 'alm-16',
    name: 'Nayeem Ashraf',
    email: 'ashraf.nayeem@monash.edu',
    phone: '+61400112233',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '12 Jan 2024',
    studentId: '16CSE022',
    department: 'CSE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.92,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Explainable AI for Early Lung Cancer Detection in CT Scans',
    thesisSupervisor: 'Prof. Dr. M. A. Karim',
    honors: "Dean's Gold Medalist",
    clubs: ['BAUST Machine Learning Study Group'],
    scholarships: 'Monash Graduate Excellence Scholarship',
    currentPosition: 'Ph.D. Researcher in Medical AI',
    currentCompany: 'Monash University',
    sector: 'Abroad',
    joiningDate: 'Feb 2022',
    location: 'Melbourne, Australia',
    country: 'Australia',
    roleDescription: 'Developing multimodal foundation models for clinical radiology diagnostics.',
    careerStory: 'Graduated from BAUST CSE with 3.92 CGPA. Published 2 research papers during undergrad and won a fully funded Ph.D. at Monash in Melbourne.',
    bio: 'Medical AI researcher at Monash University. Mentoring students on research methodology, paper publishing, and Australian university admissions.',
    yearsOfExperience: 5,
    abroadInstitution: 'Monash University',
    abroadCountry: 'Australia',
    abroadProgram: 'Ph.D. in Computer Science & Medical Imaging',
    workExperience: [
      {
        id: 'w16-1',
        title: 'Graduate Research Assistant',
        organization: 'Monash University Faculty of IT',
        type: 'Full-time',
        period: 'Feb 2022 - Present',
        location: 'Melbourne, Australia',
        responsibilities: 'Deep learning research on medical scans.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e16-1',
        degree: 'Ph.D. in Computer Science',
        institution: 'Monash University',
        field: 'Artificial Intelligence',
        country: 'Australia',
        year: '2022 - Present'
      },
      {
        id: 'e16-2',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Computer Science',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'AI & Machine Learning', category: 'AI', level: 'Expert', isExpertise: true, endorsements: 67 },
      { name: 'Research & Academic Writing', category: 'Academia', level: 'Expert', isExpertise: true, endorsements: 59 },
      { name: 'IELTS/GRE/Scholarship Prep', category: 'Higher Study', level: 'Expert', isExpertise: true, endorsements: 54 }
    ],
    interestedFields: ['Healthcare AI', 'Computer Vision', 'Foundation Models', 'Higher Study in Australia'],
    certifications: [
      { id: 'c16-1', title: 'IELTS Band 8.5 Certificate', issuer: 'British Council', year: '2021' }
    ],
    publications: [
      { id: 'p16-1', title: 'Transformer-based Multi-modal Radiology Classification', type: 'Publication', description: 'MICCAI 2023', year: '2023' }
    ],
    achievements: ['Monash International Tuition Fee Waiver + Stipend'],
    studentsConsulted: 84,
    sessionsCompleted: 66,
    averageRating: 4.97,
    totalReviews: 52,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Higher Studies', count: 38 },
      { topic: 'Project/Thesis Help', count: 18 },
      { topic: 'CV Review', count: 10 }
    ],
    testimonials: [
      {
        id: 't16-1',
        studentName: 'Shakil Anwar',
        studentDept: 'CSE',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '24 Oct 2026',
        comment: 'Nayeem bhaiya’s feedback on paper writing and LaTeX formatting helped us get accepted in an IEEE conference!'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/nayeem-ashraf-ai',
    lastActive: '5 hours ago',
    lastUpdated: 'Nov 04, 2026'
  },
  {
    id: 'alm-17',
    name: 'Sabrina Mostafa',
    email: 'sabrina.m@unilever.com',
    phone: '+8801744556677',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '14 Mar 2024',
    studentId: '17BBA014',
    department: 'BBA',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.81,
    degree: 'Bachelor of Business Administration (Marketing & HR)',
    thesisTitle: 'Employer Branding and Gen-Z Talent Retention in FMCG Sector of Bangladesh',
    thesisSupervisor: 'Assoc. Prof. K. M. Hossain',
    honors: "Dean's Honor Roll",
    clubs: ['BAUST Debating Society (President 2020)'],
    currentPosition: 'Assistant Brand Manager',
    currentCompany: 'Unilever Bangladesh Ltd.',
    sector: 'Multinational',
    joiningDate: 'Jan 2022',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Leading digital brand campaigns, trade marketing, and market share analytics for personal care brands.',
    careerStory: 'Winner of Unilever BizMaestros BAUST campus round. Joined Unilever Leadership Internship Programme (ULIP) and converted to full-time ABM.',
    bio: 'FMCG brand strategist at Unilever. Passionate about marketing case competitions, corporate CVs, and assessment center preparation.',
    yearsOfExperience: 4,
    workExperience: [
      {
        id: 'w17-1',
        title: 'Assistant Brand Manager',
        organization: 'Unilever Bangladesh',
        type: 'Full-time',
        period: 'Jan 2022 - Present',
        location: 'Dhaka',
        responsibilities: 'Campaign execution and media spend optimization.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e17-1',
        degree: 'BBA in Marketing',
        institution: 'BAUST',
        field: 'Business Administration',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Business & Marketing', category: 'Marketing', level: 'Expert', isExpertise: true, endorsements: 61 },
      { name: 'Research & Academic Writing', category: 'General', level: 'Advanced', isExpertise: false, endorsements: 27 },
      { name: 'Web Development', category: 'Digital', level: 'Intermediate', isExpertise: false, endorsements: 16 }
    ],
    interestedFields: ['Brand Management', 'Consumer Insights', 'Case Competitions', 'FMCG Corporate Careers'],
    certifications: [
      { id: 'c17-1', title: 'Google Digital Marketing Professional', issuer: 'Google', year: '2021' }
    ],
    publications: [],
    achievements: ['Unilever BizMaestros Campus Champion 2020'],
    studentsConsulted: 60,
    sessionsCompleted: 45,
    averageRating: 4.91,
    totalReviews: 36,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'CV Review', count: 24 },
      { topic: 'Interview Prep', count: 15 },
      { topic: 'Career Guidance', count: 6 }
    ],
    testimonials: [
      {
        id: 't17-1',
        studentName: 'Tasnim Jahan',
        studentDept: 'BBA',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '21 Oct 2026',
        comment: 'Sabrina Apu helped me structure my case presentation for a national competition. Her tips made all the difference!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/sabrina-mostafa-unilever',
    lastActive: 'Today, 1:15 PM',
    lastUpdated: 'Nov 06, 2026'
  },
  {
    id: 'alm-18',
    name: 'Zahid Hasan Rony',
    email: 'zahid.rony@waltonbd.com',
    phone: '+8801755112233',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '22 Feb 2024',
    studentId: '16EEE088',
    department: 'EEE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.61,
    degree: 'B.Sc. in Electrical & Electronic Engineering',
    thesisTitle: 'Firmware Design for Smart Inverter PCB with ESP32 and MQTT Protocol',
    thesisSupervisor: 'Engr. S. M. Faruq',
    honors: 'Best Embedded Project',
    clubs: ['BAUST Robotics Club (Technical Lead 2019)'],
    currentPosition: 'Senior Embedded Systems & Firmware Engineer',
    currentCompany: 'Walton Hi-Tech Industries PLC',
    sector: 'Private',
    joiningDate: 'Mar 2021',
    location: 'Chandra, Gazipur, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Developing microcontroller firmware, RTOS drivers, and smart home IoT appliances at Walton R&I center.',
    careerStory: 'Built robotics projects at BAUST. Joined Walton R&I electronics division and designed firmware running on over 500,000 smart ACs and refrigerators.',
    bio: 'Embedded firmware engineer specializing in STM32, ESP-IDF, RTOS, and hardware debugging. Helping electronics engineers build real hardware careers.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w18-1',
        title: 'Senior Firmware Engineer',
        organization: 'Walton Hi-Tech Industries',
        type: 'Full-time',
        period: 'Mar 2021 - Present',
        location: 'Gazipur',
        responsibilities: 'PCB bring-up, C/C++ firmware, and IoT cloud protocol integration.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e18-1',
        degree: 'B.Sc. in EEE',
        institution: 'BAUST',
        field: 'Embedded Electronics',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Embedded Systems/IoT', category: 'Hardware', level: 'Expert', isExpertise: true, endorsements: 57 },
      { name: 'Power & Energy', category: 'Electrical', level: 'Advanced', isExpertise: true, endorsements: 34 },
      { name: 'Networking & Cloud', category: 'IoT', level: 'Advanced', isExpertise: false, endorsements: 22 }
    ],
    interestedFields: ['Microcontrollers', 'FreeRTOS', 'Smart Home IoT', 'Hardware Design'],
    certifications: [
      { id: 'c18-1', title: 'Arm Accredited MCU Engineer', issuer: 'Arm', year: '2022' }
    ],
    publications: [],
    achievements: ['Champion - BAUST Roborace 2019'],
    studentsConsulted: 53,
    sessionsCompleted: 39,
    averageRating: 4.88,
    totalReviews: 31,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Project/Thesis Help', count: 20 },
      { topic: 'Interview Prep', count: 12 },
      { topic: 'Skill Roadmap', count: 7 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/zahid-rony-embedded',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 03, 2026'
  },
  {
    id: 'alm-19',
    name: 'Md. Anisur Rahman',
    email: 'anis.rahman@bcs-pwd.gov.bd',
    phone: '+8801715566778',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '15 Feb 2024',
    studentId: '15CE010',
    department: 'Civil',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.72,
    degree: 'B.Sc. in Civil Engineering',
    thesisTitle: 'Soil Improvement using Lime and Fly Ash Admixtures in Northern Floodplains',
    thesisSupervisor: 'Prof. Dr. A. K. M. Bashir',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST Civil Engineering Club (President)'],
    currentPosition: 'Executive Engineer (40th BCS Public Works Cadre)',
    currentCompany: 'Public Works Department (PWD), Govt. of Bangladesh',
    sector: 'Government',
    joiningDate: 'Jan 2022',
    location: 'Segunbagicha, Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Supervising government building construction projects, structural vetting, and public tender evaluations.',
    careerStory: 'Graduated in 2019, selected in 40th BCS Technical Cadre (Civil). Serving as Assistant/Executive Engineer at PWD.',
    bio: 'BCS (Public Works) Cadre Engineer. Ready to guide Civil and EEE students targeting BCS Technical cadre and BPDB/DESCO assistant engineer exams.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w19-1',
        title: 'Executive Engineer',
        organization: 'Public Works Department (PWD)',
        type: 'Full-time',
        period: 'Jan 2022 - Present',
        location: 'Dhaka',
        responsibilities: 'Govt infrastructure building oversight and public procurement.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e19-1',
        degree: 'B.Sc. in Civil Engineering',
        institution: 'BAUST',
        field: 'Civil & Structural',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Competitive Exams (BCS, Bank)', category: 'Public Sector', level: 'Expert', isExpertise: true, endorsements: 66 },
      { name: 'Civil/Structural', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 51 },
      { name: 'Power & Energy', category: 'Infrastructure', level: 'Intermediate', isExpertise: false, endorsements: 20 }
    ],
    interestedFields: ['Public Procurement (e-GP)', 'PWD Engineering', 'BCS Technical Cadre', 'Green Buildings'],
    certifications: [
      { id: 'c19-1', title: 'National e-GP System Certified Procurement Specialist', issuer: 'CPTU', year: '2023' }
    ],
    publications: [],
    achievements: ['40th BCS Technical Cadre Top 10 Merit'],
    studentsConsulted: 79,
    sessionsCompleted: 61,
    averageRating: 4.94,
    totalReviews: 48,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 34 },
      { topic: 'Career Guidance', count: 19 },
      { topic: 'CV Review', count: 8 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/anisur-rahman-pwd',
    lastActive: 'Yesterday',
    lastUpdated: 'Oct 29, 2026'
  },
  {
    id: 'alm-20',
    name: 'Kazi Nabila Tahsin',
    email: 'nabila.tahsin@kth.se',
    phone: '+46701234567',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '05 Jan 2024',
    studentId: '17CSE003',
    department: 'CSE',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.96,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Quantum Cryptography Key Distribution over Lossy Fiber Channels',
    thesisSupervisor: 'Prof. Dr. M. A. Karim',
    honors: "Vice Chancellor's Gold Medalist",
    clubs: ['BAUST Science & Tech Club (Secretary)'],
    scholarships: 'Swedish Institute (SI) Scholarship for Global Professionals',
    currentPosition: 'M.Sc. Researcher in Cybersecurity & Cloud',
    currentCompany: 'KTH Royal Institute of Technology',
    sector: 'Abroad',
    joiningDate: 'Aug 2023',
    location: 'Stockholm, Sweden',
    country: 'Sweden',
    roleDescription: 'Researching zero-trust cloud microservice security architectures in Swedish Institute funded program.',
    careerStory: 'Graduated from BAUST as VC Gold Medalist with 3.96 CGPA. Awarded prestigious Swedish Institute (SI) full scholarship covering tuition and living allowance in Stockholm.',
    bio: 'Swedish Institute Scholar at KTH Stockholm. Dedicated to assisting BAUST students win SI scholarships, Swedish admissions, and European tech careers.',
    yearsOfExperience: 4,
    abroadInstitution: 'KTH Royal Institute of Technology',
    abroadCountry: 'Sweden',
    abroadProgram: 'M.Sc. in Cybersecurity',
    workExperience: [
      {
        id: 'w20-1',
        title: 'M.Sc. Researcher',
        organization: 'KTH Royal Institute of Technology',
        type: 'Full-time',
        period: 'Aug 2023 - Present',
        location: 'Stockholm, Sweden',
        responsibilities: 'Cloud enclave isolation and formal verification of cryptosystems.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e20-1',
        degree: 'M.Sc. in Cybersecurity',
        institution: 'KTH Royal Institute of Technology',
        field: 'Cybersecurity',
        country: 'Sweden',
        year: '2023 - Present'
      },
      {
        id: 'e20-2',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Computer Science',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Cybersecurity', category: 'Security', level: 'Expert', isExpertise: true, endorsements: 63 },
      { name: 'Research & Academic Writing', category: 'Academia', level: 'Expert', isExpertise: true, endorsements: 58 },
      { name: 'IELTS/GRE/Scholarship Prep', category: 'Higher Study', level: 'Expert', isExpertise: true, endorsements: 69 }
    ],
    interestedFields: ['Zero-Trust', 'Cloud Security', 'European Scholarships (SI)', 'Cryptography'],
    certifications: [
      { id: 'c20-1', title: 'IELTS Band 8.0 Certificate', issuer: 'IDP', year: '2022' }
    ],
    publications: [
      { id: 'p20-1', title: 'Formally Verified Microservices Enclaves in Confidential Cloud', type: 'Publication', description: 'IEEE EuroS&P Workshop', year: '2024' }
    ],
    achievements: ['Swedish Institute Global Professionals Scholarship 2023', 'BAUST VC Gold Medal 2021'],
    studentsConsulted: 91,
    sessionsCompleted: 73,
    averageRating: 4.98,
    totalReviews: 59,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'Higher Studies', count: 42 },
      { topic: 'CV Review', count: 19 },
      { topic: 'Skill Roadmap', count: 12 }
    ],
    testimonials: [
      {
        id: 't20-1',
        studentName: 'Lamia Islam',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '30 Oct 2026',
        comment: 'Nabila Apu’s advice on the SI scholarship leadership essay gave me the confidence to submit. She is so thorough!'
      }
    ],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/nabila-tahsin-kth',
    lastActive: 'Today, 8:30 AM',
    lastUpdated: 'Nov 06, 2026'
  },
  {
    id: 'alm-21',
    name: 'Rashedul Islam Chowdhury',
    email: 'rashed.chowdhury@therapbd.com',
    phone: '+8801719887766',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '18 Mar 2024',
    studentId: '15CSE064',
    department: 'CSE',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.69,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'HIPAA-Compliant Electronic Health Record Architecture in Java Spring Boot',
    thesisSupervisor: 'Engr. S. M. Faruq',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST Computer Club'],
    currentPosition: 'Senior Software Engineer (Java & Healthcare)',
    currentCompany: 'Therap (BD) Ltd.',
    sector: 'Multinational',
    joiningDate: 'Aug 2019',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Engineering large-scale US healthcare software serving thousands of developmental disability providers.',
    careerStory: 'Cracked the competitive Therap written test and interview right after graduating in 2019. Working on enterprise Java backends.',
    bio: 'Software engineer at Therap (BD) Ltd. Passionate about Java, Spring Boot, clean architecture, and Therap recruitment tips.',
    yearsOfExperience: 7,
    workExperience: [
      {
        id: 'w21-1',
        title: 'Senior Software Engineer',
        organization: 'Therap (BD) Ltd.',
        type: 'Full-time',
        period: 'Aug 2019 - Present',
        location: 'Dhaka',
        responsibilities: 'Backend Spring Boot microservices, Oracle SQL optimization.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e21-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Software Engineering',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Web Development', category: 'Software', level: 'Expert', isExpertise: true, endorsements: 58 },
      { name: 'Networking & Cloud', category: 'Infrastructure', level: 'Advanced', isExpertise: true, endorsements: 35 },
      { name: 'Cybersecurity', category: 'Compliance', level: 'Intermediate', isExpertise: false, endorsements: 19 }
    ],
    interestedFields: ['Enterprise Java', 'US Healthcare Tech', 'Database Performance', 'Therap Hiring Process'],
    certifications: [
      { id: 'c21-1', title: 'Oracle Certified Professional: Java SE 11 Developer', issuer: 'Oracle', year: '2021' }
    ],
    publications: [],
    achievements: ['Therap Long Service & Innovation Award 2024'],
    studentsConsulted: 70,
    sessionsCompleted: 52,
    averageRating: 4.89,
    totalReviews: 40,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 28 },
      { topic: 'CV Review', count: 16 },
      { topic: 'Skill Roadmap', count: 8 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/rashed-therap',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 01, 2026'
  },
  {
    id: 'alm-22',
    name: 'Ayesha Siddiqua',
    email: 'ayesha.s@envoygroup.com',
    phone: '+8801811223344',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '28 Jan 2024',
    studentId: '17TE011',
    department: 'Textile',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.79,
    degree: 'B.Sc. in Textile Engineering (Yarn Manufacturing)',
    thesisTitle: 'Spinning Performance of Recycled Cotton Fibers Blended with Organic Lyocell',
    thesisSupervisor: 'Engr. M. B. Rahman',
    honors: "Dean's List",
    clubs: ['BAUST Textile Society'],
    currentPosition: 'Senior Merchandiser (Global Accounts)',
    currentCompany: 'Envoy Textiles Ltd. (LEED Platinum Certified)',
    sector: 'Private',
    joiningDate: 'Dec 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Managing international apparel buyer accounts (Zara, H&M, Levi’s) for sustainable denim production.',
    careerStory: 'Graduated in 2021, joined Envoy Textiles as Management Trainee Merchandiser. Fast-tracked to Senior Merchandiser handling European brand orders.',
    bio: 'Textile engineer & senior apparel merchandiser. Helping students master cost sheets, fabric tech specs, buyer negotiations, and career growth in RMG.',
    yearsOfExperience: 4,
    workExperience: [
      {
        id: 'w22-1',
        title: 'Senior Merchandiser',
        organization: 'Envoy Textiles Ltd.',
        type: 'Full-time',
        period: 'Dec 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Buyer communications, order budgeting, and production follow-up.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e22-1',
        degree: 'B.Sc. in Textile Engineering',
        institution: 'BAUST',
        field: 'Yarn & Apparel Merchandising',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Textile Engineering', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 56 },
      { name: 'Business & Marketing', category: 'Merchandising', level: 'Expert', isExpertise: true, endorsements: 48 },
      { name: 'Research & Academic Writing', category: 'Sustainability', level: 'Intermediate', isExpertise: false, endorsements: 17 }
    ],
    interestedFields: ['RMG Merchandising', 'Sustainable Denim', 'Supply Chain Management', 'Buyer Negotiation'],
    certifications: [
      { id: 'c22-1', title: 'Certified Supply Chain Professional (CSCP) Module 1', issuer: 'APICS', year: '2023' }
    ],
    publications: [],
    achievements: ['Envoy Star Performer in Global Merchandising 2023'],
    studentsConsulted: 44,
    sessionsCompleted: 33,
    averageRating: 4.88,
    totalReviews: 26,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 18 },
      { topic: 'Interview Prep', count: 10 },
      { topic: 'CV Review', count: 5 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/ayesha-siddiqua-textiles',
    lastActive: 'Today, 3:00 PM',
    lastUpdated: 'Nov 05, 2026'
  },
  {
    id: 'alm-23',
    name: 'Engr. Tanvir Ahmed Robin',
    email: 'tanvir.robin@desco.org.bd',
    phone: '+8801766554433',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '17 Feb 2024',
    studentId: '15EEE028',
    department: 'EEE',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.64,
    degree: 'B.Sc. in Electrical & Electronic Engineering',
    thesisTitle: 'SCADA-Integrated Underground Substation Automation in Dhaka City',
    thesisSupervisor: 'Engr. M. G. Mostafa',
    honors: 'Dean’s Honor List',
    clubs: ['IEEE BAUST'],
    currentPosition: 'Sub-Divisional Engineer (Grid & Substation)',
    currentCompany: 'Dhaka Electric Supply Company Ltd. (DESCO)',
    sector: 'Government',
    joiningDate: 'Jan 2020',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Supervising 132/33kV grid substations, power transformers, and SCADA automation protocols.',
    careerStory: 'Graduated in 2019, cracked the DESCO Assistant Engineer competitive exam with 5th merit position. Promoted to SDE.',
    bio: 'Power sector engineer at DESCO. Helping EEE graduates crack power sector exams (BPDB, DESCO, DPDC, PGCB).',
    yearsOfExperience: 6,
    workExperience: [
      {
        id: 'w23-1',
        title: 'Sub-Divisional Engineer',
        organization: 'DESCO',
        type: 'Full-time',
        period: 'Jan 2020 - Present',
        location: 'Dhaka',
        responsibilities: 'High-voltage grid maintenance, protection relay coordination.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e23-1',
        degree: 'B.Sc. in EEE',
        institution: 'BAUST',
        field: 'Power Systems',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Power & Energy', category: 'Power', level: 'Expert', isExpertise: true, endorsements: 64 },
      { name: 'Competitive Exams (BCS, Bank)', category: 'Govt Sector', level: 'Expert', isExpertise: true, endorsements: 53 },
      { name: 'Embedded Systems/IoT', category: 'SCADA', level: 'Intermediate', isExpertise: false, endorsements: 21 }
    ],
    interestedFields: ['Power Grid Substation', 'Protective Relays', 'Power Sector Recruitment', 'Smart Metering'],
    certifications: [
      { id: 'c23-1', title: 'Substation Automation and Protection Protocol Specialist', issuer: 'ABB', year: '2022' }
    ],
    publications: [],
    achievements: ['5th Merit Position DESCO Assistant Engineer Recruitment 2019'],
    studentsConsulted: 83,
    sessionsCompleted: 64,
    averageRating: 4.93,
    totalReviews: 50,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 35 },
      { topic: 'Career Guidance', count: 20 },
      { topic: 'CV Review', count: 9 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: false,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/tanvir-robin-desco',
    lastActive: '4 hours ago',
    lastUpdated: 'Nov 02, 2026'
  },
  {
    id: 'alm-24',
    name: 'Farhan Kabir',
    email: 'farhan.kabir@bracu.ac.bd',
    phone: '+8801722334455',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '12 Feb 2024',
    studentId: '16CSE007',
    department: 'CSE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.93,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Deep Reinforcement Learning for Autonomous Drone Path Planning in GPS-Denied Environments',
    thesisSupervisor: 'Prof. Dr. M. A. Karim',
    honors: "Dean's Gold Medalist",
    clubs: ['BAUST Robotics Club', 'Debating Society'],
    currentPosition: 'Lecturer in Computer Science',
    currentCompany: 'BRAC University',
    sector: 'Research',
    joiningDate: 'Oct 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Teaching Algorithms, Data Structures, and conducting research on Robotics & Reinforcement Learning.',
    careerStory: 'Graduated 2nd in BAUST CSE. Joined BRAC University as a full-time Lecturer. Mentoring undergraduate thesis students and preparing for Ph.D.',
    bio: 'University Lecturer & AI researcher. Passionate about algorithms, academic career paths, and helping students craft research papers.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w24-1',
        title: 'Lecturer in Computer Science',
        organization: 'BRAC University',
        type: 'Full-time',
        period: 'Oct 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Undergraduate lectures in Algorithms, Operating Systems, and Lab coordination.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e24-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Computer Science',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Research & Academic Writing', category: 'Academia', level: 'Expert', isExpertise: true, endorsements: 62 },
      { name: 'AI & Machine Learning', category: 'AI', level: 'Expert', isExpertise: true, endorsements: 57 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: false, endorsements: 29 }
    ],
    interestedFields: ['Reinforcement Learning', 'Robotics', 'Academic Teaching', 'Higher Studies in US/Canada'],
    certifications: [
      { id: 'c24-1', title: 'NVIDIA Certified Instructor for Deep Learning', issuer: 'NVIDIA Deep Learning Institute', year: '2022' }
    ],
    publications: [
      { id: 'p24-1', title: 'Q-Learning Convergence in Dense Obstacle Drone Navigation', type: 'Publication', description: 'IEEE Access Journal', year: '2023' }
    ],
    achievements: ['BRAC University Faculty Excellence Commendation 2023'],
    studentsConsulted: 74,
    sessionsCompleted: 58,
    averageRating: 4.95,
    totalReviews: 45,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'Project/Thesis Help', count: 32 },
      { topic: 'Higher Studies', count: 18 },
      { topic: 'Career Guidance', count: 8 }
    ],
    testimonials: [
      {
        id: 't24-1',
        studentName: 'Nusrat Tabassum',
        studentDept: 'CSE',
        studentBatch: '7th Batch',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '26 Oct 2026',
        comment: 'Farhan Sir helped debug our reinforcement learning model reward function. Exceptional educator!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/farhan-kabir-bracu',
    github: 'https://github.com/farhan-ai-robotics',
    lastActive: '1 hour ago',
    lastUpdated: 'Nov 07, 2026'
  },
  {
    id: 'alm-25',
    name: 'Shadman Shakib',
    email: 'shadman.shakib@daraz.com',
    phone: '+8801777889900',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '19 Feb 2024',
    studentId: '17BBA029',
    department: 'BBA',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.73,
    degree: 'Bachelor of Business Administration (Supply Chain & Operations)',
    thesisTitle: 'Last-Mile Delivery Bottleneck Reduction in E-commerce during Flash Sales',
    thesisSupervisor: 'Assoc. Prof. K. M. Hossain',
    honors: 'Best Business Case Solution',
    clubs: ['BAUST Supply Chain Club'],
    currentPosition: 'Senior Operations & Logistics Manager',
    currentCompany: 'Daraz Bangladesh (Alibaba Group)',
    sector: 'Multinational',
    joiningDate: 'Nov 2021',
    location: 'Tejgaon, Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Overseeing fulfillment centers, sorting hubs, and 3PL fleet performance across Bangladesh.',
    careerStory: 'Graduated in BBA from BAUST. Joined Daraz as Operations Executive and promoted twice to Senior Manager overseeing 11.11 logistics campaign.',
    bio: 'E-commerce logistics & supply chain leader at Daraz. Glad to mentor students in supply chain operations, fleet management, and corporate analytics.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w25-1',
        title: 'Senior Operations Manager',
        organization: 'Daraz Bangladesh',
        type: 'Full-time',
        period: 'Nov 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Hub throughput planning and automated routing optimization.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e25-1',
        degree: 'BBA in Operations & Supply Chain',
        institution: 'BAUST',
        field: 'Business Administration',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Business & Marketing', category: 'Operations', level: 'Expert', isExpertise: true, endorsements: 54 },
      { name: 'Data Science', category: 'Analytics', level: 'Advanced', isExpertise: true, endorsements: 38 },
      { name: 'Web Development', category: 'Tech', level: 'Intermediate', isExpertise: false, endorsements: 15 }
    ],
    interestedFields: ['Supply Chain', 'E-commerce Fulfillment', 'Last-Mile Logistics', 'Warehouse Robotics'],
    certifications: [
      { id: 'c25-1', title: 'Lean Six Sigma Green Belt', issuer: 'IASSC', year: '2023' }
    ],
    publications: [],
    achievements: ['Daraz 11.11 Logistics Hero Award 2023'],
    studentsConsulted: 49,
    sessionsCompleted: 35,
    averageRating: 4.87,
    totalReviews: 28,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 20 },
      { topic: 'Interview Prep', count: 10 },
      { topic: 'CV Review', count: 5 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/shadman-shakib-daraz',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 01, 2026'
  },
  {
    id: 'alm-26',
    name: 'Engr. Rakibul Hasan',
    email: 'rakibul.ce@concordgroup.com',
    phone: '+8801733990011',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '15 Jan 2024',
    studentId: '16CE048',
    department: 'Civil',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.63,
    degree: 'B.Sc. in Civil Engineering',
    thesisTitle: 'High-Strength Concrete Mix Design Utilizing Recycled Coarse Aggregates',
    thesisSupervisor: 'Prof. Dr. A. K. M. Bashir',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST Civil Engineering Club'],
    currentPosition: 'Senior Structural Design Engineer',
    currentCompany: 'Concord Real Estate & Building Products',
    sector: 'Private',
    joiningDate: 'Jan 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Designing 20+ story earthquake-resistant commercial towers in Gulshan & Dhanmondi.',
    careerStory: 'Joined Concord right after graduation. Specializing in high-rise concrete structural modeling with ETABS and SAFE.',
    bio: 'Structural engineer at Concord. Passionate about structural design standards (BNBC 2020), site testing, and structural CAD modeling.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w26-1',
        title: 'Senior Structural Design Engineer',
        organization: 'Concord Real Estate',
        type: 'Full-time',
        period: 'Jan 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Structural calculation reports and RAJUK drawing submissions.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e26-1',
        degree: 'B.Sc. in Civil Engineering',
        institution: 'BAUST',
        field: 'Structural Engineering',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Civil/Structural', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 57 },
      { name: 'Power & Energy', category: 'Infrastructure', level: 'Intermediate', isExpertise: false, endorsements: 18 }
    ],
    interestedFields: ['BNBC 2020 Codes', 'ETABS/SAFE', 'Earthquake Engineering', 'High-Rise Construction'],
    certifications: [
      { id: 'c26-1', title: 'ETABS Professional Seismic Design Certification', issuer: 'CSI Berkeley Partner', year: '2022' }
    ],
    publications: [],
    achievements: ['Concord Design Excellence Recognition 2023'],
    studentsConsulted: 46,
    sessionsCompleted: 34,
    averageRating: 4.88,
    totalReviews: 27,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Project/Thesis Help', count: 18 },
      { topic: 'Career Guidance', count: 10 },
      { topic: 'CV Review', count: 6 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/rakibul-concord',
    lastActive: '2 days ago',
    lastUpdated: 'Nov 02, 2026'
  },
  {
    id: 'alm-27',
    name: 'Tamanna Haque',
    email: 'tamanna.h@ha-meem.com',
    phone: '+8801744112233',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '10 Feb 2024',
    studentId: '17TE032',
    department: 'Textile',
    batch: '3rd Batch (2017)',
    admissionYear: '2017',
    passingYear: '2021',
    cgpa: 3.76,
    degree: 'B.Sc. in Textile Engineering (Apparel Manufacturing)',
    thesisTitle: 'Implementation of Lean Line Balancing in Woven Shirt Assembly Lines',
    thesisSupervisor: 'Engr. M. B. Rahman',
    honors: 'Best Industrial Engineering Project',
    clubs: ['BAUST Textile Society'],
    currentPosition: 'Senior Industrial Engineer (IE & Productivity)',
    currentCompany: 'Ha-Meem Group',
    sector: 'Private',
    joiningDate: 'Oct 2021',
    location: 'Narayanganj, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Conducting time & motion study, SAM calculation, and automated machinery integration.',
    careerStory: 'Graduated in Textile Engineering from BAUST. Joined Ha-Meem Group IE division. Spearheaded 18% sewing floor productivity jump.',
    bio: 'Textile Industrial Engineer at Ha-Meem Group. Helping students understand garment IE, line layout design, and production management.',
    yearsOfExperience: 4,
    workExperience: [
      {
        id: 'w27-1',
        title: 'Senior Industrial Engineer',
        organization: 'Ha-Meem Group',
        type: 'Full-time',
        period: 'Oct 2021 - Present',
        location: 'Narayanganj',
        responsibilities: 'SMV calculation, bottleneck analysis, and Kaizen workshops.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e27-1',
        degree: 'B.Sc. in Textile Engineering',
        institution: 'BAUST',
        field: 'Apparel Manufacturing & IE',
        country: 'Bangladesh',
        year: '2017 - 2021'
      }
    ],
    skills: [
      { name: 'Textile Engineering', category: 'Engineering', level: 'Expert', isExpertise: true, endorsements: 55 },
      { name: 'Business & Marketing', category: 'Operations', level: 'Advanced', isExpertise: true, endorsements: 39 },
      { name: 'Research & Academic Writing', category: 'General', level: 'Intermediate', isExpertise: false, endorsements: 16 }
    ],
    interestedFields: ['Industrial Engineering', 'Apparel Automation', 'Lean Manufacturing', 'Kaizen'],
    certifications: [
      { id: 'c27-1', title: 'GSD (General Sewing Data) Licensed Practitioner', issuer: 'GSD Corporate', year: '2022' }
    ],
    publications: [],
    achievements: ['Ha-Meem Best Productivity Enhancement Project 2023'],
    studentsConsulted: 43,
    sessionsCompleted: 31,
    averageRating: 4.86,
    totalReviews: 24,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Interview Prep', count: 16 },
      { topic: 'Career Guidance', count: 11 },
      { topic: 'CV Review', count: 4 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/tamanna-hameem',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 04, 2026'
  },
  {
    id: 'alm-28',
    name: 'Engr. Arifur Rahman',
    email: 'arifur.rahman@chobirbazaar.com',
    phone: '+8801912334455',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '12 Jan 2024',
    studentId: '15CSE018',
    department: 'CSE',
    batch: '1st Batch (2015)',
    admissionYear: '2015',
    passingYear: '2019',
    cgpa: 3.55,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Scalable Image Compression & AI Watermarking System for Creators',
    thesisSupervisor: 'Engr. S. M. Faruq',
    honors: 'Top Tech Entrepreneur BAUST',
    clubs: ['BAUST Photography Club (President)', 'Computer Club'],
    currentPosition: 'Founder & CEO',
    currentCompany: 'Chobir Bazaar & PixelCraft Digital',
    sector: 'Business',
    joiningDate: 'Jan 2020',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Running a creative stock photography marketplace and digital design agency with 25 full-time staff.',
    careerStory: 'Combined love for photography and coding during BAUST undergrad. Bootstrapped Chobir Bazaar to 50k monthly active users.',
    bio: 'Founder, creative technologist, and digital agency owner. Mentoring students wanting to build their own creative tech businesses.',
    yearsOfExperience: 6,
    workExperience: [
      {
        id: 'w28-1',
        title: 'Founder & CEO',
        organization: 'PixelCraft Digital / Chobir Bazaar',
        type: 'Full-time',
        period: 'Jan 2020 - Present',
        location: 'Dhaka',
        responsibilities: 'Business strategy, product innovation, and client growth.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e28-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Software & Digital Media',
        country: 'Bangladesh',
        year: '2015 - 2019'
      }
    ],
    skills: [
      { name: 'Business & Marketing', category: 'Entrepreneurship', level: 'Expert', isExpertise: true, endorsements: 59 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: true, endorsements: 42 },
      { name: 'AI & Machine Learning', category: 'Creative Tech', level: 'Intermediate', isExpertise: false, endorsements: 20 }
    ],
    interestedFields: ['Creative Startups', 'Digital Agencies', 'UI/UX Design', 'E-commerce Platforms'],
    certifications: [
      { id: 'c28-1', title: 'HubSpot Inbound Marketing Certified', issuer: 'HubSpot', year: '2021' }
    ],
    publications: [],
    achievements: ['Dhaka Creative Business Award 2022'],
    studentsConsulted: 52,
    sessionsCompleted: 38,
    averageRating: 4.89,
    totalReviews: 30,
    responseTime: '< 3 hours',
    topTopicsHelped: [
      { topic: 'Career Guidance', count: 21 },
      { topic: 'Skill Roadmap', count: 12 },
      { topic: 'CV Review', count: 5 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Hidden',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/arifur-pixelcraft',
    lastActive: 'Today, 10:00 AM',
    lastUpdated: 'Nov 05, 2026'
  },
  {
    id: 'alm-29',
    name: 'Sumaiya Binte Shahid',
    email: 'sumaiya.shahid@dhl.com',
    phone: '+8801822119988',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '24 Feb 2024',
    studentId: '16BBA041',
    department: 'BBA',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.77,
    degree: 'Bachelor of Business Administration (International Business)',
    thesisTitle: 'Cross-Border Air Freight Customs Clearance Automation in Bangladesh',
    thesisSupervisor: 'Assoc. Prof. K. M. Hossain',
    honors: "Dean's Honor Roll",
    clubs: ['BAUST Business Club'],
    currentPosition: 'Key Account Manager (Air & Ocean Freight)',
    currentCompany: 'DHL Global Forwarding Bangladesh',
    sector: 'Multinational',
    joiningDate: 'Jan 2021',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Managing high-value enterprise air freight accounts for international pharma and apparel exporters.',
    careerStory: 'Graduated in BBA from BAUST. Joined DHL Global Forwarding as commercial executive and climbed to Key Account Manager.',
    bio: 'Supply chain & international logistics specialist at DHL. Helping students understand global freight, MNC corporate interviews, and B2B key account management.',
    yearsOfExperience: 5,
    workExperience: [
      {
        id: 'w29-1',
        title: 'Key Account Manager',
        organization: 'DHL Global Forwarding',
        type: 'Full-time',
        period: 'Jan 2021 - Present',
        location: 'Dhaka',
        responsibilities: 'Commercial freight contracts, customs brokerage, and revenue forecasting.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e29-1',
        degree: 'BBA in International Business',
        institution: 'BAUST',
        field: 'Business Administration',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Business & Marketing', category: 'Sales & Logistics', level: 'Expert', isExpertise: true, endorsements: 53 },
      { name: 'Research & Academic Writing', category: 'General', level: 'Advanced', isExpertise: false, endorsements: 22 },
      { name: 'Data Science', category: 'Analytics', level: 'Intermediate', isExpertise: false, endorsements: 17 }
    ],
    interestedFields: ['Global Logistics', 'Air Cargo', 'MNC Careers', 'International Trade Policy'],
    certifications: [
      { id: 'c29-1', title: 'FIATA International Freight Forwarding Diploma', issuer: 'FIATA', year: '2022' }
    ],
    publications: [],
    achievements: ['DHL Customer Delight Excellence Award 2023'],
    studentsConsulted: 47,
    sessionsCompleted: 36,
    averageRating: 4.89,
    totalReviews: 29,
    responseTime: '< 2 hours',
    topTopicsHelped: [
      { topic: 'CV Review', count: 18 },
      { topic: 'Interview Prep', count: 12 },
      { topic: 'Career Guidance', count: 6 }
    ],
    testimonials: [],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: true,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/sumaiya-shahid-dhl',
    lastActive: 'Yesterday',
    lastUpdated: 'Nov 03, 2026'
  },
  {
    id: 'alm-30',
    name: 'Engr. Mahmudul Hasan',
    email: 'mahmud.upwork@gmail.com',
    phone: '+8801711009988',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    verifiedDate: '15 Mar 2024',
    studentId: '16CSE055',
    department: 'CSE',
    batch: '2nd Batch (2016)',
    admissionYear: '2016',
    passingYear: '2020',
    cgpa: 3.65,
    degree: 'B.Sc. in Computer Science & Engineering',
    thesisTitle: 'Real-time Cross-Platform Flutter Mobile Apps for Healthcare Dispatch',
    thesisSupervisor: 'Dr. Md. Tariqul Islam',
    honors: 'Dean’s Honor List',
    clubs: ['BAUST Mobile Devs Community'],
    currentPosition: 'Senior Flutter Specialist & Mobile Architect',
    currentCompany: 'Toptal & Remote US Agency',
    sector: 'Freelancing',
    joiningDate: 'May 2020',
    location: 'Saidpur / Remote, Bangladesh',
    country: 'Bangladesh',
    roleDescription: 'Building high-performance Flutter iOS and Android applications for Silicon Valley startups through Toptal.',
    careerStory: 'Passed Toptal’s rigorous top-3% developer screening while staying in Northern Bangladesh. Delivered 40+ production mobile applications.',
    bio: 'Toptal certified Flutter & iOS developer. Helping students master Dart, Flutter Clean Architecture, BLoC pattern, and pass international developer screenings.',
    yearsOfExperience: 6,
    workExperience: [
      {
        id: 'w30-1',
        title: 'Senior Mobile Engineer (Toptal)',
        organization: 'Toptal / US Tech Startups',
        type: 'Full-time',
        period: 'May 2020 - Present',
        location: 'Remote',
        responsibilities: 'Flutter mobile application architecture, CI/CD with Fastlane, and app store deployment.',
        isCurrent: true
      }
    ],
    education: [
      {
        id: 'e30-1',
        degree: 'B.Sc. in CSE',
        institution: 'BAUST',
        field: 'Computer Science',
        country: 'Bangladesh',
        year: '2016 - 2020'
      }
    ],
    skills: [
      { name: 'Mobile App Development', category: 'Software', level: 'Expert', isExpertise: true, endorsements: 64 },
      { name: 'Web Development', category: 'Software', level: 'Advanced', isExpertise: true, endorsements: 39 },
      { name: 'Networking & Cloud', category: 'Cloud', level: 'Intermediate', isExpertise: false, endorsements: 22 }
    ],
    interestedFields: ['Flutter', 'Dart', 'Toptal Screening Prep', 'Remote Work Culture'],
    certifications: [
      { id: 'c30-1', title: 'Toptal Verified Developer Badge', issuer: 'Toptal', year: '2021' }
    ],
    publications: [],
    achievements: ['Toptal Top 3% Global Talent Network Member'],
    studentsConsulted: 68,
    sessionsCompleted: 51,
    averageRating: 4.92,
    totalReviews: 41,
    responseTime: '< 1 hour',
    topTopicsHelped: [
      { topic: 'Skill Roadmap', count: 26 },
      { topic: 'CV Review', count: 15 },
      { topic: 'Interview Prep', count: 10 }
    ],
    testimonials: [
      {
        id: 't30-1',
        studentName: 'Rashedul Kabir',
        studentDept: 'CSE',
        studentBatch: '8th Batch',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '27 Oct 2026',
        comment: 'Mahmudul bhaiya reviewed my Flutter app code architecture and helped me clear a US contract interview!'
      }
    ],
    openToMentoring: true,
    openToReferrals: true,
    hasHiringAuthority: false,
    showInDirectory: true,
    privacy: {
      cgpaVisibility: 'Public',
      showEmail: true,
      showPhone: false,
      showLinkedIn: true,
      showEmployer: true,
      showLocation: true
    },
    linkedIn: 'https://linkedin.com/in/mahmudul-flutter',
    github: 'https://github.com/mahmud-flutter',
    lastActive: 'Today, 11:15 AM',
    lastUpdated: 'Nov 07, 2026'
  }
];
