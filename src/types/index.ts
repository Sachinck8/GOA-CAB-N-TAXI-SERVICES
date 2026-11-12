export interface BookingEnquiry {
  id: string;
  customerName: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  travelDate: string;
  pickupTime: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
  vehiclePreference: string;
  status: 'new' | 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
}

export interface TourEnquiry {
  id: string;
  tourId: string;
  tourName: string;
  customerName: string;
  phone: string;
  travelDate: string;
  guests: number;
  specialRequests?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Hatchback' | 'Sedan' | 'MUV / SUV' | 'Van' | 'Minibus' | 'Coach';
  seatingCapacity: number;
  luggageCapacity: string;
  ac: boolean;
  idealFor: string;
  description: string;
  imageUrl?: string;
  available: boolean;
}

export interface TourExperience {
  id: string;
  name: string;
  tagline: string;
  category: 'Water Sports & Sea' | 'Nature & Adventure' | 'Sightseeing & Heritage' | 'Cruises & Leisure';
  duration: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  fallbackGradient: string;
}

export interface CoreService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  icon: string;
}
