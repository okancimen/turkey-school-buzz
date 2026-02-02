import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroNews from "@/components/HeroNews";
import CategoryFilter from "@/components/CategoryFilter";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import { HeroNewsSkeleton, NewsGridSkeleton } from "@/components/NewsLoadingSkeleton";
import { categories } from "@/data/newsData";
import { useNews } from "@/hooks/useNews";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const { articles, isLoading, error, refetch, lastUpdated } = useNews();

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Tümü") {
      return articles.filter(a => !a.isFeatured);
    }
    return articles.filter(
      a => a.category === selectedCategory && !a.isFeatured
    );
  }, [selectedCategory, articles]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Live news indicator */}
        <div className="container mx-auto px-4 pt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Haberler yükleniyor...
                </span>
              ) : error ? (
                <span className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Canlı Haberler
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {lastUpdated && (
                <span className="hidden sm:inline">
                  Son güncelleme: {lastUpdated.toLocaleTimeString('tr-TR')}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refetch}
                disabled={isLoading}
                className="h-8"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Yenile
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <>
            <HeroNewsSkeleton />
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <NewsGridSkeleton />
          </>
        ) : (
          <>
            <HeroNews articles={articles} />
            
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <NewsGrid 
              articles={filteredArticles}
              title={selectedCategory === "Tümü" ? "Son Haberler" : selectedCategory}
            />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
