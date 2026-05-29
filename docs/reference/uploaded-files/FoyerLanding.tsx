import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/LandingPages.css';

export default function FoyerLanding() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterFoyer = () => {
    setLocation('/foyer');
  };

  return (
    <div className="landing-page foyer-landing">
      <video
        className="landing-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/manus-storage/nvai_foyer_landing_handshot_5k_a8a34a65.mp4"
          type="video/mp4"
        />
      </video>

      <div className="landing-overlay"></div>

      {showContent && (
        <div className="landing-content">
          <div className="landing-header">
            <h1 className="landing-title">The Grand Foyer</h1>
            <p className="landing-subtitle">
              Seventy-five feet of soaring architecture
            </p>
          </div>

          <div className="landing-cta">
            <button className="cta-button" onClick={handleEnterFoyer}>
              Enter →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
