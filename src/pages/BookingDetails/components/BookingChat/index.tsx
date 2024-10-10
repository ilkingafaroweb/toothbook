import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from '../../../../components';
import { useApi } from '../../../../hooks';
import apiEndpoints from '../../../../apiEndpoints';
import { useParams } from 'react-router-dom';

interface MessageType {
  messageId: number;
  sendAt: string;
  sender: string;
  content: string;
  time: string;
}

export const BookingChat: React.FC = () => {
  const { bookingId } = useParams();
  const { callApi, response } = useApi();
  const { callApi: sendMessage } = useApi();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState('');
  const [clinicName] = useState(sessionStorage.getItem('clinicName') || '')
  const [clinicLogo] = useState(sessionStorage.getItem('clinicLogo') || '')

  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      callApi({
        endpoint: apiEndpoints.bookings.getBookingChat,
        params: {
          bookingId: bookingId,
        },
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [bookingId]);

  useEffect(() => {
    if (response) {
      if (response.messages !== messages) {
        setMessages(response.messages);

        if (!sessionStorage.getItem('clinicName') || !sessionStorage.getItem('clinicLogo')) {
          sessionStorage.setItem('clinicName', response.clinicName);
          sessionStorage.setItem('clinicLogo', response.clinicLogo);
        }
      }
    }
  }, [response]);

  const handleSend = () => {
    if (input.trim() !== '') {
      sendMessage({
        method: 'POST',
        endpoint: apiEndpoints.bookings.postBookingChat,
        data: {
          bookingId: Number(bookingId),
          message: input,
        },
      });
      callApi({
        endpoint: apiEndpoints.bookings.getBookingChat,
        params: {
          bookingId: bookingId,
        },
      });
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[550px] lg:w-1/2 border shadow-lg rounded-lg" onKeyDown={handleKeyDown}>
      <div className="p-2 flex justify-center items-center gap-6 text-accordionTitle border-b uppercase text-center font-medium">
        <img className='lg:h-10 h-6' src={clinicLogo} alt="clinic-logo" />
        {clinicName}
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.messageId}
              className={`flex ${msg.sender === 'clinic' ? 'justify-start'
                : msg.sender === 'system' ? 'justify-center'
                  : 'justify-end'
                }`}
            >
              <div
                className={`py-2 px-4 rounded-full ${msg.sender === 'clinic' ? 'bg-brandPrimary text-white'
                  : msg.sender === 'system' ? 'shadow-systemMessage text-sm text-accordionTitle'
                    : 'bg-brandSecondary text-white'
                  }`}
              >
                {msg.content}
              </div>
              <span>{msg.time}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet.</div>
        )}
      </div>

      <div className="p-4 w-full border-t border-gray-300 flex lg:flex-row flex-col gap-3">
        <Input
          placeholder="Type your message"
          isValid={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          text='Send'
          color='bg-brandPrimary'
          size='lg:w-1/4'
          onClick={handleSend}
        />
      </div>
    </div>
  );
};
