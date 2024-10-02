import React, { useState } from 'react';
import { Button, Input } from '../../../../UI';
import { RegisterOTP } from './components';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {

  const [otpStep, setOtpStep] = useState(false)

  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true)
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
    otpStep ? (<RegisterOTP  onBack={handleBack}/>) : (<>
      <div>
        <h2 className="lg:text-3xl text-2xl font-bold text-brandSecondary">{'Create an account'}</h2>
        <p className='lg:text-lg text-sm font-medium text-accordionTitle'>{"Let’s get started"}</p>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          name='name'
          placeholder='Name'
          isValid={true}
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name='surname'
          placeholder='Surname'
          isValid={true}
          value={formData.surname}
          onChange={handleChange}
        />
        <Input
          name='email'
          placeholder='Email'
          isValid={true}
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type='tel'
          name='phoneNumber'
          placeholder='Phone number'
          isValid={true}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          isValid={true}
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          isValid={true}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button
          text='Create account'
          color='bg-brandPrimary'
          size='w-full'
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
    </>)
  );
};