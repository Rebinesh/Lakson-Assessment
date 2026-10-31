import React, { useEffect, useRef } from 'react';
import { Bell, CheckCheck, Clock } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../data/products';

export default function NotificationPopover({ isOpen, onClose }) {
  const popoverRef = useRef(null);

  // Close on click outside or escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="notifications-popover" 
      ref={popoverRef}
      role="dialog"
      aria-label="Account notifications"
    >
      <div className="notifications-popover-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} className="text-primary" aria-hidden="true" />
          <span className="notifications-title">Notifications</span>
        </div>
        <span className="notifications-count">{MOCK_NOTIFICATIONS.length} New</span>
      </div>

      <ul className="notifications-list" role="list">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <li 
            key={notif.id} 
            className={`notification-item ${!notif.read ? 'unread' : ''}`}
          >
            <div className="notification-item-title">
              <span>{notif.title}</span>
              <span className="notification-time">
                <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                {notif.time}
              </span>
            </div>
            <p className="notification-item-desc">{notif.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

