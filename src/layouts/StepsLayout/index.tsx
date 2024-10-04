import { ReactNode, useEffect, useState } from 'react';
import { Button, OfferBanner } from '../../components';
import { ProgressBar } from '../../pages/Steps/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { brandLogo } from '../../assets';
import { useApi } from '../../hooks';
import apiEndpoints from '../../apiEndpoints';
import { useOffer, useStepsContext } from '../../contexts';

interface LayoutProps {
    children: ReactNode;
}

export const StepsLayout = ({ children }: LayoutProps) => {
    const { isOfferVisible } = useOffer()
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(0);

    const { stepsData } = useStepsContext() 

    const { callApi, response, loading } = useApi()

    useEffect(() => {
        if(response){
            sessionStorage.setItem('clinicsLog', response)
            navigate('/clinics')
        }
    }, [response])

    useEffect(() => {
        setStep(1)
    }, [])

    useEffect(() => {
        const stepMap: Record<string, number> = {
            '/steps/giftcard': 1,
            '/steps/services': 2,
            '/steps/insuranceQuestion': 3,
            '/steps/insuranceSelect': 4,
            '/steps/dentistQuestion': 5,
        };

        setStep(stepMap[location.pathname] || 1);
    }, [location.pathname]);

    useEffect(() => {
        const pathMap: Record<number, string> = {
            1: '/steps/giftcard',
            2: '/steps/services',
            3: '/steps/insuranceQuestion',
            4: '/steps/insuranceQuestion',
            5: '/steps/dentistQuestion',
        };

        navigate(pathMap[step]);
    }, [step]);

    useEffect(() => {
    
        const handlePopState = () => {
            setStep((prevStep) => Math.max(prevStep - 1, 1));
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleBack = () => {
        if (step === 1) {
            if (isOfferVisible) {
                navigate('/findyourdentist');
            } else {
                navigate('/');
            }
        } else {
            setStep((prevStep) => Math.max(prevStep - 1, 1)); 
        }
    };

    const handleContinue = async () => {
        if (step === 5) {
            callApi({
                method: 'POST',
                endpoint: apiEndpoints.steps.postStepsData,
                data: stepsData
            })
        } else {
            setStep((prevStep) => Math.min(prevStep + 1, 5));
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <OfferBanner />
            <div className='w-full lg:px-24 px-6 lg:pt-6 pt-3'>
                <img src={brandLogo} alt='brand-logo' />
            </div>
            <ProgressBar step={step} />

            <main className="flex-grow container lg:mx-auto px-6 lg:py-6 pb-24">
                {children}
            </main>

            <div className='hidden lg:flex justify-between lg:px-24 px-6 lg:pb-12'>
                <Button
                    text='Back'
                    color='bg-brandSecondary'
                    onClick={handleBack}
                    hover={true}
                />
                <Button
                    text="Continue"
                    color='bg-brandPrimary'
                    onClick={handleContinue}
                    isLoading={loading}
                    hover={true}
                />

            </div>
            <div className='lg:hidden fixed bottom-0 w-full h-max border-t bg-white py-4'>
                <Button
                    text="Continue"
                    color='bg-brandPrimary'
                    onClick={handleContinue}
                    isLoading={loading}
                    size='w-[80%] mx-auto'
                />
            </div>
        </div>
    );
};
