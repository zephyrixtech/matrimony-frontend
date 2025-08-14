import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PartnerPreferencesForm = ({ preferencesData, onUpdate, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    ageFrom: preferencesData?.ageFrom || "",
    ageTo: preferencesData?.ageTo || "",
    heightFrom: preferencesData?.heightFrom || "",
    heightTo: preferencesData?.heightTo || "",
    maritalStatus: preferencesData?.maritalStatus || [],
    religion: preferencesData?.religion || [],
    caste: preferencesData?.caste || "",
    motherTongue: preferencesData?.motherTongue || [],
    education: preferencesData?.education || [],
    occupation: preferencesData?.occupation || [],
    incomeFrom: preferencesData?.incomeFrom || "",
    location: preferencesData?.location || [],
    drinkingHabits: preferencesData?.drinkingHabits || [],
    smokingHabits: preferencesData?.smokingHabits || [],
    eatingHabits: preferencesData?.eatingHabits || [],
    aboutPartner: preferencesData?.aboutPartner || ""
  });

  const ageOptions = Array.from({ length: 43 }, (_, i) => ({
    value: (18 + i)?.toString(),
    label: (18 + i)?.toString()
  }));

  const heightOptions = [
    { value: '4ft 6in', label: '4ft 6in' },
    { value: '4ft 7in', label: '4ft 7in' },
    { value: '4ft 8in', label: '4ft 8in' },
    { value: '4ft 9in', label: '4ft 9in' },
    { value: '4ft 10in', label: '4ft 10in' },
    { value: '4ft 11in', label: '4ft 11in' },
    { value: '5ft 0in', label: '5ft 0in' },
    { value: '5ft 1in', label: '5ft 1in' },
    { value: '5ft 2in', label: '5ft 2in' },
    { value: '5ft 3in', label: '5ft 3in' },
    { value: '5ft 4in', label: '5ft 4in' },
    { value: '5ft 5in', label: '5ft 5in' },
    { value: '5ft 6in', label: '5ft 6in' },
    { value: '5ft 7in', label: '5ft 7in' },
    { value: '5ft 8in', label: '5ft 8in' },
    { value: '5ft 9in', label: '5ft 9in' },
    { value: '5ft 10in', label: '5ft 10in' },
    { value: '5ft 11in', label: '5ft 11in' },
    { value: '6ft 0in', label: '6ft 0in' },
    { value: '6ft 1in', label: '6ft 1in' },
    { value: '6ft 2in', label: '6ft 2in' },
    { value: '6ft 3in', label: '6ft 3in' },
    { value: '6ft 4in', label: '6ft 4in' }
  ];

  const maritalStatusOptions = [
    { value: 'never_married', label: 'Never Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const religionOptions = [
    { value: 'hindu', label: 'Hindu' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'christian', label: 'Christian' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'jain', label: 'Jain' },
    { value: 'parsi', label: 'Parsi' },
    { value: 'jewish', label: 'Jewish' },
    { value: 'other', label: 'Other' }
  ];

  const motherTongueOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'urdu', label: 'Urdu' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'malayalam', label: 'Malayalam' },
    { value: 'punjabi', label: 'Punjabi' }
  ];

  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: "Bachelor\'s Degree" },
    { value: 'masters', label: "Master\'s Degree" },
    { value: 'phd', label: 'PhD/Doctorate' },
    { value: 'professional', label: 'Professional Degree' }
  ];

  const occupationOptions = [
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'manager', label: 'Manager' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'business', label: 'Business Owner' },
    { value: 'government', label: 'Government Employee' },
    { value: 'other', label: 'Other' }
  ];

  const incomeOptions = [
    { value: 'no_preference', label: 'No Preference' },
    { value: 'below_25k', label: 'Below $25,000' },
    { value: '25k_50k', label: '$25,000 - $50,000' },
    { value: '50k_75k', label: '$50,000 - $75,000' },
    { value: '75k_100k', label: '$75,000 - $100,000' },
    { value: '100k_150k', label: '$100,000 - $150,000' },
    { value: '150k_200k', label: '$150,000 - $200,000' },
    { value: 'above_200k', label: 'Above $200,000' }
  ];

  const locationOptions = [
    { value: 'new_york', label: 'New York' },
    { value: 'california', label: 'California' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' },
    { value: 'illinois', label: 'Illinois' },
    { value: 'pennsylvania', label: 'Pennsylvania' },
    { value: 'ohio', label: 'Ohio' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'north_carolina', label: 'North Carolina' },
    { value: 'michigan', label: 'Michigan' }
  ];

  const habitOptions = [
    { value: 'never', label: 'Never' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'regularly', label: 'Regularly' },
    { value: 'no_preference', label: 'No Preference' }
  ];

  const eatingHabitsOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'non_vegetarian', label: 'Non-Vegetarian' },
    { value: 'eggetarian', label: 'Eggetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'no_preference', label: 'No Preference' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      {/* Basic Preferences */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="User" size={20} />
          <span>Basic Preferences</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select
              label="Age From"
              options={ageOptions}
              value={formData?.ageFrom}
              onChange={(value) => handleInputChange('ageFrom', value)}
              searchable
            />
            
            <Select
              label="Age To"
              options={ageOptions}
              value={formData?.ageTo}
              onChange={(value) => handleInputChange('ageTo', value)}
              searchable
            />
            
            <Select
              label="Height From"
              options={heightOptions}
              value={formData?.heightFrom}
              onChange={(value) => handleInputChange('heightFrom', value)}
              searchable
            />
            
            <Select
              label="Height To"
              options={heightOptions}
              value={formData?.heightTo}
              onChange={(value) => handleInputChange('heightTo', value)}
              searchable
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Marital Status"
              options={maritalStatusOptions}
              value={formData?.maritalStatus}
              onChange={(value) => handleInputChange('maritalStatus', value)}
              multiple
            />
            
            <Select
              label="Religion"
              options={religionOptions}
              value={formData?.religion}
              onChange={(value) => handleInputChange('religion', value)}
              multiple
              searchable
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Caste"
              type="text"
              placeholder="Enter preferred caste (optional)"
              value={formData?.caste}
              onChange={(e) => handleInputChange('caste', e?.target?.value)}
            />
            
            <Select
              label="Mother Tongue"
              options={motherTongueOptions}
              value={formData?.motherTongue}
              onChange={(value) => handleInputChange('motherTongue', value)}
              multiple
              searchable
            />
          </div>
        </div>
      </div>
      {/* Professional Preferences */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Briefcase" size={20} />
          <span>Professional Preferences</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Education"
              options={educationOptions}
              value={formData?.education}
              onChange={(value) => handleInputChange('education', value)}
              multiple
            />
            
            <Select
              label="Occupation"
              options={occupationOptions}
              value={formData?.occupation}
              onChange={(value) => handleInputChange('occupation', value)}
              multiple
              searchable
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Minimum Income"
              options={incomeOptions}
              value={formData?.incomeFrom}
              onChange={(value) => handleInputChange('incomeFrom', value)}
            />
            
            <Select
              label="Location"
              options={locationOptions}
              value={formData?.location}
              onChange={(value) => handleInputChange('location', value)}
              multiple
              searchable
            />
          </div>
        </div>
      </div>
      {/* Lifestyle Preferences */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Heart" size={20} />
          <span>Lifestyle Preferences</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Drinking Habits"
            options={habitOptions}
            value={formData?.drinkingHabits}
            onChange={(value) => handleInputChange('drinkingHabits', value)}
            multiple
          />
          
          <Select
            label="Smoking Habits"
            options={habitOptions}
            value={formData?.smokingHabits}
            onChange={(value) => handleInputChange('smokingHabits', value)}
            multiple
          />
          
          <Select
            label="Eating Habits"
            options={eatingHabitsOptions}
            value={formData?.eatingHabits}
            onChange={(value) => handleInputChange('eatingHabits', value)}
            multiple
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          About Your Ideal Partner
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Describe your ideal partner, their qualities, interests, and what you're looking for in a relationship..."
          value={formData?.aboutPartner}
          onChange={(e) => handleInputChange('aboutPartner', e?.target?.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData?.aboutPartner?.length}/500 characters
        </p>
      </div>
      <div className="flex justify-end pt-4">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PartnerPreferencesForm;