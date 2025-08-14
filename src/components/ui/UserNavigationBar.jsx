import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from './AuthenticationGuard';

const UserNavigationBar = ({ isAuthenticated = undefined, messageCount = 0, profileCompletion = 85 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const effectiveIsAuthenticated = typeof isAuthenticated === 'boolean' ? isAuthenticated : auth?.isAuthenticated;

  const navigationItems = [
    {
      label: 'My Profile',
      path: '/my-profile-management',
      icon: 'User',
      tooltip: 'Manage your matrimonial profile'
    },
    {
      label: 'Search Partners',
      path: '/profile-search-browse',
      icon: 'Search',
      tooltip: 'Find your perfect match'
    },
    {
      label: 'Messages',
      path: '/messages-communication',
      icon: 'MessageCircle',
      tooltip: 'Connect with potential partners',
      badge: messageCount > 0 ? messageCount : null
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-card">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Heart" size={20} color="white" />
          </div>
          <span className="font-heading font-semibold text-xl text-foreground">
            MatrimonyConnect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 flex-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 hover:bg-muted hover-lift ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-accent rounded-full">
                  {item?.badge > 99 ? '99+' : item?.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Profile Completion Indicator (Desktop) */}
        {profileCompletion < 100 && (
          <div className="hidden md:flex items-center space-x-2 mr-4 px-3 py-1 bg-warning/10 rounded-full">
            <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-caption text-warning-foreground">
              Profile {profileCompletion}% complete
            </span>
          </div>
        )}

        {/* User Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Bell" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={18} />
          </Button>
          <ThemeToggle />
          {effectiveIsAuthenticated ? (
            <>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { auth?.logout?.(); navigate('/login'); }}
                title="Logout"
              >
                <Icon name="LogOut" size={18} />
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden ml-auto"
          onClick={toggleMobileMenu}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card shadow-elevated backdrop-blur-sm">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative flex items-center space-x-3 px-3 py-3 rounded-md text-base font-body font-medium transition-colors duration-200 hover-lift ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={20} />
                <span className="flex-1">{item?.label}</span>
                {item?.badge && (
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-accent rounded-full">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </Link>
            ))}
            
            {/* Profile Completion (Mobile) */}
            {profileCompletion < 100 && (
              <div className="flex items-center space-x-3 px-3 py-3 bg-warning/10 rounded-md mt-2">
                <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
                <span className="text-base font-caption text-warning-foreground">
                  Profile {profileCompletion}% complete
                </span>
              </div>
            )}

            {/* Mobile User Actions */}
            <div className="flex items-center justify-around pt-4 mt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="flex-col space-y-1">
                <Icon name="Bell" size={20} />
                <span className="text-xs font-caption">Notifications</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col space-y-1">
                <Icon name="Settings" size={20} />
                <span className="text-xs font-caption">Settings</span>
              </Button>
              <ThemeToggle />
              {effectiveIsAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-col space-y-1"
                  onClick={() => { auth?.logout?.(); navigate('/login'); setIsMobileMenuOpen(false); }}
                >
                  <Icon name="LogOut" size={20} />
                  <span className="text-xs font-caption">Logout</span>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/login">
                    <Icon name="LogIn" size={20} />
                    <span className="text-xs font-caption">Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default UserNavigationBar;