"""
NVAI backend — FastAPI minimal.
Runs on port 8200. Frontend proxies /api/* → here.
"""
from __future__ import annotations

import json
import os
import shutil
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

# Repo paths
BACKEND_DIR = Path(__file__).parent
DATA_DIR = BACKEND_DIR / "data"
VIDEOS_CONFIG = DATA_DIR / "videos.json"
PUBLIC_VIDEOS_DIR = BACKEND_DIR.parent / "frontend" / "public" / "videos"

app = FastAPI(
    title="NVAI",
    description="Napa Valley Art Institute — backend API.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3100", "http://127.0.0.1:3100"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

@app.get("/api/health")
def health() -> dict:
    return {
        "status": "ok",
        "service": "nvai-backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# ---------------------------------------------------------------------------
# DDNDA — front-door signature
# ---------------------------------------------------------------------------

class DDNDASignRequest(BaseModel):
    fullName: str = Field(min_length=1, max_length=200)
    email: str = Field(min_length=3, max_length=320)
    documentVersion: str = Field(default="1.0", max_length=20)


class DDNDASignResponse(BaseModel):
    id: str
    signedAt: str
    documentVersion: str


# In-memory signatures until Supabase is wired
_signatures: dict[str, dict] = {}


@app.post("/api/ddnda/sign", response_model=DDNDASignResponse)
def sign_ddnda(payload: DDNDASignRequest) -> DDNDASignResponse:
    signature_id = str(uuid.uuid4())
    record = {
        "id": signature_id,
        "fullName": payload.fullName,
        "email": payload.email,
        "documentVersion": payload.documentVersion,
        "signedAt": datetime.now(timezone.utc).isoformat(),
    }
    _signatures[signature_id] = record
    return DDNDASignResponse(
        id=signature_id,
        signedAt=record["signedAt"],
        documentVersion=payload.documentVersion,
    )


# ---------------------------------------------------------------------------
# Collection — the 25 paintings (stub; will move to Supabase)
# ---------------------------------------------------------------------------

@app.get("/api/collection")
def collection() -> dict:
    return {
        "count": 25,
        "artists": [
            {"name": "Picasso", "pieces": 8, "wing": "Picasso compound (Grounds)"},
            {"name": "Chagall", "pieces": 6, "wing": "The Parlor — La Ruche"},
            {"name": "Modigliani", "pieces": 3, "wing": "Cabinet de Curiosités — Grand Hall"},
            {"name": "Da Vinci", "pieces": 1, "wing": "Da Vinci Workshop (Grounds)"},
            {"name": "Raphael", "pieces": 1, "wing": "Renaissance Studiolo (upstairs)"},
            {"name": "Monet", "pieces": 1, "wing": "Giverny (Grounds)"},
            {"name": "Matisse", "pieces": 1, "wing": "Mediterranean Pavilion (Patio)"},
            {"name": "Kandinsky", "pieces": 2, "wing": "Bauhaus salon (upstairs)"},
            {"name": "Kahlo", "pieces": 1, "wing": "Casa Azul (Grounds)"},
            {"name": "Bernard", "pieces": 1, "wing": "Russian Enchantment chapel (upstairs)"},
        ],
    }


# ---------------------------------------------------------------------------
# Bernard concierge (Claude API stub — wire ANTHROPIC_API_KEY in .env)
# ---------------------------------------------------------------------------

class BernardAskRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    context: dict | None = None


class BernardAskResponse(BaseModel):
    response: str
    routed_to_human: bool


@app.post("/api/bernard/ask", response_model=BernardAskResponse)
def bernard_ask(payload: BernardAskRequest) -> BernardAskResponse:
    # Stub. Replace with Claude API call once ANTHROPIC_API_KEY is set.
    material_keywords = ("price", "offer", "buy", "purchase", "commit", "bid", "negotiate", "discount")
    is_material = any(k in payload.message.lower() for k in material_keywords)
    if is_material:
        return BernardAskResponse(
            response=(
                "Thank you for the inquiry. A material question of this nature routes to "
                "Sean or Richard directly. I will draft the response and queue it for their "
                "approval. Expect a response within one business day."
            ),
            routed_to_human=True,
        )
    return BernardAskResponse(
        response=(
            "I can answer that from the curatorial layer. The full provenance, "
            "conservation history, and any prior exhibition details for the piece you are "
            "asking about live in the dossier — accessible after your DDNDA is on file."
        ),
        routed_to_human=False,
    )


# ---------------------------------------------------------------------------
# Kiki commerce
# ---------------------------------------------------------------------------

class KikiOrderRequest(BaseModel):
    product: str
    email: str
    fullName: str


@app.post("/api/kiki/order")
def kiki_order(payload: KikiOrderRequest) -> dict:
    return {
        "ok": True,
        "product": payload.product,
        "message": "Order queued. Stripe checkout flow wires in next.",
    }


# ---------------------------------------------------------------------------
# Inquiry intake
# ---------------------------------------------------------------------------

class InquiryRequest(BaseModel):
    fullName: str
    email: str
    message: str
    artworkId: str | None = None


@app.post("/api/inquiry")
def inquiry(payload: InquiryRequest) -> dict:
    return {
        "ok": True,
        "id": str(uuid.uuid4()),
        "queuedAt": datetime.now(timezone.utc).isoformat(),
    }


# ---------------------------------------------------------------------------
# Video curator — backend store + admin endpoints
# ---------------------------------------------------------------------------

def _load_videos_config() -> dict:
    if not VIDEOS_CONFIG.exists():
        return {}
    return json.loads(VIDEOS_CONFIG.read_text(encoding="utf-8"))


def _save_videos_config(config: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    VIDEOS_CONFIG.write_text(json.dumps(config, indent=2), encoding="utf-8")


@app.get("/api/videos")
def get_all_videos() -> dict:
    """Return the full video config (lead-in + rotation per wing)."""
    return _load_videos_config()


@app.get("/api/videos/files")
def list_video_files() -> dict:
    """List every .mp4 file in the public videos directory."""
    if not PUBLIC_VIDEOS_DIR.exists():
        return {"files": []}
    files = sorted([f"/videos/{p.name}" for p in PUBLIC_VIDEOS_DIR.glob("*.mp4")])
    return {"files": files}


class WingVideosUpdate(BaseModel):
    leadIn: str = Field(min_length=1)
    rotation: list[str] = Field(default_factory=list)


@app.patch("/api/videos/wing/{wing}")
def update_wing_videos(wing: str, payload: WingVideosUpdate) -> dict:
    """Replace the lead-in and rotation for a single wing."""
    config = _load_videos_config()
    config[wing] = {"leadIn": payload.leadIn, "rotation": payload.rotation}
    _save_videos_config(config)
    return {"ok": True, "wing": wing, "config": config[wing]}


@app.post("/api/videos/upload")
async def upload_video(file: UploadFile = File(...)) -> dict:
    """Upload a new .mp4 to public/videos. Returns the public URL."""
    if not file.filename or not file.filename.lower().endswith(".mp4"):
        raise HTTPException(status_code=400, detail="Only .mp4 files are accepted.")
    PUBLIC_VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    target = PUBLIC_VIDEOS_DIR / file.filename
    with target.open("wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"ok": True, "url": f"/videos/{file.filename}", "bytes": target.stat().st_size}


@app.delete("/api/videos/file/{filename}")
def delete_video_file(filename: str) -> dict:
    """Remove a video file from public/videos. Use carefully."""
    if "/" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid filename.")
    target = PUBLIC_VIDEOS_DIR / filename
    if not target.exists():
        raise HTTPException(status_code=404, detail="File not found.")
    target.unlink()
    return {"ok": True, "deleted": filename}


# ---------------------------------------------------------------------------
# Bernard voice — ElevenLabs proxy
# British elegant male voice. Default: "George" (deep, soothing).
# ---------------------------------------------------------------------------

import httpx

BERNARD_DEFAULT_VOICE_ID = os.getenv("BERNARD_VOICE_ID", "JBFqnCBsd6RMkjVDRZzb")  # George


class BernardSpeakRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    voiceId: str | None = None


# Kiki audiobook — English narration spoken with a soft French accent.
# The Misho manuscript is English; we want a French-accented female voice.
# Swap KIKI_VOICE_ID in backend/.env to any voice id from the ElevenLabs library
# (https://elevenlabs.io/voice-library — filter "French" or "French accent").
# Default is Charlotte (calm, soothing) — replace once a native French speaker
# is chosen.
KIKI_AUDIOBOOK_VOICE_ID = os.getenv("KIKI_VOICE_ID", "XB0fDUnXU5powFXDhCwa")  # Charlotte — soft, soothing
KIKI_AUDIOBOOK_FILE = DATA_DIR / "kiki-audiobook.json"
KIKI_AUDIO_DIR = BACKEND_DIR.parent / "frontend" / "public" / "kiki" / "audiobook"


def _load_kiki_manifest() -> dict:
    if not KIKI_AUDIOBOOK_FILE.exists():
        return {"chapters": []}
    return json.loads(KIKI_AUDIOBOOK_FILE.read_text(encoding="utf-8"))


@app.get("/api/kiki/audiobook")
def kiki_audiobook_manifest() -> dict:
    """Return chapter list with preview text and whether audio exists for each."""
    manifest = _load_kiki_manifest()
    chapters_out = []
    for ch in manifest.get("chapters", []):
        audio_path = KIKI_AUDIO_DIR / f"chapter-{ch['id']:03d}.mp3"
        chapters_out.append({
            "id": ch["id"],
            "chars": ch["chars"],
            "preview": ch["preview"],
            "audioUrl": f"/kiki/audiobook/chapter-{ch['id']:03d}.mp3" if audio_path.exists() else None,
            "audioBytes": audio_path.stat().st_size if audio_path.exists() else 0,
        })
    return {
        "title": manifest.get("title"),
        "author": manifest.get("author"),
        "totalChapters": manifest.get("totalChapters"),
        "totalChars": manifest.get("totalChars"),
        "voiceId": KIKI_AUDIOBOOK_VOICE_ID,
        "chapters": chapters_out,
    }


class KikiGenerateRequest(BaseModel):
    chapterId: int


@app.post("/api/kiki/audiobook/generate")
async def kiki_generate_chapter(payload: KikiGenerateRequest):
    """Generate a single chapter MP3 via ElevenLabs and save it to public/kiki/audiobook."""
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="ELEVENLABS_API_KEY not configured.")
    manifest = _load_kiki_manifest()
    chapter = next((c for c in manifest.get("chapters", []) if c["id"] == payload.chapterId), None)
    if not chapter:
        raise HTTPException(status_code=404, detail=f"Chapter {payload.chapterId} not found.")
    voice = KIKI_AUDIOBOOK_VOICE_ID
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}"
    body = {
        "text": chapter["text"],
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.6,         # soothing, measured
            "similarity_boost": 0.8,
            "style": 0.35,            # gentle French intonation
            "use_speaker_boost": True,
        },
    }
    headers = {"xi-api-key": api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"}
    async with httpx.AsyncClient(timeout=120.0) as client:
        r = await client.post(url, json=body, headers=headers)
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=f"ElevenLabs: {r.text[:300]}")
    KIKI_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    out = KIKI_AUDIO_DIR / f"chapter-{payload.chapterId:03d}.mp3"
    out.write_bytes(r.content)
    return {
        "ok": True,
        "chapterId": payload.chapterId,
        "audioUrl": f"/kiki/audiobook/chapter-{payload.chapterId:03d}.mp3",
        "bytes": len(r.content),
    }


# ---------------------------------------------------------------------------
# Ambient music — generate via ElevenLabs Music API or accept direct upload
# ---------------------------------------------------------------------------

PUBLIC_AUDIO_ROOT = BACKEND_DIR.parent / "frontend" / "public"


class MusicGenerateRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=2000)
    targetPath: str = Field(min_length=1, max_length=300)
    lengthMs: int = Field(default=120000, ge=10000, le=300000)


