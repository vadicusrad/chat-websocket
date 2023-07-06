/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const InputMessage = ({ socket }) => {
  const [message, setMessage] = useState('');

  const isTyping = () =>
    socket.emit('typing', `${localStorage.getItem('user')}, is typing...`);

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
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingBottom: '3vh',
        marginTop: '20px',
      }}
    >
      <TextField
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={() => isTyping()}
      />
      <Button variant='contained' color='success' size='large' type='submit'>
        Отправить
      </Button>
    </Box>
  );
};

export default InputMessage;
