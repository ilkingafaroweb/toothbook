// BookingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for booking data
interface BookingData {
    date: string;
    time: string;
    service: string;
}

interface BookingContextType {
    isBookingOpen: boolean;
    bookingData: BookingData | null;
    openBooking: () => void;
    closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);

    const openBooking = () => {
        // setBookingData(data);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        setBookingData(null);
    };

    return (
        <BookingContext.Provider
            value={{ isBookingOpen, bookingData, openBooking, closeBooking }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = (): BookingContextType => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
