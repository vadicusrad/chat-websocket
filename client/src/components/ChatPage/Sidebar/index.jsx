/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('responseNewUser', (data) => setUsers(data));
    console.log('responseNewUser', users);
  }, [socket]);

  return (
    <div>
      <h4>Users</h4>
      <ul>
        {users &&
          users.map((user) => {
            return <li key={user.socketID}>{user.user}</li>;
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
