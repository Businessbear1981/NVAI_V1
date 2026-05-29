import React, { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/NVAILanding.css';

export default function NVAILanding() {
  const [, navigate] = useLocation();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const areas = [
    {
      id: 'garden-party',
      name: 'Garden Party',
      description: 'Explore outdoor landscapes with Monet, Bernard, Matisse, and Frida Kahlo',
      artists: ['Monet', 'Bernard', 'Matisse', 'Frida Kahlo'],
      icon: '🌿',
      position: 'top-left',
    },
    {
      id: 'grand-foyer',
      name: 'Grand Foyer',
      description: 'Enter the chateau and discover masters across centuries',
      artists: ['Modigliani', 'Raphael', 'Chagall', 'Kandinsky', 'Leonardo', 'Picasso'],
      icon: '🏛️',
      position: 'center',
    },
    {
      id: 'kiki-moulin-rouge',
      name: 'Kiki\'s Moulin Rouge',
      description: 'Step into the cabaret world of 1920s Paris',
      artists: ['Kiki de Montparnasse'],
      icon: '🎭',
      position: 'bottom-right',
    },
  ];

  return (
    <div className="nvai-landing-container">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        className="nvai-background-video"
        src="/manus-storage/nvai_courtyard_5k_62a7044b.mp4"
      />

      {/* Overlay */}
      <div className="nvai-overlay" />

      {/* Main content */}
      <div className="nvai-content">
        <div className="nvai-header">
          <h1 className="nvai-title">Napa Valley Art Institute</h1>
          <p className="nvai-subtitle">Welcome to the grounds of the world's most extraordinary art collection</p>
          <p className="nvai-description">
            Walk among the masters. Explore period-specific galleries, intimate studios, and immersive artistic universes.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="nvai-areas-grid">
          {areas.map((area) => (
            <div
              key={area.id}
              className={`nvai-area-card ${hoveredArea === area.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              onClick={() => navigate(`/area/${area.id}`)}
            >
              <div className="area-icon">{area.icon}</div>
              <h2 className="area-name">{area.name}</h2>
              <p className="area-description">{area.description}</p>
              <div className="area-artists">
                {area.artists.map((artist) => (
                  <span key={artist} className="artist-tag">
                    {artist}
                  </span>
                ))}
              </div>
              <button className="area-button">Explore →</button>
            </div>
          ))}
        </div>

        {/* Estate Map */}
        <div className="nvai-map-section">
          <h2>Navigate the Estate</h2>
          <div className="nvai-map">
            <div className="map-area garden-area" onClick={() => navigate('/area/garden-party')}>
              <span>🌿 Garden Party</span>
            </div>
            <div className="map-area foyer-area" onClick={() => navigate('/area/grand-foyer')}>
              <span>🏛️ Grand Foyer</span>
            </div>
            <div className="map-area moulin-area" onClick={() => navigate('/area/kiki-moulin-rouge')}>
              <span>🎭 Moulin Rouge</span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="nvai-cta">
          <button
            className="cta-button primary"
            onClick={() => navigate('/area/garden-party')}
          >
            Begin at the Garden Party
          </button>
          <button
            className="cta-button secondary"
            onClick={() => navigate('/area/grand-foyer')}
          >
            Enter the Chateau
          </button>
        </div>
      </div>
    </div>
  );
}
