import React, { useState, useEffect } from 'react';
import { RouteProps } from '../../types';
import { Loading, Error, ResponsiveImage } from '../../components';
import { refWoman } from '../../assets';
import { ReferralForm, ReferralLink, ReferralsList } from './components';
import { useApi } from '../../hooks';
import apiEndpoints from '../../apiEndpoints';

interface ReferralsData {
    clientName: string;
    rewardStatus: string;
    registrationDate: string;
}

export const Referrals: React.FC<RouteProps> = () => {

    const { callApi: callReferralLinkApi, loading: loadingReferralLink, error: errorReferralLink, response: responseReferralLink } = useApi();
    const { callApi: callReferralsApi, loading: loadingReferrals, error: errorReferrals, response: responseReferrals } = useApi();
    
    const [referralLink, setReferralLink] = useState('');
    const [referralsData, setReferralsData] = useState<ReferralsData[]>([]);

    useEffect(() => {
        (async () => {
            await callReferralLinkApi({ endpoint: apiEndpoints.referrals.link });
            await callReferralsApi({ endpoint: apiEndpoints.referrals.data });
        })();
    }, []);

    useEffect(() => {
        if (responseReferrals) {
            setReferralsData(responseReferrals.referrals);
        }
    }, [responseReferrals]);

    useEffect(() => {
        if (responseReferralLink) {
            setReferralLink(responseReferralLink);
        }
    }, [responseReferralLink]);

    return (
        <React.Fragment>
            <div className='w-full centered'>
                <div className='centered-between cover flex-col md:flex-row'>
                    <div className='lg:w-1/2 w-full centered flex-col space-y-6 lg:mb-12 mb-8'>
                        <div className='space-y-6 lg:max-w-[600px]'>
                            <p className='lg:text-5xl text-3xl text-black opacity-80 leading-129 font-bold'>
                                REWARD 50$ <br></br>
                                EARN 20$
                            </p>
                            <p className='lg:text-xl text-black opacity-65'>
                                Refer your friends, classmate or anyone who is enrolled in college or university.
                                Every time someone books and visits a new dentist through your Stu-dent link, <span className='text-accentColor'>you get 20$</span>
                            </p>
                        </div>
                        <div className='lg:centered lg:space-x-0 space-y-4 lg:w-[600px] w-full flex-col'>
                            <div className='flex justify-between w-full space-x-4'>
                                <ReferralLink loading={loadingReferralLink} error={errorReferralLink} link={referralLink} />
                            </div>
                            <div className='flex justify-between w-full space-x-4'>
                                <ReferralForm />
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 centered w-full'>
                        <ResponsiveImage
                            desktopSrc={refWoman}
                            mobileSrc={refWoman}
                            altText="referrals-image"
                        />
                    </div>
                </div>
            </div>
            <div className='lg:px-20 lg:py-10 lg:space-y-10 space-y-6'>
                <div className='space-y-3 lg:max-w-[540px]'>
                    <p className='lg:text-3xl text-2xl text-black opacity-80 leading-129 font-bold'>
                        My Referrals
                    </p>
                    <p className='lg:text-xl text-black opacity-65'>
                        Note that your reward will be sent after your referral visits one of our practice, and gets a reward.
                    </p>
                </div>
                {
                    loadingReferrals ? (
                        <Loading />
                    ) : errorReferrals ? (
                        <Error />
                    ) : (
                        <ReferralsList referrals={referralsData} />
                    )
                }

            </div>
        </React.Fragment>
    );
};