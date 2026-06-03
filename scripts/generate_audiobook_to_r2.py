"""Generate all 110 Kiki audiobook chapters via ElevenLabs and upload each to R2.

Bypasses Railway's ephemeral filesystem. Each chapter's MP3 lands at:
  https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/audiobook/chapter-XXX.mp3

Writes a progress log to /tmp/audiobook_generation.log so the main thread can
poll status.
"""
import json
import os
import sys
import time
from pathlib import Path
import urllib.request
import urllib.error

ELEVENLABS_KEY = os.environ.get("ELEVENLABS_API_KEY") or sys.exit("ELEVENLABS_API_KEY not set in env")
VOICE_ID = os.environ.get("BERNARD_VOICE_ID", "JBFqnCBsd6RMkjVDRZzb")  # George - British elegant male
MODEL_ID = "eleven_multilingual_v2"

ACCT = os.environ.get("CLOUDFLARE_ACCOUNT_ID") or sys.exit("CLOUDFLARE_ACCOUNT_ID not set in env")
BUCKET = os.environ.get("R2_BUCKET", "navi-videos")
R2_TOKEN = os.environ.get("CLOUDFLARE_R2_TOKEN") or sys.exit("CLOUDFLARE_R2_TOKEN not set in env")
R2_PUBLIC_BASE = os.environ.get("R2_PUBLIC_URL", "https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev")

LOG_PATH = Path("/tmp/audiobook_generation.log")
MANIFEST_PATH = Path(r"C:\Users\sgill\nvai\backend\data\kiki-audiobook.json")
OUTPUT_MANIFEST = Path(r"C:\Users\sgill\nvai\backend\data\kiki-audiobook-r2-manifest.json")


def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def generate_chapter(chapter_id: int, text: str) -> bytes:
    """Call ElevenLabs and return the MP3 bytes."""
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    body = json.dumps({
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.55,
            "similarity_boost": 0.75,
            "style": 0.30,
            "use_speaker_boost": True,
        },
    }).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "xi-api-key": ELEVENLABS_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as r:
        return r.read()


def upload_to_r2(key: str, audio_bytes: bytes) -> str:
    """Upload audio to R2 and return the public URL."""
    url = f"https://api.cloudflare.com/client/v4/accounts/{ACCT}/r2/buckets/{BUCKET}/objects/{key}"
    req = urllib.request.Request(
        url,
        data=audio_bytes,
        headers={
            "Authorization": f"Bearer {R2_TOKEN}",
            "Content-Type": "audio/mpeg",
        },
        method="PUT",
    )
    with urllib.request.urlopen(req, timeout=120) as r:
        result = json.loads(r.read())
    if not result.get("success"):
        raise RuntimeError(f"R2 upload failed: {result}")
    return f"{R2_PUBLIC_BASE}/{key}"


def main():
    # Reset log
    if LOG_PATH.exists():
        LOG_PATH.unlink()

    log("Starting audiobook generation for all 110 chapters")
    log(f"Voice: George ({VOICE_ID}) | Model: {MODEL_ID}")

    with open(MANIFEST_PATH, encoding="utf-8") as f:
        manifest = json.load(f)

    chapters = manifest.get("chapters", [])
    log(f"Loaded {len(chapters)} chapters from manifest")

    results = []
    total_chars = 0
    total_bytes = 0
    start = time.time()

    for ch in chapters:
        chid = ch["id"]
        text = ch.get("text", "")
        if not text or len(text.strip()) < 10:
            log(f"Chapter {chid}: SKIPPED (no text)")
            results.append({"id": chid, "url": None, "error": "no text"})
            continue

        try:
            log(f"Chapter {chid}: generating ({len(text)} chars)…")
            t0 = time.time()
            audio = generate_chapter(chid, text)
            gen_time = time.time() - t0
            log(f"Chapter {chid}: generated {len(audio):,} bytes in {gen_time:.1f}s")

            key = f"audiobook/chapter-{chid:03d}.mp3"
            url = upload_to_r2(key, audio)
            log(f"Chapter {chid}: uploaded → {url}")

            results.append({"id": chid, "url": url, "bytes": len(audio), "chars": len(text)})
            total_chars += len(text)
            total_bytes += len(audio)

            # Write progress manifest incrementally so frontend can pick up partial state
            with open(OUTPUT_MANIFEST, "w", encoding="utf-8") as f:
                json.dump({
                    "completedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                    "totalChapters": len(chapters),
                    "completed": len([r for r in results if r.get("url")]),
                    "totalChars": total_chars,
                    "totalBytes": total_bytes,
                    "results": results,
                }, f, indent=2)

            time.sleep(0.5)  # rate limit gentle

        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="ignore")[:300]
            log(f"Chapter {chid}: HTTP {e.code} - {err_body}")
            results.append({"id": chid, "url": None, "error": f"HTTP {e.code}"})
            if e.code == 401:
                log("FATAL: 401 unauthorized — stopping")
                break
            time.sleep(2)
        except Exception as e:
            log(f"Chapter {chid}: ERROR {e}")
            results.append({"id": chid, "url": None, "error": str(e)})
            time.sleep(2)

    elapsed = time.time() - start
    log(f"DONE in {elapsed/60:.1f}m | {total_chars:,} chars | {total_bytes/(1024**2):.1f} MB MP3 produced")
    log(f"Manifest at: {OUTPUT_MANIFEST}")


if __name__ == "__main__":
    main()
