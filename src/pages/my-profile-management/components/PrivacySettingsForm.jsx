import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacySettingsForm = ({ privacyData, onUpdate, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    profileVisibility: privacyData?.profileVisibility || "all",
    photoVisibility: privacyData?.photoVisibility || "premium_members",
    contactVisibility: privacyData?.contactVisibility || "interested_members",
    showOnlineStatus: privacyData?.showOnlineStatus || true,
    allowMessages: privacyData?.allowMessages || true,
    allowPhotoRequests: privacyData?.allowPhotoRequests || true,
    showProfileViews: privacyData?.showProfileViews || true,
    hideFromSearch: privacyData?.hideFromSearch || false,
    blockAnonymousViews: privacyData?.blockAnonymousViews || false,
    emailNotifications: privacyData?.emailNotifications || true,
    smsNotifications: privacyData?.smsNotifications || false,
    matchNotifications: privacyData?.matchNotifications || true,
    messageNotifications: privacyData?.messageNotifications || true,
    profileViewNotifications: privacyData?.profileViewNotifications || false
  });

  const visibilityOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'premium_members', label: 'Premium Members Only' },
    { value: 'interested_members', label: 'Members Who Showed Interest' },
    { value: 'hidden', label: 'Hidden' }
  ];

  const contactVisibilityOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'premium_members', label: 'Premium Members Only' },
    { value: 'interested_members', label: 'Members Who Showed Interest' },
    { value: 'none', label: 'No One' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Eye" size={20} />
          <span>Profile Visibility</span>
        </h3>
        
        <div className="space-y-4">
          <Select
            label="Who can view my profile?"
            description="Control who can see your complete profile information"
            options={visibilityOptions}
            value={formData?.profileVisibility}
            onChange={(value) => handleInputChange('profileVisibility', value)}
          />
          
          <Select
            label="Who can view my photos?"
            description="Control who can see your profile photos"
            options={visibilityOptions}
            value={formData?.photoVisibility}
            onChange={(value) => handleInputChange('photoVisibility', value)}
          />
          
          <Select
            label="Who can view my contact details?"
            description="Control who can see your contact information"
            options={contactVisibilityOptions}
            value={formData?.contactVisibility}
            onChange={(value) => handleInputChange('contactVisibility', value)}
          />
        </div>
      </div>
      {/* Activity Settings */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Activity" size={20} />
          <span>Activity & Interaction</span>
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Show my online status"
            description="Let others know when you're online"
            checked={formData?.showOnlineStatus}
            onChange={(e) => handleInputChange('showOnlineStatus', e?.target?.checked)}
          />
          
          <Checkbox
            label="Allow messages from other members"
            description="Members can send you direct messages"
            checked={formData?.allowMessages}
            onChange={(e) => handleInputChange('allowMessages', e?.target?.checked)}
          />
          
          <Checkbox
            label="Allow photo requests"
            description="Members can request to view your private photos"
            checked={formData?.allowPhotoRequests}
            onChange={(e) => handleInputChange('allowPhotoRequests', e?.target?.checked)}
          />
          
          <Checkbox
            label="Show who viewed my profile"
            description="Display profile view history to you"
            checked={formData?.showProfileViews}
            onChange={(e) => handleInputChange('showProfileViews', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Search & Discovery */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Search" size={20} />
          <span>Search & Discovery</span>
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Hide my profile from search results"
            description="Your profile won't appear in member searches"
            checked={formData?.hideFromSearch}
            onChange={(e) => handleInputChange('hideFromSearch', e?.target?.checked)}
          />
          
          <Checkbox
            label="Block anonymous profile views"
            description="Only registered members can view your profile"
            checked={formData?.blockAnonymousViews}
            onChange={(e) => handleInputChange('blockAnonymousViews', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Bell" size={20} />
          <span>Notification Preferences</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Communication Methods</h4>
              <Checkbox
                label="Email notifications"
                description="Receive notifications via email"
                checked={formData?.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
              />
              
              <Checkbox
                label="SMS notifications"
                description="Receive notifications via SMS"
                checked={formData?.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e?.target?.checked)}
              />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Notification Types</h4>
              <Checkbox
                label="New match notifications"
                description="When someone matches your preferences"
                checked={formData?.matchNotifications}
                onChange={(e) => handleInputChange('matchNotifications', e?.target?.checked)}
              />
              
              <Checkbox
                label="New message notifications"
                description="When you receive new messages"
                checked={formData?.messageNotifications}
                onChange={(e) => handleInputChange('messageNotifications', e?.target?.checked)}
              />
              
              <Checkbox
                label="Profile view notifications"
                description="When someone views your profile"
                checked={formData?.profileViewNotifications}
                onChange={(e) => handleInputChange('profileViewNotifications', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Tips */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Shield" size={16} />
          <span>Privacy Tips</span>
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Keep your contact details private until you're comfortable sharing</li>
          <li>• Use the platform's messaging system for initial conversations</li>
          <li>• Report any suspicious or inappropriate behavior</li>
          <li>• Regularly review and update your privacy settings</li>
          <li>• Be cautious about sharing personal information too quickly</li>
        </ul>
      </div>
      <div className="flex justify-end pt-4">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacySettingsForm;