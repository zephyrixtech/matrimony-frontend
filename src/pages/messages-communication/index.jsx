import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import ConversationList from './components/ConversationList';
import ChatInterface from './components/ChatInterface';
import InterestManagement from './components/InterestManagement';
import PrivacyControls from './components/PrivacyControls';
import Icon from '../../components/AppIcon';
import MobileBottomNav from '../../components/ui/MobileBottomNav';


const MessagesAndCommunication = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('conversations');
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thank you for your interest! I\'d love to know more about your family background.",
      lastMessageSender: "Priya Sharma",
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
      status: 'verified',
      messageStatus: 'delivered',
      lastSeen: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      name: "Rahul Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "That sounds wonderful! When would be a good time to meet?",
      lastMessageSender: "You",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      status: 'premium',
      messageStatus: 'read',
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      name: "Anita Desai",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "I appreciate your message. Could we schedule a video call this weekend?",
      lastMessageSender: "Anita Desai",
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 1,
      isOnline: true,
      isTyping: true,
      status: 'verified',
      messageStatus: 'delivered',
      lastSeen: new Date()
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Looking forward to hearing from your family soon.",
      lastMessageSender: "Vikram Singh",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      status: 'basic',
      messageStatus: 'read',
      lastSeen: new Date(Date.now() - 86400000)
    }
  ]);

  // Mock messages data
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        text: "Hello! I came across your profile and found it very interesting. I\'d love to get to know you better.",
        sender: "Priya Sharma",
        timestamp: new Date(Date.now() - 86400000),
        type: 'text',
        status: 'read'
      },
      {
        id: 2,
        text: "Thank you for reaching out! I\'m glad you found my profile interesting. I\'d be happy to chat and learn more about you as well.",
        sender: "You",
        timestamp: new Date(Date.now() - 82800000),
        type: 'text',
        status: 'read'
      },
      {
        id: 3,
        text: "That\'s wonderful! Could you tell me more about your family background and values?",
        sender: "Priya Sharma",
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        status: 'read'
      },
      {
        id: 4,
        text: "Thank you for your interest! I\'d love to know more about your family background.",
        sender: "Priya Sharma",
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        status: 'delivered'
      }
    ],
    2: [
      {
        id: 1,
        text: "Hi! I noticed we have similar interests in travel and photography.",
        sender: "You",
        timestamp: new Date(Date.now() - 172800000),
        type: 'text',
        status: 'read'
      },
      {
        id: 2,
        text: "Yes! I love exploring new places. Where was your last trip?",
        sender: "Rahul Patel",
        timestamp: new Date(Date.now() - 169200000),
        type: 'text',
        status: 'read'
      },
      {
        id: 3,
        text: "I recently visited the mountains in Himachal Pradesh. The views were breathtaking!",
        sender: "You",
        timestamp: new Date(Date.now() - 7200000),
        type: 'text',
        status: 'read'
      },
      {
        id: 4,
        text: "That sounds wonderful! When would be a good time to meet?",
        sender: "You",
        timestamp: new Date(Date.now() - 1800000),
        type: 'text',
        status: 'read'
      }
    ]
  });

  // Mock interests data
  const [interests, setInterests] = useState([
    {
      id: 1,
      name: "Kavya Reddy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      age: 26,
      location: "Bangalore",
      profession: "Software Engineer",
      type: 'received',
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000),
      message: "I found your profile very interesting and would love to connect with you.",
      isOnline: true,
      isVerified: true
    },
    {
      id: 2,
      name: "Arjun Kumar",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      age: 29,
      location: "Mumbai",
      profession: "Marketing Manager",
      type: 'sent',
      status: 'accepted',
      timestamp: new Date(Date.now() - 86400000),
      message: "Hi! I\'d like to get to know you better. Looking forward to hearing from you.",
      isOnline: false,
      isVerified: true
    },
    {
      id: 3,
      name: "Meera Joshi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      age: 25,
      location: "Pune",
      profession: "Doctor",
      type: 'mutual',
      status: 'accepted',
      timestamp: new Date(Date.now() - 172800000),
      message: "Thank you for your interest! I\'m excited to connect.",
      isOnline: true,
      isVerified: true
    }
  ]);

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    messageNotifications: true,
    onlineStatus: true,
    readReceipts: true,
    autoReply: false,
    contactSharing: true,
    photoSharing: true,
    autoReplyMessage: "Thank you for your message. I\'ll get back to you soon!"
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    
    // Mark messages as read
    setConversations(prev => prev?.map(conv => 
      conv?.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleSendMessage = (message) => {
    if (!activeConversationId) return;

    const newMessage = {
      ...message,
      id: Date.now(),
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev?.[activeConversationId] || []), newMessage]
    }));

    // Update conversation last message
    setConversations(prev => prev?.map(conv => 
      conv?.id === activeConversationId
        ? {
            ...conv,
            lastMessage: message?.text || 'Photo',
            lastMessageSender: 'You',
            timestamp: new Date(),
            messageStatus: 'sent'
          }
        : conv
    ));
  };

  const handleInterestAction = (interestId, action) => {
    switch (action) {
      case 'accept':
        setInterests(prev => prev?.map(interest =>
          interest?.id === interestId
            ? { ...interest, status: 'accepted' }
            : interest
        ));
        break;
      case 'decline':
        setInterests(prev => prev?.map(interest =>
          interest?.id === interestId
            ? { ...interest, status: 'declined' }
            : interest
        ));
        break;
      case 'withdraw':
        setInterests(prev => prev?.filter(interest => interest?.id !== interestId));
        break;
      case 'message':
        // Create new conversation and switch to messages
        const interest = interests?.find(i => i?.id === interestId);
        if (interest) {
          const newConversation = {
            id: Date.now(),
            name: interest?.name,
            avatar: interest?.avatar,
            lastMessage: "Interest accepted! Start your conversation here.",
            lastMessageSender: "System",
            timestamp: new Date(),
            unreadCount: 0,
            isOnline: interest?.isOnline,
            isTyping: false,
            status: interest?.isVerified ? 'verified' : 'basic',
            messageStatus: 'delivered',
            lastSeen: new Date()
          };
          setConversations(prev => [newConversation, ...prev]);
          setActiveView('conversations');
          setActiveConversationId(newConversation?.id);
        }
        break;
      case 'view': navigate('/profile-detail-view');
        break;
    }
  };

  const handleBackToList = () => {
    setActiveConversationId(null);
  };

  const activeConversation = conversations?.find(conv => conv?.id === activeConversationId);
  const conversationMessages = messages?.[activeConversationId] || [];

  const viewTabs = [
    { id: 'conversations', label: 'Messages', icon: 'MessageCircle' },
    { id: 'interests', label: 'Interests', icon: 'Heart' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  const totalUnreadCount = conversations?.reduce((sum, conv) => sum + conv?.unreadCount, 0);

  return (
    <PageContainer>
      <UserNavigationBar messageCount={totalUnreadCount} />
      <div className="container mx-auto px-4 pb-20 pt-6 max-w-7xl">
        <NavigationBreadcrumbs />
        
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          {/* Mobile View Tabs */}
          {isMobileView && !activeConversationId && (
            <div className="flex border-b border-border bg-muted/30">
              {viewTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveView(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-body font-medium transition-colors duration-200 ${
                    activeView === tab?.id
                      ? 'text-primary bg-card border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.id === 'conversations' && totalUnreadCount > 0 && (
                    <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                      {totalUnreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex h-[calc(100vh-12rem)]">
            {/* Desktop Sidebar / Mobile Full View */}
            {(!isMobileView || !activeConversationId) && (
              <div className={`${isMobileView ? 'w-full' : 'w-80 border-r border-border'} flex-shrink-0`}>
                {/* Desktop View Tabs */}
                {!isMobileView && (
                  <div className="flex border-b border-border bg-muted/30">
                    {viewTabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveView(tab?.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-body font-medium transition-colors duration-200 ${
                          activeView === tab?.id
                            ? 'text-primary bg-card border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                        {tab?.id === 'conversations' && totalUnreadCount > 0 && (
                          <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                            {totalUnreadCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Content based on active view */}
                {activeView === 'conversations' && (
                  <ConversationList
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onConversationSelect={handleConversationSelect}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                )}

                {activeView === 'interests' && (
                  <InterestManagement
                    interests={interests}
                    onInterestAction={handleInterestAction}
                  />
                )}

                {activeView === 'privacy' && (
                  <PrivacyControls
                    settings={privacySettings}
                    onSettingsUpdate={setPrivacySettings}
                  />
                )}
              </div>
            )}

            {/* Chat Interface */}
            {(!isMobileView || activeConversationId) && (
              <div className="flex-1">
                <ChatInterface
                  conversation={activeConversation}
                  messages={conversationMessages}
                  onSendMessage={handleSendMessage}
                  onBack={handleBackToList}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileBottomNav messageCount={totalUnreadCount} />
    </PageContainer>
  );
};

export default MessagesAndCommunication;