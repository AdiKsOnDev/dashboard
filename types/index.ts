export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    clientsSatisfied: number;
    coffeeConsumed: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  status: string;
  year: number;
  client: string;
  duration: string;
  role: string;
  links: {
    live?: string;
    github?: string;
  };
  metrics: {
    users: string;
    performance: string;
    impact: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number;
  yearsOfExperience: number;
  projects: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export interface Contact {
  availability: {
    status: string;
    message: string;
    responseTime: string;
  };
  preferredContact: string;
  workingHours: {
    timezone: string;
    hours: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
}
