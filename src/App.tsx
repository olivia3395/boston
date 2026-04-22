/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Navigation, ArrowRight, BookmarkPlus, Bookmark, MapPin, Clock, Coffee, Utensils, Play, Pause, X, ChevronDown, Camera, Headphones, LibraryBig, Music } from 'lucide-react';
import ReactPlayer from 'react-player';

const BOSTON_IMAGES = {
  hero: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=2400",
  acorn: "https://images.unsplash.com/photo-1549405663-8a3fc1850d53?auto=format&fit=crop&q=80&w=1200",
  garden: "https://images.unsplash.com/photo-1588636846187-2bece71d1872?auto=format&fit=crop&q=80&w=1200",
  library: "https://images.unsplash.com/photo-1580131448655-15a0cbbba949?auto=format&fit=crop&q=80&w=1200",
  northend: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200",
  seaport: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=1200",
  harvard: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80&w=2400",
  gardner: "https://images.unsplash.com/photo-1572947113110-8b0686307a68?auto=format&fit=crop&q=80&w=1200",
  mfa: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1200",
  lobster: "https://images.unsplash.com/photo-1596797882870-8c33dee38b81?auto=format&fit=crop&q=80&w=1200",
  oysters: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=1200",
  fenway: "https://images.unsplash.com/photo-1548050626-d6211833d7b8?auto=format&fit=crop&q=80&w=1200",
  trinity: "https://images.unsplash.com/photo-1506546305988-825dddb68e6e?auto=format&fit=crop&q=80&w=1200",
  charles: "https://images.unsplash.com/photo-1605634599723-1d0fc38ad82d?auto=format&fit=crop&q=80&w=1200",
  library_in: "https://images.unsplash.com/photo-1544321722-e2c72b22ceb2?auto=format&fit=crop&q=80&w=1200",
};

