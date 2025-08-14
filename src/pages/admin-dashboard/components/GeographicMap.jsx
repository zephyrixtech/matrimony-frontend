import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicMap = ({ locationData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const topLocations = locationData?.sort((a, b) => b?.users - a?.users)?.slice(0, 5);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Geographic Distribution</h3>
        <Icon name="MapPin" size={20} className="text-primary" />
      </div>
      {/* Map Container */}
      <div className="relative bg-muted/30 rounded-lg h-64 mb-6 overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="User Geographic Distribution"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=4&output=embed"
          className="rounded-lg"
        />
        
        {/* Overlay with user distribution points */}
        <div className="absolute inset-0 pointer-events-none">
          {locationData?.slice(0, 3)?.map((location, index) => (
            <div
              key={location?.id}
              className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`
              }}
              title={`${location?.city}: ${location?.users} users`}
            />
          ))}
        </div>
      </div>
      {/* Top Locations List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground mb-3">Top Locations</h4>
        {topLocations?.map((location, index) => (
          <div
            key={location?.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => setSelectedRegion(location)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-medium text-sm">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {location?.city}, {location?.state}
                </p>
                <p className="text-xs text-muted-foreground">
                  {location?.country}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {location?.users?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">users</p>
            </div>
          </div>
        ))}
      </div>
      {/* Region Details Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedRegion?.city} Details
              </h3>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Users:</span>
                <span className="font-medium text-foreground">
                  {selectedRegion?.users?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Profiles:</span>
                <span className="font-medium text-foreground">
                  {Math.floor(selectedRegion?.users * 0.85)?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Matches This Month:</span>
                <span className="font-medium text-foreground">
                  {Math.floor(selectedRegion?.users * 0.12)?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographicMap;