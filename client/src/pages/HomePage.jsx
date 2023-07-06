/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
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
    <Grid container direction='column' alignItems='center' justify='center'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginTop: '10vh',
        }}
      >
        <Typography variant='h2'>Вход в чат</Typography>

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
    </Grid>
  );
};

export default HomePage;
