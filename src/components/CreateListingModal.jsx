import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Leaf, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ArrowLeftRight, 
  Gift, 
  ShoppingBag,
  MapPin,
  Image as ImageIcon
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Circulate Asset in {currentCampus.shortName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pass along academic resources or campus essentials to fellow verified peers
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Resource Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Campbell Biology 12th Ed or Mini Fridge 3.2 cu ft"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Pricing fields depending on mode */}
          {mode === 'buy' && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-emerald-50/50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div>
                <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  Your Student Asking Price ({currentCampus?.currency || '₹'}) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 450"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Original / Retail Price ({currentCampus?.currency || '₹'})
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1800 (to show savings)"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {mode === 'rent' && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-sky-50/50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800">
              <div>
                <label className="block text-xs font-bold text-sky-900 dark:text-sky-300 mb-1">
                  Daily Rental Rate ({currentCampus?.currency || '₹'})
                </label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={dailyRent}
                  onChange={(e) => setDailyRent(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-sky-900 dark:text-sky-300 mb-1">
                  Full Semester Rate ({currentCampus?.currency || '₹'})
                </label>
                <input
                  type="number"
                  placeholder="e.g. 350"
                  value={semesterRent}
                  onChange={(e) => setSemesterRent(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {mode === 'swap' && (
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
              <label className="block text-xs font-bold text-purple-900 dark:text-purple-300 mb-1">
                What item(s) would you trade this for? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for Multivariable Calculus Stewart or Desk Chair"
                value={swapFor}
                onChange={(e) => setSwapFor(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          )}

          {/* Preferred Photo selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Select or Choose Photo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SAMPLE_PHOTOS.map((photo) => (
                <button
                  key={photo.label}
                  type="button"
                  onClick={() => setSelectedImage(photo.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    selectedImage === photo.url
                      ? 'border-emerald-600 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-[9px] text-white py-0.5 px-1 truncate">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description & Meetup spot */}
          <div className="space-y-4">
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
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Preferred Campus Safe Meetup Zone:
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
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold">Your Circular Karma:</span>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  Diverts ~{estimatedCO2} kg CO₂ • Saves campus peers ~{currentCampus?.currency || '₹'}{estimatedSavings}
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-emerald-200/80 dark:bg-emerald-900 font-extrabold text-[10px] text-emerald-900 dark:text-emerald-200">
              +45 Karma Pts
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-1.5"
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
