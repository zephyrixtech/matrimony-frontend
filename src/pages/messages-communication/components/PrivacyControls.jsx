import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControls = ({ settings, onSettingsUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...localSettings, [key]: value };
    setLocalSettings(updatedSettings);
    onSettingsUpdate(updatedSettings);
  };

  const privacyOptions = [
    {
      id: 'messageNotifications',
      label: 'Message Notifications',
      description: 'Receive notifications for new messages',
      icon: 'Bell'
    },
    {
      id: 'onlineStatus',
      label: 'Show Online Status',
      description: 'Let others see when you\'re online',
      icon: 'Eye'
    },
    {
      id: 'readReceipts',
      label: 'Read Receipts',
      description: 'Show when you\'ve read messages',
      icon: 'CheckCheck'
    },
    {
      id: 'autoReply',
      label: 'Auto Reply',
      description: 'Send automatic replies when unavailable',
      icon: 'MessageSquare'
    },
    {
      id: 'contactSharing',
      label: 'Contact Information Sharing',
      description: 'Allow sharing contact details with matched users',
      icon: 'Phone'
    },
    {
      id: 'photoSharing',
      label: 'Photo Sharing in Chat',
      description: 'Allow sending and receiving photos in messages',
      icon: 'Image'
    }
  ];

  const blockedUsers = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      blockedDate: '2025-01-10'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      blockedDate: '2025-01-05'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
          Privacy & Safety
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your messaging privacy and safety settings
        </p>
      </div>
      {/* Settings */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-base font-heading font-medium text-foreground">
            Privacy Settings
          </h3>
          
          {privacyOptions?.map((option) => (
            <div key={option?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                <Icon name={option?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-body font-medium text-foreground">
                      {option?.label}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option?.description}
                    </p>
                  </div>
                  <Checkbox
                    checked={localSettings?.[option?.id] || false}
                    onChange={(e) => handleSettingChange(option?.id, e?.target?.checked)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Auto Reply Message */}
        {localSettings?.autoReply && (
          <div className="space-y-2">
            <label className="text-sm font-body font-medium text-foreground">
              Auto Reply Message
            </label>
            <textarea
              value={localSettings?.autoReplyMessage || ''}
              onChange={(e) => handleSettingChange('autoReplyMessage', e?.target?.value)}
              placeholder="Enter your auto reply message..."
              rows={3}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
        )}

        {/* Blocked Users */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-heading font-medium text-foreground">
              Blocked Users
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBlockedUsers(!showBlockedUsers)}
            >
              <Icon name={showBlockedUsers ? "ChevronUp" : "ChevronDown"} size={16} />
              {showBlockedUsers ? 'Hide' : 'Show'} ({blockedUsers?.length})
            </Button>
          </div>

          {showBlockedUsers && (
            <div className="space-y-2">
              {blockedUsers?.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Shield" size={48} className="text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground">No blocked users</p>
                </div>
              ) : (
                blockedUsers?.map((user) => (
                  <div key={user?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-body font-medium text-foreground">
                          {user?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Blocked on {new Date(user.blockedDate)?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {/* Handle unblock */}}
                    >
                      Unblock
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Safety Guidelines */}
        <div className="space-y-4">
          <h3 className="text-base font-heading font-medium text-foreground">
            Safety Guidelines
          </h3>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-body font-medium text-foreground">
                  Stay Safe While Messaging
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Never share personal information like address or financial details</li>
                  <li>• Meet in public places for first meetings</li>
                  <li>• Report suspicious or inappropriate behavior</li>
                  <li>• Trust your instincts and block users if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Report & Block Actions */}
        <div className="space-y-3">
          <h3 className="text-base font-heading font-medium text-foreground">
            Safety Actions
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {/* Handle report */}}
            >
              <Icon name="Flag" size={16} />
              Report a User
            </Button>
            
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {/* Handle help */}}
            >
              <Icon name="HelpCircle" size={16} />
              Safety Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;