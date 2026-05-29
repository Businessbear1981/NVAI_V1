import { useState } from "react";
import { trpc } from "@/lib/trpc";
import "./NdaGate.css";

interface NdaGateProps {
  artworkId: number;
  onNdaSigned: () => void;
}

export default function NdaGate({ artworkId, onNdaSigned }: NdaGateProps) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signNdaMutation = trpc.gallery.signNda.useMutation({
    onSuccess: () => {
      setLoading(false);
      setError(null);
      onNdaSigned();
    },
    onError: (mutationError) => {
      setLoading(false);
      setError("We were unable to record your signature. Please try again, or contact concierge.");
    }
  });

  const handleSignNda = async () => {
    if (!agreed) {
      setError("Please confirm the Confidentiality Agreement above to continue.");
      return;
    }

    setError(null);
    setLoading(true);
    await signNdaMutation.mutateAsync({ artworkId });
  };

  return (
    <section className="nda-gate">
      <div className="nda-modal">
        <div className="nda-header">
          <h2>Confidentiality Agreement</h2>
          <p className="nda-subtitle">Unlock Full Provenance Details</p>
        </div>

        <div className="nda-content">
          <div className="nda-document">
            <h3>Non-Disclosure Agreement (NDA)</h3>
            <p>
              This artwork is part of a private collection and contains sensitive provenance information. 
              By signing this agreement, you acknowledge:
            </p>
            <ul>
              <li>You will not disclose the full provenance details to unauthorized parties</li>
              <li>You understand the legal implications of this confidentiality agreement</li>
              <li>You agree to use this information solely for personal evaluation and due diligence</li>
              <li>You acknowledge the artwork's historical significance and rarity</li>
              <li>You comply with all applicable laws regarding art ownership and transfer</li>
            </ul>
            <p className="legal-notice">
              This agreement is binding and enforceable under applicable law. 
              Violation may result in legal action.
            </p>
          </div>

          <div className="nda-agreement">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setError(null);
                }}
                disabled={loading}
              />
              <span>
                I have read and agree to the Confidentiality Agreement
              </span>
            </label>
          </div>

          {error && (
            <p className="nda-error" role="status" aria-live="polite">
              {error}
            </p>
          )}
        </div>

        <div className="nda-actions">
          <button
            className="btn btn-primary"
            onClick={handleSignNda}
            disabled={!agreed || loading}
          >
            {loading ? "Signing..." : "Sign and Enter"}
          </button>
          <p className="nda-note">
            Your signature is recorded with timestamp and document version for the record.
          </p>
        </div>
      </div>
    </section>
  );
}
