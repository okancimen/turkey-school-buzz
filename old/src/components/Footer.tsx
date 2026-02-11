import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">Eğitim Haberleri</span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-md">
              Türkiye'deki okullardan, üniversitelerden ve eğitim dünyasından en güncel haberler ve gelişmeler.
            </p>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sınavlar</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Eğitim Politikaları</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Teknoloji</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Öğretmenler</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Yükseköğretim</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">İletişim</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Kullanım Şartları</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© 2026 Eğitim Haberleri. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
