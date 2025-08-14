import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoGallery = ({ photos = [], profileName = "Profile" }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos?.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos?.length) % photos?.length);
  };

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  if (!photos?.length) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <Icon name="User" size={64} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Main Photo */}
        <div className="relative aspect-square bg-muted">
          <Image
            src={photos?.[currentPhotoIndex]}
            alt={`${profileName} - Photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={openFullScreen}
          />
          
          {/* Navigation Arrows */}
          {photos?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
                onClick={prevPhoto}
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
                onClick={nextPhoto}
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-caption">
            {currentPhotoIndex + 1} / {photos?.length}
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
            onClick={openFullScreen}
          >
            <Icon name="Expand" size={20} />
          </Button>
        </div>

        {/* Thumbnail Strip */}
        {photos?.length > 1 && (
          <div className="p-4 bg-background">
            <div className="flex space-x-2 overflow-x-auto">
              {photos?.map((photo, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentPhotoIndex
                      ? 'border-primary' :'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setCurrentPhotoIndex(index)}
                >
                  <Image
                    src={photo}
                    alt={`${profileName} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Full Screen Modal */}
      {isFullScreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 w-12 h-12 z-10"
              onClick={closeFullScreen}
            >
              <Icon name="X" size={24} />
            </Button>

            {/* Navigation */}
            {photos?.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
                  onClick={prevPhoto}
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
                  onClick={nextPhoto}
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </>
            )}

            {/* Full Screen Image */}
            <div className="max-w-4xl max-h-full">
              <Image
                src={photos?.[currentPhotoIndex]}
                alt={`${profileName} - Full Screen Photo ${currentPhotoIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-caption">
              {currentPhotoIndex + 1} / {photos?.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePhotoGallery;