import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            className={`
              whitespace-nowrap rounded-full px-5 font-medium transition-all duration-300
              ${selectedCategory === category 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }
            `}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