// ---------------- Navigation & Dynamic Menu ---------------- //
function NavBar({ savedCount }: { savedCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300 border-b ${
          scrolled || menuOpen ? 'bg-artistic-bg/95 backdrop-blur-md border-artistic-border shadow-sm' : 'bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="font-sans text-xl font-black tracking-[-0.05em] cursor-pointer hover:text-artistic-accent transition-colors" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setMenuOpen(false); }}>
          B.J.
        </div>
        
        <div className="flex items-center gap-6">
          <button className="hidden sm:flex items-center gap-3 group border border-artistic-text rounded-full px-4 py-1.5 hover:bg-artistic-text hover:text-artistic-surface transition-colors cursor-pointer" onClick={() => alert(`${savedCount} saved locales in your archive.`)}>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-[1px]">Saved Archive</span>
            <span className="font-sans text-[10px] font-bold border border-current rounded-full w-4 h-4 flex items-center justify-center transition-all bg-artistic-accent text-white border-transparent">
              {savedCount}
            </span>
          </button>
          
          <button 
            className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.15em] group"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="mt-[2px]">{menuOpen ? 'Close' : 'Index'}</span>
            <div className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
              {menuOpen ? <X className="w-5 h-5 text-artistic-accent" /> : <Navigation className="w-4 h-4" />}
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-artistic-surface z-50 flex flex-col justify-center items-center px-6"
          >
             <div className="absolute top-24 uppercase font-sans text-[10px] font-bold tracking-widest text-artistic-accent border border-artistic-accent px-4 py-1 rounded-full">
               Journal Index
             </div>
             <div className="flex flex-col gap-6 text-center">
               {['Neighborhoods', 'Archive', 'Audio Tours', 'Itinerary', 'Almanac'].map((item, i) => (
                 <a 
                   key={i}
                   href={`#${item.toLowerCase().replace(' ', '-')}`} 
                   onClick={() => setMenuOpen(false)}
                   className="font-serif text-5xl md:text-7xl font-black text-artistic-text tracking-tighter hover:text-artistic-accent hover:italic transition-all cursor-pointer"
                 >
                   {item}
                 </a>
               ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------- Typography / Layout ---------------- //
function SectionHeader({ title, tag, actionText }: { title: string, tag: string, actionText?: string }) {
  return (
    <div className="flex flex-col items-start text-left mb-12">
      <div className="w-full flex justify-between items-center mb-8 gap-4 flex-wrap">
        <span className="font-sans text-[10px] uppercase font-bold tracking-[0.15em] border border-artistic-text px-3 py-1 rounded-full whitespace-nowrap">
          {tag}
        </span>
        {actionText && (
          <span className="font-sans text-[10px] italic underline text-artistic-accent cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">
            {actionText}
          </span>
        )}
      </div>
      <h2 className="font-serif text-[40px] md:text-[60px] font-black tracking-[-0.02em] leading-none text-artistic-accent uppercase max-w-2xl">
        {title}
      </h2>
    </div>
  );
}

// ---------------- Visual Archive (Filter & Gallery) ---------------- //
function GalleryGrid({ onSelectImage }: { onSelectImage: (img: any) => void }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Architecture', 'Nature', 'Culture'];
  
  const images = [
    { url: BOSTON_IMAGES.library_in, title: "BPL Reading Room", category: "Architecture" },
    { url: BOSTON_IMAGES.charles, title: "Charles River Basin", category: "Nature" },
    { url: BOSTON_IMAGES.trinity, title: "Trinity Church", category: "Architecture" },
    { url: BOSTON_IMAGES.mfa, title: "Museum of Fine Arts", category: "Culture" },
    { url: BOSTON_IMAGES.northend, title: "North End Alleys", category: "Culture" },
    { url: BOSTON_IMAGES.harvard, title: "Harvard Yard", category: "Architecture" },
  ];

  const filtered = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-12 border-b border-artistic-border pb-6 overflow-x-auto hide-scrollbar">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`font-sans text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-artistic-text text-artistic-surface border-artistic-text' 
                : 'border-artistic-border text-artistic-text/60 hover:border-artistic-text'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
             <motion.div
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 0.4 }}
               key={img.url}
               className="group cursor-pointer flex flex-col items-center"
               onClick={() => onSelectImage(img)}
             >
                <div className="w-full aspect-square overflow-hidden border border-artistic-border p-2 bg-white mb-4 relative">
                   <div className="absolute inset-0 bg-artistic-accent/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                     <Camera className="text-white w-8 h-8" />
                   </div>
                   <img src={img.url} alt={img.title} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-serif font-bold text-lg italic text-artistic-accent">{img.title}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-artistic-border"></div>
                  <span className="font-sans text-[9px] uppercase font-bold tracking-widest opacity-50">{img.category}</span>
                </div>
             </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ---------------- Lightbox Modal ---------------- //
function Lightbox({ image, onClose }: { image: any, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-artistic-bg/95 backdrop-blur-md flex flex-col outline-none p-6 md:p-12"
      onClick={onClose}
    >
      <div className="w-full flex justify-between items-center mb-8 shrink-0">
        <div className="font-sans text-[10px] uppercase font-bold tracking-[0.15em] border border-artistic-text px-3 py-1 rounded-full">
           Archive View
        </div>
        <button onClick={onClose} className="p-3 bg-white border border-artistic-text rounded-full hover:bg-artistic-accent hover:text-white hover:border-transparent transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full min-h-0 relative" onClick={(e) => e.stopPropagation()}>
         <motion.div 
           initial={{ scale: 0.95, opacity: 0, y: 20 }}
           animate={{ scale: 1, opacity: 1, y: 0 }}
           transition={{ delay: 0.1, duration: 0.4 }}
           className="h-full border-[12px] border-white bg-white shadow-xl relative max-w-full"
         >
           <img src={image.url} alt={image.title} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
         </motion.div>
      </div>

      <div className="shrink-0 pt-8 flex flex-col items-center justify-center text-center">
        <h3 className="font-serif text-3xl font-bold italic mb-2 text-artistic-accent">{image.title}</h3>
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-60">Category: {image.category}</span>
      </div>
    </motion.div>
  );
}

// ---------------- Audio Player Module ---------------- //
function AudioPlayerModule({ isPlayingMusic, toggleMusic }: { isPlayingMusic: boolean, toggleMusic: () => void }) {
  const track = { title: "Boston - Augustana", duration: "Live Music", loc: "City Atmosphere / YouTube" };

  return (
    <div className="bg-white border border-artistic-border p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 lg:gap-12">
       {/* Track List */}
       <div className="flex-1 flex flex-col gap-2">
         <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-4 border-b border-artistic-border pb-4">Featured Soundtrack</h3>
         <div 
           onClick={toggleMusic}
           className={`flex items-center justify-between p-4 cursor-pointer transition-colors border group border-artistic-accent bg-artistic-bg`}
         >
           <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${isPlayingMusic ? 'bg-artistic-accent text-white border-transparent' : 'border-artistic-text/20 group-hover:border-artistic-text'}`}
              >
                {isPlayingMusic ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
              </button>
              <div className="flex flex-col text-left">
                <span className={`font-serif text-lg font-bold ${isPlayingMusic ? 'text-artistic-accent' : ''}`}>{track.title}</span>
                <span className="font-sans text-[10px] uppercase font-bold tracking-widest opacity-50 flex items-center gap-1 mt-1"><Music className="w-3 h-3" /> YouTube</span>
              </div>
           </div>
           <span className="font-sans text-xs font-bold opacity-40 hidden sm:block">LIVE</span>
         </div>
       </div>

       {/* Now Playing Visualizer Panel */}
       <div className="flex-1 bg-artistic-text p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden rounded-sm">
          {/* Subtle spinning record effect */}
          <motion.div 
            animate={{ rotate: isPlayingMusic ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`absolute -right-24 -bottom-24 w-64 h-64 border-[40px] border-white/5 rounded-full ${!isPlayingMusic ? 'animation-paused' : ''}`}
          />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 border-[20px] border-white/10 rounded-full" />
          
          <div className="relative z-10 flex justify-between items-start mb-12">
            <span className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] border border-white/30 px-3 py-1 rounded-full text-white/80">Now Playing</span>
            {isPlayingMusic && (
              <div className="flex gap-1 items-end h-4">
                <motion.div animate={{ height: ["4px", "16px", "4px"] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 bg-artistic-accent" />
                <motion.div animate={{ height: ["12px", "4px", "12px"] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1 bg-artistic-accent" />
                <motion.div animate={{ height: ["8px", "16px", "8px"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 bg-artistic-accent" />
              </div>
            )}
          </div>

          <div className="relative z-10">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold italic mb-2 leading-tight">{track.title}</h3>
            <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-white/50 mb-8">{track.loc}</p>
            
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-3">
              <motion.div 
                className="bg-artistic-accent h-full"
                initial={{ width: "0%" }}
                animate={{ width: isPlayingMusic ? "100%" : "0%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between font-sans text-[10px] font-bold text-white/40">
              <span>LIVE</span>
              <span>HD Audio</span>
            </div>
          </div>
       </div>
    </div>
  );
}

// ---------------- Almanac / FAQ Accordion ---------------- //
function AlmanacAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    { title: "Navigating the MBTA", content: "Locally known simply as 'The T', Boston's subway system is the oldest in the country. The Green Line is historically significant but notorious for its meandering pace above ground. Purchase a CharlieCard for seamless transfers between the subway, buses, and inner harbor ferries." },
    { title: "Seasonal Transitions", content: "Boston weather is fiercely temperamental. Spring (April - May) brings dramatic magnolia blooms to Marlborough Street. Autumn (October) offers explosive foliage along the Charles. Always carry a secondary layer, regardless of the forecast." },
    { title: "Cobblestone Etiquette", content: "The historic districts, particularly Beacon Hill, retain irregular 19th-century cobblestone paving. Stilettos are heavily discouraged. Opt for sturdy footwear when exploring Acorn Street or the North End alleys." },
    { title: "Reservations & Dining", content: "Boston's culinary scene is compact and highly competitive. Reservations in the Seaport or North End on a weekend must be secured weeks in advance. For iconic seafood spots, prepare to wait in line—it is considered part of the ritual." },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-white border border-artistic-border shadow-sm p-4 text-left">
      {sections.map((section, i) => (
         <div key={i} className="border-b border-artistic-border last:border-b-0">
            <button 
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-artistic-bg transition-colors group"
            >
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:text-artistic-accent transition-colors">0{i+1}</span>
                 <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${openIndex === i ? 'text-artistic-accent italic' : ''}`}>{section.title}</h3>
               </div>
               <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                 <ChevronDown className={`w-6 h-6 ${openIndex === i ? 'text-artistic-accent' : 'text-artistic-text/40'}`} />
               </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 sm:pl-[70px]">
                     <p className="font-sans text-[14px] text-artistic-text/80 leading-relaxed max-w-2xl text-balance border-l-2 border-artistic-accent pl-4">
                       {section.content}
                     </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      ))}
    </div>
  );
}

