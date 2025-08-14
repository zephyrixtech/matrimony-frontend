import React, { useState, useRef } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PhotoUploadSection = ({ photos = [], onPhotosUpdate, maxPhotos = 6 }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const mockPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isProfile: true,
      isVerified: true
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      isProfile: false,
      isVerified: false
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isProfile: false,
      isVerified: true
    }
  ];

  const currentPhotos = photos?.length > 0 ? photos : mockPhotos;

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileUpload(files);
  };

  const handleFileUpload = async (files) => {
    if (currentPhotos?.length + files?.length > maxPhotos) {
      alert(`You can only upload up to ${maxPhotos} photos`);
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newPhotos = files?.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        isProfile: currentPhotos?.length === 0 && index === 0,
        isVerified: false,
        file: file
      }));
      
      onPhotosUpdate([...currentPhotos, ...newPhotos]);
      setUploading(false);
    }, 2000);
  };

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = currentPhotos?.filter(photo => photo?.id !== photoId);
    onPhotosUpdate(updatedPhotos);
  };

  const handleSetProfilePhoto = (photoId) => {
    const updatedPhotos = currentPhotos?.map(photo => ({
      ...photo,
      isProfile: photo?.id === photoId
    }));
    onPhotosUpdate(updatedPhotos);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Your Photos
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your photos here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Maximum {maxPhotos} photos • JPG, PNG up to 10MB each
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={openFileDialog}
            iconName="Plus"
            iconPosition="left"
            disabled={uploading || currentPhotos?.length >= maxPhotos}
          >
            {uploading ? 'Uploading...' : 'Choose Photos'}
          </Button>
        </div>
      </div>
      {/* Photo Gallery */}
      {currentPhotos?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Your Photos ({currentPhotos?.length}/{maxPhotos})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentPhotos?.map((photo) => (
              <div key={photo?.id} className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg border border-border">
                  <Image
                    src={photo?.url}
                    alt="Profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Photo Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {photo?.isProfile && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Profile
                    </span>
                  )}
                  {photo?.isVerified && (
                    <span className="bg-success text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                
                {/* Photo Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                  {!photo?.isProfile && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSetProfilePhoto(photo?.id)}
                      iconName="Star"
                    >
                      Set as Profile
                    </Button>
                  )}
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePhoto(photo?.id)}
                    iconName="Trash2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Photo Guidelines */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>Photo Guidelines</span>
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Upload clear, recent photos of yourself</li>
          <li>• First photo will be your profile picture</li>
          <li>• Photos are reviewed for authenticity</li>
          <li>• Avoid group photos or photos with sunglasses</li>
          <li>• Professional or casual photos work best</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoUploadSection;