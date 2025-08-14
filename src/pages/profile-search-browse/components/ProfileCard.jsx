import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileCard = ({ profile, onFavorite, onContact }) => {
  const [isFavorited, setIsFavorited] = useState(profile?.isFavorited || false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleFavorite = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite(profile?.id, !isFavorited);
  };

  const handleContact = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onContact(profile?.id);
  };

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getOnlineStatus = (lastSeen) => {
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now - lastSeenDate) / (1000 * 60));
    
    if (diffInMinutes < 5) return { status: 'online', text: 'Online now' };
    if (diffInMinutes < 60) return { status: 'recent', text: `${diffInMinutes}m ago` };
    if (diffInMinutes < 1440) return { status: 'today', text: `${Math.floor(diffInMinutes / 60)}h ago` };
    return { status: 'offline', text: `${Math.floor(diffInMinutes / 1440)}d ago` };
  };

  const onlineStatus = getOnlineStatus(profile?.lastSeen);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover-lift transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative">
        <Link to={`/profile-detail-view?id=${profile?.id}`} className="block">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src={profile?.photos?.[0]}
              alt={`${profile?.name}'s profile`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Icon name="User" size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </Link>

        {/* Premium Badge */}
        {profile?.isPremium && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="Crown" size={12} className="inline mr-1" />
            Premium
          </div>
        )}

        {/* Online Status */}
        <div className="absolute top-2 right-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            onlineStatus?.status === 'online' ?'bg-success text-success-foreground' :'bg-card/90 text-muted-foreground'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              onlineStatus?.status === 'online' ? 'bg-success-foreground' : 'bg-muted-foreground'
            }`} />
            <span>{onlineStatus?.text}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute bottom-2 right-2 w-8 h-8 bg-card/90 hover:bg-card rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon 
            name={isFavorited ? "Heart" : "Heart"} 
            size={16} 
            className={isFavorited ? 'text-error fill-current' : 'text-muted-foreground hover:text-error'}
          />
        </button>

        {/* Photo Count */}
        {profile?.photos?.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-card/90 text-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Camera" size={12} />
            <span>{profile?.photos?.length}</span>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        <Link to={`/profile-detail-view?id=${profile?.id}`} className="block">
          {/* Name and Age */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground truncate">
              {profile?.name}
            </h3>
            <span className="text-sm text-muted-foreground font-medium">
              {profile?.age}
            </span>
          </div>

          {/* Basic Info */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">{profile?.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="GraduationCap" size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">{profile?.education}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Briefcase" size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">{profile?.profession}</span>
            </div>
          </div>

          {/* Compatibility Score */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Compatibility</span>
            </div>
            <span className={`text-sm font-semibold ${getCompatibilityColor(profile?.compatibility)}`}>
              {profile?.compatibility}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                profile?.compatibility >= 80 ? 'bg-success' :
                profile?.compatibility >= 60 ? 'bg-warning' : 'bg-muted-foreground'
              }`}
              style={{ width: `${profile?.compatibility}%` }}
            />
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleContact}
            className="flex-1"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={16}
          >
            Contact
          </Button>
          <Link to={`/profile-detail-view?id=${profile?.id}`} className="flex-1">
            <Button
              variant="default"
              size="sm"
              fullWidth
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
            >
              View Profile
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{profile?.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Joined {profile?.joinedDate}</span>
            </div>
          </div>
          {profile?.isVerified && (
            <div className="flex items-center space-x-1 text-xs text-success">
              <Icon name="CheckCircle" size={12} />
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;