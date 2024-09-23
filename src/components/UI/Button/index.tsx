import React from 'react';

interface ButtonProps {
    color: string;
    path?: string;
    link?: boolean;
    text: string;
    icon?: string;
    size?: string;
    hover?: boolean;
    onClick?: () => void;
}


export const Button: React.FC<ButtonProps> = ({ color, text, icon, size, hover, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`group border border-white ${size ? size : 'w-[150px]'} 
                    flex items-center justify-center space-x-2.5 px-4 py-2.5 rounded-xl 
                    ${color} 
                    ${hover && 'hover:bg-white hover:border hover:border-opacity-20 hover:border-black'} 
                    transition-transform transform active:scale-95 active:shadow-md`}>
            <span className={`text-white w-max ${hover && 'group-hover:text-opacity-80 group-hover:text-black'}`}>
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