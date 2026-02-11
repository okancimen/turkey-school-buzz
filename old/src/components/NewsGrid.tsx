import { NewsArticle } from "@/data/newsData";
import NewsCard from "./NewsCard";

interface NewsGridProps {
  articles: NewsArticle[];
  title: string;
}

const NewsGrid = ({ articles, title }: NewsGridProps) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {title}
        </h2>
        <a 
          href="#" 
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Tümünü Gör →
        </a>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
