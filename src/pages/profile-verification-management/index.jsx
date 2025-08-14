import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavigationSidebar from '../../components/ui/AdminNavigationSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import VerificationStats from './components/VerificationStats';
import QuickActions from './components/QuickActions';
import FilterPanel from './components/FilterPanel';
import BulkActionsBar from './components/BulkActionsBar';
import ProfileCard from './components/ProfileCard';
import ProfileDetailModal from './components/ProfileDetailModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MobileBottomNav from '../../components/ui/MobileBottomNav';

const ProfileVerificationManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Mock data for profiles
  const [profiles] = useState([
    {
      id: "P001",
      name: "Sarah Johnson",
      age: 28,
      location: "New York, NY",
      education: "Master's in Computer Science",
      profession: "Software Engineer",
      income: "$85,000",
      religion: "Christian",
      maritalStatus: "Never Married",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      status: "pending",
      submittedAt: "2025-01-10T10:30:00Z",
      completionPercentage: 92,
      isVerified: false,
      verificationFlags: ["Photo Quality Issue"],
      photoAuthentic: true,
      ageVerified: true,
      educationVerified: false,
      professionVerified: true,
      contactVerified: true,
      photos: [
        { url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", isPrimary: false }
      ],
      documents: [
        { type: "ID Proof", filename: "id_proof.pdf", verified: true },
        { type: "Education Certificate", filename: "degree.pdf", verified: false }
      ]
    },
    {
      id: "P002",
      name: "Michael Chen",
      age: 32,
      location: "San Francisco, CA",
      education: "MBA in Finance",
      profession: "Investment Banker",
      income: "$120,000",
      religion: "Buddhist",
      maritalStatus: "Divorced",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      status: "approved",
      submittedAt: "2025-01-08T14:20:00Z",
      completionPercentage: 100,
      isVerified: true,
      verificationFlags: [],
      photoAuthentic: true,
      ageVerified: true,
      educationVerified: true,
      professionVerified: true,
      contactVerified: true,
      photos: [
        { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", isPrimary: false }
      ],
      documents: [
        { type: "ID Proof", filename: "passport.pdf", verified: true },
        { type: "Income Certificate", filename: "salary_slip.pdf", verified: true }
      ]
    },
    {
      id: "P003",
      name: "Emily Rodriguez",
      age: 26,
      location: "Miami, FL",
      education: "Bachelor's in Marketing",
      profession: "Marketing Manager",
      income: "$65,000",
      religion: "Catholic",
      maritalStatus: "Never Married",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      status: "changes_requested",
      submittedAt: "2025-01-12T09:15:00Z",
      completionPercentage: 78,
      isVerified: false,
      verificationFlags: ["Incomplete Information", "Document Unclear"],
      photoAuthentic: true,
      ageVerified: true,
      educationVerified: false,
      professionVerified: false,
      contactVerified: true,
      photos: [
        { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400", isPrimary: true }
      ],
      documents: [
        { type: "ID Proof", filename: "license.pdf", verified: true },
        { type: "Education Certificate", filename: "diploma.pdf", verified: false }
      ]
    },
    {
      id: "P004",
      name: "David Kumar",
      age: 30,
      location: "Chicago, IL",
      education: "PhD in Engineering",
      profession: "Research Scientist",
      income: "$95,000",
      religion: "Hindu",
      maritalStatus: "Never Married",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      status: "rejected",
      submittedAt: "2025-01-05T16:45:00Z",
      completionPercentage: 65,
      isVerified: false,
      verificationFlags: ["Age Mismatch", "Suspicious Activity"],
      photoAuthentic: false,
      ageVerified: false,
      educationVerified: true,
      professionVerified: true,
      contactVerified: false,
      photos: [
        { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", isPrimary: true }
      ],
      documents: [
        { type: "ID Proof", filename: "id_card.pdf", verified: false }
      ]
    }
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: 'all',
    completion: 'all',
    sortBy: 'newest',
    dateFrom: '',
    dateTo: ''
  });

  // Stats data
  const [stats] = useState({
    totalProfiles: 1247,
    totalProfilesTrend: 8.2,
    pendingReview: 156,
    pendingReviewTrend: -12.5,
    approvedToday: 23,
    approvedTodayTrend: 15.3,
    avgReviewTime: 2.4,
    avgReviewTimeTrend: -8.7
  });

  // Profile counts for filter panel
  const profileCounts = {
    pending: profiles?.filter(p => p?.status === 'pending')?.length,
    approved: profiles?.filter(p => p?.status === 'approved')?.length,
    rejected: profiles?.filter(p => p?.status === 'rejected')?.length,
    changesRequested: profiles?.filter(p => p?.status === 'changes_requested')?.length
  };

  // Filter profiles based on current filters
  const filteredProfiles = profiles?.filter(profile => {
    if (filters?.searchTerm && !profile?.name?.toLowerCase()?.includes(filters?.searchTerm?.toLowerCase())) {
      return false;
    }
    if (filters?.status !== 'all' && profile?.status !== filters?.status) {
      return false;
    }
    if (filters?.completion !== 'all') {
      const completion = profile?.completionPercentage;
      switch (filters?.completion) {
        case 'complete': return completion === 100;
        case 'high': return completion >= 80 && completion < 100;
        case 'medium': return completion >= 50 && completion < 80;
        case 'low': return completion < 50;
        default: return true;
      }
    }
    return true;
  });

  // Pagination
  const profilesPerPage = 10;
  const totalPages = Math.ceil(filteredProfiles?.length / profilesPerPage);
  const startIndex = (currentPage - 1) * profilesPerPage;
  const paginatedProfiles = filteredProfiles?.slice(startIndex, startIndex + profilesPerPage);

  const handleProfileSelect = (profileId, isSelected) => {
    if (isSelected) {
      setSelectedProfiles(prev => [...prev, profileId]);
    } else {
      setSelectedProfiles(prev => prev?.filter(id => id !== profileId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProfiles(paginatedProfiles?.map(p => p?.id));
    } else {
      setSelectedProfiles([]);
    }
  };

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleApprove = (profileId) => {
    console.log('Approving profile:', profileId);
    // Implementation for profile approval
  };

  const handleReject = (profileId) => {
    console.log('Rejecting profile:', profileId);
    // Implementation for profile rejection
  };

  const handleRequestChanges = (profile) => {
    console.log('Requesting changes for profile:', profile);
    // Implementation for requesting changes
  };

  const handleBulkAction = (action, profileIds) => {
    console.log('Bulk action:', action, 'for profiles:', profileIds);
    setSelectedProfiles([]);
    // Implementation for bulk actions
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    // Implementation for quick actions
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      status: 'all',
      completion: 'all',
      sortBy: 'newest',
      dateFrom: '',
      dateTo: ''
    });
    setCurrentPage(1);
  };

  return (
    <PageContainer>
      <Helmet>
        <title>Profile Verification & Management - MatrimonyConnect Admin</title>
        <meta name="description" content="Manage and verify matrimonial profiles with comprehensive admin tools" />
      </Helmet>
      <AdminNavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="lg:pt-0 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
          <NavigationBreadcrumbs />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">
                Profile Verification & Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Review, approve, and moderate matrimonial profiles to ensure platform quality
              </p>
            </div>
            <Button
              variant="default"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Refresh Data
            </Button>
          </div>

          {/* Verification Stats */}
          <VerificationStats stats={stats} />

          {/* Quick Actions */}
          <QuickActions onQuickAction={handleQuickAction} />

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            profileCounts={profileCounts}
          />

          {/* Bulk Actions Bar */}
          <BulkActionsBar
            selectedProfiles={selectedProfiles}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedProfiles([])}
          />

          {/* Profiles List */}
          <div className="bg-card border border-border rounded-lg">
            {/* List Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProfiles?.length === paginatedProfiles?.length && paginatedProfiles?.length > 0}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm font-medium text-foreground">
                    Select All ({paginatedProfiles?.length})
                  </span>
                </label>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>
                  Showing {startIndex + 1}-{Math.min(startIndex + profilesPerPage, filteredProfiles?.length)} of {filteredProfiles?.length} profiles
                </span>
              </div>
            </div>

            {/* Profiles */}
            <div className="divide-y divide-border">
              {paginatedProfiles?.length > 0 ? (
                paginatedProfiles?.map((profile) => (
                  <div key={profile?.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedProfiles?.includes(profile?.id)}
                        onChange={(e) => handleProfileSelect(profile?.id, e?.target?.checked)}
                        className="mt-2 rounded border-border"
                      />
                      <div className="flex-1">
                        <ProfileCard
                          profile={profile}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onViewDetails={handleViewDetails}
                          onRequestChanges={handleRequestChanges}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No profiles found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronRight"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Detail Modal */}
          <ProfileDetailModal
            profile={selectedProfile}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProfile(null);
            }}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestChanges={handleRequestChanges}
          />
        </div>
      </main>
      <MobileBottomNav />
    </PageContainer>
  );
};

export default ProfileVerificationManagement;