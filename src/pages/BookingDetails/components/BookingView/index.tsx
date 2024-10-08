import React, { useEffect, useState } from 'react';
import { Button } from '../../../../components';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom'
import { useApi } from '../../../../hooks';
import apiEndpoints from '../../../../apiEndpoints';


interface Booking {
    bookingId: number
    uniqueCode: string;
    clinic: string;
    status: string;
    dentist: string;
    selectedServices: string[];
    bookingDate: string
}


export const BookingView: React.FC = () => {

    const [booking, setBooking] = useState<Booking | null>(null)

    const { bookingId } = useParams()

    const { callApi, response } = useApi()
    const { callApi: sendMap, response: responseSendMap } = useApi()
   

    useEffect(() => {
        callApi({
            endpoint: apiEndpoints.bookings.getBookingView,
            params: {
                bookingId: bookingId
            }
        })
    }, [])

    useEffect(() => {
        if (response) {
            setBooking(response)
        }
    }, [response])

    const handleSendMap = () => {
        sendMap({
            endpoint: apiEndpoints.bookings.sendMaptoUser,
            params: {
                bookingId: bookingId
            }
        })
    }

    useEffect(() => {
        if(responseSendMap){
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Clinic Map mail has been sent to your email address successfully.',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
        
    }, [responseSendMap])

    const cancelBooking = () => {
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
                Swal.fire(
                    'Cancelled!',
                    'Your booking has been cancelled.',
                    'success'
                );
            }
        });
    }


    return (
        <div className="bg-white flex flex-col justify-between p-8 h-[550px] rounded-lg max-w-sm shadow-lg">
            <div>
                <h2 className="text-lg font-medium text-accordionTitle mb-5">Booking Info</h2>
                <p className="text-sm text-accordionTitle flex justify-between mb-2.5">
                    <span className="font-semibold text-sm text-accordionTitle">Booking ID:</span>
                    <span className="text-brandPrimary"> #{bookingId}</span>
                </p>
                <p className="text-sm text-accordionTitle flex justify-between gap-4">
                    <span className="font-semibold text-accordionTitle">Selected Clinic:</span>
                    <span className="text-brandPrimary text-right"> {booking?.clinic}</span>
                </p>
                <div className='w-full my-5 mx-auto h-[1px] rounded-full bg-accordionContent'></div>
                <p className="text-sm text-accordionTitle flex flex-col justify-between">
                    <span className="font-semibold text-accordionTitle mb-2.5">Selected Dentist:</span>
                    <span className="text-brandPrimary"> {booking?.dentist}</span>
                </p>
                <div className='w-full my-5 mx-auto h-[1px] rounded-full bg-accordionContent'></div>
                <p className="text-sm text-accordionTitle flex flex-col justify-between">
                    <span className="font-semibold text-accordionTitle mb-2.5">Selected Services:</span>
                    <span className="text-brandPrimary">{booking?.selectedServices.join(', ')}</span>
                </p>
                {
                    booking?.bookingDate &&
                    <>
                        <div className='w-full my-5 mx-auto h-[1.5px] rounded-full bg-accordionContent'></div>
                        <p className="text-sm text-accordionTitle flex flex-col justify-between">
                            <span className="font-semibold text-accordionTitle mb-2.5">Scheduled Date:</span>
                            <div className='flex justify-between mb-2.5'>
                                <span className="text-brandPrimary"> {booking?.bookingDate}</span>
                                <a href="#" className="text-blue-600 hover:underline ml-2">Change time</a>
                            </div>
                        </p>

                    </>
                }

            </div>

            <div className="mt-4 space-y-4">
                <Button
                    text="Send me map link by email"
                    color='bg-brandPrimary'
                    size='w-full'
                    onClick={handleSendMap}
                />
                <button onClick={cancelBooking} className="text-accentColor  font-semibold hover:underline w-full">
                    Cancel booking
                </button>
            </div>
        </div>
    );
};