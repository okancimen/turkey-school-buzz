const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  sourceUrl?: string;
  isFeatured?: boolean;
}

// Fallback stock images for education news
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&q=80',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
];

function getRandomImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function categorizeNews(title: string, content: string): string {
  const lowerText = (title + ' ' + content).toLowerCase();
  
  if (lowerText.includes('lgs') || lowerText.includes('yks') || lowerText.includes('sınav') || 
      lowerText.includes('kpss') || lowerText.includes('ales') || lowerText.includes('tus') ||
      lowerText.includes('dgs') || lowerText.includes('ekpss') || lowerText.includes('tercih')) {
    return 'Sınavlar';
  }
  if (lowerText.includes('öğretmen') || lowerText.includes('atama') || lowerText.includes('kadro') ||
      lowerText.includes('maaş') || lowerText.includes('zam')) {
    return 'Öğretmenler';
  }
  if (lowerText.includes('üniversite') || lowerText.includes('yök') || lowerText.includes('akademik') ||
      lowerText.includes('fakülte') || lowerText.includes('rektör')) {
    return 'Yükseköğretim';
  }
  if (lowerText.includes('teknoloji') || lowerText.includes('dijital') || lowerText.includes('stem') || 
      lowerText.includes('yapay zeka') || lowerText.includes('kodlama') || lowerText.includes('bilgisayar')) {
    return 'Teknoloji';
  }
  if (lowerText.includes('öğrenci') || lowerText.includes('tatil') || lowerText.includes('okul') ||
      lowerText.includes('ders') || lowerText.includes('not') || lowerText.includes('karne')) {
    return 'Öğrenciler';
  }
  if (lowerText.includes('müfredat') || lowerText.includes('bakanlık') || lowerText.includes('meb') ||
      lowerText.includes('yönetmelik') || lowerText.includes('düzenleme')) {
    return 'Eğitim Politikaları';
  }
  
  return 'Genel';
}

function estimateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.max(2, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} dk`;
}

function formatDate(): string {
  return new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function cleanText(text: string): string {
  return text
    // Remove markdown images
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    // Remove markdown links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove remaining markdown syntax
    .replace(/[#*_`]/g, '')
    // Remove URLs
    .replace(/https?:\/\/[^\s]+/g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove special characters at start/end
    .replace(/^[\s\-\|:]+|[\s\-\|:]+$/g, '')
    .trim();
}

function isValidTitle(title: string): boolean {
  const cleaned = cleanText(title);
  // Must be reasonable length
  if (cleaned.length < 15 || cleaned.length > 200) return false;
  // Must not be navigation/menu items
  if (/^(ana ?sayfa|giriş|çıkış|üye|login|menu|header|footer)/i.test(cleaned)) return false;
  // Must not be error pages
  if (/404|sayfa (bulunamadı|kaldırıldı)/i.test(cleaned)) return false;
  // Must not be just numbers or dates
  if (/^\d+$/.test(cleaned)) return false;
  // Must not be just location/weather
  if (/^\d+°|hava durumu$/i.test(cleaned)) return false;
  // Must contain Turkish characters or common words
  if (!/[a-zA-ZğüşıöçĞÜŞİÖÇ]{3,}/.test(cleaned)) return false;
  return true;
}

async function fetchNewsFromSearch(apiKey: string): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  
  const searchQueries = [
    'Türkiye eğitim haberleri MEB güncel 2026',
    'LGS YKS sınav sonuçları tarihleri 2026',
    'öğretmen atama haberleri 2026',
  ];

  for (const query of searchQueries) {
    if (articles.length >= 12) break;
    
    try {
      console.log(`Searching: ${query}`);
      
      const response = await fetch('https://api.firecrawl.dev/v1/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          limit: 8,
          lang: 'tr',
          country: 'TR',
          tbs: 'qdr:w', // Last week
        }),
      });

      if (!response.ok) {
        console.error(`Search failed for "${query}": ${response.status}`);
        continue;
      }

      const data = await response.json();
      const results = data.data || [];
      
      for (const result of results) {
        if (articles.length >= 15) break;
        
        const title = cleanText(result.title || '');
        const description = cleanText(result.description || '');
        
        if (!title || !isValidTitle(title)) continue;
        
        // Check for duplicates
        const isDuplicate = articles.some(a => 
          a.title.toLowerCase() === title.toLowerCase() ||
          a.title.includes(title.slice(0, 30)) ||
          title.includes(a.title.slice(0, 30))
        );
        if (isDuplicate) continue;

        const summary = description || title.slice(0, 150);
        
        articles.push({
          id: `news-${articles.length}`,
          title,
          summary: summary.length > 200 ? summary.slice(0, 197) + '...' : summary,
          category: categorizeNews(title, summary),
          date: formatDate(),
          readTime: estimateReadTime(summary),
          imageUrl: getRandomImage(articles.length),
          sourceUrl: result.url,
          isFeatured: articles.length < 2,
        });
      }
    } catch (error) {
      console.error(`Error searching "${query}":`, error);
    }
  }
  
  return articles;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching Turkish education news via search...');
    const articles = await fetchNewsFromSearch(apiKey);
    
    console.log(`Successfully fetched ${articles.length} articles`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        articles,
        scrapedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch news';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
