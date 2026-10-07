import React from 'react';
import { 
  Compass, 
  Heart, 
  Plus, 
  MessageSquare 
} from 'lucide-react';

export function MobileBottomNav({
  savedCount = 0,
  unreadCount = 2,
  isSavedActive = false,
  onExploreClick,
  onToggleSaved,
  onOpenCreateModal,
  onOpenChatModal,
  onOpenProfileModal
}) {
  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] transition-colors"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {/* Explore / Feed */}
        <button
          type="button"
          onClick={onExploreClick}
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            !isSavedActive 
              ? 'text-emerald-600 dark:text-emerald-400 font-bold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Compass className={`w-5 h-5 ${!isSavedActive ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-1 leading-none">Explore</span>
        </button>

        {/* Saved / Watchlist */}
        <button
          type="button"
          onClick={onToggleSaved}
          className={`relative flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            isSavedActive 
              ? 'text-rose-600 dark:text-rose-400 font-bold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isSavedActive ? 'fill-rose-500 text-rose-500' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 leading-none">Saved</span>
        </button>

        {/* Central Circulate Action Button */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="w-12 h-12 -mt-4 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/35 active:scale-90 transition-transform cursor-pointer border-2 border-white dark:border-slate-900"
            title="Circulate an Item"
            aria-label="Circulate Asset"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Chat / In-App Deals */}
        <button
          type="button"
          onClick={onOpenChatModal}
          className="relative flex flex-col items-center justify-center h-full py-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-emerald-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 leading-none">Deals</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={onOpenProfileModal}
          className="flex flex-col items-center justify-center h-full py-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Ananya Profile"
              className="w-5 h-5 rounded-full object-cover border border-emerald-500"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <span className="text-[10px] mt-1 leading-none">Profile</span>
        </button>
      </div>
    </nav>
  );
}
