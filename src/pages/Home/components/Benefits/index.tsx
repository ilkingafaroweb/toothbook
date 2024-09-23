interface Benefit {
    icon: string;
    heading: string;
    paragraph: string;
}

interface BenefitsProps {
    benefits: Benefit[];
}

export const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
    return (
        <div className='flex flex-col items-center space-y-8 lg:px-8 my-16'>
            <h2 className='text-2xl font-bold text-center w-max'>Benefits of <span className="hidden lg:inline-block">Using</span> Toothbook</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
                {benefits.map((benefit, index) => (
                    <div key={index} className='lg:w-72 min-h-60 bg-lightGray flex flex-col items-center justify-center text-center p-3 rounded-xl'>
                        <img src={benefit.icon} alt={`benefit icon ${index + 1}`} className='w-16 h-16 mb-4' />
                        <h3 className='text-xl font-semibold mb-2'>{benefit.heading}</h3>
                        <p className='text-base'>{benefit.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
