import React, { useEffect, useState } from 'react';
import { InsuranceSelector } from '../InsuranceSelector';

interface FirstQuestionProps {
  step: number;
  setStep: (step: number) => void;
}

export const FirstQuestion: React.FC<FirstQuestionProps> = ({ step, setStep }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    {selectedAnswer === 'yes' ? setStep(4) : setStep(5) }
  }, [selectedAnswer])

  useEffect(() => {
    sessionStorage.removeItem('your_insurance')
  }, [])

  return (
    <>
      {step === 3 ? (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="text-black opacity-80 lg:text-3xl text-2xl text-center font-semibold mb-6">
              Do you have insurance?
            </h1>

            <div className="flex gap-24">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="insurance"
                  value="yes"
                  checked={selectedAnswer === 'yes'}
                  onChange={() => handleAnswerChange('yes')}
                  className="absolute left-2 appearance-none h-4 w-4 rounded-full border-2 checked:bg-brandPrimary"
                />
                <span
                  className={`flex items-center justify-center w-24 h-12 border-2 rounded-lg text-lg font-bold bg-white hover:bg-gray-100 ${selectedAnswer === 'yes' ? 'border-brandPrimary' : 'border-gray-300'
                    }`}
                >
                  Yes
                </span>
              </label>

              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="insurance"
                  value="no"
                  checked={selectedAnswer === 'no'}
                  onChange={() => handleAnswerChange('no')}
                  className="absolute left-2 appearance-none h-4 w-4 rounded-full border-2 checked:bg-brandPrimary"
                />
                <span
                  className={`flex items-center justify-center w-24 h-12 border-2 rounded-lg text-lg font-bold bg-white hover:bg-gray-100 ${selectedAnswer === 'no' ? 'border-brandPrimary' : 'border-gray-300'
                    }`}
                >
                  No
                </span>
              </label>
            </div>
          </div>
        </div>
      ) : step === 4 ? (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 w-full lg:max-w-[800px]">
            <h1 className="text-black opacity-80 lg:text-3xl text-2xl text-center font-semibold mb-3">Who is your dental insurance provider?</h1>
            <InsuranceSelector />
          </div>
        </div>
      ) : null}
    </>
  );
};
