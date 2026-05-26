import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data';
import { FadeUpText, ScrollReveal, ArtDecoGrid } from '../components/Shared';

// Awwwards-Level Interactive Liquid Project Card with drafting specifications
const LiquidProjectCard = ({ project, idx }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [freq, setFreq] = useState(0.015);
  const [scale, setScale] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Modulate base frequency based on mouse coordinates to simulate displacement velocity
    const modulatedFreq = 0.01 + ((x + y) / (rect.width + rect.height)) * 0.015;
    setFreq(modulatedFreq);
    setScale(18); // Active displacement scale
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setScale(0);
    setCoords({ x: 0, y: 0 });
  };

  const filterId = `displacement-filter-${project.id}`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="bg-bg-panel border border-text-primary/10 p-6 relative rounded-[2px] select-none transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] group cursor-pointer overflow-hidden will-change-gpu"
    >
      {/* Dynamic Technical SVG displacement filter */}
      <svg className="hidden">
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Numbered sequence index mark */}
      <div className="flex justify-between items-baseline font-sans border-b border-text-primary/10 pb-4 mb-4 relative z-10">
        <span className="text-2xl font-light text-text-primary/40 font-serif">{(idx + 1).toString().padStart(2, '0')}.</span>
        <span className="text-[9px] border border-text-primary/10 px-2.5 py-0.5 text-text-secondary font-semibold uppercase tracking-wider rounded-[1px]">
          {project.category}
        </span>
      </div>

      {/* Visual Image Wrapper */}
      <Link 
        to={`/project/${project.id}`}
        className="relative block aspect-[4/3] bg-bg-secondary overflow-hidden"
        style={{ filter: isHovered ? `url(#${filterId})` : 'none', transition: 'filter 0.15s ease-out' }}
        data-cursor-image={project.heroImage}
        data-cursor-label="Open Space"
      >
        <img 
          src={project.heroImage} 
          alt={project.title}
          className="w-full h-full object-cover grayscale brightness-[0.98] transition-all duration-700 scale-100 group-hover:scale-101 will-change-gpu" 
        />
        
        {/* Floating live resolution and cursor technical coordinates overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-20 border border-accent/20 m-3"
            >
              <div className="absolute top-2 left-2 bg-text-primary text-bg-primary px-1.5 py-0.5 font-mono text-[6.5px] tracking-widest uppercase font-semibold">
                X: {Math.round(coords.x)}PX // Y: {Math.round(coords.y)}PX
              </div>
              <div className="absolute bottom-2 right-2 bg-accent text-bg-primary px-1.5 py-0.5 font-mono text-[6.5px] tracking-widest uppercase font-semibold">
                IMAGE: 2048 x 2048 PX
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Default specifications overlay */}
        <div className="absolute bottom-3 left-3 bg-text-primary text-bg-primary px-2.5 py-0.5 font-sans text-[8px] tracking-widest flex gap-3 uppercase font-medium z-10">
          <span>Visuals: {project.images.length}</span>
          <span>Year: {project.year}</span>
        </div>
      </Link>

      {/* Title & description specs */}
      <div className="mt-6 flex justify-between items-start gap-4 relative z-10">
        <div className="text-left font-sans">
          <h3 
            className="text-sm font-semibold tracking-wider text-text-primary uppercase leading-tight cursor-pointer hover:text-accent transition-colors"
            data-cursor-image={project.heroImage}
            data-cursor-label="View Project"
          >
            {project.title}
          </h3>
          <p className="text-[11px] text-text-secondary mt-2 leading-relaxed max-w-sm">
            {project.concept}
          </p>
        </div>
        <Link 
          to={`/project/${project.id}`}
          className="border border-text-primary/20 hover:border-text-primary hover:text-text-primary p-2 transition-all rounded-[1px]"
          data-cursor-label="Open"
        >
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("ALL");
  
  const categories = ["ALL", ...new Set(projects.map(p => p.category.toUpperCase()))];
  
  const filteredProjects = filter === "ALL" 
    ? projects 
    : projects.filter(p => p.category.toUpperCase() === filter);

  return (
    <div className="space-y-20 select-none bg-bg-primary">
      {/* 1. Page Header */}
      <section className="border-b border-text-primary/10 pb-10 relative text-left pt-12">
        <span className="font-sans text-[10px] tracking-[0.2em] text-accent font-semibold uppercase">
          Directory // Campaigns & Case Studies
        </span>
        
        <h1 className="text-editorial-huge font-light text-text-primary mt-4">
          Selected <span className="font-serif italic font-light text-accent"><FadeUpText text="Works" delay={0.1} /></span>
        </h1>
        
        <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary max-w-xl mt-4">
          A physical visual directory mapping technical garment structures, spatial concrete environments, and deterministic poses. Automatically compiled directly from assets.
        </p>

        {/* 2. Elegant Category Filter Navigation */}
        <div className="flex flex-wrap gap-2.5 mt-8 font-sans">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 border text-[10px] font-semibold tracking-widest uppercase transition-all cursor-pointer rounded-[2px] ${
                filter === cat 
                  ? 'bg-text-primary text-bg-primary border-text-primary' 
                  : 'bg-transparent text-text-secondary border-text-primary/10 hover:border-text-primary/30 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Asymmetric Grid Layout Index */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start py-8">
        {filteredProjects.map((project, idx) => (
          <div key={project.id} className={idx % 2 === 1 ? 'md:mt-20' : ''}>
            <ScrollReveal delay={idx % 2 === 1 ? 0.2 : 0.05}>
              <LiquidProjectCard project={project} idx={idx} />
            </ScrollReveal>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;