import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Package, 
  CheckCircle2
} from 'lucide-react';

export function UserProfileModal({ currentCampus, userListings = [], onClose }) {
  const [activeTab, setActiveTab] = useState('listings'); // listings | badges | impact

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-6 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Ananya Iyer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white/90 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-sky-400 border-2 border-slate-900 rounded-full flex items-center justify-center text-[10px] text-slate-950 font-bold">
                ✓
              </span>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">Ananya Iyer</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-sky-400/20 text-sky-300 border border-sky-400/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> @{currentCampus.domain} Verified
                </span>
              </div>
              <p className="text-xs text-slate-200">
                Senior • Computer Science & Engg • {currentCampus.name}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-0.5 text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" /> 4.96 Karma
                </span>
                <span>•</span>
                <span className="text-sky-200 font-semibold">34 Handoffs</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-950/40 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-white/10 text-center">
            <div>
              <div className="text-[10px] sm:text-xs text-slate-300">Student Savings</div>
              <div className="text-sm sm:text-base font-black text-sky-300">{currentCampus?.currency || '₹'}12,400</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-slate-300">CO₂ Diverted</div>
              <div className="text-sm sm:text-base font-black text-teal-300">84.2 kg</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-slate-300">Waste Prevented</div>
              <div className="text-sm sm:text-base font-black text-amber-300">22.5 kg</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable on mobile) */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 text-xs font-bold overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'listings'
                ? 'border-sky-600 text-sky-700 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            My Circulations ({userListings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'badges'
                ? 'border-sky-600 text-sky-700 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Badges & Trust Score (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('impact')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'impact'
                ? 'border-sky-600 text-sky-700 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Campus Sustainability Ledger
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs pb-safe sm:pb-6">
          {activeTab === 'listings' && (
            <div className="space-y-2.5 sm:space-y-3">
              {userListings.length === 0 ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                  <Package className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                  <p>You haven't listed any campus assets yet.</p>
                  <p className="text-[11px] mt-1 text-slate-500 dark:text-slate-400">Circulate textbooks, lab kits, or dorm gear to earn karma!</p>
                </div>
              ) : (
                userListings.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{item.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.mode.toUpperCase()} • {item.price ? `₹${item.price}` : 'Free / Trade'} • {item.postedDate}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-bold text-[10px] shrink-0 border border-sky-200 dark:border-sky-800">
                      Active
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-start gap-2.5">
                <span className="text-2xl shrink-0">🌱</span>
                <div>
                  <div className="font-bold text-sky-950 dark:text-sky-200">Eco Sentinel Level 3</div>
                  <div className="text-[11px] text-sky-800 dark:text-sky-300">Diverted over 50kg of carbon and dorm waste.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5">
                <span className="text-2xl shrink-0">🤝</span>
                <div>
                  <div className="font-bold text-amber-950 dark:text-amber-200">Master Lender</div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-300">100% on-time return rate with zero disputes.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-start gap-2.5">
                <span className="text-2xl shrink-0">📚</span>
                <div>
                  <div className="font-bold text-sky-950 dark:text-sky-200">Study Hero</div>
                  <div className="text-[11px] text-sky-800 dark:text-sky-300">Shared notes and textbooks for 6 core STEM classes.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-start gap-2.5">
                <span className="text-2xl shrink-0">🛡️</span>
                <div>
                  <div className="font-bold text-purple-950 dark:text-purple-200">Safe Zone Certified</div>
                  <div className="text-[11px] text-purple-800 dark:text-purple-300">Exclusively conducts handoffs at verified campus safe zones.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Semester Circular Contribution</span>
                  <span className="text-sky-600 dark:text-sky-400">Top 5% on {currentCampus.shortName}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  By circulating 34 textbooks, lab tools, and dorm items, you've saved peers ₹12,400 this academic year and kept 22.5 kg of reusable goods out of landfills.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span className="font-semibold text-sky-900 dark:text-sky-200">Official Campus Eco Recognition</span>
                </div>
                <span className="font-bold text-sky-700 dark:text-sky-300">Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
