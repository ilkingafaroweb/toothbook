import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../../../UI';
import { RegisterOTP } from './components';
import { useApi } from '../../../../../hooks';
import apiEndpoints from '../../../../../apiEndpoints';
import Swal from 'sweetalert2';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useLogin } from '../../../../../contexts';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

interface FormData {
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string,
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {

  const handleError = () => {
    console.log('Login Failed');
  };

  const { callApi, response, error, loading } = useApi()
  const [otpStep, setOtpStep] = useState(false)

  const { loginGoogle } = useLogin()

  const handleSuccess = (googleResponse: any) => {
    loginGoogle(googleResponse.credential, 0)
  };

  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    hasReferral: false,
    referralCode: 0
  });

  useEffect(() => {
    response && Swal.fire({
      icon: 'success',
      title: 'Success',
      text: `${response}`,
    }).then(() => {
      localStorage.setItem('email', formData.email)
      setOtpStep(true)
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

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name || formData.name.length > 13) {
      newErrors.name = 'Name must contain only letters and be up to 13 characters long';
    }
    if (!formData.surname || formData.surname.length > 13) {
      newErrors.surname = 'Surname must contain only letters and be up to 13 characters long';
    }
    if (!formData.phoneNumber || !/^\d{7-10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Provide a valid phone number (7 to 10 digits)';
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Provide a valid email address';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Use at least 8 characters, one uppercase letter, one lowercase letter, and one number in your password';
    }

    if (!errors.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      method: 'POST',
      endpoint: apiEndpoints.register.post,
      data: formData
    })
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBack = () => {
    setOtpStep(false)
  }

  return (
    otpStep ? (<RegisterOTP onBack={handleBack} />) : (<>
      <div>
        <h2 className="lg:text-3xl text-2xl font-bold text-brandSecondary">{'Create an account'}</h2>
        <p className='lg:text-lg text-sm font-medium text-accordionTitle'>{"Let’s get started"}</p>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div>
          <Input
            name='name'
            placeholder='Name'
            isValid={!errors.name}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="max-w-96 mt-1 ml-1 text-sm text-accentColor">{errors.name}</p>}
        </div>
        <div>
          <Input
            name='surname'
            placeholder='Surname'
            isValid={!errors.surname}
            value={formData.surname}
            onChange={handleChange}
          />
          {errors.surname && <p className="max-w-96 mt-1 ml-1 text-sm text-accentColor">{errors.surname}</p>}
        </div>
        <div>
          <Input
            name='email'
            placeholder='Email'
            isValid={!errors.email}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="max-w-96 mt-1 ml-1 text-sm text-accentColor">{errors.email}</p>}
        </div>
        <div>
          <Input
            type='tel'
            name='phoneNumber'
            placeholder='Phone number'
            isValid={!errors.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="max-w-96 mt-1 ml-1 text-sm text-accentColor">{errors.phoneNumber}</p>}
        </div>
        <div>
          <Input
            type='password'
            name='password'
            placeholder='Password'
            isValid={!errors.password}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="max-w-96 mt-1 ml-1 text-sm text-accentColor">{errors.password}</p>}
        </div>
        <div>
          <Input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            isValid={!errors.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="max-w-96 mt-1 ml-1 text-sm text-accentColor">{errors.confirmPassword}</p>}
        </div>

        <Button
          text='Create account'
          color='bg-brandPrimary'
          size='w-full'
          isLoading={loading}
        />

        <div className="text-center">
          <button
            type='button'
            onClick={onSwitchToLogin}
            className="text-brandPrimary"
          >
            Already have an account ? <span className="underline">Log In!</span>
          </button>
        </div>
      </form>
      <GoogleOAuthProvider clientId="258658743445-5v4k5dpalev01lmdt6vhd05des46mvom.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </GoogleOAuthProvider>
    </>)
  );
};