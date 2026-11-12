import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { BUSINESS_CONFIG, buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { useStorage } from '../context/StorageContext';

export const ContactSection: React.FC = () => {
  const { addContactMessage } = useStorage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    addContactMessage({
      name,
      phone,
      email,
      subject: subject || 'General Travel Query',
      message,
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#FBE9D0] text-[#244855] border-t-2 border-[#874F41]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E64833] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E64833]" />
            <span>CHAPTER 07 // DIRECT DISPATCH &amp; BASE CONTACT</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#244855] tracking-tight leading-[0.95]">
            GET IN TOUCH WITH TANVEER
          </h2>
          <p className="mt-3 text-base text-[#874F41] font-sans-body leading-relaxed">
            Planning a custom expedition, early morning airport transfer, or corporate conference fleet? Reach out directly via telephone, WhatsApp, or through our dispatch message desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Call Card */}
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="block p-5 bg-white rounded-sm border-2 border-[#874F41]/30 hover:border-[#E64833] transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-[#244855] text-[#FBE9D0] group-hover:bg-[#E64833] flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#874F41] block">
                    DIRECT CALL // 24/7 AVAILABILITY
                  </span>
                  <span className="font-bebas text-2xl text-[#244855] group-hover:text-[#E64833] transition-colors block leading-tight">
                    {BUSINESS_CONFIG.phoneDisplay}
                  </span>
                  <span className="text-xs text-[#874F41] font-sans-body block">
                    Direct line to Tanveer for instant cab dispatch
                  </span>
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={buildGeneralWhatsAppUrl('Website Contact Inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-white rounded-sm border-2 border-[#874F41]/30 hover:border-[#244855] transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-[#874F41] text-[#FBE9D0] group-hover:bg-[#244855] flex items-center justify-center transition-colors">
                  <MessageSquare className="w-5 h-5 text-[#FBE9D0]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#874F41] block">
                    WHATSAPP FAST CHAT
                  </span>
                  <span className="font-bebas text-2xl text-[#244855] group-hover:text-[#874F41] transition-colors block leading-tight">
                    +91 86684 23516
                  </span>
                  <span className="text-xs text-[#874F41] font-sans-body block">
                    Share flight details &amp; receive instant quotations
                  </span>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="block p-5 bg-white rounded-sm border-2 border-[#874F41]/30 hover:border-[#874F41] transition-all group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-[#90AEAD]/30 text-[#244855] flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-[#244855]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#874F41] block">
                    OFFICIAL DISPATCH EMAIL
                  </span>
                  <span className="font-bold text-sm text-[#244855] block mt-0.5">
                    {BUSINESS_CONFIG.email}
                  </span>
                  <span className="text-xs text-[#874F41] font-sans-body block">
                    Corporate travel proposals &amp; receipts
                  </span>
                </div>
              </div>
            </a>

            {/* Base of Operations & Timings */}
            <div className="p-5 bg-[#244855] text-[#FBE9D0] rounded-sm border-2 border-[#874F41] shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#874F41] text-[#FBE9D0] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#E64833]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#90AEAD] block">
                    OPERATIONAL JURISDICTION
                  </span>
                  <span className="font-bebas text-2xl text-[#FBE9D0] block">
                    GOA, INDIA
                  </span>
                  <p className="text-xs text-[#90AEAD] mt-1 font-sans-body leading-relaxed">
                    Serving North Goa, South Goa, Mopa Airport (GOX), Dabolim (GOI), Madgaon (MAO) &amp; Thivim Railway stations, plus outstation routes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Message Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Verified Google Maps iframe */}
            <div className="bg-white rounded-sm border-2 border-[#874F41]/30 overflow-hidden shadow-sm">
              <div className="px-5 py-3 bg-[#244855] text-[#FBE9D0] border-b border-[#874F41] flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E64833]" /> GOA SERVICE LOCATION MAP
                </span>
                <span className="text-[#90AEAD] font-mono">15.4058°N, 73.7484°E</span>
              </div>
              <div className="relative h-64 sm:h-72 w-full bg-[#1a353f]">
                <iframe
                  title="Goa Cab N Taxi Service Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246083.82110260455!2d73.7483861877689!3d15.405786884631165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc7ed58be2199%3A0xb36605a963240212!2sGoa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Message Form in Retro Road-Trip Design */}
            <div className="bg-white rounded-sm border-2 border-[#874F41]/30 p-6 sm:p-8 shadow-sm">
              <h3 className="font-bebas text-2xl text-[#244855] tracking-wide mb-1">
                DISPATCH A MESSAGE TO TANVEER
              </h3>
              <p className="text-xs text-[#874F41] mb-6 font-sans-body">
                Have a specialized travel inquiry? Send a direct dispatch note and we will reply promptly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-sm bg-[#90AEAD]/20 border-2 border-[#244855] text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#244855] mx-auto mb-2" />
                  <h4 className="font-bebas text-2xl text-[#244855] tracking-wide">MESSAGE RECORDED</h4>
                  <p className="text-xs text-[#874F41] max-w-md mx-auto mb-4 font-sans-body">
                    Thank you, {name}. Your message has been logged for Tanveer. For immediate cab pickup, call or WhatsApp directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#244855] text-[#FBE9D0] rounded-sm hover:bg-[#E64833] transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                        Your Name <span className="text-[#E64833]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sameer Kapoor"
                        className="w-full p-2.5 bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                        Phone Number <span className="text-[#E64833]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full p-2.5 bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full p-2.5 bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Wedding transportation, Mopa pickup"
                        className="w-full p-2.5 bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#244855] mb-1">
                      Travel Details / Query <span className="text-[#E64833]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know your travel dates, passenger count, destinations or vehicle preferences..."
                      className="w-full p-2.5 bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-xs text-[#244855] focus:outline-none focus:border-[#E64833]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-sm bg-[#E64833] hover:bg-[#d43d29] text-[#FBE9D0] flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FBE9D0]" />
                    <span>SUBMIT DISPATCH NOTE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
