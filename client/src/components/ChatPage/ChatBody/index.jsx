/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, status, socket }) => {
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
    <>
      <header>
        <button onClick={handleLeaveChat}>Покинуть чат</button>
      </header>

      <div>
        {messages.map((message) => {
          if (message.name === localStorage.getItem('user')) {
            return (
              <div style={{ backgroundColor: 'green' }} key={message.id}>
                <p>{message.name}</p>
                <p>{message.text}</p>
              </div>
            );
          }
          return (
            <div style={{ backgroundColor: 'red' }} key={message.id}>
              <p>{message.name}</p>
              <p>{message.text}</p>
            </div>
          );
        })}

        <div>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
