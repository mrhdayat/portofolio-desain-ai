import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// Import all 8 core pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Gallery from './pages/Gallery';
import Archive from './pages/Archive';
import Approach from './pages/Approach';
import Contact from './pages/Contact';
import MotionLab from './pages/MotionLab';

// Import Shared styling assets
import { PremiumCursor, CyberGrid, ThemeProvider, ThemeToggle } from './components/Shared';

// 1. Silent, Typography Preloader Sequence (Aristide Style)
const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 9) + 3;
      current = Math.min(100, current + step);
      setPercent(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 bg-bg-primary z-[9999] flex flex-col justify-between p-8 sm:p-12 font-sans select-none"
    >
      {/* Top specifications */}
      <div className="flex justify-between items-start text-[10px] tracking-widest uppercase opacity-40">
        <div>
          <p className="font-semibold">Creative Portfolio Directory</p>
          <p className="opacity-70 mt-1">Platform Edition 2026</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Loading Directory Assets</p>
        </div>
      </div>

      {/* Massive Elegant Serif Countdown */}
      <div className="my-auto self-start">
        <h1 className="text-[15vw] font-serif font-light leading-none tracking-tighter text-text-primary select-none italic">
          {percent.toString().padStart(3, '0')}
        </h1>
        <p className="font-sans text-[10px] tracking-widest uppercase opacity-40 mt-4 max-w-sm leading-relaxed">
          Initialising lookbook frames, typography scaling nodes, and premium kinetic vectors.
        </p>
      </div>

      {/* Bottom info */}
      <div className="flex flex-col gap-3">
        <div className="h-[0.5px] bg-text-primary/10 w-full" />
        <div className="flex justify-between text-[9px] tracking-widest opacity-40 uppercase">
          <span>Aristide Benoist × Obys Agency Adaptation</span>
          <span>HUMAN ART DIRECTED</span>
        </div>
      </div>
    </motion.div>
  );
};

// 2. Global Layout Framework
const AppLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection for Navbar styling transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navRoutes = [
    { name: "Index", path: "/" },
    { name: "Works", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Archive", path: "/archive" },
    { name: "Method", path: "/approach" },
    { name: "Lab", path: "/motion-lab" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative grain-overlay flex flex-col justify-between transition-colors duration-500">
      {/* Background visual templates */}
      <CyberGrid />

      {/* Pristine Modern Art Gallery Header */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-8 py-3 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-text-primary/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 py-2">
          {/* Brand Logo - Bespoke display serif signature */}
          <Link 
            to="/" 
            className="flex items-baseline gap-1 select-none cursor-pointer group"
            data-cursor-label="Index"
          >
            <span className="font-serif italic text-[17px] font-medium tracking-wide text-text-primary group-hover:text-accent transition-colors duration-300">
              m. rahmat hidayat
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navRoutes.map((route, i) => {
              const isActive = location.pathname === route.path;
              return (
                <Link
                  key={i}
                  to={route.path}
                  className={`font-sans text-[11px] tracking-widest relative py-1 hover:text-text-primary transition-colors uppercase font-medium ${
                    isActive ? 'text-text-primary font-semibold' : 'text-text-secondary/70'
                  }`}
                  data-cursor-label={route.name}
                >
                  {route.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-primary" 
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme switcher toggle + Contact Call */}
          <div className="hidden sm:flex items-center gap-5">
            <ThemeToggle />

            <a
              href="mailto:muhammad.rahmathidayat77@gmail.com?subject=Creative%20Campaign%20Inquiry%20%2F%2F%20Rahmat%20Hidayat%20Portfolio"
              className="border border-text-primary/20 hover:border-text-primary px-4 py-1 font-sans text-[10px] tracking-widest font-semibold hover:text-text-primary transition-all flex items-center gap-1 uppercase cursor-pointer text-text-secondary"
              data-cursor-label="Contact"
            >
              Consult <ArrowUpRight size={10} />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-text-primary/10 text-text-primary cursor-pointer hover:border-text-primary/30"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Pull-Out Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 border border-text-primary/10 bg-bg-primary overflow-hidden relative z-50 rounded-[2px]"
            >
              <div className="flex flex-col gap-1 p-4 font-sans text-xs text-left">
                {navRoutes.map((route, i) => (
                  <Link
                    key={i}
                    to={route.path}
                    className={`py-3.5 px-3 border border-transparent hover:bg-bg-panel transition-all flex justify-between items-center ${
                      location.pathname === route.path ? 'text-text-primary font-bold' : 'text-text-secondary/70'
                    }`}
                  >
                    <span>{route.name}</span>
                    <ArrowUpRight size={10} className="opacity-50" />
                  </Link>
                ))}
                
                <a
                  href="mailto:muhammad.rahmathidayat77@gmail.com?subject=Creative%20Campaign%20Inquiry%20%2F%2F%20Rahmat%20Hidayat%20Portfolio"
                  className="mt-4 bg-text-primary text-bg-primary text-center py-2.5 font-bold tracking-widest text-[10px]"
                >
                  CONSULTATION
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Campaign Canvas Content Router */}
      <main className="w-full flex-grow pt-24 pb-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {children}
      </main>

      {/* Quiet Gallery Footer */}
      <footer className="w-full bg-bg-primary border-t border-text-primary/5 py-8 relative z-10 select-none transition-colors duration-500 optimize-rendering-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-sans text-[10px] tracking-widest text-text-secondary/50">
          <div>
            <p className="font-semibold text-text-primary uppercase tracking-widest">MUHAMMAD RAHMAT HIDAYAT</p>
            <p className="opacity-60 mt-1 text-[9px]">ELITE CREATIVE DIRECTION & AI VISUAL PRODUCTION. ALL RIGHTS RESERVED © 2026.</p>
          </div>
          <div className="flex gap-x-8 gap-y-2 uppercase font-medium">
            <span>Status: Operational</span>
            <span>Scale: Museum Ratio</span>
            <span>Location: Jakarta // ID</span>
          </div>
        </div>
      </footer>

      {/* Interactive Typographic Cursor */}
      <PremiumCursor />
    </div>
  );
};

// 3. React App Core Router Root
const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="preloader" onComplete={() => setLoading(false)} />
          ) : (
            <AppLayout key="layout">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/approach" element={<Approach />} />
                  <Route path="/motion-lab" element={<MotionLab />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </AppLayout>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
};

// Mount the React Application to #root DOM anchor
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}