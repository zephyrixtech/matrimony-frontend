import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProfileSearchBrowse from './pages/profile-search-browse';
import AdminDashboard from './pages/admin-dashboard';
import MyProfileManagement from './pages/my-profile-management';
import MessagesAndCommunication from './pages/messages-communication';
import ProfileVerificationManagement from './pages/profile-verification-management';
import ProfileDetailView from './pages/profile-detail-view';
import AuthenticationGuard from 'components/ui/AuthenticationGuard';
import Home from 'pages/home';
import UserDashboard from 'pages/user-dashboard';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import AdminLogin from 'pages/auth/admin-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <AuthenticationGuard>
            <UserDashboard />
          </AuthenticationGuard>
        } />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/profile-search-browse" element={<ProfileSearchBrowse />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/my-profile-management" element={<MyProfileManagement />} />
        <Route path="/messages-communication" element={<MessagesAndCommunication />} />
        <Route path="/profile-verification-management" element={<ProfileVerificationManagement />} />
        <Route path="/profile-detail-view" element={<ProfileDetailView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
