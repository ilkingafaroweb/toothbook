import React, { useEffect, useState } from 'react';
import { useApi } from '../../../../hooks';
import apiEndpoints from '../../../../apiEndpoints';
import { Error, Loading } from '../../../../components';
import { x_icon_dark } from '../../../../assets';
import { useStepsContext } from '../../../../contexts';

interface InsuranceCard {
    id: number;
    name: string;
    imageURL: string;
}

export const InsuranceSelector: React.FC = () => {
    const { stepsData, setStepsData } = useStepsContext();
    const { callApi, loading, error, response } = useApi();
    const { callApi: getOthers, loading: othersLoading, error: othersError, response: othersResponse } = useApi();

    const [insuranceCompanies, setInsuranceCompanies] = useState<InsuranceCard[]>([]);
    const [otherInsurances, setOtherInsurances] = useState<InsuranceCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOtherInsurances, setSelectedOtherInsurances] = useState<number[]>([]);

    useEffect(() => {
        if (stepsData.insurance) {
            const selectedInsurance = insuranceCompanies.find(company => company.name === stepsData.insurance);
            setSelectedCard(selectedInsurance ? selectedInsurance.id : null);
        }
    }, [stepsData, insuranceCompanies]);

    useEffect(() => {
        let insuranceName = '';

        if (selectedCard) {
            const selectedInsurance = insuranceCompanies?.find(company => company.id === selectedCard);
            insuranceName = selectedInsurance ? selectedInsurance.name : '';
        }

        if (selectedOtherInsurances.length > 0) {
            const otherInsurance = otherInsurances?.find(company => company.id === selectedOtherInsurances[0]);
            insuranceName = otherInsurance ? otherInsurance.name : insuranceName;
        }

        setStepsData((prev) => ({
            ...prev,
            insurance: insuranceName,
        }));

        sessionStorage.setItem('your_insurance', insuranceName);
    }, [selectedCard, selectedOtherInsurances]);

    useEffect(() => {
        callApi({ endpoint: apiEndpoints.steps.getMainInsurances });
    }, []);

    useEffect(() => {
        if (response) {
            setInsuranceCompanies(response.insuranceCompanies);
        }
    }, [response]);

    useEffect(() => {
        if (othersResponse) {
            setOtherInsurances(othersResponse.insuranceCompanies);
        }
    }, [othersResponse]);

    const handleSelectCard = (id: number) => {
        setSelectedCard(prevSelectedCard => {
            // Clear the 'Other' selection if a valid insurance card is selected
            if (id !== -1) {
                setSelectedOtherInsurances([]); // Clear selected others
            }
            return prevSelectedCard === id ? null : id;
        });

        if (id === -1) {
            setIsInputVisible(true);
            getOthers({ endpoint: apiEndpoints.steps.getOtherInsurances });
        } else {
            setIsInputVisible(false);
            setDropdownVisible(false);
        }
    };

    const handleSelectOtherInsurance = (id: number) => {
        setSelectedOtherInsurances(prev => 
            prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [id]
        );

        // Clear the selection of 'Other' if an insurance company is selected
        if (selectedCard !== null) {
            setSelectedCard(null);
        }

        setSearchTerm('');
    };

    const handleInputFocus = () => {
        if (isInputVisible) {
            setDropdownVisible(true);
        }
    };

    const handleInputBlur = () => {
        // Delay hiding dropdown to allow checkbox clicks
        setTimeout(() => {
            setDropdownVisible(false);
        }, 200);
    };

    const filteredOtherInsurances = otherInsurances?.filter(insurance =>
        insurance.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lg:w-full flex flex-wrap items-center justify-center gap-4">
            {loading ? (
                <Loading />
            ) : error ? (
                <Error />
            ) : (
                <>
                    <div className='flex justify-between flex-wrap gap-4'>
                        {insuranceCompanies.map((insuranceCard: InsuranceCard) => (
                            <div
                                key={insuranceCard.id}
                                className={`h-20 lg:w-[calc(25%-1rem)] w-[calc(50%-1rem)] border rounded-lg flex justify-center items-center cursor-pointer ${selectedCard === insuranceCard.id ? 'border-brandPrimary bg-brandPrimary bg-opacity-20' : 'border-gray-300'
                                    }`}
                                onClick={() => handleSelectCard(insuranceCard.id)}
                            >
                                <img
                                    src={insuranceCard.imageURL}
                                    alt={insuranceCard.name}
                                    className="mx-auto"
                                />
                                <input
                                    type="radio"
                                    name="insuranceCard"
                                    value={insuranceCard.id}
                                    checked={selectedCard === insuranceCard.id}
                                    onChange={() => handleSelectCard(insuranceCard.id)}
                                    className="absolute opacity-0 cursor-pointer"
                                />
                            </div>
                        ))}
                        {/* Other card to trigger input */}
                        <div
                            className={`h-20 lg:w-[calc(25%-1rem)] w-[calc(50%-1rem)] border rounded-lg flex justify-center items-center cursor-pointer ${selectedCard === -1 ? 'border-brandPrimary' : 'border-gray-300'
                                }`}
                            onClick={() => handleSelectCard(-1)}
                        >
                            <span className="text-lg">Other</span>
                        </div>
                    </div>

                    {/* Search input and dropdown */}
                    {isInputVisible && (
                        <div className="relative w-full">
                            <div className="flex flex-wrap items-center border rounded-lg p-2">
                                {selectedOtherInsurances.map(cardId => {
                                    const card = otherInsurances.find(c => c.id === cardId);
                                    return (
                                        <div key={cardId} className="flex items-center bg-selectedServices text-white rounded-full py-2 px-3 m-1">
                                            <span className='text-black opacity-80'>{card?.name}</span>
                                            <button onClick={() => handleSelectOtherInsurance(cardId)} className="ml-2">
                                                <img src={x_icon_dark} alt="x-icon-dark" />
                                            </button>
                                        </div>
                                    );
                                })}
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Search and select your insurance provider"
                                    className="flex-grow p-1 outline-none"
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            </div>

                            {/* Show dropdown only when focused */}
                            {dropdownVisible && (
                                <div className="mt-1 w-full bg-white border rounded-lg shadow-lg">
                                    <div className="max-h-60 overflow-y-auto border-t p-2">
                                        {othersLoading ? (
                                            <Loading />
                                        ) : othersError ? (
                                            <Error />
                                        ) : (
                                            filteredOtherInsurances?.map(card => (
                                                <label key={card.id} className="flex items-center cursor-pointer p-2 hover:bg-gray-200">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedOtherInsurances.includes(card.id)}
                                                        onChange={() => handleSelectOtherInsurance(card.id)}
                                                        className="mr-2 hidden"
                                                    />
                                                    <span>{card.name}</span>
                                                    {selectedOtherInsurances.includes(card.id) && (
                                                        <span className="ml-auto text-brandPrimary">&#10003;</span>
                                                    )}
                                                </label>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};