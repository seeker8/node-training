import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import { Filter } from 'bad-words';

const __dirname = import.meta.dirname;
const port = process.env.PORT || 3000;

const EVENT_TYPES = Object.freeze({
  MESSAGE: 'message',
  SEND_MESSAGE: 'sendMessage',
  SEND_LOCATION: 'sendLocation'
});

const app = express();
const server = http.createServer(app);
// create socketio instance
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  // this emits an event directly to the client which just connected
  socket.emit(EVENT_TYPES.MESSAGE, `Welcome! ${socket.id}`);

  // this emits the event to all connected clients except the one just connected
  socket.broadcast.emit(EVENT_TYPES.MESSAGE, 'A new user has joined!');

  socket.on(EVENT_TYPES.SEND_MESSAGE, (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }
    // this emits the event to all connected clients
    io.emit(EVENT_TYPES.MESSAGE, message);
    callback();
  });

  socket.on(EVENT_TYPES.SEND_LOCATION, (locationObj, callback) => {
    const { longitude, latitude } = locationObj;
    io.emit('locationMessage', `https://www.google.com/maps/@${longitude},${latitude}`);
    callback();
  });

  // this event is emitted when a client disconnects and needs to be setup from inside the 
  // connection listener
  socket.on('disconnect', () => {
    io.emit(EVENT_TYPES.MESSAGE, 'client has disconnected');
  });
});

server.listen(port, () => {
  console.log('listening on port 3000...');
});
