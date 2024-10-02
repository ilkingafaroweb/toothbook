import React from 'react';

interface StepItem {
    title: string;
    content: string;
}

interface Steps {
    steps: StepItem[];
}

const Step: React.FC<{ stepNumber: number; }> = ({ stepNumber }) => {
    return (
        <div className="text-center w-12 lg:h-full">
            <h2 className="text-brandPrimary text-5xl">{stepNumber}</h2>
        </div>
    );
};

const Content: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    return (
        <div className="lg:w-1/5 px-4 mb-6">
            <h3 className="text-black opacity-80 lg:text-center text-2xl font-semibold mb-3">
                {title.split(' ').slice(0, Math.ceil(title.split(' ').length / 2)).join(' ')}
                <br />
                {title.split(' ').slice(Math.ceil(title.split(' ').length / 2)).join(' ')}
            </h3>
            <p className="text-black opacity-65 lg:text-center text-sm">{content}</p>
        </div>
    )

}

const Arrow: React.FC = () => {
    return (
        <span className='lg:inline-block lg:rotate-0 md:rotate-0 hidden rotate-90'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="186"
                height="8"
                viewBox="0 0 186 8"
                fill="none"
            >
                <path d="M185.354 4.35354C185.549 4.15827 185.549 3.84169 185.354 3.64643L182.172 0.46445C181.976 0.269188 181.66 0.269188 181.464 0.46445C181.269 0.659712 181.269 0.976295 181.464 1.17156L184.293 3.99998L181.464 6.82841C181.269 7.02367 181.269 7.34026 181.464 7.53552C181.66 7.73078 181.976 7.73078 182.172 7.53552L185.354 4.35354ZM4.39477e-08 4.5L185 4.49998L185 3.49998L-4.39477e-08 3.5L4.39477e-08 4.5Z" fill="#FFAF1E" />
            </svg>
        </span>
    );
};


// Main HowToPartner component
export const HowToPartner: React.FC<Steps> = ({ steps }) => {
    return (
        <div className="flex flex-col py-24 lg:mx-20">
            <h1 className='text-center text-black opacity-80 text-4xl font-semibold mb-16'>
                How to partner with ToothBook
            </h1>
            <div className='flex lg:flex-col flex-row'>
                <div className="flex lg:w-full lg:flex-row flex-col items-start lg:justify-evenly lg:px-20">
                    {steps.map((step, index) => (
                        <div className='flex lg:flex-row lg:items-center lg:justify-between' key={index}>
                            <Step stepNumber={index + 1} />
                            {index < steps.length - 1 && <Arrow />}
                            <div className='lg:hidden block'>
                                <Content
                                    key={index}
                                    title={step.title}
                                    content={step.content}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-row flex-col justify-between mt-8">
                    {steps.map((step, index) => (
                        <Content
                            key={index}
                            title={step.title}
                            content={step.content}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
