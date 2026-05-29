import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/LandingPages.css';

export default function GardenPathLanding() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterGarden = () => {
    setLocation('/garden-party');
  };

  return (
    <div className="landing-page garden-landing">
      <video
        className="landing-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/manus-storage/nvai_garden_path_to_patio_5k_44141aa0.mp4"
          type="video/mp4"
        />
      </video>

      <div className="landing-overlay"></div>

      {showContent && (
        <div className="landing-content">
          <div className="landing-header">
            <h1 className="landing-title">The Patio</h1>
            <p className="landing-subtitle">
              A moment of contemplation overlooking the vineyards
            </p>
          </div>

          <div className="landing-cta">
            <button className="cta-button" onClick={handleEnterGarden}>
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
