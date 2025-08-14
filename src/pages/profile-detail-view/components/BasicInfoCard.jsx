import React from 'react';
import Icon from '../../../components/AppIcon';

const BasicInfoCard = ({ profile }) => {
  const basicInfo = [
    {
      icon: 'Calendar',
      label: 'Age',
      value: `${profile?.age} years`
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: `${profile?.city}, ${profile?.state}`
    },
    {
      icon: 'Ruler',
      label: 'Height',
      value: profile?.height
    },
    {
      icon: 'Heart',
      label: 'Marital Status',
      value: profile?.maritalStatus
    },
    {
      icon: 'Users',
      label: 'Religion',
      value: profile?.religion
    },
    {
      icon: 'Globe',
      label: 'Mother Tongue',
      value: profile?.motherTongue
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Basic Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {basicInfo?.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name={item?.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-caption text-muted-foreground">
                {item?.label}
              </p>
              <p className="text-sm font-body font-medium text-foreground truncate">
                {item?.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInfoCard;