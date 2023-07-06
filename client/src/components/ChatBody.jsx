/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
const ChatBody = ({ status, socket }) => {
  const [messages, setMessages] = useState([]);
  const chatBlock = useRef(null);

  const scrollToBottom = () => {
    const lastChildElement = chatBlock.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data]);
    });

    scrollToBottom();
  }, [messages, socket]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: '10px 20px 10px 20px',
        overflowY: 'scroll',
      }}
      ref={chatBlock}
      className='chatBody'
    >
      <Box sx={{ position: 'fixed', bottom: '150px' }}>
        <Typography variant='body2'>{status}</Typography>
      </Box>
      {messages.map((message) => {
        if (message.name === localStorage.getItem('user')) {
          return (
            <Box
              style={{
                backgroundColor: '#66bb6a',
                padding: '10px',
                marginBottom: '7px',
                marginTop: '7px',
                borderRadius: '6px',
                alignSelf: 'flex-end',
                width: '70%',
                color: 'white',
              }}
              key={message.id}
            >
              <Typography variant='h6'>{message.name}</Typography>
              <Typography variant='body1'>{message.text}</Typography>
            </Box>
          );
        }
        return (
          <Box
            style={{
              backgroundColor: '#f44336',
              padding: '10px',
              marginBottom: '7px',
              marginTop: '7px',
              borderRadius: '10px',
              width: '70%',
              color: 'white',
            }}
            key={message.id}
          >
            <Typography variant='h6'>{message.name}</Typography>
            <Typography variant='body1'>{message.text}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatBody;
