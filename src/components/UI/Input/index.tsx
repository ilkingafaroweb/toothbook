import React from 'react';

interface InputProps {
  icon?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  loading?: boolean;
  readonly?: boolean;
  isValid?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ icon, name, type, value, placeholder, readonly, isValid, onChange, loading }) => {
  return (
    <div className={`flex items-center ${icon && 'border group-focus:border-brandPrimary'} ${!isValid && 'border border-accentColor'} rounded-xl w-full`}>
      {icon && <img className='ml-2' src={icon} alt='icon' />}
      <input
        type={type ? `${type}` : 'text'}
        value={value}
        name={name}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={onChange}
        className={`flex-1 outline-none ${!icon && 'border focus:border focus:border-brandPrimary'} rounded-xl p-2 ${loading && 'animate-pulse'} `}
      />
    </div>
  );
};
