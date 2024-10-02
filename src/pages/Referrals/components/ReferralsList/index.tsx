import React, { useEffect } from 'react';
import { useApi } from '../../../../hooks';
import apiEndpoints from '../../../../apiEndpoints';
import { Loading, Error } from '../../../../components';

interface Referral {
    clientName: string;
    rewardStatus: string;
    registrationDate: string;
}

export const ReferralsList: React.FC = () => {

    const { callApi, loading, error, response } = useApi();

    useEffect(() => {
        callApi({ endpoint: apiEndpoints.referrals.data });
    }, []);

    useEffect(() => {
        console.log("REFERRALS DATA:", response);
    }, [response])

    return loading ? <Loading /> : error ? <Error /> : 
    (<div className="overflow-x-auto lg:border-2 rounded-lg py-4">
        <table className="min-w-full overflow-hidden">
            <thead>
                <tr className="text-center lg:text-xl">
                    <th className="lg:py-2 lg:px-4 p-1.5 relative">
                        Client <span className='lg:inline-block hidden'>Name</span>
                        <div className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-gray-300 transform -translate-x-1/2"></div>
                    </th>
                    <th className="lg:py-2 lg:px-4 p-1.5 relative">
                        <span className='lg:inline-block hidden'>Reward</span> Status
                        <div className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-gray-300 transform -translate-x-1/2"></div>
                    </th>
                    <th className="lg:py-2 lg:px-4 p-1.5 relative">
                        Registration <span className='lg:inline-block hidden'> Date</span>
                        <div className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-gray-300 transform -translate-x-1/2"></div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {response?.referrals?.map((referral: Referral, index: number) => (
                    <tr key={index} className='lg:text-xl text-accordionTitle'>
                        <td className="lg:py-2 lg:px-4 p-1.5 text-center">{referral.clientName}</td>
                        <td className="lg:py-2 lg:px-4 p-1.5 text-center">
                            <span
                                className="lg:w-1/2 inline-block px-4 py-1 rounded-md text-white"
                                style={{
                                    background: 'linear-gradient(40deg, #FFC839 20.05%, #FFDA96 63.2%, #FA1 108.43%)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                {referral.rewardStatus}
                            </span>
                        </td>
                        <td className="lg:py-2 lg:px-4 p-1.5 text-center">{referral.registrationDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
};