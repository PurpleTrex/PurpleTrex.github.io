import { useQuery } from '@tanstack/react-query';
import { githubClient } from '../lib/github';
import type { GitHubUser, GitHubRepo, Project } from '../types';
import { extractDemoUrl, parseReadme } from '../lib/readme-parser';

/**
 * Hook to fetch GitHub user profile
 */
export function useGitHubUser(username: string) {
  return useQuery<GitHubUser>({
    queryKey: ['github-user', username],
    queryFn: () => githubClient.getUser(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!username,
  });
}

/**
 * Hook to fetch GitHub repositories
 */
export function useGitHubRepos(username: string) {
  return useQuery<GitHubRepo[]>({
    queryKey: ['github-repos', username],
    queryFn: () => githubClient.getRepositories(username),
    staleTime: 5 * 60 * 1000,
    enabled: !!username,
  });
}

/**
 * Hook to fetch and transform repositories into projects
 */
export function useGitHubProjects(username: string) {
  return useQuery<Project[]>({
    queryKey: ['github-projects', username],
    queryFn: async () => {
      const repos = await githubClient.getRepositories(username, {
        sort: 'updated',
        direction: 'desc',
      });

      // Filter out forks and private repos if needed
      const publicRepos = repos.filter((repo) => !repo.fork);

      // Transform repos to projects
      const projects: Project[] = await Promise.all(
        publicRepos.map(async (repo) => {
          // Fetch README to check for featured status and demo URL
          let readme = '';
          let featured = false;
          let demoUrl: string | undefined;

          try {
            readme = await githubClient.getReadme(username, repo.name);
            const parsed = parseReadme(readme);
            featured = parsed.metadata?.featured === true;
            demoUrl = extractDemoUrl(readme, parsed.metadata);
          } catch {
            // README not available
          }

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || '',
            technologies: repo.topics || [repo.language].filter(Boolean) as string[],
            githubUrl: repo.html_url,
            liveUrl: demoUrl || repo.homepage || undefined,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            topics: repo.topics,
            featured,
            readme,
            createdAt: new Date(repo.created_at),
            updatedAt: new Date(repo.updated_at),
          };
        })
      );

      return projects;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!username,
  });
}

/**
 * Hook to fetch repository README
 */
export function useGitHubReadme(owner: string, repo: string) {
  return useQuery<string>({
    queryKey: ['github-readme', owner, repo],
    queryFn: () => githubClient.getReadme(owner, repo),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!owner && !!repo,
  });
}

/**
 * Hook to fetch rate limit info
 */
export function useGitHubRateLimit() {
  return useQuery({
    queryKey: ['github-ratelimit'],
    queryFn: () => githubClient.getRateLimit(),
    staleTime: 60 * 1000, // 1 minute
  });
}
