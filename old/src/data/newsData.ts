export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export const categories = [
  "Tümü",
  "Eğitim Politikaları",
  "Sınavlar",
  "Teknoloji",
  "Öğretmenler",
  "Öğrenciler",
  "Yükseköğretim"
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "2026 LGS Tarihi ve Yeni Sınav Formatı Açıklandı",
    summary: "Milli Eğitim Bakanlığı, 2026 yılı Liselere Geçiş Sistemi sınavının tarihini ve yeni formata ilişkin detayları açıkladı. Öğrenciler için önemli değişiklikler bekleniyor.",
    category: "Sınavlar",
    date: "2 Şubat 2026",
    readTime: "5 dk",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    isFeatured: true
  },
  {
    id: "2",
    title: "Türkiye'de Dijital Eğitim Platformları Yaygınlaşıyor",
    summary: "Okullarda yapay zeka destekli öğrenme sistemleri kullanımı artıyor. Öğrenciler kişiselleştirilmiş eğitim deneyimi yaşıyor.",
    category: "Teknoloji",
    date: "1 Şubat 2026",
    readTime: "4 dk",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    isFeatured: true
  },
  {
    id: "3",
    title: "Öğretmen Atama Sonuçları Bu Hafta Açıklanıyor",
    summary: "Binlerce öğretmen adayının beklediği atama sonuçları için geri sayım başladı. MEB yetkilileri tarih verdi.",
    category: "Öğretmenler",
    date: "31 Ocak 2026",
    readTime: "3 dk",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"
  },
  {
    id: "4",
    title: "Üniversitelerde Bahar Dönemi Kayıt Tarihleri",
    summary: "YÖK, 2026 bahar dönemi için üniversite kayıt tarihlerini duyurdu. Öğrencilerin dikkat etmesi gereken önemli tarihler.",
    category: "Yükseköğretim",
    date: "30 Ocak 2026",
    readTime: "4 dk",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
  },
  {
    id: "5",
    title: "Okullarda Yarıyıl Tatili Etkinlikleri Başladı",
    summary: "İl Milli Eğitim Müdürlükleri, yarıyıl tatilinde öğrenciler için çeşitli eğitici ve eğlenceli etkinlikler düzenliyor.",
    category: "Öğrenciler",
    date: "29 Ocak 2026",
    readTime: "3 dk",
    imageUrl: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&q=80"
  },
  {
    id: "6",
    title: "Yeni Müfredat Değişiklikleri 2026-2027'de Uygulanacak",
    summary: "Milli Eğitim Bakanlığı'nın hazırladığı yeni müfredat, gelecek eğitim öğretim yılında tüm okullarda uygulamaya girecek.",
    category: "Eğitim Politikaları",
    date: "28 Ocak 2026",
    readTime: "6 dk",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
  },
  {
    id: "7",
    title: "STEM Eğitimi Türkiye'de Hız Kazanıyor",
    summary: "Bilim, teknoloji, mühendislik ve matematik alanlarında eğitim veren okulların sayısı artıyor.",
    category: "Teknoloji",
    date: "27 Ocak 2026",
    readTime: "5 dk",
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
  },
  {
    id: "8",
    title: "Öğretmenlere Yönelik Yeni Mesleki Gelişim Programı",
    summary: "MEB, öğretmenlerin mesleki yetkinliklerini artırmak için kapsamlı bir program başlattı.",
    category: "Öğretmenler",
    date: "26 Ocak 2026",
    readTime: "4 dk",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
  }
];
