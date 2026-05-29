import { useState } from 'react';
import { useLocation } from 'wouter';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import '../styles/ArtistRooms.css';

export default function FridaWing() {
  const [, navigate] = useLocation();
  const [showCarousel, setShowCarousel] = useState(false);

  const roomData = {
    id: 'frida',
    name: "Frida Kahlo's Blue House",
    period: 'Modern',
    description: 'An intimate sanctuary of visceral beauty, where pain becomes art and identity is explored with unflinching honesty.',
    videoUrl: '/manus-storage/nvai_frida_5k.mp4',
    accentColor: '#DC143C',
    artworks: [
      {
        id: 39,
        title: 'The Two Fridas',
        year: 1943,
        medium: 'Oil on canvas',
        dimensions: '173.5 × 173 cm',
        image: '/manus-storage/frida_two_fridas.jpg',
      },
      {
        id: 40,
        title: 'Self-Portrait with Thorn Necklace and Hummingbird',
        year: 1940,
        medium: 'Oil on canvas',
        dimensions: '61.4 × 47 cm',
        image: '/manus-storage/frida_self_portrait_thorns.jpg',
      },
      {
        id: 41,
        title: 'The Broken Column',
        year: 1944,
        medium: 'Oil on canvas',
        dimensions: '39.4 × 31 cm',
        image: '/manus-storage/frida_broken_column.jpg',
      },
      {
        id: 42,
        title: 'Henry Ford Hospital',
        year: 1932,
        medium: 'Oil on metal',
        dimensions: '30.5 × 38.1 cm',
        image: '/manus-storage/frida_henry_ford_hospital.jpg',
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
          <h2>La Casa Azul</h2>
          <p>
            Frida Kahlo's art emerges from a place of profound physical and emotional pain. After a devastating bus accident at age eighteen, she spent her life battling chronic suffering,
            which she transformed into some of the most powerful and honest self-portraits in art history.
          </p>
          <p>
            Her Blue House in Mexico City became a sanctuary where she could explore her identity, her Mexican heritage, her indigenous roots, and her innermost emotional truths.
            Her paintings refuse to look away from pain, disability, and vulnerability. Instead, they celebrate the resilience of the human spirit, the beauty of imperfection, and the power of self-knowledge.
          </p>
          <p>
            Frida's work represents a revolutionary act—the transformation of personal suffering into universal art, the assertion that one's own story, one's own body, one's own pain, is worthy of the highest artistic expression.
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
