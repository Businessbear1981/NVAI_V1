import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/GrandFoyer.css';

export default function GrandFoyer() {
  const [, navigate] = useLocation();
  const [scene, setScene] = useState<'courtyard' | 'garden' | 'foyer'>('courtyard');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 5K Video URLs from S3
  const videoUrls = {
    courtyard: '/manus-storage/nvai_courtyard_5k_c69a9e89.mp4',
    garden: '/manus-storage/nvai_garden_passage_5k_3b90c5d7.mp4',
    foyer: '/manus-storage/nvai_grand_foyer_5k_62a7044b.mp4',
  };

  const handleGoToGarden = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/secret-garden');
      setIsTransitioning(false);
    }, 1000);
  };

  const handleEnterFoyer = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScene('garden');
      setIsTransitioning(false);
    }, 1000);
  };

  const handleContinueFoyer = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScene('foyer');
      setIsTransitioning(false);
    }, 1000);
  };

  const handleEnterGallery = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/gallery');
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="grand-foyer-container">
      {/* SCENE 1: COURTYARD ENTRY */}
      {scene === 'courtyard' && (
        <div className={`foyer-scene courtyard-scene ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          {/* 5K Video Background */}
          <video 
            className="scene-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={videoUrls.courtyard} type="video/mp4" />
          </video>

          {/* Overlay for text readability */}
          <div className="scene-overlay"></div>

          {/* Content Layer */}
          <div className="scene-content">
            <h1 className="scene-title">Welcome to the Chateau</h1>
            <p className="scene-subtitle">Choose your path through the grounds</p>
            <div className="navigation-buttons">
              <button className="nav-button garden-button" onClick={handleGoToGarden}>
                ← Turn Right to the Garden
              </button>
              <button className="nav-button foyer-button" onClick={handleEnterFoyer}>
                Enter Through the Doors →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 2: GARDEN PASSAGE (FOYER PATH) */}
      {scene === 'garden' && (
        <div className={`foyer-scene garden-scene ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <video 
            className="scene-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={videoUrls.garden} type="video/mp4" />
          </video>
          <div className="scene-overlay"></div>
          <div className="scene-content">
            <h1 className="scene-title">Through the Garden Passage</h1>
            <p className="scene-subtitle">Approaching the Grand Foyer</p>
            <button className="nav-button continue-button" onClick={handleContinueFoyer}>
              Continue Inside →
            </button>
          </div>
        </div>
      )}

      {/* SCENE 3: GRAND FOYER */}
      {scene === 'foyer' && (
        <div className={`foyer-scene foyer-scene-final ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <video 
            className="scene-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={videoUrls.foyer} type="video/mp4" />
          </video>
          <div className="scene-overlay"></div>
          <div className="scene-content">
            <h1 className="scene-title">The Grand Foyer</h1>
            <p className="scene-subtitle">75 Foot Ceilings • Sweeping Staircase • Chandelier</p>
            <button className="nav-button gallery-button" onClick={handleEnterGallery}>
              Explore the Galleries →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
