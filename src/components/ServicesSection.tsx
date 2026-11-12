import React from 'react';
import {
  Plane,
  Train,
  Car,
  Compass,
  Landmark,
  MapPin,
  ArrowRight,
  Repeat,
  Check,
  CalendarCheck
} from 'lucide-react';
import { INITIAL_SERVICES } from '../data/initialData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#E64833]" />;
      case 'Train':
        return <Train className="w-5 h-5 text-[#E64833]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#E64833]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#E64833]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[#E64833]" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#E64833]" />;
      case 'ArrowRight':
        return <ArrowRight className="w-5 h-5 text-[#E64833]" />;
      case 'Repeat':
        return <Repeat className="w-5 h-5 text-[#E64833]" />;
      default:
        return <Car className="w-5 h-5 text-[#E64833]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FBE9D0] text-[#244855] border-t-2 border-[#874F41]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b-2 border-[#874F41]/40 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E64833]" />
              <span>CHAPTER 02 // CHAUFFEUR &amp; TRANSIT SERVICES</span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl text-[#244855] tracking-tight leading-[0.95]">
              CRAFTED FOR THE OPEN ROAD
            </h2>
            <p className="mt-3 text-base text-[#874F41] font-sans-body leading-relaxed">
              Tailored transportation across every district of Goa. Whether it's a punctual dawn arrival at Mopa airport, an expedition to historic forts, or a seamless highway run to Gokarna.
            </p>
          </div>

          <div className="text-right hidden lg:block font-mono text-xs text-[#874F41]">
            <p>DISPATCHED FROM GOA, INDIA</p>
            <p className="text-[#E64833] font-bold">ALL-WEATHER FLEET · AC STANDARD</p>
          </div>
        </div>

        {/* Asymmetric Editorial Service Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className={`flex flex-col justify-between p-6 rounded-sm border-2 transition-all duration-200 group ${
                idx === 0 || idx === 3
                  ? 'bg-[#244855] text-[#FBE9D0] border-[#244855] shadow-lg'
                  : 'bg-white text-[#244855] border-[#874F41]/30 hover:border-[#874F41] shadow-sm'
              }`}
            >
              <div>
                {/* Header with Icon and Big Numerical Stamp */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-sm flex items-center justify-center border ${
                      idx === 0 || idx === 3
                        ? 'bg-[#1a353f] border-[#874F41]'
                        : 'bg-[#FBE9D0] border-[#874F41]/40'
                    }`}
                  >
                    {getIcon(srv.icon)}
                  </div>
                  <span
                    className={`font-bebas text-3xl tracking-widest ${
                      idx === 0 || idx === 3 ? 'text-[#90AEAD]' : 'text-[#874F41]/60'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <h3
                  className={`font-bebas text-2xl tracking-wide leading-none mb-1 ${
                    idx === 0 || idx === 3 ? 'text-[#FBE9D0]' : 'text-[#244855]'
                  }`}
                >
                  {srv.title}
                </h3>

                <p
                  className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${
                    idx === 0 || idx === 3 ? 'text-[#E64833]' : 'text-[#874F41]'
                  }`}
                >
                  {srv.subtitle}
                </p>

                <p
                  className={`text-xs leading-relaxed mb-5 font-sans-body ${
                    idx === 0 || idx === 3 ? 'text-[#FBE9D0]/80' : 'text-[#874F41]'
                  }`}
                >
                  {srv.description}
                </p>

                {/* Key Points */}
                <ul
                  className={`space-y-1.5 mb-6 pt-4 border-t text-xs font-sans-body ${
                    idx === 0 || idx === 3
                      ? 'border-[#874F41]/40 text-[#FBE9D0]/90'
                      : 'border-[#874F41]/20 text-[#244855]'
                  }`}
                >
                  {srv.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-[#E64833] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => onSelectService(srv.title)}
                className={`w-full py-2.5 px-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  idx === 0 || idx === 3
                    ? 'bg-[#E64833] text-[#FBE9D0] hover:bg-[#d43d29]'
                    : 'bg-[#244855] text-[#FBE9D0] hover:bg-[#E64833]'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>BOOK THIS SERVICE</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
