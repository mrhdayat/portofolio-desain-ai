import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { projects } from '../data';
import { FadeUpText, ScrollReveal } from '../components/Shared';

const Archive = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Buttery-smooth spring motion values for hover preview matching premium Obys animations
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 220, mass: 0.8 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const handleMouseMove = (e) => {
    rawX.set(e.clientX + 25);
    rawY.set(e.clientY + 25);
  };

  return (
    <div className="space-y-20 select-none bg-bg-primary min-h-[85vh]" onMouseMove={handleMouseMove}>
      {/* 1. Page Header */}
      <section className="border-b border-text-primary/10 pb-8 relative text-left pt-12">
        <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase">
          Chronology // Asset Ledger
        </span>
        <h1 className="text-editorial-huge font-light text-text-primary mt-2">
          The <span className="font-serif italic font-light text-accent"><FadeUpText text="Archive" delay={0.1} /></span>
        </h1>
        <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary max-w-xl mt-4">
          A physical visual ledger mapping every lookbook, design capsule, and pose sequence in chronological succession. Mapped directly from raw directories.
        </p>
      </section>

      {/* 2. Elegant Ledger Table Matrix */}
      <ScrollReveal>
        <section className="border border-text-primary/10 bg-bg-primary overflow-x-auto relative z-10 rounded-[2px]">
          <table className="w-full font-sans text-xs text-left min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-text-primary/10 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                <th className="py-4 px-6 border-r border-text-primary/10">Code</th>
                <th className="py-4 px-6 border-r border-text-primary/10">Release Timeline</th>
                <th className="py-4 px-6 border-r border-text-primary/10">Campaign Title</th>
                <th className="py-4 px-6 border-r border-text-primary/10">Category Tag</th>
                <th className="py-4 px-6 border-r border-text-primary/10">Static Scans</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr 
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="border-b border-text-primary/10 hover:bg-text-primary/5 transition-colors group cursor-pointer"
                >
                  {/* Release ID/Index */}
                  <td className="py-4 px-6 border-r border-text-primary/10 font-mono tracking-widest text-text-secondary font-medium">
                    DV-{(idx + 1).toString().padStart(3, '0')}
                  </td>
                  
                  {/* Release Date */}
                  <td className="py-4 px-6 border-r border-text-primary/10 flex items-center gap-2 text-text-secondary">
                    <Calendar size={12} className="opacity-50" />
                    <span>EDITION {project.year}</span>
                  </td>
                  
                  {/* Title */}
                  <td className="py-4 px-6 border-r border-text-primary/10 font-bold text-text-primary tracking-wide">
                    {project.title}
                  </td>
                  
                  {/* Category */}
                  <td className="py-4 px-6 border-r border-text-primary/10 uppercase text-[10px] text-text-secondary font-semibold">
                    {project.category}
                  </td>
                  
                  {/* Scaled Assets count */}
                  <td className="py-4 px-6 border-r border-text-primary/10 text-accent font-semibold">
                    {project.images.length} Captures
                  </td>
                  
                  {/* Action Link */}
                  <td className="py-4 px-6">
                    <Link 
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-1.5 font-bold hover:text-accent tracking-widest text-[9px] uppercase"
                    >
                      Open Space <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </ScrollReveal>

      {/* 3. Realtime Visual Hover Preview Overlay (Obys Agency Style) with Smooth Physics */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: smoothY,
              left: smoothX,
              pointerEvents: 'none',
              zIndex: 999
            }}
            className="w-52 bg-bg-secondary border border-text-primary/15 p-3 rounded-[2px] shadow-2xl hidden md:block"
          >
            {/* Visual preview specs */}
            <div className="font-sans text-[8px] text-text-secondary/50 border-b border-text-primary/10 pb-1 mb-2 flex justify-between uppercase tracking-wider font-semibold">
              <span>Preview // Active</span>
              <span>2048 x 2048</span>
            </div>
            
            <div className="aspect-square bg-bg-primary overflow-hidden relative border border-text-primary/5">
              <img 
                src={hoveredProject.heroImage} 
                alt={hoveredProject.title}
                className="w-full h-full object-cover grayscale brightness-[0.98]" 
              />
            </div>
            
            <div className="mt-2 text-left font-sans">
              <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-wider leading-none truncate">{hoveredProject.title}</h4>
              <p className="text-[8px] text-accent font-semibold mt-1 uppercase tracking-wider">{hoveredProject.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Archive;
