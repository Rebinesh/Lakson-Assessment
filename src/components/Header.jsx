import React, { useState } from 'react';
import { Menu, Bell, ChevronRight, User } from 'lucide-react';
import { MOCK_USER, MOCK_NOTIFICATIONS } from '../data/products';
import NotificationPopover from './NotificationPopover';

export default function Header({ onToggleSidebar, onProfileClick }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Open mobile navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
            <span>Dashboard</span>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="current" aria-current="page">My Products</span>
          </nav>
          <h1 className="page-title">Banking Products</h1>
          <p className="page-description">
            View, track, and manage your everyday banking, credit facilities, and wealth portfolios.
          </p>
        </div>
      </div>

      <div className="header-actions">
        {/* Notification Bell Button */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="header-icon-btn has-badge"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label={`View notifications (${MOCK_NOTIFICATIONS.length} unread)`}
            aria-expanded={isNotifOpen}
            aria-haspopup="dialog"
          >
            <Bell size={19} />
          </button>

          <NotificationPopover 
            isOpen={isNotifOpen} 
            onClose={() => setIsNotifOpen(false)} 
          />
        </div>

        {/* Customer Profile Avatar Button */}
        <button
          type="button"
          className="header-user-btn"
          onClick={onProfileClick}
          aria-label={`User profile for ${MOCK_USER.name}`}
          title={`${MOCK_USER.name} (${MOCK_USER.segment})`}
        >
          <div className="header-user-avatar">
            {MOCK_USER.initials}
          </div>
          <span className="header-user-name">{MOCK_USER.name}</span>
        </button>
      </div>
    </header>
  );
}

