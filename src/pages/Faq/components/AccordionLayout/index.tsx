import { AccordionGroup } from "../AccordionGroup";
import { faqImages } from "../../../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const AccordionLayout = () => {

    const [expandSection, setExpandSection] = useState<string | null>(null);

    const handleToggle = (section: string) => {
        setExpandSection(expandSection === section ? null : section);
    };

    const forPatient = [
        { title: 'Title 1', content: 'Content for accordion item 1' },
        { title: 'Title 2', content: 'Content for accordion item 2' },
        { title: 'Title 3', content: 'Content for accordion item 3' },
        { title: 'Title 4', content: 'Content for accordion item 4' },
        { title: 'Title 5', content: 'Content for accordion item 5' },
    ];

    const forDentist = [
        { title: 'Title 1', content: 'Content for accordion item 1' },
        { title: 'Title 2', content: 'Content for accordion item 2' },
        { title: 'Title 3', content: 'Content for accordion item 3' },
        { title: 'Title 4', content: 'Content for accordion item 4' },
        { title: 'Title 5', content: 'Content for accordion item 5' },
    ];


    return (
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
                    <AccordionGroup items={forPatient} />
                </div>
                {/* Mobile view */}
                <div className={`lg:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${expandSection === "forPatient" ? 'h-max pb-6' : 'h-0'}`}>
                    <AccordionGroup items={forPatient} />
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
                    <AccordionGroup items={forDentist} />
                </div>
                {/* Mobile accordion view */}
                <div className={`lg:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${expandSection === "forDentist" ? 'h-max pb-6' : 'h-0'}`}>
                    <AccordionGroup items={forDentist} />
                </div>
            </div>
        </div>
    );
};