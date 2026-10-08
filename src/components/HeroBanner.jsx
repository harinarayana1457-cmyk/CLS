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
    { label: 'Mini Drafter / MEE1001', query: 'Drafter' },
    { label: 'Campus Cycles (SJT-TT)', query: 'Bicycle' },
    { label: 'White Lab Coats (SAS)', query: 'Lab Coat' },
    { label: 'Hostel Kettles', query: 'Kettle' },
    { label: 'Free Hostel Gear', query: '__free__' }
  ];

  return (
    <div className="relative w-full max-w-full overflow-hidden bg-slate-950 text-white pt-8 sm:pt-12 pb-12 sm:pb-16 px-3 sm:px-6">
      {/* Dynamic Cosmic Gradient Artwork Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src="/hero-bg.jpg" 
          alt="Cosmic gradient mesh" 
          className="w-full h-full object-cover object-center opacity-65 dark:opacity-50 scale-105 filter blur-[0.3px]"
        />
        {/* Layered atmospheric glows & contrast masks for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/50 via-transparent to-rose-950/40"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
        {/* Trove Brand Emblem & Campus Community Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:scale-105 transition-transform shrink-0">
            <img src="/trove-logo.png" alt="Trove Circular Economy Emblem" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-400/40 text-sky-200 text-xs font-semibold backdrop-blur-md shadow-lg shadow-sky-500/10 max-w-full truncate">
            <span className="text-sm sm:text-base shrink-0">{currentCampus.logo}</span>
            <span className="truncate">{currentCampus.name} Student Exchange</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping shrink-0"></span>
          </div>
        </div>

        {/* Hero Title with Spectral Gradient */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Circulate Academic Resources.<br />
          <span className="bg-gradient-to-r from-sky-400 via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
            Share Everyday Campus Essentials.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-xs sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal px-2">
          Trove empowers university communities to <strong>buy, sell, rent, swap, and donate</strong> underutilized assets. 
          Cut semester textbook costs by up to 80%, keep dorm gear out of landfills, and trade safely with verified <span className="text-sky-300 font-bold">@{currentCampus.domain}</span> peers.
        </p>

        {/* Hero Mobile Search Bar */}
        <div className="md:hidden max-w-md mx-auto px-1 pt-1 flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search courses, gear..."
              onChange={(e) => onQuickSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 text-white placeholder-slate-400 text-xs rounded-xl border border-slate-700/80 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none backdrop-blur-md shadow-inner"
            />
          </div>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="px-3 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 shadow-md shadow-sky-600/30"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>

        {/* Circulation Mode Selector Buttons (Cosmic Palette: Azure, Amber, Crimson, Indigo) */}
        <div className="pt-1 sm:pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-1">
          <button
            type="button"
            onClick={() => onSelectMode('buy')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'buy'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-lg shadow-sky-500/40 scale-102 border border-sky-400/50'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate">Buy & Sell</span>
            <span className="hidden sm:inline text-[11px] opacity-80">(80% Off)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('rent')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'rent'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-400/40 scale-102 border border-amber-300'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Course Rentals</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('swap')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'swap'
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold shadow-lg shadow-rose-500/40 scale-102 border border-rose-400/50'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="truncate">Barter & Swap</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('free')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'free'
                ? 'bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-bold shadow-lg shadow-indigo-500/40 scale-102 border border-indigo-400/50'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md'
            }`}
          >
            <Gift className="w-4 h-4 text-sky-300 shrink-0" />
            <span className="truncate">Free Share</span>
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-300 px-1">
          <span className="font-medium text-slate-400 text-[11px] sm:text-xs">Popular:</span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => onQuickSearch(tag.query)}
              className="px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-colors text-[10px] sm:text-[11px] cursor-pointer backdrop-blur-sm"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Campus Trust & Economy Stats Banner */}
        <div className="pt-4 sm:pt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto text-left">
          {/* Card 1: Solar Gold */}
          <div className="bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-lg shadow-amber-500/5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
              {currentCampus.currency === '₹' ? <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />}
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.moneySaved}</div>
              <div className="text-[10px] sm:text-[11px] text-amber-200/80 font-medium truncate">Saved by Peers</div>
            </div>
          </div>

          {/* Card 2: Electric Azure */}
          <div className="bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md border border-sky-500/30 hover:border-sky-400/60 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-lg shadow-sky-500/5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.co2SavedKg.toLocaleString()} kg</div>
              <div className="text-[10px] sm:text-[11px] text-sky-200/80 font-medium truncate">CO₂ Diverted</div>
            </div>
          </div>

          {/* Card 3: Radiant Rose */}
          <div className="bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md border border-rose-500/30 hover:border-rose-400/60 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-lg shadow-rose-500/5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.itemsCirculated.toLocaleString()}+</div>
              <div className="text-[10px] sm:text-[11px] text-rose-200/80 font-medium truncate">Circulated</div>
            </div>
          </div>

          {/* Card 4: Cosmic Indigo */}
          <div className="bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 hover:border-indigo-400/60 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-lg shadow-indigo-500/5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.activeStudents.toLocaleString()}</div>
              <div className="text-[10px] sm:text-[11px] text-indigo-200/80 font-medium truncate">Verified Peers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
