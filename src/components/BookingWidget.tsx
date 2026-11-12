import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Ticket,
  ArrowRight,
  Info
} from 'lucide-react';
import { useStorage } from '../context/StorageContext';
import { buildCabWhatsAppUrl, BUSINESS_CONFIG } from '../utils/whatsapp';

const POPULAR_PICKUPS = [
  'Manohar Intl Airport (MOPA)',
  'Dabolim Airport (GOI)',
  'Madgaon Railway Station (MAO)',
  'Thivim Railway Station',
  'Calangute Beach',
  'Panaji City Center',
  'Candolim',
  'Baga Beach',
  'Anjuna',
  'Colva Beach',
];

const POPULAR_DROPS = [
  'Baga Beach',
  'Panaji',
  'Candolim',
  'Calangute',
  'Palolem Beach',
  'Dabolim Airport (GOI)',
  'Mopa Airport (GOX)',
  'South Goa Resorts',
];

const VEHICLE_OPTIONS = [
  { name: 'Maruti Wagon-R', type: 'Hatchback · 4 Passengers' },
  { name: 'Maruti Swift Dzire', type: 'Sedan · 4 Passengers' },
  { name: 'Maruti Ertiga', type: 'MUV · 6 Passengers' },
  { name: 'Toyota Innova / Crysta', type: 'Premium MUV · 7 Passengers' },
  { name: 'Tata Winger', type: 'Maxi Van · 12 Passengers' },
  { name: 'Force Tempo Traveller', type: 'Minibus · 17 Passengers' },
  { name: '35-Seater Executive Coach', type: 'Bus · 35 Passengers' },
  { name: '55-Seater Luxury Coach', type: 'Bus · 55 Passengers' },
];

