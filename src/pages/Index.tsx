import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroNews from "@/components/HeroNews";
import CategoryFilter from "@/components/CategoryFilter";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import { newsArticles, categories } from "@/data/newsData";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Tümü") {
      return newsArticles.filter(a => !a.isFeatured);
    }
    return newsArticles.filter(
      a => a.category === selectedCategory && !a.isFeatured
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroNews articles={newsArticles} />
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <NewsGrid 
          articles={filteredArticles}
          title={selectedCategory === "Tümü" ? "Son Haberler" : selectedCategory}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
