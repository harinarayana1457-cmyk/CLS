import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Award, 
  Leaf, 
  DollarSign, 
  Trash2, 
  Package, 
  CheckCircle2, 
  Calendar,
  ExternalLink
} from 'lucide-react';

export function UserProfileModal({ currentCampus, userListings = [], onClose }) {
  const [activeTab, setActiveTab] = useState('listings'); // listings | badges | impact

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Ananya Iyer"
                className="w-20 h-20 rounded-full object-cover border-4 border-white/90 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-2 border-slate-900 rounded-full flex items-center justify-center text-[10px] text-slate-950 font-bold">
                ✓
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-black text-white">Ananya Iyer</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> @{currentCampus.domain} Verified
                </span>
              </div>
              <p className="text-xs text-slate-200">
                Senior • Computer Science & Engg (SCOPE) • {currentCampus.name}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Star className="w-4 h-4 fill-amber-300" /> 4.96 Campus Karma
                </span>
                <span>•</span>
                <span className="text-emerald-200 font-semibold">34 Verified Handoffs</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-5 grid grid-cols-3 gap-2 bg-slate-950/40 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
            <div>
              <div className="text-xs text-slate-300">Money Saved / Earned</div>
              <div className="text-base font-extrabold text-emerald-300">{currentCampus?.currency || '₹'}12,400</div>
            </div>
            <div>
              <div className="text-xs text-slate-300">CO₂ Diverted</div>
              <div className="text-base font-extrabold text-teal-300">84.2 kg</div>
            </div>
            <div>
              <div className="text-xs text-slate-300">Landfill Diverted</div>
              <div className="text-base font-extrabold text-amber-300">22.5 kg</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-2 bg-slate-50 dark:bg-slate-900 text-xs font-bold">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'listings'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            My Circulations ({userListings.length})
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'badges'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Badges & Trust Score (4)
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'impact'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Campus Sustainability Ledger
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto text-xs">
          {activeTab === 'listings' && (
            <div className="space-y-3">
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
                          {item.mode.toUpperCase()} • {item.price ? `${currentCampus?.currency || '₹'}${item.price}` : 'Free / Trade'} • {item.postedDate}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] shrink-0 border dark:border-emerald-800">
                      Active
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
                <span className="text-2xl">🌱</span>
                <div>
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">Eco Sentinel Level 3</div>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300">Diverted over 50kg of carbon and dorm waste.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5">
                <span className="text-2xl">🤝</span>
                <div>
                  <div className="font-bold text-amber-950 dark:text-amber-200">Master Lender</div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-300">100% on-time return rate with zero disputes.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-start gap-2.5">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="font-bold text-sky-950 dark:text-sky-200">Study Hero</div>
                  <div className="text-[11px] text-sky-800 dark:text-sky-300">Shared notes and textbooks for 6 core STEM classes.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-start gap-2.5">
                <span className="text-2xl">🛡️</span>
                <div>
                  <div className="font-bold text-purple-950 dark:text-purple-200">Safe Zone Certified</div>
                  <div className="text-[11px] text-purple-800 dark:text-purple-300">Completed 100% of trades at verified campus spots.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Your Circular History Ledger</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  All items you circulate are tracked on the campus environmental ledger:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Thomas' Calculus 14th Ed (MAT1011)</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">+8.4 kg CO₂ prevented</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Official VIT Lab Coat & Anti-Fog Goggles</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">+9.3 kg CO₂ prevented</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Omega Engineering Drafter & Mini Scale</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">+6.2 kg CO₂ prevented</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
