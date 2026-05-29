import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function BernardWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'bernard',
    name: "Bernard's Art Nouveau Atelier",
    period: 'Art Nouveau',
    description: 'A sanctuary of decorative elegance where natural forms and organic lines create a harmonious fusion of art and design.',
    videoUrl: '/manus-storage/nvai_bernard_5k.mp4',
    accentColor: '#9370DB',
    artworks: [
      {
        id: 51,
        title: 'Breton Women in a Meadow',
        year: 1888,
        medium: 'Oil on canvas',
        dimensions: '66 × 92 cm',
        image: '/manus-storage/bernard_breton_women.jpg',
      },
      {
        id: 52,
        title: 'Madeleine in the Woods',
        year: 1888,
        medium: 'Oil on canvas',
        dimensions: '137.5 × 162 cm',
        image: '/manus-storage/bernard_madeleine_woods.jpg',
      },
      {
        id: 53,
        title: 'Pont-Aven Landscape',
        year: 1890,
        medium: 'Oil on canvas',
        dimensions: '73 × 92 cm',
        image: '/manus-storage/bernard_pont_aven.jpg',
      },
      {
        id: 54,
        title: 'Decorative Panel',
        year: 1895,
        medium: 'Oil on canvas',
        dimensions: '100 × 80 cm',
        image: '/manus-storage/bernard_decorative_panel.jpg',
      },
    ],
  };

  const handleBackToPatio = () => {
    navigate('/patio-landing');
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
          <h2>The Art Nouveau Vision</h2>
          <p>
            Émile Bernard was a pioneer of the Synthetist movement, which rejected Impressionism's obsession with light and sought instead to capture the essence of form through bold outlines and flat color.
            His work bridges Post-Impressionism and Art Nouveau, celebrating the decorative power of line and the spiritual resonance of natural forms.
          </p>
          <p>
            In this atelier, organic curves and flowing lines dominate. Breton women move through landscapes as if part of the natural world itself. Bernard's palette is rich and harmonious,
            his compositions balanced and contemplative. His art represents a philosophy that beauty is not merely visual but spiritual—that art should elevate the soul and celebrate the sacred in nature.
          </p>
          <p>
            This studio embodies the Art Nouveau ideal: the transformation of everyday objects and natural forms into expressions of transcendent beauty, where decoration and fine art merge into a unified vision.
          </p>
        </div>

        {/* Navigation */}
        <div className="room-navigation">
          <button className="nav-button back-button" onClick={handleBackToPatio}>
            ← Return to The Patio
          </button>
        </div>
      </div>
    </div>
  );
}
