import { trpc } from '../lib/trpc';
import { Button } from './ui/button';
import { KikiExposeDisplay } from './KikiExposeDisplay';

export function KikiProducts() {
  const { data: products, isLoading } = trpc.kiki.products.list.useQuery();

  const handlePurchase = (productName: string) => {
    alert(`Thank you for your interest in "${productName}"! Purchase integration coming soon.`);
  };

  return (
    <div className="kiki-products">
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <h2 className="products-title">Kiki's Works & Archive</h2>
          <p className="products-subtitle">Explore her legacy through these curated collections</p>
        </div>

        {/* Featured: The Exposé */}
        <div className="featured-expose-section">
          <KikiExposeDisplay 
            onDownload={() => {
              alert('Exposé download coming soon!');
            }}
          />
        </div>

        {/* Other Products */}
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : products && products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                {product.imageUrl && (
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                )}
                <div className="product-content">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-type">{product.type}</p>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <Button
                      onClick={() => handlePurchase(product.name)}
                      disabled={!product.isAvailable}
                      className="product-button"
                    >
                      {product.isAvailable ? 'Get Now' : 'Sold Out'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">No additional products available</div>
        )}
      </div>

      <style>{`
        .kiki-products {
          width: 100%;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(40, 20, 60, 0.95) 100%);
          border-top: 2px solid #d4af37;
          border-bottom: 2px solid #d4af37;
        }

        .products-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .products-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .products-title {
          font-size: 2rem;
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .products-subtitle {
          font-size: 1rem;
          color: #e0e0e0;
        }

        .featured-expose-section {
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid rgba(212, 175, 55, 0.3);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          border-color: rgba(212, 175, 55, 0.5);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(212, 175, 55, 0.15);
        }

        .product-image {
          width: 100%;
          height: 300px;
          background: rgba(0, 0, 0, 0.3);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #d4af37;
          margin: 0 0 0.5rem 0;
        }

        .product-type {
          font-size: 0.85rem;
          color: #999;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .product-description {
          font-size: 0.95rem;
          color: #e0e0e0;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
          flex: 1;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .product-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: #4caf50;
        }

        .product-button {
          background: linear-gradient(135deg, #d4af37 0%, #f0d08a 100%);
          color: #1a0a2e;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .product-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
        }

        .product-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading,
        .no-products {
          text-align: center;
          padding: 3rem;
          color: #999;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .products-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
