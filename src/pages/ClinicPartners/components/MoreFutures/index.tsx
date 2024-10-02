import React from 'react';
import { zap_fast } from '../../../../assets/images/pages/partners';

interface Feature {
  title: string;
  description: string;
}

interface MoreFuturesProps {
  features: Feature[];
}

export const MoreFutures: React.FC<MoreFuturesProps> = ({ features }) => {
  return (
    <div className="flex flex-col lg:flex-row py-24 mx-5 lg:mx-20">
      <div className="flex flex-col items-start justify-start lg:w-1/3 lg:pr-10">
        <div className="bg-yellow-100 p-4 rounded-full mb-5">
          <img src={zap_fast} alt='fea' />
        </div>
        <h2 className="text-black text-3xl font-semibold text-left">
          More Features & <br></br> Benefits
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 mt-10 lg:mt-0">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-black text-lg font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};