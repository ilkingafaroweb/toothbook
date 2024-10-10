import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../types';
import { DefaultLayout } from '../../layouts';
import { useApi } from '../../hooks';
import apiEndpoints from '../../apiEndpoints';
import { Error, Loading, StepsLoading } from '../../components';
import { ClinicCard, CustomMarker } from './components';
import { GoogleMap } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { adv_banner, adv_mobile } from '../../assets';
import Swal from 'sweetalert2';
import { useBooking, useLogin } from '../../contexts';

interface BookNowParams {
    clinicId: number; 
    name: string;    
}

export const Clinics: React.FC<RouteProps> = ({ name }) => {

    const { isAuthenticated } = useLogin()
    const loadingVisible = sessionStorage.getItem('loading')

    const { openBooking, isBookingOpen } = useBooking()

    const { callApi, response, loading, error } = useApi();
    const { callApi: searchClinics, response: responseClinics, loading: loadingClinics, error: errorClinics } = useApi();
    const { callApi: checkBooking, response: checkBookingResponse, error: errorCheckBooking } = useApi()

    const [clinics, setClinics] = useState<any[]>([]);
    const [mapCenter, setMapCenter] = useState({ lat: 40.4047907, lng: 49.8402033 });

    const log = sessionStorage.getItem('clinicsLog');
    const [address, setAddress] = useState<string>(localStorage.getItem('your_address') || '');
    const [coordinates, setCoordinates] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });

    const [selectedClinic, setSelectedClinic] = useState('')

    useEffect(() => {
        if (sessionStorage.getItem('scrollClinics') === 'yes') {
            const scrollTimeout = setTimeout(() => {
                window.scrollTo({
                    top: 900, 
                    behavior: 'smooth' 
                });
                sessionStorage.setItem('scrollClinics', 'no'); 
            }, 6000); 

            return () => clearTimeout(scrollTimeout);
        }
        window.scrollTo(0, 0);
        checkBooking({
            endpoint: apiEndpoints.clinics.check,
        });
    }, []);


    useEffect(() => {
        if(!isBookingOpen){
            checkBooking({
                endpoint: apiEndpoints.clinics.check,
            });
        }
    }, [isBookingOpen])


    useEffect(() => {
        
        const firstClinic = clinics[0];

        if (firstClinic?.distance > 10) {
            setTimeout(() => {
                Swal.fire({
                    title: 'Warning',
                    text: 'We are too far from you. We are expanding soon!',
                    icon: 'warning',
                });
            }, 6500)
        }
    }, [])


    const handleBookNow = async ({ clinicId, name }: BookNowParams): Promise<void> => {
        if(isAuthenticated){
            if (checkBookingResponse) {
                openBooking(clinicId, name);
            } else if (errorCheckBooking) {
                Swal.fire({
                    title: 'Warning',
                    text: 'You have an active booking. You can create a new one after you attend or cancel your existing appointment.',
                    icon: 'warning',
                });
            }
        }else {
            openBooking(clinicId, name);
        }
    };


    useEffect(() => {
        if (response) {
            setClinics(response.clinics);
            if (response.clinics.length > 0) {
                setMapCenter({
                    lat: response.clinics[0].latitude,
                    lng: response.clinics[0].longitude,
                });
            }
        }
    }, [response]);

    useEffect(() => {
        if (responseClinics) {
            setClinics(responseClinics.clinics);
            if (responseClinics.clinics.length > 0) {
                setMapCenter({
                    lat: responseClinics.clinics[0].latitude,
                    lng: responseClinics.clinics[0].longitude,
                });
            }
        }
    }, [responseClinics]);

    useEffect(() => {
        if (coordinates.lat !== null && coordinates.lng !== null) {
            searchClinics({
                endpoint: apiEndpoints.clinics.search,
                params: {
                    logId: log,
                    longitude: coordinates.lng,
                    latitude: coordinates.lat
                },
            });
        }
    }, [coordinates]);

    const handleSelect = async (selectedAddress: string) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setAddress(selectedAddress)
            setCoordinates(latLng);

        } catch (error) {
            console.error('Error fetching geocode data: ', error);
        }
    };

    useEffect(() => {
        callApi({
            endpoint: apiEndpoints.clinics.list,
            params: {
                logId: log,
            },
        });
    }, [log]);

    return (
        <DefaultLayout>
            <React.Fragment>
                {
                    loadingVisible !== 'no' && <StepsLoading />
                }
                <div className='flex flex-col items-start lg:space-y-8 space-y-12 lg:my-8 lg:px-16'>
                    <h1 className='lg:text-5xl text-3xl text-textBlack font-semi-bold leading-129'>{name}</h1>

                    <div className='map-container w-full p-4 bg-mapBackground rounded-xl'>
                        {clinics && <GoogleMap
                            mapContainerStyle={{ height: "440px", width: "100%" }}
                            center={mapCenter}
                            zoom={12}
                        >
                            {clinics?.map(clinic => (
                                <CustomMarker
                                    key={clinic.name}
                                    clinic={clinic}
                                    selectedClinic={selectedClinic}
                                    onSelect={setSelectedClinic}
                                />
                            ))}
                        </GoogleMap>}

                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={handleSelect}
                            searchOptions={{
                                componentRestrictions: { country: 'CA' }
                            }}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className='relative mt-3 w-full'>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Enter your location',
                                            className: 'input-location border border-gray-300 rounded-full py-2 px-3 w-full outline-none focus:border-brandPrimary',
                                        })}
                                    />
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
                    </div>

                    <img className='w-full h-auto lg:block hidden' src={adv_banner} alt="banner" />
                    <img className='w-full h-auto lg:hidden block' src={adv_mobile} alt="mobile" />


                    {loading || loadingClinics ? (
                        <Loading />
                    ) : error || errorClinics ? (
                        <Error />
                    ) : (<div className='flex flex-wrap justify-between w-full gap-6'>
                        {clinics?.map((clinic) => (
                            <ClinicCard
                                clinicId={clinic.id}
                                name={clinic.name}
                                rating={clinic.ratingStar}
                                reviews={clinic.reviewsCount}
                                address={clinic.address}
                                distance={clinic.distance}
                                phone={clinic.phoneNumber}
                                insurance={clinic.doesAcceptInsurance}
                                bookingCount={clinic.bookingCount}
                                mapLink={clinic.mapURL}
                                imageURL={clinic.imageURL}
                                inlineTag={clinic.inlineTag}
                                onTopTag={clinic.onTopTag}
                                handleBookNow={handleBookNow}
                            />
                        ))}
                    </div>)}

                </div>
            </React.Fragment>
        </DefaultLayout>
    );
};