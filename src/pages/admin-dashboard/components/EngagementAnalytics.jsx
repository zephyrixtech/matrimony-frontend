import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EngagementAnalytics = ({ engagementData, timeRange, onTimeRangeChange }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle' },
    { id: 'matches', label: 'Matches', icon: 'Heart' },
    { id: 'profiles', label: 'Profile Views', icon: 'Eye' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Active Users"
              />
              <Line 
                type="monotone" 
                dataKey="newRegistrations" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                name="New Registrations"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'messages':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="messages" 
                fill="var(--color-accent)" 
                name="Messages Sent"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={activeTab} 
                stroke="var(--color-success)" 
                strokeWidth={2}
                name={tabs?.find(t => t?.id === activeTab)?.label}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">Engagement Analytics</h3>
        
        <div className="flex flex-wrap items-center gap-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={timeRange === range?.value ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeRangeChange(range?.value)}
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-border mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Container */}
      <div className="h-80">
        {renderChart()}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {engagementData?.reduce((sum, day) => sum + day?.activeUsers, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Active Users</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {engagementData?.reduce((sum, day) => sum + day?.messages, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Messages Sent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {engagementData?.reduce((sum, day) => sum + day?.matches, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Matches Made</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {engagementData?.reduce((sum, day) => sum + day?.profiles, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Profile Views</p>
        </div>
      </div>
    </div>
  );
};

export default EngagementAnalytics;