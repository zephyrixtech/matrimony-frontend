import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNav = ({ messageCount = 0 }) => {
  const location = useLocation();

  const items = [
    { label: 'Home', icon: 'Home', to: '/' },
    { label: 'Search', icon: 'Search', to: '/profile-search-browse' },
    { label: 'Messages', icon: 'MessageCircle', to: '/messages-communication', badge: messageCount > 0 ? messageCount : null },
    { label: 'Profile', icon: 'User', to: '/my-profile-management' },
  ];

  const isActive = (to) => location?.pathname === to || location?.pathname?.startsWith(to);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border shadow-elevated" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`relative flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors ${
                isActive(item.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={20} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;


