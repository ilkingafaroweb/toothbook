import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { Button } from '../../../../components';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const [name, surname] = formData.fullName.split(' ');

    if (!name || !surname) newErrors.fullName = 'Please enter both name and surname';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = 'auto';
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  }, [formData.message]);

  return (
    <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-4 lg:px-24 px-6 py-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-textBlack">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.fullName ? 'border border-accentColor' : 'bg-formBackground'
            } focus:border-brandPrimary sm:text-sm`}
          placeholder="Name Surname"
        />
        {errors.fullName && <p className="mt-2 text-sm text-accentColor">{errors.fullName}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-textBlack">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handlePhoneChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.phone ? 'border border-accentColor' : 'bg-formBackground'
            } focus:border-brandPrimary sm:text-sm`}
          placeholder="1234567890"
          pattern="\d*"
          maxLength={10}
        />
        {errors.phone && <p className="mt-2 text-sm text-accentColor">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-textBlack">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.email ? 'border border-accentColor' : 'bg-formBackground'
            } focus:border-brandPrimary sm:text-sm`}
          placeholder="example@domain.com"
        />
        {errors.email && <p className="mt-2 text-sm text-accentColor">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-textBlack">Write your message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          ref={messageRef}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.message ? 'border border-accentColor' : 'bg-formBackground'
            } focus:border-brandPrimary sm:text-sm resize-none min-h-[100px]`}
          placeholder="Your message here..."
          rows={1}
        />
        {errors.message && <p className="mt-2 text-sm text-accentColor">{errors.message}</p>}
      </div>
      <Button
        text='Send'
        color='bg-brandPrimary'
        size='lg:w-48 w-full m-auto'
        hover={true}
      />
    </form>
  );
};