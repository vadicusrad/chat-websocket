/* eslint-disable react/prop-types */
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const UsersList = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('responseNewUser', (data) => setUsers(data));
  }, [socket, users]);
  return (
    <>
      <Typography sx={{ typography: { sm: 'h6', md: 'h5' } }}>
        Участники чата
      </Typography>
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
    </>
  );
};

export default UsersList;
