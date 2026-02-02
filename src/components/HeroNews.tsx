import { Clock, ArrowRight } from "lucide-react";
import { NewsArticle } from "@/data/newsData";
import { Badge } from "@/components/ui/badge";

interface HeroNewsProps {
  articles: NewsArticle[];
}

const HeroNews = ({ articles }: HeroNewsProps) => {
  const featuredArticles = articles.filter(a => a.isFeatured).slice(0, 2);
  const mainArticle = featuredArticles[0];
  const secondaryArticle = featuredArticles[1];

  if (!mainArticle) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Main Featured Article */}
        <article className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer animate-fade-in">
          <div className="aspect-[16/10] overflow-hidden">
            <img 
              src={mainArticle.imageUrl} 
              alt={mainArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <Badge className="mb-3 bg-accent text-accent-foreground border-0 font-medium">
              {mainArticle.category}
            </Badge>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 leading-tight">
              {mainArticle.title}
            </h2>
            <p className="text-primary-foreground/80 text-sm lg:text-base mb-4 line-clamp-2">
              {mainArticle.summary}
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
              <span>{mainArticle.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {mainArticle.readTime}
              </span>
            </div>
          </div>
        </article>

        {/* Secondary Featured Article */}
        {secondaryArticle && (
          <article className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={secondaryArticle.imageUrl} 
                alt={secondaryArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <Badge className="mb-3 bg-accent text-accent-foreground border-0 font-medium">
                {secondaryArticle.category}
              </Badge>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 leading-tight">
                {secondaryArticle.title}
              </h2>
              <p className="text-primary-foreground/80 text-sm lg:text-base mb-4 line-clamp-2">
                {secondaryArticle.summary}
              </p>
              <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
                <span>{secondaryArticle.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {secondaryArticle.readTime}
                </span>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default HeroNews;
