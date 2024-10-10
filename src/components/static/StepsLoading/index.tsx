import React, { useEffect, useState } from 'react';
import { brandLogo } from '../../../assets';

export const StepsLoading: React.FC= () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [address, setAddress] = useState('');
    const [insurance, setInsurance] = useState('')
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        const loc = localStorage.getItem('your_address');
        const insurance = sessionStorage.getItem('your_insurance')
        if (loc) {
            setAddress(loc);
        }
        if(insurance){
            setInsurance(insurance)
        }
    }, []);

    const steps = [
        `Finding dentists near ${address}`,
        insurance && `Filtering dentists that accept ${insurance}...`,
        'Finding dentists who meet your preferences...',
    ].filter(Boolean);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep < steps.length - 1) {
                    return prevStep + 1;
                } else {
                    clearInterval(timer);
                    return prevStep;
                }
            });
            
        }, (6000 / steps.length) );

        setTimeout(() => {
            sessionStorage.setItem('loading', 'no')
        }, 6000)

        return () => clearInterval(timer);
    }, [steps.length]);
    

    useEffect(() => {
        if (currentStep === steps.length - 1) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [currentStep, steps.length]);

    useEffect(() => {
        console.log('isVisible changed:', isVisible);
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible]);
    

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 lg:px-24 px-6 bottom-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-white font-inter leading-129 overflow-hidden">
            <div className='fixed lg:top-12 top-8 w-full lg:px-24 px-6 lg:pb-16 pb-8'>
                <img src={brandLogo} alt='brand-logo' />
            </div>
            <h1 className='lg:text-[32px] text-2xl opacity-80 mb-12 font-medium font-sans'>Finding Your Perfect Dentist</h1>
            <div className="relative flex">
                {/* Loading Bar */}
                <div className="relative top-0 left-[21px] w-[3px] h-[80%] bg-gray-300 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full bg-brandPrimary transition-all duration-1000"
                        style={{
                            height: `${((currentStep + 1) / steps.length) * 100}%`,
                        }}
                    />
                </div>

                {/* Steps List */}
                <div className="relative z-50 flex flex-col h-72 justify-between">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start mb-2">
                            <label className="flex items-center cursor-pointer mr-4">
                                <input
                                    type="checkbox"
                                    checked={currentStep >= index}
                                    readOnly
                                    className="hidden"
                                />
                                <span
                                    className={`w-10 h-10 flex items-center justify-center border-4 border-white rounded-full ${currentStep >= index ? 'bg-brandPrimary' : 'bg-gray-200'}`}
                                >
                                    {currentStep >= index ? <span className="text-white text-2xl">&#10003;</span> : null}
                                </span>
                            </label>
                            <div>
                                <h1 className='text-gray-700 font-semibold'>Step {index + 1}</h1>
                                <p className={`lg:w-80 opacity-50`}>
                                    {step}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};