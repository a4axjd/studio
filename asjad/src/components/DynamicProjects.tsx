
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { loadMarkdownFiles } from "@/utils/markdownLoader";
import { Link } from "react-router-dom";

interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  url?: string;
  github?: string;
}

const DynamicProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const markdownFiles = await loadMarkdownFiles('projects');
        const projectsData = markdownFiles.map(file => ({
          slug: file.slug,
          title: file.frontmatter.title || 'Untitled Project',
          description: file.frontmatter.description || '',
          tech: file.frontmatter.tech ? file.frontmatter.tech.split(',').map((t: string) => t.trim()) : [],
          image: file.frontmatter.image,
          url: file.frontmatter.url,
          github: file.frontmatter.github
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center font-electric">Featured Projects</h2>
          <div className="text-center text-muted-foreground font-electrolize text-sm">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center font-electric">Featured Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.slug} className="p-0 border-border hover:shadow-lg transition-all duration-300 group bg-background overflow-hidden">
              {project.image && (
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <Link to={`/project/${project.slug}`} className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold group-hover:text-muted-foreground transition-colors font-electric cursor-pointer leading-tight break-words">
                      {project.title}
                    </h3>
                  </Link>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed font-electrolize text-xs sm:text-sm break-words">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs font-electrolize leading-tight px-1.5 py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <Link to="/projects">
            <Button>
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DynamicProjects;
