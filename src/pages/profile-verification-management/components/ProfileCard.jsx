import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCard = ({ profile, onApprove, onReject, onViewDetails, onRequestChanges }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'approved': return 'text-success bg-success/10';
      case 'rejected': return 'text-error bg-error/10';
      case 'changes_requested': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'changes_requested': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated hover-lift transition-all duration-200">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={profile?.profileImage}
              alt={`${profile?.name}'s profile`}
              className="w-16 h-16 rounded-lg object-cover"
            />
            {profile?.isVerified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg truncate">
                {profile?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile?.age} years • {profile?.location}
              </p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(profile?.status)}`}>
              <Icon name={getStatusIcon(profile?.status)} size={12} />
              <span className="capitalize">{profile?.status?.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
            <div>
              <span className="font-medium">Education:</span> {profile?.education}
            </div>
            <div>
              <span className="font-medium">Profession:</span> {profile?.profession}
            </div>
            <div>
              <span className="font-medium">Submitted:</span> {formatDate(profile?.submittedAt)}
            </div>
            <div>
              <span className="font-medium">Completion:</span> {profile?.completionPercentage}%
            </div>
          </div>

          {/* Verification Flags */}
          {profile?.verificationFlags && profile?.verificationFlags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {profile?.verificationFlags?.map((flag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full"
                >
                  {flag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewDetails(profile)}
            >
              View Details
            </Button>
            
            {profile?.status === 'pending' && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => onApprove(profile?.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => onReject(profile?.id)}
                >
                  Reject
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  iconName="MessageSquare"
                  iconPosition="left"
                  onClick={() => onRequestChanges(profile)}
                >
                  Request Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;