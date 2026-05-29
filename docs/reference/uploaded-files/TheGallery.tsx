import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/TheGallery.css';

export default function TheGallery() {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // All 30 featured artworks
  const galleryPieces = [
    {
      id: 1,
      title: 'Blue Period Study',
      artist: 'Pablo Picasso',
      year: 1903,
      medium: 'Oil on canvas',
      dimensions: '73 x 60 cm',
      provenance: 'Private collection, Paris (1920-1960); Christie\'s auction (1960); Current collection',
      framing: 'Gilded wood frame, early 20th century'
    },
    {
      id: 2,
      title: 'Seated Woman',
      artist: 'Amedeo Modigliani',
      year: 1918,
      medium: 'Oil on canvas',
      dimensions: '92 x 60 cm',
      provenance: 'Modigliani estate; Galerie Rosenberg, Paris; European private collection',
      framing: 'Mahogany frame, contemporary restoration'
    },
    {
      id: 3,
      title: 'Fiddler on the Roof',
      artist: 'Marc Chagall',
      year: 1912,
      medium: 'Oil on canvas',
      dimensions: '188 x 158 cm',
      provenance: 'Salon d\'Automne, Paris (1912); Russian museum collection; Western private collection',
      framing: 'Ornate gilded frame, period appropriate'
    },
    {
      id: 4,
      title: 'Water Lilies Study',
      artist: 'Claude Monet',
      year: 1905,
      medium: 'Oil on canvas',
      dimensions: '81 x 100 cm',
      provenance: 'Monet studio, Giverny; Durand-Ruel Gallery; European collectors',
      framing: 'Simple gilded frame, Monet period'
    },
    {
      id: 5,
      title: 'Nocturne in Blue',
      artist: 'Pablo Picasso',
      year: 1901,
      medium: 'Oil on canvas',
      dimensions: '65 x 50 cm',
      provenance: 'Barcelona collection; European auction house; Current holdings',
      framing: 'Walnut frame with gold leaf'
    },
    {
      id: 6,
      title: 'Parisian Reverie',
      artist: 'Marc Chagall',
      year: 1924,
      medium: 'Oil on canvas',
      dimensions: '100 x 81 cm',
      provenance: 'Paris gallery; Swiss private collection; International acquisition',
      framing: 'Gilded wood, contemporary period'
    },
    {
      id: 7,
      title: 'Portrait Study',
      artist: 'Amedeo Modigliani',
      year: 1915,
      medium: 'Oil on canvas',
      dimensions: '55 x 46 cm',
      provenance: 'Parisian studio; European collectors; Current collection',
      framing: 'Oak frame with gold accents'
    },
    {
      id: 8,
      title: 'Garden Reflections',
      artist: 'Claude Monet',
      year: 1908,
      medium: 'Oil on canvas',
      dimensions: '92 x 73 cm',
      provenance: 'Giverny archives; French museum; International loan program',
      framing: 'Gilded frame, museum quality'
    },
    {
      id: 9,
      title: 'Blue Abstraction',
      artist: 'Wassily Kandinsky',
      year: 1920,
      medium: 'Oil on canvas',
      dimensions: '120 x 100 cm',
      provenance: 'Moscow collection; Russian avant-garde archives; Western acquisition',
      framing: 'Minimalist frame, contemporary'
    },
    {
      id: 10,
      title: 'Self Portrait',
      artist: 'Frida Kahlo',
      year: 1926,
      medium: 'Oil on canvas',
      dimensions: '65 x 54 cm',
      provenance: 'Mexico City studio; International collectors; Current holdings',
      framing: 'Carved wooden frame, traditional'
    },
    {
      id: 11,
      title: 'Cubist Composition',
      artist: 'Pablo Picasso',
      year: 1911,
      medium: 'Oil on canvas',
      dimensions: '81 x 65 cm',
      provenance: 'Paris salon; European private collection; Museum acquisition',
      framing: 'Gilded wood frame'
    },
    {
      id: 12,
      title: 'Dreamscape',
      artist: 'Marc Chagall',
      year: 1930,
      medium: 'Oil on canvas',
      dimensions: '110 x 90 cm',
      provenance: 'Parisian studio; Swiss collectors; International exhibition',
      framing: 'Ornate gilded frame'
    },
    {
      id: 13,
      title: 'Reclining Figure',
      artist: 'Amedeo Modigliani',
      year: 1919,
      medium: 'Oil on canvas',
      dimensions: '73 x 100 cm',
      provenance: 'Modigliani estate; Parisian galleries; Current collection',
      framing: 'Mahogany frame with inlay'
    },
    {
      id: 14,
      title: 'Haystacks at Sunset',
      artist: 'Claude Monet',
      year: 1890,
      medium: 'Oil on canvas',
      dimensions: '66 x 100 cm',
      provenance: 'Monet collection; French museum; International loan',
      framing: 'Gilded period frame'
    },
    {
      id: 15,
      title: 'Composition VIII',
      artist: 'Wassily Kandinsky',
      year: 1923,
      medium: 'Oil on canvas',
      dimensions: '140 x 120 cm',
      provenance: 'Bauhaus archives; German collection; Western acquisition',
      framing: 'Modern minimalist frame'
    },
    {
      id: 16,
      title: 'The Two Fridas',
      artist: 'Frida Kahlo',
      year: 1928,
      medium: 'Oil on canvas',
      dimensions: '180 x 150 cm',
      provenance: 'Mexico City; International museums; Current exhibition',
      framing: 'Traditional carved frame'
    },
    {
      id: 17,
      title: 'Guitar Player',
      artist: 'Pablo Picasso',
      year: 1910,
      medium: 'Oil on canvas',
      dimensions: '100 x 73 cm',
      provenance: 'Paris collection; European auction; Current holdings',
      framing: 'Gilded wood frame'
    },
    {
      id: 18,
      title: 'Lovers in the City',
      artist: 'Marc Chagall',
      year: 1925,
      medium: 'Oil on canvas',
      dimensions: '95 x 85 cm',
      provenance: 'Parisian studio; Swiss collection; International exhibition',
      framing: 'Ornate gilded frame'
    },
    {
      id: 19,
      title: 'Woman with Earrings',
      artist: 'Amedeo Modigliani',
      year: 1917,
      medium: 'Oil on canvas',
      dimensions: '60 x 46 cm',
      provenance: 'Modigliani archives; European collectors; Current collection',
      framing: 'Oak frame with gold details'
    },
    {
      id: 20,
      title: 'Water Lilies Twilight',
      artist: 'Claude Monet',
      year: 1897,
      medium: 'Oil on canvas',
      dimensions: '89 x 92 cm',
      provenance: 'Giverny studio; French museum; International loan program',
      framing: 'Gilded frame, museum quality'
    },
    {
      id: 21,
      title: 'Yellow Composition',
      artist: 'Wassily Kandinsky',
      year: 1921,
      medium: 'Oil on canvas',
      dimensions: '130 x 110 cm',
      provenance: 'Moscow archives; Russian collection; Western acquisition',
      framing: 'Minimalist contemporary frame'
    },
    {
      id: 22,
      title: 'Self Portrait with Monkeys',
      artist: 'Frida Kahlo',
      year: 1938,
      medium: 'Oil on canvas',
      dimensions: '40 x 31 cm',
      provenance: 'Mexico City; International collectors; Current exhibition',
      framing: 'Carved traditional frame'
    },
    {
      id: 23,
      title: 'Mandolin Player',
      artist: 'Pablo Picasso',
      year: 1914,
      medium: 'Oil on canvas',
      dimensions: '92 x 73 cm',
      provenance: 'Paris salon; European private collection; Museum acquisition',
      framing: 'Gilded wood frame'
    },
    {
      id: 24,
      title: 'Circus Performance',
      artist: 'Marc Chagall',
      year: 1927,
      medium: 'Oil on canvas',
      dimensions: '115 x 95 cm',
      provenance: 'Parisian studio; Swiss collectors; International exhibition',
      framing: 'Ornate gilded frame'
    },
    {
      id: 25,
      title: 'Seated Woman in Red',
      artist: 'Amedeo Modigliani',
      year: 1920,
      medium: 'Oil on canvas',
      dimensions: '92 x 60 cm',
      provenance: 'Modigliani estate; Parisian galleries; Current collection',
      framing: 'Mahogany frame with inlay'
    },
    {
      id: 26,
      title: 'Japanese Bridge',
      artist: 'Claude Monet',
      year: 1899,
      medium: 'Oil on canvas',
      dimensions: '81 x 101 cm',
      provenance: 'Monet collection; French museum; International loan',
      framing: 'Gilded period frame'
    },
    {
      id: 27,
      title: 'Red Composition',
      artist: 'Wassily Kandinsky',
      year: 1925,
      medium: 'Oil on canvas',
      dimensions: '125 x 105 cm',
      provenance: 'Bauhaus archives; German collection; Western acquisition',
      framing: 'Modern minimalist frame'
    },
    {
      id: 28,
      title: 'The Wounded Deer',
      artist: 'Frida Kahlo',
      year: 1932,
      medium: 'Oil on canvas',
      dimensions: '60 x 49 cm',
      provenance: 'Mexico City; International museums; Current exhibition',
      framing: 'Traditional carved frame'
    },
    {
      id: 29,
      title: 'Still Life with Grapes',
      artist: 'Pablo Picasso',
      year: 1912,
      medium: 'Oil on canvas',
      dimensions: '65 x 54 cm',
      provenance: 'Paris collection; European auction; Current holdings',
      framing: 'Gilded wood frame'
    },
    {
      id: 30,
      title: 'Violinist in the Snow',
      artist: 'Marc Chagall',
      year: 1929,
      medium: 'Oil on canvas',
      dimensions: '100 x 81 cm',
      provenance: 'Parisian studio; Swiss collection; International exhibition',
      framing: 'Ornate gilded frame'
    }
  ];

  const currentPiece = galleryPieces[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryPieces.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryPieces.length) % galleryPieces.length);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleBack = () => {
    setLocation('/foyer');
  };

  return (
    <div className="the-gallery">
      {/* Museum Display Case */}
      <div className="gallery-display">
        {/* Bottom-Lit Artwork Display */}
        <div className="artwork-display">
          <div className="artwork-container">
            <div className="artwork-frame">
              <div className="artwork-image">
                <div className="placeholder-artwork">
                  <span>{currentPiece.artist}</span>
                  <p>{currentPiece.title}</p>
                </div>
              </div>
            </div>
            {/* Bottom Lighting Effect */}
            <div className="bottom-light"></div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="details-panel">
          <h2>{currentPiece.title}</h2>
          <p className="artist">{currentPiece.artist}, {currentPiece.year}</p>

          <div className="details-grid">
            <div className="detail-item">
              <label>Medium</label>
              <p>{currentPiece.medium}</p>
            </div>
            <div className="detail-item">
              <label>Dimensions</label>
              <p>{currentPiece.dimensions}</p>
            </div>
            <div className="detail-item">
              <label>Framing</label>
              <p>{currentPiece.framing}</p>
            </div>
          </div>

          <div className="provenance-section">
            <h3>Provenance</h3>
            <p>{currentPiece.provenance}</p>
          </div>

          <div className="action-buttons">
            <button className="nda-btn">View NDA</button>
            <button className="interest-btn">Express Interest</button>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="carousel-controls">
        <button className="control-btn prev" onClick={handlePrev}>
          ← Previous
        </button>
        <div className="counter">
          {currentIndex + 1} / {galleryPieces.length}
        </div>
        <button className="control-btn next" onClick={handleNext}>
          Next →
        </button>
        <button className="control-btn stop" onClick={handleStop}>
          {isPlaying ? 'Stop' : 'Resume'}
        </button>
      </div>

      {/* Header */}
      <div className="gallery-header">
        <h1>The Gallery</h1>
        <p>30 Masterworks on Display</p>
      </div>

      {/* Back Button */}
      <button className="back-btn" onClick={handleBack}>
        ← Back to Foyer
      </button>
    </div>
  );
}
