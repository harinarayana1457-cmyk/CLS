import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Camera, 
  PhoneCall
} from 'lucide-react';

export function SafeMeetupGuideModal({ currentCampus, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-4 sm:p-6 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 100% Safe Campus Protocol
          </div>
          <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
            {currentCampus.name} Verified Safe Zones
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 mt-1 max-w-lg">
            Trove eliminates off-campus risk by partnering with student libraries, student unions, and campus security.
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs pb-safe sm:pb-6">
          {/* Safe Zones List */}
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm mb-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Designated Safe Trade Spots on {currentCampus.shortName}:
            </h3>
            <div className="space-y-2">
              {currentCampus.meetupZones.map((zone, idx) => (
                <div 
                  key={zone.id}
                  className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50/80 dark:bg-slate-800/80 flex items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">{zone.name}</div>
                      <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 text-[10px] sm:text-[11px] flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" /> {zone.hours}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                          <Camera className="w-3 h-3 shrink-0" /> Security Monitored
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] sm:text-[11px] border dark:border-emerald-800">
                      {zone.safeScore} Safety
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rules of Campus Circular Exchange */}
          <div className="bg-slate-100/80 dark:bg-slate-800/60 rounded-2xl p-3.5 sm:p-4 space-y-2.5 border dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              The 4 Trove Safety Tenets
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Always Meet on Campus:</strong> Never meet in secluded alleys or off-campus sites.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Verify Student ID:</strong> Ask to see the verified student card or @{currentCampus.domain} profile.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Inspect Gear on Site:</strong> Test calculator screens and verify lab equipment contents.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">UPI / Cash / Exact Change:</strong> Pay conveniently and safely right during the handoff.
                </div>
              </div>
            </div>
          </div>

          {/* Campus Dispatch Emergency Hotline */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <span className="font-bold">Campus Safety Hotline:</span>
                <div className="text-amber-800 dark:text-amber-300 text-[10px] sm:text-[11px]">Contact Campus Security & Quick Response desk anytime for assistance.</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
