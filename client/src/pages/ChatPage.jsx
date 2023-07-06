/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatBody from '../components/ChatBody';
import InputMessage from '../components/InputMessage';
import { Box, Divider, Grid } from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data]);
    });
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
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

  const handleWindowBeforeUnload = () => {
    socket.emit('logOut', {
      name: localStorage.getItem('user'),
      socketID: socket.id,
    });
    localStorage.removeItem('user');
    // navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
    window.addEventListener('beforeunload', handleWindowBeforeUnload);
  }, []);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      height={'100vh'}
    >
      <Box
        sx={{
          width: '640px',
          maxWidth: '640px',
          flexGrow: 1,
          height: '100vh',
        }}
      >
        <Header socket={socket} />
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            minHeight: '90vh',
          }}
        >
          <Sidebar socket={socket} />
          <Divider orientation='vertical' flexItem />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <ChatBody messages={messages} socket={socket} status={status} />
            <InputMessage socket={socket} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ChatPage;
