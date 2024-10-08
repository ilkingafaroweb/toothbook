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
}

export const BookingChat: React.FC = () => {
  const { bookingId } = useParams();
  const { callApi, response } = useApi();
  const { callApi: sendMessage } = useApi();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState('');
  const clinicName = 'ESTHEDENT DENTAL SERVICES';

  const [messages, setMessages] = useState<MessageType[]>([]);

  // API'den veriyi alıyoruz
  useEffect(() => {
    // API'yi 2 saniyede bir çağıran interval fonksiyonu
    const intervalId = setInterval(() => {
      callApi({
        endpoint: apiEndpoints.bookings.getBookingChat,
        params: {
          bookingId: bookingId,
        },
      });
    }, 1000); // 2000 milisaniye = 2 saniye

    // Bileşen unmount olduğunda interval'i temizleyin
    return () => clearInterval(intervalId);
  }, [bookingId]);

  // API yanıtı güncellendiğinde, mesajları ayarlıyoruz
  useEffect(() => {
    if (response) {
      setMessages(response.messages); // API yanıtı boş olabilir, bu yüzden kontrol etmek önemli
    }
  }, [response]);

  // Mesaj gönderme fonksiyonu
  const handleSend = () => {
    sendMessage({
      method: 'POST',
      endpoint: apiEndpoints.bookings.postBookingChat,
      data: {
        bookingId: Number(bookingId),
        message: input,
      },
    });
    setInput(''); // Giriş alanını temizle
  };

  // Mesajlar değiştiğinde otomatik scroll
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[550px] lg:w-1/2 border shadow-lg rounded-lg">
      <div className="p-4 text-accordionTitle border-b uppercase text-center font-medium">
        {clinicName}
      </div>

      {/* Sohbet Mesajları */}
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
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet.</div>
        )}
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
