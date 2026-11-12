import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, ShieldCheck, Compass } from 'lucide-react';
import { BUSINESS_CONFIG, buildGeneralWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a353f] text-[#FBE9D0] border-t-2 border-[#874F41] text-xs">
      {/* Main Footer Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#874F41] flex items-center justify-center text-[#FBE9D0] border border-[#E64833]/40">
                <Compass className="w-5 h-5 text-[#E64833]" />
              </div>
              <div>
                <span className="font-bebas text-2xl text-[#FBE9D0] tracking-wider block leading-none">
                  GOA CAB N TAXI
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#90AEAD]">
                  SERVICES · TOURS &amp; TRAVEL
                </span>
              </div>
            </div>

            <p className="text-[#90AEAD] text-xs leading-relaxed max-w-sm font-sans-body">
              Your dependable partner for comfortable, punctual cab bookings, airport and railway transfers, and personalized sightseeing experiences across North and South Goa.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#FBE9D0]/70 space-y-1">
              <div>OPERATOR: <span className="text-[#FBE9D0] font-bold">Tanveer</span></div>
              <div>AVAILABILITY: <span className="text-[#E64833] font-bold">24 Hours / 7 Days</span></div>
              <div>JURISDICTION: <span className="text-[#90AEAD]">All North &amp; South Goa + Outstation</span></div>
            </div>
          </div>

          {/* Quick Route Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bebas text-lg text-[#FBE9D0] tracking-wider">
              ROAD EXPEDITION
            </h4>
            <ul className="space-y-2 text-[#90AEAD] font-semibold uppercase tracking-wider text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('book-ride')}
                  className="hover:text-[#E64833] transition-colors text-left"
                >
                  Book a Cab
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#E64833] transition-colors text-left"
                >
                  Taxi Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tours')}
                  className="hover:text-[#E64833] transition-colors text-left"
                >
                  Goa Experiences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('fleet')}
                  className="hover:text-[#E64833] transition-colors text-left"
                >
                  Our Fleet
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E64833] transition-colors text-left"
                >
                  About Tanveer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E64833] transition-colors text-left"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bebas text-lg text-[#FBE9D0] tracking-wider">
              POPULAR RUNS
            </h4>
            <ul className="space-y-1.5 text-[#90AEAD] text-xs font-sans-body">
              <li>Mopa Airport (GOX) Taxi Service</li>
              <li>Dabolim Airport (GOI) Transfers</li>
              <li>Madgaon &amp; Thivim Railway Station Drop</li>
              <li>North Goa Coastal Forts Sightseeing</li>
              <li>South Goa Portuguese Heritage Tour</li>
              <li>Dudhsagar Waterfall Jeep Safari</li>
              <li>Grand Island Scuba &amp; Water Sports</li>
              <li>Mandovi River Twilight Dinner Cruise</li>
            </ul>
          </div>

          {/* Direct Reach */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bebas text-lg text-[#FBE9D0] tracking-wider">
              DIRECT REACH
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center gap-2 text-[#FBE9D0] hover:text-[#E64833] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E64833] shrink-0" />
                <span className="font-bold">{BUSINESS_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#90AEAD] hover:text-[#FBE9D0] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E64833] shrink-0" />
                <span>WhatsApp: +91 86684 23516</span>
              </a>

              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="flex items-center gap-2 text-[#90AEAD] hover:text-[#FBE9D0] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#874F41] shrink-0" />
                <span className="truncate">{BUSINESS_CONFIG.email}</span>
              </a>

              <div className="flex items-center gap-2 text-[#90AEAD]">
                <MapPin className="w-3.5 h-3.5 text-[#E64833] shrink-0" />
                <span>Goa, India</span>
              </div>
            </div>

            {/* Operator Portal Link */}
            <div className="pt-4 border-t border-[#874F41]/40">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-[11px] font-mono text-[#90AEAD] hover:text-[#E64833] transition-colors uppercase"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E64833]" />
                <span>Operator Dashboard (Demo Console)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer with SaaKora Partner Credit */}
      <div className="border-t border-[#244855] bg-[#142931] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
          <div className="text-[#90AEAD]">
            © {new Date().getFullYear()} Goa Cab N Taxi Services. All rights reserved. Managed by Tanveer.
          </div>

          {/* Mandatory SaaKora Partner Attribution */}
          <div className="flex items-center gap-2 text-[#90AEAD]">
            <span>Digital Experience by <strong className="text-[#FBE9D0]">SaaKora</strong></span>
            <span aria-hidden="true" className="text-[#874F41]">·</span>
            <span className="hidden md:inline text-[#90AEAD]/80">Building the core of your digital presence.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-sm bg-[#244855] hover:bg-[#E64833] text-[#FBE9D0] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
