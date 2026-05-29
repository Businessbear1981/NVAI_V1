import React, { useState } from 'react';
import '../styles/PieceLanding.css';

interface Piece {
  id: number;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  estimatedValue: string;
  provenance: string;
  description: string;
  heroImage: string;
  ndaRequired: boolean;
}

export default function PieceLanding() {
  const [ndaSigned, setNdaSigned] = useState(false);
  const [showNdaModal, setShowNdaModal] = useState(false);

  // Mock piece data - in production, fetch from API
  const piece: Piece = {
    id: 1,
    title: 'Les Demoiselles d\'Avignon',
    artist: 'Pablo Picasso',
    year: 1907,
    medium: 'Oil on canvas',
    dimensions: '243.9 cm × 233.7 cm',
    estimatedValue: '$250 Million+',
    provenance: 'Musée d\'Art Moderne, Paris | Private Collection, New York',
    description: 'A revolutionary work that shattered conventions of representation and perspective, marking the birth of Cubism.',
    heroImage: '/manus-storage/picasso-demoiselles-5k.jpg',
    ndaRequired: true,
  };

  const handleNdaSign = () => {
    setNdaSigned(true);
    setShowNdaModal(false);
  };

  return (
    <div className="piece-landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <video
          autoPlay
          muted
          loop
          className="hero-video"
          src="/manus-storage/nvai_grand_foyer_5k_62a7044b.mp4"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="piece-title">{piece.title}</h1>
          <p className="piece-artist">{piece.artist} • {piece.year}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="piece-content">
        <div className="piece-grid">
          {/* Left Column - Image & Details */}
          <div className="piece-image-section">
            <div className="piece-image-container">
              <div className="piece-image-placeholder">
                <p>Artwork Image</p>
              </div>
              <div className="image-frame"></div>
            </div>

            {/* Quick Details */}
            <div className="quick-details">
              <div className="detail-item">
                <span className="detail-label">Medium</span>
                <span className="detail-value">{piece.medium}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dimensions</span>
                <span className="detail-value">{piece.dimensions}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Estimated Value</span>
                <span className="detail-value">{piece.estimatedValue}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Provenance & NDA */}
          <div className="piece-info-section">
            {/* Provenance Dossier */}
            <div className="provenance-section">
              <h2 className="section-title">Provenance Dossier</h2>
              <div className="provenance-content">
                {ndaSigned ? (
                  <>
                    <p className="provenance-text">{piece.provenance}</p>
                    <div className="forensic-details">
                      <h3>Forensic Authentication</h3>
                      <ul>
                        <li>✓ Pigment analysis verified</li>
                        <li>✓ Canvas age confirmed (1907)</li>
                        <li>✓ Brushwork signature authenticated</li>
                        <li>✓ Provenance chain complete</li>
                        <li>✓ No restoration issues detected</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="nda-gate-preview">
                    <p className="gate-message">
                      Full provenance details and forensic authentication require NDA signature.
                    </p>
                    <button
                      className="sign-nda-btn"
                      onClick={() => setShowNdaModal(true)}
                    >
                      Sign NDA to Unlock
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Escrow & Lending Module */}
            <div className="escrow-section">
              <h2 className="section-title">Acquisition Options</h2>
              <div className="options-grid">
                <div className="option-card">
                  <h3>Purchase</h3>
                  <p className="option-price">{piece.estimatedValue}</p>
                  <button className="option-btn">Inquire</button>
                </div>
                <div className="option-card">
                  <h3>Escrow Vault</h3>
                  <p className="option-desc">Secure storage & insurance</p>
                  <button className="option-btn">Learn More</button>
                </div>
                <div className="option-card">
                  <h3>Lending Program</h3>
                  <p className="option-desc">Borrow against collection</p>
                  <button className="option-btn">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NDA Modal */}
      {showNdaModal && (
        <div className="nda-modal">
          <div className="nda-modal-content">
            <button
              className="modal-close"
              onClick={() => setShowNdaModal(false)}
            >
              ×
            </button>
            <h2>Non-Disclosure Agreement</h2>
            <div className="nda-text">
              <p>
                By signing this NDA, you agree to maintain confidentiality regarding
                the provenance details, forensic authentication, and valuation information
                contained in this dossier. This information is proprietary and intended
                for qualified collectors and institutions only.
              </p>
              <p>
                You agree not to disclose, reproduce, or distribute any information
                contained herein without written consent from the Napa Valley Art Institute.
              </p>
            </div>
            <div className="nda-actions">
              <button
                className="nda-decline"
                onClick={() => setShowNdaModal(false)}
              >
                Decline
              </button>
              <button
                className="nda-accept"
                onClick={handleNdaSign}
              >
                I Agree & Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
