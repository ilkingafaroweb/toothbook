import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useBooking, useLogin } from "../../../contexts";
import { auth_x } from "../../../assets";
import { Button } from "../../UI";
import apiEndpoints from "../../../apiEndpoints";
import { useApi } from "../../../hooks";
import { ErrorMessage, SuccessMessage } from "../AuthModal/components/Status";
import { LoginForm, RegisterForm } from "../AuthModal/components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormData {
    selectedDoctor: number;
    selectedDate: string | null;
    selectedTime: string;
    phone: string;
    note: string;
    iHaveBeenInClinic: boolean;
}

interface Doctor {
    id: number;
    doctorName: string;
}

interface BookingPost {
    clinicId: number | null,
    doctorId: number,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    note: string,
    iHaveBeenInClinic: boolean,
    logId: number
}

export const BookingModal: React.FC = () => {

    const { isBookingOpen, closeBooking, modalBooking, modalToggle, clinicName } = useBooking();
    const { callApi: postBooking, response: responsePostBooking } = useApi()
    const { callApi: getBooking, response: responseGetBooking } = useApi()
    const { callApi: getDates, response: responseGetDates } = useApi()
    const { callApi: getHours, response: responseGetHours } = useApi()
    const { clinicId } = useBooking()
    const [isSignUp, setIsSignUp] = useState(false);

    const { successMessage, errorMessage, isAuthenticated } = useLogin()
    const navigate = useNavigate()

    const initialFormData = {
        selectedDoctor: -1,
        selectedDate: null,
        selectedTime: "",
        phone: "",
        note: "",
        iHaveBeenInClinic: false,
    }

    const [validationErrors, setValidationErrors] = useState({
        selectedDoctor: false,
        selectedDate: false,
        selectedTime: false,
        phone: false,
    });

    useEffect(() => {
        if (!modalBooking) {
            modalToggle()
        }
    }, [isAuthenticated])

    const handleClose = () => {
        closeBooking()
        setFormData(initialFormData)
    }

    useEffect(() => {
        if (responsePostBooking) {
            closeBooking()
            const bookingId = responsePostBooking;

            Swal.fire({
                title: 'Booking Created!',
                text: `Your booking ID is ${bookingId}.`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Go to booking',
                timer: 5000,
                timerProgressBar: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/bookings/${bookingId}`);
                }
            });
        }
    }, [responsePostBooking]);


    const handleSignUpClick = () => {
        setIsSignUp(true)
    };

    const handleBackToLoginClick = () => {
        setIsSignUp(false)
    };

    const [bookingPost, setBookingPost] = useState<BookingPost | null>(null);

    useEffect(() => {
        console.log("Booking posted data text --->", bookingPost);
    }, [bookingPost])

    

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const createBookingPostData = (formData: any): BookingPost | null => {
        if (!formData.selectedDate || !formData.selectedTime) {
            return null;
        }

        const [day, month, year] = formData.selectedDate.split("/").map(Number);

        const [hour, minute] = formData.selectedTime.split(":").map(Number);


        const bookingPostData: BookingPost = {
            clinicId: clinicId,
            doctorId: formData.selectedDoctor,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            note: formData.note,
            iHaveBeenInClinic: formData.iHaveBeenInClinic,
            logId: Number(sessionStorage.getItem('clinicsLog'))
        };

        return bookingPostData;
    };

    useEffect(() => {
        if (formData) {
            const bookingPostData = createBookingPostData(formData);
            setBookingPost(bookingPostData)
        }

    }, [formData])

    const doctorId = formData.selectedDoctor;
    const [dayOfWeek, setDayOfWeek] = useState<number | null>(null)

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [disableDays, setDisableDays] = useState<number[]>([])
    const [hours, setHours] = useState<number[]>([])

    const minTime = hours[0]?.toString().padStart(2, '0') + ":00";
    const maxTime = hours[hours.length - 1]?.toString().padStart(2, '0') + ":00";

    useEffect(() => {
        if (clinicId) {
            getBooking({
                endpoint: apiEndpoints.bookingModal.getBooking,
                params: {
                    clinicId: clinicId
                }
            })
        }
    }, [clinicId])

    useEffect(() => {
        if (clinicId) {
            getDates({
                endpoint: apiEndpoints.bookingModal.getDates,
                params: {
                    doctorId: doctorId,
                    clinicId: clinicId
                }
            });
        }
    }, [doctorId, clinicId]);


    useEffect(() => {
        if (clinicId) {
            getHours({
                endpoint: apiEndpoints.bookingModal.getHours,
                params: {
                    doctorId: doctorId,
                    clinicId: clinicId,
                    dayOfWeek: dayOfWeek
                }
            });
        }
    }, [dayOfWeek, doctorId, clinicId])


    useEffect(() => {
        { responseGetBooking && setDoctors(responseGetBooking.doctors) }
    }, [responseGetBooking])

    useEffect(() => {
        { responseGetDates && setDisableDays(responseGetDates) }
    }, [responseGetDates])

    useEffect(() => {
        { responseGetHours && setHours(responseGetHours) }
    }, [responseGetHours])

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (name === 'phone') {
            if (!/^\d*$/.test(value) || value.length > 10) {
                return; 
            }
        }
    
        // Değişen inputun değerini ayarla
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

    
        // Hata mesajını gizle
        if (name === 'phone') {
            setValidationErrors(prevErrors => ({ ...prevErrors, phone: false }));
        }  else if (name === 'selectedDoctor') {
            setValidationErrors(prevErrors => ({ ...prevErrors, selectedDoctor: false }));
        }
    };
    

    // const handleDoctorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFormData({ ...formData, selectedDoctor: Number(event.target.value) });
    // };

    const handleDateChange = (selectedDate: Date[]) => {
        if (selectedDate.length > 0) {
            const date = selectedDate[0];

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            const dayOfWeek = date ? date.getDay() : null;

            setFormData((prevData) => ({
                ...prevData,
                selectedDate: formattedDate,
            }));

            setValidationErrors(prevErrors => ({ ...prevErrors, selectedDate: false }));
            setDayOfWeek(dayOfWeek);
        }
    };


    const handleTimeChange = (selectedTime: any) => {
        if (selectedTime.length > 0) {
            const date = selectedTime[0];
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            setFormData((prevData) => ({
                ...prevData,
                selectedTime: formattedTime,
            }));
                
            setValidationErrors(prevErrors => ({ ...prevErrors, selectedTime: false }));
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 

        const { selectedDoctor, selectedDate, selectedTime, phone } = formData;

        const isValid =
            selectedDoctor >= 0 &&
            selectedDate !== null &&
            selectedTime !== "" &&
            phone.length === 10; 

        setValidationErrors({
            selectedDoctor: selectedDoctor < 0,
            selectedDate: selectedDate === null,
            selectedTime: selectedTime === "",
            phone: phone === "" || phone.length !== 10, 
        });


        if (isAuthenticated) {
            if (isValid) {
                postBooking({
                    method: "POST",
                    endpoint: apiEndpoints.bookingModal.postBooking,
                    data: bookingPost,
                });
            } else {
                console.error("Form doğrulama hatası.");
            }
        } else {
            modalToggle(); 
        }
    };




    return (
        <div onClick={handleClose} className={`${isBookingOpen ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50' : 'hidden'}`}>
            <div className="bg-white w-full lg:max-w-[662px] max-w-[353px] lg:mx-auto mx-4 rounded-lg shadow-lg overflow-hidden">
                <div onClick={handleModalClick} className="relative md:flex transition-transform duration-500 ease-in-out">
                    {/* X button */}
                    <button className="absolute lg:top-5 lg:right-5 top-3 right-3 z-50" onClick={handleClose}>
                        <img src={auth_x} alt="auth-x" />
                    </button>

                    <div className={`w-full ${modalBooking ? 'flex' : 'hidden'} flex-col lg:px-[38px] px-[15px] lg:py-[57px] py-[34px]`}>
                        <h1 className="text-2xl font-semibold">{clinicName}</h1>
                        <form className="space-y-4 pt-6" onSubmit={handleSubmit}>
                            {/* 1st Row: Doctor Option */}
                            <div>
                                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                                    Doctor
                                </label>
                                <select
                                    id="doctor"
                                    name="selectedDoctor" // add name attribute here
                                    value={formData.selectedDoctor}
                                    onChange={handleChange}
                                    className={`rounded-lg border ${validationErrors.selectedDoctor ? 'border-red-500' : 'border-gray-300'
                                        } focus:border-brandPrimary focus:ring-brandPrimary outline-none focus:ring-opacity-50 w-full p-2`}
                                >
                                    <option className="hidden" value={-1}>
                                        Select Doctor
                                    </option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.doctorName}
                                        </option>
                                    ))}
                                </select>
                                {validationErrors.selectedDoctor && (
                                    <p className="text-red-500 text-sm">Please select a doctor.</p>
                                )}
                            </div>

                            {/* 2nd Row: Date and Time Inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <Flatpickr
                                        value={formData.selectedDate || undefined}
                                        onChange={handleDateChange}
                                        options={{
                                            dateFormat: "d-m-Y",
                                            minDate: new Date(),
                                            maxDate: maxDate,
                                            disable: [
                                                function (date) {
                                                    return disableDays.includes(date.getDay());
                                                }
                                            ],
                                        }}
                                        className={`w-full outline-none focus:border-brandPrimary focus:ring-brandPrimary border rounded-lg p-2 ${validationErrors.selectedDate ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder={formData.selectedDate ? '' : 'Select Date'}
                                    />
                                    {validationErrors.selectedDate && (
                                        <p className="text-red-500 text-sm">Please select a date.</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                        Time
                                    </label>
                                    <Flatpickr
                                        value={[formData.selectedTime]}
                                        onChange={handleTimeChange}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true,
                                            minTime: minTime,
                                            maxTime: maxTime,
                                        }}
                                        className={`w-full outline-none border focus:border-brandPrimary focus:ring-brandPrimary rounded-lg p-2 ${validationErrors.selectedTime ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Select a time"
                                    />
                                    {validationErrors.selectedTime && (
                                        <p className="text-red-500 text-sm">Please select a time.</p>
                                    )}
                                </div>
                            </div>

                            {/* 3rd Row: Phone Number Input */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="(123) 456-7890"
                                    pattern="[0-9]*" 
                                    inputMode="numeric"
                                    className={`mt-1 block w-full outline-none focus:border-brandPrimary focus:ring-brandPrimary border rounded-lg p-2 ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {validationErrors.phone && (
                                    <p className="text-red-500 text-sm">Please enter your correct phone number.</p>
                                )}
                            </div>

                            {/* 4th Row: Note Input */}
                            <div>
                                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                                    Note
                                </label>
                                <textarea
                                    id="note"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    className="mt-1 block outline-none focus:border-brandPrimary focus:ring-brandPrimary w-full border border-gray-300 rounded-lg p-2"
                                    placeholder="Any additional notes..."
                                    rows={4}
                                />
                            </div>

                            {/* Checkbox: I have been to this clinic before */}
                            <label className="flex items-center cursor-pointer mr-4">
                                <input
                                    type="checkbox"
                                    id="visited-clinic"
                                    name="iHaveBeenInClinic"
                                    checked={formData.iHaveBeenInClinic}
                                    onChange={handleChange}
                                    className="hidden" // Gerçek checkbox'ı gizle
                                />
                                <span
                                    className={`w-6 h-6 flex items-center justify-center border-2 rounded ${formData.iHaveBeenInClinic
                                            ? 'bg-brandPrimary border-brandPrimary'
                                            : 'border-gray-300'
                                        }`}
                                >
                                    {formData.iHaveBeenInClinic && (
                                        <span className="text-white">&#10003;</span> // İşaret
                                    )}
                                </span>
                                <span className="ml-2 text-sm text-gray-700">
                                    I have been to this clinic before
                                </span>
                            </label>


                            <Button
                                text="Book now"
                                color="bg-brandPrimary"
                                size="w-full"
                            />
                        </form>


                    </div>
                    <div className={`w-full ${modalBooking ? 'hidden' : 'flex'} h-max flex-col space-y-5 bg-white md:w-full lg:p-12 px-4 py-8 transition-all transform duration-300 ease-in-out`
                    }>
                        <div className="flex flex-col justify-between items-start">
                            <SuccessMessage successMessage={successMessage} />
                            <ErrorMessage errorMessage={errorMessage} />
                        </div>
                        {!isSignUp ? (
                            <LoginForm onSwitchToSignUp={handleSignUpClick} />
                        ) : (
                            <RegisterForm onSwitchToLogin={handleBackToLoginClick} />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};