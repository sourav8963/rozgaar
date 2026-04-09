import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Star, Phone, ShieldCheck, 
  CheckCircle, User, Clock, Wallet, Wrench, 
  Zap, Paintbrush, Hammer, ChevronLeft, Calendar,
  Menu, Home, ClipboardList, TrendingUp, Award, Bell, Filter, Grid, Check, ArrowRight, X
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'all', name: 'All Services', icon: <Grid size={20} /> },
  { id: 'plumber', name: 'Plumber', icon: <Wrench size={20} /> },
  { id: 'electrician', name: 'Electrician', icon: <Zap size={20} /> },
  { id: 'painter', name: 'Painter', icon: <Paintbrush size={20} /> },
  { id: 'labourer', name: 'Labourer', icon: <Hammer size={20} /> },
];

const WORKERS = [
  { 
    id: 1, name: 'Ramesh Kumar', skills: ['Plumber'], wage: 500, wageType: 'per day', 
    rating: 4.8, reviews: 124, distance: '1.2 km', experience: '5 years', 
    available: true, verified: true, avatar: 'https://i.pravatar.cc/150?u=ramesh',
    description: 'Expert in plumbing and pipe fixing. Reliable and punctual.'
  },
  { 
    id: 2, name: 'Suresh Singh', skills: ['Electrician'], wage: 150, wageType: 'per hour', 
    rating: 4.5, reviews: 89, distance: '2.0 km', experience: '8 years', 
    available: true, verified: true, avatar: 'https://i.pravatar.cc/150?u=suresh',
    description: 'Specialized in house wiring, switchboard installation and appliance repair.'
  },
  { 
    id: 3, name: 'Rajesh Paswan', skills: ['Labourer', 'Painter'], wage: 400, wageType: 'per day', 
    rating: 4.2, reviews: 45, distance: '0.8 km', experience: '2 years', 
    available: false, verified: false, avatar: 'https://i.pravatar.cc/150?u=rajesh',
    description: 'Hardworking general labourer. Ready for heavy lifting and construction assistance.'
  },
  { 
    id: 4, name: 'Amit Sharma', skills: ['Painter'], wage: 600, wageType: 'per day', 
    rating: 4.9, reviews: 210, distance: '3.5 km', experience: '10 years', 
    available: true, verified: true, avatar: 'https://i.pravatar.cc/150?u=amit',
    description: 'Professional wall painting, texture designing and waterproofing expert.'
  },
  { 
    id: 5, name: 'Vikash Verma', skills: ['Labourer'], wage: 350, wageType: 'per day', 
    rating: 4.0, reviews: 22, distance: '1.5 km', experience: '1 year', 
    available: true, verified: true, avatar: 'https://i.pravatar.cc/150?u=vikash',
    description: 'Reliable helper for shifting, farming, and general daily chores.'
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, bookings
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredWorkers = WORKERS.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          worker.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || worker.skills.some(s => s.toLowerCase() === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleBookWorker = (bookingDetails) => {
    const newBooking = {
      id: `BKG-${Math.floor(Math.random() * 10000)}`,
      worker: selectedWorker,
      ...bookingDetails,
      status: 'Requested',
      timestamp: new Date().toLocaleString()
    };
    setMyBookings([newBooking, ...myBookings]);
    setIsBookingModalOpen(false);
    setSelectedWorker(null);
    setActiveTab('bookings');
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'bookings', label: 'My Bookings', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans overflow-hidden transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 z-20 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200">
            <User size={24} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">Mazdoor<span className="text-indigo-600">Connect</span></h1>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSelectedWorker(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-slate-100">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
            <h3 className="font-bold mb-1 relative z-10">Pro Access</h3>
            <p className="text-xs text-indigo-100 mb-3 relative z-10">Get premium workers with zero booking fees.</p>
            <button className="bg-white text-indigo-700 text-sm font-bold py-2 px-4 rounded-lg w-full relative z-10 shadow-sm hover:shadow-md transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen relative w-full">
        
        {/* Dynamic Header */}
        <header className="glass sticky top-0 z-10 px-4 md:px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            {selectedWorker && !isBookingModalOpen ? (
              <button onClick={() => setSelectedWorker(null)} className="p-2 md:hidden bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <ChevronLeft size={20} className="text-slate-700" />
              </button>
            ) : null}
            <div className="md:hidden flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-1.5 rounded-lg">
                <User size={18} />
              </div>
              <h1 className="text-lg font-extrabold text-slate-800">Mazdoor<span className="text-indigo-600">Connect</span></h1>
            </div>
            
            <div className="hidden md:flex items-center text-slate-500 bg-slate-100 px-4 py-2 rounded-full text-sm font-medium border border-slate-200">
              <MapPin size={16} className="text-indigo-500 mr-2" />
              Kankarbagh, Patna
              <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden md:block">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:border-indigo-200 transition-colors">
              <img src="https://i.pravatar.cc/150?u=customer" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* View Router */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="max-w-5xl mx-auto w-full">
            {selectedWorker ? (
              <WorkerProfileView 
                worker={selectedWorker} 
                onBook={() => setIsBookingModalOpen(true)}
                onBack={() => setSelectedWorker(null)}
              />
            ) : activeTab === 'home' ? (
              <HomeView 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                workers={filteredWorkers}
                onSelectWorker={setSelectedWorker}
              />
            ) : (
              <BookingsView bookings={myBookings} />
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        {!selectedWorker && (
          <nav className="md:hidden glass absolute bottom-0 w-full flex justify-around p-2 pb-safe border-t border-slate-200/60 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 p-2 w-20 transition-all duration-300 ${
                  activeTab === item.id ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
                {activeTab === item.id && <span className="absolute bottom-0 w-1 h-1 bg-indigo-600 rounded-full -mb-1"></span>}
              </button>
            ))}
          </nav>
        )}
      </main>

      {/* Booking Modal Overlay */}
      {isBookingModalOpen && selectedWorker && (
        <BookingModal 
          worker={selectedWorker} 
          onClose={() => setIsBookingModalOpen(false)}
          onConfirm={handleBookWorker}
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function HomeView({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, workers, onSelectWorker }) {
  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-20 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Find the right <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">worker</span> for your job today.
          </h2>
          <p className="text-slate-300 mb-8 max-w-lg text-sm md:text-base">
            Connect with verified plumbers, electricians, painters, and general labourers available near you right now.
          </p>
          
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="Search for 'electrician', 'painter', or by name..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-medium text-base shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
               <button className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-xl text-white transition-colors">
                 <ArrowRight size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-slate-800">Our Services</h2>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-5 gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-3 md:p-5 rounded-2xl transition-all duration-300 min-w-[70px] ${
                selectedCategory === cat.id 
                  ? 'bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200 scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100 hover:scale-105'
              }`}
            >
              <div className={`p-3 md:p-4 rounded-full mb-2 ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-slate-50'}`}>
                {cat.icon}
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Workers list */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Top Rated Near You
          </h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
            <Filter size={16} /> Filters
          </button>
        </div>
        
        {workers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {workers.map(worker => (
              <div 
                key={worker.id} 
                onClick={() => onSelectWorker(worker)}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer group flex gap-5"
              >
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300 bg-slate-200">
                    <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-2 -left-2 px-2 py-1 rounded-lg text-[10px] font-bold border-2 border-white ${worker.available ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {worker.available ? 'AVAILABLE' : 'BUSY'}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg flex items-center gap-1.5 group-hover:text-indigo-600 transition-colors">
                      {worker.name}
                      {worker.verified && <ShieldCheck size={16} className="text-blue-500" />}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-xs font-bold text-yellow-700 border border-yellow-100">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      {worker.rating}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {worker.skills.map((s, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center w-full">
                    <div className="flex items-center text-slate-500 text-xs font-medium gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                      <MapPin size={12} className="text-indigo-500" /> {worker.distance}
                    </div>
                    <div className="font-extrabold text-slate-900 text-lg">
                      ₹{worker.wage} <span className="text-slate-400 font-medium text-xs">/{worker.wageType.split(' ')[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No workers found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkerProfileView({ worker, onBook, onBack }) {
  return (
    <div className="bg-white min-h-full flex flex-col md:rounded-3xl md:m-6 md:border md:border-slate-100 md:shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Header Profile Desktop */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
        <button onClick={onBack} className="p-2 bg-white rounded-full hover:bg-slate-100 shadow-sm flex items-center gap-2 font-semibold text-slate-700 text-sm pl-3 pr-4 transition-all">
          <ChevronLeft size={18} /> Back to Search
        </button>
        <div className="flex gap-3">
           <button className="p-2 border border-slate-200 bg-white rounded-full hover:bg-slate-50 shadow-sm text-slate-700">
             <Phone size={18} />
           </button>
        </div>
      </div>

      <div className="relative">
        <div className="h-40 md:h-56 bg-gradient-to-tr from-indigo-900 to-indigo-500 w-full relative">
           <div className="absolute inset-0 bg-black/10"></div>
           {/* Decorative pattern */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2ZmZiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>
        
        <div className="px-6 relative -mt-16 md:-mt-20 z-10 flex flex-col md:flex-row md:items-end gap-5">
          <div className="relative inline-block border-4 border-white rounded-3xl shadow-xl bg-white w-28 h-28 md:w-40 md:h-40 shrink-0">
            <img src={worker.avatar} alt={worker.name} className="w-full h-full rounded-2xl object-cover" />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white z-20 ${worker.available ? 'bg-green-500' : 'bg-slate-400'}`}></div>
          </div>
          
          <div className="flex-1 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  {worker.name}
                  {worker.verified && <ShieldCheck size={24} className="text-blue-500 drop-shadow-sm" />}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {worker.skills.map((s, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-indigo-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:block bg-white p-4 rounded-2xl shadow-xl border border-slate-100 text-center min-w-[120px]">
                <div className="text-sm font-bold text-slate-500 mb-1">Standard Rate</div>
                <div className="text-2xl font-extrabold text-slate-900">₹{worker.wage}</div>
                <div className="text-xs text-slate-400">{worker.wageType}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 flex-1">
        
        <div className="md:col-span-2 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-yellow-700 font-extrabold text-xl mb-1">
                <Star size={18} className="fill-yellow-500" /> {worker.rating}
              </div>
              <div className="text-[10px] text-yellow-600/70 font-bold uppercase tracking-wider">{worker.reviews} Reviews</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-blue-700 font-extrabold text-xl mb-1">
                <Award size={18} /> {worker.experience.split(' ')[0]}
              </div>
              <div className="text-[10px] text-blue-600/70 font-bold uppercase tracking-wider">Years Exp.</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-emerald-700 font-extrabold text-xl mb-1">
                <MapPin size={18} /> {worker.distance.split(' ')[0]}
              </div>
              <div className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-wider">Km Away</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">About {worker.name}</h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl text-sm border border-slate-100">
              {worker.description}
            </p>
          </div>
          
          <div className="md:hidden">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Pricing</h3>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600">
                  <Wallet size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Standard Rate</div>
                  <div className="font-extrabold text-slate-900 text-xl">₹{worker.wage}</div>
                </div>
              </div>
              <div className="text-xs font-bold bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 uppercase">
                {worker.wageType}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Trust & Safety Highlights</h3>
            <div className="bg-emerald-50 bg-opacity-50 p-1 rounded-2xl border border-emerald-100/50">
              <ul className="divide-y divide-emerald-100/50">
                <li className="flex items-center gap-3 p-4 text-sm font-medium text-emerald-900">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full p-1"><Check size={16} /></div> Identity Verified via Aadhaar
                </li>
                <li className="flex items-center gap-3 p-4 text-sm font-medium text-emerald-900">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full p-1"><Check size={16} /></div> Background Checked
                </li>
                <li className="flex items-center gap-3 p-4 text-sm font-medium text-emerald-900">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full p-1"><Check size={16} /></div> 98% Job Completion Rate
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Desktop Action Column */}
        <div className="hidden md:block">
           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Book this Service</h3>
              {worker.available ? (
                <button 
                  onClick={onBook}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] flex justify-center items-center gap-2 group"
                >
                  Confirm Booking <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-4 px-6 rounded-2xl cursor-not-allowed">
                  Currently Unavailable
                </button>
              )}
              <div className="text-center text-xs text-slate-400 mt-4 px-4 font-medium leading-relaxed">
                You won't be charged until the job is completed safely.
              </div>
           </div>
        </div>
      </div>

      {/* Action Footer Mobile */}
      <div className="md:hidden p-5 bg-white border-t border-slate-100 pb-safe">
        {worker.available ? (
          <button 
            onClick={onBook}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
          >
            Book Now <ArrowRight size={18} />
          </button>
        ) : (
          <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-4 rounded-2xl cursor-not-allowed">
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
}

function BookingModal({ worker, onClose, onConfirm }) {
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('Immediate (within 30m)');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ date, time, paymentMethod });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full sm:w-full sm:max-w-md h-[90%] sm:h-auto sm:max-h-[90vh] sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-12 duration-500 overflow-hidden">
        
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white z-10">
          <h2 className="text-xl font-extrabold text-slate-900">Complete Booking</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X size={20} /> 
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-8 pb-24 sm:pb-6">
          {/* Worker summary */}
          <div className="flex gap-4 items-center bg-indigo-50 p-4 rounded-2xl border border-indigo-100/50">
            <img src={worker.avatar} className="w-14 h-14 rounded-xl object-cover shadow-sm bg-white p-0.5" alt="" />
            <div>
              <div className="font-bold text-slate-900 text-lg">{worker.name}</div>
              <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{worker.skills.join(', ')}</div>
            </div>
            <div className="ml-auto text-right">
               <div className="font-extrabold text-lg text-slate-900">₹{worker.wage}</div>
               <div className="text-[10px] uppercase font-bold text-slate-500">{worker.wageType}</div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">When do you need them?</label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {['Today', 'Tomorrow'].map(d => (
                <button 
                  key={d} type="button" onClick={() => setDate(d)}
                  className={`py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                    date === d 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Calendar size={18} className="inline mr-2 mb-0.5" />{d}
                </button>
              ))}
            </div>
            <select 
              value={time} onChange={(e) => setTime(e.target.value)}
              className="w-full p-4 border-2 border-slate-100 rounded-xl font-bold text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-0 outline-none transition-colors appearance-none bg-slate-50/50 text-sm"
            >
              <option>Immediate (within 30m)</option>
              <option>Morning (09:00 AM - 12:00 PM)</option>
              <option>Afternoon (12:00 PM - 04:00 PM)</option>
              <option>Evening (04:00 PM - 07:00 PM)</option>
            </select>
          </div>

          {/* Location details */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Work Location</label>
            <div className="p-4 border-2 border-slate-100 rounded-xl text-sm flex items-start gap-4 bg-slate-50 cursor-pointer hover:border-indigo-200 transition-colors">
              <div className="bg-red-100 p-2 rounded-lg text-red-500 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Current Location</div>
                <div className="text-slate-500 text-xs font-medium leading-relaxed">123, Scheme No 3, Kankarbagh, Patna, Bihar 800020</div>
              </div>
              <div className="ml-auto flex items-center">
                 <button type="button" className="text-xs font-bold text-indigo-600 uppercase">Edit</button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Payment Method</label>
            <div className="space-y-3">
              {['Cash after work', 'UPI / Online'].map(method => (
                <label key={method} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === method 
                    ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                    : 'border-slate-100 hover:bg-slate-50'
                }`}>
                  <span className={`text-sm font-bold ${paymentMethod === method ? 'text-indigo-700' : 'text-slate-700'}`}>{method}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-indigo-600' : 'border-slate-300'}`}>
                    {paymentMethod === method && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-in zoom-in duration-200"></div>}
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-green-500" /> Secure via MazdoorConnect Guarantee
            </p>
          </div>
          
          <div className="pt-2 sm:pt-4">
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-transform active:scale-[0.98]">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BookingsView({ bookings }) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in duration-500">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent opacity-50"></div>
           <ClipboardList size={48} className="text-slate-400 relative z-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-3">No active bookings</h2>
        <p className="text-slate-500 text-base max-w-xs font-medium">When you book a worker via the dashboard, the job details will appear here.</p>
        <button className="mt-8 bg-indigo-600 text-white font-bold px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
           Browse Workers
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 pb-24 md:pb-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
         <h2 className="text-2xl font-extrabold text-slate-900">My Bookings</h2>
         <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
           {bookings.length} Active
         </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bookings.map((booking, idx) => (
          <div key={idx} className="bg-white border-2 border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <span className="text-xs font-bold font-mono text-slate-400 tracking-wider">#{booking.id}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                {booking.status}
              </span>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="relative shrink-0">
                <img src={booking.worker.avatar} className="w-16 h-16 rounded-2xl object-cover bg-slate-100" alt="" />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                   <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-900 text-lg">{booking.worker.name}</h3>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-0.5">{booking.worker.skills.join(', ')}</p>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-xs font-medium flex-col gap-1 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 block">Scheduled</span>
                    <div className="flex items-center gap-1.5"><Clock size={12} className="text-indigo-500"/>{booking.date}</div>
                  </div>
                  <div className="text-xs font-medium flex-col gap-1 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 block">Payment</span>
                    <div className="flex items-center gap-1.5"><Wallet size={12} className="text-emerald-500"/>₹{booking.worker.wage}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3">
              <button className="flex-1 py-3 bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                <Phone size={16} /> Contact
              </button>
              <button className="flex-1 py-3 border-2 border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}