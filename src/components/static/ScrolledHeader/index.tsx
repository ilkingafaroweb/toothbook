import React, { useState, useEffect, useRef } from 'react';
import { brandLogo, location_icon } from '../../../assets';
import { Button, Input } from '../../UI';
import { OfferBanner } from '../OfferBanner';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import { useStepsContext } from '../../../contexts';
import { Loading } from '../../status';

interface ScrolledHeaderProps {
    replacementComponent: React.ReactNode;
}

export const ScrolledHeader: React.FC<ScrolledHeaderProps> = ({ replacementComponent }) => {
    const navigate = useNavigate();
    const { setStepsData } = useStepsContext()

    const [address, setAddress] = useState<string>('');
    const [coordinates, setCoordinates] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });

    const [isVisible, setIsVisible] = useState(true);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        {address && setStepsData((prev) => ({
            ...prev,
            address: address
        }))}
    }, [address])

    useEffect(() => {
        if (coordinates.lat !== null && coordinates.lng !== null) {
            setStepsData((prev) => ({
                ...prev,
                longitude: coordinates.lng,
                latitude: coordinates.lat,
            }));
        }
    }, [coordinates]);

    const handleSelect = async (selectedAddress: string) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setAddress(selectedAddress);
            setCoordinates(latLng);
           
        } catch (error) {
            console.error('Error fetching geocode data: ', error);
        }
    };

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
                    className={`fixed z-50 top-0 left-0 w-full bg-white shadow-bottom transition-transform duration-300 transform ${!isVisible ? 'animate-slide-down' : 'opacity-0 -translate-y-full'
                        }`}
                >
                    <OfferBanner />

                    <div className="container mx-auto flex items-center justify-between py-3 px-5 lg:px-21">
                        {/* Brand logo */}
                        <div className="w-1/2 flex-shrink-0 hidden sm:block">
                            <img src={brandLogo} alt="Brand Logo" className="h-16" />
                        </div>

                        {/* Desktop view: input and button */}
                        <div className='hidden lg:centered lg:space-x-6 lg:space-y-0 lg:w-[600px] w-full lg:flex-row flex-col space-y-3'>
                                {/* Google Autocomplete Input */}
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                    searchOptions={{
                                        componentRestrictions: { country: 'CA' } 
                                    }}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className='relative w-full'>
                                            <div className='flex items-center border border-gray-300 rounded-xl'>
                                                <img className='ml-2' src={location_icon} alt="location-icon" />
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Enter your location',
                                                        className: 'input-location rounded-xl p-2 w-full outline-none',
                                                    })}
                                                />
                                            </div>
                                            
                                            {/* Autocomplete Suggestions Dropdown */}
                                            <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10">
                                                {loading && <div className="p-2 text-gray-500">
                                                        <Loading />
                                                    </div>}
                                                
                                                {suggestions?.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'bg-gray-200 cursor-pointer p-2'
                                                        : 'bg-white cursor-pointer p-2 hover:bg-gray-100';
                                                    
                                                    const style = {
                                                        backgroundColor: suggestion.active ? '#fafafa' : '#ffffff',
                                                        cursor: 'pointer',
                                                    };
                                                    
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <Button
                                    text='Find a dentist'
                                    color='bg-brandPrimary'
                                    size='w-full lg:w-max'
                                    onClick={() => navigate('/steps/giftcard')}
                                />
                            </div>

                        {/* Mobile view: text and input */}
                        <div className="w-full flex flex-col items-left sm:hidden text-left space-y-3">
                            <p>Find your perfect dentist</p>
                            <PlacesAutocomplete
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                    searchOptions={{
                                        componentRestrictions: { country: 'CA' } 
                                    }}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className='relative w-full'>
                                            <div className='flex items-center border border-gray-300 rounded-xl'>
                                                <img className='ml-2' src={location_icon} alt="location-icon" />
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Enter your location',
                                                        className: 'input-location rounded-xl p-2 w-full outline-none',
                                                    })}
                                                />
                                            </div>
                                            
                                            {/* Autocomplete Suggestions Dropdown */}
                                            <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10">
                                                {loading && <div className="p-2 text-gray-500">
                                                        <Loading />
                                                    </div>}
                                                
                                                {suggestions?.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'bg-gray-200 cursor-pointer p-2'
                                                        : 'bg-white cursor-pointer p-2 hover:bg-gray-100';
                                                    
                                                    const style = {
                                                        backgroundColor: suggestion.active ? '#fafafa' : '#ffffff',
                                                        cursor: 'pointer',
                                                    };
                                                    
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <Button
                                    text='Find a dentist'
                                    color='bg-brandPrimary'
                                    size='w-full lg:w-max'
                                    onClick={() => navigate('/steps/giftcard')}
                                />
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};