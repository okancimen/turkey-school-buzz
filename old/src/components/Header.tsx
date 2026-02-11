import { GraduationCap, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">
                Eğitim Haberleri
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Türkiye'den güncel okul haberleri
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sınavlar
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Eğitim Politikaları
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Teknoloji
            </a>
            <Link to="/ben-kimim" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Ben Kimim
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <Input 
                  placeholder="Haber ara..." 
                  className="w-48 h-9"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                Ana Sayfa
              </Link>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                Sınavlar
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                Eğitim Politikaları
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                Teknoloji
              </a>
              <Link to="/ben-kimim" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                Ben Kimim
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
