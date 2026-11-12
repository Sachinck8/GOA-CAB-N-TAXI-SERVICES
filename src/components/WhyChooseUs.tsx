import React from 'react';
import {
  CalendarCheck,
  Compass,
  Plane,
  HeartHandshake,
  Navigation,
  Clock,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      num: '01',
      icon: CalendarCheck,
      title: 'Convenient Booking',
      description: 'Quick digital enquiry submission directly via our interactive ticket console or instant WhatsApp chat. Fast responses with clear, pre-agreed pricing.',
    },
    {
      num: '02',
      icon: Compass,
      title: 'Local Route Mastery',
      description: 'Our chauffeurs know Goa intimately — navigating scenic coastal passes, avoiding ferry chokepoints, and taking you to authentic local eateries.',
    },
    {
      num: '03',
      icon: Plane,
      title: 'Airport & Railway Punctuality',
      description: 'Timely transfers for both Manohar International (MOPA) and Dabolim (GOI), plus Madgaon, Thivim, Karmali, and Vasco railway stations.',
    },
    {
      num: '04',
      icon: HeartHandshake,
      title: 'Personalized Journeys',
      description: 'Travel at your own pace. Stop for photos at Aguada or Chapora, pause for local seafood, or modify your itinerary without high-pressure meters.',
    },
    {
      num: '05',
      icon: Navigation,
      title: 'Local & Outstation Freedom',
      description: 'Comprehensive transport covering all North & South Goa beach villages, plus safe inter-state journeys to Gokarna, Dandeli, Kolhapur, and Mumbai.',
    },
    {
      num: '06',
      icon: Clock,
      title: '24/7 Booking Enquiries',
      description: 'Whether arriving on a late midnight red-eye or scheduling a dawn railway station pickup, our coordinators respond around the clock.',
    },
  ];

  return (
    <section className="py-24 bg-[#FBE9D0] text-[#244855] border-t-2 border-[#874F41]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E64833]" />
            <span>CHAPTER 06 // THE TRAVELLER'S ADVANTAGE</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#244855] tracking-tight leading-[0.95]">
            WHY EXPLORE WITH GOA CAB N TAXI
          </h2>
          <p className="mt-3 text-base text-[#874F41] font-sans-body leading-relaxed">
            Authentic Goan hospitality built on honest communication, clean vehicles, and respectful local drivers.
          </p>
        </div>

        {/* 6 Grid Cards in Vintage Road-Trip Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="bg-white border-2 border-[#874F41]/30 hover:border-[#244855] p-6 rounded-sm shadow-sm transition-all duration-200 group hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-sm bg-[#244855] text-[#FBE9D0] group-hover:bg-[#E64833] transition-colors flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bebas text-2xl text-[#874F41]/60 font-mono tracking-widest">
                    {r.num}
                  </span>
                </div>
                <h3 className="font-bebas text-2xl text-[#244855] mb-2 tracking-wide group-hover:text-[#E64833] transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#874F41] leading-relaxed font-sans-body">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
