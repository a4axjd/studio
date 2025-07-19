import { Github, Linkedin, Mail } from "lucide-react";
import { ReactNode } from "react";

interface FooterProps {
  copyrightText?: ReactNode;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  className?: string;
}

export function Footer({
  copyrightText = "© 2025 Mahar Muhammad Saad. All rights reserved.",
  socialLinks = {
    github: "https://github.com/a4axjd",
    linkedin: "www.linkedin.com/in/axjad",
    email: "hi@asjad.is-a.dev",
  },
  className = "",
}: FooterProps) {
  return (
    <footer
      className={`py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 border-t border-border ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-muted-foreground font-electrolize text-xs text-center sm:text-left">
            {copyrightText}
          </div>
          <div className="flex space-x-3 sm:space-x-4 lg:space-x-6">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={socialLinks.email}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