@app.post("/api/music/generate")
async def music_generate(payload: MusicGenerateRequest):
    """Call ElevenLabs Music API, save MP3 to public/{targetPath}."""
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="ELEVENLABS_API_KEY not configured.")
    if ".." in payload.targetPath or not payload.targetPath.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="targetPath must end in .mp3 and contain no '..'")
    url = "https://api.elevenlabs.io/v1/music"
    body = {"prompt": payload.prompt, "music_length_ms": payload.lengthMs}
    headers = {"xi-api-key": api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"}
    async with httpx.AsyncClient(timeout=300.0) as client:
        r = await client.post(url, json=body, headers=headers)
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=f"ElevenLabs Music: {r.text[:300]}")
    target = PUBLIC_AUDIO_ROOT / payload.targetPath.lstrip("/")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(r.content)
    return {"ok": True, "url": f"/{payload.targetPath.lstrip('/')}", "bytes": len(r.content)}


@app.post("/api/music/upload")
async def music_upload(targetPath: str, file: UploadFile = File(...)) -> dict:
    """Accept a direct MP3 upload and place it at public/{targetPath}."""
    if not file.filename or not file.filename.lower().endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only .mp3 files are accepted.")
    if ".." in targetPath or not targetPath.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="targetPath must end in .mp3 and contain no '..'")
    target = PUBLIC_AUDIO_ROOT / targetPath.lstrip("/")
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"ok": True, "url": f"/{targetPath.lstrip('/')}", "bytes": target.stat().st_size}


