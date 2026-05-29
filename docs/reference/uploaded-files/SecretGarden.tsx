import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/SecretGarden.css';

export default function SecretGarden() {
  const [, navigate] = useLocation();

  // 5K Video URL for Monet's garden
  const videoUrl = '/manus-storage/nvai_monet_secret_garden_5k_776ba23c.mp4';

  const handleContinueToGardenParty = () => {
    navigate('/garden-party');
  };

  const handleBackToFoyer = () => {
    navigate('/foyer');
  };

  return (
    <div className="secret-garden-container fade-in">
      {/* 5K Video Background - Monet's Garden */}
      <video 
        className="garden-video"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay for text readability */}
      <div className="garden-overlay"></div>

      {/* Content Layer */}
      <div className="garden-content">
        <div className="garden-header">
          <h1 className="garden-title">The Secret Garden</h1>
          <p className="garden-subtitle">Gateway to Outdoor Artist Sanctuaries</p>
          <p className="garden-description">
            Follow the garden path to discover five outdoor artist studios, each a unique creative sanctuary.
            From Monet's water lilies to Frida's Blue House, each master awaits.
          </p>
        </div>

        <div className="garden-navigation">
          <button className="nav-button continue-button" onClick={handleContinueToGardenParty}>
            Continue to the Garden Party →
          </button>
          <button className="nav-button back-button" onClick={handleBackToFoyer}>
            ← Return to Foyer
          </button>

        </div>
      </div>

      {/* Decorative elements */}
      <div className="garden-decorations">
        <div className="floating-leaf leaf-1"></div>
        <div className="floating-leaf leaf-2"></div>
        <div className="floating-leaf leaf-3"></div>
      </div>
    </div>
  );
}
