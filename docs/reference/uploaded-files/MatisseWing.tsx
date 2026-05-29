import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function MatisseWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'matisse',
    name: "Matisse's Côte d'Azur Studio",
    period: 'Modern',
    description: 'A celebration of pure color and joyful form, where cut-outs and vibrant hues create a visual symphony of light and happiness.',
    videoUrl: '/manus-storage/nvai_matisse_5k.mp4',
    accentColor: '#FF6347',
    artworks: [
      {
        id: 47,
        title: 'Jazz - Icarus',
        year: 1947,
        medium: 'Gouache on paper, cut and pasted',
        dimensions: '66 × 51 cm',
        image: '/manus-storage/matisse_icarus.jpg',
      },
      {
        id: 48,
        title: 'The Snail',
        year: 1953,
        medium: 'Gouache on paper, cut and pasted',
        dimensions: '286 × 287 cm',
        image: '/manus-storage/matisse_snail.jpg',
      },
      {
        id: 49,
        title: 'Blue Nudes',
        year: 1952,
        medium: 'Gouache on paper, cut and pasted',
        dimensions: 'various',
        image: '/manus-storage/matisse_blue_nudes.jpg',
      },
      {
        id: 50,
        title: 'Woman with a Hat',
        year: 1905,
        medium: 'Oil on canvas',
        dimensions: '80.6 × 59.7 cm',
        image: '/manus-storage/matisse_woman_hat.jpg',
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
          <h2>The Joy of Color</h2>
          <p>
            Henri Matisse spent his final years in the Mediterranean light of the Côte d'Azur, where he developed his revolutionary cut-out technique.
            Unable to paint due to illness, he created works of astonishing vitality by cutting colored paper and arranging it into compositions of pure joy and visual music.
          </p>
          <p>
            Matisse's late work proves that artistic innovation need not diminish with age. His cut-outs are not compromises but triumphs—reductions of form to its essence,
            where color becomes the primary language. Brilliant blues, vibrant reds, sunny yellows—these hues dance across the canvas in perfect harmony, creating a visual celebration of life itself.
          </p>
          <p>
            This studio represents the ultimate freedom—an artist who stripped away all superfluous detail to reveal the pure essence of beauty, creating works that radiate happiness and light.
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
