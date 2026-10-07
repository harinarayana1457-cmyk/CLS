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
    <div className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-6 sm:pt-8 pb-10 sm:pb-14 px-3 sm:px-6">
      {/* Background Decorative Rings and Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-6 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
        {/* Trove Official Brand Emblem & Campus Community Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:scale-105 transition-transform shrink-0">
            <img src="/trove-logo.png" alt="Trove Circular Economy Emblem" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-inner max-w-full truncate">
            <span className="text-sm sm:text-base shrink-0">{currentCampus.logo}</span>
            <span className="truncate">{currentCampus.name} Student Exchange</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Circulate Academic Resources.<br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Share Everyday Campus Essentials.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-xs sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal px-2">
          Trove empowers university communities to <strong>buy, sell, rent, swap, and donate</strong> underutilized assets. 
          Cut semester textbook costs by up to 80%, keep dorm gear out of landfills, and trade safely with verified <span className="text-emerald-400 font-semibold">@{currentCampus.domain}</span> peers.
        </p>

        {/* Hero Mobile Search Bar (Direct Quick Access on Phones) */}
        <div className="md:hidden max-w-md mx-auto px-1 pt-1 flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search courses, gear..."
              onChange={(e) => onQuickSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-800/90 text-white placeholder-slate-400 text-xs rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none backdrop-blur-md shadow-inner"
            />
          </div>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>

        {/* Circulation Mode Selector Buttons (2x2 Grid on Mobile, Flex on Desktop) */}
        <div className="pt-1 sm:pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-1">
          <button
            type="button"
            onClick={() => onSelectMode('buy')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'buy'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 scale-102'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Buy & Sell</span>
            <span className="hidden sm:inline text-[11px] opacity-80">(80% Off)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('rent')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'rent'
                ? 'bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-400/30 scale-102'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate">Course Rentals</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('swap')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'swap'
                ? 'bg-purple-400 text-slate-950 font-bold shadow-lg shadow-purple-400/30 scale-102'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate">Barter & Swap</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('free')}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeMode === 'free'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/30 scale-102'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Free Share</span>
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400 px-1">
          <span className="font-medium text-slate-300 text-[11px] sm:text-xs">Popular:</span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => onQuickSearch(tag.query)}
              className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors text-[10px] sm:text-[11px] cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Campus Trust & Economy Stats Banner */}
        <div className="pt-4 sm:pt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-slate-800/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/60 hover:border-emerald-500/40 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-md shadow-black/20">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              {currentCampus.currency === '₹' ? <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />}
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.moneySaved}</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium truncate">Saved by Peers</div>
            </div>
          </div>

          <div className="bg-slate-800/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/60 hover:border-teal-500/40 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-md shadow-black/20">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.co2SavedKg.toLocaleString()} kg</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium truncate">CO₂ Diverted</div>
            </div>
          </div>

          <div className="bg-slate-800/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/60 hover:border-sky-500/40 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-md shadow-black/20">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.itemsCirculated.toLocaleString()}+</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium truncate">Circulated</div>
            </div>
          </div>

          <div className="bg-slate-800/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 transition-all shadow-md shadow-black/20">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight truncate">{currentCampus.activeStudents.toLocaleString()}</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium truncate">Verified Peers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
