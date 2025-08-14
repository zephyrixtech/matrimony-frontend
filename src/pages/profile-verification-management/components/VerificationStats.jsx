import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Profiles',
      value: stats?.totalProfiles,
      icon: 'Users',
      color: 'text-primary bg-primary/10',
      trend: stats?.totalProfilesTrend
    },
    {
      title: 'Pending Review',
      value: stats?.pendingReview,
      icon: 'Clock',
      color: 'text-warning bg-warning/10',
      trend: stats?.pendingReviewTrend
    },
    {
      title: 'Approved Today',
      value: stats?.approvedToday,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10',
      trend: stats?.approvedTodayTrend
    },
    {
      title: 'Avg. Review Time',
      value: `${stats?.avgReviewTime}h`,
      icon: 'Timer',
      color: 'text-accent bg-accent/10',
      trend: stats?.avgReviewTimeTrend
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(stat?.trend)}`}>
              <Icon name={getTrendIcon(stat?.trend)} size={16} />
              <span>{Math.abs(stat?.trend)}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {typeof stat?.value === 'number' ? stat?.value?.toLocaleString() : stat?.value}
            </h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerificationStats;