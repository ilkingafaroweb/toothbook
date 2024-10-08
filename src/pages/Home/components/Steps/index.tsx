import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Step {
  title: string;
  paragraph: string;
  icon: string;
}

interface StepsProps {
  steps: Step[];
}

const Steps: React.FC<StepsProps> = ({ steps }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start(i => ({
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay: i * 0.3,
        }
      }));
    } else {
      controls.start({ opacity: 0, x: 100 });
    }
  }, [inView, controls]);

  return (
    <div className="relative py-16 font-inter">
      <div className='lg:block hidden relative'>
        {/* Dashed Line */}
        <div className="absolute inset-0 flex justify-center items-start">
          <div className="h-[calc(85%)] w-1 border-l border-dashed border-brandPrimary absolute top-0 left-1/2 transform -translate-x-1/2" />
        </div>

        {/* Steps */}
        <div ref={ref} className="relative z-10 w-3/4 m-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              animate={controls}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              className={`relative mb-20 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Step Number */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="bg-brandPrimary text-white text-xl font-semibold w-12 h-12 flex items-center justify-center rounded-full border-4 border-white">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className={`relative w-96 h-72 p-6 bg-white ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="flex flex-col items-start space-y-4 mb-4">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p>{step.paragraph}</p>
                  <img src={step.icon} alt={`Step ${index + 1} icon`} className="" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className='lg:hidden block relative'>
        {/* Dashed Line */}
        <div className="absolute inset-0 flex justify-center items-start">
          <div className="h-[55%] w-1 border-l border-dashed border-brandPrimary absolute top-28 left-6 transform -translate-x-1/2" />
        </div>

        <h1 className='text-textBlack text-2xl font-semibold mb-12'>
          How We Make You Smile in 5 Simple Steps
        </h1>

        <div className='flex flex-col space-y-8'>
          {steps.map((step, index) => (
            <div key={index} className='flex flex-row items-start gap-4'>
              {/* Step Number */}
              <div className="relative z-10">
                <div className="bg-brandPrimary text-white text-xl font-semibold w-12 h-12 flex items-center justify-center rounded-full border-4 border-white">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className='flex flex-col space-y-2 w-full'>
                <h2 className='text-textBlack text-xl font-semibold'>
                  {step.title}
                </h2>
                <p className='text-black opacity-65'>
                  {step.paragraph}
                </p>
                <img src={step.icon} alt={`Step ${index + 1} icon`} className='w-12 h-12' />
              </div>
            </div>
          ))}
        </div>

        {/* <div className='mt-12'>
          <img src={steps_img} alt="step-mobile-image" />
        </div> */}
      </div>
    </div>
  );
};

export default Steps;
