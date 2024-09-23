import React, { useState } from 'react';
import { Button, Input } from '../../../../components';

export const ReferralForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Send me email');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = () => {
    if (!email || !validateEmail(email)) {
      setMessage('Please enter a valid email');
      setIsValid(false); 
      return;
    }

    setMessage('Email sent!');
    setIsValid(true); 
    setEmail('')
  };

  return (
    <div className="w-full flex lg:flex-row flex-col justify-between lg:space-x-3 lg:space-y-0 space-y-3">
      <Input
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        isValid={isValid}
      />
      <Button  
        color='bg-brandPrimary'
        text={message}
        onClick={sendEmail}
        size='lg:w-max w-full'
      />
    </div>
  );
};
