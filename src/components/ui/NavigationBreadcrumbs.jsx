import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Route configuration for breadcrumb generation
  const routeConfig = {
    '/profile-search-browse': {
      label: 'Search Partners',
      icon: 'Search'
    },
    '/profile-detail-view': {
      label: 'Profile Details',
      icon: 'User',
      parent: '/profile-search-browse'
    },
    '/my-profile-management': {
      label: 'My Profile',
      icon: 'User'
    },
    '/messages-communication': {
      label: 'Messages',
      icon: 'MessageCircle'
    },
    '/admin-dashboard': {
      label: 'Dashboard',
      icon: 'BarChart3'
    },
    '/profile-verification-management': {
      label: 'Profile Management',
      icon: 'UserCheck'
    }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Add home/root breadcrumb
    const isAdminRoute = location?.pathname?.startsWith('/admin');
    breadcrumbs?.push({
      label: isAdminRoute ? 'Admin' : 'Home',
      path: isAdminRoute ? '/admin-dashboard' : '/',
      icon: isAdminRoute ? 'Shield' : 'Home'
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const config = routeConfig?.[currentPath];
      
      if (config) {
        breadcrumbs?.push({
          label: config?.label,
          path: currentPath,
          icon: config?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm font-body mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {crumb?.isLast ? (
              <span className="flex items-center space-x-1.5 text-foreground font-medium">
                {crumb?.icon && <Icon name={crumb?.icon} size={16} />}
                <span>{crumb?.label}</span>
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
              >
                {crumb?.icon && <Icon name={crumb?.icon} size={16} />}
                <span>{crumb?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;