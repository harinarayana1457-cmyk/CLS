import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Camera, 
  Lock,
  PhoneCall
} from 'lucide-react';

export function SafeMeetupGuideModal({ currentCampus, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-4 h-4" /> 100% Safe Campus Protocol
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {currentCampus.name} Verified Safe Exchange Zones
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Trove eliminates sketchy off-campus transactions by partnering with student unions, campus libraries, and university police.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Safe Zones List */}
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Designated Safe Trade Spots on {currentCampus.shortName}:
            </h3>
            <div className="space-y-2.5">
              {currentCampus.meetupZones.map((zone, idx) => (
                <div 
                  key={zone.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/80 dark:bg-slate-800/80 hover:bg-emerald-50/40 dark:hover:bg-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{zone.name}</div>
                      <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {zone.hours}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                          <Camera className="w-3 h-3" /> Security Monitored
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px] border dark:border-emerald-800">
                      {zone.safeScore} Safety
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rules of Campus Circular Exchange */}
          <div className="bg-slate-100/80 dark:bg-slate-800/60 rounded-2xl p-4 space-y-3 border dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              The 4 Trove Safety Tenets
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Always Meet on Campus:</strong> Never meet in secluded off-campus alleys or private rooms.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Verify Student ID:</strong> Both parties can ask to see the verified student card or @{currentCampus.domain} profile.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Inspect Gear on Site:</strong> Test graphing calculator screens, check textbook editions, and verify lab kit contents.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Cashless or Exact Change:</strong> Use Venmo, Zelle, or exact bills at the safe exchange hub.
                </div>
              </div>
            </div>
          </div>

          {/* Campus Dispatch Emergency Hotline */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <span className="font-bold">Campus Escort & Safety Dispatch:</span>
                <div className="text-[11px] text-amber-800 dark:text-amber-300">Need assistance or safety escort on campus? Contact VIT Campus Security & Quick Response at 0416-220-2101 / Main Security Desk.</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
