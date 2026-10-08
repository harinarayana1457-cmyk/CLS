import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  DollarSign, 
  IndianRupee,
  RefreshCw, 
  ShoppingBag, 
  Calendar, 
  Gift, 
  ArrowLeftRight,
  Search,
  PlusCircle
} from 'lucide-react';
import { SpectralBackground } from './SpectralBackground';

export function HeroBanner({ 
  currentCampus, 
  activeMode, 
  onSelectMode, 
  onOpenCreateModal, 
  onQuickSearch 
}) {
  const quickTags = [
    { label: 'DSA / CSE2001', query: 'CSE2001' },
    { label: 'Casio fx-991', query: 'Calculator' },
    { label: 'Mini Drafter / MEE1001', query: 'Drafter' },
    { label: 'Campus Cycles (SJT-TT)', query: 'Bicycle' },
    { label: 'White Lab Coats (SAS)', query: 'Lab Coat' },
    { label: 'Hostel Kettles', query: 'Kettle' },
    { label: 'Free Hostel Gear', query: '__free__' }
  ];

  return (
    <div className="relative w-full max-w-full overflow-hidden text-white pt-8 sm:pt-14 pb-16 sm:pb-24 px-3 sm:px-6">
      {/* 
        Dynamic Programmatic Spectral Artwork Background 
        (100% pure code — renders the azure sky, fiery red orbs, sunshine yellow, 
        moire wave curves, and stardust particles without any static images)
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <SpectralBackground intensity={1.25} interactive={true} />
        {/* Gentle transition at bottom edge only, keeping 90% of the artwork crystal clear */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
        {/* Trove Brand Emblem & Campus Community Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:scale-105 transition-transform shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
            <img src="/trove-logo.png" alt="Trove Circular Economy Emblem" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/40 border border-white/30 text-white text-xs font-semibold backdrop-blur-md shadow-lg shadow-sky-950/30 max-w-full truncate">
            <span className="text-sm sm:text-base shrink-0">{currentCampus.logo}</span>
            <span className="truncate">{currentCampus.name} Student Exchange</span>
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping shrink-0"></span>
          </div>
        </div>

        {/* Hero Title with High Contrast Drop Shadow */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          Circulate Academic Resources.<br />
          <span className="bg-gradient-to-r from-white via-yellow-200 to-sky-200 bg-clip-text text-transparent drop-shadow-lg">
            Share Everyday Campus Essentials.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-xs sm:text-base md:text-lg text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] leading-relaxed font-medium px-2">
          Trove empowers university communities to <strong className="text-yellow-300">buy, sell, rent, swap, and donate</strong> underutilized assets. 
          Cut semester textbook costs by up to 80%, keep dorm gear out of landfills, and trade safely with verified <span className="text-sky-300 font-bold underline decoration-sky-300/80">@{currentCampus.domain}</span> peers.
        </p>

        {/* Hero Mobile Search Bar */}
        <div className="md:hidden max-w-md mx-auto px-1 pt-1 flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-300">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search courses, gear..."
              onChange={(e) => onQuickSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-950/50 text-white placeholder-slate-200 text-xs rounded-xl border border-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 outline-none backdrop-blur-md shadow-inner"
            />
          </div>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="px-3.5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white text-xs font-black rounded-xl flex items-center gap-1 shrink-0 shadow-lg shadow-sky-600/40 border border-white/30 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>

        {/* Circulation Mode Selector Buttons (Electric Azure, Solar Yellow, Cosmic Violet, Crimson) */}
        <div className="pt-2 sm:pt-3 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto px-1">
          <button
            type="button"
            onClick={() => onSelectMode('buy')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'buy'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold shadow-xl shadow-sky-500/50 scale-103 border-2 border-white'
                : 'bg-slate-950/40 hover:bg-slate-900/60 text-white border border-white/30 backdrop-blur-md shadow-md'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-sky-300 shrink-0" />
            <span className="truncate">Buy & Sell</span>
            <span className="hidden sm:inline text-[11px] opacity-90">(80% Off)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('rent')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'rent'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black shadow-xl shadow-amber-400/50 scale-103 border-2 border-white'
                : 'bg-slate-950/40 hover:bg-slate-900/60 text-white border border-white/30 backdrop-blur-md shadow-md'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="truncate">Course Rentals</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('swap')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'swap'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold shadow-xl shadow-purple-500/50 scale-103 border-2 border-white'
                : 'bg-slate-950/40 hover:bg-slate-900/60 text-white border border-white/30 backdrop-blur-md shadow-md'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-purple-300 shrink-0" />
            <span className="truncate">Barter & Swap</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('free')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'free'
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold shadow-xl shadow-rose-500/50 scale-103 border-2 border-white'
                : 'bg-slate-950/40 hover:bg-slate-900/60 text-white border border-white/30 backdrop-blur-md shadow-md'
            }`}
          >
            <Gift className="w-4 h-4 text-rose-300 shrink-0" />
            <span className="truncate">Free Share</span>
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs text-white px-1">
          <span className="font-semibold text-yellow-200 text-[11px] sm:text-xs drop-shadow-sm">Popular:</span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => onQuickSearch(tag.query)}
              className="px-2.5 py-1 rounded-full bg-slate-950/40 hover:bg-slate-900/70 text-white border border-white/30 transition-colors text-[10px] sm:text-[11px] cursor-pointer backdrop-blur-md shadow-sm"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Campus Trust & Economy Stats Banner: Frosted Glass showing background through */}
        <div className="pt-4 sm:pt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto text-left">
          {/* Card 1: Solar Gold */}
          <div className="bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-md border border-amber-400/40 hover:border-amber-300 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-xl shadow-amber-500/10">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400/25 text-amber-200 border border-amber-300/40 flex items-center justify-center shrink-0">
              {currentCampus.currency === '₹' ? <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />}
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate drop-shadow-sm">{currentCampus.moneySaved}</div>
              <div className="text-[10px] sm:text-[11px] text-amber-200 font-medium truncate">Saved by Peers</div>
            </div>
          </div>

          {/* Card 2: Electric Azure */}
          <div className="bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-md border border-sky-400/40 hover:border-sky-300 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-xl shadow-sky-500/10">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-400/25 text-sky-200 border border-sky-300/40 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate drop-shadow-sm">{currentCampus.co2SavedKg.toLocaleString()} kg</div>
              <div className="text-[10px] sm:text-[11px] text-sky-200 font-medium truncate">CO₂ Diverted</div>
            </div>
          </div>

          {/* Card 3: Fiery Vermilion / Rose */}
          <div className="bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-md border border-rose-400/40 hover:border-rose-300 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-xl shadow-rose-500/10">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-rose-400/25 text-rose-200 border border-rose-300/40 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate drop-shadow-sm">{currentCampus.itemsCirculated.toLocaleString()}+</div>
              <div className="text-[10px] sm:text-[11px] text-rose-200 font-medium truncate">Circulated</div>
            </div>
          </div>

          {/* Card 4: Cosmic Violet / Indigo */}
          <div className="bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-md border border-purple-400/40 hover:border-purple-300 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-xl shadow-purple-500/10">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-400/25 text-purple-200 border border-purple-300/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate drop-shadow-sm">{currentCampus.activeStudents.toLocaleString()}</div>
              <div className="text-[10px] sm:text-[11px] text-purple-200 font-medium truncate">Verified Peers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeroBanner;
