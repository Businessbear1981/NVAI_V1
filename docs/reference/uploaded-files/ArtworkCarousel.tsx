import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Artwork } from "@/types/gallery";
import "./ArtworkCarousel.css";

interface ArtworkCarouselProps {
  artistId: number;
}

export default function ArtworkCarousel({ artistId }: ArtworkCarouselProps) {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Fetch artworks for the artist
  const artworksQuery = trpc.gallery.getArtworksByArtist.useQuery({ artistId });

  const artworks = artworksQuery.data || [];

  useEffect(() => {
    if (artworks.length > 0) {
      setSelectedArtwork(artworks[0]);
    }
  }, [artworks]);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedArtwork(artworks[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % artworks.length;
    setCurrentIndex(newIndex);
    setSelectedArtwork(artworks[newIndex]);
  };

  if (artworksQuery.isLoading) {
    return <div className="carousel-loading">Loading artworks...</div>;
  }

  if (artworksQuery.isError || artworks.length === 0) {
    return <div className="carousel-error">No artworks found for this artist</div>;
  }

  return (
    <div className="artwork-carousel">
      <div className="carousel-container">
        {/* Left Navigation */}
        <button className="carousel-nav prev" onClick={handlePrevious}>
          ←
        </button>

        {/* Carousel Display */}
        <div className="carousel-display">
          {selectedArtwork && (
            <div className="artwork-display">
              <div className="artwork-frame">
                {selectedArtwork.imageUrl ? (
                  <img 
                    src={selectedArtwork.imageUrl} 
                    alt={selectedArtwork.title}
                    className="artwork-image"
                  />
                ) : (
                  <div className="artwork-placeholder">
                    <p>{selectedArtwork.title}</p>
                  </div>
                )}
              </div>

              {/* Artwork Details */}
              <div className="artwork-details">
                <h2 className="artwork-title">{selectedArtwork.title}</h2>
                {selectedArtwork.year && (
                  <p className="artwork-year">{selectedArtwork.year}</p>
                )}
                {selectedArtwork.medium && (
                  <p className="artwork-medium">{selectedArtwork.medium}</p>
                )}
                {selectedArtwork.dimensions && (
                  <p className="artwork-dimensions">{selectedArtwork.dimensions}</p>
                )}
                {selectedArtwork.estimatedValue && (
                  <p className="artwork-value">Estimated Value: {selectedArtwork.estimatedValue}</p>
                )}
                {selectedArtwork.description && (
                  <p className="artwork-description">{selectedArtwork.description}</p>
                )}

                {/* Action Buttons */}
                <div className="artwork-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setLocation(`/piece/${selectedArtwork.id}`)}
                  >
                    View Provenance
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setLocation(`/piece/${selectedArtwork.id}`)}
                  >
                    Sign NDA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Navigation */}
        <button className="carousel-nav next" onClick={handleNext}>
          →
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {artworks.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(index);
              setSelectedArtwork(artworks[index]);
            }}
          ></div>
        ))}
      </div>

      {/* Counter */}
      <div className="carousel-counter">
        {currentIndex + 1} / {artworks.length}
      </div>
    </div>
  );
}
