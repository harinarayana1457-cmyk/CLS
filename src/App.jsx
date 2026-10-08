import React, { useState, useMemo, useEffect } from 'react';
import { CAMPUSES } from './data/campuses';
import { INITIAL_LISTINGS, MOCK_COMMUNITY_REQUESTS, MOCK_REVIEWS } from './data/mockListings';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ImpactDashboard } from './components/ImpactDashboard';
import { FilterBar } from './components/FilterBar';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CreateListingModal } from './components/CreateListingModal';
import { RequestItemModal } from './components/RequestItemModal';
import { CampusChatModal } from './components/CampusChatModal';
import { SafeMeetupGuideModal } from './components/SafeMeetupGuideModal';
import { UserProfileModal } from './components/UserProfileModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  PlusCircle, 
  ShieldCheck, 
  ArrowRight, 
  Users,
  Inbox
} from 'lucide-react';

export function App() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('trove_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('trove_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('trove_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Campus selection
  const [currentCampus, setCurrentCampus] = useState(CAMPUSES[0]);

  // Listings state (stored with localStorage persistence fallback)
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('trove_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  // Saved / favorites state
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('trove_saved');
      return saved ? JSON.parse(saved) : ['trv-101', 'trv-104'];
    } catch {
      return ['trv-101', 'trv-104'];
    }
  });

  // Filter & Search states
  const [activeMode, setActiveMode] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Modal states
  const [selectedListing, setSelectedListing] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSafeZonesModalOpen, setIsSafeZonesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatListingContext, setChatListingContext] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('trove_listings', JSON.stringify(listings));
    } catch (e) {
      console.warn('Could not persist to localStorage', e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('trove_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Could not persist to localStorage', e);
    }
  }, [savedIds]);

  // Toggle favorite
  const handleToggleSave = (id) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add new listing
  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
  };

  // Add new wishlist request
  const handleAddRequest = (newRequest) => {
    setListings(prev => [newRequest, ...prev]);
  };

  // Open chat with seller
  const handleOpenChatWithSeller = (listing) => {
    setChatListingContext(listing);
    setSelectedListing(null);
    setIsChatModalOpen(true);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveMode('all');
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedCondition('all');
    setSelectedZone('all');
    setSortBy('recent');
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Campus filter
      if (item.campusId && item.campusId !== currentCampus.id) {
        return false;
      }

      // Saved watchlist pseudo-search filter
      if (searchQuery === '__saved__') {
        return savedIds.includes(item.id);
      }

      // Free share pseudo-search filter
      if (searchQuery === '__free__' && item.mode !== 'free') {
        return false;
      }

      // Circulation mode filter
      if (activeMode !== 'all' && item.mode !== activeMode) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
        return false;
      }

      // Safe Meetup Zone filter
      if (selectedZone !== 'all' && item.preferredMeetup !== selectedZone) {
        return false;
      }

      // Search query filter (checks title, courseCode, description, department, tags)
      if (searchQuery && searchQuery !== '__saved__' && searchQuery !== '__free__') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCourse = item.courseCode?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesDept = item.department?.toLowerCase().includes(q);
        const matchesTags = item.tags?.some(tag => tag.toLowerCase().includes(q));

        if (!matchesTitle && !matchesCourse && !matchesDesc && !matchesDept && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'eco-score') {
        return (b.sustainability?.co2SavedKg || 0) - (a.sustainability?.co2SavedKg || 0);
      }
      if (sortBy === 'popular') {
        return (b.likesCount || 0) - (a.likesCount || 0);
      }
      return 0; // recent (default)
    });
  }, [listings, currentCampus.id, activeMode, activeCategory, selectedCondition, selectedZone, searchQuery, sortBy, savedIds]);

  // User-created items count for current user
  const userListings = useMemo(() => {
    return listings.filter(l => l.seller?.email?.startsWith('ananya') || l.seller?.email?.startsWith('mlin'));
  }, [listings]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200 relative">
      {/* 
        Ambient Spectral Aura Glow Orbs 
        Infuses the entire page with the artwork's fiery crimson, solar yellow, 
        and electric cyan radiance across both light and dark mode.
      */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-60 dark:opacity-75">
        {/* Top-Left Fiery Crimson Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-red-500/35 via-rose-500/25 to-transparent rounded-full blur-3xl"></div>
        {/* Top-Right Solar Yellow Orb */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 sm:w-[520px] sm:h-[520px] bg-gradient-to-bl from-yellow-400/35 via-amber-400/25 to-transparent rounded-full blur-3xl"></div>
        {/* Center-Left Electric Cyan Pool */}
        <div className="absolute top-1/2 -left-20 w-96 h-96 sm:w-[550px] sm:h-[550px] bg-gradient-to-tr from-sky-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        {/* Center-Right Cosmic Violet Aura */}
        <div className="absolute top-2/3 -right-24 w-80 h-80 sm:w-[480px] sm:h-[480px] bg-gradient-to-tl from-purple-500/25 via-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
        {/* Bottom-Right Scarlet Orb */}
        <div className="absolute bottom-10 -right-20 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-tl from-red-600/35 via-rose-500/25 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Top Global Navigation Bar */}
      <Navbar
        currentCampus={currentCampus}
        onSelectCampus={setCurrentCampus}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenRequestModal={() => setIsRequestModalOpen(true)}
        onOpenSafeZonesModal={() => setIsSafeZonesModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenChatModal={() => setIsChatModalOpen(true)}
        savedCount={savedIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Hero Banner with circulation modes & campus live metrics */}
      <HeroBanner
        currentCampus={currentCampus}
        activeMode={activeMode}
        onSelectMode={(mode) => {
          setActiveMode(mode);
          document.getElementById('circulation-hub')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onQuickSearch={(query) => {
          setSearchQuery(query);
          document.getElementById('circulation-hub')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Circular Economy Impact Dashboard & Interactive Calculator */}
      <ImpactDashboard 
        currentCampus={currentCampus} 
        userCirculationsCount={userListings.length}
      />

      {/* Main Circulation Catalog & Community Section */}
      <main id="circulation-hub" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{currentCampus.logo}</span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentCampus.name} Resource Hub
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Available from verified @{currentCampus.domain} students • Ready for safe campus meetup
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="flex-1 sm:flex-initial justify-center px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
              <span>Request Item</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 sm:flex-initial justify-center px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Circulate Asset</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          currentCampus={currentCampus}
          activeMode={activeMode}
          onSelectMode={setActiveMode}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedCondition={selectedCondition}
          onSelectCondition={setSelectedCondition}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          totalResultsCount={filteredListings.length}
        />

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isSaved={savedIds.includes(listing.id)}
                onToggleSave={handleToggleSave}
                onSelectListing={setSelectedListing}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching resources found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                Try widening your filters, searching for a different course code, or post a request so classmates can lend or sell theirs.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Post Request
              </button>
            </div>
          </div>
        )}

        {/* Campus Community Live Wishlist / Request Bulletin */}
        <div className="mt-8 sm:mt-14 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/80 dark:from-slate-950 dark:via-slate-900 dark:to-sky-950/80 text-white rounded-3xl p-4 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-700/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <Users className="w-3.5 h-3.5" /> Peer Wishlist Bulletin
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                Students on {currentCampus.shortName} Are Currently Seeking:
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Have any of these idle in your dorm room or desk? Circulate them now to help a peer.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-slate-950 font-extrabold text-xs hover:bg-slate-100 transition-colors shadow-sm shrink-0 cursor-pointer text-center"
            >
              + Post What You Need
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {MOCK_COMMUNITY_REQUESTS.map((req) => (
              <div 
                key={req.id}
                className="bg-slate-800/90 dark:bg-slate-900/90 border border-slate-700/80 dark:border-slate-750 rounded-2xl p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                    <span>{req.student}</span>
                    <span className="text-slate-400">{req.urgency}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {req.need}
                  </h4>
                  <div className="mt-2 text-xs font-extrabold text-sky-400">
                    Budget / Trade: {req.budget}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{req.responses} responses</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChatModalOpen(true);
                    }}
                    className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>I Can Provide This</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Student Peer Reviews & Verification Testimonials */}
        <div className="pt-2 sm:pt-4 space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Trusted Peer Network
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Verified Student Exchange Experiences
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Every handoff happens on campus between students with verified .edu emails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-2">
            {MOCK_REVIEWS.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{rev.author}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{rev.date}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-2 py-0.5 rounded-md inline-block">
                  Item: {rev.itemTitle}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        currentCampus={currentCampus}
        onOpenSafeZonesModal={() => setIsSafeZonesModalOpen(true)}
        onOpenRequestModal={() => setIsRequestModalOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        savedCount={savedIds.length}
        unreadCount={2}
        isSavedActive={searchQuery === '__saved__'}
        onExploreClick={() => {
          if (searchQuery === '__saved__') setSearchQuery('');
          document.getElementById('circulation-hub')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onToggleSaved={() => {
          setSearchQuery(prev => prev === '__saved__' ? '' : '__saved__');
          document.getElementById('circulation-hub')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenChatModal={() => setIsChatModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Modals */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          currentCampus={currentCampus}
          onClose={() => setSelectedListing(null)}
          onOpenChatWithSeller={handleOpenChatWithSeller}
          isSaved={savedIds.includes(selectedListing.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {isCreateModalOpen && (
        <CreateListingModal
          currentCampus={currentCampus}
          onClose={() => setIsCreateModalOpen(false)}
          onAddListing={handleAddListing}
        />
      )}

      {isRequestModalOpen && (
        <RequestItemModal
          currentCampus={currentCampus}
          onClose={() => setIsRequestModalOpen(false)}
          onAddRequest={handleAddRequest}
        />
      )}

      {isSafeZonesModalOpen && (
        <SafeMeetupGuideModal
          currentCampus={currentCampus}
          onClose={() => setIsSafeZonesModalOpen(false)}
        />
      )}

      {isProfileModalOpen && (
        <UserProfileModal
          currentCampus={currentCampus}
          userListings={userListings}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {isChatModalOpen && (
        <CampusChatModal
          currentCampus={currentCampus}
          initialListing={chatListingContext}
          onClose={() => {
            setIsChatModalOpen(false);
            setChatListingContext(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
