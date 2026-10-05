export const INITIAL_LISTINGS = [
  {
    id: 'trv-vit-101',
    campusId: 'vit-vellore',
    title: 'Data Structures & Algorithms in C++ (Mark Allen Weiss) + Handwritten Notes',
    category: 'textbooks',
    courseCode: 'CSE2001',
    department: 'School of Computer Science & Engg (SCOPE)',
    mode: 'buy', // buy | rent | swap | free | wanted
    price: 320,
    originalPrice: 1150,
    rentalRate: null,
    condition: 'excellent',
    conditionNotes: 'All algorithm trace diagrams intact. Includes my color-coded handwritten CAT1 & CAT2 revision notes.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Scored an S-Grade in CSE2001 with this book! Perfect for theory and lab FAT preparations. Ready for pickup at SJT or Library.',
    seller: {
      name: 'Ananya Iyer',
      email: 'ananya.iyer2023@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      major: 'Computer Science (SCOPE)',
      year: '3rd Year (Class of 2027)',
      karma: 4.96,
      tradesCount: 34,
      verifiedEdu: true,
      badges: ['Verified VITian', 'S-Grade Peer', 'Eco Champion']
    },
    preferredMeetup: 'SJT (Silver Jubilee Tower) Ground Floor Gazebo',
    sustainability: {
      co2SavedKg: 8.5,
      treesSavedFraction: 0.14,
      dollarsSaved: 830
    },
    postedDate: '1 hour ago',
    likesCount: 22,
    tags: ['SCOPE', 'CSE2001', 'DSA', 'CAT Exam Ready']
  },
  {
    id: 'trv-vit-102',
    campusId: 'vit-vellore',
    title: 'Casio fx-991CW ClassWiz Scientific Calculator (FAT / CAT Approved)',
    category: 'lab-equipment',
    courseCode: 'MAT1011 / MAT2001',
    department: 'Department of Mathematics',
    mode: 'rent',
    price: null,
    originalPrice: 1495,
    rentalRate: {
      daily: 25,
      weekly: 100,
      semester: 350
    },
    deposit: 400,
    condition: 'like-new',
    conditionNotes: 'Original battery, crisp display, protective hard slide case included. Cleared of stored matrix values.',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    description: 'Mandatory for all B.Tech 1st & 2nd year Math exams! Rent it for exam week or the entire semester instead of buying a new one.',
    seller: {
      name: 'Siddharth Nair',
      email: 'siddharth.nair2024@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      major: 'Mechanical Engineering (SMEC)',
      year: '2nd Year',
      karma: 5.0,
      tradesCount: 41,
      verifiedEdu: true,
      badges: ['Top Lender', 'Verified VITian', 'Quick Responder']
    },
    preferredMeetup: 'Technology Tower (TT) Foodys Courtyard',
    sustainability: {
      co2SavedKg: 11.4,
      treesSavedFraction: 0.17,
      dollarsSaved: 1145
    },
    postedDate: '3 hours ago',
    likesCount: 38,
    tags: ['Casio 991CW', 'MAT1011', 'MAT2001', 'Calculator Rental']
  },
  {
    id: 'trv-vit-103',
    campusId: 'vit-vellore',
    title: 'Omega Engineering Mini Drafter + Sheet Holder Tube + Clips',
    category: 'lab-equipment',
    courseCode: 'MEE1001',
    department: 'School of Mechanical Engineering',
    mode: 'swap',
    price: 0,
    originalPrice: 750,
    swapFor: 'Want: Thomas Calculus 14th Ed or Python for Data Science book',
    condition: 'like-new',
    conditionNotes: 'Smooth 360-degree rotation arm with zero parallax error. Comes with black waterproof drafting cylinder tube.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Finished 1st Year Engineering Graphics! Looking to trade straight up for 2nd Year Thomas Calculus or C++ text. Let’s swap on campus.',
    seller: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma2023@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      major: 'ECE (SENSE)',
      year: '3rd Year',
      karma: 4.92,
      tradesCount: 19,
      verifiedEdu: true,
      badges: ['Verified VITian', 'Active Barterer']
    },
    preferredMeetup: 'Periyar EVR Central Library Foyer',
    sustainability: {
      co2SavedKg: 9.8,
      treesSavedFraction: 0.15,
      dollarsSaved: 750
    },
    postedDate: '5 hours ago',
    likesCount: 14,
    tags: ['Engineering Graphics', 'Mini Drafter', 'MEE1001', 'Drawing Kit']
  },
  {
    id: 'trv-vit-104',
    campusId: 'vit-vellore',
    title: 'Hero Sprint 21-Speed Geared Bicycle (Perfect for SJT to TT commute)',
    category: 'campus-mobility',
    courseCode: null,
    department: 'Hostel Transit / Campus Mobility',
    mode: 'buy',
    price: 1800,
    originalPrice: 6500,
    rentalRate: null,
    condition: 'good',
    conditionNotes: 'New brake pads, smooth Shimano 21 gears, bell installed, includes heavy wire cable lock with 2 keys.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    description: 'Saves 25 minutes walking across the railway track from MH to SJT every morning! Moving out next month after final year placement. Ready for immediate handover.',
    seller: {
      name: 'Aditya Varma',
      email: 'aditya.v2022@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      major: 'Mechanical Engineering',
      year: 'Final Year (Class of 2026)',
      karma: 4.98,
      tradesCount: 27,
      verifiedEdu: true,
      badges: ['Campus Cyclist', 'Placement Star']
    },
    preferredMeetup: 'MH / LH Turnstiles Common Security Zone',
    sustainability: {
      co2SavedKg: 38.5,
      treesSavedFraction: 0.58,
      dollarsSaved: 4700
    },
    postedDate: '6 hours ago',
    likesCount: 45,
    tags: ['Campus Cycle', 'SJT to TT', 'Hero Bicycle', 'Hostel Commute']
  },
  {
    id: 'trv-vit-105',
    campusId: 'vit-vellore',
    title: 'Official 100% Pure Cotton White Lab Coat (Medium) + UV Safety Goggles',
    category: 'lab-equipment',
    courseCode: 'CHY1701 / PHY1701',
    department: 'School of Advanced Sciences (SAS)',
    mode: 'buy',
    price: 180,
    originalPrice: 550,
    rentalRate: null,
    condition: 'excellent',
    conditionNotes: 'Meets VIT Lab EH&S standards with embroidered chest pocket. No chemical stains, freshly washed and ironed.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Cheaper than bookstore price and ready for Week 1 Chemistry lab check-in. Don’t get marked absent at the lab door for missing lab coat!',
    seller: {
      name: 'Priya Venkatesh',
      email: 'priya.v2024@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      major: 'Biotechnology (SBST)',
      year: '2nd Year',
      karma: 4.94,
      tradesCount: 16,
      verifiedEdu: true,
      badges: ['Lab Veteran', 'Eco Champion']
    },
    preferredMeetup: 'Anna Auditorium / Main Food Court Plaza',
    sustainability: {
      co2SavedKg: 7.2,
      treesSavedFraction: 0.11,
      dollarsSaved: 370
    },
    postedDate: '7 hours ago',
    likesCount: 19,
    tags: ['Lab Coat', 'CHY1701', 'SAS', 'PPE Goggles']
  },
  {
    id: 'trv-vit-106',
    campusId: 'vit-vellore',
    title: 'Pigeon 1.5L Stainless Steel Electric Kettle + 4-Socket Surge Protector',
    category: 'dorm-essentials',
    courseCode: null,
    department: 'Hostel Life (Mens & Ladies Hostel)',
    mode: 'buy',
    price: 350,
    originalPrice: 1100,
    rentalRate: null,
    condition: 'excellent',
    conditionNotes: 'Auto-cut shutoff works 100%, descaled and clean. Extension cord has individual switches.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    description: 'Essential for late-night Maggie and coffee during CAT exam week in MH block! Leaving campus for my internship semester.',
    seller: {
      name: 'Rohan Gupta',
      email: 'rohan.gupta2023@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      major: 'Information Technology (SITE)',
      year: '3rd Year',
      karma: 4.89,
      tradesCount: 23,
      verifiedEdu: true,
      badges: ['Hostel Pro', 'Verified VITian']
    },
    preferredMeetup: 'Main Security Gate 1 CCTV Safe Trade Station',
    sustainability: {
      co2SavedKg: 14.5,
      treesSavedFraction: 0.22,
      dollarsSaved: 750
    },
    postedDate: '8 hours ago',
    likesCount: 29,
    tags: ['Hostel Essentials', 'Electric Kettle', 'Midnight Study']
  },
  {
    id: 'trv-vit-107',
    campusId: 'vit-vellore',
    title: 'Set of 15 Heavy Plastic Hangers + Over-the-Door Laundry Hook (Free)',
    category: 'dorm-essentials',
    courseCode: null,
    department: 'Hostel Life',
    mode: 'free',
    price: 0,
    originalPrice: 280,
    rentalRate: null,
    condition: 'good',
    conditionNotes: 'All intact, sturdy plastic. Free to any junior moving into MH or LH.',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80',
    description: 'Pay it forward! Don’t waste money buying new plastic hangers from the campus general store. Collect them at TT or SJT.',
    seller: {
      name: 'Ananya Iyer',
      email: 'ananya.iyer2023@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      major: 'Computer Science (SCOPE)',
      year: '3rd Year',
      karma: 4.96,
      tradesCount: 34,
      verifiedEdu: true,
      badges: ['Zero Waste Hero', 'Kind Neighbor']
    },
    preferredMeetup: 'Technology Tower (TT) Foodys Courtyard',
    sustainability: {
      co2SavedKg: 5.8,
      treesSavedFraction: 0.08,
      dollarsSaved: 280
    },
    postedDate: '10 hours ago',
    likesCount: 16,
    tags: ['Pay It Forward', 'Freebie', 'Hostel Almirah', 'Zero Waste']
  },
  {
    id: 'trv-vit-108',
    campusId: 'vit-vellore',
    title: 'Formal Navy Blue Two-Piece Suit / Blazer (Size 38 Regular)',
    category: 'formal-career',
    courseCode: null,
    department: 'Career Development Centre (CDC)',
    mode: 'rent',
    price: null,
    originalPrice: 4500,
    rentalRate: {
      daily: 150,
      weekly: 400,
      semester: null
    },
    deposit: 500,
    condition: 'like-new',
    conditionNotes: 'Freshly dry cleaned! Crisp Raymond fabric. Perfect for Super Dream company interview rounds and CDC drives.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    description: 'Have a CDC Super Dream interview or formal presentation? Don’t spend ₹5,000 on a suit you will only wear once. Rent this crisp navy suit for your interview slot.',
    seller: {
      name: 'Karan Mehra',
      email: 'karan.mehra2022@vit.edu',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      major: 'Computer Science & Engg',
      year: 'Final Year (Placed at Microsoft)',
      karma: 4.99,
      tradesCount: 38,
      verifiedEdu: true,
      badges: ['Super Dream Placed', 'CDC Veteran']
    },
    preferredMeetup: 'SJT (Silver Jubilee Tower) Ground Floor Gazebo',
    sustainability: {
      co2SavedKg: 24.0,
      treesSavedFraction: 0.36,
      dollarsSaved: 4100
    },
    postedDate: '12 hours ago',
    likesCount: 31,
    tags: ['CDC Placements', 'Interview Suit', 'Formal Wear', 'VIT CDC']
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-vit-1',
    author: 'Sneha Reddy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'Yesterday',
    itemTitle: 'Data Structures Weiss Textbook (CSE2001)',
    comment: 'Met right at SJT Gazebo before 2nd hour class. Book had awesome handwritten notes that literally saved my CAT-1 prep!'
  },
  {
    id: 'rev-vit-2',
    author: 'Vikram Joshi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '3 days ago',
    itemTitle: 'Casio 991CW Calculator Rental',
    comment: 'Rented for MAT2001 FAT exam. Quick exchange at TT Foodys. Saved over ₹1,200 instead of buying new.'
  },
  {
    id: 'rev-vit-3',
    author: 'Tanvi Saxena',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '1 week ago',
    itemTitle: 'Hero Geared Cycle',
    comment: 'Best deal for navigating the campus from MH to SJT! Smooth transaction verified via @vit.edu email.'
  }
];

export const MOCK_COMMUNITY_REQUESTS = [
  {
    id: 'req-vit-1',
    student: 'Arjun Das (1st Year, CSE Core)',
    need: 'Looking for Casio fx-991CW or EX Calculator for tomorrow’s Calculus CAT exam',
    budget: 'Rent ₹50/day or buy for ₹400',
    urgency: 'Needed Today by 8 PM',
    responses: 4
  },
  {
    id: 'req-vit-2',
    student: 'Meera Krishnan (2nd Year, EEE)',
    need: 'White Lab Coat (Size S or M) for SAS Physics Lab',
    budget: 'Buy for ₹150',
    urgency: 'Needed before Wednesday 10 AM',
    responses: 3
  },
  {
    id: 'req-vit-3',
    student: 'Devendra Patel (3rd Year, Mechanical)',
    need: 'Mini Drafter with sheet holder tube for MEE1001 revision',
    budget: 'Will trade for Data Structures notes or pay ₹200',
    urgency: 'Anytime this week',
    responses: 2
  }
];
