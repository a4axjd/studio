import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { loadMarkdownFiles, parseMarkdown } from "@/utils/markdownLoader";
import { Footer } from "../components/Footer";

interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  url?: string;
  github?: string;
  content: string;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const markdownFiles = await loadMarkdownFiles("projects");
        const projectFile = markdownFiles.find((file) => file.slug === slug);

        if (projectFile) {
          const projectData: Project = {
            slug: projectFile.slug,
            title: projectFile.frontmatter.title || "Untitled Project",
            description: projectFile.frontmatter.description || "",
            tech: projectFile.frontmatter.tech
              ? projectFile.frontmatter.tech
                  .split(",")
                  .map((t: string) => t.trim())
              : [],
            image: projectFile.frontmatter.image,
            url: projectFile.frontmatter.url,
            github: projectFile.frontmatter.github,
            content: projectFile.content,
          };
          setProject(projectData);
        }
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center text-muted-foreground font-electrolize text-sm">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-electric">
            Project Not Found
          </h1>
          <Link to="/">
            <Button
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-electrolize text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link to="/">
          <Button variant="outline" className="mb-4 sm:mb-6 lg:mb-8">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Home
          </Button>
        </Link>

        <article className="space-y-4 sm:space-y-6 lg:space-y-8">
          <header className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight font-electric break-words">
                {project.title}
              </h1>
              {(project.url || project.github) && (
                <div className="flex space-x-3 justify-start">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground hover:text-foreground transition-colors" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground hover:text-foreground transition-colors" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed font-electrolize break-words">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="font-electrolize text-xs px-2 py-1 break-all"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {project.image && (
              <div className="w-full rounded-lg overflow-hidden border border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-w-full object-cover"
                />
              </div>
            )}
          </header>

          <div
            className="prose prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg break-words"
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(project.content) }}
          />
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
