// GitHub API Types
export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  email: string | null;
  blog: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  } | null;
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface ReadmeData {
  content: string;
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
    featured?: boolean;
    demo?: string;
    [key: string]: any;
  };
}

// Portfolio Types
export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  featured: boolean;
  readme?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'other';
  proficiency: number; // 0-100
  icon?: string;
  color?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// State Types
export interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface PortfolioState {
  user: GitHubUser | null;
  projects: Project[];
  skills: Skill[];
  loading: boolean;
  error: string | null;
  selectedTechnology: string | null;
  searchQuery: string;
  setUser: (user: GitHubUser) => void;
  setProjects: (projects: Project[]) => void;
  setSkills: (skills: Skill[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedTechnology: (tech: string | null) => void;
  setSearchQuery: (query: string) => void;
}

// Filter Types
export interface ProjectFilters {
  technology?: string;
  search?: string;
  featured?: boolean;
}

// API Response Types
export interface APIError {
  message: string;
  status: number;
  documentation_url?: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
}
