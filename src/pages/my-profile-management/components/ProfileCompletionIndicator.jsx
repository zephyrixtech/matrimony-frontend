import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileCompletionIndicator = ({ completionData }) => {
  const mockCompletionData = {
    overallPercentage: 75,
    sections: [
      {
        name: 'Basic Information',
        percentage: 90,
        completed: true,
        items: ['Name', 'Age', 'Height', 'Religion'],
        missingItems: ['Weight']
      },
      {
        name: 'Photos',
        percentage: 60,
        completed: false,
        items: ['Profile Photo', 'Gallery Photo 1'],
        missingItems: ['Gallery Photo 2', 'Gallery Photo 3']
      },
      {
        name: 'Family Details',
        percentage: 80,
        completed: true,
        items: ['Father\'s Name', 'Family Type', 'Family Values'],
        missingItems: ['Mother\'s Occupation']
      },
      {
        name: 'Education & Career',
        percentage: 85,
        completed: true,
        items: ['Education', 'Occupation', 'Income'],
        missingItems: ['Work Location']
      },
      {
        name: 'Partner Preferences',
        percentage: 70,
        completed: false,
        items: ['Age Range', 'Height Range', 'Education'],
        missingItems: ['Location Preference', 'Lifestyle Preferences']
      },
      {
        name: 'Privacy Settings',
        percentage: 50,
        completed: false,
        items: ['Profile Visibility'],
        missingItems: ['Photo Privacy', 'Contact Privacy', 'Notifications']
      }
    ]
  };

  // Normalize incoming completion data to a consistent structure
  const sourceData = completionData || mockCompletionData;
  const normalizedSections = Array.isArray(sourceData?.sections)
    ? sourceData?.sections
    : (() => {
        if (!sourceData?.sections || typeof sourceData?.sections !== 'object') return mockCompletionData.sections;
        return Object.entries(sourceData.sections).map(([key, val]) => {
          const isBoolean = typeof val === 'boolean';
          const isObject = val && typeof val === 'object' && !Array.isArray(val);
          const completed = isBoolean ? val : isObject ? Object.keys(val).length > 0 : false;
          return {
            name: key === 'basic' ? 'Basic Information'
                 : key === 'photos' ? 'Photos'
                 : key === 'family' ? 'Family Details'
                 : key === 'education' ? 'Education & Career'
                 : key === 'preferences' ? 'Partner Preferences'
                 : key === 'privacy' ? 'Privacy Settings'
                 : key,
            percentage: completed ? 100 : 0,
            completed,
            items: [],
            missingItems: []
          };
        });
      })();
  const overall = typeof sourceData?.overallPercentage === 'number'
    ? sourceData?.overallPercentage
    : typeof sourceData?.percentage === 'number'
      ? sourceData?.percentage
      : Math.round((normalizedSections.filter(s => s.completed).length / Math.max(1, normalizedSections.length)) * 100);
  const data = { ...sourceData, sections: normalizedSections, overallPercentage: overall };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getCompletionBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Profile Completion</h2>
        <div className="flex items-center space-x-2">
          <div className={`text-2xl font-bold ${getCompletionColor(data?.overallPercentage)}`}>
            {data?.overallPercentage}%
          </div>
          <Icon 
            name={data?.overallPercentage >= 80 ? "CheckCircle" : "AlertCircle"} 
            size={24} 
            className={getCompletionColor(data?.overallPercentage)}
          />
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Overall Progress</span>
          <span>{data?.overallPercentage}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${getCompletionBgColor(data?.overallPercentage)}`}
            style={{ width: `${data?.overallPercentage}%` }}
          />
        </div>
      </div>
      {/* Section Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground mb-3">Section Details</h3>
        
        {data?.sections?.map((section, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={section?.completed ? "CheckCircle" : "Circle"} 
                  size={16} 
                  className={section?.completed ? "text-success" : "text-muted-foreground"}
                />
                <span className="font-medium text-foreground">{section?.name}</span>
              </div>
              <span className={`text-sm font-medium ${getCompletionColor(section?.percentage)}`}>
                {section?.percentage}%
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getCompletionBgColor(section?.percentage)}`}
                style={{ width: `${section?.percentage}%` }}
              />
            </div>
            
            {/* Completed Items */}
            {section?.items?.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground mb-1">Completed:</p>
                <div className="flex flex-wrap gap-1">
                  {section?.items?.map((item, itemIndex) => (
                    <span 
                      key={itemIndex}
                      className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full"
                    >
                      <Icon name="Check" size={10} className="mr-1" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Missing Items */}
            {section?.missingItems?.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Missing:</p>
                <div className="flex flex-wrap gap-1">
                  {section?.missingItems?.map((item, itemIndex) => (
                    <span 
                      key={itemIndex}
                      className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-xs rounded-full"
                    >
                      <Icon name="AlertCircle" size={10} className="mr-1" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Completion Tips */}
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} />
          <span>Tips to Complete Your Profile</span>
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Complete profiles get 3x more views than incomplete ones</li>
          <li>• Add multiple photos to increase your chances of finding matches</li>
          <li>• Detailed partner preferences help us find better matches</li>
          <li>• Verified profiles build more trust with potential partners</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCompletionIndicator;