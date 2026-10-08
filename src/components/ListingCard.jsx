import React from 'react';
import { 
  Heart, 
  MapPin, 
  Leaf, 
  ArrowLeftRight
} from 'lucide-react';

export function ListingCard({ 
  listing, 
  isSaved, 
  onToggleSave, 
  onSelectListing 
}) {
  const getModeBadge = () => {
    switch (listing.mode) {
      case 'buy':
        return (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs">
            Buy / Sell
          </span>
        );
      case 'rent':
        return (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-xs">
            Course Rental
          </span>
        );
      case 'swap':
        return (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs">
            Barter Swap
          </span>
        );
      case 'free':
        return (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-xs">
            Free Share
          </span>
        );
      case 'wanted':
        return (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs">
            Wanted
          </span>
        );
      default:
        return null;
    }
  };

  const getConditionColor = (cond) => {
    switch (cond) {
      case 'like-new':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'excellent':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'good':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      default:
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  // Savings percentage for buy
  const discountPercent = listing.originalPrice && listing.price
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <div 
      onClick={() => onSelectListing(listing)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-sky-500/5 dark:hover:shadow-sky-500/10 hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Card Header & Image */}
      <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-wrap gap-1 z-10 max-w-[80%]">
          {getModeBadge()}
          {listing.courseCode && (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
              {listing.courseCode}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(listing.id);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-10 active:scale-90 cursor-pointer ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 shadow-xs'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Item'}
          aria-label={isSaved ? 'Remove from Saved' : 'Save Item'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Eco-Score Overlay Badge */}
        {listing.sustainability && (
          <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-950/80 text-sky-300 text-[9px] sm:text-[10px] font-bold backdrop-blur-md border border-white/10 flex items-center gap-1 sm:gap-1.5 shadow-sm">
            <Leaf className="w-3 h-3 text-sky-400 shrink-0" />
            <span>Prevents {listing.sustainability.co2SavedKg} kg CO₂</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          {/* Condition and Department */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1">
            <span className={`px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-md border font-medium capitalize ${getConditionColor(listing.condition)}`}>
              {listing.condition ? listing.condition.replace('-', ' ') : 'Verified'}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-medium text-[10px]">
              {listing.postedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:white text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {listing.title}
          </h3>

          {/* Description snippet */}
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
            {listing.description}
          </p>
        </div>

        {/* Pricing / Mode Term */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            {listing.mode === 'buy' && (
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">₹{listing.price}</span>
                {listing.originalPrice && (
                  <>
                    <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 line-through">₹{listing.originalPrice}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>
            )}

            {listing.mode === 'rent' && (
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-black text-sky-700 dark:text-sky-400 truncate">
                  ₹{listing.rentalRate?.daily}<span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">/day</span>
                  {listing.rentalRate?.semester && (
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 font-bold ml-1">
                      (₹{listing.rentalRate.semester}/term)
                    </span>
                  )}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500">Deposit: ₹{listing.deposit || 200}</div>
              </div>
            )}

            {listing.mode === 'swap' && (
              <div className="min-w-0">
                <div className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                  <ArrowLeftRight className="w-3 h-3 shrink-0" /> Barter
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-[140px]" title={listing.swapFor}>
                  {listing.swapFor || 'Trading for STEM gear'}
                </div>
              </div>
            )}

            {listing.mode === 'free' && (
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400">FREE</span>
                <span className="text-[9px] font-semibold px-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
                  Pay it forward
                </span>
              </div>
            )}

            {listing.mode === 'wanted' && (
              <div>
                <span className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400">Offering: ₹{listing.price}</span>
                <div className="text-[9px] text-slate-400 dark:text-slate-500">Seeking on campus</div>
              </div>
            )}
          </div>

          {/* Quick Action Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectListing(listing);
            }}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-600 dark:group-hover:bg-sky-600 text-slate-800 dark:text-slate-200 group-hover:text-white dark:group-hover:text-white rounded-xl text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer active:scale-95 shrink-0"
          >
            {listing.mode === 'buy' ? 'Buy' : listing.mode === 'rent' ? 'Rent' : listing.mode === 'swap' ? 'Swap' : listing.mode === 'free' ? 'Claim' : 'Fulfill'}
          </button>
        </div>

        {/* Footer: Seller & Campus Safe Zone */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 gap-1">
          <div className="flex items-center gap-1.5 truncate max-w-[50%]">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate text-[10px] sm:text-[11px]">{listing.seller.name}</span>
            <span className="text-amber-500 font-bold text-[9px] sm:text-[10px] shrink-0">★{listing.seller.karma}</span>
          </div>

          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[48%]" title={listing.preferredMeetup}>
            <MapPin className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0" />
            <span className="truncate">{listing.preferredMeetup}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
