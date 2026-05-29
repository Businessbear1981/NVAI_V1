import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/GardenParty.css';

interface ArtistCard {
  id: string;
  name: string;
  period: string;
  description: string;
  color: string;
}

const gardenArtists: ArtistCard[] = [
  {
    id: 'monet',
    name: 'Claude Monet',
    period: '1840-1926',
    description: 'Master of light and water. Water lilies, haystacks, and the play of light across landscapes.',
    color: '#7ba8d1'
  },
  {
    id: 'bernard',
    name: 'Émile Bernard',
    period: '1868-1941',
    description: 'Post-Impressionist painter of Breton landscapes and outdoor scenes with bold color.',
    color: '#a8d17b'
  },
  {
    id: 'matisse',
    name: 'Henri Matisse',
    period: '1869-1954',
    description: 'Fauvist master of the Côte d\'Azur. Vibrant Mediterranean light and color.',
    color: '#d1a87b'
  },
  {
    id: 'frida',
    name: 'Frida Kahlo',
    period: '1907-1954',
    description: 'La Casa Azul. Self-portraits and Mexican landscapes infused with passion and symbolism.',
    color: '#d17b9a'
  }
];

export default function GardenParty() {
  const [, navigate] = useLocation();
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const handleBackToGarden = () => {
    navigate('/secret-garden');
  };

  const handleArtistSelect = (artistId: string) => {
    setSelectedArtist(artistId);
    // Navigate to patio landing which routes to all outdoor artist rooms
    navigate('/patio-landing');
  };

  return (
    <div className="garden-party-container fade-in">
      {/* 5K Video Background */}
      <video 
        className="party-video"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src="/manus-storage/nvai_garden_party_5k_a1b2c3d4.mp4" type="video/mp4" />
      </video>

      {/* Overlay for text readability */}
      <div className="party-overlay"></div>

      {/* Content Layer */}
      <div className="party-content">
        <div className="party-header">
          <h1 className="party-title">The Garden Party</h1>
          <p className="party-subtitle">Outdoor Artist Sanctuaries</p>
          <p className="party-description">
            Beyond the patio, discover the gardens where master artists found their greatest inspiration.
            Each sanctuary is a portal into a unique creative vision.
          </p>
        </div>

        {/* Artist Cards Grid */}
        <div className="artists-grid">
          {gardenArtists.map((artist) => (
            <div 
              key={artist.id}
              className={`artist-card ${selectedArtist === artist.id ? 'selected' : ''}`}
              onClick={() => handleArtistSelect(artist.id)}
              style={{ borderTopColor: artist.color }}
            >
              <div className="artist-header">
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-period">{artist.period}</p>
              </div>
              <p className="artist-description">{artist.description}</p>
              <button className="artist-explore-btn">
                Enter Studio →
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="party-navigation">
          <button className="nav-button back-button" onClick={handleBackToGarden}>
            ← Return to Secret Garden
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="party-decorations">
        <div className="floating-petal petal-1"></div>
        <div className="floating-petal petal-2"></div>
        <div className="floating-petal petal-3"></div>
      </div>

    </div>
  );
}
