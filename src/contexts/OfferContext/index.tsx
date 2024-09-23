import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OfferContextType {
  isOfferVisible: boolean;
  hideOffer: () => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOfferVisible, setIsOfferVisible] = useState(true);

  const hideOffer = () => setIsOfferVisible(false);

  return (
    <OfferContext.Provider value={{ isOfferVisible, hideOffer }}>
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
