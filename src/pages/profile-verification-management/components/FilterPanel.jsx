import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, profileCounts }) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'changes_requested', label: 'Changes Requested' }
  ];

  const completionOptions = [
    { value: 'all', label: 'All Completion Levels' },
    { value: 'complete', label: 'Complete (100%)' },
    { value: 'high', label: 'High (80-99%)' },
    { value: 'medium', label: 'Medium (50-79%)' },
    { value: 'low', label: 'Low (<50%)' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'completion_high', label: 'Completion High-Low' },
    { value: 'completion_low', label: 'Completion Low-High' }
  ];

  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Filter & Search Profiles
        </h2>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
      {/* Profile Counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <div className="text-2xl font-bold text-warning">{profileCounts?.pending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-2xl font-bold text-success">{profileCounts?.approved}</div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </div>
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <div className="text-2xl font-bold text-error">{profileCounts?.rejected}</div>
          <div className="text-sm text-muted-foreground">Rejected</div>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="text-2xl font-bold text-accent">{profileCounts?.changesRequested}</div>
          <div className="text-sm text-muted-foreground">Changes Req.</div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          label="Search by Name"
          type="search"
          placeholder="Enter name to search..."
          value={filters?.searchTerm}
          onChange={(e) => handleInputChange('searchTerm', e?.target?.value)}
        />

        <Select
          label="Verification Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleInputChange('status', value)}
        />

        <Select
          label="Profile Completion"
          options={completionOptions}
          value={filters?.completion}
          onChange={(value) => handleInputChange('completion', value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleInputChange('sortBy', value)}
        />
      </div>
      {/* Date Range Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Submitted From"
          type="date"
          value={filters?.dateFrom}
          onChange={(e) => handleInputChange('dateFrom', e?.target?.value)}
        />

        <Input
          label="Submitted To"
          type="date"
          value={filters?.dateTo}
          onChange={(e) => handleInputChange('dateTo', e?.target?.value)}
        />
      </div>
      {/* Active Filters Display */}
      {(filters?.searchTerm || filters?.status !== 'all' || filters?.completion !== 'all' || filters?.dateFrom || filters?.dateTo) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters?.searchTerm && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  Name: "{filters?.searchTerm}"
                </span>
              )}
              {filters?.status !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
                </span>
              )}
              {filters?.completion !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  Completion: {completionOptions?.find(opt => opt?.value === filters?.completion)?.label}
                </span>
              )}
              {filters?.dateFrom && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  From: {filters?.dateFrom}
                </span>
              )}
              {filters?.dateTo && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  To: {filters?.dateTo}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;