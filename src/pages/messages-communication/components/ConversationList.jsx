import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationList = ({ conversations, activeConversationId, onConversationSelect, searchQuery, onSearchChange }) => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredConversations = conversations?.filter(conversation => {
    const matchesSearch = conversation?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conversation?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesOnlineFilter = !showOnlineOnly || conversation?.isOnline;
    return matchesSearch && matchesOnlineFilter;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'premium': return 'text-accent';
      case 'basic': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Messages</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={showOnlineOnly ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            >
              <Icon name="Users" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        </div>

        {/* Search */}
          <div className="relative hover-lift">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow hover:shadow-card"
          />
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms' : 'Start connecting with potential matches to begin conversations'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation?.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-muted hover-lift ${
                  activeConversationId === conversation?.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0 mr-3">
                  <Image
                    src={conversation?.avatar}
                    alt={conversation?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation?.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success border-2 border-card rounded-full" />
                  )}
                  {conversation?.status === 'verified' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-body font-medium text-foreground truncate">
                      {conversation?.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation?.timestamp)}
                      </span>
                      {conversation?.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {conversation?.unreadCount > 9 ? '9+' : conversation?.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {conversation?.isTyping ? (
                        <span className="text-primary font-medium">typing...</span>
                      ) : (
                        <>
                          {conversation?.lastMessageSender === 'You' && (
                            <span className="text-muted-foreground mr-1">You: </span>
                          )}
                          {conversation?.lastMessage}
                        </>
                      )}
                    </p>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      {conversation?.lastMessageSender === 'You' && (
                        <Icon 
                          name={conversation?.messageStatus === 'read' ? 'CheckCheck' : 'Check'} 
                          size={14} 
                          className={conversation?.messageStatus === 'read' ? 'text-primary' : 'text-muted-foreground'} 
                        />
                      )}
                      <Icon name="Shield" size={12} className={getStatusColor(conversation?.status)} />
                    </div>
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

export default ConversationList;