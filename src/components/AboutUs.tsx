import React from 'react';
import { UserCheck, MapPin, Phone, MessageSquare, Shield, Check } from 'lucide-react';
import { BUSINESS_CONFIG, buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#244855] text-[#FBE9D0] border-t-2 border-[#874F41] relative overflow-hidden">
      {/* Vintage map background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FBE9D0_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E64833]" />
              <span>CHAPTER 05 // THE OPERATOR BEHIND THE WHEEL</span>
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl text-[#FBE9D0] tracking-tight leading-[0.95] mb-6">
              PERSONAL SERVICE. LOCAL INTEGRITY.
            </h2>

            {/* Playfair Display Pull-Quote */}
            <div className="p-6 mb-8 bg-[#1a353f] border-l-4 border-[#E64833] rounded-sm">
              <p className="font-editorial italic text-lg sm:text-xl text-[#FBE9D0] leading-snug">
                "Every road in Goa tells a story — from the winding palms of Siolim to the quiet church courtyards of Chandor. Our commitment is to ensure you experience every mile in genuine comfort."
              </p>
              <span className="block text-xs font-mono uppercase tracking-widest text-[#90AEAD] mt-3">
                — TANVEER, FOUNDER &amp; LEAD COORDINATOR
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#FBE9D0]/80 leading-relaxed font-sans-body">
              <p>
                <strong>Goa Cab N Taxi Services</strong> was established with a singular vision: to elevate local transport from transactional taxi rides into dependable, hospitable travel partnerships.
              </p>
              <p>
                Operating across both North and South Goa, we take personal responsibility for every pickup. Whether it’s monitoring early-morning flight landings at Manohar International Airport (MOPA), coordinating multi-vehicle fleets for coastal weddings, or guiding families through the Western Ghats to Dudhsagar, Tanveer oversees scheduling with strict punctuality.
              </p>
            </div>

            {/* Operator Badges */}
            <div className="mt-8 pt-6 border-t border-[#874F41]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-[#1a353f] border border-[#874F41]/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#874F41] flex items-center justify-center text-[#FBE9D0] shrink-0">
                  <UserCheck className="w-5 h-5 text-[#FBE9D0]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#90AEAD] block">DIRECT OPERATOR</span>
                  <span className="font-bold text-sm text-[#FBE9D0]">Tanveer</span>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#1a353f] border border-[#874F41]/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#874F41] flex items-center justify-center text-[#FBE9D0] shrink-0">
                  <MapPin className="w-5 h-5 text-[#E64833]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#90AEAD] block">HOME BASE</span>
                  <span className="font-bold text-sm text-[#FBE9D0]">Goa, India</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="px-6 py-3 rounded-sm bg-[#E64833] hover:bg-[#d43d29] text-[#FBE9D0] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Tanveer Directly</span>
              </a>

              <a
                href={buildGeneralWhatsAppUrl('Enquiry for Tanveer')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-sm bg-[#1a353f] hover:bg-[#874F41] border border-[#874F41] text-[#FBE9D0] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#E64833]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Right Column: Code of Conduct Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#1a353f] border-2 border-[#874F41] p-8 rounded-sm shadow-2xl relative">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-2">
                <Shield className="w-4 h-4" />
                <span>AUTHENTICITY GUARANTEE</span>
              </div>
              <h3 className="font-bebas text-3xl text-[#FBE9D0] tracking-wide mb-6">
                OUR OPERATIONAL CREED
              </h3>

              <div className="space-y-5 text-xs sm:text-sm text-[#FBE9D0]/80 font-sans-body">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E64833] text-[#FBE9D0] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-[#FBE9D0] block mb-0.5">Pre-Agreed Quotations:</strong>
                    Zero mid-trip fare renegotiations or hidden surge surcharges.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E64833] text-[#FBE9D0] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-[#FBE9D0] block mb-0.5">Flight Timing Vigilance:</strong>
                    We actively monitor inbound flight numbers to accommodate delayed or early landings.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E64833] text-[#FBE9D0] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-[#FBE9D0] block mb-0.5">Commercial Permit Compliance:</strong>
                    Every driver holds certified commercial passenger licensing with police verification.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E64833] text-[#FBE9D0] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-[#FBE9D0] block mb-0.5">24-Hour Voice Reachability:</strong>
                    You speak directly with real coordinators in Goa, not an outsourced automated bot.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
