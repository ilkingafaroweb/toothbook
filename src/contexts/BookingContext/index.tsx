import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BookingData {
    date: string;
    time: string;
    service: string;
}

interface BookingContextType {
    modalBooking: boolean;
    isBookingOpen: boolean;
    bookingData: BookingData | null;
    openBooking: (clinicId: number, clinicName: string) => void;
    modalToggle: () => void;
    closeBooking: () => void;
    clinicId: number | null;
    clinicName: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalBooking, setModalBooking] = useState(true)
    const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [clinicId, setClinicId] = useState<number | null>(null)
    const [clinicName, setClinicName] = useState<string | null>(null)

    const openBooking = (clinicId: number, name: string) => {
        setClinicId(clinicId)
        setClinicName(name)
        setIsBookingOpen(true);
        // setBookingData(data);
    };

    const closeBooking = () => {
        setClinicId(null)
        setIsBookingOpen(false);
        setBookingData(null);
        setModalBooking(true)
    };

    const modalToggle = () => {
        setModalBooking(!modalBooking)
    }

    return (
        <BookingContext.Provider
            value={{ modalBooking, isBookingOpen, bookingData, openBooking, clinicName, closeBooking, clinicId, modalToggle }}
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
