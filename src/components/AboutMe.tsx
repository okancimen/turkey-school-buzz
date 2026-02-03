import { User, Briefcase, GraduationCap, Award, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLinkedInProfile } from "@/hooks/useLinkedInProfile";

const AboutMeSkeleton = () => (
  <section className="container mx-auto px-4 py-12">
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-10 w-48 mb-8" />
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

const AboutMe = () => {
  const { profile, isLoading } = useLinkedInProfile();

  if (isLoading) {
    return <AboutMeSkeleton />;
  }

  if (!profile) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          Ben Kimim
        </h2>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background shadow-lg">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/ozlem-cimen-ba66aa56/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-2 -right-2 bg-[#0077B5] text-white p-2 rounded-full hover:bg-[#005885] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {profile.headline}
                  </p>
                  {profile.about && (
                    <p className="text-muted-foreground leading-relaxed">
                      {profile.about}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 p-8 pt-6">
              {/* Experience */}
              {profile.experience.length > 0 && (
                <Card className="bg-muted/50 border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Deneyim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {profile.experience.slice(0, 3).map((exp, i) => (
                        <li key={i} className="text-sm">
                          <p className="font-medium text-foreground">{exp.title}</p>
                          {exp.company && (
                            <p className="text-muted-foreground text-xs">{exp.company}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Education */}
              {profile.education.length > 0 && (
                <Card className="bg-muted/50 border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Eğitim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {profile.education.slice(0, 3).map((edu, i) => (
                        <li key={i} className="text-sm text-foreground">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Skills */}
              {profile.skills.length > 0 && (
                <Card className="bg-muted/50 border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Yetenekler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.slice(0, 6).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
