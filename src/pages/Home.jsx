import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import { BrutalistPanel, FadeUpText, ScrollReveal, TiltCard, CustomLayersIcon, CustomShieldIcon, CustomBalanceIcon } from '../components/Shared';

const Home = () => {
  const primaryCampaign = projects.find(p => p.id === 'dvtst-01-monolith') || projects[0];
  const secondaryCampaign = projects.find(p => p.id === 'streetwear-core') || projects[1];

  return (
    <div className="space-y-32 bg-bg-primary">
      {/* 1. Cinematic Hero & Asymmetric Display Typography */}
      <section className="relative min-h-[80vh] flex flex-col justify-between border-b border-text-primary/10 pb-16 select-none pt-12">
        
        {/* Subtle background guides */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.02]">
          <div className="border-r border-text-primary h-full" />
          <div className="border-r border-text-primary h-full" />
          <div className="border-r border-text-primary h-full" />
          <div className="h-full" />
        </div>

        {/* Continuous Typographic Backing Marquee (High-Fashion Spatial Depth) */}
        <div className="absolute top-[28%] left-0 right-0 overflow-hidden pointer-events-none opacity-[0.035] dark:opacity-[0.02] select-none z-0">
          <div className="whitespace-nowrap flex select-none">
            <span className="text-[10vw] font-serif italic uppercase tracking-[0.1em] leading-none animate-marquee pr-8 inline-block">
              MUHAMMAD RAHMAT HIDAYAT // AI CREATIVE LEAD // ART DIRECTION // &nbsp;
            </span>
            <span className="text-[10vw] font-serif italic uppercase tracking-[0.1em] leading-none animate-marquee pr-8 inline-block">
              MUHAMMAD RAHMAT HIDAYAT // AI CREATIVE LEAD // ART DIRECTION // &nbsp;
            </span>
          </div>
        </div>

        {/* Hyper-scale Serif Heading Matrix with premium mask reveal animations */}
        <div className="flex flex-col text-left relative z-10">
          <span className="font-sans text-[10px] tracking-[0.25em] text-accent font-semibold uppercase mb-6 flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Active Creative Index // 2026 Edition
          </span>
          
          <h1 className="text-editorial-huge text-text-primary leading-tight font-light">
            <FadeUpText text="architecting" delay={0.1} />
          </h1>
          <div className="w-full h-[0.5px] bg-text-primary/15 my-4" />
          <h1 className="text-editorial-huge font-serif font-light text-text-secondary/70 italic pl-12 md:pl-24">
            <FadeUpText text="deterministic" delay={0.35} />
          </h1>
          <div className="w-full h-[0.5px] bg-text-primary/15 my-4" />
          <h1 className="text-editorial-huge text-text-primary font-light">
            <FadeUpText text="aesthetics." delay={0.6} />
          </h1>
        </div>

        {/* Technical overview column block */}
        <div className="mt-20 pt-10 border-t border-text-primary/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10 font-sans">
          <div className="md:col-span-6 text-left">
            <span className="text-[10px] text-accent uppercase block mb-3 font-semibold tracking-wider">// Philosophy Statement</span>
            <p className="max-w-md text-xs tracking-wide leading-relaxed text-text-secondary">
              An elite creative studio dismantling generic, over-decorated visual assets. We map deterministic photography pipelines, organic garment weights, and high-fidelity streetwear lookbooks on raw concrete structures.
            </p>
          </div>
          <div className="md:col-span-3 text-left">
            <span className="text-[10px] text-text-secondary uppercase block mb-3 font-semibold tracking-wider">// Coordinates</span>
            <div className="text-[10px] text-text-secondary/70 space-y-1 tracking-widest font-mono">
              <p>LATITUDE: 6.2088 S</p>
              <p>LONGITUDE: 106.8456 E</p>
              <p>INDEXED: 100% SECURE</p>
            </div>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <Link
              to="/projects"
              className="border border-text-primary px-8 py-3.5 text-[10px] font-bold tracking-widest hover:bg-text-primary hover:text-bg-primary transition-all flex items-center gap-2 uppercase select-none cursor-pointer"
              data-cursor-label="View Works"
            >
              Explore Index <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Asymmetric Lookbook & Collage Section */}
      <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative select-none">
        
        {/* Left: Interactive specs and brand manifest text */}
        <div className="lg:col-span-5 space-y-8 text-left relative z-10 pt-4">
          <ScrollReveal>
            <span className="font-sans text-[10px] tracking-widest uppercase border border-text-primary/20 px-3 py-1 font-semibold text-text-secondary">
              Manifesto // Tactile Truth
            </span>
            <h2 className="font-serif font-light text-4xl sm:text-5xl tracking-tight leading-tight text-text-primary mt-6">
              Against the <span className="font-serif font-light italic text-accent">robotic</span> uniformity of digital templates.
            </h2>
            <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary mt-6">
              Human-directed design thrives on elegant restraint and controlled friction. Our pipelines bind organic posing sequences and natural shadows, preserving canvas grain and material details. We scale lookbooks dynamically using clean folder structures, ensuring zero dependency bloat or synthetic fillers.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-8 font-sans">
              <div className="border-l border-accent/40 pl-4 py-1">
                <h4 className="text-xs font-semibold text-accent uppercase tracking-wider">0.0% Synthetic Slop</h4>
                <p className="text-[10px] text-text-secondary/70 mt-1 leading-normal">100% Real Fiber Grids</p>
              </div>
              <div className="border-l border-text-primary/30 pl-4 py-1">
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Silent Precision</h4>
                <p className="text-[10px] text-text-secondary/70 mt-1 leading-normal">Hardware Accelerated Flow</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Asymmetrical collage displaying active campaign image cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 relative">
          
          {/* Main featured campaign card */}
          {primaryCampaign && (
            <div className="sm:col-span-8 relative">
              <ScrollReveal delay={0.1}>
                <TiltCard 
                  className="overflow-hidden group"
                >
                  <div 
                    className="relative aspect-[3/4] bg-bg-secondary overflow-hidden cursor-pointer"
                    data-cursor-image={primaryCampaign.heroImage}
                    data-cursor-label="View Project"
                  >
                    <img 
                      src={primaryCampaign.heroImage} 
                      alt={primaryCampaign.title}
                      fetchpriority="high"
                      decoding="async"
                      className="w-full h-full object-cover grayscale brightness-[0.98] transition-all duration-700 scale-100 group-hover:scale-102 will-change-gpu" 
                    />
                    <div className="absolute top-3 left-3 bg-text-primary text-bg-primary px-2.5 py-0.5 font-sans text-[8px] tracking-widest uppercase font-medium">
                      Featured Campaign
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-start font-sans">
                    <div className="text-left">
                      <h3 className="text-sm font-semibold tracking-wider text-text-primary uppercase">{primaryCampaign.title}</h3>
                      <p className="text-[10px] text-text-secondary mt-1 tracking-wide">{primaryCampaign.category} // {primaryCampaign.year}</p>
                    </div>
                    <Link 
                      to={`/project/${primaryCampaign.id}`}
                      className="p-2 border border-text-primary/20 hover:border-text-primary hover:text-text-primary transition-all rounded-[1px]"
                    >
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          )}

          {/* Secondary overlapping collage card offset in height */}
          {secondaryCampaign && (
            <div className="sm:col-span-4 mt-8 sm:mt-24 relative">
              <ScrollReveal delay={0.3}>
                <TiltCard 
                  className="overflow-hidden group"
                >
                  <div 
                    className="relative aspect-[1/1] bg-bg-secondary overflow-hidden cursor-pointer"
                    data-cursor-image={secondaryCampaign.heroImage}
                    data-cursor-label="View Details"
                  >
                    <img 
                      src={secondaryCampaign.heroImage} 
                      alt={secondaryCampaign.title}
                      className="w-full h-full object-cover grayscale brightness-[0.98] transition-all duration-700 scale-100 group-hover:scale-102 will-change-gpu" 
                    />
                  </div>
                  <div className="mt-4 font-sans text-left">
                    <h4 className="text-xs font-semibold tracking-wider text-text-primary uppercase leading-tight">{secondaryCampaign.title}</h4>
                    <p className="text-[10px] text-text-secondary mt-1">{secondaryCampaign.category}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>

      {/* 3. Core Operational Matrix Grid Block */}
      <section className="py-12 border-t border-text-primary/10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BrutalistPanel hoverTranslate={true} className="text-left space-y-4">
              <CustomLayersIcon className="text-accent" size={20} />
              <h3 className="font-sans text-xs font-bold tracking-widest text-text-primary uppercase">Automatic Indexing</h3>
              <p className="font-sans text-[11px] tracking-wide leading-relaxed text-text-secondary">
                Scanning directories dynamically at compile-time to automatically map, layout, and catalog visual assets. No database coupling required.
              </p>
            </BrutalistPanel>

            <BrutalistPanel hoverTranslate={true} className="text-left space-y-4">
              <CustomShieldIcon className="text-text-primary" size={20} />
              <h3 className="font-sans text-xs font-bold tracking-widest text-text-primary uppercase">Sequence Stability</h3>
              <p className="font-sans text-[11px] tracking-wide leading-relaxed text-text-secondary">
                Executing clean posing coordinates and locks to secure consistent facial, garment, and lighting characteristics across visual campaigns.
              </p>
            </BrutalistPanel>

            <BrutalistPanel hoverTranslate={true} className="text-left space-y-4">
              <CustomBalanceIcon className="text-accent" size={20} />
              <h3 className="font-sans text-xs font-bold tracking-widest text-text-primary uppercase">Restrained Balance</h3>
              <p className="font-sans text-[11px] tracking-wide leading-relaxed text-text-secondary">
                Curating raw asymmetric offsets, ultra-fine margins, grid overlays, and elegant typography structures that feel like a physical fashion magazine.
              </p>
            </BrutalistPanel>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;