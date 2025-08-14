import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const AdminNavigationSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'BarChart3',
      description: 'Platform analytics and overview'
    },
    {
      label: 'Profile Management',
      path: '/profile-verification-management',
      icon: 'UserCheck',
      description: 'Verify and moderate profiles'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border h-16 flex items-center px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
        >
          <Icon name="Menu" size={20} />
        </Button>
        <div className="flex items-center space-x-2 ml-4">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Shield" size={16} color="white" />
          </div>
          <span className="font-heading font-semibold text-lg text-foreground">
            Admin Panel
          </span>
        </div>
      </div>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-card border-r border-border shadow-elevated transition-all duration-300 ease-smooth
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:top-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Shield" size={16} color="white" />
              </div>
              <span className="font-heading font-semibold text-lg text-foreground">
                Admin Panel
              </span>
            </div>
          )}
          
          {/* Desktop Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hidden lg:flex"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium 
                transition-all duration-200 hover:bg-muted hover-lift group
                ${isActivePath(item?.path) 
                  ? 'text-primary bg-primary/10 border-l-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              onClick={() => setIsMobileOpen(false)}
              title={isCollapsed ? item?.label : item?.description}
            >
              <Icon name={item?.icon} size={20} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">
                    {item?.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">Admin User</div>
                <div className="text-xs text-muted-foreground">System Administrator</div>
              </div>
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm" title="Admin Login">
                <a href="/admin-login">
                  <Icon name="LogIn" size={16} />
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <ThemeToggle />
              <Button variant="ghost" size="sm" title="Admin Profile">
                <Icon name="User" size={20} />
              </Button>
            </div>
          )}
        </div>
      </aside>
      {/* Content Spacer for Desktop */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </>
  );
};

export default AdminNavigationSidebar;