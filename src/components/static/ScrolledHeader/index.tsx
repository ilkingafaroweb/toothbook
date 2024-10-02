import React, { useState, useEffect, useRef } from 'react';
import { brandLogo, location_icon } from '../../../assets';
import { Button, Input } from '../../UI';
import { OfferBanner } from '../OfferBanner';

interface ScrolledHeaderProps {
    replacementComponent: React.ReactNode;
}

export const ScrolledHeader: React.FC<ScrolledHeaderProps> = ({ replacementComponent }) => {
    const [isVisible, setIsVisible] = useState(true);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    return (
        <React.Fragment>
            <div ref={targetRef} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
                {replacementComponent}
            </div>
            {!isVisible && (
                <div
                    className={`fixed z-50 top-0 left-0 w-full bg-white shadow-bottom transition-transform duration-300 transform ${
                        !isVisible ? 'animate-slide-down' : 'opacity-0 -translate-y-full'
                    }`}
                >
                    <OfferBanner  />

                    <div className="container mx-auto flex items-center justify-between py-3 px-5 lg:px-21">
                        {/* Brand logo */}
                        <div className="w-1/2 flex-shrink-0 hidden sm:block">
                            <img src={brandLogo} alt="Brand Logo" className="h-16" />
                        </div>

                        {/* Desktop view: input and button */}
                        <div className="w-1/2 hidden sm:flex items-center justify-center space-x-6">
                            <Input
                                icon={location_icon}
                                placeholder="Enter your location"
                                isValid={true}
                            />
                            <Button
                                text="Find a dentist"
                                color="bg-brandPrimary"
                                size="w-max"
                            />
                        </div>

                        {/* Mobile view: text and input */}
                        <div className="w-full flex flex-col items-left sm:hidden text-left space-y-3">
                            <p>Find your perfect dentist</p>
                            <Input 
                                icon={location_icon} 
                                placeholder="Enter your location"  
                                isValid={true}/>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};