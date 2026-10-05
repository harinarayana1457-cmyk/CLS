import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  DollarSign, 
  RefreshCw, 
  BookOpen, 
  ShoppingBag, 
  Calendar, 
  Gift, 
  ArrowLeftRight,
  Search
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
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-8 pb-14 px-4 sm:px-6">
      {/* Background Decorative Rings and Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Trove Official Brand Emblem & Campus Community Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform shrink-0">
            <img src="/trove-logo.png" alt="Trove Circular Economy Emblem" className="w-14 h-14 object-contain drop-shadow-md" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-inner">
            <span className="text-base">{currentCampus.logo}</span>
            <span>{currentCampus.name} Student Circular Exchange</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Circulate Academic Resources.<br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Share Everyday Campus Essentials.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
          Trove empowers university communities to <strong>buy, sell, rent, swap, and donate</strong> underutilized assets. 
          Cut semester textbook costs by up to 80%, keep dorm gear out of landfills, and trade safely with verified <span className="text-emerald-400 font-semibold">@{currentCampus.domain}</span> peers.
        </p>

        {/* Circulation Mode Selector Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => onSelectMode('buy')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'buy'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Buy & Sell (60-80% Off)</span>
          </button>

          <button
            onClick={() => onSelectMode('rent')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'rent'
                ? 'bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-400/30 scale-105'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Rent for Courses</span>
          </button>

          <button
            onClick={() => onSelectMode('swap')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'swap'
                ? 'bg-purple-400 text-slate-950 font-bold shadow-lg shadow-purple-400/30 scale-105'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-purple-400" />
            <span>Barter & Swap</span>
          </button>

          <button
            onClick={() => onSelectMode('free')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'free'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/30 scale-105'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Free / Pay-It-Forward</span>
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
          <span className="font-medium text-slate-300">Popular on {currentCampus.shortName}:</span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => onQuickSearch(tag.query)}
              className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors text-[11px] cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Campus Trust & Economy Stats Banner */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{currentCampus.moneySaved}</div>
              <div className="text-[11px] text-slate-400 font-medium">Student Wallets Saved</div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{currentCampus.co2SavedKg.toLocaleString()} kg</div>
              <div className="text-[11px] text-slate-400 font-medium">CO₂ Kept From Atmo</div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{currentCampus.itemsCirculated.toLocaleString()}+</div>
              <div className="text-[11px] text-slate-400 font-medium">Assets Re-Circulated</div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{currentCampus.activeStudents.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 font-medium">Verified .EDU Peers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
