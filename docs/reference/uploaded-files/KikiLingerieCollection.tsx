import { useState } from 'react';
import { trpc } from '../lib/trpc';

export function KikiLingerieCollection() {
  const { data: collection, isLoading } = trpc.kiki.lingerie.collection.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = collection
    ? Array.from(new Set(collection.map(item => item.category)))
    : [];

  const filteredCollection = selectedCategory && collection
    ? collection.filter(item => item.category === selectedCategory)
    : collection;

  return (
    <div className="kiki-lingerie-collection">
      <div className="collection-container">
        {/* Header */}
        <div className="collection-header">
          <h2 className="collection-title">Kiki's Lingerie Collection</h2>
          <p className="collection-subtitle">Curated vintage and modern pieces celebrating sensuality and artistry</p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && collection && (
          <div className="category-filter">
            <button
              className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All ({collection.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({collection.filter(c => c.category === cat).length})
              </button>
            ))}
          </div>
        )}

        {/* Collection Grid */}
        {isLoading ? (
          <div className="loading">Loading collection...</div>
        ) : filteredCollection && filteredCollection.length > 0 ? (
          <div className="collection-grid">
            {filteredCollection.map(item => (
              <div key={item.id} className="collection-item">
                {item.imageUrl && (
                  <div className="item-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                )}
                <div className="item-content">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-era">{item.era}</p>
                  <p className="item-description">{item.description}</p>
                  {item.inspiration && (
                    <p className="item-inspiration">
                      <strong>Inspiration:</strong> {item.inspiration}
                    </p>
                  )}
                  <div className="item-footer">
                    <span className="item-price">${item.price}</span>
                    {item.isAvailable ? (
                      <span className="item-available">Available</span>
                    ) : (
                      <span className="item-unavailable">Sold Out</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-items">No items in this category</div>
        )}
      </div>

      <style>{`
        .kiki-lingerie-collection {
          width: 100%;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(40, 20, 60, 0.95) 100%);
          border-top: 2px solid #d4af37;
          border-bottom: 2px solid #d4af37;
        }

        .collection-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .collection-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .collection-title {
          font-size: 2rem;
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .collection-subtitle {
          font-size: 1rem;
          color: #e0e0e0;
        }

        .category-filter {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .category-btn {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #d4af37;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .category-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #d4af37 0%, #f0d08a 100%);
          color: #1a0a2e;
          border-color: #d4af37;
        }

        .collection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .collection-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .collection-item:hover {
          border-color: rgba(212, 175, 55, 0.5);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(212, 175, 55, 0.15);
        }

        .item-image {
          width: 100%;
          height: 280px;
          background: rgba(0, 0, 0, 0.3);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .collection-item:hover .item-image img {
          transform: scale(1.05);
        }

        .item-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #d4af37;
          margin: 0 0 0.5rem 0;
        }

        .item-brand {
          font-size: 0.85rem;
          color: #999;
          margin: 0 0 0.5rem 0;
          font-style: italic;
        }

        .item-era {
          font-size: 0.85rem;
          color: #b8860b;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .item-description {
          font-size: 0.9rem;
          color: #e0e0e0;
          line-height: 1.5;
          margin: 0 0 1rem 0;
          flex: 1;
        }

        .item-inspiration {
          font-size: 0.85rem;
          color: #d4af37;
          line-height: 1.4;
          margin: 0 0 1rem 0;
          padding: 0.75rem;
          background: rgba(212, 175, 55, 0.1);
          border-left: 2px solid #d4af37;
          border-radius: 2px;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .item-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #4caf50;
        }

        .item-available {
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .item-unavailable {
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .loading,
        .no-items {
          text-align: center;
          padding: 3rem;
          color: #999;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .collection-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .collection-title {
            font-size: 1.5rem;
          }

          .category-filter {
            gap: 0.5rem;
          }

          .category-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
