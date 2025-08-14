import React, { useState, useEffect, useCallback } from 'react';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import PageContainer from '../../components/ui/PageContainer';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import ActiveFilters from './components/ActiveFilters';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import ProfileGrid from './components/ProfileGrid';

const ProfileSearchBrowse = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    minAge: '',
    maxAge: '',
    location: [],
    education: [],
    profession: [],
    religion: [],
    caste: '',
    salary: '',
    height: '',
    maritalStatus: [],
    bodyType: [],
    smoking: [],
    drinking: []
  });

  // Mock profile data
  const mockProfiles = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      location: "Mumbai, Maharashtra",
      education: "Master\'s in Computer Science",
      profession: "Software Engineer",
      religion: "Christian",
      photos: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"],
      compatibility: 92,
      isPremium: true,
      isVerified: true,
      isFavorited: false,
      lastSeen: new Date(Date.now() - 300000),
      views: 156,
      joinedDate: "2023",
      salary: "75000-100000",
      height: "5.5-6.0",
      maritalStatus: "never_married",
      bodyType: "athletic"
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 26,
      location: "Delhi, India",
      education: "Bachelor\'s in Medicine",
      profession: "Doctor",
      religion: "Hindu",
      photos: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"],
      compatibility: 88,
      isPremium: false,
      isVerified: true,
      isFavorited: true,
      lastSeen: new Date(Date.now() - 1800000),
      views: 203,
      joinedDate: "2024",
      salary: "50000-75000",
      height: "5.0-5.5",
      maritalStatus: "never_married",
      bodyType: "slim"
    },
    {
      id: 3,
      name: "Emily Chen",
      age: 30,
      location: "Bangalore, Karnataka",
      education: "MBA in Finance",
      profession: "Financial Analyst",
      religion: "Buddhist",
      photos: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"],
      compatibility: 85,
      isPremium: true,
      isVerified: true,
      isFavorited: false,
      lastSeen: new Date(Date.now() - 3600000),
      views: 89,
      joinedDate: "2023",
      salary: "75000-100000",
      height: "5.0-5.5",
      maritalStatus: "divorced",
      bodyType: "average"
    },
    {
      id: 4,
      name: "Aisha Patel",
      age: 25,
      location: "Chennai, Tamil Nadu",
      education: "Bachelor\'s in Engineering",
      profession: "Software Developer",
      religion: "Muslim",
      photos: ["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400"],
      compatibility: 79,
      isPremium: false,
      isVerified: false,
      isFavorited: false,
      lastSeen: new Date(Date.now() - 7200000),
      views: 67,
      joinedDate: "2024",
      salary: "50000-75000",
      height: "5.0-5.5",
      maritalStatus: "never_married",
      bodyType: "slim"
    },
    {
      id: 5,
      name: "Jessica Williams",
      age: 32,
      location: "Hyderabad, Telangana",
      education: "Master\'s in Business",
      profession: "Marketing Manager",
      religion: "Christian",
      photos: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400"],
      compatibility: 91,
      isPremium: true,
      isVerified: true,
      isFavorited: false,
      lastSeen: new Date(Date.now() - 900000),
      views: 134,
      joinedDate: "2022",
      salary: "75000-100000",
      height: "5.5-6.0",
      maritalStatus: "divorced",
      bodyType: "athletic"
    },
    {
      id: 6,
      name: "Kavya Reddy",
      age: 27,
      location: "Pune, Maharashtra",
      education: "Bachelor\'s in Arts",
      profession: "Teacher",
      religion: "Hindu",
      photos: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400"],
      compatibility: 76,
      isPremium: false,
      isVerified: true,
      isFavorited: true,
      lastSeen: new Date(Date.now() - 14400000),
      views: 92,
      joinedDate: "2023",
      salary: "25000-50000",
      height: "5.0-5.5",
      maritalStatus: "never_married",
      bodyType: "average"
    }
  ];

  // Initialize profiles on component mount
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProfiles(mockProfiles);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter profiles based on current filters and search query
  const getFilteredProfiles = useCallback(() => {
    let filtered = [...mockProfiles];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(profile => 
        profile?.name?.toLowerCase()?.includes(query) ||
        profile?.profession?.toLowerCase()?.includes(query) ||
        profile?.location?.toLowerCase()?.includes(query) ||
        profile?.education?.toLowerCase()?.includes(query)
      );
    }

    // Age filter
    if (filters?.minAge) {
      filtered = filtered?.filter(profile => profile?.age >= parseInt(filters?.minAge));
    }
    if (filters?.maxAge) {
      filtered = filtered?.filter(profile => profile?.age <= parseInt(filters?.maxAge));
    }

    // Location filter
    if (filters?.location && filters?.location?.length > 0) {
      filtered = filtered?.filter(profile => 
        filters?.location?.some(loc => 
          profile?.location?.toLowerCase()?.includes(loc?.toLowerCase())
        )
      );
    }

    // Education filter
    if (filters?.education && filters?.education?.length > 0) {
      filtered = filtered?.filter(profile => 
        filters?.education?.some(edu => 
          profile?.education?.toLowerCase()?.includes(edu?.toLowerCase())
        )
      );
    }

    // Profession filter
    if (filters?.profession && filters?.profession?.length > 0) {
      filtered = filtered?.filter(profile => 
        filters?.profession?.some(prof => 
          profile?.profession?.toLowerCase()?.includes(prof?.toLowerCase())
        )
      );
    }

    // Religion filter
    if (filters?.religion && filters?.religion?.length > 0) {
      filtered = filtered?.filter(profile => 
        filters?.religion?.some(rel => 
          profile?.religion?.toLowerCase()?.includes(rel?.toLowerCase())
        )
      );
    }

    // Salary filter
    if (filters?.salary) {
      filtered = filtered?.filter(profile => profile?.salary === filters?.salary);
    }

    // Height filter
    if (filters?.height) {
      filtered = filtered?.filter(profile => profile?.height === filters?.height);
    }

    // Marital status filter
    if (filters?.maritalStatus && filters?.maritalStatus?.length > 0) {
      filtered = filtered?.filter(profile => 
        filters?.maritalStatus?.includes(profile?.maritalStatus)
      );
    }

    // Body type filter
    if (filters?.bodyType && filters?.bodyType?.length > 0) {
      filtered = filtered?.filter(profile => 
        filters?.bodyType?.includes(profile?.bodyType)
      );
    }

    // Sort profiles
    switch (sortBy) {
      case 'compatibility':
        filtered?.sort((a, b) => b?.compatibility - a?.compatibility);
        break;
      case 'newest':
        filtered?.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
        break;
      case 'lastActive':
        filtered?.sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen));
        break;
      case 'premium':
        filtered?.sort((a, b) => (b?.isPremium ? 1 : 0) - (a?.isPremium ? 1 : 0));
        break;
      default:
        // Relevance - keep current order
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  // Update profiles when filters change
  useEffect(() => {
    let filtered = getFilteredProfiles();
    setProfiles(filtered);
    setCurrentPage(1);
    setHasMore(filtered?.length > 6);
  }, [getFilteredProfiles]);

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(filters)?.forEach(([key, value]) => {
      if (Array.isArray(value) && value?.length > 0) count++;
      else if (typeof value === 'string' && value?.trim() !== '') count++;
    });
    return count;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRemoveFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev?.[key]) ? [] : ''
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      minAge: '',
      maxAge: '',
      location: [],
      education: [],
      profession: [],
      religion: [],
      caste: '',
      salary: '',
      height: '',
      maritalStatus: [],
      bodyType: [],
      smoking: [],
      drinking: []
    });
  };

  const handleLoadMore = async () => {
    // Simulate loading more profiles
    return new Promise(resolve => {
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        resolve();
      }, 1000);
    });
  };

  const handleFavorite = (profileId, isFavorited) => {
    setProfiles(prev => 
      prev?.map(profile => 
        profile?.id === profileId 
          ? { ...profile, isFavorited }
          : profile
      )
    );
  };

  const handleContact = (profileId) => {
    // Navigate to messages or show contact modal
    console.log('Contact profile:', profileId);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  const activeFilterCount = getActiveFilterCount();
  const filteredProfiles = getFilteredProfiles();

  return (
    <PageContainer>
      <UserNavigationBar messageCount={3} profileCompletion={85} />
      <div className="flex items-start pb-16">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearAllFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="px-4 lg:px-6 pt-6">
              <NavigationBreadcrumbs />
            </div>

            {/* Search Header */}
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleFilters={toggleFilterSidebar}
              activeFilterCount={activeFilterCount}
              resultsCount={filteredProfiles?.length}
              isLoading={isLoading}
            />

            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Profile Grid */}
            <div className="px-4 lg:px-6 py-6">
              <ProfileGrid
                profiles={profiles}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onFavorite={handleFavorite}
                onContact={handleContact}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav messageCount={3} />
    </PageContainer>
  );
};

export default ProfileSearchBrowse;