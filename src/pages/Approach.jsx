import { BrutalistPanel, FadeUpText, ScrollReveal, CustomLayersIcon, CustomShieldIcon, CustomEyeIcon, CustomJointIcon, CustomBalanceIcon } from '../components/Shared';

const Approach = () => {
  return (
    <div className="space-y-20 select-none bg-bg-primary">
      {/* 1. Page Header */}
      <section className="border-b border-text-primary/10 pb-8 relative text-left pt-12">
        <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase">
          Pipeline // System Specifications
        </span>
        <h1 className="text-editorial-huge font-light text-text-primary mt-2">
          The <span className="font-serif italic font-light text-accent"><FadeUpText text="Methodology" delay={0.1} /></span>
        </h1>
        <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary max-w-xl mt-4">
          A visual blueprint explaining our proprietary three-stage visual system designed to lock identity consistency, enforce physical weights, and structure premium campaigns.
        </p>
      </section>

      {/* 2. Three-Stage Creative Pipeline Walkthrough */}
      <section className="space-y-12">
        
        {/* Stage 01: Spatial Anchoring Matrix */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-text-primary/10 pb-12">
            <div className="lg:col-span-4 text-left space-y-4 font-sans">
              <span className="text-[10px] text-accent font-semibold tracking-wider">// Stage 01 // Calibration</span>
              <h2 className="font-serif font-light text-3xl uppercase text-text-primary leading-tight">
                Spatial <span className="font-serif italic text-accent font-light">Anchoring</span> Matrix
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed tracking-wide">
                We anchor each visual frame onto a clean coordinate system to avoid floating edges. Shadows are physically calculated relative to horizontal ground weights.
              </p>
            </div>
            <div className="lg:col-span-8">
              <BrutalistPanel hoverTranslate={true} className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-sans">
                <div className="space-y-2 border-r border-text-primary/10 pr-4 last:border-0">
                  <CustomBalanceIcon className="text-accent" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Grid Targeting</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Mapping mechanical canvas guides to maintain accurate lighting directions.
                  </p>
                </div>
                <div className="space-y-2 border-r border-text-primary/10 pr-4 last:border-0">
                  <CustomLayersIcon className="text-text-primary" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Material Friction</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Preserving organic canvas texture densities and tactile weight levels.
                  </p>
                </div>
                <div className="space-y-2 last:border-0 font-sans">
                  <CustomShieldIcon className="text-accent" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Verification</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Filtering visual artifacts, ensuring genuine analog-like depth.
                  </p>
                </div>
              </BrutalistPanel>
            </div>
          </div>
        </ScrollReveal>

        {/* Stage 02: Biological Posing Bounds */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-text-primary/10 pb-12">
            <div className="lg:col-span-4 text-left space-y-4 font-sans">
              <span className="text-[10px] text-text-primary font-semibold tracking-wider">// Stage 02 // Rigging</span>
              <h2 className="font-serif font-light text-3xl uppercase text-text-primary leading-tight">
                Biological <span className="font-serif italic text-accent font-light">Posing</span> Bounds
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed tracking-wide">
                We apply strict skeletal rigidity rules across lookbook series. Facial proportions and outfit silhouettes are mapped onto stable camera angles, avoiding robotic distortions.
              </p>
            </div>
            <div className="lg:col-span-8">
              <BrutalistPanel hoverTranslate={true} className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-sans">
                <div className="space-y-2 border-r border-text-primary/10 pr-4 last:border-0">
                  <CustomJointIcon className="text-text-primary" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Rig Limiters</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Restricting skeletal degrees of freedom to match anatomical limits of humans.
                  </p>
                </div>
                <div className="space-y-2 border-r border-text-primary/10 pr-4 last:border-0">
                  <CustomShieldIcon className="text-accent" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Facial Locks</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Securing facial structural metrics consistently across diverse cameras.
                  </p>
                </div>
                <div className="space-y-2 last:border-0">
                  <CustomLayersIcon className="text-accent" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Garment Gravity</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Enforcing natural gravity factors on heavy materials and organic silhouettes.
                  </p>
                </div>
              </BrutalistPanel>
            </div>
          </div>
        </ScrollReveal>

        {/* Stage 03: Directorial Visual Synthesis */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8">
            <div className="lg:col-span-4 text-left space-y-4 font-sans">
              <span className="text-[10px] text-accent font-semibold tracking-wider">// Stage 03 // Packaging</span>
              <h2 className="font-serif font-light text-3xl uppercase text-text-primary leading-tight">
                Directorial <span className="font-serif italic text-accent font-light">Visual</span> Synthesis
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed tracking-wide">
                We package campaigns into pristine interactive layouts, utilizing subtle grids, asymmetric columns, elegant lowercase display fonts, and premium serif typography.
              </p>
            </div>
            <div className="lg:col-span-8">
              <BrutalistPanel hoverTranslate={true} className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-sans">
                <div className="space-y-2 border-r border-text-primary/10 pr-4 last:border-0">
                  <CustomLayersIcon className="text-accent" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Asymmetric collage</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Building quiet spatial offset margins that mirror premium lookbooks.
                  </p>
                </div>
                <div className="space-y-2 border-r border-text-primary/10 pr-4 last:border-0">
                  <CustomEyeIcon className="text-text-primary" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Premium Curators</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Subtle floating lookbook images tied directly to elegant micro-hovers.
                  </p>
                </div>
                <div className="space-y-2 last:border-0">
                  <CustomShieldIcon className="text-accent" size={18} />
                  <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Silent Mapping</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed tracking-wide">
                    Compiling directory trees automatically to feed lookbooks at light speeds.
                  </p>
                </div>
              </BrutalistPanel>
            </div>
          </div>
        </ScrollReveal>

      </section>
    </div>
  );
};

export default Approach;