/* eslint-disable react/prop-types */
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const LogOut = ({ socket }) => {
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    socket.emit('logOut', {
      name: localStorage.getItem('user'),
      socketID: socket.id,
    });
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <IconButton color='inherit' onClick={handleLeaveChat}>
      <LogoutIcon />
    </IconButton>
  );
};

export default LogOut;
