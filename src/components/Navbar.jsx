import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  ChevronDown, 
  Leaf, 
  MapPin, 
  CheckCircle2,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { CAMPUSES } from '../data/campuses';

export function Navbar({ 
  currentCampus, 
  onSelectCampus, 
  onOpenCreateModal, 
  onOpenRequestModal,
  onOpenSafeZonesModal,
  onOpenProfileModal,
  onOpenChatModal,
  savedCount,
  searchQuery,
  onSearchChange,
  unreadMessagesCount = 2,
  isDarkMode,
  onToggleDarkMode
}) {
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const isSavedActive = searchQuery === '__saved__';

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top University Domain Banner */}
      <div className="bg-slate-950 text-slate-300 dark:text-slate-400 text-xs py-1.5 px-3 sm:px-6 border-b border-slate-850">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center space-x-1.5 sm:space-x-2 truncate">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 shrink-0">
              <ShieldCheck className="w-3 h-3 mr-1 shrink-0" /> Verified Network
            </span>
            <span className="hidden sm:inline text-slate-400 truncate">
              Locked to verified <strong className="text-white">@{currentCampus.domain}</strong> peers
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <button 
              type="button"
              onClick={onOpenSafeZonesModal}
              className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400 shrink-0" />
              <span className="hidden sm:inline">Campus Safe Zones</span>
              <span className="sm:hidden font-medium">Safe Zones</span>
              <span className="text-[10px] text-sky-300 font-bold bg-sky-950/80 px-1 rounded">({currentCampus.meetupZones.length})</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-rose-400 font-medium">
              <Leaf className="w-3.5 h-3.5" />
              <span>{currentCampus.co2SavedKg.toLocaleString()} kg Diverted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Campus Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#" className="flex items-center gap-1.5 sm:gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <img 
                src="/trove-logo.png" 
                alt="Trove Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Trove
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300/40 dark:border-sky-700/50 uppercase">
                  Campus
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                Circulate • Share • Save
              </p>
            </div>
          </a>

          {/* Campus Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCampusDropdownOpen(!campusDropdownOpen)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer max-w-[130px] sm:max-w-none"
              title="Change University Campus"
            >
              <span className="text-sm sm:text-base shrink-0">{currentCampus.logo}</span>
              <span className="font-bold truncate text-[11px] sm:text-xs">{currentCampus.shortName}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-slate-400 transition-transform shrink-0 ${campusDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {campusDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" 
                  onClick={() => setCampusDropdownOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                  <div className="px-3 py-2 text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Select University Community
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {CAMPUSES.map((campus) => {
                      const isSelected = campus.id === currentCampus.id;
                      return (
                        <button
                          key={campus.id}
                          type="button"
                          onClick={() => {
                            onSelectCampus(campus);
                            setCampusDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 font-bold' 
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-xl shrink-0">{campus.logo}</span>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 dark:text-white truncate">{campus.name}</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">@{campus.domain} • {campus.activeStudents.toLocaleString()} peers</div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 px-3 py-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Don't see your school?</span>
                    <button type="button" className="text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer">Request</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative items-center mx-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search courses (CSE2001), Casio calculators, cycles, lab gear..."
            value={isSavedActive ? '' : searchQuery === '__free__' ? 'Free' : searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-9 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 focus:bg-white dark:focus:bg-slate-800 text-xs rounded-full border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-slate-100 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Actions Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${
              mobileSearchOpen || searchQuery 
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Search campus assets"
            aria-label="Toggle mobile search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            )}
          </button>

          {/* Chat / Messages Button (Desktop only) */}
          <button
            type="button"
            onClick={onOpenChatModal}
            className="hidden md:flex relative p-2 text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title="Campus In-App Deals & Messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-sky-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Saved Items Button (Desktop only) */}
          <button
            type="button"
            onClick={() => onSearchChange(isSavedActive ? '' : '__saved__')}
            className={`hidden md:flex relative p-2 rounded-full transition-colors cursor-pointer ${
              isSavedActive 
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Saved Watchlist"
          >
            <Heart className={`w-5 h-5 ${isSavedActive ? 'fill-rose-500 text-rose-500' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* Wishlist / Request Item Button (Desktop only) */}
          <button
            type="button"
            onClick={onOpenRequestModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            title="Can't find what you need? Post a request"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Request Item</span>
          </button>

          {/* List an Item (Circulate) CTA (Desktop) */}
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 shadow-md shadow-sky-600/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Circulate Item</span>
          </button>

          {/* Student Profile Avatar (Desktop) */}
          <button
            type="button"
            onClick={onOpenProfileModal}
            className="hidden md:flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-700 cursor-pointer"
            title="Your Student Profile & Karma"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Student Profile"
                className="w-7 h-7 rounded-full object-cover border border-sky-500"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-sky-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ananya (4.96 ★)
            </span>
          </button>

          {/* Mobile Fast Circulate Button */}
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="sm:hidden px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 shadow-sm shadow-sky-600/30 flex items-center gap-1 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-3 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 animate-in slide-in-from-top-2 duration-150">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Search courses, calculators, bicycles, lab kits..."
              value={isSavedActive ? '' : searchQuery === '__free__' ? 'Free' : searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-white dark:bg-slate-800 text-sm rounded-xl border border-slate-300 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-slate-100 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Quick Search Chips on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
            <span className="text-[10px] text-slate-400 shrink-0 font-medium">Quick:</span>
            {['CSE2001', 'Calculator', 'Drafter', 'Bicycle', 'Lab Coat'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onSearchChange(term)}
                className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 hover:bg-sky-100 dark:hover:bg-sky-950"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
