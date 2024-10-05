import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../types';
import { DefaultLayout } from '../../layouts';
import { useApi } from '../../hooks';
import apiEndpoints from '../../apiEndpoints';
import { Error, Loading } from '../../components';
import { ClinicCard, CustomMarker } from './components';
import { GoogleMap } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


export const Clinics: React.FC<RouteProps> = ({ name }) => {
    const { callApi, response, loading, error } = useApi();
    const { callApi: searchClinics, response: responseClinics, loading: loadingClinics, error: errorClinics } = useApi();

    const [clinics, setClinics] = useState<any[]>([]);
    const [mapCenter, setMapCenter] = useState({ lat: 40.4047907, lng: 49.8402033 });

    const log = sessionStorage.getItem('clinicsLog');
    const [address, setAddress] = useState<string>('');
    const [coordinates, setCoordinates] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });

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
            <>
                <React.Fragment>
                    <div className='flex flex-col items-start lg:space-y-8 space-y-12 lg:my-8 lg:px-16'>
                        <h1 className='lg:text-5xl text-3xl text-textBlack font-semi-bold leading-129'>{name}</h1>

                        <div className='map-container w-full p-4 bg-mapBackground rounded-xl'>
                            <GoogleMap
                                mapContainerStyle={{ height: "440px", width: "100%" }}
                                center={mapCenter}
                                zoom={12}
                            >
                                {
                                    clinics?.map((clinic) => (
                                        <CustomMarker clinic={clinic} />
                                    ))
                                }
                            </GoogleMap>
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
                                />
                            ))}
                        </div>)}

                    </div>
                </React.Fragment>
            </>
        </DefaultLayout>
    );
};