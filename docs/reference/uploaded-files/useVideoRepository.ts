import { useState, useEffect, useCallback } from 'react';

export interface VideoMetadata {
  id: string;
  title: string;
  video: string;
  duration: number;
  description: string;
}

export interface LeadInVideo extends VideoMetadata {}

export interface ArtistVideoData {
  id: string;
  name: string;
  tagline: string;
  landing: {
    image: string;
    description: string;
  };
  lead_in: LeadInVideo;
  inspirations: VideoMetadata[];
  locations: VideoMetadata[];
}

export type VideoCategory = 'inspirations' | 'locations';

export function useVideoRepository(artistId: string) {
  const [metadata, setMetadata] = useState<ArtistVideoData | null>(null);
  const [currentCategory, setCurrentCategory] = useState<VideoCategory>('inspirations');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLeadInComplete, setIsLeadInComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load metadata on mount
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const response = await fetch('/video-repository/metadata.json');
        const data = await response.json();
        const artistData = data.artists[artistId];
        if (!artistData) {
          throw new Error(`Artist ${artistId} not found in repository`);
        }
        setMetadata(artistData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metadata');
        setLoading(false);
      }
    };

    loadMetadata();
  }, [artistId]);

  // Get current video based on category and index
  const getCurrentVideo = useCallback(() => {
    if (!metadata) return null;
    const videos = currentCategory === 'inspirations' 
      ? metadata.inspirations 
      : metadata.locations;
    return videos[currentVideoIndex % videos.length];
  }, [metadata, currentCategory, currentVideoIndex]);

  // Get next video (random from current category)
  const getNextVideo = useCallback(() => {
    if (!metadata) return null;
    const videos = currentCategory === 'inspirations' 
      ? metadata.inspirations 
      : metadata.locations;
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }, [metadata, currentCategory]);

  // Handle video end - advance to next
  const handleVideoEnd = useCallback(() => {
    setCurrentVideoIndex(prev => prev + 1);
  }, []);

  // Switch category
  const selectCategory = useCallback((category: VideoCategory) => {
    setCurrentCategory(category);
    setCurrentVideoIndex(0);
  }, []);

  // Get landing screen
  const getLandingScreen = useCallback(() => {
    return metadata?.landing.image || null;
  }, [metadata]);

  // Get lead-in video
  const getLeadInVideo = useCallback(() => {
    return metadata?.lead_in?.video || null;
  }, [metadata]);

  // Get lead-in duration
  const getLeadInDuration = useCallback(() => {
    return metadata?.lead_in?.duration || 0;
  }, [metadata]);

  return {
    // Data
    metadata,
    currentCategory,
    currentVideo: getCurrentVideo(),
    nextVideo: getNextVideo(),
    isLeadInComplete,
    loading,
    error,

    // Methods
    selectCategory,
    handleVideoEnd,
    setIsLeadInComplete,
    getLandingScreen,
    getLeadInVideo,
    getLeadInDuration,

    // Utilities
    getVideosByCategory: (category: VideoCategory) => {
      if (!metadata) return [];
      return category === 'inspirations' ? metadata.inspirations : metadata.locations;
    },
  };
}

/**
 * Hook to manage video rotation during room visit
 * Prevents same video from playing twice in a row
 */
export function useVideoRotation(artistId: string) {
  const repo = useVideoRepository(artistId);
  const [playedVideos, setPlayedVideos] = useState<Set<string>>(new Set());

  const getNextUnplayedVideo = useCallback(() => {
    const videos = repo.getVideosByCategory(repo.currentCategory);
    const unplayedVideos = videos.filter(v => !playedVideos.has(v.id));

    if (unplayedVideos.length === 0) {
      // Reset if all videos played
      setPlayedVideos(new Set());
      return videos[Math.floor(Math.random() * videos.length)];
    }

    return unplayedVideos[Math.floor(Math.random() * unplayedVideos.length)];
  }, [repo, Array.from(playedVideos)]);

  const markVideoAsPlayed = useCallback((videoId: string) => {
    setPlayedVideos(prev => new Set(Array.from(prev).concat([videoId])));
  }, []);

  const resetPlayedVideos = useCallback(() => {
    setPlayedVideos(new Set<string>());
  }, []);

  return {
    ...repo,
    getNextUnplayedVideo,
    markVideoAsPlayed,
    resetPlayedVideos,
  };
}
