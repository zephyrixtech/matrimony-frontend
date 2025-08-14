import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  activeFilterCount 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    location: false,
    education: false,
    profession: false,
    religion: false,
    physical: false,
    lifestyle: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const ageOptions = Array.from({ length: 40 }, (_, i) => ({
    value: (18 + i)?.toString(),
    label: `${18 + i} years`
  }));

  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'ahmedabad', label: 'Ahmedabad' }
  ];

  const educationOptions = [
    { value: 'bachelors', label: "Bachelor\'s Degree" },
    { value: 'masters', label: "Master\'s Degree" },
    { value: 'phd', label: 'PhD/Doctorate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'professional', label: 'Professional Degree' }
  ];

  const professionOptions = [
    { value: 'engineer', label: 'Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'business', label: 'Business Owner' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' }
  ];

  const religionOptions = [
    { value: 'hindu', label: 'Hindu' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'christian', label: 'Christian' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'jain', label: 'Jain' }
  ];

  const salaryOptions = [
    { value: '0-25000', label: 'Below $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000-75000', label: '$50,000 - $75,000' },
    { value: '75000-100000', label: '$75,000 - $100,000' },
    { value: '100000+', label: 'Above $100,000' }
  ];

  const heightOptions = [
    { value: '4.5-5.0', label: "4\'6\" - 5\'0\"" },
    { value: '5.0-5.5', label: "5\'0\" - 5\'6\"" },
    { value: '5.5-6.0', label: "5\'6\" - 6\'0\"" },
    { value: '6.0+', label: "Above 6\'0\"" }
  ];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="font-medium text-foreground">{title}</span>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="mt-3 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-[85vw] max-w-sm bg-card border-r border-border shadow-elevated transform transition-transform duration-300
        lg:sticky lg:top-16 lg:self-start lg:h-[calc(100vh-4rem)] lg:shadow-none lg:w-80 lg:transform-none lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h2 className="font-heading font-semibold text-lg">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              disabled={activeFilterCount === 0}
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Basic Information */}
          <FilterSection title="Basic Information" sectionKey="basic">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Min Age"
                options={ageOptions}
                value={filters?.minAge}
                onChange={(value) => onFilterChange('minAge', value)}
                placeholder="Min"
              />
              <Select
                label="Max Age"
                options={ageOptions}
                value={filters?.maxAge}
                onChange={(value) => onFilterChange('maxAge', value)}
                placeholder="Max"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Marital Status</label>
              <div className="space-y-2">
                <Checkbox
                  label="Never Married"
                  checked={filters?.maritalStatus?.includes('never_married')}
                  onChange={(e) => {
                    const current = filters?.maritalStatus || [];
                    const updated = e?.target?.checked 
                      ? [...current, 'never_married']
                      : current?.filter(s => s !== 'never_married');
                    onFilterChange('maritalStatus', updated);
                  }}
                />
                <Checkbox
                  label="Divorced"
                  checked={filters?.maritalStatus?.includes('divorced')}
                  onChange={(e) => {
                    const current = filters?.maritalStatus || [];
                    const updated = e?.target?.checked 
                      ? [...current, 'divorced']
                      : current?.filter(s => s !== 'divorced');
                    onFilterChange('maritalStatus', updated);
                  }}
                />
                <Checkbox
                  label="Widowed"
                  checked={filters?.maritalStatus?.includes('widowed')}
                  onChange={(e) => {
                    const current = filters?.maritalStatus || [];
                    const updated = e?.target?.checked 
                      ? [...current, 'widowed']
                      : current?.filter(s => s !== 'widowed');
                    onFilterChange('maritalStatus', updated);
                  }}
                />
              </div>
            </div>
          </FilterSection>

          {/* Location */}
          <FilterSection title="Location" sectionKey="location">
            <Select
              label="City"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => onFilterChange('location', value)}
              placeholder="Select city"
              searchable
              multiple
            />
          </FilterSection>

          {/* Education */}
          <FilterSection title="Education" sectionKey="education">
            <Select
              label="Education Level"
              options={educationOptions}
              value={filters?.education}
              onChange={(value) => onFilterChange('education', value)}
              placeholder="Select education"
              multiple
            />
          </FilterSection>

          {/* Profession */}
          <FilterSection title="Profession" sectionKey="profession">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Profession"
                options={professionOptions}
                value={filters?.profession}
                onChange={(value) => onFilterChange('profession', value)}
                placeholder="Select profession"
                multiple
                searchable
              />
              <Select
                label="Annual Income"
                options={salaryOptions}
                value={filters?.salary}
                onChange={(value) => onFilterChange('salary', value)}
                placeholder="Select income range"
              />
            </div>
          </FilterSection>

          {/* Religion */}
          <FilterSection title="Religion & Caste" sectionKey="religion">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Religion"
                options={religionOptions}
                value={filters?.religion}
                onChange={(value) => onFilterChange('religion', value)}
                placeholder="Select religion"
                multiple
              />
              <Input
                label="Caste"
                type="text"
                placeholder="Enter caste (optional)"
                value={filters?.caste || ''}
                onChange={(e) => onFilterChange('caste', e?.target?.value)}
              />
            </div>
          </FilterSection>

          {/* Physical Attributes */}
          <FilterSection title="Physical Attributes" sectionKey="physical">
            <Select
              label="Height"
              options={heightOptions}
              value={filters?.height}
              onChange={(value) => onFilterChange('height', value)}
              placeholder="Select height range"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Body Type</label>
              <div className="space-y-2">
                <Checkbox
                  label="Slim"
                  checked={filters?.bodyType?.includes('slim')}
                  onChange={(e) => {
                    const current = filters?.bodyType || [];
                    const updated = e?.target?.checked 
                      ? [...current, 'slim']
                      : current?.filter(t => t !== 'slim');
                    onFilterChange('bodyType', updated);
                  }}
                />
                <Checkbox
                  label="Average"
                  checked={filters?.bodyType?.includes('average')}
                  onChange={(e) => {
                    const current = filters?.bodyType || [];
                    const updated = e?.target?.checked 
                      ? [...current, 'average']
                      : current?.filter(t => t !== 'average');
                    onFilterChange('bodyType', updated);
                  }}
                />
                <Checkbox
                  label="Athletic"
                  checked={filters?.bodyType?.includes('athletic')}
                  onChange={(e) => {
                    const current = filters?.bodyType || [];
                    const updated = e?.target?.checked 
                      ? [...current, 'athletic']
                      : current?.filter(t => t !== 'athletic');
                    onFilterChange('bodyType', updated);
                  }}
                />
              </div>
            </div>
          </FilterSection>

          {/* Lifestyle */}
          <FilterSection title="Lifestyle Preferences" sectionKey="lifestyle">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Smoking</label>
                <div className="space-y-2">
                  <Checkbox
                    label="Non-smoker"
                    checked={filters?.smoking?.includes('no')}
                    onChange={(e) => {
                      const current = filters?.smoking || [];
                      const updated = e?.target?.checked 
                        ? [...current, 'no']
                        : current?.filter(s => s !== 'no');
                      onFilterChange('smoking', updated);
                    }}
                  />
                  <Checkbox
                    label="Occasional"
                    checked={filters?.smoking?.includes('occasional')}
                    onChange={(e) => {
                      const current = filters?.smoking || [];
                      const updated = e?.target?.checked 
                        ? [...current, 'occasional']
                        : current?.filter(s => s !== 'occasional');
                      onFilterChange('smoking', updated);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Drinking</label>
                <div className="space-y-2">
                  <Checkbox
                    label="Non-drinker"
                    checked={filters?.drinking?.includes('no')}
                    onChange={(e) => {
                      const current = filters?.drinking || [];
                      const updated = e?.target?.checked 
                        ? [...current, 'no']
                        : current?.filter(d => d !== 'no');
                      onFilterChange('drinking', updated);
                    }}
                  />
                  <Checkbox
                    label="Social drinker"
                    checked={filters?.drinking?.includes('social')}
                    onChange={(e) => {
                      const current = filters?.drinking || [];
                      const updated = e?.target?.checked 
                        ? [...current, 'social']
                        : current?.filter(d => d !== 'social');
                      onFilterChange('drinking', updated);
                    }}
                  />
                </div>
              </div>
            </div>
          </FilterSection>
        </div>

        {/* Apply Button (Mobile) */}
        <div className="lg:hidden p-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;