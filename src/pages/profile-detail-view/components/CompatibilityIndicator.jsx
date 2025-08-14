import React from 'react';
import Icon from '../../../components/AppIcon';

const CompatibilityIndicator = ({ compatibilityScore = 85, matchingCriteria = [] }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Compatibility Score
      </h3>
      {/* Overall Score */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - compatibilityScore / 100)}`}
              className={getScoreColor(compatibilityScore)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-heading font-bold ${getScoreColor(compatibilityScore)}`}>
              {compatibilityScore}%
            </span>
          </div>
        </div>
        <p className="text-sm font-body text-muted-foreground">
          Compatibility Match
        </p>
      </div>
      {/* Matching Criteria */}
      <div className="space-y-3">
        <h4 className="text-sm font-body font-medium text-foreground">
          Matching Criteria
        </h4>
        {matchingCriteria?.map((criteria, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={criteria?.match ? "Check" : "X"} 
                size={16} 
                className={criteria?.match ? "text-success" : "text-error"} 
              />
              <span className="text-sm font-body text-foreground">
                {criteria?.label}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getScoreBgColor(criteria?.score)}`}
                  style={{ width: `${criteria?.score}%` }}
                />
              </div>
              <span className="text-xs font-caption text-muted-foreground w-8">
                {criteria?.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompatibilityIndicator;