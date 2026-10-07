import React from 'react';
import { 
  ShieldCheck, 
  MapPin 
} from 'lucide-react';

export function Footer({ currentCampus, onOpenSafeZonesModal, onOpenRequestModal }) {
  return (
    <footer className="w-full max-w-full overflow-hidden bg-slate-900 text-slate-400 border-t border-slate-800 text-xs pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <img src="/trove-logo.png" alt="Trove" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Trove</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">
                Campus Circular Network
              </span>
            </div>
            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              Trove is a student-powered platform enabling the seamless circulation of academic resources and everyday campus essentials. By facilitating buying, selling, renting, exchanging, and sharing within trusted university communities, we reduce student costs, eliminate dorm waste, and foster connected campus economies.
            </p>
            <div className="pt-1 flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Restricted to verified @{currentCampus.domain} students, staff, and faculty</span>
            </div>
          </div>

          {/* Circulation Hubs */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Circulate by Category</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">STEM & Course Textbooks</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Graphing Calculators & Lab Kits</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Dorm Fridges & Kettles</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Campus Cycles & Locks</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Career Fair Attire & Blazers</a></li>
            </ul>
          </div>

          {/* Campus Trust & Safety */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Campus Trust & Safety</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  type="button"
                  onClick={onOpenSafeZonesModal} 
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer py-0.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Safe Meetup Zones
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onOpenRequestModal} 
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer py-0.5"
                >
                  Post to Campus Wishlist
                </button>
              </li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Student Karma System</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Zero-Waste Campus Partnership</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors py-0.5 inline-block">Campus Security Hotline</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            <span>Built with care for</span>
            <span className="text-emerald-400 font-semibold">{currentCampus.name}</span>
            <span>• Student Circular Economy</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Exchange</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Safety Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
