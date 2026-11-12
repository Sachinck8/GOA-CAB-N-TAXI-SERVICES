import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck, Compass } from 'lucide-react';
import { BUSINESS_CONFIG, buildGeneralWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  activeView: 'site' | 'admin';
  setActiveView: (view: 'site' | 'admin') => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'site') {
      setActiveView('site');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#244855] text-[#FBE9D0] border-b border-[#874F41]/30 shadow-md transition-all">
      {/* Top Travel Wire Bar */}
      <div className="bg-[#1a353f] text-[#FBE9D0] text-xs py-1.5 px-4 sm:px-8 border-b border-[#244855]/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 font-medium text-[11px] sm:text-xs tracking-wider">
            <span className="text-[#E64833] font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E64833] inline-block" />
              GOA CAB N TAXI
            </span>
            <span className="text-[#90AEAD] hidden sm:inline" aria-hidden="true">/</span>
            <span className="hidden sm:inline text-[#FBE9D0]/80">TOURS &amp; TRAVEL</span>
            <span className="text-[#90AEAD] hidden md:inline" aria-hidden="true">/</span>
            <span className="hidden md:inline text-[#90AEAD]">BOOKING ENQUIRIES 24/7</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 text-[#FBE9D0] hover:text-[#E64833] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E64833]" />
              <span className="font-semibold tracking-wide">{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href={buildGeneralWhatsAppUrl('Header Quick Enquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#90AEAD] hover:text-[#FBE9D0] transition-colors hidden sm:flex"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E64833]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Retro-Modern Top Bar: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Distinctive Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveView('site');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left focus-visible:outline-none group"
          >
            <div className="w-10 h-10 rounded-sm bg-[#874F41] border border-[#E64833]/40 flex items-center justify-center text-[#FBE9D0] shadow-inner group-hover:bg-[#E64833] transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-[#FBE9D0] block leading-none">
                GOA CAB N TAXI
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#90AEAD] block mt-0.5">
                BY TANVEER · COASTAL EXPEDITIONS
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 5 Editorial Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-[#FBE9D0]/80">
          <button
            onClick={() => {
              if (activeView !== 'site') setActiveView('site');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-[#E64833] pb-1 border-b-2 ${
              activeView === 'site' ? 'text-[#FBE9D0] border-[#E64833]' : 'border-transparent text-[#FBE9D0]/80'
            }`}
          >
            Road Trip
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="transition-colors hover:text-[#E64833] pb-1 border-b-2 border-transparent text-[#FBE9D0]/80"
          >
            Taxi Services
          </button>
          <button
            onClick={() => scrollTo('tours')}
            className="transition-colors hover:text-[#E64833] pb-1 border-b-2 border-transparent text-[#FBE9D0]/80"
          >
            Goa Experiences
          </button>
          <button
            onClick={() => scrollTo('fleet')}
            className="transition-colors hover:text-[#E64833] pb-1 border-b-2 border-transparent text-[#FBE9D0]/80"
          >
            Our Fleet
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="transition-colors hover:text-[#E64833] pb-1 border-b-2 border-transparent text-[#FBE9D0]/80"
          >
            Tanveer
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="transition-colors hover:text-[#E64833] pb-1 border-b-2 border-transparent text-[#FBE9D0]/80"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Coral Red Primary CTA + Admin Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveView(activeView === 'admin' ? 'site' : 'admin')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors border ${
              activeView === 'admin'
                ? 'bg-[#E64833] text-[#FBE9D0] border-[#E64833]'
                : 'text-[#90AEAD] hover:text-[#FBE9D0] border-[#874F41]/60 hover:bg-[#874F41]/30'
            }`}
            title="Demonstration management console"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E64833]" />
            <span>{activeView === 'admin' ? 'EXIT CONSOLE' : 'OPERATOR PORTAL'}</span>
          </button>

          <button
            onClick={() => {
              if (activeView !== 'site') setActiveView('site');
              onOpenBooking();
            }}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FBE9D0] bg-[#E64833] hover:bg-[#d43d29] active:bg-[#c23321] rounded-sm shadow-md transition-all whitespace-nowrap shrink-0 hover:shadow-lg hover:-translate-y-0.5"
          >
            BOOK YOUR RIDE
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#FBE9D0] hover:text-[#E64833] focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a353f] border-b border-[#874F41]/40 px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-150">
          <div className="flex flex-col gap-3 font-semibold uppercase tracking-wider text-xs text-[#FBE9D0]">
            <button
              onClick={() => {
                setActiveView('site');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left py-2 hover:text-[#E64833] border-b border-[#244855]"
            >
              Road Trip Home
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="text-left py-2 hover:text-[#E64833] border-b border-[#244855]"
            >
              Taxi Services (Airport / Local / Outstation)
            </button>
            <button
              onClick={() => scrollTo('tours')}
              className="text-left py-2 hover:text-[#E64833] border-b border-[#244855]"
            >
              Goa Experiences (Dudhsagar / Scuba / Cruise)
            </button>
            <button
              onClick={() => scrollTo('fleet')}
              className="text-left py-2 hover:text-[#E64833] border-b border-[#244855]"
            >
              Our Fleet (Wagon-R to 55-Seater Coach)
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-[#E64833] border-b border-[#244855]"
            >
              About Tanveer
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 hover:text-[#E64833] border-b border-[#244855]"
            >
              Contact &amp; Location
            </button>

            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView(activeView === 'admin' ? 'site' : 'admin');
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-sm border border-[#874F41] text-[#FBE9D0] bg-[#244855]"
              >
                <ShieldCheck className="w-4 h-4 text-[#E64833]" />
                <span>{activeView === 'admin' ? 'Return to Website' : 'Operator Portal (Demo)'}</span>
              </button>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-sm bg-[#E64833] text-[#FBE9D0]"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Call: {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
