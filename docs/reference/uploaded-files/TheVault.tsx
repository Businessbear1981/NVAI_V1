import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/TheVault.css';

export default function TheVault() {
  const [, setLocation] = useLocation();
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);

  const vaultArtworks = [
    {
      id: 1,
      title: 'Blue Period Study',
      artist: 'Pablo Picasso',
      year: 1903,
      medium: 'Oil on canvas',
      dimensions: '73 x 60 cm',
      availability: 'Available for Loan',
      description: 'A haunting portrait from Picasso\'s Blue Period, characterized by melancholic tones and introspective subject matter.',
      estimatedValue: '$2.5M - $3.5M'
    },
    {
      id: 2,
      title: 'Seated Woman',
      artist: 'Amedeo Modigliani',
      year: 1918,
      medium: 'Oil on canvas',
      dimensions: '92 x 60 cm',
      availability: 'Available for Loan',
      description: 'A masterwork from Modigliani\'s mature period, featuring his signature elongated forms and elegant composition.',
      estimatedValue: '$1.8M - $2.8M'
    },
    {
      id: 3,
      title: 'Fiddler on the Roof',
      artist: 'Marc Chagall',
      year: 1912,
      medium: 'Oil on canvas',
      dimensions: '188 x 158 cm',
      availability: 'Available for Loan',
      description: 'An iconic work from Chagall\'s Russian period, blending Cubism with folk imagery and dreamlike symbolism.',
      estimatedValue: '$3.2M - $4.8M'
    },
    {
      id: 4,
      title: 'Water Lilies Study',
      artist: 'Claude Monet',
      year: 1905,
      medium: 'Oil on canvas',
      dimensions: '81 x 100 cm',
      availability: 'Available for Loan',
      description: 'A luminous study from Monet\'s Water Lilies series, capturing the interplay of light and reflection.',
      estimatedValue: '$2.1M - $3.2M'
    }
  ];

  const handleInquire = (artworkId: number) => {
    console.log(`Inquiry for artwork ${artworkId}`);
    // TODO: Implement loan inquiry form/flow
  };

  const handleBack = () => {
    setLocation('/foyer');
  };

  return (
    <div className="the-vault">
      {/* Video Background */}
      <video
        className="vault-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/manus-storage/nvai_vault_entrance_5k.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="vault-overlay"></div>

      {/* Content */}
      <div className="vault-content">
        {/* Header */}
        <div className="vault-header">
          <h1>The Vault</h1>
          <p>Masterworks Available for Loan</p>
        </div>

        {/* Artworks Grid */}
        <div className="vault-grid">
          {vaultArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`vault-card ${selectedArtwork === artwork.id ? 'active' : ''}`}
              onClick={() => setSelectedArtwork(artwork.id)}
            >
              <div className="vault-card-image">
                <div className="placeholder-image">
                  <span>{artwork.artist}</span>
                </div>
              </div>
              <div className="vault-card-info">
                <h3>{artwork.title}</h3>
                <p className="artist">{artwork.artist}</p>
                <p className="year">{artwork.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        {selectedArtwork && (
          <div className="vault-details">
            {vaultArtworks.map((artwork) => (
              artwork.id === selectedArtwork && (
                <div key={artwork.id} className="details-content">
                  <h2>{artwork.title}</h2>
                  <p className="artist-name">{artwork.artist} ({artwork.year})</p>
                  <div className="details-grid">
                    <div>
                      <label>Medium</label>
                      <p>{artwork.medium}</p>
                    </div>
                    <div>
                      <label>Dimensions</label>
                      <p>{artwork.dimensions}</p>
                    </div>
                    <div>
                      <label>Estimated Value</label>
                      <p>{artwork.estimatedValue}</p>
                    </div>
                    <div>
                      <label>Status</label>
                      <p className="availability">{artwork.availability}</p>
                    </div>
                  </div>
                  <p className="description">{artwork.description}</p>
                  <button
                    className="inquire-btn"
                    onClick={() => handleInquire(artwork.id)}
                  >
                    Inquire for Loan
                  </button>
                </div>
              )
            ))}
          </div>
        )}

        {/* Back Button */}
        <button className="back-btn" onClick={handleBack}>
          ← Back to Foyer
        </button>
      </div>
    </div>
  );
}
