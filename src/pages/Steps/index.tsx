import React, { useEffect, useState } from "react";
import { RouteProps } from "../../types";
import { StepsLayout } from "../../layouts";
import { useApi } from "../../hooks";
import apiEndpoints from "../../apiEndpoints";
import { FirstQuestion, GiftCardSelector, ServiceCardSelector } from "./components";
import { Error, Loading } from "../../components";

interface Cards {
    id: number;
    name: string;
    imageURL: string;
}

export const Steps: React.FC<RouteProps> = () => {
    const [step, setStep] = useState<number>(0);

    const { callApi: getGiftcards, loading: loadingGiftcards, error: errorGiftcards, response: responseGiftcards } = useApi()
    const { callApi: getServiceCards, loading: loadingServiceCards, error: errorServiceCards, response: responseServiceCards } = useApi()

    const [giftCards, setGiftCards] = useState<Cards[]>([])
    const [serviceCards, setServiceCards] = useState<Cards[]>([])

    useEffect(() => {
        const stepMap: Record<string, number> = {
            '/steps/giftcard': 1,
            '/steps/services': 2,
            '/steps/insuranceQuestion': 3,
            '/steps/dentistQuestion': 4,
        };

        setStep(stepMap[location.pathname] || 1);
    }, [location.pathname]);

    useEffect(() => {
        getGiftcards({ endpoint: apiEndpoints.steps.giftcard })
        getServiceCards({ endpoint: apiEndpoints.steps.services })
    }, [])

    useEffect(() => {
        { responseGiftcards && setGiftCards(responseGiftcards.giftCards) }
    }, [responseGiftcards])

    useEffect(() => {
        { responseServiceCards && setServiceCards(responseServiceCards.services) }
    }, [responseServiceCards])

    return (
        <StepsLayout>
            {
                step === 1 ? (
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col items-center gap-2 lg:w-[680px]">
                            <h1 className="text-black opacity-80 lg:text-3xl text-2xl text-center font-semibold">Welcome to ToothBook!</h1>
                            <p className="text-black opacity-65 text-center">We're excited to make your dental experience as smooth and enjoyable as possible. Let's get started with a few simple steps to customize your journey with us.</p>
                        </div>
                        <div>
                            <h1 className="text-black opacity-90 text-2xl font-semibold text-center">
                                Choose Your <span className="text-accentColor">50$</span>  Gift Card
                            </h1>
                        </div>
                        {
                            loadingGiftcards ? (<Loading />) : errorGiftcards ? (<Error />) : (
                                <GiftCardSelector giftCards={giftCards} />
                            )
                        }
                    </div>
                ) : step === 2 ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-col items-start gap-2 w-full lg:max-w-[1000px]">
                            <h1 className="text-black opacity-80 lg:text-3xl text-2xl text-center font-semibold mb-3">Which services are you interested in?</h1>
                            {
                                loadingServiceCards ? (<Loading />) : errorServiceCards ? (<Error />) : (
                                    <ServiceCardSelector serviceCards={serviceCards} />
                                )
                            }
                        </div>
                    </div>
                ) : step === 3 ? (
                    <FirstQuestion />
                ) : step === 4 && (
                    <div className="text-9xl">
                        4
                    </div>
                )
            }
        </StepsLayout>
    )
}