import React, { useEffect, useState } from 'react';
import { useStepsContext } from '../../../../contexts';

interface Giftcard {
    id: number;
    name: string;
    imageURL: string;
}

interface GiftCardSelectorProps {
    giftCards: Giftcard[];
}

export const GiftCardSelector: React.FC<GiftCardSelectorProps> = ({ giftCards }) => {

  const { stepsData, setStepsData } = useStepsContext();

  const [selectedCard, setSelectedCard] = useState<number | null>(stepsData.giftCardId);
  const [email, setEmail] = useState("")

  const handleSelectCard = (id: number) => {
    setSelectedCard((prevSelectedCard) => (prevSelectedCard === id ? null : id));
  };

  useEffect(() => {
    {
      selectedCard && setStepsData((prev) => ({
        ...prev,
        giftCardId: selectedCard
      }))
    }
  }, [selectedCard])

  useEffect(() => {
    {
      email && setStepsData((prev) => ({
        ...prev,
        email: email
      }))
    }
  }, [email])

  return (
    <>
      <div className="lg:w-1/2 flex flex-wrap items-center justify-center gap-4">
        {giftCards?.map((giftCard: Giftcard) => (
          <div
            key={giftCard.id}
            className={`h-20 lg:w-[calc(33.333%-1rem)] w-full border rounded-lg flex justify-center items-center cursor-pointer ${
              selectedCard === giftCard.id ? 'border-brandPrimary bg-brandPrimary bg-opacity-20' : 'border-gray-300'
            }`}
            onClick={() => handleSelectCard(giftCard.id)}
          >
            <img
              src={giftCard.imageURL}
              alt={giftCard.name}
              className="mx-auto"
            />
            <input
              type="radio"
              name="giftCard"
              value={giftCard.id}
              checked={selectedCard === giftCard.id}
              onChange={() => handleSelectCard(giftCard.id)}
              className="absolute opacity-0 cursor-pointer"
            />
          </div>
        ))}
      </div>
  
      {/* Seçili kart varsa inputları göster */}
      {selectedCard && (
        <div className="w-1/2 space-y-2">
          <div>
            <h1 className='text-black opacity-80'>In order to activate your gift card, add your email address</h1>
            <p className='text-black opacity-40'>Once you've visited the dentist, we'll send you instructions on how to claim.</p>
          </div>
          <input
            type="email"
            name="email"
            value={stepsData.email}
            placeholder="Your email address"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
      )}
    </>
  );
  
};