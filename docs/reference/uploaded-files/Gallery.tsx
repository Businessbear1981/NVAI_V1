import React, { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/Gallery.css';

interface Artist {
  id: number;
  name: string;
  period: string;
  description: string;
  color: string;
  image: string;
}

const artists: Artist[] = [
  { id: 1, name: 'Picasso', period: 'Modern', description: 'Blue Period to Mediterranean', color: '#1e3a8a', image: 'picasso' },
  { id: 2, name: 'Chagall', period: 'Modern', description: 'Russian Folk Aesthetic', color: '#7c2d12', image: 'chagall' },
  { id: 3, name: 'Modigliani', period: '1920s', description: 'Montparnasse Studio', color: '#6b4423', image: 'modigliani' },
  { id: 4, name: 'Leonardo', period: 'Renaissance', description: 'Master of Proportion', color: '#4c5f2f', image: 'leonardo' },
  { id: 5, name: 'Raphael', period: 'Renaissance', description: 'Classical Harmony', color: '#8b5a3c', image: 'raphael' },
  { id: 6, name: 'Matisse', period: 'Modern', description: 'Côte d\'Azur Studio', color: '#dc2626', image: 'matisse' },
  { id: 7, name: 'Kandinsky', period: 'Abstract', description: 'Expressionist Pioneer', color: '#4f46e5', image: 'kandinsky' },
  { id: 8, name: 'Kahlo', period: 'Modern', description: 'La Casa Azul', color: '#9333ea', image: 'kahlo' },
  { id: 9, name: 'Monet', period: 'Impressionist', description: 'Water Lily Garden', color: '#0891b2', image: 'monet' },
  { id: 10, name: 'Bernard', period: 'Art Nouveau', description: 'Decorative Mastery', color: '#a16207', image: 'bernard' },
  { id: 11, name: 'Kiki', period: '1920s', description: 'Moulin Rouge Cabaret', color: '#7f1d1d', image: 'kiki' },
];

export default function Gallery() {
  const [, navigate] = useLocation();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1 className="gallery-title">The Artist Wings</h1>
        <p className="gallery-subtitle">Explore the masterpieces of the world's greatest artists</p>
      </div>

      <div className="artists-grid">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => handleArtistClick(artist)}
            style={{ '--artist-color': artist.color } as React.CSSProperties}
          >
            <div className="artist-card-content">
              <h2 className="artist-name">{artist.name}</h2>
              <p className="artist-period">{artist.period}</p>
              <p className="artist-description">{artist.description}</p>
            </div>
            <div className="artist-card-overlay"></div>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div className="artist-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedArtist(null)}>×</button>
            <h2>{selectedArtist.name}</h2>
            <p>{selectedArtist.description}</p>
            <button className="modal-button">Explore Wing</button>
          </div>
        </div>
      )}
    </div>
  );
}
