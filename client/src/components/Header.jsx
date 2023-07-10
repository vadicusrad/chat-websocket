/* eslint-disable react/prop-types */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Container, Typography } from '@mui/material';
import ThemeToggler from './theme/ThemeToggler';
import LogOut from './LogOut';

const Header = ({ socket }) => {
  return (
    <AppBar position='sticky' top={0}>
      <Container maxWidth='md'>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between', padding: 0 }}
        >
          <Typography variant='h4'>{localStorage.getItem('user')}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeToggler />
            {localStorage.getItem('user') && <LogOut socket={socket} />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
