import React, { useState, useEffect, useCallback } from 'react';
import ProfileCard from './ProfileCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileGrid = ({ 
  profiles, 
  isLoading, 
  hasMore, 
  onLoadMore, 
  onFavorite, 
  onContact 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  }, [loadingMore, hasMore, onLoadMore]);

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement?.scrollTop
        >= document.documentElement?.offsetHeight - 1000
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-8" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>
        <div className="h-2 bg-muted rounded w-full" />
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded flex-1" />
          <div className="h-8 bg-muted rounded flex-1" />
        </div>
      </div>
    </div>
  );

  // Empty state
  if (!isLoading && profiles?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={48} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          No profiles found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find any profiles matching your criteria. Try adjusting your filters or search terms.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Reset Filters
          </Button>
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
          >
            Browse All Profiles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {profiles?.map((profile) => (
          <ProfileCard
            key={profile?.id}
            profile={profile}
            onFavorite={onFavorite}
            onContact={onContact}
          />
        ))}
        
        {/* Loading skeletons */}
        {(isLoading || loadingMore) && (
          <>
            {Array.from({ length: 6 })?.map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>
      {/* Load More Button */}
      {!isLoading && hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            loading={loadingMore}
            iconName="ChevronDown"
            iconPosition="right"
          >
            {loadingMore ? 'Loading more profiles...' : 'Load More Profiles'}
          </Button>
        </div>
      )}
      {/* End of results message */}
      {!isLoading && !hasMore && profiles?.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm">You've seen all available profiles</span>
          </div>
        </div>
      )}
      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-full shadow-lg"
        >
          <Icon name="ChevronUp" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileGrid;