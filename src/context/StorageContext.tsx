import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingEnquiry, TourEnquiry, ContactMessage, Vehicle } from '../types';
import {
  INITIAL_DEMO_BOOKINGS,
  INITIAL_DEMO_TOURS,
  INITIAL_DEMO_CONTACTS,
  INITIAL_FLEET,
} from '../data/initialData';

interface StorageContextType {
  bookings: BookingEnquiry[];
  addBooking: (booking: Omit<BookingEnquiry, 'id' | 'createdAt' | 'status'>) => BookingEnquiry;
  updateBookingStatus: (id: string, status: BookingEnquiry['status']) => void;
  updateBookingNotes: (id: string, notes: string) => void;
  deleteBooking: (id: string) => void;

  tourEnquiries: TourEnquiry[];
  addTourEnquiry: (tour: Omit<TourEnquiry, 'id' | 'createdAt' | 'status'>) => TourEnquiry;
  updateTourStatus: (id: string, status: TourEnquiry['status']) => void;
  deleteTourEnquiry: (id: string) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => ContactMessage;
  updateContactStatus: (id: string, status: ContactMessage['status']) => void;
  deleteContactMessage: (id: string) => void;

  fleet: Vehicle[];
  toggleVehicleAvailability: (id: string) => void;
  updateVehicle: (id: string, updated: Partial<Vehicle>) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;

  resetToDemoData: () => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKINGS: 'goa_cab_bookings_v1',
  TOURS: 'goa_cab_tours_v1',
  CONTACTS: 'goa_cab_contacts_v1',
  FLEET: 'goa_cab_fleet_v1',
};

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  const [tourEnquiries, setTourEnquiries] = useState<TourEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOURS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_TOURS;
    } catch {
      return INITIAL_DEMO_TOURS;
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_CONTACTS;
    } catch {
      return INITIAL_DEMO_CONTACTS;
    }
  });

  const [fleet, setFleet] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FLEET);
      return saved ? JSON.parse(saved) : INITIAL_FLEET;
    } catch {
      return INITIAL_FLEET;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tourEnquiries));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [tourEnquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contactMessages));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [contactMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FLEET, JSON.stringify(fleet));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [fleet]);

  const addBooking = (data: Omit<BookingEnquiry, 'id' | 'createdAt' | 'status'>): BookingEnquiry => {
    const newBooking: BookingEnquiry = {
      ...data,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingEnquiry['status']) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const updateBookingNotes = (id: string, notes: string) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  };

  const addTourEnquiry = (data: Omit<TourEnquiry, 'id' | 'createdAt' | 'status'>): TourEnquiry => {
    const newEnquiry: TourEnquiry = {
      ...data,
      id: `TR-${Math.floor(500 + Math.random() * 500)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setTourEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateTourStatus = (id: string, status: TourEnquiry['status']) => {
    setTourEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteTourEnquiry = (id: string) => {
    setTourEnquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const addContactMessage = (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage => {
    const newMsg: ContactMessage = {
      ...data,
      id: `MSG-${Math.floor(300 + Math.random() * 700)}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    return newMsg;
  };

  const updateContactStatus = (id: string, status: ContactMessage['status']) => {
    setContactMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleVehicleAvailability = (id: string) => {
    setFleet((prev) =>
      prev.map((v) => (v.id === id ? { ...v, available: !v.available } : v))
    );
  };

  const updateVehicle = (id: string, updated: Partial<Vehicle>) => {
    setFleet((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
    );
  };

  const addVehicle = (data: Omit<Vehicle, 'id'>) => {
    const newV: Vehicle = {
      ...data,
      id: `veh-${Date.now()}`,
    };
    setFleet((prev) => [...prev, newV]);
  };

  const resetToDemoData = () => {
    setBookings(INITIAL_DEMO_BOOKINGS);
    setTourEnquiries(INITIAL_DEMO_TOURS);
    setContactMessages(INITIAL_DEMO_CONTACTS);
    setFleet(INITIAL_FLEET);
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(INITIAL_DEMO_TOURS));
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_DEMO_CONTACTS));
      localStorage.setItem(STORAGE_KEYS.FLEET, JSON.stringify(INITIAL_FLEET));
    } catch (e) {
      console.warn('Reset sync failed', e);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        bookings,
        addBooking,
        updateBookingStatus,
        updateBookingNotes,
        deleteBooking,
        tourEnquiries,
        addTourEnquiry,
        updateTourStatus,
        deleteTourEnquiry,
        contactMessages,
        addContactMessage,
        updateContactStatus,
        deleteContactMessage,
        fleet,
        toggleVehicleAvailability,
        updateVehicle,
        addVehicle,
        resetToDemoData,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
