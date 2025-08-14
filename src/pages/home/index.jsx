import React from 'react';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MobileBottomNav from '../../components/ui/MobileBottomNav';

const Home = () => {
  return (
    <PageContainer>
      <UserNavigationBar />
      <div className="container mx-auto px-4 pb-24 pt-10">
        <NavigationBreadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Find your perfect match on MatrimonyConnect
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover compatible profiles tailored to your preferences. Connect, chat, and build meaningful relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" iconName="Search">
                <a href="/profile-search-browse">Start Searching</a>
              </Button>
              <Button asChild variant="outline" size="lg" iconName="UserPlus">
                <a href="/register">Create Account</a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: 'Shield', title: 'Verified Profiles' },
                { icon: 'Heart', title: 'Smart Matching' },
                { icon: 'Lock', title: 'Privacy Controls' }
              ].map((f, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name={f.icon} size={18} />
                  </div>
                  <div className="text-foreground font-medium">{f.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Profile Preview</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Verified Members</span>
                <span className="text-foreground font-medium">18,923</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Daily Registrations</span>
                <span className="text-foreground font-medium">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Successful Matches</span>
                <span className="text-foreground font-medium">2,847</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button asChild fullWidth iconName="LogIn">
                <a href="/login">Login</a>
              </Button>
              <Button asChild variant="secondary" fullWidth iconName="UserPlus">
                <a href="/register">Register</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav messageCount={3} />
    </PageContainer>
  );
};

export default Home;


