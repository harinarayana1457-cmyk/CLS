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
    { label: 'Mini Drafter', query: 'Drafter' },
    { label: 'Cycles', query: 'Bicycle' },
    { label: 'Lab Coats', query: 'Lab Coat' },
    { label: 'Kettles', query: 'Kettle' },
    { label: 'Free Gear', query: '__free__' }
  ];

  return (
    <div className="relative w-full max-w-full overflow-hidden text-white pt-10 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6">
      {/* 
        Exact 4K Artwork Background
        Clean, text-free, high-definition background with subtle vignette for razor-sharp text readability
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/hero-bg.jpg"
          alt="Trove Academic Circulation Background"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        {/* Soft atmospheric radial vignette to make the white text pop with 100% crispness */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(10, 18, 35, 0.48) 0%, rgba(10, 18, 35, 0.28) 60%, rgba(10, 18, 35, 0.15) 100%)'
          }}
        />
        {/* Smooth bottom transition to the circulation hub */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-7">
        {/* Unified Sleek Campus Community Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/60 border border-white/25 backdrop-blur-xl shadow-2xl text-white text-xs sm:text-sm font-semibold hover:border-white/40 transition-colors">
            <img src="/trove-logo.png" alt="Trove Logo" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-slate-400">|</span>
            <span className="text-sm shrink-0">{currentCampus.logo}</span>
            <span className="truncate text-white font-bold">{currentCampus.name} Student Exchange</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          </div>
        </div>

        {/* Hero Title: Ultra-crisp, high-contrast, pure typography */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md">
            Circulate Academic Resources.
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-amber-300 leading-[1.1] drop-shadow-md">
            Share Everyday Campus Essentials.
          </h2>
        </div>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm px-2">
          Trove empowers university communities to <strong>buy, sell, rent, swap, and donate</strong> underutilized assets.
          Cut semester textbook costs by up to 80% and trade safely with verified <span className="text-sky-300 font-bold underline decoration-sky-300/80">@{currentCampus.domain}</span> peers.
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
              className="w-full pl-10 pr-3 py-2.5 bg-slate-950/60 text-white placeholder-slate-300 text-xs rounded-xl border border-white/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none backdrop-blur-md shadow-inner"
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

        {/* Circulation Mode Selector Buttons: Polished, High-Contrast Modern Pills */}
        <div className="pt-2 sm:pt-3 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto px-1">
          <button
            type="button"
            onClick={() => onSelectMode('buy')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              activeMode === 'buy'
                ? 'bg-sky-500 text-white shadow-sky-500/40 scale-103 border-2 border-white ring-2 ring-sky-400/50'
                : 'bg-slate-950/70 hover:bg-slate-900/90 text-white border border-white/25 backdrop-blur-md hover:border-white/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-sky-300 shrink-0" />
            <span>Buy & Sell</span>
            <span className="hidden sm:inline text-[11px] opacity-80">(80% Off)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('rent')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              activeMode === 'rent'
                ? 'bg-amber-400 text-slate-950 shadow-amber-400/40 scale-103 border-2 border-white ring-2 ring-amber-300/50 font-black'
                : 'bg-slate-950/70 hover:bg-slate-900/90 text-white border border-white/25 backdrop-blur-md hover:border-white/40'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Course Rentals</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('swap')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              activeMode === 'swap'
                ? 'bg-purple-600 text-white shadow-purple-600/40 scale-103 border-2 border-white ring-2 ring-purple-400/50'
                : 'bg-slate-950/70 hover:bg-slate-900/90 text-white border border-white/25 backdrop-blur-md hover:border-white/40'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-purple-300 shrink-0" />
            <span>Barter & Swap</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('free')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              activeMode === 'free'
                ? 'bg-rose-500 text-white shadow-rose-500/40 scale-103 border-2 border-white ring-2 ring-rose-400/50'
                : 'bg-slate-950/70 hover:bg-slate-900/90 text-white border border-white/25 backdrop-blur-md hover:border-white/40'
            }`}
          >
            <Gift className="w-4 h-4 text-rose-300 shrink-0" />
            <span>Free Share</span>
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5 text-xs text-white max-w-3xl mx-auto px-1">
          <span className="font-semibold text-slate-300 text-[11px] sm:text-xs">Popular:</span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => onQuickSearch(tag.query)}
              className="px-3 py-1 rounded-full bg-slate-950/60 hover:bg-slate-900 text-slate-200 hover:text-white border border-white/20 transition-all text-[11px] cursor-pointer backdrop-blur-md shadow-xs hover:border-white/40"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Campus Trust & Economy Stats Banner: Generous Padding so they are NEVER truncated */}
        <div className="pt-6 sm:pt-8 pb-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          {/* Card 1: Solar Gold */}
          <div className="bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 transition-all shadow-xl">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
              {currentCampus.currency === '₹' ? <IndianRupee className="w-5 h-5 stroke-[2.5]" /> : <DollarSign className="w-5 h-5 stroke-[2.5]" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight break-words">{currentCampus.moneySaved}</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-medium truncate">Saved by Peers</div>
            </div>
          </div>

          {/* Card 2: Electric Azure */}
          <div className="bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-xl border border-white/20 hover:border-sky-400/60 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 transition-all shadow-xl">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-400/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight">{currentCampus.co2SavedKg.toLocaleString()} kg</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-medium truncate">CO₂ Diverted</div>
            </div>
          </div>

          {/* Card 3: Fiery Rose */}
          <div className="bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-xl border border-white/20 hover:border-rose-400/60 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 transition-all shadow-xl">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-400/20 text-rose-300 border border-rose-400/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight">{currentCampus.itemsCirculated.toLocaleString()}+</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-medium truncate">Circulated</div>
            </div>
          </div>

          {/* Card 4: Cosmic Violet */}
          <div className="bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-xl border border-white/20 hover:border-purple-400/60 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 transition-all shadow-xl">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-400/20 text-purple-300 border border-purple-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight">{currentCampus.activeStudents.toLocaleString()}</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-medium truncate">Verified Peers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
