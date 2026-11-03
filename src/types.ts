export interface GithubRepo {
  id: number | string;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
  isFeatured?: boolean;
  cloneUrl: string;
  license?: string;
  readmePreview?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'systems' | 'creative' | 'mobile' | 'tools';
  year: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  architecture: string[];
  keyOutcomes: string[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'engineering' | 'architecture' | 'oss';
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  credentialType?: 'degree' | 'matric' | 'diploma';
  image?: string;
  badge?: string;
  scores?: { subject: string; score: string | number }[];
  certNumber?: string;
  logo?: string;
}

export interface Interest {
  id: string;
  title: string;
  category: string;
  image: string;
  tagline: string;
  description: string;
  tags: string[];
}

export interface FamilyMember {
  id: string;
  role: string;
  name: string;
  image: string;
  caption: string;
  note: string;
}


export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: 'Developer' | 'Designer' | 'Founder' | 'Recruiter' | 'Friend' | 'Student' | 'Classmate' | string;
  handle?: string;
  message: string;
  createdAt: string;
  avatarColor: string;
  likes: number;
}

export interface BookingSlot {
  date: string; // YYYY-MM-DD
  time: string; // e.g. "14:00 GMT"
  available: boolean;
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  meetingType: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}
