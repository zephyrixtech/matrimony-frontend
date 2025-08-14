import React from 'react';
import Icon from '../../../components/AppIcon';

const FamilyBackgroundCard = ({ profile }) => {
  const familyDetails = [
    {
      icon: 'User',
      label: "Father\'s Occupation",
      value: profile?.fatherOccupation
    },
    {
      icon: 'User',
      label: "Mother\'s Occupation",
      value: profile?.motherOccupation
    },
    {
      icon: 'Users',
      label: 'Family Type',
      value: profile?.familyType
    },
    {
      icon: 'Home',
      label: 'Family Status',
      value: profile?.familyStatus
    },
    {
      icon: 'Users',
      label: 'Siblings',
      value: profile?.siblings
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Family Background
      </h3>
      <div className="space-y-4">
        {familyDetails?.map((item, index) => (
          item?.value && (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={item?.icon} size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-caption text-muted-foreground">
                  {item?.label}
                </p>
                <p className="text-sm font-body font-medium text-foreground">
                  {item?.value}
                </p>
              </div>
            </div>
          )
        ))}

        {/* Family Values */}
        {profile?.familyValues && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-body font-medium text-foreground mb-2">
              Family Values
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile?.familyValues}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyBackgroundCard;