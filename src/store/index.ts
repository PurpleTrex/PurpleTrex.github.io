import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState, PortfolioState, GitHubUser, Project, Skill } from '../types';

/**
 * Theme Store
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

/**
 * Portfolio Store
 */
export const usePortfolioStore = create<PortfolioState>((set) => ({
  user: null,
  projects: [],
  skills: [],
  loading: false,
  error: null,
  selectedTechnology: null,
  searchQuery: '',
  
  setUser: (user: GitHubUser) => set({ user }),
  setProjects: (projects: Project[]) => set({ projects }),
  setSkills: (skills: Skill[]) => set({ skills }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSelectedTechnology: (tech: string | null) => set({ selectedTechnology: tech }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
