import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  onToggleFilters,
  activeFilterCount,
  resultsCount,
  isLoading 
}) => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'lastActive', label: 'Recently Active' },
    { value: 'premium', label: 'Premium Members' },
    { value: 'compatibility', label: 'Best Match' },
    { value: 'distance', label: 'Nearest First' }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    // Search is handled by onChange, but we can add additional logic here
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      <div className="p-4 space-y-4">
        {/* Main Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              type="search"
              placeholder="Search by name, profession, location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
          
          {/* Filter Toggle (Mobile) */}
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="lg:hidden relative"
            iconName="Filter"
            iconSize={18}
          >
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Advanced Search Toggle */}
          <Button
            variant={isAdvancedSearch ? "default" : "outline"}
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            iconName="Settings"
            iconSize={18}
          >
            <span className="hidden sm:inline ml-2">Advanced</span>
          </Button>
        </form>

        {/* Advanced Search Options */}
        {isAdvancedSearch && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-muted/50 rounded-lg">
            <Input
              label="Min Age"
              type="number"
              placeholder="18"
              min="18"
              max="80"
            />
            <Input
              label="Max Age"
              type="number"
              placeholder="35"
              min="18"
              max="80"
            />
            <Input
              label="Location"
              type="text"
              placeholder="City, State"
            />
            <Input
              label="Profession"
              type="text"
              placeholder="Engineer, Doctor..."
            />
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : (
                <span>
                  {resultsCount?.toLocaleString()} profiles found
                  {searchQuery && ` for "${searchQuery}"`}
                </span>
              )}
            </div>
            
            {/* Active Filters Indicator (Desktop) */}
            {activeFilterCount > 0 && (
              <div className="hidden lg:flex items-center space-x-2 text-sm text-primary">
                <Icon name="Filter" size={16} />
                <span>{activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active</span>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="min-w-[140px]"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Crown"
            iconSize={14}
          >
            Premium Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCircle"
            iconSize={14}
          >
            Verified Profiles
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Camera"
            iconSize={14}
          >
            With Photos
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Clock"
            iconSize={14}
          >
            Active Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;