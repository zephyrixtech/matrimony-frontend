import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onQuickAction }) => {
  const quickActions = [
    {
      id: 'pending_priority',
      label: 'Priority Pending',
      description: 'Profiles waiting >24 hours',
      icon: 'AlertTriangle',
      color: 'bg-warning/10 text-warning border-warning/20',
      count: 12
    },
    {
      id: 'incomplete_profiles',
      label: 'Incomplete Profiles',
      description: 'Missing required information',
      icon: 'AlertCircle',
      color: 'bg-accent/10 text-accent border-accent/20',
      count: 8
    },
    {
      id: 'flagged_profiles',
      label: 'Flagged Profiles',
      description: 'Require special attention',
      icon: 'Flag',
      color: 'bg-error/10 text-error border-error/20',
      count: 3
    },
    {
      id: 'duplicate_check',
      label: 'Duplicate Check',
      description: 'Potential duplicate profiles',
      icon: 'Copy',
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      count: 5
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onQuickAction(action?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md text-left ${action?.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={action?.icon} size={20} />
              <span className="text-lg font-bold">{action?.count}</span>
            </div>
            <h3 className="font-medium mb-1">{action?.label}</h3>
            <p className="text-xs opacity-80">{action?.description}</p>
          </button>
        ))}
      </div>
      {/* Additional Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={() => onQuickAction('export_pending')}
        >
          Export Pending
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          onClick={() => onQuickAction('generate_report')}
        >
          Generate Report
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          onClick={() => onQuickAction('verification_settings')}
        >
          Settings
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={() => onQuickAction('refresh_data')}
        >
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;