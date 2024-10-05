import React, { useState } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useBooking } from "../../../contexts";
import { auth_x } from "../../../assets";
import { Button } from "../../UI";

interface FormData {
    selectedDoctor: any;
    selectedDate: Date | null;
    selectedTime: string;
    phone: string;
    note: string;
    visitedClinic: boolean;
}

export const BookingModal: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        selectedDoctor: null,
        selectedDate: null,
        selectedTime: "",
        phone: "",
        note: "",
        visitedClinic: false,
    });

    const doctors = [
        { value: 'doctor1', label: 'Doctor 1' },
        { value: 'doctor2', label: 'Doctor 2' },
        { value: 'doctor3', label: 'Doctor 3' },
    ];

    const { isBookingOpen, closeBooking } = useBooking();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
    
        // Assert that e.target is an HTMLInputElement
        const isCheckbox = type === 'checkbox';
        const newValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };
    

    const handleDoctorChange = (selectedOption: any) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedDoctor: selectedOption,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedDate: date,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div onClick={closeBooking} className={`${isBookingOpen ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50' : 'hidden'}`}>
            <div className="bg-white w-full lg:max-w-[662px] max-w-[353px] lg:mx-auto mx-4 rounded-lg shadow-lg overflow-hidden">
                <div onClick={(e) => handleModalClick(e)} className={`relative md:flex transition-transform duration-500 ease-in-out`}>
                    {/* X button */}
                    <button className="absolute lg:top-5 lg:right-5 top-3 right-3 z-50" onClick={closeBooking}>
                        <img src={auth_x} alt="auth-x" />
                    </button>

                    <div className="w-full flex flex-col lg:px-[38px] px-[15px] lg:py-[57px] py-[34px]">
                        <h1 className="text-2xl font-semibold">Smiles on Kipling Family</h1>
                        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
                            {/* 1st Row: Doctor Option */}
                            <div>
                                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                                    Doctor
                                </label>
                                <Select
                                    id="doctor"
                                    value={formData.selectedDoctor}
                                    onChange={handleDoctorChange}
                                    options={doctors}
                                    placeholder="Select a doctor"
                                    className="mt-1"
                                />
                            </div>

                            {/* 2nd Row: Date and Time Inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <DatePicker
                                        selected={formData.selectedDate}
                                        onChange={handleDateChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                        placeholderText="Select a date"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="selectedTime"
                                        value={formData.selectedTime}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
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
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                />
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
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    placeholder="Any additional notes..."
                                    rows={4}
                                />
                            </div>

                            {/* Checkbox: I have been to this clinic before */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="visited-clinic"
                                    name="visitedClinic"
                                    checked={formData.visitedClinic}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-brandPrimary border-gray-300 rounded focus:ring-brandPrimary"
                                />
                                <label htmlFor="visited-clinic" className="ml-2 block text-sm text-gray-700">
                                    I have been to this clinic before
                                </label>
                            </div>
                            <Button
                                text="Book now"
                                color="bg-brandPrimary"
                                size="w-full"
                            />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}