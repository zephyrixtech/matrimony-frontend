import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactHistoryCard = ({ interactions = [] }) => {
  if (!interactions?.length) {
    return null;
  }

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'message': return 'MessageCircle';
      case 'interest': return 'Heart';
      case 'favorite': return 'Star';
      case 'view': return 'Eye';
      default: return 'Activity';
    }
  };

  const getInteractionColor = (type) => {
    switch (type) {
      case 'message': return 'text-primary';
      case 'interest': return 'text-error';
      case 'favorite': return 'text-warning';
      case 'view': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const formatInteractionText = (interaction) => {
    switch (interaction?.type) {
      case 'message':
        return `You sent a message`;
      case 'interest':
        return `You expressed interest`;
      case 'favorite':
        return `You added to favorites`;
      case 'view':
        return `You viewed this profile`;
      default:
        return interaction?.description || 'Activity';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Previous Interactions
      </h3>
      <div className="space-y-4">
        {interactions?.map((interaction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted mt-1`}>
              <Icon 
                name={getInteractionIcon(interaction?.type)} 
                size={14} 
                className={getInteractionColor(interaction?.type)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body text-foreground">
                {formatInteractionText(interaction)}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(interaction.timestamp)?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {interaction?.message && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  "{interaction?.message}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Summary */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="font-body text-foreground">Total Interactions:</span>
          <span className="font-body font-medium text-foreground">{interactions?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactHistoryCard;