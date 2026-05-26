import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';
import { BrutalistPanel } from '../components/Shared';

export default function Contact() {
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    tier: 'standard-lookbook',
    renders: 12,
    concept: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); 
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (location.state) {
      setFormData((prev) => ({
        ...prev,
        tier: location.state.plan || 'standard-lookbook',
        renders: location.state.count || 12
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error on user keypress
    if (formError) setFormError(null);
  };

  const handleRendersChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      renders: parseInt(e.target.value)
    }));
  };

  // Strict input sanitizer to secure input values against XSS injection
  const sanitizeInput = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validation guards
    if (!formData.name.trim()) {
      setFormError("Specification Failure: Brief requires a contact name.");
      return;
    }
    if (formData.name.length < 2) {
      setFormError("Specification Failure: Contact name must be at least 2 characters.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Specification Failure: Brief requires an email vector address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError("Specification Failure: Provided email vector format is invalid.");
      return;
    }

    // 2. Perform sanitization
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      brand: sanitizeInput(formData.brand),
      email: sanitizeInput(formData.email),
      tier: formData.tier,
      renders: formData.renders,
      concept: sanitizeInput(formData.concept)
    };

    setIsSubmitting(true);
    setSubmitStep(1);

    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
        }, 800);
      }, 800);
    }, 800);
  };

  const submissionSteps = [
    { text: 'Aligning creative assets parameters...' },
    { text: 'Verifying image targets & styling layers...' },
    { text: 'Compiling final project index lookbook...' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto select-none text-left bg-bg-primary">
      {/* 1. Header */}
      <section className="border-b border-text-primary/10 pb-8 relative mb-12 pt-12">
        <span className="font-sans text-[10px] tracking-widest text-accent font-semibold uppercase">
          Acquisition // Campaign Brief Intake
        </span>
        <h1 className="text-editorial-huge font-light text-text-primary mt-2">
          Start a <span className="font-serif italic font-light text-accent">Project</span>
        </h1>
        <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary max-w-xl mt-4">
          Initiate a custom lookbook request. We consult selectively with brand architects looking to build pristine, locked editorial visual campaigns.
        </p>
      </section>

      {/* 2. Interactive Form Canvas */}
      <section className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* SUCCESS RESPONSE */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              key="success"
            >
              <BrutalistPanel className="p-8 space-y-6">
                <div className="flex gap-4 items-center font-sans">
                  <CheckCircle2 className="text-accent shrink-0" size={28} />
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Brief intake registered
                  </h3>
                </div>
                <p className="font-sans text-xs tracking-wide leading-relaxed text-text-secondary">
                  Your brief for <strong>{formData.brand || 'Personal Campaign'}</strong> has been successfully received. A consultant will review your coordinates shortly to outline the technical sequence mappings.
                </p>
                <div className="border-t border-text-primary/10 pt-4 space-y-1.5 font-sans text-[10px] text-text-secondary">
                  <p>TIER: {formData.tier === 'standard-lookbook' ? 'STANDARD TECHNICAL LOOKBOOK' : 'ENTERPRISE CAMPAIGN LOCKS'}</p>
                  <p>ESTIMATED CAPTURES: {formData.renders} FRAMES</p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="border border-text-primary px-6 py-2.5 font-sans text-[10px] font-bold tracking-widest uppercase hover:bg-text-primary hover:text-bg-primary transition-colors cursor-pointer"
                >
                  Create New Brief
                </button>
              </BrutalistPanel>
            </motion.div>
          ) : isSubmitting ? (
            
            /* DYNAMIC PROCESS SEQUENCE */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 flex flex-col items-center justify-center font-sans space-y-6"
              key="loading"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="text-accent"
              >
                <RefreshCw size={32} />
              </motion.div>
              <h3 className="text-xs font-bold text-text-primary tracking-wider uppercase">
                Calibrating specifications...
              </h3>
              
              <div className="bg-bg-secondary border border-text-primary/10 px-8 py-3.5 text-[10px] tracking-widest text-accent uppercase font-semibold rounded-[2px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={submitStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {submissionSteps[submitStep - 1]?.text || 'Processing intake parameters...'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            
            /* PRIMARY FORM BODY */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="form"
            >
              <BrutalistPanel className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Animated Specification Errors Banner */}
                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="overflow-hidden bg-accent/15 border border-accent/35 p-3.5 text-[10px] text-accent font-semibold tracking-widest uppercase flex items-center gap-2 rounded-[1px] font-sans"
                      >
                        <AlertTriangle size={12} className="shrink-0 text-accent animate-pulse" />
                        <span>{formError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Name and Brand inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 font-sans">
                      <label className="text-[10px] font-bold text-text-secondary tracking-wider uppercase">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="ALEXANDER MERCER"
                        className="bg-bg-secondary border border-text-primary/10 focus:border-text-primary p-3 text-xs text-text-primary placeholder-text-secondary/35 outline-none transition-all rounded-[2px]"
                      />
                    </div>

                    <div className="flex flex-col gap-2 font-sans">
                      <label className="text-[10px] font-bold text-text-secondary tracking-wider uppercase">Brand / Studio</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="MERCER ARCHITECTS"
                        className="bg-bg-secondary border border-text-primary/10 focus:border-text-primary p-3 text-xs text-text-primary placeholder-text-secondary/35 outline-none transition-all rounded-[2px]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 font-sans">
                    <label className="text-[10px] font-bold text-text-secondary tracking-wider uppercase">Email Vector</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alexander@mercer.studio"
                      className="bg-bg-secondary border border-text-primary/10 focus:border-text-primary p-3 text-xs text-text-primary placeholder-text-secondary/35 outline-none transition-all rounded-[2px]"
                    />
                  </div>

                  {/* Tier Selection & Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-text-secondary tracking-wider uppercase">Campaign Tier</label>
                      <div className="relative">
                        <select
                          name="tier"
                          value={formData.tier}
                          onChange={handleInputChange}
                          className="w-full bg-bg-secondary border border-text-primary/10 focus:border-text-primary p-3 text-xs text-text-primary outline-none transition-all appearance-none rounded-[2px]"
                        >
                          <option value="standard-lookbook">Standard Technical Lookbook</option>
                          <option value="enterprise-campaign">Enterprise Campaign Locks</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-sans">
                        <span className="font-bold text-text-secondary tracking-wider uppercase">Estimated Frames</span>
                        <span className="text-text-primary font-bold">{formData.renders} Captures</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={formData.renders}
                        onChange={handleRendersChange}
                        className="w-full accent-accent cursor-pointer mt-3"
                      />
                    </div>
                  </div>

                  {/* Brief description text */}
                  <div className="flex flex-col gap-2 font-sans">
                    <label className="text-[10px] font-bold text-text-secondary tracking-wider uppercase">Brand Vision / Concept</label>
                    <textarea
                      name="concept"
                      rows="4"
                      value={formData.concept}
                      onChange={handleInputChange}
                      placeholder="Describe your desired lookbook, garment elements, pose aesthetics..."
                      className="bg-bg-secondary border border-text-primary/10 focus:border-text-primary p-3 text-xs text-text-primary placeholder-text-secondary/35 outline-none resize-none transition-all rounded-[2px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4 border-t border-text-primary/10">
                    <button
                      type="submit"
                      className="border border-text-primary hover:bg-text-primary hover:text-bg-primary px-8 py-3.5 font-sans text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 rounded-[2px]"
                    >
                      Submit Brief <Send size={10} />
                    </button>
                  </div>
                </form>
              </BrutalistPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}