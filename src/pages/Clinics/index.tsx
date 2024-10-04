import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../types';
import { DefaultLayout } from '../../layouts';
import { useApi } from '../../hooks';
import apiEndpoints from '../../apiEndpoints';
import { Error, Loading } from '../../components';
import { ClinicCard, CustomMarker } from './components';
import { GoogleMap } from '@react-google-maps/api';


export const Clinics: React.FC<RouteProps> = ({ name }) => {
    const log = sessionStorage.getItem('clinicsLog');
    const { callApi, response, loading, error } = useApi();
    const [clinics, setClinics] = useState<any[]>([]);
    const [mapCenter, setMapCenter] = useState({ lat: 40.4047907, lng: 49.8402033 }); // Varsayılan mərkəz

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
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error />
                ) : (
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
                            </div>


                            <div className='flex flex-wrap justify-between w-full gap-6'>
                                {clinics?.map((clinic) => (
                                    <ClinicCard
                                        key={clinic.id}
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
                                        excellence={clinic.inlineTag === 'excellence'}
                                        topRated={clinic.topRated === 'topRated'}
                                        recommended={clinic.inlineTag === 'high'}
                                        best={clinic.inlineTag === 'best'}
                                    />
                                ))}
                            </div>
                        </div>


                    </React.Fragment>
                )}
            </>
        </DefaultLayout>
    );
};