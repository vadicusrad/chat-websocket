/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

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
        width: '100%',
        paddingBottom: '3vh',
        marginTop: '20px',
        padding: '10px',
      }}
    >
      <TextField
        variant='filled'
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={() => isTyping()}
        autoFocus
        InputProps={{ sx: { borderRadius: '5px 0 0 5px' } }}
        fullWidth
      />
      <Button
        variant='contained'
        color='success'
        size='large'
        type='submit'
        sx={{ borderRadius: '0 5px 5px 0' }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default InputMessage;
