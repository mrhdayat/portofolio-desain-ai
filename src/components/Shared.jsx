import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// --- THEME CONTEXT ENGINE (LOCAL STORAGE CONTRAST DETECTOR) ---
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rahmat-theme');
    return saved || 'light'; // Default to beautiful warm gallery stone paper
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rahmat-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Dynamic Theme Selector Trigger Navbar Component
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase border border-text-primary/20 px-4 py-2.5 sm:px-3 sm:py-1 cursor-pointer hover:border-text-primary/70 transition-colors select-none font-semibold text-text-secondary hover:text-text-primary"
      data-cursor-label="THEME"
    >
      {theme === 'light' ? 'Ink Mode' : 'Stone Mode'}
    </button>
  );
};

// 1. High-Contrast Asymmetrical Page Transitions
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative"
    >
      {children}
    </motion.div>
  );
};

// 2. Physics-based Magnetic Proximity Snapping
export const Magnetic = ({ children, range = 60, strength = 0.35 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    const distance = Math.hypot(distanceX, distanceY);
    if (distance < range) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// 3. Rebuild BrutalistPanel into a Luxury EditorialPanel
export const BrutalistPanel = ({ 
  children, 
  className = '', 
  hoverTranslate = false,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={hoverTranslate ? { y: -2 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`bg-bg-panel border border-text-primary/10 p-6 relative select-none rounded-[2px] transition-colors duration-300 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Placeholders for visual compatibility so we don't break import lines
export const DraggableSticker = ({ children }) => <>{children}</>;
export const BarcodeSticker = () => null;
export const CareLabelSticker = () => null;
export const TickerMarquee = () => null;

// Rebuild CyberGrid and CyberHalos into ultra-clean structural lines or null
export const CyberGrid = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-20">
      {/* Delicate outer framing guideline */}
      <div className="absolute inset-x-8 sm:inset-x-12 inset-y-0 border-x border-text-primary/5 pointer-events-none" />
    </div>
  );
});

export const CyberHalos = React.memo(() => null);

// 10. Refined Aristide × Obys Minimalist Cursor
export const PremiumCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hoverLabel, setHoverLabel] = useState("");
  const [hoverImage, setHoverImage] = useState(null);

  const springConfig = { damping: 26, stiffness: 350, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId = null;
    
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (hidden) setHidden(false);
      });
    };

    const handleMouseOver = (e) => {
      const interactiveEl = e.target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      setActive(!!interactiveEl);

      if (interactiveEl) {
        const label = interactiveEl.getAttribute('data-cursor-label') || "";
        setHoverLabel(label);
        
        const img = interactiveEl.getAttribute('data-cursor-image');
        setHoverImage(img || null);
      } else {
        setHoverLabel("");
        setHoverImage(null);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Pristine Minimal Pointer Ring */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: active ? 48 : 8,
          height: active ? 48 : 8,
          backgroundColor: active ? 'rgba(17,17,18,0.0)' : 'var(--text-primary)',
          borderColor: 'var(--text-primary)',
          borderWidth: active ? 0.5 : 0,
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block border"
      />

      {/* Floating Lookbook image follower */}
      <AnimatePresence>
        {hoverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '35px',
              translateY: '-50%',
            }}
            className="fixed top-0 left-0 w-64 h-40 pointer-events-none z-[9998] bg-bg-panel border border-text-primary/10 p-1.5 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.15)] rounded-[2px] hidden md:block"
          >
            <div className="w-full h-full overflow-hidden relative">
              <img 
                src={hoverImage} 
                alt="Lookbook snapshot" 
                className="w-full h-full object-cover filter brightness-[0.97]" 
              />
              {hoverLabel && (
                <div className="absolute bottom-2 left-2 font-sans text-[9px] tracking-widest text-bg-primary bg-text-primary px-2 py-0.5 uppercase font-medium">
                  {hoverLabel}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 11. Custom Mask-Slide word-by-word reveal (Aristide Benoist / Obys style)
export const FadeUpText = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] leading-normal py-1">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// 12. Fluid Scroll Reveal Matrix
export const ScrollReveal = ({ children, delay = 0, yOffset = 25 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative"
    >
      {children}
    </motion.div>
  );
};

// 13. Ultra-Premium Glossy Glass Panel (Glassmorphism Spell)
export const GlossyGlassPanel = ({ children, className = "", hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.005 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative bg-bg-panel/40 backdrop-blur-xl border border-text-primary/10 p-6 md:p-8 rounded-[2px] transition-colors duration-500 overflow-hidden ${className}`}
    >
      {/* Decorative premium glass sheen reflection light overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-text-primary/[0.015] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// 14. Art Deco Grid Guidelines System
export const ArtDecoGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-20">
      {/* Vector crop marks in the corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-text-primary/15" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-text-primary/15" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-text-primary/15" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-text-primary/15" />
      
      {/* Editorial horizontal layout guides */}
      <div className="absolute top-[20%] left-0 right-0 h-[0.5px] bg-text-primary/5 border-dashed" />
      <div className="absolute top-[80%] left-0 right-0 h-[0.5px] bg-text-primary/5 border-dashed" />
      
      {/* Subtle fine coordinates indicator */}
      <div className="absolute top-6 left-12 font-mono text-[7px] tracking-[0.3em] uppercase text-text-secondary/35">
        GRID // STABILIZER_SYS_R4
      </div>
    </div>
  );
};

// 15. Museum-Grade Architectural Frame
export const ArchitecturalFrame = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-bg-panel border border-text-primary/10 p-6 relative rounded-[2px] transition-colors duration-500 overflow-hidden ${className}`}
    >
      {/* Double border design spell */}
      <div className="absolute inset-[3px] border border-text-primary/5 pointer-events-none opacity-60" />
      
      {/* Technical corner indicators */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-text-primary/30" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-text-primary/30" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-text-primary/30" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-text-primary/30" />
      
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

// 16. Elite Awwwards-Style 3D Parallax Tilt Card
export const TiltCard = ({ children, className = "", onClick, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalized coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotationStrength = 12; // Max 12 degree tilt
  const rotateX = isHovered ? coords.y * -rotationStrength : 0;
  const rotateY = isHovered ? coords.x * rotationStrength : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative cursor-pointer transition-colors duration-300 rounded-[2px] ${className}`}
      style={{ perspective: '1000px' }}
      {...props}
    >
      <div
        className="w-full h-full will-change-gpu transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.15)' 
            : '0 5px 15px -5px rgba(0, 0, 0, 0.03)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// --- PREMIUM CUSTOM ART DIRECTION VECTOR ICONS (QUIET LUXURY) ---

export const CustomLayersIcon = ({ className = "text-accent", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <path d="M4 8l8-4 8 4-8 4-8-4z" />
    <path d="M4 13l8 4 8-4" opacity="0.75" />
    <path d="M4 18l8 4 8-4" opacity="0.5" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

export const CustomShieldIcon = ({ className = "text-text-primary", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.5" strokeDasharray="2 1.5" />
    <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" strokeWidth="1" />
    <circle cx="12" cy="12" r="0.75" fill="currentColor" />
  </svg>
);

export const CustomBalanceIcon = ({ className = "text-accent", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <path d="M12 3v18M3 12h18" strokeDasharray="2 2" opacity="0.4" />
    <path d="M4 19L12 5l8 14" />
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <path d="M8 13.5h8" strokeWidth="0.5" />
  </svg>
);

export const CustomIdentityIcon = ({ className = "text-accent", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="1" strokeDasharray="1.5 1.5" />
    <circle cx="12" cy="12" r="5" />
    <path d="M8 12h8M12 8v8" strokeWidth="0.5" />
    <path d="M5 5h3M5 5v3M19 5h-3M19 5v3M5 19h3M5 19v-3M19 19h-3M19 19v-3" strokeWidth="1" />
  </svg>
);

export const CustomRefreshIcon = ({ className = "text-text-primary", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <path d="M3 12a9 9 0 0115-6.7L21 8M21 12a9 9 0 01-15 6.7L3 16" />
    <path d="M16 5h5v5M8 19H3v-5" strokeWidth="1" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const CustomEyeIcon = ({ className = "text-accent", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M12 7.5v-2M12 18.5v-2" strokeWidth="0.5" />
  </svg>
);

export const CustomCalibratedLabIcon = ({ className = "", size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" strokeDasharray="1.5 1" />
    <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

export const CustomJointIcon = ({ className = "", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.85" className={className}>
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="12" cy="12" r="2" />
    <line x1="7.4" y1="16.6" x2="10.6" y2="13.4" />
    <line x1="13.4" y1="10.6" x2="16.6" y2="7.4" />
  </svg>
);