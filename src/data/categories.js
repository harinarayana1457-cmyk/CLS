export const CIRCULATION_MODES = [
  {
    id: 'all',
    label: 'All Offerings',
    description: 'Browse everything in your campus circulation pool',
    badgeClass: 'bg-slate-100 text-slate-800'
  },
  {
    id: 'buy',
    label: 'Buy / Sell',
    tagline: 'Student-to-student discounts (60-80% off retail)',
    icon: 'Tag',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'rent',
    label: 'Borrow / Rent',
    tagline: 'Rent by day, week, or semester for short-term courses',
    icon: 'Calendar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300'
  },
  {
    id: 'swap',
    label: 'Exchange / Swap',
    tagline: 'Barter textbooks, supplies, or dorm gear with classmates',
    icon: 'ArrowLeftRight',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  {
    id: 'free',
    label: 'Free Share / Pay-It-Forward',
    tagline: 'Zero-cost donations to reduce landfill waste',
    icon: 'Gift',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'wanted',
    label: 'Requests / Wanted',
    tagline: 'Looking for something? Ask your campus community',
    icon: 'SearchCheck',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Grid' },
  { id: 'textbooks', name: 'Textbooks & Course Notes', icon: 'BookOpen', count: 184 },
  { id: 'lab-equipment', name: 'Lab Gear & Calculators', icon: 'FlaskConical', count: 72 },
  { id: 'tech-electronics', name: 'Tech & Electronics', icon: 'Laptop', count: 96 },
  { id: 'dorm-essentials', name: 'Dorm & Living Essentials', icon: 'Armchair', count: 138 },
  { id: 'campus-mobility', name: 'Bikes & Campus Transit', icon: 'Bike', count: 44 },
  { id: 'formal-career', name: 'Career & Formal Wear', icon: 'Shirt', count: 53 },
  { id: 'moving-storage', name: 'Move-in & Storage Kits', icon: 'Package', count: 39 }
];

export const CONDITIONS = [
  { id: 'like-new', label: 'Like New (Mint)', desc: 'Practically unopened, zero markings or defects' },
  { id: 'excellent', label: 'Excellent', desc: 'Lightly used, clean, perfectly functional' },
  { id: 'good', label: 'Good', desc: 'Normal wear, some notes/highlighting, fully usable' },
  { id: 'fair', label: 'Fair (Functional)', desc: 'Visible wear, gets the job done cleanly' }
];
