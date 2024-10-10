import { faArrowUpRightFromSquare, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from 'antd';
import Swal from "sweetalert2";
import { useApi } from "../../../../hooks";
import apiEndpoints from "../../../../apiEndpoints";
import { Loading, Error } from "../../../../components";
import { useNavigate } from "react-router-dom";

type Booking = {
    id: number;
    uniqueCode: string;
    scheduledDate: string;
    clinic: string;
    services: string[];
    bookingStatus: string;
    rewardStatus: string;
};


export const BookingsTable: React.FC = () => {
    const navigate = useNavigate();

    const { callApi, loading, error, response } = useApi();
    const { callApi: callBookingAccept, error: errorBookingAccept, response: responseBookingAccept } = useApi();
    const { callApi: callBookingDecline, error: errorBookingDecline, response: responseBookingDecline } = useApi();

    const [bookings, setBookings] = useState<Booking[]>([])
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClinic, setSelectedClinic] = useState("All Clinics");
    const [selectedService, setSelectedService] = useState("All Services");

    if (responseBookingAccept) {
        Swal.fire({
            title: 'Accepted!',
            text: responseBookingAccept,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    if (errorBookingAccept) {
        Swal.fire({
            title: 'Error!',
            text: errorBookingAccept,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    if (responseBookingDecline) {
        Swal.fire({
            title: 'Declined!',
            text: responseBookingDecline,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }


    if (errorBookingDecline) {
        Swal.fire({
            title: 'Error!',
            text: errorBookingDecline,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }


    const clinicsSet = new Set<string>();
    const servicesSet = new Set<string>();

    bookings?.forEach((booking) => {
        clinicsSet.add(booking.clinic);
        const servicesArray = Array.isArray(booking.services)
            ? booking.services
            : [booking.services];

        servicesArray.forEach(service => servicesSet.add(service));
    });

    const getBookingDetails = (id: number) => {
        navigate(`/bookings/${id}`);
    };

    useEffect(() => {
        callApi({ endpoint: apiEndpoints.bookings.get });
    }, [])

    useEffect(() => {
        { response && setBookings(response?.myBookings) }
    }, [response])

    const handleAccept = useCallback((id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to accept this booking!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                callBookingAccept({
                    method: "POST",
                    endpoint: apiEndpoints.bookings.accept,
                    params: {
                        bookingId: id
                    }
                });
            }
        });
    }, [callBookingAccept]);


    const handleDecline = (id: number) => {

        Swal.fire({
            title: 'Are you sure ?',
            text: "The clinic has proposed a new booking date. Does this date work for you ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                callBookingDecline({
                    method: "POST",
                    endpoint: apiEndpoints.bookings.decline,
                    params: {
                        bookingId: id
                    }
                });
            }
        });
    };

    const clinics = ["All Clinics", ...Array.from(clinicsSet)];
    const services = ["All Services", ...Array.from(servicesSet)];

    const filteredBookings = bookings?.filter((booking) => {
        const matchesClinic =
            selectedClinic === "All Clinics" || booking.clinic === selectedClinic;

        const servicesArray = Array.isArray(booking.services)
            ? booking.services
            : [booking.services];

        const matchesService =
            selectedService === "All Services" || servicesArray.includes(selectedService);

        const matchesSearch =
            booking.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            servicesArray.some(service => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
            booking.uniqueCode.includes(searchQuery);

        return matchesClinic && matchesService && matchesSearch;
    });


    return (
        loading ? (<Loading />) : error ? (<Error />) : (
            <React.Fragment>
                <div className="hidden lg:block container mx-auto rounded-lg p-8 shadow-table">
                    <div className="flex flex-col md:flex-row md:justify-end gap-6 items-center mb-4 space-y-2 md:space-y-0">
                        <select
                            className="p-2 bg-bookingButton rounded-full w-full md:w-auto outline-none"
                            value={selectedClinic}
                            onChange={(e) => setSelectedClinic(e.target.value)}
                        >
                            {clinics.map((clinic) => (
                                <option key={clinic} value={clinic}>
                                    {clinic}
                                </option>
                            ))}
                        </select>

                        <select
                            className="p-2 bg-bookingButton rounded-full w-full md:w-auto outline-none"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                        >
                            {services.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            className="p-2 bg-bookingButton rounded-full w-full md:w-auto outline-none"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <table className="min-w-full text-accordionTitle">
                        <thead className="text-center">
                            <tr className="border-b text-lg ">
                                <th className="px-4 py-2 font-medium">#</th>
                                <th className="px-4 py-2 font-medium">Scheduled Date</th>
                                <th className="px-4 py-2 font-medium">Clinic</th>
                                <th className="px-4 py-2 font-medium">Services</th>
                                <th className="px-4 py-2 font-medium">Booking Status</th>
                                <th className="px-4 py-2 font-medium">Reward Status</th>
                                <th className="px-4 py-2 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredBookings?.map((booking) => (
                                <tr key={booking.id} className="border-b text-sm">
                                    <td className="px-4 py-2">{booking.uniqueCode}</td>
                                    <td className="px-4 py-2">{booking.scheduledDate}</td>
                                    <td className="px-4 py-2">{booking.clinic}</td>
                                    <td className="px-4 py-2">{Array.isArray(booking.services) ? booking.services.join(", ") : booking.services}</td>
                                    <td className="px-4 py-2">
                                        <div className="bg-bookingStatus py-2 text-brandPrimary font-semibold rounded">
                                            {booking.bookingStatus}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-bookingApplied">
                                        {booking.rewardStatus}
                                    </td>

                                    <td className="px-4 py-2 flex items-center gap-3">
                                        <Tooltip title="Accept booking date offer">
                                            <button className="bg-bookingButton text-white px-3 py-2 rounded" onClick={() => getBookingDetails(booking.id)}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" className="text-bookingView" />
                                            </button>
                                        </Tooltip>
                                        {
                                            booking.bookingStatus.toLowerCase() === 'awaiting your confirmation' && <Tooltip title="Accept Booking">
                                                <button className="bg-bookingButton text-white px-3 py-2 rounded" onClick={() => handleAccept(booking.id)}>
                                                    <FontAwesomeIcon icon={faCheck} size="lg" className="text-bookingAccept" />
                                                </button>
                                            </Tooltip>
                                        }
                                        {
                                            (booking.bookingStatus.toLowerCase() === 'scheduled' ||
                                                booking.bookingStatus.toLowerCase() === 'awaiting your confirmation' ||
                                                booking.bookingStatus.toLowerCase() === 'waiting for clinic') && (
                                                <Tooltip title="Cancel booking">
                                                    <button className="bg-bookingButton text-white px-3 py-2 rounded" onClick={() => handleDecline(booking.id)}>
                                                        <FontAwesomeIcon icon={faX} size="lg" className="text-bookingDecline" />
                                                    </button>
                                                </Tooltip>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="block lg:hidden space-y-6 text-accordionTitle">
                    {
                        filteredBookings?.map(booking => (
                            <div className="p-4 bg-white shadow-md rounded-md">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold">{booking.clinic}</h3>
                                    <div className="flex justify-end space-x-3">
                                        <button className="bg-bookingButton text-white px-3 py-2 rounded">
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" className="text-bookingView" onClick={() => getBookingDetails(booking.id)} />
                                        </button>
                                        {
                                            booking.bookingStatus.toLowerCase() === 'awaiting your confirmation' && <button className="bg-bookingButton text-white px-3 py-2 rounded" onClick={() => handleAccept(booking.id)}>
                                                <FontAwesomeIcon icon={faCheck} size="lg" className="text-bookingAccept" />
                                            </button>
                                        }
                                        {
                                            (booking.bookingStatus.toLowerCase() === 'scheduled' ||
                                                booking.bookingStatus.toLowerCase() === 'awaiting your confirmation' ||
                                                booking.bookingStatus.toLowerCase() === 'waiting for clinic') && (
                                                <button className="bg-bookingButton text-white px-3 py-2 rounded" onClick={() => handleDecline(booking.id)}>
                                                    <FontAwesomeIcon icon={faX} size="lg" className="text-bookingDecline" />
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <p className="text-accordionTitle"><span className="text-accordionContent">#</span></p>
                                        <p className="text-accordionTitle">{booking.uniqueCode}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-accordionTitle"><span className="text-accordionContent">Scheduled Date:</span></p>
                                        <p className="text-accordionTitle">{booking.scheduledDate}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-accordionTitle"><span className="text-accordionContent">Services:</span></p>
                                        <td className="px-4 py-2">{Array.isArray(booking.services) ? booking.services.join(", ") : booking.services}</td>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-accordionTitle"><span className="text-accordionContent">Booking Status:</span></p>
                                        <p className="text-accordionTitle">
                                            <div className="bg-bookingStatus px-2 text-brandPrimary rounded">
                                                {booking.bookingStatus.split(" ")[0]}
                                            </div>
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-accordionTitle"><span className="text-accordionContent">Reward Status:</span></p>
                                        <p className="text-accordionTitle">
                                            <span className="text-bookingApplied">{booking.rewardStatus.split(" ")[0]}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </React.Fragment >
        )
    );
};