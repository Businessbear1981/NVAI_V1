import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function LeonardoWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'leonardo',
    name: "Leonardo's Professional Workshop",
    period: 'Renaissance',
    description: 'A well-lit sanctuary of scientific inquiry and artistic mastery, where anatomy, optics, and human psychology converge in timeless masterpieces.',
    videoUrl: '/manus-storage/nvai_leonardo_5k.mp4',
    accentColor: '#FFD700',
    artworks: [
      {
        id: 31,
        title: 'Mona Lisa',
        year: 1503,
        medium: 'Oil on poplar wood',
        dimensions: '77 × 53 cm',
        image: '/manus-storage/leonardo_mona_lisa.jpg',
      },
      {
        id: 32,
        title: 'The Last Supper',
        year: 1495,
        medium: 'Oil and tempera on plaster',
        dimensions: '460 × 880 cm',
        image: '/manus-storage/leonardo_last_supper.jpg',
      },
      {
        id: 33,
        title: 'Virgin of the Rocks',
        year: 1483,
        medium: 'Oil on wood',
        dimensions: '199 × 122 cm',
        image: '/manus-storage/leonardo_virgin_rocks.jpg',
      },
      {
        id: 34,
        title: 'The Vitruvian Man',
        year: 1490,
        medium: 'Pen and ink on paper',
        dimensions: '34.4 × 24.5 cm',
        image: '/manus-storage/leonardo_vitruvian_man.jpg',
      },
    ],
  };

  const handleBackToFoyer = () => {
    navigate('/grand-foyer');
  };

  const handleViewPiece = (pieceId: number) => {
    navigate(`/piece/${pieceId}`);
  };

  return (
    <div className="artist-room" style={{ '--room-accent': roomData.accentColor } as React.CSSProperties}>
      {/* 5K Video Background */}
      <video 
        className="room-video"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src={roomData.videoUrl} type="video/mp4" />
      </video>

      {/* Room Overlay */}
      <div className="room-overlay"></div>

      {/* Content */}
      <div className="room-content">
        {/* Header */}
        <div className="room-header-section">
          <h1 className="room-title">{roomData.name}</h1>
          <p className="room-period">{roomData.period}</p>
          <p className="room-description">{roomData.description}</p>
        </div>

        {/* Carousel Toggle */}
        <div className="carousel-section">
          <button 
            className="carousel-toggle"
            onClick={() => setShowCarousel(!showCarousel)}
          >
            {showCarousel ? '✕ Close Carousel' : '◉ View Artworks'}
          </button>

          {showCarousel && (
            <div className="carousel-container">
              <ArtworkCarousel 
                artworks={roomData.artworks}
                onSelectPiece={handleViewPiece}
              />
            </div>
          )}
        </div>

        {/* Room Narrative */}
        <div className="room-narrative">
          <h2>The Universal Genius</h2>
          <p>
            Leonardo da Vinci embodied the Renaissance ideal of the "universal man"—a master of art, science, engineering, and philosophy.
            His workshop was a laboratory where artistic vision merged with scientific inquiry, where every brushstroke was informed by anatomical precision and optical understanding.
          </p>
          <p>
            The "Mona Lisa" remains the world's most famous painting, not merely for its beauty but for the psychological depth Leonardo achieved through his mastery of light, shadow, and the subtle mysteries of human expression.
            "The Last Supper" revolutionized narrative painting by capturing a moment of profound psychological drama. His anatomical drawings reveal a mind that saw beneath the surface to understand the mechanics of human beauty.
          </p>
          <p>
            This workshop represents the pinnacle of human achievement—a place where genius transcended all boundaries between disciplines, where art became a vehicle for understanding the very nature of existence.
          </p>
        </div>

        {/* Navigation */}
        <div className="room-navigation">
          <button className="nav-button back-button" onClick={handleBackToFoyer}>
            ← Return to Grand Foyer
          </button>
        </div>
      </div>
    </div>
  );
}
