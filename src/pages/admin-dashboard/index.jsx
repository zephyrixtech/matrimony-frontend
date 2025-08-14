import React, { useState, useEffect } from 'react';
import AdminNavigationSidebar from '../../components/ui/AdminNavigationSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import DemographicsChart from './components/DemographicsChart';
import GeographicMap from './components/GeographicMap';
import EngagementAnalytics from './components/EngagementAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for dashboard metrics
  const metricsData = [
    {
      title: "Total Users",
      value: "24,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      trend: [45, 52, 48, 61, 58, 67, 73]
    },
    {
      title: "Active Profiles",
      value: "18,923",
      change: "+8.2%",
      changeType: "positive",
      icon: "UserCheck",
      trend: [38, 42, 45, 48, 52, 55, 58]
    },
    {
      title: "Daily Registrations",
      value: "156",
      change: "-3.1%",
      changeType: "negative",
      icon: "UserPlus",
      trend: [12, 15, 18, 14, 16, 13, 11]
    },
    {
      title: "Successful Matches",
      value: "2,847",
      change: "+15.7%",
      changeType: "positive",
      icon: "Heart",
      trend: [25, 28, 32, 35, 38, 42, 45]
    },
    {
      title: "Revenue (Monthly)",
      value: "$47,892",
      change: "+22.3%",
      changeType: "positive",
      icon: "DollarSign",
      trend: [320, 340, 380, 420, 450, 470, 478]
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-18.4%",
      changeType: "positive",
      icon: "MessageSquare",
      trend: [8, 12, 6, 9, 4, 7, 5]
    }
  ];

  // Mock activity feed data
  const activitiesData = [
    {
      id: 1,
      type: "registration",
      title: "New User Registration",
      description: "Sarah Johnson (25, New York) completed profile setup",
      timestamp: new Date(Date.now() - 300000),
      priority: "normal"
    },
    {
      id: 2,
      type: "report",
      title: "Profile Reported",
      description: "User profile ID #4521 reported for inappropriate content",
      timestamp: new Date(Date.now() - 600000),
      priority: "high"
    },
    {
      id: 3,
      type: "match",
      title: "Successful Match",
      description: "Michael Chen and Lisa Wang connected successfully",
      timestamp: new Date(Date.now() - 900000),
      priority: "normal"
    },
    {
      id: 4,
      type: "payment",
      title: "Premium Subscription",
      description: "David Rodriguez upgraded to Premium membership",
      timestamp: new Date(Date.now() - 1200000),
      priority: "normal"
    },
    {
      id: 5,
      type: "profile_submission",
      title: "Profile Verification Pending",
      description: "Emma Thompson submitted documents for verification",
      timestamp: new Date(Date.now() - 1800000),
      priority: "normal"
    }
  ];

  // Mock demographics data
  const demographicsData = [
    { name: "21-25 years", value: 3247, total: 18923 },
    { name: "26-30 years", value: 5891, total: 18923 },
    { name: "31-35 years", value: 4523, total: 18923 },
    { name: "36-40 years", value: 3156, total: 18923 },
    { name: "41+ years", value: 2106, total: 18923 }
  ];

  // Mock geographic data
  const locationData = [
    { id: 1, city: "New York", state: "NY", country: "USA", users: 4523 },
    { id: 2, city: "Los Angeles", state: "CA", country: "USA", users: 3847 },
    { id: 3, city: "Chicago", state: "IL", country: "USA", users: 2956 },
    { id: 4, city: "Houston", state: "TX", country: "USA", users: 2134 },
    { id: 5, city: "Phoenix", state: "AZ", country: "USA", users: 1876 },
    { id: 6, city: "Philadelphia", state: "PA", country: "USA", users: 1654 },
    { id: 7, city: "San Antonio", state: "TX", country: "USA", users: 1432 }
  ];

  // Mock engagement analytics data
  const engagementData = [
    { date: "Jan 1", activeUsers: 1247, newRegistrations: 45, messages: 892, matches: 67, profiles: 1834 },
    { date: "Jan 8", activeUsers: 1356, newRegistrations: 52, messages: 967, matches: 73, profiles: 1923 },
    { date: "Jan 15", activeUsers: 1423, newRegistrations: 48, messages: 1045, matches: 81, profiles: 2156 },
    { date: "Jan 22", activeUsers: 1567, newRegistrations: 61, messages: 1123, matches: 89, profiles: 2234 },
    { date: "Jan 29", activeUsers: 1634, newRegistrations: 58, messages: 1234, matches: 94, profiles: 2387 },
    { date: "Feb 5", activeUsers: 1789, newRegistrations: 67, messages: 1345, matches: 102, profiles: 2456 },
    { date: "Feb 12", activeUsers: 1856, newRegistrations: 73, messages: 1456, matches: 108, profiles: 2567 }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigationSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      <main className="lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <NavigationBreadcrumbs />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Platform overview and management center
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
                
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                trend={metric?.trend}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Activity Feed */}
            <div className="xl:col-span-1">
              <ActivityFeed activities={activitiesData} />
            </div>
            
            {/* Quick Actions */}
            <div className="xl:col-span-2">
              <QuickActions 
                pendingApprovals={47}
                supportTickets={23}
                reportedProfiles={12}
              />
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Demographics Chart */}
            <DemographicsChart 
              data={demographicsData}
              title="User Age Demographics"
            />
            
            {/* Geographic Distribution */}
            <GeographicMap locationData={locationData} />
          </div>

          {/* Engagement Analytics */}
          <div className="mb-8">
            <EngagementAnalytics 
              engagementData={engagementData}
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>

          {/* Footer Stats */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mx-auto mb-3">
                  <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                </div>
                <p className="text-2xl font-bold text-foreground">94.2%</p>
                <p className="text-sm text-muted-foreground">Platform Uptime</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                  <Icon name="Clock" size={24} color="var(--color-primary)" />
                </div>
                <p className="text-2xl font-bold text-foreground">2.4s</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                  <Icon name="Star" size={24} color="var(--color-accent)" />
                </div>
                <p className="text-2xl font-bold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">User Satisfaction</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-3">
                  <Icon name="Shield" size={24} color="var(--color-secondary)" />
                </div>
                <p className="text-2xl font-bold text-foreground">99.8%</p>
                <p className="text-sm text-muted-foreground">Security Score</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;