import React from 'react';
import { 
  CIRCULATION_MODES, 
  CATEGORIES, 
  CONDITIONS 
} from '../data/categories';
import { 
  SlidersHorizontal, 
  X, 
  Tag, 
  Calendar, 
  ArrowLeftRight, 
  Gift, 
  SearchCheck, 
  Grid,
  BookOpen,
  FlaskConical,
  Laptop,
  Armchair,
  Bike,
  Shirt,
  Package,
  MapPin,
  ArrowUpDown
} from 'lucide-react';

const MODE_ICON_MAP = {
  Tag: Tag,
  Calendar: Calendar,
  ArrowLeftRight: ArrowLeftRight,
  Gift: Gift,
  SearchCheck: SearchCheck
};

const CATEGORY_ICON_MAP = {
  Grid: Grid,
  BookOpen: BookOpen,
  FlaskConical: FlaskConical,
  Laptop: Laptop,
  Armchair: Armchair,
  Bike: Bike,
  Shirt: Shirt,
  Package: Package
};

export function FilterBar({
  currentCampus,
  activeMode,
  onSelectMode,
  activeCategory,
  onSelectCategory,
  selectedCondition,
  onSelectCondition,
  selectedZone,
  onSelectZone,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResultsCount
}) {
  const hasActiveFilters = activeMode !== 'all' || activeCategory !== 'all' || selectedCondition !== 'all' || selectedZone !== 'all';

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Primary Circulation Mode Tabs (Swipeable on touch) */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar gap-2 touch-pan-x">
        <div className="flex items-center gap-1.5 shrink-0">
          {CIRCULATION_MODES.map((mode) => {
            const isSelected = activeMode === mode.id;
            const IconComp = mode.icon ? MODE_ICON_MAP[mode.icon] : null;

            const getModeActiveClass = (id) => {
              switch (id) {
                case 'buy': return 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 font-black';
                case 'rent': return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/25 font-black';
                case 'swap': return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/25 font-black';
                case 'free': return 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/25 font-black';
                case 'wanted': return 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/25 font-black';
                default: return 'bg-slate-900 dark:bg-sky-600 text-white shadow-sm font-bold';
              }
            };

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelectMode(mode.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? getModeActiveClass(mode.id)
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold'
                }`}
              >
                {IconComp && <IconComp className={`w-3.5 h-3.5 ${isSelected ? (mode.id === 'rent' ? 'text-slate-950' : 'text-white') : 'text-slate-500 dark:text-slate-400'}`} />}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results counter and reset */}
        <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 pl-2 sm:pl-4">
          <span className="text-[11px] sm:text-xs">{totalResultsCount} items</span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center gap-0.5 sm:gap-1 hover:underline cursor-pointer text-[11px] sm:text-xs"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Secondary Category Pills (Swipeable on mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 touch-pan-x">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const IconComp = CATEGORY_ICON_MAP[cat.icon] || Grid;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-2.5 py-1.5 sm:px-3 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-600 dark:text-sky-400'}`} />
              <span className="text-[11px] sm:text-xs">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sorting Row (Mobile: Responsive Grid) */}
      <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
          {/* Condition Filter */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
            <select
              value={selectedCondition}
              onChange={(e) => onSelectCondition(e.target.value)}
              className="w-full bg-transparent text-slate-700 dark:text-slate-200 font-medium focus:outline-none text-xs cursor-pointer"
            >
              <option value="all">Any Condition</option>
              {CONDITIONS.map((cond) => (
                <option key={cond.id} value={cond.id} className="dark:bg-slate-800">
                  {cond.label}
                </option>
              ))}
            </select>
          </div>

          {/* Safe Meetup Zone Filter */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
            <select
              value={selectedZone}
              onChange={(e) => onSelectZone(e.target.value)}
              className="w-full bg-transparent text-slate-700 dark:text-slate-200 font-medium focus:outline-none text-xs truncate cursor-pointer"
            >
              <option value="all">Any Campus Zone</option>
              {currentCampus.meetupZones.map((zone) => (
                <option key={zone.id} value={zone.name} className="dark:bg-slate-800">
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-transparent text-slate-700 dark:text-slate-200 font-semibold focus:outline-none text-xs cursor-pointer"
            >
              <option value="recent" className="dark:bg-slate-800">Most Recent</option>
              <option value="price-asc" className="dark:bg-slate-800">Price: Low to High</option>
              <option value="price-desc" className="dark:bg-slate-800">Price: High to Low</option>
              <option value="eco-score" className="dark:bg-slate-800">Highest Eco & CO₂</option>
              <option value="popular" className="dark:bg-slate-800">Most In-Demand</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
