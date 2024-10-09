import React, { useEffect, useState } from "react";
import { RouteProps } from "../../types";
import { StepsLayout } from "../../layouts";
import { useApi } from "../../hooks";
import apiEndpoints from "../../apiEndpoints";
import { EndQuestion, FirstQuestion, GiftCardSelector, ServiceCardSelector } from "./components";
import { Error, Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { useStepsContext } from "../../contexts";

interface Cards {
    id: number;
    name: string;
    imageURL: string;
}

export const Steps: React.FC<RouteProps> = () => {

    const { stepsData } = useStepsContext()

    useEffect(() => {
        console.log("Steps data --->", stepsData);
    }, [stepsData])

    const navigate = useNavigate()
    const [step, setStep] = useState<number>(0);

    const { callApi: getGiftcards, loading: loadingGiftcards, error: errorGiftcards, response: responseGiftcards } = useApi()

    const [giftCards, setGiftCards] = useState<Cards[]>([])

    useEffect(() => {
        console.log("Step --->", step);
    }, [step])

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
            4: '/steps/insuranceSelect',
            5: '/steps/dentistQuestion',
        };

        navigate(pathMap[step]);
    }, [step]);

    useEffect(() => {
        getGiftcards({ endpoint: apiEndpoints.steps.giftcard })
    }, [])

    useEffect(() => {
        { responseGiftcards && setGiftCards(responseGiftcards.giftCards) }
    }, [responseGiftcards])


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
                            <ServiceCardSelector />
                        </div>
                    </div>
                )  : step === 5 ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-2 lg:w-[470px]">
                            <h1 className="text-black lg:text-2xl text-xl text-left font-semibold">How do you feel about going to dentist?</h1>
                            <p className="text-black opacity-65 font-semibold">Please choose the option that best describes your feelings. We need to understand your dental anxiety and find the best match for you.</p>
                            <EndQuestion />
                        </div>
                    </div>
                ) : (
                    <FirstQuestion step={step} setStep={setStep} />
                )
            }
        </StepsLayout>
    )
}