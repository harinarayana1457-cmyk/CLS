import React, { useState } from 'react';
import { 
  X, 
  Leaf, 
  Sparkles, 
  Calendar, 
  ArrowLeftRight, 
  Gift, 
  ShoppingBag,
  MapPin
} from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/categories';
import confetti from 'canvas-confetti';

const SAMPLE_PHOTOS = [
  { label: 'STEM Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Graphing Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lab Coat & Goggles', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mini Fridge / Appliance', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Interview Blazer / Suit', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
  { label: 'Campus Bicycle / Lock', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80' }
];

export function CreateListingModal({ currentCampus, onClose, onAddListing }) {
  const [mode, setMode] = useState('buy'); // buy | rent | swap | free
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('textbooks');
  const [courseCode, setCourseCode] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [dailyRent, setDailyRent] = useState('');
  const [semesterRent, setSemesterRent] = useState('');
  const [swapFor, setSwapFor] = useState('');
  const [condition, setCondition] = useState('excellent');
  const [conditionNotes, setConditionNotes] = useState('');
  const [description, setDescription] = useState('');
  const [preferredMeetup, setPreferredMeetup] = useState(currentCampus.meetupZones[0].name);
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PHOTOS[0].url);

  // Live Eco-Impact estimate
  const estimatedCO2 = category === 'textbooks' ? 8.4 : category === 'dorm-essentials' ? 24.5 : 12.0;
  const estimatedSavings = price && originalPrice ? Math.max(0, Number(originalPrice) - Number(price)) : 45;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newListing = {
      id: `trv-${Date.now()}`,
      campusId: currentCampus.id,
      title,
      category,
      courseCode: courseCode.trim() ? courseCode.toUpperCase() : null,
      department: currentCampus.shortName,
      mode,
      price: mode === 'buy' ? Number(price) : null,
      originalPrice: originalPrice ? Number(originalPrice) : null,
      rentalRate: mode === 'rent' ? {
        daily: Number(dailyRent) || 4,
        weekly: (Number(dailyRent) || 4) * 4,
        semester: Number(semesterRent) || 30
      } : null,
      swapFor: mode === 'swap' ? swapFor : null,
      deposit: mode === 'rent' ? 25 : null,
      condition,
      conditionNotes,
      image: selectedImage,
      description: description || 'Available for campus exchange.',
      seller: {
        name: 'Ananya Iyer',
        email: `ananya.iyer2023@${currentCampus.domain}`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        major: 'Computer Science & Engineering',
        year: 'Senior',
        karma: 4.96,
        tradesCount: 34,
        verifiedEdu: true,
        badges: ['Eco Champion', 'Verified Student', 'Safe Trader']
      },
      preferredMeetup,
      sustainability: {
        co2SavedKg: estimatedCO2,
        dollarsSaved: estimatedSavings
      },
      postedDate: 'Just now',
      likesCount: 1,
      tags: [category, mode, currentCampus.shortName]
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Circulate Asset in {currentCampus.shortName}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Pass along academic resources or essentials to verified peers
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 pb-safe sm:pb-6">
          {/* Circulation Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              How would you like to circulate this asset?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setMode('buy')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  mode === 'buy'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Sell to Peer</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('rent')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  mode === 'rent'
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Rent Out</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('swap')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  mode === 'swap'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Barter Swap</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('free')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  mode === 'free'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Free Share</span>
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Resource Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Campbell Biology 12th Ed or Mini Fridge"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Academic Course Tag & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. BIO 1A, CS 61A, CHEM 3B, MATH 53"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Asset Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond.id} value={cond.id}>
                    {cond.label} — {cond.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Condition Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Minor highlighter marks on Chapter 3, includes original cable"
              value={conditionNotes}
              onChange={(e) => setConditionNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Pricing depending on mode */}
          {mode === 'buy' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Asking Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 250"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Original Retail Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1200"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {mode === 'rent' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 bg-sky-50/50 dark:bg-sky-950/30 rounded-2xl border border-sky-200 dark:border-sky-800">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Daily Rental Rate (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={dailyRent}
                  onChange={(e) => setDailyRent(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Semester Rental Rate (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 400"
                  value={semesterRent}
                  onChange={(e) => setSemesterRent(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {mode === 'swap' && (
            <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                What are you looking to trade this for? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EE lab equipment, Casio fx-991, or 2nd yr CS textbooks"
                value={swapFor}
                onChange={(e) => setSwapFor(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {/* Quick Photo Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Select Sample Asset Photo:</span>
              <span className="text-[10px] text-slate-400">Tap to select</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SAMPLE_PHOTOS.map((photo) => (
                <button
                  key={photo.label}
                  type="button"
                  onClick={() => setSelectedImage(photo.url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === photo.url
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-102'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-[8px] sm:text-[9px] text-white py-0.5 px-1 truncate">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description & Meetup spot */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description & Course Insights
              </label>
              <textarea
                rows="2"
                placeholder="Share advice, textbook highlights, or notes for incoming students..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Preferred Campus Safe Zone:
              </label>
              <select
                value={preferredMeetup}
                onChange={(e) => setPreferredMeetup(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-emerald-500"
              >
                {currentCampus.meetupZones.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.name} ({z.hours})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Environmental Contribution Banner */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold">Your Circular Karma:</span>
                <div className="text-[10px] sm:text-[11px] text-emerald-800 dark:text-emerald-300">
                  Diverts ~{estimatedCO2} kg CO₂ • Saves peers ~₹{estimatedSavings}
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-emerald-200/80 dark:bg-emerald-900 font-extrabold text-[10px] text-emerald-900 dark:text-emerald-200 shrink-0">
              +45 Pts
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish & Circulate Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
