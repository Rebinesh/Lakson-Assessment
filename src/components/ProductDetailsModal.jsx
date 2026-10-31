import React, { useEffect, useRef } from 'react';
import { 
  X, 
  PiggyBank, 
  CreditCard, 
  Landmark, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle, 
  Info,
  Download
} from 'lucide-react';

const ICON_MAP = {
  PiggyBank,
  CreditCard,
  Landmark,
  TrendingUp,
  ShieldCheck,
};

export default function ProductDetailsModal({ product, onClose, onDemonstrationAction }) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  // Focus trap & Escape listener & lock body scroll
  useEffect(() => {
    if (!product) return;

    // Focus close button on mount
    const prevFocused = document.activeElement;
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Tab trap inside modal
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (prevFocused && prevFocused.focus) {
        prevFocused.focus();
      }
    };
  }, [product, onClose]);

  if (!product) return null;

  const IconComponent = ICON_MAP[product.iconName] || PiggyBank;
  const details = product.details || {};

  return (
    <div 
      className="modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div 
        className="modal-dialog" 
        ref={modalRef}
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-area">
            <div className={`modal-product-icon icon-${product.categoryKey === 'credit-cards' ? 'credit' : product.categoryKey}`}>
              <IconComponent size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h2 id="modal-title" className="modal-heading">
                {product.name}
              </h2>
              <p className="modal-subheading">
                Ref / Account: <strong>{product.accountNumber}</strong>
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close product details dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Status & Category metadata */}
          <div className="modal-meta-row">
            <div>
              <span className={`category-badge cat-${product.categoryKey}`} style={{ marginRight: '8px' }}>
                {product.category}
              </span>
              <span className="status-badge status-active">
                <span className="status-dot" aria-hidden="true" />
                {product.status}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {product.tagline}
            </span>
          </div>

          {/* Description */}
          <p id="modal-description" style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>
            {product.description}
          </p>

          {/* Key Metrics */}
          <div className="modal-metrics-card">
            {product.metrics.map((m, idx) => (
              <div key={idx} className="modal-metric-block">
                <span className="modal-metric-label">{m.label}</span>
                <span className="modal-metric-val">{m.value}</span>
                {m.subtext && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                    {m.subtext}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Account Specifications */}
          <div className="modal-info-section">
            <h3 className="modal-section-title">Account Specifications</h3>
            <div className="modal-key-value-list">
              {details.accountHolder && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Primary Account Holder</div>
                  <div className="modal-info-cell-value">{details.accountHolder}</div>
                </div>
              )}
              {details.cardholderName && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Name on Card</div>
                  <div className="modal-info-cell-value">{details.cardholderName}</div>
                </div>
              )}
              {details.branch && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Home Branch</div>
                  <div className="modal-info-cell-value">{details.branch}</div>
                </div>
              )}
              {details.billingCycle && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Billing Cycle</div>
                  <div className="modal-info-cell-value">{details.billingCycle}</div>
                </div>
              )}
              {details.nextPaymentDue && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Next Payment Due</div>
                  <div className="modal-info-cell-value">{details.nextPaymentDue}</div>
                </div>
              )}
              {details.portfolioTier && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Portfolio Strategy</div>
                  <div className="modal-info-cell-value">{details.portfolioTier}</div>
                </div>
              )}
              {details.assetAllocation && (
                <div className="modal-info-cell" style={{ gridColumn: 'span 2' }}>
                  <div className="modal-info-cell-label">Asset Allocation Mix</div>
                  <div className="modal-info-cell-value">{details.assetAllocation}</div>
                </div>
              )}
              {details.depositDate && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Booking Date</div>
                  <div className="modal-info-cell-value">{details.depositDate}</div>
                </div>
              )}
              {details.maturityDate && (
                <div className="modal-info-cell">
                  <div className="modal-info-cell-label">Maturity Date</div>
                  <div className="modal-info-cell-value">{details.maturityDate}</div>
                </div>
              )}
            </div>
          </div>

          {/* Key Product Features */}
          {details.features && details.features.length > 0 && (
            <div className="modal-info-section">
              <h3 className="modal-section-title">Key Product Benefits</h3>
              <ul className="features-list">
                {details.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle size={16} className="feature-check-icon" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Illustrative Disclaimer Notice */}
          <div className="modal-disclaimer-box" role="note">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '3px' }}>
              <Info size={14} aria-hidden="true" />
              <span>Demonstration Notice</span>
            </div>
            <p>{details.disclaimer || 'Financial metrics, rates, and limits are fictional illustrative data.'}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-dismiss"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn-modal-action"
            onClick={() => onDemonstrationAction('Statement Export Demo: E-statement export simulated successfully.')}
          >
            <Download size={15} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
            Download Summary
          </button>
        </div>
      </div>
    </div>
  );
}

