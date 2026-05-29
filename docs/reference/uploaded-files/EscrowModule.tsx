import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { EscrowRecord } from "@/types/gallery";
import "./EscrowModule.css";

interface EscrowModuleProps {
  artworkId: number;
  escrowRecords: EscrowRecord[];
}

export default function EscrowModule({ artworkId, escrowRecords }: EscrowModuleProps) {
  const [selectedType, setSelectedType] = useState<"vault" | "lending" | "sale" | null>(null);
  const [loading, setLoading] = useState(false);

  const createEscrowMutation = trpc.gallery.createEscrowRecord.useMutation({
    onSuccess: () => {
      setLoading(false);
      setSelectedType(null);
      alert("Escrow record created successfully");
    },
    onError: (error) => {
      setLoading(false);
      alert(`Error creating escrow record: ${error.message}`);
    }
  });

  const handleCreateEscrow = async (type: "vault" | "lending" | "sale") => {
    setLoading(true);
    await createEscrowMutation.mutateAsync({
      artworkId,
      escrowType: type,
      amount: "$0",
      terms: "Standard terms apply"
    });
  };

  return (
    <section className="escrow-module">
      <div className="escrow-header">
        <h2>Escrow & Lending Services</h2>
        <p className="escrow-subtitle">Secure Financial Options</p>
      </div>

      <div className="escrow-options">
        {/* Vault Option */}
        <div className="escrow-card">
          <h3>Secure Vault Storage</h3>
          <p className="option-description">
            Store your artwork in our climate-controlled, insured vault facility.
          </p>
          <ul className="option-features">
            <li>24/7 security monitoring</li>
            <li>Climate control (18-21°C, 45-55% humidity)</li>
            <li>Full insurance coverage</li>
            <li>Professional handling</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleCreateEscrow("vault")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Request Vault Storage"}
          </button>
        </div>

        {/* Lending Option */}
        <div className="escrow-card">
          <h3>Artwork Lending</h3>
          <p className="option-description">
            Borrow against your artwork's value with flexible terms.
          </p>
          <ul className="option-features">
            <li>Competitive interest rates (3-5%)</li>
            <li>Flexible loan terms</li>
            <li>Artwork remains in your possession</li>
            <li>Professional appraisal included</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleCreateEscrow("lending")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Apply for Loan"}
          </button>
        </div>

        {/* Sale Option */}
        <div className="escrow-card">
          <h3>Secure Sale Transaction</h3>
          <p className="option-description">
            Execute a secure sale with full escrow protection.
          </p>
          <ul className="option-features">
            <li>Buyer & seller protection</li>
            <li>Transparent transaction process</li>
            <li>Professional documentation</li>
            <li>Secure fund transfer</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleCreateEscrow("sale")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Initiate Sale"}
          </button>
        </div>
      </div>

      {/* Active Records */}
      {escrowRecords.length > 0 && (
        <div className="active-records">
          <h3>Active Escrow Records</h3>
          <div className="records-list">
            {escrowRecords.map((record) => (
              <div key={record.id} className="record-item">
                <span className="record-type">{record.escrowType.toUpperCase()}</span>
                <span className="record-status">{record.status}</span>
                {record.amount && <span className="record-amount">{record.amount}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
