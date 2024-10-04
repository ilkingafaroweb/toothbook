import { Marker , InfoWindow } from '@react-google-maps/api'
import { useState } from 'react';

interface Clinic {
    name: string;
    rating: number;
    reviews: number;
    careExcellence?: boolean;
    address: string;
    distance: number;
    longitude: number;
    latitude: number;
    phone: string;
    insurance?: boolean;
    bookingCount: number;
    mapLink: string;
    imageURL: string;
}

interface CustomMarkerProps {
    clinic: Clinic; 
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({ clinic }) => {
    const [selected, setSelected] = useState(false);

    return (
        <div>
            <Marker
                position={{ lat: clinic.latitude, lng: clinic.longitude }}
                icon={{
                    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="#7C93B0" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                        </svg>
                    `),
                    scaledSize: new window.google.maps.Size(50, 50),
                }}
                onClick={() => setSelected(true)} 
            />
            {selected && (
                <InfoWindow
                    position={{ lat: clinic.latitude, lng: clinic.longitude }}
                    onCloseClick={() => setSelected(false)} 
                >
                    <div>
                        <h2 className="font-bold">{clinic.name}</h2>
                        <p>Diğer bilgiler...</p>
                    </div>
                </InfoWindow>
            )}
        </div>
    );
};