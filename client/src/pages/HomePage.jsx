/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import Layout from '../components/Layout';
const HomePage = ({ socket }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.trim().length >= 2) {
      setInputError(false);
      localStorage.setItem('user', user);
      socket.emit('newUser', {
        user,
        socketID: socket.id,
      });
      setUser('');
      navigate('/chat');
    } else {
      setInputError(true);
    }
  };

  useEffect(() => {
    socket.emit('logOut', {
      name: localStorage.getItem('user'),
      socketID: socket.id,
    });
    localStorage.removeItem('user');
    setUser('');
  }, [socket]);

  return (
    <Layout socket={socket}>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          marginTop: '10vh',
          maxWidth: '640px',
          padding: '40px 60px 40px 60px',
          boxShadow: 2,
          borderRadius: '10px',
        }}
      >
        <Typography variant='h3' component='h1'>
          Вход в чат
        </Typography>

        <TextField
          id='outlined-basic'
          label='Введите имя пользователя:'
          variant='outlined'
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
            setInputError(false);
          }}
          error={inputError}
          helperText={inputError && 'Имя пользователя не может быть пустым'}
          autoFocus
        />
        <Button variant='contained' size='large' type='submit'>
          Войти
        </Button>
      </Box>
    </Layout>
  );
};

export default HomePage;
