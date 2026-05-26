import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { allMediaAssets } from '../data';
import { BrutalistPanel, FadeUpText, ScrollReveal, TiltCard } from '../components/Shared';

const Gallery = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [dynamicDimensions, setDynamicDimensions] = useState({ width: 2048, height: 2048 });
  
  // Prevent page scroll when lightbox details modal is active, keeping viewport alignment stable
  useEffect(() => {
    if (selectedAsset) {
      document.body.style.overflow = 'hidden';
      
      // Dynamically load the image in the background to extract exact physical dimensions in real-time
      const img = new Image();
      img.src = selectedAsset.src;
      img.onload = () => {
        setDynamicDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAsset]);

  // Curate 4 premium editorial categories instead of 11 messy raw folder directories
  const categories = ["ALL", "CAMPAIGNS", "SKINCARE", "BAJU"];
  
  // Securely map raw glob folders to their corresponding visual campaigns
  const getMappedCategory = (folder) => {
    if (!folder) return "CAMPAIGNS";
    const f = folder.toLowerCase();
    if (f.startsWith("photoshoot-brand")) return "CAMPAIGNS";
    if (f === "skincare") return "SKINCARE";
    if (f === "baju") return "BAJU";
    return "CAMPAIGNS";
  };

  const filteredAssets = categoryFilter === "ALL" 
    ? allMediaAssets 
    : allMediaAssets.filter(a => getMappedCategory(a.folder) === categoryFilter);

  return (
    <div className="space-y-16 select-none bg-bg-primary min-h-[85vh]">
      {/* 1. Page Title & Animated Editorial Header */}
      <section className="border-b border-text-primary/10 pb-8 relative text-left pt-12">
        <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase">
          Curation // Media Asset Index
        </span>
        <h1 className="text-editorial-huge font-light text-text-primary mt-2">
          The <span className="font-serif italic font-light text-accent"><FadeUpText text="Gallery" delay={0.1} /></span>
        </h1>
        <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary max-w-xl mt-4">
          A dynamic visual database rendering raw photoshoot directories, organic skincare assets, and streetwear campaign visuals compiled on the fly.
        </p>

        {/* Directory Categorization Pills */}
        <div className="flex flex-wrap gap-2.5 mt-8 font-sans">
          {categories.map((folder, idx) => (
            <button
              key={idx}
              onClick={() => setCategoryFilter(folder)}
              className={`px-4 py-1.5 border text-[10px] font-semibold tracking-widest uppercase transition-all cursor-pointer rounded-[2px] ${
                categoryFilter === folder 
                  ? 'bg-text-primary text-bg-primary border-text-primary' 
                  : 'bg-transparent text-text-secondary border-text-primary/10 hover:border-text-primary/30 hover:text-text-primary'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Visual Curation Room - Dynamic Grid Layout */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 relative">
        <AnimatePresence mode="popLayout">
          {filteredAssets.map((asset, idx) => (
            <motion.div
              layout
              key={asset.id || idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard 
                className="overflow-hidden group cursor-pointer h-full flex flex-col justify-between"
                onClick={() => setSelectedAsset(asset)}
              >
                <div>
                  {/* Visual anchor dimensions label */}
                  <div className="flex justify-between font-sans text-[9px] text-text-secondary/50 border-b border-text-primary/10 pb-2 mb-3">
                    <span className="truncate max-w-[120px] font-medium uppercase">
                      {(idx + 1).toString().padStart(3, '0')} // {getMappedCategory(asset.folder)}
                    </span>
                    <span>HD RENDER</span>
                  </div>

                  <div className="relative aspect-square bg-bg-secondary overflow-hidden" data-cursor-label="Zoom">
                    <motion.img 
                      layoutId={`gallery-img-${asset.id || idx}`}
                      src={asset.src} 
                      alt={`Scanned asset ${asset.filename}`}
                      className="w-full h-full object-cover grayscale brightness-[0.98] group-hover:grayscale-0 scale-100 group-hover:scale-102 transition-all duration-500 will-change-gpu"
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-text-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-text-primary" size={20} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-left font-sans text-[10px] text-text-secondary font-medium truncate pt-1">
                  {asset.filename}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 3. High-Fidelity Shared Layout Lightbox Modal Overlay (React Portal targeting document.body) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9999] bg-text-primary/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedAsset(null)}
            >
              {/* Camera Calibration Guides Overlay (Visual Spell) */}
              <div className="absolute inset-10 border border-dashed border-bg-primary/5 pointer-events-none z-10" />
              <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-bg-primary/5 border-dashed pointer-events-none z-10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-bg-primary/5 border-dashed pointer-events-none z-10" />

              {/* Close Button - Placed elegantly at the top right of viewport */}
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute top-6 right-6 p-3 border border-bg-primary/20 hover:border-bg-primary hover:text-bg-primary transition-all cursor-pointer rounded-full text-bg-primary/80 z-[10000] bg-text-primary shadow-lg"
              >
                <X size={16} />
              </button>

              {/* Responsive Container for Image & Dynamic Specs */}
              <motion.div
                initial={{ scale: 0.97, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.97, y: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-5xl w-full gap-5 select-none z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Natural aspect-ratio image display frame - Max height constrained to avoid overlay cutoff */}
                <div className="relative overflow-hidden bg-bg-secondary border border-text-primary/10 rounded-[2px] max-h-[68vh] flex items-center justify-center shadow-2xl">
                  {/* Share Layout Morph Image */}
                  <motion.img 
                    layoutId={`gallery-img-${selectedAsset.id}`}
                    src={selectedAsset.src} 
                    alt={selectedAsset.filename}
                    className="max-h-[68vh] max-w-full object-contain grayscale brightness-[0.98] hover:grayscale-0 transition-all duration-500 will-change-gpu" 
                  />
                  
                  {/* Local crop coordinates readout */}
                  <div className="absolute bottom-2 left-2 bg-text-primary/80 text-bg-primary font-mono text-[7px] tracking-widest px-2 py-0.5 rounded-[1px] uppercase pointer-events-none">
                    CALIBRATED VIEWPORT
                  </div>
                </div>

                {/* Horizontal high-fidelity visual metadata panel */}
                <div className="w-full bg-bg-primary border border-text-primary/10 p-5 rounded-[2px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[9px] border border-text-primary/20 text-text-secondary px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-[1px]">
                      {getMappedCategory(selectedAsset.folder)}
                    </span>
                    <h3 className="text-xs font-bold text-text-primary uppercase mt-2 tracking-wider truncate max-w-lg">
                      {selectedAsset.filename}
                    </h3>
                  </div>

                  {/* Horizontal list of metadata specs */}
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] tracking-widest font-sans text-text-secondary">
                    <div className="border-l border-text-primary/10 pl-3">
                      <span className="opacity-50 uppercase block text-[8px] font-bold text-text-secondary">// Path</span>
                      <span className="text-text-primary font-mono text-[9px] truncate max-w-[200px] block mt-0.5">{selectedAsset.path}</span>
                    </div>
                    <div className="border-l border-text-primary/10 pl-3">
                      <span className="opacity-50 uppercase block text-[8px] font-bold text-text-secondary">// Dimensions</span>
                      <span className="text-accent font-mono text-[9px] block mt-0.5 font-bold">
                        {dynamicDimensions.width} x {dynamicDimensions.height} PX
                      </span>
                    </div>
                    <div className="border-l border-text-primary/10 pl-3 hidden sm:block">
                      <span className="opacity-50 uppercase block text-[8px] font-bold text-text-secondary">// Status</span>
                      <span className="text-text-primary font-mono text-[9px] block mt-0.5 uppercase font-bold text-accent">EXHIBITION SAFE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
