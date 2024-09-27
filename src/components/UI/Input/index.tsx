import React from 'react';

interface InputProps {
  icon?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  isValid?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

export const Input: React.FC<InputProps> = ({ icon, name, type, value, placeholder, readonly, isValid, onChange, loading }) => {
  return (
    <div className={`flex items-center border ${!isValid && 'border-accentColor'} rounded-xl w-full`}>
      {icon && <img className='ml-2' src={icon} alt='icon' />}
      <input
        type={type ? `${type}` : 'text'}
        value={value}
        name={name}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={onChange}
        className={`flex-1 outline-none rounded-xl p-2 ${loading && 'animate-pulse'} focus:border focus:border-brandPrimary`}
      />
    </div>
  );
};
