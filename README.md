# NVAI — Napa Valley Art Institut

**An ultra-luxury cinematic immersive digital gallery.**

Production domain: *napavalleyartinstitut.com* (acquisition pending)

---

## Status

Private project. All rights reserved. See `LICENSE`.

This repository is private and proprietary. Not for public distribution, redistribution, or reuse without express written permission from the copyright holder.

## Architecture

- **`frontend/`** — Next.js 15 App Router, React 19, TypeScript 5, Tailwind 3.4. Runs on `:3100`.
- **`backend/`** — FastAPI + Pydantic 2 + Python 3.14. Runs on `:8200`. Proxied through Next.js for `/api/*`.
- **`docs/`** — design briefs, IP records, integration research, vendor shortlists.

## Local development

Two terminals.

```bash
# Terminal 1 — backend
cd backend
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
python main.py
```

```bash
# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

Open `http://localhost:3100`.

## Environment

`backend/.env` (gitignored — never commit):

```
ELEVENLABS_API_KEY=...
BERNARD_VOICE_ID=...
KIKI_VOICE_ID=...
HIGGSFIELD_API_KEY_ID=...
HIGGSFIELD_API_SECRET=...
STRIPE_SECRET_KEY=...
ZOOM_ACCOUNT_ID=...
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...
KICKSTARTER_PROJECT_SLUG=...
```

## Authorship and IP

All creative direction, brand identity, spatial architecture, visual language, narrative structure, character designs, and software design decisions in this repository are the original work of **Sean Gilmore**. Source material for the Modigliani–Kiki painting is contributed by Richard Triberg under a brokerage and content-licensing arrangement.

See `docs/ip/` for the dated authorship record.

---

© 2026 Sean Gilmore. All rights reserved.
