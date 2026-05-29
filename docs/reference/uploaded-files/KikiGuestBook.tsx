import { useState } from 'react';
import { trpc } from '../lib/trpc';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function KikiGuestBook() {
  const [visitorName, setVisitorName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const { data: entries, isLoading: entriesLoading } = trpc.kiki.guestBook.list.useQuery();
  const addEntryMutation = trpc.kiki.guestBook.add.useMutation({
    onSuccess: () => {
      setVisitorName('');
      setMessage('');
      setEmail('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !message.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    addEntryMutation.mutate({
      visitorName: visitorName.trim(),
      message: message.trim(),
      email: email.trim() || undefined,
    });
  };

  return (
    <div className="kiki-guest-book">
      <div className="audio-player-container">
        <audio 
          src="/manus-storage/kiki_piaf_ambiance_af144013.wav"
          autoPlay
          loop
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
          style={{ display: 'none' }}
        />
        <button 
          className="audio-toggle"
          onClick={(e) => {
            const audio = (e.currentTarget.parentElement?.querySelector('audio') as HTMLAudioElement);
            if (audio) {
              if (audio.paused) audio.play();
              else audio.pause();
            }
          }}
        >
          {audioPlaying ? '🔊' : '🔇'} Ambiance
        </button>
      </div>

      <div className="guest-book-container">
        {/* Sign-in Form */}
        <div className="guest-book-form-section">
          <h3 className="form-title">Sign Kiki's Guest Book</h3>
          <form onSubmit={handleSubmit} className="guest-book-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name *</label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                disabled={addEntryMutation.isPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email (optional)</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={addEntryMutation.isPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Your Message *</label>
              <Textarea
                id="message"
                placeholder="Share your thoughts about Kiki's story..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={addEntryMutation.isPending}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={addEntryMutation.isPending}
              className="submit-button"
            >
              {addEntryMutation.isPending ? 'Signing...' : 'Sign Guest Book'}
            </Button>

            {submitted && (
              <div className="success-message">
                ✓ Thank you for signing! Your message has been added.
              </div>
            )}
          </form>
        </div>

        {/* Guest Book Entries Display */}
        <div className="guest-book-entries-section">
          <h3 className="entries-title">Visitors' Messages</h3>
          {entriesLoading ? (
            <div className="loading">Loading guest book entries...</div>
          ) : entries && entries.length > 0 ? (
            <div className="entries-list">
              {entries.map((entry) => (
                <div key={entry.id} className="guest-entry">
                  <div className="entry-header">
                    <span className="entry-name">{entry.visitorName}</span>
                    <span className="entry-date">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="entry-message">{entry.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-entries">No entries yet. Be the first to sign!</div>
          )}
        </div>
      </div>

      <style>{`
        .kiki-guest-book {
          width: 100%;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(40, 20, 60, 0.95) 100%);
          border-top: 2px solid #d4af37;
          border-bottom: 2px solid #d4af37;
          position: relative;
        }

        .audio-player-container {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 100;
        }

        .audio-toggle {
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.5);
          color: #d4af37;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .audio-toggle:hover {
          background: rgba(212, 175, 55, 0.4);
          border-color: #d4af37;
        }

        .guest-book-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .guest-book-form-section,
        .guest-book-entries-section {
          display: flex;
          flex-direction: column;
        }

        .form-title,
        .entries-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #d4af37;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .guest-book-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.9rem;
          color: #e0e0e0;
          font-weight: 500;
        }

        .submit-button {
          background: linear-gradient(135deg, #d4af37 0%, #f0d08a 100%);
          color: #1a0a2e;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(212, 175, 55, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          background: rgba(76, 175, 80, 0.2);
          border-left: 3px solid #4caf50;
          color: #4caf50;
          padding: 0.75rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .entries-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 600px;
          overflow-y: auto;
          padding-right: 1rem;
        }

        .guest-entry {
          background: rgba(255, 255, 255, 0.05);
          border-left: 3px solid #d4af37;
          padding: 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .guest-entry:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .entry-name {
          font-weight: 600;
          color: #d4af37;
          font-size: 0.95rem;
        }

        .entry-date {
          font-size: 0.8rem;
          color: #999;
        }

        .entry-message {
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .loading,
        .no-entries {
          color: #999;
          text-align: center;
          padding: 2rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .guest-book-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .entries-list {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
