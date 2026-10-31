import React from 'react';
import { 
  PiggyBank, 
  CreditCard, 
  Landmark, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Clock 
} from 'lucide-react';

// Map icon names from data to Lucide React components
const ICON_MAP = {
  PiggyBank,
  CreditCard,
  Landmark,
  TrendingUp,
  ShieldCheck,
};

export default function ProductCard({ product, onActionClick }) {
  const IconComponent = ICON_MAP[product.iconName] || PiggyBank;
  const isUnderReview = product.status.toLowerCase().includes('review');

  // Category class helper
  const getCategoryThemeClass = (catKey) => {
    switch (catKey) {
      case 'savings': return 'cat-savings icon-savings';
      case 'credit-cards': return 'cat-credit-cards icon-credit';
      case 'loans': return 'cat-loans icon-loans';
      case 'wealth': return 'cat-wealth icon-wealth';
      default: return 'cat-savings icon-savings';
    }
  };

  return (
    <article 
      className="product-card"
      aria-labelledby={`product-heading-${product.id}`}
    >
      {/* Card Header */}
      <div className="product-card-header">
        <div className="card-title-group">
          <div className={`product-card-icon ${getCategoryThemeClass(product.categoryKey)}`} aria-hidden="true">
            <IconComponent size={22} strokeWidth={2} />
          </div>
          <div className="card-heading-texts">
            <h2 id={`product-heading-${product.id}`} className="product-name">
              {product.name}
            </h2>
            <span className="product-account-number" aria-label={`Account or reference number: ${product.accountNumber}`}>
              {product.accountNumber}
            </span>
          </div>
        </div>

        {/* Badges: Category & Status */}
        <div className="card-badges">
          <span className={`category-badge cat-${product.categoryKey}`}>
            {product.category}
          </span>
          <span 
            className={`status-badge ${isUnderReview ? 'status-under-review' : 'status-active'}`}
            title={`Status: ${product.status}`}
          >
            <span className="status-dot" aria-hidden="true" />
            {product.status}
          </span>
        </div>
      </div>

      {/* Product Description */}
      <p className="product-description">{product.description}</p>

      {/* Scannable Metrics Grid */}
      <div className="product-metrics-grid" role="region" aria-label="Key Product Metrics">
        {product.metrics.map((metric, idx) => (
          <div key={idx} className="metric-item">
            <span className="metric-label">{metric.label}</span>
            <span className={`metric-value ${metric.highlight ? 'highlight' : ''}`}>
              {metric.value}
            </span>
            {metric.subtext && (
              <span className="metric-subtext">{metric.subtext}</span>
            )}
          </div>
        ))}
      </div>

      {/* Primary Action Button */}
      <div className="product-card-footer">
        <button
          type="button"
          className={`card-action-btn ${isUnderReview ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => onActionClick(product)}
          aria-label={`${product.primaryActionLabel} for ${product.name}`}
        >
          <span>{product.primaryActionLabel}</span>
          {isUnderReview ? (
            <Clock size={16} aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </article>
  );
}

