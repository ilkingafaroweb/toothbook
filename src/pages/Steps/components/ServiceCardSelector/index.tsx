import React, { useEffect, useState } from 'react';
import { x_icon_dark } from '../../../../assets'; // Assuming x_icon_dark is imported from the correct path
import { useApi } from '../../../../hooks'; // Assuming useApi is defined and properly typed
import apiEndpoints from '../../../../apiEndpoints';
import { Error, Loading } from '../../../../components';
import { useStepsContext } from '../../../../contexts';

interface ServiceCard {
    id: number;
    name: string;
    imageURL: string;
}

export const ServiceCardSelector: React.FC = () => {

    const { stepsData, setStepsData } = useStepsContext();

    const { callApi, loading, error, response } = useApi();
    const { callApi: getServiceCards, response: responseServiceCards } = useApi()

    const [serviceCards, setServiceCards] = useState<ServiceCard[]>([])

    const [selectedCards, setSelectedCards] = useState<number[]>(stepsData.services);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [otherServices, setOtherServices] = useState<ServiceCard[]>([]); 
    const [otherSelected, setOtherSelected] = useState<number[]>([]);

    useEffect(() => {
        if (selectedCards && selectedCards.includes(7)) {
            setIsDropdownVisible(true)
        }else{
            setIsDropdownVisible(false)
        }
    }, [selectedCards]); 
    

    useEffect(() => {
        console.log(otherSelected);
    }, [otherSelected])

    useEffect(() => {
        getServiceCards({ endpoint: apiEndpoints.steps.services })
    }, [])

    useEffect(() => {
        { responseServiceCards && setServiceCards(responseServiceCards.services) }
    }, [responseServiceCards])


    useEffect(() => {
        if (stepsData.services) {
            const selectedCards = stepsData.services.filter(serviceId => serviceId >= 1 && serviceId <= 7);
            
            const otherSelected = stepsData.services.filter(serviceId => serviceId < 1 || serviceId > 7);
    
            setSelectedCards(selectedCards);
            setOtherSelected(otherSelected);
        }
    }, []); 
    
    

    useEffect(() => {
        if (selectedCards || otherSelected) {
            setStepsData((prev) => {
                const existingServices = prev.services || [];
    
                const newServices = [
                    ...existingServices,
                    ...(selectedCards || []),
                    ...(otherSelected || [])
                ];
    
                const uniqueServices = Array.from(new Set(newServices));
    
                return {
                    ...prev,
                    services: uniqueServices
                };
            });
        }
    }, [selectedCards, otherSelected]);

    const handleSelectCard = (id: number) => {
        const newSelectedCards = selectedCards.includes(id)
            ? selectedCards.filter(cardId => cardId !== id)
            : [...selectedCards, id];

        setSelectedCards(newSelectedCards);
    };

    const handleOtherSelected = (id: number) => {
        const newSelectedCards = otherSelected.includes(id)
            ? otherSelected.filter(cardId => cardId !== id)
            : [...otherSelected, id]; // Corrected to use otherSelected

        setOtherSelected(newSelectedCards);
    };

    useEffect(() => {
        if (isDropdownVisible) {
            callApi({ endpoint: apiEndpoints.steps.otherServices });
        }
    }, [isDropdownVisible]);

    useEffect(() => {
        if (response) {
            setOtherServices(response.services);
        }
    }, [response]);

    const sortedServiceCards = [...serviceCards].sort((a, b) => (a.id === 7 ? 1 : b.id === 7 ? -1 : 0));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleRemoveSelectedCard = (id: number) => {
        setOtherSelected(otherSelected.filter(cardId => cardId !== id));
    };

    const filteredCards = otherServices.filter(a => !otherSelected.includes(a.id)) .filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lg:w-full flex flex-wrap items-center justify-center gap-4">
            {sortedServiceCards.map((serviceCard: ServiceCard) => (
                <div
                    key={serviceCard.id}
                    className={`h-20 lg:w-[calc(50%-1rem)] w-full border rounded-lg flex items-center cursor-pointer p-4 ${selectedCards.includes(serviceCard.id) ? 'border-brandPrimary' : 'border-gray-300'}`}
                    onClick={() => handleSelectCard(serviceCard.id)}
                >
                    {/* Checkbox */}
                    <label className="flex items-center cursor-pointer mr-4">
                        <input
                            type="checkbox"
                            checked={selectedCards.includes(serviceCard.id)}
                            onChange={() => handleSelectCard(serviceCard.id)}
                            className="hidden"
                        />
                        <span className={`w-6 h-6 flex items-center justify-center border-2 rounded ${selectedCards.includes(serviceCard.id) ? 'bg-brandPrimary border-brandPrimary' : 'border-gray-300'}`}>
                            {selectedCards.includes(serviceCard.id) && (
                                <span className="text-white">&#10003;</span> // Checkmark
                            )}
                        </span>
                    </label>

                    {/* Image */}
                    <img
                        src={serviceCard.imageURL}
                        alt={serviceCard.name}
                        className="w-10 h-10 object-cover mr-4"
                    />

                    {/* Text */}
                    <span className='text-xl font-medium opacity-65'>{serviceCard.name}</span>
                </div>
            ))}

            {/* Multi-select Dropdown */}
            <div className="relative w-full">
                {isDropdownVisible && (
                    <>
                        {
                            loading ? <Loading /> : error ? <Error /> : (
                                <>
                                    <div className="flex flex-wrap items-center border rounded-lg p-2">
                                        {otherSelected.map(cardId => {
                                            const card = otherServices.find(c => c.id === cardId);
                                            return (
                                                <div key={cardId} className="flex items-center bg-selectedServices text-white rounded-full py-2 px-3 m-1">
                                                    <span className='text-black opacity-80'>{card?.name}</span>
                                                    <button onClick={() => handleRemoveSelectedCard(cardId)} className="ml-2">
                                                        <img src={x_icon_dark} alt="Remove icon" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            onFocus={() => setIsDropdownVisible(true)}
                                            placeholder="Search..."
                                            className="flex-grow p-1 outline-none"
                                        />
                                    </div>

                                    <div className="mt-1 w-full bg-white border rounded-lg shadow-lg">
                                        <div className="max-h-60 overflow-y-auto border-t p-2">
                                            {filteredCards.map(card => (
                                                <label key={card.id} className="flex items-center cursor-pointer p-2 hover:bg-gray-200">
                                                    <input
                                                        type="checkbox"
                                                        checked={otherSelected.includes(card.id)}
                                                        onChange={() => {
                                                            handleOtherSelected(card.id);
                                                        }}
                                                        className="mr-2 hidden"
                                                    />
                                                    {card.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </>
                )}
            </div>
        </div>
    );
};