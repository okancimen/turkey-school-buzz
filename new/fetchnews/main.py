import sqlite3
import feedparser
from newspaper import Article
from datetime import datetime
import time
import uuid # NEW: For unique IDs
from rapidfuzz import fuzz # NEW: Import the fuzzy logic tool

# --- CONFIGURATION: THE FEED LIST ---
# We use specific Education feeds where available.
# For general feeds, the script filters for keywords.
RSS_FEEDS = [
    # Working Feeds
    {"source": "NTV", "url": "https://www.ntv.com.tr/egitim.rss", "type": "education"},
    {"source": "TRT Haber", "url": "https://www.trthaber.com/egitim_articles.rss", "type": "education"},
    {"source": "Sabah", "url": "https://www.sabah.com.tr/rss/egitim.xml", "type": "education"},
    
    # Needs filtering (General Feeds)
    #{"source": "Milliyet", "url": "http://www.milliyet.com.tr/rss/rssNew/egitimRss.xml", "type": "general"}, # Transformed to general because main egitim feed is mixed
    {"source": "T24", "url": "https://t24.com.tr/rss/haber/egitim", "type": "education"}, # Switched to specific education feed
    {"source": "Hurriyet", "url": "http://www.hurriyet.com.tr/rss/anasayfa", "type": "general"},
    {"source": "Cumhuriyet", "url": "http://www.cumhuriyet.com.tr/rss", "type": "general"},

    # Replacements for broken feeds (Memurlar.net 404, Egitim Ajansi Error, MEB Personel 404)
    # Using generic Google News RSS for Education as a fallback for now can be a good strategy or just removing them.
    # For now, I will remove the broken ones to clean up the errors.
]

KEYWORDS = ["eğitim", "okul", "sınav", "meb", "öğretmen", "üniversite", "lgs", "yks"]
DB_NAME = "education_news.db"

# --- STEP 1: DATABASE SETUP ---
def init_db():
    """Creates the SQLite database and table if they don't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Create table with cluster_id
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT,
            title TEXT,
            url TEXT UNIQUE,
            published_date TEXT,
            summary TEXT,
            full_text TEXT,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            cluster_id TEXT
        )
    ''')
    
    # Check if cluster_id column exists (for migration)
    cursor = conn.execute("PRAGMA table_info(news)")
    columns = [row[1] for row in cursor.fetchall()]
    if 'cluster_id' not in columns:
        print("Migrating Database: Adding cluster_id column...")
        conn.execute("ALTER TABLE news ADD COLUMN cluster_id TEXT")
        
    conn.commit()
    return conn

def get_recent_articles(cursor):
    """Fetches articles from the last 24 hours for clustering comparison."""
    # In a real app, use strict time filtering. For this simplified version,
    # we'll fetch the last 100 items which is roughly enough for a "recent" check
    # given the volume.
    cursor.execute("SELECT id, title, cluster_id FROM news ORDER BY id DESC LIMIT 100")
    return cursor.fetchall()

# --- STEP 2: PROCESSING AGENT ---
def process_feeds():
    conn = init_db()
    cursor = conn.cursor()
    
    print(f"--- Starting Job at {datetime.now()} ---")
    
    # Load recent articles into memory for clustering
    recent_articles = get_recent_articles(cursor)
    print(f"Loaded {len(recent_articles)} recent articles for clustering comparison.")
    
    for feed_info in RSS_FEEDS:
        source = feed_info["source"]
        url = feed_info["url"]
        is_general = feed_info["type"] == "general"
        
        print(f"Checking {source}...")
        
        try:
            # Add User-Agent to bypass 403 Forbidden on some sites
            # feedparser can take an 'agent' argument, but sometimes passing the content directly from requests is safer.
            # However, feedparser's internal http handling is old. Let's use the agent param first.
            feed = feedparser.parse(url, agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
            
            # Process entries
            # For General feeds, check more entries because education news might be buried.
            limit = 50 if is_general else 10
            
            for entry in feed.entries[:limit]:
                link = entry.link
                title = entry.title
                summary = entry.get('summary', '') or entry.get('description', '')
                
                # CHECK 1: DUPLICATE CHECK (The Memory)
                cursor.execute("SELECT id FROM news WHERE url = ?", (link,))
                if cursor.fetchone():
                    print(f"   [SKIP] Already in DB: {title[:30]}...")
                    continue # Skip if already exists
                
                # CHECK 2: KEYWORD FILTER (For General Feeds)
                if is_general:
                    # Check both title and summary for keywords
                    text_to_check = (title + " " + summary).lower()
                    if not any(k in text_to_check for k in KEYWORDS):
                        continue # Skip if not about education

                # CHECK 3: CLUSTERING (The Brain)
                best_score = 0
                assigned_cluster_id = None
                
                for r_id, r_title, r_cluster in recent_articles:
                    # Using a Combined Metric:
                    # 1. Partial Ratio > 75: Good for "Short title inside Long title" (e.g. YKS Matches)
                    # 2. Token Set Ratio > 75: Good for scrambled words
                    
                    partial = fuzz.partial_ratio(title, r_title)
                    token_set = fuzz.token_set_ratio(title, r_title)
                    
                    # Take the maximum of the useful metrics
                    current_score = max(partial, token_set)
                    
                    if current_score > best_score:
                        best_score = current_score
                        if current_score > 75: # Lowered threshold based on analysis
                            assigned_cluster_id = r_cluster
                
                if assigned_cluster_id:
                     print(f"   [GROUPED] '{title[:20]}...' matched recent story ({best_score}%)")
                else:
                     # Generate unique cluster ID (timestamp + random suffix to prevent collisions in same second)
                     assigned_cluster_id = f"{int(time.time())}_{source[:3]}_{uuid.uuid4().hex[:4]}"
                     print(f"   [NEW STORY] {title[:30]}...")

                # CHECK 4: EXTRACTION (The Heavy Lifting)
                try:
                    # Using newspaper4k for extraction
                    article = Article(link, language='tr')
                    article.download()
                    article.parse()
                    
                    # Insert into Database with cluster_id
                    cursor.execute('''
                        INSERT INTO news (source, title, url, published_date, summary, full_text, image_url, cluster_id)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        source, 
                        title, 
                        link, 
                        entry.get('published', str(datetime.now())), 
                        article.summary, # Note: article.nlp() needs to be called for summary, but we can skip for speed
                        article.text, 
                        article.top_image,
                        assigned_cluster_id
                    ))
                    conn.commit()
                    
                    # Update local memory immediately
                    # We need the ID of the row we just inserted, but for clustering we just need title and cluster_id
                    # fetching ID is nice but not strictly required for the loop unless we use it for sorting
                    recent_articles.append((None, title, assigned_cluster_id))
                    
                    # Be polite to the server
                    time.sleep(1) 
                    
                except Exception as e:
                    print(f"   [ERROR] Could not extract {link}: {e}")

        except Exception as e:
            print(f"Error parsing feed {source}: {e}")

    conn.close()
    print("--- Job Complete ---\n")

if __name__ == "__main__":
    process_feeds()
