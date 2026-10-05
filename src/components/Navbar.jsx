import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  ChevronDown, 
  GraduationCap, 
  Leaf, 
  MapPin, 
  UserCheck,
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top University Domain Banner */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 text-xs py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 mr-1" /> Verified Campus Network
            </span>
            <span className="hidden sm:inline text-slate-400">
              Locked to verified <strong className="text-white">@{currentCampus.domain}</strong> university community members
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenSafeZonesModal}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Campus Safe Zones</span> ({currentCampus.meetupZones.length} spots)
            </button>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Leaf className="w-3.5 h-3.5" />
              <span>{currentCampus.co2SavedKg.toLocaleString()} kg CO₂ Diverted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Campus Switcher */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img 
                src="/trove-logo.png" 
                alt="Trove Logo" 
                className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Trove
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-700/50 tracking-wide uppercase">
                  Campus
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Circulate • Share • Save
              </p>
            </div>
          </a>

          {/* Campus Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCampusDropdownOpen(!campusDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="Change University Campus"
            >
              <span className="text-base">{currentCampus.logo}</span>
              <span className="font-bold">{currentCampus.shortName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform ${campusDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {campusDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setCampusDropdownOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                  <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Select University Community
                  </div>
                  <div className="space-y-1">
                    {CAMPUSES.map((campus) => {
                      const isSelected = campus.id === currentCampus.id;
                      return (
                        <button
                          key={campus.id}
                          onClick={() => {
                            onSelectCampus(campus);
                            setCampusDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold' 
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{campus.logo}</span>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-white">{campus.name}</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">@{campus.domain} • {campus.activeStudents.toLocaleString()} students</div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-750 px-3 py-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Don't see your school?</span>
                    <button className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer">Request Campus</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search courses (e.g. CSE2001, MAT1011), Casio calculators, cycles, lab gear..."
            value={searchQuery === '__saved__' ? '' : searchQuery === '__free__' ? 'Free' : searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-9 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 focus:bg-white dark:focus:bg-slate-800 text-xs rounded-full border border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 dark:text-slate-100 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (Light/Dark) */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Chat / Messages Button */}
          <button
            onClick={onOpenChatModal}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title="Campus In-App Deals & Messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Saved Items Button */}
          <button
            onClick={() => onSearchChange(searchQuery === '__saved__' ? '' : '__saved__')}
            className={`relative p-2 rounded-full transition-colors cursor-pointer ${
              searchQuery === '__saved__' 
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Saved Watchlist"
          >
            <Heart className={`w-5 h-5 ${searchQuery === '__saved__' ? 'fill-rose-500 text-rose-500' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* Wishlist / Request Item Button */}
          <button
            onClick={onOpenRequestModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            title="Can't find what you need? Post a request"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Request Item</span>
          </button>

          {/* List an Item (Circulate) CTA */}
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Circulate Item</span>
          </button>

          {/* Student Profile Avatar */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-700 cursor-pointer"
            title="Your Student Profile & Karma"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Student Profile"
                className="w-7 h-7 rounded-full object-cover border border-emerald-500"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline">
              Ananya (4.96 ★)
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
