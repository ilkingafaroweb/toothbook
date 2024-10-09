import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

interface Clinic {
    name: string;
    rating: number;
    reviews: number;
    address: string;
    longitude: number;
    latitude: number;
    phone?: string;
    imageURL?: string;
    openingTime?: string;
    closingTime?: string;
}

interface CustomMarkerProps {
    clinic: Clinic;
    selectedClinic: string | null;
    onSelect: (arg: any) => void;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({ clinic, selectedClinic, onSelect }) => {

    const handleMarkerClick = () => {
        if (selectedClinic && selectedClinic === clinic.name) {
            // Deselect if the same marker is clicked
            onSelect(null);
        } else {
            onSelect(clinic.name);
        }
    };

    return (
        <div>
            <Marker
                position={{ lat: clinic.latitude, lng: clinic.longitude }}
                icon={{
                    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="#FF6F61" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
            </svg>
          `),
                    scaledSize: new window.google.maps.Size(40, 40),
                }}
                title={clinic.name}
                onClick={handleMarkerClick}
            />
            {selectedClinic && selectedClinic === clinic.name && (
                <InfoWindow
                    position={{ lat: clinic.latitude, lng: clinic.longitude }}
                    onCloseClick={() => onSelect(null)}
                >
                    <div className='lg:w-60 w-24'>
                        <div className='flex items-center gap-5 mb-4'>
                            {clinic.imageURL && <img src={clinic.imageURL} alt={clinic.name} style={{ width: 'auto', height: '50px' }} />}
                            <h2 className='lg:text-lg font-medium'>{clinic.name}</h2>
                        </div>
                        <p className='font-medium'>Address: {clinic.address}</p>
                    </div>
                </InfoWindow>
            )}
        </div>
    );
};
