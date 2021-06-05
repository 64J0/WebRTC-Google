const express = require('express');
const http = require('http');
const cors = require('cors');

const port = process.env.PORT || 2021;

const app = express();
app.use(cors({}));

const httpServer = http.createServer(app)
  .listen(port, () => {
    console.info(`Server running on port ${port}`);
  });


// SOCKET SERVER
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

io.sockets.on('connection', (socket) => {
  // Convenience function to log server messages to the client
  function log(...args) {
    const array = ['>>> Message from server: '];
    for (let i = 0; i < args.length; i++) {
      array.push(args[i]);
    }

    socket.emit('log', array);
  }

  socket.on('message', (message) => {
    log('Got message:', message);
    // For a real app, would be room only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', (room) => {
    const numClients = io.sockets.adapter.rooms[room]?.length || 0;

    log(`Room ${room} has ${numClients} client(s)`);
    log(`Request to create or join room ${room}`);

    if (numClients === 0) {
      socket.join(room);
      socket.emit('created', room);
    } else if (numClients === 1) {
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room);
    } else { // max two clients
      socket.emit('full', room);
    }
    socket.emit(`emit(): client ${socket.id} joined room ${room}`);
    socket.broadcast
      .emit(`broadcast()): client ${socket.id} joined room ${room}`);
  });
});