# ---------------------------------------------------------------------------
# Higgsfield image-to-video — Soul model proxy with job tracking
# Schema confirmed via probe:
#   POST /v1/image2video {"params":{"prompt":"...","input_images":[{"type":"image_url","image_url":"https://..."}]}}
#   Auth headers: hf-api-key (key id) + hf-secret (secret)
# ---------------------------------------------------------------------------

HIGGS_BASE = os.getenv("HIGGSFIELD_API_BASE", "https://platform.higgsfield.ai/v1")
HIGGS_JOBS_FILE = DATA_DIR / "higgsfield-jobs.json"


def _higgs_jobs() -> dict:
    if not HIGGS_JOBS_FILE.exists():
        return {}
    return json.loads(HIGGS_JOBS_FILE.read_text(encoding="utf-8"))


def _save_higgs_jobs(jobs: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    HIGGS_JOBS_FILE.write_text(json.dumps(jobs, indent=2), encoding="utf-8")


def _higgs_headers() -> dict:
    kid = os.getenv("HIGGSFIELD_API_KEY_ID")
    sec = os.getenv("HIGGSFIELD_API_SECRET")
    if not kid or not sec:
        raise HTTPException(status_code=503, detail="HIGGSFIELD_API_KEY_ID / HIGGSFIELD_API_SECRET not configured.")
    return {"hf-api-key": kid, "hf-secret": sec, "Content-Type": "application/json"}


class HiggsfieldGenerateRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=4000)
    inputImageUrls: list[str] = Field(min_length=1)
    targetFilename: str = Field(default="")
    label: str = Field(default="", description="Human-readable label saved with the job")


