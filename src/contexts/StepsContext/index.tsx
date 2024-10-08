import React, { createContext, useContext, useState, ReactNode } from 'react';

// Steps data type
interface StepsData {
  email: string;
  address: string;
  longitude: number | null;
  latitude: number | null;
  giftCardId: number;
  services: number[];
  insurance: string;
  responseOfQuestion: string;
  otherService: string;
}

// Context'in varsayılan değeri
const defaultStepsData: StepsData = {
  email: '',
  address: '',
  longitude: 0,
  latitude: 0,
  giftCardId: 0,
  services: [],
  insurance: '',
  responseOfQuestion: '',
  otherService: '',
};

const StepsContext = createContext<{
  stepsData: StepsData;
  setStepsData: React.Dispatch<React.SetStateAction<StepsData>>;
  resetData: () => void;
}>({
  stepsData: defaultStepsData,
  setStepsData: () => {},
  resetData: () => {},
});

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [stepsData, setStepsData] = useState<StepsData>(defaultStepsData);

  const resetData = () => {
    setStepsData(defaultStepsData)
  }

  return (
    <StepsContext.Provider value={{ stepsData, setStepsData, resetData  }}>
      {children}
    </StepsContext.Provider>
  );
};

export const useStepsContext = () => useContext(StepsContext);