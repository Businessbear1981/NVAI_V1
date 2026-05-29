import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function KandinskyWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'kandinsky',
    name: "Kandinsky's Abstract Studio",
    period: 'Modern',
    description: 'A laboratory of pure abstraction where color and form transcend representation to speak directly to the soul.',
    videoUrl: '/manus-storage/nvai_kandinsky_5k.mp4',
    accentColor: '#FF1493',
    artworks: [
      {
        id: 27,
        title: 'Composition VIII',
        year: 1923,
        medium: 'Oil on canvas',
        dimensions: '140 × 201 cm',
        image: '/manus-storage/kandinsky_composition_viii.jpg',
      },
      {
        id: 28,
        title: 'Yellow-Red-Blue',
        year: 1925,
        medium: 'Oil on canvas',
        dimensions: '128 × 201.5 cm',
        image: '/manus-storage/kandinsky_yellow_red_blue.jpg',
      },
      {
        id: 29,
        title: 'Several Circles',
        year: 1926,
        medium: 'Oil on canvas',
        dimensions: '140.3 × 140.7 cm',
        image: '/manus-storage/kandinsky_several_circles.jpg',
      },
      {
        id: 30,
        title: 'Black and Violet',
        year: 1923,
        medium: 'Oil on canvas',
        dimensions: '98 × 79 cm',
        image: '/manus-storage/kandinsky_black_violet.jpg',
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
          <h2>The Language of Pure Form</h2>
          <p>
            Wassily Kandinsky revolutionized art by proving that painting need not represent the visible world.
            Instead, color, form, and composition could create a visual symphony—a direct communication between artist and viewer that transcends language and culture.
          </p>
          <p>
            In this studio, abstraction becomes a spiritual practice. Circles, triangles, and lines dance across the canvas in carefully orchestrated compositions.
            Kandinsky believed that colors possessed inherent emotional properties: yellow radiates joy, blue conveys spirituality, red pulses with energy.
            His works are visual music, compositions that speak to the soul rather than the intellect.
          </p>
          <p>
            This room represents a fundamental shift in artistic consciousness—the liberation of art from the tyranny of representation, and its transformation into pure expression.
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
