import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OfferContextType {
  isOfferVisible: boolean;
  setIsOfferVisible: (visible: boolean) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOfferVisible, setIsOfferVisible] = useState(!!sessionStorage.getItem('offer') || false);

  return (
    <OfferContext.Provider value={{ isOfferVisible, setIsOfferVisible }}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOffer = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffer must be used within an OfferProvider');
  }
  return context;
};
