/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ socket }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('user', user);
    socket.emit('newUser', {
      user,
      socketID: socket.id,
    });
    navigate('/chat');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход в чат</h2>
      <label htmlFor='user'>Введите имя пользователя:</label>
      <input
        id='user'
        type='text'
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button type='submit'>Войти</button>
    </form>
  );
};

export default HomePage;
