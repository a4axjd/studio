
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar } from "lucide-react";

const ResearchArticles = () => {
  const articles = [
    {
      title: "The Future of Interactive Web Development",
      abstract: "Exploring emerging technologies and methodologies that are shaping the next generation of web applications, focusing on user experience and system architecture.",
      journal: "Journal of Digital Innovation",
      date: "2024",
      tags: ["Web Development", "UX Design", "Architecture"],
      url: "#"
    },
    {
      title: "Systems Design Patterns for Modern Applications",
      abstract: "A comprehensive analysis of design patterns that enhance scalability and maintainability in complex software systems.",
      journal: "Software Engineering Quarterly",
      date: "2023",
      tags: ["Systems Design", "Architecture", "Best Practices"],
      url: "#"
    },
    {
      title: "User-Centered Product Engineering Methodologies",
      abstract: "Investigating the intersection of user experience design and product engineering to create more effective development workflows.",
      journal: "Product Development Review",
      date: "2023",
      tags: ["Product Engineering", "UX Research", "Methodology"],
      url: "#"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center font-electric">Research Articles</h2>
        <div className="space-y-8">
          {articles.map((article, index) => (
            <Card key={index} className="p-8 border-border hover:shadow-lg transition-all duration-300 group bg-card">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold group-hover:text-muted-foreground transition-colors font-electric">
                    {article.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-4" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed font-electrolize">
                  {article.abstract}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-electrolize">
                  <span className="italic">{article.journal}</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs font-electrolize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchArticles;
