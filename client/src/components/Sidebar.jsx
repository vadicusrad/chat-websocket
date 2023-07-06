/* eslint-disable react/prop-types */
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('responseNewUser', (data) => setUsers(data));
    console.log('responseNewUser', users);
  }, [socket, users]);

  return (
    <List
      dense={true}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Typography variant='h6'>Участники чата</Typography>
      {users &&
        users.map((user) => {
          return (
            <ListItem key={user.socketID}>
              <ListItemText primary={user.user} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default Sidebar;
