import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface KikiRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export function KikiRoomModal({ isOpen, onClose, videoUrl }: KikiRoomModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="kiki-room-modal-overlay" onClick={onClose}>
      <div className="kiki-room-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          {/* Title */}
          <div className="modal-header">
            <h2 className="modal-title">Enter Kiki's Backstage</h2>
            <p className="modal-subtitle">A glimpse into the life of Paris's most captivating performer</p>
          </div>

          {/* Video Preview */}
          {videoUrl ? (
            <div className="video-container">
              <video
                src={videoUrl}
                controls
                autoPlay={isPlaying}
                className="modal-video"
              />
              <div className="video-overlay">
                {!isPlaying && (
                  <button 
                    className="play-button"
                    onClick={() => setIsPlaying(true)}
                  >
                    ▶
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="video-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-icon">🎬</span>
                <p>Burlesque Performance Video</p>
                <p className="placeholder-text">30-second cinematic performance</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="modal-description">
            <p>
              Kiki de Montparnasse captivated Paris in the 1920s with her revolutionary performances at the Moulin Rouge and La Rotonde. 
              Her story transcends cabaret—it's a tale of artistic courage, bohemian rebellion, and the power of self-expression.
            </p>
            <p>
              Explore her guest book, support her film project, discover her curated lingerie collection, and immerse yourself in the 
              archives of one of history's most unforgettable artists.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <Button 
              onClick={onClose}
              className="enter-button"
            >
              Enter Backstage
            </Button>
            <button 
              onClick={onClose}
              className="close-button"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .kiki-room-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .kiki-room-modal {
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.98) 0%, rgba(40, 20, 60, 0.98) 100%);
          border: 2px solid #ff1493;
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(255, 20, 147, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 20, 147, 0.2);
          border: 1px solid rgba(255, 20, 147, 0.5);
          color: #ff1493;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(255, 20, 147, 0.4);
          transform: scale(1.1);
        }

        .modal-content {
          padding: 2rem;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ff1493;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .modal-subtitle {
          font-size: 1rem;
          color: #e0e0e0;
          margin: 0;
        }

        .video-container {
          position: relative;
          width: 100%;
          margin-bottom: 2rem;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.5);
        }

        .modal-video {
          width: 100%;
          height: auto;
          display: block;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-container:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          width: 60px;
          height: 60px;
          background: rgba(255, 20, 147, 0.8);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .play-button:hover {
          background: rgba(255, 20, 147, 1);
          transform: scale(1.1);
        }

        .video-placeholder {
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(255, 20, 147, 0.05) 100%);
          border: 2px dashed rgba(255, 20, 147, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .placeholder-content {
          text-align: center;
        }

        .placeholder-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .placeholder-content p {
          color: #ff1493;
          margin: 0.5rem 0;
          font-weight: 600;
        }

        .placeholder-text {
          color: #999 !important;
          font-size: 0.9rem !important;
          font-weight: normal !important;
        }

        .modal-description {
          margin-bottom: 2rem;
        }

        .modal-description p {
          color: #e0e0e0;
          line-height: 1.7;
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
        }

        .modal-description p:last-child {
          margin-bottom: 0;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          flex-direction: column;
        }

        .enter-button {
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
          color: white;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1rem;
        }

        .enter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255, 20, 147, 0.3);
        }

        .close-button {
          background: transparent;
          color: #999;
          border: 1px solid rgba(255, 20, 147, 0.3);
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .close-button:hover {
          color: #ff1493;
          border-color: rgba(255, 20, 147, 0.6);
        }

        @media (max-width: 768px) {
          .kiki-room-modal {
            max-width: 95%;
            max-height: 95vh;
          }

          .modal-content {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.3rem;
          }

          .modal-description p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
