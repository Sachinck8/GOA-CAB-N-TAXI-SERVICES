import React, { useState } from 'react';
import { Compass, Clock, Check, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { INITIAL_TOURS } from '../data/initialData';
import { TourExperience } from '../types';
import { TourEnquiryModal } from './TourEnquiryModal';

const CATEGORIES = [
  'All Experiences',
  'Water Sports & Sea',
  'Nature & Adventure',
  'Sightseeing & Heritage',
  'Cruises & Leisure',
];

export const ToursSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Experiences');
  const [activeTourModal, setActiveTourModal] = useState<TourExperience | null>(null);

  const filteredTours =
    selectedCategory === 'All Experiences'
      ? INITIAL_TOURS
      : INITIAL_TOURS.filter((t) => t.category === selectedCategory);

  // Marquee tour for editorial spotlight
  const spotlightTour = INITIAL_TOURS.find((t) => t.id === 'dudhsagar-waterfall') || INITIAL_TOURS[0];

  return (
    <section id="tours" className="py-24 bg-[#244855] text-[#FBE9D0] border-t-2 border-[#874F41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 border-b border-[#874F41]/60 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E64833]" />
              <span>CHAPTER 03 // EXPEDITIONS &amp; EXPERIENCES</span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl text-[#FBE9D0] tracking-tight leading-[0.95]">
              DISCOVER UNCHARTED GOA
            </h2>
            <p className="mt-3 text-base text-[#90AEAD] font-sans-body leading-relaxed">
              Beyond the ordinary beach strip: majestic jungle waterfalls, Arabian Sea scuba dives, heritage spice plantations, and twilight river cruises coordinated with reliable chauffeur travel.
            </p>
          </div>

          {/* Retro Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1a353f] border border-[#874F41]/60 rounded-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#E64833] text-[#FBE9D0] shadow-sm'
                    : 'text-[#90AEAD] hover:text-[#FBE9D0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Editorial Spotlight Card: Dudhsagar / Iconic Safari */}
        {selectedCategory === 'All Experiences' && (
          <div className="mb-14 bg-[#1a353f] border-2 border-[#874F41] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src={spotlightTour.imageUrl}
                alt={spotlightTour.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a353f] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1a353f]" />
              <div className="absolute top-4 left-4 bg-[#E64833] text-[#FBE9D0] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
                FEATURED EXPEDITION
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#90AEAD] uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#E64833]" />
                  <span>{spotlightTour.duration} · WESTERN GHATS</span>
                </div>

                <h3 className="font-bebas text-3xl sm:text-4xl text-[#FBE9D0] tracking-wide mb-2">
                  {spotlightTour.name}
                </h3>
                <p className="text-xs font-bold text-[#E64833] uppercase tracking-wider mb-4">
                  {spotlightTour.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#FBE9D0]/80 leading-relaxed font-sans-body mb-6">
                  {spotlightTour.description}
                </p>

                <div className="space-y-2 mb-8">
                  {spotlightTour.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#90AEAD]">
                      <Check className="w-3.5 h-3.5 text-[#E64833] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTourModal(spotlightTour)}
                className="w-full py-3 px-4 rounded-sm bg-[#E64833] hover:bg-[#d43d29] text-[#FBE9D0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ENQUIRE EXPEDITION DETAILS</span>
              </button>
            </div>
          </div>
        )}

        {/* 8 Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTours.map((tour, idx) => (
            <div
              key={tour.id}
              className="bg-[#1a353f] border-2 border-[#874F41]/60 hover:border-[#E64833] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                {/* Photo Frame with subtle vintage crop */}
                <div className="relative h-48 overflow-hidden bg-[#244855]">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a353f] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-[#244855]/90 border border-[#874F41]/60 text-[10px] font-bold uppercase tracking-wider text-[#FBE9D0] px-2.5 py-0.5 rounded-sm">
                    {tour.category}
                  </div>

                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs font-mono text-[#90AEAD]">
                    <Clock className="w-3.5 h-3.5 text-[#E64833]" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bebas text-2xl tracking-wide text-[#FBE9D0] group-hover:text-[#E64833] transition-colors leading-none mb-1">
                    {tour.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#874F41] uppercase tracking-wider mb-2">
                    {tour.tagline}
                  </p>
                  <p className="text-xs text-[#FBE9D0]/75 line-clamp-3 leading-relaxed mb-4 font-sans-body">
                    {tour.description}
                  </p>

                  <div className="space-y-1 pt-3 border-t border-[#874F41]/40">
                    {tour.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#90AEAD]">
                        <Check className="w-3 h-3 text-[#E64833] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setActiveTourModal(tour)}
                  className="w-full py-2.5 px-3 rounded-sm bg-[#244855] hover:bg-[#E64833] text-[#FBE9D0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#874F41]/60"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#90AEAD] group-hover:text-[#FBE9D0]" />
                  <span>ENQUIRE ACTIVITY</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Travel Notice */}
        <div className="mt-12 p-4 rounded-sm bg-[#1a353f]/80 border border-[#874F41]/60 text-center max-w-2xl mx-auto text-xs text-[#90AEAD]">
          <p>
            <strong className="text-[#FBE9D0]">Seasonal Permits &amp; Timings:</strong> Water sports and waterfall safaris operate according to monsoon regulations and forest department permits.
            Tanveer will share accurate daily timings, group pickup schedules, and transparent quotations upon enquiry.
          </p>
        </div>
      </div>

      <TourEnquiryModal tour={activeTourModal} onClose={() => setActiveTourModal(null)} />
    </section>
  );
};
