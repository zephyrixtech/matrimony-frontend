import React from 'react';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const QuickStat = ({ icon, label, value, color }) => (
  <div className="bg-card border border-border rounded-lg p-4">
    <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
      <Icon name={icon} size={18} />
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();

  const engagementData = [
    { name: 'Mon', views: 24, messages: 3, interests: 2 },
    { name: 'Tue', views: 30, messages: 5, interests: 1 },
    { name: 'Wed', views: 28, messages: 4, interests: 3 },
    { name: 'Thu', views: 34, messages: 6, interests: 2 },
    { name: 'Fri', views: 40, messages: 7, interests: 4 },
    { name: 'Sat', views: 45, messages: 8, interests: 5 },
    { name: 'Sun', views: 38, messages: 6, interests: 3 },
  ];

  const recentActivity = [
    { id: 1, icon: 'Heart', title: 'Priya accepted your interest', time: '2h ago', color: 'text-success' },
    { id: 2, icon: 'MessageCircle', title: 'New message from Kavya', time: '5h ago', color: 'text-primary' },
    { id: 3, icon: 'Eye', title: 'Rahul viewed your profile', time: '1d ago', color: 'text-secondary' },
    { id: 4, icon: 'CheckCircle', title: 'Your profile was verified', time: '2d ago', color: 'text-success' },
  ];

  const suggestedMatches = [
    {
      id: 101,
      name: 'Priya Sharma',
      age: 26,
      location: 'Delhi',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
      compatibility: 91,
      premium: true,
      verified: true,
      online: true,
    },
    {
      id: 102,
      name: 'Aisha Patel',
      age: 25,
      location: 'Chennai',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
      compatibility: 84,
      premium: false,
      verified: true,
      online: false,
    },
    {
      id: 103,
      name: 'Emily Chen',
      age: 30,
      location: 'Bangalore',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      compatibility: 88,
      premium: true,
      verified: true,
      online: true,
    },
    {
      id: 104,
      name: 'Kavya Reddy',
      age: 27,
      location: 'Pune',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
      compatibility: 79,
      premium: false,
      verified: false,
      online: false,
    },
  ];

  return (
    <PageContainer>
      <UserNavigationBar />
      <div className="container mx-auto px-4 pb-20 pt-6 max-w-7xl">
        <NavigationBreadcrumbs />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Welcome, {user?.name || 'Member'}</h1>
            <p className="text-muted-foreground mt-1">Here’s a quick look at your activity</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button asChild variant="outline" className="flex-1 sm:flex-none" iconName="PenSquare"><a href="/my-profile-management">Edit Profile</a></Button>
            <Button asChild className="flex-1 sm:flex-none" iconName="Search"><a href="/profile-search-browse">Find Matches</a></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <QuickStat icon="Heart" label="Interests" value="12" color="bg-accent/10" />
          <QuickStat icon="MessageCircle" label="Messages" value="5" color="bg-primary/10" />
          <QuickStat icon="Eye" label="Profile Views" value="89" color="bg-secondary/10" />
          <QuickStat icon="Star" label="Compatibility Avg" value="86%" color="bg-success/10" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="xl:col-span-2 space-y-6">
            {/* Engagement Overview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Engagement Overview</h2>
                <div className="text-sm text-muted-foreground">Last 7 days</div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData} margin={{ top: 10, right: 16, bottom: 0, left: -16 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} width={28} />
                    <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                    <Area type="monotone" dataKey="views" stroke="#60A5FA" fill="url(#colorViews)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-foreground">45</div>
                  <div className="text-xs text-muted-foreground">Avg Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-foreground">6</div>
                  <div className="text-xs text-muted-foreground">Avg Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-foreground">3</div>
                  <div className="text-xs text-muted-foreground">Avg Interests</div>
                </div>
              </div>
            </div>

            {/* Suggested Matches */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Suggested Matches</h2>
                <Button asChild variant="ghost" size="sm" iconName="ArrowRight">
                  <a href="/profile-search-browse">View all</a>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedMatches.map((m) => (
                  <div key={m.id} className="border border-border rounded-lg p-4 flex items-center gap-3 hover-lift">
                    <div className="relative">
                      <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
                      {m.online && <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-success border-2 border-card" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="font-medium text-foreground truncate">{m.name}</div>
                        {m.verified && (
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-success">
                            <Icon name="Check" size={10} color="white" />
                          </span>
                        )}
                        {m.premium && (
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent">
                            <Icon name="Crown" size={10} color="white" />
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">Age {m.age} • {m.location}</div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Compatibility</span>
                          <span className="font-medium text-foreground">{m.compatibility}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${m.compatibility}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-col gap-2">
                      <Button size="sm" variant="outline" iconName="Heart">Interest</Button>
                      <Button size="sm" asChild iconName="Eye">
                        <a href={`/profile-detail-view?id=${m.id}`}>View</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Profile Completion</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <Icon name="AlertCircle" size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Your profile is</div>
                  <div className="text-foreground font-semibold">{user?.profileCompletion || 85}% complete</div>
                </div>
              </div>
              <div className="mt-4">
                <Button asChild fullWidth iconName="PenSquare"><a href="/my-profile-management">Complete Now</a></Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${item.color}`}>
                        <Icon name={item.icon} size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-foreground truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="ChevronRight" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </PageContainer>
  );
};

export default UserDashboard;


