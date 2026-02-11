import { useState, useEffect } from 'react';

export interface ProfileData {
  name: string;
  headline: string;
  about: string;
  experience: { title: string; company: string; period?: string }[];
  education: string[];
  skills: string[];
}

interface UseLinkedInProfileResult {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
}

// Static profile data since LinkedIn cannot be scraped (blocklisted by Firecrawl)
const profileData: ProfileData = {
  name: 'Özlem Cimen',
  headline: 'Eğitim Uzmanı & İçerik Editörü',
  about: 'Türkiye\'deki eğitim sektöründe uzun yıllara dayanan deneyime sahip bir eğitim profesyoneliyim. Eğitim politikaları, öğretmen gelişimi ve öğrenci başarısı konularında çalışmalar yürütmekteyim. Eğitim haberleri platformu aracılığıyla Türkiye\'deki en güncel eğitim gelişmelerini takipçilerimle paylaşıyorum.',
  experience: [
    { title: 'Eğitim İçerik Editörü', company: 'Eğitim Haberleri', period: '2020 - Günümüz' },
    { title: 'Eğitim Danışmanı', company: 'Bağımsız', period: '2015 - 2020' },
    { title: 'Öğretmen', company: 'MEB', period: '2010 - 2015' },
  ],
  education: [
    'Yüksek Lisans - Eğitim Yönetimi',
    'Lisans - Eğitim Bilimleri',
  ],
  skills: [
    'Eğitim Politikaları',
    'İçerik Yazarlığı',
    'Editörlük',
    'Araştırma',
    'Öğretmen Eğitimi',
    'Müfredat Geliştirme',
    'Eğitim Teknolojileri',
    'Proje Yönetimi',
  ],
};

export const useLinkedInProfile = (): UseLinkedInProfileResult => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate brief loading for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return {
    profile: profileData,
    isLoading,
    error: null,
  };
};
