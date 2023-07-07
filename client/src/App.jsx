import { Route, Routes } from 'react-router-dom';
import socketio from 'socket.io-client';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

const socket = socketio.connect('http://localhost:5000');

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage socket={socket} />} />
        <Route path='/chat' element={<ChatPage socket={socket} />} />
      </Routes>
    </>
  );
}

export default App;
