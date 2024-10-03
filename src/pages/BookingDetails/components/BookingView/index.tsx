import React from 'react';
import { Button } from '../../../../components';
import Swal from 'sweetalert2';

interface Booking {
    id: string;
    clinic: string;
    dentist: string;
    services: string[];
    scheduleTime: string;
}

interface BookingViewProps {
    booking: Booking;
    bookingId: string | undefined;
}

export const BookingView: React.FC<BookingViewProps> = ({ booking, bookingId }) => {


const sendMap = () => {
    // Display a success message using Swal
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Map sent successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
    });
}

const cancelBooking = () => {
    // Display a confirmation dialog using Swal
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to cancel the booking?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Execute the cancellation logic here
            Swal.fire(
                'Cancelled!',
                'Your booking has been cancelled.',
                'success'
            );
        }
    });
}


    return (
        <div className="bg-white p-8 h-[550px] rounded-lg max-w-sm shadow-lg">
            <h2 className="text-lg font-medium text-accordionTitle mb-5">Booking Info</h2>
                <p className="text-sm text-accordionTitle flex justify-between mb-2.5">
                    <span className="font-semibold text-sm text-accordionTitle">Booking ID:</span>
                    <span className="text-brandPrimary"> #{bookingId}</span>
                </p>
                <p className="text-sm text-accordionTitle flex justify-between gap-4">
                    <span className="font-semibold text-accordionTitle">Selected Clinic:</span>
                    <span className="text-brandPrimary text-right"> {booking.clinic}</span>
                </p>
                <div className='w-full my-5 mx-auto h-[1px] rounded-full bg-accordionContent'></div>
                <p className="text-sm text-accordionTitle flex flex-col justify-between">
                    <span className="font-semibold text-accordionTitle mb-2.5">Selected Dentist:</span>
                    <span className="text-brandPrimary"> {booking.dentist}</span>
                </p>
                <div className='w-full my-5 mx-auto h-[1px] rounded-full bg-accordionContent'></div>
                <p className="text-sm text-accordionTitle flex flex-col justify-between">
                    <span className="font-semibold text-accordionTitle mb-2.5">Selected Services:</span>
                    <span className="text-brandPrimary"> {booking.services.join(', ')}</span>
                </p>
                <div className='w-full my-5 mx-auto h-[1.5px] rounded-full bg-accordionContent'></div>
                <p className="text-sm text-accordionTitle flex flex-col justify-between">
                    <span className="font-semibold text-accordionTitle mb-2.5">Schedule time:</span>
                    <div className='flex justify-between mb-2.5'>
                        <span className="text-brandPrimary"> {booking.scheduleTime}</span>
                        <a href="#" className="text-blue-600 hover:underline ml-2">Change time</a>
                    </div>
                </p>
            <div className="mt-4 space-y-4">
                <Button 
                    text="Send me map link by email" 
                    color='bg-brandPrimary'
                    size='w-full'
                    onClick={sendMap}
                />
                <button onClick={cancelBooking} className="text-accentColor  font-semibold hover:underline w-full">
                    Cancel booking
                </button>
            </div>
        </div>
    );
};