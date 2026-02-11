from rapidfuzz import fuzz

# These are the real titles from your database that SHOULD have been grouped
TITLES = [
    # Cluster 1: YKS (University Exam) Applications
    "YKS başvuruları başladı",
    "YKS başvuru tarihleri ve sınav ücreti belli oldu",
    "YKS başvuru kılavuzu 2026: YKS başvuruları ne zaman, saat kaçta başlayacak? Başvuru nasıl yapılır?",
    "YKS başvuru tarihleri 2026: YKS başvuruları ne zaman başlayacak? ÖSYM tarih duyurdu",
    "2026 YKS tarihi belli oldu, başvurular başladı",
    "YKS başvuruları ne zaman bitiyor? YKS başvuru ücreti ne kadar?",

    # Cluster 2: First Lesson / School Term Start
    "Yarıyıl sonrası ilk ders zili çaldı. İlk ders: Bayrak sevgisi",
    "İlk ders zili bugün çalıyor. Yarıyıl tatili bitti, öğrenciler okula dönüyor",
    "Öğrenciler ikinci döneme Bayrak Sevgisi ile başlayacak",
    "İkinci dönem bayrak coşkusuyla başladı"
]

def test_scores():
    print("--- Testing rapidfuzz Scores ---")
    
    # Compare "YKS başvuruları başladı" against all other YKS ones
    base_title = TITLES[0]
    print(f"\nComparing Base: '{base_title}'")
    
    for i in range(1, 6):
        target = TITLES[i]
        limit = 85 # Current threshold
        
        # Test distinct metrics
        ratio = fuzz.ratio(base_title, target)
        partial_ratio = fuzz.partial_ratio(base_title, target)
        token_sort_ratio = fuzz.token_sort_ratio(base_title, target)
        token_set_ratio = fuzz.token_set_ratio(base_title, target)
        
        print(f"\n  Target: '{target[:40]}...'")
        print(f"    ratio:            {ratio}")
        print(f"    partial_ratio:    {partial_ratio}")
        print(f"    token_sort_ratio: {token_sort_ratio}")
        print(f"    token_set_ratio:  {token_set_ratio}")
        
        if token_set_ratio > limit:
             print("    [MATCH] (Current Logic would match)")
        else:
             print("    [FAIL] (Current Logic missed this)")

    # Compare "First Lesson" titles
    base_title_2 = TITLES[6]
    print(f"\n\nComparing Base: '{base_title_2}'")
    
    for i in range(7, 10):
        target = TITLES[i]
        token_set_ratio = fuzz.token_set_ratio(base_title_2, target)
        partial_ratio = fuzz.partial_ratio(base_title_2, target)
        
        print(f"\n  Target: '{target[:40]}...'")
        print(f"    token_set_ratio:  {token_set_ratio}")
        print(f"    partial_ratio:    {partial_ratio}")

if __name__ == "__main__":
    test_scores()
