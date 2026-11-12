import React from 'react';
import { ArrowRight, Compass, ChevronDown, MapPin, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
  onExploreTours: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreTours }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#244855] text-[#FBE9D0]">
      {/* Cinematic Background Image with Slow Ambient Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          src="/src/assets/images/hero_goa_coastal_travel_1794491622526.jpg"
          alt="Goa scenic coastal road trip along the Arabian Sea"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Deep Teal & Terracotta Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#244855]/95 via-[#244855]/85 to-[#244855]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#244855] via-transparent to-[#244855]/40" />

        {/* Vintage road trip texture lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FBE9D0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* Top Chapter Metadata Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#874F41]/60 pb-3 text-[11px] sm:text-xs uppercase tracking-widest text-[#90AEAD]">
          <div className="flex items-center gap-2">
            <span className="text-[#E64833] font-bold">EXPEDITION NO. 01</span>
            <span aria-hidden="true" className="text-[#874F41]">/</span>
            <span>COASTAL HIGHWAYS OF GOA</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-[#FBE9D0]/70">
            <span>COORDINATES: 15°29'50"N 73°49'34"E</span>
            <span aria-hidden="true" className="text-[#874F41]">/</span>
            <span>NORTH &amp; SOUTH GOA RUN</span>
          </div>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 my-auto">
        <div className="max-w-4xl">
          {/* Subtle Stamp Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#874F41]/60 border border-[#90AEAD]/40 text-[#FBE9D0] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
          >
            <Compass className="w-3.5 h-3.5 text-[#E64833]" />
            <span>AUTHENTIC ROAD-TRIP &amp; CHAUFFEUR TRAVEL</span>
          </motion.div>

          {/* Staggered Cinematic Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#FBE9D0] leading-[0.92] uppercase"
            >
              GOA IS CALLING.
            </motion.h1>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#E64833] leading-[0.92] uppercase mt-1"
            >
              LET'S HIT THE ROAD.
            </motion.h1>
          </div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="text-base sm:text-xl font-normal text-[#FBE9D0]/90 max-w-2xl leading-relaxed mb-10 font-sans-body"
          >
            From scenic coastal drives to unforgettable Goa experiences, discover every journey with us.
            Punctual airport transfers, bespoke sightseeing packages, and comfortable inter-city rides with Tanveer.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary Coral Red CTA */}
            <button
              onClick={onBookClick}
              className="px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-[#FBE9D0] bg-[#E64833] hover:bg-[#d43d29] active:bg-[#c23321] rounded-sm shadow-xl transition-all duration-200 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-[#E64833]/30"
            >
              <span>BOOK YOUR RIDE</span>
              <ArrowRight className="w-5 h-5 text-[#FBE9D0]" />
            </button>

            {/* Secondary Warm Cream Outline CTA */}
            <button
              onClick={onExploreTours}
              className="px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-[#FBE9D0] bg-transparent hover:bg-[#874F41]/40 border-2 border-[#FBE9D0] rounded-sm transition-all duration-200 flex items-center gap-3 hover:-translate-y-0.5"
            >
              <span>EXPLORE GOA</span>
              <Compass className="w-5 h-5 text-[#90AEAD]" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Travel Capabilities Strip & Animated Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-t border-[#874F41]/50 pt-6">
          {/* Quick Specs */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#90AEAD]">
            <div>
              <span className="font-bebas text-lg tracking-wider text-[#FBE9D0] block">01 / COASTAL REACH</span>
              <span className="font-sans-body">Mopa (GOX) &amp; Dabolim (GOI) Airports</span>
            </div>
            <div>
              <span className="font-bebas text-lg tracking-wider text-[#FBE9D0] block">02 / FLEET INVENTORY</span>
              <span className="font-sans-body">Sedans, MUVs to 55-Seater Coaches</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-bebas text-lg tracking-wider text-[#FBE9D0] block">03 / DISPATCH</span>
              <span className="font-sans-body">24/7 Verified Booking Enquiries</span>
            </div>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2 text-xs uppercase tracking-widest text-[#90AEAD]">
            <span className="font-mono text-[11px]">SCROLL TO PLAN</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-6 rounded-full border border-[#90AEAD]/60 flex items-center justify-center text-[#E64833]"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
