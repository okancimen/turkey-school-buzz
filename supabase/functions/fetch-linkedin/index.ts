const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    const linkedinUrl = 'https://www.linkedin.com/in/ozlem-cimen-ba66aa56/';
    console.log('Scraping LinkedIn profile:', linkedinUrl);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: linkedinUrl,
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Request failed with status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the LinkedIn data from markdown
    const markdown = data.data?.markdown || '';
    console.log('LinkedIn markdown received, length:', markdown.length);

    // Extract profile information
    const profile = parseLinkedInProfile(markdown);

    return new Response(
      JSON.stringify({ 
        success: true, 
        profile,
        scrapedAt: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error scraping LinkedIn:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape LinkedIn';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseLinkedInProfile(markdown: string): ProfileData {
  // Default profile data based on the LinkedIn URL
  const profile: ProfileData = {
    name: 'Özlem Cimen',
    headline: 'Eğitim Uzmanı',
    about: '',
    experience: [],
    education: [],
    skills: [],
  };

  try {
    // Try to extract name (usually first heading)
    const nameMatch = markdown.match(/^#\s*(.+?)(?:\n|$)/m);
    if (nameMatch) {
      profile.name = nameMatch[1].trim();
    }

    // Try to extract headline/title
    const headlineMatch = markdown.match(/(?:^|\n)([^#\n].+?(?:at|@|Manager|Director|Teacher|Öğretmen|Uzman|Specialist).+?)(?:\n|$)/i);
    if (headlineMatch) {
      profile.headline = headlineMatch[1].trim();
    }

    // Try to extract about section
    const aboutMatch = markdown.match(/(?:About|Hakkında|Summary|Özet)\s*\n+([^#]+?)(?=\n#|\n\n\n|Experience|Deneyim|$)/i);
    if (aboutMatch) {
      profile.about = aboutMatch[1].trim().substring(0, 500);
    }

    // Extract experience entries
    const expSection = markdown.match(/(?:Experience|Deneyim)\s*\n+([\s\S]+?)(?=\n#|Education|Eğitim|Skills|Yetenekler|$)/i);
    if (expSection) {
      const expLines = expSection[1].split('\n').filter(l => l.trim());
      for (let i = 0; i < Math.min(expLines.length, 6); i += 2) {
        if (expLines[i]) {
          profile.experience.push({
            title: expLines[i].replace(/^[-*•]\s*/, '').trim(),
            company: expLines[i + 1]?.replace(/^[-*•]\s*/, '').trim() || '',
          });
        }
      }
    }

    // Extract education
    const eduSection = markdown.match(/(?:Education|Eğitim)\s*\n+([\s\S]+?)(?=\n#|Skills|Yetenekler|Experience|$)/i);
    if (eduSection) {
      const eduLines = eduSection[1].split('\n').filter(l => l.trim());
      for (const line of eduLines.slice(0, 3)) {
        if (line.trim()) {
          profile.education.push(line.replace(/^[-*•]\s*/, '').trim());
        }
      }
    }

    // Extract skills
    const skillsSection = markdown.match(/(?:Skills|Yetenekler)\s*\n+([\s\S]+?)(?=\n#|$)/i);
    if (skillsSection) {
      const skillLines = skillsSection[1].split('\n').filter(l => l.trim());
      for (const line of skillLines.slice(0, 10)) {
        const skill = line.replace(/^[-*•]\s*/, '').trim();
        if (skill && skill.length < 50) {
          profile.skills.push(skill);
        }
      }
    }
  } catch (e) {
    console.error('Error parsing LinkedIn profile:', e);
  }

  return profile;
}

interface ProfileData {
  name: string;
  headline: string;
  about: string;
  experience: { title: string; company: string }[];
  education: string[];
  skills: string[];
}
