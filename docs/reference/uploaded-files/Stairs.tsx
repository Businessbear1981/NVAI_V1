import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/Stairs.css';

export default function Stairs() {
  const [, navigate] = useLocation();
  const [showChoice, setShowChoice] = useState(false);

  useEffect(() => {
    // Show navigation choices after 3 seconds
    const timer = setTimeout(() => {
      setShowChoice(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterGrandFoyer = () => {
    navigate('/grand-foyer');
  };

  const handleBackToFoyer = () => {
    navigate('/foyer');
  };

  return (
    <div className="stairs-page">
      {/* Stairs Video Background */}
      <video
        className="stairs-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/manus-storage/nvai_stairs_landing_5k.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="stairs-overlay"></div>

      {/* Navigation - Second Full Stop */}
      {showChoice && (
        <div className="stairs-navigation">
          {/* Center - Enter Grand Foyer */}
          <div className="nav-section nav-center">
            <button
              className="nav-button nav-enter"
              onClick={handleEnterGrandFoyer}
              title="Enter the Grand Foyer"
            >
              <span className="nav-label">Enter the Grand Foyer</span>
              <span className="nav-arrow">↑</span>
            </button>
          </div>

          {/* Back to Foyer */}
          <div className="nav-section nav-back-section">
            <button
              className="nav-button nav-back"
              onClick={handleBackToFoyer}
              title="Return to the Foyer"
            >
              <span className="nav-label">← Return to Foyer</span>
            </button>
          </div>
        </div>
      )}

      {/* Stairs Title */}
      <div className="stairs-title">
        <h1>The Grand Staircase</h1>
        <p>Ascending to the artist wings</p>
      </div>
    </div>
  );
}
