import React from 'react';
import { 
  Heart, 
  MapPin, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeftRight, 
  Clock, 
  Calendar,
  CheckCircle2,
  DollarSign
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
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
            Buy / Sell
          </span>
        );
      case 'rent':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-600 text-white shadow-xs">
            Course Rental
          </span>
        );
      case 'swap':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-600 text-white shadow-xs">
            Barter Swap
          </span>
        );
      case 'free':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
            Free Share
          </span>
        );
      case 'wanted':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-xs">
            Wanted / Request
          </span>
        );
      default:
        return null;
    }
  };

  const getConditionColor = (cond) => {
    switch (cond) {
      case 'like-new':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
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
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer relative"
    >
      {/* Card Header & Image */}
      <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {getModeBadge()}
          {listing.courseCode && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
              {listing.courseCode}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Item'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Eco-Score Overlay Badge */}
        {listing.sustainability && (
          <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/75 text-emerald-300 text-[10px] font-semibold backdrop-blur-xs flex items-center gap-1">
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>Prevents {listing.sustainability.co2SavedKg} kg CO₂</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Condition and Department */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className={`px-2 py-0.5 rounded-md border font-medium capitalize ${getConditionColor(listing.condition)}`}>
              {listing.condition ? listing.condition.replace('-', ' ') : 'Verified'}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-medium text-[10px]">
              {listing.postedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {listing.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
            {listing.description}
          </p>
        </div>

        {/* Pricing / Mode Term */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
          <div>
            {listing.mode === 'buy' && (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-slate-900 dark:text-white">₹{listing.price}</span>
                {listing.originalPrice && (
                  <>
                    <span className="text-xs text-slate-400 dark:text-slate-500 line-through">₹{listing.originalPrice}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border dark:border-emerald-800">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>
            )}

            {listing.mode === 'rent' && (
              <div>
                <div className="text-lg font-black text-sky-700 dark:text-sky-400">
                  ₹{listing.rentalRate?.daily}<span className="text-xs font-normal text-slate-500 dark:text-slate-400">/day</span>
                  {listing.rentalRate?.semester && (
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-bold ml-1.5">
                      (₹{listing.rentalRate.semester}/term)
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">Refundable deposit: ₹{listing.deposit || 200}</div>
              </div>
            )}

            {listing.mode === 'swap' && (
              <div>
                <div className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                  <ArrowLeftRight className="w-3.5 h-3.5" /> Direct Barter
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-[170px]" title={listing.swapFor}>
                  {listing.swapFor || 'Trading for STEM books/gear'}
                </div>
              </div>
            )}

            {listing.mode === 'free' && (
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-amber-600 dark:text-amber-400">FREE</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border dark:border-amber-800">
                  Pay it forward
                </span>
              </div>
            )}

            {listing.mode === 'wanted' && (
              <div>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Offering: ₹{listing.price}</span>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">Seeking on campus</div>
              </div>
            )}
          </div>

          {/* Quick Action Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelectListing(listing);
            }}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-600 group-hover:text-white text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            {listing.mode === 'buy' ? 'Buy Now' : listing.mode === 'rent' ? 'Rent' : listing.mode === 'swap' ? 'Swap' : listing.mode === 'free' ? 'Claim' : 'Fulfill'}
          </button>
        </div>

        {/* Footer: Seller & Campus Safe Zone */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 truncate max-w-[140px]">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{listing.seller.name}</span>
            <span className="text-amber-500 font-bold text-[10px]">★{listing.seller.karma}</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]" title={listing.preferredMeetup}>
            <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">{listing.preferredMeetup}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
