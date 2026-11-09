import { Mentor, MentorshipTopic } from '../types/mentorship';
import { initialAlumniProfiles } from './alumniProfiles';

export const initialMentors: Mentor[] = initialAlumniProfiles
  .filter((alumni) => alumni.openToMentoring)
  .map((alumni, index) => {
    // Generate topics based on skills/sector
    const topics: MentorshipTopic[] = ['CV Review', 'Career Guidance'];
    if (alumni.sector === 'Government') {
      topics.push('Interview Prep');
    }
    if (alumni.sector === 'Abroad' || alumni.sector === 'Higher Study') {
      topics.push('Higher Studies');
      topics.push('Project/Thesis Help');
    }
    if (alumni.skills.some(s => s.name === 'AI & Machine Learning' || s.name === 'Web Development' || s.name === 'Mobile App Development')) {
      topics.push('Interview Prep');
      topics.push('Skill Roadmap');
    }
    if (alumni.department === 'Civil' || alumni.department === 'Textile' || alumni.department === 'EEE') {
      topics.push('Project/Thesis Help');
    }

    const uniqueTopics = Array.from(new Set(topics)) as MentorshipTopic[];

    return {
      id: `men-${alumni.id}`,
      alumniId: alumni.id,
      name: alumni.name,
      avatar: alumni.avatar,
      verified: alumni.verified,
      designation: alumni.currentPosition,
      company: alumni.currentCompany,
      sector: alumni.sector,
      batch: alumni.batch,
      department: alumni.department,
      skills: alumni.skills.map((s) => s.name),
      topicsOffered: uniqueTopics,
      rating: alumni.averageRating,
      ratingCount: alumni.totalReviews,
      sessionsCompleted: alumni.sessionsCompleted,
      responseTime: alumni.responseTime,
      isAvailableNow: index % 3 === 0,
      isAvailableThisWeek: true,
      mentoringActive: true,
      bio: alumni.bio,
      abroadInfo: alumni.abroadInstitution 
        ? `${alumni.abroadProgram || 'Graduate Study'} at ${alumni.abroadInstitution}, ${alumni.abroadCountry}`
        : undefined,
      slots: [
        { id: `s1-${alumni.id}`, day: 'Friday', time: '08:00 PM - 09:00 PM', isBooked: false },
        { id: `s2-${alumni.id}`, day: 'Saturday', time: '07:30 PM - 08:30 PM', isBooked: false },
        { id: `s3-${alumni.id}`, day: 'Tuesday', time: '09:00 PM - 10:00 PM', isBooked: false }
      ],
      ratingBreakdown: {
        5: Math.round(alumni.totalReviews * 0.85),
        4: Math.round(alumni.totalReviews * 0.12),
        3: Math.round(alumni.totalReviews * 0.03),
        2: 0,
        1: 0
      }
    };
  });
