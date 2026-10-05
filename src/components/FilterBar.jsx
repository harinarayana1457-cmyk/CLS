import React from 'react';
import { 
  CIRCULATION_MODES, 
  CATEGORIES, 
  CONDITIONS 
} from '../data/categories';
import { 
  Filter, 
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
  MapPin
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
    <div className="space-y-4">
      {/* Primary Circulation Mode Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          {CIRCULATION_MODES.map((mode) => {
            const isSelected = activeMode === mode.id;
            const IconComp = mode.icon ? MODE_ICON_MAP[mode.icon] : null;

            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {IconComp && <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`} />}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results counter and reset */}
        <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 pl-4">
          <span>{totalResultsCount} items available</span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Secondary Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const IconComp = CATEGORY_ICON_MAP[cat.icon] || Grid;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sorting Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Refine:</span>
          </div>

          {/* Condition Filter */}
          <select
            value={selectedCondition}
            onChange={(e) => onSelectCondition(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Any Condition</option>
            {CONDITIONS.map((cond) => (
              <option key={cond.id} value={cond.id}>
                {cond.label}
              </option>
            ))}
          </select>

          {/* Safe Meetup Zone Filter */}
          <select
            value={selectedZone}
            onChange={(e) => onSelectZone(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:border-emerald-500 max-w-[200px] truncate"
          >
            <option value="all">Any Campus Zone</option>
            {currentCampus.meetupZones.map((zone) => (
              <option key={zone.id} value={zone.name}>
                📍 {zone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="recent">Most Recent</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="eco-score">Highest Eco & CO₂ Score</option>
            <option value="popular">Most In-Demand / Saved</option>
          </select>
        </div>
      </div>
    </div>
  );
}
