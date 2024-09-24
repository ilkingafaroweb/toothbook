import { AccordionGroup } from "../AccordionGroup";
import { faqImages } from "../../../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useApi } from "../../../../hooks";
import apiEndpoints from "../../../../apiEndpoints";
import { Error, Loading } from "../../../../components";

export const AccordionLayout = () => {

    const { callApi, loading, error, response } = useApi();

    const [expandSection, setExpandSection] = useState<string | null>(null);

    const [forPatients, setForPatients] = useState<any[]>([]);
    const [forDentists, setForDentists] = useState<any[]>([]);

    const handleToggle = (section: string) => {
        setExpandSection(expandSection === section ? null : section);
    };

    useEffect(() => {
        (async () => await callApi({ endpoint: apiEndpoints.faq.get }))();
    }, []);


    useEffect(() => {
        if (response) {
            setForPatients(response.forPatients || []);
            setForDentists(response.forDentists || []);
        }
    }, [response]);


    return loading ? <Loading /> : error ? <Error /> : (
        <div className="w-full flex lg:flex-row flex-col lg:space-x-24 lg:space-y-0 space-y-12">
            <div className="relative lg:w-1/2 w-full space-y-12">
                <img src={faqImages.patient} className="absolute lg:-top-11 lg:left-1/3 left-[35%] -top-10 -z-10" alt="patient" />
                <div className="relative w-full  text-center p-8 lg:rounded-none lg:rounded-r-full rounded-full lg:pl-0 bg-accordionColor">
                    <h1 className="text-2xl font-semi-bold text-white">FOR PATIENT</h1>
                    <button className="lg:hidden absolute top-[33%] right-6" onClick={() => handleToggle('forPatient')}>
                        <FontAwesomeIcon icon={faAnglesDown} size="2x" />
                    </button>
                </div>
                <div className="lg:block hidden">
                    <AccordionGroup items={forPatients} />
                </div>
                {/* Mobile view */}
                <div className={`lg:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${expandSection === "forPatient" ? 'h-max pb-6' : 'h-0'}`}>
                    <AccordionGroup items={forPatients} />
                </div>
            </div>
            <div className="relative lg:w-1/2 w-full space-y-12">
                <img src={faqImages.dentist} className="absolute -top-11 right-1/3 -z-10" alt="dentist" />
                <div className="relative w-full text-center p-8 lg:rounded-none lg:rounded-l-full rounded-full lg:pr-0 bg-accordionColor">
                    <h1 className="text-2xl font-semi-bold text-white">FOR DENTIST</h1>
                    <button className="lg:hidden absolute top-[33%] right-6" onClick={() => handleToggle('forDentist')}>
                        <FontAwesomeIcon icon={faAnglesDown} size="2x" />
                    </button>
                </div>
                <div className="lg:block hidden">
                    <AccordionGroup items={forDentists} />
                </div>
                {/* Mobile accordion view */}
                <div className={`lg:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${expandSection === "forDentist" ? 'h-max pb-6' : 'h-0'}`}>
                    <AccordionGroup items={forDentists} />
                </div>
            </div>
        </div>
    );
};