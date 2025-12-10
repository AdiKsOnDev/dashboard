/**
 * User profile information displayed across the portfolio
 */
export interface Profile {
  /** Full name of the portfolio owner */
  name: string;
  /** Professional title or role */
  title: string;
  /** Geographic location (city, country) */
  location: string;
  /** Contact email address */
  email: string;
  /** Contact phone number */
  phone: string;
  /** Short biography or introduction */
  bio: string;
  /** URL to profile avatar image */
  avatar: string;
  /** Social media profile URLs */
  social: {
    /** GitHub profile URL */
    github: string;
    /** LinkedIn profile URL */
    linkedin: string;
    /** Kaggle profile URL */
    kaggle: string;
  };
  /** Portfolio statistics */
  stats: {
    /** Years of professional experience */
    yearsExperience: string;
    /** Number of debugging sessions (humorous metric) */
    crashouts: string;
  };
}

/**
 * Project portfolio item with detailed information
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Short description for cards and previews */
  description: string;
  /** Detailed description shown in modal */
  longDescription: string;
  /** URL to project cover image */
  image: string;
  /** Technology tags (e.g., "React", "TypeScript") */
  tags: string[];
  /** Project category (e.g., "Web Development", "AI/ML") */
  category: string;
  /** Project status: "completed", "in-progress", or "archived" */
  status: string;
  /** Year the project was completed or started */
  year: number;
  /** Client or organization name */
  client: string;
  /** Project duration (e.g., "3 months", "Ongoing") */
  duration: string;
  /** Your role in the project */
  role: string;
  /** External links related to the project */
  links: {
    /** Live demo or production URL */
    live?: string;
    /** GitHub repository URL */
    github?: string;
  };
  /** Key project metrics and achievements */
  metrics: {
    /** User count or reach */
    users: string;
    /** Performance metrics */
    performance: string;
    /** Impact or business value */
    impact: string;
  };
}

/**
 * Work experience entry
 */
export interface Experience {
  /** Unique identifier for the experience */
  id: string;
  /** Company or organization name */
  company: string;
  /** Job title or position */
  position: string;
  /** Work location (city, country or "Remote") */
  location: string;
  /** Employment type (e.g., "Full-time", "Contract", "Freelance") */
  type: string;
  /** Start date in ISO format (YYYY-MM-DD) */
  startDate: string;
  /** End date in ISO format, null if current position */
  endDate: string | null;
  /** Whether this is the current position */
  current: boolean;
  /** Brief description of the role */
  description: string;
  /** List of key responsibilities */
  responsibilities: string[];
  /** Technologies and tools used */
  technologies: string[];
  /** Notable achievements and accomplishments */
  achievements: string[];
}

/**
 * Individual skill with proficiency metrics
 */
export interface Skill {
  /** Skill name (e.g., "TypeScript", "React") */
  name: string;
  /** Proficiency level (1-10 scale) */
  level: number;
  /** Years of experience with this skill */
  yearsOfExperience: number;
  /** Number of projects using this skill */
  projects: number;
}

/**
 * Category grouping related skills
 */
export interface SkillCategory {
  /** Unique identifier for the category */
  id: string;
  /** Category name (e.g., "Frontend", "Backend") */
  name: string;
  /** Icon identifier for the category */
  icon: string;
  /** Skills belonging to this category */
  skills: Skill[];
}

/**
 * Professional certification or credential
 */
export interface Certification {
  /** Certification name */
  name: string;
  /** Issuing organization */
  issuer: string;
  /** Date obtained (ISO format) */
  date: string;
  /** Credential ID or verification code */
  credentialId: string;
}

/**
 * Contact availability and preferences
 */
export interface Contact {
  /** Current availability status */
  availability: {
    /** Status text (e.g., "Available", "Busy") */
    status: string;
    /** Detailed availability message */
    message: string;
    /** Expected response time */
    responseTime: string;
  };
  /** Preferred contact method */
  preferredContact: string;
  /** Working hours information */
  workingHours: {
    /** Timezone (e.g., "UTC+3") */
    timezone: string;
    /** Working hours range */
    hours: string;
  };
}

/**
 * Blog post with content and metadata
 * Content is optional for preview/listing contexts
 */
export interface BlogPost {
  /** Unique identifier for the post */
  id: string;
  /** Post title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Short excerpt or summary */
  excerpt: string;
  /** Full post content in Markdown (optional for previews) */
  content?: string;
  /** URL to cover image */
  coverImage: string;
  /** Publication date in ISO format */
  publishedAt: string;
  /** Estimated reading time (e.g., "5 min read") */
  readTime: string;
  /** Post category */
  category: string;
  /** Topic tags */
  tags: string[];
  /** Author name */
  author: string;
  /** Whether this post is featured/pinned */
  featured: boolean;
}
