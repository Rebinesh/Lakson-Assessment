import React from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  WalletCards, 
  ArrowLeftRight, 
  SendHorizontal, 
  Settings, 
  X 
} from 'lucide-react';
import { MOCK_USER } from '../data/products';

export default function Sidebar({ isOpen, onClose, onNavClick }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, isPrimary: false },
    { id: 'products', label: 'My Products', icon: WalletCards, isPrimary: true },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, isPrimary: false },
    { id: 'payments', label: 'Payments', icon: SendHorizontal, isPrimary: false },
    { id: 'settings', label: 'Settings', icon: Settings, isPrimary: false },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose} 
          aria-hidden="true" 
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Sidebar Navigation">
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <div className="brand-icon" aria-hidden="true">
              <Building2 size={20} strokeWidth={2.2} />
            </div>
            <div className="brand-text">
              <span className="brand-name">NexaBank</span>
              <span className="brand-subtitle">Digital Banking</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          <span className="nav-section-title">Main Menu</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.isPrimary;

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavClick(item.label, isActive)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} className="nav-icon" aria-hidden="true" />
                <span>{item.label}</span>
                {!isActive && <span className="nav-badge-demo">Demo</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar" aria-label={`User avatar for ${MOCK_USER.name}`}>
              {MOCK_USER.initials}
            </div>
            <div className="user-info">
              <div className="user-name" title={MOCK_USER.name}>{MOCK_USER.name}</div>
              <div className="user-tier">{MOCK_USER.segment}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

