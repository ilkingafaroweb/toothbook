import React, { useState} from 'react';
import { Button, Input } from '../../../../components';

export const BookingChat: React.FC = () => {
  const clinicName = 'ESTHEDENT DENTAL SERVICES';

  const [messages, setMessages] = useState([
    { type: 'clinic', text: 'Hello, how can we help?' },
    { type: 'system', text: 'Name Surname created booking on 16.11.2022 / 11:00' },
    { type: 'user', text: 'Hello. No way. thank you' },
    { type: 'clinic', text: 'Hello, how can we help?' },
    { type: 'system', text: 'Name Surname created booking on 16.11.2022 / 11:00' },
    { type: 'user', text: 'Hello. No way. thank you' },
    { type: 'clinic', text: 'Hello, how can we help?' },
    { type: 'system', text: 'Name Surname created booking on 16.11.2022 / 11:00' },
    { type: 'user', text: 'Hello. No way. thank you' },
  ]);

  const [input, setInput] = useState('');

  // Reference to the messages container
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
    }
  };

  // Scroll to the bottom of the messages container when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

  return (
      <div className="flex flex-col h-[550px] w-1/2 border shadow-lg rounded-lg">
        <div className="p-4 text-accordionTitle border-b uppercase text-center font-medium">
          {clinicName}
        </div>
        
        {/* Sohbet Mesajları */}
        <div  className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === 'clinic' ? 'justify-start' 
                : msg.type === 'system' ? 'justify-center' 
                : 'justify-end'
              }`}
            >
              <div
                className={`py-2 px-4 rounded-full ${
                  msg.type === 'clinic' ? 'bg-brandSecondary text-white' 
                  : msg.type === 'system' ? 'shadow-systemMessage text-sm text-accordionTitle' 
                  : 'bg-brandSecondary text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Empty div to scroll to the bottom */}
        </div>

        {/* Input ve Gönder Butonu */}
        <div className="p-4 border-t border-gray-300 flex gap-3">
          <Input
            placeholder="Type your message"
            isValid={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            text='Send'
            color='bg-brandPrimary'
            size='w-1/3'
            onClick={handleSend}
          />
        </div>
      </div>
  );
};
