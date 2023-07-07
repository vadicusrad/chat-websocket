/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('responseNewUser', (data) => setUsers(data));
  }, [socket, users]);

  return (
    <Box
      sx={{
        marginRight: '20px',
        width: '200px',
        overflowY: 'scroll',
      }}
      className='hideScrollbar'
    >
      <Typography variant='h5'>Участники чата</Typography>
      <List dense={true}>
        {users &&
          users.map((user) => {
            return (
              <ListItem key={user.socketID} disablePadding>
                <ListItemButton>
                  <ListItemText primary={user.user} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default Sidebar;
