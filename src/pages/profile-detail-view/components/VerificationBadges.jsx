import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationBadges = ({ verifications = [] }) => {
  const badgeConfig = {
    email: {
      icon: 'Mail',
      label: 'Email Verified',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    phone: {
      icon: 'Phone',
      label: 'Phone Verified',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    identity: {
      icon: 'Shield',
      label: 'ID Verified',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    photo: {
      icon: 'Camera',
      label: 'Photo Verified',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    education: {
      icon: 'GraduationCap',
      label: 'Education Verified',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    income: {
      icon: 'DollarSign',
      label: 'Income Verified',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  };

  if (!verifications?.length) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Profile Verification
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {verifications?.map((verification, index) => {
          const config = badgeConfig?.[verification?.type];
          if (!config) return null;

          return (
            <div 
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg ${config?.bgColor}`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-card`}>
                <Icon name={config?.icon} size={16} className={config?.color} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-body font-medium ${config?.color}`}>
                  {config?.label}
                </p>
                {verification?.verifiedDate && (
                  <p className="text-xs text-muted-foreground">
                    Verified on {new Date(verification.verifiedDate)?.toLocaleDateString()}
                  </p>
                )}
              </div>
              <Icon name="CheckCircle" size={16} className={config?.color} />
            </div>
          );
        })}
      </div>
      {/* Trust Score */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-body font-medium text-foreground">
              Trust Score
            </h4>
            <p className="text-xs text-muted-foreground">
              Based on verified information
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={16}
                  className={
                    star <= Math.ceil(verifications?.length)
                      ? "text-warning fill-current" :"text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-body font-medium text-foreground">
              {Math.ceil(verifications?.length)}/5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationBadges;