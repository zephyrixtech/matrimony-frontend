import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Age range
    if (filters?.minAge || filters?.maxAge) {
      const ageText = `Age: ${filters?.minAge || '18'} - ${filters?.maxAge || '80'}`;
      chips?.push({
        key: 'age',
        label: ageText,
        onRemove: () => {
          onRemoveFilter('minAge');
          onRemoveFilter('maxAge');
        }
      });
    }

    // Location
    if (filters?.location && filters?.location?.length > 0) {
      const locationText = filters?.location?.length === 1 
        ? filters?.location?.[0] 
        : `${filters?.location?.length} locations`;
      chips?.push({
        key: 'location',
        label: `Location: ${locationText}`,
        onRemove: () => onRemoveFilter('location')
      });
    }

    // Education
    if (filters?.education && filters?.education?.length > 0) {
      const educationText = filters?.education?.length === 1 
        ? filters?.education?.[0] 
        : `${filters?.education?.length} education levels`;
      chips?.push({
        key: 'education',
        label: `Education: ${educationText}`,
        onRemove: () => onRemoveFilter('education')
      });
    }

    // Profession
    if (filters?.profession && filters?.profession?.length > 0) {
      const professionText = filters?.profession?.length === 1 
        ? filters?.profession?.[0] 
        : `${filters?.profession?.length} professions`;
      chips?.push({
        key: 'profession',
        label: `Profession: ${professionText}`,
        onRemove: () => onRemoveFilter('profession')
      });
    }

    // Religion
    if (filters?.religion && filters?.religion?.length > 0) {
      const religionText = filters?.religion?.length === 1 
        ? filters?.religion?.[0] 
        : `${filters?.religion?.length} religions`;
      chips?.push({
        key: 'religion',
        label: `Religion: ${religionText}`,
        onRemove: () => onRemoveFilter('religion')
      });
    }

    // Caste
    if (filters?.caste) {
      chips?.push({
        key: 'caste',
        label: `Caste: ${filters?.caste}`,
        onRemove: () => onRemoveFilter('caste')
      });
    }

    // Salary
    if (filters?.salary) {
      chips?.push({
        key: 'salary',
        label: `Income: ${filters?.salary}`,
        onRemove: () => onRemoveFilter('salary')
      });
    }

    // Height
    if (filters?.height) {
      chips?.push({
        key: 'height',
        label: `Height: ${filters?.height}`,
        onRemove: () => onRemoveFilter('height')
      });
    }

    // Marital Status
    if (filters?.maritalStatus && filters?.maritalStatus?.length > 0) {
      const statusText = filters?.maritalStatus?.length === 1 
        ? filters?.maritalStatus?.[0]?.replace('_', ' ') 
        : `${filters?.maritalStatus?.length} statuses`;
      chips?.push({
        key: 'maritalStatus',
        label: `Status: ${statusText}`,
        onRemove: () => onRemoveFilter('maritalStatus')
      });
    }

    // Body Type
    if (filters?.bodyType && filters?.bodyType?.length > 0) {
      const bodyText = filters?.bodyType?.length === 1 
        ? filters?.bodyType?.[0] 
        : `${filters?.bodyType?.length} body types`;
      chips?.push({
        key: 'bodyType',
        label: `Body: ${bodyText}`,
        onRemove: () => onRemoveFilter('bodyType')
      });
    }

    // Smoking
    if (filters?.smoking && filters?.smoking?.length > 0) {
      const smokingText = filters?.smoking?.includes('no') ? 'Non-smoker' : 'Smoking preferences';
      chips?.push({
        key: 'smoking',
        label: `Smoking: ${smokingText}`,
        onRemove: () => onRemoveFilter('smoking')
      });
    }

    // Drinking
    if (filters?.drinking && filters?.drinking?.length > 0) {
      const drinkingText = filters?.drinking?.includes('no') ? 'Non-drinker' : 'Drinking preferences';
      chips?.push({
        key: 'drinking',
        label: `Drinking: ${drinkingText}`,
        onRemove: () => onRemoveFilter('drinking')
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips?.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/50 border-b border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Active Filters ({filterChips?.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconSize={14}
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterChips?.map((chip) => (
          <div
            key={chip?.key}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
          >
            <span>{chip?.label}</span>
            <button
              onClick={chip?.onRemove}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;