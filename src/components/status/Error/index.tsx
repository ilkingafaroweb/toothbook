import React from 'react';
import { Button } from '../../UI';

interface ErrorProps {
    error?: string;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
                <p className="text-accentColor">{error ? error : "Oops, something went wrong :("}</p>
                <Button 
                    text='Refresh' 
                    color="bg-brandSecondary" 
                    onClick={() => window.location.reload()}>
                </Button>
            </div>
    );
};