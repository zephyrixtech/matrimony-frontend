import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileDetailModal = ({ profile, isOpen, onClose, onApprove, onReject, onRequestChanges }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [comment, setComment] = useState('');
  const [selectedFlags, setSelectedFlags] = useState([]);

  if (!isOpen || !profile) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'User' },
    { id: 'photos', label: 'Photos', icon: 'Image' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'verification', label: 'Verification', icon: 'Shield' }
  ];

  const verificationChecklist = [
    { id: 'photo_authentic', label: 'Photo Authenticity', status: profile?.photoAuthentic ? 'verified' : 'pending' },
    { id: 'age_verified', label: 'Age Verification', status: profile?.ageVerified ? 'verified' : 'pending' },
    { id: 'education_verified', label: 'Education Verification', status: profile?.educationVerified ? 'verified' : 'pending' },
    { id: 'profession_verified', label: 'Profession Verification', status: profile?.professionVerified ? 'verified' : 'pending' },
    { id: 'contact_verified', label: 'Contact Verification', status: profile?.contactVerified ? 'verified' : 'pending' }
  ];

  const handleFlagToggle = (flag) => {
    setSelectedFlags(prev => 
      prev?.includes(flag) 
        ? prev?.filter(f => f !== flag)
        : [...prev, flag]
    );
  };

  const handleAction = (action) => {
    const actionData = {
      profileId: profile?.id,
      comment: comment?.trim(),
      flags: selectedFlags
    };

    switch (action) {
      case 'approve':
        onApprove(actionData);
        break;
      case 'reject':
        onReject(actionData);
        break;
      case 'request_changes':
        onRequestChanges(actionData);
        break;
    }
    
    setComment('');
    setSelectedFlags([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Image
              src={profile?.profileImage}
              alt={`${profile?.name}'s profile`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">
                {profile?.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Profile ID: {profile?.id}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground font-medium">{profile?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <p className="text-foreground">{profile?.age} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-foreground">{profile?.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Religion</label>
                  <p className="text-foreground">{profile?.religion}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Education</label>
                  <p className="text-foreground">{profile?.education}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Profession</label>
                  <p className="text-foreground">{profile?.profession}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Annual Income</label>
                  <p className="text-foreground">{profile?.income}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marital Status</label>
                  <p className="text-foreground">{profile?.maritalStatus}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profile?.photos?.map((photo, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={photo?.url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} color="white" />
                    </Button>
                  </div>
                  {photo?.isPrimary && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              {profile?.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{doc?.type}</p>
                      <p className="text-sm text-muted-foreground">{doc?.filename}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      doc?.verified ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {doc?.verified ? 'Verified' : 'Pending'}
                    </span>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Verification Checklist</h3>
                <div className="space-y-3">
                  {verificationChecklist?.map((item) => (
                    <div key={item?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span className="font-medium text-foreground">{item?.label}</span>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                        item?.status === 'verified' 
                          ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                      }`}>
                        <Icon 
                          name={item?.status === 'verified' ? 'CheckCircle' : 'Clock'} 
                          size={14} 
                        />
                        <span className="capitalize">{item?.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Verification Flags</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Photo Quality Issue', 'Age Mismatch', 'Incomplete Information', 'Document Unclear', 'Duplicate Profile', 'Suspicious Activity']?.map((flag) => (
                    <label key={flag} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFlags?.includes(flag)}
                        onChange={() => handleFlagToggle(flag)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{flag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="mb-4">
            <Input
              label="Comments (Optional)"
              type="text"
              placeholder="Add comments for the user..."
              value={comment}
              onChange={(e) => setComment(e?.target?.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              iconName="Check"
              iconPosition="left"
              onClick={() => handleAction('approve')}
            >
              Approve Profile
            </Button>
            <Button
              variant="warning"
              iconName="MessageSquare"
              iconPosition="left"
              onClick={() => handleAction('request_changes')}
            >
              Request Changes
            </Button>
            <Button
              variant="danger"
              iconName="X"
              iconPosition="left"
              onClick={() => handleAction('reject')}
            >
              Reject Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailModal;