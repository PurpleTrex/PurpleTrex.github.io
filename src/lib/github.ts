import { Octokit } from '@octokit/rest';
import type { GitHubUser, GitHubRepo, GitHubLanguages, RateLimitInfo } from '../types';

class GitHubClient {
  private octokit: Octokit;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token,
      userAgent: 'portfolio-app-v1',
    });
    this.cache = new Map();
  }

  /**
   * Get data from cache if valid
   */
  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data as T;
    }
    return null;
  }

  /**
   * Save data to cache
   */
  private saveToCache(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Get user profile
   */
  async getUser(username: string): Promise<GitHubUser> {
    const cacheKey = `user:${username}`;
    const cached = this.getFromCache<GitHubUser>(cacheKey);
    
    if (cached) return cached;

    try {
      const { data } = await this.octokit.users.getByUsername({ username });
      this.saveToCache(cacheKey, data);
      return data as GitHubUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch user: ${message}`);
    }
  }

  /**
   * Get user repositories
   */
  async getRepositories(
    username: string,
    options: {
      sort?: 'created' | 'updated' | 'pushed' | 'full_name';
      direction?: 'asc' | 'desc';
      per_page?: number;
      type?: 'all' | 'owner' | 'member';
    } = {}
  ): Promise<GitHubRepo[]> {
    const cacheKey = `repos:${username}:${JSON.stringify(options)}`;
    const cached = this.getFromCache<GitHubRepo[]>(cacheKey);
    
    if (cached) return cached;

    try {
      const { data } = await this.octokit.repos.listForUser({
        username,
        sort: options.sort || 'updated',
        direction: options.direction || 'desc',
        per_page: options.per_page || 100,
        type: options.type || 'owner',
      });
      
      this.saveToCache(cacheKey, data);
      return data as GitHubRepo[];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch repositories: ${message}`);
    }
  }

  /**
   * Get repository languages
   */
  async getLanguages(owner: string, repo: string): Promise<GitHubLanguages> {
    const cacheKey = `languages:${owner}/${repo}`;
    const cached = this.getFromCache<GitHubLanguages>(cacheKey);
    
    if (cached) return cached;

    try {
      const { data } = await this.octokit.repos.listLanguages({ owner, repo });
      this.saveToCache(cacheKey, data);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch languages: ${message}`);
    }
  }

  /**
   * Get repository README
   */
  async getReadme(owner: string, repo: string): Promise<string> {
    const cacheKey = `readme:${owner}/${repo}`;
    const cached = this.getFromCache<string>(cacheKey);
    
    if (cached) return cached;

    try {
      const { data } = await this.octokit.repos.getReadme({ owner, repo });
      // Decode base64 content
      const content = atob(data.content);
      this.saveToCache(cacheKey, content);
      return content;
    } catch {
      // README not available
      return '';
    }
  }

  /**
   * Get rate limit information
   */
  async getRateLimit(): Promise<RateLimitInfo> {
    try {
      const { data } = await this.octokit.rateLimit.get();
      return {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: new Date(data.rate.reset * 1000),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch rate limit: ${message}`);
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const githubClient = new GitHubClient(import.meta.env.VITE_GITHUB_TOKEN);
export default GitHubClient;
