import { Clock, ArrowUpRight } from "lucide-react";
import { NewsArticle } from "@/data/newsData";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const NewsCard = ({ article, index }: NewsCardProps) => {
  return (
    <article 
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-card/90 backdrop-blur-sm text-foreground border-0 font-medium"
          >
            {article.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.summary}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
