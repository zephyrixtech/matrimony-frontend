import React from 'react';
import Icon from '../../../components/AppIcon';

const PartnerPreferencesCard = ({ profile }) => {
  const preferences = [
    {
      icon: 'Calendar',
      label: 'Age Range',
      value: profile?.preferredAgeRange
    },
    {
      icon: 'Ruler',
      label: 'Height Range',
      value: profile?.preferredHeightRange
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: profile?.preferredLocation
    },
    {
      icon: 'GraduationCap',
      label: 'Education',
      value: profile?.preferredEducation
    },
    {
      icon: 'Briefcase',
      label: 'Profession',
      value: profile?.preferredProfession
    },
    {
      icon: 'Users',
      label: 'Religion',
      value: profile?.preferredReligion
    },
    {
      icon: 'Heart',
      label: 'Marital Status',
      value: profile?.preferredMaritalStatus
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Partner Preferences
      </h3>
      <div className="space-y-4">
        {preferences?.map((item, index) => (
          item?.value && (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                <Icon name={item?.icon} size={18} className="text-secondary" />
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

        {/* Additional Preferences */}
        {profile?.additionalPreferences && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-body font-medium text-foreground mb-2">
              Additional Preferences
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile?.additionalPreferences}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerPreferencesCard;