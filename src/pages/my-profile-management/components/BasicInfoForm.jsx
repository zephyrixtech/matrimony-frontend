import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const BasicInfoForm = ({ profileData, onUpdate, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    dateOfBirth: profileData?.dateOfBirth || "",
    gender: profileData?.gender || "",
    height: profileData?.height || "",
    weight: profileData?.weight || "",
    maritalStatus: profileData?.maritalStatus || "",
    religion: profileData?.religion || "",
    caste: profileData?.caste || "",
    motherTongue: profileData?.motherTongue || "",
    physicalStatus: profileData?.physicalStatus || "",
    bodyType: profileData?.bodyType || "",
    complexion: profileData?.complexion || "",
    drinkingHabits: profileData?.drinkingHabits || "",
    smokingHabits: profileData?.smokingHabits || "",
    eatingHabits: profileData?.eatingHabits || "",
    aboutMe: profileData?.aboutMe || ""
  });

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const heightOptions = [
    { value: '4ft 6in', label: '4ft 6in (137 cm)' },
    { value: '4ft 7in', label: '4ft 7in (140 cm)' },
    { value: '4ft 8in', label: '4ft 8in (142 cm)' },
    { value: '4ft 9in', label: '4ft 9in (145 cm)' },
    { value: '4ft 10in', label: '4ft 10in (147 cm)' },
    { value: '4ft 11in', label: '4ft 11in (150 cm)' },
    { value: '5ft 0in', label: '5ft 0in (152 cm)' },
    { value: '5ft 1in', label: '5ft 1in (155 cm)' },
    { value: '5ft 2in', label: '5ft 2in (157 cm)' },
    { value: '5ft 3in', label: '5ft 3in (160 cm)' },
    { value: '5ft 4in', label: '5ft 4in (163 cm)' },
    { value: '5ft 5in', label: '5ft 5in (165 cm)' },
    { value: '5ft 6in', label: '5ft 6in (168 cm)' },
    { value: '5ft 7in', label: '5ft 7in (170 cm)' },
    { value: '5ft 8in', label: '5ft 8in (173 cm)' },
    { value: '5ft 9in', label: '5ft 9in (175 cm)' },
    { value: '5ft 10in', label: '5ft 10in (178 cm)' },
    { value: '5ft 11in', label: '5ft 11in (180 cm)' },
    { value: '6ft 0in', label: '6ft 0in (183 cm)' },
    { value: '6ft 1in', label: '6ft 1in (185 cm)' },
    { value: '6ft 2in', label: '6ft 2in (188 cm)' },
    { value: '6ft 3in', label: '6ft 3in (191 cm)' },
    { value: '6ft 4in', label: '6ft 4in (193 cm)' }
  ];

  const maritalStatusOptions = [
    { value: 'never_married', label: 'Never Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
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
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'assamese', label: 'Assamese' },
    { value: 'oriya', label: 'Oriya' }
  ];

  const physicalStatusOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'physically_challenged', label: 'Physically Challenged' }
  ];

  const bodyTypeOptions = [
    { value: 'slim', label: 'Slim' },
    { value: 'average', label: 'Average' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'heavy', label: 'Heavy' }
  ];

  const complexionOptions = [
    { value: 'very_fair', label: 'Very Fair' },
    { value: 'fair', label: 'Fair' },
    { value: 'wheatish', label: 'Wheatish' },
    { value: 'wheatish_brown', label: 'Wheatish Brown' },
    { value: 'dark', label: 'Dark' }
  ];

  const habitOptions = [
    { value: 'never', label: 'Never' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'regularly', label: 'Regularly' }
  ];

  const eatingHabitsOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'non_vegetarian', label: 'Non-Vegetarian' },
    { value: 'eggetarian', label: 'Eggetarian' },
    { value: 'vegan', label: 'Vegan' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData?.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData?.height) {
      newErrors.height = 'Height is required';
    }
    
    if (!formData?.maritalStatus) {
      newErrors.maritalStatus = 'Marital status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
        />
        
        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleInputChange('gender', value)}
          error={errors?.gender}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Height"
          options={heightOptions}
          value={formData?.height}
          onChange={(value) => handleInputChange('height', value)}
          error={errors?.height}
          searchable
          required
        />
        
        <Input
          label="Weight (kg)"
          type="number"
          placeholder="Enter weight"
          value={formData?.weight}
          onChange={(e) => handleInputChange('weight', e?.target?.value)}
        />
        
        <Select
          label="Marital Status"
          options={maritalStatusOptions}
          value={formData?.maritalStatus}
          onChange={(value) => handleInputChange('maritalStatus', value)}
          error={errors?.maritalStatus}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Religion"
          options={religionOptions}
          value={formData?.religion}
          onChange={(value) => handleInputChange('religion', value)}
          searchable
        />
        
        <Input
          label="Caste"
          type="text"
          placeholder="Enter your caste"
          value={formData?.caste}
          onChange={(e) => handleInputChange('caste', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Mother Tongue"
          options={motherTongueOptions}
          value={formData?.motherTongue}
          onChange={(value) => handleInputChange('motherTongue', value)}
          searchable
        />
        
        <Select
          label="Physical Status"
          options={physicalStatusOptions}
          value={formData?.physicalStatus}
          onChange={(value) => handleInputChange('physicalStatus', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Body Type"
          options={bodyTypeOptions}
          value={formData?.bodyType}
          onChange={(value) => handleInputChange('bodyType', value)}
        />
        
        <Select
          label="Complexion"
          options={complexionOptions}
          value={formData?.complexion}
          onChange={(value) => handleInputChange('complexion', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Drinking Habits"
          options={habitOptions}
          value={formData?.drinkingHabits}
          onChange={(value) => handleInputChange('drinkingHabits', value)}
        />
        
        <Select
          label="Smoking Habits"
          options={habitOptions}
          value={formData?.smokingHabits}
          onChange={(value) => handleInputChange('smokingHabits', value)}
        />
        
        <Select
          label="Eating Habits"
          options={eatingHabitsOptions}
          value={formData?.eatingHabits}
          onChange={(value) => handleInputChange('eatingHabits', value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          About Me
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Write a brief description about yourself..."
          value={formData?.aboutMe}
          onChange={(e) => handleInputChange('aboutMe', e?.target?.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData?.aboutMe?.length}/500 characters
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
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoForm;