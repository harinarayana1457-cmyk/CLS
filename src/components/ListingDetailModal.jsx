import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Leaf, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign, 
  ArrowLeftRight, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  BookmarkCheck,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function ListingDetailModal({ 
  listing, 
  currentCampus, 
  onClose, 
  onOpenChatWithSeller,
  isSaved,
  onToggleSave
}) {
  const [selectedMeetupZone, setSelectedMeetupZone] = useState(
    listing.preferredMeetup || currentCampus.meetupZones[0].name
  );
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState('semester');
  const [swapOfferText, setSwapOfferText] = useState('');
  const [counterPrice, setCounterPrice] = useState('');
  const [isCountering, setIsCountering] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(null);

  if (!listing) return null;

  // Calculate rental cost
  const getRentalCalculation = () => {
    if (!listing.rentalRate) return null;
    let rate = 0;
    let periodName = '';
    if (selectedRentalPeriod === 'daily') {
      rate = listing.rentalRate.daily || 5;
      periodName = '1 Day Rental';
    } else if (selectedRentalPeriod === 'weekly') {
      rate = listing.rentalRate.weekly || 15;
      periodName = '1 Week Rental';
    } else {
      rate = listing.rentalRate.semester || 40;
      periodName = 'Full Semester Rental (16 Weeks)';
    }
    const deposit = listing.deposit || 20;
    return { rate, deposit, total: rate + deposit, periodName };
  };

  const rentalCalc = getRentalCalculation();

  const handleExecuteDeal = (actionType) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    let message = '';
    if (actionType === 'buy') {
      message = `Success! Meetup requested with ${listing.seller.name} at ${selectedMeetupZone}. Safe exchange code generated.`;
    } else if (actionType === 'rent') {
      message = `Rental reserved for ${rentalCalc?.periodName}! Please bring your student ID and ${currentCampus?.currency || '₹'}${rentalCalc?.deposit} refundable deposit to ${selectedMeetupZone}.`;
    } else if (actionType === 'swap') {
      message = `Swap trade proposal submitted to ${listing.seller.name}! They will confirm via campus chat.`;
    } else if (actionType === 'free') {
      message = `Resource claimed! Please respect your peer's time and meet at ${selectedMeetupZone}.`;
    } else if (actionType === 'offer') {
      message = `Counter offer of ${currentCampus?.currency || '₹'}${counterPrice} sent to ${listing.seller.name}!`;
    }

    setTransactionSuccess({
      type: actionType,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Product Image & Eco Stats */}
          <div className="md:col-span-5 bg-slate-900 relative min-h-[300px] flex flex-col justify-between p-6">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Top Tags */}
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-md">
                {listing.mode.toUpperCase()}
              </span>
              {listing.courseCode && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-900 backdrop-blur-md">
                  {listing.courseCode}
                </span>
              )}
            </div>

            {/* Bottom Sustainability Impact Card */}
            <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 text-white space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-4 h-4" /> Circular Economy Benefit
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <div className="text-slate-400">CO₂ Diverted</div>
                  <div className="text-sm font-bold text-white">
                    {listing.sustainability?.co2SavedKg || 8.5} kg
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Student Savings</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {currentCampus?.currency || '₹'}{listing.sustainability?.dollarsSaved || (listing.originalPrice ? listing.originalPrice - (listing.price || 0) : 50)}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 border-t border-slate-700/80 pt-1.5">
                Re-circulating this item keeps it in active campus rotation and prevents virgin manufacturing.
              </p>
            </div>
          </div>

          {/* Right: Details & Action Flow */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Title & Category */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                <span className="capitalize">{listing.category.replace('-', ' ')} • {listing.department || currentCampus.shortName}</span>
                <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800 capitalize font-bold">
                  {listing.condition?.replace('-', ' ')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {listing.title}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                {listing.mode === 'buy' && (
                  <>
                    <span className="text-3xl font-black text-slate-900 dark:text-white">₹{listing.price}</span>
                    {listing.originalPrice && (
                      <>
                        <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                          Campus Store: ₹{listing.originalPrice}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border dark:border-emerald-800 px-2 py-0.5 rounded-full">
                          Save ₹{(listing.originalPrice - listing.price)} ({Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)}% off)
                        </span>
                      </>
                    )}
                  </>
                )}

                {listing.mode === 'rent' && (
                  <div>
                    <span className="text-2xl font-black text-sky-700 dark:text-sky-400">
                      ₹{listing.rentalRate?.daily}<span className="text-sm font-normal text-slate-500 dark:text-slate-400">/day</span>
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300 ml-2 font-medium">
                      or ₹{listing.rentalRate?.semester}/semester
                    </span>
                  </div>
                )}

                {listing.mode === 'swap' && (
                  <div className="text-purple-700 dark:text-purple-400 font-bold text-base flex items-center gap-1.5">
                    <ArrowLeftRight className="w-4 h-4" /> Barter Trade
                  </div>
                )}

                {listing.mode === 'free' && (
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400">FREE COMMUNITY DONATION</span>
                )}

                {listing.mode === 'wanted' && (
                  <span className="text-xl font-bold text-rose-600 dark:text-rose-400">Looking to acquire for ₹{listing.price}</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {listing.description}
              </p>

              {listing.conditionNotes && (
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">Condition Notes:</strong> {listing.conditionNotes}
                </div>
              )}
            </div>

            {/* Seller Reputation Card */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{listing.seller.name}</span>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded border dark:border-emerald-800">
                      <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified .{currentCampus.domain}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {listing.seller.major} • {listing.seller.year}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">
                    <span className="font-bold text-amber-500 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {listing.seller.karma}
                    </span>
                    <span>• {listing.seller.tradesCount} circular handoffs</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenChatWithSeller(listing)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>

            {/* Meetup Zone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Select Campus Safe Meetup Zone:
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">100% Monitored</span>
              </label>
              <select
                value={selectedMeetupZone}
                onChange={(e) => setSelectedMeetupZone(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {currentCampus.meetupZones.map((zone) => (
                  <option key={zone.id} value={zone.name}>
                    📍 {zone.name} ({zone.hours} — Safe score: {zone.safeScore})
                  </option>
                ))}
              </select>
            </div>

            {/* Mode-Specific Interaction Flow */}
            {transactionSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Transaction Initialized!</span>
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  {transactionSuccess.message}
                </p>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  Timestamp: {transactionSuccess.time} • Safe Exchange Code: #TRV-{Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {/* RENT flow selector */}
                {listing.mode === 'rent' && (
                  <div className="p-3 bg-sky-50 dark:bg-sky-950/50 rounded-xl border border-sky-200 dark:border-sky-800 text-xs space-y-2">
                    <span className="font-bold text-sky-900 dark:text-sky-200">Select Rental Duration:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRentalPeriod('daily')}
                        className={`p-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                          selectedRentalPeriod === 'daily'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sky-200 dark:border-sky-900'
                        }`}
                      >
                        <div>Daily</div>
                        <div className="text-[11px]">₹{listing.rentalRate?.daily || 25}/day</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRentalPeriod('weekly')}
                        className={`p-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                          selectedRentalPeriod === 'weekly'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sky-200 dark:border-sky-900'
                        }`}
                      >
                        <div>Weekly</div>
                        <div className="text-[11px]">₹{listing.rentalRate?.weekly || 100}/wk</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRentalPeriod('semester')}
                        className={`p-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                          selectedRentalPeriod === 'semester'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sky-200 dark:border-sky-900'
                        }`}
                      >
                        <div>Semester</div>
                        <div className="text-[11px]">₹{listing.rentalRate?.semester || 350}/term</div>
                      </button>
                    </div>
                    <div className="text-[11px] text-sky-800 dark:text-sky-300 flex justify-between pt-1">
                      <span>Rate: ₹{rentalCalc?.rate} + Refundable Deposit: ₹{rentalCalc?.deposit}</span>
                      <strong className="font-bold">Total: ₹{rentalCalc?.total}</strong>
                    </div>
                  </div>
                )}

                {/* SWAP flow text */}
                {listing.mode === 'swap' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-purple-900 dark:text-purple-300">What will you offer to swap?</label>
                    <input
                      type="text"
                      placeholder="e.g. Thomas Calculus 14th Ed, or Casio fx-991, or Python Book"
                      value={swapOfferText}
                      onChange={(e) => setSwapOfferText(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-purple-500"
                    />
                  </div>
                )}

                {/* BUY flow counter-offer toggle */}
                {listing.mode === 'buy' && isCountering && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Propose Counter Offer (₹):</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder={`Less than ₹${listing.price}`}
                        value={counterPrice}
                        onChange={(e) => setCounterPrice(e.target.value)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg text-xs w-32 focus:outline-none"
                      />
                      <button
                        onClick={() => handleExecuteDeal('offer')}
                        disabled={!counterPrice}
                        className="px-3 py-1.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-slate-800 dark:hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
                      >
                        Send Offer
                      </button>
                      <button
                        onClick={() => setIsCountering(false)}
                        className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Action Buttons */}
                <div className="flex items-center gap-3">
                  {listing.mode === 'buy' && (
                    <>
                      <button
                        onClick={() => handleExecuteDeal('buy')}
                        className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Purchase (₹{listing.price})</span>
                      </button>
                      {!isCountering && (
                        <button
                          onClick={() => setIsCountering(true)}
                          className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                        >
                          Make Offer
                        </button>
                      )}
                    </>
                  )}

                  {listing.mode === 'rent' && (
                    <button
                      onClick={() => handleExecuteDeal('rent')}
                      className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-sky-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Reserve Rental (₹{rentalCalc?.total})</span>
                    </button>
                  )}

                  {listing.mode === 'swap' && (
                    <button
                      onClick={() => handleExecuteDeal('swap')}
                      disabled={!swapOfferText}
                      className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>Propose Trade</span>
                    </button>
                  )}

                  {listing.mode === 'free' && (
                    <button
                      onClick={() => handleExecuteDeal('free')}
                      className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Claim Freebie & Pick Up</span>
                    </button>
                  )}

                  {listing.mode === 'wanted' && (
                    <button
                      onClick={() => handleExecuteDeal('offer')}
                      className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-rose-600/30 transition-all cursor-pointer"
                    >
                      I Have This Item — Message Buyer
                    </button>
                  )}

                  <button
                    onClick={() => onToggleSave(listing.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSaved
                        ? 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                    title={isSaved ? 'Saved' : 'Save'}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