// ---------------- Interactive Itinerary Tab Component ---------------- //
function ItineraryPlanner() {
  const [activeDay, setActiveDay] = useState(1);
  
  const itineraries = [
    {
      day: 1,
      title: "The Revolutionary Path",
      activities: [
        { time: "09:00 AM", title: "Breakfast at Tatte", desc: "Start with an artisanal pastry in Beacon Hill." },
        { time: "10:30 AM", title: "Walk the Freedom Trail", desc: "Begin at Boston Common and trace the red line." },
        { time: "01:30 PM", title: "Lunch at Faneuil Hall", desc: "Clam chowder and bustling market energy." },
        { time: "04:00 PM", title: "North End Exploration", desc: "Wander the Italian district alleys." },
      ]
    },
    {
      day: 2,
      title: "Arts & River Echoes",
      activities: [
        { time: "09:30 AM", title: "Isabella Stewart Gardner Museum", desc: "Wander the stolen art mystery." },
        { time: "12:30 PM", title: "Newbury Street Stroll", desc: "High-end shopping and brownstone views." },
        { time: "03:00 PM", title: "Charles River Esplanade", desc: "Watch the sailboats at sunset." },
        { time: "07:00 PM", title: "Dinner in Seaport", desc: "Modern gastronomy by the water." },
      ]
    }
  ];

  const activeContent = itineraries.find(i => i.day === activeDay);

  return (
    <div className="flex flex-col md:flex-row gap-12 mt-12 bg-white border border-artistic-border p-6 md:p-12 shadow-sm rounded-sm">
      <div className="flex md:flex-col gap-4 md:w-1/4 border-b md:border-b-0 md:border-r border-artistic-border pb-6 md:pb-0 md:pr-6 overflow-x-auto hide-scrollbar">
        {itineraries.map((tab) => (
          <button 
            key={tab.day}
            onClick={() => setActiveDay(tab.day)}
            className={`text-left flex flex-col font-sans transition-all px-4 py-3 border border-transparent ${
              activeDay === tab.day 
                ? 'bg-artistic-bg border-artistic-border border-l-4 border-l-artistic-accent' 
                : 'hover:bg-artistic-bg/50 opacity-60'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Day {tab.day}</span>
            <span className="font-serif text-lg font-bold">{tab.title}</span>
          </button>
        ))}
      </div>
      
      <div className="md:w-3/4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-3xl font-bold mb-8 italic text-artistic-accent">
              {activeContent?.title}
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-artistic-bg">
              {activeContent?.activities.map((activity, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-b border-artistic-bg pb-6">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-artistic-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-[-9px] md:mx-auto"></div>
                  
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] px-4 py-2 flex flex-col items-start md:group-odd:items-end md:group-odd:text-right">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-60 text-artistic-accent mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {activity.time}
                    </span>
                    <h4 className="font-serif text-xl font-bold mb-2">{activity.title}</h4>
                    <p className="font-sans text-[12px] opacity-70 leading-relaxed text-balance">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------- Components ---------------- //
function FeatureCard({ id, image, title, subtitle, description, number, isSaved, onToggleSave }: {
  id: string, image: string, title: string, subtitle: string, description: string, number: string, isSaved: boolean, onToggleSave: () => void
}) {
  return (
    <motion.div 
      className="flex flex-col border-b border-artistic-border pb-12 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="font-sans text-[10px] font-bold uppercase opacity-60 tracking-widest">{number} / DISTRICT</span>
        <button 
          onClick={onToggleSave}
          className={`flex items-center gap-2 border px-4 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${isSaved ? 'text-white bg-artistic-accent border-artistic-accent' : 'text-artistic-text border-artistic-text/30 hover:border-artistic-accent'}`}
        >
          {isSaved ? "Saved" : "Save"}
          {isSaved ? <Bookmark className="w-4 h-4 fill-current" /> : <BookmarkPlus className="w-4 h-4" />}
        </button>
      </div>
      
      <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 flex items-baseline justify-between">
        {title}
      </h3>
      <span className="font-serif italic text-artistic-accent mb-4 block">{subtitle}</span>
      <p className="font-sans text-[13px] text-artistic-text/70 leading-relaxed mb-8 max-w-sm">
        {description}
      </p>

      <div className="relative aspect-[4/3] overflow-hidden border border-artistic-border p-2 bg-white mt-auto cursor-pointer">
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}

// ---------------- MAIN EXPORT ---------------- //
export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string, category: string} | null>(null);
  
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div className="relative min-h-screen bg-artistic-bg text-artistic-text selection:bg-artistic-accent selection:text-white font-serif">
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-artistic-bg flex flex-col items-center justify-center cursor-pointer"
            onClick={() => {
              if (isPlayerReady) {
                setHasEntered(true);
                setIsPlayingMusic(true);
              }
            }}
          >
             {isPlayerReady ? (
               <div className="flex flex-col items-center justify-center text-center px-6 mix-blend-multiply">
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="w-3 h-3 rounded-full bg-artistic-accent mb-8" 
                 />
                 <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[-0.02em] text-artistic-accent mb-6">
                   The Boston Archive
                 </h1>
                 <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-60">
                   Tap anywhere to begin audio experience
                 </p>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center text-center px-6 mix-blend-multiply">
                 <motion.div 
                   animate={{ rotate: 360 }} 
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="w-6 h-6 border-2 border-artistic-accent border-t-transparent rounded-full mb-8" 
                 />
                 <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-artistic-accent opacity-60">
                   Tuning the frequency...
                 </p>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Background Audio - Must remain partially "visible" to avoid browser autoplay penalties */}
      <div 
        className="fixed bottom-0 right-0 pointer-events-none z-[-50] overflow-hidden" 
        style={{ opacity: 0.01, width: '200px', height: '200px' }}
      >
        <ReactPlayer 
          url="https://www.youtube.com/watch?v=4AEQRMKgEUQ" 
          playing={isPlayingMusic} 
          loop={true} 
          volume={0.8} 
          width="100%" 
          height="100%"
          controls={false}
          onReady={() => setIsPlayerReady(true)}
          config={{
            youtube: {
              playerVars: { 
                playsinline: 1,
                origin: typeof window !== 'undefined' ? window.location.origin : ''
              }
            }
          }}
        />
      </div>

      {/* Floating Music Widget */}
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-artistic-bg/95 backdrop-blur-md border border-artistic-border px-5 py-3 rounded-full shadow-lg">
        <div className={`w-2 h-2 rounded-full bg-artistic-accent transition-all ${isPlayingMusic ? 'animate-pulse' : 'opacity-30'}`} />
        <span className="font-sans text-[10px] uppercase tracking-widest font-bold hidden sm:block">Atmosphere</span>
        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-artistic-text/20 hover:border-artistic-text hover:bg-artistic-text hover:text-artistic-surface transition-all active:scale-95"
        >
          {isPlayingMusic ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
        </button>
      </div>

      <NavBar savedCount={savedItems.length} />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col justify-end p-6 md:p-12 lg:p-20 border-b border-artistic-border">
        <div className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none">
          <motion.img 
            style={{ y }}
            src={BOSTON_IMAGES.hero} 
            alt="Boston Skyline" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-artistic-bg/60 mix-blend-overlay" />
        </div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-between h-full pt-32">
          <div className="flex flex-wrap items-center gap-4 mb-8 md:mb-12">
            <span className="font-sans text-[10px] uppercase font-bold tracking-[0.15em] border border-artistic-text px-3 py-1 rounded-full bg-artistic-bg/50 backdrop-blur-sm">
              City Journal
            </span>
            <span className="font-sans text-[10px] tracking-widest opacity-60">42.3601° N, 71.0589° W</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-artistic-accent text-[65px] sm:text-[90px] md:text-[130px] lg:text-[160px] font-black tracking-[-0.04em] leading-[0.8] mb-8 uppercase">
              The<br />
              Boston<br />
              Archive
            </h1>
            <p className="font-serif text-lg md:text-2xl leading-relaxed opacity-80 max-w-lg mt-8 mb-12">
              A curated lens into the soul of the Commonwealth. From the cobblestones of Acorn Street to the sails on the Charles.
            </p>
          </motion.div>
          
          <motion.div
            style={{ opacity }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-artistic-border pt-8 gap-6"
          >
            <div className="font-sans">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-artistic-accent animate-pulse"></span>
                Current Condition
              </div>
              <div className="text-2xl md:text-4xl font-light italic font-serif text-artistic-accent">Spring Bloom • 54°F</div>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="w-12 h-12 border border-artistic-text rounded-full flex items-center justify-center hover:bg-artistic-text hover:text-artistic-surface transition-colors cursor-pointer" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-full overflow-hidden border-b border-artistic-border bg-artistic-surface py-3 flex items-center">
        <motion.div 
          className="flex whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.2em] opacity-50"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {Array(8).fill("EST. 1630 — MASSACHUSETTS BAY COLONY — ATHENS OF AMERICA — CRADLE OF LIBERTY — ").map((text, i) => (
            <span key={i} className="mx-4 text-artistic-text">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 2. Interactive Discovery - Neighborhoods */}
      <section id="neighborhoods" className="py-24 px-6 md:px-12 bg-artistic-bg border-b border-artistic-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Curated Locales" tag="01 / Neighborhoods" actionText="Interactive Guide" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-20">
            <FeatureCard 
              id="beacon-hill"
              image={BOSTON_IMAGES.acorn}
              title="Beacon Hill"
              subtitle="Timeless Elegance"
              description="A historic enclave defined by narrow, gaslit streets, federal-style rowhouses, and the iconic, deeply photographed Acorn Street."
              number="01"
              isSaved={savedItems.includes('beacon-hill')}
              onToggleSave={() => toggleSave('beacon-hill')}
            />
            <FeatureCard 
              id="seaport"
              image={BOSTON_IMAGES.seaport}
              title="Seaport District"
              subtitle="Modern Innovation"
              description="Where the city's maritime past meets its glass-enclosed future. Sweeping harbor views, contemporary art spaces, and modern dining."
              number="02"
              isSaved={savedItems.includes('seaport')}
              onToggleSave={() => toggleSave('seaport')}
            />
          </div>
        </div>
      </section>

      {/* 3. Interactive Visual Archive (Filterable Gallery & Lightbox) */}
      <section id="archive" className="py-24 border-b border-artistic-border bg-artistic-surface">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <SectionHeader title="Visual Archive" tag="02 / Lens" />
            <GalleryGrid onSelectImage={setSelectedImage} />
         </div>
      </section>

      {/* 4. Interactive Audio Walks */}
      <section id="audio-tours" className="py-24 px-6 md:px-12 bg-artistic-bg border-b border-artistic-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
           <div className="lg:w-1/3">
             <div className="sticky top-32">
                <SectionHeader title="Sonic Journeys" tag="03 / Audio Tapes" />
                <p className="mt-6 font-sans text-[13px] text-artistic-text/70 leading-relaxed max-w-sm">
                  Plug in and wander. Immersive audio walks narrated by local historians, complete with field recordings of the city's ambient pulse.
                </p>
                <div className="mt-8 border border-artistic-border p-6 bg-white shrink-0 shadow-sm flex items-start gap-4">
                  <Headphones className="w-8 h-8 text-artistic-accent shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Recommended Experience</h4>
                    <p className="font-sans text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">Use over-ear noise-cancelling headphones for the best immersive field audio.</p>
                  </div>
                </div>
             </div>
           </div>
           <div className="lg:w-2/3 mt-12 lg:mt-0">
              <AudioPlayerModule isPlayingMusic={isPlayingMusic} toggleMusic={() => setIsPlayingMusic(!isPlayingMusic)} />
           </div>
        </div>
      </section>

      {/* 5. Interactive Itinerary Planner */}
      <section id="itinerary" className="py-24 border-b border-artistic-border bg-artistic-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader title="48 Hours in Boston" tag="04 / Itineraries" />
          <ItineraryPlanner />
        </div>
      </section>

      {/* 6. The Almanac (Accordion FAQs) */}
      <section id="almanac" className="py-24 px-6 md:px-12 border-b border-artistic-border bg-artistic-bg">
        <div className="max-w-4xl mx-auto text-center">
           <div className="mb-16">
             <LibraryBig className="w-12 h-12 text-artistic-accent mx-auto mb-6" />
             <h2 className="font-serif text-[40px] md:text-[60px] font-black tracking-[-0.02em] leading-none text-artistic-text uppercase">
                The Almanac
             </h2>
             <p className="mt-6 font-sans text-xs font-bold uppercase tracking-widest text-artistic-accent">
               Essential Knowledge for the Discerning Traveler
             </p>
           </div>
           
           <AlmanacAccordion />
        </div>
      </section>

      {/* 7. Booking / Newsletter Footer Form */}
      <section className="py-32 px-6 bg-artistic-surface border-b border-artistic-border flex flex-col items-center text-center">
        <div className="max-w-2xl w-full">
           <div className="w-8 h-8 rounded-full bg-artistic-accent mx-auto mb-8 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
             <Bookmark className="w-4 h-4" />
           </div>
           <h2 className="font-serif text-[40px] md:text-[60px] font-black tracking-tighter leading-none mb-6">SECURE YOUR ARCHIVE</h2>
           <p className="font-sans text-[13px] text-artistic-text/70 leading-relaxed mb-12">
             Subscribe to receive monthly curated itineraries, secret dining spots, and exclusive access to architectural tours.
           </p>
           
           <form className="flex flex-col sm:flex-row w-full gap-4 group" onSubmit={(e) => { e.preventDefault(); alert("Journal subscription secured."); }}>
             <input 
               type="email" 
               placeholder="EMAIL ADDRESS" 
               required
               className="flex-1 bg-transparent border-b-2 border-artistic-text p-4 font-sans text-xs uppercase tracking-widest outline-none focus:border-artistic-accent transition-colors placeholder:text-artistic-text/30"
             />
             <button className="bg-artistic-text text-artistic-surface px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-artistic-accent hover:text-white transition-colors">
               Subscribe
             </button>
           </form>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center font-sans text-[10px] uppercase tracking-widest font-bold bg-artistic-bg">
        <p className="opacity-60 mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">© {new Date().getFullYear()} THE BOSTON JOURNAL. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap justify-center gap-8 w-full md:w-auto">
          <a href="#" className="hover:text-artistic-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-artistic-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-artistic-accent transition-colors">Terms</a>
        </div>
      </footer>

      {/* Global Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
