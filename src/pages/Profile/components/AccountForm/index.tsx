import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from '../../../../components';
import apiEndpoints from '../../../../apiEndpoints';
import { useApi } from '../../../../hooks';

interface FormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
  countryCode: string;
}

export const AccountForm = () => {

  const { callApi, response } = useApi();

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  },[response])

  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    phone: '',
    email: '',
    countryCode: '+1',
  });

  const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+91', name: 'India' },
  ];

  useEffect(() => {
    callApi({ endpoint: apiEndpoints.profile.get });
  }, []); 

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      phone: formattedValue,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.surname) {
      newErrors.surname = 'Please enter your surname';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log(formData);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your message has been sent!',
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-4 lg:px-24 px-6 py-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-textBlack">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.name ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
          placeholder="Name"
        />
        {errors.name && <p className="mt-2 text-sm text-accentColor">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="surname" className="block text-sm font-medium text-textBlack">Surname</label>
        <input
          id="surname"
          name="surname"
          type="text"
          value={formData.surname}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.surname ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
          placeholder="Surname"
        />
        {errors.surname && <p className="mt-2 text-sm text-accentColor">{errors.surname}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <label htmlFor="countryCode" className="block text-sm font-medium text-textBlack">Country Code</label>
          <select
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 lg:text-left text-center py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.countryCode ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {window.innerWidth < 1024 ? `(${country.code})` : `${country.name} (${country.code})`}
              </option>
            ))}
          </select>
          {errors.countryCode && <p className="mt-2 text-sm text-accentColor">{errors.countryCode}</p>}
        </div>

        <div className="flex-grow">
          <label htmlFor="phone" className="block text-sm font-medium text-textBlack">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.phone ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
            placeholder="1234567890"
            maxLength={10}
          />
          {errors.phone && <p className="mt-2 text-sm text-accentColor">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-textBlack">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.email ? 'border border-accentColor' : 'bg-formBackground'} focus:border-brandPrimary sm:text-sm`}
          placeholder="example@domain.com"
        />
        {errors.email && <p className="mt-2 text-sm text-accentColor">{errors.email}</p>}
      </div>


      <Button
        text='Save'
        color='bg-brandPrimary'
        size='w-full m-auto'
        hover={true}
      />
    </form>
  );
};
