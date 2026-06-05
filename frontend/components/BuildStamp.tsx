// Tiny version stamp in the bottom-right corner — shows the commit SHA
// and build time so deploys can be visually verified. If you reload and
// the stamp doesn't change after a push, your browser is showing cached
// HTML; if it does change, the deploy reached you.
//
// Values come from Vercel's build-time env vars (auto-injected on every
// deploy) — no manual updates needed.

const sha = (process.env.VERCEL_GIT_COMMIT_SHA || 'dev').slice(0, 7);
const buildTime = new Date().toISOString().slice(0, 16).replace('T', ' ');

export default function BuildStamp() {
  return (
    <div
      className="fixed bottom-2 right-3 z-[60] pointer-events-none select-none font-mono text-[0.55rem] tracking-wider text-gold/40"
      aria-hidden="true"
    >
      v{sha} · {buildTime}Z
    </div>
  );
}
