import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { loadMarkdownFiles } from "@/utils/markdownLoader";
import { Footer } from "../components/Footer";

interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  url?: string;
  github?: string;
}

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const markdownFiles = await loadMarkdownFiles("projects");
        const projectsData = markdownFiles.map((file) => ({
          slug: file.slug,
          title: file.frontmatter.title || "Untitled Project",
          description: file.frontmatter.description || "",
          tech: file.frontmatter.tech
            ? file.frontmatter.tech.split(",").map((t: string) => t.trim())
            : [],
          image: file.frontmatter.image,
          url: file.frontmatter.url,
          github: file.frontmatter.github,
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center text-muted-foreground font-electrolize text-sm">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <Link to="/">
          <Button variant="outline" className="mb-6 sm:mb-8">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-electric leading-tight">
            All Projects
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-electrolize leading-relaxed">
            Discover my complete portfolio of projects and technical work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project) => (
            <Card
              key={project.slug}
              className="p-0 border-border hover:shadow-lg transition-all duration-300 group bg-background overflow-hidden"
            >
              {project.image && (
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <Link
                    to={`/project/${project.slug}`}
                    className="flex-1 min-w-0"
                  >
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-muted-foreground transition-colors font-electric cursor-pointer leading-tight break-words">
                      {project.title}
                    </h3>
                  </Link>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed font-electrolize text-sm sm:text-base break-words">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs font-electrolize px-2 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProjects;
