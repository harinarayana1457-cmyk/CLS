import React, { useState } from 'react';
import { 
  Leaf, 
  DollarSign, 
  Trash2, 
  TreePine, 
  RotateCw, 
  TrendingUp, 
  Award, 
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export function ImpactDashboard({ currentCampus, userCirculationsCount = 4 }) {
  // Personal semester circularity calculator
  const [textbooksCount, setTextbooksCount] = useState(3);
  const [techRentCount, setTechRentCount] = useState(1);
  const [dormPassCount, setDormPassCount] = useState(2);

  // Formulas for realistic student campus savings (in INR ₹):
  const estimatedSavings = (textbooksCount * 850) + (techRentCount * 1100) + (dormPassCount * 550);
  const estimatedCO2 = (textbooksCount * 7.5) + (techRentCount * 12.0) + (dormPassCount * 18.0);
  const estimatedWasteKg = (textbooksCount * 2.1) + (techRentCount * 0.8) + (dormPassCount * 9.5);
  const treesSaved = (estimatedCO2 / 21).toFixed(1);

  return (
    <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-800 mb-2">
              <RotateCw className="w-3.5 h-3.5" /> Campus Circular Economy Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trove Fosters a Low-Cost, Zero-Waste Campus
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
              Every semester, thousands of textbooks, graphing calculators, mini fridges, and lab coats sit idle in closets or end up in dumpsters. Trove recirculates them between students.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
              🌱
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">{currentCampus.shortName} Zero-Waste Goal 2026</div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-32 bg-emerald-200 dark:bg-emerald-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 dark:bg-emerald-400 h-full rounded-full" style={{ width: '74%' }}></div>
                </div>
                <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">74% Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linear Economy vs. Trove Circular Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-rose-500" /> The Traditional Campus Waste Loop
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-200/80 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">Costly & Wasteful</span>
            </div>
            <p className="text-xs text-rose-950/80 dark:text-rose-200/80 leading-relaxed">
              Buy retail at inflated campus bookstore rates (₹1,500 - ₹3,500/semester) ➔ Use for 14 weeks ➔ Asset sits abandoned in a closet or is thrown into move-out trash bins ➔ Campus landfills overflow and student debt piles up.
            </p>
            <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2 pt-1 border-t border-rose-200/60 dark:border-rose-900/40">
              <span>Avg Student Waste:</span>
              <strong className="text-rose-900 dark:text-rose-100 font-extrabold">~₹8,500/year wasted on single-term items + 65 kg dorm waste</strong>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> The Trove Student Circulation Loop
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 font-bold">100% Circular</span>
            </div>
            <p className="text-xs text-emerald-950/90 dark:text-emerald-200/90 leading-relaxed">
              Acquire gently-used assets from peers or rent for the exact weeks you need ➔ Safely exchange at campus safe zones ➔ Pass along, resell, or pay-it-forward to incoming juniors when you graduate.
            </p>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 pt-1 border-t border-emerald-200 dark:border-emerald-800">
              <span>Community Benefit:</span>
              <strong className="text-emerald-900 dark:text-emerald-100 font-extrabold">70%+ reduction in out-of-pocket costs & zero-landfill footprint</strong>
            </div>
          </div>
        </div>

        {/* Interactive Personal Impact Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-slate-800/80 relative overflow-hidden">
          {/* Ambient decorative blur circle */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Interactive Circularity Estimator
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Estimate Your Semester Savings & Environmental Offset
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  Adjust your expected academic & dorm needs to calculate how much money and carbon you divert by circulating through Trove:
                </p>
              </div>

              <div className="space-y-5 bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-white/5">
                {/* Textbooks slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-200 flex items-center gap-1.5">📚 Textbooks Circulated / Bought Used:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                      {textbooksCount} {textbooksCount === 1 ? 'course book' : 'course books'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={textbooksCount}
                    onChange={(e) => setTextbooksCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700/80 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>0</span>
                    <span>2</span>
                    <span>4</span>
                    <span>6</span>
                    <span>8 books</span>
                  </div>
                </div>

                {/* Tech / Lab Rent slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-200 flex items-center gap-1.5">🔬 Lab Kits / Calculators / Tech Rented:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-extrabold text-xs border border-sky-500/30">
                      {techRentCount} {techRentCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={techRentCount}
                    onChange={(e) => setTechRentCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700/80 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>5 items</span>
                  </div>
                </div>

                {/* Dorm essentials slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-200 flex items-center gap-1.5">🛋️ Dorm Gear / Move-in Supplies Circulated:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30">
                      {dormPassCount} {dormPassCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    step="1"
                    value={dormPassCount}
                    onChange={(e) => setDormPassCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700/80 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>0</span>
                    <span>2</span>
                    <span>4</span>
                    <span>6 items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Output Cards */}
            <div className="lg:col-span-5 bg-slate-800/80 dark:bg-slate-900/90 rounded-2xl p-6 border border-emerald-500/30 shadow-xl space-y-4 backdrop-blur-md">
              <div className="text-center pb-3 border-b border-slate-700/80">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Your Semester Impact With Trove
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1.5 drop-shadow-sm">
                  ₹{estimatedSavings.toLocaleString()}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1">Estimated Direct Student Savings</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-slate-900/80 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-700/60 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold">
                    <Leaf className="w-4 h-4" /> CO₂ Offset
                  </div>
                  <div className="text-xl font-black text-white mt-1">{estimatedCO2.toFixed(1)} kg</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Equivalent to planting {treesSaved} trees</div>
                </div>

                <div className="bg-slate-900/80 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-700/60 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <Trash2 className="w-4 h-4" /> Waste Diverted
                  </div>
                  <div className="text-xl font-black text-white mt-1">{estimatedWasteKg.toFixed(1)} kg</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Kept out of campus dumpsters</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="leading-snug">
                  You unlock the <strong>"Campus Eco Sentinel"</strong> verified student badge this term!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
