import { User, Briefcase, GraduationCap, Award, Linkedin, Mail, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLinkedInProfile } from "@/hooks/useLinkedInProfile";

const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <Skeleton className="w-40 h-40 rounded-full" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  </div>
);

const BenKimim = () => {
  const { profile, isLoading, error } = useLinkedInProfile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center gap-4">
              <User className="w-10 h-10 text-primary" />
              Ben Kimim
            </h1>
            <p className="text-muted-foreground text-lg">
              Eğitim sektöründe uzun yıllara dayanan deneyim ve uzmanlık
            </p>
          </div>

          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <>
              {/* Profile Header Card */}
              <Card className="mb-8 overflow-hidden">
                <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background shadow-xl">
                          <User className="w-20 h-20 text-primary" />
                        </div>
                        <a 
                          href="https://www.linkedin.com/in/ozlem-cimen-ba66aa56/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute -bottom-2 -right-2 bg-[#0077B5] text-white p-3 rounded-full hover:bg-[#005885] transition-colors shadow-lg"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                          {profile?.name || 'Özlem Cimen'}
                        </h2>
                        <p className="text-primary text-xl font-semibold mb-4">
                          {profile?.headline || 'Eğitim Uzmanı & İçerik Editörü'}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Türkiye
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            10+ Yıl Deneyim
                          </span>
                        </div>

                        {profile?.about && (
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {profile.about}
                          </p>
                        )}

                        {!profile?.about && (
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            Türkiye'deki eğitim sektöründe uzun yıllara dayanan deneyime sahip bir eğitim profesyoneliyim. 
                            Eğitim politikaları, öğretmen gelişimi ve öğrenci başarısı konularında çalışmalar yürütmekteyim. 
                            Eğitim haberleri platformu aracılığıyla Türkiye'deki en güncel eğitim gelişmelerini takipçilerimle paylaşıyorum.
                          </p>
                        )}

                        <div className="flex gap-3 mt-6">
                          <Button asChild>
                            <a 
                              href="https://www.linkedin.com/in/ozlem-cimen-ba66aa56/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="w-4 h-4 mr-2" />
                              LinkedIn'de Takip Et
                            </a>
                          </Button>
                          <Button variant="outline" asChild>
                            <a href="mailto:iletisim@egitimhaberleri.com">
                              <Mail className="w-4 h-4 mr-2" />
                              İletişim
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      Profesyonel Deneyim
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {(profile?.experience && profile.experience.length > 0) ? (
                        profile.experience.map((exp, i) => (
                          <div key={i} className="relative pl-6 border-l-2 border-primary/30 pb-4 last:pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                            <h4 className="font-semibold text-foreground">{exp.title}</h4>
                            {exp.company && (
                              <p className="text-muted-foreground">{exp.company}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="relative pl-6 border-l-2 border-primary/30 pb-4">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                            <h4 className="font-semibold text-foreground">Eğitim İçerik Editörü</h4>
                            <p className="text-muted-foreground">Eğitim Haberleri</p>
                            <p className="text-sm text-muted-foreground mt-1">2020 - Günümüz</p>
                          </div>
                          <div className="relative pl-6 border-l-2 border-primary/30 pb-4">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/60" />
                            <h4 className="font-semibold text-foreground">Eğitim Danışmanı</h4>
                            <p className="text-muted-foreground">Bağımsız</p>
                            <p className="text-sm text-muted-foreground mt-1">2015 - 2020</p>
                          </div>
                          <div className="relative pl-6 border-l-2 border-primary/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/40" />
                            <h4 className="font-semibold text-foreground">Öğretmen</h4>
                            <p className="text-muted-foreground">MEB</p>
                            <p className="text-sm text-muted-foreground mt-1">2010 - 2015</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      Eğitim
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {(profile?.education && profile.education.length > 0) ? (
                        profile.education.map((edu, i) => (
                          <div key={i} className="relative pl-6 border-l-2 border-primary/30 pb-4 last:pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                            <h4 className="font-semibold text-foreground">{edu}</h4>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="relative pl-6 border-l-2 border-primary/30 pb-4">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                            <h4 className="font-semibold text-foreground">Yüksek Lisans - Eğitim Yönetimi</h4>
                            <p className="text-muted-foreground">Üniversite</p>
                          </div>
                          <div className="relative pl-6 border-l-2 border-primary/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/60" />
                            <h4 className="font-semibold text-foreground">Lisans - Eğitim Bilimleri</h4>
                            <p className="text-muted-foreground">Üniversite</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    Uzmanlık Alanları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {(profile?.skills && profile.skills.length > 0) ? (
                      profile.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-sm py-2 px-4">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Eğitim Politikaları</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">İçerik Yazarlığı</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Editörlük</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Araştırma</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Öğretmen Eğitimi</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Müfredat Geliştirme</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Eğitim Teknolojileri</Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-4">Proje Yönetimi</Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Mission Statement */}
              <Card className="mt-8 bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Misyonum</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Türkiye'deki eğitim gelişmelerini yakından takip ederek, öğretmenler, veliler ve öğrenciler için 
                    en güncel ve doğru bilgileri sunmak. Eğitim politikalarındaki değişiklikleri anlaşılır bir dille 
                    aktararak, eğitim camiasının bilinçlenmesine katkıda bulunmak en büyük hedefim.
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {error && (
            <p className="text-destructive text-sm mt-4">
              Profil yüklenirken bir hata oluştu: {error}
            </p>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BenKimim;
