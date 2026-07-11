import { useState, useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useProfiles } from '../hooks/useProfiles';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import SearchBar from '../components/dashboard/SearchBar';
import ProfileFilters from '../components/dashboard/ProfileFilters';
import ProfileGrid from '../components/dashboard/ProfileGrid';
import Pagination from '../components/dashboard/Pagination';
import ProfileDetailsModal from '../components/dashboard/ProfileDetailsModal';
import MatchResultModal from '../components/dashboard/MatchResultModal';
import ChatPanel from '../components/chat/ChatPanel';

import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { profiles, loading, error, filters, handleFilterChange, clearFilters, sendInvitation } = useProfiles();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Keep the same as vanilla

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  
  const currentProfiles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return profiles.slice(start, start + itemsPerPage);
  }, [profiles, currentPage]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matchResult, setMatchResult] = useState(null); // { user: ProfileObject } if match
  const [activeChatUser, setActiveChatUser] = useState(null);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleInvite = async (userId, profileData) => {
    try {
      const result = await sendInvitation(userId);
      if (result.hayMatch) {
        setMatchResult(profileData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleScrollTop = () => {
    // Basic smooth scroll for pagination change
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    handleScrollTop();
  };

  return (
    <>
      <div className="container-fluid p-0">
        <DashboardHeader 
          userName={user?.nombre || 'Viajero'} 
          travelStyle={user?.estiloViaje || localStorage.getItem('user_travel_style_key')} 
        />
        
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <SearchBar value={filters.search} onChange={(v) => handleFilterChange('search', v)} />
          </div>
        </div>

        <ProfileFilters filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />

        <ProfileGrid 
          profiles={currentProfiles} 
          loading={loading} 
          error={error} 
          onViewProfile={handleViewProfile}
          onInvite={handleInvite}
        />

        {!loading && !error && profiles.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
        )}
      </div>

      {selectedProfile && (
        <ProfileDetailsModal 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)} 
          onInvite={handleInvite}
        />
      )}

      {matchResult && (
        <MatchResultModal 
          matchUser={matchResult} 
          currentUser={user}
          onClose={() => setMatchResult(null)}
          onOpenChat={(chatUser) => setActiveChatUser({
            id: chatUser._id,
            name: chatUser.nombre,
            avatar: chatUser.avatar
          })}
        />
      )}

      <ChatPanel 
        targetUser={activeChatUser} 
        onClose={() => setActiveChatUser(null)} 
      />
    </>
  );
}
