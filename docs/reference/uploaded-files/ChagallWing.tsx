import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function ChagallWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'chagall',
    name: "Chagall's Russian Folk Studio",
    period: 'Modern',
    description: 'A dreamlike sanctuary infused with Russian mysticism, where lovers float through village skies and the sacred merges with the everyday.',
    videoUrl: '/manus-storage/nvai_chagall_5k.mp4',
    accentColor: '#4B0082',
    artworks: [
      {
        id: 12,
        title: 'I and the Village',
        year: 1911,
        medium: 'Oil on canvas',
        dimensions: '192.1 × 151.4 cm',
        image: '/manus-storage/chagall_i_and_village.jpg',
      },
      {
        id: 13,
        title: 'The Birthday',
        year: 1915,
        medium: 'Oil on cardboard',
        dimensions: '80.6 × 99.7 cm',
        image: '/manus-storage/chagall_birthday.jpg',
      },
      {
        id: 14,
        title: 'The Fiddler',
        year: 1912,
        medium: 'Oil on canvas',
        dimensions: '188 × 158 cm',
        image: '/manus-storage/chagall_fiddler.jpg',
      },
      {
        id: 15,
        title: 'Over the Town',
        year: 1918,
        medium: 'Oil on canvas',
        dimensions: '141 × 198 cm',
        image: '/manus-storage/chagall_over_town.jpg',
      },
      {
        id: 16,
        title: 'Lovers in the Lilacs',
        year: 1930,
        medium: 'Oil on canvas',
        dimensions: '128 × 95 cm',
        image: '/manus-storage/chagall_lovers_lilacs.jpg',
      },
      {
        id: 17,
        title: 'The Juggler',
        year: 1943,
        medium: 'Oil on canvas',
        dimensions: '116.8 × 88.9 cm',
        image: '/manus-storage/chagall_juggler.jpg',
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
          <h2>The Dreamscape of Vitebsk</h2>
          <p>
            Marc Chagall's art transcends the boundaries between reality and dream, between the sacred and the profane. Born in the Russian village of Vitebsk,
            Chagall infused his paintings with the folklore, spirituality, and emotional warmth of his Belarusian heritage.
          </p>
          <p>
            In this studio, lovers defy gravity, floating through starlit skies above sleeping villages. Fiddlers play on rooftops. The ordinary becomes magical.
            Chagall believed that art should celebrate love, memory, and the mystical connection between humanity and the divine—themes that permeate every canvas in this room.
          </p>
          <p>
            His work represents a bridge between the Russian avant-garde and Western modernism, a unique voice that refused to be categorized or constrained by artistic movements.
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
