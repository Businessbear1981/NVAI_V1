import { Artist } from "../../types/gallery";
import "./ArtistWing.css";

interface ArtistWingProps {
  artist: Artist;
  onSelect: () => void;
}

export default function ArtistWing({ artist, onSelect }: ArtistWingProps) {
  return (
    <div className="artist-wing" onClick={onSelect}>
      <div className="artist-wing-content">
        <h3 className="artist-name">{artist.name}</h3>
        <p className="artist-period">{artist.period}</p>
        <p className="artist-theme">{artist.roomTheme}</p>
        <div className="artist-door-transition">
          {artist.doorTransition && (
            <span className="transition-label">{artist.doorTransition}</span>
          )}
        </div>
      </div>
      <div className="artist-wing-overlay">
        <span className="enter-text">Enter →</span>
      </div>
    </div>
  );
}
