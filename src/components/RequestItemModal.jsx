import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function RequestItemModal({ currentCampus, onClose, onAddRequest }) {
  const [needTitle, setNeedTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState('Within 24 Hours');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!needTitle.trim()) return;

    const newRequestListing = {
      id: `trv-req-${Date.now()}`,
      campusId: currentCampus.id,
      title: `WANTED: ${needTitle}`,
      category: 'textbooks',
      courseCode: courseCode.trim() ? courseCode.toUpperCase() : null,
      department: currentCampus.shortName,
      mode: 'wanted',
      price: Number(budget) || 20,
      originalPrice: (Number(budget) || 20) * 2,
      rentalRate: null,
      condition: 'good',
      conditionNotes: 'Any working / usable condition accepted',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
      description: `${details || 'Urgent campus resource needed.'} (Urgency: ${urgency})`,
      seller: {
        name: 'Ananya Iyer',
        email: `ananya.iyer2023@${currentCampus.domain}`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        major: 'Computer Science & Engineering',
        year: 'Senior',
        karma: 4.96,
        tradesCount: 34,
        verifiedEdu: true,
        badges: ['Active Seeker', 'Verified Student']
      },
      preferredMeetup: currentCampus.meetupZones[0].name,
      sustainability: {
        co2SavedKg: 6.2,
        dollarsSaved: 40
      },
      postedDate: 'Just now',
      likesCount: 1,
      tags: ['Wanted', 'Campus Request', urgency]
    };

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    onAddRequest(newRequestListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" /> Post a Campus Resource Wishlist / Request
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Can't find a book or equipment? Let peers with underutilized assets find you!
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
              What do you need? *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. TI-84 Plus CE, or Organic Chemistry 2 Model Kit, or Desk Lamp"
              value={needTitle}
              onChange={(e) => setNeedTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-rose-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Course Code (if applicable)
              </label>
              <input
                type="text"
                placeholder="e.g. CS 61A or MATH 53"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-rose-500 uppercase font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Max Willing to Pay / Rent ({currentCampus?.currency || '₹'})
              </label>
              <input
                type="number"
                placeholder="e.g. 250 or ₹50/week"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-rose-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
              How urgently is this needed?
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-rose-500 font-medium"
            >
              <option value="Urgent: Needed Today / Tonight">🚨 Urgent: Needed Today / Tonight</option>
              <option value="Within 24-48 Hours">⚡ Within 24-48 Hours (Before lab/quiz)</option>
              <option value="Sometime this week">📅 Sometime this week</option>
              <option value="Anytime this semester">🌿 Anytime this semester</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
              Additional Details or Swap Offers
            </label>
            <textarea
              rows="3"
              placeholder="e.g. Will buy outright or borrow for Midterm 1 on Thursday! Can meet at Moffitt or MLK."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-rose-500 font-medium"
            />
          </div>

          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 flex items-start gap-2">
            <Users className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Campus Smart Match:</strong> Posting this notifies students in {currentCampus.shortName} who previously took this course or have idle gear in their dorm.
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl shadow-md shadow-rose-600/30 transition-all cursor-pointer"
            >
              Broadcast Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
