import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { loadMarkdownFiles, parseMarkdown } from "@/utils/markdownLoader";
import { Footer } from "../components/Footer";

interface Article {
  slug: string;
  title: string;
  abstract: string;
  journal: string;
  date: string;
  tags: string[];
  url?: string;
  content: string;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const markdownFiles = await loadMarkdownFiles("articles");
        const articleFile = markdownFiles.find((file) => file.slug === slug);

        if (articleFile) {
          const articleData: Article = {
            slug: articleFile.slug,
            title: articleFile.frontmatter.title || "Untitled Article",
            abstract: articleFile.frontmatter.abstract || "",
            journal: articleFile.frontmatter.journal || "",
            date: articleFile.frontmatter.date || "",
            tags: articleFile.frontmatter.tags
              ? articleFile.frontmatter.tags
                  .split(",")
                  .map((t: string) => t.trim())
              : [],
            url: articleFile.frontmatter.url,
            content: articleFile.content,
          };
          setArticle(articleData);
        }
      } catch (error) {
        console.error("Error loading article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center text-muted-foreground font-electrolize text-sm">
          Loading article...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-electric">
            Article Not Found
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
                {article.title}
              </h1>
              {article.url && (
                <div className="flex justify-start">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground hover:text-foreground transition-colors" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2 text-sm sm:text-base text-muted-foreground font-electrolize">
              <span className="italic break-words">{article.journal}</span>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="break-words">{article.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {article.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="font-electrolize text-xs px-2 py-1 break-all"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {article.abstract && (
              <div className="bg-card p-3 sm:p-4 lg:p-6 rounded-lg border border-border">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 font-electric">
                  Abstract
                </h2>
                <p className="text-muted-foreground leading-relaxed font-electrolize text-sm sm:text-base break-words">
                  {article.abstract}
                </p>
              </div>
            )}
          </header>

          <div
            className="prose prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg break-words"
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
          />
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
