import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function PicassoBlueRoom() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'picasso-blue',
    name: "Picasso's Blue Period",
    period: '1901-1904',
    description: 'A melancholic studio space where Picasso explored themes of poverty, loneliness, and human suffering. The cool blue palette dominates this intimate chamber.',
    videoUrl: '/manus-storage/nvai_picasso_blue_5k.mp4',
    accentColor: '#4169E1',
    artworks: [
      {
        id: 1,
        title: 'The Old Guitarist',
        year: 1903,
        medium: 'Oil on panel',
        dimensions: '122.9 × 82.8 cm',
        image: '/manus-storage/picasso_old_guitarist.jpg',
      },
      {
        id: 2,
        title: 'La Vie',
        year: 1903,
        medium: 'Oil on canvas',
        dimensions: '196.5 × 128.5 cm',
        image: '/manus-storage/picasso_la_vie.jpg',
      },
      {
        id: 3,
        title: 'Woman with a Helmet of Hair',
        year: 1904,
        medium: 'Oil on canvas',
        dimensions: '100 × 81 cm',
        image: '/manus-storage/picasso_helmet_hair.jpg',
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
          <h2>The Blue Period</h2>
          <p>
            Between 1901 and 1904, Picasso immersed himself in a palette of cool blues and blue-greens.
            This period, known as the Blue Period, reflected his emotional state following the suicide of
            his friend Carles Casagemas. The works from this era are characterized by their melancholic
            atmosphere and focus on themes of poverty, loneliness, and human suffering.
          </p>
          <p>
            The artist's studio during this time was a modest space in Paris, where he worked with limited
            resources but boundless creativity. Each painting from this period tells a story of human
            vulnerability and emotional depth, establishing Picasso as a master of psychological expression.
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
