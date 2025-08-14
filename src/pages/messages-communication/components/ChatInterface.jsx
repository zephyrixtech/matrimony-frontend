import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatInterface = ({ conversation, messages, onSendMessage, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😍', '🥰', '😘', '💕', '❤️', '🌹', '👍', '🙏', '😊', '🎉', '💐'];

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText?.trim()) {
      onSendMessage({
        id: Date.now(),
        text: messageText,
        sender: 'You',
        timestamp: new Date(),
        type: 'text'
      });
      setMessageText('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onSendMessage({
        id: Date.now(),
        text: '',
        sender: 'You',
        timestamp: new Date(),
        type: 'image',
        fileUrl: URL.createObjectURL(file),
        fileName: file?.name
      });
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (messageDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (messageDate?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate?.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages?.forEach(message => {
      const dateKey = new Date(message.timestamp)?.toDateString();
      if (!groups?.[dateKey]) {
        groups[dateKey] = [];
      }
      groups?.[dateKey]?.push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted/20 p-8 text-center">
        <Icon name="MessageCircle" size={64} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-heading font-medium text-foreground mb-2">
          Select a conversation
        </h3>
        <p className="text-muted-foreground">
          Choose a conversation from the list to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="lg:hidden mr-2"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        
        <div className="relative flex-shrink-0 mr-3">
          <Image
            src={conversation?.avatar}
            alt={conversation?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-medium text-foreground truncate">
            {conversation?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {conversation?.isOnline ? 'Online' : `Last seen ${formatMessageTime(conversation?.lastSeen)}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Phone" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Video" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups)?.map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-muted px-3 py-1 rounded-full">
                <span className="text-xs font-caption text-muted-foreground">
                  {formatMessageDate(new Date(dateKey))}
                </span>
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages?.map((message, index) => (
              <div
                key={message?.id}
                className={`flex ${message?.sender === 'You' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div className={`max-w-xs lg:max-w-md ${message?.sender === 'You' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message?.sender === 'You' ?'bg-primary text-primary-foreground rounded-br-md' :'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {message?.type === 'text' ? (
                      <p className="text-sm font-body whitespace-pre-wrap">{message?.text}</p>
                    ) : message?.type === 'image' ? (
                      <div className="space-y-2">
                        <Image
                          src={message?.fileUrl}
                          alt="Shared image"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        {message?.text && (
                          <p className="text-sm font-body">{message?.text}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div className={`flex items-center mt-1 space-x-1 ${message?.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(message?.timestamp)}
                    </span>
                    {message?.sender === 'You' && (
                      <Icon 
                        name={message?.status === 'read' ? 'CheckCheck' : 'Check'} 
                        size={12} 
                        className={message?.status === 'read' ? 'text-primary' : 'text-muted-foreground'} 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        {showEmojiPicker && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <div className="grid grid-cols-6 gap-2">
              {emojis?.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessageText(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-xl hover:bg-background rounded p-1 transition-colors duration-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef?.current?.click()}
          >
            <Icon name="Paperclip" size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Icon name="Smile" size={18} />
          </Button>
          
          <div className="flex-1">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 bg-muted border border-border rounded-full text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleSendMessage}
            disabled={!messageText?.trim()}
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInterface;