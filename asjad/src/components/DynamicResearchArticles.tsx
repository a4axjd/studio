
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { loadMarkdownFiles } from "@/utils/markdownLoader";
import { Link } from "react-router-dom";

interface Article {
  slug: string;
  title: string;
  abstract: string;
  journal: string;
  date: string;
  tags: string[];
  image?: string;
  url?: string;
}

const DynamicResearchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const markdownFiles = await loadMarkdownFiles('articles');
        const articlesData = markdownFiles.map(file => ({
          slug: file.slug,
          title: file.frontmatter.title || 'Untitled Article',
          abstract: file.frontmatter.abstract || '',
          journal: file.frontmatter.journal || '',
          date: file.frontmatter.date || '',
          tags: file.frontmatter.tags ? file.frontmatter.tags.split(',').map((t: string) => t.trim()) : [],
          image: file.frontmatter.image,
          url: file.frontmatter.url
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center font-electric">Research Articles</h2>
          <div className="text-center text-muted-foreground font-electrolize text-sm">Loading articles...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center font-electric">Research Articles</h2>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {articles.slice(0, 2).map((article) => (
            <Card key={article.slug} className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 group bg-card">
              <div className="flex flex-col lg:flex-row">
                {article.image && (
                  <div className="lg:w-1/3 aspect-video lg:aspect-square overflow-hidden bg-muted">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className={`p-3 sm:p-4 lg:p-6 xl:p-8 space-y-2 sm:space-y-3 lg:space-y-4 ${article.image ? 'lg:w-2/3' : 'w-full'}`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                    <Link to={`/article/${article.slug}`} className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold group-hover:text-muted-foreground transition-colors font-electric cursor-pointer leading-tight break-words">
                        {article.title}
                      </h3>
                    </Link>
                    {article.url && (
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-start">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed font-electrolize text-xs sm:text-sm lg:text-base break-words">
                    {article.abstract}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-muted-foreground font-electrolize">
                    <span className="italic break-words">{article.journal}</span>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 pt-1 sm:pt-2">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs font-electrolize leading-tight px-1.5 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <Link to="/articles">
            <Button>
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DynamicResearchArticles;
