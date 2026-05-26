import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import { BrutalistPanel } from '../components/Shared';

const ProjectDetail = () => {
  const { id } = useParams();
  
  const project = projects.find(p => p.id === id) || projects[0];

  if (!project) {
    return (
      <div className="py-20 text-center font-sans space-y-6">
        <h2 className="text-xl font-light">Project Directory Not Found</h2>
        <Link to="/projects" className="text-accent hover:underline uppercase text-xs font-semibold tracking-widest">Return to Directory Index</Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 select-none bg-bg-primary">
      {/* 1. Header with Breadcrumb */}
      <section className="border-b border-text-primary/10 pb-8 relative text-left pt-12">
        <div className="mb-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest text-text-secondary hover:text-text-primary transition-colors uppercase font-semibold"
          >
            <ArrowLeft size={11} /> Back to Directory
          </Link>
        </div>

        <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase">
          Lookbook // Specifications Matrix
        </span>
        <h1 className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mt-2 text-text-primary italic">
          {project.title}
        </h1>

        {/* Dynamic Project Meta Specifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 font-sans border-t border-text-primary/10 pt-6">
          <div>
            <span className="text-[9px] text-text-secondary/50 uppercase tracking-widest block font-medium">Category</span>
            <p className="text-xs font-bold text-text-primary mt-1 uppercase tracking-wide">{project.category}</p>
          </div>
          <div>
            <span className="text-[9px] text-text-secondary/50 uppercase tracking-widest block font-medium">Security</span>
            <p className="text-xs font-bold text-accent mt-1 uppercase tracking-wide">Posing Confirmed</p>
          </div>
          <div>
            <span className="text-[9px] text-text-secondary/50 uppercase tracking-widest block font-medium">Total Frames</span>
            <p className="text-xs font-bold text-text-primary mt-1 uppercase tracking-wide">{project.images.length} Captures</p>
          </div>
          <div>
            <span className="text-[9px] text-text-secondary/50 uppercase tracking-widest block font-medium">Timeline</span>
            <p className="text-xs font-bold text-text-primary mt-1 uppercase tracking-wide">Edition {project.year}</p>
          </div>
        </div>
      </section>

      {/* 2. Technical Manifesto & Skeletal Metrics */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Manifesto & Posing Controls details */}
        <div className="lg:col-span-4 space-y-6 text-left relative z-10">
          <BrutalistPanel className="space-y-5">
            <span className="font-sans text-[9px] border border-text-primary/25 text-text-primary px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-[1px]">
              Visual Study
            </span>
            <h3 className="font-sans text-xs font-bold tracking-widest text-text-primary uppercase border-b border-text-primary/10 pb-2">
              Garment Weights & Depth
            </h3>
            <p className="font-sans text-[11px] tracking-wide leading-relaxed text-text-secondary">
              Each frame is locked onto a rigid structural axis to prevent spatial clipping. Shadows are mapped relative to ground points, preserving natural texture weights.
            </p>
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between font-sans text-[9px] text-text-secondary font-semibold uppercase tracking-wider mb-1.5">
                  <span>Rig Alignment</span>
                  <span className="text-accent">100% Calibrated</span>
                </div>
                <div className="h-[2px] w-full bg-bg-secondary relative overflow-hidden">
                  <div className="h-full bg-accent w-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-sans text-[9px] text-text-secondary font-semibold uppercase tracking-wider mb-1.5">
                  <span>Material Contrast</span>
                  <span className="text-text-primary">Optimized</span>
                </div>
                <div className="h-[2px] w-full bg-bg-secondary relative overflow-hidden">
                  <div className="h-full bg-text-primary w-[90%]" />
                </div>
              </div>
            </div>
          </BrutalistPanel>

          <BrutalistPanel className="space-y-3">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-text-primary">
              Folder Compilation
            </h4>
            <p className="font-sans text-[11px] text-text-secondary leading-relaxed">
              Mapped automatically using native filesystem modules directly to campaign root folders, ensuring zero dependency bloat or synthetic assets.
            </p>
          </BrutalistPanel>
        </div>

        {/* Right Column: Dynamic Asymmetrical Campaign Frames Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {project.images.map((img, idx) => (
              <BrutalistPanel 
                key={idx}
                className="overflow-hidden group"
              >
                {/* Frame technical coordinates banner */}
                <div className="flex justify-between font-sans text-[9px] text-text-secondary/50 border-b border-text-primary/10 pb-2 mb-4">
                  <span>Frame // {(idx + 1).toString().padStart(3, '0')}</span>
                  <span>Size: 2048 x 2048</span>
                </div>

                <div className="relative aspect-[1/1] bg-bg-secondary overflow-hidden">
                  <img 
                    src={img} 
                    alt={`Campaign frame ${idx}`}
                    className="w-full h-full object-cover grayscale brightness-[0.98] transition-all duration-700 scale-100 group-hover:scale-102" 
                  />
                </div>

                <div className="mt-4 flex justify-between items-center font-sans text-[9px] text-text-secondary/60 tracking-wider">
                  <span>Prism locked lookbook</span>
                  <span className="text-accent font-semibold">{project.year}</span>
                </div>
              </BrutalistPanel>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;