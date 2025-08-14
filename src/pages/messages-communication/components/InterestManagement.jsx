import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InterestManagement = ({ interests, onInterestAction }) => {
  const [activeTab, setActiveTab] = useState('received');

  const tabs = [
    { id: 'received', label: 'Received', icon: 'Heart' },
    { id: 'sent', label: 'Sent', icon: 'Send' },
    { id: 'mutual', label: 'Mutual', icon: 'Users' }
  ];

  const filteredInterests = interests?.filter(interest => {
    if (activeTab === 'received') return interest?.type === 'received';
    if (activeTab === 'sent') return interest?.type === 'sent';
    if (activeTab === 'mutual') return interest?.type === 'mutual';
    return false;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-success';
      case 'declined': return 'text-error';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return 'CheckCircle';
      case 'declined': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const interestTime = new Date(timestamp);
    const diffInHours = Math.floor((now - interestTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Interest Management
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded-full">
                {filteredInterests?.length}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Interest List */}
      <div className="flex-1 overflow-y-auto">
        {filteredInterests?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="Heart" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">
              No {activeTab} interests
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'received' && 'You haven\'t received any interests yet'}
              {activeTab === 'sent' && 'You haven\'t sent any interests yet'}
              {activeTab === 'mutual' && 'No mutual interests found'}
            </p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredInterests?.map((interest) => (
              <div
                key={interest?.id}
                className="flex items-center p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 hover-lift transition-colors duration-200"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0 mr-4">
                  <Image
                    src={interest?.avatar}
                    alt={interest?.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {interest?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full" />
                  )}
                  {interest?.isVerified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-body font-medium text-foreground truncate">
                      {interest?.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getStatusIcon(interest?.status)} 
                        size={16} 
                        className={getStatusColor(interest?.status)} 
                      />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(interest?.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm text-muted-foreground">
                      {interest?.age} years • {interest?.location}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {interest?.profession}
                    </span>
                  </div>

                  {interest?.message && (
                    <p className="text-sm text-muted-foreground mb-3 italic">
                      "{interest?.message}"
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {activeTab === 'received' && interest?.status === 'pending' && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onInterestAction(interest?.id, 'accept')}
                        >
                          <Icon name="Check" size={14} />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onInterestAction(interest?.id, 'decline')}
                        >
                          <Icon name="X" size={14} />
                          Decline
                        </Button>
                      </>
                    )}
                    
                    {activeTab === 'sent' && interest?.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onInterestAction(interest?.id, 'withdraw')}
                      >
                        <Icon name="X" size={14} />
                        Withdraw
                      </Button>
                    )}
                    
                    {(interest?.status === 'accepted' || activeTab === 'mutual') && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onInterestAction(interest?.id, 'message')}
                      >
                        <Icon name="MessageCircle" size={14} />
                        Message
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onInterestAction(interest?.id, 'view')}
                    >
                      <Icon name="Eye" size={14} />
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestManagement;