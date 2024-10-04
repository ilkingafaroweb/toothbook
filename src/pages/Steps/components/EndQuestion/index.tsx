import React, { useEffect, useState } from 'react';

export const EndQuestion: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleAnswerChange = (answer: string) => {
        setSelectedAnswer(answer);
    };

    useEffect(() => {

    }, [selectedAnswer])

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2 w-full">
                
            </div>
        </div>
    );
};
