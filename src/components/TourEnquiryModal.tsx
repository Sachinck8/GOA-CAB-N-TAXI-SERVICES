import React, { useState } from 'react';
import { X, Calendar, Users, Phone, User, MessageSquare, AlertCircle, CheckCircle, Compass } from 'lucide-react';
import { TourExperience } from '../types';
import { useStorage } from '../context/StorageContext';
import { buildTourWhatsAppUrl, BUSINESS_CONFIG } from '../utils/whatsapp';

interface TourEnquiryModalProps {
  tour: TourExperience | null;
  onClose: () => void;
}

export const TourEnquiryModal: React.FC<TourEnquiryModalProps> = ({ tour, onClose }) => {
  const { addTourEnquiry } = useStorage();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!tour) return null;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name');
      return;
    }
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    addTourEnquiry({
      tourId: tour.id,
      tourName: tour.name,
      customerName: name,
      phone: mobileNumber,
      travelDate: date,
      guests,
      specialRequests,
    });

    const waUrl = buildTourWhatsAppUrl({
      tourName: tour.name,
      name,
      phone: mobileNumber,
      date,
      guests,
      notes: specialRequests,
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  const handleDirectRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name');
      return;
    }
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    addTourEnquiry({
      tourId: tour.id,
      tourName: tour.name,
      customerName: name,
      phone: mobileNumber,
      travelDate: date,
      guests,
      specialRequests,
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244855]/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FBE9D0] rounded-sm max-w-lg w-full shadow-2xl border-2 border-[#244855] overflow-hidden relative text-[#244855]">
        {/* Header */}
        <div className="bg-[#244855] text-[#FBE9D0] p-6 flex items-start justify-between border-b-2 border-[#874F41]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E64833] uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4" />
              <span>EXPEDITION MANIFEST</span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide text-[#FBE9D0]">{tour.name}</h3>
            <p className="text-xs text-[#90AEAD] mt-0.5">{tour.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#90AEAD] hover:text-[#FBE9D0] p-1 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-sm bg-[#244855] text-[#FBE9D0] mx-auto flex items-center justify-center mb-4 border border-[#874F41]">
                <CheckCircle className="w-6 h-6 text-[#E64833]" />
              </div>
              <h4 className="font-bebas text-2xl text-[#244855] mb-2 tracking-wide">
                ENQUIRY DISPATCHED
              </h4>
              <p className="text-xs text-[#874F41] mb-6 max-w-sm mx-auto font-sans-body">
                Thank you! Tanveer from Goa Cab N Taxi Services will connect with you via WhatsApp/Phone with verified seasonal schedules, boat permits, and custom quotes.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-sm bg-[#90AEAD]/30 hover:bg-[#90AEAD]/50 text-xs font-bold uppercase tracking-wider text-[#244855]"
                >
                  Close Window
                </button>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="px-5 py-2.5 rounded-sm bg-[#E64833] hover:bg-[#d43d29] text-xs font-bold uppercase tracking-wider text-[#FBE9D0] flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Tanveer</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-100 text-red-800 text-xs rounded-sm flex items-center gap-2 border border-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                  Full Name <span className="text-[#E64833]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. Priya Sharma"
                    className="w-full pl-9 pr-3 py-2 bg-white border-2 border-[#874F41]/40 rounded-sm text-sm text-[#244855] focus:outline-none focus:border-[#E64833]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                  WhatsApp / Contact Mobile <span className="text-[#E64833]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setError('');
                    }}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-white border-2 border-[#874F41]/40 rounded-sm text-sm text-[#244855] focus:outline-none focus:border-[#E64833]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 bg-white border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-9 pr-2 py-2 bg-white border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833] appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                  Pickup Hotel or Special Request
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Pickup from Candolim, private jeep safari preference..."
                  className="w-full p-2.5 bg-white border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                />
              </div>

              <div className="pt-2 text-[11px] text-[#874F41] font-sans-body">
                <em>* Note: Excursion pricing depends on season and group size. Tanveer will confirm official rates upon WhatsApp connection.</em>
              </div>

              <div className="pt-4 border-t-2 border-[#874F41]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleDirectRecord}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#244855] bg-[#90AEAD]/30 hover:bg-[#90AEAD]/50 rounded-sm transition-colors"
                >
                  Save Enquiry
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FBE9D0] bg-[#E64833] hover:bg-[#d43d29] rounded-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
