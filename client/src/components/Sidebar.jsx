/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import UsersList from './UsersList';

const Sidebar = ({ socket }) => {
  return (
    <Box
      sx={{
        marginRight: '20px',
        width: '200px',
        overflowY: 'scroll',
        display: {
          sm: 'block',
          xs: 'none',
        },
      }}
      className='hideScrollbar'
    >
      <UsersList socket={socket} />
    </Box>
  );
};

export default Sidebar;
