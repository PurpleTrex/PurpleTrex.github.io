import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { getLanguageColor } from '../../lib/utils';
import { manualProjects } from '../../lib/manual-projects';
import type { Project } from '../../types';

export function Projects() {
  const { searchQuery, selectedTechnology, setSearchQuery, setSelectedTechnology } = usePortfolioStore();

  // Use manual projects instead of API
  const projects = manualProjects.map(p => ({
    ...p,
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as Project[];

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = !searchQuery || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTech = !selectedTechnology || 
      project.technologies.some(tech => tech.toLowerCase() === selectedTechnology.toLowerCase());
    
    return matchesSearch && matchesTech;
  }) || [];

  // Separate projects: demos, main repo (id 3), and others
  const projectsWithDemos = filteredProjects.filter(p => p.liveUrl);
  const mainRepo = filteredProjects.find(p => p.id === 3);
  const otherProjects = filteredProjects.filter(p => !p.liveUrl && p.id !== 3);

  // Get unique technologies
  const allTechnologies = Array.from(
    new Set(projects?.flatMap(p => p.technologies) || [])
  ).sort();

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
            Projects
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Here are some of my featured projects across different technologies and domains.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md mx-auto"
          />

          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedTechnology === null ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTechnology(null)}
            >
              All
            </Button>
            {allTechnologies.slice(0, 10).map((tech) => (
              <Button
                key={tech}
                variant={selectedTechnology === tech ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTechnology(tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Projects with Demos - Centered on Top */}
        {projectsWithDemos.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {projectsWithDemos.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Main Repository */}
        {mainRepo && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
              Main Repository
            </h3>
            <div className="max-w-2xl mx-auto">
              <ProjectCard project={mainRepo} index={projectsWithDemos.length} />
            </div>
          </div>
        )}

        {/* Other Projects - Below */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + projectsWithDemos.length + 1} />
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card hover className="h-full flex flex-col overflow-hidden">
        {/* Project Image Thumbnail */}
        {project.imageUrl && !imageError && (
          <div className="w-full h-48 bg-gradient-to-br from-primary-500/10 to-accent-500/10 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={`${project.name} preview`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              {project.featured && (
                <span className="text-yellow-500 text-xl flex-shrink-0" title="Featured">⭐</span>
              )}
              <span className="line-clamp-1">{project.name}</span>
            </CardTitle>
            {project.language && (
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: getLanguageColor(project.language) }}
                title={project.language}
              />
            )}
          </div>
          <CardDescription className="line-clamp-3 min-h-[3.6rem]">
            {project.description || 'No description available'}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="primary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="default" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {project.stars}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {project.forks}
            </span>
          </div>
        </CardContent>

        <CardFooter className="gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="flex-1"
          >
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Code
          </Button>
          {project.liveUrl && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open(project.liveUrl, '_blank')}
              className="flex-1"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
