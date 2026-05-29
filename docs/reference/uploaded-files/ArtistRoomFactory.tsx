import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from './ArtworkCarousel';
import '../styles/ArtistRooms.css';

export interface Artwork {
  id: number;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
}

export interface ArtistRoomConfig {
  id: string;
  name: string;
  period: string;
  description: string;
  videoUrl: string;
  accentColor: string;
  narrative: {
    title: string;
    paragraphs: string[];
  };
  artworks: Artwork[];
}

interface ArtistRoomProps {
  config: ArtistRoomConfig;
  backPath?: string;
}

export function createArtistRoom(config: ArtistRoomConfig) {
  return function ArtistRoom({ backPath = '/grand-foyer' }: { backPath?: string }) {
    const [, navigate] = useLocation();
    const [showCarousel, setShowCarousel] = useState(false);

    const handleBackToFoyer = () => {
      navigate(backPath);
    };

    const handleViewPiece = (pieceId: number) => {
      navigate(`/piece/${pieceId}`);
    };

    return (
      <div className="artist-room" style={{ '--room-accent': config.accentColor } as React.CSSProperties}>
        {/* 5K Video Background */}
        <video 
          className="room-video"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src={config.videoUrl} type="video/mp4" />
        </video>

        {/* Room Overlay */}
        <div className="room-overlay"></div>

        {/* Content */}
        <div className="room-content">
          {/* Header */}
          <div className="room-header-section">
            <h1 className="room-title">{config.name}</h1>
            <p className="room-period">{config.period}</p>
            <p className="room-description">{config.description}</p>
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
                  artworks={config.artworks}
                  onSelectPiece={handleViewPiece}
                />
              </div>
            )}
          </div>

          {/* Room Narrative */}
          <div className="room-narrative">
            <h2>{config.narrative.title}</h2>
            {config.narrative.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
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
  };
}
