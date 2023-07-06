/* eslint-disable react/prop-types */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeToggler from './theme/ThemeToggler';

const Header = ({ socket }) => {
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
    <AppBar position='sticky' top={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h4'>{localStorage.getItem('user')}</Typography>
        </Box>

        <Box>
          <ThemeToggler />
          <Button color='inherit' onClick={handleLeaveChat}>
            <LogoutIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
