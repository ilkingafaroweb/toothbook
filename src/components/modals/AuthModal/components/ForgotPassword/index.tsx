import React, { useState } from 'react';
import { EmailStep, ProgressBar, OTPStep, NewPasswordStep } from './components';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <ProgressBar step={step} />
      
      {step === 1 && <EmailStep onContinue={handleNextStep} onBack={onBack} />}
      {step === 2 && <OTPStep onContinue={handleNextStep} onBack={handlePrevStep} />}
      {step === 3 && <NewPasswordStep onBack={handlePrevStep} />}
    </div>
  );
};