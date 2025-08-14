import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EducationCareerForm = ({ educationData, onUpdate, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    highestEducation: educationData?.highestEducation || "",
    educationDetails: educationData?.educationDetails || "",
    college: educationData?.college || "",
    workingWith: educationData?.workingWith || "",
    workingAs: educationData?.workingAs || "",
    employerName: educationData?.employerName || "",
    annualIncome: educationData?.annualIncome || "",
    workLocation: educationData?.workLocation || "",
    workExperience: educationData?.workExperience || "",
    aboutCareer: educationData?.aboutCareer || ""
  });

  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: "Bachelor\'s Degree" },
    { value: 'masters', label: "Master\'s Degree" },
    { value: 'phd', label: 'PhD/Doctorate' },
    { value: 'professional', label: 'Professional Degree' }
  ];

  const workingWithOptions = [
    { value: 'private_company', label: 'Private Company' },
    { value: 'government', label: 'Government/PSU' },
    { value: 'business', label: 'Business/Self Employed' },
    { value: 'not_working', label: 'Not Working' }
  ];

  const workingAsOptions = [
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'manager', label: 'Manager' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'designer', label: 'Designer' },
    { value: 'sales', label: 'Sales Professional' },
    { value: 'marketing', label: 'Marketing Professional' },
    { value: 'finance', label: 'Finance Professional' },
    { value: 'hr', label: 'HR Professional' },
    { value: 'other', label: 'Other' }
  ];

  const incomeOptions = [
    { value: 'no_income', label: 'No Income' },
    { value: 'below_25k', label: 'Below $25,000' },
    { value: '25k_50k', label: '$25,000 - $50,000' },
    { value: '50k_75k', label: '$50,000 - $75,000' },
    { value: '75k_100k', label: '$75,000 - $100,000' },
    { value: '100k_150k', label: '$100,000 - $150,000' },
    { value: '150k_200k', label: '$150,000 - $200,000' },
    { value: 'above_200k', label: 'Above $200,000' }
  ];

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: '1_2_years', label: '1-2 years' },
    { value: '3_5_years', label: '3-5 years' },
    { value: '6_10_years', label: '6-10 years' },
    { value: '11_15_years', label: '11-15 years' },
    { value: 'above_15_years', label: 'Above 15 years' }
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
      {/* Education Section */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="GraduationCap" size={20} />
          <span>Education Details</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Highest Education"
              options={educationOptions}
              value={formData?.highestEducation}
              onChange={(value) => handleInputChange('highestEducation', value)}
            />
            
            <Input
              label="Education Details"
              type="text"
              placeholder="e.g., B.Tech in Computer Science"
              value={formData?.educationDetails}
              onChange={(e) => handleInputChange('educationDetails', e?.target?.value)}
            />
          </div>
          
          <Input
            label="College/University"
            type="text"
            placeholder="Enter college or university name"
            value={formData?.college}
            onChange={(e) => handleInputChange('college', e?.target?.value)}
          />
        </div>
      </div>
      {/* Career Section */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Briefcase" size={20} />
          <span>Career Details</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Working With"
              options={workingWithOptions}
              value={formData?.workingWith}
              onChange={(value) => handleInputChange('workingWith', value)}
            />
            
            <Select
              label="Working As"
              options={workingAsOptions}
              value={formData?.workingAs}
              onChange={(value) => handleInputChange('workingAs', value)}
              searchable
              disabled={formData?.workingWith === 'not_working'}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Employer Name"
              type="text"
              placeholder="Enter company/organization name"
              value={formData?.employerName}
              onChange={(e) => handleInputChange('employerName', e?.target?.value)}
              disabled={formData?.workingWith === 'not_working'}
            />
            
            <Input
              label="Work Location"
              type="text"
              placeholder="Enter work location"
              value={formData?.workLocation}
              onChange={(e) => handleInputChange('workLocation', e?.target?.value)}
              disabled={formData?.workingWith === 'not_working'}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Annual Income"
              options={incomeOptions}
              value={formData?.annualIncome}
              onChange={(value) => handleInputChange('annualIncome', value)}
            />
            
            <Select
              label="Work Experience"
              options={experienceOptions}
              value={formData?.workExperience}
              onChange={(value) => handleInputChange('workExperience', value)}
              disabled={formData?.workingWith === 'not_working'}
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          About Career
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Describe your career goals, achievements, and professional aspirations..."
          value={formData?.aboutCareer}
          onChange={(e) => handleInputChange('aboutCareer', e?.target?.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData?.aboutCareer?.length}/500 characters
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

export default EducationCareerForm;