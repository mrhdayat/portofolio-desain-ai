import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, Zap, Award, Sparkles } from 'lucide-react';
import { GlossyGlassPanel, ArtDecoGrid, ArchitecturalFrame, Magnetic } from '../components/Shared';

// Standard ease animation timing
const easeCubic = [0.16, 1, 0.3, 1];

// Helper to format currency
const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);
};

// Animated Number Counter Component
const AnimatedCounter = ({ value }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: easeCubic }}
      className="inline-block"
    >
      {formatCurrency(value)}
    </motion.span>
  );
};

export default function Pricing() {
  const [rendersCount, setRendersCount] = useState(10); // Standard slider: 5 to 50
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Pricing Model Math Configuration
  const basePriceStandard = 350;
  const perRenderStandard = 50;
  const basePriceGold = 800;
  const perRenderGold = 95;

  const expressMultiplier = 1.35;

  // Calculate actual costs
  const calculateCost = (base, perItem) => {
    let cost = base + (rendersCount - 5) * perItem;
    if (expressDelivery) {
      cost *= expressMultiplier;
    }
    return Math.round(cost);
  };

  const costStandard = calculateCost(basePriceStandard, perRenderStandard);
  const costGold = calculateCost(basePriceGold, perRenderGold);

  const pricingFeatures = [
    { name: 'Facial Identity Locks', std: 'Up to 2 subjects', gold: 'Unlimited subjects' },
    { name: 'Environmental Continuity', std: 'Single scene template', gold: 'Deterministic multi-scene' },
    { name: 'Outfit & Styling Locks', std: '1 lock', gold: 'Up to 5 locks' },
    { name: 'Color Grading Space', std: '8-bit Standard sRGB', gold: '12-bit Log-space Spatial' },
    { name: 'Double-Border Framing', std: 'No', stdIcon: false, gold: 'Yes (Custom SVG specs)', goldIcon: true },
    { name: 'Acoustic / Consultation Hours', std: '1 hour text chat', gold: '4 hours video consultation' },
    { name: 'Delivery speed', std: '5 Days base', gold: '3 Days base' },
    { name: 'Revision loops', std: '2 rounds', gold: 'Unlimited elite rounds' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
      
      {/* Page Header */}
      <section className="text-center py-10 md:py-16 border-b border-white/5 relative">
        <ArtDecoGrid />
        
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCubic }}
            className="text-[8.5px] tracking-[0.35em] text-[#dfc79b] uppercase"
          >
            TRANSPARENT CONTRACTING SYSTEMS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeCubic, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif-display font-light text-white mt-2"
          >
            Campaign Calibration Matrix
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeCubic, delay: 0.2 }}
            className="text-xs text-white/50 max-w-md mx-auto mt-4 font-light leading-relaxed"
          >
            Formulate your production package dynamically. Scale renders, configure expedited cycles, and evaluate feature matrices in real-time.
          </motion.p>
        </div>
      </section>

      {/* 1. DYNAMIC MATH SLIDERS */}
      <section className="py-12 border-b border-white/5">
        <GlossyGlassPanel hoverEffect={false} className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Renders count slider */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] tracking-[0.25em] text-white/60 font-sans uppercase">CAMPAIGN RENDERS VOLUME</span>
                <span className="text-sm font-serif-display text-[#dfc79b]">{rendersCount} High-Fidelity Assets</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={rendersCount}
                onChange={(e) => setRendersCount(parseInt(e.target.value))}
                className="w-full h-1 bg-[#1a1a1f] rounded-lg appearance-none cursor-pointer accent-[#dfc79b] outline-none"
              />
              <div className="flex justify-between text-[8px] text-white/30 uppercase mt-2 tracking-widest font-sans">
                <span>Min: 5 Renders</span>
                <span>Balanced: 25 Renders</span>
                <span>Max: 50 Renders</span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-[1px] h-12 bg-white/5 mx-4" />

            {/* Fast Delivery toggle */}
            <div className="flex flex-col justify-center min-w-[200px]">
              <span className="text-[10px] tracking-[0.25em] text-white/60 font-sans uppercase mb-3">EXPEDITED VELOCITY</span>
              <label className="inline-flex items-center cursor-pointer pointer-events-auto">
                <input
                  type="checkbox"
                  checked={expressDelivery}
                  onChange={(e) => setExpressDelivery(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-white/[0.05] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#dfc79b] after:border-none after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#dfc79b]/15 border border-white/5"></div>
                <span className="ms-3 text-[9px] tracking-widest text-white/80 uppercase font-sans flex items-center gap-1.5">
                  <Zap size={11} className={expressDelivery ? 'text-[#dfc79b]' : 'text-white/40'} /> 48H EXPRESS (+35%)
                </span>
              </label>
            </div>
          </div>
        </GlossyGlassPanel>
      </section>

      {/* 2. PRICING LAYERS DISPLAY */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border-b border-white/5">
        
        {/* Tier 1: Silver Editorial */}
        <ArchitecturalFrame>
          <div className="flex flex-col justify-between h-full p-2">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-sans">TIER 01</span>
                <span className="px-2.5 py-1 rounded-full text-[7.5px] tracking-widest text-white/60 border border-white/10 uppercase bg-white/[0.01]">
                  STANDARD EDITORIAL
                </span>
              </div>
              <h2 className="text-4xl font-serif-display text-white">Silver Pack</h2>
              <p className="text-xs text-white/40 mt-1 leading-relaxed font-light">
                Tailored for small lookbooks and localized social campaigns. Provides high-fidelity facial and pose preservation.
              </p>

              <div className="my-8 flex items-baseline gap-1">
                <span className="text-5xl font-serif-display text-[#dfc79b] font-light">
                  <AnimatedCounter value={costStandard} />
                </span>
                <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-sans">/ PACKAGE</span>
              </div>

              <div className="h-[1px] bg-white/5 my-6" />

              <ul className="space-y-4 text-xs text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span><strong>{rendersCount}</strong> Render Assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span>1 Outfit lock & Identity continuity</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span>8-bit Color space correction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span>Express Delivery toggle valid</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Magnetic>
                <Link
                  to="/contact"
                  state={{ plan: 'silver-pack', count: rendersCount, express: expressDelivery }}
                  className="w-full py-3.5 border border-white/10 hover:border-[#dfc79b]/60 rounded-full text-[9px] tracking-[0.3em] text-center block text-white hover:bg-[#dfc79b]/5 uppercase transition-all duration-300 pointer-events-auto"
                >
                  SECURE SILVER CONTRACT
                </Link>
              </Magnetic>
            </div>
          </div>
        </ArchitecturalFrame>

        {/* Tier 2: Champagne Gold Enterprise */}
        <ArchitecturalFrame>
          <div className="flex flex-col justify-between h-full p-2 relative overflow-hidden">
            {/* Absolute highlight gold sweep */}
            <div className="absolute inset-0 bg-[#dfc79b]/[0.01] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] tracking-[0.25em] text-[#dfc79b] uppercase font-sans">TIER 02</span>
                <span className="px-2.5 py-1 rounded-full text-[7.5px] tracking-widest text-[#dfc79b] border border-[#dfc79b]/30 uppercase bg-[#dfc79b]/5 flex items-center gap-1 font-sans">
                  <Award size={10} /> CHAMPAGNE GOLD ELITE
                </span>
              </div>
              <h2 className="text-4xl font-serif-display text-white text-gold-gradient">Enterprise Gold</h2>
              <p className="text-xs text-white/40 mt-1 leading-relaxed font-light">
                Designed for high-end commerce campaigns requiring uncompromising material consistency, double-border geometries, and multi-subject locks.
              </p>

              <div className="my-8 flex items-baseline gap-1">
                <span className="text-5xl font-serif-display text-gold-gradient font-light">
                  <AnimatedCounter value={costGold} />
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#dfc79b]/40 uppercase font-sans">/ PACKAGE</span>
              </div>

              <div className="h-[1px] bg-white/5 my-6" />

              <ul className="space-y-4 text-xs text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span><strong>{rendersCount}</strong> Render Assets (12-bit Log)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span>Unlimited Styling & Environmental locks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span>Acoustic Consultation & Video sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-[#dfc79b]" /> <span>Custom double-border SVG geometries</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 relative z-10">
              <Magnetic>
                <Link
                  to="/contact"
                  state={{ plan: 'gold-pack', count: rendersCount, express: expressDelivery }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#dfc79b] to-[#b89d70] text-[#09090b] rounded-full text-[9px] tracking-[0.3em] text-center block font-medium uppercase hover:scale-[1.01] transition-all duration-300 pointer-events-auto"
                >
                  SECURE GOLD CONTRACT
                </Link>
              </Magnetic>
            </div>
          </div>
        </ArchitecturalFrame>
      </section>

      {/* 3. COMPARISON MATRIX GRID */}
      <section className="py-20 max-w-4xl mx-auto">
        <h3 className="text-3xl font-serif-display text-white text-center mb-10">
          Side-By-Side Spec Matrix
        </h3>

        <div className="border border-white/5 rounded-xl overflow-hidden glass-premium">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-4 md:p-6 text-[10px] tracking-[0.25em] text-white/40 uppercase font-sans font-light">FEATURES</th>
                <th className="p-4 md:p-6 text-[10px] tracking-[0.25em] text-white/60 uppercase font-sans font-light">SILVER PACK</th>
                <th className="p-4 md:p-6 text-[10px] tracking-[0.25em] text-[#dfc79b] uppercase font-sans font-light">GOLD ENTERPRISE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans font-light text-xs text-white/70">
              {pricingFeatures.map((feat) => (
                <tr key={feat.name} className="hover:bg-white/[0.01] transition-colors duration-200">
                  <td className="p-4 md:p-6 font-medium text-white/90">{feat.name}</td>
                  <td className="p-4 md:p-6">{feat.std}</td>
                  <td className="p-4 md:p-6 text-[#dfc79b]">{feat.gold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}