import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../../../components';
import { useApi } from '../../../../hooks';
import apiEndpoints from '../../../../apiEndpoints';

export const ReferralLink: React.FC = () => {

    const { callApi, loading, error, response } = useApi();

    useEffect(() => {
        callApi({ endpoint: apiEndpoints.referrals.link });
    }, []);

    const [copySuccess, setCopySuccess] = useState('Copy Link');

    const referralLink = error ? "Referral link not found" : response || '';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(
            () => setCopySuccess('Link copied!'),
            () => setCopySuccess('Failed to copy the link!')
        );
    };

    return (
            <div className="w-full flex lg:flex-row flex-col justify-between lg:space-x-3 lg:space-y-0 space-y-3">
                {
                    loading ? <div className={`bg-gray-300 animate-pulse flex-1 outline-none rounded-xl`} /> :
                        <Input
                            loading={loading}
                            value={referralLink}
                            readonly={true}
                            isValid={true}
                        />
                }
                <Button
                    color='bg-brandPrimary'
                    text={copySuccess}
                    onClick={error ? undefined : copyToClipboard}
                    size='lg:w-max w-full'
                />
            </div>
    );
};