@app.post("/api/higgsfield/generate")
async def higgsfield_generate(payload: HiggsfieldGenerateRequest):
    body = {
        "params": {
            "prompt": payload.prompt,
            "input_images": [{"type": "image_url", "image_url": u} for u in payload.inputImageUrls],
        }
    }
    async with httpx.AsyncClient(timeout=60.0) as client:
        r = await client.post(f"{HIGGS_BASE}/image2video", json=body, headers=_higgs_headers())
    try:
        data = r.json()
    except Exception:
        data = {"raw": r.text[:500]}
    if r.status_code not in (200, 201, 202):
        raise HTTPException(status_code=r.status_code, detail=data)
    job_id = data.get("id") or data.get("job_id") or data.get("task_id") or f"local_{uuid.uuid4()}"
    jobs = _higgs_jobs()
    jobs[job_id] = {
        "id": job_id,
        "prompt": payload.prompt,
        "label": payload.label or payload.prompt[:60],
        "inputImageUrls": payload.inputImageUrls,
        "targetFilename": payload.targetFilename or f"higgs_{job_id}.mp4",
        "submittedAt": datetime.now(timezone.utc).isoformat(),
        "status": data.get("status", "pending"),
        "raw": data,
    }
    _save_higgs_jobs(jobs)
    return {"ok": True, "jobId": job_id, "status": jobs[job_id]["status"]}


@app.get("/api/higgsfield/jobs")
def higgsfield_jobs() -> dict:
    return {"jobs": list(_higgs_jobs().values())}


