import React, { useState } from 'react';

interface Giftcard {
    id: number;
    name: string;
    imageURL: string;
}

interface GiftCardSelectorProps {
    giftCards: Giftcard[];
}

export const GiftCardSelector: React.FC<GiftCardSelectorProps> = ({ giftCards }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSelectCard = (id: number) => {
    setSelectedCard((prevSelectedCard) => (prevSelectedCard === id ? null : id));
  };

  return (
    <div className="lg:w-1/2 flex flex-wrap items-center justify-center gap-4">
      {giftCards?.map((giftCard: Giftcard) => (
        <div
          key={giftCard.id}
          className={`h-20 lg:w-[calc(33.333%-1rem)] w-full border rounded-lg flex justify-center items-center cursor-pointer ${
            selectedCard === giftCard.id ? 'border-brandPrimary' : 'border-gray-300'
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
  );
};