import React from 'react';

export const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="w-16 h-16 border-4 border-brandPrimary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};