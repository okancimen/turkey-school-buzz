import feedparser
import requests

# T24 Feed
url = "https://t24.com.tr/rss/haberler"
KEYWORDS = ["eğitim", "okul", "sınav", "meb", "öğretmen", "üniversite", "lgs", "yks"]

def analyze_t24():
    print(f"Analyzing T24 Feed: {url}")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        feed = feedparser.parse(response.content)
        
        print(f"Total Entries in Feed: {len(feed.entries)}")
        
        print("\n--- Listing Top 50 Entries ---")
        education_count = 0
        
        for i, entry in enumerate(feed.entries[:50]):
            title = entry.title
            summary = entry.get('summary', '') or entry.get('description', '')
            
            text_to_check = (title + " " + summary).lower()
            match = any(k in text_to_check for k in KEYWORDS)
            
            status = "[MATCH]" if match else "[SKIP]"
            if match:
                education_count += 1
            
            print(f"{i+1}. {status} {title[:50]}...")
            
            # If skipping, let's see why (maybe print summary length or snippet)
            if not match and "egitim" in summary.lower(): # Double check for potential misses
                 print(f"      (DEBUG) 'egitim' found but keyword mismatch? Summary: {summary[:50]}...")

        print(f"\nTotal Education Matches found: {education_count}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_t24()
