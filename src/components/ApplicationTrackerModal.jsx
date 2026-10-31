import React, { useEffect, useRef } from 'react';
import { 
  X, 
  Check, 
  Clock, 
  Landmark, 
  CreditCard,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function ApplicationTrackerModal({ product, onClose, onDemonstrationAction }) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  // Focus management & Escape key listener
  useEffect(() => {
    if (!product) return;

    const prevFocused = document.activeElement;
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

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

  const details = product.details || {};
  const timeline = details.timeline || [];

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
        aria-labelledby="tracker-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-area">
            <div className={`modal-product-icon icon-${product.categoryKey === 'credit-cards' ? 'credit' : product.categoryKey}`}>
              {product.categoryKey === 'loans' ? (
                <Landmark size={22} strokeWidth={2.2} />
              ) : (
                <CreditCard size={22} strokeWidth={2.2} />
              )}
            </div>
            <div>
              <h2 id="tracker-modal-title" className="modal-heading">
                Application Tracker
              </h2>
              <p className="modal-subheading">
                Reference ID: <strong>{details.applicationId || product.accountNumber}</strong>
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close application tracker"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Status Banner */}
          <div className="modal-meta-row">
            <div>
              <span className={`category-badge cat-${product.categoryKey}`} style={{ marginRight: '8px' }}>
                {product.category}
              </span>
              <span className="status-badge status-under-review">
                <span className="status-dot" aria-hidden="true" />
                {product.status}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Submitted: {details.submissionDate || 'Recently'}
            </span>
          </div>

          {/* Key Application Metrics */}
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

          {/* Timeline Section */}
          <div className="modal-info-section">
            <h3 className="modal-section-title">Application Progress Stages</h3>
            <div className="tracker-timeline" role="list">
              {timeline.map((item, index) => {
                const isCompleted = item.status === 'completed';
                const isCurrent = item.status === 'current';
                const isPending = item.status === 'pending';

                return (
                  <div key={item.step || index} className="timeline-step" role="listitem">
                    <div className="timeline-marker-col">
                      <div className={`timeline-dot ${item.status}`}>
                        {isCompleted && <Check size={14} strokeWidth={2.8} />}
                        {isCurrent && <Clock size={14} strokeWidth={2.5} />}
                        {isPending && <span>{item.step}</span>}
                      </div>
                      <div className={`timeline-line ${isCompleted ? 'active' : ''}`} />
                    </div>

                    <div className="timeline-content">
                      <div className="timeline-step-title">{item.title}</div>
                      <div className="timeline-step-desc">{item.description}</div>
                      <div className="timeline-step-date">{item.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="modal-disclaimer-box" role="note">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '3px' }}>
              <AlertCircle size={14} aria-hidden="true" />
              <span>Assessment Demonstration Notice</span>
            </div>
            <p>
              This application tracking record is simulated demonstration data.
              No real credit facility was requested, and no actual bank underwriting or formal credit decision has been performed.
            </p>
          </div>
        </div>

        {/* Footer */}
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
            onClick={() => onDemonstrationAction('Application status refresh simulated. Documents are current.')}
          >
            <FileText size={15} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
            Check Verification Status
          </button>
        </div>
      </div>
    </div>
  );
}

