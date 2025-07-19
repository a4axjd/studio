import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { loadMarkdownFiles } from "@/utils/markdownLoader";
import { Footer } from "../components/Footer";

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

const AllArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const markdownFiles = await loadMarkdownFiles("articles");
        const articlesData = markdownFiles.map((file) => ({
          slug: file.slug,
          title: file.frontmatter.title || "Untitled Article",
          abstract: file.frontmatter.abstract || "",
          journal: file.frontmatter.journal || "",
          date: file.frontmatter.date || "",
          tags: file.frontmatter.tags
            ? file.frontmatter.tags.split(",").map((t: string) => t.trim())
            : [],
          image: file.frontmatter.image,
          url: file.frontmatter.url,
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center text-muted-foreground font-electrolize text-sm">
          Loading articles...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-6 sm:mb-8 border-foreground text-foreground hover:bg-foreground hover:text-background font-electrolize text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-electric leading-tight">
            All Research Articles
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-electrolize leading-relaxed">
            Explore my complete collection of research articles and
            publications.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {articles.map((article) => (
            <Card
              key={article.slug}
              className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 group bg-card"
            >
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
                <div
                  className={`p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 ${
                    article.image ? "lg:w-2/3" : "w-full"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                    <Link
                      to={`/article/${article.slug}`}
                      className="flex-1 min-w-0"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold group-hover:text-muted-foreground transition-colors font-electric cursor-pointer leading-tight break-words">
                        {article.title}
                      </h3>
                    </Link>
                    {article.url && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 self-start"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </a>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed font-electrolize text-sm sm:text-base break-words">
                    {article.abstract}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground font-electrolize">
                    <span className="italic break-words">
                      {article.journal}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs font-electrolize px-2 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
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

export default AllArticles;
