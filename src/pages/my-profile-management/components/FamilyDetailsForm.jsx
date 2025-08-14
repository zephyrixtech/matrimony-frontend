import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FamilyDetailsForm = ({ familyData, onUpdate, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    fatherName: familyData?.fatherName || "",
    fatherOccupation: familyData?.fatherOccupation || "",
    motherName: familyData?.motherName || "",
    motherOccupation: familyData?.motherOccupation || "",
    familyType: familyData?.familyType || "",
    familyStatus: familyData?.familyStatus || "",
    familyValues: familyData?.familyValues || "",
    brothers: familyData?.brothers || "",
    brothersMarried: familyData?.brothersMarried || "",
    sisters: familyData?.sisters || "",
    sistersMarried: familyData?.sistersMarried || "",
    familyLocation: familyData?.familyLocation || "",
    nativePlace: familyData?.nativePlace || "",
    aboutFamily: familyData?.aboutFamily || ""
  });

  const familyTypeOptions = [
    { value: 'nuclear', label: 'Nuclear Family' },
    { value: 'joint', label: 'Joint Family' }
  ];

  const familyStatusOptions = [
    { value: 'middle_class', label: 'Middle Class' },
    { value: 'upper_middle_class', label: 'Upper Middle Class' },
    { value: 'rich', label: 'Rich' },
    { value: 'affluent', label: 'Affluent' }
  ];

  const familyValuesOptions = [
    { value: 'orthodox', label: 'Orthodox' },
    { value: 'traditional', label: 'Traditional' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'liberal', label: 'Liberal' }
  ];

  const siblingCountOptions = [
    { value: '0', label: 'None' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5+', label: '5 or more' }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Father's Name"
          type="text"
          placeholder="Enter father's name"
          value={formData?.fatherName}
          onChange={(e) => handleInputChange('fatherName', e?.target?.value)}
        />
        
        <Input
          label="Father's Occupation"
          type="text"
          placeholder="Enter father's occupation"
          value={formData?.fatherOccupation}
          onChange={(e) => handleInputChange('fatherOccupation', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Mother's Name"
          type="text"
          placeholder="Enter mother's name"
          value={formData?.motherName}
          onChange={(e) => handleInputChange('motherName', e?.target?.value)}
        />
        
        <Input
          label="Mother's Occupation"
          type="text"
          placeholder="Enter mother's occupation"
          value={formData?.motherOccupation}
          onChange={(e) => handleInputChange('motherOccupation', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Family Type"
          options={familyTypeOptions}
          value={formData?.familyType}
          onChange={(value) => handleInputChange('familyType', value)}
        />
        
        <Select
          label="Family Status"
          options={familyStatusOptions}
          value={formData?.familyStatus}
          onChange={(value) => handleInputChange('familyStatus', value)}
        />
        
        <Select
          label="Family Values"
          options={familyValuesOptions}
          value={formData?.familyValues}
          onChange={(value) => handleInputChange('familyValues', value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Select
          label="Brothers"
          options={siblingCountOptions}
          value={formData?.brothers}
          onChange={(value) => handleInputChange('brothers', value)}
        />
        
        <Select
          label="Brothers Married"
          options={siblingCountOptions}
          value={formData?.brothersMarried}
          onChange={(value) => handleInputChange('brothersMarried', value)}
          disabled={!formData?.brothers || formData?.brothers === '0'}
        />
        
        <Select
          label="Sisters"
          options={siblingCountOptions}
          value={formData?.sisters}
          onChange={(value) => handleInputChange('sisters', value)}
        />
        
        <Select
          label="Sisters Married"
          options={siblingCountOptions}
          value={formData?.sistersMarried}
          onChange={(value) => handleInputChange('sistersMarried', value)}
          disabled={!formData?.sisters || formData?.sisters === '0'}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Family Location"
          type="text"
          placeholder="Enter family location"
          value={formData?.familyLocation}
          onChange={(e) => handleInputChange('familyLocation', e?.target?.value)}
        />
        
        <Input
          label="Native Place"
          type="text"
          placeholder="Enter native place"
          value={formData?.nativePlace}
          onChange={(e) => handleInputChange('nativePlace', e?.target?.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          About Family
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Write about your family background, values, and traditions..."
          value={formData?.aboutFamily}
          onChange={(e) => handleInputChange('aboutFamily', e?.target?.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData?.aboutFamily?.length}/500 characters
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

export default FamilyDetailsForm;