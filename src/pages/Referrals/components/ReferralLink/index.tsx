import React, { useState } from 'react';
import { Button, Input } from '../../../../components';

interface ReferralLinkProps {
    loading: boolean;
    error: string | null;
    link: string;
}

export const ReferralLink: React.FC<ReferralLinkProps> = ({ loading, error, link }) => {
    const [copySuccess, setCopySuccess] = useState('Copy Link');

    const referralLink = link;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(
            () => setCopySuccess('Link copied!'),
            () => setCopySuccess('Failed to copy the link!')
        );
    };

    return (
        <div className="w-full flex lg:flex-row flex-col justify-between lg:space-x-3 lg:space-y-0 space-y-3">
            {
                error ? <div className={`bg-gray-300 animate-pulse flex-1 outline-none rounded-xl`} /> : 
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