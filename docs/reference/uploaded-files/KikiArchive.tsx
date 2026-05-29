import { useState } from 'react';
import { trpc } from '../lib/trpc';

export function KikiArchive() {
  const { data: archive, isLoading } = trpc.kiki.archive.list.useQuery();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = archive
    ? Array.from(new Set(archive.map(item => item.type)))
    : [];

  const filteredArchive = selectedType && archive
    ? archive.filter(item => item.type === selectedType)
    : archive;

  return (
    <div className="kiki-archive">
      <div className="archive-container">
        {/* Header */}
        <div className="archive-header">
          <h2 className="archive-title">Kiki's Archive</h2>
          <p className="archive-subtitle">Historical documents, photographs, and memories from her extraordinary life</p>
        </div>

        {/* Type Filter */}
        {types.length > 0 && archive && (
          <div className="type-filter">
            <button
              className={`type-btn ${selectedType === null ? 'active' : ''}`}
              onClick={() => setSelectedType(null)}
            >
              All ({archive.length})
            </button>
            {types.map(type => (
              <button
                key={type}
                className={`type-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type} ({archive.filter(a => a.type === type).length})
              </button>
            ))}
          </div>
        )}

        {/* Archive Grid */}
        {isLoading ? (
          <div className="loading">Loading archive...</div>
        ) : filteredArchive && filteredArchive.length > 0 ? (
          <div className="archive-grid">
            {filteredArchive.map(item => (
              <div key={item.id} className="archive-item">
                {item.contentUrl && (
                  <div className="item-preview">
                    <img src={item.contentUrl} alt={item.title} />
                  </div>
                )}
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  {item.year && (
                    <p className="item-year">{item.year}</p>
                  )}
                  {item.source && (
                    <p className="item-source">Source: {item.source}</p>
                  )}
                  {item.description && (
                    <p className="item-description">{item.description}</p>
                  )}
                  <span className="item-type">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-items">No archive items in this category</div>
        )}
      </div>

      <style>{`
        .kiki-archive {
          width: 100%;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(40, 20, 60, 0.95) 100%);
          border-top: 2px solid #8b7355;
          border-bottom: 2px solid #8b7355;
        }

        .archive-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .archive-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .archive-title {
          font-size: 2rem;
          font-weight: 700;
          color: #8b7355;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .archive-subtitle {
          font-size: 1rem;
          color: #e0e0e0;
        }

        .type-filter {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .type-btn {
          background: rgba(139, 115, 85, 0.1);
          border: 1px solid rgba(139, 115, 85, 0.3);
          color: #8b7355;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .type-btn:hover {
          background: rgba(139, 115, 85, 0.2);
          border-color: rgba(139, 115, 85, 0.5);
        }

        .type-btn.active {
          background: linear-gradient(135deg, #8b7355 0%, #a0826d 100%);
          color: #f5f5f5;
          border-color: #8b7355;
        }

        .archive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .archive-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(139, 115, 85, 0.2);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .archive-item:hover {
          border-color: rgba(139, 115, 85, 0.5);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(139, 115, 85, 0.15);
        }

        .item-preview {
          width: 100%;
          height: 250px;
          background: rgba(0, 0, 0, 0.3);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .archive-item:hover .item-preview img {
          transform: scale(1.05);
        }

        .item-details {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #8b7355;
          margin: 0 0 0.5rem 0;
        }

        .item-year {
          font-size: 0.9rem;
          color: #d4af37;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .item-source {
          font-size: 0.85rem;
          color: #999;
          margin: 0 0 0.75rem 0;
          font-style: italic;
        }

        .item-description {
          font-size: 0.9rem;
          color: #e0e0e0;
          line-height: 1.5;
          margin: 0 0 1rem 0;
          flex: 1;
        }

        .item-type {
          display: inline-block;
          background: rgba(139, 115, 85, 0.2);
          color: #8b7355;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .loading,
        .no-items {
          text-align: center;
          padding: 3rem;
          color: #999;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .archive-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .archive-title {
            font-size: 1.5rem;
          }

          .type-filter {
            gap: 0.5rem;
          }

          .type-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
