import feedparser
import requests
from datetime import datetime

# Define the feed list to test
RSS_FEEDS = [
    {"source": "Milliyet", "url": "http://www.milliyet.com.tr/rss/rssNew/egitimRss.xml", "type": "education"},
    {"source": "Memurlar.net", "url": "https://www.memurlar.net/rss/kategori/13/", "type": "education"},
    {"source": "Egitim Ajansi", "url": "https://www.egitimajansi.com/rss", "type": "education"},
    {"source": "MEB Personel", "url": "https://www.mebpersonel.com/rss.xml", "type": "education"},
    {"source": "TRT Haber", "url": "https://www.trthaber.com/egitim_articles.rss", "type": "education"},
    {"source": "NTV", "url": "https://www.ntv.com.tr/egitim.rss", "type": "education"},
    {"source": "Sabah", "url": "https://www.sabah.com.tr/rss/egitim.xml", "type": "education"},
    {"source": "T24", "url": "https://t24.com.tr/rss/haberler", "type": "general"},
    {"source": "Hurriyet", "url": "http://www.hurriyet.com.tr/rss/anasayfa", "type": "general"},
    {"source": "Cumhuriyet", "url": "http://www.cumhuriyet.com.tr/rss", "type": "general"}
]

KEYWORDS = ["eğitim", "okul", "sınav", "meb", "öğretmen", "üniversite", "lgs", "yks"]

def test_feeds():
    print(f"--- Starting Debug Job at {datetime.now()} ---")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    for feed_info in RSS_FEEDS:
        source = feed_info["source"]
        url = feed_info["url"]
        is_general = feed_info["type"] == "general"
        
        print(f"\nChecking {source} ({url})...")
        
        # 1. Check HTTP Status Code with requests
        try:
            response = requests.get(url, headers=headers, timeout=10)
            print(f"   HTTP Status: {response.status_code}")
            if response.status_code != 200:
                print(f"   [ERROR] Failed to fetch feed. Status: {response.status_code}")
                # Try parsing anyway if it's 301/302? No, requests handles redirects.
                # If 403, we definitely fail unless headers fix it.
                continue
        except requests.RequestException as e:
            print(f"   [ERROR] Request failed: {e}")
            continue

        # 2. Parse Feed
        try:
            # Check if feedparser can parse the content directly or needs the string
            feed = feedparser.parse(response.content)
            
            if feed.bozo:
                 # Bozo means malformed XML but feedparser might still have data
                 print(f"   [WARNING] Feed parsing error (bozo): {feed.bozo_exception}")

            entry_count = len(feed.entries)
            print(f"   Entries Found: {entry_count}")

            if entry_count == 0:
                print("   [ERROR] No entries found in feed.")
                continue

            # 3. Check specific entries
            education_matches = 0
            if is_general:
                print(f"   [INFO] General feed - checking top 20 entries for education keywords...")
                check_limit = 20
            else:
                check_limit = 5

            for i, entry in enumerate(feed.entries[:check_limit]):
                title = entry.title
                # link = entry.link
                
                if is_general:
                    match = any(k in title.lower() for k in KEYWORDS)
                    if match:
                        education_matches += 1
                        print(f"     [MATCH] {title[:40]}...")
                else:
                    print(f"     - {title[:40]}...")

            if is_general:
                print(f"   Title Keyword Matches in top {check_limit}: {education_matches}")

        except Exception as e:
            print(f"   [ERROR] Parsing failed: {e}")

if __name__ == "__main__":
    test_feeds()
