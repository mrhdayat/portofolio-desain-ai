import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sliders } from 'lucide-react';
import { BrutalistPanel, GlossyGlassPanel, ArtDecoGrid, CustomCalibratedLabIcon, CustomLayersIcon, CustomRefreshIcon, CustomBalanceIcon } from '../components/Shared';
import { projects } from '../data';

// 1. Proximity-based Magnetic Badge Component
const MagneticBadge = ({ cursor, containerRef }) => {
  const ref = useRef(null);
  const [angle, setAngle] = useState(0);
  const [dist, setDist] = useState(9999);

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();
    const badgeX = rect.left + rect.width / 2 - cRect.left;
    const badgeY = rect.top + rect.height / 2 - cRect.top;

    const dx = cursor.x - badgeX;
    const dy = cursor.y - badgeY;
    const rad = Math.atan2(dy, dx);
    setAngle(rad * (180 / Math.PI));
    setDist(Math.hypot(dx, dy));
  }, [cursor, containerRef]);

  const maxRange = 180;
  const intensity = Math.max(0, 1 - dist / maxRange); // Proximity factor

  return (
    <div 
      ref={ref} 
      className="aspect-square flex flex-col items-center justify-center border border-text-primary/5 bg-bg-panel relative rounded-[2px] transition-colors duration-500"
      style={{
        borderColor: intensity > 0 ? `rgba(154, 130, 100, ${intensity * 0.6})` : 'var(--border-primary)',
        boxShadow: intensity > 0 ? `0 0 15px rgba(154, 130, 100, ${intensity * 0.05})` : 'none'
      }}
    >
      <div 
        style={{ transform: `rotate(${angle}deg)`, transition: 'transform 0.05s ease-out' }}
        className="w-5 h-5 flex items-center justify-center"
      >
        <span 
          className="text-xs transition-colors duration-300 font-serif font-semibold"
          style={{ color: intensity > 0.3 ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
          →
        </span>
      </div>
      <span className="text-[6px] text-text-secondary/40 absolute bottom-1 font-mono tracking-widest">
        {dist < maxRange ? `${Math.round(dist)}PX` : 'STATIC'}
      </span>
    </div>
  );
};

export default function MotionLab() {
  const [activeTab, setActiveTab] = useState('typography');
  
  // Tab 1: Typography Physics State
  const [fontWeight, setFontWeight] = useState(300);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [alignment, setAlignment] = useState('left');
  const [drawCalibration, setDrawCalibration] = useState(true);
  
  const resetTypography = () => {
    setFontWeight(300);
    setLetterSpacing(0);
    setLineHeight(1.4);
    setAlignment('left');
  };

  // Tab 2: Volumetric Liquid Refraction State
  const [isLiquidHovered, setIsLiquidHovered] = useState(false);
  const [liquidFreq, setLiquidFreq] = useState(0.015);
  const [liquidScale, setLiquidScale] = useState(0);
  const liquidContainerRef = useRef(null);

  const handleLiquidMouseMove = (e) => {
    if (!liquidContainerRef.current) return;
    const rect = liquidContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Animate frequency based on mouse coordinates to simulate displacement friction
    const modulatedFreq = 0.01 + ((x + y) / (rect.width + rect.height)) * 0.02;
    setLiquidFreq(modulatedFreq);
    
    // Scale grows with speed/hover state
    setLiquidScale(24);
  };

  // Tab 3: Magnetic Gravity Fields State
  const [magnetCursor, setMagnetCursor] = useState({ x: -1000, y: -1000 });
  const magnetContainerRef = useRef(null);

  const handleMagnetMouseMove = (e) => {
    if (!magnetContainerRef.current) return;
    const rect = magnetContainerRef.current.getBoundingClientRect();
    setMagnetCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMagnetMouseLeave = () => {
    setMagnetCursor({ x: -1000, y: -1000 });
  };

  // Tab 4: Color Grading Matrix State
  const [campaignIdx, setCampaignIdx] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(90);
  const [hue, setHue] = useState(0);
  const [sepia, setSepia] = useState(8);
  const [grainScale, setGrainScale] = useState(0.025);

  const activeCampaign = projects[campaignIdx] || projects[0];

  const resetColorMatrix = () => {
    setContrast(100);
    setBrightness(100);
    setSaturation(90);
    setHue(0);
    setSepia(8);
    setGrainScale(0.025);
  };

  return (
    <div className="space-y-16 select-none bg-bg-primary text-text-primary transition-colors duration-500">
      
      {/* 1. Header with custom SVG design guidelines */}
      <section className="border-b border-text-primary/10 pb-8 relative text-left pt-12">
        <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase flex items-center gap-1.5">
          <CustomCalibratedLabIcon size={11} className="animate-spin-slow" /> EXPERIMENTS // KINETIC LABORATORY
        </span>
        <h1 className="text-editorial-huge font-light mt-2">
          Motion <span className="font-serif italic font-light text-accent">Lab</span>
        </h1>
        <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary max-w-xl mt-4">
          Interactive sandboxes demonstrating dynamic UI layout physics, biomorphic cursor magnetism, lookbook color matrices, and fluid refractions.
        </p>

        {/* 2. Responsive Premium Tab Toggles */}
        <div className="flex flex-wrap gap-2.5 mt-10 font-sans border-t border-text-primary/5 pt-6 relative z-20">
          {[
            { id: 'typography', name: 'Typography Physics', icon: CustomLayersIcon },
            { id: 'liquid', name: 'Volumetric Liquid', icon: CustomRefreshIcon },
            { id: 'magnetic', name: 'Magnetic Field', icon: CustomBalanceIcon },
            { id: 'color', name: 'Color Grading', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 border text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-[2px] ${
                  isActive
                    ? 'bg-text-primary text-bg-primary border-text-primary'
                    : 'bg-transparent text-text-secondary border-text-primary/10 hover:border-text-primary/30 hover:text-text-primary'
                }`}
                data-cursor-label={`OPEN ${tab.id.toUpperCase()}`}
              >
                <Icon size={12} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. LABORATORY RENDER COMPARTMENT */}
      <section className="min-h-[480px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: TYPOGRAPHY PHYSICS */}
          {activeTab === 'typography' && (
            <motion.div
              key="typography"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Control Panel */}
              <div className="lg:col-span-5 text-left font-sans">
                <BrutalistPanel className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-text-primary/10">
                    <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">
                      Typography Modulator
                    </span>
                    <button 
                      onClick={resetTypography}
                      className="text-[9px] text-text-secondary hover:text-text-primary flex items-center gap-1 cursor-pointer font-bold tracking-widest uppercase transition-all"
                    >
                      <RotateCcw size={10} /> Reset
                    </button>
                  </div>

                  {/* Font Weight */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-text-secondary tracking-wider font-semibold">
                      <span>1. FONT WEIGHT</span>
                      <span className="text-text-primary font-mono">{fontWeight}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="900" 
                      step="50"
                      value={fontWeight}
                      onChange={(e) => setFontWeight(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Letter Tracking */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-text-secondary tracking-wider font-semibold">
                      <span>2. LETTER TRACKING</span>
                      <span className="text-text-primary font-mono">{(letterSpacing / 100).toFixed(2)}EM</span>
                    </div>
                    <input 
                      type="range" 
                      min="-10" 
                      max="40" 
                      value={letterSpacing}
                      onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Line Spacing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-text-secondary tracking-wider font-semibold">
                      <span>3. LINE SPACING</span>
                      <span className="text-text-primary font-mono">{lineHeight.toFixed(1)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1.0" 
                      max="2.0" 
                      step="0.1"
                      value={lineHeight}
                      onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Alignment */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-text-secondary tracking-wider font-semibold uppercase">4. Page Alignment</span>
                    <div className="flex gap-2">
                      {['left', 'center', 'right'].map((align) => (
                        <button
                          key={align}
                          onClick={() => setAlignment(align)}
                          className={`flex-1 border text-[9px] font-bold uppercase tracking-wider py-2 cursor-pointer transition-all ${
                            alignment === align
                              ? 'bg-text-primary text-bg-primary border-text-primary'
                              : 'bg-transparent text-text-secondary border-text-primary/10 hover:border-text-primary/30 hover:text-text-primary'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Bounding Box specs */}
                  <div className="pt-2 border-t border-text-primary/10 flex justify-between items-center text-[10px] font-semibold text-text-secondary">
                    <span>SHOW CALIBRATION OVERLAY</span>
                    <button
                      onClick={() => setDrawCalibration(!drawCalibration)}
                      className={`px-3 py-1 border text-[8px] tracking-widest font-bold uppercase transition-all rounded-[1px] ${
                        drawCalibration ? 'bg-accent/15 text-accent border-accent/30' : 'border-text-primary/10 hover:border-text-primary/30'
                      }`}
                    >
                      {drawCalibration ? 'ACTIVE' : 'DEACTIVE'}
                    </button>
                  </div>
                </BrutalistPanel>
              </div>

              {/* Render Area */}
              <div className="lg:col-span-7">
                <div className="border border-text-primary/10 bg-bg-panel relative w-full h-[450px] overflow-hidden flex items-center justify-center p-8 sm:p-12 rounded-[2px] transition-colors duration-500">
                  {/* Grid Lines calibration */}
                  <div className="absolute inset-4 border border-dashed border-text-primary/5 pointer-events-none" />
                  
                  {drawCalibration && (
                    <AnimatePresence>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none z-0"
                      >
                        {/* Vertical & Horizontal Center Calibration Lines */}
                        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-accent/20 border-dashed" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-accent/20 border-dashed" />
                        
                        {/* Technical measurements markers */}
                        <span className="absolute top-4 left-6 font-mono text-[7px] tracking-widest text-accent">X_AXIS // 0.05 Calibrated</span>
                        <span className="absolute bottom-4 right-6 font-mono text-[7px] tracking-widest text-accent">GRID STATUS: ACTIVE</span>
                        
                        {/* Real-time Bounding specifications overlay */}
                        <div 
                          className="absolute border border-accent/25 transition-all duration-300 rounded-[1px]"
                          style={{
                            top: '25%',
                            bottom: '25%',
                            left: '10%',
                            right: '10%'
                          }}
                        >
                          <span className="absolute -top-3.5 left-0 font-mono text-[6px] tracking-wider text-accent bg-bg-panel px-1">TYPOGRAPHY BOUNDING BOX // MAX_WIDTH: 100%</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                  
                  <div 
                    style={{
                      fontWeight: fontWeight,
                      letterSpacing: `${letterSpacing / 100}em`,
                      lineHeight: lineHeight,
                      textAlign: alignment
                    }}
                    className="w-full text-text-primary transition-all duration-300 select-text relative z-10 max-w-xl"
                  >
                    <h2 className="font-serif italic text-4xl sm:text-5xl leading-tight text-accent mb-4">
                      Visual Direction
                    </h2>
                    <p className="font-sans text-sm sm:text-base leading-relaxed">
                      “A visual producer binds tactical streetwear sequences with raw museum-grade structures. We reject generative slop and design tailored aesthetics.”
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VOLUMETRIC LIQUID REFRACTION */}
          {activeTab === 'liquid' && (
            <motion.div
              key="liquid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
            >
              {/* Specs and Details */}
              <div className="lg:col-span-5 space-y-6 font-sans">
                <BrutalistPanel className="space-y-4">
                  <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">// Liquid Distortion System</span>
                  <h3 className="font-serif text-2xl font-light text-text-primary leading-snug">
                    Biomorphic Fluid <span className="italic text-accent">Displacement</span>
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    This experiment maps dynamic custom SVG displacement filters to recreate lookbook glazes, liquid glass refractions, and water ripples that track the velocity coordinates of your cursor. Move your mouse across the lookbook frame to deform the visual grid in real-time.
                  </p>

                  <div className="border-t border-text-primary/10 pt-4 space-y-2 font-mono text-[9px] text-text-secondary/70">
                    <p>FILTER_ID: #VOLUMETRIC_REFRACTION</p>
                    <p>BASE_FREQUENCY: {liquidFreq.toFixed(4)}</p>
                    <p>DISPLACEMENT_SCALE: {isLiquidHovered ? '24 (ACTIVE)' : '0 (RESTING)'}</p>
                    <p>VOLUMETRICS: glassmorphic glaze</p>
                  </div>
                </BrutalistPanel>
              </div>

              {/* Canvas Render Area */}
              <div className="lg:col-span-7">
                <div 
                  ref={liquidContainerRef}
                  onMouseMove={handleLiquidMouseMove}
                  onMouseEnter={() => {
                    setIsLiquidHovered(true);
                    setLiquidScale(24);
                  }}
                  onMouseLeave={() => {
                    setIsLiquidHovered(false);
                    setLiquidScale(0);
                  }}
                  className="border border-text-primary/10 bg-bg-panel relative w-full h-[450px] overflow-hidden flex items-center justify-center p-1.5 rounded-[2px] transition-colors duration-500"
                  data-cursor-label="DISTORT"
                >
                  {/* Grid Lines background */}
                  <ArtDecoGrid />
                  
                  {/* Absolute guidelines specs */}
                  <span className="absolute top-3 left-4 font-mono text-[7px] tracking-widest text-text-secondary/40">LOOKBOOK GLOSS MAPPING // CANVAS_02</span>
                  <span className="absolute bottom-3 right-4 font-mono text-[7px] tracking-widest text-accent font-semibold">MOVE CURSOR ACROSS SCREEN</span>

                  {/* SVG Liquid Filter declarations */}
                  <svg className="hidden">
                    <defs>
                      <filter id="liquid-refraction-filter">
                        <feTurbulence 
                          type="fractalNoise" 
                          baseFrequency={liquidFreq} 
                          numOctaves="3" 
                          result="noise" 
                        />
                        <feDisplacementMap 
                          in="SourceGraphic" 
                          in2="noise" 
                          scale={liquidScale} 
                          xChannelSelector="R" 
                          yChannelSelector="G" 
                          result="displacement"
                        />
                      </filter>
                    </defs>
                  </svg>

                  {/* Fluid deforming Lookbook image container */}
                  <div 
                    style={{ 
                      filter: 'url(#liquid-refraction-filter)',
                      transition: 'filter 0.15s ease-out'
                    }}
                    className="w-full h-full relative"
                  >
                    <img 
                      src={projects[0]?.heroImage || ""}
                      alt="Refraction lookbook model"
                      className="w-full h-full object-cover grayscale brightness-[0.97]" 
                    />
                    
                    {/* Floating typographic overlay that deforms with the filter */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-left bg-gradient-to-t from-bg-primary/80 to-transparent">
                      <h4 className="font-serif italic text-3xl text-text-primary leading-none">
                        Monolithic Fiber
                      </h4>
                      <p className="font-sans text-[10px] tracking-widest text-text-secondary uppercase mt-2">
                        Edition 2026 // DVTST-01 Campaign
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MAGNETIC GRAVITY FIELDS */}
          {activeTab === 'magnetic' && (
            <motion.div
              key="magnetic"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
            >
              {/* Specs Column */}
              <div className="lg:col-span-5 space-y-6 font-sans">
                <BrutalistPanel className="space-y-4">
                  <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">// Proximity Vector Dynamics</span>
                  <h3 className="font-serif text-2xl font-light text-text-primary leading-snug">
                    Kinetic Magnet <span className="italic text-accent">Gravity Fields</span>
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    This interactive bento grid binds skeletal tracking spring structures. Each round badge coordinates its rotation matrix and color contrast value dynamically depending on your cursor's distance and direction vector.
                  </p>

                  <div className="border-t border-text-primary/10 pt-4 space-y-2 font-mono text-[9px] text-text-secondary/70">
                    <p>GRAVITY_MODE: dynamic spring proximity</p>
                    <p>CURSOR_COORDINATES: X: {magnetCursor.x.toFixed(0)}PX // Y: {magnetCursor.y.toFixed(0)}PX</p>
                    <p>INFLUENCE_RANGE: 180PX max</p>
                    <p>ROTATION: skeletal proximity rotation matrix</p>
                  </div>
                </BrutalistPanel>
              </div>

              {/* Grid Canvas Render Area */}
              <div className="lg:col-span-7">
                <div 
                  ref={magnetContainerRef}
                  onMouseMove={handleMagnetMouseMove}
                  onMouseLeave={handleMagnetMouseLeave}
                  className="border border-text-primary/10 bg-bg-panel relative w-full h-[450px] overflow-hidden flex items-center justify-center p-8 rounded-[2px] transition-colors duration-500"
                  data-cursor-label="GRAVITY"
                >
                  {/* Guidelines specs */}
                  <span className="absolute top-3 left-4 font-mono text-[7px] tracking-widest text-text-secondary/40">SKELETAL GRID CALIBRATION // MODULE_12</span>
                  
                  {/* Dynamic tracking lines */}
                  {magnetCursor.x > -500 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] z-20">
                      {/* Horizontal tracking line */}
                      <line 
                        x1="0" 
                        y1={magnetCursor.y} 
                        x2="100%" 
                        y2={magnetCursor.y} 
                        stroke="var(--accent)" 
                        strokeWidth="0.5" 
                        strokeDasharray="4 4"
                      />
                      {/* Vertical tracking line */}
                      <line 
                        x1={magnetCursor.x} 
                        y1="0" 
                        x2={magnetCursor.x} 
                        y2="100%" 
                        stroke="var(--accent)" 
                        strokeWidth="0.5" 
                        strokeDasharray="4 4"
                      />
                    </svg>
                  )}

                  {/* Core 24 Arrow badges matrix grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3.5 w-full h-full items-stretch">
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <MagneticBadge 
                        key={idx} 
                        cursor={magnetCursor} 
                        containerRef={magnetContainerRef} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: LOOKBOOK COLOR GRADING MATRIX */}
          {activeTab === 'color' && (
            <motion.div
              key="color"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
            >
              {/* Sliders Control Panel */}
              <div className="lg:col-span-5 space-y-6 font-sans">
                <BrutalistPanel className="space-y-5">
                  <div className="flex justify-between items-center pb-2 border-b border-text-primary/10">
                    <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">
                      Color Grading Controller
                    </span>
                    <button 
                      onClick={resetColorMatrix}
                      className="text-[9px] text-text-secondary hover:text-text-primary flex items-center gap-1 cursor-pointer font-bold tracking-widest uppercase transition-all"
                    >
                      <RotateCcw size={10} /> Reset
                    </button>
                  </div>

                  {/* Select active campaign lookbook */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Select Lookbook</label>
                    <select
                      value={campaignIdx}
                      onChange={(e) => setCampaignIdx(parseInt(e.target.value))}
                      className="w-full bg-bg-panel border border-text-primary/10 text-text-primary px-3 py-2 text-[10px] tracking-widest font-semibold uppercase outline-none focus:border-accent cursor-pointer"
                    >
                      {projects.map((proj, idx) => (
                        <option key={proj.id} value={idx}>{proj.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Contrast Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] text-text-secondary tracking-widest font-semibold">
                      <span>CONTRAST MATRIX</span>
                      <span className="text-text-primary font-mono">{contrast}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="150" 
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Brightness Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] text-text-secondary tracking-widest font-semibold">
                      <span>EXPOSURE BIAS</span>
                      <span className="text-text-primary font-mono">{brightness - 100 > 0 ? `+${brightness - 100}` : brightness - 100}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="60" 
                      max="140" 
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Saturation Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] text-text-secondary tracking-widest font-semibold">
                      <span>CHROMATIC SPACE</span>
                      <span className="text-text-primary font-mono">{saturation}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="160" 
                      value={saturation}
                      onChange={(e) => setSaturation(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Hue shift Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] text-text-secondary tracking-widest font-semibold">
                      <span>TEMPERATURE HUE</span>
                      <span className="text-text-primary font-mono">{hue}°</span>
                    </div>
                    <input 
                      type="range" 
                      min="-90" 
                      max="90" 
                      value={hue}
                      onChange={(e) => setHue(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Sepia (Warm Paper tone override) */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] text-text-secondary tracking-widest font-semibold">
                      <span>STONE TEMPERATURE (SEPIA)</span>
                      <span className="text-text-primary font-mono">{sepia}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="40" 
                      value={sepia}
                      onChange={(e) => setSepia(parseInt(e.target.value))}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>

                  {/* Grain Overlay */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] text-text-secondary tracking-widest font-semibold">
                      <span>FILM GRAIN OPACITY</span>
                      <span className="text-text-primary font-mono">{(grainScale).toFixed(3)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={grainScale * 1000}
                      onChange={(e) => setGrainScale(parseInt(e.target.value) / 1000)}
                      className="w-full h-[1px] bg-text-primary/15 appearance-none cursor-pointer accent-text-primary outline-none"
                    />
                  </div>
                </BrutalistPanel>
              </div>

              {/* Image Preview & Meta Output Box */}
              <div className="lg:col-span-7 space-y-6">
                {/* Lookbook Render frame */}
                <div className="border border-text-primary/10 bg-bg-panel relative w-full h-[360px] overflow-hidden flex items-center justify-center p-1 rounded-[2px] transition-colors duration-500">
                  <ArtDecoGrid />
                  
                  {/* Dynamic Film Grain noise overlay mapped directly to state */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
                    style={{
                      opacity: grainScale * 2,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                  />

                  {/* Lookbook Image loaded from campaign data and calibrated via filter */}
                  <img 
                    src={activeCampaign.heroImage || ""}
                    alt="Active lookbook canvas to grade"
                    style={{
                      filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturation}%) hue-rotate(${hue}deg) sepia(${sepia}%)`
                    }}
                    className="w-full h-full object-cover grayscale-0 transition-all duration-300"
                  />
                  
                  <span className="absolute top-3 left-4 font-mono text-[7px] tracking-widest text-text-primary bg-bg-panel px-2.5 py-0.5 rounded-[1px] uppercase font-semibold">
                    LUT_SPACE: calibrated
                  </span>
                </div>

                {/* Typography Metadata Spec Sheet */}
                <GlossyGlassPanel hoverEffect={false} className="py-4 px-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[9px] text-text-secondary leading-relaxed">
                    <div>
                      <span className="text-[7.5px] text-text-secondary/40 block tracking-widest font-medium uppercase">// Color Pipeline</span>
                      <span className="text-text-primary font-semibold uppercase mt-0.5 block">{contrast > 110 ? 'High contrast' : 'Linear studio'}</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] text-text-secondary/40 block tracking-widest font-medium uppercase">// Film space</span>
                      <span className="text-text-primary font-semibold uppercase mt-0.5 block">12-bit Log LogSpace</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] text-text-secondary/40 block tracking-widest font-medium uppercase">// Grain Node</span>
                      <span className="text-text-primary font-semibold uppercase mt-0.5 block">{grainScale > 0.05 ? 'Heavy aggregate' : grainScale > 0 ? 'Organic fine' : 'Digital flat'}</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] text-text-secondary/40 block tracking-widest font-medium uppercase">// Calibration</span>
                      <span className="text-accent font-semibold uppercase mt-0.5 block">CONFIRMED PASS</span>
                    </div>
                  </div>
                </GlossyGlassPanel>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>
      
    </div>
  );
}
