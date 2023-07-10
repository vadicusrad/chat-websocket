/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatBody from '../components/ChatBody';
import InputMessage from '../components/InputMessage';
import { Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const ChatPage = ({ socket }) => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

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
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
    window.addEventListener('beforeunload', handleWindowBeforeUnload);
  }, []);

  return (
    <Layout socket={socket}>
      
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexGrow: 1,
          padding: {
            sm: '40px 20px 0 20px',
            xs: '20px 0 0 0',
          },
        }}
      >
        <Sidebar socket={socket} />
        <Divider orientation='vertical' flexItem />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <ChatBody socket={socket} status={status} />
          <InputMessage socket={socket} />
        </Box>
        <Divider orientation='vertical' flexItem />
      </Box>
    </Layout>
  );
};

export default ChatPage;
