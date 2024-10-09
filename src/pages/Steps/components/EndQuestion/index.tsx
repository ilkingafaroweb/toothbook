import React, { useEffect, useState } from 'react';
import { useStepsContext } from '../../../../contexts';

interface Answer {
    id: number;
    name: string;
}

const answers: Answer[] = [
    { id: 1, name: 'I feel comfortable and relaxed' },
    { id: 2, name: 'I feel a bit nervous but can manage' },
    { id: 3, name: 'I experience significant anxiety' },
    { id: 4, name: 'l avoid going unless absolutely necessary' },
    { id: 5, name: 'Other (Please specify)' },
];

export const EndQuestion: React.FC = () => {

    const { stepsData, setStepsData } = useStepsContext();

    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [otherInputVisible, setOtherInputVisible] = useState(false);
    const [otherText, setOtherText] = useState('');

    useEffect(() => {
        if (stepsData.responseOfQuestion) {
            const matchedAnswer = answers.find(answer => answer.name === stepsData.responseOfQuestion);
            setSelectedCard(matchedAnswer ? matchedAnswer.id : 5);
        } else {
            setSelectedCard(null); 
            setOtherText(stepsData.responseOfQuestion)
        }
    }, [stepsData, answers]);

    useEffect(() => {
        if(otherInputVisible){
            setSelectedCard(5)
        }   
    },[otherInputVisible])

    const handleSelectCard = (id: number) => {
        setSelectedCard(id);
        setOtherInputVisible(id === 5);
    };

    const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherText(e.target.value);
    };

    useEffect(() => {
        if (selectedCard) {
            const matchedAnswer = answers.find(answer => answer.id === selectedCard);
            setStepsData((prev) => ({
                ...prev,
                responseOfQuestion: matchedAnswer ? matchedAnswer.name : '',
            }));
        }
    }, [selectedCard, answers]);

    useEffect(() => {
        if(otherText){
            setStepsData((prev) => ({
                ...prev,
                responseOfQuestion: otherText
            }))
        }
    }, [otherText])    

    return (
        <div className="flex flex-col items-center gap-6 mt-2 w-full">
            <div className="flex flex-col items-start gap-2 w-full">
                {answers.map((answer) => (
                    <div
                        key={answer.id}
                        className={`h-12 lg:w-[470px] w-full border rounded-lg flex justify-start items-center cursor-pointer ${selectedCard === answer.id ? 'border-brandPrimary bg-brandPrimary bg-opacity-20' : 'border-gray-300'
                            }`}
                        onClick={() => handleSelectCard(answer.id)}
                    >
                        <span className={`w-6 h-6 ml-2 flex items-center justify-center border-2 rounded-full ${selectedCard === answer.id ? 'bg-brandPrimary border-brandPrimary ' : 'border-gray-300'}`}>
                            {(selectedCard === answer.id) && (
                                <span className="text-white">&#10003;</span> 
                            )}
                        </span>
                        <p className='ml-4 text-left text-black'>
                            {answer.name}
                        </p>
                        <input
                            type="radio"
                            name="answer"
                            value={answer.id}
                            checked={selectedCard === answer.id}
                            onChange={() => handleSelectCard(answer.id)}
                            className="absolute opacity-0 cursor-pointer"
                        />
                    </div>
                ))}

                {otherInputVisible && (
                    <input
                        type="text"
                        placeholder="Other"
                        value={otherText}
                        onChange={handleOtherTextChange}
                        className="mt-2 p-2 lg:w-[470px] w-full rounded-lg border border-gray-300"
                    />
                )}
            </div>
        </div>
    );
};
