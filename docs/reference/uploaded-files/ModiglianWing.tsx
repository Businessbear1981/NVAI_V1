import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function ModiglianWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'modigliani',
    name: "Modigliani's Montparnasse Café",
    period: '1920s',
    description: 'A bohemian sanctuary steeped in jazz age decadence, where elongated figures gaze with melancholic beauty in the heart of 1920s Paris.',
    videoUrl: '/manus-storage/nvai_modigliani_5k.mp4',
    accentColor: '#8B0000',
    artworks: [
      {
        id: 18,
        title: 'Jeanne Hébuterne',
        year: 1918,
        medium: 'Oil on canvas',
        dimensions: '55 × 46 cm',
        image: '/manus-storage/modigliani_jeanne.jpg',
      },
      {
        id: 19,
        title: 'Portrait of a Woman',
        year: 1918,
        medium: 'Oil on canvas',
        dimensions: '100 × 65 cm',
        image: '/manus-storage/modigliani_woman.jpg',
      },
      {
        id: 20,
        title: 'Reclining Nude',
        year: 1917,
        medium: 'Oil on canvas',
        dimensions: '60 × 92 cm',
        image: '/manus-storage/modigliani_reclining_nude.jpg',
      },
      {
        id: 21,
        title: 'Seated Woman',
        year: 1918,
        medium: 'Oil on canvas',
        dimensions: '92 × 60 cm',
        image: '/manus-storage/modigliani_seated_woman.jpg',
      },
      {
        id: 22,
        title: 'Portrait of Beatrice Hastings',
        year: 1915,
        medium: 'Oil on canvas',
        dimensions: '55 × 38 cm',
        image: '/manus-storage/modigliani_hastings.jpg',
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
          <h2>The Café of Montparnasse</h2>
          <p>
            Amedeo Modigliani's distinctive style emerged from the vibrant bohemian cafés of 1920s Paris, where artists, writers, and musicians gathered to challenge convention.
            His elongated figures, almond-shaped eyes, and sensual curves became the visual language of an entire era—the Jazz Age, the Lost Generation, the belle époque's final breath.
          </p>
          <p>
            Modigliani's subjects—often his lovers, friends, and muses—gaze out with a melancholic beauty that speaks to the human condition. His portraits transcend mere likeness;
            they capture the inner essence of his subjects, their vulnerability, their beauty, their fleeting mortality.
          </p>
          <p>
            This café represents the intersection of high art and bohemian life, where genius flourished amid poverty and passion, where every canvas was a declaration of artistic freedom.
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
