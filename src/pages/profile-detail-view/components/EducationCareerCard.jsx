import React from 'react';
import Icon from '../../../components/AppIcon';

const EducationCareerCard = ({ profile }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Education & Career
      </h3>
      <div className="space-y-6">
        {/* Education */}
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg mt-1">
            <Icon name="GraduationCap" size={18} className="text-secondary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-body font-medium text-foreground mb-1">
              Education
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              {profile?.education}
            </p>
            {profile?.college && (
              <p className="text-xs text-muted-foreground">
                {profile?.college}
              </p>
            )}
          </div>
        </div>

        {/* Career */}
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mt-1">
            <Icon name="Briefcase" size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-body font-medium text-foreground mb-1">
              Profession
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              {profile?.profession}
            </p>
            {profile?.company && (
              <p className="text-xs text-muted-foreground mb-1">
                {profile?.company}
              </p>
            )}
            {profile?.workLocation && (
              <p className="text-xs text-muted-foreground">
                <Icon name="MapPin" size={12} className="inline mr-1" />
                {profile?.workLocation}
              </p>
            )}
          </div>
        </div>

        {/* Income */}
        {profile?.income && (
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg mt-1">
              <Icon name="DollarSign" size={18} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-body font-medium text-foreground mb-1">
                Annual Income
              </h4>
              <p className="text-sm text-muted-foreground">
                {profile?.income}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationCareerCard;