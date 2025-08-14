import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ pendingApprovals, supportTickets, reportedProfiles }) => {
  const actions = [
    {
      id: 'profile_approvals',
      title: 'Profile Approvals',
      description: 'Review pending profile submissions',
      count: pendingApprovals,
      icon: 'UserCheck',
      color: 'bg-primary/10 text-primary',
      action: () => console.log('Navigate to profile approvals')
    },
    {
      id: 'support_tickets',
      title: 'Support Tickets',
      description: 'Handle user support requests',
      count: supportTickets,
      icon: 'MessageSquare',
      color: 'bg-secondary/10 text-secondary',
      action: () => console.log('Navigate to support tickets')
    },
    {
      id: 'reported_profiles',
      title: 'Reported Profiles',
      description: 'Review reported user profiles',
      count: reportedProfiles,
      icon: 'AlertTriangle',
      color: 'bg-warning/10 text-warning',
      action: () => console.log('Navigate to reported profiles')
    },
    {
      id: 'content_moderation',
      title: 'Content Moderation',
      description: 'Review flagged content',
      count: 8,
      icon: 'Shield',
      color: 'bg-error/10 text-error',
      action: () => console.log('Navigate to content moderation')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer group"
            onClick={action?.action}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${action?.color}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              {action?.count > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                  {action?.count}
                </span>
              )}
            </div>
            
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {action?.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {action?.description}
            </p>
            
            <div className="mt-3">
              <Button variant="outline" size="sm" fullWidth>
                <Icon name="ArrowRight" size={16} />
                Take Action
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;