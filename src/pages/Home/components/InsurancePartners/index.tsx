interface InsurancePartnersProps {
    topText: string;
    bottomText: string;
    icons: string[];
}

export const InsurancePartners: React.FC<InsurancePartnersProps> = ({ topText, bottomText, icons }) => {
    return (
        <div className='flex flex-col items-center space-y-8 my-16 lg:px-8'>
            <p className='text-lg font-medium leading-6 text-textBlack'>{topText}</p>
            <div className='flex flex-row flex-wrap justify-center gap-12 w-full'>
                {icons.map((icon, index) => (
                    <img
                        key={index}
                        src={icon}
                        alt={`insurance company ${index + 1} logo`}
                        className='h-10'
                    />
                ))}
            </div>
            <p className='text-lg font-medium leading-6 text-textBlack'>{bottomText}</p>
        </div>
    );
};
