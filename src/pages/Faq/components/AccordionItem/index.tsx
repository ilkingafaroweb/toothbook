import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="shadow-carousel rounded-lg w-full">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className="lg:text-xl lg:leading-129 font-medium text-accordionTitle">{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-8 h-8 text-gray-500 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-500`}
        />
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
        className="transition-max-height duration-500 ease-in-out overflow-hidden"
      >
        <div className="p-4 text-accordionContent">{content}</div>
      </div>
    </div>
  );
};
