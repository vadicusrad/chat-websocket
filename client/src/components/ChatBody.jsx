/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
const ChatBody = ({ messages, status }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: '10px',
      }}
    >
      {messages.map((message) => {
        if (message.name === localStorage.getItem('user')) {
          return (
            <Box
              style={{
                backgroundColor: '#66bb6a',
                padding: '10px',
                marginBottom: '15px',
                marginTop: '15px',
                borderRadius: '6px',
                alignSelf: 'flex-end',
                width: '70%',
                color: 'white',
              }}
              key={message.id}
            >
              <Typography variant='h6'>{message.name}</Typography>
              <Typography variant='body1'>{message.text}</Typography>
            </Box>
          );
        }
        return (
          <Box
            style={{
              backgroundColor: '#f44336',
              padding: '10px',
              marginBottom: '15px',
              marginTop: '15px',
              borderRadius: '10px',
              width: '70%',
              color: 'white',
            }}
            key={message.id}
          >
            <Typography variant='h6'>{message.name}</Typography>
            <Typography variant='body1'>{message.text}</Typography>
          </Box>
        );
      })}

      <Box sx={{ position: 'fixed', bottom: '150px' }}>
        <Typography variant='body2'>{status}</Typography>
      </Box>
    </Box>
  );
};

export default ChatBody;
