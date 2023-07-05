/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ChatBody from './ChatBody';
import ChatMessageBlock from './ChatMessageBlock';
import Sidebar from './Sidebar';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages, socket]);

  useEffect(() => {
    socket.on('responseTyping', (data) => {
      setStatus(data);
      setTimeout(() => {
        setStatus('');
      }, 1000);
    });
  }, [status, socket]);

  return (
    <div>
      <Sidebar socket={socket} />
      <main>
        <ChatBody messages={messages} socket={socket} status={status} />
        <ChatMessageBlock socket={socket} />
      </main>
    </div>
  );
};

export default ChatPage;
