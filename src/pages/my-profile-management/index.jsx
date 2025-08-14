import React, { useState, useEffect } from 'react';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import BasicInfoForm from './components/BasicInfoForm';
import PhotoUploadSection from './components/PhotoUploadSection';
import FamilyDetailsForm from './components/FamilyDetailsForm';
import EducationCareerForm from './components/EducationCareerForm';
import PartnerPreferencesForm from './components/PartnerPreferencesForm';
import PrivacySettingsForm from './components/PrivacySettingsForm';
import ProfileCompletionIndicator from './components/ProfileCompletionIndicator';
import ProfilePreview from './components/ProfilePreview';
import MobileBottomNav from '../../components/ui/MobileBottomNav';

const MyProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [profileData, setProfileData] = useState({});
  const [photos, setPhotos] = useState([]);

  // Calculate completion data for ProfileCompletionIndicator
  const calculateCompletionData = () => {
    const sections = {
      basic: profileData.basic || {},
      photos: photos.length > 0,
      family: profileData.family || {},
      education: profileData.education || {},
      preferences: profileData.preferences || {},
      privacy: profileData.privacy || {}
    };

    const totalSections = Object.keys(sections).length;
    const completedSections = Object.values(sections).filter(section => {
      if (typeof section === 'boolean') return section;
      return Object.keys(section).length > 0;
    }).length;

    return {
      completedSections,
      totalSections,
      percentage: Math.round((completedSections / totalSections) * 100),
      sections
    };
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(profileData)?.length > 0) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [profileData]);

  const tabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      icon: 'User',
      component: BasicInfoForm
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: 'Camera',
      component: PhotoUploadSection
    },
    {
      id: 'family',
      label: 'Family Details',
      icon: 'Users',
      component: FamilyDetailsForm
    },
    {
      id: 'education',
      label: 'Education & Career',
      icon: 'GraduationCap',
      component: EducationCareerForm
    },
    {
      id: 'preferences',
      label: 'Partner Preferences',
      icon: 'Heart',
      component: PartnerPreferencesForm
    },
    {
      id: 'privacy',
      label: 'Privacy Settings',
      icon: 'Shield',
      component: PrivacySettingsForm
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSaveMessage('');
  };

  const handleDataUpdate = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handlePhotosUpdate = (newPhotos) => {
    setPhotos(newPhotos);
  };

  const handleSave = async (data, section) => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfileData(prev => ({
        ...prev,
        [section]: data
      }));

      setSaveMessage('Changes saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAutoSave = async () => {
    try {
      // Simulate auto-save API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSaveMessage('Auto-saved');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const renderActiveComponent = () => {
    const activeTabData = tabs?.find(tab => tab?.id === activeTab);
    if (!activeTabData) return null;

    const Component = activeTabData?.component;
    const componentProps = {
      onUpdate: (data) => handleDataUpdate(activeTab, data),
      onSave: (data) => handleSave(data, activeTab),
      isSaving
    };

    switch (activeTab) {
      case 'basic':
        return (
          <Component
            {...componentProps}
            profileData={profileData?.basic}
          />
        );
      case 'photos':
        return (
          <Component
            {...componentProps}
            photos={photos}
            onPhotosUpdate={handlePhotosUpdate}
          />
        );
      case 'family':
        return (
          <Component
            {...componentProps}
            familyData={profileData?.family}
          />
        );
      case 'education':
        return (
          <Component
            {...componentProps}
            educationData={profileData?.education}
          />
        );
      case 'preferences':
        return (
          <Component
            {...componentProps}
            preferencesData={profileData?.preferences}
          />
        );
      case 'privacy':
        return (
          <Component
            {...componentProps}
            privacyData={profileData?.privacy}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <UserNavigationBar />
      <div className="container mx-auto px-4 pb-20 pt-6">
        <NavigationBreadcrumbs />
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">My Profile Management</h1>
            <p className="text-muted-foreground">
              Create and manage your matrimonial profile to find your perfect match
            </p>
          </div>
          {/* Save Status */}
          {saveMessage && (
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg mt-2 lg:mt-0 ${
              saveMessage?.includes('Error') 
                ? 'bg-error/10 text-error' :'bg-success/10 text-success'
            }`}>
              <Icon 
                name={saveMessage?.includes('Error') ? 'AlertCircle' : 'CheckCircle'} 
                size={16} 
              />
              <span className="text-sm font-medium">{saveMessage}</span>
            </div>
          )}
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completion</span>
              <Icon name="ChartPie" size={16} className="text-primary" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-foreground">{calculateCompletionData()?.percentage}%</div>
              <div className="w-24 h-2 bg-muted rounded-full">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${calculateCompletionData()?.percentage}%` }} />
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Sections Done</span>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {calculateCompletionData()?.completedSections}/{calculateCompletionData()?.totalSections}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Photos</span>
              <Icon name="Camera" size={16} className="text-accent" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{photos?.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Profile Completion */}
          <div className="lg:col-span-1 order-2 lg:order-1 lg:sticky lg:top-16 self-start">
            <ProfileCompletionIndicator completionData={calculateCompletionData()} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <div className="flex overflow-x-auto space-x-1 pb-2">
                {tabs?.map((tab) => (
                  <Button
                    key={tab?.id}
                    variant={activeTab === tab?.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleTabChange(tab?.id)}
                    iconName={tab?.icon}
                    iconPosition="left"
                    className="whitespace-nowrap"
                  >
                    {tab?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Desktop Tab Navigation */}
            <div className="hidden lg:block mb-6">
              <div className="border-b border-border bg-muted/40 rounded-lg px-3">
                <nav className="flex space-x-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`flex items-center space-x-2 my-2 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {tabs?.find(tab => tab?.id === activeTab)?.label}
                </h2>
                {isSaving && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Saving...</span>
                  </div>
                )}
              </div>
              
              {renderActiveComponent()}
            </div>
          </div>

          {/* Right Column - Profile Preview */}
          <div className="lg:col-span-1 order-3 lg:sticky lg:top-16 self-start">
            <ProfilePreview 
              profileData={profileData?.basic} 
              photos={photos}
            />
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </PageContainer>
  );
};

export default MyProfileManagement;