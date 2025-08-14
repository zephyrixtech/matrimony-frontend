import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Graceful fallback if provider is missing
    return {
      user: null,
      login: async () => ({ success: false, error: 'AuthProvider not found' }),
      logout: () => {},
      loading: false,
      isAuthenticated: false,
      isAdmin: false,
      isUser: false,
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate login API call
      const adminSecret = import.meta?.env?.VITE_ADMIN_CODE || 'ADMIN-SECRET-CHANGE-ME';
      const isAdminLogin = credentials?.adminCode && credentials?.adminCode === adminSecret;
      const userData = {
        id: '1',
        name: 'John Doe',
        email: credentials?.email,
        role: isAdminLogin ? 'admin' : 'user',
        profileCompletion: 85,
        isVerified: true
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthenticationGuard = ({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  redirectTo = '/login' 
}) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-body">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirements
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check admin requirements
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (location?.pathname === '/login' || location?.pathname === '/register' || location?.pathname === '/admin-login')) {
    const defaultRoute = isAdmin ? '/admin-dashboard' : '/profile-search-browse';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

export default AuthenticationGuard;