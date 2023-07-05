/* eslint-disable react/prop-types */
import { useState } from 'react';

const ChatMessageBlock = ({ socket }) => {
  const [message, setMessage] = useState('');

  const isTyping = () =>
    socket.emit('typing', `${localStorage.getItem('user')} is typing`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('user'),
        id: `${socket.id}-${Math.random()}`,
        socketID: socket.id,
      });
    }

    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={() => isTyping()}
      />
      <button type='submit'>Отправить</button>
    </form>
  );
};

export default ChatMessageBlock;
