import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArtworkCarousel from './ArtworkCarousel';

describe('ArtworkCarousel', () => {
  const mockArtworks = [
    {
      id: 1,
      title: 'The Old Guitarist',
      year: 1903,
      medium: 'Oil on panel',
      dimensions: '122.9 × 82.8 cm',
      image: '/test-image-1.jpg',
    },
    {
      id: 2,
      title: 'La Vie',
      year: 1903,
      medium: 'Oil on canvas',
      dimensions: '196.5 × 128.5 cm',
      image: '/test-image-2.jpg',
    },
    {
      id: 3,
      title: 'Woman with a Helmet of Hair',
      year: 1904,
      medium: 'Oil on canvas',
      dimensions: '100 × 81 cm',
      image: '/test-image-3.jpg',
    },
  ];

  it('renders the carousel with the first artwork', () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    expect(screen.getByText('The Old Guitarist')).toBeInTheDocument();
    expect(screen.getByText('1903')).toBeInTheDocument();
  });

  it('displays artwork details correctly', () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    expect(screen.getByText('Oil on panel')).toBeInTheDocument();
    expect(screen.getByText('122.9 × 82.8 cm')).toBeInTheDocument();
  });

  it('navigates to next artwork with next button', async () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    const nextButton = screen.getByLabelText('Next artwork');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('La Vie')).toBeInTheDocument();
    });
  });

  it('navigates to previous artwork with previous button', async () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    const nextButton = screen.getByLabelText('Next artwork');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('La Vie')).toBeInTheDocument();
    });
    
    const prevButton = screen.getByLabelText('Previous artwork');
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText('The Old Guitarist')).toBeInTheDocument();
    });
  });

  it('navigates using dot indicators', async () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    const dots = screen.getAllByRole('button').filter(btn => btn.className.includes('dot'));
    fireEvent.click(dots[2]);
    
    await waitFor(() => {
      expect(screen.getByText('Woman with a Helmet of Hair')).toBeInTheDocument();
    });
  });

  it('displays correct counter', () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('calls onSelectPiece callback when view details button is clicked', async () => {
    const mockCallback = vi.fn();
    render(<ArtworkCarousel artworks={mockArtworks} onSelectPiece={mockCallback} />);
    
    const viewDetailsBtn = screen.getByText('View Full Details →');
    fireEvent.click(viewDetailsBtn);
    
    expect(mockCallback).toHaveBeenCalledWith(1);
  });

  it('handles empty artworks array', () => {
    render(<ArtworkCarousel artworks={[]} />);
    
    expect(screen.getByText('No artworks available')).toBeInTheDocument();
  });

  it('toggles autoplay', async () => {
    vi.useFakeTimers();
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    const autoplayBtn = screen.getByText('⏸ Pause');
    fireEvent.click(autoplayBtn);
    
    expect(screen.getByText('▶ Play')).toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('wraps around when navigating past the last artwork', async () => {
    render(<ArtworkCarousel artworks={mockArtworks} />);
    
    const nextButton = screen.getByLabelText('Next artwork');
    fireEvent.click(nextButton); // 2nd artwork
    fireEvent.click(nextButton); // 3rd artwork
    fireEvent.click(nextButton); // wraps to 1st
    
    await waitFor(() => {
      expect(screen.getByText('The Old Guitarist')).toBeInTheDocument();
    });
  });
});
