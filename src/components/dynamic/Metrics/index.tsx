interface MetricItem {
    metric: string;
    text: string;
}

interface MetricsProps {
    heading?: string;
    metrics: MetricItem[];
}

export const Metrics: React.FC<MetricsProps> = ({ heading, metrics }) => {
    return (
        <div className='flex flex-col items-center space-y-16 lg:px-8 py-24'>
            {heading && <h2 className='lg:w-full w-[320px] lg:text-4xl text-2xl text-center font-semi-bold text-textBlack leading-122'>{heading}</h2>}
            <div className='w-full bg-lightGray p-16 flex lg:flex-row flex-col text-center items-center justify-between lg:space-x-8 lg:space-y-0 space-y-8 rounded-2xl'>
                {metrics.map((item, index) => (
                    <div key={index} className='lg:w-full w-48 flex flex-col items-center space-y-3'>
                        <span className='text-6xl text-brandPrimary font-semibold'>{item.metric}</span>
                        <span className='text-lg text-textBlack font-medium'>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};