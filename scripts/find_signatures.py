"""Search Wikimedia Commons for signature files for each artist we're missing."""

import json
import sys
import urllib.parse
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")

UA = "NVAI-SignaturePipeline/1.0 (sean.gilmore@ardanedgecapital.com)"

MISSING = {
    "picasso":   ["Pablo Picasso signature"],
    "chagall":   ["Marc Chagall signature"],
    "monet":     ["Claude Monet signature"],
    "kandinsky": ["Kandinsky signature", "Wassily Kandinsky signature"],
    "kahlo":     ["Frida Kahlo signature"],
    "pollock":   ["Jackson Pollock signature"],
    "davinci":   ["Leonardo da Vinci signature", "Leonardo Vinci signature"],
    "raphael":   ["Raphael signature", "Raffaello signature"],
    "bernard":   ["Bernard Buffet signature"],
}


def search_files(query: str, limit: int = 6) -> list[str]:
    api = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": query,
        "srnamespace": "6",  # File
        "srlimit": str(limit),
        "format": "json",
    }
    url = f"{api}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read().decode("utf-8"))
    return [hit["title"] for hit in data.get("query", {}).get("search", [])]


for slug, queries in MISSING.items():
    print(f"\n=== {slug} ===")
    seen = set()
    for q in queries:
        for title in search_files(q):
            if title in seen:
                continue
            seen.add(title)
            print(f"  {title}")
