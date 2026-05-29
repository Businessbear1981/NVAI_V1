import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function PicassoLaterAtelier() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'picasso-later',
    name: "Picasso's Later Atelier",
    period: '1920s+',
    description: 'A mature, expansive creative space where Picasso synthesized decades of innovation into monumental works of power and passion.',
    videoUrl: '/manus-storage/nvai_picasso_later_5k.mp4',
    accentColor: '#DAA520',
    artworks: [
      {
        id: 8,
        title: 'Three Musicians',
        year: 1921,
        medium: 'Oil on canvas',
        dimensions: '200.7 × 222.9 cm',
        image: '/manus-storage/picasso_three_musicians.jpg',
      },
      {
        id: 9,
        title: 'Weeping Woman',
        year: 1937,
        medium: 'Oil and enamel on canvas',
        dimensions: '60.6 × 49.3 cm',
        image: '/manus-storage/picasso_weeping_woman.jpg',
      },
      {
        id: 10,
        title: 'Guernica',
        year: 1937,
        medium: 'Oil on canvas',
        dimensions: '349 × 776 cm',
        image: '/manus-storage/picasso_guernica.jpg',
      },
      {
        id: 11,
        title: 'The Charnel House',
        year: 1944,
        medium: 'Oil and charcoal on canvas',
        dimensions: '199.8 × 250.1 cm',
        image: '/manus-storage/picasso_charnel_house.jpg',
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
          <h2>The Mature Master</h2>
          <p>
            In his later decades, Picasso achieved a synthesis of all his prior innovations. Having mastered Cubism, Surrealism, and countless other movements,
            he created works of unprecedented power and emotional resonance. His studio became a temple of artistic freedom, where experimentation knew no bounds.
          </p>
          <p>
            Works like "Guernica" transformed painting into a weapon of political protest, while "Weeping Woman" captured the psychological torment of the modern age.
            Picasso proved that an artist need never stop evolving, never settle into a single style, and never abandon the pursuit of truth through form.
          </p>
          <p>
            This atelier represents the culmination of a century-long artistic journey—a space where genius continued to flourish until the very end of his life.
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
