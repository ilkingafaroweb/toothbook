import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
    color: string;
    path?: string;
    link?: boolean;
    text: string;
    icon?: string;
    size?: string;
    button?: boolean;
    hover?: boolean;
    isLoading?: boolean;
    disabled?: boolean; // Add disabled prop
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ 
    color, 
    text, 
    icon, 
    size, 
    button, 
    hover, 
    isLoading, 
    disabled, 
    onClick 
}) => {
    return (
        <button
            type={button ? 'button' : 'submit'}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`group border outline-none border-white ${size ? size : 'w-[150px]'} 
                    flex items-center justify-center space-x-2.5 px-4 py-2.5 rounded-xl 
                    ${color} 
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''} // Add styles for disabled state
                    ${hover && !disabled && 'hover:bg-white hover:border hover:border-opacity-20 hover:border-black'} 
                    transition-transform transform active:scale-95 active:shadow-md`}>
            <span className={`flex justify-center items-center gap-3 text-white w-max ${hover && !disabled && 'group-hover:text-opacity-80 group-hover:text-black'}`}>
                {
                    isLoading && (
                        <svg className={`animate-spin h-5 w-5 ${hover && 'group-hover:text-brandPrimary text-white'} text-white`} viewBox="0 0 24 24">
                            <FontAwesomeIcon icon={faSpinner} />
                        </svg>
                    )
                }
                {text}
            </span>
            {icon && (
                <span className='w-6'>
                    <img src={icon} alt="btn-icon" />
                </span>
            )}
        </button>
    );
};