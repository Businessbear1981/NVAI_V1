import { useState } from 'react';
import { trpc } from '../lib/trpc';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const FILM_GOAL = 50000; // $50,000 goal

export function KikiFilmCrowdfunding() {
  const [supporterName, setSupporterName] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [pledgeMessage, setPledgeMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data: stats } = trpc.kiki.filmCampaign.stats.useQuery();
  const { data: pledges, isLoading: pledgesLoading } = trpc.kiki.filmCampaign.pledges.useQuery();
  const pledgeMutation = trpc.kiki.filmCampaign.pledge.useMutation({
    onSuccess: () => {
      setSupporterName('');
      setPledgeAmount('');
      setPledgeMessage('');
      setEmail('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(pledgeAmount);
    if (!supporterName.trim() || !amount || amount < 1) {
      alert('Please fill in all required fields');
      return;
    }
    pledgeMutation.mutate({
      supporterName: supporterName.trim(),
      pledgeAmount: amount,
      pledgeMessage: pledgeMessage.trim() || undefined,
      email: email.trim() || undefined,
    });
  };

  const totalAmount = stats?.totalAmount || 0;
  const pledgeCount = stats?.pledgeCount || 0;
  const progressPercent = Math.min((totalAmount / FILM_GOAL) * 100, 100);

  return (
    <div className="kiki-film-crowdfunding">
      <div className="film-container">
        {/* Campaign Header */}
        <div className="campaign-header">
          <h2 className="campaign-title">Support Kiki's Film</h2>
          <p className="campaign-subtitle">Help bring her revolutionary story to the screen</p>
        </div>

        {/* Progress Tracker */}
        <div className="progress-section">
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-label">Pledged</span>
              <span className="stat-value">${totalAmount.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Goal</span>
              <span className="stat-value">${FILM_GOAL.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Supporters</span>
              <span className="stat-value">{pledgeCount}</span>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="progress-percent">{Math.round(progressPercent)}%</span>
          </div>
        </div>

        {/* Pledge Form */}
        <div className="pledge-form-section">
          <h3 className="form-title">Make a Pledge</h3>
          <form onSubmit={handleSubmit} className="pledge-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name *</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  disabled={pledgeMutation.isPending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="form-label">Pledge Amount ($) *</label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50"
                  min="1"
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                  disabled={pledgeMutation.isPending}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email (optional)</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pledgeMutation.isPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message (optional)</label>
              <Textarea
                id="message"
                placeholder="Why do you support Kiki's film?"
                value={pledgeMessage}
                onChange={(e) => setPledgeMessage(e.target.value)}
                disabled={pledgeMutation.isPending}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={pledgeMutation.isPending}
              className="pledge-button"
            >
              {pledgeMutation.isPending ? 'Processing...' : 'Pledge Now'}
            </Button>

            {submitted && (
              <div className="success-message">
                ✓ Thank you for your support! Your pledge has been recorded.
              </div>
            )}
          </form>
        </div>

        {/* Recent Pledges */}
        <div className="pledges-section">
          <h3 className="pledges-title">Recent Supporters</h3>
          {pledgesLoading ? (
            <div className="loading">Loading pledges...</div>
          ) : pledges && pledges.length > 0 ? (
            <div className="pledges-list">
              {pledges.slice(0, 10).map((pledge) => (
                <div key={pledge.id} className="pledge-entry">
                  <div className="pledge-header">
                    <span className="pledge-name">{pledge.supporterName}</span>
                    <span className="pledge-amount">${pledge.pledgeAmount}</span>
                  </div>
                  {pledge.pledgeMessage && (
                    <p className="pledge-message">{pledge.pledgeMessage}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-pledges">Be the first to pledge!</div>
          )}
        </div>
      </div>

      <style>{`
        .kiki-film-crowdfunding {
          width: 100%;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(40, 20, 60, 0.95) 100%);
          border-top: 2px solid #ff1493;
          border-bottom: 2px solid #ff1493;
        }

        .film-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .campaign-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .campaign-title {
          font-size: 2rem;
          font-weight: 700;
          color: #ff1493;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .campaign-subtitle {
          font-size: 1.1rem;
          color: #e0e0e0;
        }

        .progress-section {
          background: rgba(255, 20, 147, 0.1);
          border: 1px solid rgba(255, 20, 147, 0.3);
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .progress-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          display: block;
          font-size: 0.85rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ff1493;
        }

        .progress-bar-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .progress-bar {
          flex: 1;
          height: 12px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff1493 0%, #ff69b4 100%);
          transition: width 0.5s ease;
        }

        .progress-percent {
          font-weight: 700;
          color: #ff1493;
          min-width: 50px;
          text-align: right;
        }

        .pledge-form-section {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 20, 147, 0.2);
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #ff1493;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pledge-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

        .pledge-button {
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pledge-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255, 20, 147, 0.3);
        }

        .pledge-button:disabled {
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

        .pledges-section {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 20, 147, 0.2);
          padding: 2rem;
          border-radius: 8px;
        }

        .pledges-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #ff1493;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pledges-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 400px;
          overflow-y: auto;
        }

        .pledge-entry {
          background: rgba(0, 0, 0, 0.3);
          border-left: 3px solid #ff1493;
          padding: 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .pledge-entry:hover {
          background: rgba(0, 0, 0, 0.4);
          transform: translateX(4px);
        }

        .pledge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .pledge-name {
          font-weight: 600;
          color: #ff1493;
        }

        .pledge-amount {
          font-weight: 700;
          color: #4caf50;
          font-size: 1.1rem;
        }

        .pledge-message {
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
          font-style: italic;
        }

        .loading,
        .no-pledges {
          color: #999;
          text-align: center;
          padding: 2rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .progress-stats {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .campaign-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
