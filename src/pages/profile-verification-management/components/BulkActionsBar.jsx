import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ selectedProfiles, onBulkAction, onClearSelection }) => {
  const [bulkAction, setBulkAction] = useState('');

  const actionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'approve', label: 'Approve Selected' },
    { value: 'reject', label: 'Reject Selected' },
    { value: 'request_changes', label: 'Request Changes' },
    { value: 'export', label: 'Export Selected' }
  ];

  const handleBulkAction = () => {
    if (bulkAction && selectedProfiles?.length > 0) {
      onBulkAction(bulkAction, selectedProfiles);
      setBulkAction('');
    }
  };

  if (selectedProfiles?.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedProfiles?.length} profile{selectedProfiles?.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={actionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              className="min-w-48"
            />
            
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={handleBulkAction}
              disabled={!bulkAction}
            >
              Apply Action
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={onClearSelection}
        >
          Clear Selection
        </Button>
      </div>
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-primary/20">
        <Button
          variant="success"
          size="sm"
          iconName="Check"
          iconPosition="left"
          onClick={() => onBulkAction('approve', selectedProfiles)}
        >
          Approve All ({selectedProfiles?.length})
        </Button>
        
        <Button
          variant="danger"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={() => onBulkAction('reject', selectedProfiles)}
        >
          Reject All ({selectedProfiles?.length})
        </Button>
        
        <Button
          variant="warning"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          onClick={() => onBulkAction('request_changes', selectedProfiles)}
        >
          Request Changes ({selectedProfiles?.length})
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={() => onBulkAction('export', selectedProfiles)}
        >
          Export Selected
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;