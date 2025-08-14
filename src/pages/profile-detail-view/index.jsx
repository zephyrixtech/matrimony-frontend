import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ProfilePhotoGallery from './components/ProfilePhotoGallery';
import BasicInfoCard from './components/BasicInfoCard';
import EducationCareerCard from './components/EducationCareerCard';
import FamilyBackgroundCard from './components/FamilyBackgroundCard';
import PartnerPreferencesCard from './components/PartnerPreferencesCard';
import CompatibilityIndicator from './components/CompatibilityIndicator';
import VerificationBadges from './components/VerificationBadges';
import ActionButtons from './components/ActionButtons';
import ContactHistoryCard from './components/ContactHistoryCard';
import MobileBottomNav from '../../components/ui/MobileBottomNav';

const ProfileDetailView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileId = searchParams?.get('id') || '1';
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock profile data
  const mockProfile = {
    id: profileId,
    name: "Sarah Johnson",
    age: 28,
    city: "San Francisco",
    state: "California",
    height: "5\'6\"",
    maritalStatus: "Never Married",
    religion: "Christian",
    motherTongue: "English",
    education: "Master\'s in Computer Science",
    college: "Stanford University",
    profession: "Software Engineer",
    company: "Google Inc.",
    workLocation: "Mountain View, CA",
    income: "$120,000 - $150,000",
    fatherOccupation: "Business Owner",
    motherOccupation: "Teacher",
    familyType: "Nuclear Family",
    familyStatus: "Middle Class",
    siblings: "1 Sister (Married)",
    familyValues: `We are a close-knit family that values education, respect, and traditional values. We believe in supporting each other through life's journey and maintaining strong family bonds.`,
    preferredAgeRange: "26-32 years",
    preferredHeightRange: "5\'8\" - 6\'2\"",
    preferredLocation: "California, New York, Washington",
    preferredEducation: "Graduate or higher",
    preferredProfession: "Engineer, Doctor, Business Professional",
    preferredReligion: "Christian",
    preferredMaritalStatus: "Never Married",
    additionalPreferences: `Looking for someone who shares similar values, is career-oriented, and believes in maintaining work-life balance. Should be family-oriented and ready for a committed relationship.`,
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
    ],
    verifications: [
      { type: 'email', verifiedDate: '2024-01-15' },
      { type: 'phone', verifiedDate: '2024-01-16' },
      { type: 'identity', verifiedDate: '2024-01-20' },
      { type: 'photo', verifiedDate: '2024-01-18' },
      { type: 'education', verifiedDate: '2024-01-25' }
    ],
    compatibilityScore: 87,
    matchingCriteria: [
      { label: 'Age Preference', match: true, score: 95 },
      { label: 'Location', match: true, score: 90 },
      { label: 'Education', match: true, score: 100 },
      { label: 'Religion', match: true, score: 85 },
      { label: 'Family Values', match: true, score: 80 },
      { label: 'Career Goals', match: false, score: 70 }
    ],
    interactions: [
      {
        type: 'view',timestamp: '2024-08-10T14:30:00Z',description: 'Profile viewed'
      },
      {
        type: 'favorite',timestamp: '2024-08-08T10:15:00Z',description: 'Added to favorites'
      },
      {
        type: 'message',timestamp: '2024-08-05T16:45:00Z',message: 'Hi! I found your profile interesting and would love to connect.'
      }
    ],
    isOnline: true,
    lastSeen: '2024-08-14T12:00:00Z',profileCompletion: 95,membershipType: 'Premium'
  };

  useEffect(() => {
    // Simulate API call
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  const handleExpressInterest = (profileId) => {
    console.log('Expressing interest in profile:', profileId);
    // Handle interest expression logic
  };

  const handleToggleFavorite = (profileId, isFavorite) => {
    console.log('Toggling favorite for profile:', profileId, isFavorite);
    // Handle favorite toggle logic
  };

  const handleSendMessage = (profileId) => {
    navigate(`/messages-communication?profile=${profileId}`);
  };

  const handleBackToSearch = () => {
    navigate('/profile-search-browse');
  };

  if (loading) {
    return (
      <PageContainer>
        <UserNavigationBar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground font-body">Loading profile...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!profile) {
    return (
      <PageContainer>
        <UserNavigationBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Icon name="UserX" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Profile Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleBackToSearch}>
              Back to Search
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const breadcrumbs = [
    { label: 'Home', path: '/', icon: 'Home' },
    { label: 'Search Partners', path: '/profile-search-browse', icon: 'Search' },
    { label: profile?.name, path: `/profile-detail-view?id=${profile?.id}`, icon: 'User', isLast: true }
  ];

  return (
    <PageContainer>
      <UserNavigationBar />
      <div className="container mx-auto px-4 pb-24 pt-6 lg:pt-8">
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={handleBackToSearch}
            className="lg:hidden"
          >
            Back
          </Button>
          
          <div className="hidden lg:block">
            <NavigationBreadcrumbs customBreadcrumbs={breadcrumbs} />
          </div>

          {/* Online Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${profile?.isOnline ? 'bg-success' : 'bg-muted-foreground'}`} />
            <span className="text-sm font-caption text-muted-foreground">
              {profile?.isOnline ? 'Online now' : `Last seen ${new Date(profile.lastSeen)?.toLocaleDateString()}`}
            </span>
          </div>
        </div>

        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {profile?.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {profile?.age} years • {profile?.city}, {profile?.state}
              </p>
              
              {/* Profile Stats */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={16} />
                  <span>Profile viewed 127 times</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined 3 months ago</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Award" size={16} />
                  <span>{profile?.membershipType} Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Photos & Actions (Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <ProfilePhotoGallery 
              photos={profile?.photos} 
              profileName={profile?.name} 
            />
            
            <ActionButtons
              profileId={profile?.id}
              profileName={profile?.name}
              isFavorited={profile?.interactions?.some(i => i?.type === 'favorite')}
              hasExpressedInterest={false}
              onExpressInterest={handleExpressInterest}
              onToggleFavorite={handleToggleFavorite}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-8 space-y-6 mt-6 lg:mt-0">
            {/* Mobile Photo Gallery */}
            <div className="lg:hidden">
              <ProfilePhotoGallery 
                photos={profile?.photos} 
                profileName={profile?.name} 
              />
            </div>

            {/* Basic Information */}
            <BasicInfoCard profile={profile} />

            {/* Education & Career */}
            <EducationCareerCard profile={profile} />

            {/* Family Background */}
            <FamilyBackgroundCard profile={profile} />

            {/* Partner Preferences */}
            <PartnerPreferencesCard profile={profile} />

            {/* Compatibility Score */}
            <CompatibilityIndicator 
              compatibilityScore={profile?.compatibilityScore}
              matchingCriteria={profile?.matchingCriteria}
            />

            {/* Verification Badges */}
            <VerificationBadges verifications={profile?.verifications} />

            {/* Contact History */}
            <ContactHistoryCard interactions={profile?.interactions} />
          </div>
        </div>
      </div>
      {/* Mobile Action Buttons */}
      <div className="lg:hidden">
        <ActionButtons
          profileId={profile?.id}
          profileName={profile?.name}
          isFavorited={profile?.interactions?.some(i => i?.type === 'favorite')}
          hasExpressedInterest={false}
          onExpressInterest={handleExpressInterest}
          onToggleFavorite={handleToggleFavorite}
          onSendMessage={handleSendMessage}
        />
      </div>
      <MobileBottomNav />
    </PageContainer>
  );
};

export default ProfileDetailView;