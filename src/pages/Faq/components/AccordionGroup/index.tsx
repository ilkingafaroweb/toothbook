import { useState } from 'react';
import { AccordionItem } from '../AccordionItem';

interface AccordionGroupProps {
  items: { 
    id: number;
    question: string; 
    answer: string 
  }[];
}

export const AccordionGroup: React.FC<AccordionGroupProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.question}
          content={item.answer}
          isOpen={openIndex === item.id}
          onClick={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};