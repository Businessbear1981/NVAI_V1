import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { KikiGuestBook } from '../components/KikiGuestBook';
import { KikiFilmCrowdfunding } from '../components/KikiFilmCrowdfunding';
import { KikiLingerieCollection } from '../components/KikiLingerieCollection';
import { KikiProducts } from '../components/KikiProducts';
import { KikiArchive } from '../components/KikiArchive';
import '../styles/KikiMoulinRouge.css';

export default function KikiMoulinRouge() {
  const [, navigate] = useLocation();
  const [showEntrance, setShowEntrance] = useState(true);
  const [showEntranceVideo, setShowEntranceVideo] = useState(true);
  const [showDanceVideo, setShowDanceVideo] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselItems = [
    { id: 'guest-book', component: <KikiGuestBook /> },
    { id: 'film-crowdfunding', component: <KikiFilmCrowdfunding /> },
    { id: 'lingerie-collection', component: <KikiLingerieCollection /> },
    { id: 'products', component: <KikiProducts /> },
    { id: 'archive', component: <KikiArchive /> },
  ];

  const handleSkipToKiki = () => {
    setShowEntranceVideo(false);
    setShowDanceVideo(true);
  };

  const handleDanceVideoEnd = () => {
    setShowDanceVideo(false);
  };

  const handleBackToFoyer = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/');
      setIsTransitioning(false);
    }, 1000);
  };

  const handleNextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className={`kiki-moulin-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      {/* Entrance Video - Moulin Rouge 45 seconds */}
      {showEntrance && showEntranceVideo && (
        <div className="kiki-entrance-video-container">
          <video
            className="moulin-rouge-video"
            autoPlay
            muted
            playsInline
            onEnded={() => {
              setShowEntranceVideo(false);
              setShowDanceVideo(true);
            }}
          >
            <source 
              src="/manus-storage/moulin_rouge_live_45sec_70e3cdad.mp4"
              type="video/mp4"
            />
          </video>
          <button 
            className="skip-button"
            onClick={handleSkipToKiki}
            title="Skip to performance"
          >
            SKIP →
          </button>
        </div>
      )}

      {/* 1-Minute Dance Performance Video */}
      {showDanceVideo && (
        <div className="kiki-dance-video-container">
          <video
            className="kiki-dance-video"
            autoPlay
            muted
            playsInline
            onEnded={handleDanceVideoEnd}
          >
            <source 
              src="/manus-storage/kiki_dance_performance_1min_8785f02b.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      )}

      {/* Rotating Product Carousel */}
      {!showEntrance && !showDanceVideo && (
        <div className="kiki-carousel-container">
          {/* Full Screen Product Display */}
          <div className="carousel-item-full-screen">
            {carouselItems[currentCarouselIndex].component}
          </div>

          {/* Navigation Controls */}
          <div className="carousel-controls">
            <button 
              className="carousel-button carousel-prev"
              onClick={handlePrevCarousel}
              title="Previous"
            >
              ←
            </button>
            
            <div className="carousel-indicators">
              {carouselItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`indicator ${index === currentCarouselIndex ? 'active' : ''}`}
                  onClick={() => setCurrentCarouselIndex(index)}
                />
              ))}
            </div>

            <button 
              className="carousel-button carousel-next"
              onClick={handleNextCarousel}
              title="Next"
            >
              →
            </button>
          </div>

          {/* Back to Foyer Button */}
          <button 
            className="back-to-foyer-button"
            onClick={handleBackToFoyer}
            title="Return to Foyer"
          >
            ← Back to Foyer
          </button>
        </div>
      )}
    </div>
  );
}
