import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  profileId, 
  profileName = "Profile",
  isFavorited = false,
  hasExpressedInterest = false,
  onExpressInterest,
  onToggleFavorite,
  onSendMessage 
}) => {
  const [isInterestExpressed, setIsInterestExpressed] = useState(hasExpressedInterest);
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [showContactPrompt, setShowContactPrompt] = useState(false);

  const handleExpressInterest = () => {
    if (!isInterestExpressed) {
      setIsInterestExpressed(true);
      onExpressInterest?.(profileId);
      setShowContactPrompt(true);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(profileId, !isFavorite);
  };

  const handleSendMessage = () => {
    onSendMessage?.(profileId);
  };

  return (
    <>
      {/* Desktop Sidebar Actions */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Connect with {profileName}
          </h3>
          
          <div className="space-y-3">
            <Button
              variant={isInterestExpressed ? "outline" : "default"}
              fullWidth
              iconName={isInterestExpressed ? "Check" : "Heart"}
              iconPosition="left"
              onClick={handleExpressInterest}
              disabled={isInterestExpressed}
            >
              {isInterestExpressed ? "Interest Expressed" : "Express Interest"}
            </Button>

            <Button
              variant="outline"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleSendMessage}
            >
              Send Message
            </Button>

            <Button
              variant="ghost"
              fullWidth
              iconName={isFavorite ? "Heart" : "Heart"}
              iconPosition="left"
              onClick={handleToggleFavorite}
              className={isFavorite ? "text-error" : ""}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              fullWidth
              iconName="Share"
              iconPosition="left"
              size="sm"
            >
              Share Profile
            </Button>
            
            <Button
              variant="ghost"
              fullWidth
              iconName="Flag"
              iconPosition="left"
              size="sm"
              className="text-error hover:text-error"
            >
              Report Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className={`flex-shrink-0 ${isFavorite ? "text-error" : ""}`}
          >
            <Icon name="Heart" size={20} className={isFavorite ? "fill-current" : ""} />
          </Button>

          <Button
            variant={isInterestExpressed ? "outline" : "default"}
            fullWidth
            iconName={isInterestExpressed ? "Check" : "Heart"}
            iconPosition="left"
            onClick={handleExpressInterest}
            disabled={isInterestExpressed}
          >
            {isInterestExpressed ? "Interest Sent" : "Express Interest"}
          </Button>

          <Button
            variant="outline"
            iconName="MessageCircle"
            onClick={handleSendMessage}
            className="flex-shrink-0"
          >
            Message
          </Button>
        </div>
      </div>

      {/* Contact Verification Prompt Modal */}
      {showContactPrompt && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
                <Icon name="Check" size={24} className="text-success" />
              </div>
              
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Interest Expressed!
              </h3>
              
              <p className="text-sm text-muted-foreground mb-6">
                Your interest has been sent to {profileName}. They will be notified and can choose to respond.
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => {
                    setShowContactPrompt(false);
                    handleSendMessage();
                  }}
                >
                  Send a Message
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowContactPrompt(false)}
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;