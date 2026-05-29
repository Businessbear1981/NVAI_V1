import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/GrandFoyerHub.css';

export default function GrandFoyerHub() {
  // Grand Foyer displays 8 upstairs artist rooms
  const [, navigate] = useLocation();

  const artistRooms = [
    {
      id: 'picasso-blue',
      name: 'Picasso\'s Blue Period',
      period: '1901-1904',
      description: 'Intimate, melancholic studio space',
      color: '#4169E1',
    },
    {
      id: 'picasso-cubist',
      name: 'Picasso\'s Cubist Workshop',
      period: '1907-1914',
      description: 'Revolutionary, experimental aesthetic',
      color: '#8B4513',
    },
    {
      id: 'picasso-later',
      name: 'Picasso\'s Later Atelier',
      period: '1920s+',
      description: 'Mature, expansive creative space',
      color: '#DAA520',
    },
    {
      id: 'modigliani',
      name: 'Modigliani\'s Montparnasse Café',
      period: '1920s',
      description: 'Jazz age bohemian sanctuary',
      color: '#8B0000',
    },
    {
      id: 'raphael',
      name: 'Raphael\'s Renaissance Chapel',
      period: 'Renaissance',
      description: 'Classical harmony and spiritual grace',
      color: '#CD853F',
    },
    {
      id: 'chagall',
      name: 'Chagall\'s Russian Folk Studio',
      period: 'Modern',
      description: 'Dreamlike mysticism and floating lovers',
      color: '#4B0082',
    },
    {
      id: 'kandinsky',
      name: 'Kandinsky\'s Abstract Studio',
      period: 'Modern',
      description: 'Pure abstraction and spiritual color',
      color: '#FF1493',
    },
    {
      id: 'leonardo',
      name: 'Leonardo\'s Professional Workshop',
      period: 'Renaissance',
      description: 'Science, invention, and artistic mastery',
      color: '#FFD700',
    },
  ];

  const handleEnterRoom = (roomId: string) => {
    navigate(`/artist-room/${roomId}`);
  };

  const handleBackToFoyer = () => {
    navigate('/foyer');
  };

  return (
    <div className="grand-foyer-hub">
      {/* 5K Video Background */}
      <video 
        className="foyer-video"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src="/manus-storage/nvai_grand_foyer_5k_a1b2c3d4.mp4" type="video/mp4" />
      </video>

      {/* Foyer Overlay */}
      <div className="foyer-overlay"></div>

      {/* Content */}
      <div className="foyer-content">
        <div className="foyer-header">
          <h1 className="foyer-title">The Grand Foyer</h1>
          <p className="foyer-subtitle">75 Feet of Artistic Mastery</p>
          <p className="foyer-description">
            Welcome to the heart of the Chateau. From here, you may venture into any of the artist wings.
            Each room is a portal into a master's creative universe.
          </p>
        </div>

        {/* Artist Rooms Grid */}
        <div className="artist-rooms-grid">
          {artistRooms.map((room) => (
            <div 
              key={room.id} 
              className="artist-room-card"
              style={{ '--accent-color': room.color } as React.CSSProperties}
            >
              <div className="room-header">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-period">{room.period}</p>
              </div>
              <p className="room-description">{room.description}</p>
              <button 
                className="enter-room-btn"
                onClick={() => handleEnterRoom(room.id)}
              >
                Enter Room →
              </button>
            </div>

          ))}
        </div>

        {/* Navigation */}
        <div className="foyer-navigation">
          <button className="nav-button back-button" onClick={handleBackToFoyer}>
            ← Return to Foyer
          </button>
        </div>
      </div>

      {/* Decorative Chandelier */}
      <div className="chandelier">
        <div className="chandelier-light"></div>
      </div>

    </div>
  );
}
