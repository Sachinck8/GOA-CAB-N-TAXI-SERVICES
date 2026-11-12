import React, { useState } from 'react';
import { Users, Briefcase, Wind, ArrowRight, ShieldCheck, Gauge, Check } from 'lucide-react';
import { useStorage } from '../context/StorageContext';

interface FleetSectionProps {
  onSelectVehicle: (vehicleName: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  const { fleet } = useStorage();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Hatchback', 'Sedan', 'MUV / SUV', 'Van', 'Minibus', 'Coach'];

  const filteredFleet =
    filterCategory === 'All'
      ? fleet
      : fleet.filter((v) => v.category === filterCategory);

  return (
    <section id="fleet" className="py-24 bg-[#FBE9D0] text-[#244855] border-t-2 border-[#874F41]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 border-b-2 border-[#874F41]/40 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E64833]" />
              <span>CHAPTER 04 // THE VERIFIED ROAD FLEET</span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl text-[#244855] tracking-tight leading-[0.95]">
              PRECISION PASSENGER FLEET
            </h2>
            <p className="mt-3 text-base text-[#874F41] font-sans-body leading-relaxed">
              Every passenger category tailored to Goan topography. From compact hatchbacks for narrow village roads to 55-seater luxury coaches for destination weddings and corporate conventions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border-2 border-[#874F41]/40 rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-[#244855] text-[#FBE9D0] shadow-sm'
                    : 'text-[#874F41] hover:text-[#244855]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Showcase Hero Banner */}
        <div className="mb-14 relative rounded-sm overflow-hidden border-2 border-[#244855] shadow-xl bg-[#244855]">
          <img
            src="/src/assets/images/fleet_travel_showcase_1794491625769.jpg"
            alt="Goa Cab N Taxi commercial passenger vehicles lined up under tropical palms"
            className="w-full h-64 sm:h-96 object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#244855] via-[#244855]/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-[#FBE9D0]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-1">
                <Gauge className="w-4 h-4" />
                <span>ALL-VEHICLE OPERATIONAL STANDARD</span>
              </div>
              <h3 className="font-bebas text-2xl sm:text-4xl text-[#FBE9D0] tracking-wide">
                100% SANITISED · HIGH-OUTPUT AIR CONDITIONING · VERIFIED CHAUFFEURS
              </h3>
              <p className="text-xs sm:text-sm text-[#90AEAD] mt-2 font-sans-body max-w-2xl">
                We never assign unauthorized or substandard private vehicles. Every vehicle is commercially registered with valid Goa passenger transport permits and emergency safety kits.
              </p>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white border-2 border-[#874F41]/30 hover:border-[#244855] rounded-sm p-6 flex flex-col justify-between transition-all duration-200 group hover:shadow-lg"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between mb-3 border-b border-[#874F41]/20 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#874F41]">
                    {vehicle.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      vehicle.available
                        ? 'bg-[#90AEAD]/30 text-[#244855]'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {vehicle.available ? 'AVAILABLE' : 'RESERVED'}
                  </span>
                </div>

                <h3 className="font-bebas text-2xl text-[#244855] tracking-wide group-hover:text-[#E64833] transition-colors leading-none mb-1">
                  {vehicle.name}
                </h3>
                <p className="text-xs text-[#874F41] mb-5 font-sans-body line-clamp-2">
                  {vehicle.description}
                </p>

                {/* Technical Specs Strip */}
                <div className="space-y-2.5 py-4 border-y border-[#874F41]/20 text-xs font-sans-body text-[#244855]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#874F41]">
                      <Users className="w-3.5 h-3.5 text-[#E64833]" /> Seating Capacity
                    </span>
                    <span className="font-bold">{vehicle.seatingCapacity} Passengers</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#874F41]">
                      <Briefcase className="w-3.5 h-3.5 text-[#E64833]" /> Luggage Bay
                    </span>
                    <span className="font-medium truncate max-w-[140px]" title={vehicle.luggageCapacity}>
                      {vehicle.luggageCapacity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#874F41]">
                      <Wind className="w-3.5 h-3.5 text-[#E64833]" /> Climate Control
                    </span>
                    <span className="font-bold text-[#244855]">AC Standard</span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-[#874F41] font-sans-body">
                  <strong className="text-[#244855]">Best For:</strong> {vehicle.idealFor}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3">
                <button
                  type="button"
                  onClick={() => onSelectVehicle(vehicle.name)}
                  className="w-full py-2.5 px-3 rounded-sm bg-[#244855] group-hover:bg-[#E64833] text-[#FBE9D0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>SELECT FOR QUOTATION</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FBE9D0]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
