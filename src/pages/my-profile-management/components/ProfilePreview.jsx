import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationGuard';

const ProfilePreview = ({ profileData, photos = [] }) => {
  const mockProfileData = {
    firstName: "John",
    lastName: "Smith",
    age: 28,
    height: "5ft 10in",
    religion: "Christian",
    caste: "Catholic",
    education: "Master\'s Degree",
    occupation: "Software Engineer",
    location: "New York",
    aboutMe: "I'm a passionate software engineer who loves traveling, reading, and exploring new technologies. Looking for a life partner who shares similar values and interests.",
    isVerified: true,
    isOnline: true,
    lastSeen: "2 hours ago"
  };

  const mockPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isProfile: true
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      isProfile: false
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isProfile: false
    }
  ];

  const data = { ...mockProfileData, ...profileData };
  const profilePhotos = photos?.length > 0 ? photos : mockPhotos;
  const profilePhoto = profilePhotos?.find(photo => photo?.isProfile) || profilePhotos?.[0];
  const navigate = useNavigate();
  const { user } = useAuth();

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return data?.age;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today?.getFullYear() - birthDate?.getFullYear();
    const monthDiff = today?.getMonth() - birthDate?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birthDate?.getDate())) {
      age--;
    }
    return age;
  };

  let age = data?.dateOfBirth ? calculateAge(data?.dateOfBirth) : data?.age;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-1">Profile Preview</h2>
        <p className="text-sm text-muted-foreground">How others will see your profile</p>
      </div>
      {/* Profile Photo */}
      <div className="relative p-6 text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
            {profilePhoto ? (
              <Image
                src={profilePhoto?.url}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Icon name="User" size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Online Status */}
          {data?.isOnline && (
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
          
          {/* Verified Badge */}
          {data?.isVerified && (
            <div className="absolute top-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
          )}
        </div>
      </div>
      {/* Basic Info */}
      <div className="px-6 pb-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-foreground">
            {data?.firstName} {data?.lastName}
          </h3>
          <p className="text-muted-foreground">
            {age} years • {data?.height} • {data?.location}
          </p>
          {!data?.isOnline && data?.lastSeen && (
            <p className="text-xs text-muted-foreground mt-1">
              Last seen {data?.lastSeen}
            </p>
          )}
        </div>

        {/* Quick Details */}
        <div className="space-y-2 mb-4">
          {data?.religion && (
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Heart" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Religion:</span>
              <span className="text-foreground">{data?.religion}</span>
            </div>
          )}
          
          {data?.education && (
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="GraduationCap" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Education:</span>
              <span className="text-foreground">{data?.education}</span>
            </div>
          )}
          
          {data?.occupation && (
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Briefcase" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Occupation:</span>
              <span className="text-foreground">{data?.occupation}</span>
            </div>
          )}
        </div>

        {/* About Me */}
        {data?.aboutMe && (
          <div className="mb-4">
            <h4 className="font-medium text-foreground mb-2">About Me</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data?.aboutMe?.length > 100 
                ? `${data?.aboutMe?.substring(0, 100)}...` 
                : data?.aboutMe
              }
            </p>
          </div>
        )}

        {/* Photo Gallery Preview */}
        {profilePhotos?.length > 1 && (
          <div className="mb-4">
            <h4 className="font-medium text-foreground mb-2">Photos ({profilePhotos?.length})</h4>
            <div className="flex space-x-2 overflow-x-auto">
              {profilePhotos?.slice(0, 4)?.map((photo) => (
                <div key={photo?.id} className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={photo?.url}
                      alt="Gallery photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
              {profilePhotos?.length > 4 && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg border border-border bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{profilePhotos?.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="Eye"
            onClick={() => {
              const id = user?.id || '1';
              navigate(`/profile-detail-view?id=${id}`);
            }}
          >
            View Full Profile
          </Button>
          <Button variant="default" fullWidth iconName="Heart">
            Express Interest
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-muted/50 px-6 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          This is how your profile appears to other members
        </p>
      </div>
    </div>
  );
};

export default ProfilePreview;