import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import HomeSection from "@/components/HomeSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Download,
  MessageCircle,
} from "lucide-react";
import DynamicResearchArticles from "@/components/DynamicResearchArticles";
import DynamicProjects from "@/components/DynamicProjects";
import { Footer } from "../components/Footer";

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const experiences = [
    {
      title: "Founder & Experience Architect",
      company: "LynixDevs",
      period: "2023 – Present",
      description:
        "Established a creative technology brand delivering end-to-end digital products. Spearheaded projects involving UI/UX design, full-stack development, and system architecture for startups and personal ventures.",
    },
    {
      title: "Lead Engineer & Product Designer",
      company: "Sustaini Verse (Self-Initiated Project)",
      period: "2023 – 2024",
      description:
        "Designed and developed a dynamic blogging platform with community publishing, moderation workflows, and ad-ready architecture using React, Firebase, and Supabase. Emphasized scalability, usability, and performance.",
    },
    {
      title: "Full-Stack Developer & UI Strategist",
      company: "CROCO (Home & Decor Platform)",
      period: "2024",
      description:
        "Built a high-performance storefront and blog CMS for a content-driven e-commerce brand. Integrated Firestore, admin tools, and automated workflows to enable seamless product and blog management.",
    },
    {
      title: "Technical Lead – Frontend & Backend",
      company: "Firdousia (Fashion E-commerce Brand)",
      period: "2024",
      description:
        "Led the development of a custom online store for a global fashion label. Focused on elegant, mobile-first UI, product handling, dynamic content, and secure transaction logic with Firebase & Supabase.",
    },
    {
      title: "Independent Developer & Creative Technologist",
      company: "Freelance & Self-Led Projects",
      period: "2021 – Present",
      description:
        "Delivered tailored digital solutions for various clients, ranging from portfolio sites to complex platforms. Specialized in React, Next.js, Firebase, animations, design systems, and full-stack architecture.",
    },
  ];

  const skills = [
    "React & TypeScript",
    "Firebase & Supabase",
    "Full-Stack Development",
    "Flutter & Cross-Platform Apps",
    "UI/UX Design",
    "Framer Motion & Animations",
    "Design Systems",
    "Product Strategy",
    "Python (Scripting, Automation)",
    "LLM Integration & Prompt Engineering",
    "APIs & Integrations",
    "E-Commerce & CMS",
    "Responsive Design",
    "Performance Tuning",
    "Authentication & Access Control",
    "Admin Dashboards",
    "System Architecture",
    "Creative Problem Solving",
  ];

  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <NavBar onNavClick={handleNavClick} />

      {/* Hero Section */}
      <HomeSection />
      {/* About Section */}
      <section
        id="about"
        className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6 bg-card"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-electric text-center lg:text-left">
                About Me
              </h2>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-muted-foreground leading-relaxed font-electrolize text-xs sm:text-sm lg:text-base">
                <p>
                  I'm a passionate Experience Architect and Lead Product
                  Engineer with a strong foundation in both design and
                  development. I bring together clean aesthetics, smooth UX, and
                  scalable engineering to deliver high-quality digital products.
                </p>
                <p>
                  With hands-on experience across the full stack—using
                  technologies like React, Firebase, Supabase, Tailwind, and
                  Node—I specialize in building dynamic websites, admin
                  dashboards, blog systems, and e-commerce solutions. I make
                  sure every product is not only innovative but also efficient
                  and fully functional.
                </p>
                <p>
                  My work spans from crafting responsive interfaces and subtle
                  animations to integrating complex backend logic—all with a
                  user-first mindset. Whether it’s a modern storefront, a
                  content platform, or a mobile-ready web app, I aim to create
                  digital experiences that are beautiful, fast, and deeply
                  purposeful.
                </p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-electric text-center lg:text-left">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3 justify-center lg:justify-start">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors font-electrolize text-xs leading-tight px-2 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center font-electric">
            Experience
          </h2>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="p-3 sm:p-4 lg:p-6 xl:p-8 border-border hover:shadow-lg transition-shadow bg-card"
              >
                <div className="grid lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <div className="lg:col-span-1">
                    <div className="text-xs text-muted-foreground mb-2 font-electrolize text-center lg:text-left">
                      {exp.period}
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 font-electric text-center lg:text-left break-words">
                      {exp.title}
                    </h3>
                    <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-2 sm:mb-3 lg:mb-4 font-electrolize text-center lg:text-left">
                      {exp.company}
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-electrolize text-xs sm:text-sm lg:text-base text-center lg:text-left">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <DynamicProjects />
      </section>

      {/* Research Articles Section */}
      <section id="research">
        <DynamicResearchArticles />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6 bg-card"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 font-electric">
            Let's Work Together
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto font-electrolize leading-relaxed px-2">
            I'm always interested in discussing new opportunities and innovative
            projects. Let's create something exceptional together.
          </p>
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-muted-foreground font-electrolize text-xs sm:text-sm h-10 sm:h-11 px-4 sm:px-6"
              asChild
            >
              <a href="mailto:hi@asjad.is-a.dev?subject=Hello&body=Hi there,">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2" />
                Send me an email
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-electrolize text-xs sm:text-sm h-10 sm:h-11 px-4 sm:px-6"
              asChild
            >
              <a
                href="https://wa.me/923068194499"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2" />
                Text Me on Whatsapp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
