import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Compass,
  Car,
  Mail,
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useStorage } from '../context/StorageContext';
import { BookingEnquiry, TourEnquiry, ContactMessage, Vehicle } from '../types';
import { buildCabWhatsAppUrl, buildTourWhatsAppUrl, BUSINESS_CONFIG } from '../utils/whatsapp';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    bookings,
    updateBookingStatus,
    updateBookingNotes,
    deleteBooking,
    tourEnquiries,
    updateTourStatus,
    deleteTourEnquiry,
    contactMessages,
    updateContactStatus,
    deleteContactMessage,
    fleet,
    toggleVehicleAvailability,
    updateVehicle,
    addVehicle,
    resetToDemoData,
  } = useStorage();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'tours' | 'fleet' | 'contacts'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    category: 'Sedan' as Vehicle['category'],
    seatingCapacity: 4,
    luggageCapacity: '2 Suitcases',
    ac: true,
    idealFor: '',
    description: '',
    imageUrl: '/src/assets/images/fleet_travel_showcase_1794491625769.jpg',
    available: true,
  });

  // Calculate Metrics
  const totalEnquiries = bookings.length + tourEnquiries.length + contactMessages.length;
  const newBookings = bookings.filter((b) => b.status === 'new').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
  const totalTourEnquiries = tourEnquiries.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#E64833] text-[#FBE9D0] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> New
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#874F41] text-[#FBE9D0] uppercase tracking-wider">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#244855] text-[#FBE9D0] uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-[#90AEAD]" /> Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-slate-300 text-slate-700 uppercase tracking-wider">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#90AEAD]/40 text-[#244855] uppercase tracking-wider">
            Completed
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#874F41]/30 text-[#874F41] uppercase tracking-wider">
            Contacted
          </span>
        );
      case 'unread':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#E64833] text-[#FBE9D0] uppercase tracking-wider">
            Unread
          </span>
        );
      case 'replied':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#244855] text-[#FBE9D0] uppercase tracking-wider">
            Replied
          </span>
        );
      default:
        return <span className="text-xs text-[#874F41]">{status}</span>;
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.dropLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTours = tourEnquiries.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contactMessages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.name.trim()) return;
    addVehicle(newVehicle);
    setShowAddVehicleModal(false);
    setNewVehicle({
      name: '',
      category: 'Sedan',
      seatingCapacity: 4,
      luggageCapacity: '2 Suitcases',
      ac: true,
      idealFor: '',
      description: '',
      imageUrl: '/src/assets/images/fleet_travel_showcase_1794491625769.jpg',
      available: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#FBE9D0] text-[#244855] flex flex-col font-sans">
      {/* Top Retro Wire Banner */}
      <div className="bg-[#244855] text-[#FBE9D0] px-4 py-2 text-xs font-bold uppercase tracking-wider flex flex-col sm:flex-row items-center justify-between gap-2 border-b-2 border-[#874F41]">
        <div className="flex items-center gap-2">
          <span className="bg-[#E64833] text-[#FBE9D0] px-2 py-0.5 rounded-sm text-[10px] font-mono">
            DEMO CONSOLE
          </span>
          <span>
            OPERATOR WORKSPACE // LOCAL PERSISTENCE · READY FOR N8N WEBHOOK INTEGRATION
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetToDemoData}
            className="flex items-center gap-1 px-3 py-1 rounded-sm bg-[#874F41] hover:bg-[#a05f4f] text-[#FBE9D0] text-[11px] font-bold transition-colors"
            title="Reset data to demo defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET DEMO DATA</span>
          </button>
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1 px-3 py-1 rounded-sm bg-[#E64833] text-[#FBE9D0] hover:bg-[#d43d29] text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO SITE</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
        {/* Console Header */}
        <div className="bg-white rounded-sm border-2 border-[#874F41]/30 p-6 mb-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E64833] uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>DISPATCH CONSOLE // GOA CAB N TAXI SERVICES</span>
            </div>
            <h1 className="font-bebas text-3xl sm:text-4xl text-[#244855] tracking-wide">
              OPERATIONS, EXPEDITIONS &amp; FLEET
            </h1>
            <p className="text-xs text-[#874F41] font-mono mt-0.5">
              LEAD OPERATOR: TANVEER · +91 86684 23516 · GOACABNTAXI@GMAIL.COM
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FBE9D0] border-2 border-[#874F41]/40 rounded-sm">
            <button
              onClick={() => { setActiveTab('overview'); setStatusFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'overview' ? 'bg-[#244855] text-[#FBE9D0] shadow-sm' : 'text-[#874F41] hover:text-[#244855]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>OVERVIEW</span>
            </button>

            <button
              onClick={() => { setActiveTab('bookings'); setStatusFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'bookings' ? 'bg-[#244855] text-[#FBE9D0] shadow-sm' : 'text-[#874F41] hover:text-[#244855]'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>BOOKINGS ({bookings.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('tours'); setStatusFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'tours' ? 'bg-[#244855] text-[#FBE9D0] shadow-sm' : 'text-[#874F41] hover:text-[#244855]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>TOURS ({tourEnquiries.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('fleet'); setStatusFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'fleet' ? 'bg-[#244855] text-[#FBE9D0] shadow-sm' : 'text-[#874F41] hover:text-[#244855]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>FLEET ({fleet.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('contacts'); setStatusFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'contacts' ? 'bg-[#244855] text-[#FBE9D0] shadow-sm' : 'text-[#874F41] hover:text-[#244855]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>MESSAGES ({contactMessages.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-sm border-2 border-[#874F41]/30 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#874F41] block">
                  TOTAL ENQUIRIES
                </span>
                <span className="font-bebas text-3xl text-[#244855] mt-1 block">
                  {totalEnquiries}
                </span>
                <span className="text-[10px] text-[#874F41] block font-sans-body">All channels</span>
              </div>

              <div className="bg-white p-5 rounded-sm border-2 border-[#E64833] shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E64833] block">
                  NEW CAB REQUESTS
                </span>
                <span className="font-bebas text-3xl text-[#E64833] mt-1 block">
                  {newBookings}
                </span>
                <span className="text-[10px] text-[#E64833] block font-sans-body">Action needed</span>
              </div>

              <div className="bg-white p-5 rounded-sm border-2 border-[#874F41] shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#874F41] block">
                  PENDING CONFIRMATION
                </span>
                <span className="font-bebas text-3xl text-[#874F41] mt-1 block">
                  {pendingBookings}
                </span>
                <span className="text-[10px] text-[#874F41] block font-sans-body">Quote shared</span>
              </div>

              <div className="bg-white p-5 rounded-sm border-2 border-[#244855] shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#244855] block">
                  CONFIRMED TRIPS
                </span>
                <span className="font-bebas text-3xl text-[#244855] mt-1 block">
                  {confirmedBookings}
                </span>
                <span className="text-[10px] text-[#244855] block font-sans-body">Driver assigned</span>
              </div>

              <div className="bg-white p-5 rounded-sm border-2 border-[#90AEAD] shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#244855] block">
                  TOUR ENQUIRIES
                </span>
                <span className="font-bebas text-3xl text-[#244855] mt-1 block">
                  {totalTourEnquiries}
                </span>
                <span className="text-[10px] text-[#874F41] block font-sans-body">Dudhsagar / Scuba</span>
              </div>

              <div className="bg-white p-5 rounded-sm border-2 border-slate-300 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  CANCELLED
                </span>
                <span className="font-bebas text-3xl text-slate-600 mt-1 block">
                  {cancelledBookings}
                </span>
                <span className="text-[10px] text-slate-500 block font-sans-body">Postponed / cancelled</span>
              </div>
            </div>

            {/* Recent Booking Enquiries Table */}
            <div className="bg-white rounded-sm border-2 border-[#874F41]/30 shadow-md overflow-hidden">
              <div className="p-5 bg-[#244855] text-[#FBE9D0] flex items-center justify-between border-b-2 border-[#874F41]">
                <div>
                  <h3 className="font-bebas text-2xl tracking-wide">RECENT INBOUND CAB REQUESTS</h3>
                  <p className="text-xs text-[#90AEAD]">Live dispatch feed from online and WhatsApp forms</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold uppercase tracking-wider text-[#E64833] hover:text-[#FBE9D0]"
                >
                  VIEW FULL LEDGER &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBE9D0]/60 text-[#874F41] font-bold uppercase tracking-wider border-b border-[#874F41]/30 text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Route</th>
                      <th className="py-3 px-4">Date &amp; Time</th>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Dispatch Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#874F41]/10">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-[#FBE9D0]/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#E64833]">{b.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#244855]">{b.customerName}</div>
                          <div className="text-[#874F41] text-[11px] font-mono">{b.phone}</div>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="truncate text-[#244855] font-semibold">
                            <span className="text-[#874F41]">FROM:</span> {b.pickupLocation}
                          </div>
                          <div className="truncate text-[#874F41] text-[11px]">
                            <span className="text-[#244855]">TO:</span> {b.dropLocation}
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-[#244855]">{b.travelDate}</div>
                          <div className="text-[#874F41] text-[11px]">{b.pickupTime} ({b.tripType})</div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-medium text-[#244855]">
                          {b.vehiclePreference}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {getStatusBadge(b.status)}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <a
                            href={buildCabWhatsAppUrl({
                              name: b.customerName,
                              phone: b.phone,
                              pickup: b.pickupLocation,
                              drop: b.dropLocation,
                              date: b.travelDate,
                              time: b.pickupTime,
                              passengers: b.passengers,
                              tripType: b.tripType,
                              vehiclePreference: b.vehiclePreference,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FBE9D0] bg-[#244855] hover:bg-[#E64833] rounded-sm transition-colors"
                          >
                            <MessageSquare className="w-3 h-3 text-[#90AEAD]" /> WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKING MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-sm border-2 border-[#874F41]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by customer, phone, route, ref..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm focus:outline-none focus:border-[#E64833]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-[#874F41]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-[#244855] font-bold uppercase tracking-wider"
                >
                  <option value="all">ALL STATUSES ({bookings.length})</option>
                  <option value="new">NEW ({newBookings})</option>
                  <option value="pending">PENDING ({pendingBookings})</option>
                  <option value="confirmed">CONFIRMED ({confirmedBookings})</option>
                  <option value="completed">COMPLETED</option>
                  <option value="cancelled">CANCELLED ({cancelledBookings})</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-sm border-2 border-[#874F41]/30 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#244855] text-[#FBE9D0] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Ref &amp; Timestamp</th>
                      <th className="py-3.5 px-4">Customer Info</th>
                      <th className="py-3.5 px-4">Route Origin / Dest</th>
                      <th className="py-3.5 px-4">Date, Pax &amp; Vehicle</th>
                      <th className="py-3.5 px-4">Status &amp; Driver Notes</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#874F41]/10">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FBE9D0]/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-mono font-bold text-[#E64833]">{b.id}</div>
                          <div className="text-[10px] text-[#874F41] font-mono">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-[#244855]">{b.customerName}</div>
                          <a
                            href={`tel:${b.phone}`}
                            className="text-[#874F41] hover:underline text-[11px] font-mono flex items-center gap-1 mt-0.5"
                          >
                            <Phone className="w-3 h-3 text-[#E64833]" /> {b.phone}
                          </a>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="text-[#244855] font-semibold truncate">
                            <span className="text-[#874F41]">PICKUP:</span> {b.pickupLocation}
                          </div>
                          <div className="text-[#874F41] text-[11px] truncate mt-0.5">
                            <span className="text-[#244855]">DROP:</span> {b.dropLocation}
                          </div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-[#244855]">{b.travelDate} @ {b.pickupTime}</div>
                          <div className="text-[#874F41] text-[11px]">
                            {b.passengers} Pax · {b.tripType}
                          </div>
                          <div className="text-[#244855] font-semibold text-[11px] mt-0.5">
                            {b.vehiclePreference}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingEnquiry['status'])}
                              className="px-2 py-1 text-xs font-bold rounded-sm border-2 border-[#874F41]/40 bg-white"
                            >
                              <option value="new">New</option>
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            value={b.notes || ''}
                            onChange={(e) => updateBookingNotes(b.id, e.target.value)}
                            placeholder="Chauffeur / quote notes..."
                            className="w-full text-[11px] p-1 border border-[#874F41]/40 rounded-sm bg-[#FBE9D0]/30"
                          />
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={buildCabWhatsAppUrl({
                                name: b.customerName,
                                phone: b.phone,
                                pickup: b.pickupLocation,
                                drop: b.dropLocation,
                                date: b.travelDate,
                                time: b.pickupTime,
                                passengers: b.passengers,
                                tripType: b.tripType,
                                vehiclePreference: b.vehiclePreference,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-[#244855] hover:bg-[#E64833] text-[#FBE9D0] rounded-sm transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => deleteBooking(b.id)}
                              className="p-1.5 text-slate-400 hover:text-[#E64833] rounded-sm transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TOUR MANAGEMENT */}
        {activeTab === 'tours' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-sm border-2 border-[#874F41]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tour by name, customer, ref..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm focus:outline-none focus:border-[#E64833]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#874F41]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-[#244855] font-bold uppercase tracking-wider"
                >
                  <option value="all">ALL TOUR STATUSES</option>
                  <option value="new">NEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="confirmed">CONFIRMED</option>
                  <option value="cancelled">CANCELLED</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-sm border-2 border-[#874F41]/30 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#244855] text-[#FBE9D0] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Ref &amp; Tour Activity</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Travel Date &amp; Guests</th>
                      <th className="py-3.5 px-4">Special Notes</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#874F41]/10">
                    {filteredTours.map((t) => (
                      <tr key={t.id} className="hover:bg-[#FBE9D0]/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-mono font-bold text-[#E64833]">{t.id}</div>
                          <div className="font-bebas text-lg text-[#244855] mt-0.5">{t.tourName}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-[#244855]">{t.customerName}</div>
                          <a href={`tel:${t.phone}`} className="text-[#874F41] font-mono text-[11px] flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#E64833]" /> {t.phone}
                          </a>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-[#244855]">{t.travelDate}</div>
                          <div className="text-[#874F41] text-[11px]">{t.guests} Guests</div>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <p className="text-[#874F41] text-[11px] line-clamp-2 font-sans-body">
                            {t.specialRequests || 'No special requests'}
                          </p>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <select
                            value={t.status}
                            onChange={(e) => updateTourStatus(t.id, e.target.value as TourEnquiry['status'])}
                            className="px-2 py-1 text-xs font-bold rounded-sm border-2 border-[#874F41]/40 bg-white"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={buildTourWhatsAppUrl({
                                tourName: t.tourName,
                                name: t.customerName,
                                phone: t.phone,
                                date: t.travelDate,
                                guests: t.guests,
                                notes: t.specialRequests,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-[#244855] hover:bg-[#E64833] text-[#FBE9D0] rounded-sm transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => deleteTourEnquiry(t.id)}
                              className="p-1.5 text-slate-400 hover:text-[#E64833] rounded-sm transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FLEET MANAGEMENT */}
        {activeTab === 'fleet' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-sm border-2 border-[#874F41]/30 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-bebas text-2xl text-[#244855]">FLEET INVENTORY &amp; ALLOCATION</h3>
                <p className="text-xs text-[#874F41]">Toggle live availability, adjust passenger limits, or register new vehicles</p>
              </div>

              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#E64833] hover:bg-[#d43d29] text-[#FBE9D0] rounded-sm flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>ADD VEHICLE</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {fleet.map((veh) => (
                <div key={veh.id} className="bg-white p-5 rounded-sm border-2 border-[#874F41]/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#874F41]">
                        {veh.category}
                      </span>
                      <button
                        onClick={() => toggleVehicleAvailability(veh.id)}
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm cursor-pointer ${
                          veh.available
                            ? 'bg-[#244855] text-[#FBE9D0]'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {veh.available ? 'AVAILABLE' : 'RESERVED'}
                      </button>
                    </div>

                    <h4 className="font-bebas text-2xl text-[#244855] leading-none">{veh.name}</h4>
                    <p className="text-xs text-[#874F41] mt-1 line-clamp-2 font-sans-body">{veh.description}</p>

                    <div className="mt-4 pt-3 border-t border-[#874F41]/20 text-xs text-[#244855] space-y-1 font-sans-body">
                      <div><strong>Capacity:</strong> {veh.seatingCapacity} Passengers</div>
                      <div><strong>Luggage:</strong> {veh.luggageCapacity}</div>
                      <div><strong>AC:</strong> {veh.ac ? 'Climate Controlled' : 'Non-AC'}</div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#874F41]/20 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-[#874F41]">ID: {veh.id}</span>
                    <button
                      onClick={() => toggleVehicleAvailability(veh.id)}
                      className="text-xs font-bold text-[#E64833] hover:underline uppercase"
                    >
                      TOGGLE STATUS
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Vehicle Modal */}
            {showAddVehicleModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244855]/85 backdrop-blur-sm">
                <div className="bg-[#FBE9D0] rounded-sm max-w-md w-full p-6 shadow-2xl border-2 border-[#244855]">
                  <h3 className="font-bebas text-2xl text-[#244855] mb-4">REGISTER FLEET VEHICLE</h3>
                  <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-[#244855] mb-1">Model / Name</label>
                      <input
                        type="text"
                        required
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                        placeholder="e.g. Kia Carens / Urban Cruiser"
                        className="w-full p-2 bg-white border-2 border-[#874F41]/40 rounded-sm text-[#244855]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#244855] mb-1">Category</label>
                        <select
                          value={newVehicle.category}
                          onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value as Vehicle['category'] })}
                          className="w-full p-2 bg-white border-2 border-[#874F41]/40 rounded-sm"
                        >
                          <option value="Hatchback">Hatchback</option>
                          <option value="Sedan">Sedan</option>
                          <option value="MUV / SUV">MUV / SUV</option>
                          <option value="Van">Van</option>
                          <option value="Minibus">Minibus</option>
                          <option value="Coach">Coach</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[#244855] mb-1">Seats</label>
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={newVehicle.seatingCapacity}
                          onChange={(e) => setNewVehicle({ ...newVehicle, seatingCapacity: Number(e.target.value) })}
                          className="w-full p-2 bg-white border-2 border-[#874F41]/40 rounded-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-[#244855] mb-1">Luggage Space</label>
                      <input
                        type="text"
                        value={newVehicle.luggageCapacity}
                        onChange={(e) => setNewVehicle({ ...newVehicle, luggageCapacity: e.target.value })}
                        placeholder="e.g. 3 Suitcases"
                        className="w-full p-2 bg-white border-2 border-[#874F41]/40 rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-[#244855] mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newVehicle.description}
                        onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                        placeholder="Vehicle details..."
                        className="w-full p-2 bg-white border-2 border-[#874F41]/40 rounded-sm"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t-2 border-[#874F41]/20">
                      <button
                        type="button"
                        onClick={() => setShowAddVehicleModal(false)}
                        className="px-4 py-2 rounded-sm bg-[#90AEAD]/30 font-bold uppercase tracking-wider text-[#244855]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-sm bg-[#E64833] hover:bg-[#d43d29] font-bold uppercase tracking-wider text-[#FBE9D0]"
                      >
                        Save Vehicle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CONTACT MESSAGES */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-sm border-2 border-[#874F41]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#874F41]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search messages by name, email, query..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm focus:outline-none focus:border-[#E64833]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#874F41]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FBE9D0]/30 border-2 border-[#874F41]/40 rounded-sm text-[#244855] font-bold uppercase tracking-wider"
                >
                  <option value="all">ALL MESSAGE STATUSES</option>
                  <option value="unread">UNREAD</option>
                  <option value="replied">REPLIED</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-sm border-2 border-[#874F41]/30 shadow-md overflow-hidden">
              <div className="divide-y divide-[#874F41]/10">
                {filteredContacts.map((msg) => (
                  <div key={msg.id} className="p-5 hover:bg-[#FBE9D0]/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#E64833]">{msg.id}</span>
                        {getStatusBadge(msg.status)}
                        <span className="text-[10px] text-[#874F41] font-mono">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h4 className="font-bebas text-xl text-[#244855] tracking-wide">{msg.subject}</h4>
                      <p className="text-xs text-[#874F41] font-sans-body leading-relaxed">{msg.message}</p>
                      <div className="flex items-center gap-4 text-xs text-[#244855] pt-1 font-mono">
                        <span><strong>FROM:</strong> {msg.name}</span>
                        <span><strong>PHONE:</strong> {msg.phone}</span>
                        {msg.email && <span><strong>EMAIL:</strong> {msg.email}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={msg.status}
                        onChange={(e) => updateContactStatus(msg.id, e.target.value as ContactMessage['status'])}
                        className="px-2 py-1 text-xs font-bold rounded-sm border-2 border-[#874F41]/40 bg-white"
                      >
                        <option value="unread">Mark Unread</option>
                        <option value="read">Mark Read</option>
                        <option value="replied">Mark Replied</option>
                      </select>

                      <a
                        href={`https://wa.me/${msg.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hello ${msg.name}, Tanveer from Goa Cab N Taxi Services here regarding your inquiry: "${msg.subject}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-sm bg-[#244855] hover:bg-[#E64833] text-[#FBE9D0] text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>REPLY VIA WHATSAPP</span>
                      </a>

                      <button
                        onClick={() => deleteContactMessage(msg.id)}
                        className="p-2 text-slate-400 hover:text-[#E64833] rounded-sm transition-colors"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