@app.get("/api/higgsfield/jobs/{job_id}/refresh")
async def higgsfield_refresh(job_id: str):
    jobs = _higgs_jobs()
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not tracked locally.")
    async with httpx.AsyncClient(timeout=60.0) as client:
        # Try common status paths until one returns 200
        for path in (f"/jobs/{job_id}", f"/tasks/{job_id}", f"/image2video/{job_id}"):
            r = await client.get(f"{HIGGS_BASE}{path}", headers={k: v for k, v in _higgs_headers().items() if k != "Content-Type"})
            if r.status_code == 200:
                data = r.json()
                jobs[job_id]["status"] = data.get("status", jobs[job_id]["status"])
                jobs[job_id]["raw"] = data
                vu = data.get("video_url") or data.get("output_url") or data.get("url")
                if vu and jobs[job_id]["status"] in ("complete", "completed", "ready", "succeeded", "success"):
                    PUBLIC_VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
                    target = PUBLIC_VIDEOS_DIR / jobs[job_id]["targetFilename"]
                    async with httpx.AsyncClient(timeout=300.0, follow_redirects=True) as dl:
                        v = await dl.get(vu)
                        if v.status_code == 200:
                            target.write_bytes(v.content)
                            jobs[job_id]["savedTo"] = f"/videos/{jobs[job_id]['targetFilename']}"
                            jobs[job_id]["savedBytes"] = len(v.content)
                break
        else:
            jobs[job_id]["lastRefreshError"] = "no status endpoint responded 200"
    _save_higgs_jobs(jobs)
    return jobs[job_id]


# ---------------------------------------------------------------------------
# Kickstarter — status + project stats proxy
# ---------------------------------------------------------------------------

@app.get("/api/kickstarter/status")
async def kickstarter_status() -> dict:
    """Proxy Kickstarter's Statuspage summary (kickstarter.com is up / partial / down)."""
    url = "https://status.kickstarter.com/api/v2/summary.json"
    async with httpx.AsyncClient(timeout=20.0) as client:
        try:
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()
            return {
                "indicator": data.get("status", {}).get("indicator", "unknown"),
                "description": data.get("status", {}).get("description", ""),
                "components": [
                    {"name": c.get("name"), "status": c.get("status")}
                    for c in data.get("components", [])
                ][:8],
                "raw_url": "https://status.kickstarter.com",
            }
        except Exception as e:
            return {"indicator": "unknown", "description": f"{e}"[:200], "components": []}


@app.get("/api/kickstarter/project")
async def kickstarter_project(slug: str) -> dict:
    """
    Pull public stats for a Kickstarter project. Slug is the path after kickstarter.com/projects/
    e.g. slug='someuser/the-kiki-film' returns pledge data if available.
    """
    url = f"https://www.kickstarter.com/projects/{slug}/stats.json?v=1"
    headers = {"User-Agent": "Mozilla/5.0 (NVAI)"}
    async with httpx.AsyncClient(timeout=20.0, follow_redirects=True) as client:
        try:
            r = await client.get(url, headers=headers)
            if r.status_code != 200:
                return {"ok": False, "status": r.status_code, "note": "project not found or not public yet"}
            data = r.json()
            project = data.get("project", {})
            return {
                "ok": True,
                "name": project.get("name"),
                "state": project.get("state"),
                "pledged": project.get("pledged"),
                "goal": project.get("goal"),
                "backers_count": project.get("backers_count"),
                "currency": project.get("currency"),
                "deadline": project.get("deadline"),
                "url": project.get("urls", {}).get("web", {}).get("project"),
            }
        except Exception as e:
            return {"ok": False, "note": f"{e}"[:200]}


@app.post("/api/bernard/speak")
async def bernard_speak(payload: BernardSpeakRequest):
    """
    Generate British elegant male narration via ElevenLabs and stream the MP3.
    Requires ELEVENLABS_API_KEY in env. Falls back to 503 with helpful message if not configured.
    """
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="ELEVENLABS_API_KEY not configured. Set it in backend/.env to enable Bernard's voice.",
        )
    voice = payload.voiceId or BERNARD_DEFAULT_VOICE_ID
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}"
    body = {
        "text": payload.text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.55,         # restrained, measured
            "similarity_boost": 0.75,
            "style": 0.30,             # slight elegance
            "use_speaker_boost": True,
        },
    }
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    }
    async with httpx.AsyncClient(timeout=60.0) as client:
        r = await client.post(url, json=body, headers=headers)
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=f"ElevenLabs error: {r.text[:200]}")
        from fastapi.responses import Response
        return Response(content=r.content, media_type="audio/mpeg")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8200, reload=True)
