import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function MonetWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'monet',
    name: "Monet's Water Lily Garden",
    period: '1890s-1920s',
    description: 'An impressionist paradise where light dances on water, where color and atmosphere transcend form, and nature becomes pure poetry.',
    videoUrl: '/manus-storage/nvai_monet_5k.mp4',
    accentColor: '#4169E1',
    artworks: [
      {
        id: 35,
        title: 'Water Lilies',
        year: 1906,
        medium: 'Oil on canvas',
        dimensions: '88.3 × 93 cm',
        image: '/manus-storage/monet_water_lilies_1.jpg',
      },
      {
        id: 36,
        title: 'Japanese Bridge',
        year: 1899,
        medium: 'Oil on canvas',
        dimensions: '81.3 × 101.6 cm',
        image: '/manus-storage/monet_japanese_bridge.jpg',
      },
      {
        id: 37,
        title: 'Water Lilies - Evening Effect',
        year: 1897,
        medium: 'Oil on canvas',
        dimensions: '73.7 × 92.1 cm',
        image: '/manus-storage/monet_water_lilies_evening.jpg',
      },
      {
        id: 38,
        title: 'The Artist\'s Garden at Giverny',
        year: 1900,
        medium: 'Oil on canvas',
        dimensions: '81 × 92 cm',
        image: '/manus-storage/monet_artists_garden.jpg',
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
          <h2>The Garden at Giverny</h2>
          <p>
            Claude Monet spent the final decades of his life cultivating a garden at Giverny, which became his greatest artistic subject.
            The water lilies, the Japanese bridge, the weeping willows—these elements appeared in hundreds of paintings, each one capturing a different moment, a different light, a different mood.
          </p>
          <p>
            Monet's obsession with light and atmosphere reached its apex in these works. He understood that color is not fixed but constantly changing, dependent on time of day, weather, and the observer's perception.
            His water lily paintings are not mere representations of nature; they are meditations on the nature of perception itself, explorations of how consciousness constructs reality from light and shadow.
          </p>
          <p>
            This garden represents the ultimate achievement of Impressionism—the transformation of a simple landscape into a portal to the infinite, where beauty and mystery are one.
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
