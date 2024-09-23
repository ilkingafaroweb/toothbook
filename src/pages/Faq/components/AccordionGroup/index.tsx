import { useState } from 'react';
import { AccordionItem } from '../AccordionItem';

interface AccordionGroupProps {
  items: { title: string; content: string }[];
}

export const AccordionGroup: React.FC<AccordionGroupProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); 

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index} 
          onClick={() => toggleItem(index)} 
        />
      ))}
    </div>
  );
};