import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function RaphaelWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'raphael',
    name: "Raphael's Renaissance Chapel",
    period: 'Renaissance',
    description: 'A sanctuary of classical harmony and spiritual grace, where divine beauty manifests through perfect proportion and luminous color.',
    videoUrl: '/manus-storage/nvai_raphael_5k.mp4',
    accentColor: '#CD853F',
    artworks: [
      {
        id: 23,
        title: 'School of Athens',
        year: 1509,
        medium: 'Fresco',
        dimensions: '500 × 770 cm',
        image: '/manus-storage/raphael_school_athens.jpg',
      },
      {
        id: 24,
        title: 'The Sistine Madonna',
        year: 1513,
        medium: 'Oil on canvas',
        dimensions: '269.5 × 201 cm',
        image: '/manus-storage/raphael_sistine_madonna.jpg',
      },
      {
        id: 25,
        title: 'Portrait of Baldassare Castiglione',
        year: 1514,
        medium: 'Oil on canvas',
        dimensions: '82 × 67 cm',
        image: '/manus-storage/raphael_castiglione.jpg',
      },
      {
        id: 26,
        title: 'The Transfiguration',
        year: 1520,
        medium: 'Oil on panel',
        dimensions: '405 × 278 cm',
        image: '/manus-storage/raphael_transfiguration.jpg',
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
          <h2>The Master of Harmony</h2>
          <p>
            Raphael stands as the embodiment of Renaissance ideals—a master of perfect proportion, luminous color, and spiritual grace.
            His works represent the pinnacle of classical harmony, where human beauty and divine truth merge in compositions of breathtaking balance.
          </p>
          <p>
            The "School of Athens" and "The Sistine Madonna" are not merely paintings; they are philosophical statements about humanity's place in the cosmos.
            Raphael's ability to synthesize classical learning with Christian spirituality made him the favorite artist of popes and princes.
          </p>
          <p>
            This chapel celebrates an artist who achieved, in his brief lifetime, a perfection of form that has never been surpassed—a testament to the power of beauty as a path to truth.
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
