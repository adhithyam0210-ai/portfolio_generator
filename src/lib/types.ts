export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  coursework?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string; // e.g. "Present" or "Aug 2024"
  description: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
  category?: string;
}

export interface SkillsData {
  languages: string[];
  frameworks: string[];
  tools: string[];
  softSkills: string[];
}

export type TemplateId = 
  | 'modern-glass'
  | 'role-uiux'
  | 'role-fullstack'
  | 'role-ai-researcher'
  | 'role-cybersecurity'
  | 'role-devops'
  | 'role-qa'
  | 'role-ml-engineer'
  | 'role-data-analyst'
  | 'frost-academic' 
  | 'coral-modernist' 
  | 'cyber-violet' 
  | 'crimson-studio' 
  | 'nexus-developer' 
  | 'slate-editorial'
  | 'aurora-creative'
  | 'executive-classic'
  | 'canva-pop'
  | 'adobe-behance'
  | 'figma-glass'
  | 'minimal-nordic';

export interface TemplateSettings {
  templateId: TemplateId;
  primaryColor: string;
  fontFamily: string;
  darkMode: boolean;
}

export interface AnalyticsData {
  viewsCount: number;
  resumeDownloads: number;
  lastViewedAt?: string;
}

export interface PortfolioProfile {
  userId: string;
  username: string;
  isPublished?: boolean;
  personal: {
    fullName: string;
    headline: string;
    bio: string;
    targetRole: string;
    location: string;
    email: string;
    phone: string;
    githubUrl: string;
    linkedinUrl: string;
    portfolioUrl: string;
    avatarUrl: string;
    resumeUrl?: string;
    resumeFileName?: string;
    yearsExperience?: string;
    completedProjects?: string;
    happyClients?: string;
    awardsWon?: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillsData;
  settings: TemplateSettings;
  analytics: AnalyticsData;
}
