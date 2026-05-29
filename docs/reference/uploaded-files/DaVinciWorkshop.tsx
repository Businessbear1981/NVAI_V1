import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function DaVinciWorkshop() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'davinci',
    name: "Da Vinci's Workshop",
    period: 'Renaissance',
    description: 'A sanctuary of scientific inquiry and artistic mastery, where invention, anatomy, and creative genius converge in a space of boundless curiosity.',
    videoUrl: '/manus-storage/nvai_davinci_5k.mp4',
    accentColor: '#8B4513',
    artworks: [
      {
        id: 43,
        title: 'Study of Human Anatomy',
        year: 1490,
        medium: 'Pen and ink on paper',
        dimensions: '27.8 × 19.4 cm',
        image: '/manus-storage/davinci_anatomy.jpg',
      },
      {
        id: 44,
        title: 'Flying Machine Design',
        year: 1485,
        medium: 'Pen and ink on paper',
        dimensions: '23 × 16.5 cm',
        image: '/manus-storage/davinci_flying_machine.jpg',
      },
      {
        id: 45,
        title: 'Study of Water Flow',
        year: 1510,
        medium: 'Pen and ink on paper',
        dimensions: '24.4 × 17.9 cm',
        image: '/manus-storage/davinci_water_flow.jpg',
      },
      {
        id: 46,
        title: 'Mechanical Inventions',
        year: 1480,
        medium: 'Pen and ink on paper',
        dimensions: '25 × 18 cm',
        image: '/manus-storage/davinci_inventions.jpg',
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
          <h2>The Laboratory of Genius</h2>
          <p>
            Leonardo da Vinci's workshop was not merely an art studio—it was a laboratory of human knowledge. Here, art and science were inseparable.
            Every painting was informed by anatomical studies; every invention was conceived with artistic vision. Leonardo believed that to create beauty, one must first understand truth.
          </p>
          <p>
            His notebooks reveal a mind of staggering breadth: designs for flying machines centuries before aviation, studies of water dynamics, anatomical dissections of unprecedented precision,
            architectural plans, military engineering, botanical observations. He saw the universe as an interconnected whole, where patterns repeated across scales—from the spiral of a shell to the branching of rivers.
          </p>
          <p>
            This workshop embodies the Renaissance ideal of the "universal man"—a visionary who refused to be confined by disciplinary boundaries, who saw art and science not as opposites but as complementary paths to understanding the cosmos.
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
