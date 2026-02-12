import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    User,
    Mail,
    Linkedin,
    MapPin,
    Briefcase,
    GraduationCap,
    Award,
    Heart,
    Globe,
    ExternalLink
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BenKimim = () => {
    const experiences = [
        {
            title: "Education Coach",
            company: "Self-employed",
            period: "2025 - Günümüz",
            location: "Dubai, Birleşik Arap Emirlikleri",
            description: "İlkokul ve ortaokul öğrencileri için EAL koçluğu sağlamak, özellikle Türk öğrencilerin uluslararası okul programlarına kaydolmalarına destek olmak. Kayıt sürecinde ailelere rehberlik etmek, takip derslerini koordine etmek ve okullarla etkili iletişimi kolaylaştırmak."
        },
        {
            title: "Education Coach",
            company: "Self-employed",
            period: "2023 - 2025",
            location: "Azerbaycan",
            description: "Eğitim koçluğu hizmetleri sunmak ve öğrencilere akademik destek sağlamak."
        },
        {
            title: "Co-Teacher",
            company: "Istanbul International Community School",
            period: "2021 - 2023",
            location: "İstanbul, Türkiye",
            description: "Uluslararası bir topluluk okulunda işbirlikçi öğretim ve destek sağlamak."
        },
        {
            title: "Founder of YOUNG-ON",
            company: "Self-employed",
            period: "2016 - 2021",
            location: "Myanmar",
            description: "Myanmar kumaşları, tik ağacı ve göl işçiliği gibi yerel ürünleri modern ev tekstili ve aksesuarları olarak tasarlayan kendi markam. Myanmar zanaatkarlarını destekleyerek onların otantik kaynaklarını benzersiz tasarımlarla sunuyoruz.",
            link: "www.facebook.com/youngonface"
        },
        {
            title: "Middle School Vice Principal / Head of Foreign Languages",
            company: "YİGİT SCHOOLS",
            period: "2013 - 2016",
            location: "İstanbul, Çekmeköy",
            description: "Ortaokul müdür yardımcılığı ve yabancı diller bölüm başkanlığı görevlerini eş zamanlı yürüterek eğitim yönetimi ve müfredat geliştirme süreçlerini yönetmek."
        },
        {
            title: "ESL Teacher",
            company: "TED Istanbul Koleji",
            period: "2007 - 2009",
            location: "İstanbul",
            description: "İngilizce öğretmenliği ve dil eğitimi."
        },
        {
            title: "Grades 3&4 ESL Coordinator",
            company: "Cevre Koleji",
            period: "2004 - 2005",
            location: "İstanbul",
            description: "3. ve 4. sınıflar için ESL koordinatörlüğü."
        },
        {
            title: "ESL Teacher",
            company: "Kultur 2000",
            period: "2003 - 2004",
            location: "İstanbul",
            description: "İngilizce öğretmenliği."
        },
        {
            title: "ESL Teacher",
            company: "ENKA Okulları",
            period: "2000 - 2003",
            location: "İstanbul",
            description: "İngilizce öğretmenliği."
        }
    ];

    const education = [
        {
            degree: "MBA - International Marketing",
            school: "Preston University, USA",
            year: "2006 - 2008"
        },
        {
            degree: "Teaching English as a Second or Foreign Language",
            school: "Marmara University",
            year: ""
        }
    ];

    const skills = [
        "IB (International Baccalaureate)",
        "MYP",
        "PYP",
        "Educational Technology",
        "Curriculum Development",
        "Teacher Training",
        "Coaching",
        "Leadership",
        "Marketing",
        "Business Development"
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-12 max-w-5xl">
                {/* Profile Header */}
                <section className="relative mb-16 animate-fade-in">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-hero">
                                <User className="w-20 h-20 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-background p-2 rounded-xl shadow-md">
                                <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
                                    Eğitim Koçu
                                </Badge>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                                Özlem Çimen
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium">
                                Uluslararası Okul Süreçleri ve Veli–Öğrenci Koçu
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-secondary-foreground">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Dubai, Birleşik Arap Emirlikleri
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4 text-primary" />
                                    ozlem@cimen.net
                                </div>
                                <a
                                    href="https://www.linkedin.com/in/ozlem-cimen-ba66aa56"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                                >
                                    <Linkedin className="w-4 h-4 text-primary" />
                                    LinkedIn Profili
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Summary & Skills */}
                    <div className="lg:col-span-1 space-y-8 animate-slide-up">
                        <p className="text-muted-foreground leading-relaxed text-sm italic border-l-4 border-primary/30 pl-4 py-2 bg-accent/10 rounded-r-lg">
                            Amacım; yıllar içinde farklı ülkelerde, farklı eğitim sistemlerinde edindiğim bu değerli uluslararası deneyimi, benzer bir yolculuğa çıkan ailelerle paylaşmak. Bir eğitimci olmanın yanı sıra, iki çocuk annesi olarak yaşadığım sevinçleri, endişeleri ve karar anlarını çok iyi biliyorum. Her çocuğun ve her ailenin hikâyesi farklı; bu yüzden yaklaşımım hazır reçeteler sunmak değil, velilerle birlikte düşünmek, doğru soruları sormak ve çocukların kendilerini güvende, güçlü ve ait hissedecekleri eğitim ortamlarını birlikte bulmak.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                                <Award className="w-6 h-6 text-primary" />
                                Özet
                            </h2>
                            <div className="text-muted-foreground leading-relaxed space-y-4">
                                <div className="space-y-2">
                                    <p className="font-semibold text-foreground">Uluslararası Eğitim Deneyimi</p>
                                    <ul className="space-y-1.5 text-sm">
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>20 yılı aşkın süredir; Türkiye, Uzak Doğu Asya, Kafkaslar ve Birleşik Arap Emirlikleri başta olmak üzere farklı ülkelerdeki eğitim sistemlerini yakından tanıdım; çocukların yeni okullara, kültürlere ve dillere uyum sürecini hem bir eğitimci hem de bir anne olarak deneyimledim. Aynı zamanda Avrupa ve Amerika eğitim sistemlerine yönelik karşılaştırmalı araştırmalar yaparak ailelere daha bilinçli bir bakış açısı sunmayı hedefliyorum.</span>
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Son 10 yıl içinde 4 farklı ülkede uluslararası okullarla yaşanan birebir deneyimler sayesinde, okul değişimlerinin çocuklar ve aileler üzerindeki akademik olduğu kadar duygusal etkisini de derinlemesine gözlemledim. Çocuklarımın eğitim aldığı uluslararası okullar:</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 gap-1 text-sm">
                                        <span className="flex gap-2"><span className="text-primary">•</span> Singapore International School</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> French International School of Yangon - Joseph Kessel (LFIR) </span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> Lycée Français Pierre Loti d'Istanbul</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> Lycée Français de Bakou</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> Lycee Francais Jean Mermoz Dubai</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> International School of Yangon</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> British International School Istanbul</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> Hisar Okulları Istanbul</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> The International School of Azerbaijan</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> GEMS Dubai American Academy</span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> Centre International D'Antibes France </span>
                                        <span className="flex gap-2"><span className="text-primary">•</span> Chinese Language Academy Myanmar </span>
                                        <li className="flex gap-2">

                                            <span>Okul eğitiminin yanında, çocuklarımın dünyaya daha açık, daha cesur ve kendine güvenen bireyler olarak büyüyebilmeleri için; 10 yıldır Çince, 3 yıldır Rusça ve İspanyolca dersleri almalarını bilinçli olarak destekledim. Bir anne olarak, her yeni kelimenin onlara sadece bir dil değil, başka hayatları anlama ve empati kurma becerisi kazandırdığını görmek benim için bu yolculuğun en kıymetli parçası oldu.</span>
                                        </li></div>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-semibold text-foreground">Uzmanlık Alanları</p>
                                    <ul className="space-y-1.5 text-sm">
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>IB (PYP, MYP), ESL/EAL ve çokdilli öğrenci profilleri konusunda güçlü saha deneyimi</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Öğrencilerin akademik uyum, özgüven, dil gelişimi ve okul kültürüne entegrasyonunu destekleyen birebir koçluk yaklaşımı</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="border-t border-border pt-4 mt-4 space-y-2">
                                    <p className="font-semibold text-foreground">İş ve Girişimcilik Tecrübesi</p>
                                    <ul className="space-y-1.5 text-sm">
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Kendi işini kurmuş bir eğitimci olarak, okulların yalnızca pedagojik değil operasyonel ve iletişimsel ihtiyaçlarını da anlayan yaklaşım</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Eğitim, el sanatları ve sosyal etki alanlarında marka kurma, iş geliştirme ve sürdürülebilir yapı oluşturma deneyimi</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Uluslararası üreticiler ve topluluklarla çalışarak çok kültürlü ekip yönetimi ve proje koordinasyonu tecrübesi</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Veli beklentisi – okul kapasitesi – öğrenci gerçekliği arasındaki dengeyi kurabilen pragmatik bakış açısı</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-semibold text-foreground">Okullar için Somut Fayda</p>
                                    <ul className="space-y-1.5 text-sm">
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Daha hedefli veli iletişimi</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Daha net beklenti yönetimi</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Daha sorunsuz kayıt ve adaptasyon süreçleri</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                                <Heart className="w-6 h-6 text-primary" />
                                Yetenekler
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="bg-accent/30 text-accent-foreground border-accent/20">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Experience */}
                    <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-primary" />
                            Deneyim
                        </h2>

                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-card/50 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {exp.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-primary font-medium mt-1">
                                                    <Globe className="w-4 h-4" />
                                                    {exp.company}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                                                    {exp.period}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {exp.location}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {exp.link && (
                                            <div className="mt-4">
                                                <a
                                                    href={`https://${exp.link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs flex items-center gap-1 text-primary hover:underline font-bold"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    {exp.link}
                                                </a>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    );
};

export default BenKimim;
