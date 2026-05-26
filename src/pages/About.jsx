import React from 'react';
import { motion } from 'framer-motion';
import { BrutalistPanel, FadeUpText, ScrollReveal, CustomIdentityIcon, CustomRefreshIcon, CustomEyeIcon } from '../components/Shared';

const About = () => {
  return (
    <div className="space-y-24 select-none bg-bg-primary">
      {/* 1. Page Header & Editorial Intro */}
      <section className="border-b border-text-primary/10 pb-10 relative pt-12">
        <div className="text-left max-w-4xl space-y-4">
          <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase">
            Profile // Human Creative Studio
          </span>
          <h1 className="text-editorial-huge font-light text-text-primary leading-none">
            <FadeUpText text="we are the" delay={0.1} /> <span className="font-serif italic font-light text-accent"><FadeUpText text="friction." delay={0.25} /></span>
          </h1>
          <p className="font-serif font-light text-2xl sm:text-3xl text-text-secondary leading-relaxed mt-6">
            A selective visual agency building physical software designs, technical posing sequences, and premium spatial layouts.
          </p>
        </div>
      </section>

      {/* 2. Core Methodology Collage Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left: The Vision manifesto panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <ScrollReveal delay={0.1}>
            <BrutalistPanel hoverTranslate={true} className="text-left space-y-6 flex-grow flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="font-sans text-[9px] border border-text-primary/20 text-text-secondary px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-[1px]">
                  Operating Principle
                </span>
                <h3 className="font-sans text-xs font-bold tracking-widest text-text-primary uppercase">Deterministic Pipelines</h3>
                <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary">
                  Generic AI tools generate synthetic, floating visual outputs that lack environmental scale or context. We build sequence chains containing explicit ground shadows, organic fabric weights, and real spatial constants. The result is a series of cohesive lookbook frames that feel tactile, physical, and authentic.
                </p>
              </div>
              <div className="border-t border-text-primary/10 pt-4 mt-6">
                <span className="font-sans text-[9px] text-accent font-semibold uppercase tracking-wider">Core Objective: Zero Synthetic Slop</span>
              </div>
            </BrutalistPanel>
          </ScrollReveal>
        </div>

        {/* Right: Technical Stats & Core Capabilities */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <ScrollReveal delay={0.3}>
            <BrutalistPanel hoverTranslate={true} className="text-left space-y-6 flex-grow h-full">
              <span className="font-sans text-[9px] border border-text-primary/20 text-text-secondary px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-[1px]">
                Capabilities Index
              </span>
              
              <div className="space-y-6 pt-2">
                <div className="flex gap-4 items-start font-sans">
                  <CustomIdentityIcon className="text-accent shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Identity Locking System</h4>
                    <p className="text-[11px] tracking-wide text-text-secondary leading-relaxed">
                      Deterministic multi-pass facial and body anchors that bind visual profiles consistently across complex poses and sequences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start font-sans">
                  <CustomRefreshIcon className="text-text-primary shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Static Import Cataloging</h4>
                    <p className="text-[11px] tracking-wide text-text-secondary leading-relaxed">
                      Zero-overhead asset compilers mapping folders directly to responsive, high-performance grid layouts at compile-time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start font-sans">
                  <CustomEyeIcon className="text-accent shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Skeletal Posing Anchors</h4>
                    <p className="text-[11px] tracking-wide text-text-secondary leading-relaxed">
                      Rigid coordinate weights that preserve natural weight distributions, realistic shadow offsets, and true spatial balance.
                    </p>
                  </div>
                </div>
              </div>
            </BrutalistPanel>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Underground Team Roster Grid */}
      <section className="space-y-8 border-t border-text-primary/10 pt-12">
        <ScrollReveal>
          <div className="text-left">
            <span className="font-sans text-[10px] tracking-widest uppercase border border-text-primary/20 px-3 py-1 font-semibold text-text-secondary">
              Directory // Operators
            </span>
            <h2 className="font-serif font-light text-3xl sm:text-4xl tracking-tight mt-6 text-text-primary">
              The Studio Specialists
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <BrutalistPanel hoverTranslate={true} className="text-left space-y-4 h-full">
              <span className="font-sans text-[9px] text-accent font-semibold uppercase tracking-wider">CREATIVE LEAD</span>
              <div className="border-b border-text-primary/10 pb-2">
                <h3 className="font-sans text-xs font-bold text-text-primary tracking-wider uppercase">Muhammad Rahmat Hidayat</h3>
                <p className="font-sans text-[9px] text-text-secondary mt-1 tracking-wider uppercase font-semibold">Bespoke Visual Direction & Posing Pipelines</p>
              </div>
              <p className="font-sans text-[11px] tracking-wide leading-relaxed text-text-secondary">
                Architects sequence-based posing coordinates, facial character anchors, and high-fashion styling models, aligning raw concrete structures with progressive fashion lookbooks.
              </p>
            </BrutalistPanel>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <BrutalistPanel hoverTranslate={true} className="text-left space-y-4 h-full">
              <span className="font-sans text-[9px] text-text-primary font-semibold uppercase tracking-wider">DEVELOPMENT LEAD</span>
              <div className="border-b border-text-primary/10 pb-2">
                <h3 className="font-sans text-xs font-bold text-text-primary tracking-wider uppercase">System Architecture</h3>
                <p className="font-sans text-[9px] text-text-secondary mt-1 tracking-wider uppercase font-semibold">Static Mappers & Optimization</p>
              </div>
              <p className="font-sans text-[11px] tracking-wide leading-relaxed text-text-secondary">
                Constructs high-performance static filesystem directory compilers, running at maximum responsive speeds with zero synthetic overhead.
              </p>
            </BrutalistPanel>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
