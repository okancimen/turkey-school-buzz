import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { newsArticles as fallbackArticles, NewsArticle } from '@/data/newsData';

interface UseNewsResult {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export const useNews = (): UseNewsResult => {
  const [articles, setArticles] = useState<NewsArticle[]>(fallbackArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching live news...');
      
      const { data, error: fnError } = await supabase.functions.invoke('fetch-news');

      if (fnError) {
        console.error('Error calling fetch-news function:', fnError);
        throw new Error(fnError.message || 'Failed to fetch news');
      }

      if (data?.success && data.articles?.length > 0) {
        console.log(`Received ${data.articles.length} live articles`);
        setArticles(data.articles);
        setLastUpdated(new Date(data.scrapedAt));
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        console.log('No articles received, using fallback data');
        setArticles(fallbackArticles);
      }
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError(err instanceof Error ? err.message : 'Haberler yüklenirken hata oluştu');
      // Keep fallback articles on error
      setArticles(fallbackArticles);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    isLoading,
    error,
    refetch: fetchNews,
    lastUpdated,
  };
};
