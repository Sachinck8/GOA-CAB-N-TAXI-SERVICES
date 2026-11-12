import React, { useState } from 'react';
import { StorageProvider } from './context/StorageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { ServicesSection } from './components/ServicesSection';
import { ToursSection } from './components/ToursSection';
import { FleetSection } from './components/FleetSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutUs } from './components/AboutUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { BUSINESS_CONFIG, buildGeneralWhatsAppUrl } from './utils/whatsapp';

function MainApp() {
  const [activeView, setActiveView] = useState<'site' | 'admin'>('site');
  const [preselectedVehicle, setPreselectedVehicle] = useState<string>('Maruti Swift Dzire');
  const [preselectedDrop, setPreselectedDrop] = useState<string>('');

  const scrollTo = (id: string) => {
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

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedDrop(serviceTitle);
    scrollTo('book-ride');
  };

  const handleSelectVehicle = (vehicleName: string) => {
    setPreselectedVehicle(vehicleName);
    scrollTo('book-ride');
  };

  if (activeView === 'admin') {
    return <AdminDashboard onBackToSite={() => setActiveView('site')} />;
  }

  return (
    <div className="min-h-screen bg-[#FBE9D0] text-[#244855] flex flex-col font-sans selection:bg-[#E64833] selection:text-[#FBE9D0]">
      {/* Top Header conforming to Top Bar Contract */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenBooking={() => scrollTo('book-ride')}
      />

      <main className="flex-1 pb-16 sm:pb-0">
        {/* Hero Section */}
        <Hero
          onBookClick={() => scrollTo('book-ride')}
          onExploreTours={() => scrollTo('tours')}
        />

        {/* Interactive Booking Widget */}
        <BookingWidget
          key={`${preselectedVehicle}-${preselectedDrop}`}
          preselectedVehicle={preselectedVehicle}
          preselectedDrop={preselectedDrop}
        />

        {/* Core Services Section (8 Verified Cards) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Tours & Experiences Section (8 Verified Activities) */}
        <ToursSection />

        {/* Fleet Section (Wagon-R to 55-Seater Coach) */}
        <FleetSection onSelectVehicle={handleSelectVehicle} />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* About Tanveer & Goa Cab N Taxi Services */}
        <AboutUs />

        {/* Contact Section with Phone, WhatsApp & Verified Google Maps Listing */}
        <ContactSection />
      </main>

      {/* Footer with SaaKora Partner Credit */}
      <Footer
        onNavigate={scrollTo}
        onOpenAdmin={() => {
          setActiveView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Sticky Quick Action Bar (Under 15% mobile viewport height cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#244855]/95 backdrop-blur-md border-t-2 border-[#874F41] p-2.5 flex items-center justify-around gap-2 text-xs">
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex-1 py-2.5 px-2 rounded-sm bg-[#1a353f] border border-[#874F41]/60 text-[#FBE9D0] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:bg-[#874F41]"
        >
          <Phone className="w-3.5 h-3.5 text-[#E64833]" />
          <span>Call</span>
        </a>

        <a
          href={buildGeneralWhatsAppUrl('Instant Mobile Enquiry')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-sm bg-[#874F41] text-[#FBE9D0] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:bg-[#244855]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#FBE9D0]" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => scrollTo('book-ride')}
          className="flex-1 py-2.5 px-2 rounded-sm bg-[#E64833] text-[#FBE9D0] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:bg-[#d43d29] shadow-md"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#FBE9D0]" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StorageProvider>
      <MainApp />
    </StorageProvider>
  );
}