interface BookingWidgetProps {
  preselectedVehicle?: string;
  preselectedPickup?: string;
  preselectedDrop?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  preselectedVehicle,
  preselectedPickup,
  preselectedDrop,
}) => {
  const { addBooking } = useStorage();

  const [pickup, setPickup] = useState(preselectedPickup || '');
  const [drop, setDrop] = useState(preselectedDrop || '');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00');
  const [passengers, setPassengers] = useState(2);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [vehicle, setVehicle] = useState(preselectedVehicle || 'Maruti Swift Dzire');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!pickup.trim()) errs.pickup = 'Please provide a pickup location';
    if (!drop.trim()) errs.drop = 'Please provide a destination or drop point';
    if (!date) errs.date = 'Please pick a travel date';
    if (!customerName.trim()) errs.customerName = 'Please enter your full name';

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newRecord = addBooking({
      customerName,
      phone: mobileNumber,
      pickupLocation: pickup,
      dropLocation: drop,
      travelDate: date,
      pickupTime: time,
      passengers,
      tripType,
      vehiclePreference: vehicle,
      notes: 'Submitted via Retro Dispatch Ticket Console',
    });

    setSubmittedBookingId(newRecord.id);

    const waUrl = buildCabWhatsAppUrl({
      name: customerName,
      phone: mobileNumber,
      pickup,
      drop,
      date,
      time,
      passengers,
      tripType: tripType === 'one-way' ? 'One-Way' : 'Round-Trip / Sightseeing',
      vehiclePreference: vehicle,
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newRecord = addBooking({
      customerName,
      phone: mobileNumber,
      pickupLocation: pickup,
      dropLocation: drop,
      travelDate: date,
      pickupTime: time,
      passengers,
      tripType,
      vehiclePreference: vehicle,
      notes: 'Submitted via Direct Ticket Form',
    });

    setSubmittedBookingId(newRecord.id);
  };

  return (
    <section id="book-ride" className="relative -mt-10 sm:-mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-30">
      {/* Retro-Modern Road Trip Booking Console */}
      <div className="bg-[#FBE9D0] border-2 border-[#244855] shadow-2xl rounded-sm overflow-hidden text-[#244855]">
        {/* Ticket Header Banner */}
        <div className="bg-[#244855] text-[#FBE9D0] px-6 sm:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-[#874F41]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E64833] font-bold">
              <Ticket className="w-4 h-4" />
              <span>DISPATCH MANIFEST &amp; RESERVATION DESK</span>
            </div>
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-[#FBE9D0] mt-0.5">
              CUSTOM JOURNEY QUOTATION
            </h2>
            <p className="text-xs text-[#90AEAD]">
              Direct Chauffeur Booking with Tanveer · Verified Rates Across Goa
            </p>
          </div>

          {/* Segmented Trip Type Control */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1a353f] border border-[#874F41]/60 rounded-sm">
            <button
              type="button"
              onClick={() => setTripType('one-way')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                tripType === 'one-way'
                  ? 'bg-[#E64833] text-[#FBE9D0] shadow-sm'
                  : 'text-[#90AEAD] hover:text-[#FBE9D0]'
              }`}
            >
              One-Way Drop
            </button>
            <button
              type="button"
              onClick={() => setTripType('round-trip')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                tripType === 'round-trip'
                  ? 'bg-[#E64833] text-[#FBE9D0] shadow-sm'
                  : 'text-[#90AEAD] hover:text-[#FBE9D0]'
              }`}
            >
              Round-Trip / Day Hire
            </button>
          </div>
        </div>

        {/* Perforated Ticket Divider Line */}
        <div className="relative border-b-2 border-dashed border-[#874F41]/40 py-1 bg-[#f4deb8]/60 px-6 sm:px-8 flex items-center justify-between text-[11px] font-mono text-[#874F41]">
          <span>TRANSIT FORM GOA-CAB-01</span>
          <span className="hidden sm:inline">ORIGIN: NORTH / SOUTH GOA</span>
          <span>EST. QUOTATION READY VIA WHATSAPP</span>
        </div>

        {/* Main Form Body */}
        <form onSubmit={handleWhatsAppEnquiry} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pickup Location */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Pickup Location <span className="text-[#E64833]">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Mopa Airport (GOX), Dabolim (GOI), Hotel in Calangute"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white border-2 rounded-sm text-sm text-[#244855] placeholder:text-slate-400 focus:outline-none focus:border-[#E64833] transition-colors ${
                    errors.pickup ? 'border-[#E64833] bg-red-50/40' : 'border-[#874F41]/40'
                  }`}
                />
              </div>
              {errors.pickup && <p className="text-[#E64833] text-xs mt-1 font-semibold">{errors.pickup}</p>}

              {/* Quick Suggestion Chips */}
              <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px]">
                <span className="font-semibold text-[#874F41] uppercase tracking-wider text-[10px]">Picks:</span>
                {['Mopa Airport (GOX)', 'Dabolim (GOI)', 'Madgaon Station', 'Calangute'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPickup(p)}
                    className="px-2 py-0.5 rounded-sm bg-[#90AEAD]/20 hover:bg-[#874F41] hover:text-[#FBE9D0] text-[#244855] border border-[#874F41]/20 transition-colors font-medium"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Location */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Drop Location <span className="text-[#E64833]">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#244855]" />
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="e.g. Baga Beach, Candolim, South Goa Resort, Outstation"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white border-2 rounded-sm text-sm text-[#244855] placeholder:text-slate-400 focus:outline-none focus:border-[#E64833] transition-colors ${
                    errors.drop ? 'border-[#E64833] bg-red-50/40' : 'border-[#874F41]/40'
                  }`}
                />
              </div>
              {errors.drop && <p className="text-[#E64833] text-xs mt-1 font-semibold">{errors.drop}</p>}

              {/* Quick Suggestion Chips */}
              <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px]">
                <span className="font-semibold text-[#874F41] uppercase tracking-wider text-[10px]">Picks:</span>
                {['Baga Beach', 'Panaji', 'Candolim', 'Palolem', 'Dabolim Airport'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDrop(p)}
                    className="px-2 py-0.5 rounded-sm bg-[#90AEAD]/20 hover:bg-[#874F41] hover:text-[#FBE9D0] text-[#244855] border border-[#874F41]/20 transition-colors font-medium"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Travel Date <span className="text-[#E64833]">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 bg-white border-2 rounded-sm text-sm text-[#244855] focus:outline-none focus:border-[#E64833] transition-colors ${
                    errors.date ? 'border-[#E64833]' : 'border-[#874F41]/40'
                  }`}
                />
              </div>
              {errors.date && <p className="text-[#E64833] text-xs mt-1 font-semibold">{errors.date}</p>}
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Pickup Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-[#874F41]/40 rounded-sm text-sm text-[#244855] focus:outline-none focus:border-[#E64833] transition-colors"
                />
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Passengers
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-[#874F41]/40 rounded-sm text-sm text-[#244855] focus:outline-none focus:border-[#E64833] transition-colors appearance-none"
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                  <option value={4}>4 Passengers (Standard)</option>
                  <option value={6}>6 Passengers (Ertiga MUV)</option>
                  <option value={7}>7 Passengers (Innova Crysta)</option>
                  <option value={12}>9–12 Passengers (Winger)</option>
                  <option value={17}>13–17 Passengers (Tempo)</option>
                  <option value={35}>35 Passengers (Coach)</option>
                  <option value={55}>55 Passengers (Bus)</option>
                </select>
              </div>
            </div>

            {/* Vehicle Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Vehicle Preference
              </label>
              <div className="relative">
                <Car className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-[#874F41]/40 rounded-sm text-sm text-[#244855] focus:outline-none focus:border-[#E64833] transition-colors appearance-none"
                >
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Name */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                Full Name <span className="text-[#E64833]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white border-2 rounded-sm text-sm text-[#244855] placeholder:text-slate-400 focus:outline-none focus:border-[#E64833] transition-colors ${
                    errors.customerName ? 'border-[#E64833] bg-red-50/40' : 'border-[#874F41]/40'
                  }`}
                />
              </div>
              {errors.customerName && <p className="text-[#E64833] text-xs mt-1 font-semibold">{errors.customerName}</p>}
            </div>

            {/* Mobile / WhatsApp Number */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1.5">
                WhatsApp / Phone Number <span className="text-[#E64833]">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#874F41]" />
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white border-2 rounded-sm text-sm text-[#244855] placeholder:text-slate-400 focus:outline-none focus:border-[#E64833] transition-colors ${
                    errors.mobileNumber ? 'border-[#E64833] bg-red-50/40' : 'border-[#874F41]/40'
                  }`}
                />
              </div>
              {errors.mobileNumber && <p className="text-[#E64833] text-xs mt-1 font-semibold">{errors.mobileNumber}</p>}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t-2 border-[#874F41]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Non-confirmation business notice */}
            <div className="flex items-start gap-2.5 text-xs text-[#874F41] max-w-xl">
              <Info className="w-4 h-4 text-[#E64833] shrink-0 mt-0.5" />
              <span>
                <strong>Operational Notice:</strong> Submitting an enquiry does not guarantee vehicle availability.
                Tanveer will confirm driver assignment and official pricing via WhatsApp or telephone.
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDirectSubmit}
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#244855] bg-[#90AEAD]/30 hover:bg-[#90AEAD]/50 border border-[#874F41]/40 rounded-sm transition-colors whitespace-nowrap"
              >
                Save Enquiry
              </button>

              <button
                type="submit"
                className="px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FBE9D0] bg-[#E64833] hover:bg-[#d43d29] active:bg-[#c23321] rounded-sm shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap hover:shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-[#FBE9D0]" />
                <span>SEND WHATSAPP ENQUIRY</span>
              </button>
            </div>
          </div>

          {/* Success Notification */}
          {submittedBookingId && (
            <div className="mt-6 p-4 rounded-sm bg-[#90AEAD]/20 border-2 border-[#244855] text-[#244855] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#244855] shrink-0" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide">
                    Enquiry Logged Ref: <span className="font-mono text-[#E64833]">{submittedBookingId}</span>
                  </p>
                  <p className="text-xs text-[#874F41]">
                    Tanveer (+91 86684 23516) has recorded your details. You can also send the prefilled WhatsApp message.
                  </p>
                </div>
              </div>
              <a
                href={buildCabWhatsAppUrl({
                  name: customerName,
                  phone: mobileNumber,
                  pickup,
                  drop,
                  date,
                  time,
                  passengers,
                  tripType: tripType === 'one-way' ? 'One-Way' : 'Round-Trip',
                  vehiclePreference: vehicle,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#244855] text-[#FBE9D0] hover:bg-[#1a353f] rounded-sm transition-colors whitespace-nowrap"
              >
                Open in WhatsApp Now
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
