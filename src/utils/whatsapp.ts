export const BUSINESS_CONFIG = {
  name: 'Goa Cab N Taxi Services',
  contactPerson: 'Tanveer',
  phoneDisplay: '+91 86684 23516',
  phoneRaw: '918668423516',
  email: 'goacabntaxi@gmail.com',
  location: 'Goa, India',
  website: 'https://goacabntaxi.com/',
  digitalPartner: 'SaaKora',
  digitalPartnerTagline: 'Building the core of your digital presence.',
};

export interface CabEnquiryPayload {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  passengers: number | string;
  tripType: string;
  vehiclePreference: string;
}

export function buildCabWhatsAppUrl(payload: CabEnquiryPayload): string {
  const message = `Hello Goa Cab N Taxi Services,

I would like to enquire about a cab booking.

Name: ${payload.name || 'Not specified'}
Phone: ${payload.phone || 'Not specified'}
Pickup: ${payload.pickup || 'Not specified'}
Drop: ${payload.drop || 'Not specified'}
Date: ${payload.date || 'Flexible'}
Time: ${payload.time || 'Flexible'}
Passengers: ${payload.passengers || '1'}
Trip Type: ${payload.tripType || 'One-way'}
Vehicle Preference: ${payload.vehiclePreference || 'Any suitable'}

Please share availability and quotation.`;

  return `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export interface TourEnquiryPayload {
  tourName: string;
  name: string;
  phone: string;
  date: string;
  guests: number | string;
  notes?: string;
}

export function buildTourWhatsAppUrl(payload: TourEnquiryPayload): string {
  const message = `Hello Goa Cab N Taxi Services,

I would like to enquire about the ${payload.tourName} experience.

Name: ${payload.name || 'Not specified'}
Phone: ${payload.phone || 'Not specified'}
Travel Date: ${payload.date || 'Flexible'}
Guests: ${payload.guests || '1'}
Special Requests: ${payload.notes && payload.notes.trim() ? payload.notes : 'None'}

Please share availability and package details.`;

  return `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(subject?: string): string {
  const message = `Hello Goa Cab N Taxi Services,

I would like to enquire about your Goa taxi and travel services.${subject ? `\n\nTopic: ${subject}` : ''}

Please assist me.`;

  return `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${encodeURIComponent(message)}`;
}
