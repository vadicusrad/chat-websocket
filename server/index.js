const express = require('express');
const app = express();
const PORT = 5000

const http = require('http').Server(app);
const cors = require('cors');
const socketio = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

app.get('api', (req, res) => {
    res.json({
        message: 'Hello World!'})
})

let users = []

socketio.on('connection', (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('newUser', (data) => {
        users.push(data)
        console.log('newUser', users)
        socket.emit('responseNewUser', users)
        socket.broadcast.emit('responseNewUser', users)
    })

    socket.on('message', (data) => {
        socketio.emit('response', data)
    })
    

    socket.on('typing', (data) => {
        socket.broadcast.emit('responseTyping', data)
    })


    socket.on('logOut', (data) => {
      users =  users.filter((user) => user.socketID !== data.socketID)
      socket.broadcast.emit('responseNewUser', users)
      console.log('users', users)
    
    })

    socket.on('disconnect', () => {
        
        console.log(`${socket.id} disconnected`)
       
    })
})

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})