import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/Foyer.css';

export default function Foyer() {
  const [, setLocation] = useLocation();
  const [showChoice, setShowChoice] = useState(false);

  useEffect(() => {
    // Show navigation choices after 3 seconds
    const timer = setTimeout(() => {
      setShowChoice(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownstairsLeft = () => {
    setLocation('/the-vault');
  };

  const handleDownstairsRight = () => {
    setLocation('/the-gallery');
  };

  const handleStairs = () => {
    setLocation('/stairs-landing');
  };

  return (
    <div className="foyer-page">
      {/* Foyer Video Background */}
      <video
        className="foyer-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/manus-storage/nvai_foyer_aerial_approach_5c4ec2a5.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="foyer-overlay"></div>

      {/* Foyer Title */}
      <div className="foyer-title">
        <h1>The Grand Foyer</h1>
        <p>Where your journey through art begins</p>
      </div>

      {/* Navigation - First Full Stop - BOTTOM OF SCREEN */}
      {showChoice && (
        <div className="foyer-navigation">
          {/* Downstairs Left */}
          <div className="nav-section nav-left">
            <button
              className="nav-button nav-downstairs-left"
              onClick={handleDownstairsLeft}
              title="Enter The Vault"
            >
              <span className="nav-arrow">←</span>
              <span className="nav-label">The Vault</span>
            </button>
          </div>

          {/* Center - Stairs */}
          <div className="nav-section nav-center">
            <button
              className="nav-button nav-stairs"
              onClick={handleStairs}
              title="Ascend the Grand Staircase"
            >
              <span className="nav-label">Ascend</span>
              <span className="nav-arrow">↑</span>
            </button>
          </div>

          {/* Downstairs Right */}
          <div className="nav-section nav-right">
            <button
              className="nav-button nav-downstairs-right"
              onClick={handleDownstairsRight}
              title="Enter The Gallery"
            >
              <span className="nav-label">The Gallery</span>
              <span className="nav-arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
