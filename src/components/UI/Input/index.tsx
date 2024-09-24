import React from 'react';

interface InputProps {
  icon?: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  isValid?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

export const Input: React.FC<InputProps> = ({ icon, value, placeholder, readonly, isValid, onChange, loading }) => {
  return (
    <div className={`flex items-center border ${!isValid && 'border-accentColor'} rounded-xl px-3 py-2.5 space-x-2 w-full`}>
      {icon && <img src={icon} alt='icon' />}
      <input
        type="text"
        value={value}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={onChange}
        className={`flex-1 outline-none ${loading && 'animate-pulse'}`}
      />
    </div>
  );
};
