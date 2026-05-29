import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/GrandFoyerHub.css';

export default function PatioLanding() {
  const [, navigate] = useLocation();
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const outdoorArtists = [
    {
      id: 'monet',
      name: 'Monet\'s Water Lily Garden',
      period: '1890s-1920s',
      description: 'Impressionist paradise of light, water, and reflection',
      color: '#4169E1',
    },
    {
      id: 'frida',
      name: 'Frida Kahlo\'s Blue House',
      period: 'Modern',
      description: 'Intimate, visceral exploration of identity and pain',
      color: '#DC143C',
    },
    {
      id: 'davinci',
      name: 'Da Vinci\'s Workshop',
      period: 'Renaissance',
      description: 'Inventions, anatomical studies, and scientific curiosity',
      color: '#8B4513',
    },
    {
      id: 'matisse',
      name: 'Matisse\'s Côte d\'Azur Studio',
      period: 'Modern',
      description: 'Vibrant cut-outs and the joy of pure color',
      color: '#FF6347',
    },
    {
      id: 'bernard',
      name: 'Bernard\'s Art Nouveau Atelier',
      period: 'Art Nouveau',
      description: 'Decorative elegance and natural forms',
      color: '#9370DB',
    },
  ];

  const handleEnterRoom = (roomId: string) => {
    navigate(`/artist-room/${roomId}`);
  };

  const handleBackToGarden = () => {
    navigate('/secret-garden');
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
        <source src="/manus-storage/nvai_patio_landing_5k.mp4" type="video/mp4" />
      </video>

      {/* Patio Overlay */}
      <div className="foyer-overlay"></div>

      {/* Content */}
      <div className="foyer-content">
        <div className="foyer-header">
          <h1 className="foyer-title">The Patio</h1>
          <p className="foyer-subtitle">Five Outdoor Artist Sanctuaries</p>
          <p className="foyer-description">
            From this vantage point overlooking the vineyards, venture into the gardens to explore each master's creative sanctuary.
            Each path leads to a unique artistic world where nature and vision converge.
          </p>
        </div>

        {/* Artist Rooms Grid */}
        <div className="artist-rooms-grid">
          {outdoorArtists.map((room) => (
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
                Enter Garden →
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="foyer-navigation">
          <button className="nav-button back-button" onClick={handleBackToGarden}>
            ← Return to Secret Garden
          </button>
        </div>

      </div>

      {/* Decorative Element */}
      <div className="chandelier">
        <div className="chandelier-light"></div>
      </div>
    </div>
  );
}
