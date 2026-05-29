import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/CinematicJourney.css';

export default function CinematicJourney() {
  const [, setLocation] = useLocation();
  const [showChoice, setShowChoice] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Show choice UI after 5 seconds of drone footage (pause at front door)
    const timer = setTimeout(() => {
      setShowChoice(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleChoiceKiki = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLocation('/kiki-moulin-rouge');
    }, 600);
  };

  const handleChoiceEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLocation('/foyer-landing');
    }, 600);
  };

  const handleChoiceGarden = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLocation('/garden-path');
    }, 600);
  };

  return (
    <div className="cinematic-journey">
      {/* 5K Aerial Drone Video - Approaching Front Door */}
      <video
        className="journey-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/manus-storage/nvai_aerial_drone_approach_5k_cd2460d3.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay Gradient */}
      <div className="journey-overlay"></div>

      {/* NVAI Logo - Top Left */}
      <div className="nvai-logo-container">
        <img
          src="/manus-storage/nvai-logo-clean_6bbb6083.png"
          alt="Napa Valley Art Institute"
          className="nvai-logo"
        />
      </div>

      {/* Choice UI - Appears after drone footage */}
      {showChoice && !isTransitioning && (
        <div className="choice-container">
          {/* Left Navigation - Kiki */}
          <div className="nav-left">
            <button
              className="nav-button nav-kiki"
              onClick={handleChoiceKiki}
              title="Visit Kiki's Moulin Rouge"
            >
              <span className="nav-text">Kiki</span>
              <span className="nav-arrow">←</span>
            </button>
          </div>

          {/* Center Navigation - Enter */}
          <div className="nav-center">
            <button
              className="nav-button nav-enter"
              onClick={handleChoiceEnter}
              title="Enter the Institute"
            >
              <span className="nav-text">Enter</span>
              <span className="nav-arrow">↓</span>
            </button>
          </div>

          {/* Right Navigation - Garden */}
          <div className="nav-right">
            <button
              className="nav-button nav-garden"
              onClick={handleChoiceGarden}
              title="Explore the Gardens"
            >
              <span className="nav-arrow">→</span>
            </button>
          </div>

          {/* Bottom Right - Excerpts */}
          <div className="excerpt-panel">
            <p className="excerpt-text">
              "The NVAI manages a portfolio of over 30 works of art, worth over a billion dollars. Including three Modigliani's, nine Picasso's, seven Chagall's..."
            </p>
            <p className="excerpt-source">
              — Open Letter to Fine Art Buyers, Lenders & Dealers
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
