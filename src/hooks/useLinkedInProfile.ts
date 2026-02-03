import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProfileData {
  name: string;
  headline: string;
  about: string;
  experience: { title: string; company: string }[];
  education: string[];
  skills: string[];
}

interface UseLinkedInProfileResult {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const defaultProfile: ProfileData = {
  name: 'Özlem Cimen',
  headline: 'Eğitim Uzmanı & İçerik Editörü',
  about: 'Türkiye\'deki eğitim sektöründe uzun yıllara dayanan deneyime sahip bir eğitim profesyoneliyim. Eğitim politikaları, öğretmen gelişimi ve öğrenci başarısı konularında çalışmalar yürütmekteyim.',
  experience: [
    { title: 'Eğitim İçerik Editörü', company: 'Eğitim Haberleri' },
    { title: 'Eğitim Danışmanı', company: 'Bağımsız' },
  ],
  education: ['Eğitim Bilimleri', 'Pedagoji'],
  skills: ['Eğitim Politikaları', 'İçerik Yazarlığı', 'Editörlük', 'Araştırma'],
};

export const useLinkedInProfile = (): UseLinkedInProfileResult => {
  const [profile, setProfile] = useState<ProfileData | null>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching LinkedIn profile...');
      
      const { data, error: fnError } = await supabase.functions.invoke('fetch-linkedin');

      if (fnError) {
        console.error('Error calling fetch-linkedin function:', fnError);
        throw new Error(fnError.message || 'Failed to fetch profile');
      }

      if (data?.success && data.profile) {
        console.log('Received LinkedIn profile data');
        setProfile(data.profile);
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        console.log('No profile data received, using default');
        setProfile(defaultProfile);
      }
    } catch (err) {
      console.error('Failed to fetch LinkedIn profile:', err);
      setError(err instanceof Error ? err.message : 'Profil yüklenirken hata oluştu');
      setProfile(defaultProfile);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
