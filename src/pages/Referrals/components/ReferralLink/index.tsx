import React, { useState } from 'react';
import { Button, Input } from '../../../../components';

export const ReferralLink: React.FC = () => {
    const [copySuccess, setCopySuccess] = useState('Copy Link');

    const referralLink = 'https://toothbook.ca/registration.aspx?refid=401249';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(
            () => setCopySuccess('Link copied!'),
            () => setCopySuccess('Failed to copy the link!')
        );
    };

    return (
        <div className="w-full flex lg:flex-row flex-col justify-between lg:space-x-3 lg:space-y-0 space-y-3">
            <Input
                value={referralLink}
                readonly={true}
                isValid={true}
            />
            <Button  
                color='bg-brandPrimary'
                text={copySuccess}
                onClick={copyToClipboard}
                size='lg:w-max w-full'
            />
        </div>
    );
};