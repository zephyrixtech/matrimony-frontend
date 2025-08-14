import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevated hover-lift transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={24} color="var(--color-primary)" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span>{change}</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        )}
        
        {trend && (
          <div className="mt-4 h-16 flex items-end space-x-1">
            {trend?.map((value, index) => (
              <div
                key={index}
                className="bg-primary/20 rounded-sm flex-1"
                style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;