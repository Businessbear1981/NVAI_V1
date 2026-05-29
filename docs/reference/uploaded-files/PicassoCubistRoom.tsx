import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function PicassoCubistRoom() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'picasso-cubist',
    name: "Picasso's Cubist Workshop",
    period: '1907-1914',
    description: 'A revolutionary experimental space where Picasso shattered perspective and reassembled reality through geometric abstraction.',
    backdropUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663623353486/kF6DD7P35iYXRL3pMQFYLw/picasso_cubist_backdrop-DtLnNeaHXtQe6fY6sSYDYc.webp',
    accentColor: '#8B4513',
    artworks: [
      {
        id: 4,
        title: 'Les Demoiselles d\'Avignon',
        year: 1907,
        medium: 'Oil on canvas',
        dimensions: '243.9 × 233.7 cm',
        image: '/manus-storage/picasso_demoiselles_avignon.jpg',
      },
      {
        id: 5,
        title: 'Portrait of Daniel-Henry Kahnweiler',
        year: 1910,
        medium: 'Oil on canvas',
        dimensions: '100.6 × 72.6 cm',
        image: '/manus-storage/picasso_kahnweiler.jpg',
      },
      {
        id: 6,
        title: 'Bottle and Glasses',
        year: 1912,
        medium: 'Oil on canvas',
        dimensions: '81 × 65 cm',
        image: '/manus-storage/picasso_bottle_glasses.jpg',
      },
      {
        id: 7,
        title: 'Guitar',
        year: 1914,
        medium: 'Painted metal',
        dimensions: '77.5 × 64.5 cm',
        image: '/manus-storage/picasso_guitar.jpg',
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
      {roomData.backdropUrl && (
        <img
          className="room-backdrop"
          src={roomData.backdropUrl}
          alt={roomData.name}
        />
      )}

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
          <h2>The Cubist Revolution</h2>
          <p>
            Between 1907 and 1914, Picasso embarked on a radical artistic revolution that would forever change the course of modern art.
            Cubism shattered the Renaissance tradition of perspective, breaking down objects into geometric forms and reassembling them from multiple viewpoints simultaneously.
          </p>
          <p>
            This workshop was where Picasso, alongside Georges Braque, developed the language of Cubism. Paintings like "Les Demoiselles d'Avignon" challenged centuries of artistic convention,
            presenting the human figure as fragmented, angular, and abstracted. The works here represent humanity's struggle to perceive and represent reality in an increasingly complex world.
          </p>
          <p>
            The Cubist period established Picasso as the defining artistic voice of the 20th century, proving that art need not imitate nature—it could reimagine it entirely.
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
