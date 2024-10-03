import React, { useEffect, useState } from "react";
import { Button } from "../../../../components";
import { useApi } from "../../../../hooks";
import apiEndpoints from "../../../../apiEndpoints";
import Swal from "sweetalert2";

interface FormData {
    businessName: string,
    contactPerson: string,
    contactNumber: string,
    emailAddress: string,
}

export const PartnerForm: React.FC = () => {

    const { callApi, loading, error, response } = useApi();

    useEffect(() => {
        response && Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `${response}`,
        });
    }, [response])

    useEffect(() => {
        error && Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error}`,
        });
    }, [error])

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [formData, setFormData] = useState<FormData>({
        businessName: "",
        contactPerson: "",
        contactNumber: "",
        emailAddress: "",
    });

    // const countryCodes = [
    //     { code: '+1', name: 'United States' },
    //     { code: '+44', name: 'United Kingdom' },
    //     { code: '+49', name: 'Germany' },
    //     { code: '+33', name: 'France' },
    //     { code: '+91', name: 'India' },
    // ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = value.replace(/[^0-9]/g, '');
        setFormData((prevData) => ({
            ...prevData,
            contactNumber: formattedValue,
        }));
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};

        if (!formData.businessName) {
            newErrors.businessName = 'Please enter your business name';
        }
        if (!formData.contactPerson) {
            newErrors.contactPerson = 'Please enter contact person name';
        }
        if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Phone number must be 10 digits';
        }
        if (!formData.emailAddress || !/^\S+@\S+\.\S+$/.test(formData.emailAddress)) {
            newErrors.emailAddress = 'Please enter a valid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return
        }

        await callApi({
            method: "POST",
            endpoint: apiEndpoints.partners.post,
            data: formData,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="lg:w-full space-y-6 lg:px-24 px-6 py-6">
            <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-textBlack">Business Name</label>
                <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.businessName ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
                    placeholder="Business name"
                />
                {errors.businessName && <p className="mt-2 text-sm text-accentColor">{errors.businessName}</p>}
            </div>

            <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-textBlack">Contact Person</label>
                <input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.contactPerson ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
                    placeholder="Contact person name"
                />
                {errors.contactPerson && <p className="mt-2 text-sm text-accentColor">{errors.contactPerson}</p>}
            </div>

            <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-textBlack">Email</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.emailAddress ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
                    placeholder="example@domain.com"
                />
                {errors.emailAddress && <p className="mt-2 text-sm text-accentColor">{errors.emailAddress}</p>}
            </div>

            {/* <div className="flex items-center space-x-4"> */}
            {/* <div className="flex-shrink-0 w-1/6">
                    <label htmlFor="countryCode" className="block text-sm font-medium text-textBlack">Country</label>
                    <select
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full lg:px-3 lg:text-left text-center py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.countryCode ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {window.innerWidth < 1024 ? `${country.code}` : `${country.code}`}
                            </option>
                        ))}
                    </select>
                    {errors.countryCode && <p className="mt-2 text-sm text-accentColor">{errors.countryCode}</p>}
                </div> */}

            <div className="flex-grow">
                <label htmlFor="contactNumber" className="block text-sm font-medium text-textBlack">Contact number</label>
                <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    value={formData.contactNumber}
                    onChange={handlePhoneChange}
                    className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.contactNumber ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
                    placeholder="1234567890"
                    maxLength={10}
                />
                {errors.contactNumber && <p className="mt-2 text-sm text-accentColor">{errors.contactNumber}</p>}
            </div>
            {/* </div> */}

            <Button
                text='Save'
                color='bg-brandPrimary'
                size='w-full m-auto'
                isLoading={loading}
                hover={true}
            />
        </form>
    );
};